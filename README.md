# data-collection

Data collection project that uses the [tradingview-mcp](https://github.com/tradesdontlie/tradingview-mcp) bridge to pull data from a locally running TradingView Desktop app.

## MCP

The TradingView MCP server lives in `tradingview-mcp/` (vendored clone of [tradesdontlie/tradingview-mcp](https://github.com/tradesdontlie/tradingview-mcp)) and is wired up via `.mcp.json`. Run `npm install` inside that folder after cloning.

Requires TradingView Desktop running with `--remote-debugging-port=9222`. Use `tv_launch` from the MCP if it isn't running.

## Analyses

- [analyses/930-candle-hit-stats](analyses/930-candle-hit-stats) — How often does NQ retrace to the high or low of the 9:30 ET 15m opening candle within 15 / 30 minutes? Aggregate + day-of-week breakdown across 232 days.
- [analyses/945-candle-hit-stats](analyses/945-candle-hit-stats) — Same analysis for the 9:45-10:00 ET candle, measured 15 / 30 / 45 min after it closes. 232 days.
