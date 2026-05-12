# GC 10:15 Candle — Wick Hit Statistics

How often does GC retrace to the high or low of the 10:15-10:30 ET candle within the next 15 / 30 / 45 minutes after it closes?

## Setup

- **Symbol**: `COMEX:GC1!` (Gold Futures (COMEX), continuous front-month)
- **Timeframe**: 15-minute
- **Subject candle**: 10:15-10:30 ET
- **Sample**: 222 trading days

## Definitions

A "hit" = a subsequent candle's wick traded back to the subject candle's high (≥ H) or low (≤ L). See [analyses/930-candle-hit-stats](../../930-candle-hit-stats/README.md) for the full definitions reference.

Three forward windows (cumulative from 10:30):

- **By 10:45** — the 10:30-10:45 candle (1 candle after subject closes)
- **By 11:00** — adds 10:45-11:00 (2 candles)
- **By 11:15** — adds 11:00-11:15 (3 candles)

## Aggregate Results (n=222)

| Outcome | By 10:45 | By 11:00 | By 11:15 |
|---|---|---|---|
| **Either side** | 186 (83.78%) | 208 (93.69%) | **212 (95.50%)** |
| **Both sides** | 18 (8.11%) | 44 (19.82%) | **59 (26.58%)** |
| High only | 95 (42.79%) | 91 (40.99%) | 84 (37.84%) |
| Low only | 73 (32.88%) | 73 (32.88%) | 69 (31.08%) |
| Neither | 36 (16.22%) | 14 (6.31%) | 10 (4.50%) |
| **High touched (any)** | 113 (50.90%) | 135 (60.81%) | 143 (64.41%) |
| **Low touched (any)** | 91 (40.99%) | 117 (52.70%) | 128 (57.66%) |


## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 45 | 45 | 45 | 43 | 44 |
| By 10:45 | 82.22 | 80.00 | 88.89 | 83.72 | 84.09 |
| By 11:00 | 95.56 | 86.67 | 97.78 | 93.02 | 95.45 |
| By 11:15 | 95.56 | 91.11 | 97.78 | 95.35 | 97.73 |

### Both sides hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| By 10:45 | 8.89 | 11.11 | 11.11 | 2.33 | 6.82 |
| By 11:00 | 24.44 | 24.44 | 20.00 | 11.63 | 18.18 |
| By 11:15 | 35.56 | 28.89 | 22.22 | 20.93 | 25.00 |

### Directional split (counts)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Hi1045 / Lo1045 | 18 / 15 | 19 / 12 | 19 / 16 | 19 / 16 | 20 / 14 |
| Hi1100 / Lo1100 | 18 / 14 | 17 / 11 | 18 / 17 | 19 / 16 | 19 / 15 |
| Hi1115 / Lo1115 | 15 / 12 | 18 / 10 | 17 / 17 | 18 / 14 | 16 / 16 |

## Files

- `pine/1015_hit_stats.pine` — Pine Script source
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown
