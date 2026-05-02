'use client';

import { useState } from 'react';
import type { Verdict } from '@/types/audit';
import { getVerdictColor } from '@/lib/utils';

interface Props {
  verdict: Verdict;
  score: number;
  name: string;
  sessionId?: string;
}

export default function CTASection({ verdict, score, name, sessionId }: Props) {
  const colors = getVerdictColor(verdict);
  const [reportEmail, setReportEmail] = useState('');
  const [submittingReport, setSubmittingReport] = useState(false);

  const baseParams = new URLSearchParams({ name, score: String(score), verdict });

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportEmail) return;
    setSubmittingReport(true);
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: reportEmail, name, score, verdict, tier: 'full-report' }),
      });
    } catch { /* ignore */ }
    const p = new URLSearchParams({ email: reportEmail, name, score: String(score), verdict, ...(sessionId ? { sessionId } : {}) });
    window.open(`/full-report?${p}`, '_blank');
  };

  return (
    <div id="cta-section" className="mt-8">
      <div className={`rounded-xl border p-6 mb-8 text-center ${colors.bg} ${colors.border}`}>
        <h3 className={`text-xl font-black mb-2 ${colors.text}`}>
          {score < 40 && `${name}, your digital presence needs urgent attention.`}
          {score >= 40 && score < 65 && `${name}, you're leaving leads on the table.`}
          {score >= 65 && score < 85 && `${name}, a few fixes could put you in the top tier.`}
          {score >= 85 && `${name}, you're close to Authority Status — let's finish the job.`}
        </h3>
        <p className="text-slate-400 text-sm">
          Choose your next step — from a free basic report to a fully done-for-you digital presence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="relative rounded-xl border border-brand-border bg-brand-card p-5 flex flex-col gap-4 text-center">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Starter</div>
            <h4 className="font-bold text-white text-lg mb-1">Basic Report</h4>
            <div className="flex items-baseline gap-1 justify-center">
              <span className="text-3xl font-black text-white">Free</span>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Get your audit summary delivered to your inbox — your score, top missing platforms, and 3 quick wins.
          </p>
          <ul className="space-y-2 flex-1 text-left">
            {[
              'Basic audit summary PDF',
              'Top 3 missing platforms',
              '3 quick-win action items',
              'Monthly digital presence tips',
            ].map(f => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="text-brand-cyan mt-0.5 flex-shrink-0">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <a
            href={`/free-report?${baseParams}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-lg bg-brand-border text-white font-bold text-sm hover:bg-slate-700 transition-colors text-center block"
          >
            Get Free Report →
          </a>
        </div>

        <div className={`relative rounded-xl border p-5 flex flex-col gap-4 text-center ${
          score < 85
            ? 'border-brand-cyan bg-brand-cyan/5 shadow-lg shadow-brand-cyan/10'
            : 'border-brand-border bg-brand-card'
        }`}>
          {score < 85 && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-brand-cyan text-black text-xs font-black px-3 py-1 rounded-full whitespace-nowrap">
                RECOMMENDED FOR YOU
              </span>
            </div>
          )}
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Most Popular</div>
            <h4 className="font-bold text-white text-lg mb-1">Full Audit Report</h4>
            <div className="flex items-baseline gap-1 justify-center">
              <span className="text-3xl font-black text-white">$47</span>
              <span className="text-slate-500 text-sm">one-time</span>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Complete PDF — every platform, every finding, prioritized action checklist, and copycat alerts.
          </p>
          <ul className="space-y-2 flex-1 text-left">
            {[
              'Full platform-by-platform PDF',
              'Priority action checklist',
              'Copycat & impersonator alerts',
              'Review response templates',
              'Negative content breakdown',
            ].map(f => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="text-brand-cyan mt-0.5 flex-shrink-0">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <form onSubmit={handleReportSubmit} className="flex flex-col gap-2">
            <input
              type="email"
              value={reportEmail}
              onChange={e => setReportEmail(e.target.value)}
              placeholder="Enter your email to get started"
              required
              className="w-full px-3 py-2.5 rounded-lg bg-brand-dark border border-brand-border text-white text-sm placeholder-slate-600 focus:outline-none focus:border-brand-cyan transition-colors"
            />
            <button
              type="submit"
              disabled={submittingReport}
              className={`w-full py-3 rounded-lg font-bold text-sm transition-opacity hover:opacity-90 disabled:opacity-50 ${
                score < 85
                  ? 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white'
                  : 'bg-brand-border text-white'
              }`}
            >
              {submittingReport ? 'Processing...' : 'Get Full Report — $47 →'}
            </button>
          </form>
          <p className="text-xs text-slate-600">Secure checkout via Stripe or PayPal</p>
        </div>

        <div className={`relative rounded-xl border p-5 flex flex-col gap-4 text-center ${
          score >= 85
            ? 'border-brand-cyan bg-brand-cyan/5 shadow-lg shadow-brand-cyan/10'
            : 'border-brand-border bg-brand-card'
        }`}>
          {score >= 85 && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-brand-cyan text-black text-xs font-black px-3 py-1 rounded-full whitespace-nowrap">
                RECOMMENDED FOR YOU
              </span>
            </div>
          )}
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Premium</div>
            <h4 className="font-bold text-white text-lg mb-1">Done For You</h4>
            <div className="flex flex-col items-center gap-0.5">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white">$297</span>
                <span className="text-slate-500 text-sm">setup</span>
              </div>
              <div className="text-sm text-slate-400">
                + <span className="text-white font-semibold">$59/mo</span>
                <span className="text-slate-500 text-xs ml-1">lead automation</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            We build your entire digital presence from scratch — profiles, content, and ongoing lead automation. You close deals.
          </p>
          <ul className="space-y-2 flex-1 text-left">
            {[
              'FB, YouTube & LinkedIn created',
              'AI-generated profile content',
              'Brand kit & visual consistency',
              'Monthly lead automation',
              'Copycat protection setup',
              'Dedicated account manager',
            ].map(f => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="text-brand-cyan mt-0.5 flex-shrink-0">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <a
            href={`/done-for-you?${baseParams}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full py-3 rounded-lg font-bold text-sm transition-opacity hover:opacity-90 text-center block ${
              score >= 85
                ? 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white'
                : 'bg-brand-border text-white hover:bg-slate-700'
            }`}
          >
            Get Started →
          </a>
          <p className="text-xs text-slate-600">Cancel anytime • No long-term contract</p>
        </div>

      </div>
    </div>
  );
}
