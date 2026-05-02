'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const FEATURES = [
  { icon: '🗺️', title: 'Platform-by-Platform Breakdown', desc: '18+ platforms scored, with exact URLs and optimization notes' },
  { icon: '⚠️', title: 'Negative Content Analysis', desc: 'Every complaint, bad review, and derogatory mention found' },
  { icon: '👥', title: 'Copycat & Impersonator Alerts', desc: 'Anyone using your name or brand online — with risk ratings' },
  { icon: '✅', title: 'Priority Action Checklist', desc: 'Ranked from immediate to low — know exactly what to fix first' },
  { icon: '💬', title: 'Review Response Templates', desc: 'Word-for-word scripts to respond to negative reviews professionally' },
  { icon: '📈', title: 'Score Improvement Roadmap', desc: 'How to go from your current score to Authority Status' },
];

function FullReportContent() {
  const params = useSearchParams();
  const name = params.get('name') || '';
  const score = Number(params.get('score') || 0);
  const verdict = params.get('verdict') || '';
  const prefillEmail = params.get('email') || '';

  const [showUpsell, setShowUpsell] = useState(false);
  const [checkoutStarted, setCheckoutStarted] = useState(false);
  const [email] = useState(prefillEmail);

  const handlePurchase = () => {
    setShowUpsell(true);
  };

  const goToPayment = (includeDFY: boolean) => {
    const base = includeDFY
      ? 'https://buy.stripe.com/test_4gMaEW58qb274YfgKK9ws00'
      : 'https://buy.stripe.com/test_8x214m6cub274Yf2TU9ws01';
    const paymentUrl = `${base}?prefilled_email=${encodeURIComponent(email)}&client_reference_id=${encodeURIComponent(name)}`;
    window.open(paymentUrl, '_blank');
    setShowUpsell(false);
    setCheckoutStarted(true);
  };

  const verdictColor =
    verdict === 'Authority Status' ? 'text-cyan-400' :
    verdict === 'Building Momentum' ? 'text-green-400' :
    verdict === 'Needs Work' ? 'text-yellow-400' : 'text-red-400';

  return (
    <main className="min-h-screen bg-brand-dark px-4 py-12">
      <div className="max-w-2xl mx-auto">

        {/* Logo */}
        <div className="text-center mb-10">
          <a href="/" className="inline-flex items-center gap-2 text-brand-cyan font-black text-lg tracking-tight">
            <span className="text-2xl">🔍</span> PresenceIQ
          </a>
        </div>

        {/* Hero */}
        <div className="text-center mb-8 animate-fade-in">
          {score > 0 && (
            <div className={`inline-flex items-center gap-2 bg-brand-card border border-brand-border rounded-full px-4 py-1.5 text-xs font-semibold mb-4 ${verdictColor}`}>
              Your score: {score}/100 — {verdict}
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">
            Your Complete Digital<br />
            <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
              Presence Report
            </span>
          </h1>
          <p className="text-slate-400">
            Everything the audit found — documented, scored, and prioritized into one actionable PDF.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {FEATURES.map(({ icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-brand-border bg-brand-card p-4 flex gap-3">
              <span className="text-2xl flex-shrink-0">{icon}</span>
              <div>
                <p className="text-white text-sm font-semibold mb-0.5">{title}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout-started banner */}
        {checkoutStarted && (
          <div className="rounded-2xl border border-brand-cyan/40 bg-brand-cyan/5 p-5 mb-6 text-center animate-fade-in">
            <p className="text-2xl mb-2">🎉</p>
            <p className="text-white font-bold mb-1">Checkout opened in a new tab</p>
            <p className="text-slate-400 text-sm">Complete your payment there — your report will be emailed as soon as it's confirmed.</p>
          </div>
        )}

        {/* Order box */}
        <div className={`rounded-2xl border border-brand-cyan/30 bg-brand-cyan/5 p-6 mb-6 transition-opacity ${checkoutStarted ? 'opacity-40 pointer-events-none' : ''}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">One-time payment</p>
              <p className="text-white font-bold text-lg">Full Digital Presence Report</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-white">$47</p>
              <p className="text-xs text-slate-500">one-time</p>
            </div>
          </div>

          {email ? (
            <div className="mb-4 px-3 py-2 rounded-lg bg-brand-card border border-brand-border text-sm text-slate-400">
              📧 Report will be sent to: <span className="text-white font-semibold">{email}</span>
            </div>
          ) : null}

          <button
            onClick={handlePurchase}
            className="w-full py-4 rounded-lg bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-bold text-base hover:opacity-90 transition-opacity"
          >
            Complete Purchase — $47 →
          </button>
          <p className="text-center text-xs text-slate-600 mt-2">
            🔒 Secure checkout via Stripe • Instant delivery
          </p>
        </div>

        {/* Trust row */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-600">
          <span>💳 Stripe accepted</span>
          <span>📬 Delivered instantly to your email</span>
          <span>🔒 100% money-back guarantee</span>
        </div>

        <a href="/" className="block mt-8 text-center text-sm text-slate-600 hover:text-slate-400 transition-colors">
          ← Back to audit
        </a>
      </div>

      {/* ── Upsell Modal ── */}
      {showUpsell && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-brand-card border border-brand-border rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl">

            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🚀</div>
              <p className="text-xs font-semibold text-brand-cyan uppercase tracking-wider mb-1">One-time offer</p>
              <h2 className="text-2xl font-black text-white mb-2">
                Skip the DIY — Let Us Build It For You
              </h2>
              <p className="text-slate-400 text-sm">
                Add our <strong className="text-white">Done For You</strong> service and we&apos;ll build your entire
                digital presence from scratch — Facebook, YouTube, LinkedIn, and monthly lead automation.
              </p>
            </div>

            {/* Comparison */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="rounded-lg border border-brand-border bg-brand-dark p-3 text-center">
                <p className="text-xs text-slate-500 mb-1">Full Report only</p>
                <p className="text-xl font-black text-white">$47</p>
                <p className="text-xs text-slate-500">You do the work</p>
              </div>
              <div className="rounded-lg border border-brand-cyan/40 bg-brand-cyan/5 p-3 text-center">
                <p className="text-xs text-brand-cyan mb-1">Report + Done For You</p>
                <p className="text-xl font-black text-white">$297<span className="text-sm font-normal text-slate-400"> + $59/mo</span></p>
                <p className="text-xs text-slate-500">We do the work</p>
              </div>
            </div>

            <ul className="space-y-2 mb-6">
              {[
                'Everything in the Full Report',
                'FB, YouTube & LinkedIn profiles created',
                'AI-generated profile content',
                'Monthly lead automation system',
                'Dedicated account manager',
              ].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="text-brand-cyan flex-shrink-0">✓</span> {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => goToPayment(true)}
              className="w-full py-3.5 rounded-lg bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-bold text-sm hover:opacity-90 transition-opacity mb-2"
            >
              Yes! Add Done For You — $297 setup + $59/mo →
            </button>
            <button
              onClick={() => goToPayment(false)}
              className="w-full py-2 text-sm text-slate-500 hover:text-slate-300 transition-colors"
            >
              No thanks, just the $47 report
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default function FullReportPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-dark flex items-center justify-center"><div className="text-slate-400">Loading...</div></div>}>
      <FullReportContent />
    </Suspense>
  );
}
