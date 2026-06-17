export type Trend = "Up" | "Down" | "Stable";
export type Priority = "Critical" | "High" | "Medium" | "Low";
export type VillageClass = "Strong" | "Weak" | "Swing" | "Growth" | "Risk";

export interface VoterMetric {
  label: string;
  value: string;
  previous: string;
  change: number;
  trend: Trend;
  confidence: number;
}

export interface SupportDistribution {
  status: "Supporters" | "Opponents" | "Neutral" | "Unknown" | "Persuadable";
  value: number;
  voters: number;
}

export interface CommunitySupportSignal {
  community: string;
  support: number;
  opposition: number;
  neutral: number;
  trend: Trend;
  confidence: number;
  influence: number;
  opportunity: number;
  risk: number;
}

export interface TargetCommunity {
  community: string;
  potentialVoteGain: number;
  currentSupport: number;
  targetSupport: number;
  priority: Priority;
  recommendedAction: string;
  owner: string;
}

export interface VillageVoteSignal {
  id: string;
  village: string;
  classification: VillageClass;
  currentSupport: number;
  opposition: number;
  opportunity: number;
  turnout: number;
  potentialGain: number;
  majorIssue: string;
  influencer: string;
  priority: Priority;
  recommendedAction: string;
  expectedVoteImpact: number;
  x: number;
  y: number;
}

export interface PersuasionCluster {
  village: string;
  community: string;
  currentSupport: number;
  potentialGain: number;
  issue: string;
  recommendedIntervention: string;
  expectedVotes: number;
  confidence: number;
}

export interface IssueVoteImpact {
  issue: string;
  affectedVoters: number;
  affectedVillages: string;
  affectedCommunities: string;
  politicalImpact: number;
  opportunity: number;
  priority: Priority;
}

export interface InfluencerImpact {
  influencer: string;
  influencedVoters: number;
  influenceScore: number;
  supportStatus: string;
  relationshipStrength: number;
  politicalAlignment: string;
  potentialVoteImpact: number;
}

export interface TurnoutSignal {
  label: string;
  value: number;
  mobilizationPriority: Priority;
  turnoutRiskScore: number;
}

export interface BoothPerformance {
  classification: VillageClass;
  currentSupport: number;
  expectedSupport: number;
  potentialGain: number;
  boothPriority: Priority;
}

export interface VoteGainOpportunity {
  opportunity: string;
  expectedVotes: number;
  community: string;
  village: string;
  priority: Priority;
  owner: string;
  status: string;
  targetDate: string;
}

export interface VoteLossRisk {
  risk: string;
  potentialVoteLoss: number;
  affectedArea: string;
  community: string;
  severity: Priority;
  owner: string;
  mitigationPlan: string;
  status: string;
}

export interface VoterRecommendation {
  recommendation: string;
  reason: string;
  expectedVoteImpact: number;
  confidence: number;
  actionLabel: string;
}

export interface VoterFilters {
  dateRange: string;
  village: string;
  booth: string;
  community: string;
  gender: string;
  ageGroup: string;
  occupation: string;
  supportStatus: string;
  influenceLevel: string;
  turnoutRisk: string;
}

export interface VoterIntelligenceData {
  metrics: VoterMetric[];
  supportDistribution: SupportDistribution[];
  communities: CommunitySupportSignal[];
  targetCommunities: TargetCommunity[];
  villages: VillageVoteSignal[];
  persuasionClusters: PersuasionCluster[];
  issueImpact: IssueVoteImpact[];
  influencers: InfluencerImpact[];
  turnout: TurnoutSignal[];
  booths: BoothPerformance[];
  gainOpportunities: VoteGainOpportunity[];
  lossRisks: VoteLossRisk[];
  recommendations: VoterRecommendation[];
}

export type CommunitySentiment = "Positive" | "Neutral" | "Negative";
export type CommunityAlignment = "Supportive" | "Neutral" | "Opponent-leaning" | "Persuadable" | "Mixed";

export interface CommunityOverviewMetric {
  label: string;
  value: string;
  trend: Trend;
  change: number;
  confidence: number;
}

export interface CommunityCommandRecord {
  id: string;
  community: string;
  populationEstimate: number;
  estimatedVoters: number;
  currentSupport: number;
  opposition: number;
  neutral: number;
  persuadable: number;
  turnout: number;
  sentiment: CommunitySentiment;
  trend: Trend;
  influence: number;
  risk: number;
  opportunity: number;
  confidence: number;
}

export interface CommunityIssueSignal {
  community: string;
  topIssues: string[];
  severity: Priority;
  affectedPopulation: number;
  politicalImpact: number;
  opportunityScore: number;
  owner: string;
}

export interface CommunityInfluencerSignal {
  name: string;
  community: string;
  category: string;
  influenceScore: number;
  reach: number;
  alignment: CommunityAlignment;
  relationshipStrength: number;
  village: string;
}

export interface CommunityGeoSignal {
  id: string;
  village: string;
  booth: string;
  community: string;
  support: number;
  sentiment: CommunitySentiment;
  influence: number;
  issue: string;
  x: number;
  y: number;
}

export interface CommunitySupportTrend {
  community: string;
  monthly: number;
  quarterly: number;
  yearly: number;
  currentSupport: number;
}

export interface CommunityRiskSignal {
  risk: string;
  community: string;
  probability: number;
  impact: number;
  severity: Priority;
  owner: string;
  status: string;
}

export interface CommunityOpportunitySignal {
  opportunity: string;
  community: string;
  expectedVoteGain: number;
  priority: Priority;
  owner: string;
  status: string;
}

export interface CommunityEngagementSignal {
  community: string;
  meetings: number;
  visits: number;
  listeningSessions: number;
  events: number;
  outreachCampaigns: number;
  volunteerActivity: string;
  nextAction: string;
}

export interface CommunityNetworkNode {
  id: string;
  label: string;
  type: "community" | "leader" | "organization" | "influencer" | "village";
  x: number;
  y: number;
}

export interface CommunityNetworkEdge {
  from: string;
  to: string;
  strength: number;
}

export interface CommunityComparisonProfile {
  community: string;
  support: number;
  sentiment: CommunitySentiment;
  primaryIssue: string;
  influence: number;
  turnout: number;
  opportunity: number;
}

export interface CommunityRecommendation {
  recommendation: string;
  reason: string;
  expectedGain: number;
  confidence: number;
  actionLabel: string;
}

export interface CommunityFilters {
  community: string;
  village: string;
  booth: string;
  issue: string;
  sentiment: string;
  supportLevel: string;
  influenceScore: string;
  riskLevel: string;
  opportunityLevel: string;
  dateRange: string;
}

export interface CommunityIntelligenceData {
  overview: CommunityOverviewMetric[];
  command: CommunityCommandRecord[];
  issues: CommunityIssueSignal[];
  influencers: CommunityInfluencerSignal[];
  geo: CommunityGeoSignal[];
  trends: CommunitySupportTrend[];
  risks: CommunityRiskSignal[];
  opportunities: CommunityOpportunitySignal[];
  engagement: CommunityEngagementSignal[];
  networkNodes: CommunityNetworkNode[];
  networkEdges: CommunityNetworkEdge[];
  comparisons: CommunityComparisonProfile[];
  recommendations: CommunityRecommendation[];
}

export type VillageVisitPriority = "Critical" | "High" | "Medium" | "Low";
export type VillageOperationalStatus = "Covered" | "Uncovered" | "Needs Visit" | "Monitoring" | "Action Active";

export interface VillageOverviewMetric {
  label: string;
  value: string;
  trend: Trend;
  change: number;
  confidence: number;
}

export interface VillageCommandRecord {
  id: string;
  village: string;
  classification: VillageClass;
  population: number;
  estimatedVoters: number;
  supportScore: number;
  sentimentScore: number;
  influenceScore: number;
  riskScore: number;
  opportunityScore: number;
  visitPriority: VillageVisitPriority;
  assignedCoordinator: string;
  status: VillageOperationalStatus;
  x: number;
  y: number;
}

export interface VillageTargetSignal {
  village: string;
  currentSupport: number;
  potentialSupport: number;
  voteGainPotential: number;
  priority: Priority;
  reason: string;
  recommendedAction: string;
  expectedImpact: number;
}

export interface VillageRiskSignal {
  village: string;
  riskType: string;
  potentialVoteLoss: number;
  severity: Priority;
  reason: string;
  owner: string;
  mitigationPlan: string;
  status: string;
}

export interface VillageSupportProfile {
  village: string;
  supporters: number;
  opponents: number;
  neutral: number;
  persuadable: number;
  unknown: number;
}

export interface VillageCommunityBreakdown {
  village: string;
  maratha: number;
  mali: number;
  vanjari: number;
  dhangar: number;
  sc: number;
  st: number;
  minority: number;
  youth: number;
  women: number;
  farmers: number;
  supportLevel: string;
}

export interface VillageIssueSignal {
  village: string;
  topIssues: string[];
  severity: Priority;
  affectedPopulation: number;
  politicalImpact: number;
  opportunityScore: number;
}

export interface VillageInfluencerSignal {
  name: string;
  village: string;
  type: string;
  influenceScore: number;
  alignment: CommunityAlignment;
  relationshipStrength: number;
  reach: number;
}

export interface VillageVisitPlan {
  village: string;
  lastVisit: string;
  visitFrequency: string;
  pendingVisit: string;
  visitPriority: VillageVisitPriority;
  recommendedVisitor: string;
  purpose: string;
  expectedOutcome: string;
  status: string;
}

export interface VillageEngagementSignal {
  village: string;
  meetings: number;
  events: number;
  listeningSessions: number;
  volunteerActivities: number;
  issueResolutionActivities: number;
  campaignActivities: number;
}

export interface VillageSentimentSignal {
  village: string;
  currentSentiment: number;
  previousSentiment: number;
  trend: Trend;
  confidence: number;
  monthlyChange: number;
}

export interface VillageOpportunitySignal {
  opportunity: string;
  village: string;
  expectedVotes: number;
  priority: Priority;
  owner: string;
  status: string;
  targetDate: string;
}

export interface VillageTaskSignal {
  village: string;
  openTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  completedTasks: number;
  highestPriorityTask: string;
}

export interface VillageRecommendation {
  recommendation: string;
  reason: string;
  expectedVoteImpact: number;
  confidence: number;
  priority: Priority;
  actionLabel: string;
}

export interface VillageComparisonProfile {
  village: string;
  support: number;
  sentiment: number;
  issues: string;
  influencers: string;
  risks: string;
  opportunities: string;
  turnout: number;
  communityMix: string;
}

export interface VillageFilters {
  village: string;
  supportLevel: string;
  sentiment: string;
  risk: string;
  opportunity: string;
  visitPriority: string;
  coordinator: string;
  issue: string;
  dateRange: string;
}

export interface VillageIntelligenceData {
  overview: VillageOverviewMetric[];
  command: VillageCommandRecord[];
  targets: VillageTargetSignal[];
  risks: VillageRiskSignal[];
  support: VillageSupportProfile[];
  communityBreakdown: VillageCommunityBreakdown[];
  issues: VillageIssueSignal[];
  influencers: VillageInfluencerSignal[];
  visitPlanner: VillageVisitPlan[];
  engagement: VillageEngagementSignal[];
  sentiment: VillageSentimentSignal[];
  opportunities: VillageOpportunitySignal[];
  tasks: VillageTaskSignal[];
  recommendations: VillageRecommendation[];
  comparisons: VillageComparisonProfile[];
}

export type HouseholdSupportClass = "Strong" | "Weak" | "Neutral" | "Persuadable" | "Influential" | "Risk" | "Growth";
export type HouseholdStatus = "Covered" | "Needs Visit" | "Follow-up" | "Monitoring" | "Action Active";

