const fs = require('fs');
const path = require('path');

const sitePath = path.join(__dirname, '../src/data/site.json');
const articlesPath = path.join(__dirname, '../src/data/articles.json');

const site = JSON.parse(fs.readFileSync(sitePath, 'utf8'));
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

function findBlock(blocks, predicate, description) {
  const matches = blocks.filter(predicate);
  if (matches.length === 0) {
    throw new Error(`Failed to find expected block: ${description}`);
  }
  if (matches.length > 1) {
    throw new Error(`Ambiguous matches (${matches.length}) for block: ${description}`);
  }
  return matches[0];
}

console.log('=== Step 1: Updating site.json ===');
const g1 = site.articles.find(a => a.slug === 'best-client-gallery-software');
if (!g1) throw new Error('Missing best-client-gallery-software in site.json');
g1.date = '2026-08-15';
g1.updated = '2026-10-24';
g1.checked = 'October 2026';

const g2 = site.articles.find(a => a.slug === 'pic-time-vs-pixieset-vs-shootproof');
if (!g2) throw new Error('Missing pic-time-vs-pixieset-vs-shootproof in site.json');
g2.date = '2026-08-14';
g2.updated = '2026-10-24';
g2.checked = 'October 2026';
g2.pricingAssumption = 'Storage tiers differ by platform; compare at your own volume with the Gallery Cost Calculator.';
if (g2.chooseIf) {
  g2.chooseIf[0].text = 'you want automated, campaign-driven print sales. Its built-in marketing sequences and gallery banner automations give it an edge for passive store revenue.';
  g2.chooseIf[2].text = 'you do high-volume shoots (like schools, dance studios, or sports), need robust client invoicing and contracts on paid plans, or want zero commission on direct orders.';
}

fs.writeFileSync(sitePath, JSON.stringify(site, null, 1) + '\n');
console.log('✓ site.json updated cleanly.');

console.log('\n=== Step 2: Updating pic-time-vs-pixieset-vs-shootproof in articles.json ===');
const pt = articles['pic-time-vs-pixieset-vs-shootproof'];
if (!pt) throw new Error('Missing pic-time-vs-pixieset-vs-shootproof in articles.json');

pt.meta = 'By The Photo Testers · Published August 14, 2026 · Updated October 24, 2026 · 9 min read';
pt.disclosure = "We research every tool and keep pricing current. Some links below are affiliate links, which means we may earn a commission at no extra cost to you. Pricing is current as of October 2026, but always confirm on the vendor's own page.";

