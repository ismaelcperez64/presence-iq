import { getSeverityColor } from '@/lib/utils';
import type { NegativeContent } from '@/types/audit';

const typeLabels: Record<NegativeContent['type'], string> = {
  review:     'Review',
  complaint:  'Complaint',
  news:       'News Article',
  forum:      'Forum Post',
  derogatory: 'Derogatory',
  other:      'Other',
};

const typeColors: Record<NegativeContent['type'], string> = {
  review:     'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  complaint:  'text-orange-400 bg-orange-400/10 border-orange-400/30',
  news:       'text-blue-400 bg-blue-400/10 border-blue-400/30',
  forum:      'text-slate-400 bg-slate-400/10 border-slate-400/30',
  derogatory: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
  other:      'text-slate-400 bg-slate-400/10 border-slate-400/30',
};

interface Props {
  items: NegativeContent[];
}

export default function NegativeContentList({ items }: Props) {
  if (items.length === 0) {
    return (
      <div>
        <h3 className="text-lg font-bold text-white mb-4">Issues Found</h3>
        <div className="rounded-lg border border-green-400/20 bg-green-400/5 p-6 text-center">
          <span className="text-3xl mb-2 block">🎉</span>
          <p className="text-green-400 font-semibold">No issues or negative content found.</p>
          <p className="text-slate-500 text-sm mt-1">Keep it up — your online reputation looks clean.</p>
        </div>
      </div>
    );
  }

  const derogatory = items.filter(i => i.type === 'derogatory');
  const other = items.filter(i => i.type !== 'derogatory');

  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-1">Issues Found</h3>
      <p className="text-sm text-slate-400 mb-1">{items.length} item{items.length !== 1 ? 's' : ''} found that need attention</p>
      <p className="text-xs text-slate-600 mb-4">
        Includes negative reviews, complaints, news articles, forum posts, and derogatory content that may affect how prospects perceive you.
      </p>

      {derogatory.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">⚠️ Derogatory Content</h4>
          <div className="space-y-3">
            {derogatory.map((item, i) => <IssueCard key={i} item={item} />)}
          </div>
        </div>
      )}

      {other.length > 0 && (
        <div>
          {derogatory.length > 0 && (
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-4">Other Issues</h4>
          )}
          <div className="space-y-3">
            {other.map((item, i) => <IssueCard key={i} item={item} />)}
          </div>
        </div>
      )}
    </div>
  );
}

function IssueCard({ item }: { item: NegativeContent }) {
  return (
    <div className="rounded-lg border border-brand-border bg-brand-card p-4">
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-sm font-semibold text-white">{item.source}</span>
        <div className="flex gap-1.5 flex-shrink-0">
          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium capitalize ${getSeverityColor(item.severity)}`}>
            {item.severity}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${typeColors[item.type]}`}>
            {typeLabels[item.type]}
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
  );
}
