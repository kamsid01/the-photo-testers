import React from 'react';
import Link from 'next/link';

interface InfoLayoutProps {
  currentPage: 'about' | 'how-we-review' | 'affiliate-disclosure' | 'privacy' | 'contact';
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { href: '/about', label: 'About', key: 'about' },
  { href: '/how-we-review', label: 'How we review', key: 'how-we-review' },
  { href: '/affiliate-disclosure', label: 'Affiliate disclosure', key: 'affiliate-disclosure' },
  { href: '/privacy', label: 'Privacy', key: 'privacy' },
  { href: '/contact', label: 'Contact', key: 'contact' },
];

export function InfoLayout({ currentPage, children }: InfoLayoutProps) {
  return (
    <div className="bg-[#FAF9F6] min-h-[calc(100vh-200px)]">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 md:px-10 py-8 md:py-14 pb-16 md:pb-24 flex flex-col md:flex-row gap-8 md:gap-16 items-start">
        {/* Sticky Desktop Navigation / Horizontal Mobile Navigation */}
        <nav
          aria-label="About the publication"
          className="w-full md:w-[220px] md:sticky md:top-24 shrink-0"
        >
          <p className="m-0 mb-2.5 text-[13px] font-semibold tracking-[0.05em] uppercase text-[#20221F]">
            The publication
          </p>
          <ul className="list-none m-0 p-0 flex flex-row flex-wrap md:flex-col gap-2 md:gap-1 md:border-l md:border-[#DFE2DB]">
            {NAV_ITEMS.map((item) => {
              const isCurrent = item.key === currentPage;
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={isCurrent ? 'page' : undefined}
                    className={`block py-1.5 md:pl-3.5 md:-ml-px text-[15px] transition-colors no-underline ${
                      isCurrent
                        ? 'text-[#20221F] font-semibold md:border-l-2 md:border-[#3159D7]'
                        : 'text-[#60645F] font-normal hover:text-[#3159D7] md:border-l-2 md:border-transparent'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Content Area */}
        <div className="w-full min-w-0 max-w-[720px] flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
