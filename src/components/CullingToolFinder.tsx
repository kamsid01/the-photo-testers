'use client';

import { useState } from 'react';
import Link from 'next/link';

type ToolName = 'Aftershoot' | 'Imagen AI' | 'Narrative Select' | 'FilterPixel' | 'Photo Mechanic' | 'Excire Foto' | 'Evoto';

interface ToolResult {
  name: ToolName;
  reason: string;
  link: string;
  linkText: string;
}

const TOOLS: Record<ToolName, ToolResult> = {
  'Aftershoot': {
    name: 'Aftershoot',
    reason: "Because you value an all-in-one workflow and flat pricing for high volumes, Aftershoot is your best bet. It handles both culling and editing locally for one fixed price.",
    link: "/best-ai-culling-editing-software",
    linkText: "Read our Aftershoot review"
  },
  'Imagen AI': {
    name: 'Imagen AI',
    reason: "You prioritize the absolute best editing quality. Imagen AI is the industry standard for learning your personal editing style and applying it with incredible accuracy.",
    link: "/best-ai-culling-editing-software",
    linkText: "Read our Imagen AI review"
  },
  'Narrative Select': {
    name: 'Narrative Select',
    reason: "You want to keep creative control over your culling without giving it all to AI, and you need blazing fast offline performance. Narrative Select gives you smart warnings but leaves the final pick to you.",
    link: "/best-photo-culling-software",
    linkText: "Read our Narrative Select review"
  },
  'FilterPixel': {
    name: 'FilterPixel',
    reason: "Because budget is a primary concern, FilterPixel is a fantastic starting point. They offer one of the most generous free tiers (4 free projects per month) to get you started with AI culling.",
    link: "/filterpixel-alternatives",
    linkText: "Read our FilterPixel review"
  },
  'Photo Mechanic': {
    name: 'Photo Mechanic',
    reason: "You want a one-time purchase, offline capability, and total creative control. Photo Mechanic is the legendary standard for manual, lightning-fast culling without subscriptions.",
    link: "/best-photo-culling-software",
    linkText: "Read our Photo Mechanic review"
  },
  'Excire Foto': {
    name: 'Excire Foto',
    reason: "You prefer a one-time purchase and want AI to help you manage and find your photos. Excire Foto is a powerful offline organizer and culler with no subscription fees.",
    link: "/best-photo-culling-software",
    linkText: "Read about Culling Software"
  },
  'Evoto': {
    name: 'Evoto',
    reason: "Since your main task involves heavy retouching and editing quality, Evoto's AI retouching capabilities will save you the most time.",
    link: "/best-ai-culling-editing-software",
    linkText: "Read our AI Editing review"
  }
};

type Question = {
  id: string;
  question: string;
  options: {
    text: string;
    points: Record<string, number>;
  }[];
};