export interface HouseholdOverviewMetric {
  label: string;
  value: string;
  trend: Trend;
  change: number;
  confidence: number;
}

export interface HouseholdCommandRecord {
  id: string;
  householdName: string;
  village: string;
  booth: string;
  address: string;
  familySize: number;
  eligibleVoters: number;
  supportScore: number;
  influenceScore: number;
  riskScore: number;
  opportunityScore: number;
  visitPriority: Priority;
  assignedWorker: string;
  status: HouseholdStatus;
  classification: HouseholdSupportClass;
  community: string;
  occupation: string;
  education: string;
  economicProfile: string;
  politicalAlignment: CommunityAlignment;
  relationshipStrength: number;
  notes: string;
  x: number;
  y: number;
}

export interface HouseholdTargetSignal {
  household: string;
  currentSupport: number;
  potentialSupport: number;
  expectedVoteGain: number;
  priority: Priority;
  reason: string;
  recommendedAction: string;
  expectedImpact: number;
}

export interface HouseholdRiskSignal {
  household: string;
  riskType: string;
  potentialVoteLoss: number;
  severity: Priority;
  reason: string;
  owner: string;
  mitigationPlan: string;
  status: string;
}

export interface FamilyMemberSignal {
  householdId: string;
  name: string;
  age: number;
  gender: string;
  familyRole: string;
  occupation: string;
  politicalLeaning: string;
  supportScore: number;
  influenceScore: number;
  relationshipStrength: number;
  turnoutProbability: number;
}

export interface HouseholdInfluencerSignal {
  householdId: string;
  name: string;
  role: "Primary Influencer" | "Secondary Influencer" | "External Influencer";
  influenceScore: number;
  politicalAlignment: CommunityAlignment;
  relationshipStrength: number;
  reach: number;
  expectedImpact: number;
}

export interface HouseholdIssueSignal {
  householdId: string;
  issue: string;
  severity: Priority;
  politicalImpact: number;
  opportunity: number;
  status: string;
}

export interface HouseholdSupportAnalysis {
  householdId: string;
  supportiveMembers: number;
  opposingMembers: number;
  neutralMembers: number;
  persuadableMembers: number;
  unknownMembers: number;
}

export interface HouseholdVisitHistory {
  householdId: string;
  visitDate: string;
  visitor: string;
  purpose: string;
  outcome: string;
  notes: string;
  followUpRequired: string;
  status: string;
}

export interface HouseholdEngagementSignal {
  householdId: string;
  meetings: number;
  phoneCalls: number;
  issueResolution: number;
  schemeAssistance: number;
  eventsAttended: number;
  volunteerEngagement: number;
}

export interface HouseholdTurnoutSignal {
  householdId: string;
  expectedTurnout: number;
  turnoutRisk: number;
  firstTimeVoters: number;
  seniorCitizens: number;
  mobilizationNeeds: string;
  electionDayPlan: string;
}

export interface HouseholdPersuasionSignal {
  household: string;
  persuasionScore: number;
  reasons: string;
  influencers: string;
  recommendedMessaging: string;
  recommendedVisitor: string;
  recommendedTiming: string;
  expectedVoteGain: number;
}

export interface HouseholdTaskSignal {
  household: string;
  openTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  completedTasks: number;
  highestPriorityTask: string;
}

export interface HouseholdRelationshipNode {
  id: string;
  label: string;
  type: "household" | "member" | "influencer" | "organization" | "political";
  x: number;
  y: number;
}

export interface HouseholdRelationshipEdge {
  from: string;
  to: string;
  strength: number;
}

export interface HouseholdRecommendation {
  recommendation: string;
  reason: string;
  confidence: number;
  expectedVotes: number;
  priority: Priority;
  actionLabel: string;
}

export interface HouseholdComparisonProfile {
  household: string;
  support: number;
  influence: number;
  issues: string;
  turnout: number;
  persuasion: number;
  relationshipStrength: number;
}

export interface HouseholdFilters {
  village: string;
  booth: string;
  community: string;
  support: string;
  influence: string;
  risk: string;
  opportunity: string;
  turnout: string;
  visitPriority: string;
  dateRange: string;
}

export interface HouseholdIntelligenceData {
  overview: HouseholdOverviewMetric[];
  command: HouseholdCommandRecord[];
  targets: HouseholdTargetSignal[];
  risks: HouseholdRiskSignal[];
  familyMembers: FamilyMemberSignal[];
  influencers: HouseholdInfluencerSignal[];
  issues: HouseholdIssueSignal[];
  support: HouseholdSupportAnalysis[];
  visits: HouseholdVisitHistory[];
  engagement: HouseholdEngagementSignal[];
  turnout: HouseholdTurnoutSignal[];
  persuasion: HouseholdPersuasionSignal[];
  tasks: HouseholdTaskSignal[];
  relationshipNodes: HouseholdRelationshipNode[];
  relationshipEdges: HouseholdRelationshipEdge[];
  recommendations: HouseholdRecommendation[];
  comparisons: HouseholdComparisonProfile[];
}

export type InfluencerCategory =
  | "Sarpanch"
  | "Ex-Sarpanch"
  | "Teacher"
  | "Doctor"
  | "Farmer Leader"
  | "Business Leader"
  | "Religious Leader"
  | "Social Worker"
  | "Political Worker"
  | "Youth Leader"
  | "Women Leader"
  | "NGO Leader"
  | "Media Personality"
  | "Contractor"
  | "Cooperative Leader";

export type InfluencerSupportLevel = "Supportive" | "Neutral" | "Opposing" | "Persuadable" | "High Influence" | "High Risk" | "Growth Opportunity";

export interface InfluencerOverviewMetric {
  label: string;
  value: string;
  trend: Trend;
  change: number;
  confidence: number;
}

