# Repo Inventory

Complete index of every analysis in `analyses/`, organized by topic. **79 analyses total.**

## NQ analyses (35)

### NQ intraday candle retest series — 15m, n≈214-232 days
| # | Folder | Subject |
|---|---|---|
| 1 | [930-candle-hit-stats](../analyses/930-candle-hit-stats) | 9:30-9:45 ET |
| 2 | [945-candle-hit-stats](../analyses/945-candle-hit-stats) | 9:45-10:00 ET |
| 3 | [1000-candle-hit-stats](../analyses/1000-candle-hit-stats) | 10:00-10:15 ET |
| 4 | [1015-candle-hit-stats](../analyses/1015-candle-hit-stats) | 10:15-10:30 ET |
| 5 | [1030-candle-hit-stats](../analyses/1030-candle-hit-stats) | 10:30-10:45 ET |
| 6 | [1045-candle-hit-stats](../analyses/1045-candle-hit-stats) | 10:45-11:00 ET |
| 7 | [1100-candle-hit-stats](../analyses/1100-candle-hit-stats) | 11:00-11:15 ET _(afternoon batch)_ |
| 8 | [1130-candle-hit-stats](../analyses/1130-candle-hit-stats) | 11:30-11:45 ET _(afternoon batch)_ |
| 9 | [1200-candle-hit-stats](../analyses/1200-candle-hit-stats) | 12:00-12:15 ET _(afternoon batch)_ |
| 10 | [1230-candle-hit-stats](../analyses/1230-candle-hit-stats) | 12:30-12:45 ET _(afternoon batch)_ |
| 11 | [1300-candle-hit-stats](../analyses/1300-candle-hit-stats) | 13:00-13:15 ET _(afternoon batch)_ |
| 12 | [1400-candle-hit-stats](../analyses/1400-candle-hit-stats) | 14:00-14:15 ET _(afternoon batch)_ |
| 13 | [1500-candle-hit-stats](../analyses/1500-candle-hit-stats) | 15:00-15:15 ET _(afternoon batch)_ |
| 14 | [1545-candle-hit-stats](../analyses/1545-candle-hit-stats) | 15:45-16:00 ET _(afternoon batch — pre-close)_ |
| 15 | [9am-1h-candle-hit-stats](../analyses/9am-1h-candle-hit-stats) | 9:00-10:00 1h |
| 16 | [6am-4h-candle-hit-stats](../analyses/6am-4h-candle-hit-stats) | 6:00-10:00 4h |

### NQ extended intraday stats (9 themes around 9:30)
| # | Folder | What it measures |
|---|---|---|
| 17 | [extended-stats/01-prior-day-hl-retest](../analyses/extended-stats/01-prior-day-hl-retest) | Does today retest yesterday's RTH H/L |
| 18 | [extended-stats/02-time-to-retest](../analyses/extended-stats/02-time-to-retest) | Distribution of when first retest happens |
| 19 | [extended-stats/03-max-excursion](../analyses/extended-stats/03-max-excursion) | How far past wick before pullback |
| 20 | [extended-stats/04-conditional-on-color](../analyses/extended-stats/04-conditional-on-color) | Green/red 9:30 → 74/21 directional asymmetry |
| 21 | [extended-stats/05-first-touch-direction](../analyses/extended-stats/05-first-touch-direction) | Which side hits first (coin flip without conditioning) |
| 22 | [extended-stats/06-midpoint-mean-reversion](../analyses/extended-stats/06-midpoint-mean-reversion) | Return to 9:30 midpoint |
| 23 | [extended-stats/07-hod-lod-timing](../analyses/extended-stats/07-hod-lod-timing) | When during day HOD/LOD set |
| 24 | [extended-stats/08-range-stats](../analyses/extended-stats/08-range-stats) | 9:30 range vs full day |
| 25 | [extended-stats/09-volume-profile](../analyses/extended-stats/09-volume-profile) | Volume by 15-min bucket through RTH |

### NQ 9:30 setup chain
| # | Folder | What it measures |
|---|---|---|
| 26 | [930-followthrough](../analyses/930-followthrough) | Color + correct retest → today's close direction (77% case) |
| 27 | [retest-conditional-stats](../analyses/retest-conditional-stats) | Retest rate × {wide-body, 200MA, regime change, VWAP confluence}. **VWAP confluence pushes 90% → 97%** |
| 28 | [setup-b-r-distribution](../analyses/setup-b-r-distribution) | Setup B with 1R stop. **-0.12 avg R, 44% stop-out** |

