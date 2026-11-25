export type Currency = 'GBP' | 'USD' | 'EUR';

export interface PricingRawInputs {
  cur: Currency;
  take: string;
  shoots: string;
  costs: string;
  tax: string;
  shootH: string;
  hiddenH: string;
}

export interface PricingNumericInputs {
  cur: Currency;
  take: number;
  shoots: number;
  costs: number;
  tax: number;
  shootH: number;
  hiddenH: number;
}

export interface PricingFieldSpec {
  k: 'take' | 'shoots' | 'costs' | 'tax' | 'shootH' | 'hiddenH';
  label: string;
  help: string;
  unitLabel: string;
  prefix?: string;
  suffix?: string;
  min: number;
  max: number;
  inputStep: number;
  sliderStep?: number;
  sMin?: number;
  sMax?: number;
  check: (v: number) => string;
}

export interface PricingEstimate {
  priceRaw: number;
  hoursRaw: number;
  grossHourlyRaw: number;
  takeHourlyRaw: number;
  costPerRaw: number;
  taxPerRaw: number;
  keepPerRaw: number;
  price: string;
  takeHome: string;
  shoots: number;
  hours: string;
  grossHourly: string;
  takeHourly: string;
  cost: string;
  tax: string;
  keep: string;
  costPct: string;
  taxPct: string;
  keepPct: string;
}

export interface NamedPricingExample {
  id: string;
  label: string;
  description: string;
  inputs: PricingRawInputs;
}

export const PRICING_DEFAULTS: PricingRawInputs = {
  cur: 'GBP',
  take: '40000',
  shoots: '30',
  costs: '8000',
  tax: '25',
  shootH: '8',
  hiddenH: '15',
};

export const NAMED_PRICING_EXAMPLES: Record<string, NamedPricingExample> = {
  'wedding-hidden-hours': {
    id: 'wedding-hidden-hours',
    label: 'Wedding photographer example (30 shoots, 15 hidden hrs)',
    description:
      '£40,000 take-home, £8,000 business costs, 25% tax, 30 shoots/year, 8 shoot hours, 15 hidden hours.',
    inputs: { ...PRICING_DEFAULTS },
  },
  'wedding-20h-editing': {
    id: 'wedding-20h-editing',
    label: 'Heavy editing & admin example (30 shoots, 20 hidden hrs)',
    description:
      'Same £40,000 target and 30 shoots/year, but hidden hours rise from 15 to 20 per shoot.',
    inputs: {
      ...PRICING_DEFAULTS,
      hiddenH: '20',
    },
  },
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  GBP: '£',
  USD: '$',
  EUR: '€',
};

export function formatPricingCurrency(value: number, cur: Currency): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: cur,
    maximumFractionDigits: 0,
  }).format(value);
}

export function getPricingFieldSpecs(cur: Currency): PricingFieldSpec[] {
  const sym = CURRENCY_SYMBOLS[cur];
  return [
    {
      k: 'take',
      label: 'Desired annual take-home',
      help: 'What you want to keep after tax, per year.',
      unitLabel: 'per year, after tax',
      prefix: sym,
      min: 1,
      max: 1000000,
      inputStep: 1,
      sliderStep: 5000,
      sMin: 10000,
      sMax: 150000,
      check: (v) =>
        v <= 0
          ? 'Enter an amount above zero.'
          : v > 1000000
          ? 'Enter 1,000,000 or less.'
          : !Number.isInteger(v)
          ? 'Use a whole number.'
          : '',
    },
    {
      k: 'shoots',
      label: 'Shoots per year',
      help: 'Be realistic about the bookings you can expect.',
      unitLabel: 'shoots',
      min: 1,
      max: 1000,
      inputStep: 1,
      sliderStep: 1,
      sMin: 5,
      sMax: 100,
      check: (v) =>
        v < 1
          ? 'Enter at least 1 shoot.'
          : v > 1000
          ? 'Enter 1,000 or fewer.'
          : !Number.isInteger(v)
          ? 'Use a whole number of shoots.'
          : '',
    },
    {
      k: 'costs',
      label: 'Annual business costs',
      help: 'Gear, software, insurance, marketing, travel, and similar costs.',
      unitLabel: 'per year',
      prefix: sym,
      min: 0,
      max: 1000000,
      inputStep: 1,
      sliderStep: 500,
      check: (v) =>
        v < 0
          ? 'Costs can’t be negative.'
          : v > 1000000
          ? 'Enter 1,000,000 or less.'
          : !Number.isInteger(v)
          ? 'Use a whole number.'
          : '',
    },
    {
      k: 'tax',
      label: 'Estimated tax rate',
      help: 'A rough single rate. Your accountant can give you a better figure.',
      unitLabel: 'percent',
      suffix: '%',
      min: 0,
      max: 89,
      inputStep: 1,
      sliderStep: 1,
      sMin: 0,
      sMax: 50,
      check: (v) =>
        v < 0
          ? 'Use 0% or more.'
          : v > 89
          ? 'Enter 89% or less.'
          : !Number.isInteger(v)
          ? 'Use a whole number.'
          : '',
    },
    {
      k: 'shootH',
      label: 'Shoot hours',
      help: 'Time spent actually photographing, per shoot.',
      unitLabel: 'hours per shoot',
      suffix: 'h',
      min: 0.5,
      max: 24,
      inputStep: 0.5,
      sliderStep: 0.5,
      sMin: 0.5,
      sMax: 24,
      check: (v) =>
        v < 0.5
          ? 'Enter at least 0.5 hours.'
          : v > 24
          ? 'Enter 24 hours or fewer.'
          : !Number.isInteger(v * 2)
          ? 'Use half-hour increments (e.g. 1.5, 2).'
          : '',
    },
    {
      k: 'hiddenH',
      label: 'Hidden hours',
      help: 'Editing, admin, emails, and travel for each shoot.',
      unitLabel: 'hours per shoot',
      suffix: 'h',
      min: 0,
      max: 200,
      inputStep: 1,
      sliderStep: 1,
      sMin: 0,
      sMax: 80,
      check: (v) =>
        v < 0
          ? 'Hours can’t be negative.'
          : v > 200
          ? 'Enter 200 hours or fewer.'
          : !Number.isInteger(v)
          ? 'Use a whole number of hours.'
          : '',
    },
  ];
}

export function validatePricingInputs(raw: PricingRawInputs): {
  valid: boolean;
  errCount: number;
  errors: Record<PricingFieldSpec['k'], string>;
  values: PricingNumericInputs;
} {
  const specs = getPricingFieldSpecs(raw.cur);
  const errors = {} as Record<PricingFieldSpec['k'], string>;
  const numeric: Record<string, number> = {};
  let errCount = 0;

  for (const spec of specs) {
    const rawStr = raw[spec.k];
    const n = rawStr.trim() === '' ? NaN : Number(rawStr);
    const err = Number.isNaN(n) ? 'Enter a number.' : spec.check(n);
    errors[spec.k] = err;
    if (err) errCount++;
    numeric[spec.k] = n;
  }

  return {
    valid: errCount === 0,
    errCount,
    errors,
    values: {
      cur: raw.cur,
      take: numeric.take,
      shoots: numeric.shoots,
      costs: numeric.costs,
      tax: numeric.tax,
      shootH: numeric.shootH,
      hiddenH: numeric.hiddenH,
    },
  };
}

export function calculatePricingEstimate(values: PricingNumericInputs): PricingEstimate {
  const fmt = (v: number) => formatPricingCurrency(v, values.cur);
  const t = values.tax / 100;
  const pre = values.take / (1 - t);
  const rev = values.costs + pre;
  const price = rev / values.shoots;
  const hours = values.shootH + values.hiddenH;
  const costPer = values.costs / values.shoots;
  const taxPer = (pre - values.take) / values.shoots;
  const keepPer = values.take / values.shoots;
  const pct = (v: number) => (price > 0 ? ((v / price) * 100).toFixed(2) : '0') + '%';

  return {
    priceRaw: price,
    hoursRaw: hours,
    grossHourlyRaw: price / hours,
    takeHourlyRaw: keepPer / hours,
    costPerRaw: costPer,
    taxPerRaw: taxPer,
    keepPerRaw: keepPer,
    price: fmt(price),
    takeHome: fmt(values.take),
    shoots: values.shoots,
    hours: `${Math.round(hours * 10) / 10} ${hours === 1 ? 'hour' : 'hours'}`,
    grossHourly: `${fmt(price / hours)}/hr`,
    takeHourly: `${fmt(keepPer / hours)}/hr`,
    cost: fmt(costPer),
    tax: fmt(taxPer),
    keep: fmt(keepPer),
    costPct: pct(costPer),
    taxPct: pct(taxPer),
    keepPct: pct(keepPer),
  };
}

