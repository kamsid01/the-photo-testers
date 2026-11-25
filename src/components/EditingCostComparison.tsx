'use client';

import React, { useState } from 'react';
import {
  calculateEditingCosts,
  validateEditedPhotos,
  AFTERSHOOT_PRICING_URL,
  IMAGEN_PRICING_URL,
  EDITING_PRICING_CHECKED,
  EditingFeatures,
} from '@/lib/editing-cost';
import { trackOncePerSession } from '@/lib/analytics';

const DEFAULT_PHOTOS = '14000';
const DEFAULT_FEATURES: EditingFeatures = {
  crop: false,
  straighten: false,
  subjectMask: false,
  smoothSkin: false,
  includeCulling: false,
  includeRetouching: false,
};

function fmtUSD(v: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: Number.isInteger(v) ? 0 : 2,
  }).format(v);
}

export function EditingCostComparison() {
  const [photosRaw, setPhotosRaw] = useState(DEFAULT_PHOTOS);
  const [features, setFeatures] = useState<EditingFeatures>(DEFAULT_FEATURES);
  const [isSoloShooter, setIsSoloShooter] = useState(true);

  const validation = validateEditedPhotos(photosRaw);
  const result = validation.valid
    ? calculateEditingCosts({
        editedPhotosPerYear: validation.value,
        features,
        isSoloShooter,
      })
    : null;

  const notifyInteraction = (nextPhotosRaw: string) => {
    const check = validateEditedPhotos(nextPhotosRaw);
    if (check.valid) {
      trackOncePerSession('comparison_estimate_used', { page: '/aftershoot-vs-imagen' });
    }
  };

  const handlePhotosChange = (val: string) => {
    setPhotosRaw(val);
    notifyInteraction(val);
  };

  const toggleFeature = (key: keyof EditingFeatures) => {
    setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
    notifyInteraction(photosRaw);
  };

  const handleSoloChange = (solo: boolean) => {
    setIsSoloShooter(solo);
    notifyInteraction(photosRaw);
  };

  return (
    <section
      id="compare-editing-costs"
      aria-labelledby="compare-editing-costs-h"
      className="my-8 p-5 sm:p-7 bg-white border border-[#DFE2DB] border-t-2 border-t-[#20221F] rounded font-sans scroll-mt-24"
    >
      <p className="m-0 mb-1.5 text-[13px] font-semibold tracking-[0.05em] uppercase text-[#3159D7]">
        Interactive cost check
      </p>
      <h2
        id="compare-editing-costs-h"
        className="m-0 mb-2 font-serif font-medium text-[clamp(24px,2.4vw,30px)] leading-[1.15] text-[#20221F]"
      >
        Compare my annual editing cost
      </h2>
      <p className="m-0 mb-5 text-[15px] leading-[1.55] text-[#4A4E49]">
        Enter the number of <strong>photos you edit and deliver per year</strong>—not total RAW frames captured. A 2,500-RAW wedding typically yields 600–800 edited keepers.
      </p>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="ec-photos" className="block text-[15px] font-semibold text-[#20221F] mb-1.5">
            Photos edited per year
          </label>
          <input
            id="ec-photos"
            type="number"
            inputMode="numeric"
            min="1"
            max="500000"
            step="1"
            value={photosRaw}
            onChange={(e) => handlePhotosChange(e.target.value)}
            aria-invalid={!validation.valid ? 'true' : 'false'}
            aria-describedby={!validation.valid ? 'ec-photos-err' : 'ec-photos-help'}
            className={`w-full max-w-[220px] h-11 px-3 border rounded text-[16px] tabular-nums bg-white outline-none focus:border-[#3159D7] ${
              !validation.valid ? 'border-[#B42318]' : 'border-[#B9BDB4]'
            }`}
          />
          {!validation.valid ? (
            <p id="ec-photos-err" role="alert" className="mt-1.5 mb-0 text-[14px] text-[#B42318]">
              {validation.error}
            </p>
          ) : (
            <p id="ec-photos-help" className="mt-1.5 mb-0 text-[13px] text-[#60645F]">
              Example presets:{' '}
              <button
                type="button"
                onClick={() => handlePhotosChange('2000')}
                className="bg-transparent border-0 p-0 text-[#3159D7] underline cursor-pointer text-[13px]"
              >
                2,000 (low-volume)
              </button>
              {' · '}
              <button
                type="button"
                onClick={() => handlePhotosChange('14000')}
                className="bg-transparent border-0 p-0 text-[#3159D7] underline cursor-pointer text-[13px]"
              >
                14,000 (20 weddings)
              </button>
              {' · '}
              <button
                type="button"
                onClick={() => handlePhotosChange('35000')}
                className="bg-transparent border-0 p-0 text-[#3159D7] underline cursor-pointer text-[13px]"
              >
                35,000 (studio)
              </button>
            </p>
          )}
        </div>

        <div>
          <fieldset className="border-0 m-0 p-0">
            <legend className="text-[15px] font-semibold text-[#20221F] mb-2 p-0">
              Editing &amp; workflow features needed
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[14px] text-[#20221F]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={features.crop}
                  onChange={() => toggleFeature('crop')}
                  className="w-4 h-4 accent-[#3159D7]"
                />
                <span>AI Crop (+$0.01/photo on Imagen)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={features.straighten}
                  onChange={() => toggleFeature('straighten')}
                  className="w-4 h-4 accent-[#3159D7]"
                />
                <span>AI Straighten (+$0.01/photo)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={features.subjectMask}
                  onChange={() => toggleFeature('subjectMask')}
                  className="w-4 h-4 accent-[#3159D7]"
                />
                <span>Subject Mask (+$0.01/photo)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={features.smoothSkin}
                  onChange={() => toggleFeature('smoothSkin')}
                  className="w-4 h-4 accent-[#3159D7]"
                />
                <span>Smooth Skin (+$0.01/photo)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={features.includeCulling}
                  onChange={() => toggleFeature('includeCulling')}
                  className="w-4 h-4 accent-[#3159D7]"
                />
                <span>Include AI Culling</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={features.includeRetouching}
                  onChange={() => toggleFeature('includeRetouching')}
                  className="w-4 h-4 accent-[#3159D7]"
                />
                <span>Include Portrait Retouching</span>
              </label>
            </div>
          </fieldset>
        </div>
      </div>

      {/* Solo-shooter eligibility question: shown ONLY when Imagen PAYG exceeds Limitless ($1,548/yr) */}
      {result && result.imagenLimitlessRelevant && (
        <fieldset className="mb-6 p-3.5 px-4 bg-[#FBF7EF] border border-[#E7D9BC] rounded">
          <legend className="text-[14px] font-semibold text-[#4F3A12] px-1">
            Imagen Limitless eligibility (affects your available plan at this volume)
          </legend>
          <p className="m-0 mb-2.5 text-[14px] text-[#4F3A12]">
            At {result.editedPhotosPerYear.toLocaleString('en-US')} edited photos/year, Imagen Pay-As-You-Go ({fmtUSD(result.imagenPaygAnnual)}/yr) exceeds Imagen’s solo Limitless tier ($1,548/yr). Do you shoot and edit only your own work?
          </p>
          <div className="flex flex-wrap gap-4 text-[14px] text-[#20221F]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="ec-solo"
                checked={isSoloShooter}
                onChange={() => handleSoloChange(true)}
                className="w-4 h-4 accent-[#3159D7]"
              />
              <span>Yes — solo photographer (eligible for Limitless)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="ec-solo"
                checked={!isSoloShooter}
                onChange={() => handleSoloChange(false)}
                className="w-4 h-4 accent-[#3159D7]"
              />
              <span>No — multi-shooter studio / team (ineligible for solo Limitless)</span>
            </label>
          </div>
        </fieldset>
      )}

      {/* Results */}
      {result && result.valid ? (
        <div aria-live="polite">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* Aftershoot Card */}
            <div
              className={`p-4 rounded border ${
                result.cheaperVendor === 'Aftershoot'
                  ? 'border-[1.5px] border-[#3159D7] bg-[#F8FAFF]'
                  : 'border-[#DFE2DB] bg-[#FAF9F6]'
              }`}
            >
              <div className="flex justify-between items-baseline gap-2 mb-1">
                <h3 className="m-0 text-[17px] font-semibold text-[#20221F]">Aftershoot</h3>
                {result.cheaperVendor === 'Aftershoot' && (
                  <span className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#3159D7]">
                    Lower annual cost
                  </span>
                )}
              </div>
              <p className="m-0 mb-1 text-[14px] font-medium text-[#4A4E49]">{result.aftershootPlan}</p>
              <p className="m-0 mb-2 font-serif text-[32px] leading-none text-[#20221F] tabular-nums">
                {fmtUSD(result.aftershootAnnual)}
                <span className="font-sans text-[14px] text-[#60645F]"> USD /yr</span>
              </p>
              <p className="m-0 text-[13px] leading-[1.45] text-[#4A4E49]">{result.aftershootBasis}</p>
            </div>

            {/* Imagen Card */}
            <div
              className={`p-4 rounded border ${
                result.cheaperVendor === 'Imagen'
                  ? 'border-[1.5px] border-[#3159D7] bg-[#F8FAFF]'
                  : 'border-[#DFE2DB] bg-[#FAF9F6]'
              }`}
            >
              <div className="flex justify-between items-baseline gap-2 mb-1">
                <h3 className="m-0 text-[17px] font-semibold text-[#20221F]">Imagen AI</h3>
                {result.cheaperVendor === 'Imagen' && (
                  <span className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#3159D7]">
                    Lower annual cost
                  </span>
                )}
              </div>
              <p className="m-0 mb-1 text-[14px] font-medium text-[#4A4E49]">{result.imagenPlan}</p>
              <p className="m-0 mb-2 font-serif text-[32px] leading-none text-[#20221F] tabular-nums">
                {fmtUSD(result.imagenAnnual)}
                <span className="font-sans text-[14px] text-[#60645F]"> USD /yr</span>
              </p>
              <p className="m-0 text-[13px] leading-[1.45] text-[#4A4E49]">{result.imagenBasis}</p>
              {result.imagenEligibilityNote && (
                <p className="m-0 mt-2 text-[13px] leading-[1.45] text-[#9A3412] font-medium">
                  {result.imagenEligibilityNote}
                </p>
              )}
            </div>
          </div>

          {/* Crossover Summary */}
          <div className="p-3.5 px-4 bg-[#F6F5F1] border border-[#DFE2DB] rounded text-[14px] leading-[1.55] text-[#20221F] space-y-1">
            <p className="m-0">
              <strong>Summary:</strong>{' '}
              {result.cheaperVendor === 'Tie'
                ? `Both tools estimate ${fmtUSD(result.aftershootAnnual)} per year at ${result.editedPhotosPerYear.toLocaleString('en-US')} edited photos.`
                : `${result.cheaperVendor} saves ${fmtUSD(result.annualSavings)} per year at ${result.editedPhotosPerYear.toLocaleString('en-US')} edited photos (${fmtUSD(result.imagenPerPhotoRate)}/photo on Imagen PAYG).`}
            </p>
            <p className="m-0 text-[#4A4E49]">
              <strong>Break-even crossover:</strong> Approximately{' '}
              <strong>{result.crossoverPhotos.toLocaleString('en-US')} edited photos/year</strong> at{' '}
              ${result.imagenPerPhotoRate.toFixed(2)}/photo on Imagen PAYG against Aftershoot {result.aftershootPlan} ({fmtUSD(result.aftershootAnnual)}/yr).
              {result.imagenMinApplied &&
                ' At very low volume, Imagen’s $7/month ($84/year) minimum base fee sets the floor (unused balance rolls over as export credit).'}
            </p>
            <p className="m-0 text-[13px] text-[#60645F]">
              Sources verified {EDITING_PRICING_CHECKED}:{' '}
              <a
                href={AFTERSHOOT_PRICING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3159D7] underline"
              >
                Aftershoot pricing tiers
              </a>{' '}
              ·{' '}
              <a
                href={IMAGEN_PRICING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3159D7] underline"
              >
                Imagen AI pricing
              </a>
              . Estimates use published USD annual list rates; your inputs stay in your browser and are not logged.
            </p>
          </div>
        </div>
      ) : (
        <div
          role="status"
          className="p-4 bg-[#FAF9F6] border border-[#DFE2DB] border-t-2 border-t-[#B42318] rounded text-[15px] text-[#4A4E49]"
        >
          <strong className="text-[#20221F]">Comparison paused:</strong> Enter a valid whole number of edited photos per year to calculate annual estimates.
        </div>
      )}
    </section>
  );
}