export interface InfluencerCommandRecord {
  id: string;
  name: string;
  category: InfluencerCategory;
  village: string;
  community: string;
  occupation: string;
  organizations: string[];
  influenceScore: number;
  estimatedVotersInfluenced: number;
  politicalAlignment: CommunityAlignment;
  relationshipStrength: number;
  supportLevel: InfluencerSupportLevel;
  priority: Priority;
  status: string;
  photoLabel: string;
  notes: string;
}

export interface InfluenceNetworkNode {
  id: string;
  label: string;
  type: "influencer" | "community" | "village" | "organization" | "voters";
  x: number;
  y: number;
}

export interface InfluenceNetworkEdge {
  from: string;
  to: string;
  strength: number;
}

export interface TopInfluencerSignal {
  influencer: string;
  influenceScore: number;
  reach: number;
  support: string;
  relationship: number;
  expectedVoteImpact: number;
  priority: Priority;
  recommendedAction: string;
}

export interface InfluencerRiskSignal {
  influencer: string;
  risk: string;
  potentialVoteImpact: number;
  severity: Priority;
  reason: string;
  owner: string;
  mitigation: string;
  status: string;
}

export interface InfluencerCategorySignal {
  category: InfluencerCategory;
  count: number;
  supportive: number;
  persuadable: number;
  risk: number;
  combinedReach: number;
}

export interface CommunityInfluenceAnalysis {
  community: string;
  topInfluencers: string;
  combinedReach: number;
  supportScore: number;
  opportunityScore: number;
  riskScore: number;
}

export interface VillageInfluenceAnalysis {
  village: string;
  topInfluencers: string;
  combinedReach: number;
  support: number;
  risk: number;
  opportunity: number;
  influenceDensity: number;
}

export interface OrganizationInfluenceAnalysis {
  organization: string;
  members: number;
  reach: number;
  politicalAlignment: CommunityAlignment;
  influence: number;
}

export interface InfluencerRelationshipSignal {
  influencer: string;
  relationshipStrength: number;
  history: string;
  lastContact: string;
  lastMeeting: string;
  lastEvent: string;
  nextAction: string;
  assignedTeam: string;
  status: string;
}

export interface InfluencerEngagementSignal {
  influencer: string;
  meetings: number;
  calls: number;
  events: number;
  visits: number;
  issueResolution: number;
  introductions: number;
  followUps: number;
}

export interface InfluencerSentimentSignal {
  influencer: string;
  sentiment: CommunitySentiment;
  trend: Trend;
  confidence: number;
  influenceImpact: number;
  historicalMovement: number;
}

export interface InfluencerOpportunitySignal {
  influencer: string;
  expectedVoteGain: number;
  targetCommunity: string;
  priority: Priority;
  owner: string;
  status: string;
  actionPlan: string;
}

export interface InfluencerRiskAnalysisSignal {
  influencer: string;
  potentialVoteLoss: number;
  riskType: string;
  severity: Priority;
  owner: string;
  mitigationPlan: string;
  status: string;
}

export interface InfluencerTaskSignal {
  influencer: string;
  openTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  completedTasks: number;
  highestPriorityTask: string;
}

export interface InfluencerRecommendation {
  recommendation: string;
  reason: string;
  confidence: number;
  expectedVotes: number;
  priority: Priority;
  actionLabel: string;
}

export interface InfluencerComparisonProfile {
  influencer: string;
  reach: number;
  influence: number;
  communities: string;
  villages: string;
  support: string;
  risk: number;
  opportunity: number;
  relationshipStrength: number;
}

export interface InfluencerFilters {
  village: string;
  community: string;
  category: string;
  supportLevel: string;
  influenceScore: string;
  riskLevel: string;
  opportunityLevel: string;
  relationshipStrength: string;
  dateRange: string;
}

export interface InfluencerIntelligenceData {
  overview: InfluencerOverviewMetric[];
  command: InfluencerCommandRecord[];
  networkNodes: InfluenceNetworkNode[];
  networkEdges: InfluenceNetworkEdge[];
  topInfluencers: TopInfluencerSignal[];
  risks: InfluencerRiskSignal[];
  categories: InfluencerCategorySignal[];
  communityAnalysis: CommunityInfluenceAnalysis[];
  villageAnalysis: VillageInfluenceAnalysis[];
  organizationAnalysis: OrganizationInfluenceAnalysis[];
  relationships: InfluencerRelationshipSignal[];
  engagement: InfluencerEngagementSignal[];
  sentiment: InfluencerSentimentSignal[];
  opportunities: InfluencerOpportunitySignal[];
  riskAnalysis: InfluencerRiskAnalysisSignal[];
  tasks: InfluencerTaskSignal[];
  recommendations: InfluencerRecommendation[];
  comparisons: InfluencerComparisonProfile[];
}

export type PersuasionTargetType = "Community" | "Village" | "Household" | "Influencer" | "Issue" | "Campaign";
export type PersuasionStatus = "Identified" | "Analyzing" | "Planning" | "Outreach Started" | "Engaged" | "Converted" | "Lost";
export type EffortRequired = "Low" | "Medium" | "High";

export interface PersuasionOverviewMetric {
  label: string;
  value: string;
  trend: Trend;
  change: number;
  confidence: number;
}

export interface PersuasionCommandMetric {
  label: string;
  value: string;
  detail: string;
  tone: "positive" | "watch" | "risk";
}

export interface PersuasionOpportunity {
  opportunity: string;
  target: string;
  type: PersuasionTargetType;
  currentSupport: number;
  potentialSupport: number;
  expectedVoteGain: number;
  conversionProbability: number;
  priority: Priority;
  recommendedAction: string;
  owner: string;
  status: PersuasionStatus;
  issue: string;
  influencer: string;
}

export interface PersuadableCommunitySignal {
  community: string;
  currentSupport: number;
  potentialSupport: number;
  expectedGain: number;
  mainIssues: string;
  influencers: string;
  opportunityScore: number;
  priority: Priority;
}

export interface PersuadableVillageSignal {
  village: string;
  currentSupport: number;
  potentialSupport: number;
  expectedGain: number;
  topIssues: string;
  influencers: string;
  priority: Priority;
  recommendedAction: string;
}

export interface PersuadableHouseholdSignal {
  household: string;
  village: string;
  currentAlignment: string;
  potentialAlignment: string;
  influencer: string;
  expectedVotes: number;
  priority: Priority;
  recommendedVisitor: string;
  recommendedAction: string;
}

export interface PersuadableInfluencerSignal {
  influencer: string;
  currentAlignment: string;
  potentialAlignment: string;
  influenceReach: number;
  expectedVoteGain: number;
  priority: Priority;
  recommendedStrategy: string;
}

export interface IssuePersuasionSignal {
  issue: string;
  affectedVoters: number;
  affectedVillages: string;
  affectedCommunities: string;
  conversionPotential: number;
  priority: Priority;
}

export interface MessageEffectivenessSignal {
  messageTheme: string;
  targetAudience: string;
  expectedImpact: number;
  conversionProbability: number;
}

export interface CommunityConversionMatrixRow {
  community: string;
  support: number;
  neutral: number;
  persuadable: number;
  opposition: number;
  conversionPotential: number;
}

export interface VillageConversionMatrixRow {
  village: string;
  currentSupport: number;
  potentialSupport: number;
  expectedGain: number;
  conversionScore: number;
  priority: Priority;
}

export interface CampaignActionRecommendation {
  action: string;
  target: string;
  expectedVoteGain: number;
  effortRequired: EffortRequired;
  priority: Priority;
  owner: string;
  status: string;
}

export interface PersuasionPipelineStage {
  stage: PersuasionStatus;
  count: number;
  expectedVotes: number;
}

export interface VoteGainForecast {
  segment: string;
  type: PersuasionTargetType;
  bestCase: number;
  likelyCase: number;
  worstCase: number;
  expectedVoteGain: number;
}

export interface ConversionSuccessSignal {
  activity: string;
  expectedImpact: number;
  actualImpact: number;
  successRate: number;
  lessonsLearned: string;
}

export interface PersuasionScenario {
  scenario: string;
  expectedVoteGain: number;
  seatImpact: string;
  winProbabilityChange: number;
}

export interface PersuasionTaskSignal {
  campaign: string;
  openTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  completedTasks: number;
  highestPriorityTask: string;
}

export interface PersuasionRecommendation {
  recommendation: string;
  reason: string;
  confidence: number;
  expectedImpact: number;
  priority: Priority;
  actionLabel: string;
}

export interface PersuasionFilters {
  village: string;
  community: string;
  issue: string;
  influencer: string;
  conversionScore: string;
  priority: string;
  status: string;
  dateRange: string;
}

export interface PersuasionIntelligenceData {
  overview: PersuasionOverviewMetric[];
  command: PersuasionCommandMetric[];
  opportunities: PersuasionOpportunity[];
  communities: PersuadableCommunitySignal[];
  villages: PersuadableVillageSignal[];
  households: PersuadableHouseholdSignal[];
  influencers: PersuadableInfluencerSignal[];
  issues: IssuePersuasionSignal[];
  messages: MessageEffectivenessSignal[];
  communityMatrix: CommunityConversionMatrixRow[];
  villageMatrix: VillageConversionMatrixRow[];
  actions: CampaignActionRecommendation[];
  pipeline: PersuasionPipelineStage[];
  forecasts: VoteGainForecast[];
  success: ConversionSuccessSignal[];
  scenarios: PersuasionScenario[];
  tasks: PersuasionTaskSignal[];
  recommendations: PersuasionRecommendation[];
}

export type TurnoutTargetType = "Community" | "Village" | "Booth" | "Household" | "Voter Segment" | "Campaign";
export type TurnoutStatus = "Identified" | "Contacted" | "Confirmed" | "Reminded" | "Mobilized" | "Voted" | "Unknown";
export type TurnoutMapClass = "Strong Turnout" | "Weak Turnout" | "Turnout Risk" | "Mobilization Opportunity" | "Election-Day Priority";

export interface TurnoutOverviewMetric {
  label: string;
  value: string;
  trend: Trend;
  change: number;
  confidence: number;
}

export interface TurnoutCommandMetric {
  label: string;
  value: string;
  detail: string;
  tone: "positive" | "watch" | "risk";
}

export interface TurnoutMapSignal {
  id: string;
  village: string;
  booth: string;
  community: string;
  age: string;
  gender: string;
  supportLevel: string;
  classification: TurnoutMapClass;
  expectedTurnout: number;
  turnoutRisk: number;
  mobilizationOpportunity: number;
  electionDayPriority: Priority;
  x: number;
  y: number;
}

export interface TurnoutTargetSignal {
  target: string;
  type: TurnoutTargetType;
  village: string;
  currentTurnoutProbability: number;
  potentialTurnout: number;
  expectedVotes: number;
  priority: Priority;
  recommendedAction: string;
  owner: string;
  status: string;
}

export interface CommunityTurnoutSignal {
  community: string;
  expectedTurnout: number;
  historicalTurnout: number;
  turnoutRisk: number;
  mobilizationPotential: number;
  priority: Priority;
}

export interface VillageTurnoutSignal {
  village: string;
  expectedTurnout: number;
  historicalTurnout: number;
  supportBase: number;
  mobilizationNeed: number;
  expectedVotes: number;
  priority: Priority;
}

export interface BoothTurnoutSignal {
  booth: string;
  registeredVoters: number;
  supporters: number;
  expectedTurnout: number;
  targetTurnout: number;
  risk: number;
  boothReadiness: number;
  coordinator: string;
  priority: Priority;
}

export interface TurnoutHouseholdSignal {
  household: string;
  supportLevel: string;
  turnoutProbability: number;
  risk: number;
  influencer: string;
  expectedVotes: number;
  recommendedFollowUp: string;
  priority: Priority;
}

export interface FirstTimeVoterSignal {
  segment: string;
  totalVoters: number;
  villageDistribution: string;
  communityDistribution: string;
  engagementLevel: number;
  supportLevel: number;
  turnoutProbability: number;
  priorityActions: string;
  priority: Priority;
}

export interface SeniorCitizenMobilizationSignal {
  segment: string;
  totalSeniorCitizens: number;
  supportLevel: number;
  turnoutRisk: number;
  transportationNeeds: number;
  specialAssistanceNeeded: string;
  electionDayPlan: string;
  priority: Priority;
}

export interface WomenTurnoutSignal {
  segment: string;
  supportLevel: number;
  turnoutProbability: number;
  communityBreakdown: string;
  villageBreakdown: string;
  mobilizationOpportunity: number;
  priority: Priority;
}

export interface MobilizationCampaignSignal {
  campaign: string;
  coverage: number;
  impact: number;
  status: string;
  expectedVotes: number;
  owner: string;
  priority: Priority;
}

export interface ElectionDayOperationSignal {
  operation: string;
  readiness: number;
  riskAlerts: string;
  owner: string;
  status: string;
  priority: Priority;
}

export interface TurnoutPipelineStage {
  stage: TurnoutStatus;
  voters: number;
  expectedVotes: number;
}

export interface VoteProtectionSignal {
  area: string;
  highValueSupporters: number;
  criticalBooths: string;
  criticalVillages: string;
  criticalCommunities: string;
  potentialRisks: string;
  escalationPlan: string;
  priority: Priority;
}

export interface TurnoutForecastSignal {
  segment: string;
  bestCase: number;
  likelyCase: number;
  worstCase: number;
  expectedVotes: number;
  additionalVotesPossible: number;
  turnoutGap: number;
}

export interface TurnoutRecommendation {
  recommendation: string;
  reason: string;
  confidence: number;
  expectedVotes: number;
  priority: Priority;
  actionLabel: string;
}

export interface TurnoutTaskSignal {
  campaign: string;
  openTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  completedTasks: number;
  highestPriorityTask: string;
}

export interface ElectionDayAlertSignal {
  alert: string;
  type: "Critical Alert" | "Turnout Alert" | "Booth Alert" | "Volunteer Alert" | "Village Alert";
  priority: Priority;
  owner: string;
  status: string;
}

export interface TurnoutFilters {
  village: string;
  booth: string;
  community: string;
  supportLevel: string;
  turnoutProbability: string;
  priority: string;
  status: string;
  dateRange: string;
}

export interface TurnoutIntelligenceData {
  overview: TurnoutOverviewMetric[];
  command: TurnoutCommandMetric[];
  heatMap: TurnoutMapSignal[];
  targets: TurnoutTargetSignal[];
  communities: CommunityTurnoutSignal[];
  villages: VillageTurnoutSignal[];
  booths: BoothTurnoutSignal[];
  households: TurnoutHouseholdSignal[];
  firstTimeVoters: FirstTimeVoterSignal[];
  seniorCitizens: SeniorCitizenMobilizationSignal[];
  womenTurnout: WomenTurnoutSignal[];
  campaigns: MobilizationCampaignSignal[];
  electionDayOperations: ElectionDayOperationSignal[];
  pipeline: TurnoutPipelineStage[];
  voteProtection: VoteProtectionSignal[];
  forecasts: TurnoutForecastSignal[];
  recommendations: TurnoutRecommendation[];
  tasks: TurnoutTaskSignal[];
  alerts: ElectionDayAlertSignal[];
}

export type SegmentSentiment = "Positive" | "Neutral" | "Negative";
export type SegmentStatus = "Active" | "Monitoring" | "Planning" | "At Risk" | "Dormant";

export interface SegmentOverviewMetric {
  label: string;
  value: string;
  trend: Trend;
  change: number;
  confidence: number;
}

export interface SegmentCommandRecord {
  id: string;
  segmentName: string;
  estimatedVoters: number;
  supportScore: number;
  sentiment: SegmentSentiment;
  turnout: number;
  persuasionPotential: number;
  voteValue: number;
  priority: Priority;
  status: SegmentStatus;
  ageGroup: string;
  gender: string;
  occupation: string;
}

export interface SegmentClassificationMatrixRow {
  segment: string;
  support: number;
  opposition: number;
  neutral: number;
  persuadable: number;
  turnout: number;
  influence: number;
  voteValue: number;
}

export interface HighValueSegmentSignal {
  segment: string;
  currentSupport: number;
  potentialSupport: number;
  expectedVoteGain: number;
  priority: Priority;
  recommendedAction: string;
  owner: string;
  status: string;
}

export interface SegmentDemographicSignal {
  segment: string;
  age: string;
  gender: string;
  occupation: string;
  income: string;
  education: string;
  communityMix: string;
  villageDistribution: string;
  boothDistribution: string;
}

export interface SegmentSupportSignal {
  segment: string;
  strongSupporters: number;
  weakSupporters: number;
  neutral: number;
  opposition: number;
  persuadable: number;
  unknown: number;
}

export interface SegmentSentimentSignal {
  segment: string;
  positive: number;
  neutral: number;
  negative: number;
  trend: Trend;
  confidence: number;
  historicalMovement: number;
  monthly: number;
  quarterly: number;
  yearly: number;
}

export interface SegmentIssueSignal {
  segment: string;
  topIssues: string;
  severity: Priority;
  politicalImpact: number;
}

export interface SegmentInfluencerSignal {
  segment: string;
  topInfluencers: string;
  influenceScore: number;
  alignment: string;
  relationshipStrength: number;
  expectedVoteImpact: number;
}

