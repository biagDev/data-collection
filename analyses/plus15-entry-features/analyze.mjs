#!/usr/bin/env node
// Conditional analysis: for each feature, does it predict first-touch side
// within the +15 min window?
//
// Reads all raw_*.csv in ./data/, concatenates, drops 'none'/'ambiguous' rows,
// then for each feature computes:
//   - high% conditional on feature value (binned)
//   - n
//   - lift vs base rate (high% across all rows)
// Writes a small markdown report.

import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DATA = join(HERE, 'data');

function readCsv(path) {
  const lines = readFileSync(path, 'utf8').trim().split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map((ln) => {
    const cells = ln.split(',');
    const o = {};
    headers.forEach((h, i) => (o[h] = cells[i]));
    return o;
  });
}

// Read master_*.csv (the growing dedup-merged datasets). raw_*.csv are
// one-time seed dumps and should not be read here to avoid double counting.
const rows = readdirSync(DATA)
  .filter((f) => f.startsWith('master_') && f.endsWith('.csv'))
  .flatMap((f) => readCsv(join(DATA, f)));

const tradable = rows.filter((r) => r.first === 'high' || r.first === 'low');
const base = tradable.filter((r) => r.first === 'high').length / tradable.length;

function bin(rows, valueFn, bins) {
  // bins: [{label, test}] where test(v) returns bool
  const out = bins.map(({ label }) => ({ label, n: 0, high: 0 }));
  for (const r of rows) {
    const v = valueFn(r);
    if (v == null || Number.isNaN(v)) continue;
    for (let i = 0; i < bins.length; i++) {
      if (bins[i].test(v)) {
        out[i].n++;
        if (r.first === 'high') out[i].high++;
        break;
      }
    }
  }
  return out.map((b) => ({
    ...b,
    high_pct: b.n > 0 ? +((b.high / b.n) * 100).toFixed(1) : null,
    lift: b.n > 0 ? +(((b.high / b.n) - base) * 100).toFixed(1) : null,
  }));
}

const num = (s) => (s === '' || s == null ? null : Number(s));

const features = {
  'Close location (within magnet candle)': {
    valueFn: (r) => num(r.clLoc),
    bins: [
      { label: 'lower third (≤ 0.33)',  test: (v) => v <= 0.33 },
      { label: 'middle third (0.33-0.67)', test: (v) => v > 0.33 && v < 0.67 },
      { label: 'upper third (≥ 0.67)',  test: (v) => v >= 0.67 },
    ],
  },
  'VWAP side at magnet close': {
    valueFn: (r) => num(r.vwap),
    bins: [
      { label: 'below VWAP (-1)', test: (v) => v < 0 },
      { label: 'above VWAP (+1)', test: (v) => v > 0 },
    ],
  },
  'HTF EMA trend (15m EMA20 vs EMA50)': {
    valueFn: (r) => num(r.htf),
    bins: [
      { label: 'down (-1)', test: (v) => v < 0 },
      { label: 'neutral (0)', test: (v) => v === 0 },
      { label: 'up (+1)',   test: (v) => v > 0 },
    ],
  },
  'Distance to PDH (ATR units, smaller = closer above)': {
    valueFn: (r) => num(r.dPdh),
    bins: [
      { label: 'PDH near/above (|d| < 1)',  test: (v) => Math.abs(v) < 1 },
      { label: 'PDH moderate (1-3)',  test: (v) => Math.abs(v) >= 1 && Math.abs(v) < 3 },
      { label: 'PDH far (≥ 3)', test: (v) => Math.abs(v) >= 3 },
    ],
  },
  'Distance to PDL (ATR units, smaller = closer below)': {
    valueFn: (r) => num(r.dPdl),
    bins: [
      { label: 'PDL near/below (|d| < 1)',  test: (v) => Math.abs(v) < 1 },
      { label: 'PDL moderate (1-3)',  test: (v) => Math.abs(v) >= 1 && Math.abs(v) < 3 },
      { label: 'PDL far (≥ 3)', test: (v) => Math.abs(v) >= 3 },
    ],
  },
  'Opening drive @ +90s (ATR units)': {
    valueFn: (r) => num(r.drv),
    bins: [
      { label: 'strong down (< -0.25)', test: (v) => v < -0.25 },
      { label: 'mild (-0.25 to +0.25)', test: (v) => v >= -0.25 && v <= 0.25 },
      { label: 'strong up (> +0.25)',   test: (v) => v > 0.25 },
    ],
  },
};

const lines = [];
lines.push('# +15 Entry Features — First-Hit Conditional Analysis\n');
lines.push(`Total rows: **${rows.length}** | Tradable (first ∈ {high, low}): **${tradable.length}** | Dropped (none/ambiguous): **${rows.length - tradable.length}**\n`);
lines.push(`Base rate (high first | tradable): **${(base * 100).toFixed(1)}%**\n`);
lines.push('Lift = (conditional high%) − (base high%). Positive = feature pushes prior toward "high first." Threshold for meaningful: |lift| ≥ 8 and n ≥ 20.\n');

for (const [name, spec] of Object.entries(features)) {
  lines.push(`\n## ${name}\n`);
  lines.push('| Bin | n | high% | lift |');
  lines.push('|---|---:|---:|---:|');
  for (const b of bin(tradable, spec.valueFn, spec.bins)) {
    const flag = b.n >= 20 && b.lift != null && Math.abs(b.lift) >= 8 ? ' ⚑' : '';
    lines.push(`| ${b.label} | ${b.n} | ${b.high_pct ?? '—'} | ${b.lift != null ? (b.lift > 0 ? '+' + b.lift : b.lift) : '—'}${flag} |`);
  }
}

// Bucket-level breakdown (which 15m candle clock-times have the strongest skew here)
const byBucket = {};
for (const r of tradable) {
  const b = r.bkt;
  if (!byBucket[b]) byBucket[b] = { n: 0, high: 0 };
  byBucket[b].n++;
  if (r.first === 'high') byBucket[b].high++;
}
const bucketRows = Object.entries(byBucket)
  .filter(([, v]) => v.n >= 4)
  .map(([b, v]) => ({ bkt: b, n: v.n, high_pct: +((v.high / v.n) * 100).toFixed(1) }))
  .sort((a, b) => Math.abs(b.high_pct - base * 100) - Math.abs(a.high_pct - base * 100))
  .slice(0, 20);

lines.push('\n## Top buckets by deviation from base rate (n ≥ 4)\n');
lines.push('| bkt | n | high% | dev |');
lines.push('|---|---:|---:|---:|');
for (const r of bucketRows) {
  const dev = +(r.high_pct - base * 100).toFixed(1);
  lines.push(`| ${r.bkt} | ${r.n} | ${r.high_pct} | ${dev > 0 ? '+' + dev : dev} |`);
}

// Sample-size warning
lines.push('\n## Caveats\n');
lines.push(`- Sample is only ~2 trading days × 2 symbols, ${tradable.length} tradable events. Confidence intervals are very wide — any single-bucket result here is anecdotal. Treat bin-level lifts ≥ 8 with n ≥ 20 as **hypotheses to retest**, not edges.`);
lines.push('- The default magnet sample is also up-trending (large "high" base rate may reflect a regime, not a structural feature).');
lines.push('- Need 10x more events (run on 1m timeframe for deeper history, or accumulate 30s data over many sessions) before any of this should drive sizing.');

writeFileSync(join(HERE, 'FINDINGS.md'), lines.join('\n') + '\n');
console.log(`wrote FINDINGS.md (${tradable.length} tradable rows, base=${(base * 100).toFixed(1)}%)`);
