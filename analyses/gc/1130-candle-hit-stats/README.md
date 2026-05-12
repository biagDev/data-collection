# GC 11:30 Candle — Wick Hit Statistics

How often does GC retrace to the high or low of the 11:30-11:45 ET candle within the next 15 / 30 / 45 minutes after it closes?

## Setup

- **Symbol**: `COMEX:GC1!` (Gold Futures (COMEX), continuous front-month)
- **Timeframe**: 15-minute
- **Subject candle**: 11:30-11:45 ET
- **Sample**: 222 trading days

## Definitions

A "hit" = a subsequent candle's wick traded back to the subject candle's high (≥ H) or low (≤ L). See [analyses/930-candle-hit-stats](../../930-candle-hit-stats/README.md) for the full definitions reference.

Three forward windows (cumulative from 11:45):

- **By 12:00** — the 11:45-12:00 candle (1 candle after subject closes)
- **By 12:15** — adds 12:00-12:15 (2 candles)
- **By 12:30** — adds 12:15-12:30 (3 candles)

## Aggregate Results (n=222)

| Outcome | By 12:00 | By 12:15 | By 12:30 |
|---|---|---|---|
| **Either side** | 187 (84.23%) | 211 (95.05%) | **218 (98.20%)** |
| **Both sides** | 11 (4.95%) | 43 (19.37%) | **56 (25.23%)** |
| High only | 96 (43.24%) | 94 (42.34%) | 92 (41.44%) |
| Low only | 80 (36.04%) | 74 (33.33%) | 70 (31.53%) |
| Neither | 35 (15.77%) | 11 (4.95%) | 4 (1.80%) |
| **High touched (any)** | 107 (48.20%) | 137 (61.71%) | 148 (66.67%) |
| **Low touched (any)** | 91 (40.99%) | 117 (52.70%) | 126 (56.76%) |


## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 45 | 45 | 45 | 43 | 44 |
| By 12:00 | 80.00 | 86.67 | 91.11 | 81.40 | 81.82 |
| By 12:15 | 91.11 | 97.78 | 97.78 | 95.35 | 93.18 |
| By 12:30 | 95.56 | 100.00 | 100.00 | 100.00 | 95.45 |

### Both sides hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| By 12:00 | 4.44 | 6.67 | 6.67 | 2.33 | 4.55 |
| By 12:15 | 28.89 | 17.78 | 20.00 | 16.28 | 13.64 |
| By 12:30 | 31.11 | 22.22 | 22.22 | 30.23 | 20.45 |

### Directional split (counts)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Hi1200 / Lo1200 | 21 / 13 | 21 / 15 | 21 / 17 | 18 / 16 | 15 / 19 |
| Hi1215 / Lo1215 | 17 / 11 | 22 / 14 | 22 / 13 | 19 / 15 | 14 / 21 |
| Hi1230 / Lo1230 | 18 / 11 | 21 / 14 | 22 / 13 | 17 / 13 | 14 / 19 |

## Files

- `pine/1130_hit_stats.pine` — Pine Script source
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown
