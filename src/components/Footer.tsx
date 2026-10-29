import React from 'react';
import Link from 'next/link';
import { getSiteData } from '@/lib/site-data';

const site = getSiteData();

export function Footer() {
  return (
    <footer
      style={{
        background: '#F1EFE9',
        borderTop: '1px solid #DFE2DB',
        marginTop: 0,
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '56px clamp(16px,4vw,40px) 32px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,190px),1fr))',
            gap: '40px 32px',
          }}
        >
          <div style={{ gridColumn: 'span 1', minWidth: 0 }}>
            <span
              role="img"
              aria-label="The Photo Testers"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '16px',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true" style={{ flex: '0 0 auto' }}>
                <path
                  d="M3 10V3h7M22 3h7v7M29 22v7h-7M10 29H3v-7"
                  fill="none"
                  stroke="#20221F"
                  strokeWidth="2.4"
                />
                <path
                  d="M10 16.5l4.2 4.2L22.5 11.5"
                  fill="none"
                  stroke="#3159D7"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                style={{
                  fontFamily: 'Newsreader,Georgia,serif',
                  fontSize: '21px',
                  fontWeight: 500,
                  letterSpacing: '-0.012em',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                  color: '#20221F',
                }}
              >
                <span style={{ fontStyle: 'italic', fontWeight: 400 }}>The</span> Photo Testers
              </span>
            </span>
            <p
              style={{
                margin: 0,
                fontSize: '15px',
                lineHeight: 1.55,
                color: '#60645F',
                maxWidth: '22em',
              }}
            >
              Independent software reviews and tools for working photographers.
            </p>
          </div>

          <div>
            <h2
              style={{
                margin: '0 0 12px',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '.05em',
                textTransform: 'uppercase',
                color: '#20221F',
              }}
            >
              Categories
            </h2>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '8px' }}>
              {site.navCategories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={c.href}
                    className="pt-hover-blue pt-hover-light-underline"
                    style={{ color: '#20221F', textDecoration: 'none', fontSize: '15px' }}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2
              style={{
                margin: '0 0 12px',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '.05em',
                textTransform: 'uppercase',
                color: '#20221F',
              }}
            >
              Free tools
            </h2>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '8px' }}>
              <li>
                <Link
                  href="/tools/pricing-calculator"
                  className="pt-hover-blue pt-hover-light-underline"
                  style={{ color: '#20221F', textDecoration: 'none', fontSize: '15px' }}
                >
                  Pricing Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/culling-tool-finder"
                  className="pt-hover-blue pt-hover-light-underline"
                  style={{ color: '#20221F', textDecoration: 'none', fontSize: '15px' }}
                >
                  AI Culling Tool Finder
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/gallery-cost-calculator"
                  className="pt-hover-blue pt-hover-light-underline"
                  style={{ color: '#20221F', textDecoration: 'none', fontSize: '15px' }}
                >
                  Gallery Cost Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="pt-hover-blue pt-hover-light-underline"
                  style={{ color: '#20221F', textDecoration: 'none', fontSize: '15px' }}
                >
                  All tools
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2
              style={{
                margin: '0 0 12px',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '.05em',
                textTransform: 'uppercase',
                color: '#20221F',
              }}
            >
              Editorial
            </h2>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '8px' }}>
              <li>
                <Link
                  href="/blog"
                  className="pt-hover-blue pt-hover-light-underline"
                  style={{ color: '#20221F', textDecoration: 'none', fontSize: '15px' }}
                >
                  Reviews &amp; Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/how-we-review"
                  className="pt-hover-blue pt-hover-light-underline"
                  style={{ color: '#20221F', textDecoration: 'none', fontSize: '15px' }}
                >
                  How we review
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="pt-hover-blue pt-hover-light-underline"
                  style={{ color: '#20221F', textDecoration: 'none', fontSize: '15px' }}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/affiliate-disclosure"
                  className="pt-hover-blue pt-hover-light-underline"
                  style={{ color: '#20221F', textDecoration: 'none', fontSize: '15px' }}
                >
                  Affiliate disclosure
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2
              style={{
                margin: '0 0 12px',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '.05em',
                textTransform: 'uppercase',
                color: '#20221F',
              }}
            >
              Contact
            </h2>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '8px' }}>
              <li>
                <Link
                  href="/contact"
                  className="pt-hover-blue pt-hover-light-underline"
                  style={{ color: '#20221F', textDecoration: 'none', fontSize: '15px' }}
                >
                  Contact &amp; corrections
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="pt-hover-blue pt-hover-light-underline"
                  style={{ color: '#20221F', textDecoration: 'none', fontSize: '15px' }}
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          style={{
            marginTop: '48px',
            paddingTop: '20px',
            borderTop: '1px solid #D6D9D1',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '12px 32px',
            fontSize: '14px',
            color: '#60645F',
          }}
        >
          <p style={{ margin: 0, maxWidth: '60em' }}>
            © 2026 The Photo Testers. Some links on this site are affiliate links. They never decide our recommendations.{' '}
            <Link href="/affiliate-disclosure">Read the disclosure</Link>.
          </p>
        </div>
      </div>
    </footer>
  );
}
