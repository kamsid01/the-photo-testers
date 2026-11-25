import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_EVENTS = new Set([
  'page_view',
  'pricing_estimate_used',
  'comparison_estimate_used',
  'share_link_copied',
  'widget_referral',
]);

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json();
    const event = typeof raw?.event === 'string' ? raw.event : '';
    const page = typeof raw?.page === 'string' ? raw.page.split('?')[0].split('#')[0].slice(0, 200) : '';

    if (!ALLOWED_EVENTS.has(event) || !page) {
      return NextResponse.json({ ok: false, error: 'Invalid event payload' }, { status: 400 });
    }

    // Never accept full-site page views from embedded widget routes
    if (event === 'page_view' && page.startsWith('/embed')) {
      return NextResponse.json({ ok: true, ignored: true }, { status: 202 });
    }

    // Strictly whitelist non-financial fields only (never log takeHome, costs, tax, shoots, hours, photos)
    const cleanPayload = {
      event,
      page,
      ...(typeof raw?.ref === 'string' && raw.ref.trim() ? { ref: raw.ref.trim().slice(0, 120) } : {}),
      ...(typeof raw?.partner === 'string' && raw.partner.trim()
        ? { partner: raw.partner.trim().slice(0, 80) }
        : {}),
      ts: typeof raw?.ts === 'string' ? raw.ts : new Date().toISOString(),
    };

    // Structured server log (ready for hosting log drain or database sink once configured in production)
    console.info('[pt-measure]', JSON.stringify(cleanPayload));

    return NextResponse.json({ ok: true, accepted: cleanPayload }, { status: 202 });
  } catch {
    return NextResponse.json({ ok: false, error: 'Malformed JSON' }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    mode: 'first-party-cookie-free',
    allowedEvents: Array.from(ALLOWED_EVENTS),
  });
}
