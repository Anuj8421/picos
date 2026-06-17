import type { Confidence, Priority, Trend } from "@/features/political-intelligence/types";

export interface SnapshotMetric {
  label: string;
  value: string | number;
  previous?: string | number;
  change?: number;
  trend: Trend;
}

export interface CandidateSnapshot {
  fullName: string;
  designation: string;
  party: string;
  constituency: string;
  age: string;
  politicalExperience: string;
  currentPosition: string;
  electionStatus: string;
  photoStatus: string;
  metrics: SnapshotMetric[];
}

export interface DossierMilestone {
  id: string;
  date: string;
  category: string;
  title: string;
  description: string;
  evidence: string;
  mediaReferences: string;
  documents: string;
  confidence: Confidence;
}

export interface JourneyEvent extends DossierMilestone {
  x: number;
  lane: "Organization" | "Party" | "Election" | "Achievement" | "Risk";
}

export interface RelationshipNode {
  id: string;
  label: string;
  type: "candidate" | "family" | "organization" | "party" | "community" | "media" | "worker" | "business";
  relationship: "Supportive" | "Neutral" | "Opposed" | "Unknown";
  influence: number;
  reach: number;
  x: number;
  y: number;
}

export interface RelationshipEdge {
  from: string;
  to: string;
  strength: number;
  relationship: "Supportive" | "Neutral" | "Opposed" | "Unknown";
}

export interface OrganizationRecord {
  id: string;
  name: string;
  type: string;
  role: string;
  influence: number;
  reach: string;
  status: string;
  relationships: string;
}

export interface AchievementRecord {
  id: string;
  category: string;
  title: string;
  description: string;
  location: string;
  impact: string;
  evidence: string;
  mediaCoverage: string;
  documents: string;
}

export interface PerceptionPoint {
  label: string;
  positive: number;
  neutral: number;
  negative: number;
  trust: number;
}

export interface CommunitySupport {
  community: string;
  support: number;
  sentiment: number;
  trend: Trend;
  confidence: number;
}

export interface GeographySupport {
  id: string;
  name: string;
  classification: "Strong" | "Weak" | "Swing" | "Growth" | "Risk";
  support: number;
  x: number;
  y: number;
  booth: string;
  ward: string;
  community: string;
  note: string;
}

export interface SwotItem {
  id: string;
  category: "Strengths" | "Weaknesses" | "Opportunities" | "Threats";
  item: string;
  priority: Priority;
  impact: number;
  owner: string;
  status: string;
  reviewDate: string;
}

export interface MediaSignal {
  channel: string;
  coverage: number;
  sentiment: number;
  reach: string;
  influence: number;
  topItem: string;
}

export interface SocialSignal {
  platform: string;
  followers: string;
  reach: string;
  engagement: string;
  growth: string;
  sentiment: number;
  topContent: string;
  audienceBreakdown: string;
}

export interface ElectionPerformance {
  year: string;
  election: string;
  votes: string;
  voteShare: string;
  margin: string;
  turnout: string;
  opponent: string;
  sourceStatus: string;
}

export interface RiskRegisterItem {
  id: string;
  risk: string;
  probability: number;
  impact: number;
  severity: Priority;
  owner: string;
  mitigation: string;
  status: string;
}

export interface CandidateOpportunity {
  id: string;
  opportunity: string;
  potentialImpact: string;
  targetCommunity: string;
  targetGeography: string;
  priority: Priority;
  owner: string;
  status: string;
  expectedVoteImpact: string;
}

export interface CandidateInsight {
  id: string;
  type: string;
  title: string;
  detail: string;
  action: string;
  priority: Priority;
}

export interface EvidenceItem {
  id: string;
  type: "Image" | "Video" | "Document" | "Certificate" | "Letter" | "Media Mention" | "Report";
  title: string;
  category: string;
  source: string;
  status: string;
  date: string;
}

export interface CandidateIntelligenceData {
  snapshot: CandidateSnapshot;
  biography: DossierMilestone[];
  journey: JourneyEvent[];
  relationships: {
    nodes: RelationshipNode[];
    edges: RelationshipEdge[];
  };
  organizations: OrganizationRecord[];
  achievements: AchievementRecord[];
  perception: {
    current: {
      positive: number;
      neutral: number;
      negative: number;
      trust: number;
      popularity: number;
      acceptance: number;
    };
    monthly: PerceptionPoint[];
    quarterly: PerceptionPoint[];
    yearly: PerceptionPoint[];
  };
  communitySupport: CommunitySupport[];
  geography: GeographySupport[];
  swot: SwotItem[];
  media: MediaSignal[];
  social: SocialSignal[];
  electionPerformance: ElectionPerformance[];
  risks: RiskRegisterItem[];
  opportunities: CandidateOpportunity[];
  insights: CandidateInsight[];
  evidence: EvidenceItem[];
}
