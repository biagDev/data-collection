# GC 12:30 Candle — Wick Hit Statistics

How often does GC retrace to the high or low of the 12:30-12:45 ET candle within the next 15 / 30 / 45 minutes after it closes?

## Setup

- **Symbol**: `COMEX:GC1!` (Gold Futures (COMEX), continuous front-month)
- **Timeframe**: 15-minute
- **Subject candle**: 12:30-12:45 ET
- **Sample**: 220 trading days

## Definitions

A "hit" = a subsequent candle's wick traded back to the subject candle's high (≥ H) or low (≤ L). See [analyses/930-candle-hit-stats](../../930-candle-hit-stats/README.md) for the full definitions reference.

Three forward windows (cumulative from 12:45):

- **By 13:00** — the 12:45-13:00 candle (1 candle after subject closes)
- **By 13:15** — adds 13:00-13:15 (2 candles)
- **By 13:30** — adds 13:15-13:30 (3 candles)

## Aggregate Results (n=220)

| Outcome | By 13:00 | By 13:15 | By 13:30 |
|---|---|---|---|
| **Either side** | 176 (80.00%) | 205 (93.18%) | **212 (96.36%)** |
| **Both sides** | 19 (8.64%) | 54 (24.55%) | **80 (36.36%)** |
| High only | 85 (38.64%) | 84 (38.18%) | 71 (32.27%) |
| Low only | 72 (32.73%) | 67 (30.45%) | 61 (27.73%) |
| Neither | 44 (20.00%) | 15 (6.82%) | 8 (3.64%) |
| **High touched (any)** | 104 (47.27%) | 138 (62.73%) | 151 (68.64%) |
| **Low touched (any)** | 91 (41.36%) | 121 (55.00%) | 141 (64.09%) |


## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 45 | 45 | 44 | 43 | 43 |
| By 13:00 | 77.78 | 80.00 | 81.82 | 83.72 | 76.74 |
| By 13:15 | 95.56 | 93.33 | 90.91 | 95.35 | 90.70 |
| By 13:30 | 97.78 | 95.56 | 93.18 | 100.00 | 95.35 |

### Both sides hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| By 13:00 | 11.11 | 6.67 | 11.36 | 4.65 | 9.30 |
| By 13:15 | 33.33 | 31.11 | 20.45 | 20.93 | 16.28 |
| By 13:30 | 40.00 | 44.44 | 34.09 | 34.88 | 27.91 |

### Directional split (counts)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Hi1300 / Lo1300 | 18 / 12 | 16 / 17 | 21 / 10 | 16 / 18 | 14 / 15 |
| Hi1315 / Lo1315 | 16 / 12 | 17 / 11 | 18 / 13 | 15 / 17 | 18 / 14 |
| Hi1330 / Lo1330 | 14 / 12 | 12 / 11 | 16 / 10 | 15 / 13 | 14 / 15 |

## Files

- `pine/1230_hit_stats.pine` — Pine Script source
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown
