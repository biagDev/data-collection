// normalize.mjs — pure functions that turn raw results.json objects into the
// unified dashboard schema. NO filesystem access here — this module is pure so
// it can be unit-reasoned about. build-data.mjs does the I/O and calls these.
//
// The collected data is the source of truth. These functions only READ the
// parsed objects and RETURN new objects — they never mutate the input.

// ----------------------------------------------------------------------------
// Classification
// ----------------------------------------------------------------------------

/** Asset from the analysis id (path relative to analyses/). */
export function assetFromId(id) {
  if (id.startsWith('es/')) return 'ES';
  if (id.startsWith('gc/')) return 'GC';
  return 'NQ';
}

/** The analysis folder name with any asset prefix stripped. */
export function bareId(id) {
  return id.replace(/^(es|gc)\//, '');
}

/** Category bucket from the bare id. */
export function categoryFromId(id) {
  const bare = bareId(id);
  if (bare.startsWith('extended-stats/')) return 'extended-stats';
  if (/^\d+-candle-hit-stats$/.test(bare)) return 'candle-hit-stats';
  if (/^\d+(am|pm)-\d+h-candle-hit-stats$/.test(bare)) return 'multi-tf-candle';
  if (
    bare === 'london-candle-hit-stats' ||
    bare === 'asia-candle-hit-stats' ||
    bare === 'globex-6pm-candle-hit-stats' ||
    bare === 'comex-pit-open' ||
    bare === 'lbma-fix-window'
  )
    return 'session-retest';
  if (bare === 'consecutive-bar-pattern') return 'consecutive-bars';
  if (bare === 'lunch-lasthour-structure') return 'lunch-structure';
  if (bare.startsWith('daily-patterns')) return 'daily-patterns';
  if (bare.startsWith('weekly-patterns')) return 'weekly-patterns';
  if (bare === 'pm-range-break-and-go') return 'pm-range';
  if (
    bare === '930-followthrough' ||
    bare === 'retest-conditional-stats' ||
    bare === 'setup-b-r-distribution'
  )
    return 'setup-chain';
  return 'other';
}

const RETEST_CATEGORIES = new Set([
  'candle-hit-stats',
  'multi-tf-candle',
  'session-retest',
]);

export function isRetestCategory(cat) {
  return RETEST_CATEGORIES.has(cat);
}

export const CATEGORY_LABELS = {
  'candle-hit-stats': 'Candle Hit-Stats',
  'multi-tf-candle': 'Multi-Timeframe Candle',
  'session-retest': 'Session Retest',
  'consecutive-bars': 'Consecutive Bars',
  'lunch-structure': 'Lunch / Last Hour',
  'extended-stats': 'Extended Stats',
  'daily-patterns': 'Daily Patterns',
  'weekly-patterns': 'Weekly Patterns',
  'pm-range': 'Pre-Market Range',
  'setup-chain': 'Setup Chain',
  other: 'Other',
};

// ----------------------------------------------------------------------------
// Labels & titles
// ----------------------------------------------------------------------------

/** "930" -> "9:30", "1545" -> "15:45". */
export function candleLabelFromDigits(digits) {
  const s = String(digits);
  if (s.length === 3) return `${s[0]}:${s.slice(1)}`;
  if (s.length === 4) return `${s.slice(0, 2)}:${s.slice(2)}`;
  return s;
}

/** Session label for grouping/display. */
export function sessionLabelForId(id) {
  const bare = bareId(id);
  if (/^\d+-candle-hit-stats$/.test(bare)) return 'NY Session';
  if (/^\d+(am|pm)-\d+h-candle-hit-stats$/.test(bare)) return 'NY Multi-TF';
  if (bare === 'london-candle-hit-stats') return 'London';
  if (bare === 'asia-candle-hit-stats') return 'Asia';
  if (bare === 'globex-6pm-candle-hit-stats') return 'Globex 6PM';
  if (bare === 'comex-pit-open') return 'COMEX Open';
  if (bare === 'lbma-fix-window') return 'LBMA Fix';
  return '';
}

// Explicit titles for the bespoke (non-candle) analyses.
const EXPLICIT_TITLES = {
  'london-candle-hit-stats': 'London Session',
  'asia-candle-hit-stats': 'Asia Session',
  'globex-6pm-candle-hit-stats': 'Globex 6PM Session',
  'comex-pit-open': 'COMEX Pit Open',
  'lbma-fix-window': 'LBMA AM Fix Window',
  'consecutive-bar-pattern': 'Consecutive-Bar Pattern',
  'lunch-lasthour-structure': 'Lunch / Last-Hour Structure',
  'pm-range-break-and-go': 'PM-Range Break-and-Go',
  'retest-conditional-stats': 'Retest-Conditional Stats',
  'setup-b-r-distribution': 'Setup B — R Distribution',
  '930-followthrough': '9:30 Followthrough',
  'daily-patterns-v1': 'Daily Patterns v1',
  'daily-patterns-v2': 'Daily Patterns v2',
  'weekly-patterns-v1': 'Weekly Patterns v1',
  'weekly-patterns-v2': 'Weekly Patterns v2',
};

/** Human-readable analysis title. */
export function titleFor(id, json) {
  const asset = assetFromId(id);
  const bare = bareId(id);

  if (/^\d+-candle-hit-stats$/.test(bare)) {
    const digits = bare.match(/^(\d+)/)[1];
    return `${asset} ${candleLabelFromDigits(digits)} Candle`;
  }
  if (/^(\d+)(am|pm)-(\d+)h-candle-hit-stats$/.test(bare)) {
    const m = bare.match(/^(\d+)(am|pm)-(\d+)h/);
    return `${asset} ${m[1]}${m[2].toUpperCase()} ${m[3]}h Candle`;
  }
  if (EXPLICIT_TITLES[bare]) {
    return `${asset} ${EXPLICIT_TITLES[bare]}`;
  }
  // Extended-stats: "01-prior-day-hl-retest" -> "Prior-Day H/L Retest".
  if (bare.startsWith('extended-stats/')) {
    const name = bare
      .replace(/^extended-stats\/\d+-/, '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .replace(/\bHl\b/, 'H/L')
      .replace(/Hod Lod/, 'HOD/LOD')
      .replace(/\bMa\b/, 'MA');
    return `${asset} ${name}`;
  }
  // Fallback: humanize whatever's left.
  const name = bare
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/ V(\d)$/, ' v$1');
  return `${asset} ${name}`;
}

// ----------------------------------------------------------------------------
// Sample size + headline extraction (works across all 43 raw shapes)
// ----------------------------------------------------------------------------

const SAMPLE_KEYS = [
  'sample_size_days',
  'n',
  'n_days',
  'n_per_candle',
  'n_total_bars',
  'sample_size_weeks_approx',
  'sample_size_days_approx',
  'sample_size_setupB_trades',
];

export function extractSample(json) {
  if (json.aggregate && typeof json.aggregate.total_days === 'number') {
    return { n: json.aggregate.total_days, label: `${json.aggregate.total_days} days` };
  }
  for (const k of SAMPLE_KEYS) {
    const v = json[k];
    if (typeof v === 'number') {
      const unit = k.includes('week') ? 'weeks' : k.includes('Trade') ? 'trades' : k.includes('bars') ? 'bars' : 'days';
      return { n: v, label: `${v} ${unit}` };
    }
    if (typeof v === 'string') {
      // e.g. "219-220" or "222-223"
      const m = v.match(/(\d+)/);
      if (m) return { n: Number(m[1]), label: `${v} days` };
    }
  }
  return { n: null, label: 'n/a' };
}

export function extractHeadline(json) {
  if (typeof json.key_finding === 'string') return json.key_finding;
  if (Array.isArray(json.key_findings) && json.key_findings.length) {
    return String(json.key_findings[0]);
  }
  if (typeof json.summary === 'string') return json.summary;
  if (typeof json.theme === 'string') return json.theme;
  if (typeof json.candle_studied === 'string') return `Subject candle: ${json.candle_studied}`;
  if (typeof json.comparison_to_nq === 'string') return json.comparison_to_nq;
  return '';
}

// Pull free-text annotations worth surfacing on the detail page.
const NOTE_FIELDS = [
  ['comparison_to_nq', 'Compared to NQ'],
  ['comparison_to_ny_session', 'Compared to NY session'],
  ['correction_note', 'Correction note'],
  ['history_note', 'Data-history note'],
  ['sample_size_warning', 'Sample-size warning'],
  ['sample_size_caveat', 'Sample-size caveat'],
  ['sample_size_caveats', 'Sample-size caveats'],
  ['data_source_caveats', 'Data-source caveats'],
  ['v1_bug_note', 'v1 bug note'],
  ['method', 'Method'],
  ['context', 'Context'],
];

export function extractNotes(json) {
  const notes = [];
  for (const [key, label] of NOTE_FIELDS) {
    const v = json[key];
    if (typeof v === 'string' && v.trim()) notes.push({ label, text: v.trim() });
  }
  // key_findings array: include the rest (the first is already the headline).
  if (Array.isArray(json.key_findings) && json.key_findings.length > 1) {
    for (const f of json.key_findings.slice(1)) {
      if (typeof f === 'string') notes.push({ label: 'Key finding', text: f });
    }
  }
  return notes;
}

// ----------------------------------------------------------------------------
// Retest adapters -> candles[]
// Each candle: { label, n, retest:{p15,p30,p45}, sweep:{p15,p30,p45},
//                highAny45, lowAny45, bias }
// ----------------------------------------------------------------------------

function biasFrom(highAny, lowAny) {
  if (highAny == null || lowAny == null) return null;
  if (highAny > lowAny + 0.5) return 'high';
  if (lowAny > highAny + 0.5) return 'low';
  return 'balanced';
}

/** Parse a "by_HH_MM" window key into minutes-since-midnight for sorting. */
function windowKeyMinutes(key) {
  const m = key.match(/by_(\d+)_(\d+)/);
  if (!m) return 0;
  return Number(m[1]) * 60 + Number(m[2]);
}

/** Family 1: NQ/GC nested aggregate.by_X.{either_side,...}.{count,pct} */
function adaptNestedAggregate(id, json) {
  const agg = json.aggregate;
  if (!agg) return [];
  const windowKeys = Object.keys(agg)
    .filter((k) => k.startsWith('by_') && agg[k] && typeof agg[k] === 'object')
    .sort((a, b) => windowKeyMinutes(a) - windowKeyMinutes(b));
  if (!windowKeys.length) return [];

  const pick = (wk, metric) => {
    const cell = agg[wk] && agg[wk][metric];
    return cell && typeof cell.pct === 'number' ? cell.pct : null;
  };

  const [w1, w2, w3] = windowKeys;
  const lastW = windowKeys[windowKeys.length - 1];

  const bare = bareId(id);
  let label;
  if (/^\d+-candle-hit-stats$/.test(bare)) {
    label = candleLabelFromDigits(bare.match(/^(\d+)/)[1]);
  } else {
    const m = bare.match(/^(\d+)(am|pm)-(\d+)h/);
    label = m ? `${m[1]}${m[2].toUpperCase()} (${m[3]}h)` : bare;
  }

  const highAny45 = pick(lastW, 'high_any');
  const lowAny45 = pick(lastW, 'low_any');

  return [
    {
      label,
      n: agg.total_days ?? null,
      retest: {
        p15: w1 ? pick(w1, 'either_side') : null,
        p30: w2 ? pick(w2, 'either_side') : null,
        p45: w3 ? pick(w3, 'either_side') : null,
      },
      sweep: {
        p15: w1 ? pick(w1, 'both_sides') : null,
        p30: w2 ? pick(w2, 'both_sides') : null,
        p45: w3 ? pick(w3, 'both_sides') : null,
      },
      highAny45,
      lowAny45,
      bias: biasFrom(highAny45, lowAny45),
      windowCount: windowKeys.length,
    },
  ];
}

/** Family 2: ES flat either_side.by_plus_15_pct etc. */
function adaptEsFlat(id, json) {
  const es = json.either_side;
  if (!es) return [];
  const sw = json.both_sides_sweep || {};
  const dir = json.directional || {};
  const bare = bareId(id);
  let label = bare;
  if (/^\d+-candle-hit-stats$/.test(bare)) {
    label = candleLabelFromDigits(bare.match(/^(\d+)/)[1]);
  }
  const highAny45 = dir.hi_any_plus_45_pct ?? null;
  const lowAny45 = dir.lo_any_plus_45_pct ?? null;
  return [
    {
      label,
      n: json.n ?? null,
      retest: {
        p15: es.by_plus_15_pct ?? null,
        p30: es.by_plus_30_pct ?? null,
        p45: es.by_plus_45_pct ?? null,
      },
      sweep: {
        p15: sw.by_plus_15_pct ?? null,
        p30: sw.by_plus_30_pct ?? null,
        p45: sw.by_plus_45_pct ?? null,
      },
      highAny45,
      lowAny45,
      bias: biasFrom(highAny45, lowAny45),
      windowCount: 3,
    },
  ];
}

/** Family 3: session retest — handles all 4 sub-shapes. */
function adaptSession(id, json) {
  // 3c: NQ nested { either_side_retest:{rows}, both_sides_sweep:{rows}, directional_split:{rows} }
  if (json.either_side_retest && json.either_side_retest.rows) {
    const eRows = json.either_side_retest.rows;
    const sRows = (json.both_sides_sweep && json.both_sides_sweep.rows) || [];
    const dRows = (json.directional_split && json.directional_split.rows) || [];
    const sByCandle = Object.fromEntries(sRows.map((r) => [r.candle, r]));
    const dByCandle = Object.fromEntries(dRows.map((r) => [r.candle, r]));
    return eRows.map((r) => {
      const s = sByCandle[r.candle] || {};
      const d = dByCandle[r.candle] || {};
      const highAny45 = d.hi_any_plus_45 ?? d.high_any_plus_45 ?? null;
      const lowAny45 = d.lo_any_plus_45 ?? d.low_any_plus_45 ?? null;
      return {
        label: r.candle,
        n: r.n ?? null,
        retest: { p15: r.by_plus_15 ?? null, p30: r.by_plus_30 ?? null, p45: r.by_plus_45 ?? null },
        sweep: { p15: s.by_plus_15 ?? null, p30: s.by_plus_30 ?? null, p45: s.by_plus_45 ?? null },
        highAny45,
        lowAny45,
        bias: biasFrom(highAny45, lowAny45),
        windowCount: 3,
      };
    });
  }

  // 3a / 3b / 3d: flat rows array
  if (Array.isArray(json.rows)) {
    return json.rows.map((r) => {
      const label = r.candle ?? r.candle_et ?? '';
      // 3a GC: *_plus_15_pct / *_plus_30_pct / *_plus_45_pct + high_any_plus_45_pct
      // 3b ES: either_plus_15 / either_plus_45 / both_plus_45
      // 3d Globex: either_plus_15 / either_plus_45 / both_plus_45 / hi_any_plus_45 / lo_any_plus_45
      const retest = {
        p15: r.either_plus_15_pct ?? r.either_plus_15 ?? null,
        p30: r.either_plus_30_pct ?? r.either_plus_30 ?? null,
        p45: r.either_plus_45_pct ?? r.either_plus_45 ?? null,
      };
      const sweep = {
        p15: r.both_plus_15_pct ?? r.both_plus_15 ?? null,
        p30: r.both_plus_30_pct ?? r.both_plus_30 ?? null,
        p45: r.both_plus_45_pct ?? r.both_plus_45 ?? null,
      };
      const highAny45 = r.high_any_plus_45_pct ?? r.hi_any_plus_45 ?? null;
      const lowAny45 = r.low_any_plus_45_pct ?? r.lo_any_plus_45 ?? null;
      return {
        label,
        n: r.n ?? null,
        retest,
        sweep,
        highAny45,
        lowAny45,
        bias: biasFrom(highAny45, lowAny45),
        windowCount: retest.p30 != null ? 3 : 2,
      };
    });
  }

  return [];
}

/** Dispatch to the right retest adapter. Returns candles[] (possibly empty). */
export function extractCandles(id, category, json) {
  if (category === 'candle-hit-stats' || category === 'multi-tf-candle') {
    if (json.aggregate) return adaptNestedAggregate(id, json);
    if (json.either_side) return adaptEsFlat(id, json);
    return [];
  }
  if (category === 'session-retest') {
    return adaptSession(id, json);
  }
  return [];
}

// ----------------------------------------------------------------------------
// Top-level record builder
// ----------------------------------------------------------------------------

export function buildRecord(id, json, paths) {
  const asset = assetFromId(id);
  const category = categoryFromId(id);
  const sample = extractSample(json);
  const record = {
    id,
    slug: id.replace(/\//g, '-'),
    asset,
    category,
    categoryLabel: CATEGORY_LABELS[category] || category,
    sessionLabel: sessionLabelForId(id),
    title: titleFor(id, json),
    symbol: json.symbol || '',
    timeframe: json.timeframe || '15m',
    asOf: json.as_of_date || '',
    sampleN: sample.n,
    sampleLabel: sample.label,
    headline: extractHeadline(json),
    notes: extractNotes(json),
    paths,
  };
  if (isRetestCategory(category)) {
    record.candles = extractCandles(id, category, json);
  }
  return record;
}
