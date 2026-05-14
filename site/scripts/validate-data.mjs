// validate-data.mjs — schema-drift guard. READ-ONLY over analyses/**.
//
// Runs before build-data in CI. Phase A: confirms every
// analyses/**/data/results.json exists and is valid JSON. Phase B will
// extend this to assert each file matches one of the known adapter shapes,
// so a future data-collection run that changes the schema fails CI loudly
// instead of silently breaking the site.
//
// This script NEVER writes anything. It only reads.

import { readdir, readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

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

  for (const f of files) {
    const rel = relative(REPO_ROOT, f);
    try {
      const raw = await readFile(f, 'utf8');
      JSON.parse(raw);
    } catch (err) {
      errors.push(`${rel}: ${err.message}`);
    }
  }

  if (errors.length) {
    console.error(`[validate-data] ${errors.length} invalid results.json file(s):`);
    for (const e of errors) console.error('  - ' + e);
    process.exit(1);
  }

  console.log(`[validate-data] OK — ${files.length} results.json files valid.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
