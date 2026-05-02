'use client';

import { useState } from 'react';

export interface ProfileFormData {
  platform: string;
  fullName: string;
  businessName: string;
  headline: string;
  location: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  cellPhone: string;
  businessPhone: string;
  website: string;
  shortBio: string;
  about: string;
  services: string;
  extra1: string;
  extra2: string;
  elevatorPitch: string;
  targetClient: string;
  primaryColor: string;
}

type PlatformCfg = {
  aboutLabel: string;
  aboutPlaceholder: string;
  servicesLabel: string;
  extra1Label: string;
  extra1Placeholder: string;
  extra2Label: string;
  extra2Placeholder: string;
};

const PLATFORM_CFG: Record<string, PlatformCfg> = {
  LinkedIn: {
    aboutLabel: 'About / Summary',
    aboutPlaceholder: 'Write your professional story — what you do, who you help, and why clients choose you...',
    servicesLabel: 'Services Offered',
    extra1Label: 'Current Job Title',
    extra1Placeholder: 'Mortgage Loan Officer',
    extra2Label: 'Top 3–5 Skills (comma-separated)',
    extra2Placeholder: 'Home Purchase Loans, VA Loans, Refinancing, FHA, First-Time Buyers',
  },
  Facebook: {
    aboutLabel: 'Short Description (shows under your page name)',
    aboutPlaceholder: 'Helping Los Angeles families achieve homeownership with stress-free mortgage solutions.',
    servicesLabel: 'Services / Products',
    extra1Label: 'Business Category',
    extra1Placeholder: 'Mortgage Lender, Financial Services',
    extra2Label: 'Business Hours',
    extra2Placeholder: 'Mon–Fri 9am–6pm, Sat 10am–3pm',
  },
  YouTube: {
    aboutLabel: 'Channel Description',
    aboutPlaceholder: 'Welcome! I help first-time homebuyers navigate the mortgage process with confidence...',
    servicesLabel: 'Value You Provide Viewers',
    extra1Label: 'Content Topics',
    extra1Placeholder: 'Home buying tips, mortgage rates, market updates, client Q&A',
    extra2Label: 'Target Audience',
    extra2Placeholder: 'First-time buyers, homeowners looking to refinance, real estate investors',
  },
  Instagram: {
    aboutLabel: 'Bio (150 characters max)',
    aboutPlaceholder: 'Mortgage lender helping LA families buy their dream home 🏠 | DM for a free quote',
    servicesLabel: 'Call-to-Action in Bio',
    extra1Label: 'Content Theme',
    extra1Placeholder: 'Real estate tips, mortgage myths, client wins, market updates',
    extra2Label: 'Visual / Aesthetic Style',
    extra2Placeholder: 'Professional, clean, navy & white, occasional personal behind-the-scenes',
  },
  'X (Twitter)': {
    aboutLabel: 'Bio (160 characters max)',
    aboutPlaceholder: 'Mortgage lender in LA. Helping families buy smarter. Tips, rates & real talk about homeownership.',
    servicesLabel: 'What you tweet about',
    extra1Label: 'Content Mix',
    extra1Placeholder: 'Market updates, mortgage tips, client stories, industry news',
    extra2Label: 'Pinned Tweet Idea',
    extra2Placeholder: 'Your most valuable insight or a free resource link',
  },
  TikTok: {
    aboutLabel: 'Bio (80 characters max)',
    aboutPlaceholder: 'Mortgage lender 🏠 | LA home buying tips | Follow for real estate advice',
    servicesLabel: 'Content Value',
    extra1Label: 'Video Content Ideas',
    extra1Placeholder: '"What I wish I knew before buying," mortgage myth-busting, rate updates',
    extra2Label: 'Content Style',
    extra2Placeholder: 'Educational + relatable, talking-head, quick tips under 60 seconds',
  },
  'Google Business Profile': {
    aboutLabel: 'Business Description',
    aboutPlaceholder: 'Home Pro Assist is a licensed mortgage lender serving Los Angeles and surrounding areas...',
    servicesLabel: 'Services Listed',
    extra1Label: 'Business Hours',
    extra1Placeholder: 'Mon–Fri 9am–6pm, Sat 10am–3pm, Sun closed',
    extra2Label: 'Service Area (cities/zip codes)',
    extra2Placeholder: 'Los Angeles, Glendale, Pasadena, Long Beach, CA 90001–90899',
  },
};

const DEFAULT_CFG: PlatformCfg = {
  aboutLabel: 'About / Bio',
  aboutPlaceholder: 'Describe yourself, your business, and the value you bring to clients...',
  servicesLabel: 'Services Offered',
  extra1Label: 'Specialty or Niche',
  extra1Placeholder: 'What makes you the go-to expert in your area?',
  extra2Label: 'Unique Value Proposition',
  extra2Placeholder: "What do you do that competitors don't?",
};

const PLATFORM_EMOJI: Record<string, string> = {
  LinkedIn: '💼', Facebook: '📘', YouTube: '▶️', Instagram: '📷',
  'X (Twitter)': '𝕏', TikTok: '🎵', 'Google Business Profile': '📍',
  Yelp: '⭐', BBB: '🏅', Substack: '📰', Medium: '✍️',
};

function ProfileMockup({ data }: { data: ProfileFormData }) {
  const color = data.primaryColor || '#0066ff';

  return (
    <div className="relative rounded-xl overflow-hidden border border-brand-border bg-white text-gray-900 text-sm select-none">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="text-3xl font-black text-black/10 rotate-[-30deg] text-center leading-tight whitespace-nowrap">
          MOCKUP PREVIEW<br />PresenceIQ
        </div>
      </div>

      <div className="h-24 w-full flex items-center justify-center relative"
        style={{ background: `linear-gradient(135deg, ${color}dd, ${color}88)` }}>
        <span className="text-white/50 text-xs font-semibold tracking-widest uppercase z-10">
          {data.platform} Cover Photo
        </span>
      </div>

      <div className="px-5 pb-5">
        <div className="relative -mt-8 mb-3 flex items-end gap-3">
          <div className="w-16 h-16 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center flex-shrink-0 shadow">
            <span className="text-gray-400 text-2xl">👤</span>
          </div>
          <div className="pb-1">
            <span className="text-xs text-gray-400 font-medium">Profile Photo</span>
          </div>
          <div className="ml-auto pb-1">
            <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-xs">Logo</span>
            </div>
          </div>
        </div>

        <h3 className="font-bold text-gray-900 text-base leading-tight">{data.fullName || 'Your Name'}</h3>
        <p className="text-gray-500 text-xs mt-0.5">{data.businessName || 'Business Name'}</p>
        <p className="text-gray-700 text-xs mt-1 font-medium">{data.headline || 'Professional Headline'}</p>
        {(data.city || data.location) && (
          <p className="text-gray-400 text-xs mt-0.5">
            📍 {data.streetAddress ? `${data.streetAddress}, ` : ''}{data.city || data.location}{data.state && data.city ? `, ${data.state}` : ''}{data.zip ? ` ${data.zip}` : ''}
          </p>
        )}

        <div className="flex gap-2 mt-3">
          <div className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: color }}>Follow</div>
          <div className="px-3 py-1 rounded-full text-xs font-semibold border border-gray-300 text-gray-600">Message</div>
          {data.website && <div className="px-3 py-1 rounded-full text-xs font-semibold border border-gray-300 text-gray-600">🌐 Website</div>}
        </div>

        {data.shortBio && (
          <div className="mt-3 px-3 py-2 rounded-lg bg-gray-50 border border-gray-100">
            <p className="text-xs text-gray-600 leading-relaxed italic">&ldquo;{data.shortBio}&rdquo;</p>
          </div>
        )}

        <div className="mt-3 border-t border-gray-100 pt-3">
          <p className="text-xs font-bold text-gray-700 mb-1">About</p>
          <p className="text-xs text-gray-600 leading-relaxed line-clamp-4">
            {data.about || 'Your platform-specific bio will appear here...'}
          </p>
        </div>

        {data.services && (
          <div className="mt-3">
            <p className="text-xs font-bold text-gray-700 mb-1.5">Services</p>
            <div className="flex flex-wrap gap-1.5">
              {data.services.split(',').slice(0, 4).map(s => (
                <span key={s} className="text-xs px-2 py-0.5 rounded-full text-white" style={{ background: color + 'cc' }}>{s.trim()}</span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-3 border-t border-gray-100 pt-3 flex flex-wrap gap-x-4 gap-y-1">
          {data.cellPhone && <span className="text-xs text-gray-400">📱 {data.cellPhone}</span>}
          {data.businessPhone && <span className="text-xs text-gray-400">☎️ {data.businessPhone}</span>}
          {data.website && <span className="text-xs text-gray-400">🌐 {data.website}</span>}
          {data.email && <span className="text-xs text-gray-400">✉️ {data.email}</span>}
        </div>
      </div>
    </div>
  );
}

interface Props {
  platform: string;
  prefillName?: string;
  prefillBusiness?: string;
  onClose: () => void;
}

type ModalState = 'step1' | 'step2' | 'step3' | 'submitting' | 'preview';

export default function ProfileQuestionnaireModal({ platform, prefillName = '', prefillBusiness = '', onClose }: Props) {
  const [state, setState] = useState<ModalState>('step1');
  const [form, setForm] = useState<ProfileFormData>({
    platform,
    fullName: prefillName,
    businessName: prefillBusiness,
    headline: '',
    location: '',
    streetAddress: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    cellPhone: '',
    businessPhone: '',
    website: '',
    shortBio: '',
    about: '',
    services: '',
    extra1: '',
    extra2: '',
    elevatorPitch: '',
    targetClient: '',
    primaryColor: '#0066ff',
  });

  const cfg = PLATFORM_CFG[platform] ?? DEFAULT_CFG;
  const emoji = PLATFORM_EMOJI[platform] || '🌐';

  const set = (field: keyof ProfileFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(p => ({ ...p, [field]: e.target.value }));

  const step = state === 'step1' ? 1 : state === 'step2' ? 2 : state === 'step3' ? 3 : 4;
  const progress = Math.min(step / 3, 1);

  const handleSubmit = async () => {
    setState('submitting');
    try {
      await fetch('/api/profile-mockup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch { /* show preview regardless */ }
    setState('preview');
  };

  const inputClass = 'w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan transition-colors text-sm';
  const labelClass = 'block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5';
  const doneForYouUrl = `/done-for-you?name=${encodeURIComponent(form.fullName)}&score=0&verdict=Needs+Work`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-brand-card border border-brand-border rounded-2xl w-full max-w-xl shadow-2xl flex flex-col max-h-[92vh]">

        <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-brand-border rounded-t-2xl">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{emoji}</span>
            <div>
              <h2 className="text-white font-bold text-base">{platform} Profile Builder</h2>
              <p className="text-xs text-slate-500">{state === 'preview' ? 'Your mockup is ready!' : `Step ${step} of 3`}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors text-xl leading-none w-8 h-8 flex items-center justify-center">✕</button>
        </div>

        {state !== 'preview' && (
          <div className="flex-shrink-0 h-1 bg-brand-border">
            <div className="h-full bg-gradient-to-r from-brand-blue to-brand-cyan transition-all duration-500" style={{ width: `${progress * 100}%` }} />
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6">

          {state === 'step1' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-bold mb-0.5">Basic Information</h3>
                <p className="text-slate-500 text-sm">Contact details and identity for your {platform} profile.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Full Name <span className="text-red-400">*</span></label>
                  <input type="text" value={form.fullName} onChange={set('fullName')} placeholder="Jane Smith" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Business Name <span className="text-red-400">*</span></label>
                  <input type="text" value={form.businessName} onChange={set('businessName')} placeholder="Smith Realty Group" className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Professional Headline <span className="text-red-400">*</span></label>
                <input type="text" value={form.headline} onChange={set('headline')}
                  placeholder="Mortgage Loan Officer | Helping LA Families Own Their Dream Home" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Street Address</label>
                <input type="text" value={form.streetAddress} onChange={set('streetAddress')} placeholder="123 Main St, Suite 100" className={inputClass} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className={labelClass}>City</label>
                  <input type="text" value={form.city} onChange={e => {
                    const city = e.target.value;
                    setForm(p => ({ ...p, city, location: `${city}${p.state ? ', ' + p.state : ''}` }));
                  }} placeholder="Los Angeles" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>State</label>
                  <input type="text" value={form.state} onChange={e => {
                    const st = e.target.value;
                    setForm(p => ({ ...p, state: st, location: `${p.city ? p.city + ', ' : ''}${st}` }));
                  }} placeholder="CA" className={inputClass} maxLength={2} />
                </div>
                <div>
                  <label className={labelClass}>ZIP</label>
                  <input type="text" value={form.zip} onChange={set('zip')} placeholder="90001" className={inputClass} maxLength={10} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Cell Phone</label>
                  <input type="tel" value={form.cellPhone} onChange={set('cellPhone')} placeholder="(213) 555-0100" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Business Line</label>
                  <input type="tel" value={form.businessPhone} onChange={set('businessPhone')} placeholder="(213) 555-0200" className={inputClass} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Email <span className="text-red-400">*</span> <span className="text-brand-cyan normal-case font-normal">(mockup sent here)</span></label>
                  <input type="email" value={form.email} onChange={set('email')} placeholder="jane@example.com" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Website</label>
                  <input type="text" value={form.website} onChange={set('website')} placeholder="homeproassist.com" className={inputClass} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className={labelClass + ' mb-0'}>Short Bio <span className="text-slate-500 normal-case font-normal">(150–200 characters)</span></label>
                  <span className={`text-xs tabular-nums ${
                    form.shortBio.length < 150 ? 'text-slate-600' :
                    form.shortBio.length <= 200 ? 'text-green-400' : 'text-red-400'
                  }`}>{form.shortBio.length}/200</span>
                </div>
                <textarea value={form.shortBio} onChange={set('shortBio')} rows={3} maxLength={210}
                  placeholder="Mortgage lender helping LA families achieve homeownership. Specializing in first-time buyers, VA & FHA loans."
                  className={inputClass + ' resize-none'} />
                {form.shortBio.length >= 150 && form.shortBio.length <= 200 && (
                  <p className="text-xs text-green-400 mt-1">✓ Perfect length</p>
                )}
              </div>
              <button onClick={() => setState('step2')}
                disabled={!form.fullName || !form.businessName || !form.headline || !form.email}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-40">
                Continue →
              </button>
            </div>
          )}

          {state === 'step2' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-bold mb-0.5">{platform} Content</h3>
                <p className="text-slate-500 text-sm">These fields are tailored specifically for {platform}.</p>
              </div>
              <div>
                <label className={labelClass}>{cfg.aboutLabel} <span className="text-red-400">*</span></label>
                <textarea value={form.about} onChange={set('about')} placeholder={cfg.aboutPlaceholder} rows={4} className={inputClass + ' resize-none'} />
              </div>
              <div>
                <label className={labelClass}>{cfg.servicesLabel}</label>
                <input type="text" value={form.services} onChange={set('services')}
                  placeholder="Home purchase loans, VA loans, refinancing, FHA loans" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>{cfg.extra1Label}</label>
                <input type="text" value={form.extra1} onChange={set('extra1')} placeholder={cfg.extra1Placeholder} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>{cfg.extra2Label}</label>
                <input type="text" value={form.extra2} onChange={set('extra2')} placeholder={cfg.extra2Placeholder} className={inputClass} />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setState('step1')}
                  className="flex-1 py-3 rounded-lg border border-brand-border text-slate-400 font-bold text-sm hover:text-white transition-colors">← Back</button>
                <button onClick={() => setState('step3')} disabled={!form.about}
                  className="flex-1 py-3 rounded-lg bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-bold text-sm hover:opacity-90 disabled:opacity-40">Continue →</button>
              </div>
            </div>
          )}

          {state === 'step3' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-bold mb-0.5">Your Brand & Message</h3>
                <p className="text-slate-500 text-sm">This shapes the voice and visuals of your profile design.</p>
              </div>
              <div>
                <label className={labelClass}>Elevator Pitch <span className="text-red-400">*</span></label>
                <textarea value={form.elevatorPitch} onChange={set('elevatorPitch')} rows={3}
                  placeholder="I help [who] achieve [what] without [pain point]."
                  className={inputClass + ' resize-none'} />
              </div>
              <div>
                <label className={labelClass}>Ideal Client Description</label>
                <input type="text" value={form.targetClient} onChange={set('targetClient')}
                  placeholder="First-time homebuyers, ages 28–45, households earning $80k+, in Los Angeles" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Primary Brand Color</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={form.primaryColor} onChange={set('primaryColor')}
                    className="h-10 w-16 rounded cursor-pointer border border-brand-border bg-brand-dark" />
                  <span className="text-slate-400 text-sm">Used for your banner and profile accents</span>
                </div>
              </div>
              <div className="rounded-lg border border-brand-cyan/20 bg-brand-cyan/5 p-3.5 text-xs text-slate-400 space-y-1.5">
                <p className="font-semibold text-slate-300">What happens when you submit:</p>
                <p>✓ We generate a watermarked mockup of your {platform} profile</p>
                <p>✓ Your mockup + Done For You details are sent to <span className="text-white">{form.email}</span></p>
                <p>✓ You&apos;ll see a live preview right here — instantly</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setState('step2')}
                  className="flex-1 py-3 rounded-lg border border-brand-border text-slate-400 font-bold text-sm hover:text-white transition-colors">← Back</button>
                <button onClick={handleSubmit} disabled={!form.elevatorPitch}
                  className="flex-1 py-3 rounded-lg bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-bold text-sm hover:opacity-90 disabled:opacity-40">Generate My Mockup →</button>
              </div>
            </div>
          )}

          {state === 'submitting' && (
            <div className="py-12 text-center">
              <div className="text-4xl mb-4 animate-pulse">🎨</div>
              <p className="text-white font-bold mb-1">Building your {platform} mockup...</p>
              <p className="text-slate-500 text-sm">Generating your profile design</p>
            </div>
          )}

          {state === 'preview' && (
            <div className="space-y-5">
              <div className="text-center">
                <div className="text-4xl mb-2">🎉</div>
                <h3 className="text-white font-bold text-lg mb-1">Your {platform} Mockup is Ready!</h3>
                <p className="text-slate-400 text-sm">A copy has been sent to <span className="text-white font-semibold">{form.email}</span></p>
              </div>
              <ProfileMockup data={form} />
              <div className="rounded-xl border border-brand-cyan/30 bg-brand-cyan/5 p-5 text-center">
                <p className="text-xs font-semibold text-brand-cyan uppercase tracking-wider mb-1">Love what you see?</p>
                <h4 className="text-white font-bold text-base mb-2">Let us build the real thing for you</h4>
                <p className="text-slate-400 text-xs mb-4">$297 setup + $59/mo — we create your {platform} from scratch, fully branded and optimized.</p>
                <a href={doneForYouUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-block w-full py-3 rounded-lg bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-bold text-sm hover:opacity-90 transition-opacity">
                  Build My Real {platform} Profile →
                </a>
                <p className="text-xs text-slate-600 mt-2">Opens in a new tab • Cancel monthly anytime</p>
              </div>
              <button onClick={onClose}
                className="w-full py-2.5 rounded-lg border border-brand-border text-slate-400 text-sm font-semibold hover:text-white transition-colors">
                Close Preview
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
