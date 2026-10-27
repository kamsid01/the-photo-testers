import Link from 'next/link';
import { getSiteData } from '@/lib/site-data';
import { SERIF, h2Serif, lede, sectionHead, linkStrong } from '../ui';

export function HomeWorkflow() {
  const cats = getSiteData().navCategories;
  return (
    <section aria-labelledby="h-workflow" style={{ borderTop: '1px solid #DFE2DB', background: '#FFFFFF' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(48px,6vw,80px) clamp(16px,4vw,40px)' }}>
        <div style={sectionHead}>
          <div>
            <h2 id="h-workflow" style={h2Serif}>Browse by workflow</h2>
            <p style={lede}>The parts of a photography business we cover, each with its own reviews, comparisons, and guides.</p>
          </div>
        </div>
        <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,340px),1fr))', borderTop: '1px solid #20221F' }}>
          {cats.map((c) => (
            <li key={c.slug} style={{ borderBottom: '1px solid #DFE2DB', minWidth: 0 }}>
              <Link href={c.href} className="pt-hover-row" style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', padding: '22px 20px 22px 0', textDecoration: 'none', color: '#20221F', height: '100%' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt="" width={300} height={200} loading="lazy" style={{ width: '150px', height: '100px', objectFit: 'cover', objectPosition: '50% 30%', borderRadius: '3px', border: '1px solid #DFE2DB', background: '#F3F2EE', display: 'block' }} />
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: 'block', fontFamily: SERIF, fontSize: '22px', fontWeight: 500, lineHeight: 1.2, marginBottom: '4px' }}>{c.name}</span>
                  <span style={{ display: 'block', fontSize: '15px', lineHeight: 1.45, color: '#4A4E49', marginBottom: '10px' }}>{c.desc}</span>
                  <span style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#2A4EC2' }}>Read {c.statusLabel}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const GUIDE_META: Record<string, { blurb: string; covers: string }> = {
  'best-crm-wedding-photographers': { blurb: 'For the inquiry-to-delivery flow of a wedding business: booking, contracts, invoices, and questionnaires.', covers: 'HoneyBook, Studio Ninja, Dubsado, Pixieset Studio, Táve' },
  'best-client-gallery-software': { blurb: 'Delivery, proofing, print stores, and storage, compared at the plan your volume actually needs.', covers: 'Pixieset, ShootProof, CloudSpot, Pic-Time, SmugMug, Zenfolio' },
  'best-photo-culling-software': { blurb: 'Dedicated culling tools, with independent speed benchmarks labeled by who ran them.', covers: 'FilterPixel, Aftershoot, Narrative Select, Photo Mechanic, Excire Foto' },
};

export function HomeGuides() {
  const by = getSiteData().bySlug;
  const guides = Object.keys(GUIDE_META).map((s) => ({ ...by[s], ...GUIDE_META[s] }));
  return (
    <section aria-labelledby="h-guides" style={{ borderTop: '1px solid #DFE2DB' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(48px,6vw,80px) clamp(16px,4vw,40px)', display: 'flex', flexWrap: 'wrap', gap: '32px 64px' }}>
        <div style={{ flex: '1 1 280px', maxWidth: '380px' }}>
          <h2 id="h-guides" style={{ ...h2Serif, margin: '0 0 12px' }}>Start with a buying guide</h2>
          <p style={{ margin: '0 0 20px', fontSize: '17px', color: '#60645F' }}>Each guide opens with a short list of picks by need, then explains the tradeoffs, pricing basis, and the date it was checked.</p>
          <Link href="/blog?type=guide" style={linkStrong}>All buying guides</Link>
        </div>
        <ol style={{ listStyle: 'none', margin: 0, padding: 0, flex: '2 1 560px', minWidth: 0 }}>
          {guides.map((g) => (
            <li key={g.slug} style={{ borderTop: '1px solid #DFE2DB', padding: '24px 0', display: 'flex', flexWrap: 'wrap', gap: '16px 28px' }}>
              <Link href={g.href} tabIndex={-1} aria-hidden="true" style={{ display: 'block', flex: '1 1 200px', maxWidth: '320px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.img || ''} alt="" width={440} height={275} loading="lazy" style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover', objectPosition: g.imgPos || '0 0', borderRadius: '3px', border: '1px solid #DFE2DB', background: '#F3F2EE', display: 'block' }} />
              </Link>
              <div style={{ minWidth: 0, flex: '2 1 300px' }}>
                <p style={{ margin: '0 0 6px', fontSize: '14px', color: '#60645F' }}>
                  <span style={{ fontWeight: 600, color: '#20221F' }}>Buying guide</span> · {g.catName} · Pricing checked {g.checked}
                </p>
                <h3 style={{ margin: '0 0 8px', fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(22px,2vw,26px)', lineHeight: 1.2 }}>
                  <Link href={g.href} className="pt-hover-blue" style={{ color: '#20221F', textDecoration: 'none' }}>{g.title}</Link>
                </h3>
                <p style={{ margin: '0 0 10px', fontSize: '16px', lineHeight: 1.55, color: '#4A4E49' }}>{g.blurb}</p>
                <p style={{ margin: 0, fontSize: '14px', color: '#60645F' }}>Covers {g.covers}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
