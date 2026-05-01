import type { Copycat, SimilarProfile } from '@/types/audit';

const riskColors = {
  low:    'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  medium: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
  high:   'text-red-400 bg-red-400/10 border-red-400/30',
};

interface Props {
  items: Copycat[];
  similarProfiles: SimilarProfile[];
  name: string;
}

export default function CopycatAlerts({ items, similarProfiles, name }: Props) {
  return (
    <div>
      {/* What are copycats? */}
      <div className="rounded-lg border border-slate-600/40 bg-slate-800/30 p-4 mb-6">
        <h4 className="text-sm font-bold text-white mb-2">🛡️ What are copycats & impersonators?</h4>
        <p className="text-xs text-slate-400 leading-relaxed mb-3">
          Copycats are accounts, profiles, or websites that use your name, brand, or likeness — sometimes intentionally to mislead your potential clients into contacting the wrong person.
        </p>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-md border border-red-400/20 bg-red-400/5 p-3">
            <p className="font-semibold text-red-400 mb-1.5">⚠️ The Risks</p>
            <ul className="text-slate-400 space-y-1">
              <li>• Clients contact the wrong person</li>
              <li>• Fake reviews harm your reputation</li>
              <li>• Identity theft & brand confusion</li>
              <li>• Lost leads and revenue</li>
            </ul>
          </div>
          <div className="rounded-md border border-green-400/20 bg-green-400/5 p-3">
            <p className="font-semibold text-green-400 mb-1.5">✓ The Silver Lining</p>
            <ul className="text-slate-400 space-y-1">
              <li>• Being copied means you're known</li>
              <li>• Signals you have brand value</li>
              <li>• Early detection = easy removal</li>
              <li>• Claim platforms to block them</li>
            </ul>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-bold text-white mb-1">Copycat & Impersonator Check</h3>

      {items.length === 0 ? (
        <div className="rounded-lg border border-green-400/20 bg-green-400/5 p-6 text-center mb-6">
          <span className="text-3xl mb-2 block">🎉</span>
          <p className="text-green-400 font-semibold">No copycats or impersonators detected.</p>
          <p className="text-slate-500 text-sm mt-1">Your brand identity appears to be unique online.</p>
        </div>
      ) : (
        <div className="mb-6">
          <p className="text-sm text-red-400 mb-3">⚠️ {items.length} potential impersonator{items.length !== 1 ? 's' : ''} found</p>
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
      )}

      {/* Similar names/profiles section */}
      {similarProfiles.length > 0 && (
        <div>
          <h4 className="text-sm font-bold text-white mb-1">Similar Names & Profiles Found</h4>
          <p className="text-xs text-slate-500 mb-3">
            These profiles share your name or business name and may cause confusion — they aren't necessarily bad actors, but you should be aware of them.
          </p>
          <div className="space-y-2">
            {similarProfiles.map((sp, i) => (
              <div key={i} className="rounded-lg border border-brand-border bg-brand-dark/50 p-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white truncate">{sp.name}</span>
                    <span className="text-xs text-slate-500 flex-shrink-0">· {sp.platform}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{sp.similarity}</p>
                </div>
                {sp.url && (
                  <a
                    href={sp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-brand-cyan hover:underline flex-shrink-0"
                  >
                    View →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {similarProfiles.length === 0 && items.length === 0 && (
        <div className="rounded-lg border border-brand-border bg-brand-dark/30 p-4 text-center mt-2">
          <p className="text-xs text-slate-500">No similar names or profiles found for <span className="text-white">{name}</span>. Your name appears to be distinctive online.</p>
        </div>
      )}
    </div>
  );
}
