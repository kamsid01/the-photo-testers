import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RenderedRun } from '@/lib/site-data';

export function InlineRuns({ runs }: { runs: RenderedRun[] }) {
  if (!runs || !runs.length) return null;
  return (
    <>
      {runs.map((r, i) => {
        if (r.isLink && r.href) {
          const isExternal = r.target === '_blank' || r.href.startsWith('http');
          if (isExternal) {
            const isAffiliate = r.rel?.includes('sponsored') || (r as any).affiliate;
            const computedRel = r.rel || (isAffiliate ? 'sponsored nofollow noopener' : 'noopener noreferrer');
            return (
              <a
                key={i}
                href={r.href}
                target="_blank"
                rel={computedRel}
                className="text-[#3159D7] underline hover:text-[#20221F]"
              >
                {r.t}
              </a>
            );
          }
          return (
            <Link key={i} href={r.href} className="text-[#3159D7] underline hover:text-[#20221F]">
              {r.t}
            </Link>
          );
        }
        if (r.isB) {
          return (
            <strong key={i} className="font-semibold text-[#20221F]">
              {r.t}
            </strong>
          );
        }
        if (r.isI) {
          return (
            <em key={i} className="italic text-[#4A4E49]">
              {r.t}
            </em>
          );
        }
        return <React.Fragment key={i}>{r.t}</React.Fragment>;
      })}
    </>
  );
}

