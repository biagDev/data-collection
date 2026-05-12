# GC 12:00 Candle — Wick Hit Statistics

How often does GC retrace to the high or low of the 12:00-12:15 ET candle within the next 15 / 30 / 45 minutes after it closes?

## Setup

- **Symbol**: `COMEX:GC1!` (Gold Futures (COMEX), continuous front-month)
- **Timeframe**: 15-minute
- **Subject candle**: 12:00-12:15 ET
- **Sample**: 222 trading days

## Definitions

A "hit" = a subsequent candle's wick traded back to the subject candle's high (≥ H) or low (≤ L). See [analyses/930-candle-hit-stats](../../930-candle-hit-stats/README.md) for the full definitions reference.

Three forward windows (cumulative from 12:15):

- **By 12:30** — the 12:15-12:30 candle (1 candle after subject closes)
- **By 12:45** — adds 12:30-12:45 (2 candles)
- **By 13:00** — adds 12:45-13:00 (3 candles)

## Aggregate Results (n=222)

| Outcome | By 12:30 | By 12:45 | By 13:00 |
|---|---|---|---|
| **Either side** | 189 (85.14%) | 210 (94.59%) | **214 (96.40%)** |
| **Both sides** | 12 (5.41%) | 40 (18.02%) | **59 (26.58%)** |
| High only | 82 (36.94%) | 79 (35.59%) | 74 (33.33%) |
| Low only | 95 (42.79%) | 91 (40.99%) | 81 (36.49%) |
| Neither | 33 (14.86%) | 12 (5.41%) | 8 (3.60%) |
| **High touched (any)** | 94 (42.34%) | 119 (53.60%) | 133 (59.91%) |
| **Low touched (any)** | 107 (48.20%) | 131 (59.01%) | 140 (63.06%) |


## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 45 | 45 | 45 | 43 | 44 |
| By 12:30 | 82.22 | 84.44 | 80.00 | 93.02 | 86.36 |
| By 12:45 | 93.33 | 95.56 | 93.33 | 97.67 | 93.18 |
| By 13:00 | 95.56 | 95.56 | 95.56 | 100.00 | 95.45 |

### Both sides hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| By 12:30 | 6.67 | 8.89 | 2.22 | 6.98 | 2.27 |
| By 12:45 | 20.00 | 22.22 | 8.89 | 18.60 | 20.45 |
| By 13:00 | 33.33 | 28.89 | 15.56 | 27.91 | 27.27 |

### Directional split (counts)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Hi1230 / Lo1230 | 20 / 14 | 15 / 19 | 19 / 16 | 14 / 23 | 14 / 23 |
| Hi1245 / Lo1245 | 19 / 14 | 17 / 16 | 21 / 17 | 11 / 23 | 11 / 21 |
| Hi1300 / Lo1300 | 17 / 11 | 17 / 13 | 19 / 17 | 10 / 21 | 11 / 19 |

## Files

- `pine/1200_hit_stats.pine` — Pine Script source
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown
