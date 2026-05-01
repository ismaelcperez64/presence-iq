'use client';

import { useState } from 'react';
import type { AuditInput } from '@/types/audit';

const PROFESSIONS = [
  'Realtor',
  'Mortgage Lender',
  'Financial Advisor',
  'Insurance Agent',
  'Attorney / Lawyer',
  'Counselor / Therapist',
  'Contractor / Builder',
  'Business Owner',
  'Other',
];

interface Props {
  onSubmit: (data: AuditInput) => void;
  loading: boolean;
}

export default function AuditForm({ onSubmit, loading }: Props) {
  const [form, setForm] = useState<AuditInput>({
    name: '',
    businessName: '',
    profession: '',
    location: '',
    website: '',
  });

  const set = (field: keyof AuditInput) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.businessName || !form.profession) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={set('name')}
            placeholder="Jane Smith"
            required
            className="w-full bg-brand-card border border-brand-border rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Business Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={form.businessName}
            onChange={set('businessName')}
            placeholder="Smith Realty Group"
            required
            className="w-full bg-brand-card border border-brand-border rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
          Profession <span className="text-red-400">*</span>
        </label>
        <select
          value={form.profession}
          onChange={set('profession')}
          required
          className="w-full bg-brand-card border border-brand-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors appearance-none"
        >
          <option value="" disabled>Select your profession...</option>
          {PROFESSIONS.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            City / State <span className="text-slate-600">(optional)</span>
          </label>
          <input
            type="text"
            value={form.location}
            onChange={set('location')}
            placeholder="Miami, FL"
            className="w-full bg-brand-card border border-brand-border rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Website <span className="text-slate-600">(optional)</span>
          </label>
          <input
            type="text"
            value={form.website}
            onChange={set('website')}
            placeholder="yoursite.com"
            className="w-full bg-brand-card border border-brand-border rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan transition-colors"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !form.name || !form.businessName || !form.profession}
        className="w-full py-4 rounded-lg font-bold text-lg tracking-wide bg-gradient-to-r from-brand-blue to-brand-cyan text-white disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity mt-2"
      >
        {loading ? 'Scanning...' : 'Run My Free Audit →'}
      </button>

      <p className="text-center text-xs text-slate-600">
        Takes 30–60 seconds • No credit card required
      </p>
    </form>
  );
}
