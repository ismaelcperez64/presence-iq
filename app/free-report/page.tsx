'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function FreeReportContent() {
  const params = useSearchParams();
  const name = params.get('name') || '';
  const score = Number(params.get('score') || 0);
  const verdict = params.get('verdict') || '';

  const [firstName, setFirstName] = useState(name.split(' ')[0] || '');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: firstName || name, score, verdict, tier: 'free-report' }),
      });
    } catch { /* ignore */ }
    setSubmitted(true);
    setSubmitting(false);
  };

  const scoreLabel = score > 0
    ? `Your score: ${score}/100 — ${verdict}`
    : null;

  return (
    <main className="min-h-screen bg-brand-dark px-4 py-12">
      <div className="max-w-xl mx-auto">

        <div className="text-center mb-10">
          <a href="/" className="inline-flex items-center gap-2 text-brand-cyan font-black text-lg tracking-tight">
            <span className="text-2xl">🔍</span> PresenceIQ
          </a>
        </div>

        {submitted ? (
          <div className="text-center animate-fade-in">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-3xl font-black text-white mb-3">Check your inbox!</h1>
            <p className="text-slate-400 mb-8">
              Your free Basic Report is on its way to <span className="text-white font-semibold">{email}</span>.
              It usually arrives within 2 minutes.
            </p>

            <div className="rounded-xl border border-brand-cyan/30 bg-brand-cyan/5 p-6 text-left">
              <p className="text-xs font-semibold text-brand-cyan uppercase tracking-wider mb-2">Want the full picture?</p>
              <h2 className="text-xl font-black text-white mb-2">Upgrade to the Full Audit Report — $47</h2>
              <p className="text-slate-400 text-sm mb-4">
                Your free report covers the basics. The Full Report gives you every platform broken down,
                copycat alerts, negative content analysis, and a prioritized action checklist you can act on today.
              </p>
              <a
                href={`/full-report?email=${encodeURIComponent(email)}&name=${encodeURIComponent(firstName || name)}&score=${score}&verdict=${encodeURIComponent(verdict)}`}
                className="inline-block w-full py-3 rounded-lg bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-bold text-sm text-center hover:opacity-90 transition-opacity"
              >
                Yes, I want the Full Report — $47 →
              </a>
              <p className="text-center text-xs text-slate-600 mt-2">One-time payment • Instant access</p>
            </div>

            <a href="/" className="block mt-6 text-sm text-slate-600 hover:text-slate-400 transition-colors">
              ← Back to audit
            </a>
          </div>
        ) : (
          <>
            <div className="text-center mb-8 animate-fade-in">
              {scoreLabel && (
                <div className="inline-flex items-center gap-2 bg-brand-cyan/10 border border-brand-cyan/20 rounded-full px-4 py-1.5 text-brand-cyan text-xs font-semibold mb-4">
                  {scoreLabel}
                </div>
              )}
              <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">
                Get Your Free<br />
                <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
                  Digital Presence Report
                </span>
              </h1>
              <p className="text-slate-400 text-base">
                We&apos;ll send your personalized audit summary straight to your inbox — free, no credit card needed.
              </p>
            </div>

            <div className="rounded-xl border border-brand-border bg-brand-card p-5 mb-6">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">What&apos;s inside your free report</p>
              <ul className="space-y-3">
                {[
                  ['📊', 'Your overall digital presence score', 'Benchmarked against top professionals in your field'],
                  ['🔍', 'Top 3 missing platforms', 'The exact platforms costing you leads right now'],
                  ['⚡', '3 quick-win action items', 'Things you can fix in under an hour to boost your score'],
                  ['📬', 'Monthly digital tips', 'Strategies to grow your online authority over time'],
                ].map(([icon, title, desc]) => (
                  <li key={title} className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
                    <div>
                      <p className="text-white text-sm font-semibold">{title}</p>
                      <p className="text-slate-500 text-xs">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-brand-border bg-brand-card p-6">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">First Name</label>
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Jane"
                      className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Email <span className="text-red-400">*</span></label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@example.com" required
                      className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan transition-colors text-sm" />
                  </div>
                </div>
                <button type="submit" disabled={submitting}
                  className="w-full py-4 rounded-lg font-bold text-base bg-gradient-to-r from-brand-blue to-brand-cyan text-white hover:opacity-90 transition-opacity disabled:opacity-50">
                  {submitting ? 'Sending...' : 'Send My Free Report →'}
                </button>
                <p className="text-center text-xs text-slate-600">🔒 No spam. Unsubscribe anytime.</p>
              </form>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-6 text-xs text-slate-600">
              <span>🔒 We don&apos;t store your data</span>
              <span>📬 Delivered in under 2 minutes</span>
              <span>💳 No credit card required</span>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default function FreeReportPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-dark flex items-center justify-center"><div className="text-slate-400">Loading...</div></div>}>
      <FreeReportContent />
    </Suspense>
  );
}
