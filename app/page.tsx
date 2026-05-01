'use client';

import { useState } from 'react';
import AuditForm from '@/components/AuditForm';
import ScanProgress from '@/components/ScanProgress';
import ResultsDashboard from '@/components/ResultsDashboard';
import type { AuditInput, AuditResult } from '@/types/audit';

type AppState = 'idle' | 'scanning' | 'results' | 'error';

export default function Home() {
  const [state, setState] = useState<AppState>('idle');
  const [result, setResult] = useState<AuditResult | null>(null);
  const [submittedName, setSubmittedName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (data: AuditInput) => {
    setSubmittedName(data.name);
    setState('scanning');
    setErrorMsg('');

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);

      const json = await res.json();
      if (json.error) throw new Error(json.error);

      setResult(json);
      setState('results');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
      setState('error');
    }
  };

  const reset = () => {
    setState('idle');
    setResult(null);
    setErrorMsg('');
  };

  return (
    <main className="min-h-screen px-4 py-12">
      {state === 'idle' && (
        <div className="max-w-2xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-10 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-brand-cyan/10 border border-brand-cyan/20 rounded-full px-4 py-1.5 text-brand-cyan text-xs font-semibold mb-6">
              🔍 Free Digital Presence Audit
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              How does the internet<br />
              <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
                see you?
              </span>
            </h1>
            <p className="text-slate-400 text-lg max-w-lg mx-auto">
              We scan 20+ platforms, detect negative content, find copycats, and give you a real score — in under 60 seconds.
            </p>

            {/* Social proof */}
            <div className="flex flex-wrap justify-center gap-4 mt-6 mb-10">
              {['Google', 'LinkedIn', 'Facebook', 'Instagram', 'Yelp', 'Zillow', 'Reddit', '+more'].map(p => (
                <span key={p} className="text-xs text-slate-500 bg-brand-card border border-brand-border rounded-full px-3 py-1">
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Form card */}
          <div className="bg-brand-card border border-brand-border rounded-2xl p-6 sm:p-8">
            <AuditForm onSubmit={handleSubmit} loading={false} />
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-xs text-slate-600">
            <span>🔒 We don&apos;t store your data</span>
            <span>⚡ Results in under 60 seconds</span>
            <span>💳 No credit card required</span>
          </div>
        </div>
      )}

      {state === 'scanning' && (
        <div className="max-w-lg mx-auto pt-8">
          <ScanProgress name={submittedName} />
        </div>
      )}

      {state === 'results' && result && (
        <ResultsDashboard result={result} name={submittedName} onReset={reset} />
      )}

      {state === 'error' && (
        <div className="max-w-md mx-auto text-center pt-16 animate-fade-in">
          <span className="text-5xl mb-4 block">⚠️</span>
          <h2 className="text-xl font-bold text-white mb-2">Audit failed</h2>
          <p className="text-slate-400 text-sm mb-6">{errorMsg}</p>
          <button
            onClick={reset}
            className="px-6 py-3 bg-brand-card border border-brand-border rounded-lg text-white hover:border-brand-cyan transition-colors"
          >
            ← Try Again
          </button>
        </div>
      )}
    </main>
  );
}
