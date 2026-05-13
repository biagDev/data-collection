# GC Consecutive-Bar Pattern Statistics

For each 15-min bar, what's the probability the *next* bar is the same color (continuation) vs opposite color (reversal), as a function of the current streak length?

## Setup

- **Symbol**: `COMEX:GC1!` (continuous front-month)
- **Timeframe**: 15-minute
- **Sample**: n=19,933 bars (~11 months of 15m data, includes 24h sessions)
- **As of**: 2026-05-12

## Definitions

- **Streak length** = consecutive same-color (green or red) bars ending on the *prior* bar
- **Continue** = the current bar's color matches the prior bar's color (extends the streak)
- **Reverse** = the current bar's color is opposite (breaks the streak)
- Doji bars (close == open) are excluded from both numerator and denominator

## Results

| Streak length | n bars | Continue % | Reverse % | Counts (cont/rev) |
|---|---|---|---|---|
| **1 bar** | 10,194 | 49.22% | 50.78% | 5,017 / 5,177 |
| **2 bars** | 5,056 | 47.75% | 52.25% | 2,414 / 2,642 |
| **3 bars** | 2,481 | 50.14% | 49.86% | 1,244 / 1,237 |
| **4 bars** | 1,131 | 47.21% | 52.79% | 534 / 597 |
| **5+ bars** | 1,071 | 49.21% | 50.79% | 527 / 544 |
| **Total** | **19,933** | **48.84%** | **51.16%** | — |


## Key finding

**No streak-length edge.** Continuation 47-50% across all streak lengths. Slight reversal bias at 2-bar (52.25% reverse) and 4-bar (52.79% reverse), but these are within sampling noise (CI ±2pp at n=5,056 and ±3pp at n=1,131). Overall 51.16% reversal. Gold's 15m bars are effectively a random walk on direction.

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
