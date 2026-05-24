#!/usr/bin/env node
// ============================================================================
// analyze.mjs — conditional analysis on sweep+reclaim events.
//
// For every feature, bins the event population and reports the conditional
// win rates at multiple box geometries (target / stop combos). Writes
// FINDINGS.md ranked by lift over base rate.
//
// USAGE
//   node analyses/sweep-reclaim-features/analyze.mjs            # default: NQ
//   node analyses/sweep-reclaim-features/analyze.mjs nq es      # multi-sym
// ============================================================================
import fs from "node:fs";
import path from "node:path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const DATA_DIR = path.join(__dirname, "data");
const OUT      = path.join(__dirname, "FINDINGS.md");

const symbols = process.argv.slice(2);
if (!symbols.length) symbols.push("nq");

// Box geometries. v2 logger rows (ft*/at* fields) support any target×stop combo
// precisely. v1 rows (tt*/st8) only support an 8pt stop. winAtBox prefers v2.
const BOXES = [
  { name: "6/8",   target: 6,  stop: 8 },
  { name: "10/8",  target: 10, stop: 8 },
  { name: "15/8",  target: 15, stop: 8 },
  { name: "10/10", target: 10, stop: 10 },
  { name: "10/12", target: 10, stop: 12 },
  { name: "15/10", target: 15, stop: 10 },
  { name: "15/12", target: 15, stop: 12 },
];

function readMaster(sym) {
  const p = path.join(DATA_DIR, `master_${sym}.csv`);
  if (!fs.existsSync(p)) return [];
  const txt = fs.readFileSync(p, "utf8").trim();
  if (!txt) return [];
  const lines = txt.split("\n");
  const header = lines[0].split(",");
  return lines.slice(1).map((l) => {
    const vals = l.split(",");
    const o = {};
    header.forEach((h, i) => (o[h] = vals[i] ?? ""));
    return o;
  });
}

const N = (x) => (x === "" || x == null ? null : Number(x));

// Win-at-box helper. Races favorable-time vs adverse-time.
//   v2 rows: ft{target} vs at{stop} (any combo, ungated, precise).
//   v1 rows: tt{target} vs st8 (8pt stop only; tt gated on st8).
// Returns 1 (win), 0 (loss), or null (box not computable for this row).
function winAtBox(row, box) {
  const ft = N(row[`ft${box.target}`]);
  if (ft != null) {
    const atKey = box.stop === 8 ? "at8" : box.stop === 10 ? "at10" : box.stop === 12 ? "at12" : null;
    if (atKey == null) return null;
    const at = N(row[atKey]);
    if (at == null) return null;
    if (ft === 0 && at === 0) { const clH = N(row.clH); return clH != null && clH > 0 ? 1 : 0; }
    if (ft > 0 && (at === 0 || at > ft)) return 1;
    return 0;
  }
  // v1 fallback — 8pt stop only
  if (box.stop !== 8) return null;
  const tt = N(row[`tt${box.target}`]);
  const st = N(row.st8);
  if (tt == null) return null;
  if (tt > 0 && (st === 0 || st > tt)) return 1;
  return 0;
}

function bin(rows, fn, bins) {
  const out = bins.map((b) => ({ name: b.name, rows: [] }));
  for (const r of rows) {
    const v = fn(r);
    if (v == null) continue;
    for (let i = 0; i < bins.length; i++) {
      if (bins[i].test(v)) { out[i].rows.push(r); break; }
    }
  }
  return out;
}

function pct(x) { return (x * 100).toFixed(1); }

function rateAtBox(rows, box) {
  let n = 0, w = 0;
  for (const r of rows) {
    const x = winAtBox(r, box);
    if (x == null) continue;
    n++;
    if (x) w++;
  }
  return { n, w, rate: n ? w / n : null };
}

function table(title, sliced, box, base) {
  const lines = [`### ${title} — box ${box.name}`, ``, `| Bin | n | win% | lift vs base (${pct(base.rate)}%) |`, `|---|---:|---:|---:|`];
  for (const s of sliced) {
    const r = rateAtBox(s.rows, box);
    const lift = r.rate != null && base.rate != null ? (r.rate - base.rate) * 100 : null;
    const liftStr = lift == null ? "—" : `${lift >= 0 ? "+" : ""}${lift.toFixed(1)}`;
    lines.push(`| ${s.name} | ${r.n} | ${r.rate == null ? "—" : pct(r.rate)} | ${liftStr} |`);
  }
  lines.push("");
  return lines.join("\n");
}

