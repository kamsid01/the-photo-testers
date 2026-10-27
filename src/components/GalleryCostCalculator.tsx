'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type Currency = 'USD' | 'GBP' | 'EUR';

interface PlatformPlan {
  platform: string;
  planName: string;
  monthlyCost: number;
  annualCost: number;
  limit: string;
  commission: string;
  slug: string;
}

export function GalleryCostCalculator() {
  const [cur, setCur] = useState<Currency>('USD');
  const [shoots, setShoots] = useState('30');
  const [photos, setPhotos] = useState('500');

  const sym = { USD: '$', GBP: '£', EUR: '€' }[cur];

  const reset = () => {
    setCur('USD');
    setShoots('30');
    setPhotos('500');
  };

  const nShoots = shoots === '' ? NaN : Number(shoots);
  const nPhotos = photos === '' ? NaN : Number(photos);

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
      : nPhotos > 10000
      ? 'Enter 10,000 or fewer.'
      : '';

  const valid = !shootsErr && !photosErr;

  const totalPhotos = valid ? nShoots * nPhotos : 0;
  const storageGB = valid ? (totalPhotos * 5) / 1024 : 0;

  const totalLabel = valid ? totalPhotos.toLocaleString('en-US') : '—';
  const gbLabel = valid ? `${storageGB.toFixed(1)} GB` : '—';

  const getPlans = (total: number, gb: number): PlatformPlan[] => {
    const list: PlatformPlan[] = [];

    // Pixieset
    if (gb <= 3) {
      list.push({ platform: 'Pixieset', planName: 'Free', monthlyCost: 0, annualCost: 0, limit: '3GB storage limit', commission: '15%', slug: 'pixieset' });
    } else if (gb <= 10) {
      list.push({ platform: 'Pixieset', planName: 'Creator', monthlyCost: 18, annualCost: 216, limit: '10GB storage limit', commission: '15%', slug: 'pixieset' });
    } else if (gb <= 100) {
      list.push({ platform: 'Pixieset', planName: 'Basic', monthlyCost: 24, annualCost: 288, limit: '100GB storage limit', commission: '0%', slug: 'pixieset' });
    } else if (gb <= 1000) {
      list.push({ platform: 'Pixieset', planName: 'Plus', monthlyCost: 34, annualCost: 408, limit: '1,000GB storage limit', commission: '0%', slug: 'pixieset' });
    } else {
      list.push({ platform: 'Pixieset', planName: 'Pro', monthlyCost: 50, annualCost: 600, limit: 'Unlimited storage, RAW support', commission: '0%', slug: 'pixieset' });
    }

    // ShootProof
    if (total <= 100) {
      list.push({ platform: 'ShootProof', planName: 'Free', monthlyCost: 0, annualCost: 0, limit: '100 photos maximum', commission: 'Commission-free store (per our guide)', slug: 'shootproof' });
    } else if (total <= 1500) {
      list.push({ platform: 'ShootProof', planName: '1,500 Photos', monthlyCost: 10, annualCost: 120, limit: 'Up to 1,500 photos, priced by count not storage', commission: 'Commission-free store (per our guide)', slug: 'shootproof' });
    } else if (total <= 5000) {
      list.push({ platform: 'ShootProof', planName: '5,000 Photos', monthlyCost: 20, annualCost: 240, limit: 'Up to 5,000 photos, priced by count not storage', commission: 'Commission-free store (per our guide)', slug: 'shootproof' });
    } else if (total <= 25000) {
      list.push({ platform: 'ShootProof', planName: '25,000 Photos', monthlyCost: 30, annualCost: 360, limit: 'Up to 25,000 photos, priced by count not storage', commission: 'Commission-free store (per our guide)', slug: 'shootproof' });
    } else {
      list.push({ platform: 'ShootProof', planName: 'Unlimited', monthlyCost: 50, annualCost: 600, limit: 'Unlimited photos', commission: 'Commission-free store (per our guide)', slug: 'shootproof' });
    }

    // Pic-Time
    if (gb <= 10) {
      list.push({ platform: 'Pic-Time', planName: 'Free', monthlyCost: 0, annualCost: 0, limit: '10GB storage limit', commission: '15%', slug: 'pic-time' });
    } else if (gb <= 100) {
      list.push({ platform: 'Pic-Time', planName: 'Professional', monthlyCost: 26, annualCost: 312, limit: '100GB storage limit, store marketing tools', commission: 'Not specified in our data', slug: 'pic-time' });
    } else {
      list.push({ platform: 'Pic-Time', planName: 'Advanced', monthlyCost: 42, annualCost: 504, limit: 'Unlimited storage, premium marketing apps', commission: 'Not specified in our data', slug: 'pic-time' });
    }

    // SmugMug: Updated per explicit rule — default to Power ($15/mo, $180/yr) since storage is unlimited
    list.push({
      platform: 'SmugMug',
      planName: 'Power',
      monthlyCost: 15,
      annualCost: 180,
      limit: 'Unlimited storage',
      commission: 'Store features included',
      slug: 'smugmug',
    });

    // Zenfolio
    if (gb <= 15) {
      list.push({ platform: 'Zenfolio', planName: 'Portfolio', monthlyCost: 9, annualCost: 108, limit: '15GB storage limit; limited direct selling', commission: 'Not specified in our data', slug: 'zenfolio' });
    } else if (gb <= 100) {
      list.push({ platform: 'Zenfolio', planName: 'PortfolioPlus', monthlyCost: 19, annualCost: 228, limit: '100GB storage limit', commission: 'Not specified in our data', slug: 'zenfolio' });
    } else {
      list.push({ platform: 'Zenfolio', planName: 'ProSuite', monthlyCost: 40, annualCost: 480, limit: 'Unlimited storage, advanced selling', commission: 'Not specified in our data', slug: 'zenfolio' });
    }

    // CloudSpot
    if (gb <= 10) {
      list.push({ platform: 'CloudSpot', planName: 'Free', monthlyCost: 0, annualCost: 0, limit: '10GB storage limit', commission: '15%', slug: 'cloudspot' });
    } else if (gb <= 50) {
      list.push({ platform: 'CloudSpot', planName: 'Lite', monthlyCost: 15, annualCost: 180, limit: '50GB storage limit', commission: 'Not specified in our data', slug: 'cloudspot' });
    } else {
      list.push({ platform: 'CloudSpot', planName: 'Pro', monthlyCost: 45, annualCost: 540, limit: 'Unlimited storage', commission: '0%', slug: 'cloudspot' });
    }

    return list.sort((a, b) => a.annualCost - b.annualCost);
  };

  const rows = valid ? getPlans(totalPhotos, storageGB) : [];

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

          {/* Currency Switch */}
          <fieldset className="border-0 m-0 mb-5 p-0">
            <legend className="text-[15px] font-semibold text-[#20221F] mb-1 p-0">
              Currency symbol
            </legend>
            <p className="m-0 mb-2 text-[14px] text-[#60645F]">
              Display only. Amounts are not converted.
            </p>
            <div className="inline-flex border border-[#B9BDB4] rounded overflow-hidden">
              {(['USD', 'GBP', 'EUR'] as Currency[]).map((c) => {
                const isSelected = cur === c;
                const label = { USD: '$ USD', GBP: '£ GBP', EUR: '€ EUR' }[c];
                return (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setCur(c)}
                    className={`min-w-[56px] h-10 px-3 border-0 border-r border-[#DFE2DB] last:border-r-0 font-semibold text-[15px] cursor-pointer transition-colors ${
                      isSelected ? 'bg-[#20221F] text-white' : 'bg-white text-[#20221F] hover:bg-[#F3F2EE]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </fieldset>

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
                  value={isNaN(nShoots) ? 1 : Math.min(100, Math.max(1, nShoots))}
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
                  step="25"
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
                  value={isNaN(nPhotos) ? 50 : Math.min(2000, Math.max(50, nPhotos))}
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
          <p className="m-0 mt-2 text-[13px] text-[#60645F]">
            Assumes about 5MB per delivered JPEG.
          </p>
        </form>

        <div className="p-3.5 px-4 bg-[#FBF7EF] border border-[#E7D9BC] rounded text-[14px] leading-[1.5] text-[#4F3A12]">
          <strong>Pricing basis:</strong> published pricing as of August 2026. Confirm current rates, commissions, and storage limits with each provider before subscribing.
        </div>
      </div>

      {/* Right Column: Estimated Annual Costs */}
      <section aria-labelledby="costs-h" className="flex-1 min-w-0 w-full">
        <div className="flex flex-wrap justify-between items-baseline gap-4 mb-3">
          <h2
            id="costs-h"
            className="m-0 font-serif font-medium text-[clamp(26px,2.5vw,32px)] text-[#20221F]"
          >
            Estimated annual costs
          </h2>
          <p className="m-0 text-[14px] text-[#60645F]">Sorted lowest to highest</p>
        </div>

        {cur !== 'USD' && (
          <p
            role="note"
            className="m-0 mb-3.5 p-2.5 px-3.5 border border-[#DFE2DB] bg-white rounded text-[14px] leading-[1.5] text-[#4A4E49]"
          >
            Showing the platforms’ USD list prices with the {sym} symbol. These are not converted and may differ from local pricing.
          </p>
        )}

        {valid ? (
          <ol aria-live="polite" className="list-none m-0 p-0 grid gap-2.5">
            {rows.map((r, i) => {
              const isLowest = i === 0;
              return (
                <li
                  key={r.platform}
                  className={`bg-white rounded p-4 sm:p-5 transition-colors ${
                    isLowest
                      ? 'border-[1.5px] border-[#3159D7]'
                      : 'border border-[#DFE2DB]'
                  }`}
                >
                  {isLowest && (
                    <p className="m-0 mb-2.5 text-[13px] font-semibold tracking-[0.04em] uppercase text-[#3159D7]">
                      Lowest estimated cost
                    </p>
                  )}
                  <div className="flex flex-wrap justify-between gap-4 sm:gap-6 items-start">
                    <div className="flex-1 min-w-[260px]">
                      <h3 className="m-0 mb-0.5 text-[19px] font-semibold text-[#20221F]">
                        {r.platform}{' '}
                        <span className="font-normal text-[#60645F]">· {r.planName}</span>
                      </h3>
                      <p className="m-0 mb-1.5 text-[15px] text-[#4A4E49]">{r.limit}</p>
                      <p className="m-0 text-[14px] text-[#60645F]">
                        Store commission: {r.commission}
                      </p>
                    </div>
                    <div className="text-right tabular-nums">
                      <p className="m-0 font-serif text-[30px] leading-[1.1] text-[#20221F]">
                        {sym}
                        {r.annualCost.toLocaleString('en-US')}
                        <span className="font-sans text-[14px] text-[#60645F]"> /yr</span>
                      </p>
                      <p className="mt-0.5 mb-0 text-[14px] text-[#60645F]">
                        {sym}
                        {r.monthlyCost} a month equivalent
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
            This calculator ranks subscription cost only. It leaves out print-sale commissions on your actual sales, RAW support, website builders, and client experience. Our overall picks are in the{' '}
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