export interface SegmentGeographicSignal {
  segment: string;
  villageDistribution: string;
  boothDistribution: string;
  clusterAnalysis: string;
  influenceZones: string;
  x: number;
  y: number;
}

export interface SegmentPersuasionSignal {
  segment: string;
  currentSupport: number;
  potentialSupport: number;
  expectedGain: number;
  conversionProbability: number;
  priority: Priority;
  recommendedMessage: string;
  recommendedAction: string;
}

export interface SegmentTurnoutSignal {
  segment: string;
  expectedTurnout: number;
  targetTurnout: number;
  turnoutGap: number;
  mobilizationPotential: number;
  expectedVoteGain: number;
  priority: Priority;
}

export interface SegmentMessageSignal {
  messageTheme: string;
  targetSegment: string;
  expectedImpact: number;
  effectiveness: number;
  status: string;
}

export interface SegmentOutreachCampaignSignal {
  campaign: string;
  targetSegment: string;
  reach: number;
  engagement: number;
  impact: number;
  expectedVotes: number;
  status: string;
  priority: Priority;
}

export interface SegmentOpportunitySignal {
  opportunity: string;
  segment: string;
  expectedVotes: number;
  priority: Priority;
  owner: string;
  status: string;
  actionPlan: string;
}

export interface SegmentRiskSignal {
  risk: string;
  segment: string;
  potentialVoteLoss: number;
  severity: Priority;
  owner: string;
  mitigation: string;
  status: string;
}

export interface SegmentComparisonProfile {
  segment: string;
  support: number;
  sentiment: SegmentSentiment;
  issues: string;
  turnout: number;
  persuasion: number;
  influence: number;
  expectedVotes: number;
}

export interface SegmentRecommendation {
  recommendation: string;
  reason: string;
  confidence: number;
  expectedVotes: number;
  priority: Priority;
  actionLabel: string;
}

export interface SegmentTaskSignal {
  segment: string;
  openTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  completedTasks: number;
  highestPriorityTask: string;
}

export interface SegmentFilters {
  segment: string;
  ageGroup: string;
  gender: string;
  occupation: string;
  supportLevel: string;
  turnout: string;
  priority: string;
  status: string;
  dateRange: string;
}

export interface SegmentIntelligenceData {
  overview: SegmentOverviewMetric[];
  command: SegmentCommandRecord[];
  matrix: SegmentClassificationMatrixRow[];
  highValue: HighValueSegmentSignal[];
  demographics: SegmentDemographicSignal[];
  support: SegmentSupportSignal[];
  sentiment: SegmentSentimentSignal[];
  issues: SegmentIssueSignal[];
  influencers: SegmentInfluencerSignal[];
  geography: SegmentGeographicSignal[];
  persuasion: SegmentPersuasionSignal[];
  turnout: SegmentTurnoutSignal[];
  messages: SegmentMessageSignal[];
  campaigns: SegmentOutreachCampaignSignal[];
  opportunities: SegmentOpportunitySignal[];
  risks: SegmentRiskSignal[];
  comparisons: SegmentComparisonProfile[];
  recommendations: SegmentRecommendation[];
  tasks: SegmentTaskSignal[];
}

export type SupportLevel = "Strong" | "Lean Support" | "Neutral" | "Persuadable" | "Opposition" | "Unknown";
export type SupportHeatMode = "Support Strength" | "Opposition Strength" | "Persuasion Opportunity" | "Turnout Opportunity" | "Village Support" | "Booth Support";

export interface SupportOverviewMetric {
  label: string;
  value: string;
  trend: Trend;
  change: number;
  confidence: number;
}

export interface ConstituencySupportScore {
  currentSupport: number;
  likelySupport: number;
  potentialSupport: number;
  expectedVoteShare: number;
  expectedTurnout: number;
  winProbability: number;
  confidenceScore: number;
  trend: Trend;
  monthly: number;
  quarterly: number;
  yearly: number;
}

export interface SupportDistributionRecord {
  status: "Support" | "Opposition" | "Neutral" | "Persuadable" | "Unknown";
  share: number;
  voters: number;
  movement: number;
}

export interface CommunitySupportAnalysisRecord {
  community: string;
  currentSupport: number;
  likelySupport: number;
  potentialSupport: number;
  trend: Trend;
  confidence: number;
  priority: Priority;
}

export interface VillageSupportAnalysisRecord {
  village: string;
  currentSupport: number;
  potentialSupport: number;
  expectedGain: number;
  risk: number;
  priority: Priority;
  trend: Trend;
}

export interface HouseholdSupportSummary {
  supportiveHouseholds: number;
  neutralHouseholds: number;
  persuadableHouseholds: number;
  opposingHouseholds: number;
  highInfluenceHouseholds: number;
  atRiskHouseholds: number;
}

export interface InfluencerSupportSummary {
  supportiveInfluencers: number;
  neutralInfluencers: number;
  opposingInfluencers: number;
  persuadableInfluencers: number;
  totalReach: number;
  expectedVoteImpact: number;
}

export interface SegmentSupportAnalysisRecord {
  segment: string;
  support: number;
  persuasionPotential: number;
  turnout: number;
  expectedVotes: number;
  priority: Priority;
}

export interface SupportHeatMapPoint {
  id: string;
  village: string;
  booth: string;
  community: string;
  supportStrength: number;
  oppositionStrength: number;
  persuasionOpportunity: number;
  turnoutOpportunity: number;
  villageSupport: number;
  boothSupport: number;
  priority: Priority;
  x: number;
  y: number;
}

export interface SupportMovementRecord {
  change: string;
  supportGained: number;
  supportLost: number;
  communitiesMoving: string;
  villagesMoving: string;
  influencersMoving: string;
  week: string;
  priority: Priority;
}

export interface TopSupportGainRecord {
  community: string;
  village: string;
  segment: string;
  influencer: string;
  expectedVotes: number;
  reason: string;
  priority: Priority;
  status: string;
}

export interface TopSupportLossRecord {
  community: string;
  village: string;
  segment: string;
  influencer: string;
  potentialVoteLoss: number;
  reason: string;
  severity: Priority;
  status: string;
}

export interface TurnoutImpactRecord {
  supportersLikelyToVote: number;
  supportersUnlikelyToVote: number;
  potentialTurnoutGain: number;
  expectedVoteImpact: number;
  mobilizationOpportunity: number;
}

export interface PersuasionImpactRecord {
  currentSupport: number;
  potentialSupport: number;
  expectedConversion: number;
  expectedVotes: number;
  successProbability: number;
}

export interface WinProbabilityScenario {
  scenario: string;
  expectedMargin: number;
  expectedVoteShare: number;
  confidence: number;
  winProbability: number;
}

export interface SupportScenarioSimulation {
  scenario: string;
  expectedVotes: number;
  marginImpact: number;
  winProbability: number;
  priority: Priority;
}

export interface SupportRecommendation {
  recommendation: string;
  reason: string;
  confidence: number;
  expectedVotes: number;
  priority: Priority;
  actionLabel: string;
}

export interface SupportTaskSignal {
  initiative: string;
  openTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  completedTasks: number;
  highestPriorityTask: string;
}

export interface SupportFilters {
  community: string;
  village: string;
  segment: string;
  supportLevel: string;
  turnout: string;
  priority: string;
  risk: string;
  opportunity: string;
  dateRange: string;
}

export interface SupportAnalysisData {
  overview: SupportOverviewMetric[];
  score: ConstituencySupportScore;
  distribution: SupportDistributionRecord[];
  communities: CommunitySupportAnalysisRecord[];
  villages: VillageSupportAnalysisRecord[];
  households: HouseholdSupportSummary;
  influencers: InfluencerSupportSummary;
  segments: SegmentSupportAnalysisRecord[];
  heatMap: SupportHeatMapPoint[];
  movement: SupportMovementRecord[];
  gains: TopSupportGainRecord[];
  losses: TopSupportLossRecord[];
  turnoutImpact: TurnoutImpactRecord;
  persuasionImpact: PersuasionImpactRecord;
  winProbability: WinProbabilityScenario[];
  scenarios: SupportScenarioSimulation[];
  recommendations: SupportRecommendation[];
  tasks: SupportTaskSignal[];
}

export type ReportStatus = "Generated" | "Scheduled" | "Pending" | "Draft" | "Published";
export type ReportAudience = "Candidate" | "Campaign Manager" | "Booth Coordinators" | "Volunteers" | "Community Teams";
export type ReportFrequency = "Daily" | "Weekly" | "Monthly" | "Election Mode" | "War Room Mode";

export interface ReportOverviewMetric {
  label: string;
  value: string;
  trend: Trend;
  change: number;
  confidence: number;
}

export interface ReportLibraryItem {
  id: string;
  title: string;
  type: string;
  status: ReportStatus;
  priority: Priority;
  consumer: ReportAudience;
  lastGenerated: string;
  owner: string;
  sourceLayer: string;
  summary: string;
}

export interface DailyBriefSection {
  section: string;
  finding: string;
  change: string;
  recommendedAction: string;
  priority: Priority;
  confidence: number;
}

export interface WeeklyStrategyMetric {
  metric: string;
  current: string;
  movement: string;
  expectedVoteGain: number;
  priorityAction: string;
  priority: Priority;
}

export interface ReportTemplate {
  title: string;
  scope: string;
  output: string;
  actionTrigger: string;
  priority: Priority;
  readiness: number;
}

export interface ElectionReadinessMetric {
  area: string;
  score: number;
  trend: Trend;
  gap: string;
  action: string;
  priority: Priority;
}

export interface VoterWinProbabilityReport {
  scenario: string;
  expectedMargin: number;
  expectedVoteShare: number;
  probability: number;
  confidence: number;
  trend: Trend;
}

export interface ReportBuilderConfig {
  sections: string[];
  communities: string[];
  villages: string[];
  booths: string[];
  dateRanges: string[];
  metrics: string[];
}

export interface ExecutiveBriefItem {
  question: string;
  answer: string;
  candidateAction: string;
  priority: Priority;
}

export interface AiStrategyReport {
  title: string;
  strategyType: string;
  recommendation: string;
  expectedVoteImpact: number;
  priority: Priority;
  confidence: number;
}

export interface ScheduledReport {
  report: string;
  frequency: ReportFrequency;
  recipients: string;
  nextRun: string;
  owner: string;
  status: string;
}

export interface ExportOption {
  format: string;
  bestFor: string;
  readiness: number;
  status: string;
}

export interface ReportAction {
  label: string;
  href: string;
  priority: Priority;
}

export interface ReportFilters {
  reportType: string;
  village: string;
  community: string;
  dateRange: string;
  status: string;
  priority: string;
  recipient: string;
}

export interface VoterReportsData {
  overview: ReportOverviewMetric[];
  library: ReportLibraryItem[];
  dailyBrief: DailyBriefSection[];
  weeklyStrategy: WeeklyStrategyMetric[];
  communityReports: ReportTemplate[];
  villageReports: ReportTemplate[];
  householdReports: ReportTemplate[];
  influencerReports: ReportTemplate[];
  turnoutReports: ReportTemplate[];
  persuasionReports: ReportTemplate[];
  supportReports: ReportTemplate[];
  readiness: ElectionReadinessMetric[];
  winProbability: VoterWinProbabilityReport[];
  builder: ReportBuilderConfig;
  executiveBriefing: ExecutiveBriefItem[];
  aiStrategyReports: AiStrategyReport[];
  scheduler: ScheduledReport[];
  exportOptions: ExportOption[];
  actions: ReportAction[];
  rightPanel: {
    pendingReports: string[];
    recentlyGenerated: string[];
    criticalFindings: string[];
    reportAlerts: string[];
    upcomingScheduled: string[];
  };
}
