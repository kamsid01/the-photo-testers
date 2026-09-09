'use client';

import { useState } from 'react';

export function PricingCalculator() {
  const [currency, setCurrency] = useState('£');
  const [salary, setSalary] = useState(40000);
  const [shoots, setShoots] = useState(30);
  const [costs, setCosts] = useState(8000);
  const [taxRate, setTaxRate] = useState(25);
  const [unpaidHours, setUnpaidHours] = useState(15);
  const [shootHours, setShootHours] = useState(8);

  // Calculations
  const safeShoots = Math.max(1, shoots);
  const safeTaxRate = Math.min(99, taxRate);

  // Profit needed to hit take-home salary after tax
  const profitNeeded = salary / (1 - safeTaxRate / 100);
  
  // Total gross revenue needed (Profit + Costs)
  const grossRevenue = profitNeeded + costs;
  
  // Per shoot breakdowns
  const pricePerShoot = grossRevenue / safeShoots;
  const costPerShoot = costs / safeShoots;
  const profitPerShoot = profitNeeded / safeShoots;
  const taxPerShoot = profitPerShoot * (safeTaxRate / 100);
  const takeHomePerShoot = profitPerShoot - taxPerShoot; // Exactly equals salary / shoots

  // Hourly breakdowns
  const totalHours = shootHours + unpaidHours;
  const effectiveHourly = pricePerShoot / totalHours;
  const takeHomeHourly = takeHomePerShoot / totalHours;

  const formatCurrency = (val: number) => {
    const code = currency === '£' ? 'GBP' : currency === '$' ? 'USD' : 'EUR';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: code,
      maximumFractionDigits: 0,
    }).format(val);
  };

  const getEncouragement = () => {
    if (pricePerShoot > 2500) {
      return "That's a premium price point! To charge this sustainably, you'll need to offer a high-touch, boutique experience. Fewer bookings at a higher value is often more sustainable than churning through cheap shoots.";
    }
    if (pricePerShoot < 500) {
      return "This is a very accessible price point, but it requires a high volume of clients to hit your goals. Make sure you have the marketing machine to consistently pull in this many bookings.";
    }
    return "This is a solid middle-market price point. Focus on communicating the unique value of your work so clients see this as an investment, not just a transaction.";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-12">
      {/* INPUTS COLUMN */}
      <div className="bg-surface p-6 rounded-xl border border-border">
        <h2 className="text-2xl font-bold mb-6 text-ink">Your Numbers</h2>
        
        <div className="space-y-6">
          {/* Currency */}
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Currency</label>
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

          {/* Desired Salary */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-ink">Desired Annual Take-Home (After Tax)</label>
              <span className="font-bold text-accent">{formatCurrency(salary)}</span>
            </div>
            <input 
              type="range" min="10000" max="150000" step="5000"
              value={salary} onChange={e => setSalary(Number(e.target.value))}
              className="w-full accent-accent"
            />
          </div>

          {/* Shoots */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-ink">Shoots Per Year (Realistically)</label>
              <span className="font-bold text-accent">{shoots} shoots</span>
            </div>
            <input 
              type="range" min="5" max="100" step="1"
              value={shoots} onChange={e => setShoots(Number(e.target.value))}
              className="w-full accent-accent"
            />
          </div>

          {/* Costs */}
          <div>
            <label className="block text-sm font-medium text-ink mb-2" title="Gear, software, insurance, marketing, travel, etc.">
              Annual Business Costs
              <span className="ml-2 text-xs text-muted font-normal">(Hover for examples)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">{currency}</span>
              <input 
                type="number" min="0" step="500"
                value={costs} onChange={e => setCosts(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2 rounded-md border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none"
              />
            </div>
          </div>

          {/* Tax Rate */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-ink" title="Consult an accountant for your exact rate.">
                Estimated Tax Rate %
                <span className="ml-2 text-xs text-muted font-normal">(Rough estimate)</span>
              </label>
              <span className="font-bold text-accent">{taxRate}%</span>
            </div>
            <input 
              type="range" min="0" max="50" step="1"
              value={taxRate} onChange={e => setTaxRate(Number(e.target.value))}
              className="w-full accent-accent"
            />
          </div>

          {/* Hours per shoot */}
          <div className="pt-4 border-t border-border">
            <h3 className="font-semibold text-ink mb-4">Time Spent Per Shoot</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-ink">Actual Shoot Time (Hours)</label>
                  <span className="font-bold text-accent">{shootHours}h</span>
                </div>
                <input 
                  type="range" min="1" max="24" step="1"
                  value={shootHours} onChange={e => setShootHours(Number(e.target.value))}
                  className="w-full accent-accent"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-ink">Unpaid Hidden Hours (Editing, admin, travel)</label>
                  <span className="font-bold text-accent">{unpaidHours}h</span>
                </div>
                <input 
                  type="range" min="0" max="80" step="1"
                  value={unpaidHours} onChange={e => setUnpaidHours(Number(e.target.value))}
                  className="w-full accent-accent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OUTPUTS COLUMN */}
      <div className="flex flex-col">
        <div className="bg-ink text-white p-8 rounded-xl shadow-lg mb-6 sticky top-6">
          <p className="text-muted text-sm uppercase tracking-wide font-semibold mb-2 text-gray-300">You need to charge</p>
          <div className="text-5xl md:text-6xl font-bold mb-4 text-white">
            {formatCurrency(pricePerShoot)}
          </div>
          <p className="text-gray-300 text-lg">per shoot</p>
          
          <div className="h-px bg-gray-700 my-6"></div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Hours (Including Unpaid)</span>
              <span className="font-semibold text-white">{totalHours} hours</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Real Gross Hourly Rate</span>
              <span className="font-semibold text-[#EFF4FF]">{formatCurrency(effectiveHourly)}/hr</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Take-Home Hourly Rate</span>
              <span className="font-semibold text-white">{formatCurrency(takeHomeHourly)}/hr</span>
            </div>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-border">
          <h3 className="font-semibold text-ink mb-4">Where that {formatCurrency(pricePerShoot)} goes:</h3>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-muted">Business Costs</span>
              <span className="font-medium text-no">{formatCurrency(costPerShoot)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Taxes (Estimated)</span>
              <span className="font-medium text-no">{formatCurrency(taxPerShoot)}</span>
            </div>
            <div className="h-px bg-border my-2"></div>
            <div className="flex justify-between">
              <span className="text-ink font-semibold">Your Pocket (Take-Home)</span>
              <span className="font-bold text-yes">{formatCurrency(takeHomePerShoot)}</span>
            </div>
          </div>

          <p className="text-sm text-ink leading-relaxed bg-white p-4 rounded-lg border border-border">
            {getEncouragement()}
          </p>
          
          <p className="text-xs text-muted mt-4 text-center">
            * This calculator provides a rough estimate. Always consult a tax professional for accurate financial advice.
          </p>
        </div>
      </div>
    </div>
  );
}
