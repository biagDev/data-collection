# GC London Session — Wick Hit Statistics

How often does GC (Gold Futures) retrace to the high or low of each london 15-min candle within the next 15 / 30 / 45 minutes?

## Setup

- **Symbol**: `COMEX:GC1!` (Gold Futures, COMEX, continuous front-month)
- **Timeframe**: 15-minute
- **Session window**: 3:00 - 5:00 AM ET (London open killzone)
- **Subject candles**: Six 15-min candles
- **Sample**: n=222-223 trading days each

## Definitions

A "hit" = a subsequent candle's wick traded back to the subject candle's high (≥ H) or low (≤ L). See [analyses/930-candle-hit-stats](../../930-candle-hit-stats/README.md) for the full definitions reference.

Forward windows: +15 / +30 / +45 min after subject candle closes.

## Either-side retest (% of days)

| Candle | n | E+15 | E+30 | E+45 |
|---|---|---|---|---|
| **3:00** | 222 | 82.43% | 91.89% | 95.95% |
| **3:15** | 222 | 87.39% | 96.40% | 97.75% |
| **3:30** | 222 | 86.94% | 96.40% | 97.75% |
| **3:45** | 222 | 88.29% | 96.85% | 98.65% |
| **4:00** | 222 | 84.68% | 95.05% | 97.30% |
| **4:15** | 222 | 84.68% | 95.05% | 97.75% |


## Both sides (sweep) retest (% of days)

| Candle | B+15 | B+30 | B+45 |
|---|---|---|---|
| **3:00** | 4.50% | 18.47% | **31.08%** |
| **3:15** | 7.21% | 18.92% | **31.98%** |
| **3:30** | 4.95% | 17.12% | **28.38%** |
| **3:45** | 11.26% | 20.72% | **30.18%** |
| **4:00** | 5.86% | 15.32% | **24.32%** |
| **4:15** | 9.01% | 22.97% | **31.98%** |


## Directional split at +45 min

| Candle | High-any +45 | Low-any +45 | Neither +45 |
|---|---|---|---|
| **3:00** | 63.96% | 63.06% | 4.05% _(bias: high)_ |
| **3:15** | 65.77% | 63.96% | 2.25% _(bias: high)_ |
| **3:30** | 62.61% | 63.51% | 2.25% _(bias: low)_ |
| **3:45** | 68.92% | 59.91% | 1.35% _(bias: high)_ |
| **4:00** | 64.41% | 57.21% | 2.70% _(bias: high)_ |
| **4:15** | 65.32% | 64.41% | 2.25% _(bias: high)_ |


## Comparison to NQ + ES

| Asset | London 3:45 +15 | London 3:45 sweep +45 |
|---|---|---|
| NQ | **94.98%** | 40.64% |
| ES | 93.61% | 38.81% |
| **GC** | **88.29%** | 30.18% |

Gold's London 3:45 candle is the strongest of the GC London set (mirroring NQ/ES), but it's noticeably weaker as a magnet than the equity-index version: **88.29% vs ~94%**. The London open is structurally important for gold (European institutional flow + LBMA AM fix at 10:30 GMT = 5:30 AM ET, *after* this window), but the magnetism is less acute. The +45 retest converges to 98.65% — gold catches up by 45 min.

**No 3:45 spike for sweep rate either**: GC peaks at 3:45 (30.18%) but only marginally above 3:15 (31.98%) and 4:15 (31.98%). On NQ/ES, 3:45 sweep dominates the London block. On GC, sweep rate is roughly uniform across the session.

## Files

- `pine/gc_london_candle_retest.pine` — Pine Script source (consolidated 6-candle indicator)
- `data/results.json` — full structured results
