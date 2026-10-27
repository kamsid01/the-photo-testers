import Link from 'next/link';
import { getSiteData } from '@/lib/site-data';
import { SERIF, h2Serif, lede, sectionHead, linkStrong } from '../ui';
import { NewsletterForm } from '../NewsletterForm';

const CMP_META: Record<string, { decision: string; pos: string[] }> = {
  'aftershoot-vs-imagen': {
    decision:
      'Aftershoot for high volume and offline work at a flat price. Imagen for Lightroom Classic users who want the strongest style matching at moderate volume.',
    pos: ['78% 50%', '62% 40%'],
  },
  'dubsado-vs-honeybook': {
    decision:
      'HoneyBook if you want it to just work. Dubsado if you want to customize everything and don’t mind the setup.',
    pos: ['0 0', '50% 30%'],
  },
  'pic-time-vs-pixieset-vs-shootproof': {
    decision:
      'Three gallery platforms compared on client experience, the print store, storage pricing, and what else each one does.',
    pos: ['50% 0', '82% 50%', '0 0'],
  },
};

export function HomeCompare() {
  const by = getSiteData().bySlug;
  const comparisons = Object.keys(CMP_META).map((s) => {
    const a = by[s];
    const n = (a.vs || []).length;
    return {
      ...a,
      decision: CMP_META[s].decision,
      cols: `repeat(${n}, 1fr)`,
      readLabel: `Read ${a.title}`,
      shots: (a.imgs || []).map((src, i) => ({
        src,
        pos: CMP_META[s].pos[i] || '50% 50%',
        ratio: n === 3 ? '3/4' : '4/3',
      })),
      names: (a.vs || []).map((name, i) => ({ name, sep: i < n - 1 ? 'vs' : '' })),
    };
  });

  return (
    <section aria-labelledby="h-compare" style={{ background: '#20221F', color: '#F4F3EF' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(48px,6vw,80px) clamp(16px,4vw,40px)' }}>
        <div style={{ ...sectionHead, marginBottom: '36px' }}>
          <div>
            <h2 id="h-compare" style={{ ...h2Serif, color: '#FFFFFF' }}>Compare before you commit</h2>
            <p style={{ ...lede, color: '#C9CBC5' }}>Head-to-heads for the decisions photographers ask about most, with a quick answer up top.</p>
          </div>
          <Link href="/blog?type=comparison" style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '15px' }}>
            All comparisons
          </Link>
        </div>
        <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap: '40px 32px' }}>
          {comparisons.map((c) => (
            <li key={c.slug} style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <Link href={c.href} tabIndex={-1} aria-hidden="true" style={{ display: 'grid', gridTemplateColumns: c.cols, gap: '3px', marginBottom: '20px' }}>
                {c.shots.map((s, idx) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={idx}
                    src={s.src}
                    alt=""
                    width={400}
                    height={300}
                    loading="lazy"
                    style={{
                      width: '100%',
                      aspectRatio: s.ratio,
                      objectFit: 'cover',
                      objectPosition: s.pos,
                      background: '#2E302C',
                      borderRadius: '2px',
                      display: 'block',
                    }}
                  />
                ))}
              </Link>
              <p style={{ margin: '0 0 10px', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '4px 10px', fontFamily: SERIF, fontSize: 'clamp(24px,2.3vw,30px)', lineHeight: 1.1, color: '#FFFFFF' }}>
                {c.names.map((n, idx) => (
                  <span key={idx} style={{ display: 'inline-flex', alignItems: 'baseline', gap: '10px' }}>
                    <span>{n.name}</span>
                    {n.sep && <span style={{ fontStyle: 'italic', fontSize: '0.62em', color: '#9A9D96' }}>{n.sep}</span>}
                  </span>
                ))}
              </p>
              <p style={{ margin: '0 0 14px', fontSize: '15px', lineHeight: 1.55, color: '#C9CBC5' }}>{c.decision}</p>
              <p style={{ margin: 'auto 0 0', paddingTop: '14px', borderTop: '1px solid #3A3C38', fontSize: '14px', color: '#A7AAA3', display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                <span>{c.catName} · Checked {c.checked}</span>
                <Link href={c.href} style={{ color: '#FFFFFF', fontWeight: 600 }} aria-label={c.readLabel}>Read</Link>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function HomeTools() {
  return (
    <section aria-labelledby="h-tools" style={{ borderBottom: '1px solid #DFE2DB' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(48px,6vw,80px) clamp(16px,4vw,40px)' }}>
        <div style={sectionHead}>
          <div>
            <h2 id="h-tools" style={h2Serif}>Free tools for your numbers</h2>
            <p style={{ ...lede, maxWidth: '38em' }}>Enter your own workflow figures. Each tool explains its assumptions and runs entirely in your browser.</p>
          </div>
          <Link href="/tools" style={linkStrong}>All tools</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap: '24px' }}>
          {/* Pricing Calculator card */}
          <article style={{ background: '#FFFFFF', border: '1px solid #DFE2DB', borderRadius: '4px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <div aria-hidden="true" style={{ margin: '16px 16px 0', padding: '16px 18px', background: '#F6F5F1', borderRadius: '3px', fontSize: '14px', fontVariantNumeric: 'tabular-nums' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #E4E5DF' }}><span style={{ color: '#60645F' }}>Take-home goal</span><span>£40,000</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #E4E5DF' }}><span style={{ color: '#60645F' }}>Shoots per year</span><span>30</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #E4E5DF' }}><span style={{ color: '#60645F' }}>Costs · tax rate</span><span>£8,000 · 25%</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '10px 0 0' }}><span style={{ fontWeight: 600 }}>Price per shoot</span><span style={{ fontFamily: SERIF, fontSize: '28px', color: '#20221F' }}>£2,044</span></div>
            </div>
            <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: 600, lineHeight: 1.25 }}>Photography Pricing Calculator</h3>
              <dl style={{ margin: '0 0 18px', display: 'grid', gap: '8px', fontSize: '15px', lineHeight: 1.45 }}>
                <div><dt style={{ display: 'inline', fontWeight: 600 }}>You enter: </dt><dd style={{ display: 'inline', margin: 0, color: '#4A4E49' }}>take-home goal, shoots, costs, tax rate, and hours.</dd></div>
                <div><dt style={{ display: 'inline', fontWeight: 600 }}>You learn: </dt><dd style={{ display: 'inline', margin: 0, color: '#4A4E49' }}>the price per shoot that covers them, and your real hourly rate.</dd></div>
                <div><dt style={{ display: 'inline', fontWeight: 600 }}>Why: </dt><dd style={{ display: 'inline', margin: 0, color: '#4A4E49' }}>editing, admin, and travel hours are easy to leave out of a price.</dd></div>
              </dl>
              <Link href="/tools/pricing-calculator" style={{ marginTop: 'auto', fontWeight: 600, fontSize: '15px' }}>Open the calculator</Link>
            </div>
          </article>

          {/* AI Culling Quiz card */}
          <article style={{ background: '#FFFFFF', border: '1px solid #DFE2DB', borderRadius: '4px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <div aria-hidden="true" style={{ margin: '16px 16px 0', padding: '16px 18px', background: '#F6F5F1', borderRadius: '3px', fontSize: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#60645F', marginBottom: '8px' }}><span>Question 1 of 5</span><span>Volume</span></div>
              <div style={{ height: '3px', background: '#E1E2DC', borderRadius: '2px', marginBottom: '12px' }}><div style={{ width: '20%', height: '3px', background: '#3159D7', borderRadius: '2px' }} /></div>
              <p style={{ margin: '0 0 10px', fontWeight: 600 }}>What’s your monthly photo volume?</p>
              <div style={{ display: 'grid', gap: '6px' }}>
                <span style={{ padding: '6px 10px', border: '1px solid #DFE2DB', borderRadius: '3px', background: '#FFFFFF' }}>Low (under 1,000)</span>
                <span style={{ padding: '6px 10px', border: '1.5px solid #3159D7', borderRadius: '3px', background: '#EEF2FC' }}>Medium (1,000-5,000)</span>
                <span style={{ padding: '6px 10px', border: '1px solid #DFE2DB', borderRadius: '3px', background: '#FFFFFF' }}>High (5,000+)</span>
              </div>
            </div>
            <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: 600, lineHeight: 1.25 }}>AI Culling Tool Finder</h3>
              <dl style={{ margin: '0 0 18px', display: 'grid', gap: '8px', fontSize: '15px', lineHeight: 1.45 }}>
                <div><dt style={{ display: 'inline', fontWeight: 600 }}>You enter: </dt><dd style={{ display: 'inline', margin: 0, color: '#4A4E49' }}>volume, priorities, offline needs, budget, and main task.</dd></div>
                <div><dt style={{ display: 'inline', fontWeight: 600 }}>You learn: </dt><dd style={{ display: 'inline', margin: 0, color: '#4A4E49' }}>a suggested starting point, a runner-up, and the main tradeoff.</dd></div>
                <div><dt style={{ display: 'inline', fontWeight: 600 }}>Why: </dt><dd style={{ display: 'inline', margin: 0, color: '#4A4E49' }}>it narrows seven tools to the two worth trialing first.</dd></div>
              </dl>
              <Link href="/tools/culling-tool-finder" style={{ marginTop: 'auto', fontWeight: 600, fontSize: '15px' }}>Take the five questions</Link>
            </div>
          </article>

          {/* Gallery Calculator card */}
          <article style={{ background: '#FFFFFF', border: '1px solid #DFE2DB', borderRadius: '4px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <div aria-hidden="true" style={{ margin: '16px 16px 0', padding: '16px 18px', background: '#F6F5F1', borderRadius: '3px', fontSize: '14px', fontVariantNumeric: 'tabular-nums' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #E4E5DF' }}><span style={{ color: '#60645F' }}>30 shoots × 500 photos</span><span>15,000 photos</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #E4E5DF' }}><span style={{ color: '#60645F' }}>Storage at ~5MB each</span><span>73.2 GB</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '10px 0 0' }}>
                <span><span style={{ display: 'block', fontWeight: 600 }}>Lowest estimate</span><span style={{ color: '#60645F' }}>SmugMug Power</span></span>
                <span style={{ fontFamily: SERIF, fontSize: '28px', color: '#20221F' }}>$180<span style={{ fontFamily: "'Instrument Sans',sans-serif", fontSize: '14px', color: '#60645F' }}>/yr</span></span>
              </div>
            </div>
            <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: 600, lineHeight: 1.25 }}>Gallery Cost Calculator</h3>
              <dl style={{ margin: '0 0 18px', display: 'grid', gap: '8px', fontSize: '15px', lineHeight: 1.45 }}>
                <div><dt style={{ display: 'inline', fontWeight: 600 }}>You enter: </dt><dd style={{ display: 'inline', margin: 0, color: '#4A4E49' }}>shoots per year and average photos delivered.</dd></div>
                <div><dt style={{ display: 'inline', fontWeight: 600 }}>You learn: </dt><dd style={{ display: 'inline', margin: 0, color: '#4A4E49' }}>the plan you would need on six platforms, and what it costs.</dd></div>
                <div><dt style={{ display: 'inline', fontWeight: 600 }}>Why: </dt><dd style={{ display: 'inline', margin: 0, color: '#4A4E49' }}>entry prices rarely match the plan your real volume needs.</dd></div>
              </dl>
              <Link href="/tools/gallery-cost-calculator" style={{ marginTop: 'auto', fontWeight: 600, fontSize: '15px' }}>Compare gallery costs</Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { n: '01', title: 'Map what the tool does', text: 'Plans, features, limits, and current pricing, taken from the vendor’s own pages and documentation.' },
  { n: '02', title: 'Weigh the evidence, labeled', text: 'Hands-on use where an article says so. Otherwise user reports and third-party benchmarks, each credited to its source.' },
  { n: '03', title: 'Give cons equal space', text: 'What is good and what gets in the way, including for tools we recommend and tools with affiliate programs.' },
  { n: '04', title: 'Date it and keep it current', text: 'Prices carry the month they were checked. Pages are updated when plans change.' },
];

export function HomeMethod() {
  return (
    <section aria-labelledby="h-method" style={{ background: '#FFFFFF', borderBottom: '1px solid #DFE2DB' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(48px,6vw,80px) clamp(16px,4vw,40px)', display: 'flex', flexWrap: 'wrap', gap: '32px 64px' }}>
        <div style={{ flex: '1 1 300px', maxWidth: '440px' }}>
          <h2 id="h-method" style={{ ...h2Serif, margin: '0 0 12px' }}>How recommendations are made</h2>
          <p style={{ margin: '0 0 20px', fontSize: '17px', color: '#4A4E49', maxWidth: '30em' }}>
            Every article says what its findings are based on. Some coverage comes from hands-on use of the tools; some is researched from pricing pages, documentation, and what users and independent reviewers report. We label which is which.
          </p>
          <Link href="/how-we-review" style={linkStrong}>Read how we review</Link>
        </div>
        <ol style={{ listStyle: 'none', margin: 0, padding: 0, flex: '2 1 520px', minWidth: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap: '0 32px' }}>
          {STEPS.map((s) => (
            <li key={s.n} style={{ borderTop: '1px solid #20221F', padding: '16px 0 24px' }}>
              <p style={{ margin: '0 0 10px', fontFamily: SERIF, fontSize: '20px', color: '#3159D7' }}>{s.n}</p>
              <h3 style={{ margin: '0 0 8px', fontSize: '17px', fontWeight: 600 }}>{s.title}</h3>
              <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.55, color: '#4A4E49' }}>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function HomeLatest() {
  const site = getSiteData();
  const editorials = site.articles.filter((a) => a.type === 'editorial');
  const latest = site.articles.filter((a) => a.type !== 'editorial' && a.img).slice(0, 6);

  return (
    <section aria-labelledby="h-latest">
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(48px,6vw,80px) clamp(16px,4vw,40px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'end', gap: '16px', marginBottom: '28px' }}>
          <h2 id="h-latest" style={h2Serif}>Latest articles</h2>
          <Link href="/blog" style={linkStrong}>All {site.articles.length} articles</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: '40px 64px' }}>
          <div>
            <h3 style={{ margin: '0 0 4px', paddingBottom: '10px', borderBottom: '1px solid #20221F', fontSize: '14px', fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase' }}>
              Editorial
            </h3>
            {editorials.map((a) => (
              <article key={a.slug} style={{ padding: '22px 0', borderBottom: '1px solid #DFE2DB' }}>
                <p style={{ margin: '0 0 8px', fontSize: '14px', color: '#60645F' }}>{a.catName} · {a.dateLabel} · {a.readLabel}</p>
                <h4 style={{ margin: '0 0 8px', fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(24px,2.2vw,28px)', lineHeight: 1.18 }}>
                  <Link href={a.href} className="pt-hover-blue" style={{ color: '#20221F', textDecoration: 'none' }}>{a.title}</Link>
                </h4>
                <p style={{ margin: 0, fontSize: '16px', lineHeight: 1.55, color: '#4A4E49' }}>{a.summary}</p>
              </article>
            ))}
          </div>
          <div style={{ minWidth: 0 }}>
            <h3 style={{ margin: '0 0 4px', paddingBottom: '10px', borderBottom: '1px solid #20221F', fontSize: '14px', fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase' }}>
              Reviews, comparisons &amp; guides
            </h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {latest.map((a) => (
                <li key={a.slug} style={{ borderBottom: '1px solid #DFE2DB' }}>
                  <Link href={a.href} className="pt-hover-blue" style={{ display: 'grid', gridTemplateColumns: '96px 1fr', gap: '16px', alignItems: 'center', padding: '14px 0', textDecoration: 'none', color: '#20221F' }}>
                    <span style={{ display: 'block', width: '96px', aspectRatio: '3/2', borderRadius: '3px', overflow: 'hidden', border: '1px solid #DFE2DB', background: '#F3F2EE' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={a.img || ''} alt="" width={192} height={128} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: a.imgPos || '50% 30%', display: 'block' }} />
                    </span>
                    <span>
                      <span style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#60645F', marginBottom: '2px' }}>{a.typeLabel}</span>
                      <span style={{ display: 'block', fontSize: '16px', fontWeight: 500, lineHeight: 1.4 }}>{a.title}</span>
                      <span style={{ display: 'block', fontSize: '14px', color: '#60645F', marginTop: '2px' }}>{a.catName} · {a.dateLabel}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeNewsletter() {
  return (
    <section aria-labelledby="h-news" style={{ borderTop: '1px solid #DFE2DB', background: '#EEF1F9' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(40px,5vw,64px) clamp(16px,4vw,40px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,360px),1fr))', gap: '24px 64px', alignItems: 'center' }}>
        <div>
          <h2 id="h-news" style={{ margin: '0 0 10px', fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(26px,2.6vw,34px)', lineHeight: 1.12 }}>
            New reviews, comparisons, and pricing changes
          </h2>
          <p style={{ margin: 0, fontSize: '17px', color: '#4A4E49', maxWidth: '32em' }}>
            When we publish a new review or comparison, or a tool we cover changes its pricing, you hear about it. Nothing else.
          </p>
        </div>
        <div>
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
