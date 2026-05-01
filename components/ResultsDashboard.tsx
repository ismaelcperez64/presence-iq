'use client';

import { useState } from 'react';
import type { AuditResult } from '@/types/audit';
import ScoreGauge from './ScoreGauge';
import PlatformGrid from './PlatformGrid';
import NegativeContentList from './NegativeContentList';
import CopycatAlerts from './CopycatAlerts';
import RecommendationsList from './RecommendationsList';
import CTASection from './CTASection';

type Tab = 'platforms' | 'negative' | 'copycats' | 'recommendations';

interface Props {
  result: AuditResult;
  name: string;
  onReset: () => void;
}

const TABS: { key: Tab; label: string }[] = [
  { key: 'platforms', label: 'Platforms' },
  { key: 'negative', label: 'Negative Content' },
  { key: 'copycats', label: 'Copycats' },
  { key: 'recommendations', label: 'Action Plan' },
];

export default function ResultsDashboard({ result, name, onReset }: Props) {
  const [tab, setTab] = useState<Tab>('platforms');

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-white">Your Audit Results</h2>
          <p className="text-slate-400 text-sm mt-0.5">Scanned {new Date(result.scannedAt).toLocaleString()}</p>
        </div>
        <button onClick={onReset} className="text-sm text-slate-400 hover:text-white transition-colors">
          ← New Audit
        </button>
      </div>

      {/* Score hero */}
      <div className="rounded-xl border border-brand-border bg-brand-card p-6 mb-6 flex flex-col sm:flex-row items-center gap-6">
        <ScoreGauge score={result.overallScore} verdict={result.verdict} />
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-lg font-bold text-white mb-2">Overall Digital Presence</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{result.summary}</p>
          <div className="flex flex-wrap gap-3 mt-4 justify-center sm:justify-start">
            <Stat label="Platforms Found" value={result.platforms.filter(p => p.found).length} total={result.platforms.length} />
            <Stat label="Issues Found" value={result.negativeContent.length} alert={result.negativeContent.length > 0} />
            <Stat label="Copycats" value={result.copycats.length} alert={result.copycats.length > 0} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-brand-card rounded-lg p-1 mb-6 border border-brand-border">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-semibold transition-all ${
              tab === t.key ? 'bg-brand-border text-white' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="animate-slide-up">
        {tab === 'platforms'       && <PlatformGrid platforms={result.platforms} />}
        {tab === 'negative'        && <NegativeContentList items={result.negativeContent} />}
        {tab === 'copycats'        && <CopycatAlerts items={result.copycats} />}
        {tab === 'recommendations' && <RecommendationsList items={result.recommendations} />}
      </div>

      {/* CTA */}
      <CTASection verdict={result.verdict} score={result.overallScore} name={name} />
    </div>
  );
}

function Stat({ label, value, total, alert }: { label: string; value: number; total?: number; alert?: boolean }) {
  return (
    <div className="bg-brand-border/50 rounded-lg px-3 py-2 text-center">
      <div className={`text-xl font-black ${alert && value > 0 ? 'text-red-400' : 'text-white'}`}>
        {total !== undefined ? `${value}/${total}` : value}
      </div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}