// 1. Pixieset Free tier claim update
const pixiesetUl = findBlock(pt.blocks, b => b.type === 'ul' && b.items && b.items.some(item => item.some(r => /Basic \(\$8\/mo annual/i.test(r.t))), 'Pixieset pricing UL');
const pxFreeItem = pixiesetUl.items.find(item => item.some(r => /Free:/i.test(r.t)));
if (pxFreeItem) {
  pxFreeItem.splice(0, pxFreeItem.length, { t: 'Free:', b: 1 }, { t: ' 3GB storage (15% store commission, Pixieset branding on client galleries, no custom domain)' });
}

// 2. Pic-Time Free tier claim update
const picTimeUl = findBlock(pt.blocks, b => b.type === 'ul' && b.items && b.items.some(item => item.some(r => /Beginner \(\$7\/mo annual/i.test(r.t))), 'Pic-Time pricing UL');
const ptFreeItem = picTimeUl.items.find(item => item.some(r => /Free:/i.test(r.t)));
if (ptFreeItem) {
  ptFreeItem.splice(0, ptFreeItem.length, { t: 'Free:', b: 1 }, { t: ' 10GB storage (15% commission, basic marketing apps)' });
}

// 3. ShootProof intro & UL
const spIntroP = findBlock(pt.blocks, b => b.type === 'p' && b.runs && /ShootProof structures plans/i.test(b.runs.map(r => r.t).join('')), 'ShootProof intro paragraph');
spIntroP.runs = [
  { t: 'ShootProof structures plans by storage capacity (with 100 GB comfortably accommodating 5,000+ delivered high-res JPEGs at 5MB each). Paid plans include digital contracts, invoicing, and zero commission on direct orders.' }
];

const spUl = findBlock(pt.blocks, b => b.type === 'ul' && b.items && b.items.some(item => item.some(r => /Starter/i.test(r.t))), 'ShootProof pricing UL');
spUl.items = [
  [{ t: 'Free:', b: 1 }, { t: ' 3GB storage (photo delivery only; contracts and invoices excluded; 0% commission on direct lab orders)' }],
  [{ t: 'Starter (20 GB):', b: 1 }, { t: ' $8.33/mo annual ($99.99/yr) / $9.99/mo monthly (0% commission, contracts & invoicing included)' }],
  [{ t: 'Standard (100 GB):', b: 1 }, { t: ' $16.67/mo annual ($199.99/yr) / $19.99/mo monthly (0% commission, contracts & invoicing included)' }],
  [{ t: 'Professional (1,000 GB / 1 TB):', b: 1 }, { t: ' $26.67/mo annual ($319.99/yr) / $31.99/mo monthly (0% commission, contracts & invoicing included)' }],
  [{ t: 'Advanced (2,000 GB / 2 TB):', b: 1 }, { t: ' $43.33/mo annual ($519.99/yr) / $51.99/mo monthly (0% commission, contracts & invoicing included)' }],
  [{ t: 'Unlimited:', b: 1 }, { t: ' $50/mo annual ($600/yr) / $60/mo monthly (0% commission, full studio features + archiving)' }]
];

// 4. ShootProof contracts & invoicing paragraph
const spContractsP = findBlock(pt.blocks, b => b.type === 'p' && b.runs && /ShootProof has built-in invoicing and contracts natively/i.test(b.runs.map(r => r.t).join('')), 'ShootProof contracts paragraph');
spContractsP.runs = [
  { t: 'ShootProof has built-in invoicing and contracts natively on its paid plans. It’s not a full CRM, but it handles the essential business paperwork very well, especially for standard portrait and wedding workflows.' }
];

console.log('✓ pic-time-vs-pixieset-vs-shootproof updated cleanly.');

console.log('\n=== Step 3: Updating best-client-gallery-software in articles.json ===');
const bg = articles['best-client-gallery-software'];
if (!bg) throw new Error('Missing best-client-gallery-software in articles.json');

bg.meta = 'By The Photo Testers · Published August 15, 2026 · Updated October 24, 2026 · 9 min read';
bg.disclosure = 'We research every tool and keep pricing current. Some links below are affiliate links, which means we earn a commission if you sign up through them. It does not change what we write. Pricing is current as of October 2026, but always confirm on the vendor\'s own page.';

// 1. ShootProof feature paragraph
const spFeatureP = findBlock(bg.blocks, b => b.type === 'p' && b.runs && /Used by a (huge|large) (base|community) of (working )?photographers/i.test(b.runs.map(r => r.t).join('')), 'ShootProof feature paragraph');
spFeatureP.runs = [
  { t: 'Used by a large community of working photographers, ShootProof pairs client gallery delivery with essential studio business management. On paid tiers, it bundles contracts, invoicing, booking, and a commission-free print store on direct orders (contracts and invoicing are excluded on the free tier). Plans scale by storage capacity: Free (3 GB photo delivery), Starter 20 GB ($8.33/mo annual / $99.99/yr), Standard 100 GB ($16.67/mo annual / $199.99/yr), Professional 1,000 GB ($26.67/mo annual / $319.99/yr), Advanced 2,000 GB / 2 TB ($43.33/mo annual / $519.99/yr), and Unlimited ($50/mo annual / $600/yr).' }
];

// 2. ShootProof pricing note block
const spPriceP = findBlock(bg.blocks, b => b.type === 'p' && b.runs && /From \$8\.33\/mo/i.test(b.runs.map(r => r.t).join('')), 'ShootProof pricing block');
spPriceP.runs = [
  { t: 'Pricing:', b: 1 },
  { t: ' Free tier (3 GB); paid from $8.33/mo (Starter 20 GB, $99.99 billed annually), $16.67/mo (Standard 100 GB, $199.99/yr), $26.67/mo (Professional 1,000 GB), up to $43.33/mo (Advanced 2 TB, $519.99/yr) and $50/mo (Unlimited) (Checked October 2026).' }
];

// 3. CloudSpot description & pricing block
const csDescP = findBlock(bg.blocks, b => b.type === 'p' && b.runs && /run from Free/i.test(b.runs.map(r => r.t).join('')), 'CloudSpot description paragraph');
csDescP.runs = [
  { t: 'Its five plans run from Free (5 GB, 15% commission, no Studio Manager) and Entry ($6/mo annual [$72/yr], 15 GB, 15% commission) up through Full Suite tiers: Lite ($12/mo annual [$144/yr], 100 GB), Pro ($34/mo standard monthly, 500 GB), and Unlimited ($50/mo standard monthly, unlimited storage). The Full Suite tiers eliminate print commissions entirely (0%) and include Studio Manager contracts and invoicing.' }
];

const csPriceP = findBlock(bg.blocks, b => b.type === 'p' && b.runs && /Free tier \(5GB\); paid from/i.test(b.runs.map(r => r.t).join('')), 'CloudSpot pricing block');
csPriceP.runs = [
  { t: 'Pricing:', b: 1 },
  { t: ' Free tier (5 GB); paid from $12/mo (Lite, $144 billed annually) up to $50/mo (Unlimited) (Checked October 2026).' }
];

// 4. Cheapest FAQ block
const cheapestFaqP = findBlock(bg.blocks, b => b.type === 'p' && b.runs && /What is the cheapest client gallery software\?/i.test(b.runs.map(r => r.t).join('')), 'Cheapest FAQ block');
cheapestFaqP.runs = [
  { t: 'What is the cheapest client gallery software?\n', b: 1 },
  { t: 'CloudSpot has a free plan (up to 5GB) and its paid plans start at $12/month ($144/year) on annual billing; Zenfolio starts at $7/month (Basic); ShootProof starts at $8.33/month ($99.99/year annual). All scale with storage, and free tiers usually attach a sales commission or exclude business features like invoicing.' }
];

console.log('✓ best-client-gallery-software updated cleanly.');

console.log('\n=== Step 4: Updating best-photo-culling-software in articles.json ===');
const bc = articles['best-photo-culling-software'];
if (!bc) throw new Error('Missing best-photo-culling-software in articles.json');

// FilterPixel pros
const fpProsCons = findBlock(bc.blocks, b => b.type === 'proscons' && b.pros && b.pros.some(p => p.some(r => /Fastest culling here|Fastest cloud throughput/i.test(r.t))), 'FilterPixel proscons');
const fpFastPro = fpProsCons.pros.find(p => p.some(r => /Fastest culling here|Fastest cloud throughput/i.test(r.t)));
if (fpFastPro) {
  fpFastPro.splice(0, fpFastPro.length, { t: 'Fastest cloud throughput in competitor tests; speed independent of local hardware' });
}

console.log('✓ best-photo-culling-software updated cleanly.');

fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2) + '\n');
console.log('\n✓ articles.json written successfully.');
