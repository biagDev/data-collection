# GC Asia Session — Wick Hit Statistics

How often does GC (Gold Futures) retrace to the high or low of each asia 15-min candle within the next 15 / 30 / 45 minutes?

## Setup

- **Symbol**: `COMEX:GC1!` (Gold Futures, COMEX, continuous front-month)
- **Timeframe**: 15-minute
- **Session window**: 8:00 - 10:00 PM ET (Asia killzone — Tokyo + Shanghai Gold Exchange morning)
- **Subject candles**: Six 15-min candles
- **Sample**: n=222-223 trading days each

## Definitions

A "hit" = a subsequent candle's wick traded back to the subject candle's high (≥ H) or low (≤ L). See [analyses/930-candle-hit-stats](../../930-candle-hit-stats/README.md) for the full definitions reference.

Forward windows: +15 / +30 / +45 min after subject candle closes.

## Either-side retest (% of days)

| Candle | n | E+15 | E+30 | E+45 |
|---|---|---|---|---|
| **8:00 PM** | 223 | 79.82% | 91.48% | 94.17% |
| **8:15 PM** | 223 | 82.51% | 92.83% | 97.31% |
| **8:30 PM** | 223 | 87.44% | 95.96% | 96.86% |
| **8:45 PM** | 223 | 96.41% | 97.76% | 98.65% |
| **9:00 PM** | 223 | 74.89% | 89.69% | 94.62% |
| **9:15 PM** | 222 | 90.09% | 98.20% | 98.65% |


## Both sides (sweep) retest (% of days)

| Candle | B+15 | B+30 | B+45 |
|---|---|---|---|
| **8:00 PM** | 7.62% | 15.70% | **22.87%** |
| **8:15 PM** | 6.73% | 23.32% | **38.12%** |
| **8:30 PM** | 9.87% | 36.32% | **44.84%** |
| **8:45 PM** | 29.15% | 40.81% | **47.53%** |
| **9:00 PM** | 3.14% | 14.35% | **21.08%** |
| **9:15 PM** | 17.12% | 29.28% | **36.49%** |


## Directional split at +45 min

| Candle | High-any +45 | Low-any +45 | Neither +45 |
|---|---|---|---|
| **8:00 PM** | 65.02% | 52.02% | 5.83% _(bias: high)_ |
| **8:15 PM** | 74.44% | 60.99% | 2.69% _(bias: high)_ |
| **8:30 PM** | 76.23% | 65.47% | 3.14% _(bias: high)_ |
| **8:45 PM** | 73.54% | 72.65% | 1.35% _(bias: high)_ |
| **9:00 PM** | 60.54% | 55.16% | 5.38% _(bias: high)_ |
| **9:15 PM** | 70.27% | 64.86% | 1.35% _(bias: high)_ |


## Comparison to NQ + ES

| Asset | Asia 8:45 PM +15 | Asia 8:45 PM sweep +45 | Asia 9:15 PM +15 |
|---|---|---|---|
| NQ | 89.09% | 32.73% | 89.04% |
| ES | 90.00% | 33.18% | 91.78% |
| **GC** | **96.41%** | **47.53%** | 90.09% |

**This is the most striking finding in the GC repo so far.**

GC Asia 8:45 PM ET retests within 15 min on **96.41% of days** — the *single highest retest rate of any candle in the entire repo*, beating NQ London 3:45 (94.98%) and every other session high. The sweep rate is even more remarkable: **47.53% of days see BOTH sides of the 8:45 PM candle retested by 9:30 PM** — versus 32-33% on NQ/ES at the same window, and the previous repo record of 40.64% on NQ London 3:45.

**Likely structural driver:** Shanghai Gold Exchange (SGE) trades 9 AM - 11:30 AM Beijing time (CST = ET + 12 in winter, +13 in summer). 8:45 PM ET = 8:45-9:45 AM Beijing, which spans the SGE pre-open through opening rotation. Tokyo / TOCOM gold session is also active. Gold's Asian institutional flow is dramatically more two-sided / mean-reverting at this exact 15-min window than NY/London on equity indices.

**The 9:00 PM dip is also striking**: GC 9:00 PM retests only 74.89% +15 — the weakest candle in the entire Asia block. This may be the post-SGE-open directional commit window. Then 9:15 PM recovers to 90.09%. Gold's Asia magnetism is *very* time-localized.

## Files

- `pine/gc_asia_candle_retest.pine` — Pine Script source (consolidated 6-candle indicator)
- `data/results.json` — full structured results
