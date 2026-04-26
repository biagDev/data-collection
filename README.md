# data-collection

Data collection project that uses the [tradingview-mcp](https://github.com/tradesdontlie/tradingview-mcp) bridge to pull data from a locally running TradingView Desktop app.

## MCP

The TradingView MCP server lives in `tradingview-mcp/` (vendored clone of [tradesdontlie/tradingview-mcp](https://github.com/tradesdontlie/tradingview-mcp)) and is wired up via `.mcp.json`. Run `npm install` inside that folder after cloning.

Requires TradingView Desktop running with `--remote-debugging-port=9222`. Use `tv_launch` from the MCP if it isn't running.

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
