# NQ 14:00 Candle — Wick Hit Statistics

How often does NQ retrace to the high or low of the 14:00-14:15 ET candle within the next 15 / 30 / 45 minutes after it closes?

## Setup

- **Symbol**: `CME_MINI:NQ1!` (continuous front-month)
- **Timeframe**: 15-minute
- **Subject candle**: 14:00-14:15 ET
- **Sample**: 214 trading days

## Definitions

A "hit" = a subsequent candle's wick traded back to the subject candle's high (≥ H) or low (≤ L). See [analyses/930-candle-hit-stats](../930-candle-hit-stats/README.md) for the full definitions reference.

Three forward windows (cumulative from 14:15):

- **By 14:30** — the 14:15-14:30 candle (1 candle after subject closes)
- **By 14:45** — adds 14:30-14:45 (2 candles)
- **By 15:00** — adds 14:45-15:00 (3 candles)

## Aggregate Results (n=214)

| Outcome | By 14:30 | By 14:45 | By 15:00 |
|---|---|---|---|
| **Either side** | 180 (84.11%) | 207 (96.73%) | **213 (99.53%)** |
| **Both sides** | 19 (8.88%) | 45 (21.03%) | **61 (28.50%)** |
| High only | 88 (41.12%) | 83 (38.79%) | 79 (36.92%) |
| Low only | 73 (34.11%) | 79 (36.92%) | 73 (34.11%) |
| Neither | 34 (15.89%) | 7 (3.27%) | 1 (0.47%) |
| **High touched (any)** | 107 (50.00%) | 128 (59.81%) | 140 (65.42%) |
| **Low touched (any)** | 92 (42.99%) | 124 (57.94%) | 134 (62.62%) |


## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 42 | 45 | 44 | 41 | 42 |
| By 14:30 | 88.10 | 80.00 | 79.55 | 80.49 | 92.86 |
| By 14:45 | 100.00 | 91.11 | 97.73 | 97.56 | 97.62 |
| By 15:00 | 100.00 | 97.78 | 100.00 | 100.00 | 100.00 |

### Both sides hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| By 14:30 | 4.76 | 6.67 | 6.82 | 12.20 | 14.29 |
| By 14:45 | 21.43 | 26.67 | 9.09 | 24.39 | 23.81 |
| By 15:00 | 21.43 | 35.56 | 18.18 | 36.59 | 30.95 |

### Directional split (counts)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Hi1430 / Lo1430 | 22 / 13 | 15 / 18 | 19 / 13 | 14 / 14 | 18 / 15 |
| Hi1445 / Lo1445 | 19 / 14 | 13 / 16 | 22 / 17 | 13 / 17 | 16 / 15 |
| Hi1500 / Lo1500 | 19 / 14 | 13 / 15 | 22 / 14 | 12 / 14 | 13 / 16 |

## Files

- `pine/1400_hit_stats.pine` — Pine Script source
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown
