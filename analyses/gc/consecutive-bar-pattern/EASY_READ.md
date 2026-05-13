# GC Consecutive-Bar Pattern — Plain-English Table

If price just printed N green bars in a row (or N red bars in a row), what's the probability the *next* 15-min bar is the same color?

(Sample = 19,933 bars of COMEX:GC1! 15-min data, ~11 months)

| If the prior streak is... | ... how often does the next bar continue? | (n) |
|---|---|---|
| **1 same-color bar** | 49.22% | 10,194 |
| **2 same-color bars** | 47.75% | 5,056 |
| **3 same-color bars** | 50.14% | 2,481 |
| **4 same-color bars** | 47.21% | 1,131 |
| **5+ same-color bars** | 49.21% | 1,071 |


## Plain reading

**No streak-length edge.** Continuation 47-50% across all streak lengths. Slight reversal bias at 2-bar (52.25% reverse) and 4-bar (52.79% reverse), but these are within sampling noise (CI ±2pp at n=5,056 and ±3pp at n=1,131). Overall 51.16% reversal. Gold's 15m bars are effectively a random walk on direction.

## How reliable?

Each streak-length bin has n=1,000-10,000+. Confidence intervals are tight (±1-3pp). The findings here are statistically reliable — the lack of an edge is *also* a finding.
