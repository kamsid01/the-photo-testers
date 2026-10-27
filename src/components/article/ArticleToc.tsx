'use client';

import React, { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  label: string;
}

interface ArticleTocProps {
  toc: TocItem[];
  evidenceLabel: string;
  checked?: string;
  mobileOnly?: boolean;
  desktopOnly?: boolean;
}

export function ArticleDesktopToc({ toc, evidenceLabel, checked }: { toc: TocItem[]; evidenceLabel: string; checked?: string }) {
  const [activeId, setActiveId] = useState<string>(toc[0]?.id || '');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ids = toc.map((t) => t.id);

    const onScroll = () => {
      let cur = ids[0] || '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 150) {
          cur = id;
        }
      }
      if (cur) setActiveId(cur);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [toc]);

  if (toc.length <= 2) return null;

  return (
    <aside
      aria-label="On this page"
      className="hidden lg:block sticky top-[96px] self-start max-h-[calc(100vh-120px)] overflow-y-auto pt-1.5"
    >
      <p className="m-0 mb-2.5 text-[13px] font-semibold tracking-[0.05em] uppercase text-[#20221F]">
        On this page
      </p>
      <ol className="list-none m-0 p-0 border-l border-[#DFE2DB]">
        {toc.map((t) => {
          const isActive = t.id === activeId;
          const label = t.label.length > 48 ? `${t.label.slice(0, 46)}…` : t.label;
          return (
            <li key={t.id}>
              <a
                href={`#${t.id}`}
                aria-current={isActive ? 'location' : undefined}
                className={`block py-1.5 pl-3.5 -ml-px border-l-2 text-[14px] leading-[1.4] transition-colors ${
                  isActive
                    ? 'border-[#3159D7] text-[#20221F] font-semibold'
                    : 'border-transparent text-[#60645F] font-normal hover:text-[#3159D7]'
                }`}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ol>
      <div className="mt-7 pt-4 border-t border-[#DFE2DB] text-[14px] leading-[1.5] text-[#60645F]">
        <p className="m-0 mb-1 font-semibold text-[#20221F]">{evidenceLabel}</p>
        {checked && <p className="m-0 mb-2">Pricing checked {checked}.</p>}
        <a href="/how-we-review" className="text-[14px] text-[#3159D7] hover:underline">
          How we review
        </a>
      </div>
    </aside>
  );
}

export function ArticleMobileToc({ toc }: { toc: TocItem[] }) {
  if (toc.length <= 2) return null;

  return (
    <details className="lg:hidden my-0 mb-7 border border-[#DFE2DB] rounded bg-white">
      <summary className="p-3.5 sm:px-4 font-semibold text-[15px] cursor-pointer min-h-[48px] select-none flex items-center justify-between">
        <span>On this page</span>
        <span className="text-xs text-[#60645F]">▼</span>
      </summary>
      <ol className="list-none m-0 px-4 pb-2.5">
        {toc.map((t) => (
          <li key={t.id} className="border-t border-[#EEEFEA]">
            <a
              href={`#${t.id}`}
              className="block py-2.5 text-[15px] text-[#20221F] no-underline hover:text-[#3159D7]"
            >
              {t.label}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}
