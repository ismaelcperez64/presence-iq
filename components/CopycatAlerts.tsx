import type { Copycat } from '@/types/audit';

const riskColors = {
  low:    'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  medium: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
  high:   'text-red-400 bg-red-400/10 border-red-400/30',
};

interface Props {
  items: Copycat[];
}

export default function CopycatAlerts({ items }: Props) {
  if (items.length === 0) {
    return (
      <div>
        <h3 className="text-lg font-bold text-white mb-4">Copycat & Impersonator Check</h3>
        <div className="rounded-lg border border-green-400/20 bg-green-400/5 p-6 text-center">
          <span className="text-3xl mb-2 block">🛡️</span>
          <p className="text-green-400 font-semibold">No copycats or impersonators detected.</p>
          <p className="text-slate-500 text-sm mt-1">Your brand identity appears to be unique online.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-1">Copycat & Impersonator Check</h3>
      <p className="text-sm text-red-400 mb-4">⚠️ {items.length} potential impersonator{items.length !== 1 ? 's' : ''} found</p>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="rounded-lg border border-red-400/20 bg-red-400/5 p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-sm font-semibold text-white">{item.platform}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium capitalize ${riskColors[item.riskLevel]}`}>
                {item.riskLevel} risk
              </span>
            </div>
            <p className="text-sm text-slate-400">{item.description}</p>
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-brand-cyan hover:underline mt-2 block"
              >
                View profile →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
