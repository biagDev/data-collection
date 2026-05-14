// build-data.mjs — data pipeline for the dashboard.
//
// ============================ SAFETY CONTRACT ============================
// This script is STRICTLY READ-ONLY over the analyses/** tree.
//   - It only ever calls fs.readFile / fs.readdir / fs.stat on paths under
//     ANALYSES_DIR.
//   - It only ever WRITES to paths under OUT_DIR (site/src/data/).
//   - assertWriteSafe() hard-fails if any write target escapes OUT_DIR.
// The collected data in analyses/** is the source of truth and must never
// be altered, moved, or deleted by anything in site/.
// =========================================================================
//
// Phase B: walks analyses/**, normalizes every results.json into the unified
// schema (see lib/normalize.mjs), and emits:
//   - analyses.json    — every analysis as a normalized record
//   - leaderboard.json — every individual candle flattened + ranked
//   - compare.json     — candles grouped by window across assets
//   - meta.json        — build metadata

import { readdir, readFile, stat, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve, relative, sep, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildRecord,
  isRetestCategory,
  assetFromId,
} from './lib/normalize.mjs';

const SCRIPT_DIR = fileURLToPath(new URL('.', import.meta.url));
const SITE_DIR = resolve(SCRIPT_DIR, '..');
const REPO_ROOT = resolve(SITE_DIR, '..');
const ANALYSES_DIR = join(REPO_ROOT, 'analyses');
const OUT_DIR = join(SITE_DIR, 'src', 'data');

// Hard guard: refuse to write anywhere outside OUT_DIR.
function assertWriteSafe(targetPath) {
  const rel = relative(OUT_DIR, resolve(targetPath));
  if (rel.startsWith('..') || rel.startsWith(sep) || resolve(targetPath) === OUT_DIR) {
    throw new Error(`[build-data] BLOCKED unsafe write outside site/src/data: ${targetPath}`);
  }
}

async function safeWrite(name, data) {
  const target = join(OUT_DIR, name);
  assertWriteSafe(target);
  await writeFile(target, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`[build-data] wrote ${relative(REPO_ROOT, target)} (${Array.isArray(data) ? data.length + ' items' : 'object'})`);
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

// Discover the asset files that sit alongside a results.json — READ ONLY.
async function discoverPaths(analysisDir) {
  const repoRel = (p) => relative(REPO_ROOT, p);
  const paths = {
    dir: repoRel(analysisDir),
    resultsJson: repoRel(join(analysisDir, 'data', 'results.json')),
    readme: null,
    easyRead: null,
    pine: null,
    aggregateCsv: null,
    byDowCsv: null,
  };
  if (existsSync(join(analysisDir, 'README.md'))) paths.readme = repoRel(join(analysisDir, 'README.md'));
  if (existsSync(join(analysisDir, 'EASY_READ.md'))) paths.easyRead = repoRel(join(analysisDir, 'EASY_READ.md'));
  if (existsSync(join(analysisDir, 'data', 'aggregate.csv'))) paths.aggregateCsv = repoRel(join(analysisDir, 'data', 'aggregate.csv'));
  if (existsSync(join(analysisDir, 'data', 'by_dow.csv'))) paths.byDowCsv = repoRel(join(analysisDir, 'data', 'by_dow.csv'));
  const pineDir = join(analysisDir, 'pine');
  if (existsSync(pineDir)) {
    try {
      const pineFiles = (await readdir(pineDir)).filter((f) => f.endsWith('.pine')).sort();
      if (pineFiles.length) paths.pine = repoRel(join(pineDir, pineFiles[0]));
    } catch {
      /* ignore */
    }
  }
  return paths;
}

function normLabel(label) {
  return String(label).replace(/_/g, ' ').trim();
}

async function main() {
  if (!existsSync(ANALYSES_DIR)) {
    throw new Error(`[build-data] analyses/ not found at ${ANALYSES_DIR}`);
  }
  await mkdir(OUT_DIR, { recursive: true });

  const resultsFiles = await findResultsFiles(ANALYSES_DIR);
  const analyses = [];
  const warnings = [];

  for (const file of resultsFiles) {
    const analysisDir = dirname(dirname(file)); // .../<id>/data/results.json -> .../<id>
    const id = relative(ANALYSES_DIR, analysisDir).split(sep).join('/');
    let json;
    try {
      json = JSON.parse(await readFile(file, 'utf8'));
    } catch (err) {
      warnings.push(`parse failed: ${id} (${err.message})`);
      continue;
    }
    const paths = await discoverPaths(analysisDir);
    const record = buildRecord(id, json, paths);
    if (isRetestCategory(record.category) && (!record.candles || record.candles.length === 0)) {
      warnings.push(`retest analysis produced no candles: ${id}`);
    }
    analyses.push(record);
  }

  // Stable sort: asset, then category, then id.
  const assetOrder = { NQ: 0, ES: 1, GC: 2 };
  analyses.sort(
    (a, b) =>
      (assetOrder[a.asset] - assetOrder[b.asset]) ||
      a.category.localeCompare(b.category) ||
      a.id.localeCompare(b.id)
  );

  // ---- leaderboard: flatten every candle from every retest analysis --------
  const leaderboard = [];
  for (const rec of analyses) {
    if (!isRetestCategory(rec.category) || !rec.candles) continue;
    for (const c of rec.candles) {
      leaderboard.push({
        analysisId: rec.id,
        slug: rec.slug,
        asset: rec.asset,
        category: rec.category,
        sessionLabel: rec.sessionLabel,
        candleLabel: normLabel(c.label),
        n: c.n ?? rec.sampleN,
        retest15: c.retest.p15,
        retest30: c.retest.p30,
        retest45: c.retest.p45,
        sweep15: c.sweep.p15,
        sweep30: c.sweep.p30,
        sweep45: c.sweep.p45,
        highAny45: c.highAny45,
        lowAny45: c.lowAny45,
        bias: c.bias,
        asOf: rec.asOf,
      });
    }
  }
  // Default rank: by retest +15 desc (nulls last).
  leaderboard.sort((a, b) => (b.retest15 ?? -1) - (a.retest15 ?? -1));
  leaderboard.forEach((row, i) => {
    row.rank = i + 1;
  });

  // ---- compare: group candles by session + window label across assets -----
  const groups = new Map();
  for (const row of leaderboard) {
    const key = `${row.sessionLabel}::${row.candleLabel}`;
    if (!groups.has(key)) {
      groups.set(key, { sessionLabel: row.sessionLabel, candleLabel: row.candleLabel, rows: [] });
    }
    groups.get(key).rows.push(row);
  }
  const compare = [...groups.values()]
    .filter((g) => new Set(g.rows.map((r) => r.asset)).size >= 2)
    .map((g) => ({
      ...g,
      rows: g.rows.sort((a, b) => assetOrder[a.asset] - assetOrder[b.asset]),
      spread15:
        Math.max(...g.rows.map((r) => r.retest15 ?? 0)) -
        Math.min(...g.rows.map((r) => r.retest15 ?? 100)),
    }))
    .sort((a, b) => b.spread15 - a.spread15);

  // ---- meta ----------------------------------------------------------------
  const byCategory = {};
  for (const rec of analyses) byCategory[rec.category] = (byCategory[rec.category] || 0) + 1;
  const byAsset = {};
  for (const rec of analyses) byAsset[rec.asset] = (byAsset[rec.asset] || 0) + 1;

  const meta = {
    builtAt: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC',
    phase: 'B',
    analysisCount: analyses.length,
    leaderboardRows: leaderboard.length,
    compareGroups: compare.length,
    byCategory,
    byAsset,
    warnings,
  };

  await safeWrite('analyses.json', analyses);
  await safeWrite('leaderboard.json', leaderboard);
  await safeWrite('compare.json', compare);
  await safeWrite('meta.json', meta);

  if (warnings.length) {
    console.warn(`[build-data] ${warnings.length} warning(s):`);
    for (const w of warnings) console.warn('  - ' + w);
  }
  console.log(
    `[build-data] Phase B done — ${analyses.length} analyses, ${leaderboard.length} leaderboard rows, ${compare.length} compare groups.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
