import { getPriorityColor } from '@/lib/utils';
import type { Recommendation } from '@/types/audit';

const difficultyIcon = { easy: '🟢', medium: '🟡', hard: '🔴' };

interface Props {
  items: Recommendation[];
}

export default function RecommendationsList({ items }: Props) {
  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-1">Action Plan</h3>
      <p className="text-sm text-slate-400 mb-4">Ranked by impact — tackle these in order</p>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="rounded-lg border border-brand-border bg-brand-card p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-border flex items-center justify-center text-sm font-bold text-slate-400">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </span>
                  <span className="text-xs text-slate-500">{item.category}</span>
                  <span className="text-xs ml-auto">{difficultyIcon[item.difficulty]} {item.difficulty}</span>
                </div>
                <p className="text-sm font-semibold text-white mb-1">{item.action}</p>
                <p className="text-xs text-slate-400">{item.impact}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
