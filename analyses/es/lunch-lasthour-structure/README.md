# ES Lunch / Last-Hour Structure

Four structural questions about the NY regular-session intraday flow on `CME_MINI:ES1!`:

1. **Morning bias** — does the 9:30→12:00 leg close green or red?
2. **Lunch outcome** — does the 12:00→14:00 leg continue or reverse the morning bias?
3. **Last hour direction** — does 16:00 close above or below the 15:00 close? Split by day-of-week.
4. **Close auction range** — what share of the full RTH range is captured by the final 15-min candle (15:45-16:00)?

## Setup

- **Symbol**: `CME_MINI:ES1!` (continuous front-month)
- **Timeframe**: 15-minute bars; daily evaluation at the 16:00 ET RTH close
- **Sample**: n=215 trading days
- **As of**: 2026-05-12

## Results

### Morning bias (9:30 → 12:00)

| Direction | Days | % |
|---|---|---|
| Green | 111 | 51.63% |
| Red | 103 | 47.91% |

### Lunch outcome (12:00 → 14:00)

| Lunch direction relative to morning | Days | % |
|---|---|---|
| **Continues** morning bias | 107 | 49.77% |
| **Reverses** morning bias | 105 | 48.84% |

### Last hour direction (15:00 → 16:00)

| Direction | Days | % |
|---|---|---|
| Green (close above 15:00) | 110 | 51.16% |
| Red (close below 15:00) | 100 | 46.51% |

### Last hour by day of week (% green close)

| Day | Green-close days | Sample n | Last-hour green % |
|---|---|---|---|
| Mon | 24 | 42 | **57.14%** |
| Tue | 20 | 46 | **43.48%** |
| Wed | 26 | 44 | **59.09%** |
| Thu | 25 | 41 | **60.98%** ⭐ |
| Fri | 15 | 42 | **35.71%** ⭐ |


### Close auction range share

The 15:45-16:00 candle accounts for **20.75%** of the full RTH range (9:30-16:00) on average. Larger share = more MOC-flow concentration in the final 15 minutes.

## Files

- `pine/lunch_lasthour.pine` — Pine Script source
- `data/results.json` — full structured results
