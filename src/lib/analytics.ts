export type TrackEventName =
  | 'page_view'
  | 'pricing_estimate_used'
  | 'comparison_estimate_used'
  | 'share_link_copied'
  | 'widget_referral';

export interface TrackPayload {
  event: TrackEventName;
  page: string;
  ref?: string;
  partner?: string;
  ts: string;
}

const ALLOWED_EVENTS = new Set<TrackEventName>([
  'page_view',
  'pricing_estimate_used',
  'comparison_estimate_used',
  'share_link_copied',
  'widget_referral',
]);

// In-memory guard against React StrictMode / rapid re-render double firing
const firedInMemory = new Set<string>();
let lastPageViewPath: string | null = null;
let lastPageViewTime = 0;

function sanitizeRef(raw?: string | null): string | undefined {
  if (!raw) return undefined;
  const cleaned = raw.trim().slice(0, 120).replace(/[^a-zA-Z0-9._:/-]/g, '');
  return cleaned || undefined;
}

function sendPayload(payload: TrackPayload) {
  if (typeof window === 'undefined') return;
  const body = JSON.stringify(payload);

  // Expose lightweight debug queue on window for transparent QA verification
  try {
    const w = window as unknown as { __ptEvents?: TrackPayload[] };
    if (!w.__ptEvents) w.__ptEvents = [];
    w.__ptEvents.push(payload);
  } catch {}

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: 'application/json' });
      const queued = navigator.sendBeacon('/api/track', blob);
      if (queued) return;
    }
  } catch {}

  try {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {}
}

/**
 * Sends a first-party, cookie-free analytics event.
 * Strictly strips all financial/calculator inputs; only records event, page, ref, partner, ts.
 */
export function trackEvent(
  event: TrackEventName,
  opts?: { page?: string; ref?: string | null; partner?: string | null }
) {
  if (typeof window === 'undefined') return;
  if (!ALLOWED_EVENTS.has(event)) return;

  const page = (opts?.page || window.location.pathname || '/').split('?')[0].split('#')[0];

  // Never record full-site page views from embedded widget routes
  if (event === 'page_view' && page.startsWith('/embed')) {
    return;
  }

  if (event === 'page_view') {
    const now = Date.now();
    if (lastPageViewPath === page && now - lastPageViewTime < 1500) {
      return;
    }
    lastPageViewPath = page;
    lastPageViewTime = now;
  }

  let ref = sanitizeRef(opts?.ref);
  if (!ref && document.referrer) {
    try {
      const u = new URL(document.referrer);
      if (u.origin !== window.location.origin) {
        ref = sanitizeRef(u.hostname);
      }
    } catch {}
  }

  const payload: TrackPayload = {
    event,
    page,
    ...(ref ? { ref } : {}),
    ...(opts?.partner ? { partner: sanitizeRef(opts.partner) } : {}),
    ts: new Date().toISOString(),
  };

  sendPayload(payload);
}

/**
 * Counts an interaction at most once per browser session for a given (event, page) pair.
 * Prevents double-counting on subsequent input edits, component re-renders, or back/forward navigation.
 */
export function trackOncePerSession(
  event: Exclude<TrackEventName, 'page_view'>,
  opts?: { page?: string; ref?: string | null; partner?: string | null }
) {
  if (typeof window === 'undefined') return;
  const page = (opts?.page || window.location.pathname || '/').split('?')[0].split('#')[0];
  const key = `pt_evt:${event}:${page}${opts?.partner ? `:${opts.partner}` : ''}`;

  if (firedInMemory.has(key)) return;
  try {
    if (window.sessionStorage.getItem(key) === '1') {
      firedInMemory.add(key);
      return;
    }
    window.sessionStorage.setItem(key, '1');
  } catch {}

  firedInMemory.add(key);
  trackEvent(event, { ...opts, page });
}
