# data-collection

Data collection project that uses the [tradingview-mcp](https://github.com/tradesdontlie/tradingview-mcp) bridge to pull data from a locally running TradingView Desktop app.

## MCP

The TradingView MCP server lives in `tradingview-mcp/` (vendored clone of [tradesdontlie/tradingview-mcp](https://github.com/tradesdontlie/tradingview-mcp)) and is wired up via `.mcp.json`. Run `npm install` inside that folder after cloning.

Requires TradingView Desktop running with `--remote-debugging-port=9222`. Use `tv_launch` from the MCP if it isn't running.
