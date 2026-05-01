export interface AuditInput {
  name: string;
  businessName: string;
  profession: string;
  location?: string;
  website?: string;
}

export interface PlatformPresence {
  platform: string;
  icon: string;
  found: boolean;
  url?: string;
  score: number;
  verified: boolean;
  notes: string;
}

export interface NegativeContent {
  source: string;
  url?: string;
  snippet: string;
  severity: 'low' | 'medium' | 'high';
  type: 'review' | 'complaint' | 'news' | 'forum' | 'other';
}

export interface Copycat {
  platform: string;
  url?: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface Recommendation {
  priority: 'immediate' | 'high' | 'medium' | 'low';
  category: string;
  action: string;
  impact: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export type Verdict =
  | 'Digital Danger Zone'
  | 'Needs Work'
  | 'Building Momentum'
  | 'Authority Status';

export interface AuditResult {
  overallScore: number;
  verdict: Verdict;
  summary: string;
  platforms: PlatformPresence[];
  negativeContent: NegativeContent[];
  copycats: Copycat[];
  recommendations: Recommendation[];
  scannedAt: string;
}
