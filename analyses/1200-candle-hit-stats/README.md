# NQ 12:00 Candle — Wick Hit Statistics

How often does NQ retrace to the high or low of the 12:00-12:15 ET candle within the next 15 / 30 / 45 minutes after it closes?

## Setup

- **Symbol**: `CME_MINI:NQ1!` (continuous front-month)
- **Timeframe**: 15-minute
- **Subject candle**: 12:00-12:15 ET
- **Sample**: 222 trading days

## Definitions

A "hit" = a subsequent candle's wick traded back to the subject candle's high (≥ H) or low (≤ L). See [analyses/930-candle-hit-stats](../930-candle-hit-stats/README.md) for the full definitions reference.

Three forward windows (cumulative from 12:15):

- **By 12:30** — the 12:15-12:30 candle (1 candle after subject closes)
- **By 12:45** — adds 12:30-12:45 (2 candles)
- **By 13:00** — adds 12:45-13:00 (3 candles)

## Aggregate Results (n=222)

| Outcome | By 12:30 | By 12:45 | By 13:00 |
|---|---|---|---|
| **Either side** | 192 (86.49%) | 213 (95.95%) | **218 (98.20%)** |
| **Both sides** | 17 (7.66%) | 46 (20.72%) | **74 (33.33%)** |
| High only | 95 (42.79%) | 86 (38.74%) | 76 (34.23%) |
| Low only | 80 (36.04%) | 81 (36.49%) | 68 (30.63%) |
| Neither | 30 (13.51%) | 9 (4.05%) | 4 (1.80%) |
| **High touched (any)** | 112 (50.45%) | 132 (59.46%) | 150 (67.57%) |
| **Low touched (any)** | 97 (43.69%) | 127 (57.21%) | 142 (63.96%) |


## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 45 | 45 | 45 | 43 | 44 |
| By 12:30 | 82.22 | 84.44 | 88.89 | 86.05 | 90.91 |
| By 12:45 | 95.56 | 95.56 | 93.33 | 97.67 | 97.73 |
| By 13:00 | 100.00 | 97.78 | 95.56 | 97.67 | 100.00 |

### Both sides hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| By 12:30 | 4.44 | 8.89 | 4.44 | 13.95 | 6.82 |
| By 12:45 | 17.78 | 22.22 | 26.67 | 18.60 | 18.18 |
| By 13:00 | 24.44 | 28.89 | 40.00 | 39.53 | 34.09 |

### Directional split (counts)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Hi1230 / Lo1230 | 15 / 20 | 23 / 11 | 22 / 16 | 13 / 18 | 22 / 15 |
| Hi1245 / Lo1245 | 17 / 18 | 20 / 13 | 15 / 15 | 14 / 20 | 20 / 15 |
| Hi1300 / Lo1300 | 17 / 17 | 19 / 12 | 14 / 11 | 9 / 16 | 17 / 12 |

## Files

- `pine/1200_hit_stats.pine` — Pine Script source
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown
