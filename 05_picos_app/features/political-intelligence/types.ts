export type Trend = "Up" | "Down" | "Stable";
export type Priority = "Critical" | "High" | "Medium" | "Low";
export type Confidence = "High" | "Medium" | "Low";
export type MatrixType = "risk" | "opportunity";
export type MapMode = "Risk" | "Opportunity" | "Sentiment" | "Influence" | "Events";

export interface IntelligenceMetric {
  label: string;
  value: number;
  previous: number;
  change: number;
  trend: Trend;
  signal: string;
  tone: "positive" | "watch" | "neutral";
}

export interface LiveIntelligenceEvent {
  id: string;
  date: string;
  timestamp: string;
  title: string;
  summary: string;
  priority: Priority;
  source: string;
  sourceType: string;
  category: string;
  eventType: string;
  impactScore: number;
  assignedTeam: string;
  status: string;
  community: string;
  village: string;
  booth: string;
  party: string;
  influencer: string;
  confidence: Confidence;
  nextStep: string;
}

export interface PoliticalAlert {
  id: string;
  severity: Priority;
  description: string;
  affectedArea: string;
  recommendedAction: string;
  owner: string;
}

export interface MatrixItem {
  id: string;
  type: MatrixType;
  title: string;
  probability: number;
  impact: number;
  owner: string;
  affectedArea: string;
  action: string;
}

export interface SentimentSegment {
  segment: string;
  score: number;
  trend: Trend;
  change: number;
  confidence: Confidence;
}

export interface OpponentProfile {
  id: string;
  name: string;
  role: string;
  party: string;
  recentEvents: number;
  mediaMentions: number;
  sentiment: number;
  riskLevel: Priority;
  influenceScore: number;
  latestMovement: string;
  sourceStatus: string;
}

export interface PowerCenterNode {
  id: string;
  label: string;
  type: "candidate" | "team" | "organization" | "community" | "opponent" | "media" | "party";
  x: number;
  y: number;
  influence: number;
}

export interface PowerCenterEdge {
  from: string;
  to: string;
  strength: number;
  label: string;
}

export interface VillageSignal {
  id: string;
  name: string;
  x: number;
  y: number;
  risk: number;
  opportunity: number;
  sentiment: number;
  influence: number;
  events: number;
  booths: number;
  topIssue: string;
}

export interface RiskRecord {
  id: string;
  risk: string;
  probability: number;
  impact: number;
  owner: string;
  status: string;
  targetDate: string;
}

export interface OpportunityRecord {
  id: string;
  opportunity: string;
  voteImpact: Priority | "Medium-High";
  targetCommunity: string;
  priority: Priority;
  owner: string;
  status: string;
}

export interface UpcomingEvent {
  id: string;
  date: string;
  time: string;
  type: string;
  title: string;
  area: string;
  owner: string;
  risk: Priority;
}

export interface StrategicRecommendation {
  id: string;
  priority: Priority;
  recommendation: string;
  reason: string;
  expectedImpact: string;
  action: string;
}

export interface FilterOptions {
  communities: string[];
  villages: string[];
  booths: string[];
  parties: string[];
  riskLevels: string[];
  opportunityLevels: string[];
  influencers: string[];
  eventTypes: string[];
}

export interface PoliticalIntelligenceData {
  meta: {
    screen: string;
    constituency: string;
    subject: string;
    referenceDate: string;
    dataStatus: string;
    sourceDiscipline: string;
  };
  metrics: IntelligenceMetric[];
  liveFeed: LiveIntelligenceEvent[];
  alerts: PoliticalAlert[];
  matrixItems: MatrixItem[];
  sentiment: SentimentSegment[];
  opponents: OpponentProfile[];
  powerCenters: {
    nodes: PowerCenterNode[];
    edges: PowerCenterEdge[];
  };
  villages: VillageSignal[];
  risks: RiskRecord[];
  opportunities: OpportunityRecord[];
  upcomingEvents: UpcomingEvent[];
  recommendations: StrategicRecommendation[];
  filters: FilterOptions;
}

export interface CommandFilters {
  dateRange: "Today" | "7 Days" | "30 Days" | "Custom";
  customStart: string;
  customEnd: string;
  community: string;
  village: string;
  booth: string;
  party: string;
  riskLevel: string;
  opportunityLevel: string;
  influencer: string;
  eventType: string;
}

export interface SearchResult {
  id: string;
  kind: string;
  title: string;
  subtitle: string;
}
