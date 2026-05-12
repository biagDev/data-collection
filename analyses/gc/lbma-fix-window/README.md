# GC LBMA AM Fix Window — Wick Hit Statistics

How often does GC (Gold Futures) retrace to the high or low of each candle in the lbma am fix window within the next 15 / 30 / 45 minutes?

## Why this window matters

The LBMA Gold Fix is set twice daily by London bullion banks. The AM Fix at 10:30 GMT (5:30 AM ET) anchors European institutional gold pricing.

**This is a gold-specific structural anchor** — not used in the NQ/ES analyses, which are anchored to the NY equity 9:30 open.

## Setup

- **Symbol**: `COMEX:GC1!` (Gold Futures, COMEX, continuous front-month)
- **Timeframe**: 15-minute
- **Session window**: 5:00-7:00 AM ET (around LBMA AM Fix at 10:30 GMT = 5:30 AM ET)
- **Subject candles**: Six 15-min candles
- **Sample**: n=222-222 trading days

## Either-side retest (% of days)

| Candle | n | E+15 | E+30 | E+45 |
|---|---|---|---|---|
| **5:00 AM** | 222 | 85.14% | 94.59% | 97.30% |
| **5:15 AM** | 222 | 88.29% | 96.40% | 97.75% |
| **5:30 AM** | 222 | 80.63% | 89.64% | 95.05% |
| **5:45 AM** | 222 | 84.23% | 93.69% | 97.75% |
| **6:00 AM** | 222 | 83.78% | 95.95% | 98.20% |
| **6:15 AM** | 222 | 86.94% | 94.59% | 97.75% |


## Both sides (sweep) retest (% of days)

| Candle | B+15 | B+30 | B+45 |
|---|---|---|---|
| **5:00 AM** | 9.46% | 22.97% | **32.43%** |
| **5:15 AM** | 17.12% | 28.38% | **35.14%** |
| **5:30 AM** | 6.76% | 17.57% | **31.98%** |
| **5:45 AM** | 11.26% | 27.48% | **38.29%** |
| **6:00 AM** | 13.06% | 30.18% | **39.64%** |
| **6:15 AM** | 9.91% | 23.42% | **37.84%** |


## Directional split at +45 min

| Candle | High-any +45 | Low-any +45 | Neither +45 |
|---|---|---|---|
| **5:00 AM** | 62.16% | 67.57% | 2.70% _(bias: low)_ |
| **5:15 AM** | 55.86% | 77.03% | 2.25% _(bias: low)_ |
| **5:30 AM** | 63.06% | 63.96% | 4.95% _(bias: low)_ |
| **5:45 AM** | 69.82% | 66.22% | 2.25% _(bias: high)_ |
| **6:00 AM** | 68.92% | 68.92% | 1.80% _(bias: balanced)_ |
| **6:15 AM** | 70.27% | 65.32% | 2.25% _(bias: high)_ |


## Comparison to other GC sessions

| GC session | Peak candle | Peak E+15 | Peak B+45 |
|---|---|---|---|
| LBMA AM Fix window | 5:15 AM | 88.29% | 35.14% |
| London open | 3:45 AM | 88.29% | 30.18% |
| **COMEX pit open** | **9:15 AM** | **98.65%** | **52.02%** |
| Asia | 8:45 PM | 96.41% | 47.53% |

The LBMA window is solid but doesn't show the dramatic anchor effect of COMEX 9:15 AM or Asia 8:45 PM. The 5:30 AM Fix candle itself is the *weakest* of the block (80.63% E+15, 95.05% E+45) — gold tends to move directionally during the fix, not snap back immediately. Mean-reversion picks up 5:45-6:15 (all >95% E+45).

Also notable: **5:15 AM has a 21pp low-bias** (77.03% low-any vs 55.86% high-any at +45) — by far the strongest single-candle low-bias in any GC session. Possibly tied to pre-fix dollar moves.

## Files

- `pine/gc_lbma_am_fix_retest.pine` — Pine Script source (consolidated 6-candle indicator)
- `data/results.json` — full structured results