function analyze(sym) {
  const rows = readMaster(sym);
  const out = [];
  out.push(`# Sweep+Reclaim — ${sym.toUpperCase()} — Conditional Analysis`);
  out.push("");
  out.push(`Total events: **${rows.length}**`);
  out.push("");

  if (rows.length < 20) {
    out.push(`> Sample too small. Collect more events before drawing conclusions.`);
    return out.join("\n");
  }

  for (const box of BOXES) {
    const base = rateAtBox(rows, box);
    out.push(`## Box ${box.name} — base win rate ${pct(base.rate)}% (n=${base.n})`);
    out.push("");

    // Sessions
    out.push(table("Session", bin(rows, (r) => r.sess, [
      { name: "NY",     test: (v) => v === "NY" },
      { name: "London", test: (v) => v === "London" },
      { name: "Asia",   test: (v) => v === "Asia" },
      { name: "Globex", test: (v) => v === "Globex" },
      { name: "Other",  test: (v) => v === "Other" },
    ]), box, base));

    // Side
    out.push(table("Side", bin(rows, (r) => r.side, [
      { name: "Long",  test: (v) => v === "L" },
      { name: "Short", test: (v) => v === "S" },
    ]), box, base));

    // Sweep depth bins
    out.push(table("Sweep depth (pts)", bin(rows, (r) => N(r.swDep), [
      { name: "shallow (<2)",  test: (v) => v < 2 },
      { name: "med (2-4)",     test: (v) => v >= 2 && v < 4 },
      { name: "deep (4-7)",    test: (v) => v >= 4 && v < 7 },
      { name: "very deep (>=7)", test: (v) => v >= 7 },
    ]), box, base));

    // Reclaim lag
    out.push(table("Reclaim lag (bars)", bin(rows, (r) => N(r.swLag), [
      { name: "fast (1-2)", test: (v) => v >= 1 && v <= 2 },
      { name: "med (3-4)",  test: (v) => v >= 3 && v <= 4 },
      { name: "slow (5-6)", test: (v) => v >= 5 && v <= 6 },
    ]), box, base));

    // Ref range
    out.push(table("Ref range (pts)", bin(rows, (r) => N(r.refR), [
      { name: "tight (<12)",  test: (v) => v < 12 },
      { name: "med (12-22)",  test: (v) => v >= 12 && v < 22 },
      { name: "wide (22-35)", test: (v) => v >= 22 && v < 35 },
      { name: "very wide (>=35)", test: (v) => v >= 35 },
    ]), box, base));

    // Regime
    out.push(table("Regime (vs 15m 200MA)", bin(rows, (r) => r.reg, [
      { name: "above MA", test: (v) => v === "A" },
      { name: "below MA", test: (v) => v === "B" },
    ]), box, base));

    // HTF EMA
    out.push(table("HTF EMA trend", bin(rows, (r) => r.htf, [
      { name: "up",   test: (v) => v === "U" },
      { name: "down", test: (v) => v === "D" },
      { name: "flat", test: (v) => v === "F" },
    ]), box, base));

    // VWAP side (signed dist — neg = below VWAP)
    out.push(table("VWAP side (signed pts)", bin(rows, (r) => N(r.vwapD), [
      { name: "below (-)", test: (v) => v < -2 },
      { name: "near (-2..+2)", test: (v) => v >= -2 && v <= 2 },
      { name: "above (+)", test: (v) => v > 2 },
    ]), box, base));

    // Volume z-score
    out.push(table("Volume z-score at reclaim", bin(rows, (r) => N(r.volZ), [
      { name: "quiet (<0)",   test: (v) => v < 0 },
      { name: "normal (0-1)", test: (v) => v >= 0 && v < 1 },
      { name: "high (>=1)",   test: (v) => v >= 1 },
    ]), box, base));

    // Previous candle color
    out.push(table("Prior 15m color", bin(rows, (r) => r.prevCol, [
      { name: "green", test: (v) => v === "G" },
      { name: "red",   test: (v) => v === "R" },
      { name: "doji",  test: (v) => v === "D" },
    ]), box, base));

    out.push("---");
    out.push("");
  }

  // ---------------------------------------------------------------------------
  // 2D cross-tabs: which combinations compound?
  // ---------------------------------------------------------------------------
  const crossBox = BOXES[1]; // use 10/8 as the lens — biggest single-feature lifts cluster here
  const base10 = rateAtBox(rows, crossBox);

  out.push(`## 2D combinations — box ${crossBox.name} (base ${pct(base10.rate)}%)`);
  out.push("");
  out.push(`Each cell shows \`n / win% / lift\`. Lifts in **bold** are ≥ +8pp with n ≥ 15.`);
  out.push("");

  const featureDefs = {
    sess:      [
      ["NY",     (r) => r.sess === "NY"],
      ["London", (r) => r.sess === "London"],
      ["Asia",   (r) => r.sess === "Asia"],
      ["Globex", (r) => r.sess === "Globex"],
      ["Other",  (r) => r.sess === "Other"],
    ],
    swDep: [
      ["shallow (<2)",     (r) => N(r.swDep) < 2],
      ["med (2-4)",        (r) => N(r.swDep) >= 2 && N(r.swDep) < 4],
      ["deep (4-7)",       (r) => N(r.swDep) >= 4 && N(r.swDep) < 7],
      ["very deep (>=7)",  (r) => N(r.swDep) >= 7],
    ],
    refR: [
      ["tight (<12)",   (r) => N(r.refR) < 12],
      ["med (12-22)",   (r) => N(r.refR) >= 12 && N(r.refR) < 22],
      ["wide (22-35)",  (r) => N(r.refR) >= 22 && N(r.refR) < 35],
      ["v.wide (>=35)", (r) => N(r.refR) >= 35],
    ],
    swLag: [
      ["fast (1-2)",  (r) => N(r.swLag) >= 1 && N(r.swLag) <= 2],
      ["med (3-4)",   (r) => N(r.swLag) >= 3 && N(r.swLag) <= 4],
      ["slow (5-6)",  (r) => N(r.swLag) >= 5 && N(r.swLag) <= 6],
    ],
    vwapSide: [
      ["below",  (r) => N(r.vwapD) < -2],
      ["near",   (r) => N(r.vwapD) >= -2 && N(r.vwapD) <= 2],
      ["above",  (r) => N(r.vwapD) > 2],
    ],
  };

  function xtab(rowKey, colKey, title) {
    const rDefs = featureDefs[rowKey];
    const cDefs = featureDefs[colKey];
    const lines = [`### ${title}`, ``, `| ${rowKey} \\ ${colKey} | ${cDefs.map((c) => c[0]).join(" | ")} |`,
      `|---|${cDefs.map(() => "---").join("|")}|`];
    for (const [rName, rTest] of rDefs) {
      const rRows = rows.filter(rTest);
      const cells = [rName];
      for (const [, cTest] of cDefs) {
        const cellRows = rRows.filter(cTest);
        const stat = rateAtBox(cellRows, crossBox);
        if (stat.n === 0) { cells.push("—"); continue; }
        const lift = stat.rate != null && base10.rate != null ? (stat.rate - base10.rate) * 100 : null;
        const strong = lift != null && Math.abs(lift) >= 8 && stat.n >= 15;
        const liftStr = lift == null ? "" : ` (${lift >= 0 ? "+" : ""}${lift.toFixed(0)})`;
        const cellStr = `${stat.n} / ${pct(stat.rate)}${liftStr}`;
        cells.push(strong ? `**${cellStr}**` : cellStr);
      }
      lines.push(`| ${cells.join(" | ")} |`);
    }
    lines.push("");
    return lines.join("\n");
  }

  out.push(xtab("sess",     "swDep",    "Session × Sweep depth"));
  out.push(xtab("sess",     "refR",     "Session × Ref range"));
  out.push(xtab("swDep",    "refR",     "Sweep depth × Ref range"));
  out.push(xtab("swDep",    "swLag",    "Sweep depth × Reclaim lag"));
  out.push(xtab("vwapSide", "swDep",    "VWAP side × Sweep depth"));
  out.push("---");
  out.push("");

  out.push("## Notes");
  out.push("- Bins with n < 20 are noise; bins with n > 100 are reliable.");
  out.push("- Lift ≥ 8pp with n ≥ 20 is the threshold for a hypothesis worth testing live.");
  out.push("- 2D bins with n ≥ 15 are flagged in **bold** when lift ≥ 8pp.");
  out.push("- Box win rates use the in-Pine outcome counters (tt6/tt10/tt15 vs st8). For other box geometries we'd need to re-run the Pine logger.");
  return out.join("\n");
}

const sections = symbols.map(analyze);
fs.writeFileSync(OUT, sections.join("\n\n---\n\n") + "\n");
console.log(`Wrote ${OUT}`);
