export interface CustomPlatform {
  platform: string;
  url: string;
}

export interface AuditInput {
  name: string;
  businessName: string;
  profession: string;
  location?: string;
  website?: string;
  socialName?: string;
  socialHandle?: string;
  linkedinUrl?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  otherProfiles?: CustomPlatform[];
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
  url?: string | null;
  snippet: string;
  severity: 'low' | 'medium' | 'high';
  type: 'review' | 'complaint' | 'news' | 'forum' | 'derogatory' | 'other';
}

export interface Copycat {
  platform: string;
  url?: string | null;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface SimilarProfile {
  name: string;
  platform: string;
  url?: string | null;
  similarity: string;
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
  similarProfiles?: SimilarProfile[];
  recommendations: Recommendation[];
  scannedAt: string;
}
