'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';

interface ToolDetail {
  reason: string;
  limit: string;
  link: string;
  linkText: string;
  short: string;
}

const TOOLS: Record<string, ToolDetail> = {
  Aftershoot: {
    reason:
      'You want one tool for the whole workflow and a predictable price at volume. Aftershoot culls, edits, and retouches on your own computer for a flat fee.',
    limit:
      'Its culling still needs a human review pass, especially in low light and fast action. It runs on your hardware, so a big wedding ties up an older laptop.',
    link: '/aftershoot-review',
    linkText: 'Read the Aftershoot review',
    short: 'Flat-fee culling, editing, and retouching that runs offline.',
  },
  'Imagen AI': {
    reason:
      'Editing quality matters most to you. Imagen learns your style from your past Lightroom catalogs and applies it across a whole gallery.',
    limit:
      'Its cloud AI charges $0.05/photo pay-as-you-go ($7/mo minimum) or $129/mo billed annually for Limitless, and processing requires an internet connection.',
    link: '/imagen-ai-review',
    linkText: 'Read the Imagen AI review',
    short: 'Style-matched editing in Lightroom Classic ($0.05/photo PAYG or $129/mo Limitless annual).',
  },
  'Narrative Select': {
    reason:
      'You want to keep making the final calls. Narrative Select gives you fast RAW browsing and AI warnings for blinks and focus, but leaves the selection to you.',
    limit:
      'You still do the deciding, so it saves less time than tools that make the picks for you.',
    link: '/best-photo-culling-software#narrative-select',
    linkText: 'Narrative Select in our culling guide',
    short: 'Fast browsing with AI assists, and you make the picks.',
  },
  FilterPixel: {
    reason:
      'Budget is your main concern. FilterPixel has one of the more generous free tiers for AI culling, and its cloud processing doesn’t tax your laptop.',
    limit: 'Cloud processing means it isn’t suited to working offline.',
    link: '/best-photo-culling-software#filterpixel',
    linkText: 'FilterPixel in our culling guide',
    short: 'Cloud AI culling with a free tier.',
  },
  'Photo Mechanic': {
    reason:
      'You want a one-time purchase, offline work, and full control. Photo Mechanic is a fast manual culling tool with no subscription.',
    limit: 'There’s no AI. Every selection is yours to make.',
    link: '/best-photo-culling-software#photo-mechanic',
    linkText: 'Photo Mechanic in our culling guide',
    short: 'Fast manual culling, bought once.',
  },
  'Excire Foto': {
    reason:
      'You prefer a one-time purchase and want AI help organizing and finding photos. Excire Foto is an offline organizer and culler with no subscription.',
    limit:
      'It’s covered in less depth than the other tools here. Test it on your own catalog before relying on it.',
    link: '/best-photo-culling-software#excire-foto',
    linkText: 'Excire Foto in our culling guide',
    short: 'Offline AI organizing and culling, bought once.',
  },
  Evoto: {
    reason:
      'Your main task is retouching. Evoto’s one-click skin, glare, and background tools are aimed at exactly that work.',
    limit:
      'It uses a credit system rather than a subscription, and it’s built for retouching rather than culling.',
    link: '/best-ai-culling-editing-software#evoto',
    linkText: 'Evoto in our AI editing guide',
    short: 'AI portrait retouching, paid with credits.',
  },
};

interface QuestionOption {
  text: string;
  points: Record<string, number>;
}

interface Question {
  id: string;
  topic: string;
  question: string;
  options: QuestionOption[];
}

