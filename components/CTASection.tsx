import type { Verdict } from '@/types/audit';
import { getVerdictColor } from '@/lib/utils';

const TIERS = [
  {
    name: 'Full Audit Report',
    price: '$47',
    period: 'one-time',
    description: 'Complete PDF report with every finding, your full action checklist, and platform-by-platform breakdown.',
    features: ['Detailed PDF report', 'DIY action checklist', 'Platform claim links', 'Review response templates'],
    cta: 'Get Full Report',
    highlight: false,
  },
  {
    name: 'Action Plan Session',
    price: '$197',
    period: 'one-time',
    description: '30-minute 1-on-1 call with a digital presence expert. Walk away with a prioritized 90-day roadmap.',
    features: ['Everything in Full Report', '30-min strategy call', 'Personalized 90-day plan', 'Priority issue resolution'],
    cta: 'Book My Session',
    highlight: true,
  },
  {
    name: 'Done-For-You',
    price: '$499',
    period: '/ month',
    description: 'We handle everything. Profile claims, review responses, content creation, monitoring, and weekly reports.',
    features: ['Everything in Action Plan', 'Profile claiming & setup', 'Review management', 'Weekly monitoring reports', 'Copycat takedown support'],
    cta: 'Get Started',
    highlight: false,
  },
];

interface Props {
  verdict: Verdict;
  score: number;
  name: string;
}

export default function CTASection({ verdict, score, name }: Props) {
  const colors = getVerdictColor(verdict);
  const recommended = score < 65 ? 2 : score < 85 ? 1 : 0;

  return (
    <div className="mt-8">
      <div className={`rounded-xl border p-6 mb-8 text-center ${colors.bg} ${colors.border}`}>
        <h3 className={`text-xl font-black mb-2 ${colors.text}`}>
          {score < 40 && `${name}, your digital presence needs urgent attention.`}
          {score >= 40 && score < 65 && `${name}, you're leaving leads on the table.`}
          {score >= 65 && score < 85 && `${name}, a few fixes could put you in the top tier.`}
          {score >= 85 && `${name}, you're almost at Authority Status.`}
        </h3>
        <p className="text-slate-400 text-sm">
          Choose how you want to fix it — DIY, guided, or fully managed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TIERS.map((tier, i) => (
          <div
            key={tier.name}
            className={`relative rounded-xl border p-5 flex flex-col gap-4 transition-all ${
              tier.highlight
                ? 'border-brand-cyan bg-brand-cyan/5 shadow-lg shadow-brand-cyan/10'
                : 'border-brand-border bg-brand-card'
            }`}
          >
            {i === recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-brand-cyan text-black text-xs font-black px-3 py-1 rounded-full whitespace-nowrap">
                  RECOMMENDED FOR YOU
                </span>
              </div>
            )}

            <div>
              <h4 className="font-bold text-white mb-1">{tier.name}</h4>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white">{tier.price}</span>
                <span className="text-slate-500 text-sm">{tier.period}</span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">{tier.description}</p>

            <ul className="space-y-2 flex-1">
              {tier.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-brand-cyan mt-0.5 flex-shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 rounded-lg font-bold text-sm transition-opacity hover:opacity-90 ${
                tier.highlight
                  ? 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white'
                  : 'bg-brand-border text-white hover:bg-brand-border/80'
              }`}
            >
              {tier.cta} →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
