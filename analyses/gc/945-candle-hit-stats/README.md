# GC 09:45 Candle — Wick Hit Statistics

How often does GC retrace to the high or low of the 09:45-10:00 ET candle within the next 15 / 30 / 45 minutes after it closes?

## Setup

- **Symbol**: `COMEX:GC1!` (Gold Futures (COMEX), continuous front-month)
- **Timeframe**: 15-minute
- **Subject candle**: 09:45-10:00 ET
- **Sample**: 222 trading days

## Definitions

A "hit" = a subsequent candle's wick traded back to the subject candle's high (≥ H) or low (≤ L). See [analyses/930-candle-hit-stats](../../930-candle-hit-stats/README.md) for the full definitions reference.

Three forward windows (cumulative from 10:00):

- **By 10:15** — the 10:00-10:15 candle (1 candle after subject closes)
- **By 10:30** — adds 10:15-10:30 (2 candles)
- **By 10:45** — adds 10:30-10:45 (3 candles)

## Aggregate Results (n=222)

| Outcome | By 10:15 | By 10:30 | By 10:45 |
|---|---|---|---|
| **Either side** | 200 (90.09%) | 214 (96.40%) | **222 (100.00%)** |
| **Both sides** | 18 (8.11%) | 52 (23.42%) | **69 (31.08%)** |
| High only | 96 (43.24%) | 85 (38.29%) | 80 (36.04%) |
| Low only | 86 (38.74%) | 77 (34.68%) | 73 (32.88%) |
| Neither | 22 (9.91%) | 8 (3.60%) | 0 (0.00%) |
| **High touched (any)** | 114 (51.35%) | 137 (61.71%) | 149 (67.12%) |
| **Low touched (any)** | 104 (46.85%) | 129 (58.11%) | 142 (63.96%) |


## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 45 | 45 | 45 | 43 | 44 |
| By 10:15 | 93.33 | 91.11 | 86.67 | 88.37 | 90.91 |
| By 10:30 | 100.00 | 93.33 | 95.56 | 95.35 | 97.73 |
| By 10:45 | 100.00 | 100.00 | 100.00 | 100.00 | 100.00 |

### Both sides hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| By 10:15 | 11.11 | 15.56 | 2.22 | 6.98 | 4.55 |
| By 10:30 | 31.11 | 28.89 | 24.44 | 16.28 | 15.91 |
| By 10:45 | 33.33 | 35.56 | 37.78 | 25.58 | 22.73 |

### Directional split (counts)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Hi1015 / Lo1015 | 16 / 21 | 12 / 22 | 25 / 13 | 17 / 18 | 26 / 12 |
| Hi1030 / Lo1030 | 12 / 19 | 10 / 19 | 21 / 11 | 19 / 15 | 23 / 13 |
| Hi1045 / Lo1045 | 11 / 19 | 11 / 18 | 18 / 10 | 18 / 14 | 22 / 12 |

## Files

- `pine/945_hit_stats.pine` — Pine Script source
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown
