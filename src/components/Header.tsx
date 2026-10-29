"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getSiteData } from '@/lib/site-data';

const site = getSiteData();

export function Header() {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const [catsOpen, setCatsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [q, setQ] = useState('');

  const catsRef = useRef<HTMLDivElement>(null);
  const catBtnRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const catsOpenRef = useRef(catsOpen);
  const prevCatsOpen = useRef(catsOpen);
  const wasEscapeRef = useRef(false);

  useEffect(() => {
    catsOpenRef.current = catsOpen;
    if (prevCatsOpen.current && !catsOpen && wasEscapeRef.current) {
      wasEscapeRef.current = false;
      requestAnimationFrame(() => {
        catBtnRef.current?.focus();
      });
      setTimeout(() => {
        catBtnRef.current?.focus();
      }, 10);
    }
    prevCatsOpen.current = catsOpen;
  }, [catsOpen]);

  const p = pathname.replace(/\/+$/, '') || '/';
  const isArticle = !!site.bySlug[p.slice(1)];
  const isBlog = p === '/blog';
  const isCat = p.startsWith('/category/');
  const isTools = p.startsWith('/tools');
  const isHow = p === '/how-we-review';

  const closeAll = () => {
    setCatsOpen(false);
    setSearchOpen(false);
    setMenuOpen(false);
  };

  useEffect(() => {
    closeAll();
  }, [pathname]);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    if (catsOpen) {
      const first = document.querySelector<HTMLAnchorElement>('#cat-menu a');
      if (first) first.focus();
    }
  }, [catsOpen]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (catsRef.current && !catsRef.current.contains(e.target as Node)) {
        setCatsOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (catsOpenRef.current) {
          wasEscapeRef.current = true;
          setCatsOpen(false);
          catBtnRef.current?.focus();
        }
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const qq = q.trim().toLowerCase();
  const results = qq
    ? site.articles.filter((a) => `${a.title} ${a.summary} ${a.catName}`.toLowerCase().includes(qq))
    : [];
  const searchResults = results.slice(0, 6);
  const searchCountLabel = results.length
    ? `${results.length} ${results.length === 1 ? 'article matches' : 'articles match'}${
        results.length > 6 ? '. Showing the first 6.' : '.'
      }`
    : '0 articles match.';

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const v = q.trim();
    closeAll();
    router.push(`/blog${v ? `?q=${encodeURIComponent(v)}` : ''}`);
  };

  return (
    <>
      <a
        href="#main-content"
        className="pt-skip"
        onClick={(e) => {
          e.preventDefault();
          const m = document.getElementById('main-content');
          if (m) m.focus();
        }}
      >
        Skip to content
      </a>

      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: '#FAF9F6',
          borderBottom: '1px solid #DFE2DB',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 clamp(16px,4vw,40px)',
            height: '68px',
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <Link
            href="/"
            aria-label="The Photo Testers home"
            style={{
              display: 'flex',
              alignItems: 'center',
              flex: '0 0 auto',
              textDecoration: 'none',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true" style={{ flex: '0 0 auto' }}>
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
                  fontSize: '22px',
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
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Primary"
            className="pt-desktop-only"
            style={{
              alignItems: 'stretch',
              gap: '4px',
              marginLeft: 'auto',
              height: '68px',
            }}
          >
            <Link
              href="/blog"
              aria-current={isBlog ? 'page' : undefined}
              className="pt-hover-blue"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 14px',
                fontSize: '15px',
                fontWeight: 500,
                color: '#20221F',
                textDecoration: 'none',
                borderBottom: `2px solid ${isBlog || isArticle ? '#3159D7' : 'transparent'}`,
                marginBottom: '-1px',
              }}
            >
              Reviews &amp; Guides
            </Link>

            <div ref={catsRef} style={{ position: 'relative', display: 'flex' }}>
              <button
                ref={catBtnRef}
                type="button"
                id="cat-button"
                aria-expanded={catsOpen}
                aria-controls="cat-menu"
                onClick={() => {
                  setCatsOpen((prev) => !prev);
                  setSearchOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setCatsOpen(true);
                  }
                }}
                className="pt-hover-blue"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '0 14px',
                  fontSize: '15px',
                  fontWeight: 500,
                  background: 'none',
                  border: 0,
                  borderBottom: `2px solid ${isCat || catsOpen ? '#3159D7' : 'transparent'}`,
                  marginBottom: '-1px',
                  cursor: 'pointer',
                  color: '#20221F',
                }}
              >
                Categories
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  aria-hidden="true"
                  style={{
                    transform: catsOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform .15s',
                  }}
                >
                  <path d="M1.5 3.5L5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>

              {catsOpen && (
                <div
                  id="cat-menu"
                  role="region"
                  aria-label="Categories"
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      e.preventDefault();
                      wasEscapeRef.current = true;
                      setCatsOpen(false);
                      catBtnRef.current?.focus();
                    }
                  }}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 1px)',
                    left: '-180px',
                    width: '620px',
                    background: '#FFFFFF',
                    border: '1px solid #DFE2DB',
                    borderTop: 0,
                    boxShadow: '0 12px 32px rgba(32,34,31,0.08)',
                    padding: '12px',
                  }}
                >
                  <ul
                    style={{
                      listStyle: 'none',
                      margin: 0,
                      padding: 0,
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '2px',
                    }}
                  >
                    {site.navCategories.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={c.href}
                          onClick={closeAll}
                          className="pt-hover-row"
                          style={{
                            display: 'block',
                            padding: '12px 14px',
                            borderRadius: '4px',
                            textDecoration: 'none',
                            color: '#20221F',
                          }}
                        >
                          <span
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              gap: '12px',
                              alignItems: 'baseline',
                            }}
                          >
                            <span style={{ fontWeight: 600, fontSize: '15px' }}>{c.name}</span>
                            <span style={{ fontSize: '13px', color: c.statusColor, whiteSpace: 'nowrap' }}>
                              {c.statusLabel}
                            </span>
                          </span>
                          <span
                            style={{
                              display: 'block',
                              fontSize: '14px',
                              lineHeight: 1.45,
                              color: '#60645F',
                              marginTop: '2px',
                            }}
                          >
                            {c.desc}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Link
              href="/tools"
              aria-current={p === '/tools' ? 'page' : undefined}
              className="pt-hover-blue"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 14px',
                fontSize: '15px',
                fontWeight: 500,
                color: '#20221F',
                textDecoration: 'none',
                borderBottom: `2px solid ${isTools ? '#3159D7' : 'transparent'}`,
                marginBottom: '-1px',
              }}
            >
              Free Tools
            </Link>

            <Link
              href="/how-we-review"
              aria-current={isHow ? 'page' : undefined}
              className="pt-hover-blue"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 14px',
                fontSize: '15px',
                fontWeight: 500,
                color: '#20221F',
                textDecoration: 'none',
                borderBottom: `2px solid ${isHow ? '#3159D7' : 'transparent'}`,
                marginBottom: '-1px',
              }}
            >
              How We Review
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => {
              setSearchOpen((prev) => !prev);
              setCatsOpen(false);
              setMenuOpen(false);
            }}
            aria-expanded={searchOpen}
            aria-controls="site-search"
            className="pt-desktop-only"
            style={{
              alignItems: 'center',
              gap: '8px',
              height: '38px',
              padding: '0 14px 0 12px',
              border: '1px solid #DFE2DB',
              background: '#FFFFFF',
              borderRadius: '4px',
              fontSize: '14px',
              color: '#60645F',
              cursor: 'pointer',
              minWidth: '150px',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="7" cy="7" r="5.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            Search articles
          </button>

          {/* Mobile controls */}
          <div className="pt-mobile-only" style={{ marginLeft: 'auto', gap: '4px' }}>
            <button
              type="button"
              onClick={() => {
                setSearchOpen((prev) => !prev);
                setCatsOpen(false);
                setMenuOpen(false);
              }}
              aria-label="Search articles"
              aria-expanded={searchOpen}
              aria-controls="site-search"
              style={{
                width: '44px',
                height: '44px',
                display: 'grid',
                placeItems: 'center',
                background: 'none',
                border: 0,
                cursor: 'pointer',
                color: '#20221F',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 16 16" aria-hidden="true">
                <circle cx="7" cy="7" r="5.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => {
                setMenuOpen((prev) => !prev);
                setSearchOpen(false);
              }}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              style={{
                height: '44px',
                padding: '0 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'none',
                border: '1px solid #DFE2DB',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: 500,
                color: '#20221F',
              }}
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>

        {/* Expandable Search Bar */}
        {searchOpen && (
          <div
            id="site-search"
            role="search"
            style={{
              borderTop: '1px solid #DFE2DB',
              background: '#FFFFFF',
            }}
          >
            <form
              onSubmit={submitSearch}
              style={{
                maxWidth: '860px',
                margin: '0 auto',
                padding: '20px clamp(16px,4vw,40px) 24px',
              }}
            >
              <label
                htmlFor="site-search-input"
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '8px',
                }}
              >
                Search reviews, comparisons, and guides
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  id="site-search-input"
                  ref={searchRef}
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Try “Pixieset”, “culling”, or “VAT”"
                  autoComplete="off"
                  style={{
                    flex: 1,
                    minWidth: 0,
                    height: '48px',
                    padding: '0 14px',
                    border: '1px solid #B9BDB4',
                    borderRadius: '4px',
                    fontSize: '17px',
                    background: '#FFFFFF',
                  }}
                />
                <button
                  type="submit"
                  className="pt-hover-btn-primary"
                  style={{
                    height: '48px',
                    padding: '0 20px',
                    background: '#20221F',
                    color: '#FFFFFF',
                    border: 0,
                    borderRadius: '4px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={closeAll}
                  aria-label="Close search"
                  style={{
                    height: '48px',
                    width: '48px',
                    background: 'none',
                    border: '1px solid #DFE2DB',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  ✕
                </button>
              </div>

              {qq && (
                <>
                  <p aria-live="polite" style={{ margin: '14px 0 6px', fontSize: '14px', color: '#60645F' }}>
                    {searchCountLabel}
                  </p>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: '1px solid #DFE2DB' }}>
                    {searchResults.map((a) => (
                      <li key={a.slug} style={{ borderBottom: '1px solid #DFE2DB' }}>
                        <Link
                          href={a.href}
                          onClick={closeAll}
                          className="pt-hover-blue"
                          style={{
                            display: 'flex',
                            gap: '16px',
                            alignItems: 'baseline',
                            padding: '12px 0',
                            textDecoration: 'none',
                            color: '#20221F',
                          }}
                        >
                          <span style={{ flex: '0 0 110px', fontSize: '13px', fontWeight: 600, color: '#60645F' }}>
                            {a.typeLabel}
                          </span>
                          <span style={{ fontSize: '16px', fontWeight: 500, lineHeight: 1.4 }}>{a.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {results.length === 0 && (
                    <div style={{ padding: '16px 0 0', fontSize: '15px', color: '#20221F' }}>
                      No article titles or summaries match. Try a product name, or{' '}
                      <Link href="/blog" onClick={closeAll}>
                        browse the full library
                      </Link>
                      .
                    </div>
                  )}
                </>
              )}
            </form>
          </div>
        )}

        {/* Mobile Drawer */}
        {menuOpen && (
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className="pt-mobile-block-only"
            style={{
              borderTop: '1px solid #DFE2DB',
              background: '#FFFFFF',
              maxHeight: 'calc(100vh - 68px)',
              overflow: 'auto',
            }}
          >
            <div style={{ padding: '8px clamp(16px,4vw,40px) 24px' }}>
              <Link
                href="/blog"
                onClick={closeAll}
                style={{
                  display: 'block',
                  padding: '14px 0',
                  borderBottom: '1px solid #DFE2DB',
                  fontSize: '18px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: '#20221F',
                }}
              >
                Reviews &amp; Guides
              </Link>
              <p
                style={{
                  margin: '18px 0 6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#60645F',
                  letterSpacing: '.04em',
                  textTransform: 'uppercase',
                }}
              >
                Categories
              </p>
              {site.navCategories.map((c) => (
                <Link
                  key={c.slug}
                  href={c.href}
                  onClick={closeAll}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '12px',
                    padding: '12px 0',
                    borderBottom: '1px solid #EEEFEA',
                    textDecoration: 'none',
                    color: '#20221F',
                    fontSize: '16px',
                  }}
                >
                  <span>{c.name}</span>
                  <span style={{ fontSize: '14px', color: c.statusColor }}>{c.statusLabel}</span>
                </Link>
              ))}
              <Link
                href="/tools"
                onClick={closeAll}
                style={{
                  display: 'block',
                  padding: '14px 0',
                  borderBottom: '1px solid #DFE2DB',
                  fontSize: '18px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: '#20221F',
                  marginTop: '12px',
                }}
              >
                Free Tools
              </Link>
              <Link
                href="/how-we-review"
                onClick={closeAll}
                style={{
                  display: 'block',
                  padding: '14px 0',
                  borderBottom: '1px solid #DFE2DB',
                  fontSize: '18px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: '#20221F',
                }}
              >
                How We Review
              </Link>
              <Link
                href="/about"
                onClick={closeAll}
                style={{
                  display: 'block',
                  padding: '14px 0',
                  borderBottom: '1px solid #DFE2DB',
                  fontSize: '16px',
                  textDecoration: 'none',
                  color: '#20221F',
                }}
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={closeAll}
                style={{
                  display: 'block',
                  padding: '14px 0',
                  fontSize: '16px',
                  textDecoration: 'none',
                  color: '#20221F',
                }}
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
