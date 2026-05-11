# Top Retest Windows Magnet

Pine indicator that draws horizontal magnet lines from the high and low of the six highest-probability 15-minute retest candles measured in this repo.

Modified from the original `ORM 9:30-10:15 - NQ` indicator concept: same level-drawing logic, but applied to multiple time windows instead of one.

## What it does

At the close of each enabled subject candle, the indicator:
1. Draws a horizontal line at the candle's **high**, extending forward for N bars (default 4 = 60 min).
2. Draws a horizontal line at the candle's **low**, same forward extension.
3. Optionally draws the 50% midpoint as a dashed line.
4. Optionally marks `✓` on bars where price retests (touches) either level inside the forward window.

## The six windows

Pulled from the repo's top-10 retest-probability ranking, deduplicated by time of day:

| Time (ET) | NQ retest +15m | ES retest +15m | Session |
|---|---|---|---|
| **3:45 AM** | **94.98%** | **93.61%** | London |
| 9:30 AM | 90.09% | 90.87% | NY open |
| 10:15 AM | 86.21% | 90.41% | NY |
| 10:30 AM | 89.22% | 86.76% | NY |
| 8:45 PM | 89.09% | 90.00% | Asia |
| 9:15 PM | 89.04% | 91.78% | Asia |

Each window has its own toggle in the indicator settings.

## Inputs

**Windows** — six booleans, one per subject candle. Default all on.

**Display**:
- `Forward bars to extend each level` (default 4 = 60 min). Controls how far forward the H/L lines project.
- `Show level labels` — turns on the right-edge labels showing window name + price.
- `Show midpoint line (50%)` — adds a dashed mid line.
- `Highlight when level is hit` — places a ✓ marker on bars where the level is retested.

**Colors** — one color per session (London/NY/Asia) plus a "hit" color.

## Defaults to know

- Forward extension is **4 × 15m = 60 min**. The underlying stats measure retests within +15, +30, and +45 minutes; the 4-bar extension gives one buffer bar past the +45 window.
- Labels render at the right edge of each level for readability.
- Hit markers (`✓`) are tiny and won't clutter; turn off if you don't want them.

## Visualization conventions

- **Cyan** lines = London 3:45 (highest-probability single candle in the repo)
- **Blue** lines = NY session candles (9:30 / 10:15 / 10:30)
- **Purple** lines = Asia session candles (8:45 PM / 9:15 PM)
- **Orange** ✓ = retest hit marker

## Where the stats come from

Source analyses backing each window:
- 3:45 ET: [analyses/london-candle-hit-stats](../../analyses/london-candle-hit-stats) (NQ) + [analyses/es/london-candle-hit-stats](../../analyses/es/london-candle-hit-stats) (ES)
- 9:30 ET: [analyses/930-candle-hit-stats](../../analyses/930-candle-hit-stats) (NQ) + [analyses/es/930-candle-hit-stats](../../analyses/es/930-candle-hit-stats) (ES)
- 10:15 ET, 10:30 ET: corresponding candle-hit-stats folders in both NQ and ES
- 8:45 PM / 9:15 PM ET: [analyses/asia-candle-hit-stats](../../analyses/asia-candle-hit-stats) (NQ) + [analyses/es/asia-candle-hit-stats](../../analyses/es/asia-candle-hit-stats) (ES)

## Installation

1. Open the Pine Editor in TradingView Desktop.
2. Paste the contents of [`top_retest_windows_magnet.pine`](top_retest_windows_magnet.pine).
3. Save and Add to chart.

Designed for 15-minute charts on NQ1! or ES1! with ETH (electronic trading hours / extended session) enabled — the Asia and London windows only have bars when the chart shows overnight data.

## Differences from the original ORM 9:30-10:15

- Original: one 45-min OR window (9:30-10:15) drawn as a single range.
- This version: six individual 15-min candle windows, each drawn separately. Same H/L magnet logic, just applied to the highest-probability candles we identified.
- Original had additional scoring/bias/scorecard machinery — this version is just the level-drawing core. If you want the scoring layer back, port it window-by-window.
