'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  CURRENCY_SYMBOLS,
  Currency,
  NAMED_PRICING_EXAMPLES,
  PRICING_DEFAULTS,
  PricingRawInputs,
  calculatePricingEstimate,
  decodePricingHash,
  encodePricingHash,
  formatPricingCurrency,
  getPricingFieldSpecs,
  validatePricingInputs,
} from '@/lib/pricing-math';
import { trackEvent, trackOncePerSession } from '@/lib/analytics';

async function copyTextToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to execCommand fallback if clipboard API rejects (e.g. unfocused tab)
    }
  }
  if (typeof document !== 'undefined') {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const success = document.execCommand('copy');
      document.body.removeChild(ta);
      return success;
    } catch {
      return false;
    }
  }
  return false;
}

export function PricingCalculator() {
  const [inputs, setInputs] = useState<PricingRawInputs>({ ...PRICING_DEFAULTS });
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [summaryStatus, setSummaryStatus] = useState('');
  const [summaryError, setSummaryError] = useState(false);

  // Share panel state
  const [shareOpen, setShareOpen] = useState(false);
  const [includeCustomInLink, setIncludeCustomInLink] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [shareStatus, setShareStatus] = useState('');
  const [shareError, setShareError] = useState(false);

  // Embed panel state
  const [embedOpen, setEmbedOpen] = useState(false);
  const [partnerSlug, setPartnerSlug] = useState('your-site');
  const [embedCopied, setEmbedCopied] = useState(false);
  const [embedStatus, setEmbedStatus] = useState('');

  // Track referral & restore shared hash on mount without triggering pricing_estimate_used
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const decoded = decodePricingHash(window.location.hash);
    if (decoded.inputs) {
      setInputs(decoded.inputs);
    }

    const searchParams = new URLSearchParams(window.location.search);
    const queryPartner = searchParams.get('partner') || searchParams.get('ref');
    const partner = decoded.partner || queryPartner;

    if (partner && /^[a-zA-Z0-9._-]{1,64}$/.test(partner.trim())) {
      trackOncePerSession('widget_referral', {
        page: '/tools/pricing-calculator',
        ref: 'embed',
        partner: partner.trim(),
      });
    }
  }, []);

  const spec = useMemo(() => getPricingFieldSpecs(inputs.cur), [inputs.cur]);
  const validation = useMemo(() => validatePricingInputs(inputs), [inputs]);
  const out = useMemo(
    () => (validation.valid ? calculatePricingEstimate(validation.values) : null),
    [validation]
  );

  const updateField = <K extends keyof PricingRawInputs>(key: K, value: PricingRawInputs[K]) => {
    const next: PricingRawInputs = { ...inputs, [key]: value };
    setInputs(next);
    const nextValidation = validatePricingInputs(next);
    if (nextValidation.valid) {
      trackOncePerSession('pricing_estimate_used', {
        page: '/tools/pricing-calculator',
      });
    }
  };

  const reset = () => {
    setInputs({ ...PRICING_DEFAULTS });
    setCopiedSummary(false);
    setSummaryStatus('');
    setSummaryError(false);
    setShareCopied(false);
    setShareStatus('');
    setShareError(false);
    if (typeof window !== 'undefined' && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  // Pick which named public example fits best when custom figures are not opted in
  const activeExampleId =
    inputs.cur === 'GBP' &&
    inputs.take === '40000' &&
    inputs.shoots === '30' &&
    inputs.costs === '8000' &&
    inputs.tax === '25' &&
    inputs.shootH === '8' &&
    inputs.hiddenH === '20'
      ? 'wedding-20h-editing'
      : 'wedding-hidden-hours';

  const shareOrigin =
    typeof window !== 'undefined' ? window.location.origin : 'https://www.thephototesters.com';

  const shareUrl = useMemo(() => {
    const hash = encodePricingHash(
      includeCustomInLink && validation.valid ? 'custom' : 'example',
      inputs,
      activeExampleId
    );
    return `${shareOrigin}/tools/pricing-calculator${hash}`;
  }, [includeCustomInLink, validation.valid, inputs, activeExampleId, shareOrigin]);

  const sanitizedPartner = partnerSlug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);

  const embedSrc = `https://www.thephototesters.com/embed/pricing-calculator${
    sanitizedPartner ? `?partner=${encodeURIComponent(sanitizedPartner)}` : ''
  }`;

  const embedCode = `<iframe src="${embedSrc}" title="Photography Pricing Calculator — The Photo Testers" width="100%" height="440" style="border:1px solid #DFE2DB;border-radius:6px;max-width:520px;display:block;" loading="lazy"></iframe>`;

  const fields = spec.map((f) => {
    const raw = inputs[f.k];
    const n = raw.trim() === '' ? NaN : Number(raw);
    const error = validation.errors[f.k];
    const id = `pc-${f.k}`;
    return {
      ...f,
      id,
      helpId: `${id}-help`,
      errId: `${id}-err`,
      value: raw,
      error,
      hasSlider: f.sMax !== undefined,
      sliderVal: Number.isNaN(n)
        ? f.sMin || 0
        : Math.min(f.sMax || 100, Math.max(f.sMin || 0, n)),
    };
  });

  const handleCopySummary = async () => {
    if (!validation.valid || !out) return;
    const fmt = (v: number) => formatPricingCurrency(v, inputs.cur);
    const vals = validation.values;

    const summaryText = [
      `Photography Pricing Estimate`,
      `----------------------------`,
      `Price per shoot: ${out.price}`,
      `Shoots per year: ${out.shoots}`,
      `Total hours per shoot: ${out.hours} (${vals.shootH}h shoot + ${vals.hiddenH}h hidden)`,
      `Gross hourly rate: ${out.grossHourly}`,
      `Take-home hourly rate: ${out.takeHourly}`,
      ``,
      `Where each ${out.price} goes:`,
      `- Business costs: ${out.cost} (${out.costPct})`,
      `- Tax (estimated): ${out.tax} (${out.taxPct})`,
      `- Your take-home: ${out.keep} (${out.keepPct})`,
      ``,
      `Assumptions used:`,
      `- Desired annual take-home: ${fmt(vals.take)} (${inputs.cur})`,
      `- Shoots per year: ${vals.shoots}`,
      `- Annual business costs: ${fmt(vals.costs)} (${inputs.cur})`,
      `- Estimated tax rate: ${vals.tax}%`,
      `- Shoot hours: ${vals.shootH}h`,
      `- Hidden hours: ${vals.hiddenH}h`,
      ``,
      `Calculated via The Photo Testers: https://www.thephototesters.com/tools/pricing-calculator`,
    ].join('\n');

    const ok = await copyTextToClipboard(summaryText);
    if (ok) {
      setCopiedSummary(true);
      setSummaryError(false);
      setSummaryStatus('Estimate copied to clipboard');
      setTimeout(() => {
        setCopiedSummary(false);
        setSummaryStatus('');
      }, 3000);
    } else {
      setCopiedSummary(false);
      setSummaryError(true);
      setSummaryStatus('Could not copy to clipboard. Please copy manually.');
    }
  };

  const handleCopyShareLink = async () => {
    const ok = await copyTextToClipboard(shareUrl);
    if (ok) {
      setShareCopied(true);
      setShareError(false);
      setShareStatus(
        includeCustomInLink && validation.valid
          ? 'Custom share link copied (stored in URL hash only).'
          : 'Public example link copied to clipboard.'
      );
      trackEvent('share_link_copied', {
        page: '/tools/pricing-calculator',
        ref: includeCustomInLink && validation.valid ? 'custom_hash' : 'named_example',
      });
      setTimeout(() => {
        setShareCopied(false);
      }, 3000);
    } else {
      setShareCopied(false);
      setShareError(true);
      setShareStatus('Could not copy automatically. Select and copy the link above.');
    }
  };

  const handleCopyEmbedCode = async () => {
    const ok = await copyTextToClipboard(embedCode);
    if (ok) {
      setEmbedCopied(true);
      setEmbedStatus('Embed code copied to clipboard.');
      setTimeout(() => {
        setEmbedCopied(false);
      }, 3000);
    } else {
      setEmbedCopied(false);
      setEmbedStatus('Could not copy automatically. Select and copy the code above.');
    }
  };

  return (
    <div className="space-y-8">
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
                const label = `${CURRENCY_SYMBOLS[c]} ${c}`;
                const isSelected = inputs.cur === c;
                return (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => updateField('cur', c)}
                    className={`min-w-[64px] h-[42px] px-3.5 border-0 border-r border-[#DFE2DB] last:border-r-0 font-semibold text-[15px] cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#20221F] text-white'
                        : 'bg-white text-[#20221F] hover:bg-[#F3F2EE]'
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
                      onChange={(e) => updateField(f.k, e.target.value)}
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
                      onChange={(e) => updateField(f.k, e.target.value)}
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
          {validation.valid && out ? (
            <div className="bg-[#20221F] text-white rounded p-6 sm:p-8">
              <p className="m-0 mb-1.5 text-[15px] text-[#C9CBC5]">You need to charge</p>
              <p
                data-testid="pricing-price-per-shoot"
                className="m-0 font-serif text-[clamp(52px,6vw,72px)] leading-none tracking-[-0.02em] tabular-nums"
              >
                {out.price}
              </p>
              <p className="mt-2 mb-6 text-[15px] text-[#C9CBC5]">
                per shoot, to take home {out.takeHome} a year from {out.shoots} shoots.
              </p>
              <dl className="m-0 grid grid-cols-3 gap-px bg-[#3A3C38] border-t border-b border-[#3A3C38]">
                <div className="bg-[#20221F] py-3.5 pr-2 sm:pr-3 pl-0">
                  <dt className="text-[12px] sm:text-[13px] text-[#A7AAA3] mb-1">
                    Total hours per shoot
                  </dt>
                  <dd
                    data-testid="pricing-total-hours"
                    className="m-0 text-[18px] sm:text-[22px] font-semibold tabular-nums"
                  >
                    {out.hours}
                  </dd>
                </div>
                <div className="bg-[#20221F] py-3.5 px-2 sm:px-3">
                  <dt className="text-[12px] sm:text-[13px] text-[#A7AAA3] mb-1">
                    Gross hourly rate
                  </dt>
                  <dd
                    data-testid="pricing-gross-hourly"
                    className="m-0 text-[18px] sm:text-[22px] font-semibold tabular-nums"
                  >
                    {out.grossHourly}
                  </dd>
                </div>
                <div className="bg-[#20221F] py-3.5 pl-2 sm:pl-3 pr-0">
                  <dt className="text-[12px] sm:text-[13px] text-[#A7AAA3] mb-1">
                    Take-home hourly
                  </dt>
                  <dd
                    data-testid="pricing-takehome-hourly"
                    className="m-0 text-[18px] sm:text-[22px] font-semibold tabular-nums"
                  >
                    {out.takeHourly}
                  </dd>
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

              {/* Actions */}
              <div className="mt-6 pt-5 border-t border-[#3A3C38] space-y-2.5">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="w-full h-11 px-4 bg-[#FAF9F6] text-[#20221F] font-semibold text-[15px] rounded border border-transparent hover:bg-white active:bg-[#E4E5DF] cursor-pointer transition-colors flex items-center justify-center gap-2"
                  aria-label="Copy estimate summary to clipboard"
                >
                  <span>{copiedSummary ? 'Estimate copied' : 'Copy estimate'}</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    aria-expanded={shareOpen}
                    aria-controls="share-example-panel"
                    onClick={() => {
                      setShareOpen((prev) => !prev);
                      if (!shareOpen) setEmbedOpen(false);
                    }}
                    className="h-10 px-3 bg-transparent text-white font-medium text-[14px] rounded border border-[#5B5F58] hover:border-white cursor-pointer transition-colors"
                  >
                    Share this example
                  </button>
                  <button
                    type="button"
                    aria-expanded={embedOpen}
                    aria-controls="embed-calculator-panel"
                    onClick={() => {
                      setEmbedOpen((prev) => !prev);
                      if (!embedOpen) setShareOpen(false);
                    }}
                    className="h-10 px-3 bg-transparent text-white font-medium text-[14px] rounded border border-[#5B5F58] hover:border-white cursor-pointer transition-colors"
                  >
                    Embed calculator
                  </button>
                </div>

                {summaryStatus && (
                  <p
                    role="status"
                    aria-live="polite"
                    className={`mt-1 text-[13px] text-center ${
                      summaryError ? 'text-[#FF8A80]' : 'text-[#A7AAA3]'
                    }`}
                  >
                    {summaryStatus}
                  </p>
                )}

                {/* Share this example panel */}
                {shareOpen && (
                  <div
                    id="share-example-panel"
                    className="mt-3 p-4 bg-[#2A2C28] border border-[#444741] rounded text-[14px] space-y-3"
                  >
                    <p className="m-0 text-[#E4E5DF] leading-[1.45]">
                      By default, this shares a named public example (
                      <strong>{NAMED_PRICING_EXAMPLES[activeExampleId].label}</strong>) with none of
                      your personal figures.
                    </p>

                    <label className="flex items-start gap-2.5 cursor-pointer text-[#E4E5DF]">
                      <input
                        type="checkbox"
                        checked={includeCustomInLink}
                        onChange={(e) => {
                          setIncludeCustomInLink(e.target.checked);
                          setShareCopied(false);
                          setShareStatus('');
                        }}
                        className="mt-0.5 w-4 h-4 accent-[#7FB394]"
                      />
                      <span>
                        Include my custom figures in the link (stored in the URL{' '}
                        <code className="text-[#C9CBC5]">#</code> fragment so they are not sent to
                        server logs or analytics)
                      </span>
                    </label>

                    <div>
                      <label htmlFor="share-url-preview" className="block text-[12px] text-[#A7AAA3] mb-1">
                        Link preview
                      </label>
                      <input
                        id="share-url-preview"
                        type="text"
                        readOnly
                        value={shareUrl}
                        onFocus={(e) => e.currentTarget.select()}
                        className="w-full h-9 px-2.5 bg-[#1B1D1A] text-[#E4E5DF] border border-[#4A4E49] rounded text-[12px] font-mono"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyShareLink}
                      className="w-full h-10 px-3 bg-[#7FB394] text-[#17211B] font-semibold text-[14px] rounded border-0 hover:bg-[#91C2A4] cursor-pointer transition-colors"
                    >
                      {shareCopied ? 'Share link copied' : 'Copy share link'}
                    </button>

                    {shareStatus && (
                      <p
                        role="status"
                        aria-live="polite"
                        className={`m-0 text-[13px] ${
                          shareError ? 'text-[#FF8A80]' : 'text-[#C9CBC5]'
                        }`}
                      >
                        {shareStatus}
                      </p>
                    )}
                  </div>
                )}

                {/* Embed calculator panel */}
                {embedOpen && (
                  <div
                    id="embed-calculator-panel"
                    className="mt-3 p-4 bg-[#2A2C28] border border-[#444741] rounded text-[14px] space-y-3"
                  >
                    <p className="m-0 text-[#E4E5DF] leading-[1.45]">
                      Educators and pricing guides can embed the compact hidden-hours widget on any
                      article. Readers adjust shoots and hidden hours, then click through for the
                      full breakdown.
                    </p>

                    <div>
                      <label htmlFor="embed-partner-id" className="block text-[12px] text-[#A7AAA3] mb-1">
                        Optional partner label (for referral attribution)
                      </label>
                      <input
                        id="embed-partner-id"
                        type="text"
                        value={partnerSlug}
                        onChange={(e) => setPartnerSlug(e.target.value)}
                        placeholder="your-site"
                        className="w-full h-9 px-2.5 bg-[#1B1D1A] text-white border border-[#4A4E49] rounded text-[13px]"
                      />
                    </div>

                    <div>
                      <label htmlFor="embed-code-box" className="block text-[12px] text-[#A7AAA3] mb-1">
                        Copyable iframe code
                      </label>
                      <textarea
                        id="embed-code-box"
                        readOnly
                        rows={4}
                        value={embedCode}
                        onFocus={(e) => e.currentTarget.select()}
                        className="w-full p-2.5 bg-[#1B1D1A] text-[#E4E5DF] border border-[#4A4E49] rounded text-[12px] font-mono resize-y"
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={handleCopyEmbedCode}
                        className="flex-1 h-10 px-3 bg-[#FAF9F6] text-[#20221F] font-semibold text-[14px] rounded border-0 hover:bg-white cursor-pointer transition-colors"
                      >
                        {embedCopied ? 'Embed code copied' : 'Copy embed code'}
                      </button>
                      <a
                        href={`/embed/pricing-calculator${
                          sanitizedPartner ? `?partner=${encodeURIComponent(sanitizedPartner)}` : ''
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center h-10 px-3 border border-[#6E726B] text-[#E4E5DF] hover:text-white hover:border-white rounded text-[13px] no-underline"
                      >
                        Preview widget
                      </a>
                    </div>

                    {embedStatus && (
                      <p role="status" aria-live="polite" className="m-0 text-[13px] text-[#C9CBC5]">
                        {embedStatus}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div
              role="status"
              className="bg-white border border-[#DFE2DB] border-t-2 border-t-[#B42318] rounded p-6"
            >
              <p className="m-0 mb-1.5 font-semibold text-[17px] text-[#20221F]">Results paused</p>
              <p className="m-0 text-[15px] leading-[1.55] text-[#4A4E49]">
                Fix the {validation.errCount === 1 ? '1 input' : `${validation.errCount} inputs`}{' '}
                highlighted to see an estimate. Nothing is calculated from incomplete numbers.
              </p>
            </div>
          )}
          <p className="mt-3 text-[14px] leading-[1.5] text-[#60645F]">
            * This calculator provides a rough estimate. Always consult an accountant for
            personalized financial advice.
          </p>
        </section>
      </div>
    </div>
  );
}
