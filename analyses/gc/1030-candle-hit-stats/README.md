# GC 10:30 Candle — Wick Hit Statistics

How often does GC retrace to the high or low of the 10:30-10:45 ET candle within the next 15 / 30 / 45 minutes after it closes?

## Setup

- **Symbol**: `COMEX:GC1!` (Gold Futures (COMEX), continuous front-month)
- **Timeframe**: 15-minute
- **Subject candle**: 10:30-10:45 ET
- **Sample**: 222 trading days

## Definitions

A "hit" = a subsequent candle's wick traded back to the subject candle's high (≥ H) or low (≤ L). See [analyses/930-candle-hit-stats](../../930-candle-hit-stats/README.md) for the full definitions reference.

Three forward windows (cumulative from 10:45):

- **By 11:00** — the 10:45-11:00 candle (1 candle after subject closes)
- **By 11:15** — adds 11:00-11:15 (2 candles)
- **By 11:30** — adds 11:15-11:30 (3 candles)

## Aggregate Results (n=222)

| Outcome | By 11:00 | By 11:15 | By 11:30 |
|---|---|---|---|
| **Either side** | 189 (85.14%) | 211 (95.05%) | **215 (96.85%)** |
| **Both sides** | 14 (6.31%) | 42 (18.92%) | **57 (25.68%)** |
| High only | 92 (41.44%) | 87 (39.19%) | 84 (37.84%) |
| Low only | 83 (37.39%) | 82 (36.94%) | 74 (33.33%) |
| Neither | 33 (14.86%) | 11 (4.95%) | 7 (3.15%) |
| **High touched (any)** | 106 (47.75%) | 129 (58.11%) | 141 (63.51%) |
| **Low touched (any)** | 97 (43.69%) | 124 (55.86%) | 131 (59.01%) |


## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 45 | 45 | 45 | 43 | 44 |
| By 11:00 | 93.33 | 80.00 | 84.44 | 81.40 | 86.36 |
| By 11:15 | 95.56 | 95.56 | 93.33 | 93.02 | 97.73 |
| By 11:30 | 95.56 | 97.78 | 95.56 | 97.67 | 97.73 |

### Both sides hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| By 11:00 | 4.44 | 4.44 | 4.44 | 6.98 | 11.36 |
| By 11:15 | 28.89 | 17.78 | 13.33 | 18.60 | 15.91 |
| By 11:30 | 35.56 | 24.44 | 17.78 | 27.91 | 22.73 |

### Directional split (counts)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Hi1100 / Lo1100 | 23 / 17 | 18 / 16 | 16 / 20 | 18 / 14 | 17 / 16 |
| Hi1115 / Lo1115 | 17 / 13 | 19 / 16 | 14 / 22 | 20 / 12 | 17 / 19 |
| Hi1130 / Lo1130 | 16 / 11 | 18 / 15 | 15 / 20 | 19 / 11 | 16 / 17 |

## Files

- `pine/1030_hit_stats.pine` — Pine Script source
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown
