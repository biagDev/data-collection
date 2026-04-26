# NQ 9 AM ET 1-Hour Candle — Wick Hit Statistics

How often does NQ retrace to the high or low of the **1-hour candle that opens at 9:00 AM ET and closes at 10:00 AM ET**, before 10:15, 10:30, 10:45, and 11:00?

This candle spans the final pre-market hour through the regular session open at 9:30. Includes the 9:30 RTH open and the first 30 min of regular session inside its range.

## Setup

- **Symbol**: `CME_MINI:NQ1!` (continuous front-month)
- **Subject candle**: 9:00-10:00 ET (1-hour bar)
- **Forward windows**:
  - **By 10:15** — 10:00-10:15 ET (next 15 minutes)
  - **By 10:30** — 10:00-10:30 ET (next 30 minutes)
  - **By 10:45** — 10:00-10:45 ET (next 45 minutes)
  - **By 11:00** — 10:00-11:00 ET (next 60 minutes)
- **Sample**: 232 trading days
- **Method**: Run on the 15-minute chart. The 1h candle's H = max of the 4 fifteen-min bars from 9:00 to 9:45 ET; L = min of those lows. Forward windows tracked across 1-4 subsequent 15m bars.

## Aggregate Results (n=232)

| Outcome | By 10:15 | By 10:30 | By 10:45 | By 11:00 |
|---|---|---|---|---|
| **Either side** | 152 (**65.52%**) | 182 (**78.45%**) | 203 (**87.50%**) | 210 (**90.52%**) |
| Both sides | 2 (0.86%) | 6 (2.59%) | 10 (4.31%) | 16 (6.90%) |
| High only | 84 (36.21%) | 98 (42.24%) | 108 (46.55%) | 105 (45.26%) |
| Low only | 66 (28.45%) | 78 (33.62%) | 85 (36.64%) | 89 (38.36%) |
| Neither | **80 (34.48%)** | 50 (21.55%) | 29 (12.50%) | 22 (9.48%) |
| **High touched (any)** | 86 (37.07%) | 104 (44.83%) | 118 (50.86%) | 121 (52.16%) |
| **Low touched (any)** | 68 (29.31%) | 84 (36.21%) | 95 (40.95%) | 105 (45.26%) |

### Probability summary (the question you asked)

| Window | Probability either H or L gets hit |
|---|---|
| **By 10:15** | **65.52%** |
| **By 10:30** | **78.45%** |
| **By 10:45** | **87.50%** |
| **By 11:00** | **90.52%** |

Equivalently:
- ~1 in 3 days (34.48%) the 9 AM 1h range survives the first 15 min after close untouched.
- That drops to ~1 in 5 by 10:30, ~1 in 8 by 10:45, ~1 in 10 by 11:00.

### Directional bias

- **High-side bias persists** at every window — high gets touched 7-9pp more often than low (e.g. 52.16% vs 45.26% by 11:00).
- **Sweep rate climbs slowly** (0.86% → 6.90%) — much lower than the 15m candle stats since the 1h range is wider.

## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 47 | 47 | 47 | 45 | 46 |
| By 10:15 | 57.45 | 63.83 | 68.09 | 64.44 | **73.91** |
| By 10:30 | 72.34 | 78.72 | 82.98 | 75.56 | **82.61** |
| By 10:45 | 87.23 | 82.98 | **93.62** | 84.44 | 89.13 |
| By 11:00 | 89.36 | 87.23 | **93.62** | 88.89 | **93.48** |

### Both sides hit by 11:00 (%)
| Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|
| 6.38 | 6.38 | 4.26 | **11.11** | 6.52 |

### Directional split (counts)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Hi15 / Lo15 | **23 / 4** | 14 / 16 | 18 / 14 | 14 / 14 | 15 / 18 |
| Hi30 / Lo30 | **29 / 5** | 15 / 20 | 22 / 17 | 15 / 17 | 17 / 19 |
| Hi45 / Lo45 | **31 / 10** | 17 / 19 | 24 / 20 | 17 / 17 | 19 / 19 |
| Hi60 / Lo60 | **28 / 11** | 19 / 19 | 22 / 20 | 17 / 18 | 19 / 21 |

### Day-of-week observations

- **Monday is dramatically high-skewed** — 23:4 hi:lo ratio by 10:15. Same Monday-bullish pattern seen across the 9:30 / 9:45 / 6 AM analyses. After the weekend, NQ drifts up to retest highs first.
- **Friday is the fastest retest** — 73.91% retest within 15 min, 93.48% by 11:00. Tied with Wed for highest by-11:00 rate.
- **Tuesday is the most resistant at first** — only 63.83% retest by 10:15, but catches up to 87.23% by 11:00. Tue also has the heaviest **low-bias** (15:20 hi:lo by 10:30).
- **Wednesday and Friday hit 93.62% / 93.48% by 11:00** — most reliable retest days.
- **Thursday has the highest sweep rate** — 11.11% both-sides by 11:00 (vs 4-7% on other days).

## Comparison vs. other timeframes

Same 232-day sample, retest probability of "either side hit":

| Subject candle | T+15min | T+30min | T+60min |
|---|---|---|---|
| 9:30 (15m) | 90.09% | 96.98% | — |
| **9:00 (1h)** | **65.52%** | **78.45%** | **90.52%** |
| 6:00 (4h) | — | 67.24% | 81.03% |

The 1h candle sits between the 15m and 4h in retest probability — wider range than 15m means slower to retest, but narrower than 4h means faster than the morning-context 4h.

## Files

- `pine/9am_1h_hit_stats.pine` — Pine Script source
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown
