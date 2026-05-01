'use client';

import { useState } from 'react';
import type { Verdict } from '@/types/audit';
import { getVerdictColor } from '@/lib/utils';

interface Props {
  verdict: Verdict;
  score: number;
  name: string;
}

export default function CTASection({ verdict, score, name }: Props) {
  const colors = getVerdictColor(verdict);
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const [joining, setJoining] = useState(false);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setJoining(true);
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, score, verdict }),
      });
    } catch { /* ignore */ }
    setJoined(true);
    setJoining(false);
  };

  return (
    <div id="cta-section" className="mt-8">
      {/* Personalized headline */}
      <div className={`rounded-xl border p-6 mb-8 text-center ${colors.bg} ${colors.border}`}>
        <h3 className={`text-xl font-black mb-2 ${colors.text}`}>
          {score < 40 && `${name}, your digital presence needs urgent attention.`}
          {score >= 40 && score < 65 && `${name}, you're leaving leads on the table.`}
          {score >= 65 && score < 85 && `${name}, a few fixes could put you in the top tier.`}
          {score >= 85 && `${name}, you're close to Authority Status — let's finish the job.`}
        </h3>
        <p className="text-slate-400 text-sm">
          Choose your next step — from free community access to fully done-for-you profile creation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Tier 0 — Free: Community */}
        <div className="relative rounded-xl border border-brand-border bg-brand-card p-5 flex flex-col gap-4 text-center">
          <div>
            <h4 className="font-bold text-white mb-1">Community Access</h4>
            <div className="flex items-baseline gap-1 justify-center">
              <span className="text-3xl font-black text-white">Free</span>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Join our Service by Serving community. Get your audit summary delivered to your inbox plus monthly digital presence tips.
          </p>
          <ul className="space-y-2 flex-1 text-left">
            {[
              'Basic audit summary report',
              'Monthly digital tips newsletter',
              'Community resources & guides',
              'Early access to new tools',
            ].map(f => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="text-brand-cyan mt-0.5 flex-shrink-0">✓</span>
                {f}
              </li>
            ))}
          </ul>
          {joined ? (
            <div className="py-3 rounded-lg bg-green-400/10 border border-green-400/30 text-green-400 text-sm font-semibold text-center">
              🎉 You&apos;re in! Check your inbox.
            </div>
          ) : (
            <form onSubmit={handleJoin} className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-3 py-2.5 rounded-lg bg-brand-dark border border-brand-border text-white text-sm placeholder-slate-600 focus:outline-none focus:border-brand-cyan transition-colors"
              />
              <button
                type="submit"
                disabled={joining}
                className="w-full py-3 rounded-lg bg-brand-border text-white font-bold text-sm hover:bg-brand-border/80 transition-all disabled:opacity-50"
              >
                {joining ? 'Joining...' : 'Join Free →'}
              </button>
            </form>
          )}
        </div>

        {/* Tier 1 — $47: Full Audit Report */}
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
            <h4 className="font-bold text-white mb-1">Full Audit Report</h4>
            <div className="flex items-baseline gap-1 justify-center">
              <span className="text-3xl font-black text-white">$47</span>
              <span className="text-slate-500 text-sm">one-time</span>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Complete PDF report with every finding, platform-by-platform breakdown, and a prioritized action checklist you can act on today.
          </p>
          <ul className="space-y-2 flex-1 text-left">
            {[
              'Detailed PDF audit report',
              'Platform-by-platform analysis',
              'Priority action checklist',
              'Copycat monitoring alerts',
              'Review response templates',
            ].map(f => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="text-brand-cyan mt-0.5 flex-shrink-0">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <button
            className={`w-full py-3 rounded-lg font-bold text-sm transition-opacity hover:opacity-90 ${
              score < 85
                ? 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white'
                : 'bg-brand-border text-white hover:bg-brand-border/80'
            }`}
          >
            Get Full Report →
          </button>
        </div>

        {/* Tier 2 — Done For You */}
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
            <h4 className="font-bold text-white mb-1">Done For You</h4>
            <div className="flex items-baseline gap-1 justify-center">
              <span className="text-3xl font-black text-white">$497</span>
              <span className="text-slate-500 text-sm">one-time</span>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            We build your complete digital presence — Facebook, YouTube, LinkedIn, and more — using AI-powered automation. You focus on clients; we handle the profiles.
          </p>
          <ul className="space-y-2 flex-1 text-left">
            {[
              'FB, YouTube & LinkedIn created',
              'AI-powered profile content',
              'Brand kit & visual consistency',
              'Profile optimization & SEO',
              'Monthly presence monitoring',
              'Copycat protection setup',
            ].map(f => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="text-brand-cyan mt-0.5 flex-shrink-0">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <button className="w-full py-3 rounded-lg bg-brand-border text-white font-bold text-sm hover:bg-brand-border/80 transition-opacity hover:opacity-90">
            Get Started →
          </button>
        </div>

      </div>
    </div>
  );
}
