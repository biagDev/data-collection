# GC 15:45 Candle — Wick Hit Statistics

How often does GC retrace to the high or low of the 15:45-16:00 ET candle within the next 15 / 30 / 45 minutes after it closes?

## Setup

- **Symbol**: `COMEX:GC1!` (Gold Futures (COMEX), continuous front-month)
- **Timeframe**: 15-minute
- **Subject candle**: 15:45-16:00 ET
- **Sample**: 215 trading days

## Definitions

A "hit" = a subsequent candle's wick traded back to the subject candle's high (≥ H) or low (≤ L). See [analyses/930-candle-hit-stats](../../930-candle-hit-stats/README.md) for the full definitions reference.

Three forward windows (cumulative from 16:00):

- **By 16:15** — the 16:00-16:15 candle (1 candle after subject closes)
- **By 16:30** — adds 16:15-16:30 (2 candles)
- **By 16:45** — adds 16:30-16:45 (3 candles)

## Aggregate Results (n=215)

| Outcome | By 16:15 | By 16:30 | By 16:45 |
|---|---|---|---|
| **Either side** | 153 (71.16%) | 182 (84.65%) | **202 (93.95%)** |
| **Both sides** | 16 (7.44%) | 28 (13.02%) | **42 (19.53%)** |
| High only | 66 (30.70%) | 73 (33.95%) | 72 (33.49%) |
| Low only | 71 (33.02%) | 81 (37.67%) | 88 (40.93%) |
| Neither | 62 (28.84%) | 33 (15.35%) | 13 (6.05%) |
| **High touched (any)** | 82 (38.14%) | 101 (46.98%) | 114 (53.02%) |
| **Low touched (any)** | 87 (40.47%) | 109 (50.70%) | 130 (60.47%) |


## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 42 | 45 | 44 | 42 | 42 |
| By 16:15 | 64.29 | 77.78 | 81.82 | 61.90 | 69.05 |
| By 16:30 | 78.57 | 86.67 | 86.36 | 83.33 | 88.10 |
| By 16:45 | 95.24 | 93.33 | 93.18 | 88.10 | 100.00 |

### Both sides hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| By 16:15 | 11.90 | 8.89 | 4.55 | 7.14 | 4.76 |
| By 16:30 | 16.67 | 13.33 | 13.64 | 11.90 | 9.52 |
| By 16:45 | 19.05 | 17.78 | 27.27 | 19.05 | 14.29 |

### Directional split (counts)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Hi1615 / Lo1615 | 11 / 11 | 16 / 15 | 18 / 16 | 13 / 10 | 8 / 19 |
| Hi1630 / Lo1630 | 12 / 14 | 15 / 18 | 17 / 15 | 16 / 14 | 13 / 20 |
| Hi1645 / Lo1645 | 13 / 19 | 16 / 18 | 14 / 15 | 14 / 15 | 15 / 21 |

## Files

- `pine/1545_hit_stats.pine` — Pine Script source
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown
