'use client';

import React, { useMemo, useState } from 'react';
import {
  PRICING_DEFAULTS,
  PricingRawInputs,
  calculatePricingEstimate,
  encodePricingHash,
  validatePricingInputs,
} from '@/lib/pricing-math';

interface PricingCalculatorEmbedProps {
  partner?: string;
}

export function PricingCalculatorEmbed({ partner }: PricingCalculatorEmbedProps) {
  const [shoots, setShoots] = useState(PRICING_DEFAULTS.shoots);
  const [hiddenH, setHiddenH] = useState(PRICING_DEFAULTS.hiddenH);

  const rawInputs: PricingRawInputs = useMemo(
    () => ({
      ...PRICING_DEFAULTS,
      shoots,
      hiddenH,
    }),
    [shoots, hiddenH]
  );

  const validation = useMemo(() => validatePricingInputs(rawInputs), [rawInputs]);
  const out = useMemo(
    () => (validation.valid ? calculatePricingEstimate(validation.values) : null),
    [validation]
  );

  const cleanPartner =
    partner && /^[a-zA-Z0-9._-]{1,64}$/.test(partner.trim()) ? partner.trim() : 'embed';

  const fullCalculatorHref = useMemo(() => {
    const isDefault = shoots === PRICING_DEFAULTS.shoots && hiddenH === PRICING_DEFAULTS.hiddenH;
    const hash = encodePricingHash(
      isDefault ? 'example' : 'custom',
      rawInputs,
      'wedding-hidden-hours',
      cleanPartner
    );
    return `/tools/pricing-calculator${hash}`;
  }, [shoots, hiddenH, rawInputs, cleanPartner]);

  const shootsNum = Number(shoots);
  const hiddenNum = Number(hiddenH);

  return (
    <div className="min-h-screen bg-[#FAF9F6] p-3 sm:p-4 text-[#20221F] font-sans">
      <div className="max-w-[520px] mx-auto bg-white border border-[#DFE2DB] rounded-md p-4 sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
          <h1 className="m-0 font-serif text-[20px] leading-[1.2] font-medium text-[#20221F]">
            Photography Hourly Rate Check
          </h1>
          <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#60645F]">
            The Photo Testers
          </span>
        </div>

        <p className="m-0 mb-4 text-[13px] leading-[1.45] text-[#4A4E49]">
          Fixed assumptions: <strong>£40,000</strong> take-home · <strong>£8,000</strong> annual
          costs · <strong>25%</strong> tax · <strong>8h</strong> shoot day.
        </p>

        {/* Compact controls: Shoots per year + Hidden hours */}
        <div className="space-y-3.5 mb-4">
          <div>
            <div className="flex justify-between items-baseline gap-2 mb-1">
              <label htmlFor="embed-shoots" className="text-[13px] font-semibold text-[#20221F]">
                Shoots per year
              </label>
              <span className="text-[12px] text-[#60645F]">1–1000</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                id="embed-shoots"
                type="number"
                inputMode="numeric"
                min={1}
                max={1000}
                step={1}
                value={shoots}
                onChange={(e) => setShoots(e.target.value)}
                aria-invalid={validation.errors.shoots ? 'true' : 'false'}
                className={`w-[88px] h-9 px-2.5 border rounded text-[15px] tabular-nums bg-white ${
                  validation.errors.shoots ? 'border-[#B42318]' : 'border-[#B9BDB4]'
                }`}
              />
              <input
                type="range"
                aria-label="Shoots per year slider"
                min={5}
                max={100}
                step={1}
                value={Number.isNaN(shootsNum) ? 30 : Math.min(100, Math.max(5, shootsNum))}
                onChange={(e) => setShoots(e.target.value)}
                className="flex-1 min-w-0 h-7 accent-[#3159D7] cursor-pointer"
              />
            </div>
            {validation.errors.shoots && (
              <p role="alert" className="m-0 mt-1 text-[12px] text-[#B42318]">
                {validation.errors.shoots}
              </p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-baseline gap-2 mb-1">
              <label htmlFor="embed-hidden" className="text-[13px] font-semibold text-[#20221F]">
                Hidden hours per shoot (editing, admin, travel)
              </label>
              <span className="text-[12px] text-[#60645F]">hours</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                id="embed-hidden"
                type="number"
                inputMode="numeric"
                min={0}
                max={200}
                step={1}
                value={hiddenH}
                onChange={(e) => setHiddenH(e.target.value)}
                aria-invalid={validation.errors.hiddenH ? 'true' : 'false'}
                className={`w-[88px] h-9 px-2.5 border rounded text-[15px] tabular-nums bg-white ${
                  validation.errors.hiddenH ? 'border-[#B42318]' : 'border-[#B9BDB4]'
                }`}
              />
              <input
                type="range"
                aria-label="Hidden hours per shoot slider"
                min={0}
                max={60}
                step={1}
                value={Number.isNaN(hiddenNum) ? 15 : Math.min(60, Math.max(0, hiddenNum))}
                onChange={(e) => setHiddenH(e.target.value)}
                className="flex-1 min-w-0 h-7 accent-[#3159D7] cursor-pointer"
              />
            </div>
            {validation.errors.hiddenH && (
              <p role="alert" className="m-0 mt-1 text-[12px] text-[#B42318]">
                {validation.errors.hiddenH}
              </p>
            )}
          </div>
        </div>

        {/* Result summary */}
        {validation.valid && out ? (
          <div
            aria-live="polite"
            className="bg-[#20221F] text-white rounded p-3.5 sm:p-4 mb-3.5"
          >
            <div className="grid grid-cols-3 gap-2 text-left tabular-nums">
              <div>
                <div className="text-[11px] text-[#A7AAA3] mb-0.5">Price / shoot</div>
                <div data-testid="embed-price" className="text-[20px] sm:text-[22px] font-serif leading-tight">
                  {out.price}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-[#A7AAA3] mb-0.5">Gross / hr</div>
                <div data-testid="embed-gross" className="text-[17px] sm:text-[19px] font-semibold leading-tight">
                  {out.grossHourly}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-[#A7AAA3] mb-0.5">Take-home / hr</div>
                <div
                  data-testid="embed-takehome"
                  className="text-[17px] sm:text-[19px] font-semibold text-[#7FB394] leading-tight"
                >
                  {out.takeHourly}
                </div>
              </div>
            </div>
            <p className="m-0 mt-2 text-[12px] text-[#C9CBC5]">
              {out.hours} total per shoot ({PRICING_DEFAULTS.shootH}h shooting + {hiddenH}h hidden).
            </p>
          </div>
        ) : (
          <div
            role="status"
            className="p-3 bg-[#FFF8F6] border border-[#E7B5AF] rounded text-[13px] text-[#B42318] mb-3.5"
          >
            Enter valid whole numbers to update the estimate.
          </div>
        )}

        <a
          data-testid="embed-open-full-link"
          href={fullCalculatorHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full h-10 px-4 bg-[#3159D7] text-white font-semibold text-[14px] rounded no-underline hover:bg-[#2647B3] transition-colors"
        >
          Open full calculator with these numbers →
        </a>
      </div>
    </div>
  );
}
