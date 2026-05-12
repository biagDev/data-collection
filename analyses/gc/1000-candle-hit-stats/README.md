# GC 10:00 Candle — Wick Hit Statistics

How often does GC retrace to the high or low of the 10:00-10:15 ET candle within the next 15 / 30 / 45 minutes after it closes?

## Setup

- **Symbol**: `COMEX:GC1!` (Gold Futures (COMEX), continuous front-month)
- **Timeframe**: 15-minute
- **Subject candle**: 10:00-10:15 ET
- **Sample**: 222 trading days

## Definitions

A "hit" = a subsequent candle's wick traded back to the subject candle's high (≥ H) or low (≤ L). See [analyses/930-candle-hit-stats](../../930-candle-hit-stats/README.md) for the full definitions reference.

Three forward windows (cumulative from 10:15):

- **By 10:30** — the 10:15-10:30 candle (1 candle after subject closes)
- **By 10:45** — adds 10:30-10:45 (2 candles)
- **By 11:00** — adds 10:45-11:00 (3 candles)

## Aggregate Results (n=222)

| Outcome | By 10:30 | By 10:45 | By 11:00 |
|---|---|---|---|
| **Either side** | 178 (80.18%) | 206 (92.79%) | **208 (93.69%)** |
| **Both sides** | 18 (8.11%) | 43 (19.37%) | **53 (23.87%)** |
| High only | 86 (38.74%) | 89 (40.09%) | 84 (37.84%) |
| Low only | 74 (33.33%) | 74 (33.33%) | 71 (31.98%) |
| Neither | 44 (19.82%) | 16 (7.21%) | 14 (6.31%) |
| **High touched (any)** | 104 (46.85%) | 132 (59.46%) | 137 (61.71%) |
| **Low touched (any)** | 92 (41.44%) | 117 (52.70%) | 124 (55.86%) |


## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 45 | 45 | 45 | 43 | 44 |
| By 10:30 | 77.78 | 82.22 | 86.67 | 79.07 | 75.00 |
| By 10:45 | 97.78 | 97.78 | 93.33 | 95.35 | 79.55 |
| By 11:00 | 97.78 | 97.78 | 95.56 | 95.35 | 81.82 |

### Both sides hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| By 10:30 | 8.89 | 6.67 | 8.89 | 6.98 | 9.09 |
| By 10:45 | 22.22 | 20.00 | 22.22 | 18.60 | 13.64 |
| By 11:00 | 33.33 | 24.44 | 24.44 | 20.93 | 15.91 |

### Directional split (counts)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Hi1030 / Lo1030 | 12 / 19 | 18 / 16 | 20 / 15 | 19 / 12 | 17 / 12 |
| Hi1045 / Lo1045 | 16 / 18 | 20 / 15 | 18 / 14 | 19 / 14 | 16 / 13 |
| Hi1100 / Lo1100 | 14 / 15 | 18 / 15 | 17 / 15 | 19 / 13 | 16 / 13 |

## Files

- `pine/1000_hit_stats.pine` — Pine Script source
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown
