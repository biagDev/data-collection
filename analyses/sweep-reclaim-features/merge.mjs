#!/usr/bin/env node
// ============================================================================
// merge.mjs — read EVT|... labels from stdin, dedupe by (sym, t, side), append
// to data/master_<sym>.csv. Same pattern as plus15-entry-features/merge.mjs.
//
// USAGE
//   1) In TradingView with the Sweep+Reclaim Event Logger applied to NQ1! 30s,
//      pull the labels via MCP:
//        data_get_pine_labels with study_filter="Sweep+Reclaim Event Logger"
//   2) Pipe the raw label text into this script:
//        pbpaste | node analyses/sweep-reclaim-features/merge.mjs nq
//      OR save to a temp file then:
//        node analyses/sweep-reclaim-features/merge.mjs nq < /tmp/labels.txt
//   3) Reports: "+N new rows, M duplicates skipped, K total in master".
// ============================================================================
import fs from "node:fs";
import path from "node:path";

const SYMBOL_ARG = (process.argv[2] || "").toLowerCase();
if (!SYMBOL_ARG) {
  console.error("usage: merge.mjs <symbol-slug>  e.g. 'nq', 'es'");
  process.exit(1);
}

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const DATA_DIR = path.join(__dirname, "data");
fs.mkdirSync(DATA_DIR, { recursive: true });
const MASTER = path.join(DATA_DIR, `master_${SYMBOL_ARG}.csv`);

// Column order — must stay stable for analyze.mjs.
// v1 logger fields: tt6/tt10/tt15 (gated favorable-time), st8 (8pt adverse).
// v2 logger fields: ft6/ft10/ft15 (ungated favorable-time), at8/at10/at12
//   (multi-stop adverse-time), cl10/clH (signed close at +10 bars / horizon).
// Old rows leave v2 cols blank; new rows leave v1 cols blank. analyze.mjs
// prefers v2 fields when present and falls back to v1 for the 8pt boxes.
const COLS = [
  "t", "sym", "bkt", "sess", "side",
  "refR", "swDep", "swLag", "clLoc",
  "vwapD", "reg", "htf",
  "pdhD", "pdlD", "volZ",
  "prevCol", "prevRng",
  "mfe", "mae",
  "tt6", "tt10", "tt15", "st8",
  "ft6", "ft10", "ft15", "at8", "at10", "at12", "cl10", "clH",
  "hor",
];

function parseLabels(text) {
  const rows = [];
  // Match EVT|...|hor=N pattern. Stops at next EVT or end-of-string.
  const re = /EVT\|[^E]*?(?=EVT|$)/g;
  for (const match of text.matchAll(re)) {
    const blob = match[0];
    const row = {};
    for (const part of blob.split("|")) {
      if (part === "EVT") continue;
      const eq = part.indexOf("=");
      if (eq < 0) continue;
      const k = part.slice(0, eq).trim();
      const v = part.slice(eq + 1).trim();
      row[k] = v;
    }
    if (row.t && row.side && row.sym) rows.push(row);
  }
  return rows;
}

function readMaster() {
  if (!fs.existsSync(MASTER)) return { header: COLS, rows: [], keys: new Set() };
  const txt = fs.readFileSync(MASTER, "utf8").trim();
  if (!txt) return { header: COLS, rows: [], keys: new Set() };
  const lines = txt.split("\n");
  const header = lines[0].split(",");
  const rows = lines.slice(1).map((l) => {
    const vals = l.split(",");
    const obj = {};
    header.forEach((h, i) => (obj[h] = vals[i] ?? ""));
    return obj;
  });
  const keys = new Set(rows.map((r) => `${r.sym}|${r.t}|${r.side}`));
  return { header, rows, keys };
}

function writeMaster(rows) {
  const lines = [COLS.join(",")];
  for (const r of rows) lines.push(COLS.map((c) => r[c] ?? "").join(","));
  fs.writeFileSync(MASTER, lines.join("\n") + "\n");
}

const input = fs.readFileSync(0, "utf8");
const parsed = parseLabels(input);
const { rows: existing, keys } = readMaster();

let added = 0, skipped = 0;
const merged = [...existing];
for (const row of parsed) {
  const k = `${row.sym}|${row.t}|${row.side}`;
  if (keys.has(k)) { skipped++; continue; }
  keys.add(k);
  merged.push(row);
  added++;
}

// Sort by timestamp ascending for readability.
merged.sort((a, b) => (a.t < b.t ? -1 : a.t > b.t ? 1 : 0));
writeMaster(merged);

console.log(`+${added} new rows, ${skipped} duplicates skipped, ${merged.length} total in ${path.basename(MASTER)}`);
