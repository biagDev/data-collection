# GC 14:00 Candle — Wick Hit Statistics

How often does GC retrace to the high or low of the 14:00-14:15 ET candle within the next 15 / 30 / 45 minutes after it closes?

## Setup

- **Symbol**: `COMEX:GC1!` (Gold Futures (COMEX), continuous front-month)
- **Timeframe**: 15-minute
- **Subject candle**: 14:00-14:15 ET
- **Sample**: 215 trading days

## Definitions

A "hit" = a subsequent candle's wick traded back to the subject candle's high (≥ H) or low (≤ L). See [analyses/930-candle-hit-stats](../../930-candle-hit-stats/README.md) for the full definitions reference.

Three forward windows (cumulative from 14:15):

- **By 14:30** — the 14:15-14:30 candle (1 candle after subject closes)
- **By 14:45** — adds 14:30-14:45 (2 candles)
- **By 15:00** — adds 14:45-15:00 (3 candles)

## Aggregate Results (n=215)

| Outcome | By 14:30 | By 14:45 | By 15:00 |
|---|---|---|---|
| **Either side** | 169 (78.60%) | 194 (90.23%) | **205 (95.35%)** |
| **Both sides** | 13 (6.05%) | 36 (16.74%) | **52 (24.19%)** |
| High only | 88 (40.93%) | 88 (40.93%) | 84 (39.07%) |
| Low only | 68 (31.63%) | 70 (32.56%) | 69 (32.09%) |
| Neither | 46 (21.40%) | 21 (9.77%) | 10 (4.65%) |
| **High touched (any)** | 101 (46.98%) | 124 (57.67%) | 136 (63.26%) |
| **Low touched (any)** | 81 (37.67%) | 106 (49.30%) | 121 (56.28%) |


## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 42 | 46 | 43 | 42 | 42 |
| By 14:30 | 80.95 | 84.78 | 83.72 | 71.43 | 71.43 |
| By 14:45 | 88.10 | 95.65 | 88.37 | 92.86 | 85.71 |
| By 15:00 | 95.24 | 97.83 | 95.35 | 95.24 | 92.86 |

### Both sides hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| By 14:30 | 9.52 | 4.35 | 6.98 | 2.38 | 7.14 |
| By 14:45 | 19.05 | 13.04 | 20.93 | 14.29 | 16.67 |
| By 15:00 | 21.43 | 26.09 | 27.91 | 23.81 | 21.43 |

### Directional split (counts)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Hi1430 / Lo1430 | 17 / 13 | 20 / 17 | 15 / 18 | 18 / 11 | 18 / 9 |
| Hi1445 / Lo1445 | 17 / 12 | 21 / 17 | 12 / 17 | 20 / 13 | 18 / 11 |
| Hi1500 / Lo1500 | 19 / 12 | 18 / 15 | 12 / 17 | 18 / 12 | 17 / 13 |

## Files

- `pine/1400_hit_stats.pine` — Pine Script source
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown
