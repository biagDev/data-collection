# NQ 6 AM ET 4-Hour Candle — Wick Hit Statistics

How often does NQ retrace to the high or low of the **4-hour candle that opens at 6:00 AM ET and closes at 10:00 AM ET**, before 10:30 or before 11:00?

This is the wide pre-market-into-RTH-open candle that contains the 8:30 ET data drops, the 9:30 RTH open, and the first 30 min of regular session.

## Setup

- **Symbol**: `CME_MINI:NQ1!` (continuous front-month)
- **Subject candle**: 6:00-10:00 ET (4-hour bar — the one opening at 6 AM ET on the 4h chart)
- **Forward windows**:
  - **By 10:30** — 10:00-10:30 ET (next 30 minutes after subject closes)
  - **By 11:00** — 10:00-11:00 ET (next 60 minutes)
- **Sample**: 232 trading days
- **Method**: Run on the 15-minute chart. The 4h candle's H = max of all 15m highs from 6:00 to 9:45 ET; L = min of those lows. Forward windows tracked across 2 (by 10:30) or 4 (by 11:00) subsequent 15m bars.

## Aggregate Results (n=232)

| Outcome | By 10:30 | By 11:00 |
|---|---|---|
| **Either side** | 156 (**67.24%**) | 188 (**81.03%**) |
| Both sides | 4 (1.72%) | 8 (3.45%) |
| High only | 84 (36.21%) | 97 (41.81%) |
| Low only | 68 (29.31%) | 83 (35.78%) |
| Neither | **76 (32.76%)** | 44 (18.97%) |
| **High touched (any)** | 88 (37.93%) | 105 (45.26%) |
| **Low touched (any)** | 72 (31.03%) | 91 (39.22%) |

### Probability summary (the question you asked)

- **By 10:30**: ~**67%** chance either the high or low of the 6 AM 4h candle gets hit.
- **By 11:00**: ~**81%** chance either side gets hit.

Equivalently:
- About **1 in 3 days** (32.76%) the price expands away from the 6 AM 4h range and never retests either extreme by 10:30.
- That drops to about **1 in 5 days** (18.97%) by 11:00.

### Why the rates are lower than the 15m candle stats

The 6 AM 4h candle is much **wider** than a single 15m candle — its H and L are the extremes of 4 hours of price action. Retesting one of those extremes inside a 30 or 60 min window means price has to travel further. So:

- **Both-sides sweep is rare** (1.72-3.45%) — it's hard to wick out both sides of a 4h candle in 30-60 min.
- **High-side bias persists** but is mild — high gets touched more than low (45.26% vs 39.22% by 11:00) consistent with what we saw on the smaller candles.

## Day-of-Week Breakdown

### Either side hit (%)
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| n | 47 | 47 | 47 | 46 | 45 |
| By 10:30 | 68.09 | 65.96 | **72.34** | 63.04 | 66.67 |
| By 11:00 | **85.11** | 76.60 | **85.11** | 78.26 | 80.00 |

### Directional split — High-only / Low-only counts
| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Hi30 / Lo30 | **28 / 4** | 12 / 18 | 19 / 15 | 11 / 16 | 14 / 15 |
| Hi60 / Lo60 | **29 / 10** | 17 / 18 | 22 / 18 | 13 / 18 | 16 / 19 |

### Day-of-week observations

- **Monday is dramatically high-skewed** — 28 high-only vs 4 low-only by 10:30 (7:1 ratio). This is the most lopsided directional read in any analysis we've run. After the weekend, the 6 AM 4h high gets retested far more often than the low.
- **Tue / Thu / Fri lean low-skewed** — low-only retests outnumber high-only on these days.
- **Wednesday & Monday are most reliable** — 85.11% retest rate by 11:00.
- **Tuesday is the most resistant** — 76.6% (lowest of any DOW). Roughly 1 in 4 Tuesdays the 6 AM range is "blown out and gone" by 11:00.

## Comparison vs. the smaller-candle series

Same 232-day sample, same forward-time framing where comparable:

| Subject candle | "Either" hit by ~T+30min |
|---|---|
| 9:30 (15m) | 90.09% (by 10:00) |
| 9:45 (15m) | 86.21% (by 10:15) |
| **6 AM (4h)** | **67.24% (by 10:30)** |

The wider 4h candle is a much weaker magnet at 30 minutes — its extremes are far more likely to stay untouched than the extremes of a recently-formed 15m candle.

## Files

- `pine/6am_4h_hit_stats.pine` — Pine Script source
- `data/results.json` — full structured results
- `data/aggregate.csv` — aggregate table
- `data/by_dow.csv` — day-of-week breakdown
