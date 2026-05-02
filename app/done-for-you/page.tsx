'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const INCLUDED = [
  { icon: '📘', title: 'Facebook Business Page', desc: 'Fully branded page with cover, about, and first 4 posts written and scheduled' },
  { icon: '▶️', title: 'YouTube Channel', desc: 'Channel art, about section, playlist structure, and intro video script' },
  { icon: '💼', title: 'LinkedIn Profile', desc: 'Headline, summary, experience, skills, and connection outreach message' },
  { icon: '🤖', title: 'Monthly Lead Automation', desc: 'AI-powered posting schedule and lead capture sequences — runs on autopilot' },
  { icon: '🎨', title: 'Brand Kit', desc: 'Color palette, fonts, logo usage guide, and profile photo optimization' },
  { icon: '🔍', title: 'SEO Optimization', desc: 'All profiles keyword-optimized to rank when clients search your name' },
  { icon: '🛡️', title: 'Copycat Protection', desc: 'Monitoring alerts if anyone creates accounts impersonating your brand' },
  { icon: '👤', title: 'Dedicated Account Manager', desc: 'One person who knows your brand, answers questions, and handles updates' },
];

const STEPS = [
  { num: '01', title: 'We Review Your Audit', desc: "Your PresenceIQ results tell us exactly what's missing and what needs fixing." },
  { num: '02', title: 'We Build Everything', desc: 'Your team creates, optimizes, and publishes all your profiles within 5 business days.' },
  { num: '03', title: 'We Automate Your Leads', desc: 'Monthly automation runs in the background — driving traffic while you close deals.' },
];

const FAQS = [
  { q: 'What platforms do you build?', a: 'Facebook Business Page, YouTube Channel, and LinkedIn Profile are included in every Done For You package. Additional platforms (Instagram, TikTok, Google Business) can be added on request.' },
  { q: 'How long does setup take?', a: "Your profiles are built and live within 5 business days. You'll receive a walkthrough and handoff call when everything is ready." },
  { q: 'What does the $59/month include?', a: 'Monthly content scheduling (4 posts per platform), lead capture automation maintenance, performance reporting, and ongoing copycat monitoring. Cancel anytime.' },
  { q: 'Do I need to create content?', a: 'No. We write all your profile content using AI trained on your profession, location, and brand. You review and approve before anything goes live.' },
  { q: "What if I'm not satisfied?", a: "We offer a 30-day satisfaction guarantee. If your profiles aren't live and looking great within 30 days, we'll refund your setup fee — no questions asked." },
];

function DoneForYouContent() {
  const params = useSearchParams();
  const name = params.get('name') || '';
  const score = Number(params.get('score') || 0);
  const verdict = params.get('verdict') || '';

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderEmail, setOrderEmail] = useState('');
  const [orderName, setOrderName] = useState(name);
  const [ordering, setOrdering] = useState(false);
  const [ordered, setOrdered] = useState(false);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrdering(true);
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: orderEmail, name: orderName, score, verdict, tier: 'done-for-you' }),
      });
    } catch { /* ignore */ }
    // TODO: redirect to Stripe/PayPal
    // window.location.href = `https://buy.stripe.com/placeholder-dfy?prefilled_email=${encodeURIComponent(orderEmail)}`;
    setOrdered(true);
    setOrdering(false);
  };

  const verdictColor =
    verdict === 'Authority Status' ? 'text-cyan-400' :
    verdict === 'Building Momentum' ? 'text-green-400' :
    verdict === 'Needs Work' ? 'text-yellow-400' : 'text-red-400';

  return (
    <main className="min-h-screen bg-brand-dark">

      <section className="px-4 pt-12 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8">
            <a href="/" className="inline-flex items-center gap-2 text-brand-cyan font-black text-lg tracking-tight">
              <span className="text-2xl">🔍</span> PresenceIQ
            </a>
          </div>

          {score > 0 && (
            <div className={`inline-flex items-center gap-2 bg-brand-card border border-brand-border rounded-full px-4 py-1.5 text-xs font-semibold mb-6 ${verdictColor}`}>
              {name ? `${name} — ` : ''}Score: {score}/100 — {verdict}
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
            We Build Your Entire<br />
            <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">Digital Presence</span><br />
            From Scratch.
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
            While you focus on closing deals — we create, optimize, and automate your Facebook, YouTube, and LinkedIn. Powered by AI. Managed by humans.
          </p>

          <div className="inline-flex flex-col items-center gap-1 mb-8">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-white">$297</span>
              <span className="text-slate-400">one-time setup</span>
            </div>
            <div className="text-slate-400 text-lg">+ <span className="text-white font-bold">$59/mo</span><span className="text-slate-500 text-sm ml-1">lead automation</span></div>
          </div>

          <button onClick={() => setShowOrderModal(true)}
            className="px-10 py-4 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-brand-cyan/20">
            Get Started Today →
          </button>
          <p className="text-xs text-slate-600 mt-3">Cancel monthly anytime • 30-day satisfaction guarantee</p>
        </div>

        <div className="max-w-3xl mx-auto mt-12">
          <div className="rounded-2xl border border-brand-border bg-brand-card overflow-hidden aspect-video flex items-center justify-center">
            <div className="text-center p-8">
              <div className="text-6xl mb-4">▶️</div>
              <p className="text-white font-bold text-lg mb-2">Watch: How PresenceIQ Done For You Works</p>
              <p className="text-slate-500 text-sm">Video walkthrough coming soon</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 bg-brand-card/50 border-y border-brand-border">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-brand-cyan uppercase tracking-wider mb-2">Everything we handle for you</p>
            <h2 className="text-3xl font-black text-white">Your complete brand infrastructure</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INCLUDED.map(({ icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-brand-border bg-brand-card p-4 flex gap-3">
                <span className="text-2xl flex-shrink-0">{icon}</span>
                <div>
                  <p className="text-white text-sm font-semibold mb-0.5">{title}</p>
                  <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-brand-cyan uppercase tracking-wider mb-2">Simple 3-step process</p>
            <h2 className="text-3xl font-black text-white">You&apos;re live in 5 days</h2>
          </div>
          <div className="space-y-4">
            {STEPS.map(({ num, title, desc }) => (
              <div key={num} className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center">
                  <span className="text-brand-cyan font-black text-sm">{num}</span>
                </div>
                <div className="pt-1">
                  <p className="text-white font-bold mb-1">{title}</p>
                  <p className="text-slate-400 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 bg-brand-card/50 border-y border-brand-border">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-2">Ready to own your digital presence?</h2>
          <p className="text-slate-400 mb-8">Join professionals who stopped losing leads to competitors with better profiles.</p>
          <div className="rounded-2xl border border-brand-cyan/30 bg-brand-dark p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="text-left">
                <p className="text-slate-400 text-sm">Done For You Package</p>
                <p className="text-white font-bold">Complete profile creation + automation</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-white">$297</p>
                <p className="text-xs text-slate-500">setup + $59/mo</p>
              </div>
            </div>
            <ul className="space-y-2 mb-6 text-left">
              {['FB, YouTube & LinkedIn built', 'AI content for every profile', 'Monthly automation included', '30-day guarantee'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="text-brand-cyan">✓</span> {f}
                </li>
              ))}
            </ul>
            <button onClick={() => setShowOrderModal(true)}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-bold text-base hover:opacity-90">
              Get Started — $297 Setup →
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="rounded-xl border border-brand-border bg-brand-card overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-brand-border/20 transition-colors">
                  <span className="text-white font-semibold text-sm">{faq.q}</span>
                  <span className="text-slate-400 text-sm flex-shrink-0 ml-3">{openFaq === i ? '▲' : '▼'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-slate-400 text-sm leading-relaxed border-t border-brand-border pt-3">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 text-center border-t border-brand-border">
        <div className="max-w-md mx-auto">
          <div className="text-5xl mb-4">🛡️</div>
          <h3 className="text-xl font-black text-white mb-2">30-Day Satisfaction Guarantee</h3>
          <p className="text-slate-400 text-sm">If your profiles aren&apos;t live and looking great within 30 days, we&apos;ll refund your setup fee in full. No questions asked.</p>
        </div>
        <a href="/" className="block mt-8 text-sm text-slate-600 hover:text-slate-400 transition-colors">← Back to audit</a>
      </section>

      {showOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-brand-card border border-brand-border rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl">
            {ordered ? (
              <div className="text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h2 className="text-2xl font-black text-white mb-2">You&apos;re on the list!</h2>
                <p className="text-slate-400 text-sm mb-6">We&apos;ll reach out within 24 hours. Check your inbox at <span className="text-white font-semibold">{orderEmail}</span>.</p>
                <button onClick={() => { setShowOrderModal(false); setOrdered(false); }}
                  className="px-6 py-3 rounded-lg bg-brand-border text-white font-bold text-sm hover:bg-slate-700">Close</button>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-xl font-black text-white mb-1">Get Started Today</h2>
                  <p className="text-slate-400 text-sm">$297 setup + $59/mo • 5 business days to go live</p>
                </div>
                <form onSubmit={handleOrder} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Full Name</label>
                    <input type="text" value={orderName} onChange={e => setOrderName(e.target.value)} placeholder="Jane Smith"
                      className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Email <span className="text-red-400">*</span></label>
                    <input type="email" value={orderEmail} onChange={e => setOrderEmail(e.target.value)} placeholder="jane@example.com" required
                      className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan text-sm" />
                  </div>
                  <button type="submit" disabled={ordering}
                    className="w-full py-4 rounded-lg bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-bold text-base hover:opacity-90 disabled:opacity-50">
                    {ordering ? 'Processing...' : 'Proceed to Checkout →'}
                  </button>
                  <p className="text-center text-xs text-slate-600">🔒 Secure checkout via Stripe or PayPal</p>
                </form>
                <button onClick={() => setShowOrderModal(false)}
                  className="w-full mt-2 py-2 text-sm text-slate-600 hover:text-slate-400">Cancel</button>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default function DoneForYouPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-dark flex items-center justify-center"><div className="text-slate-400">Loading...</div></div>}>
      <DoneForYouContent />
    </Suspense>
  );
}
