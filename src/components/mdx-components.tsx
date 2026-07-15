import React from 'react';
import Link from 'next/link';
import { ContactForm } from './ContactForm';

export function MDXComponents() {
  return {
    ContactForm,
    a: ({ href, children, ...props }: any) => {
      const isInternal = href && (href.startsWith('/') || href.startsWith('#'));
      if (isInternal) {
        return <Link href={href} {...props}>{children}</Link>;
      }
      return (
        <a href={href} target="_blank" rel="sponsored nofollow noopener" {...props}>
          {children}
        </a>
      );
    },
    table: ({ children, ...props }: any) => (
      <div className="overflow-x-auto my-10 border border-border rounded-xl shadow-sm bg-bg">
        <table className="w-full text-left border-collapse min-w-[600px] m-0" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }: any) => (
      <th className="bg-surface px-4 py-3 font-semibold text-sm border-b border-border text-ink whitespace-nowrap" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }: any) => (
      <td className="px-4 py-4 border-b border-border text-sm text-ink align-middle" {...props}>
        {children}
      </td>
    ),
    tr: ({ children, ...props }: any) => (
      // Style the first row in the tbody as the recommended row
      <tr className="group hover:bg-surface/50 transition-colors [&:first-child]:bg-accent-tint/40" {...props}>
        {children}
      </tr>
    ),
    
    QuickAnswer: ({ children }: any) => (
      <div className="bg-accent-tint p-6 sm:p-8 rounded-xl border border-accent/20 my-10 shadow-sm text-ink">
        {children}
      </div>
    ),
    Screenshot: ({ src, caption }: any) => (
      <figure className="my-12">
        <div className="border border-border rounded-lg overflow-hidden shadow-sm bg-surface">
          <img src={src} alt="Software screenshot" className="w-full h-auto m-0" />
        </div>
        {caption && (
          <figcaption className="text-center text-sm text-muted mt-3 font-medium">
            {caption}
          </figcaption>
        )}
      </figure>
    ),
    AffiliateButton: ({ href, children, ...props }: any) => (
      <a
        href={href}
        target="_blank"
        rel="sponsored nofollow noopener"
        className="inline-block px-5 py-2.5 rounded-md font-bold transition-colors text-sm bg-blue-100 text-blue-700 hover:bg-blue-200"
        {...props}
      >
        {children}
      </a>
    ),
    Pros: ({ children }: any) => (
      <div className="mdx-pros">
        {children}
      </div>
    ),
    Cons: ({ children }: any) => (
      <div className="mdx-cons">
        {children}
      </div>
    ),
  };
}
