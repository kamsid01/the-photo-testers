'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';

interface ToolDetail {
  reason: string;
  trialAndCost: string;
  limit: string;
  link: string;
  linkText: string;
  short: string;
}

const TOOLS: Record<string, ToolDetail> = {
  Aftershoot: {
    reason:
      'Aftershoot culls, edits, and retouches locally on your computer for a flat subscription fee with no per-image charge.',
    trialAndCost:
      '30-day free trial (all modules, no card). Paid plans from $10/mo annual ($15/mo monthly) for Select to $45/mo annual ($55/mo monthly) for Complete.',
    limit:
      'Its culling still needs a human review pass, especially in low light and fast action. Routine work runs locally on your hardware, while custom profile training and optional album-level AI learning upload images.',
    link: '/aftershoot-review',
    linkText: 'Read the Aftershoot review',
    short: 'Flat-fee culling, editing, and retouching with local routine processing.',
  },
  'Imagen AI': {
    reason:
      'Imagen learns your editing style from past Lightroom catalogs and applies consistent color across galleries.',
    trialAndCost:
      '1,000 free AI edits to test. Pay-as-you-go starts at $0.05/photo ($7/mo min) plus optional $0.01 add-ons; Limitless is $129/mo annual for eligible solo shooters.',
    limit:
      'Cloud processing requires an active internet connection, and Limitless is restricted to solo photographers editing their own work.',
    link: '/imagen-ai-review',
    linkText: 'Read the Imagen AI review',
    short: 'Style-matched editing in Lightroom Classic ($0.05/photo PAYG or $129/mo Limitless annual).',
  },
  'Narrative Select': {
    reason:
      'Narrative Select is a local desktop culling app with fast RAW preview rendering and AI face/focus indicators.',
    trialAndCost:
      'Free trial of Ultra with no credit card required (fixed duration not published). Lite ($10/mo annual or $15/mo monthly) covers fast local browsing and hover-over eye/focus checks only; Standard ($20/mo annual or $29/mo monthly) unlocks AI First Pass categorization, Scenes View, the Close-Ups panel, and unlimited AI presets.',
    limit:
      'Narrative Select assists your review rather than fully automating selections, and key AI culling views (AI First Pass, Scenes View, Close-Ups panel) require the Standard tier rather than Lite.',
    link: '/best-photo-culling-software#narrative-select',
    linkText: 'Narrative Select in our culling guide',
    short: 'Local desktop culling; Lite ($10/mo annual) is basic browsing + hover checks, Standard ($20/mo annual) adds Scenes View & Close-Ups.',
  },
  FilterPixel: {
    reason:
      'FilterPixel is a cloud-based option you can try before subscribing. Its free trial covers a limited number of projects. Check the current plans and trial terms before choosing.',
    trialAndCost:
      'Limited free trial before subscribing; paid plans start at $14.99/mo billed annually ($19.99/mo monthly).',
    limit: 'Cloud processing means it isn’t suited to working offline.',
    link: '/best-photo-culling-software#filterpixel',
    linkText: 'FilterPixel in our culling guide',
    short: 'Cloud-based AI culling with a limited free trial before subscribing.',
  },
  'Photo Mechanic': {
    reason:
      'Photo Mechanic is a fast, offline manual culling and ingest tool sold as a one-time purchase with no subscription.',
    trialAndCost:
      'Free trial available; $299 perpetual license (no recurring subscription).',
    limit: 'There is no AI selection or blink scoring—every keeper call is manual.',
    link: '/best-photo-culling-software#photo-mechanic',
    linkText: 'Photo Mechanic in our culling guide',
    short: 'Fast offline manual culling, $299 one-time purchase (no AI).',
  },
  'Excire Foto': {
    reason:
      'Excire Foto is an offline desktop organizer and culler with local AI search and Smart Selection, sold as a one-time license.',
    trialAndCost:
      'Free trial available; $249 / €229 perpetual license (no subscription).',
    limit:
      'Built primarily as a standalone photo-management catalog rather than a dedicated wedding culling pipeline.',
    link: '/best-photo-culling-software#excire-foto',
    linkText: 'Excire Foto in our culling guide',
    short: 'Offline AI organizing and culling, bought once ($249 perpetual).',
  },
  Evoto: {
    reason:
      'Evoto focuses on slider-based portrait retouching, skin cleanup, stray hair removal, and background adjustments.',
    trialAndCost:
      '7-day free trial with 50 credits; paid annual credit plans start at $89/yr (800 credits).',
    limit:
      'Most features process in the cloud and standard retouched exports consume credits; culling is secondary to retouching.',
    link: '/best-ai-culling-editing-software#evoto',
    linkText: 'Evoto in our AI editing guide',
    short: 'Cloud AI portrait retouching, paid with credits.',
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

    const getAnswerText = (id: string) => {
      const qObj = QUESTIONS.find((item) => item.id === id);
      const idx = answers[id];
      return qObj && idx !== undefined ? qObj.options[idx].text : '';
    };

    const volText = getAnswerText('volume').toLowerCase();
    const priorityText = getAnswerText('matters').toLowerCase();
    const offlineText = getAnswerText('offline');
    const budgetText = getAnswerText('budget').toLowerCase();
    const taskText = getAnswerText('task').toLowerCase();

    const offlinePhrase =
      offlineText === 'Yes, often'
        ? 'need to work offline'
        : offlineText === 'Sometimes'
        ? 'occasionally work offline'
        : 'always have internet';

    const dynamicExplanation = `Based on your answers—${volText} volume, prioritizing ${priorityText}, ${offlinePhrase}, a ${budgetText} budget, and ${taskText}—${topName} is the strongest starting point. ${topDetail.reason}`;

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
        <p className="m-0 mb-4 text-[18px] leading-[1.55] text-[#20221F] max-w-[38em]">
          {dynamicExplanation}
        </p>
        <p className="m-0 mb-6 text-[15px] leading-[1.55] text-[#4A4E49] max-w-[42em]">
          <strong className="text-[#20221F]">Trial &amp; pricing:</strong> {topDetail.trialAndCost}
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