export function ArticleBlocks({ blocks }: { blocks: any[] }) {
  return (
    <div className="article-body">
      {blocks.map((b, idx) => {
        if (b.isH2) {
          return (
            <h2
              key={idx}
              id={b.id}
              className="mt-[1.9em] mb-[0.6em] font-serif font-medium text-[clamp(26px,2.5vw,32px)] leading-[1.15] tracking-[-0.01em] text-[#20221F] scroll-mt-24"
            >
              {b.text}
            </h2>
          );
        }

        if (b.isProduct) {
          return (
            <header
              key={idx}
              id={b.id}
              className="mt-[2.4em] mb-[0.9em] pt-5 border-t-2 border-[#20221F] grid grid-cols-[auto_1fr] gap-x-4 items-baseline scroll-mt-24"
            >
              <span
                aria-hidden="true"
                className="font-serif text-[40px] leading-none text-[#3159D7]"
              >
                {b.num}
              </span>
              <div>
                <h2 className="m-0 font-serif font-medium text-[clamp(28px,2.6vw,34px)] leading-[1.1] text-[#20221F]">
                  {b.name}
                </h2>
                {b.bestFor && (
                  <p className="mt-1.5 font-sans text-[15px] font-semibold text-[#60645F]">
                    {b.bestFor}
                  </p>
                )}
              </div>
            </header>
          );
        }

        if (b.isH3) {
          return (
            <h3
              key={idx}
              id={b.id}
              className="mt-[1.6em] mb-[0.4em] font-sans text-[19px] font-semibold leading-[1.3] text-[#20221F] scroll-mt-24"
            >
              {b.text}
            </h3>
          );
        }

        if (b.hasEvidence) {
          return (
            <div
              key={idx}
              className="my-[1.4em] mb-[-0.4em] flex flex-wrap gap-2 items-center font-sans"
            >
              {b.tags.map((tg: { label: string }, ti: number) => (
                <span
                  key={ti}
                  className="text-[13px] font-semibold text-[#20221F] px-2 py-0.5 border border-[#B9BDB4] rounded-sm bg-white"
                >
                  {tg.label}
                </span>
              ))}
              {b.evNote && (
                <span className="text-[14px] text-[#60645F] leading-[1.45] w-full">
                  {b.evNote}
                </span>
              )}
            </div>
          );
        }

        if (b.isPricing) {
          return (
            <div
              key={idx}
              className="my-[0.6em] mb-[1.1em] p-3 sm:px-4 bg-[#F1F3F9] rounded font-sans text-[15px] leading-[1.5] text-[#20221F]"
            >
              <InlineRuns runs={b.runs} />
            </div>
          );
        }

        if (b.isP) {
          return (
            <p key={idx} className="m-0 mb-[1.05em] text-pretty leading-[1.68]">
              <InlineRuns runs={b.runs} />
            </p>
          );
        }

        if (b.isUl) {
          return (
            <ul key={idx} className="m-0 mb-[1.2em] pl-5 list-disc">
              {b.items.map((it: { runs: RenderedRun[] }, liIdx: number) => (
                <li key={liIdx} className="mb-2 pl-1 leading-[1.6]">
                  <InlineRuns runs={it.runs} />
                </li>
              ))}
            </ul>
          );
        }

        if (b.isOl) {
          return (
            <ol key={idx} className="m-0 mb-[1.2em] pl-5 list-decimal">
              {b.items.map((it: { runs: RenderedRun[] }, liIdx: number) => (
                <li key={liIdx} className="mb-2 pl-1 leading-[1.6]">
                  <InlineRuns runs={it.runs} />
                </li>
              ))}
            </ol>
          );
        }

        if (b.isTable) {
          return (
            <figure key={idx} className="my-4 font-sans">
              <div
                role="region"
                aria-label={b.label}
                tabIndex={0}
                className="overflow-x-auto max-w-full border border-[#DFE2DB] bg-white rounded"
              >
                <table
                  style={{ minWidth: b.minW }}
                  className="w-full border-collapse text-[15px] leading-[1.45]"
                >
                  <thead>
                    <tr>
                      {b.head.map((h: { text: string }, hi: number) => (
                        <th
                          key={hi}
                          scope="col"
                          className="text-left py-3 px-3.5 border-b border-[#20221F] font-semibold bg-[#F6F5F1] whitespace-nowrap text-[#20221F]"
                        >
                          {h.text}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row: { cells: { fw: string; runs: RenderedRun[] }[] }, ri: number) => (
                      <tr key={ri}>
                        {row.cells.map((c, ci: number) => (
                          <td
                            key={ci}
                            style={{ fontWeight: c.fw }}
                            className="py-3 px-3.5 border-b border-[#E6E7E1] align-top text-[#20221F]"
                          >
                            <InlineRuns runs={c.runs} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <figcaption className="mt-1.5 text-[13px] text-[#60645F]">
                Scroll the table sideways to see every column.
              </figcaption>
            </figure>
          );
        }

        if (b.isImg) {
          return (
            <figure key={idx} className="my-5">
              <div
                style={{ aspectRatio: b.ratio }}
                className="border border-[#DFE2DB] rounded overflow-hidden bg-[#F3F2EE] relative w-full"
              >
                <img
                  src={b.src}
                  alt={b.alt}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: b.pos,
                  }}
                />
              </div>
              {b.cap && (
                <figcaption className="mt-2 font-sans text-[14px] leading-[1.5] text-[#60645F]">
                  {b.cap}
                </figcaption>
              )}
            </figure>
          );
        }

        if (b.isProsCons) {
          return (
            <div
              key={idx}
              className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#DFE2DB] border border-[#DFE2DB] my-4 font-sans text-[15px] leading-[1.5]"
            >
              <div className="bg-white p-4 sm:p-5">
                <h3 className="m-0 mb-2.5 text-[14px] font-semibold text-[#1F6B3A]">
                  Reasons to choose
                </h3>
                <ul className="list-none m-0 p-0 space-y-2">
                  {b.pros.map((p: { text: string }, pi: number) => (
                    <li key={pi} className="grid grid-cols-[16px_1fr] gap-2">
                      <span aria-hidden="true" className="text-[#1F6B3A] font-bold">
                        +
                      </span>
                      <span className="text-[#20221F]">{p.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-4 sm:p-5">
                <h3 className="m-0 mb-2.5 text-[14px] font-semibold text-[#9A3412]">
                  Limitations
                </h3>
                <ul className="list-none m-0 p-0 space-y-2">
                  {b.cons.map((cn: { text: string }, ci: number) => (
                    <li key={ci} className="grid grid-cols-[16px_1fr] gap-2">
                      <span aria-hidden="true" className="text-[#9A3412] font-bold">
                        −
                      </span>
                      <span className="text-[#20221F]">{cn.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        }

        if (b.isCta) {
          return (
            <p
              key={idx}
              className="my-4 flex flex-wrap items-center gap-3 font-sans"
            >
              <a
                href={b.href}
                target={b.target}
                rel={b.rel || 'sponsored nofollow noopener'}
                className="inline-flex items-center whitespace-nowrap h-11 px-4 border border-[#20221F] rounded text-[#20221F] no-underline font-semibold text-[15px] bg-white hover:bg-[#20221F] hover:text-white transition-colors"
              >
                <span>{b.text}</span>
                <span aria-hidden="true" className="ml-2">
                  ↗
                </span>
              </a>
              {b.ext && (
                <span className="text-[13px] text-[#60645F]">
                  Vendor site. May be an affiliate link.
                </span>
              )}
            </p>
          );
        }

        if (b.isPull) {
          return (
            <blockquote
              key={idx}
              className="my-7 py-2 border-t border-[#20221F] border-b border-[#DFE2DB] font-serif italic text-[clamp(25px,2.6vw,31px)] leading-[1.3] text-[#20221F]"
            >
              <p className="my-4">{b.text}</p>
            </blockquote>
          );
        }

        if (b.isQuote) {
          return (
            <blockquote
              key={idx}
              className="my-5 pl-5 border-l-2 border-[#20221F] text-[#4A4E49] italic"
            >
              <InlineRuns runs={b.runs} />
            </blockquote>
          );
        }

        if (b.isHr) {
          return <hr key={idx} className="my-8 border-0 border-t border-[#DFE2DB]" />;
        }

        if (b.isCallout) {
          return (
            <aside
              key={idx}
              className="my-6 p-4 sm:p-5 bg-[#FBF7EF] border border-[#E7D9BC] rounded text-[15px] leading-[1.55] text-[#4F3A12]"
            >
              <p className="m-0 font-medium">
                <InlineRuns runs={b.runs} />
              </p>
            </aside>
          );
        }

        return null;
      })}
    </div>
  );
}