const QUESTIONS: Question[] = [
  {
    id: 'volume',
    topic: 'Volume',
    question: 'What’s your monthly photo volume?',
    options: [
      { text: 'Low (under 1,000)', points: { FilterPixel: 2, 'Excire Foto': 1 } },
      { text: 'Medium (1,000-5,000)', points: { 'Imagen AI': 2, 'Narrative Select': 1 } },
      { text: 'High (5,000+)', points: { Aftershoot: 2, 'Photo Mechanic': 1 } },
    ],
  },
  {
    id: 'matters',
    topic: 'Priority',
    question: 'What matters most to you?',
    options: [
      { text: 'Lowest cost', points: { FilterPixel: 3 } },
      { text: 'Best editing quality', points: { 'Imagen AI': 3, Evoto: 2 } },
      { text: 'Keeping creative control', points: { 'Narrative Select': 3, 'Photo Mechanic': 2 } },
      { text: 'All-in-one workflow', points: { Aftershoot: 3 } },
    ],
  },
  {
    id: 'offline',
    topic: 'Connection',
    question: 'Do you need to work offline?',
    options: [
      { text: 'Yes, often', points: { Aftershoot: 2, 'Narrative Select': 2, 'Photo Mechanic': 2, 'Excire Foto': 2 } },
      { text: 'Sometimes', points: { 'Imagen AI': 1 } },
      { text: 'No, always have internet', points: { FilterPixel: 1, Evoto: 1 } },
    ],
  },
  {
    id: 'budget',
    topic: 'Budget',
    question: 'What’s your budget preference?',
    options: [
      { text: 'Free/cheap', points: { FilterPixel: 3 } },
      { text: 'Flat monthly fee', points: { Aftershoot: 2, 'Narrative Select': 1 } },
      { text: 'One-time purchase', points: { 'Photo Mechanic': 3, 'Excire Foto': 3 } },
      { text: 'Doesn’t matter', points: { 'Imagen AI': 2, Evoto: 1 } },
    ],
  },
  {
    id: 'task',
    topic: 'Main task',
    question: 'What’s your main task?',
    options: [
      { text: 'Culling only', points: { 'Narrative Select': 2, 'Photo Mechanic': 2, FilterPixel: 1 } },
      { text: 'Culling + editing', points: { Aftershoot: 2, 'Imagen AI': 2 } },
      { text: 'Editing + retouching', points: { Evoto: 3, Aftershoot: 1 } },
    ],
  },
];

