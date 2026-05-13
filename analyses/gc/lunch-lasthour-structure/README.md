# GC Lunch / Last-Hour Structure

Four structural questions about the NY regular-session intraday flow on `COMEX:GC1!`:

1. **Morning bias** — does the 9:30→12:00 leg close green or red?
2. **Lunch outcome** — does the 12:00→14:00 leg continue or reverse the morning bias?
3. **Last hour direction** — does 16:00 close above or below the 15:00 close? Split by day-of-week.
4. **Close auction range** — what share of the full RTH range is captured by the final 15-min candle (15:45-16:00)?

## Setup

- **Symbol**: `COMEX:GC1!` (continuous front-month)
- **Timeframe**: 15-minute bars; daily evaluation at the 16:00 ET RTH close
- **Sample**: n=216 trading days
- **As of**: 2026-05-12

## Results

### Morning bias (9:30 → 12:00)

| Direction | Days | % |
|---|---|---|
| Green | 111 | 51.39% |
| Red | 105 | 48.61% |

### Lunch outcome (12:00 → 14:00)

| Lunch direction relative to morning | Days | % |
|---|---|---|
| **Continues** morning bias | 102 | 47.22% |
| **Reverses** morning bias | 114 | 52.78% |

### Last hour direction (15:00 → 16:00)

| Direction | Days | % |
|---|---|---|
| Green (close above 15:00) | 115 | 53.24% |
| Red (close below 15:00) | 99 | 45.83% |

### Last hour by day of week (% green close)

| Day | Green-close days | Sample n | Last-hour green % |
|---|---|---|---|
| Mon | 28 | 42 | **66.67%** ⭐ |
| Tue | 23 | 46 | **50.00%** |
| Wed | 23 | 44 | **52.27%** |
| Thu | 24 | 42 | **57.14%** |
| Fri | 17 | 42 | **40.48%** |


### Close auction range share

The 15:45-16:00 candle accounts for **13.50%** of the full RTH range (9:30-16:00) on average. Larger share = more MOC-flow concentration in the final 15 minutes.

## Files

- `pine/lunch_lasthour.pine` — Pine Script source
- `data/results.json` — full structured results
