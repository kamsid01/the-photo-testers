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
g1.date = '2026-08-15'; // Preserved original August publication date
g1.updated = '2026-10-24'; // Separate modification date
g1.checked = 'October 2026';

const g2 = site.articles.find(a => a.slug === 'pic-time-vs-pixieset-vs-shootproof');
if (!g2) throw new Error('Missing pic-time-vs-pixieset-vs-shootproof in site.json');
g2.date = '2026-08-14'; // Preserved original August publication date
g2.updated = '2026-10-24'; // Separate modification date
g2.checked = 'October 2026';
if (g2.chooseIf) {
  g2.chooseIf[0].text = 'you want automated, campaign-driven print sales. Its built-in marketing sequences and gallery banner automations give it an edge for passive store revenue.';
  g2.chooseIf[2].text = 'you do high-volume shoots (like schools, dance studios, or sports), need robust client invoicing and contracts, or want zero commission on direct orders.';
}

fs.writeFileSync(sitePath, JSON.stringify(site, null, 1) + '\n');
console.log('✓ site.json updated with preserved August dates and October 24 modified dates.');

console.log('\n=== Step 2: Updating pic-time-vs-pixieset-vs-shootproof in articles.json ===');
const pt = articles['pic-time-vs-pixieset-vs-shootproof'];
if (!pt) throw new Error('Missing pic-time-vs-pixieset-vs-shootproof in articles.json');

pt.meta = 'By The Photo Testers · Published August 14, 2026 · Updated October 24, 2026 · 9 min read';
pt.disclosure = "We research every tool and keep pricing current. Some links below are affiliate links, which means we may earn a commission at no extra cost to you. Pricing is current as of October 2026, but always confirm on the vendor's own page.";

// 1. Pic-Time sales machine heading & paragraph
const ptSalesH3 = findBlock(pt.blocks, b => b.type === 'h3' && /Unfair Advantage|Campaign-Driven Automation/i.test(b.text), 'Pic-Time sales H3');
ptSalesH3.text = 'Pic-Time: Campaign-Driven Automation';
ptSalesH3.id = 'pic-time-campaign-driven-automation';

const ptSalesP = findBlock(pt.blocks, b => b.type === 'p' && b.runs && /sales machine|sales automation/i.test(b.runs.map(r => r.t).join('')), 'Pic-Time sales paragraph');
ptSalesP.runs = [
  { t: 'Pic-Time focuses heavily on sales automation. You can set up scheduled email sequences and discount campaigns (e.g., "Abandoned Cart," "Anniversary Sale," "Holiday Early Bird") that trigger dynamic gallery banners and countdown timers for clients. In community feedback and user case studies, photographers frequently report noticeable bumps in passive print and download orders after activating these automated workflows.' }
];

// 2. Winner for print sales
const winnerP = findBlock(pt.blocks, b => b.type === 'p' && b.runs && /Winner for Print Sales:/i.test(b.runs.map(r => r.t).join('')), 'Winner for Print Sales');
winnerP.runs = [
  { t: 'Winner for Print Sales:', b: 1 },
  { t: ' ' },
  { t: 'Pic-Time', b: 1 },
  { t: ', for automated marketing depth.' }
];

// 3. Pricing intro
const pricingIntroP = findBlock(pt.blocks, b => b.type === 'p' && b.runs && /mid-2026|checked October 2026/i.test(b.runs.map(r => r.t).join('')), 'Pricing intro paragraph');
pricingIntroP.runs = [
  { t: 'Let’s look at the actual costs based on current vendor plans and documentation (checked October 2026).' }
];

// 4. ShootProof intro & UL
const spIntroP = findBlock(pt.blocks, b => b.type === 'p' && b.runs && /ShootProof prices based on the|ShootProof structures plans by active photo count/i.test(b.runs.map(r => r.t).join('')), 'ShootProof intro paragraph');
spIntroP.runs = [
  { t: 'ShootProof structures plans by active photo count and concurrent online storage (with 100 GB accommodating approximately 5,000 delivered high-res JPEGs), with zero commission on direct orders across all plans.' }
];

const spUl = findBlock(pt.blocks, b => b.type === 'ul' && b.items && b.items.some(item => item.some(run => /1,500 Photos/i.test(run.t))), 'ShootProof pricing UL');
spUl.items = [
  [{ t: 'Free:', b: 1 }, { t: ' 100 Photos / 3GB active online cap (0% commission on direct orders)' }],
  [{ t: 'Starter (1,500 Photos / 20GB):', b: 1 }, { t: ' $8.33/mo annual ($99.99/yr) / $10/mo monthly (0% commission)' }],
  [{ t: 'Standard (5,000 Photos / 100GB):', b: 1 }, { t: ' $16.67/mo annual ($199.99/yr) / $20/mo monthly (0% commission)' }],
  [{ t: 'Pro (25,000 Photos / 1,000GB):', b: 1 }, { t: ' $26.67/mo annual ($320/yr) / $32/mo monthly (0% commission)' }],
  [{ t: 'Unlimited:', b: 1 }, { t: ' $50/mo annual ($600/yr) / $60/mo monthly (0% commission)' }]
];

// 5. Verdict Pic-Time
const verdictPtP = findBlock(pt.blocks, b => b.type === 'p' && b.runs && /2\. Go with Pic-Time if:/i.test(b.runs.map(r => r.t).join('')), 'Verdict Pic-Time paragraph');
verdictPtP.runs = [
  { t: '2. Go with Pic-Time if:', b: 1 },
  { t: '\nYou are a wedding or portrait photographer who wants to grow store revenue. The automated marketing campaigns and dynamic gallery banners help capture print orders effortlessly. The editorial look and built-in slideshows are a massive bonus.' }
];

console.log('✓ pic-time-vs-pixieset-vs-shootproof updated cleanly.');

console.log('\n=== Step 3: Updating best-client-gallery-software in articles.json ===');
const bg = articles['best-client-gallery-software'];
if (!bg) throw new Error('Missing best-client-gallery-software in articles.json');

bg.meta = 'By The Photo Testers · Published August 15, 2026 · Updated October 24, 2026 · 9 min read';
bg.disclosure = 'We research every tool and keep pricing current. Some links below are affiliate links, which means we earn a commission if you sign up through them. It does not change what we write. Pricing is current as of October 2026, but always confirm on the vendor\'s own page.';

// 1. Remove duplicate ShootProof paragraph
const spDupIndex = bg.blocks.findIndex((b, i) => 
  i > 0 && b.type === 'p' && bg.blocks[i-1].type === 'p' &&
  b.runs && bg.blocks[i-1].runs &&
  b.runs.map(r=>r.t).join('').startsWith('ShootProof is the value pick') &&
  bg.blocks[i-1].runs.map(r=>r.t).join('').startsWith('ShootProof is the value pick')
);
if (spDupIndex !== -1) {
  bg.blocks.splice(spDupIndex, 1);
  console.log(`✓ Removed duplicate ShootProof paragraph at index ${spDupIndex}`);
} else {
  console.log('No duplicate ShootProof paragraph found (already removed or not present).');
}

// 2. ShootProof feature paragraph
const spFeatureP = findBlock(bg.blocks, b => b.type === 'p' && b.runs && /Used by a (huge|large) (base|community) of (working )?photographers/i.test(b.runs.map(r => r.t).join('')), 'ShootProof feature paragraph');
spFeatureP.runs = [
  { t: 'Used by a large community of working photographers, it offers unlimited galleries, a commission-free store on direct orders, contracts, invoicing, booking, email marketing, and a website builder. Plans are structured by active storage capacity, from a free tier (100 photos / 3GB) up to $50/month ($600/yr annual) for unlimited, with paid tiers starting at $8.33/month ($99.99/yr annual) for 20GB (1,500 photos) and $16.67/month ($199.99/yr annual) for 100GB (5,000 photos).' }
];

// 3. ShootProof pricing note block
const spPriceP = findBlock(bg.blocks, b => b.type === 'p' && b.runs && /From \$8\.33\/mo/i.test(b.runs.map(r => r.t).join('')), 'ShootProof pricing block');
spPriceP.runs = [
  { t: 'Pricing:', b: 1 },
  { t: ' From $8.33/mo (billed annually, 20GB / 1,500 photos) or $10/mo monthly; Standard 100GB at $199.99/yr; free tier (3GB / 100 photos) (Checked October 2026).' }
];

// 4. CloudSpot description & pricing block
const csDescP = findBlock(bg.blocks, b => b.type === 'p' && b.runs && /run from Free \(5GB/i.test(b.runs.map(r => r.t).join('')), 'CloudSpot description paragraph');
csDescP.runs = [
  { t: 'Its five plans run from Free (5GB, 15% commission) and Entry ($6/mo annual [$72/yr], 15GB, 15% commission) up through Full Suite tiers: Lite ($12/mo annual [$144/yr], 100GB), Pro ($28/mo annual [$336/yr], 500GB), and Unlimited ($42/mo annual [$504/yr], unlimited storage). The Full Suite tiers eliminate commissions entirely (0%) and include Studio Manager contracts and invoicing.' }
];

const csPriceP = findBlock(bg.blocks, b => b.type === 'p' && b.runs && /Free tier \(5GB\); paid from/i.test(b.runs.map(r => r.t).join('')), 'CloudSpot pricing block');
csPriceP.runs = [
  { t: 'Pricing:', b: 1 },
  { t: ' Free tier (5GB); paid from $12/mo (Lite, $144 billed annually) up to $42/mo (Unlimited) (Checked October 2026).' }
];

// 5. Comparison table
const compTable = findBlock(bg.blocks, b => b.type === 'table', 'Gallery comparison table');
compTable.rows = [
  [[{ t: 'Pixieset', b: 1 }, { t: ' (best overall)', i: 1 }], [{ t: 'All-in-one' }], [{ t: 'From $8/mo' }], [{ t: '✓ Best-in-class' }], [{ t: 'View', href: 'https://pixieset.com' }]],
  [[{ t: 'ShootProof' }], [{ t: 'Value, business tools' }], [{ t: 'From $8.33/mo' }], [{ t: '✓ Commission-free' }], [{ t: 'View', href: 'https://shootproof.com' }]],
  [[{ t: 'CloudSpot' }], [{ t: 'Budget, free plan' }], [{ t: 'Free / From $12/mo' }], [{ t: '✓ Yes' }], [{ t: 'View', href: 'https://cloudspot.io' }]],
  [[{ t: 'Pic-Time' }], [{ t: 'Premium design' }], [{ t: 'From $7–21/mo' }], [{ t: '✓ Premium' }], [{ t: 'View', href: 'https://pic-time.com' }]],
  [[{ t: 'SmugMug' }], [{ t: 'Storage, portfolios' }], [{ t: 'From $20–37/mo' }], [{ t: '✓ Yes' }], [{ t: 'View', href: 'https://smugmug.com' }]],
  [[{ t: 'Zenfolio' }], [{ t: 'Website + galleries' }], [{ t: 'From $7–20/mo' }], [{ t: '✓ Yes' }], [{ t: 'View', href: 'https://zenfolio.com' }]]
];

// 6. Researched table note
const tableNoteP = findBlock(bg.blocks, b => b.type === 'p' && b.runs && /Researched (August|October) 2026/i.test(b.runs.map(r => r.t).join('')), 'Table researched note');
tableNoteP.runs = [
  { t: 'Researched October 2026. Pricing shifts often and varies by storage tier and promotions, confirm on each vendor\'s page.', i: 1 }
];

// 7. Cheapest FAQ block
const cheapestFaqP = findBlock(bg.blocks, b => b.type === 'p' && b.runs && /What is the cheapest client gallery software\?/i.test(b.runs.map(r => r.t).join('')), 'Cheapest FAQ block');
cheapestFaqP.runs = [
  { t: 'What is the cheapest client gallery software?\n', b: 1 },
  { t: 'CloudSpot has the cheapest full-suite entry ($12/mo annual [$144/yr]) and a usable free plan; Zenfolio starts at $7/month (Basic); ShootProof starts at $8.33/month (annual). All scale with storage, and free tiers usually attach a sales commission.' }
];

console.log('✓ best-client-gallery-software updated cleanly.');

console.log('\n=== Step 4: Updating best-photo-culling-software in articles.json ===');
const bc = articles['best-photo-culling-software'];
if (!bc) throw new Error('Missing best-photo-culling-software in articles.json');

// 1. Box runs
const qBox = findBlock(bc.blocks, b => b.type === 'box', 'QuickAnswer box');
qBox.blocks[0].runs = [
  { t: 'Fastest cloud AI culling: FilterPixel.', b: 1 },
  { t: ' Because it processes in the cloud, throughput doesn\'t depend on your local laptop hardware.' }
];
qBox.blocks[3].runs = [
  { t: 'Renowned manual speed (no AI): Photo Mechanic.', b: 1 },
  { t: ' A one-time purchase with legendary browsing speed if you\'d rather cull by hand.' }
];

// 2. FilterPixel H2
const fpH2 = findBlock(bc.blocks, b => b.type === 'h2' && /FilterPixel: /i.test(b.text), 'FilterPixel H2');
fpH2.text = '1. FilterPixel: cloud processing speed, and genre-aware';

// 3. FilterPixel speed leader paragraph
const fpLeaderP = findBlock(bc.blocks, b => b.type === 'p' && b.runs && /FilterPixel is the speed leader|demonstrated the fastest throughput/i.test(b.runs.map(r => r.t).join('')), 'FilterPixel speed leader paragraph');
fpLeaderP.runs = [
  { t: 'In competitor-published benchmarks, FilterPixel demonstrated the fastest throughput by processing in the cloud rather than on your local machine. Its other distinguishing feature is DeepCull, which loads a model trained for your specific shoot type, weddings, sports, concerts, conferences, portraits, so it weights frames the way that genre actually rewards.' }
];

// 4. Benchmark bullet in UL
const benchUl = findBlock(bc.blocks, b => b.type === 'ul' && b.items && b.items.some(it => it.some(r => /Aftershoot culled 1,000 images/i.test(r.t))), 'Benchmark UL');
const fpBullet = benchUl.items.find(it => it.some(r => /FilterPixel, being cloud-based|cloud processing recorded the fastest/i.test(r.t)));
if (fpBullet) {
  fpBullet.splice(0, fpBullet.length, { t: 'In FilterPixel\'s published benchmark, its cloud processing recorded the fastest elapsed time because computation did not depend on local laptop hardware.' });
}

// 5. How to choose bullet
const chooseP = findBlock(bc.blocks, b => b.type === 'p' && b.runs && /Shoot high volume and want/i.test(b.runs.map(r => r.t).join('')), 'How to choose high-volume bullet');
chooseP.runs = [
  { t: 'Shoot high volume and want cloud-offloaded speed? ', b: 1 },
  { t: 'FilterPixel, especially if your internet connection has fast RAW upload bandwidth.' }
];

// 6. Culling FAQ
const cullingFaqP = findBlock(bc.blocks, b => b.type === 'p' && b.runs && /What is the best photo culling software in 2026\?/i.test(b.runs.map(r => r.t).join('')), 'Culling best software FAQ');
cullingFaqP.runs = [
  { t: 'What is the best photo culling software in 2026?\n', b: 1 },
  { t: 'It depends on your workflow. FilterPixel leads in cloud-based processing speed in published tests, Aftershoot is the best all-in-one, Narrative Select is best for expression-critical portrait and wedding work, and Photo Mechanic is the fastest manual option. There\'s no single winner for everyone.' }
];

console.log('✓ best-photo-culling-software updated cleanly.');

fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2) + '\n');
console.log('\n✓ articles.json written successfully.');

