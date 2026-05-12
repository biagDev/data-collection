# GC 11:00 Candle — Wick Hit Statistics

How often does GC retrace to the high or low of the 11:00-11:15 ET candle within the next 15 / 30 / 45 minutes after it closes?

## Setup

- **Symbol**: `COMEX:GC1!` (Gold Futures (COMEX), continuous front-month)
- **Timeframe**: 15-minute
- **Subject candle**: 11:00-11:15 ET
- **Sample**: 222 trading days

## Definitions

A "hit" = a subsequent candle's wick traded back to the subject candle's high (≥ H) or low (≤ L). See [analyses/930-candle-hit-stats](../../930-candle-hit-stats/README.md) for the full definitions reference.

Three forward windows (cumulative from 11:15):

- **By 11:30** — the 11:15-11:30 candle (1 candle after subject closes)
- **By 11:45** — adds 11:30-11:45 (2 candles)
- **By 12:00** — adds 11:45-12:00 (3 candles)

## Aggregate Results (n=222)

| Outcome | By 11:30 | By 11:45 | By 12:00 |
|---|---|---|---|
| **Either side** | 189 (85.14%) | 208 (93.69%) | **214 (96.40%)** |
| **Both sides** | 14 (6.31%) | 49 (22.07%) | **63 (28.38%)** |
| High only | 99 (44.59%) | 92 (41.44%) | 90 (40.54%) |
| Low only | 76 (34.23%) | 67 (30.18%) | 61 (27.48%) |
| Neither | 33 (14.86%) | 14 (6.31%) | 8 (3.60%) |
| **High touched (any)** | 113 (50.90%) | 141 (63.51%) | 153 (68.92%) |
| **Low touched (any)** | 90 (40.54%) | 116 (52.25%) | 124 (55.86%) |


## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 45 | 45 | 45 | 43 | 44 |
| By 11:30 | 84.44 | 88.89 | 88.89 | 83.72 | 79.55 |
| By 11:45 | 91.11 | 93.33 | 100.00 | 90.70 | 93.18 |
| By 12:00 | 95.56 | 100.00 | 100.00 | 90.70 | 95.45 |

### Both sides hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| By 11:30 | 8.89 | 4.44 | 4.44 | 6.98 | 6.82 |
| By 11:45 | 20.00 | 13.33 | 28.89 | 20.93 | 27.27 |
| By 12:00 | 24.44 | 20.00 | 35.56 | 25.58 | 36.36 |

### Directional split (counts)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Hi1130 / Lo1130 | 23 / 11 | 26 / 12 | 14 / 24 | 17 / 16 | 19 / 13 |
| Hi1145 / Lo1145 | 23 / 9 | 22 / 14 | 13 / 19 | 16 / 14 | 18 / 11 |
| Hi1200 / Lo1200 | 24 / 8 | 23 / 13 | 11 / 18 | 15 / 13 | 17 / 9 |

## Files

- `pine/1100_hit_stats.pine` — Pine Script source
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown
