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
    name: '', businessName: '', profession: '',
    location: '', website: '', socialName: '', socialHandle: '',
    linkedinUrl: '', facebookUrl: '', twitterUrl: '', youtubeUrl: '', instagramUrl: '',
  });
  const [showProfiles, setShowProfiles] = useState(false);

  const set = (field: keyof AuditInput) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.businessName || !form.profession) return;
    onSubmit(form);
  };

  const inputClass = "w-full bg-brand-card border border-brand-border rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan transition-colors text-sm";
  const knownCount = [form.linkedinUrl, form.facebookUrl, form.twitterUrl, form.youtubeUrl, form.instagramUrl].filter(Boolean).length;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input type="text" value={form.name} onChange={set('name')}
            placeholder="Jane Smith" required className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Business Name <span className="text-red-400">*</span>
          </label>
          <input type="text" value={form.businessName} onChange={set('businessName')}
            placeholder="Smith Realty Group" required className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
          Profession <span className="text-red-400">*</span>
        </label>
        <select value={form.profession} onChange={set('profession')} required
          className={`${inputClass} appearance-none`}>
          <option value="" disabled>Select your profession...</option>
          {PROFESSIONS.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            City / State <span className="text-slate-600">(optional)</span>
          </label>
          <input type="text" value={form.location} onChange={set('location')}
            placeholder="Miami, FL" className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Name on Social Media <span className="text-slate-600">(optional)</span>
          </label>
          <input type="text" value={form.socialName} onChange={set('socialName')}
            placeholder="e.g. Ismael C. Perez" className={inputClass} />
        </div>
      </div>

      {/* Known profiles toggle */}
      <div className="rounded-lg border border-brand-border bg-brand-dark/40">
        <button
          type="button"
          onClick={() => setShowProfiles(p => !p)}
          className="w-full flex items-center justify-between px-4 py-3 text-left"
        >
          <div className="flex items-center gap-2">
            <span className="text-brand-cyan text-sm">🔗</span>
            <span className="text-sm font-semibold text-white">Add Your Existing Profile Links</span>
            {knownCount > 0 && (
              <span className="text-xs bg-brand-cyan/20 text-brand-cyan px-2 py-0.5 rounded-full">{knownCount} added</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Highly recommended for accurate results</span>
            <span className="text-slate-500 text-sm">{showProfiles ? '▲' : '▼'}</span>
          </div>
        </button>

        {showProfiles && (
          <div className="px-4 pb-4 space-y-3 border-t border-brand-border pt-3">
            <p className="text-xs text-slate-500 leading-relaxed">
              If your name is common, our AI search may miss your profiles. Paste your actual profile URLs here — these will be treated as confirmed and analyzed for quality, completeness, and any issues.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { field: 'linkedinUrl' as const, label: 'LinkedIn', placeholder: 'linkedin.com/in/your-name' },
                { field: 'facebookUrl' as const, label: 'Facebook', placeholder: 'facebook.com/yourprofile' },
                { field: 'twitterUrl' as const, label: 'Twitter / X', placeholder: 'x.com/yourhandle' },
                { field: 'youtubeUrl' as const, label: 'YouTube', placeholder: 'youtube.com/@yourchannel' },
                { field: 'instagramUrl' as const, label: 'Instagram', placeholder: 'instagram.com/yourhandle' },
              ].map(({ field, label, placeholder }) => (
                <div key={field}>
                  <label className="block text-xs text-slate-500 mb-1">{label}</label>
                  <input type="text" value={form[field] ?? ''} onChange={set(field)}
                    placeholder={placeholder}
                    className="w-full bg-brand-card border border-brand-border rounded-lg px-3 py-2 text-white placeholder-slate-700 focus:outline-none focus:border-brand-cyan transition-colors text-xs" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || !form.name || !form.businessName || !form.profession}
        className="w-full py-4 rounded-lg font-bold text-lg tracking-wide bg-gradient-to-r from-brand-blue to-brand-cyan text-white disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
      >
        {loading ? 'Scanning...' : 'Run My Free Audit →'}
      </button>

      <p className="text-center text-xs text-slate-600">
        Takes 30–60 seconds • No credit card required
      </p>
    </form>
  );
}
