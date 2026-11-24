'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  calculateGalleryVolume,
  getStandardGalleryPlans,
  getMonthlyEstimateGalleryPlans,
  getPromoGalleryPlans,
  getLowestCostMeta,
  GALLERY_DEFAULT_PHOTOS,
  GALLERY_DEFAULT_SHOOTS,
  GALLERY_MB_PER_JPEG,
  GALLERY_PRICING_CHECKED,
} from '@/lib/gallery-plans';

export function GalleryCostCalculator() {
  const [shoots, setShoots] = useState(String(GALLERY_DEFAULT_SHOOTS));
  const [photos, setPhotos] = useState(String(GALLERY_DEFAULT_PHOTOS));

  const reset = () => {
    setShoots(String(GALLERY_DEFAULT_SHOOTS));
    setPhotos(String(GALLERY_DEFAULT_PHOTOS));
  };

  const nShoots = shoots.trim() === '' ? NaN : Number(shoots);
  const nPhotos = photos.trim() === '' ? NaN : Number(photos);

  const shootsErr =
    isNaN(nShoots) || nShoots < 1
      ? 'Enter at least 1 shoot.'
      : !Number.isInteger(nShoots)
      ? 'Use a whole number.'
      : nShoots > 1000
      ? 'Enter 1,000 or fewer.'
      : '';

  const photosErr =
    isNaN(nPhotos) || nPhotos < 10
      ? 'Enter at least 10 photos.'
      : !Number.isInteger(nPhotos)
      ? 'Use a whole number of photos.'
      : nPhotos > 10000
      ? 'Enter 10,000 or fewer.'
      : '';

  const valid = !shootsErr && !photosErr;

  const vol = valid ? calculateGalleryVolume(nShoots, nPhotos) : null;
  const totalLabel = vol ? vol.totalLabel : '—';
  const gbLabel = vol ? vol.gbLabel : '—';

  const standardRows = valid ? getStandardGalleryPlans(nShoots, nPhotos) : [];
  const monthlyEstimateRows = valid ? getMonthlyEstimateGalleryPlans(nShoots, nPhotos) : [];
  const promoRows = valid ? getPromoGalleryPlans(nShoots, nPhotos) : [];
  const lowestMeta = valid ? getLowestCostMeta(standardRows) : null;

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
      {/* Left Column: Volume Inputs & Basis */}
      <div className="w-full lg:w-[360px] shrink-0 lg:sticky lg:top-24 space-y-4">
        <form
          onSubmit={(e) => e.preventDefault()}
          aria-labelledby="vol-h"
          className="bg-white border border-[#DFE2DB] rounded p-5 sm:p-7"
        >
          <div className="flex justify-between items-center gap-3 mb-4">
            <h2 id="vol-h" className="m-0 text-[19px] font-semibold text-[#20221F]">
              Your volume
            </h2>
            <button
              type="button"
              onClick={reset}
              className="bg-transparent border-0 p-0 text-[#2A4EC2] underline cursor-pointer text-[15px] hover:text-[#20221F]"
            >
              Reset
            </button>
          </div>

          {/* Currency Basis Notice (USD-only to avoid unverified GBP/EUR symbol swaps) */}
          <div className="mb-5 p-3 bg-[#F6F5F1] border border-[#DFE2DB] rounded text-[13.5px] leading-[1.45] text-[#4A4E49]">
            <strong className="text-[#20221F]">Currency: US Dollars (USD)</strong> — All annual and monthly figures reflect published US list prices. Some vendors (such as ShootProof, which lists £160/yr UK and €180/yr EU for Standard) publish separate regional rates; check vendor checkout for local billing.
          </div>

          {/* Inputs */}
          <div className="space-y-5">
            <div>
              <label htmlFor="gc-shoots" className="block text-[15px] font-semibold text-[#20221F] mb-2">
                Shoots per year
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="gc-shoots"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  max="1000"
                  step="1"
                  value={shoots}
                  onChange={(e) => setShoots(e.target.value)}
                  aria-invalid={shootsErr ? 'true' : 'false'}
                  aria-describedby={shootsErr ? 'gc-shoots-err' : undefined}
                  className={`w-[110px] h-11 px-3 border rounded text-[16px] tabular-nums bg-white outline-none focus:border-[#3159D7] ${
                    shootsErr ? 'border-[#B42318]' : 'border-[#B9BDB4]'
                  }`}
                />
                <input
                  type="range"
                  aria-label="Shoots per year slider"
                  min="1"
                  max="100"
                  step="1"
                  value={isNaN(nShoots) ? 1 : Math.min(100, Math.max(1, Math.round(nShoots)))}
                  onChange={(e) => setShoots(e.target.value)}
                  className="flex-1 min-w-0 h-8 accent-[#3159D7] cursor-pointer"
                />
              </div>
              {shootsErr && (
                <p id="gc-shoots-err" role="alert" className="mt-1.5 text-[14px] text-[#B42318]">
                  {shootsErr}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="gc-photos" className="block text-[15px] font-semibold text-[#20221F] mb-2">
                Average photos delivered per shoot
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="gc-photos"
                  type="number"
                  inputMode="numeric"
                  min="10"
                  max="10000"
                  step="1"
                  value={photos}
                  onChange={(e) => setPhotos(e.target.value)}
                  aria-invalid={photosErr ? 'true' : 'false'}
                  aria-describedby={photosErr ? 'gc-photos-err' : undefined}
                  className={`w-[110px] h-11 px-3 border rounded text-[16px] tabular-nums bg-white outline-none focus:border-[#3159D7] ${
                    photosErr ? 'border-[#B42318]' : 'border-[#B9BDB4]'
                  }`}
                />
                <input
                  type="range"
                  aria-label="Photos per shoot slider"
                  min="50"
                  max="2000"
                  step="25"
                  value={isNaN(nPhotos) ? 50 : Math.min(2000, Math.max(50, Math.round(nPhotos)))}
                  onChange={(e) => setPhotos(e.target.value)}
                  className="flex-1 min-w-0 h-8 accent-[#3159D7] cursor-pointer"
                />
              </div>
              {photosErr && (
                <p id="gc-photos-err" role="alert" className="mt-1.5 text-[14px] text-[#B42318]">
                  {photosErr}
                </p>
              )}
            </div>
          </div>

          {/* Volume Summary */}
          <dl className="mt-5 pt-4 border-t border-[#DFE2DB] grid grid-cols-[1fr_auto] gap-x-4 gap-y-1.5 text-[15px] tabular-nums">
            <dt className="text-[#4A4E49]">Total photos a year</dt>
            <dd className="m-0 font-semibold text-right text-[#20221F]">{totalLabel}</dd>
            <dt className="text-[#4A4E49]">Estimated storage</dt>
            <dd className="m-0 font-semibold text-right text-[#20221F]">{gbLabel}</dd>
          </dl>
          <div className="mt-2.5 space-y-1.5 text-[13px] text-[#60645F] leading-[1.45]">
            <p className="m-0">
              Assumes {GALLERY_MB_PER_JPEG} MB per delivered JPEG in decimal gigabytes (1,000 MB = 1 GB) to match vendor storage tiers.
            </p>
            <p className="m-0">
              Retention assumption: calculated on a 1-gallery-per-shoot basis over a 12-month delivery archive. Photo caps (such as ShootProof Free at 100 photos) and active gallery limits (CloudSpot Free at 3 galleries, Entry at 15 galleries) are enforced alongside gigabytes.
            </p>
          </div>
        </form>

        <div className="p-3.5 px-4 bg-[#FBF7EF] border border-[#E7D9BC] rounded text-[14px] leading-[1.5] text-[#4F3A12]">
          <strong>Pricing basis:</strong> published USD annual list prices checked {GALLERY_PRICING_CHECKED}. Lowest-cost badges compare verified annual list subscriptions on one consistent basis. Plans calculated from monthly billing (such as CloudSpot Pro at $34/mo × 12) or temporary promotions are listed separately below and excluded from annual-list winner badges.
        </div>
      </div>

      {/* Right Column: Estimated Annual Costs */}
      <section aria-labelledby="costs-h" className="flex-1 min-w-0 w-full">
        <div className="flex flex-wrap justify-between items-baseline gap-4 mb-3">
          <h2
            id="costs-h"
            className="m-0 font-serif font-medium text-[clamp(26px,2.5vw,32px)] text-[#20221F]"
          >
            Estimated annual costs (USD)
          </h2>
          <p className="m-0 text-[14px] text-[#60645F]">Standard annual list · lowest to highest</p>
        </div>

        {valid && lowestMeta?.isTied && lowestMeta.tieExplanation && (
          <div
            role="note"
            className="m-0 mb-3.5 p-3 px-4 border border-[#9DB0EC] bg-[#EEF2FC] rounded text-[14px] leading-[1.55] text-[#20221F]"
          >
            <strong>Tied for lowest cost:</strong> {lowestMeta.tieExplanation}
          </div>
        )}

        {valid ? (
          <>
            <ol aria-live="polite" className="list-none m-0 p-0 flex flex-col gap-2.5 w-full min-w-0">
              {standardRows.map((r) => {
                const isLowest = lowestMeta ? r.annualCost === lowestMeta.minAnnualCost : false;
                const badgeLabel = lowestMeta?.isTied
                  ? 'Tied for lowest cost (annual list)'
                  : 'Lowest estimated cost (annual list)';

                return (
                  <li
                    key={r.platform}
                    className={`bg-white rounded p-3.5 sm:p-5 w-full min-w-0 transition-colors ${
                      isLowest
                        ? 'border-[1.5px] border-[#3159D7]'
                        : 'border border-[#DFE2DB]'
                    }`}
                  >
                    {isLowest && (
                      <p className="m-0 mb-2.5 text-[13px] font-semibold tracking-[0.04em] uppercase text-[#3159D7]">
                        {badgeLabel}
                      </p>
                    )}
                    <div className="flex flex-wrap justify-between gap-3 sm:gap-6 items-start">
                      <div className="flex-1 min-w-0">
                        <h3 className="m-0 mb-0.5 text-[18px] sm:text-[19px] font-semibold text-[#20221F]">
                          {r.platform}{' '}
                          <span className="font-normal text-[#60645F]">· {r.planName}</span>
                        </h3>
                        <p className="m-0 mb-1.5 text-[14px] sm:text-[15px] text-[#4A4E49]">{r.limit}</p>
                        <p className="m-0 text-[13px] sm:text-[14px] text-[#60645F]">
                          Store commission: {r.commission} · {r.sellingNote}
                        </p>
                        {r.upgradeNote && (
                          <p className="m-0 mt-2 text-[13px] leading-[1.45] text-[#20221F] bg-[#F6F5F1] px-2.5 py-1.5 rounded border border-[#DFE2DB]">
                            {r.upgradeNote}
                          </p>
                        )}
                        {r.billingBasis && (
                          <p className="m-0 mt-2 text-[12px] font-medium text-[#4A4E49] bg-[#F5F7F3] px-2.5 py-1 rounded border border-[#DFE2DB] inline-block">
                            Basis: {r.billingBasis}
                          </p>
                        )}
                        {r.billingNote && (
                          <p className="m-0 mt-1.5 text-[12.5px] leading-[1.45] text-[#60645F]">
                            {r.billingNote}
                          </p>
                        )}
                      </div>
                      <div className="text-left sm:text-right tabular-nums shrink-0">
                        <p className="m-0 font-serif text-[26px] sm:text-[30px] leading-[1.1] text-[#20221F]">
                          ${r.annualCost.toLocaleString('en-US')}
                          <span className="font-sans text-[14px] text-[#60645F]"> USD /yr</span>
                        </p>
                        <p className="mt-0.5 mb-0 text-[13px] sm:text-[14px] text-[#60645F]">
                          ${Number.isInteger(r.monthlyCost) ? r.monthlyCost : r.monthlyCost.toFixed(2)}{' '}
                          {r.pricingCategory === 'monthly-estimate'
                            ? 'USD/mo published monthly rate'
                            : 'USD/mo equivalent'}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/best-client-gallery-software#${r.slug}`}
                      className="inline-block mt-2.5 text-[14px] font-semibold text-[#3159D7] hover:underline"
                    >
                      {r.platform} in our gallery guide
                    </Link>
                  </li>
                );
              })}
            </ol>

            {/* Estimated 12-Month Spend on Monthly Billing (Excluded from Annual-List Ranking) */}
            {monthlyEstimateRows.length > 0 && (
              <div className="mt-5">
                <h3 className="m-0 mb-2 text-[14px] font-semibold uppercase tracking-[0.04em] text-[#4A4E49]">
                  Estimated 12-month spend on monthly billing (excluded from annual-list badges)
                </h3>
                <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
                  {monthlyEstimateRows.map((r) => (
                    <li
                      key={r.platform}
                      className="bg-white rounded p-3.5 sm:p-5 border border-[#DFE2DB] w-full min-w-0"
                    >
                      <p className="m-0 mb-2 text-[12px] font-semibold tracking-[0.04em] uppercase text-[#60645F]">
                        Monthly billing estimate (no published annual list price)
                      </p>
                      <div className="flex flex-wrap justify-between gap-3 sm:gap-6 items-start">
                        <div className="flex-1 min-w-0">
                          <h4 className="m-0 mb-0.5 text-[18px] sm:text-[19px] font-semibold text-[#20221F]">
                            {r.platform}{' '}
                            <span className="font-normal text-[#60645F]">· {r.planName}</span>
                          </h4>
                          <p className="m-0 mb-1.5 text-[14px] sm:text-[15px] text-[#4A4E49]">{r.limit}</p>
                          <p className="m-0 text-[13px] sm:text-[14px] text-[#60645F]">
                            Store commission: {r.commission} · {r.sellingNote}
                          </p>
                          <p className="m-0 mt-2 text-[12px] font-medium text-[#4A4E49] bg-[#F5F7F3] px-2.5 py-1 rounded border border-[#DFE2DB] inline-block">
                            Basis: {r.billingBasis}
                          </p>
                          {r.billingNote && (
                            <p className="m-0 mt-1.5 text-[12.5px] leading-[1.45] text-[#60645F]">
                              {r.billingNote}
                            </p>
                          )}
                        </div>
                        <div className="text-left sm:text-right tabular-nums shrink-0">
                          <p className="m-0 font-serif text-[26px] sm:text-[30px] leading-[1.1] text-[#20221F]">
                            ${r.annualCost.toLocaleString('en-US')}
                            <span className="font-sans text-[14px] text-[#60645F]"> USD /yr est.</span>
                          </p>
                          <p className="mt-0.5 mb-0 text-[13px] sm:text-[14px] text-[#60645F]">
                            ${r.monthlyCost} USD/mo published monthly rate
                          </p>
                        </div>
                      </div>
                      <Link
                        href={`/best-client-gallery-software#${r.slug}`}
                        className="inline-block mt-2.5 text-[14px] font-semibold text-[#3159D7] hover:underline"
                      >
                        {r.platform} in our gallery guide
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Temporary First-Year Promotional Offers (Separated from Standard Annual List Ranking) */}
            {promoRows.length > 0 && (
              <div className="mt-5">
                <h3 className="m-0 mb-2 text-[15px] font-semibold uppercase tracking-[0.04em] text-[#9A3412]">
                  Temporary promotional offers (first year only — not ranked in standard annual list)
                </h3>
                <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
                  {promoRows.map((r) => (
                    <li
                      key={r.platform}
                      className="bg-white rounded p-3.5 sm:p-5 border border-[#FECDCA] w-full min-w-0"
                    >
                      <p className="m-0 mb-2 text-[12px] font-semibold tracking-[0.04em] uppercase text-[#9A3412]">
                        Temporary first-year promotional offer
                      </p>
                      <div className="flex flex-wrap justify-between gap-3 sm:gap-6 items-start">
                        <div className="flex-1 min-w-0">
                          <h4 className="m-0 mb-0.5 text-[18px] sm:text-[19px] font-semibold text-[#20221F]">
                            {r.platform}{' '}
                            <span className="font-normal text-[#60645F]">· {r.planName}</span>
                          </h4>
                          <p className="m-0 mb-1.5 text-[14px] sm:text-[15px] text-[#4A4E49]">{r.limit}</p>
                          <p className="m-0 text-[13px] sm:text-[14px] text-[#60645F]">
                            Store commission: {r.commission} · {r.sellingNote}
                          </p>
                          {r.promoEligibility && (
                            <p className="m-0 mt-2 text-[13px] font-medium text-[#4A4E49]">
                              <strong>Eligibility &amp; expiry:</strong> {r.promoEligibility}
                            </p>
                          )}
                          {r.promoNote && (
                            <p className="m-0 mt-2 text-[13px] font-medium text-[#9A3412] bg-[#FEF3F2] px-2.5 py-1.5 rounded border border-[#FECDCA]">
                              {r.promoNote}
                            </p>
                          )}
                        </div>
                        <div className="text-left sm:text-right tabular-nums shrink-0">
                          <p className="m-0 font-serif text-[26px] sm:text-[30px] leading-[1.1] text-[#20221F]">
                            ${r.annualCost.toLocaleString('en-US')}
                            <span className="font-sans text-[14px] text-[#60645F]"> USD /yr (yr 1)</span>
                          </p>
                          <p className="mt-0.5 mb-0 text-[13px] sm:text-[14px] text-[#60645F]">
                            ${r.monthlyCost} USD/mo promo equiv.
                          </p>
                        </div>
                      </div>
                      <Link
                        href={`/best-client-gallery-software#${r.slug}`}
                        className="inline-block mt-2.5 text-[14px] font-semibold text-[#3159D7] hover:underline"
                      >
                        {r.platform} in our gallery guide
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <div
            role="status"
            className="bg-white border border-[#DFE2DB] border-t-2 border-t-[#B42318] rounded p-6"
          >
            <p className="m-0 mb-1.5 font-semibold text-[17px] text-[#20221F]">Results paused</p>
            <p className="m-0 text-[15px] leading-[1.55] text-[#4A4E49]">
              Enter a valid number of shoots and photos to see plan estimates.
            </p>
          </div>
        )}

        {/* Editorial Context Box */}
        <div className="mt-5 p-4 sm:p-5 border-t-2 border-[#20221F] bg-white border border-[#DFE2DB] rounded">
          <h3 className="m-0 mb-1.5 text-[16px] font-semibold text-[#20221F]">
            Lowest cost isn’t the same as the best fit
          </h3>
          <p className="m-0 text-[15px] leading-[1.55] text-[#4A4E49]">
            This calculator ranks standard annual list prices only. It leaves out print-sale commissions on your actual sales, RAW support, website builders, and client experience. Our overall picks are in the{' '}
            <Link href="/best-client-gallery-software" className="text-[#3159D7] underline hover:text-[#20221F]">
              best client gallery software guide
            </Link>
            , where Pixieset is our best all-in-one and ShootProof our best value.
          </p>
        </div>
      </section>
    </div>
  );
}
