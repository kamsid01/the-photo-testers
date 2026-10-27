"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getSiteData } from '@/lib/site-data';

const site = getSiteData();

const NOT_FOUND_LINKS = [
  'best-crm-wedding-photographers',
  'best-client-gallery-software',
  'best-ai-culling-editing-software',
  'aftershoot-vs-imagen',
]
  .map((s) => site.bySlug[s])
  .filter(Boolean)
  .map((a) => ({ href: a.href, title: a.title, typeLabel: a.typeLabel }))
  .concat([{ href: '/tools', title: 'Free tools for photographers', typeLabel: 'Tools' }]);

export default function NotFound() {
  const pathname = usePathname() || '/404';

  return (
    <section
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: 'clamp(56px,9vw,120px) clamp(16px,4vw,40px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))',
        gap: '48px',
        alignItems: 'start',
      }}
    >
      <div>
        <p
          style={{
            margin: '0 0 16px',
            fontSize: '14px',
            fontWeight: 600,
            color: '#60645F',
            letterSpacing: '.04em',
            textTransform: 'uppercase',
          }}
        >
          Error 404
        </p>
        <h1
          style={{
            margin: '0 0 20px',
            fontFamily: 'Newsreader,Georgia,serif',
            fontWeight: 500,
            fontSize: 'clamp(36px,5vw,56px)',
            lineHeight: 1.05,
            letterSpacing: '-0.015em',
          }}
        >
          This page isn’t in the field guide.
        </h1>
        <p style={{ margin: '0 0 28px', fontSize: '18px', color: '#60645F', maxWidth: '34em' }}>
          The address{' '}
          <code
            style={{
              fontSize: '15px',
              background: '#F0EFEA',
              padding: '2px 6px',
              borderRadius: '3px',
              color: '#20221F',
            }}
          >
            {pathname}
          </code>{' '}
          doesn’t match a published page. It may have moved, or the link may have a typo.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <Link
            href="/blog"
            className="pt-hover-btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              whiteSpace: 'nowrap',
              height: '46px',
              padding: '0 20px',
              background: '#3159D7',
              color: '#FFFFFF',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Browse all articles
          </Link>
          <Link
            href="/"
            className="pt-hover-border-ink"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              whiteSpace: 'nowrap',
              height: '46px',
              padding: '0 20px',
              border: '1px solid #B9BDB4',
              color: '#20221F',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Go to the homepage
          </Link>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #20221F', paddingTop: '16px' }}>
        <p style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: 600 }}>Popular starting points</p>
        {NOT_FOUND_LINKS.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="pt-hover-blue"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
              padding: '14px 0',
              borderBottom: '1px solid #DFE2DB',
              textDecoration: 'none',
              color: '#20221F',
            }}
          >
            <span style={{ fontWeight: 500 }}>{a.title}</span>
            <span style={{ fontSize: '14px', color: '#60645F', whiteSpace: 'nowrap' }}>{a.typeLabel}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
