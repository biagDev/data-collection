# NQ 10:30 Candle — Wick Hit Statistics

How often does NQ retrace to the high or low of the 10:30-10:45 ET candle within the next 15 / 30 / 45 minutes after it closes?

## Setup

- **Symbol**: `CME_MINI:NQ1!` (continuous front-month)
- **Timeframe**: 15-minute
- **Subject candle**: 10:30-10:45 ET
- **Sample**: 232 trading days

## Definitions

A "hit" = a subsequent candle's wick traded back to the subject candle's high (≥ H) or low (≤ L). See [analyses/930-candle-hit-stats](../930-candle-hit-stats/README.md) for the full definitions reference.

Three forward windows (cumulative from 10:45):

- **By 11:00** — the 10:45-11:00 candle (1 candle after subject closes)
- **By 11:15** — adds 11:00-11:15 (2 candles)
- **By 11:30** — adds 11:15-11:30 (3 candles)

## Aggregate Results (n=232)

| Outcome | By 11:00 | By 11:15 | By 11:30 |
|---|---|---|---|
| **Either side** | 207 (89.22%) | 225 (96.98%) | **228 (98.28%)** |
| **Both sides** | 23 (9.91%) | 49 (21.12%) | **69 (29.74%)** |
| High only | 87 (37.50%) | 81 (34.91%) | 78 (33.62%) |
| Low only | 97 (41.81%) | 95 (40.95%) | 81 (34.91%) |
| Neither | 25 (10.78%) | 7 (3.02%) | 4 (1.72%) |
| **High touched (any)** | 110 (47.41%) | 130 (56.03%) | 147 (63.36%) |
| **Low touched (any)** | **120 (51.72%)** | **144 (62.07%)** | **150 (64.66%)** |

### Key observations

- **Directional bias FLIPS at 10:30** — for the first time in the series, **low gets touched more often than high** at every window (e.g. 51.72% vs 47.41% by 11:00). The morning's high-bias is gone.
- **Sweep rate hits 29.7%** — nearly 1 in 3 days have both sides retested within 45 min.
- **Highest sweep rate observed so far** (across all 6 candles studied).

## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 47 | 47 | 47 | 45 | 46 |
| By 11:00 | 87.23 | 93.62 | 91.49 | 82.22 | 91.30 |
| By 11:15 | 97.87 | 97.87 | **100.00** | 95.56 | 93.48 |
| By 11:30 | 97.87 | 97.87 | **100.00** | 97.78 | 97.83 |

### Both sides hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| By 11:00 | 6.38 | 14.89 | 10.64 | 6.67 | 10.87 |
| By 11:15 | 12.77 | 29.79 | 25.53 | 15.56 | 21.74 |
| By 11:30 | 19.15 | 34.04 | **36.17** | 28.89 | 30.43 |

### Directional split (counts)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Hi1100 / Lo1100 | 18 / 20 | 15 / **22** | 20 / 18 | 18 / 16 | 16 / **21** |
| Hi1115 / Lo1115 | 20 / 20 | 13 / **19** | 16 / **19** | 18 / 18 | 14 / **19** |
| Hi1130 / Lo1130 | 19 / 18 | 13 / **17** | 14 / **16** | 18 / 13 | 14 / **17** |

### Notable

- **Wednesday is the new sweep day** — 36.17% both-sides by 11:30, beating Tuesday for the first time in the series.
- **Tuesday/Friday lean firmly bearish** at 11:00 — low-only hits significantly outpace high-only.

## Files

- `pine/1030_hit_stats.pine` — Pine Script source
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown
