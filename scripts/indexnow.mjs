#!/usr/bin/env node

/**
 * scripts/indexnow.mjs
 *
 * Submits all URLs from the site's sitemap to the IndexNow API.
 * Protocol reference: https://www.indexnow.org/documentation
 */

const HOST = 'www.thephototesters.com';
const KEY = '91de477695d340d9a5507098928c96ab';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = process.env.SITEMAP_URL || `https://${HOST}/sitemap.xml`;

const ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://yandex.com/indexnow',
];

function decodeXmlEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

async function fetchSitemapUrls(sitemapUrl) {
  console.log(`Fetching sitemap from: ${sitemapUrl}`);
  const response = await fetch(sitemapUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch sitemap (${response.status} ${response.statusText})`);
  }

  const xml = await response.text();
  const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/gs)];

  if (!matches.length) {
    throw new Error(`No <loc> entries found in sitemap at ${sitemapUrl}`);
  }

  const urls = matches
    .map(m => decodeXmlEntities(m[1].trim()))
    .filter(Boolean);

  // Deduplicate URLs
  return Array.from(new Set(urls));
}

async function verifyKeyFile() {
  console.log(`Verifying key file at: ${KEY_LOCATION}`);
  try {
    const res = await fetch(KEY_LOCATION);
    const text = (await res.text()).trim();
    if (res.status === 200 && text === KEY) {
      console.log(`✓ Key file verified successfully (HTTP 200 OK)`);
      return true;
    } else {
      console.warn(`⚠ Key file returned HTTP ${res.status}. Content: "${text.slice(0, 50)}"`);
      return false;
    }
  } catch (err) {
    console.warn(`⚠ Could not reach key file: ${err.message}`);
    return false;
  }
}

async function submitToEndpoints(urls) {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  let successCount = 0;

  for (const endpoint of ENDPOINTS) {
    console.log(`Submitting ${urls.length} URLs to IndexNow endpoint: ${endpoint}...`);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      const bodyText = await response.text();

      if (response.status === 200) {
        console.log(`✓ Submission to ${endpoint} successful: HTTP 200 OK`);
        successCount++;
      } else if (response.status === 202) {
        console.log(`✓ Submission to ${endpoint} accepted: HTTP 202 Accepted`);
        successCount++;
      } else {
        console.warn(`⚠ Endpoint ${endpoint} returned HTTP ${response.status}: ${bodyText || response.statusText}`);
      }
    } catch (err) {
      console.warn(`⚠ Error submitting to ${endpoint}: ${err.message}`);
    }
  }

  if (successCount === 0) {
    console.error(`✗ All IndexNow endpoint submissions failed.`);
    process.exit(1);
  } else {
    console.log(`✓ Successfully submitted to ${successCount} IndexNow endpoint(s). URLs are synced across search engines.`);
  }
}

async function main() {
  console.log('--- IndexNow Submission Tool ---');
  await verifyKeyFile();

  const urls = await fetchSitemapUrls(SITEMAP_URL);
  console.log(`Extracted ${urls.length} URLs from sitemap:`);
  urls.forEach((u, i) => console.log(`  [${i + 1}] ${u}`));

  await submitToEndpoints(urls);
  console.log('--- Done ---');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
