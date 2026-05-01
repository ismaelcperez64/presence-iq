import type { PlatformPresence } from '@/types/audit';

interface Props {
  platforms: PlatformPresence[];
}

export default function PlatformGrid({ platforms }: Props) {
  const found = platforms.filter(p => p.found);
  const missing = platforms.filter(p => !p.found);

  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-1">Platform Actual Presence</h3>
      <p className="text-sm text-slate-400 mb-5">
        {found.length} of {platforms.length} platforms verified — click any to view or improve
      </p>

      {found.length > 0 && (
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            ✅ Active Platforms ({found.length})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {found.map((p) => (
              <div
                key={p.platform}
                className="rounded-lg border border-green-400/20 bg-green-400/5 p-3 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{p.icon}</span>
                    <div>
                      <span className="text-sm font-semibold text-white">{p.platform}</span>
                      {p.verified && (
                        <span className="ml-1.5 text-xs bg-green-400/20 text-green-400 px-1.5 py-0.5 rounded-full border border-green-400/30">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 font-mono tabular-nums">{p.score}/100</span>
                </div>

                <div className="h-1.5 rounded-full bg-brand-border overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-green-400 to-brand-cyan transition-all duration-700"
                    style={{ width: `${p.score}%` }}
                  />
                </div>

                <p className="text-xs text-slate-400 leading-tight">{p.notes}</p>

                <div className="flex items-center gap-2 mt-0.5">
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-xs text-brand-cyan hover:underline truncate"
                    >
                      🔗 View profile →
                    </a>
                  ) : (
                    <span className="flex-1" />
                  )}
                  <a
                    href="#cta-section"
                    className="text-xs text-slate-500 hover:text-white border border-slate-700 hover:border-slate-500 rounded px-2 py-0.5 transition-colors whitespace-nowrap"
                  >
                    Optimize →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {missing.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            ❌ Missing Platforms ({missing.length})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {missing.map((p) => (
              <div
                key={p.platform}
                className="rounded-lg border border-red-400/20 bg-red-400/5 p-3 flex flex-col gap-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{p.icon}</span>
                  <span className="text-sm font-semibold text-white leading-tight">{p.platform}</span>
                </div>
                <p className="text-xs text-slate-500 leading-tight">{p.notes}</p>
                <a
                  href="#cta-section"
                  className="text-xs text-brand-cyan/70 hover:text-brand-cyan transition-colors mt-auto"
                >
                  Create profile →
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
