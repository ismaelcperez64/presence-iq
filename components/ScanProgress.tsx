'use client';

import { useEffect, useState } from 'react';

const STEPS = [
  { label: 'Searching Google presence...', icon: '🔍' },
  { label: 'Scanning social platforms...', icon: '📱' },
  { label: 'Checking reviews & ratings...', icon: '⭐' },
  { label: 'Detecting negative content...', icon: '⚠️' },
  { label: 'Looking for copycats & impersonators...', icon: '🕵️' },
  { label: 'Running AI analysis...', icon: '🧠' },
  { label: 'Generating your report...', icon: '📊' },
];

interface Props {
  name: string;
}

export default function ScanProgress({ name }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    const timings = [0, 4000, 10000, 18000, 26000, 34000, 45000];
    const timers = timings.map((delay, i) =>
      setTimeout(() => {
        setActiveStep(i);
        if (i > 0) setCompletedSteps(prev => [...prev, i - 1]);
      }, delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto animate-fade-in">
      <div className="text-center mb-10">
        <div className="relative inline-block mb-4">
          <div className="w-20 h-20 rounded-full border-2 border-brand-cyan/30 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-2 border-t-brand-cyan border-r-brand-cyan border-b-transparent border-l-transparent animate-spin" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-2xl">
            {STEPS[activeStep]?.icon}
          </div>
        </div>
        <h2 className="text-xl font-bold text-white mb-1">
          Auditing <span className="text-brand-cyan">{name}</span>
        </h2>
        <p className="text-slate-400 text-sm">Scanning across 20+ sources on the web</p>
      </div>

      <div className="space-y-3">
        {STEPS.map((step, i) => {
          const isDone = completedSteps.includes(i);
          const isActive = activeStep === i;
          const isPending = !isDone && !isActive;

          return (
            <div
              key={i}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-500 ${
                isDone
                  ? 'border-green-400/20 bg-green-400/5'
                  : isActive
                  ? 'border-brand-cyan/40 bg-brand-cyan/5'
                  : 'border-brand-border bg-brand-card/50 opacity-40'
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                isDone ? 'bg-green-400 text-black' : isActive ? 'bg-brand-cyan text-black animate-pulse' : 'bg-brand-border text-slate-500'
              }`}>
                {isDone ? '✓' : isActive ? '→' : '·'}
              </div>
              <span className={`text-sm ${isDone ? 'text-green-400' : isActive ? 'text-white' : 'text-slate-500'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs text-slate-600 mt-6">This usually takes 30–60 seconds</p>
    </div>
  );
}