export function CullingToolFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);
  const [nudge, setNudge] = useState(false);

  const legendRef = useRef<HTMLLegendElement>(null);
  const resultRef = useRef<HTMLParagraphElement>(null);

  const q = QUESTIONS[step];
  const sel = answers[q?.id];

  const score = () => {
    const sc: Record<string, number> = {};
    const why: Record<string, { text: string }[]> = {};

    QUESTIONS.forEach((question) => {
      const i = answers[question.id];
      if (i === undefined) return;
      const opt = question.options[i];
      Object.entries(opt.points).forEach(([t, p]) => {
        sc[t] = (sc[t] || 0) + p;
        if (!why[t]) why[t] = [];
        why[t].push({ text: `${question.topic}: “${opt.text}” (+${p})` });
      });
    });

    const isOfflineRequired = answers['offline'] === 0; // "Yes, often"
    const cloudTools = new Set(['FilterPixel', 'Imagen AI', 'Evoto']);

    // Sort all tools by raw score for transparent score breakdown
    const sorted = Object.entries(sc).sort((a, b) => b[1] - a[1]);

    // Apply strict offline compatibility constraint if offline is required:
    let topName = sorted.length > 0 ? sorted[0][0] : 'Aftershoot';
    let runnerName = sorted.length > 1 ? sorted[1][0] : null;
    let constraintNote: string | null = null;

    if (isOfflineRequired) {
      const offlineCandidates = sorted.filter(([t]) => !cloudTools.has(t));
      if (offlineCandidates.length > 0) {
        if (cloudTools.has(topName)) {
          const excludedCloudTool = topName;
          topName = offlineCandidates[0][0];
          runnerName = offlineCandidates.length > 1 ? offlineCandidates[1][0] : null;
          constraintNote = `${excludedCloudTool} scored highest on points, but its AI engine operates in the cloud and cannot work offline. ${topName} is recommended as your primary offline-compatible starting point.`;
        } else {
          // topName is already offline, ensure runnerName is also offline
          runnerName = offlineCandidates.find(([t]) => t !== topName)?.[0] || null;
        }
      }
    }

    return { sorted, why, topName, runnerName, constraintNote };
  };

  const handleNext = () => {
    if (sel === undefined) {
      setNudge(true);
      return;
    }
    if (step === QUESTIONS.length - 1) {
      setDone(true);
      setTimeout(() => resultRef.current?.focus(), 50);
    } else {
      setStep((s) => s + 1);
      setNudge(false);
      setTimeout(() => legendRef.current?.focus(), 50);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((s) => s - 1);
      setNudge(false);
      setTimeout(() => legendRef.current?.focus(), 50);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setDone(false);
    setNudge(false);
  };

  const handleReview = () => {
    setStep(0);
    setDone(false);
    setNudge(false);
  };

  if (done) {
    const { sorted, why, topName, runnerName, constraintNote } = score();
    const topDetail = TOOLS[topName] || TOOLS.Aftershoot;
    const runnerDetail = runnerName ? TOOLS[runnerName] : null;

    return (
      <div className="bg-white border border-[#DFE2DB] rounded p-5 sm:p-8 md:p-10">
        <p
          ref={resultRef}
          tabIndex={-1}
          className="m-0 mb-2 text-[14px] font-semibold text-[#3159D7] outline-none"
        >
          Suggested starting point
        </p>
        <h2 className="m-0 mb-3.5 font-serif font-medium text-[clamp(36px,4.4vw,52px)] leading-none text-[#20221F]">
          {topName}
        </h2>
        <p className="m-0 mb-6 text-[18px] leading-[1.55] text-[#20221F] max-w-[36em]">
          {topDetail.reason}
        </p>

        {constraintNote && (
          <div className="mb-6 p-3.5 px-4 bg-[#FBF7EF] border border-[#E7D9BC] rounded text-[14px] leading-[1.5] text-[#4F3A12]">
            <strong>Compatibility constraint:</strong> {constraintNote}
          </div>
        )}

        {/* Why it fits / limitations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#DFE2DB] border border-[#DFE2DB] mb-6">
          <div className="bg-white p-4 sm:p-5">
            <h3 className="m-0 mb-2 text-[14px] font-semibold text-[#20221F]">
              Why it fits your answers
            </h3>
            <ul className="m-0 pl-4 text-[15px] leading-[1.5] text-[#4A4E49] space-y-1 list-disc">
              {(why[topName] || []).map((w, wi) => (
                <li key={wi}>{w.text}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-4 sm:p-5">
            <h3 className="m-0 mb-2 text-[14px] font-semibold text-[#9A3412]">
              Important limitation
            </h3>
            <p className="m-0 text-[15px] leading-[1.5] text-[#4A4E49]">{topDetail.limit}</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3 mb-7">
          <Link
            href={topDetail.link}
            className="inline-flex items-center whitespace-nowrap h-11 px-5 bg-[#3159D7] text-white rounded font-semibold text-[15px] no-underline hover:bg-[#2547B5] transition-colors"
          >
            {topDetail.linkText}
          </Link>
          <button
            type="button"
            onClick={handleRestart}
            className="h-11 px-4 border border-[#B9BDB4] bg-white rounded font-semibold text-[15px] text-[#20221F] hover:border-[#20221F] cursor-pointer"
          >
            Start again
          </button>
          <button
            type="button"
            onClick={handleReview}
            className="h-11 px-2 border-0 bg-transparent text-[#2A4EC2] underline text-[15px] cursor-pointer hover:text-[#20221F]"
          >
            Change my answers
          </button>
        </div>

        {/* Runner-up */}
        {runnerName && runnerDetail && (
          <div className="py-4 border-t border-[#20221F] border-b border-[#DFE2DB] flex flex-wrap justify-between items-baseline gap-2 sm:gap-6">
            <p className="m-0 text-[16px] leading-[1.5] text-[#20221F] flex-1 min-w-[280px]">
              <strong>Also trial: {runnerName}.</strong> {runnerDetail.short}
            </p>
            <Link
              href={runnerDetail.link}
              className="font-semibold text-[15px] text-[#3159D7] hover:underline"
            >
              {runnerDetail.linkText}
            </Link>
          </div>
        )}

        {/* Collapsible Score Breakdown */}
        <details className="mt-5">
          <summary className="cursor-pointer text-[15px] font-semibold text-[#20221F] min-h-[32px] select-none">
            How this result was reached
          </summary>
          <p className="my-2.5 text-[15px] leading-[1.55] text-[#4A4E49]">
            Each answer adds points to one or more tools based on speed, platform constraints, and pricing model. The tool with the highest total is suggested; the second-highest is the runner-up. Tools with no matching points aren’t shown.
          </p>
          <table className="w-full max-w-[380px] border-collapse text-[15px] tabular-nums">
            <tbody>
              {sorted.map(([name, pts]) => (
                <tr key={name}>
                  <th
                    scope="row"
                    className="text-left font-medium py-1.5 border-b border-[#EEEFEA] text-[#20221F]"
                  >
                    {name}
                  </th>
                  <td className="text-right py-1.5 border-b border-[#EEEFEA] text-[#4A4E49]">
                    {pts} pts
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#DFE2DB] rounded p-5 sm:p-8 md:p-10">
      <div className="flex justify-between items-center gap-3 text-[14px] text-[#60645F] mb-2.5">
        <span aria-live="polite">Question {step + 1} of 5</span>
        <span>{q.topic}</span>
      </div>

      {/* 5-step progress bar */}
      <ol
        aria-label="Quiz progress"
        className="list-none m-0 mb-7 p-0 grid grid-cols-5 gap-1"
      >
        {QUESTIONS.map((item, idx) => {
          const isAnswered = answers[item.id] !== undefined;
          const isCurrent = idx === step;
          const bg =
            idx < step || (isAnswered && isCurrent)
              ? 'bg-[#3159D7]'
              : isCurrent
              ? 'bg-[#9DB0EC]'
              : 'bg-[#E1E2DC]';
          return (
            <li key={item.id} className={`h-1 rounded-sm ${bg}`}>
              <span className="sr-only">
                {idx + 1}: {isAnswered ? 'answered' : 'not answered'}
              </span>
            </li>
          );
        })}
      </ol>

      <fieldset className="border-0 m-0 p-0">
        <legend
          ref={legendRef}
          tabIndex={-1}
          className="font-serif text-[clamp(26px,2.6vw,32px)] leading-[1.2] mb-5 p-0 text-[#20221F] outline-none"
        >
          {q.question}
        </legend>
        <div className="grid gap-2.5">
          {q.options.map((opt, i) => {
            const isChecked = sel === i;
            return (
              <label
                key={i}
                className={`flex items-center gap-3.5 min-h-[56px] px-4 py-3 border rounded cursor-pointer text-[17px] transition-colors ${
                  isChecked
                    ? 'border-[#3159D7] bg-[#EEF2FC]'
                    : 'border-[#DFE2DB] bg-white hover:border-[#3159D7]'
                }`}
              >
                <input
                  type="radio"
                  name={q.id}
                  value={i}
                  checked={isChecked}
                  onChange={() => {
                    setAnswers((prev) => ({ ...prev, [q.id]: i }));
                    setNudge(false);
                  }}
                  className="w-4.5 h-4.5 m-0 accent-[#3159D7] shrink-0"
                />
                <span className="text-[#20221F]">{opt.text}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {nudge && sel === undefined && (
        <p role="alert" className="mt-3 text-[15px] text-[#B42318]">
          Choose an answer to continue.
        </p>
      )}

      <div className="flex justify-between items-center gap-3 mt-7 pt-5 border-t border-[#DFE2DB]">
        <button
          type="button"
          onClick={handleBack}
          disabled={step === 0}
          className={`h-11 px-4 border border-[#B9BDB4] bg-white rounded font-semibold text-[15px] text-[#20221F] cursor-pointer ${
            step === 0 ? 'opacity-45 cursor-not-allowed' : 'hover:border-[#20221F]'
          }`}
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="h-11 px-6 bg-[#3159D7] text-white rounded font-semibold text-[15px] hover:bg-[#2547B5] cursor-pointer transition-colors"
        >
          {step === QUESTIONS.length - 1 ? 'See my result' : 'Next'}
        </button>
      </div>
    </div>
  );
}
