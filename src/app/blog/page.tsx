import React from 'react';
import type { Metadata } from 'next';
import { LibraryView } from '@/components/LibraryView';

export const metadata: Metadata = {
  title: 'Photography Software Reviews, Comparisons & Guides | The Photo Testers',
  description:
    'Every review, comparison, and buying guide we have published, with the date it was published and what its findings are based on.',
  alternates: {
    canonical: 'https://www.thephototesters.com/blog',
  },
  openGraph: {
    title: 'Photography Software Reviews, Comparisons & Guides | The Photo Testers',
    description:
      'Every review, comparison, and buying guide we have published, with the date it was published and what its findings are based on.',
    url: 'https://www.thephototesters.com/blog',
    type: 'website',
    images: [
      {
        url: '/og/default.jpg',
        width: 1200,
        height: 630,
        alt: 'The Photo Testers Reviews and Guides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Photography Software Reviews, Comparisons & Guides | The Photo Testers',
    description:
      'Every review, comparison, and buying guide we have published, with the date it was published and what its findings are based on.',
    images: ['/og/default.jpg'],
  },
};

export default function BlogPage() {
  return <LibraryView />;
}
