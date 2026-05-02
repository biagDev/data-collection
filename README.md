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

### NQ Opening-range candle hit-rate series

For each of the first four 15-minute candles of the NQ regular session, we measure how often subsequent candles wick back to the subject candle's high or low. Each analysis includes aggregate + day-of-week breakdown, and `both / high-only / low-only / either / neither` partitions plus `high-any / low-any` totals. Sample = 232 trading days of NQ1! 15m data.

- [analyses/930-candle-hit-stats](analyses/930-candle-hit-stats) — 9:30-9:45 ET candle, measured by 10:00 / 10:15
- [analyses/945-candle-hit-stats](analyses/945-candle-hit-stats) — 9:45-10:00 ET candle, by 10:15 / 10:30 / 10:45 _(corrected; see README note)_
- [analyses/1000-candle-hit-stats](analyses/1000-candle-hit-stats) — 10:00-10:15 ET candle, by 10:30 / 10:45 / 11:00
- [analyses/1015-candle-hit-stats](analyses/1015-candle-hit-stats) — 10:15-10:30 ET candle, by 10:45 / 11:00 / 11:15
- [analyses/1030-candle-hit-stats](analyses/1030-candle-hit-stats) — 10:30-10:45 ET candle, by 11:00 / 11:15 / 11:30
- [analyses/1045-candle-hit-stats](analyses/1045-candle-hit-stats) — 10:45-11:00 ET candle, by 11:15 / 11:30 / 11:45

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

### NQ 9:30 candle followthrough

- [analyses/930-followthrough](analyses/930-followthrough) — When the 9:30 color predicts correctly AND the predicted side gets retested, does today close in that direction? Wide-body green 9:30 + high retest closes green 77% of the time. Average follow-through 1.2x the 9:30 range past the high.
- [analyses/retest-conditional-stats](analyses/retest-conditional-stats) — 9:30 retest rate conditioned on wide-body / 200MA / regime change / VWAP confluence. **Headline: VWAP confluence pushes retest rate from 90% baseline to 97%.**
- [analyses/setup-b-r-distribution](analyses/setup-b-r-distribution) — R-multiple distribution simulating Setup B as a real trade with 1R stop at 9:30 low. **Headline: 77% "close green" rate doesn't survive a 1R stop — average final R is -0.12 with 44% stop-out rate.** Strategy needs wider stop or earlier take-profit.