### NQ daily patterns (n≈6,700, 27 years)
| # | Folder | What it measures |
|---|---|---|
| 29 | [daily-patterns-v1](../analyses/daily-patterns-v1) | Streaks, NR7, close-quartile, gap fill, range-position |
| 30 | [daily-patterns-v2](../analyses/daily-patterns-v2) | Vol.1 stats × 200MA regime + combined signals |

### NQ weekly patterns (n≈1,398, 27 years)
| # | Folder | What it measures |
|---|---|---|
| 31 | [weekly-patterns-v1](../analyses/weekly-patterns-v1) | Weekly streaks, NR4, close-quartile, inside/outside, gap fill |
| 32 | [weekly-patterns-v2](../analyses/weekly-patterns-v2) | HOD/LOD by DOW, range vs 4-week, wick patterns, sequential closes |

### NQ pre-market
| # | Folder | What it measures |
|---|---|---|
| 33 | [pm-range-break-and-go](../analyses/pm-range-break-and-go) | RTH break of pre-market (4:00-9:30 ET) H/L |

### NQ session retests (3 killzones)
| # | Folder | Session |
|---|---|---|
| 34 | [london-candle-hit-stats](../analyses/london-candle-hit-stats) | London open killzone 3:00-4:15 ET |
| 35 | [asia-candle-hit-stats](../analyses/asia-candle-hit-stats) | Asia killzone 8:00-9:15 PM ET |

### NQ Globex re-open (preliminary, n=21)
| # | Folder | Session |
|---|---|---|
| 36 | [globex-6pm-candle-hit-stats](../analyses/globex-6pm-candle-hit-stats) | Globex 6:00-7:15 PM ET (small sample) |

---

## GC analyses (18 — all in `analyses/gc/`)

Replication of NQ's intraday candle hit-stats series on `COMEX:GC1!` (Gold Futures). Time windows mirror NQ literally; see [analyses/gc/EASY_READ.md](../analyses/gc/EASY_READ.md) for the comparison summary.

| # | Folder | Subject |
|---|---|---|
| 1 | [gc/930-candle-hit-stats](../analyses/gc/930-candle-hit-stats) | 9:30-9:45 ET |
| 2 | [gc/945-candle-hit-stats](../analyses/gc/945-candle-hit-stats) | 9:45-10:00 ET |
| 3 | [gc/1000-candle-hit-stats](../analyses/gc/1000-candle-hit-stats) | 10:00-10:15 ET |
| 4 | [gc/1015-candle-hit-stats](../analyses/gc/1015-candle-hit-stats) | 10:15-10:30 ET |
| 5 | [gc/1030-candle-hit-stats](../analyses/gc/1030-candle-hit-stats) | 10:30-10:45 ET |
| 6 | [gc/1045-candle-hit-stats](../analyses/gc/1045-candle-hit-stats) | 10:45-11:00 ET |
| 7 | [gc/1100-candle-hit-stats](../analyses/gc/1100-candle-hit-stats) | 11:00-11:15 ET |
| 8 | [gc/1130-candle-hit-stats](../analyses/gc/1130-candle-hit-stats) | 11:30-11:45 ET |
| 9 | [gc/1200-candle-hit-stats](../analyses/gc/1200-candle-hit-stats) | 12:00-12:15 ET |
| 10 | [gc/1230-candle-hit-stats](../analyses/gc/1230-candle-hit-stats) | 12:30-12:45 ET |
| 11 | [gc/1300-candle-hit-stats](../analyses/gc/1300-candle-hit-stats) | 13:00-13:15 ET |
| 12 | [gc/1400-candle-hit-stats](../analyses/gc/1400-candle-hit-stats) | 14:00-14:15 ET |
| 13 | [gc/1500-candle-hit-stats](../analyses/gc/1500-candle-hit-stats) | 15:00-15:15 ET |
| 14 | [gc/1545-candle-hit-stats](../analyses/gc/1545-candle-hit-stats) | 15:45-16:00 ET |
| 15 | [gc/london-candle-hit-stats](../analyses/gc/london-candle-hit-stats) | London 3:00-4:15 ET (6 candles, consolidated) |
| 16 | [gc/asia-candle-hit-stats](../analyses/gc/asia-candle-hit-stats) | Asia 8:00-9:15 PM ET (6 candles, consolidated) |
| 17 | [gc/lbma-fix-window](../analyses/gc/lbma-fix-window) | **GC-native:** LBMA AM Fix window 5:00-6:15 ET (6 candles around 5:30 AM fix) |
| 18 | [gc/comex-pit-open](../analyses/gc/comex-pit-open) | **GC-native:** COMEX pit open 8:00-9:15 AM ET (6 candles around 8:20 open, includes 9:15 — strongest single candle in repo) |

**GC analyses NOT yet replicated** (NQ deep dives — future batches):
- extended-stats (9 themes), daily-patterns v1+v2, weekly-patterns v1+v2
- pm-range-break-and-go, globex 6PM session retest
- 930-followthrough chain, 9am-1h, 6am-4h multi-timeframe

---

## ES analyses (20 — all in `analyses/es/`)

Same methodology as NQ; differences noted in [analyses/es/EASY_READ.md](../analyses/es/EASY_READ.md).

| # | Folder | Mirror of |
|---|---|---|
| 1-6 | [es/930-candle-hit-stats](../analyses/es/930-candle-hit-stats) through [1045-candle-hit-stats](../analyses/es/1045-candle-hit-stats) | NQ NY candle series |
| 7-15 | [es/extended-stats/01-09-*](../analyses/es/extended-stats) | NQ extended-stats themes |
| 16 | [es/pm-range-break-and-go](../analyses/es/pm-range-break-and-go) | NQ pre-market |
| 17 | [es/london-candle-hit-stats](../analyses/es/london-candle-hit-stats) | NQ London |
| 18 | [es/asia-candle-hit-stats](../analyses/es/asia-candle-hit-stats) | NQ Asia |
| 19 | [es/daily-patterns-v1](../analyses/es/daily-patterns-v1) and [v2](../analyses/es/daily-patterns-v2) | NQ daily |
| 20 | [es/weekly-patterns-v1](../analyses/es/weekly-patterns-v1) and [v2](../analyses/es/weekly-patterns-v2) | NQ weekly |
| +1 | [es/globex-6pm-candle-hit-stats](../analyses/es/globex-6pm-candle-hit-stats) | NQ Globex (preliminary) |

**ES analyses NOT yet replicated** (NQ-specific deep dives):
- 9am-1h-candle-hit-stats
- 6am-4h-candle-hit-stats
- 930-followthrough chain
- retest-conditional-stats
- setup-b-r-distribution

---

## Strongest individual edges across both markets

- **9:30 retest rate ~90%** by 10:00, 97% by 10:15 (NQ + ES)
- **Color-conditional**: green 9:30 → 74-75% high retest, red 9:30 → 72-74% low retest (NQ + ES)
- **VWAP confluence → 97% retest** rate (NQ only — not yet replicated on ES)
- **PM color → 84% directional break** (NQ + ES, ES slightly weaker at 80%)
- **Top-quartile weekly close → 88-89% next-week high break** (NQ + ES)
- **200MA regime filter** — drift signals only work above MA (+7-8pp gap, both indices)
- **London 3:45 candle** — 95% retest +15min (NQ), 94% (ES) — strongest single-candle magnet

## Strongest sobering finding

- **Setup B with 1R stop at 9:30 low → -0.12 avg R, 44% stop-out** — high-probability ≠ high-profitability

## Cross-asset findings

- **3-down-week anomaly is NQ-specific** — does NOT replicate on ES (NQ 42% bounce vs ES 54%). Was the most-replicated NQ finding; cross-validation breaks it.
- **Shooting stars work on ES (60%) but not NQ (52%)** — bullish drift suppresses bearish reversals on NQ
- **ES has bigger excursions** (47.74% vs 37.53%) but **stronger midpoint reversion** (84.83% vs 78.92%)
- **ES MOC closing volume 1.45x its 9:30** vs NQ 0.72x — ES dominates closing rotation
- **Globex 6 PM is the most directional session-open** — 0% sweep rate on NQ (preliminary, n=21)

## Session magnetism ranking

By "either side retest within 15 min" for the strongest candle in each session:

| Session | Strongest candle | Either +15 (NQ) | Either +15 (ES) |
|---|---|---|---|
| London | 3:45 ET | **94.98%** | 93.61% |
| NY | 9:30 ET | 90.09% | 90.87% |
| Asia | 8:45-9:15 PM ET | 89.04-89.09% | 90.00-91.78% |
| **Globex (preliminary)** | 7:15 PM ET | 85.71% | 95.24% |

## Audit / corrections

- [`AUDIT.md`](../AUDIT.md) — bugs found and fixed during the project (off-by-one in 9:45, denominator inconsistencies in extended-stats #2/#3), residual caveats (continuous contract roll noise, sample-size CIs).
