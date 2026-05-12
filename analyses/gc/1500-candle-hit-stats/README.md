# GC 15:00 Candle — Wick Hit Statistics

How often does GC retrace to the high or low of the 15:00-15:15 ET candle within the next 15 / 30 / 45 minutes after it closes?

## Setup

- **Symbol**: `COMEX:GC1!` (Gold Futures (COMEX), continuous front-month)
- **Timeframe**: 15-minute
- **Subject candle**: 15:00-15:15 ET
- **Sample**: 215 trading days

## Definitions

A "hit" = a subsequent candle's wick traded back to the subject candle's high (≥ H) or low (≤ L). See [analyses/930-candle-hit-stats](../../930-candle-hit-stats/README.md) for the full definitions reference.

Three forward windows (cumulative from 15:15):

- **By 15:30** — the 15:15-15:30 candle (1 candle after subject closes)
- **By 15:45** — adds 15:30-15:45 (2 candles)
- **By 16:00** — adds 15:45-16:00 (3 candles)

## Aggregate Results (n=215)

| Outcome | By 15:30 | By 15:45 | By 16:00 |
|---|---|---|---|
| **Either side** | 181 (84.19%) | 203 (94.42%) | **208 (96.74%)** |
| **Both sides** | 12 (5.58%) | 33 (15.35%) | **47 (21.86%)** |
| High only | 97 (45.12%) | 95 (44.19%) | 88 (40.93%) |
| Low only | 72 (33.49%) | 75 (34.88%) | 73 (33.95%) |
| Neither | 34 (15.81%) | 12 (5.58%) | 7 (3.26%) |
| **High touched (any)** | 109 (50.70%) | 128 (59.53%) | 135 (62.79%) |
| **Low touched (any)** | 84 (39.07%) | 108 (50.23%) | 120 (55.81%) |


## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 42 | 45 | 44 | 42 | 42 |
| By 15:30 | 85.71 | 86.67 | 86.36 | 80.95 | 80.95 |
| By 15:45 | 95.24 | 93.33 | 90.91 | 97.62 | 95.24 |
| By 16:00 | 97.62 | 97.78 | 93.18 | 97.62 | 97.62 |

### Both sides hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| By 15:30 | 4.76 | 4.44 | 9.09 | 4.76 | 4.76 |
| By 15:45 | 16.67 | 24.44 | 15.91 | 7.14 | 11.90 |
| By 16:00 | 21.43 | 31.11 | 22.73 | 11.90 | 21.43 |

### Directional split (counts)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Hi1530 / Lo1530 | 18 / 16 | 24 / 13 | 22 / 12 | 21 / 11 | 12 / 20 |
| Hi1545 / Lo1545 | 16 / 17 | 20 / 11 | 22 / 11 | 24 / 14 | 13 / 22 |
| Hi1600 / Lo1600 | 15 / 17 | 20 / 10 | 20 / 11 | 22 / 14 | 11 / 21 |

## Files

- `pine/1500_hit_stats.pine` — Pine Script source
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown
