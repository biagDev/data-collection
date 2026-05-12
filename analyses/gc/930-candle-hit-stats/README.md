# GC 09:30 Candle — Wick Hit Statistics

How often does GC retrace to the high or low of the 09:30-09:45 ET candle within the next 15 / 30 / 45 minutes after it closes?

## Setup

- **Symbol**: `COMEX:GC1!` (Gold Futures (COMEX), continuous front-month)
- **Timeframe**: 15-minute
- **Subject candle**: 09:30-09:45 ET
- **Sample**: 222 trading days

## Definitions

A "hit" = a subsequent candle's wick traded back to the subject candle's high (≥ H) or low (≤ L). See [analyses/930-candle-hit-stats](../../930-candle-hit-stats/README.md) for the full definitions reference.

Three forward windows (cumulative from 09:45):

- **By 10:00** — the 09:45-10:00 candle (1 candle after subject closes)
- **By 10:15** — adds 10:00-10:15 (2 candles)
- **By 10:30** — adds 10:15-10:30 (3 candles)

## Aggregate Results (n=222)

| Outcome | By 10:00 | By 10:15 | By 10:30 |
|---|---|---|---|
| **Either side** | 178 (80.18%) | 208 (93.69%) | **215 (96.85%)** |
| **Both sides** | 12 (5.41%) | 40 (18.02%) | **61 (27.48%)** |
| High only | 90 (40.54%) | 85 (38.29%) | 78 (35.14%) |
| Low only | 76 (34.23%) | 83 (37.39%) | 76 (34.23%) |
| Neither | 44 (19.82%) | 14 (6.31%) | 7 (3.15%) |
| **High touched (any)** | 102 (45.95%) | 125 (56.31%) | 139 (62.61%) |
| **Low touched (any)** | 88 (39.64%) | 123 (55.41%) | 137 (61.71%) |


## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 45 | 45 | 45 | 43 | 44 |
| By 10:00 | 73.33 | 84.44 | 82.22 | 81.40 | 79.55 |
| By 10:15 | 93.33 | 93.33 | 95.56 | 93.02 | 93.18 |
| By 10:30 | 95.56 | 100.00 | 97.78 | 95.35 | 95.45 |

### Both sides hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| By 10:00 | 6.67 | 6.67 | 0.00 | 9.30 | 4.55 |
| By 10:15 | 13.33 | 22.22 | 13.33 | 13.95 | 27.27 |
| By 10:30 | 24.44 | 28.89 | 26.67 | 20.93 | 36.36 |

### Directional split (counts)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Hi1000 / Lo1000 | 19 / 11 | 20 / 15 | 17 / 20 | 14 / 17 | 20 / 13 |
| Hi1015 / Lo1015 | 20 / 16 | 15 / 17 | 18 / 19 | 13 / 21 | 19 / 10 |
| Hi1030 / Lo1030 | 18 / 14 | 14 / 18 | 17 / 15 | 13 / 19 | 16 / 10 |

## Files

- `pine/930_hit_stats.pine` — Pine Script source
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown
