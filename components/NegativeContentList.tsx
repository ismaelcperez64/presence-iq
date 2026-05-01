import { getSeverityColor } from '@/lib/utils';
import type { NegativeContent } from '@/types/audit';

interface Props {
  items: NegativeContent[];
}

export default function NegativeContentList({ items }: Props) {
  if (items.length === 0) {
    return (
      <div>
        <h3 className="text-lg font-bold text-white mb-4">Negative Content</h3>
        <div className="rounded-lg border border-green-400/20 bg-green-400/5 p-6 text-center">
          <span className="text-3xl mb-2 block">🎉</span>
          <p className="text-green-400 font-semibold">No significant negative content found.</p>
          <p className="text-slate-500 text-sm mt-1">Keep it up — your online reputation looks clean.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-1">Negative Content</h3>
      <p className="text-sm text-slate-400 mb-4">{items.length} item{items.length !== 1 ? 's' : ''} found that need attention</p>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="rounded-lg border border-brand-border bg-brand-card p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-sm font-semibold text-white">{item.source}</span>
              <div className="flex gap-1.5 flex-shrink-0">
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium capitalize ${getSeverityColor(item.severity)}`}>
                  {item.severity}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full border border-slate-600 text-slate-400 capitalize">
                  {item.type}
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">{item.snippet}</p>
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-brand-cyan hover:underline mt-2 block"
              >
                View source →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
