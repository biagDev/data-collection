// build-data.mjs — data pipeline for the dashboard.
//
// ============================ SAFETY CONTRACT ============================
// This script is STRICTLY READ-ONLY over the analyses/** tree.
//   - It only ever calls fs.readFile / fs.readdir / fs.stat on paths under
//     ANALYSES_DIR.
//   - It only ever WRITES to paths under OUT_DIR (site/src/data/).
//   - The assertWriteSafe() guard below hard-fails if any write target
//     escapes OUT_DIR — so a future bug cannot touch collected data.
// The collected data in analyses/** is the source of truth and must never
// be altered, moved, or deleted by anything in site/.
// =========================================================================
//
// Phase A: this is a minimal stub. It discovers analyses (read-only) and
// emits a meta.json + empty placeholder datasets so the Astro build and the
// GitHub Actions pipeline can be verified end-to-end. Phase B fills in the
// real normalizer + adapters.

import { readdir, readFile, stat, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = fileURLToPath(new URL('.', import.meta.url));
const SITE_DIR = resolve(SCRIPT_DIR, '..');
const REPO_ROOT = resolve(SITE_DIR, '..');
const ANALYSES_DIR = join(REPO_ROOT, 'analyses');
const OUT_DIR = join(SITE_DIR, 'src', 'data');

// Hard guard: refuse to write anywhere outside OUT_DIR.
function assertWriteSafe(targetPath) {
  const rel = relative(OUT_DIR, resolve(targetPath));
  if (rel.startsWith('..') || rel.startsWith(sep) || resolve(targetPath) === OUT_DIR) {
    throw new Error(
      `[build-data] BLOCKED unsafe write outside site/src/data: ${targetPath}`
    );
  }
}

async function safeWrite(name, data) {
  const target = join(OUT_DIR, name);
  assertWriteSafe(target);
  await writeFile(target, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`[build-data] wrote ${relative(REPO_ROOT, target)}`);
}

// Recursively find every analyses/**/data/results.json — READ ONLY.
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
    throw new Error(`[build-data] analyses/ not found at ${ANALYSES_DIR}`);
  }
  await mkdir(OUT_DIR, { recursive: true });

  const resultsFiles = await findResultsFiles(ANALYSES_DIR);

  // Phase A: just discover + count. Read each file to confirm it parses,
  // but do not normalize yet.
  let parseOk = 0;
  for (const f of resultsFiles) {
    try {
      JSON.parse(await readFile(f, 'utf8'));
      parseOk += 1;
    } catch (err) {
      console.warn(`[build-data] WARN: could not parse ${relative(REPO_ROOT, f)}: ${err.message}`);
    }
  }

  const meta = {
    builtAt: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC',
    analysisCount: resultsFiles.length,
    parsedOk: parseOk,
    phase: 'A',
  };

  await safeWrite('meta.json', meta);
  await safeWrite('analyses.json', []);
  await safeWrite('leaderboard.json', []);
  await safeWrite('compare.json', []);

  console.log(
    `[build-data] Phase A done — discovered ${resultsFiles.length} analyses (${parseOk} parsed OK).`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
