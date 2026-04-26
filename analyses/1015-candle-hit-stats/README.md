# NQ 10:15 Candle — Wick Hit Statistics

How often does NQ retrace to the high or low of the 10:15-10:30 ET candle (the 4th 15-minute candle of the regular session) within the next 15 / 30 / 45 minutes after it closes?

## Setup

- **Symbol**: `CME_MINI:NQ1!` (continuous front-month)
- **Timeframe**: 15-minute
- **Subject candle**: 10:15-10:30 ET
- **Sample**: 232 trading days
- **Data captured**: 2026-04-25

## Definitions

A "hit" = a subsequent candle's wick traded back to the subject candle's high (≥ H) or low (≤ L). See [analyses/930-candle-hit-stats](../930-candle-hit-stats/README.md) for the full definitions reference.

Three forward windows (cumulative from 10:30):

- **By 10:45** — the 10:30-10:45 candle (1 candle after subject closes)
- **By 11:00** — adds the 10:45-11:00 candle (2 candles)
- **By 11:15** — adds the 11:00-11:15 candle (3 candles)

## Aggregate Results (n=232)

| Outcome | By 10:45 | By 11:00 | By 11:15 |
|---|---|---|---|
| **Either side** | 200 (86.21%) | 221 (95.26%) | **230 (99.14%)** |
| **Both sides** | 10 (4.31%) | 42 (18.10%) | **58 (25.00%)** |
| High only | 108 (46.55%) | 97 (41.81%) | 90 (38.79%) |
| Low only | 82 (35.34%) | 82 (35.34%) | 82 (35.34%) |
| Neither | 32 (13.79%) | 11 (4.74%) | **2 (0.86%)** |
| **High touched (any)** | 118 (50.86%) | 139 (59.91%) | **148 (63.79%)** |
| **Low touched (any)** | 92 (39.66%) | 124 (53.45%) | **140 (60.34%)** |

### Key observations

- **The high-side bias is shrinking** — by 11:15, high-touched is 63.8% vs low-touched at 60.3%, the closest spread of any subject candle so far. As the morning progresses, the directional asymmetry from the open compresses.
- **Sweep rate hits 25%** — exactly 1 in 4 days have both sides retested within 45 min of the 10:30 close.
- **99% retest rate by 11:15** — only 2 days in 232 didn't retest either extreme.

## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 47 | 47 | 47 | 45 | 46 |
| By 10:45 | 76.60 | 85.11 | 89.36 | **95.56** | 84.78 |
| By 11:00 | 91.49 | 95.74 | 95.74 | **100.00** | 93.48 |
| By 11:15 | 95.74 | **100.00** | **100.00** | **100.00** | **100.00** |

### Both sides hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| By 10:45 | 0.00 | 4.26 | 8.51 | 4.44 | 4.35 |
| By 11:00 | 19.15 | 21.28 | 14.89 | 15.56 | 19.57 |
| By 11:15 | 23.40 | **29.79** | 25.53 | 22.22 | 23.91 |

### Directional split (counts)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Hi45 / Lo45 | 19 / 17 | 20 / 18 | **23 / 15** | **24 / 17** | **22 / 15** |
| Hi1100 / Lo1100 | 16 / 18 | 18 / 17 | **22 / 16** | 21 / 17 | **20 / 14** |
| Hi1115 / Lo1115 | 16 / 18 | 17 / 16 | 19 / 16 | 18 / 17 | **20 / 15** |

### Notable

- **Thursday is the most reliable** — 95.6% retest by 10:45 (highest of any DOW for any single-candle window in any analysis), and 100% by 11:00.
- **Tuesday hits the highest sweep rate** — 29.79% both-sides by 11:15.

## Files

- `pine/1015_hit_stats.pine` — Pine Script source
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown
