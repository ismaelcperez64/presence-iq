import type { PlatformPresence } from '@/types/audit';

interface Props {
  platforms: PlatformPresence[];
}

export default function PlatformGrid({ platforms }: Props) {
  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-4">Platform Presence</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {platforms.map((p) => (
          <div
            key={p.platform}
            className={`rounded-lg border p-3 flex flex-col gap-2 ${
              p.found ? 'border-brand-border bg-brand-card' : 'border-red-400/20 bg-red-400/5'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">{p.platform}</span>
              <span className="text-lg">{p.found ? '✅' : '❌'}</span>
            </div>
            {p.found && (
              <div className="flex items-center gap-1">
                <div className="flex-1 h-1.5 rounded-full bg-brand-border overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan transition-all duration-700"
                    style={{ width: `${p.score}%` }}
                  />
                </div>
                <span className="text-xs text-slate-400 w-8 text-right">{p.score}</span>
              </div>
            )}
            <p className="text-xs text-slate-500 leading-tight">{p.notes}</p>
            {p.found && p.url && (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-brand-cyan hover:underline truncate"
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
