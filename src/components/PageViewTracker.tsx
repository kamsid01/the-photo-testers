'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith('/embed')) return;
    trackEvent('page_view', { page: pathname });
  }, [pathname]);

  return null;
}
