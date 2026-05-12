# GC 10:45 Candle — Wick Hit Statistics

How often does GC retrace to the high or low of the 10:45-11:00 ET candle within the next 15 / 30 / 45 minutes after it closes?

## Setup

- **Symbol**: `COMEX:GC1!` (Gold Futures (COMEX), continuous front-month)
- **Timeframe**: 15-minute
- **Subject candle**: 10:45-11:00 ET
- **Sample**: 222 trading days

## Definitions

A "hit" = a subsequent candle's wick traded back to the subject candle's high (≥ H) or low (≤ L). See [analyses/930-candle-hit-stats](../../930-candle-hit-stats/README.md) for the full definitions reference.

Three forward windows (cumulative from 11:00):

- **By 11:15** — the 11:00-11:15 candle (1 candle after subject closes)
- **By 11:30** — adds 11:15-11:30 (2 candles)
- **By 11:45** — adds 11:30-11:45 (3 candles)

## Aggregate Results (n=222)

| Outcome | By 11:15 | By 11:30 | By 11:45 |
|---|---|---|---|
| **Either side** | 198 (89.19%) | 210 (94.59%) | **213 (95.95%)** |
| **Both sides** | 22 (9.91%) | 47 (21.17%) | **62 (27.93%)** |
| High only | 96 (43.24%) | 92 (41.44%) | 84 (37.84%) |
| Low only | 80 (36.04%) | 71 (31.98%) | 67 (30.18%) |
| Neither | 24 (10.81%) | 12 (5.41%) | 9 (4.05%) |
| **High touched (any)** | 118 (53.15%) | 139 (62.61%) | 146 (65.77%) |
| **Low touched (any)** | 102 (45.95%) | 118 (53.15%) | 129 (58.11%) |


## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 45 | 45 | 45 | 43 | 44 |
| By 11:15 | 88.89 | 91.11 | 88.89 | 93.02 | 84.09 |
| By 11:30 | 91.11 | 95.56 | 95.56 | 97.67 | 93.18 |
| By 11:45 | 93.33 | 95.56 | 95.56 | 100.00 | 95.45 |

### Both sides hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| By 11:15 | 11.11 | 11.11 | 4.44 | 16.28 | 6.82 |
| By 11:30 | 28.89 | 17.78 | 20.00 | 30.23 | 9.09 |
| By 11:45 | 35.56 | 24.44 | 24.44 | 39.53 | 15.91 |

### Directional split (counts)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Hi1115 / Lo1115 | 14 / 21 | 21 / 15 | 23 / 15 | 18 / 15 | 20 / 14 |
| Hi1130 / Lo1130 | 13 / 15 | 22 / 13 | 19 / 15 | 17 / 12 | 21 / 16 |
| Hi1145 / Lo1145 | 12 / 14 | 21 / 11 | 17 / 15 | 14 / 12 | 20 / 15 |

## Files

- `pine/1045_hit_stats.pine` — Pine Script source
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown
