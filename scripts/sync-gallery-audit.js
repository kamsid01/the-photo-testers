const fs = require('fs');
const path = require('path');

const sitePath = path.join(__dirname, '../src/data/site.json');
const articlesPath = path.join(__dirname, '../src/data/articles.json');

const site = JSON.parse(fs.readFileSync(sitePath, 'utf8'));
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

// 1. Update site.json dates for gallery articles
const g1 = site.articles.find(a => a.slug === 'best-client-gallery-software');
if (g1) {
  g1.checked = 'October 2026';
  g1.date = '2026-10-24';
}

const g2 = site.articles.find(a => a.slug === 'pic-time-vs-pixieset-vs-shootproof');
if (g2) {
  g2.checked = 'October 2026';
  g2.date = '2026-10-24';
  if (g2.chooseIf) {
    g2.chooseIf[0].text = 'you want automated, campaign-driven print sales. Its built-in marketing sequences and gallery banner automations give it an edge for passive store revenue.';
    g2.chooseIf[2].text = 'you do high-volume shoots (like schools, dance studios, or sports), need robust client invoicing and contracts, or want zero commission on direct orders.';
  }
}

fs.writeFileSync(sitePath, JSON.stringify(site, null, 1) + '\n');
console.log('Updated site.json');

// 2. Update pic-time-vs-pixieset-vs-shootproof in articles.json
const pt = articles['pic-time-vs-pixieset-vs-shootproof'];
if (pt) {
  // Block 2: Evidence statement
  pt.blocks[2].runs = [
    { t: 'We evaluated all three platforms across their published documentation, pricing tiers, and real-world photographer workflows to see where they stand right now. Here is the honest breakdown of which one you should choose based on your actual business model.' }
  ];

  // Block 5: Summary picks (softened print sales claims)
  pt.blocks[5].runs = [
    { t: 'Choose Pic-Time if:', b: 1 },
    { t: ' You want automated, campaign-driven print sales. Its built-in marketing sequences and gallery banner automations give it an edge for passive store revenue.' }
  ];
  pt.blocks[7].runs = [
    { t: 'Choose ShootProof if:', b: 1 },
    { t: ' You do high-volume shoots (like schools, dance studios, or sports), need robust client invoicing and contracts, or want zero commission on direct orders.' }
  ];

  // Block 17: Under Store & Print Sales (soften automated sales machine & doubling claims)
  pt.blocks[17].runs = [
    { t: 'Pic-Time focuses heavily on sales automation. You can set up scheduled email sequences and discount campaigns (e.g., "Abandoned Cart," "Anniversary Sale," "Holiday Early Bird") that trigger dynamic gallery banners and countdown timers for clients. In community feedback and user case studies, photographers frequently report noticeable bumps in passive print and download orders after activating these automated workflows.' }
  ];

  // Block 26: Winner for print sales
  pt.blocks[26].runs = [
    { t: 'Winner for Print Sales:', b: 1 },
    { t: ' ' },
    { t: 'Pic-Time', b: 1 },
    { t: ', for automated marketing depth.' }
  ];

  // Block 32: Pixieset pricing items
  pt.blocks[32].items = [
    [{ t: 'Free:', b: 1 }, { t: ' 3GB storage (15% commission)' }],
    [{ t: 'Basic ($8/mo annual / $10/mo monthly):', b: 1 }, { t: ' 10GB storage (0% commission)' }],
    [{ t: 'Plus ($16/mo annual / $20/mo monthly):', b: 1 }, { t: ' 100GB storage (0% commission)' }],
    [{ t: 'Pro ($24/mo annual / $30/mo monthly):', b: 1 }, { t: ' 1,000GB storage (0% commission, RAW storage)' }],
    [{ t: 'Ultimate ($40/mo annual / $50/mo monthly):', b: 1 }, { t: ' Unlimited storage (0% commission, RAW storage)' }],
    [{ t: '(Note: Pixieset also offers "Suite" pricing which includes their CRM and Website builder).' }]
  ];

  // Block 35: Pic-Time pricing items
  pt.blocks[35].items = [
    [{ t: 'Free:', b: 1 }, { t: ' 10GB storage (15% commission)' }],
    [{ t: 'Beginner ($7/mo annual / $8/mo monthly):', b: 1 }, { t: ' 20GB storage (15% commission)' }],
    [{ t: 'Professional ($21/mo annual / $25/mo monthly):', b: 1 }, { t: ' 100GB storage (0% commission with own payment processor)' }],
    [{ t: 'Advanced ($42/mo annual / $50/mo monthly):', b: 1 }, { t: ' Unlimited storage (0% commission with own payment processor)' }],
    [{ t: '(Note: The Advanced plan includes premium marketing apps and unlimited storage).' }]
  ];

  // Block 38: ShootProof pricing items
  pt.blocks[38].items = [
    [{ t: 'Free:', b: 1 }, { t: ' 100 Photos / 3GB active online cap (0% commission on direct orders)' }],
    [{ t: '1,500 Photos ($8.33/mo annual / $10/mo monthly):', b: 1 }, { t: ' 20GB active online cap (0% commission)' }],
    [{ t: '5,000 Photos ($16.67/mo annual / $20/mo monthly):', b: 1 }, { t: ' 100GB active online cap (0% commission)' }],
    [{ t: '25,000 Photos ($26.67/mo annual / $32/mo monthly):', b: 1 }, { t: ' 1,000GB active online cap (0% commission)' }],
    [{ t: 'Unlimited ($50/mo annual / $60/mo monthly):', b: 1 }, { t: ' Unlimited active online photos (0% commission)' }]
  ];
}

// 3. Update best-client-gallery-software in articles.json
const bg = articles['best-client-gallery-software'];
if (bg) {
  // Update comparison table rows
  if (bg.blocks[2] && bg.blocks[2].type === 'table') {
    bg.blocks[2].rows = [
      [[{ t: 'Pixieset', b: 1 }, { t: ' (best overall)', i: 1 }], [{ t: 'All-in-one' }], [{ t: 'From $8/mo' }], [{ t: '✓ Best-in-class' }], [{ t: 'View', href: 'https://pixieset.com' }]],
      [[{ t: 'ShootProof' }], [{ t: 'Value, business tools' }], [{ t: 'From $8.33/mo' }], [{ t: '✓ Commission-free' }], [{ t: 'View', href: 'https://shootproof.com' }]],
      [[{ t: 'CloudSpot' }], [{ t: 'Budget, free plan' }], [{ t: 'Free / From $14/mo' }], [{ t: '✓ Yes' }], [{ t: 'View', href: 'https://cloudspot.io' }]],
      [[{ t: 'Pic-Time' }], [{ t: 'Premium design' }], [{ t: 'From $7–21/mo' }], [{ t: '✓ Premium' }], [{ t: 'View', href: 'https://pic-time.com' }]],
      [[{ t: 'SmugMug' }], [{ t: 'Storage, portfolios' }], [{ t: 'From $20–37/mo' }], [{ t: '✓ Yes' }], [{ t: 'View', href: 'https://smugmug.com' }]],
      [[{ t: 'Zenfolio' }], [{ t: 'Website + galleries' }], [{ t: 'From $7–20/mo' }], [{ t: '✓ Yes' }], [{ t: 'View', href: 'https://zenfolio.com' }]]
    ];
  }

  // Pixieset
  bg.blocks[10].runs = [
    { t: 'Paid plans start from $8/month (billed annually) or $10/month monthly for 10GB storage, with a limited free tier (3GB, with 15% commission on sales at the free level). Costs rise with storage, and RAW support arrives on its Pro plan ($24/mo annual / $30/mo monthly).' }
  ];
  bg.blocks[12].alt = 'Pixieset client gallery layout interface';
  bg.blocks[12].cap = 'Pixieset client gallery layout and typography customization (vendor screenshot).';
  bg.blocks[14].runs = [
    { t: 'Pricing:', b: 1 },
    { t: ' From $8/mo (billed annually) or $10/mo monthly; free tier (3GB) (Checked October 2026).' }
  ];

  // ShootProof
  bg.blocks[18].runs = [
    { t: 'ShootProof is the value pick, and the one to choose if running your business matters as much as delivering pretty galleries. It bundles contracts, invoicing, and proofing at every tier, and its store is commission-free on direct orders, so you keep your print profits.' }
  ];
  bg.blocks[19].runs = [
    { t: 'Used by a large community of working photographers, it offers unlimited galleries, a commission-free store on direct orders, contracts, invoicing, booking, email marketing, and a website builder. Plans are priced by active photos maintained online, from a free tier (100 photos / 3GB) up to $50/month ($600/yr annual) for unlimited, with paid tiers starting at $8.33/month ($99.99/yr annual) or $10/month for 1,500 photos (20GB).' }
  ];
  bg.blocks[20].alt = 'ShootProof client proofing and order fulfillment interface';
  bg.blocks[20].cap = 'ShootProof gallery proofing dashboard and package setup (vendor screenshot).';
  bg.blocks[22].runs = [
    { t: 'Pricing:', b: 1 },
    { t: ' From $8.33/mo (billed annually, 1,500 photos) or $10/mo monthly; free tier (100 photos) (Checked October 2026).' }
  ];

  // CloudSpot
  bg.blocks[26].runs = [
    { t: 'Its five plans run from Free (5GB, 15% commission) and Entry ($5/mo annual, 15GB, 15% commission) up through Full Suite tiers: Lite ($14/mo annual, 100GB), Pro ($28/mo annual, 500GB), and Unlimited ($42/mo annual, unlimited storage). The Full Suite tiers eliminate commissions entirely (0%) and include Studio Manager contracts and invoicing.' }
  ];
  bg.blocks[27].alt = 'CloudSpot client gallery view';
  bg.blocks[27].cap = 'CloudSpot mobile-optimized client gallery view (vendor screenshot).';
  bg.blocks[29].runs = [
    { t: 'Pricing:', b: 1 },
    { t: ' Free tier (5GB); paid from $14/mo (Lite, billed annually) up to $42/mo (Unlimited) (Checked October 2026).' }
  ];

  // Pic-Time
  bg.blocks[33].runs = [
    { t: 'That power costs more (around $21/month billed annually at the working-photographer Professional tier) and there is no built-in website builder, so your portfolio site lives elsewhere. It also has a steeper learning curve. Worth testing the client-side download experience yourself, since that is its most common complaint.' }
  ];
  bg.blocks[34].alt = 'Pic-Time editorial client gallery interface with integrated store';
  bg.blocks[34].cap = 'Pic-Time editorial client gallery interface with dynamic store mockups (vendor screenshot).';
  bg.blocks[36].runs = [
    { t: 'Pricing:', b: 1 },
    { t: ' From $7/mo (Beginner) or $21/mo (Professional, billed annually); free tier (10GB) (Checked October 2026).' }
  ];

  // SmugMug (Remove obsolete Power $15 recommendation)
  bg.blocks[40].runs = [
    { t: 'Its current plans range from Direct ($20/mo annual) for backup and sharing without selling markup, to Portfolio ($23.50/mo annual) and Pro ($37/mo annual) for print and digital commerce (with 15% commission on print markup). It has no permanent free plan, though a 14-day trial is available.' }
  ];
  bg.blocks[41].alt = 'SmugMug portfolio and gallery delivery interface';
  bg.blocks[41].cap = 'SmugMug portfolio showcase and client photo gallery view (vendor screenshot).';
  bg.blocks[43].runs = [
    { t: 'Pricing:', b: 1 },
    { t: ' From $20/mo (Direct) to $37/mo (Pro, billed annually) (Checked October 2026).' }
  ];

  // Zenfolio (Update plan names and 7% commerce fee)
  bg.blocks[47].runs = [
    { t: 'Current plans include Basic ($7/mo annual, 15GB, no e-commerce), Professional ($11.50/mo annual, 150GB, full selling with 7% commerce fee), and Advanced ($20/mo annual, unlimited JPEG storage with 7% commerce fee). It is an affordable way to keep portfolio websites and client delivery unified.' }
  ];
  bg.blocks[48].alt = 'Zenfolio client gallery management interface';
  bg.blocks[48].cap = 'Zenfolio client gallery management and digital fulfillment interface (vendor screenshot).';
  bg.blocks[50].runs = [
    { t: 'Pricing:', b: 1 },
    { t: ' From $7/mo (Basic) to $20/mo (Advanced, billed annually) (Checked October 2026).' }
  ];
}

// 4. Update best-photo-culling-software in articles.json
const bc = articles['best-photo-culling-software'];
if (bc) {
  // Soften fastest claims in summary
  if (bc.blocks[1] && bc.blocks[1].type === 'box') {
    bc.blocks[1].blocks[0].runs = [
      { t: 'Fastest cloud AI culling: FilterPixel.', b: 1 },
      { t: ' Because it processes in the cloud, throughput doesn\'t depend on your local laptop hardware.' }
    ];
    bc.blocks[1].blocks[3].runs = [
      { t: 'Renowned manual speed (no AI): Photo Mechanic.', b: 1 },
      { t: ' A one-time purchase with legendary browsing speed if you\'d rather cull by hand.' }
    ];
  }

  // Update comparison table
  if (bc.blocks[10] && bc.blocks[10].type === 'table') {
    bc.blocks[10].rows = [
      [[{ t: 'FilterPixel', b: 1 }, { t: ' (fastest cloud processing)', i: 1 }], [{ t: 'Speed, genre culling' }], [{ t: 'Free + flat' }], [{ t: 'Cloud' }], [{ t: 'View', href: 'https://filterpixel.com' }]],
      [[{ t: 'Aftershoot' }], [{ t: 'All-in-one' }], [{ t: 'Flat, unlimited' }], [{ t: 'Local' }], [{ t: 'View', href: 'https://aftershoot.com' }]],
      [[{ t: 'Narrative Select' }], [{ t: 'Creative control' }], [{ t: '~$99/yr' }], [{ t: 'Local' }], [{ t: 'View', href: 'https://narrative.so' }]],
      [[{ t: 'Photo Mechanic' }], [{ t: 'Manual speed' }], [{ t: 'One-time' }], [{ t: 'Local' }], [{ t: 'View', href: 'https://home.camerabits.com' }]],
      [[{ t: 'Excire Foto' }], [{ t: 'One-time AI' }], [{ t: 'One-time' }], [{ t: 'Local' }], [{ t: 'View', href: 'https://excire.com' }]]
    ];
  }

  // Screenshots with accurate captions
  bc.blocks[16].alt = 'FilterPixel AI culling review interface';
  bc.blocks[16].cap = 'FilterPixel interface grouping duplicate shots and assessing focus (vendor screenshot).';

  bc.blocks[23].alt = 'Aftershoot automated culling dashboard';
  bc.blocks[23].cap = 'Aftershoot culling workspace showing keeper scores and duplicate clusters (vendor screenshot).';

  bc.blocks[31].alt = 'Narrative Select face close-up assessment panel';
  bc.blocks[31].cap = 'Narrative Select close-up panel comparing eye sharpness and expressions (vendor screenshot).';

  bc.blocks[38].alt = 'Photo Mechanic contact sheet browser';
  bc.blocks[38].cap = 'Photo Mechanic high-speed contact sheet browsing and metadata tagging (vendor screenshot).';

  bc.blocks[45].alt = 'Excire Foto AI search workspace';
  bc.blocks[45].cap = 'Excire Foto photo organization and AI keyword search workspace (vendor screenshot).';
}

fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2) + '\n');
console.log('Updated articles.json with all prices and captions restored perfectly');