export function isValidCurrency(val: string | null): val is Currency {
  return val === 'GBP' || val === 'USD' || val === 'EUR';
}

/**
 * Encodes either a named public example or explicit custom figures into a URL hash fragment.
 * Hash fragments are never transmitted in HTTP requests or server query logs.
 */
export function encodePricingHash(
  mode: 'example' | 'custom',
  inputs: PricingRawInputs,
  exampleId = 'wedding-hidden-hours',
  partner?: string
): string {
  const params = new URLSearchParams();
  if (mode === 'example') {
    params.set('example', NAMED_PRICING_EXAMPLES[exampleId] ? exampleId : 'wedding-hidden-hours');
  } else {
    params.set('cur', inputs.cur);
    params.set('take', inputs.take);
    params.set('shoots', inputs.shoots);
    params.set('costs', inputs.costs);
    params.set('tax', inputs.tax);
    params.set('shootH', inputs.shootH);
    params.set('hiddenH', inputs.hiddenH);
  }
  if (partner && /^[a-zA-Z0-9._-]{1,64}$/.test(partner.trim())) {
    params.set('partner', partner.trim());
  }
  return `#${params.toString()}`;
}

export function decodePricingHash(hash: string): {
  inputs: PricingRawInputs | null;
  exampleId: string | null;
  partner: string | null;
  isCustom: boolean;
} {
  const cleaned = (hash || '').replace(/^#/, '').trim();
  if (!cleaned) {
    return { inputs: null, exampleId: null, partner: null, isCustom: false };
  }

  const params = new URLSearchParams(cleaned);
  const rawPartner = params.get('partner') || params.get('ref');
  const partner =
    rawPartner && /^[a-zA-Z0-9._-]{1,64}$/.test(rawPartner.trim()) ? rawPartner.trim() : null;

  const exampleKey = params.get('example');
  if (exampleKey && NAMED_PRICING_EXAMPLES[exampleKey]) {
    return {
      inputs: { ...NAMED_PRICING_EXAMPLES[exampleKey].inputs },
      exampleId: exampleKey,
      partner,
      isCustom: false,
    };
  }

  const curParam = params.get('cur');
  const hasAnyCustom =
    params.has('take') ||
    params.has('shoots') ||
    params.has('costs') ||
    params.has('tax') ||
    params.has('shootH') ||
    params.has('hiddenH') ||
    params.has('cur');

  if (!hasAnyCustom) {
    return { inputs: null, exampleId: null, partner, isCustom: false };
  }

  const candidate: PricingRawInputs = {
    cur: isValidCurrency(curParam) ? curParam : PRICING_DEFAULTS.cur,
    take: params.get('take') ?? PRICING_DEFAULTS.take,
    shoots: params.get('shoots') ?? PRICING_DEFAULTS.shoots,
    costs: params.get('costs') ?? PRICING_DEFAULTS.costs,
    tax: params.get('tax') ?? PRICING_DEFAULTS.tax,
    shootH: params.get('shootH') ?? PRICING_DEFAULTS.shootH,
    hiddenH: params.get('hiddenH') ?? PRICING_DEFAULTS.hiddenH,
  };

  // Validate candidate so malformed hashes fall back cleanly to defaults
  const validated = validatePricingInputs(candidate);
  if (!validated.valid) {
    return { inputs: null, exampleId: null, partner, isCustom: false };
  }

  return {
    inputs: candidate,
    exampleId: null,
    partner,
    isCustom: true,
  };
}
