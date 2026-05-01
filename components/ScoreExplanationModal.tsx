'use client';

interface Props {
  score: number;
  onClose: () => void;
}

const ZONES = [
  {
    label: 'Digital Danger Zone',
    range: '0 – 39',
    widthPct: 39,
    color: 'bg-red-400',
    textColor: 'text-red-400',
    borderColor: 'border-red-400/30',
    bgColor: 'bg-red-400/10',
    description: 'Virtually no detectable online presence. Prospects can\'t find you, verify you, or trust you. This is costing you leads every day.',
    impact: 'High risk of lost business, inability to attract clients, and vulnerability to impersonation.',
  },
  {
    label: 'Needs Work',
    range: '40 – 64',
    widthPct: 25,
    color: 'bg-yellow-400',
    textColor: 'text-yellow-400',
    borderColor: 'border-yellow-400/30',
    bgColor: 'bg-yellow-400/10',
    description: 'Some presence exists but it\'s incomplete, inconsistent, or poorly optimized. You show up, but you\'re not converting.',
    impact: 'You\'re missing a significant portion of potential clients who can\'t verify your credibility.',
  },
  {
    label: 'Building Momentum',
    range: '65 – 84',
    widthPct: 20,
    color: 'bg-green-400',
    textColor: 'text-green-400',
    borderColor: 'border-green-400/30',
    bgColor: 'bg-green-400/10',
    description: 'Solid foundation with room to grow. You\'re visible and attracting some leads — but not maximizing your potential.',
    impact: 'A few targeted improvements could push you into Authority Status and significantly increase conversions.',
  },
  {
    label: 'Authority Status',
    range: '85 – 100',
    widthPct: 16,
    color: 'bg-cyan-400',
    textColor: 'text-cyan-400',
    borderColor: 'border-cyan-400/30',
    bgColor: 'bg-cyan-400/10',
    description: 'Strong, verified multi-platform presence. You show up professionally, have social proof, and your brand works for you 24/7.',
    impact: 'Maximum trust, consistent lead flow, and full brand protection. Clients choose you over competitors.',
  },
];

export default function ScoreExplanationModal({ score, onClose }: Props) {
  const currentZoneIndex = score < 40 ? 0 : score < 65 ? 1 : score < 85 ? 2 : 3;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-brand-card border border-brand-border rounded-2xl p-6 max-h-[90vh] overflow-y-auto animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white text-xl transition-colors"
        >
          ✕
        </button>

        <h2 className="text-xl font-black text-white mb-1">Understanding Your Digital Score</h2>
        <p className="text-slate-400 text-sm mb-6">
          Your score of <span className="text-white font-bold">{score}</span> tells the story of how the internet sees you right now.
        </p>

        {/* Visual score bar */}
        <div className="mb-8">
          <div className="flex h-5 rounded-full overflow-hidden mb-2 gap-0.5">
            {ZONES.map((zone, i) => (
              <div
                key={zone.label}
                className={`${zone.color} transition-all ${i === currentZoneIndex ? 'opacity-100' : 'opacity-25'}`}
                style={{ width: `${zone.widthPct}%` }}
              />
            ))}
          </div>
          {/* Score pointer */}
          <div className="relative h-5">
            <div
              className="absolute -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${Math.min(score, 99)}%` }}
            >
              <div className="w-0.5 h-3 bg-white opacity-80" />
              <span className="text-xs text-white font-bold">{score}</span>
            </div>
          </div>
          <div className="flex justify-between text-xs text-slate-600 mt-1 px-0.5">
            <span>0</span>
            <span style={{ marginLeft: '31%' }}>40</span>
            <span style={{ marginLeft: '17%' }}>65</span>
            <span style={{ marginLeft: '12%' }}>85</span>
            <span>100</span>
          </div>
        </div>

        {/* Zone cards */}
        <div className="space-y-3 mb-6">
          {ZONES.map((zone, i) => (
            <div
              key={zone.label}
              className={`rounded-lg border p-4 transition-all ${
                i === currentZoneIndex
                  ? `${zone.bgColor} ${zone.borderColor}`
                  : 'border-brand-border bg-brand-dark/40 opacity-40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`font-bold text-sm ${i === currentZoneIndex ? zone.textColor : 'text-slate-400'}`}>
                  {zone.label}
                  {i === currentZoneIndex && <span className="ml-2 text-xs opacity-60">← you are here</span>}
                </span>
                <span className="text-xs text-slate-500 font-mono">{zone.range}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{zone.description}</p>
              {i === currentZoneIndex && (
                <p className={`text-xs mt-2 font-medium ${zone.textColor}`}>⚡ {zone.impact}</p>
              )}
            </div>
          ))}
        </div>

        {/* Action tips */}
        <div className="rounded-lg border border-brand-cyan/20 bg-brand-cyan/5 p-4 mb-6">
          <h3 className="text-sm font-bold text-brand-cyan mb-2">What can you do about it?</h3>
          <ul className="space-y-1.5 text-xs text-slate-400">
            <li>✓ Claim and optimize your top missing platforms</li>
            <li>✓ Address any negative content before it drives leads away</li>
            <li>✓ Build a consistent brand presence across all channels</li>
            <li>✓ Monitor your digital footprint monthly for new issues</li>
          </ul>
        </div>

        {/* Blog links */}
        <div className="border-t border-brand-border pt-4 mb-4">
          <p className="text-xs text-slate-500 mb-2">📚 Read more on our blog:</p>
          <div className="flex flex-wrap gap-2">
            {[
              'Why Your Online Presence Is Your #1 Lead Source',
              'How to Fix a Damaged Digital Reputation',
              'The 5 Platforms Every Professional Needs',
            ].map(title => (
              <span
                key={title}
                className="text-xs text-brand-cyan/70 border border-brand-cyan/20 rounded-full px-3 py-1 cursor-pointer hover:border-brand-cyan/50 transition-colors"
              >
                {title} →
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-lg bg-brand-border text-white font-semibold text-sm hover:bg-brand-border/80 transition-colors"
        >
          Got it — close
        </button>
      </div>
    </div>
  );
}
