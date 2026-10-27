import Link from 'next/link';
import { breadcrumbNav, breadcrumbOl } from './ui';

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" style={breadcrumbNav}>
      <ol style={breadcrumbOl}>
        {items.map((it, i) => (
          <li key={i} style={{ display: 'contents' }}>
            {i > 0 && <span aria-hidden="true">/</span>}
            {it.href ? (
              <span style={{ whiteSpace: 'nowrap' }}>
                <Link href={it.href} style={{ color: '#60645F' }}>{it.label}</Link>
              </span>
            ) : (
              <span aria-current="page" style={{ color: '#20221F', whiteSpace: 'nowrap' }}>{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
