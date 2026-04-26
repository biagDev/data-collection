# NQ 10:00 Candle — Wick Hit Statistics

How often does NQ retrace to the high or low of the 10:00-10:15 ET candle (the 3rd 15-minute candle of the regular session) within the next 15 / 30 / 45 minutes after it closes?

## Setup

- **Symbol**: `CME_MINI:NQ1!` (continuous front-month)
- **Timeframe**: 15-minute
- **Subject candle**: 10:00-10:15 ET
- **Sample**: 232 trading days
- **Data captured**: 2026-04-25

## Definitions

A "hit" = a subsequent candle's wick traded back to the subject candle's high (≥ H) or low (≤ L). See [analyses/930-candle-hit-stats](../930-candle-hit-stats/README.md) for the full definitions reference.

Three forward windows (cumulative from 10:15):

- **By 10:30** — the 10:15-10:30 candle (1 candle after subject closes)
- **By 10:45** — adds the 10:30-10:45 candle (2 candles)
- **By 11:00** — adds the 10:45-11:00 candle (3 candles)

## Aggregate Results (n=232)

| Outcome | By 10:30 | By 10:45 | By 11:00 |
|---|---|---|---|
| **Either side** | 197 (84.91%) | 218 (93.97%) | **231 (99.57%)** |
| **Both sides** | 17 (7.33%) | 38 (16.38%) | **56 (24.14%)** |
| High only | 104 (44.83%) | 103 (44.40%) | 98 (42.24%) |
| Low only | 76 (32.76%) | 77 (33.19%) | 77 (33.19%) |
| Neither | 35 (15.09%) | 14 (6.03%) | **1 (0.43%)** |
| **High touched (any)** | 121 (52.16%) | 141 (60.78%) | **154 (66.38%)** |
| **Low touched (any)** | 93 (40.09%) | 115 (49.57%) | **133 (57.33%)** |

### Key observations

- **Almost certain retrace by 11:00** — 99.57% (231/232) of days retest at least one side of the 10:00 candle within 45 min of its close. Only 1 day in 232 didn't retest either extreme.
- **Sweep rate climbs steadily** — full retraces of both sides go 7% → 16% → 24% across the three windows.
- **Persistent high-bias** — high gets retested more often than low at every window (66% vs 57% by 11:00).

## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 47 | 47 | 47 | 45 | 46 |
| By 10:30 | 85.11 | 78.72 | 87.23 | 86.67 | 86.96 |
| By 10:45 | 93.62 | 91.49 | 95.74 | 95.56 | 93.48 |
| By 11:00 | **100.00** | **100.00** | **100.00** | 97.78 | **100.00** |

### Both sides hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| By 10:30 | 2.13 | 10.64 | 8.51 | 8.89 | 6.52 |
| By 10:45 | 10.64 | 19.15 | 12.77 | **24.44** | 15.22 |
| By 11:00 | 23.40 | 25.53 | 19.15 | **28.89** | 23.91 |

### Directional split (counts)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Hi30 / Lo30 | 21 / 18 | 18 / 14 | **24 / 13** | **22 / 13** | 19 / 18 |
| Hi45 / Lo45 | 21 / 18 | 19 / 15 | **24 / 15** | **21 / 11** | 18 / 18 |
| Hi1100 / Lo1100 | 18 / 18 | **20 / 15** | **22 / 16** | **20 / 11** | 18 / 17 |

## Files

- `pine/1000_hit_stats.pine` — Pine Script source
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown
