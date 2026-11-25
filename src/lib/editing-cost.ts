export interface EditingFeatures {
  crop: boolean;
  straighten: boolean;
  subjectMask: boolean;
  smoothSkin: boolean;
  includeCulling: boolean;
  includeRetouching: boolean;
}

export interface EditingCostInput {
  editedPhotosPerYear: number;
  features: EditingFeatures;
  isSoloShooter: boolean;
}

export interface EditingCostResult {
  valid: boolean;
  error?: string;
  editedPhotosPerYear: number;
  aftershootPlan: string;
  aftershootAnnual: number;
  aftershootMonthlyEquiv: number;
  aftershootMonthToMonth: number;
  aftershootBasis: string;
  imagenPerPhotoRate: number;
  imagenPaygRawAnnual: number;
  imagenPaygAnnual: number;
  imagenMinApplied: boolean;
  imagenLimitlessRelevant: boolean;
  imagenPlan: string;
  imagenAnnual: number;
  imagenBasis: string;
  imagenEligibilityNote: string | null;
  crossoverPhotos: number;
  cheaperVendor: 'Aftershoot' | 'Imagen' | 'Tie';
  annualSavings: number;
}

export const EDITING_PRICING_CHECKED = 'November 24, 2026';
export const AFTERSHOOT_PRICING_URL = 'https://aftershoot.com/aftershoot-pricing-tiers/';
export const IMAGEN_PRICING_URL = 'https://imagen-ai.com/pricing';

export const AFTERSHOOT_EDIT_ANNUAL = 360; // $30/mo billed annually ($35/mo month-to-month)
export const AFTERSHOOT_COMPLETE_ANNUAL = 540; // $45/mo billed annually ($55/mo month-to-month)
export const IMAGEN_BASE_PER_PHOTO = 0.05;
export const IMAGEN_ADDON_PER_PHOTO = 0.01;
export const IMAGEN_MIN_MONTHLY = 7; // $84/yr minimum base fee (unused rolls over as credit)
export const IMAGEN_CULLING_ANNUAL = 144; // $12/mo billed annually (covers $7/mo minimum spend)
export const IMAGEN_LIMITLESS_SOLO_ANNUAL = 1548; // $129/mo billed annually ($165/mo monthly); solo shooters only

export function validateEditedPhotos(raw: string): { valid: boolean; value: number; error: string } {
  const trimmed = raw.trim();
  if (trimmed === '') {
    return { valid: false, value: NaN, error: 'Enter the number of photos you edit per year.' };
  }
  const num = Number(trimmed);
  if (isNaN(num) || num < 1) {
    return { valid: false, value: num, error: 'Enter at least 1 edited photo per year.' };
  }
  if (!Number.isInteger(num)) {
    return { valid: false, value: num, error: 'Use a whole number of photos.' };
  }
  if (num > 500000) {
    return { valid: false, value: num, error: 'Enter 500,000 or fewer edited photos.' };
  }
  return { valid: true, value: num, error: '' };
}

/**
 * Shared pure arithmetic for comparing Aftershoot vs Imagen AI annual editing costs.
 * Verified November 24, 2026 against official vendor pricing pages.
 */
export function calculateEditingCosts(input: EditingCostInput): EditingCostResult {
  const { editedPhotosPerYear, features, isSoloShooter } = input;

  if (!Number.isInteger(editedPhotosPerYear) || editedPhotosPerYear < 1 || editedPhotosPerYear > 500000) {
    return {
      valid: false,
      error: 'Enter a valid whole number of edited photos per year (1–500,000).',
      editedPhotosPerYear: 0,
      aftershootPlan: '',
      aftershootAnnual: 0,
      aftershootMonthlyEquiv: 0,
      aftershootMonthToMonth: 0,
      aftershootBasis: '',
      imagenPerPhotoRate: 0,
      imagenPaygRawAnnual: 0,
      imagenPaygAnnual: 0,
      imagenMinApplied: false,
      imagenLimitlessRelevant: false,
      imagenPlan: '',
      imagenAnnual: 0,
      imagenBasis: '',
      imagenEligibilityNote: null,
      crossoverPhotos: 0,
      cheaperVendor: 'Tie',
      annualSavings: 0,
    };
  }

  // Aftershoot applicable plan
  const needsComplete = features.includeCulling || features.includeRetouching;
  const aftershootPlan = needsComplete ? 'Complete (Culling + Editing + Retouching)' : 'Edit (AI Editing)';
  const aftershootAnnual = needsComplete ? AFTERSHOOT_COMPLETE_ANNUAL : AFTERSHOOT_EDIT_ANNUAL;
  const aftershootMonthlyEquiv = needsComplete ? 45 : 30;
  const aftershootMonthToMonth = needsComplete ? 55 : 35;
  const aftershootBasis = `Flat annual subscription ($${aftershootMonthlyEquiv}/mo billed annually; $${aftershootMonthToMonth}/mo month-to-month; unlimited images)`;

  // Imagen per-photo rate
  const addonCount =
    (features.crop ? 1 : 0) +
    (features.straighten ? 1 : 0) +
    (features.subjectMask ? 1 : 0) +
    (features.smoothSkin ? 1 : 0);
  const imagenPerPhotoRate = Number((IMAGEN_BASE_PER_PHOTO + addonCount * IMAGEN_ADDON_PER_PHOTO).toFixed(2));
  const imagenPaygRawAnnual = Number((editedPhotosPerYear * imagenPerPhotoRate).toFixed(2));

  // Imagen PAYG annual cost with $7/mo ($84/yr) minimum spend OR $144/yr AI Culling add-on
  let imagenPaygAnnual = imagenPaygRawAnnual;
  let imagenMinApplied = false;
  if (features.includeCulling) {
    imagenPaygAnnual = Number((imagenPaygRawAnnual + IMAGEN_CULLING_ANNUAL).toFixed(2));
  } else {
    const minAnnual = IMAGEN_MIN_MONTHLY * 12; // $84
    if (imagenPaygRawAnnual < minAnnual) {
      imagenPaygAnnual = minAnnual;
      imagenMinApplied = true;
    }
  }

  // Solo Limitless ($1,548/yr) is only relevant when PAYG exceeds $1,548/yr
  const imagenLimitlessRelevant = imagenPaygAnnual > IMAGEN_LIMITLESS_SOLO_ANNUAL;

  let imagenPlan = 'Pay-As-You-Go';
  let imagenAnnual = imagenPaygAnnual;
  let imagenBasis = features.includeCulling
    ? `$${imagenPerPhotoRate.toFixed(2)}/edited photo + $144/yr AI Culling ($12/mo annual, which covers the $7/mo base fee)`
    : imagenMinApplied
    ? `$7/month minimum base fee ($84/yr; unused balance rolls over as export credit)`
    : `$${imagenPerPhotoRate.toFixed(2)}/edited photo ($0.05 base${addonCount > 0 ? ` + ${addonCount} × $0.01 add-ons` : ''}; $7/mo minimum base fee)`;

  let imagenEligibilityNote: string | null = null;

  if (imagenLimitlessRelevant) {
    if (isSoloShooter) {
      imagenPlan = 'Limitless (Solo Photographer, annual)';
      imagenAnnual = IMAGEN_LIMITLESS_SOLO_ANNUAL;
      imagenBasis =
        '$129/mo billed annually ($1,548/yr; $165/mo monthly) — includes unlimited edits, culling, and AI add-ons for eligible solo shooters.';
      imagenEligibilityNote =
        'Eligible as an individual photographer shooting and editing your own work (occasional second shooter allowed).';
    } else {
      imagenPlan = 'Pay-As-You-Go (Solo Limitless ineligible)';
      imagenAnnual = imagenPaygAnnual;
      imagenEligibilityNote =
        'Multi-shooter studios and teams do not qualify for Imagen’s solo Limitless plan ($1,548/yr) and must use Pay-As-You-Go or a custom Business plan.';
    }
  }

  // Break-even crossover (edited photos/year where Aftershoot annual == Imagen PAYG)
  const effectiveAftershootDiff = features.includeCulling
    ? aftershootAnnual - IMAGEN_CULLING_ANNUAL
    : aftershootAnnual;
  const crossoverPhotos = Math.ceil(effectiveAftershootDiff / imagenPerPhotoRate);

  const diff = Number((imagenAnnual - aftershootAnnual).toFixed(2));
  const cheaperVendor: 'Aftershoot' | 'Imagen' | 'Tie' =
    Math.abs(diff) < 0.01 ? 'Tie' : diff > 0 ? 'Aftershoot' : 'Imagen';
  const annualSavings = Math.abs(diff);

  return {
    valid: true,
    editedPhotosPerYear,
    aftershootPlan,
    aftershootAnnual,
    aftershootMonthlyEquiv,
    aftershootMonthToMonth,
    aftershootBasis,
    imagenPerPhotoRate,
    imagenPaygRawAnnual,
    imagenPaygAnnual,
    imagenMinApplied,
    imagenLimitlessRelevant,
    imagenPlan,
    imagenAnnual,
    imagenBasis,
    imagenEligibilityNote,
    crossoverPhotos,
    cheaperVendor,
    annualSavings,
  };
}
