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
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

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

async function submitToIndexNow(urls) {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  console.log(`Submitting ${urls.length} URLs to IndexNow (${INDEXNOW_ENDPOINT})...`);

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  });

  const bodyText = await response.text();

  if (response.status === 200) {
    console.log(`✓ Submission successful: HTTP 200 OK (URLs queued for indexing)`);
  } else if (response.status === 202) {
    console.log(`✓ Submission accepted: HTTP 202 Accepted (Key validation pending)`);
  } else {
    console.error(`✗ Submission failed: HTTP ${response.status} ${response.statusText}`);
    if (bodyText) {
      console.error(`Response details: ${bodyText}`);
    }
    process.exit(1);
  }
}

async function main() {
  console.log('--- IndexNow Submission Tool ---');
  await verifyKeyFile();

  const urls = await fetchSitemapUrls(SITEMAP_URL);
  console.log(`Extracted ${urls.length} URLs from sitemap:`);
  urls.forEach((u, i) => console.log(`  [${i + 1}] ${u}`));

  await submitToIndexNow(urls);
  console.log('--- Done ---');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
