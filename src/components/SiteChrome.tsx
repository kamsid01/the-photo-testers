'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isEmbed = pathname?.startsWith('/embed');

  if (isEmbed) {
    return (
      <main id="main-content" tabIndex={-1} style={{ flex: 1, outline: 'none' }}>
        {children}
      </main>
    );
  }

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} style={{ flex: 1, outline: 'none' }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
