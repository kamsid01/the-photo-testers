import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { LibraryView } from '@/components/LibraryView';

export const metadata: Metadata = {
  title: 'Reviews & Guides — The Photo Testers',
  description:
    'Every review, comparison, and buying guide we have published, with the date it was last updated and what its findings are based on.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px clamp(16px,4vw,40px)', color: '#60645F' }}>
          Loading library…
        </div>
      }
    >
      <LibraryView />
    </Suspense>
  );
}
