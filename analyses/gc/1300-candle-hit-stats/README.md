# GC 13:00 Candle — Wick Hit Statistics

How often does GC retrace to the high or low of the 13:00-13:15 ET candle within the next 15 / 30 / 45 minutes after it closes?

## Setup

- **Symbol**: `COMEX:GC1!` (Gold Futures (COMEX), continuous front-month)
- **Timeframe**: 15-minute
- **Subject candle**: 13:00-13:15 ET
- **Sample**: 219 trading days

## Definitions

A "hit" = a subsequent candle's wick traded back to the subject candle's high (≥ H) or low (≤ L). See [analyses/930-candle-hit-stats](../../930-candle-hit-stats/README.md) for the full definitions reference.

Three forward windows (cumulative from 13:15):

- **By 13:30** — the 13:15-13:30 candle (1 candle after subject closes)
- **By 13:45** — adds 13:30-13:45 (2 candles)
- **By 14:00** — adds 13:45-14:00 (3 candles)

## Aggregate Results (n=219)

| Outcome | By 13:30 | By 13:45 | By 14:00 |
|---|---|---|---|
| **Either side** | 188 (85.84%) | 210 (95.89%) | **215 (98.17%)** |
| **Both sides** | 32 (14.61%) | 62 (28.31%) | **74 (33.79%)** |
| High only | 79 (36.07%) | 72 (32.88%) | 67 (30.59%) |
| Low only | 77 (35.16%) | 76 (34.70%) | 74 (33.79%) |
| Neither | 31 (14.16%) | 9 (4.11%) | 4 (1.83%) |
| **High touched (any)** | 111 (50.68%) | 134 (61.19%) | 141 (64.38%) |
| **Low touched (any)** | 109 (49.77%) | 138 (63.01%) | 148 (67.58%) |


## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 45 | 45 | 43 | 43 | 43 |
| By 13:30 | 88.89 | 82.22 | 76.74 | 90.70 | 90.70 |
| By 13:45 | 95.56 | 95.56 | 93.02 | 97.67 | 97.67 |
| By 14:00 | 100.00 | 97.78 | 95.35 | 100.00 | 97.67 |

### Both sides hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| By 13:30 | 17.78 | 17.78 | 20.93 | 11.63 | 4.65 |
| By 13:45 | 26.67 | 33.33 | 39.53 | 20.93 | 20.93 |
| By 14:00 | 28.89 | 37.78 | 39.53 | 27.91 | 34.88 |

### Directional split (counts)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Hi1330 / Lo1330 | 18 / 14 | 14 / 15 | 10 / 14 | 17 / 17 | 20 / 17 |
| Hi1345 / Lo1345 | 18 / 13 | 14 / 14 | 7 / 16 | 15 / 18 | 18 / 15 |
| Hi1400 / Lo1400 | 18 / 14 | 13 / 14 | 8 / 16 | 14 / 17 | 14 / 13 |

## Files

- `pine/1300_hit_stats.pine` — Pine Script source
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown
