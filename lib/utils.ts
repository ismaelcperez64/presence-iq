import type { Verdict } from '@/types/audit';

export function getVerdictFromScore(score: number): Verdict {
  if (score < 40) return 'Digital Danger Zone';
  if (score < 65) return 'Needs Work';
  if (score < 85) return 'Building Momentum';
  return 'Authority Status';
}

export function getVerdictColor(verdict: Verdict) {
  switch (verdict) {
    case 'Digital Danger Zone': return { text: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/30', hex: '#f87171' };
    case 'Needs Work':          return { text: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30', hex: '#facc15' };
    case 'Building Momentum':   return { text: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/30', hex: '#4ade80' };
    case 'Authority Status':    return { text: 'text-brand-cyan', bg: 'bg-brand-cyan/10', border: 'border-brand-cyan/30', hex: '#00d4ff' };
  }
}

export function getSeverityColor(severity: 'low' | 'medium' | 'high') {
  switch (severity) {
    case 'low':    return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
    case 'medium': return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
    case 'high':   return 'text-red-400 bg-red-400/10 border-red-400/30';
  }
}

export function getPriorityColor(priority: 'immediate' | 'high' | 'medium' | 'low') {
  switch (priority) {
    case 'immediate': return 'text-red-400 bg-red-400/10';
    case 'high':      return 'text-orange-400 bg-orange-400/10';
    case 'medium':    return 'text-yellow-400 bg-yellow-400/10';
    case 'low':       return 'text-green-400 bg-green-400/10';
  }
}
