'use client';

import { useState } from 'react';

export default function VideoCTA() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChecklist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSending(true);
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tier: 'checklist' }),
      });
    } catch { /* ignore */ }
    setSent(true);
    setSending(false);
  };

  return (
    <div className="grid grid-cols-2 gap-3 mt-4">

      {/* Left: Free Checklist */}
      <div className="rounded-xl border border-brand-border bg-brand-card p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">📋</span>
          <div>
            <p className="text-white text-xs font-bold leading-tight">Free Presence Checklist</p>
            <p className="text-slate-500 text-[10px]">20 platforms · one page · free</p>
          </div>
        </div>

        {sent ? (
          <div className="text-[11px] text-green-400 font-semibold bg-green-400/10 border border-green-400/20 rounded-lg px-3 py-2 text-center">
            ✓ Check your inbox!
          </div>
        ) : (
          <form onSubmit={handleChecklist} className="flex flex-col gap-1.5">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full bg-brand-dark border border-brand-border rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan transition-colors text-[11px]"
            />
            <button
              type="submit"
              disabled={sending}
              className="w-full py-2 rounded-lg bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-bold text-[11px] hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {sending ? 'Sending...' : 'Send It Free →'}
            </button>
          </form>
        )}
      </div>

      {/* Right: Join Community */}
      <div className="rounded-xl border border-brand-border bg-brand-card p-4 flex flex-col gap-2 justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">👥</span>
          <div>
            <p className="text-white text-xs font-bold leading-tight">Service By Serving</p>
            <p className="text-slate-500 text-[10px]">Our professional community</p>
          </div>
        </div>
        <p className="text-slate-400 text-[10px] leading-relaxed">
          Join professionals building trust, authority, and leads through service.
        </p>
        <a
          href="https://servicebyserving.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 rounded-lg border border-brand-cyan/30 text-brand-cyan font-bold text-[11px] hover:bg-brand-cyan/10 transition-colors text-center block"
        >
          Join Free →
        </a>
      </div>

    </div>
  );
}
