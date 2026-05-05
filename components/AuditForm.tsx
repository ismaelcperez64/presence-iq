'use client';

import { useState, useEffect } from 'react';
import type { AuditInput, CustomPlatform } from '@/types/audit';

const PROFESSIONS = [
  'Realtor / Broker',
  'Financial Services',
  'Insurance Agent',
  'Legal Services',
  'Physicians / Medical Services',
  'Civil Service (Police, Fire, etc.)',
  'Education / Academic',
  'Counselor / Therapist',
  'Contractor / Builder',
  'Business Owner',
  'Other',
];

// Well-known platforms that may not be in the main form
const PLATFORM_SUGGESTIONS = [
  'Pinterest', 'Snapchat', 'Threads', 'WhatsApp Business', 'Telegram',
  'Discord', 'Reddit', 'Clubhouse', 'Rumble', 'Alignable', 'Nextdoor',
  'Houzz', 'Angi', 'Thumbtack', 'Google Scholar', 'ResearchGate',
  'Yelp (Personal)', 'Alignable', 'ActiveRain',
];

const LS_PLATFORM_NAMES = 'presenceiq_known_platforms';

function loadSavedPlatforms(): string[] {
  try {
    const raw = localStorage.getItem(LS_PLATFORM_NAMES);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function savePlatformName(name: string) {
  if (!name.trim()) return;
  try {
    const existing = loadSavedPlatforms();
    const merged = Array.from(new Set([...existing, name.trim()])).slice(0, 50);
    localStorage.setItem(LS_PLATFORM_NAMES, JSON.stringify(merged));
  } catch { /* ignore */ }
}

interface Props {
  onSubmit: (data: AuditInput) => void;
  loading: boolean;
}

export default function AuditForm({ onSubmit, loading }: Props) {
  const [form, setForm] = useState<AuditInput>({
    name: '', businessName: '', profession: '',
    location: '', website: '', socialName: '', socialHandle: '',
    linkedinUrl: '', facebookUrl: '', twitterUrl: '', youtubeUrl: '', instagramUrl: '',
    otherProfiles: [],
  });
  const [showProfiles, setShowProfiles] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const saved = loadSavedPlatforms();
    const merged = Array.from(new Set([...PLATFORM_SUGGESTIONS, ...saved])).sort();
    setSuggestions(merged);
  }, []);

  const set = (field: keyof AuditInput) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }));

  const setOther = (index: number, field: keyof CustomPlatform) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const updated = [...(form.otherProfiles ?? [])];
      updated[index] = { ...updated[index], [field]: e.target.value };
      setForm(prev => ({ ...prev, otherProfiles: updated }));
    };

  const addOther = () =>
    setForm(prev => ({ ...prev, otherProfiles: [...(prev.otherProfiles ?? []), { platform: '', url: '' }] }));

  const removeOther = (index: number) =>
    setForm(prev => ({ ...prev, otherProfiles: (prev.otherProfiles ?? []).filter((_, i) => i !== index) }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.businessName || !form.profession) return;
    // Save any new platform names to localStorage for future sessions
    form.otherProfiles?.forEach(p => savePlatformName(p.platform));
    onSubmit(form);
  };

  const inputClass = "w-full bg-brand-card border border-brand-border rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan transition-colors text-sm";
  const knownCount = [form.linkedinUrl, form.facebookUrl, form.twitterUrl, form.youtubeUrl, form.instagramUrl, ...(form.otherProfiles ?? []).map(p => p.url)].filter(Boolean).length;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto space-y-4">
      {/* Core fields */}
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

      {/* Known profiles collapsible */}
      <div className="rounded-lg border border-brand-border bg-brand-dark/40 overflow-hidden">
        <button type="button" onClick={() => setShowProfiles(p => !p)}
          className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-brand-border/20 transition-colors">
          <div className="flex items-center gap-2">
            <span className="text-brand-cyan text-sm">🔗</span>
            <span className="text-sm font-semibold text-white">Add Your Existing Profiles</span>
            {knownCount > 0 && (
              <span className="text-xs bg-brand-cyan/20 text-brand-cyan px-2 py-0.5 rounded-full">{knownCount} added</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 hidden sm:block">Highly recommended for common names</span>
            <span className="text-slate-400 text-sm">{showProfiles ? '▲' : '▼'}</span>
          </div>
        </button>

        {showProfiles && (
          <div className="px-4 pb-4 border-t border-brand-border pt-3 space-y-4">
            <p className="text-xs text-slate-500 leading-relaxed">
              Paste your actual profile URLs below. These are treated as confirmed and analyzed for quality, completeness, and issues. New platforms you add are remembered for your next audit.
            </p>

            {/* Standard platforms */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {([
                { field: 'linkedinUrl' as const, label: 'LinkedIn', placeholder: 'linkedin.com/in/your-name' },
                { field: 'facebookUrl' as const, label: 'Facebook', placeholder: 'facebook.com/yourprofile' },
                { field: 'twitterUrl' as const, label: 'Twitter / X', placeholder: 'x.com/yourhandle' },
                { field: 'youtubeUrl' as const, label: 'YouTube', placeholder: 'youtube.com/@yourchannel' },
                { field: 'instagramUrl' as const, label: 'Instagram', placeholder: 'instagram.com/yourhandle' },
              ]).map(({ field, label, placeholder }) => (
                <div key={field}>
                  <label className="block text-xs text-slate-500 mb-1">{label}</label>
                  <input type="text" value={form[field] ?? ''} onChange={set(field)}
                    placeholder={placeholder}
                    className="w-full bg-brand-card border border-brand-border rounded-lg px-3 py-2 text-white placeholder-slate-700 focus:outline-none focus:border-brand-cyan transition-colors text-xs" />
                </div>
              ))}
            </div>

            {/* Other / custom platforms */}
            {(form.otherProfiles ?? []).length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Other Platforms</p>
                {(form.otherProfiles ?? []).map((entry, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={entry.platform}
                        onChange={setOther(i, 'platform')}
                        placeholder="Platform name (e.g. Pinterest)"
                        list="platform-suggestions"
                        className="w-full bg-brand-card border border-brand-border rounded-lg px-3 py-2 text-white placeholder-slate-700 focus:outline-none focus:border-brand-cyan transition-colors text-xs mb-1"
                      />
                      <input
                        type="text"
                        value={entry.url}
                        onChange={setOther(i, 'url')}
                        placeholder="Profile URL"
                        className="w-full bg-brand-card border border-brand-border rounded-lg px-3 py-2 text-white placeholder-slate-700 focus:outline-none focus:border-brand-cyan transition-colors text-xs"
                      />
                    </div>
                    <button type="button" onClick={() => removeOther(i)}
                      className="text-slate-600 hover:text-red-400 transition-colors mt-1 text-lg leading-none flex-shrink-0">
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button type="button" onClick={addOther}
              className="w-full py-2 rounded-lg border border-dashed border-brand-border text-slate-500 hover:text-white hover:border-brand-cyan transition-colors text-xs font-semibold">
              + Add another platform (Pinterest, Snapchat, Threads, etc.)
            </button>

            {/* datalist for autocomplete suggestions */}
            <datalist id="platform-suggestions">
              {suggestions.map(s => <option key={s} value={s} />)}
            </datalist>
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
