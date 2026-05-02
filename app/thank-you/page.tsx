'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ThankYouContent() {
  const params = useSearchParams();
  const product = params.get('product') || 'report';
  const email = params.get('email') || '';

  const isDFY = product === 'dfy';

  return (
    <main className="min-h-screen bg-brand-dark flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center animate-fade-in">

        {/* Logo */}
        <div className="mb-10">
          <a href="/" className="inline-flex items-center gap-2 text-brand-cyan font-black text-lg tracking-tight">
            <span className="text-2xl">🔍</span> PresenceIQ
          </a>
        </div>

        {/* Checkmark */}
        <div className="w-20 h-20 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
          {isDFY ? "You're all set!" : 'Purchase confirmed!'}
        </h1>

        <p className="text-slate-400 mb-8 leading-relaxed">
          {isDFY
            ? 'Welcome to Done For You. Your account manager will reach out within 1 business day to kick things off.'
            : 'Your Full Digital Presence Report is being prepared. Check your email — it\'ll arrive within a few minutes.'}
        </p>

        {email && (
          <div className="mb-8 px-4 py-3 rounded-xl bg-brand-card border border-brand-border text-sm text-slate-400">
            📧 Sent to: <span className="text-white font-semibold">{email}</span>
          </div>
        )}

        {/* What to expect */}
        <div className="rounded-2xl border border-brand-border bg-brand-card p-6 mb-8 text-left">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
            What happens next
          </p>
          <ul className="space-y-3">
            {(isDFY ? [
              { icon: '📬', text: 'Confirmation email sent to your inbox' },
              { icon: '📞', text: 'Account manager calls within 1 business day' },
              { icon: '🔨', text: 'Profile build starts — FB, YouTube & LinkedIn' },
              { icon: '🤖', text: 'Lead automation goes live within 5–7 business days' },
            ] : [
              { icon: '📬', text: 'Check your inbox — report arrives in minutes' },
              { icon: '📄', text: 'PDF includes scores, platform breakdowns, and action steps' },
              { icon: '✅', text: 'Work through the Priority Action Checklist first' },
              { icon: '📈', text: 'Follow the Score Improvement Roadmap to hit Authority Status' },
            ]).map(({ icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm text-slate-300">
                <span className="flex-shrink-0 text-base">{icon}</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="/"
            className="flex-1 py-3 rounded-lg bg-brand-card border border-brand-border text-white text-sm font-semibold hover:border-brand-cyan transition-colors text-center"
          >
            ← Run another audit
          </a>
          {!isDFY && (
            <a
              href={`/done-for-you`}
              className="flex-1 py-3 rounded-lg bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-sm font-bold hover:opacity-90 transition-opacity text-center"
            >
              Let us do it for you →
            </a>
          )}
        </div>

        <p className="mt-8 text-xs text-slate-600">
          Questions? Email us at{' '}
          <a href="mailto:support@presenceiq.com" className="text-slate-500 hover:text-slate-300 transition-colors">
            support@presenceiq.com
          </a>
        </p>

      </div>
    </main>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
