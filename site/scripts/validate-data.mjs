// validate-data.mjs — schema-drift guard. READ-ONLY over analyses/**.
//
// Runs before build-data in CI. Fails the build (exit 1) if any
// analyses/**/data/results.json:
//   - is missing or not valid JSON, OR
//   - is a retest-category analysis (candle-hit-stats / multi-tf-candle /
//     session-retest) but the normalizer can't extract any candle rows from it.
//
// This protects the dashboard: a future data-collection run that changes the
// results.json schema fails CI loudly instead of silently producing an empty
// or broken leaderboard.
//
// This script NEVER writes anything. It only reads.

import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve, relative, sep, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  categoryFromId,
  isRetestCategory,
  extractCandles,
  buildRecord,
} from './lib/normalize.mjs';

const SCRIPT_DIR = fileURLToPath(new URL('.', import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '..', '..');
const ANALYSES_DIR = join(REPO_ROOT, 'analyses');

async function findResultsFiles(dir) {
  const found = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return found;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...(await findResultsFiles(full)));
    } else if (entry.isFile() && entry.name === 'results.json') {
      found.push(full);
    }
  }
  return found;
}

async function main() {
  if (!existsSync(ANALYSES_DIR)) {
    throw new Error(`[validate-data] analyses/ not found at ${ANALYSES_DIR}`);
  }

  const files = await findResultsFiles(ANALYSES_DIR);
  const errors = [];
  let retestOk = 0;

  for (const f of files) {
    const analysisDir = dirname(dirname(f));
    const id = relative(ANALYSES_DIR, analysisDir).split(sep).join('/');
    let json;
    try {
      json = JSON.parse(await readFile(f, 'utf8'));
    } catch (err) {
      errors.push(`${id}: invalid JSON — ${err.message}`);
      continue;
    }

    // Every file must produce a record without throwing.
    try {
      buildRecord(id, json, { dir: id });
    } catch (err) {
      errors.push(`${id}: normalizer threw — ${err.message}`);
      continue;
    }

    // Retest analyses must yield at least one candle row.
    const cat = categoryFromId(id);
    if (isRetestCategory(cat)) {
      const candles = extractCandles(id, cat, json);
      if (!candles.length) {
        errors.push(
          `${id}: classified as retest category "${cat}" but normalizer extracted 0 candles — schema drift?`
        );
      } else {
        const hasData = candles.some((c) => c.retest && c.retest.p15 != null);
        if (!hasData) {
          errors.push(`${id}: retest candles have no +15 retest values — schema drift?`);
        } else {
          retestOk += 1;
        }
      }
    }
  }

  if (errors.length) {
    console.error(`[validate-data] FAILED — ${errors.length} issue(s):`);
    for (const e of errors) console.error('  ✗ ' + e);
    process.exit(1);
  }

  console.log(
    `[validate-data] OK — ${files.length} results.json valid, ${retestOk} retest analyses produce candle data.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