const QUESTIONS: Question[] = [
  {
    id: 'volume',
    question: "What's your monthly photo volume?",
    options: [
      { text: "Low (under 1,000)", points: { 'FilterPixel': 2, 'Excire Foto': 1 } },
      { text: "Medium (1,000-5,000)", points: { 'Imagen AI': 2, 'Narrative Select': 1 } },
      { text: "High (5,000+)", points: { 'Aftershoot': 2, 'Photo Mechanic': 1 } }
    ]
  },
  {
    id: 'matters',
    question: "What matters most to you?",
    options: [
      { text: "Lowest cost", points: { 'FilterPixel': 3 } },
      { text: "Best editing quality", points: { 'Imagen AI': 3, 'Evoto': 2 } },
      { text: "Keeping creative control", points: { 'Narrative Select': 3, 'Photo Mechanic': 2 } },
      { text: "All-in-one workflow", points: { 'Aftershoot': 3 } }
    ]
  },
  {
    id: 'offline',
    question: "Do you need to work offline?",
    options: [
      { text: "Yes, often", points: { 'Aftershoot': 2, 'Narrative Select': 2, 'Photo Mechanic': 2, 'Excire Foto': 2 } },
      { text: "Sometimes", points: { 'Imagen AI': 1 } },
      { text: "No, always have internet", points: { 'FilterPixel': 1, 'Evoto': 1 } }
    ]
  },
  {
    id: 'budget',
    question: "What's your budget preference?",
    options: [
      { text: "Free/cheap", points: { 'FilterPixel': 3 } },
      { text: "Flat monthly fee", points: { 'Aftershoot': 2, 'Narrative Select': 1 } },
      { text: "One-time purchase", points: { 'Photo Mechanic': 3, 'Excire Foto': 3 } },
      { text: "Doesn't matter", points: { 'Imagen AI': 2, 'Evoto': 1 } }
    ]
  },
  {
    id: 'task',
    question: "What's your main task?",
    options: [
      { text: "Culling only", points: { 'Narrative Select': 2, 'Photo Mechanic': 2, 'FilterPixel': 1 } },
      { text: "Culling + editing", points: { 'Aftershoot': 2, 'Imagen AI': 2 } },
      { text: "Editing + retouching", points: { 'Evoto': 3, 'Aftershoot': 1 } }
    ]
  }
];

export function CullingToolFinder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (points: Record<string, number>) => {
    const newScores = { ...scores };
    Object.entries(points).forEach(([tool, pts]) => {
      newScores[tool] = (newScores[tool] || 0) + pts;
    });
    setScores(newScores);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const getRecommendations = () => {
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const topTool = sorted.length > 0 ? sorted[0][0] as ToolName : 'Aftershoot';
    const runnerUp = sorted.length > 1 ? sorted[1][0] as ToolName : null;
    return { top: TOOLS[topTool], runnerUp: runnerUp ? TOOLS[runnerUp] : null };
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setScores({});
    setShowResults(false);
  };

  if (showResults) {
    const { top, runnerUp } = getRecommendations();
    return (
      <div className="bg-surface p-8 md:p-12 rounded-xl border border-border text-center max-w-3xl mx-auto my-12 shadow-sm">
        <p className="text-muted text-sm uppercase tracking-wide font-semibold mb-2">Your Best Match</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-ink">{top.name}</h2>
        <p className="text-lg text-ink mb-8 max-w-2xl mx-auto leading-relaxed">
          {top.reason}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link href={top.link} className="bg-accent hover:bg-accent-dark text-white font-medium py-3 px-8 rounded-lg transition-colors w-full sm:w-auto">
            {top.linkText}
          </Link>
          <button onClick={resetQuiz} className="bg-white hover:bg-gray-50 text-ink border border-border font-medium py-3 px-8 rounded-lg transition-colors w-full sm:w-auto">
            Start over
          </button>
        </div>
        
        {runnerUp && (
          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted">
              <strong>Also consider:</strong> {runnerUp.name}
            </p>
          </div>
        )}
      </div>
    );
  }

  const question = QUESTIONS[currentStep];

  return (
    <div className="bg-surface p-8 md:p-12 rounded-xl border border-border max-w-3xl mx-auto my-12 shadow-sm">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-muted">Question {currentStep + 1} of {QUESTIONS.length}</span>
          <span className="text-sm font-medium text-accent">{Math.round((currentStep / QUESTIONS.length) * 100)}%</span>
        </div>
        <div className="w-full bg-border rounded-full h-2">
          <div className="bg-accent h-2 rounded-full transition-all duration-300" style={{ width: `${(currentStep / QUESTIONS.length) * 100}%` }}></div>
        </div>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-ink text-center">
        {question.question}
      </h2>
      
      <div className="flex flex-col gap-4">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(option.points)}
            className="w-full text-left bg-white border border-border hover:border-accent hover:bg-accent-tint text-ink p-4 rounded-lg font-medium transition-colors"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}
