'use client';

import { useState } from 'react';
import Link from 'next/link';

type PlatformResult = {
  platform: string;
  planName: string;
  monthlyCost: number;
  annualCost: number;
  note: string;
  link: string;
};

export function GalleryCostCalculator() {
  const [currency, setCurrency] = useState('£');
  const [shoots, setShoots] = useState(30);
  const [photosPerShoot, setPhotosPerShoot] = useState(500);

  const totalPhotos = shoots * photosPerShoot;
  // Assume ~5MB per JPEG
  const storageGB = (totalPhotos * 5) / 1024;

  const calculateTiers = (): PlatformResult[] => {
    const results: PlatformResult[] = [];

    // Pixieset
    if (storageGB <= 3) {
      results.push({ platform: 'Pixieset', planName: 'Free', monthlyCost: 0, annualCost: 0, note: '3GB limit, 15% store commission', link: '/best-client-gallery-software#pixieset' });
    } else if (storageGB <= 10) {
      results.push({ platform: 'Pixieset', planName: 'Creator', monthlyCost: 18, annualCost: 18 * 12, note: '10GB limit, 15% store commission', link: '/best-client-gallery-software#pixieset' });
    } else if (storageGB <= 100) {
      results.push({ platform: 'Pixieset', planName: 'Basic', monthlyCost: 24, annualCost: 24 * 12, note: '100GB limit, 0% commission', link: '/best-client-gallery-software#pixieset' });
    } else if (storageGB <= 1000) {
      results.push({ platform: 'Pixieset', planName: 'Plus', monthlyCost: 34, annualCost: 34 * 12, note: '1000GB limit, 0% commission', link: '/best-client-gallery-software#pixieset' });
    } else {
      results.push({ platform: 'Pixieset', planName: 'Pro', monthlyCost: 50, annualCost: 50 * 12, note: 'Unlimited storage, RAW support', link: '/best-client-gallery-software#pixieset' });
    }

    // ShootProof
    if (totalPhotos <= 100) {
      results.push({ platform: 'ShootProof', planName: 'Free', monthlyCost: 0, annualCost: 0, note: '100 photos max', link: '/best-client-gallery-software#shootproof' });
    } else if (totalPhotos <= 1500) {
      results.push({ platform: 'ShootProof', planName: '1,500 Photos', monthlyCost: 10, annualCost: 10 * 12, note: 'Priced by photo count, not storage', link: '/best-client-gallery-software#shootproof' });
    } else if (totalPhotos <= 5000) {
      results.push({ platform: 'ShootProof', planName: '5,000 Photos', monthlyCost: 20, annualCost: 20 * 12, note: 'Priced by photo count, not storage', link: '/best-client-gallery-software#shootproof' });
    } else if (totalPhotos <= 25000) {
      results.push({ platform: 'ShootProof', planName: '25,000 Photos', monthlyCost: 30, annualCost: 30 * 12, note: 'Priced by photo count, not storage', link: '/best-client-gallery-software#shootproof' });
    } else {
      results.push({ platform: 'ShootProof', planName: 'Unlimited', monthlyCost: 50, annualCost: 50 * 12, note: 'Unlimited photos', link: '/best-client-gallery-software#shootproof' });
    }

    // Pic-Time
    if (storageGB <= 10) {
      results.push({ platform: 'Pic-Time', planName: 'Free', monthlyCost: 0, annualCost: 0, note: '10GB limit, 15% commission', link: '/best-client-gallery-software#pic-time' });
    } else if (storageGB <= 100) {
      results.push({ platform: 'Pic-Time', planName: 'Professional', monthlyCost: 26, annualCost: 26 * 12, note: '100GB limit, best-in-class store marketing', link: '/best-client-gallery-software#pic-time' });
    } else {
      results.push({ platform: 'Pic-Time', planName: 'Advanced', monthlyCost: 42, annualCost: 42 * 12, note: 'Unlimited storage, premium marketing apps', link: '/best-client-gallery-software#pic-time' });
    }

    // SmugMug
    if (shoots > 50) {
      results.push({ platform: 'SmugMug', planName: 'Pro', monthlyCost: 45, annualCost: 45 * 12, note: 'Unlimited storage, advanced custom price lists', link: '/best-client-gallery-software#smugmug' });
    } else {
      results.push({ platform: 'SmugMug', planName: 'Power', monthlyCost: 15, annualCost: 15 * 12, note: 'Unlimited storage, highly customizable', link: '/best-client-gallery-software#smugmug' });
    }

    // Zenfolio
    if (storageGB <= 15) {
      results.push({ platform: 'Zenfolio', planName: 'Portfolio', monthlyCost: 9, annualCost: 9 * 12, note: '15GB limit, great budget option', link: '/best-client-gallery-software#zenfolio' });
    } else if (storageGB <= 100) {
      results.push({ platform: 'Zenfolio', planName: 'PortfolioPlus', monthlyCost: 19, annualCost: 19 * 12, note: '100GB limit', link: '/best-client-gallery-software#zenfolio' });
    } else {
      results.push({ platform: 'Zenfolio', planName: 'ProSuite', monthlyCost: 40, annualCost: 40 * 12, note: 'Unlimited storage, advanced selling', link: '/best-client-gallery-software#zenfolio' });
    }

    // CloudSpot
    if (storageGB <= 10) {
      results.push({ platform: 'CloudSpot', planName: 'Free', monthlyCost: 0, annualCost: 0, note: '10GB limit, 15% commission', link: '/best-client-gallery-software#cloudspot' });
    } else if (storageGB <= 50) {
      results.push({ platform: 'CloudSpot', planName: 'Lite', monthlyCost: 15, annualCost: 15 * 12, note: '50GB limit, beautiful mobile apps', link: '/best-client-gallery-software#cloudspot' });
    } else {
      results.push({ platform: 'CloudSpot', planName: 'Pro', monthlyCost: 45, annualCost: 45 * 12, note: 'Unlimited storage, 0% commission', link: '/best-client-gallery-software#cloudspot' });
    }

    return results.sort((a, b) => a.annualCost - b.annualCost);
  };

  const results = calculateTiers();
  
  const formatCurrency = (val: number) => {
    const code = currency === '£' ? 'GBP' : currency === '$' ? 'USD' : 'EUR';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: code,
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-12">
      {/* INPUTS SIDEBAR */}
      <div className="lg:col-span-1 flex flex-col gap-6 sticky top-6">
        <div className="bg-surface p-6 rounded-xl border border-border">
          <h2 className="text-xl font-bold mb-6 text-ink">Your Volume</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Currency (Display Only)</label>
              <div className="flex gap-2">
                {['£', '$', '€'].map(sym => (
                  <button
                    key={sym}
                    onClick={() => setCurrency(sym)}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                      currency === sym 
                        ? 'bg-accent text-white border-accent' 
                        : 'bg-white text-ink border border-border hover:border-accent'
                    }`}
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-ink">Shoots Per Year</label>
                <span className="font-bold text-accent">{shoots}</span>
              </div>
              <input 
                type="range" min="1" max="150" step="1"
                value={shoots} onChange={e => setShoots(Number(e.target.value))}
                className="w-full accent-accent"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-ink">Avg Photos Delivered</label>
                <span className="font-bold text-accent">{photosPerShoot}</span>
              </div>
              <input 
                type="range" min="10" max="2000" step="10"
                value={photosPerShoot} onChange={e => setPhotosPerShoot(Number(e.target.value))}
                className="w-full accent-accent"
              />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted mb-2">Total photos: <strong>{totalPhotos.toLocaleString()}</strong></p>
            <p className="text-sm text-muted">Estimated storage: <strong>{storageGB.toFixed(1)} GB</strong></p>
            <p className="text-xs text-muted mt-2 italic">* Assuming ~5MB per delivered JPEG.</p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <p className="text-xs text-yellow-800 leading-relaxed">
            <strong>Disclaimer:</strong> Estimates are based on published pricing as of August 2026. Confirm current rates, commissions, and storage limits with each provider before deciding.
          </p>
        </div>
      </div>

      {/* RESULTS LIST */}
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-6 text-ink">Estimated Annual Costs</h2>
        <div className="grid gap-4">
          {results.map((result, index) => {
            const isBestValue = index === 0;
            return (
              <Link key={result.platform} href={result.link} className="block group">
                <div className={`p-6 rounded-xl border transition-all ${
                  isBestValue 
                    ? 'border-accent bg-accent-tint shadow-sm relative overflow-hidden' 
                    : 'border-border bg-white hover:border-accent hover:shadow-sm'
                }`}>
                  {isBestValue && (
                    <div className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                      Best Value
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-ink mb-1 group-hover:text-accent transition-colors">
                        {result.platform}
                      </h3>
                      <p className="text-sm text-muted font-medium mb-1">
                        Plan: {result.planName}
                      </p>
                      <p className="text-sm text-ink bg-gray-100 inline-block px-2 py-1 rounded">
                        {result.note}
                      </p>
                    </div>
                    
                    <div className="text-left sm:text-right">
                      <div className="text-3xl font-bold text-ink">
                        {formatCurrency(result.annualCost)}
                        <span className="text-base font-normal text-muted ml-1">/yr</span>
                      </div>
                      <p className="text-sm text-muted mt-1">
                        ({formatCurrency(result.monthlyCost)}/mo)
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
