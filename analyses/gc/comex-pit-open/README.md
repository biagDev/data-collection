# GC COMEX Pit Open Window — Wick Hit Statistics

How often does GC (Gold Futures) retrace to the high or low of each candle in the comex pit open window within the next 15 / 30 / 45 minutes?

## Why this window matters

The COMEX gold futures pit opens at 8:20 AM ET. The 8:30 AM US data release window (CPI, NFP, initial claims, retail sales, etc.) overlaps. This is gold's most important NY-time anchor — NOT the 9:30 ET equity open used by NQ/ES.

**This is a gold-specific structural anchor** — not used in the NQ/ES analyses, which are anchored to the NY equity 9:30 open.

## Setup

- **Symbol**: `COMEX:GC1!` (Gold Futures, COMEX, continuous front-month)
- **Timeframe**: 15-minute
- **Session window**: 8:00-9:30 AM ET (around COMEX pit open at 8:20 AM ET, plus the 8:30 AM US econ data release window)
- **Subject candles**: Six 15-min candles
- **Sample**: n=223-223 trading days

## Either-side retest (% of days)

| Candle | n | E+15 | E+30 | E+45 |
|---|---|---|---|---|
| **8:00 AM** | 223 | 85.65% | 96.86% | 99.10% |
| **8:15 AM** | 223 | 89.24% | 95.96% | 98.65% |
| **8:30 AM** | 223 | 78.92% | 91.48% | 95.96% |
| **8:45 AM** | 223 | 92.83% | 96.86% | 99.55% |
| **9:00 AM** | 223 | 82.51% | 97.76% | 98.65% |
| **9:15 AM** | 223 | 98.65% | 99.55% | 100.00% |


## Both sides (sweep) retest (% of days)

| Candle | B+15 | B+30 | B+45 |
|---|---|---|---|
| **8:00 AM** | 13.00% | 31.84% | **35.87%** |
| **8:15 AM** | 15.70% | 22.87% | **31.39%** |
| **8:30 AM** | 7.62% | 18.83% | **26.46%** |
| **8:45 AM** | 14.80% | 23.77% | **43.95%** |
| **9:00 AM** | 7.62% | 32.74% | **43.50%** |
| **9:15 AM** | 27.35% | 40.81% | **52.02%** |


## Directional split at +45 min

| Candle | High-any +45 | Low-any +45 | Neither +45 |
|---|---|---|---|
| **8:00 AM** | 69.96% | 65.02% | 0.90% _(bias: high)_ |
| **8:15 AM** | 68.16% | 61.88% | 1.35% _(bias: high)_ |
| **8:30 AM** | 65.02% | 57.40% | 4.04% _(bias: high)_ |
| **8:45 AM** | 73.09% | 70.40% | 0.45% _(bias: high)_ |
| **9:00 AM** | 75.34% | 66.82% | 1.35% _(bias: high)_ |
| **9:15 AM** | 75.78% | 76.23% | 0.00% _(bias: low)_ |


## Comparison to other GC sessions

| GC session | Peak candle | Peak E+15 | Peak B+45 |
|---|---|---|---|
| **COMEX pit open** | **9:15 AM** | **98.65%** ⭐ | **52.02%** ⭐ |
| Asia | 8:45 PM | 96.41% | 47.53% |
| NQ London (compare) | 3:45 AM | 94.98% | 40.64% |
| London | 3:45 AM | 88.29% | 30.18% |
| LBMA Fix | 5:15 AM | 88.29% | 35.14% |

**GC COMEX 9:15 AM ET is the new strongest candle in the entire repo across both retest rate (98.65%) and sweep rate (52.02%).** Beats the prior champion (GC Asia 8:45 PM) by 2.24pp on retest and 4.49pp on sweep.

This makes structural sense: 9:15 AM ET is the 15-min window immediately *before* the NY equity 9:30 open. By 9:15, the 8:30 AM US data release window has resolved, the COMEX pit (open since 8:20) has finished its initial discovery, and the pre-equity-open FX/dollar moves have settled. Gold is at peak two-sided liquidity. Then 9:30 starts a new regime.

**The 8:30 AM dip is also confirmatory**: 78.92% E+15 — the weakest candle in the block. This is the 8:30 ET data release window (CPI, NFP, initial claims, retail sales, etc.). Gold moves *directionally* on these releases and doesn't snap back as fast. This is consistent with the LBMA Fix candle pattern (5:30 AM also weakest in its block).

**Gold's structural anchors are NOT the NY 9:30 equity open** — they're the COMEX pit settling rotation that ends at 9:15 ET, plus the SGE Asian session opening (8:45 PM ET). The repo's earlier finding that "GC 9:30 has only 80% retest" was correct because we were measuring the wrong anchor.

## Files

- `pine/gc_comex_pit_open_retest.pine` — Pine Script source (consolidated 6-candle indicator)
- `data/results.json` — full structured results
