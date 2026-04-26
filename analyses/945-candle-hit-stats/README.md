# NQ 9:45 Candle — Wick Hit Statistics

How often does NQ retrace to the high or low of the 9:45-10:00 ET candle (the 2nd 15-minute candle of the regular session) within the next 15 / 30 / 45 minutes after it closes?

> **Correction note (2026-04-25):** the initial run had an off-by-one bug — the Pine bar conditions used `h==10, m==15` to refer to the "1st post-candle" but in TradingView that bar covers 10:15-10:30, not 10:00-10:15 (Pine's `time` is the bar's open time). The numbers below are the corrected version that includes the immediate 10:00-10:15 candle. See git history for the buggy version.

## Setup

- **Symbol**: `CME_MINI:NQ1!` (continuous front-month)
- **Timeframe**: 15-minute
- **Subject candle**: 9:45-10:00 ET
- **Sample**: 232 trading days
- **Data captured**: 2026-04-25

## Definitions

A "hit" = a subsequent candle's wick traded back to the subject candle's high (≥ H) or low (≤ L).

| Bucket | Meaning |
|---|---|
| Either side | High OR low was retraced |
| Both sides | High AND low both retraced (full sweep) |
| High only | High retraced, low did NOT |
| Low only | Low retraced, high did NOT |
| Neither | Neither extreme was retraced |
| High touched (any) | `high_only + both` |
| Low touched (any) | `low_only + both` |

Three forward windows (each cumulative from 10:00):

- **By 10:15** — the 10:00-10:15 candle (1 candle after subject closes)
- **By 10:30** — adds the 10:15-10:30 candle (2 candles)
- **By 10:45** — adds the 10:30-10:45 candle (3 candles)

## Aggregate Results (n=232)

| Outcome | By 10:15 | By 10:30 | By 10:45 |
|---|---|---|---|
| **Either side** | 200 (86.21%) | 217 (93.53%) | **226 (97.41%)** |
| **Both sides** | 13 (5.60%) | 31 (13.36%) | **52 (22.41%)** |
| High only | 104 (44.83%) | 101 (43.53%) | 98 (42.24%) |
| Low only | 83 (35.78%) | 85 (36.64%) | 76 (32.76%) |
| Neither | 32 (13.79%) | 15 (6.47%) | 6 (2.59%) |
| **High touched (any)** | 117 (50.43%) | 132 (56.90%) | **150 (64.66%)** |
| **Low touched (any)** | 96 (41.38%) | 116 (50.00%) | **128 (55.17%)** |

## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 47 | 47 | 47 | 45 | 46 |
| By 10:15 | 85.11 | 89.36 | 91.49 | 77.78 | 86.96 |
| By 10:30 | 93.62 | 91.49 | 95.74 | 91.11 | 95.65 |
| By 10:45 | 97.87 | 95.74 | **100.00** | 95.56 | 97.83 |

### Both sides hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| By 10:15 | 4.26 | 8.51 | 2.13 | 8.89 | 4.35 |
| By 10:30 | 8.51 | 19.15 | 10.64 | 17.78 | 10.87 |
| By 10:45 | 17.02 | **34.04** | 17.02 | 28.89 | 15.22 |

### Directional split (counts)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Hi15 / Lo15 | **29 / 9** | 16 / 22 | 25 / 17 | 17 / 14 | 17 / 21 |
| Hi30 / Lo30 | **30 / 10** | 14 / 20 | 23 / 17 | 16 / 17 | 18 / 21 |
| Hi45 / Lo45 | **27 / 11** | 14 / 15 | 22 / 17 | 16 / 14 | 19 / 19 |

## Files

- `pine/945_hit_stats.pine` — Pine Script source (corrected version)
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown
