#!/usr/bin/env node
// Merge a fresh Phase 2 table dump (pipe-delimited, as returned by
// data_get_pine_tables) into the per-symbol master CSV. Dedupes by time_et.
//
// Usage:
//   node merge.mjs <symbol> < table.txt
//   (or set MERGE_SYMBOL and pipe via stdin)
//
// Input format expected (first line is header from the indicator):
//   time_et | bkt | magH | magL | magC | atr | first | fBar | drv | clLoc | vwap | htf | dPdh | dPdl
//   2026-05-15 09:30 | 930 | 7462 | 7427 | ...

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DATA = join(HERE, 'data');

const symbol = process.argv[2] || process.env.MERGE_SYMBOL;
if (!symbol) {
  console.error('usage: node merge.mjs <symbol>  (e.g. ES1! or NQ1!)');
  process.exit(1);
}

const masterPath = join(DATA, `master_${symbol.replace(/!$/, '').toLowerCase()}.csv`);
const CSV_HEADER = 'symbol,time_et,bkt,magH,magL,magC,atr,first,fBar,drv,clLoc,vwap,htf,dPdh,dPdl';

const raw = readFileSync(0, 'utf8').trim();
const lines = raw.split('\n').map((s) => s.trim()).filter(Boolean);

// Drop pipe-delimited header if present
const dataLines = lines[0].includes('time_et') ? lines.slice(1) : lines;

const fresh = [];
for (const ln of dataLines) {
  const cells = ln.split('|').map((s) => s.trim());
  if (cells.length < 14) continue;
  fresh.push([symbol, ...cells].join(','));
}

const existing = existsSync(masterPath)
  ? readFileSync(masterPath, 'utf8').trim().split('\n')
  : [CSV_HEADER];
const existingHeader = existing[0];
const existingRows = existing.slice(1);

// Dedupe key = symbol + time_et (col 0 + col 1 of CSV)
const seen = new Set(existingRows.map((r) => r.split(',', 2).join(',')));
const added = [];
for (const r of fresh) {
  const key = r.split(',', 2).join(',');
  if (!seen.has(key)) {
    seen.add(key);
    added.push(r);
  }
}

const merged = [existingHeader, ...existingRows, ...added].join('\n') + '\n';
writeFileSync(masterPath, merged);
console.log(`${symbol}: +${added.length} new rows (total ${existingRows.length + added.length}) -> ${masterPath}`);
