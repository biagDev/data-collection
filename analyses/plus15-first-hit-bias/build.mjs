#!/usr/bin/env node
// Re-derive directional bias from the +15 window across every candle bucket
// already collected in `analyses/`. Default leaderboard bias is computed
// over the +45 window, which is the wrong prior for a scalping entry that
// must resolve inside +15.
//
// Output:
//   data/results.json   — all rows + per-asset/session aggregates
//   data/leaderboard.csv — flat row per bucket, sortable for paper-testing

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ANALYSES_DIR = join(HERE, '..');
const OUT_DIR = join(HERE, 'data');

const MIN_N = 100; // matches the leaderboard "prelim" cutoff
const NEUTRAL_EDGE = 3; // pct points; below this -> balanced

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function biasOf(highPct, lowPct) {
  if (highPct == null || lowPct == null) return { side: null, edge: null };
  const edge = +(highPct - lowPct).toFixed(2);
  if (Math.abs(edge) < NEUTRAL_EDGE) return { side: 'balanced', edge };
  return { side: edge > 0 ? 'high' : 'low', edge };
}

// Two ways to compute a +15 prior, in order of preference:
//   firstHit: high_only_15 / (high_only_15 + low_only_15)
//     — cleanest "which side first" signal; excludes both-side days.
//     — only available in the NQ nested aggregate shape.
//   anyHit:  hi_any_15 vs lo_any_15
//     — universally available; double-counts both-side days but
//       directionally consistent.
function rowsFromAnalysis(id, json) {
  const out = [];

  // Family 1: aggregate.by_HH_MM.{high_only,low_only,high_any,low_any,both_sides}.{pct,count}
  if (json.aggregate && typeof json.aggregate === 'object') {
    const agg = json.aggregate;
    const w15 = Object.keys(agg).find((k) => /^by_\d+_\d+$/.test(k));
    if (w15 && agg[w15]) {
      const w = agg[w15];
      const n = agg.total_days ?? null;
      const ho = w.high_only?.pct ?? null;
      const lo = w.low_only?.pct ?? null;
      const ha = w.high_any?.pct ?? null;
      const la = w.low_any?.pct ?? null;
      const bo = w.both_sides?.pct ?? null;
      out.push(makeRow(id, labelFromId(id), n, ho, lo, ha, la, bo));
    }
    return out;
  }

  // Family 2: ES flat — directional.{hi_any_plus_15_pct,lo_any_plus_15_pct},
  //                     both_sides_sweep.by_plus_15_pct
  if (json.either_side && json.directional) {
    const d = json.directional;
    const ha = d.hi_any_plus_15_pct ?? null;
    const la = d.lo_any_plus_15_pct ?? null;
    const bo = json.both_sides_sweep?.by_plus_15_pct ?? null;
    out.push(makeRow(id, labelFromId(id), json.n ?? null, null, null, ha, la, bo));
    return out;
  }

  // Family 3: session — directional_split.rows[], both_sides_sweep.rows[]
  if (json.directional_split?.rows) {
    const sweepByCandle = Object.fromEntries(
      (json.both_sides_sweep?.rows || []).map((r) => [r.candle, r])
    );
    for (const r of json.directional_split.rows) {
      const ha = r.hi_any_plus_15 ?? null;
      const la = r.lo_any_plus_15 ?? null;
      // Pass through first-hit fields when present (newer collectors include them)
      const ho = r.hi_only_plus_15 ?? null;
      const lo = r.lo_only_plus_15 ?? null;
      const bo = r.both_plus_15 ?? sweepByCandle[r.candle]?.by_plus_15 ?? null;
      out.push(makeRow(id, `${id} ${r.candle}`, r.n ?? null, ho, lo, ha, la, bo));
    }
    return out;
  }

  // Family 4: flat rows with hi_any/lo_any plus_15 (gold/globex shapes)
  if (Array.isArray(json.rows)) {
    for (const r of json.rows) {
      const ha = r.hi_any_plus_15 ?? r.high_any_plus_15_pct ?? null;
      const la = r.lo_any_plus_15 ?? r.low_any_plus_15_pct ?? null;
      const bo = r.both_plus_15 ?? r.both_plus_15_pct ?? null;
      if (ha == null && la == null) continue;
      const label = r.candle ?? r.candle_et ?? id;
      out.push(makeRow(id, `${id} ${label}`, r.n ?? null, null, null, ha, la, bo));
    }
    return out;
  }

  return out;
}

function makeRow(analysisId, label, n, hiOnly, loOnly, hiAny, loAny, both) {
  const firstHitN =
    hiOnly != null && loOnly != null && n != null
      ? Math.round(((hiOnly + loOnly) / 100) * n)
      : null;
  const firstHitHighPct =
    hiOnly != null && loOnly != null && hiOnly + loOnly > 0
      ? +((hiOnly / (hiOnly + loOnly)) * 100).toFixed(2)
      : null;
  const firstHit = biasOf(firstHitHighPct, firstHitHighPct == null ? null : 100 - firstHitHighPct);
  const anyHit = biasOf(hiAny, loAny);

  // Pick the strongest available prior: prefer first-hit if usable sample.
  const useFirstHit = firstHitHighPct != null && firstHitN != null && firstHitN >= 30;
  const prior = useFirstHit
    ? { source: 'first_hit', side: firstHit.side, edge: firstHit.edge }
    : { source: 'any_hit', side: anyHit.side, edge: anyHit.edge };

  return {
    analysis_id: analysisId,
    label,
    n,
    plus15: {
      high_only_pct: hiOnly,
      low_only_pct: loOnly,
      high_any_pct: hiAny,
      low_any_pct: loAny,
      both_sides_pct: both,
    },
    first_hit_high_pct: firstHitHighPct,
    first_hit_n: firstHitN,
    any_hit_edge: anyHit.edge,
    any_hit_side: anyHit.side,
    prior,
    armable: n != null && n >= MIN_N && prior.side && prior.side !== 'balanced',
  };
}

function labelFromId(id) {
  const m = id.match(/^(\d+)-candle-hit-stats$/);
  if (m) {
    const t = m[1].padStart(4, '0');
    return `${t.slice(0, -2)}:${t.slice(-2)}`;
  }
  return id;
}

function walkAnalyses() {
  const rows = [];
  for (const entry of readdirSync(ANALYSES_DIR)) {
    const dir = join(ANALYSES_DIR, entry);
    if (entry === 'plus15-first-hit-bias') continue;
    if (!statSync(dir).isDirectory()) continue;
    const resultsPath = join(dir, 'data', 'results.json');
    try {
      const json = readJson(resultsPath);
      rows.push(...rowsFromAnalysis(entry, json));
    } catch {
      // skip analyses without results.json (e.g. nested asset folders)
    }
    // also walk one level of asset subfolders (es/, gc/)
    for (const sub of safeReaddir(dir)) {
      const subPath = join(dir, sub, 'data', 'results.json');
      try {
        const json = readJson(subPath);
        rows.push(...rowsFromAnalysis(`${entry}/${sub}`, json));
      } catch {}
    }
  }
  return rows;
}

function safeReaddir(p) {
  try {
    return readdirSync(p).filter((s) => statSync(join(p, s)).isDirectory());
  } catch {
    return [];
  }
}

function toCsv(rows) {
  const headers = [
    'analysis_id', 'label', 'n', 'armable',
    'high_only_15', 'low_only_15', 'high_any_15', 'low_any_15', 'both_15',
    'first_hit_high_pct', 'first_hit_n',
    'any_hit_edge', 'any_hit_side',
    'prior_source', 'prior_side', 'prior_edge',
  ];
  const lines = [headers.join(',')];
  for (const r of rows) {
    lines.push([
      r.analysis_id, JSON.stringify(r.label), r.n ?? '', r.armable,
      r.plus15.high_only_pct ?? '', r.plus15.low_only_pct ?? '',
      r.plus15.high_any_pct ?? '', r.plus15.low_any_pct ?? '',
      r.plus15.both_sides_pct ?? '',
      r.first_hit_high_pct ?? '', r.first_hit_n ?? '',
      r.any_hit_edge ?? '', r.any_hit_side ?? '',
      r.prior.source, r.prior.side ?? '', r.prior.edge ?? '',
    ].join(','));
  }
  return lines.join('\n') + '\n';
}

const rows = walkAnalyses().sort((a, b) => {
  const ae = Math.abs(a.prior.edge ?? 0);
  const be = Math.abs(b.prior.edge ?? 0);
  return be - ae;
});

const summary = {
  generated_at: new Date().toISOString().slice(0, 10),
  min_n_threshold: MIN_N,
  neutral_edge_threshold: NEUTRAL_EDGE,
  total_buckets: rows.length,
  armable_buckets: rows.filter((r) => r.armable).length,
  rows,
};

writeFileSync(join(OUT_DIR, 'results.json'), JSON.stringify(summary, null, 2));
writeFileSync(join(OUT_DIR, 'leaderboard.csv'), toCsv(rows));
console.log(`wrote ${rows.length} buckets (${summary.armable_buckets} armable) -> ${OUT_DIR}`);
