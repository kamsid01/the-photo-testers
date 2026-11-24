export interface GalleryPlatformPlan {
  platform: string;
  planName: string;
  monthlyCost: number;
  annualCost: number;
  limit: string;
  commission: string;
  canSell: boolean;
  sellingNote: string;
  slug: string;
  sourceUrl: string;
  isStandardList: boolean;
  isPromo?: boolean;
  promoEligibility?: string;
  promoNote?: string;
  upgradeNote?: string;
  billingBasis: string;
  billingNote?: string;
}

export interface GalleryVolumeEstimate {
  shoots: number;
  photosPerShoot: number;
  totalPhotos: number;
  storageGB: number;
  totalLabel: string;
  gbLabel: string;
}

export const GALLERY_PRICING_CHECKED = 'November 2026';
export const GALLERY_MB_PER_JPEG = 5;
export const GALLERY_MB_PER_GB = 1000; // Decimal GB (1,000 MB = 1 GB) to match vendor storage tiers

export const GALLERY_DEFAULT_SHOOTS = 30;
export const GALLERY_DEFAULT_PHOTOS = 500;

export function calculateGalleryVolume(
  shoots: number,
  photosPerShoot: number
): GalleryVolumeEstimate {
  const totalPhotos = shoots * photosPerShoot;
  const storageGB = (totalPhotos * GALLERY_MB_PER_JPEG) / GALLERY_MB_PER_GB;
  const gbFormatted = Number.isInteger(storageGB)
    ? `${storageGB} GB`
    : `${storageGB.toFixed(1)} GB`;

  return {
    shoots,
    photosPerShoot,
    totalPhotos,
    storageGB,
    totalLabel: totalPhotos.toLocaleString('en-US'),
    gbLabel: gbFormatted,
  };
}

/**
 * Single source of truth for client gallery platform plans and selection logic.
 * Used by the homepage preview (/), the tools directory (/tools), and the
 * interactive Gallery Cost Calculator (/tools/gallery-cost-calculator).
 *
 * Storage thresholds use decimal GB (1,000 MB = 1 GB) at 5 MB per JPEG,
 * under a 1-gallery-per-shoot, 12-month active retention assumption.
 * All list prices are published US Dollar (USD) rates verified November 24, 2026.
 */
export function getGalleryPlans(shoots: number, photosPerShoot: number): GalleryPlatformPlan[] {
  const { totalPhotos, storageGB: gb } = calculateGalleryVolume(shoots, photosPerShoot);
  const list: GalleryPlatformPlan[] = [];

  // 1. Pixieset Client Gallery (https://pixieset.com/pricing/)
  if (gb <= 3) {
    list.push({
      platform: 'Pixieset',
      planName: 'Free',
      monthlyCost: 0,
      annualCost: 0,
      limit: '3 GB photo storage limit (free tier)',
      commission: '15%',
      canSell: true,
      sellingNote: 'Client print & digital sales included (15% commission)',
      slug: 'pixieset',
      sourceUrl: 'https://pixieset.com/pricing/',
      isStandardList: true,
      billingBasis: 'Free tier ($0/yr)',
    });
  } else if (gb <= 10) {
    list.push({
      platform: 'Pixieset',
      planName: 'Basic',
      monthlyCost: 8,
      annualCost: 96,
      limit: '10 GB photo storage limit ($10/mo monthly)',
      commission: '0%',
      canSell: true,
      sellingNote: 'Commission-free client sales included',
      slug: 'pixieset',
      sourceUrl: 'https://pixieset.com/pricing/',
      isStandardList: true,
      billingBasis: 'Standard annual list ($96/yr; $8/mo equivalent)',
    });
  } else if (gb <= 100) {
    list.push({
      platform: 'Pixieset',
      planName: 'Plus',
      monthlyCost: 16,
      annualCost: 192,
      limit: '100 GB photo storage limit ($20/mo monthly)',
      commission: '0%',
      canSell: true,
      sellingNote: 'Commission-free client sales included',
      slug: 'pixieset',
      sourceUrl: 'https://pixieset.com/pricing/',
      isStandardList: true,
      billingBasis: 'Standard annual list ($192/yr; $16/mo equivalent)',
    });
  } else if (gb <= 1000) {
    list.push({
      platform: 'Pixieset',
      planName: 'Pro',
      monthlyCost: 24,
      annualCost: 288,
      limit: '1,000 GB photo storage limit ($30/mo monthly)',
      commission: '0%',
      canSell: true,
      sellingNote: 'Commission-free client sales included',
      slug: 'pixieset',
      sourceUrl: 'https://pixieset.com/pricing/',
      isStandardList: true,
      billingBasis: 'Standard annual list ($288/yr; $24/mo equivalent)',
    });
  } else {
    list.push({
      platform: 'Pixieset',
      planName: 'Ultimate',
      monthlyCost: 40,
      annualCost: 480,
      limit: 'Unlimited photo storage ($50/mo monthly)',
      commission: '0%',
      canSell: true,
      sellingNote: 'Commission-free client sales included',
      slug: 'pixieset',
      sourceUrl: 'https://pixieset.com/pricing/',
      isStandardList: true,
      billingBasis: 'Standard annual list ($480/yr; $40/mo equivalent)',
    });
  }

  // 2. ShootProof (https://www.shootproof.com/pricing/)
  // Enforces both the 100-photo Free plan limit AND 3 GB storage cap
  if (totalPhotos <= 100 && gb <= 3) {
    list.push({
      platform: 'ShootProof',
      planName: 'Free',
      monthlyCost: 0,
      annualCost: 0,
      limit: 'Up to 100 photos (3 GB cap; contracts & invoicing excluded)',
      commission: '0% on direct orders',
      canSell: true,
      sellingNote: 'Direct orders supported (limited free-tier features)',
      slug: 'shootproof',
      sourceUrl: 'https://www.shootproof.com/pricing/',
      isStandardList: true,
      billingBasis: 'Free tier ($0/yr)',
    });
  } else if (gb <= 20) {
    list.push({
      platform: 'ShootProof',
      planName: 'Starter (20 GB)',
      monthlyCost: 8.33,
      annualCost: 99.99,
      limit: '20 GB photo & video storage ($9.99/mo monthly)',
      commission: '0%',
      canSell: true,
      sellingNote: 'Commission-free print & digital sales included',
      slug: 'shootproof',
      sourceUrl: 'https://www.shootproof.com/pricing/',
      isStandardList: true,
      billingBasis: 'Standard annual list ($99.99/yr USD; $8.33/mo equivalent)',
    });
  } else if (gb <= 100) {
    list.push({
      platform: 'ShootProof',
      planName: 'Standard (100 GB)',
      monthlyCost: 16.67,
      annualCost: 199.99,
      limit: '100 GB photo & video storage ($19.99/mo monthly; regional £160/yr UK, €180/yr EU)',
      commission: '0%',
      canSell: true,
      sellingNote: 'Commission-free print & digital sales included',
      slug: 'shootproof',
      sourceUrl: 'https://www.shootproof.com/pricing/',
      isStandardList: true,
      billingBasis: 'Standard annual list ($199.99/yr USD; $16.67/mo equivalent)',
    });
  } else if (gb <= 1000) {
    list.push({
      platform: 'ShootProof',
      planName: 'Professional (1,000 GB)',
      monthlyCost: 26.67,
      annualCost: 319.99,
      limit: '1,000 GB photo storage + 50 GB video ($31.99/mo monthly)',
      commission: '0%',
      canSell: true,
      sellingNote: 'Commission-free print & digital sales included',
      slug: 'shootproof',
      sourceUrl: 'https://www.shootproof.com/pricing/',
      isStandardList: true,
      billingBasis: 'Standard annual list ($319.99/yr USD; $26.67/mo equivalent)',
    });
  } else if (gb <= 2000) {
    list.push({
      platform: 'ShootProof',
      planName: 'Advanced (2,000 GB)',
      monthlyCost: 43.33,
      annualCost: 519.99,
      limit: '2,000 GB (2 TB) photo storage + 100 GB video ($51.99/mo monthly)',
      commission: '0%',
      canSell: true,
      sellingNote: 'Commission-free print & digital sales included',
      slug: 'shootproof',
      sourceUrl: 'https://www.shootproof.com/pricing/',
      isStandardList: true,
      billingBasis: 'Standard annual list ($519.99/yr USD; $43.33/mo equivalent)',
    });
  } else {
    list.push({
      platform: 'ShootProof',
      planName: 'Premium (Unlimited)',
      monthlyCost: 50,
      annualCost: 600,
      limit: 'Unlimited photo storage + 150 GB video ($60/mo monthly)',
      commission: '0%',
      canSell: true,
      sellingNote: 'Commission-free print & digital sales included',
      slug: 'shootproof',
      sourceUrl: 'https://www.shootproof.com/pricing/',
      isStandardList: true,
      billingBasis: 'Standard annual list ($600/yr USD; $50/mo equivalent)',
    });
  }

  // 3. Pic-Time (https://www.pic-time.com/pricing)
  // Free tier provides 10 GB for 3 months, then 3 GB ongoing; evaluated at 3 GB under 12-month retention
  if (gb <= 3) {
    list.push({
      platform: 'Pic-Time',
      planName: 'Free',
      monthlyCost: 0,
      annualCost: 0,
      limit: '3 GB ongoing photo storage (10 GB intro for first 3 months)',
      commission: '15%',
      canSell: true,
      sellingNote: 'Client store included (15% store commission)',
      slug: 'pic-time',
      sourceUrl: 'https://www.pic-time.com/pricing',
      isStandardList: true,
      billingBasis: 'Free tier ($0/yr)',
    });
  } else if (gb <= 20) {
    list.push({
      platform: 'Pic-Time',
      planName: 'Beginner',
      monthlyCost: 7,
      annualCost: 84,
      limit: '20 GB photo storage limit ($8/mo monthly)',
      commission: '15%',
      canSell: true,
      sellingNote: 'Client selling included (15% store commission)',
      slug: 'pic-time',
      sourceUrl: 'https://www.pic-time.com/pricing',
      isStandardList: true,
      billingBasis: 'Standard annual list ($84/yr; $7/mo equivalent)',
    });
  } else if (gb <= 100) {
    list.push({
      platform: 'Pic-Time',
      planName: 'Professional',
      monthlyCost: 21,
      annualCost: 252,
      limit: '100 GB photo storage, store marketing tools ($25/mo monthly)',
      commission: '0% with own processor',
      canSell: true,
      sellingNote: 'Client store included (0% commission with own payment gateway)',
      slug: 'pic-time',
      sourceUrl: 'https://www.pic-time.com/pricing',
      isStandardList: true,
      billingBasis: 'Standard annual list ($252/yr; $21/mo equivalent)',
    });
  } else {
    list.push({
      platform: 'Pic-Time',
      planName: 'Advanced',
      monthlyCost: 42,
      annualCost: 504,
      limit: 'Unlimited photo storage, premium marketing apps ($50/mo monthly)',
      commission: '0% with own processor',
      canSell: true,
      sellingNote: 'Client store included (0% commission with own payment gateway)',
      slug: 'pic-time',
      sourceUrl: 'https://www.pic-time.com/pricing',
      isStandardList: true,
      billingBasis: 'Standard annual list ($504/yr; $42/mo equivalent)',
    });
  }

  // 4. SmugMug (https://www.smugmug.com/pricing)
  // Direct ($20/mo annual = $240/yr) covers digital delivery & unlimited JPEG storage;
  // Portfolio ($23.50/mo annual = $282/yr) is required when selling prints or downloads.
  list.push({
    platform: 'SmugMug',
    planName: 'Direct',
    monthlyCost: 20,
    annualCost: 240,
    limit: 'Unlimited JPEG storage, digital client delivery ($29/mo monthly)',
    commission: 'No client selling',
    canSell: false,
    sellingNote: 'Digital delivery only on Direct',
    upgradeNote:
      'Need to sell prints or digital downloads? Upgrade to SmugMug Portfolio at $282/year ($23.50/mo annual; $35.50/mo monthly; 15% fee on print markup).',
    slug: 'smugmug',
    sourceUrl: 'https://www.smugmug.com/pricing',
    isStandardList: true,
    billingBasis: 'Standard annual list ($240/yr; $20/mo equivalent)',
  });

  // 5. Zenfolio (https://www.zenfolio.com/pricing)
  // Basic ($84/yr) is standard annual list; Professional ($138/yr) and Advanced ($240/yr)
  // are temporary first-year promotional offers shown separately from standard annual list ranking.
  if (gb <= 15) {
    list.push({
      platform: 'Zenfolio',
      planName: 'Basic',
      monthlyCost: 7,
      annualCost: 84,
      limit: '15 GB storage limit ($9/mo monthly); delivery only',
      commission: 'No client selling',
      canSell: false,
      sellingNote: 'Delivery-only (no client e-commerce / print store)',
      slug: 'zenfolio',
      sourceUrl: 'https://www.zenfolio.com/pricing',
      isStandardList: true,
      billingBasis: 'Standard annual list ($84/yr; $7/mo equivalent)',
    });
  } else if (gb <= 150) {
    list.push({
      platform: 'Zenfolio',
      planName: 'Professional',
      monthlyCost: 11.5,
      annualCost: 138,
      limit: '150 GB storage limit, client selling included ($23/month on monthly billing)',
      commission: '7% commerce fee',
      canSell: true,
      sellingNote: 'Client selling included (7% commerce fee)',
      slug: 'zenfolio',
      sourceUrl: 'https://www.zenfolio.com/pricing',
      isStandardList: false,
      isPromo: true,
      promoEligibility: 'New annual subscriptions only; introductory rate expires after Year 1.',
      promoNote:
        'Temporary first-year promotional offer ($138/yr; $11.50/mo equivalent). Monthly billing is $23/month. Confirm the current non-promotional annual renewal rate at Zenfolio checkout before subscribing.',
      billingBasis: 'First-year promotional annual offer ($138/yr); monthly billing is $23/month',
    });
  } else {
    list.push({
      platform: 'Zenfolio',
      planName: 'Advanced',
      monthlyCost: 20,
      annualCost: 240,
      limit: 'Unlimited JPEG storage, selling & booking included ($40/month on monthly billing)',
      commission: '7% commerce fee',
      canSell: true,
      sellingNote: 'Client selling & booking included (7% commerce fee)',
      slug: 'zenfolio',
      sourceUrl: 'https://www.zenfolio.com/pricing',
      isStandardList: false,
      isPromo: true,
      promoEligibility: 'New annual subscriptions only; introductory rate expires after Year 1.',
      promoNote:
        'Temporary first-year promotional offer ($240/yr; $20/mo equivalent). Monthly billing is $40/month. Confirm the current non-promotional annual renewal rate at Zenfolio checkout before subscribing.',
      billingBasis: 'First-year promotional annual offer ($240/yr); monthly billing is $40/month',
    });
  }

  // 6. CloudSpot (https://cloudspot.io/pricing)
  // Active gallery limits enforced under 1-gallery-per-shoot, 12-month retention assumption
  if (gb <= 5 && shoots <= 3) {
    list.push({
      platform: 'CloudSpot',
      planName: 'Free',
      monthlyCost: 0,
      annualCost: 0,
      limit: '5 GB storage limit (max 3 active galleries)',
      commission: '15%',
      canSell: true,
      sellingNote: 'Client sales included (15% commission)',
      slug: 'cloudspot',
      sourceUrl: 'https://cloudspot.io/pricing',
      isStandardList: true,
      billingBasis: 'Free tier ($0/yr)',
    });
  } else if (gb <= 15 && shoots <= 15) {
    list.push({
      platform: 'CloudSpot',
      planName: 'Entry',
      monthlyCost: 6,
      annualCost: 72,
      limit: '15 GB storage limit (max 15 active galleries; $7/mo monthly)',
      commission: '15%',
      canSell: true,
      sellingNote: 'Client sales included (15% commission)',
      slug: 'cloudspot',
      sourceUrl: 'https://cloudspot.io/pricing',
      isStandardList: true,
      billingBasis: 'Standard annual list ($72/yr; $6/mo equivalent)',
    });
  } else if (gb <= 100) {
    list.push({
      platform: 'CloudSpot',
      planName: 'Lite',
      monthlyCost: 12,
      annualCost: 144,
      limit: '100 GB storage, unlimited galleries, Studio Manager ($17/mo monthly)',
      commission: '0%',
      canSell: true,
      sellingNote: 'Commission-free client sales & Studio Manager included',
      slug: 'cloudspot',
      sourceUrl: 'https://cloudspot.io/pricing',
      isStandardList: true,
      billingBasis: 'Standard annual list ($144/yr; $12/mo equivalent)',
    });
  } else if (gb <= 500) {
    list.push({
      platform: 'CloudSpot',
      planName: 'Pro',
      monthlyCost: 34,
      annualCost: 408,
      limit: '500 GB storage, unlimited galleries, Studio Manager ($34/mo published)',
      commission: '0%',
      canSell: true,
      sellingNote: 'Commission-free client sales & Studio Manager included',
      slug: 'cloudspot',
      sourceUrl: 'https://cloudspot.io/pricing',
      isStandardList: true,
      billingBasis: 'Estimated 12-month spend on monthly billing ($34/mo published rate)',
      billingNote:
        'CloudSpot publishes a $34/mo rate; annual figure reflects 12 months at the published monthly rate rather than an upfront annual discount.',
    });
  } else {
    list.push({
      platform: 'CloudSpot',
      planName: 'Unlimited',
      monthlyCost: 50,
      annualCost: 600,
      limit: 'Unlimited storage, all file types, Studio Manager ($50/mo published)',
      commission: '0%',
      canSell: true,
      sellingNote: 'Commission-free client sales & Studio Manager included',
      slug: 'cloudspot',
      sourceUrl: 'https://cloudspot.io/pricing',
      isStandardList: true,
      billingBasis: 'Estimated 12-month spend on monthly billing ($50/mo published rate)',
      billingNote:
        'CloudSpot publishes a $50/mo rate; annual figure reflects 12 months at the published monthly rate rather than an upfront annual discount.',
    });
  }

  return list.sort((a, b) => a.annualCost - b.annualCost || a.platform.localeCompare(b.platform));
}

export function getStandardGalleryPlans(shoots: number, photosPerShoot: number): GalleryPlatformPlan[] {
  return getGalleryPlans(shoots, photosPerShoot).filter((p) => p.isStandardList);
}

export function getPromoGalleryPlans(shoots: number, photosPerShoot: number): GalleryPlatformPlan[] {
  return getGalleryPlans(shoots, photosPerShoot).filter((p) => !p.isStandardList);
}

export interface LowestCostMeta {
  minAnnualCost: number;
  lowestPlans: GalleryPlatformPlan[];
  isTied: boolean;
  tieExplanation: string | null;
}

/**
 * Evaluates the lowest-cost badge strictly on standard annual list pricing
 * so temporary first-year promotional offers do not mix pricing bases.
 */
export function getLowestCostMeta(standardPlans: GalleryPlatformPlan[]): LowestCostMeta {
  if (!standardPlans.length) {
    return { minAnnualCost: 0, lowestPlans: [], isTied: false, tieExplanation: null };
  }
  const minAnnualCost = Math.min(...standardPlans.map((p) => p.annualCost));
  const lowestPlans = standardPlans.filter((p) => p.annualCost === minAnnualCost);
  const isTied = lowestPlans.length > 1;

  let tieExplanation: string | null = null;
  if (isTied) {
    const canSellNames = lowestPlans
      .filter((p) => p.canSell)
      .map((p) => `${p.platform} ${p.planName} (supports client selling with ${p.commission} commission)`);
    const noSellNames = lowestPlans
      .filter((p) => !p.canSell)
      .map((p) => `${p.platform} ${p.planName} (delivery-only, no client selling)`);

    if (canSellNames.length > 0 && noSellNames.length > 0) {
      tieExplanation = `On annual list pricing ($${minAnnualCost.toLocaleString('en-US')}/year each): ${canSellNames.join(', ')}, while ${noSellNames.join(', ')}.`;
    } else {
      tieExplanation = `${lowestPlans.map((p) => `${p.platform} ${p.planName}`).join(' and ')} tie at $${minAnnualCost.toLocaleString('en-US')}/year on standard annual list pricing. Compare storage caps, active gallery limits, and store commissions below.`;
    }
  }

  return { minAnnualCost, lowestPlans, isTied, tieExplanation };
}
