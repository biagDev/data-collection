# data-collection

Data collection project that uses the [tradingview-mcp](https://github.com/tradesdontlie/tradingview-mcp) bridge to pull data from a locally running TradingView Desktop app.

## MCP

The TradingView MCP server lives in `tradingview-mcp/` (vendored clone of [tradesdontlie/tradingview-mcp](https://github.com/tradesdontlie/tradingview-mcp)) and is wired up via `.mcp.json`. Run `npm install` inside that folder after cloning.

Requires TradingView Desktop running with `--remote-debugging-port=9222`. Use `tv_launch` from the MCP if it isn't running.

## Convention

Every analysis ships with three layers:

- **`README.md`** — full technical write-up, methodology, all tables
- **`EASY_READ.md`** — plain-English headline tables with friendly column names ("Days in sample" instead of "n", glossary for jargon, reliability notes). Start here if you don't want to read the full technical write-up.
- **`data/*.csv` / `data/results.json`** — machine-readable raw numbers
- **`pine/*.pine`** — Pine Script analytical core for reproducibility

## Analyses

**Current scope: ~79 analyses across NQ (37) + ES (22) + GC (20) + Globex preliminary.** Most use 15-minute NQ1!/ES1! futures data with 219-232 day samples (~11 months). Daily/weekly stats use 27 years of history. Top-level groupings below; full inventory in [docs/INVENTORY.md](docs/INVENTORY.md) — start there if you want the bird's-eye view.

### NQ Opening-range candle hit-rate series

For each of the first six 15-minute candles of the NQ regular session, we measure how often subsequent candles wick back to the subject candle's high or low. Each analysis includes aggregate + day-of-week breakdown, and `both / high-only / low-only / either / neither` partitions plus `high-any / low-any` totals. Sample = 232 trading days of NQ1! 15m data.

- [analyses/930-candle-hit-stats](analyses/930-candle-hit-stats) — 9:30-9:45 ET candle, measured by 10:00 / 10:15
- [analyses/945-candle-hit-stats](analyses/945-candle-hit-stats) — 9:45-10:00 ET candle, by 10:15 / 10:30 / 10:45 _(corrected; see README note)_
- [analyses/1000-candle-hit-stats](analyses/1000-candle-hit-stats) — 10:00-10:15 ET candle, by 10:30 / 10:45 / 11:00
- [analyses/1015-candle-hit-stats](analyses/1015-candle-hit-stats) — 10:15-10:30 ET candle, by 10:45 / 11:00 / 11:15
- [analyses/1030-candle-hit-stats](analyses/1030-candle-hit-stats) — 10:30-10:45 ET candle, by 11:00 / 11:15 / 11:30
- [analyses/1045-candle-hit-stats](analyses/1045-candle-hit-stats) — 10:45-11:00 ET candle, by 11:15 / 11:30 / 11:45

### NQ afternoon / power-hour candle hit-rate series

Same methodology as the opening-range series, extended into the NY lunch zone and power hour. Sample = 214-222 trading days. **Headline: midday retest rates stay high (96-99% by +45 min, similar to morning); the 15:45 candle is dramatically different — only 84% retest by +45 because cash close at 16:00 kills liquidity and trend continuation dominates.**

- [analyses/1100-candle-hit-stats](analyses/1100-candle-hit-stats) — 11:00-11:15 ET candle, by 11:30 / 11:45 / 12:00. 99% retest by +45.
- [analyses/1130-candle-hit-stats](analyses/1130-candle-hit-stats) — 11:30-11:45 ET candle, by 12:00 / 12:15 / 12:30. 98% retest by +45.
- [analyses/1200-candle-hit-stats](analyses/1200-candle-hit-stats) — 12:00-12:15 ET candle, by 12:30 / 12:45 / 13:00. 98% retest by +45.
- [analyses/1230-candle-hit-stats](analyses/1230-candle-hit-stats) — 12:30-12:45 ET candle, by 13:00 / 13:15 / 13:30. 96% retest by +45, highest lunch-zone sweep rate (35%).
- [analyses/1300-candle-hit-stats](analyses/1300-candle-hit-stats) — 13:00-13:15 ET candle, by 13:30 / 13:45 / 14:00. 99.5% retest by +45.
- [analyses/1400-candle-hit-stats](analyses/1400-candle-hit-stats) — 14:00-14:15 ET candle, by 14:30 / 14:45 / 15:00. 99.5% retest by +45.
- [analyses/1500-candle-hit-stats](analyses/1500-candle-hit-stats) — 15:00-15:15 ET candle, by 15:30 / 15:45 / 16:00. 99% retest by +45, **41% sweep rate** — highest of any candle in the repo (power-hour two-sided volatility).
- [analyses/1545-candle-hit-stats](analyses/1545-candle-hit-stats) — 15:45-16:00 ET candle, by 16:15 / 16:30 / 16:45. Only 84% retest by +45 — cash close breaks the pattern.

### NQ multi-timeframe candle hit-rate

- [analyses/9am-1h-candle-hit-stats](analyses/9am-1h-candle-hit-stats) — 9:00-10:00 ET 1h candle, by 10:15 / 10:30 / 10:45 / 11:00. 66% / 78% / 88% / 91% retest probability.
- [analyses/6am-4h-candle-hit-stats](analyses/6am-4h-candle-hit-stats) — 6:00-10:00 ET 4h candle, by 10:30 / 11:00. 67% / 81% retest probability.

### NQ extended statistics (9 themes)

- [analyses/extended-stats](analyses/extended-stats) — Time-to-retest, max excursion, conditional-on-color, first-touch direction, midpoint mean reversion, HOD/LOD timing, range stats, volume profile, prior-day HL retest. See README inside for the full menu.

### NQ daily patterns

- [analyses/daily-patterns-v1](analyses/daily-patterns-v1) — Streak continuation, close-quartile follow-through, NR7 expansion, gap-fill probability, range-position fade. **~6,700 daily bars (27 years)** of NQ history. Headline: bull streaks continue, NR7 expansion 84%, large gaps don't fill.
- [analyses/daily-patterns-v2](analyses/daily-patterns-v2) — Combined signals (streak + close-quartile) and 200MA regime split for every Vol.1 stat. Headline: 200MA regime is the most important filter we've found — drift signals only work above MA.

### NQ weekly patterns

- [analyses/weekly-patterns-v1](analyses/weekly-patterns-v1) — Weekly streak continuation, NR4 expansion, close-quartile follow-through, inside/outside week patterns, weekly gap fill. **~1,398 weeks (27 years)**. Headline: 5+ green weeks → 66% continue, outside-red weeks reverse 58.5%, top-quartile close → 88.58% take out next week's high.
- [analyses/weekly-patterns-v2](analyses/weekly-patterns-v2) — Tier 2 stats: HOD/LOD by day of week, range-as-pct-of-4w, wick patterns (hammer/shooting star), sequential higher/lower closes. **Headline: Friday makes the weekly high 34% of the time, Monday makes the weekly low 33%. Hammer pattern works (60.5%) but shooting star doesn't (52%). 3-down-week anomaly confirmed via independent method.**

### NQ 9:30 candle followthrough

- [analyses/930-followthrough](analyses/930-followthrough) — When the 9:30 color predicts correctly AND the predicted side gets retested, does today close in that direction? Wide-body green 9:30 + high retest closes green 77% of the time. Average follow-through 1.2x the 9:30 range past the high.
- [analyses/retest-conditional-stats](analyses/retest-conditional-stats) — 9:30 retest rate conditioned on wide-body / 200MA / regime change / VWAP confluence. **Headline: VWAP confluence pushes retest rate from 90% baseline to 97%.**
- [analyses/setup-b-r-distribution](analyses/setup-b-r-distribution) — R-multiple distribution simulating Setup B as a real trade with 1R stop at 9:30 low. **Headline: 77% "close green" rate doesn't survive a 1R stop — average final R is -0.12 with 44% stop-out rate.** Strategy needs wider stop or earlier take-profit.

### NQ pre-market

- [analyses/pm-range-break-and-go](analyses/pm-range-break-and-go) — Does RTH take out the 4:00-9:30 ET pre-market high/low? **Headline: only 1 day in 229 (0.44%) stayed inside the PM range. Green PM → 84% PMH break. Red PM → 83% PML break. Tight PM ranges sweep both sides 53% of the time vs 19% for wide PM ranges.**

### NQ London session

- [analyses/london-candle-hit-stats](analyses/london-candle-hit-stats) — Replication of the NY candle retest series for the London open killzone. Six 15m candles 3:00-4:15 ET, 219-day sample. **Headline: London 3:45 candle has the highest retest rate of any single candle in the repo (95% within 15 min, 99% within 30 min). Beats NY 9:30 (90% / 97%). Sweep rate 41% by +45 min — more than 2x NY 9:30. London open is more magnetic than NY open.**

### NQ Asia session

- [analyses/asia-candle-hit-stats](analyses/asia-candle-hit-stats) — Replication of the NY/London series for the Asia killzone. Six 15m candles 8:00-9:15 PM ET (Tokyo morning), 220-day sample. **Headline: 8:45 PM is the strongest Asia magnet (89% retest +15, 33% sweep +45). 9:15 PM ties with London 3:45 for highest +45 retest in the repo (99.54%). Asia has the strongest HIGH-bias of any session — 17pp Hi/Lo gap at 8:00 PM. Magnetism: London > Asia > NY.**

### Globex 6 PM ET re-open (PRELIMINARY, n=21)

- [analyses/globex-6pm-candle-hit-stats](analyses/globex-6pm-candle-hit-stats) — Six 15m candles 6:00-7:15 PM ET (after the daily 5-6 PM CME settlement break). NQ + ES both included; ES at [analyses/es/globex-6pm-candle-hit-stats](analyses/es/globex-6pm-candle-hit-stats). **Headline: 6:00 PM is the WEAKEST session-open candle ever measured (48-52% retest +15) — Globex re-opens are highly directional. NQ 6:00 PM has 0% sweep rate by +45 and 19% low-any rate (lowest in repo, strong upward bias). 7:15 PM hits 100% retest by +45 with 43-52% sweep — magnetism resumes once initial directional move plays out. Sample = 21 days due to data-depth limitation; treat as preliminary.**

### GC (Gold Futures, COMEX) — multi-asset replication

- [analyses/gc/](analyses/gc/) — 18 analyses on GC (COMEX:GC1!): 14 NY-anchored intraday candle hit-stats + London + Asia + **2 new gold-native session anchors** (LBMA AM Fix window 5:00-6:15 ET, COMEX pit open 8:00-9:15 AM ET). **GC COMEX 9:15 AM ET is the new strongest single-candle magnet in the entire repo: 98.65% retest within 15 min, 100% by +45 min, 52.02% full sweep within 45 min — beats GC Asia 8:45 PM (96.41% / 47.53%) and NQ London 3:45 (94.98% / 40.64%).** The structural insight: gold's true NY-time anchor is the 9:15 AM pre-equity-open settling point (after the 8:30 data window and the COMEX 8:20 open), NOT the NY 9:30 equity open. **GC 8:30 AM is the weakest candle in the COMEX block (78.92% retest +15)** — that's the CPI/NFP/claims data release window where gold moves directionally without snapping back. Other headlines: (1) the NY 9:30 magnet is equity-index-specific — GC gets 80% retest +15 vs NQ/ES ~90%. (2) GC's 9:45 candle slightly beats its 9:30 — gold appears to need one candle to "settle" before mean-reversion kicks in. (3) By +45 min retest rates converge to 97-99% — gold mean-reverts intraday just like indices, just not anchored to 9:30. (4) Lunch-zone sweep rates ~33-36% — comparable to NQ.** See [analyses/gc/EASY_READ.md](analyses/gc/EASY_READ.md) for full comparison. Extended-stats, daily/weekly patterns, sessions, and followthrough chain not yet replicated on GC — ask if you want those.

### ES (S&P 500 E-mini) — multi-asset replication

- [analyses/es/](analyses/es/) — 20 of NQ's 27 analyses replicated on ES. Same methodology, same time windows. **Headline findings: 9:30 candle retest rates virtually identical to NQ (90.87% vs 90.09%). Color-conditional signal (green→75/24, red→27/72) fully replicated. 200MA regime filter universally confirmed. BUT: 3-down-week anomaly does NOT replicate on ES (NQ 41.94%, ES 53.73%). Shooting stars work on ES (60%) but not NQ (52%). ES has bigger excursions before retest but stronger midpoint reversion. ES gap-fill at medium sizes is weaker than NQ.** See [analyses/es/EASY_READ.md](analyses/es/EASY_READ.md) for full comparison table.
