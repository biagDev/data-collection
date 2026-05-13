# NQ Consecutive-Bar Pattern Statistics

For each 15-min bar, what's the probability the *next* bar is the same color (continuation) vs opposite color (reversal), as a function of the current streak length?

## Setup

- **Symbol**: `CME_MINI:NQ1!` (continuous front-month)
- **Timeframe**: 15-minute
- **Sample**: n=20,102 bars (~11 months of 15m data, includes 24h sessions)
- **As of**: 2026-05-12

## Definitions

- **Streak length** = consecutive same-color (green or red) bars ending on the *prior* bar
- **Continue** = the current bar's color matches the prior bar's color (extends the streak)
- **Reverse** = the current bar's color is opposite (breaks the streak)
- Doji bars (close == open) are excluded from both numerator and denominator

## Results

| Streak length | n bars | Continue % | Reverse % | Counts (cont/rev) |
|---|---|---|---|---|
| **1 bar** | 10,181 | 49.28% | 50.72% | 5,017 / 5,164 |
| **2 bars** | 5,096 | 48.88% | 51.12% | 2,491 / 2,605 |
| **3 bars** | 2,453 | 50.02% | 49.98% | 1,227 / 1,226 |
| **4 bars** | 1,193 | 49.96% | 50.04% | 596 / 597 |
| **5+ bars** | 1,179 | 49.79% | 50.21% | 587 / 592 |
| **Total** | **20,102** | **49.34%** | **50.66%** | — |


## Key finding

**No meaningful streak-length edge.** Continuation hovers at 49-50% across all streak lengths 1-5+. The classic 'buy after 3 red bars / sell after 3 green bars' heuristic has **zero statistical basis** on NQ 15m bars. Slight reversal bias overall (50.66%), but well within sampling noise.

## Cross-market comparison

| Streak length | NQ continue% | ES continue% | GC continue% |
|---|---|---|---|
| 1 bar | 49.28% | 49.26% | 49.22% |
| 2 bars | 48.88% | 49.82% | 47.75% |
| 3 bars | 50.02% | 49.03% | 50.14% |
| 4 bars | 49.96% | 49.18% | 47.21% |
| **5+ bars** | 49.79% | **45.68%** ⭐ | 49.21% |
| **Total** | 49.34% | 49.17% | 48.84% |

All three markets cluster near 50/50 — **the consecutive-bar / streak heuristic has essentially no edge at the 15m timeframe**, with one exception: ES shows a 4-5pp reversal edge at the long-streak tail (5+ bars). Even that's only a 9pp net edge after accounting for the base reversal rate.

Practical reading: at the 15m scale, "the trend is your friend" and "the trend is exhausted, fade it" are both myths for indices and gold. You need a real structural signal (session anchors, magnetic candles, regime filters), not bar-count heuristics.

## Files

- `pine/consec_bars.pine` — Pine Script source
- `data/results.json` — full structured results
