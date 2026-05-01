'use client';

import { getVerdictColor } from '@/lib/utils';
import type { Verdict } from '@/types/audit';

interface Props {
  score: number;
  verdict: Verdict;
  onVerdictClick?: () => void;
}

export default function ScoreGauge({ score, verdict, onVerdictClick }: Props) {
  const colors = getVerdictColor(verdict);
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-40 h-40">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#1e1e32" strokeWidth="10" />
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke={colors.hex}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
            style={{ filter: `drop-shadow(0 0 8px ${colors.hex}60)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-black ${colors.text}`}>{score}</span>
          <span className="text-xs text-slate-500 font-medium">/ 100</span>
        </div>
      </div>

      {onVerdictClick ? (
        <button
          onClick={onVerdictClick}
          className={`px-4 py-1.5 rounded-full border text-sm font-bold transition-all hover:opacity-80 hover:scale-105 flex items-center gap-1.5 ${colors.text} ${colors.bg} ${colors.border}`}
          title="Click to learn about your score"
        >
          {verdict}
          <span className="text-xs opacity-60">ⓘ</span>
        </button>
      ) : (
        <div className={`px-4 py-1.5 rounded-full border text-sm font-bold ${colors.text} ${colors.bg} ${colors.border}`}>
          {verdict}
        </div>
      )}
    </div>
  );
}
