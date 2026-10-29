'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type Currency = 'GBP' | 'USD' | 'EUR';

interface FieldSpec {
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

const DEFAULTS = {
  cur: 'GBP' as Currency,
  take: '40000',
  shoots: '30',
  costs: '8000',
  tax: '25',
  shootH: '8',
  hiddenH: '15',
};

export function PricingCalculator() {
  const [cur, setCur] = useState<Currency>(DEFAULTS.cur);
  const [take, setTake] = useState(DEFAULTS.take);
  const [shoots, setShoots] = useState(DEFAULTS.shoots);
  const [costs, setCosts] = useState(DEFAULTS.costs);
  const [tax, setTax] = useState(DEFAULTS.tax);
  const [shootH, setShootH] = useState(DEFAULTS.shootH);
  const [hiddenH, setHiddenH] = useState(DEFAULTS.hiddenH);

  const reset = () => {
    setCur(DEFAULTS.cur);
    setTake(DEFAULTS.take);
    setShoots(DEFAULTS.shoots);
    setCosts(DEFAULTS.costs);
    setTax(DEFAULTS.tax);
    setShootH(DEFAULTS.shootH);
    setHiddenH(DEFAULTS.hiddenH);
  };

  const sym = { GBP: '£', USD: '$', EUR: '€' }[cur];

  const fmt = (v: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: cur,
      maximumFractionDigits: 0,
    }).format(v);

  const spec: FieldSpec[] = [
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
          : !Number.isInteger(Math.round(v * 100) / 50)
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

  const stateMap: Record<string, string> = {
    take,
    shoots,
    costs,
    tax,
    shootH,
    hiddenH,
  };

  const setMap: Record<string, (val: string) => void> = {
    take: setTake,
    shoots: setShoots,
    costs: setCosts,
    tax: setTax,
    shootH: setShootH,
    hiddenH: setHiddenH,
  };

  const vals: Record<string, number> = {};
  let errCount = 0;

  const fields = spec.map((f) => {
    const raw = stateMap[f.k];
    const n = raw === '' ? NaN : Number(raw);
    const error = isNaN(n) ? 'Enter a number.' : f.check(n);
    if (error) errCount++;
    vals[f.k] = n;
    const id = `pc-${f.k}`;
    return {
      ...f,
      id,
      helpId: `${id}-help`,
      errId: `${id}-err`,
      value: raw,
      error,
      hasSlider: f.sMax !== undefined,
      sliderVal: isNaN(n) ? (f.sMin || 0) : Math.min(f.sMax || 100, Math.max(f.sMin || 0, n)),
      setter: setMap[f.k],
    };
  });

  const valid = errCount === 0;
  let out: any = null;

  if (valid) {
    const t = vals.tax / 100;
    const pre = vals.take / (1 - t);
    const rev = vals.costs + pre;
    const price = rev / vals.shoots;
    const hours = vals.shootH + vals.hiddenH;
    const costPer = vals.costs / vals.shoots;
    const taxPer = (pre - vals.take) / vals.shoots;
    const keepPer = vals.take / vals.shoots;
    const pct = (v: number) => (price > 0 ? ((v / price) * 100).toFixed(2) : '0') + '%';

    out = {
      price: fmt(price),
      takeHome: fmt(vals.take),
      shoots: vals.shoots,
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

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
      {/* Inputs Form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        aria-labelledby="inputs-h"
        className="w-full lg:flex-[1_1_420px] min-w-0 bg-white border border-[#DFE2DB] rounded p-5 sm:p-8"
      >
        <div className="flex justify-between items-center gap-3 mb-5">
          <h2 id="inputs-h" className="m-0 text-[19px] font-semibold text-[#20221F]">
            Your numbers
          </h2>
          <button
            type="button"
            onClick={reset}
            className="bg-transparent border-0 p-0 text-[#2A4EC2] underline cursor-pointer text-[15px] hover:text-[#20221F]"
          >
            Reset to example
          </button>
        </div>

        {/* Currency Switch */}
        <fieldset className="border-0 m-0 mb-6 p-0">
          <legend className="text-[15px] font-semibold text-[#20221F] mb-2 p-0">Currency</legend>
          <div className="inline-flex border border-[#B9BDB4] rounded overflow-hidden">
            {(['GBP', 'USD', 'EUR'] as Currency[]).map((c) => {
              const label = { GBP: '£ GBP', USD: '$ USD', EUR: '€ EUR' }[c];
              const isSelected = cur === c;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setCur(c)}
                  className={`min-w-[64px] h-[42px] px-3.5 border-0 border-r border-[#DFE2DB] last:border-r-0 font-semibold text-[15px] cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#20221F] text-white' : 'bg-white text-[#20221F] hover:bg-[#F3F2EE]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Fields */}
        <div className="space-y-6">
          {fields.map((f) => (
            <div key={f.k}>
              <div className="flex flex-wrap justify-between items-baseline gap-x-4 gap-y-1 mb-1">
                <label htmlFor={f.id} className="text-[15px] font-semibold text-[#20221F]">
                  {f.label}
                </label>
                <span className="text-[14px] text-[#60645F]">{f.unitLabel}</span>
              </div>
              <p id={f.helpId} className="m-0 mb-2 text-[14px] leading-[1.45] text-[#60645F]">
                {f.help}
              </p>
              <div className="flex items-center gap-4">
                <div className="relative flex-[0_0_150px]">
                  {f.prefix && (
                    <span
                      aria-hidden="true"
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#60645F] text-[16px] pointer-events-none"
                    >
                      {f.prefix}
                    </span>
                  )}
                  <input
                    id={f.id}
                    type="number"
                    inputMode="decimal"
                    min={f.min}
                    max={f.max}
                    step={f.inputStep}
                    value={f.value}
                    onChange={(e) => f.setter(e.target.value)}
                    aria-invalid={f.error ? 'true' : 'false'}
                    aria-describedby={`${f.helpId} ${f.error ? f.errId : ''}`}
                    style={{
                      paddingLeft: f.prefix ? '28px' : '12px',
                      paddingRight: f.suffix ? '30px' : '12px',
                    }}
                    className={`w-full h-11 border rounded text-[16px] tabular-nums bg-white outline-none focus:border-[#3159D7] ${
                      f.error ? 'border-[#B42318]' : 'border-[#B9BDB4]'
                    }`}
                  />
                  {f.suffix && (
                    <span
                      aria-hidden="true"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#60645F] text-[15px] pointer-events-none"
                    >
                      {f.suffix}
                    </span>
                  )}
                </div>

                {f.hasSlider && (
                  <input
                    type="range"
                    aria-label={`${f.label} slider`}
                    min={f.sMin}
                    max={f.sMax}
                    step={f.sliderStep || f.inputStep}
                    value={f.sliderVal}
                    onChange={(e) => f.setter(e.target.value)}
                    className="flex-1 min-w-0 h-8 accent-[#3159D7] cursor-pointer"
                  />
                )}
              </div>
              {f.error && (
                <p id={f.errId} role="alert" className="mt-1.5 text-[14px] text-[#B42318]">
                  {f.error}
                </p>
              )}
            </div>
          ))}
        </div>
      </form>

      {/* Results Column (Sticky) */}
      <section
        aria-labelledby="results-h"
        aria-live="polite"
        className="w-full lg:flex-[1_1_380px] min-w-0 lg:sticky lg:top-24"
      >
        <h2 id="results-h" className="sr-only">
          Results
        </h2>
        {valid && out ? (
          <div className="bg-[#20221F] text-white rounded p-6 sm:p-8">
            <p className="m-0 mb-1.5 text-[15px] text-[#C9CBC5]">You need to charge</p>
            <p className="m-0 font-serif text-[clamp(52px,6vw,72px)] leading-none tracking-[-0.02em] tabular-nums">
              {out.price}
            </p>
            <p className="mt-2 mb-6 text-[15px] text-[#C9CBC5]">
              per shoot, to take home {out.takeHome} a year from {out.shoots} shoots.
            </p>
            <dl className="m-0 grid grid-cols-3 gap-px bg-[#3A3C38] border-t border-b border-[#3A3C38]">
              <div className="bg-[#20221F] py-3.5 pr-3 pl-0">
                <dt className="text-[13px] text-[#A7AAA3] mb-1">Total hours per shoot</dt>
                <dd className="m-0 text-[22px] font-semibold tabular-nums">{out.hours}</dd>
              </div>
              <div className="bg-[#20221F] py-3.5 px-3">
                <dt className="text-[13px] text-[#A7AAA3] mb-1">Gross hourly rate</dt>
                <dd className="m-0 text-[22px] font-semibold tabular-nums">{out.grossHourly}</dd>
              </div>
              <div className="bg-[#20221F] py-3.5 pl-3 pr-0">
                <dt className="text-[13px] text-[#A7AAA3] mb-1">Take-home hourly</dt>
                <dd className="m-0 text-[22px] font-semibold tabular-nums">{out.takeHourly}</dd>
              </div>
            </dl>

            <h3 className="mt-6 mb-2.5 text-[15px] font-semibold">
              Where each {out.price} goes
            </h3>
            {/* Stacked bar */}
            <div
              aria-hidden="true"
              className="flex h-2.5 rounded-sm overflow-hidden mb-3.5 bg-[#3A3C38]"
            >
              <span style={{ width: out.costPct }} className="bg-[#9AA6C9]" title="Business costs" />
              <span style={{ width: out.taxPct }} className="bg-[#D6A35C]" title="Tax" />
              <span style={{ width: out.keepPct }} className="bg-[#7FB394]" title="Take-home" />
            </div>

            <dl className="m-0 grid gap-2 text-[15px] tabular-nums">
              <div className="flex justify-between gap-3">
                <dt className="flex items-center gap-2">
                  <span aria-hidden="true" className="w-2.5 h-2.5 bg-[#9AA6C9] rounded-xs" />
                  Business costs
                </dt>
                <dd className="m-0">{out.cost}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="flex items-center gap-2">
                  <span aria-hidden="true" className="w-2.5 h-2.5 bg-[#D6A35C] rounded-xs" />
                  Tax (estimated)
                </dt>
                <dd className="m-0">{out.tax}</dd>
              </div>
              <div className="flex justify-between gap-3 pt-2 border-t border-[#3A3C38] font-semibold">
                <dt className="flex items-center gap-2">
                  <span aria-hidden="true" className="w-2.5 h-2.5 bg-[#7FB394] rounded-xs" />
                  Your take-home
                </dt>
                <dd className="m-0">{out.keep}</dd>
              </div>
            </dl>
          </div>
        ) : (
          <div
            role="status"
            className="bg-white border border-[#DFE2DB] border-t-2 border-t-[#B42318] rounded p-6"
          >
            <p className="m-0 mb-1.5 font-semibold text-[17px] text-[#20221F]">Results paused</p>
            <p className="m-0 text-[15px] leading-[1.55] text-[#4A4E49]">
              Fix the {errCount === 1 ? '1 input' : `${errCount} inputs`} highlighted to see an estimate. Nothing is calculated from incomplete numbers.
            </p>
          </div>
        )}
        <p className="mt-3 text-[14px] leading-[1.5] text-[#60645F]">
          * This calculator provides a rough estimate. Always consult an accountant for personalized financial advice.
        </p>
      </section>
    </div>
  );
}
