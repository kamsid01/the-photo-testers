import Link from 'next/link';
import { getSiteData } from '@/lib/site-data';
import { SERIF, btnPrimary, btnSecondary } from '../ui';

export function HomeHero() {
  const lead = getSiteData().bySlug['aftershoot-review'];
  return (
    <section
      aria-labelledby="home-title"
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: 'clamp(36px,6vw,72px) clamp(16px,4vw,40px) clamp(40px,6vw,72px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))',
        gap: 'clamp(32px,5vw,72px)',
        alignItems: 'end',
      }}
    >
      <div style={{ maxWidth: '560px', paddingBottom: '8px' }}>
        <p style={{ margin: '0 0 20px', fontSize: '14px', fontWeight: 600, color: '#3159D7', letterSpacing: '.02em' }}>
          The photographer’s software field guide
        </p>
        <h1
          id="home-title"
          style={{ margin: '0 0 22px', fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(38px,4.6vw,60px)', lineHeight: 1.04, letterSpacing: '-0.02em', textWrap: 'balance' }}
        >
          Better software decisions. More time behind the camera.
        </h1>
        <p style={{ margin: '0 0 30px', fontSize: 'clamp(17px,1.4vw,19px)', lineHeight: 1.55, color: '#4A4E49', maxWidth: '30em', textWrap: 'pretty' }}>
          Independent reviews, practical comparisons, and useful tools for choosing the software that fits your photography business.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <Link href="/blog" className="pt-hover-btn-primary" style={btnPrimary}>Explore reviews</Link>
          <Link href="/tools" className="pt-hover-border-ink" style={btnSecondary}>Try the free tools</Link>
        </div>
      </div>

      <article style={{ minWidth: 0 }}>
        <Link href={lead.href} style={{ display: 'block', textDecoration: 'none', color: '#20221F' }}>
          <figure style={{ margin: '0 0 18px', background: '#1B1C1A', borderRadius: '4px', overflow: 'hidden', aspectRatio: '4/3', border: '1px solid #DFE2DB' }}>
            <picture>
              <source
                type="image/webp"
                srcSet="/assets/hero-camera-laptop-480.webp 480w, /assets/hero-camera-laptop-800.webp 800w, /assets/hero-camera-laptop.webp 1448w"
                sizes="(max-width: 640px) 480px, (max-width: 1024px) 800px, 720px"
              />
              <img
                src="/assets/hero-camera-laptop.webp"
                alt="A mirrorless camera with a large lens beside an open laptop showing a grid of landscape and still-life photos, on a sunlit desk by a window"
                width={1448}
                height={1086}
                fetchPriority="high"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '55% 50%', display: 'block' }}
              />
            </picture>
          </figure>
        </Link>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', fontSize: '14px', color: '#60645F', marginBottom: '8px' }}>
          <span style={{ fontWeight: 600, color: '#20221F' }}>{lead.typeLabel}</span>
          <span>{lead.catName}</span>
          <span>Updated {lead.updatedDateLabel || lead.dateLabel}</span>
        </div>
        <h2 style={{ margin: '0 0 10px', fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(26px,2.4vw,32px)', lineHeight: 1.15, letterSpacing: '-0.01em' }}>
          <Link href={lead.href} className="pt-hover-blue" style={{ color: '#20221F', textDecoration: 'none' }}>{lead.title}</Link>
        </h2>
        <p style={{ margin: '0 0 12px', fontSize: '16px', lineHeight: 1.55, color: '#4A4E49', maxWidth: '40em' }}>
          Flat pricing, offline processing, and the culling that makes it worth buying. Plus the human review pass it still needs, and who should look at Imagen or Narrative instead.
        </p>
      </article>
    </section>
  );
}

const SHOTS = [
  { href: '/best-client-gallery-software#pixieset', src: '/assets/pixieset-v3.webp', alt: 'Pixieset client gallery screenshot', pos: '80% 50%', name: 'Pixieset', sub: 'Client gallery guide' },
  { href: '/pic-time-vs-pixieset-vs-shootproof', src: '/assets/pic-time.webp', alt: 'Pic-Time gallery screenshot', pos: '50% 0', name: 'Pic-Time', sub: 'Gallery comparison' },
  { href: '/best-crm-wedding-photographers', src: '/assets/honeybook-scheduler.webp', alt: 'HoneyBook scheduler screenshot', pos: '50% 30%', name: 'HoneyBook', sub: 'Wedding CRM guide' },
  { href: '/dubsado-vs-honeybook', src: '/assets/dubsado.webp', alt: 'Dubsado workflow screenshot', pos: '0 0', name: 'Dubsado', sub: 'Dubsado vs HoneyBook' },
  { href: '/filterpixel-alternatives', src: '/assets/filterpixel.webp', alt: 'FilterPixel culling screenshot', pos: '50% 50%', name: 'FilterPixel', sub: 'FilterPixel alternatives' },
  { href: '/best-photo-culling-software#narrative-select', src: '/assets/narrative-select.webp', alt: 'Narrative Select culling screenshot', pos: '50% 50%', name: 'Narrative Select', sub: 'Culling software guide' },
];

export function HomeInside() {
  return (
    <section aria-labelledby="h-inside" style={{ borderTop: '1px solid #DFE2DB' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(36px,5vw,56px) clamp(16px,4vw,40px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px 32px', marginBottom: '22px' }}>
          <h2 id="h-inside" style={{ margin: 0, fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(24px,2.4vw,30px)', lineHeight: 1.15 }}>Inside the software we cover</h2>
          <p style={{ margin: 0, fontSize: '15px', color: '#60645F' }}>Screenshots of each product, linked to the article that covers it.</p>
        </div>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,170px),1fr))', gap: '28px 20px' }}>
          {SHOTS.map((s) => (
            <li key={s.name} style={{ minWidth: 0 }}>
              <Link href={s.href} className="pt-hover-blue" style={{ display: 'block', textDecoration: 'none', color: '#20221F' }}>
                <span style={{ display: 'block', aspectRatio: '4/3', borderRadius: '3px', overflow: 'hidden', border: '1px solid #DFE2DB', background: '#F3F2EE', marginBottom: '10px' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.src} alt={s.alt} width={480} height={360} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: s.pos, display: 'block' }} />
                </span>
                <span style={{ display: 'block', fontWeight: 600, fontSize: '16px', lineHeight: 1.3 }}>{s.name}</span>
                <span style={{ display: 'block', fontSize: '14px', color: '#60645F', lineHeight: 1.4 }}>{s.sub}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
