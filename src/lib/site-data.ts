import siteRaw from '@/data/site.json';
import articlesRaw from '@/data/articles.json';

export interface Run {
  t: string;
  b?: boolean;
  i?: boolean;
  href?: string;
  ext?: boolean;
}

export interface RenderedRun {
  t: string;
  href?: string;
  target?: string;
  rel?: string;
  isLink: boolean;
  isB: boolean;
  isI: boolean;
  isPlain: boolean;
}

export interface RawBlock {
  type: string;
  id?: string;
  productId?: string;
  text?: string;
  runs?: Run[];
  items?: Run[][];
  head?: Run[][];
  rows?: Run[][][];
  src?: string;
  alt?: string;
  cap?: string;
  pros?: Run[][];
  cons?: Run[][];
  href?: string;
  ext?: boolean;
  blocks?: RawBlock[];
}

export interface ArticleSummary {
  slug: string;
  type: 'review' | 'comparison' | 'guide' | 'alternatives' | 'editorial';
  typeLabel: string;
  cat: string;
  catName: string;
  catHref: string;
  date: string;
  dateLabel: string;
  checked?: string;
  evidence: string;
  evidenceLabel: string;
  bylinePlaceholder?: boolean;
  author: string;
  product?: string;
  from?: string;
  img?: string | null;
  imgCaption?: string;
  imgPos?: string;
  hasImg: boolean;
  noImg: boolean;
  short: string;
  title: string;
  href: string;
  summary: string;
  readMins: number;
  words: number;
  readLabel: string;
  pull?: string;
  pricing?: [string, string, string][];
  pricingNote?: string;
  pricingAssumption?: string;
  chooseIf?: { name: string; text: string; href?: string }[];
  alts?: string[];
  evidenceNotes?: { match: string; tags: string[]; note?: string }[];
  vs?: string[];
  imgs?: string[];
}

export interface CategoryData {
  slug: string;
  name: string;
  title: string;
  desc: string;
  liveDesc?: string;
  status: string;
  img?: string;
  startHere?: string;
  related?: string[];
  tools?: string[];
  intro?: string[];
  elsewhere?: string[];
  elsewhereNote?: string;
  href: string;
  articles: ArticleSummary[];
  count: number;
  published: boolean;
  statusLabel: string;
  statusColor: string;
}

export interface SiteData {
  types: Record<string, string>;
  evidence: Record<string, { label: string; text: string }>;
  categories: CategoryData[];
  navCategories: CategoryData[];
  catBy: Record<string, CategoryData>;
  articles: ArticleSummary[];
  bySlug: Record<string, ArticleSummary>;
}

const IMG_META: Record<string, [number, number, string]> = {
  '/assets/aftershoot-homepage.webp': [1800, 945, '100% 50%'],
  '/assets/imagen-ai-review-home-page-1536x994.jpg': [1536, 994, '50% 50%'],
  '/assets/honeybook-scheduler.png': [1024, 817, '50% 50%'],
  '/assets/studio-ninja.webp': [1600, 1362, '50% 50%'],
  '/assets/pixieset.png': [3306, 2480, '0 0'],
  '/assets/dubsado.png': [1024, 1024, '0 0'],
  '/assets/filterpixel.png': [1376, 768, '50% 50%'],
  '/assets/narrative-select.png': [1024, 652, '50% 50%'],
  '/assets/photo-mechanic.png': [1024, 575, '50% 50%'],
  '/assets/evoto.png': [1024, 717, '50% 50%'],
  '/assets/excire-foto.png': [1024, 576, '50% 50%'],
  '/assets/pixieset-v3.jpg': [2400, 1260, '50% 50%'],
  '/assets/shootproof.png': [1024, 559, '50% 50%'],
  '/assets/cloudspot.png': [1024, 571, '50% 50%'],
  '/assets/pic-time.png': [1024, 659, '50% 50%'],
  '/assets/smugmug.jpg': [1024, 587, '50% 50%'],
  '/assets/zenfolio.png': [1024, 539, '50% 50%'],
};

export function runsText(rs?: Run[]): string {
  return (rs || []).map((r) => r.t).join('');
}

export function formatRuns(rs?: Run[]): RenderedRun[] {
  return (rs || []).map((r) => {
    const link = !!r.href;
    return {
      t: r.t,
      href: r.href,
      target: r.ext ? '_blank' : undefined,
      rel: r.ext ? 'sponsored nofollow noopener' : undefined,
      isLink: link,
      isB: !link && !!r.b,
      isI: !link && !r.b && !!r.i,
      isPlain: !link && !r.b && !r.i,
    };
  });
}

function countWords(blocks: RawBlock[]): number {
  let n = 0;
  const walk = (bs: RawBlock[]) =>
    bs.forEach((b) => {
      if (b.runs) n += runsText(b.runs).split(/\s+/).filter(Boolean).length;
      if (b.items) b.items.forEach((i) => (n += runsText(i).split(/\s+/).filter(Boolean).length));
      if (b.pros && b.cons)
        b.pros.concat(b.cons).forEach((i) => (n += runsText(i).split(/\s+/).filter(Boolean).length));
      if (b.rows)
        b.rows.forEach((r) => r.forEach((c) => (n += runsText(c).split(/\s+/).filter(Boolean).length)));
      if (b.blocks) walk(b.blocks);
    });
  walk(blocks);
  return n;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export function formatDateLabel(d: string): string {
  const [y, m, dd] = d.split('-').map(Number);
  return `${MONTHS[m - 1]} ${dd}, ${y}`;
}

let cachedSite: SiteData | null = null;

export function getSiteData(): SiteData {
  if (cachedSite) return cachedSite;

  const contentMap = articlesRaw as unknown as Record<string, { title: string; meta: string; disclosure: string | null; blocks: RawBlock[] }>;

  Object.values(contentMap).forEach((c) =>
    c.blocks.forEach((b) => {
      if (b.type === 'h2' && b.text) {
        const m = b.text.match(/^\d+\.\s+(.+?)(?:\s[-–]\s|:\s)/);
        if (m) {
          b.productId = m[1]
            .toLowerCase()
            .replace(/\+/g, ' ')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
        }
      }
    })
  );

  const cats: CategoryData[] = (siteRaw.categories as unknown as CategoryData[]).map((c) => ({
    ...c,
    href: `/category/${c.slug}`,
    articles: [],
    count: 0,
    published: false,
    statusLabel: 'In development',
    statusColor: '#8A5A14',
  }));
  const catBy = Object.fromEntries(cats.map((c) => [c.slug, c]));

  const arts: ArticleSummary[] = (siteRaw.articles as unknown as ArticleSummary[])
    .map((a) => {
      const c = contentMap[a.slug] || { title: a.short, blocks: [] };
      const wc = countWords(c.blocks);
      const readMins = Math.max(1, Math.round(wc / 230));
      const typesMap = siteRaw.types as Record<string, string>;
      const evMap = siteRaw.evidence as Record<string, { label: string; text: string }>;
      return {
        ...a,
        title: c.title,
        href: `/${a.slug}`,
        typeLabel: typesMap[a.type],
        catName: catBy[a.cat].name,
        catHref: catBy[a.cat].href,
        dateLabel: formatDateLabel(a.date),
        readMins,
        words: wc,
        readLabel: `${readMins} min read`,
        author: 'The Photo Testers team',
        evidenceLabel: evMap[a.evidence].label,
        hasImg: !!a.img,
        noImg: !a.img,
      };
    })
    .sort((x, y) => y.date.localeCompare(x.date));

  cats.forEach((c) => {
    c.articles = arts.filter((a) => a.cat === c.slug);
    c.count = c.articles.length;
    c.published = c.count > 0;
    c.statusLabel = c.count ? `${c.count} ${c.count === 1 ? 'article' : 'articles'}` : 'In development';
    c.statusColor = c.count ? '#60645F' : '#8A5A14';
  });

  const bySlug = Object.fromEntries(arts.map((a) => [a.slug, a]));
  const navCategories = cats.filter((c) => c.published);

  cachedSite = {
    types: siteRaw.types,
    evidence: siteRaw.evidence,
    categories: cats,
    navCategories,
    catBy,
    articles: arts,
    bySlug,
  };
  return cachedSite;
}

export function getRawArticlesMap() {
  return articlesRaw as unknown as Record<
    string,
    { title: string; meta: string; disclosure: string | null; blocks: RawBlock[] }
  >;
}

export function buildArticlePageData(slug: string) {
  const site = getSiteData();
  const contentMap = getRawArticlesMap();
  const a = site.bySlug[slug];
  const c = contentMap[slug];
  if (!a || !c) return null;

  const T = a.type;
  let blocks = c.blocks.slice();
  const relatedSlugsFromBody: string[] = [];

  const hrIdx = blocks.map((b) => b.type).lastIndexOf('hr');
  if (hrIdx > -1) {
    blocks.slice(hrIdx + 1).forEach((b) => {
      const t = runsText(b.runs).trim();
      if (/^Related:/.test(t) && b.runs) {
        b.runs
          .filter((r) => r.href && (r.href.startsWith('/') || r.href.startsWith('#/')))
          .forEach((r) => {
            const cleanHref = r.href!.replace(/^#/, '');
            relatedSlugsFromBody.push(cleanHref.slice(1).split('#')[0]);
          });
      }
    });
    blocks = blocks.slice(0, hrIdx);
  }
  // Strip any trailing publisher bio (editorial guest post boilerplate)
  blocks = blocks.filter(
    (b) =>
      b.type !== 'hr' &&
      !(b.type === 'p' && /^The Photo Testers is an independent publication/i.test(runsText(b.runs).trim()))
  );

  let standfirst = a.summary;
  if (blocks[0] && blocks[0].type === 'p' && /^An editorial perspective/.test(runsText(blocks[0].runs).trim())) {
    standfirst = runsText(blocks[0].runs).trim();
    blocks = blocks.slice(1);
  }

  let box: RawBlock | null = null;
  const bi = blocks.findIndex((b) => b.type === 'box');
  if (bi > -1) {
    box = blocks[bi];
    blocks.splice(bi, 1);
  }

  const faq: { q: string; runs: RenderedRun[] }[] = [];
  const fi = blocks.findIndex((b) => b.type === 'h2' && /^FAQ/i.test(b.text || ''));
  if (fi > -1) {
    blocks.slice(fi + 1).forEach((b) => {
      if (b.type !== 'p' || !b.runs) return;
      const rs = b.runs;
      let k = 0;
      let q = '';
      while (k < rs.length && (rs[k].b || !rs[k].t.trim())) {
        q += rs[k].t;
        k++;
      }
      const rest = rs.slice(k);
      if (rest[0]) rest[0] = { ...rest[0], t: rest[0].t.replace(/^\s+/, '') };
      if (q.trim()) faq.push({ q: q.trim(), runs: formatRuns(rest) });
    });
    blocks = blocks.slice(0, fi);
  }

  if (T === 'editorial' && a.pull && blocks.length > 5) {
    let pIdx = 0;
    let seen = 0;
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].type === 'h2') seen++;
      if (seen === 2) {
        pIdx = i;
        break;
      }
    }
    blocks.splice(pIdx || 4, 0, { type: 'pull', text: a.pull });
  }

  const notes = a.evidenceNotes || [];
  let heroUsed = false;
  const out: any[] = [];
  const toc: { id: string; label: string }[] = [];

  blocks.forEach((b) => {
    if (b.type === 'h2') {
      if (b.productId && b.text) {
        const m = b.text.match(/^(\d+)\.\s+(.+?)(?:\s[-–]\s|:\s)(.+)$/);
        const best = m ? m[3].trim() : '';
        out.push({
          isProduct: true,
          id: b.productId,
          num: m ? m[1] : '',
          name: m ? m[2] : b.text,
          bestFor: best.charAt(0).toUpperCase() + best.slice(1),
        });
        toc.push({ id: b.productId, label: m ? m[2] : b.text });
      } else if (b.id && b.text) {
        out.push({ isH2: true, id: b.id, text: b.text });
        toc.push({ id: b.id, label: b.text });
      }
    } else if (b.type === 'h3') {
      out.push({ isH3: true, id: b.id, text: b.text });
    } else if (b.type === 'p' && b.runs) {
      const t = runsText(b.runs).trim();
      if (/^Good$|^Not so good$/.test(t)) return;
      const note = notes.find((n) => t.startsWith(n.match));
      if (note) {
        out.push({
          hasEvidence: true,
          tags: note.tags.map((l) => ({ label: l })),
          evNote: note.note || '',
        });
      }
      if (b.runs[0] && b.runs[0].b && /^Pricing:/.test(b.runs[0].t)) {
        out.push({ isPricing: true, runs: formatRuns(b.runs) });
      } else {
        out.push({ isP: true, runs: formatRuns(b.runs) });
      }
    } else if ((b.type === 'ul' || b.type === 'ol') && b.items) {
      out.push({
        isUl: b.type === 'ul',
        isOl: b.type === 'ol',
        items: b.items.map((it) => ({ runs: formatRuns(it) })),
      });
    } else if (b.type === 'table' && b.head && b.rows) {
      const cols = b.head.length || (b.rows[0] || []).length;
      out.push({
        isTable: true,
        label: 'Comparison table',
        minW: `${Math.max(520, cols * 140)}px`,
        cols,
        head: b.head.map((h) => ({ text: runsText(h).trim() || ' ' })),
        rows: b.rows.map((r) => ({
          cells: r.map((cell, ci) => ({
            fw: ci === 0 ? '600' : '400',
            runs: formatRuns(cell),
          })),
        })),
      });
    } else if (b.type === 'img' && b.src) {
      const im = IMG_META[b.src] || [1200, 700, '50% 50%'];
      if (T === 'review' && b.src === a.img && !heroUsed) {
        heroUsed = true;
        return;
      }
      const ratio = im[0] / im[1] < 1.3 ? '4/3' : '16/9';
      out.push({
        isImg: true,
        src: b.src,
        alt: `${b.cap || b.alt || 'Screenshot'} screenshot`,
        cap: b.cap || b.alt,
        w: im[0],
        h: im[1],
        pos: im[2],
        ratio,
      });
    } else if (b.type === 'proscons' && b.pros && b.cons) {
      out.push({
        isProsCons: true,
        pros: b.pros.map((p) => ({ text: runsText(p).trim() })),
        cons: b.cons.map((cn) => ({ text: runsText(cn).trim() })),
      });
    } else if (b.type === 'cta') {
      out.push({
        isCta: true,
        text: b.text,
        href: b.href,
        ext: !!b.ext,
        target: b.ext ? '_blank' : undefined,
        rel: b.ext ? 'sponsored nofollow noopener' : undefined,
      });
    } else if (b.type === 'pull') {
      out.push({ isPull: true, text: b.text });
    } else if (b.type === 'quote' && b.runs) {
      out.push({ isQuote: true, runs: formatRuns(b.runs) });
    }
  });

  if (faq.length) toc.push({ id: 'faq', label: 'FAQ' });

  let verdict: { headline: string; bestFor: string; elsewhere: string; bottom: string } | null = null;
  let shortlist: { label: string; tool: string; text: string; href: string; noHref: boolean }[] = [];
  let boxParas: { runs: RenderedRun[] }[] = [];
  let decisionLead = '';

  if (box && box.blocks) {
    const ps = box.blocks.filter((x) => x.type === 'p');
    if (T === 'review') {
      const get = (re: RegExp) => {
        const p = ps.find((p) => re.test(runsText(p.runs).trim()));
        return p ? runsText(p.runs).trim().replace(re, '').trim() : '';
      };
      const bestFor = get(/^Who it's for:/);
      const elsewhere = get(/^Who should look elsewhere:/);
      const bottom = get(/^Bottom line:/);
      verdict = {
        headline: ps[0] ? runsText(ps[0].runs).trim() : '',
        bestFor: bestFor.charAt(0).toUpperCase() + bestFor.slice(1),
        elsewhere: elsewhere.charAt(0).toUpperCase() + elsewhere.slice(1),
        bottom: bottom.charAt(0).toUpperCase() + bottom.slice(1),
      };
    } else if (T === 'guide' || T === 'alternatives') {
      const prodIds = Object.fromEntries(out.filter((o) => o.isProduct).map((o) => [o.name.toLowerCase(), o.id]));
      const items = ps.map((p) => {
        const bold = p.runs && p.runs[0] && p.runs[0].b ? p.runs[0].t.trim() : '';
        const m = bold.match(/^(Best [^:]+|Cheapest [^:]+|Fastest [^:]+|Our pick|On a budget\?):\s*(.+?)\.?$/);
        if (!m || !p.runs) return null;
        const tool = m[2].replace(/\.$/, '');
        const id =
          prodIds[tool.toLowerCase()] ||
          Object.entries(prodIds).find(([k]) => k.startsWith(tool.toLowerCase().split(' ')[0]))?.[1];
        return {
          label: m[1].replace(/\?$/, ''),
          tool,
          text: runsText(p.runs.slice(1)).trim(),
          href: id ? `#${id}` : '',
          noHref: !id,
        };
      });
      if (items.length && items.every(Boolean)) {
        shortlist = items as { label: string; tool: string; text: string; href: string; noHref: boolean }[];
      } else {
        boxParas = ps.map((p) => ({ runs: formatRuns(p.runs) }));
      }
    } else if (T === 'comparison') {
      decisionLead = ps[0] ? runsText(ps[0].runs).trim() : '';
    } else {
      boxParas = ps.map((p) => ({ runs: formatRuns(p.runs) }));
    }
  }

  const ev = site.evidence[a.evidence];
  const relSlugs = [
    ...new Set(
      relatedSlugsFromBody.concat(site.articles.filter((x) => x.cat === a.cat && x.slug !== slug).map((x) => x.slug))
    ),
  ]
    .filter((s) => s !== slug && site.bySlug[s])
    .slice(0, 4);

  const toolsBy: Record<string, { href: string; name: string; line: string }> = {
    'pricing-calculator': {
      href: '/tools/pricing-calculator',
      name: 'Photography Pricing Calculator',
      line: 'Work out the price per shoot that covers your costs, tax, and hidden hours.',
    },
    'culling-tool-finder': {
      href: '/tools/culling-tool-finder',
      name: 'AI Culling Tool Finder',
      line: 'Five questions about your volume, priorities, and workflow.',
    },
    'gallery-cost-calculator': {
      href: '/tools/gallery-cost-calculator',
      name: 'Gallery Cost Calculator',
      line: 'See which plan your delivery volume needs on six gallery platforms.',
    },
  };
  const cat = site.catBy[a.cat];
  const tool = cat && cat.tools && cat.tools[0] ? toolsBy[cat.tools[0]] : null;
  const typeLower = {
    review: 'review',
    comparison: 'comparison',
    guide: 'guide',
    alternatives: 'guide',
    editorial: 'article',
  }[T];

  return {
    a,
    metaDescription: c.meta,
    blocks: out,
    toc,
    faq,
    hasFaq: faq.length > 0,
    standfirst,
    byline: 'The Photo Testers team',
    evidenceLabel: ev.label,
    evidenceText: ev.text,
    hasDisclosure: !!c.disclosure,
    disclosure: c.disclosure,
    editorial: T === 'editorial',
    hasHero: T === 'review' && !!a.img,
    heroAlt: `${a.product} interface, from the vendor’s website`,
    heroCaption: a.imgCaption || '',
    heroPos: a.imgPos || '50% 50%',
    hasVerdict: !!verdict,
    verdict,
    hasPricing: !!a.pricing,
    pricing: (a.pricing || []).map((p) => ({ plan: p[0], price: p[1], basis: p[2] })),
    pricingNote: a.pricingNote || '',
    hasDecision: T === 'comparison',
    hasDecisionLead: !!decisionLead,
    decisionLead,
    chooseIf: (a.chooseIf || []).map((ci) => ({ ...ci, linkLabel: `Read the ${ci.name} review` })),
    hasAssumption: !!a.pricingAssumption,
    pricingAssumption: a.pricingAssumption,
    hasShortlist: shortlist.length > 0,
    shortlist,
    shortlistTitle: T === 'alternatives' ? `Quick picks if you’re moving from ${a.from}` : 'The shortlist',
    hasGenericBox: boxParas.length > 0,
    boxParas,
    boxTitle: 'The short answer',
    hasAlts: T === 'review' && !!a.alts,
    alts: (a.alts || []).map((s) => site.bySlug[s]).filter(Boolean),
    related: relSlugs.map((s) => site.bySlug[s]).filter(Boolean),
    hasTool: !!tool,
    tool,
    typeLower,
    hasChecked: !!a.checked,
    commercialText:
      T === 'editorial'
        ? 'Editorial articles carry no product verdicts or rankings. Our affiliate relationships are described in the disclosure.'
        : 'Some vendor links may be affiliate links. They never decide the recommendation.',
  };
}
