# ES Consecutive-Bar Pattern Statistics

For each 15-min bar, what's the probability the *next* bar is the same color (continuation) vs opposite color (reversal), as a function of the current streak length?

## Setup

- **Symbol**: `CME_MINI:ES1!` (continuous front-month)
- **Timeframe**: 15-minute
- **Sample**: n=18,971 bars (~11 months of 15m data, includes 24h sessions)
- **As of**: 2026-05-12

## Definitions

- **Streak length** = consecutive same-color (green or red) bars ending on the *prior* bar
- **Continue** = the current bar's color matches the prior bar's color (extends the streak)
- **Reverse** = the current bar's color is opposite (breaks the streak)
- Doji bars (close == open) are excluded from both numerator and denominator

## Results

| Streak length | n bars | Continue % | Reverse % | Counts (cont/rev) |
|---|---|---|---|---|
| **1 bar** | 9,625 | 49.26% | 50.74% | 4,741 / 4,884 |
| **2 bars** | 4,813 | 49.82% | 50.18% | 2,398 / 2,415 |
| **3 bars** | 2,323 | 49.03% | 50.97% | 1,139 / 1,184 |
| **4 bars** | 1,157 | 49.18% | 50.82% | 569 / 588 |
| **5+ bars** | 1,053 | 45.68% | 54.32% | 481 / 572 |
| **Total** | **18,971** | **49.17%** | **50.83%** | — |


## Key finding

**Exhausted-streak reversal works on ES — at 5+ consecutive same-color bars, only 45.68% continue (vs 54.32% reverse).** That's a 9pp edge with n=1,053. Streaks of 1-4 bars show no edge (49-50% continue). The reversal effect kicks in only at the long-streak tail. **ES is the only asset of the three with a real consecutive-bar edge.**

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
