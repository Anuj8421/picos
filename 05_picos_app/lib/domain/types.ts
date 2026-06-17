import type {
  EntityType,
  EvidenceType,
  InboxStatus,
  Priority,
  RelationshipKind,
  SentimentPolarity,
  TaskStatus,
  VerificationStatus
} from "./enums";

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  verificationStatus: VerificationStatus;
  confidenceScore: number;
  sourceIds: string[];
  notes: string;
}

export interface SourceRecord extends BaseEntity {
  title: string;
  sourceType: string;
  urlOrPath: string;
  publisher: string;
  datePublished: string;
  dateChecked: string;
  reliability: "high" | "medium" | "low";
  nextVerificationStep: string;
}

export interface EvidenceItem extends BaseEntity {
  title: string;
  evidenceType: EvidenceType;
  sourceRecordId: string;
  urlOrPath: string;
  dateCaptured: string;
  dateChecked: string;
  relatedEntityType: EntityType;
  relatedEntityId: string;
  nextVerificationStep: string;
}

export interface Candidate extends BaseEntity {
  fullName: string;
  designation: string;
  constituencyId: string;
  partyStatus: string;
  age: string;
  politicalExperience: string;
  currentPosition: string;
  electionStatus: string;
  publicIdentity: string[];
}

export interface Opponent extends BaseEntity {
  fullName: string;
  partyId: string;
  role: string;
  strengths: string[];
  weaknesses: string[];
  riskLevel: Priority;
  influenceScore: number;
  latestMovement: string;
}

export interface Party extends BaseEntity {
  name: string;
  faction: string;
  alignment: string;
  localStrength: number;
}

export interface PoliticalOrganization extends BaseEntity {
  name: string;
  organizationType: string;
  role: string;
  influenceScore: number;
  reach: string;
  status: string;
}

export interface Person extends BaseEntity {
  fullName: string;
  role: string;
  affiliation: string;
  influenceScore: number;
  relationshipToCandidate: RelationshipKind;
}

export interface Influencer extends BaseEntity {
  personId: string;
  influenceType: string;
  primaryArea: string;
  primaryCommunityId: string;
  reachScore: number;
  alignment: RelationshipKind;
}

export interface Village extends BaseEntity {
  name: string;
  zone: string;
  populationEstimate: number;
  politicalStrength: "strong" | "lean" | "swing" | "weak" | "critical";
  riskScore: number;
  opportunityScore: number;
  sentimentScore: number;
  influenceScore: number;
  mapX: number;
  mapY: number;
  dominantIssues: string[];
}

export interface Booth extends BaseEntity {
  boothNumber: string;
  villageId: string;
  totalVoters: number;
  pastVoteSangle: number | null;
  pastVoteOpponent: number | null;
  classification: "safe" | "lean" | "swing" | "weak" | "critical";
  coordinatorId: string;
}

export interface Community extends BaseEntity {
  name: string;
  supportLevel: number;
  sentimentScore: number;
  trend: "Up" | "Down" | "Stable";
  confidenceLevel: "High" | "Medium" | "Low";
}

export interface Issue extends BaseEntity {
  title: string;
  issueType: string;
  location: string;
  severity: Priority;
  affectedPopulation: string;
  status: string;
  owner: string;
  politicalImpact: number;
}

export interface PoliticalEvent extends BaseEntity {
  title: string;
  description: string;
  eventType: string;
  date: string;
  time: string;
  location: string;
  relatedPersonId: string;
  relatedVillageId: string;
  priority: Priority;
  owner: string;
  status: string;
}

export interface MediaMention extends BaseEntity {
  date: string;
  platform: string;
  title: string;
  url: string;
  personMentionedId: string;
  sentiment: SentimentPolarity;
  riskLevel: Priority;
  reach: string;
  summary: string;
}

export interface IntelligenceSignal extends BaseEntity {
  title: string;
  description: string;
  sourceType: string;
  submittedBy: string;
  location: string;
  relatedPersonId: string;
  relatedVillageId: string;
  relatedBoothId: string;
  relatedCommunityId: string;
  category: string;
  priority: Priority;
  impactScore: number;
  assignedTo: string;
  dueDate: string;
  status: InboxStatus;
  nextVerificationStep: string;
}

export interface PoliticalRisk extends BaseEntity {
  risk: string;
  probability: number;
  impact: number;
  severity: Priority;
  owner: string;
  mitigation: string;
  status: string;
  targetResolutionDate: string;
  previousSeverity?: Priority;
}

export interface PoliticalOpportunity extends BaseEntity {
  opportunity: string;
  potentialImpact: string;
  targetCommunityId: string;
  targetVillageId: string;
  priority: Priority;
  owner: string;
  status: string;
  expectedVoteImpact: string;
  previousPriority?: Priority;
}

export interface ResearchTask extends BaseEntity {
  priority: Priority;
  question: string;
  owner: string;
  status: string;
  sourceNeeded: string;
  outputExpected: string;
  deadline: string;
}

export interface Role extends BaseEntity {
  name: string;
  description: string;
  permissions: string[];
}

export interface User extends BaseEntity {
  name: string;
  roleId: string;
  team: string;
  status: "active" | "inactive";
}

export interface AuditLog extends BaseEntity {
  actorId: string;
  action: string;
  entityType: EntityType;
  entityId: string;
  beforeSummary: string;
  afterSummary: string;
}

export interface RelationshipEdge extends BaseEntity {
  fromEntityType: EntityType;
  fromEntityId: string;
  toEntityType: EntityType;
  toEntityId: string;
  relationship: RelationshipKind;
  strength: number;
  influenceWeight: number;
  label: string;
}

export interface SentimentRecord extends BaseEntity {
  entityType: EntityType;
  entityId: string;
  segment: string;
  score: number;
  previousScore: number;
  trend: "Up" | "Down" | "Stable";
  period: string;
}

export interface IntelligenceReport extends BaseEntity {
  title: string;
  reportType: "daily_brief" | "weekly_brief" | "candidate_dossier" | "opponent_report";
  date: string;
  executiveSummary: string;
  sectionIds: string[];
  decisionLog: string[];
}

export interface Recommendation extends BaseEntity {
  title: string;
  reason: string;
  expectedImpact: string;
  priority: Priority;
  actionLabel: string;
  relatedEntityType: EntityType;
  relatedEntityId: string;
}

export interface Task extends BaseEntity {
  title: string;
  description: string;
  type: string;
  priority: Priority;
  owner: string;
  dueDate: string;
  relatedEntityType: EntityType;
  relatedEntityId: string;
  status: TaskStatus;
  evidenceRequired: boolean;
  completionNotes: string;
}

export type OwnershipTargetType =
  | "village"
  | "booth"
  | "community"
  | "household"
  | "influencer"
  | "issue"
  | "political_risk"
  | "political_opportunity"
  | "task"
  | "visit"
  | "promise"
  | "political_event"
  | "campaign"
  | "intelligence_report";

export type OwnershipStatus =
  | "assigned"
  | "unassigned"
  | "overdue_review"
  | "escalated"
  | "inactive_owner"
  | "pending_approval";

export type ApprovalStatus = "draft" | "pending_review" | "approved" | "rejected" | "changes_requested";

export type ReviewCadence = "daily" | "weekly" | "monthly" | "election_mode";

export type OwnerStatus = "active" | "inactive" | "overloaded" | "unavailable";

export interface Owner extends BaseEntity {
  fullName: string;
  role: string;
  teamId: string;
  phone: string;
  status: OwnerStatus;
  territoryFocus: string;
  assignedRecordCount: number;
  completedActions: number;
  openActions: number;
  overdueActions: number;
  coverageScore: number;
  performanceScore: number;
  approvalStatus: ApprovalStatus;
}

export interface Team extends BaseEntity {
  name: string;
  teamType: string;
  leadOwnerId: string;
  memberOwnerIds: string[];
  territory: string;
  status: "active" | "inactive" | "forming";
  coverageScore: number;
  approvalStatus: ApprovalStatus;
}

export interface OwnershipRecord extends BaseEntity {
  entityType: OwnershipTargetType;
  entityId: string;
  entityName: string;
  primaryOwnerId: string;
  secondaryOwnerId: string;
  coordinatorId: string;
  volunteerTeamId: string;
  reportingManagerId: string;
  escalationOwnerId: string;
  reviewCadence: ReviewCadence;
  lastReviewedDate: string;
  nextReviewDate: string;
  ownershipStatus: OwnershipStatus;
  approvalStatus: ApprovalStatus;
  priority: Priority;
  villageId: string;
  boothId: string;
  coverageScore: number;
}

export interface TerritoryAssignment extends BaseEntity {
  zone: string;
  sector: string;
  villageId: string;
  boothId: string;
  assignedOwnerId: string;
  coordinatorId: string;
  volunteerTeamId: string;
  coverage: number;
  status: OwnershipStatus;
  heatX: number;
  heatY: number;
  approvalStatus: ApprovalStatus;
}

export interface ReportingLine extends BaseEntity {
  ownerId: string;
  reportsToOwnerId: string;
  level: string;
  scope: string;
  status: "active" | "inactive" | "pending_review";
  approvalStatus: ApprovalStatus;
}

export interface EscalationChain extends BaseEntity {
  entityType: OwnershipTargetType;
  entityId: string;
  entityName: string;
  currentOwnerId: string;
  escalationOwnerId: string;
  daysOverdue: number;
  severity: Priority;
  status: "open" | "in_review" | "escalated" | "resolved";
  nextAction: string;
  approvalStatus: ApprovalStatus;
}

export interface OwnershipHistory extends BaseEntity {
  ownershipRecordId: string;
  previousOwnerId: string;
  newOwnerId: string;
  changedDate: string;
  reason: string;
  approvedBy: string;
  approvalStatus: ApprovalStatus;
}

export interface ReviewSchedule extends BaseEntity {
  name: string;
  cadence: ReviewCadence;
  entityType: OwnershipTargetType | "all";
  ownerId: string;
  nextRun: string;
  status: "active" | "paused" | "needs_review";
  approvalStatus: ApprovalStatus;
}

export type VisitType =
  | "candidate_visit"
  | "village_visit"
  | "booth_visit"
  | "household_visit"
  | "influencer_meeting"
  | "community_meeting"
  | "issue_verification"
  | "risk_verification"
  | "opportunity_validation"
  | "volunteer_visit"
  | "media_visit"
  | "event_followup"
  | "other";

export type VisitStatus =
  | "planned"
  | "scheduled"
  | "in_progress"
  | "completed"
  | "follow_up_required"
  | "escalated"
  | "cancelled"
  | "archived";

export interface VisitRecord extends BaseEntity {
  visitTitle: string;
  visitType: VisitType;
  status: VisitStatus;
  priority: Priority;
  relatedEntityType: string;
  relatedEntityId: string;
  villageId: string;
  boothId: string;
  communityId: string;
  householdId: string;
  influencerId: string;
  issueId: string;
  riskId: string;
  opportunityId: string;
  primaryOwnerId: string;
  secondaryOwnerId: string;
  coordinatorId: string;
  volunteerTeamId: string;
  escalationOwnerId: string;
  scheduledDate: string;
  actualDate: string;
  startTime: string;
  endTime: string;
  reviewDate: string;
  nextActionDueDate: string;
  addressOrLocality: string;
  gpsLocation: string;
  visitors: string[];
  peopleMet: string[];
  communityLeadersMet: string[];
  influencersMet: string[];
  volunteersPresent: string[];
  purpose: string;
  conversationSummary: string;
  keyObservations: string;
  issuesRaised: string;
  objectionsRaised: string;
  publicMood: string;
  localPoliticalMovement: string;
  opponentActivityObserved: string;
  promisesMade: string;
  followUpsRequired: string;
  sentimentBefore: number;
  sentimentAfter: number;
  supportBefore: number;
  supportAfter: number;
  riskBefore: number;
  riskAfter: number;
  opportunityBefore: number;
  opportunityAfter: number;
  turnoutBefore: number;
  turnoutAfter: number;
  expectedVoteImpact: number;
  approvalStatus: ApprovalStatus;
  evidenceIds: string[];
  taskIds: string[];
  nextAction: string;
  nextActionOwnerId: string;
  reviewerId: string;
  reviewNotes: string;
  auditTrail: string[];
}

export interface VisitOutcome extends BaseEntity {
  visitRecordId: string;
  outcomeType: "support" | "sentiment" | "risk" | "opportunity" | "turnout" | "issue" | "promise";
  beforeScore: number;
  afterScore: number;
  delta: number;
  expectedVoteImpact: number;
  summary: string;
}

export interface VisitParticipant extends BaseEntity {
  visitRecordId: string;
  personName: string;
  participantType: "visitor" | "person_met" | "community_leader" | "influencer" | "volunteer";
  roleOrAffiliation: string;
  contactStatus: string;
}

export interface VisitFollowUp extends BaseEntity {
  visitRecordId: string;
  title: string;
  actionRequired: string;
  ownerId: string;
  dueDate: string;
  status: "open" | "assigned" | "in_progress" | "blocked" | "completed" | "escalated";
  priority: Priority;
  relatedEntityType: string;
  relatedEntityId: string;
  evidenceRequired: boolean;
}

export interface VisitReport extends BaseEntity {
  title: string;
  reportType:
    | "daily_visit_report"
    | "weekly_field_visit_report"
    | "village_visit_report"
    | "candidate_visit_report"
    | "influencer_meeting_report"
    | "follow_up_pending_report"
    | "promise_generated_report"
    | "visit_impact_report";
  period: string;
  visitIds: string[];
  executiveSummary: string;
  generatedBy: string;
  status: "draft" | "generated" | "approved" | "archived";
}

export interface VisitChecklist extends BaseEntity {
  visitType: VisitType;
  item: string;
  required: boolean;
  ownerId: string;
  status: "active" | "needs_review" | "retired";
}

export type FoundationApprovalStatus = ApprovalStatus;

export interface ConversationLog extends BaseEntity {
  conversationTitle: string;
  conversationType: string;
  relatedVisitId: string;
  relatedEntityType: string;
  relatedEntityId: string;
  villageId: string;
  boothId: string;
  communityId: string;
  householdId: string;
  influencerId: string;
  issueId: string;
  riskId: string;
  opportunityId: string;
  participants: string[];
  personSpokenTo: string;
  spokenBy: string;
  date: string;
  time: string;
  location: string;
  summary: string;
  keyPoints: string;
  objectionsRaised: string;
  issuesRaised: string;
  promisesMade: string;
  sentimentObserved: string;
  supportObserved: string;
  politicalAlignment: string;
  followUpRequired: boolean;
  nextAction: string;
  ownerId: string;
  approvalStatus: FoundationApprovalStatus;
  evidenceIds: string[];
}

export type FollowUpStatus = "open" | "assigned" | "in_progress" | "waiting" | "completed" | "overdue" | "escalated" | "cancelled";

export interface FollowUpRecord extends BaseEntity {
  title: string;
  followUpType: string;
  relatedEntityType: string;
  relatedEntityId: string;
  relatedVisitId: string;
  relatedConversationId: string;
  relatedPromiseId: string;
  villageId: string;
  boothId: string;
  householdId: string;
  influencerId: string;
  communityId: string;
  ownerId: string;
  assignedTeamId: string;
  dueDate: string;
  priority: Priority;
  status: FollowUpStatus;
  reason: string;
  expectedOutcome: string;
  actualOutcome: string;
  completionNotes: string;
  evidenceRequired: boolean;
  evidenceIds: string[];
  approvalStatus: FoundationApprovalStatus;
}

export type PromiseStatus =
  | "recorded"
  | "assigned"
  | "in_progress"
  | "fulfilled"
  | "partially_fulfilled"
  | "broken"
  | "disputed"
  | "overdue"
  | "escalated"
  | "archived";

export interface PromiseRecord extends BaseEntity {
  promiseTitle: string;
  promiseType: string;
  promiseMadeBy: string;
  promiseMadeTo: string;
  relatedEntityType: string;
  relatedEntityId: string;
  relatedVisitId: string;
  relatedConversationId: string;
  villageId: string;
  boothId: string;
  communityId: string;
  householdId: string;
  influencerId: string;
  issueId: string;
  promiseDescription: string;
  datePromised: string;
  dueDate: string;
  priority: Priority;
  politicalImpact: number;
  trustImpact: number;
  status: PromiseStatus;
  ownerId: string;
  escalationOwnerId: string;
  fulfillmentEvidenceIds: string[];
  evidenceIds: string[];
  approvalStatus: FoundationApprovalStatus;
  completionNotes: string;
}

export interface IntelligenceTimelineEvent extends BaseEntity {
  eventTitle: string;
  eventType: string;
  entityType: string;
  entityId: string;
  eventDate: string;
  eventTime: string;
  actorId: string;
  villageId: string;
  boothId: string;
  communityId: string;
  severity: Priority;
  summary: string;
  previousValue: string;
  newValue: string;
  relatedRecordUrl: string;
  evidenceIds: string[];
  approvalStatus: FoundationApprovalStatus;
}

export type VerificationQueueStatus = "pending" | "in_review" | "verified" | "needs_more_evidence" | "disputed" | "stale" | "rejected";

export interface VerificationRequest extends BaseEntity {
  recordType: string;
  recordId: string;
  submittedBy: string;
  submittedAt: string;
  evidenceIds: string[];
  verificationNotes: string;
  verifierId: string;
  verificationDecision: VerificationQueueStatus;
  nextVerificationStep: string;
  approvalStatus: FoundationApprovalStatus;
}

export type ApprovalQueueStatus = "pending" | "approved" | "rejected" | "needs_revision" | "escalated";

export interface ApprovalRequest extends BaseEntity {
  approvalTitle: string;
  approvalType: string;
  recordType: string;
  recordId: string;
  submittedBy: string;
  submittedAt: string;
  approverId: string;
  status: ApprovalQueueStatus;
  decisionNote: string;
  sourceIds: string[];
  evidenceIds: string[];
}

export interface EvidenceReview extends BaseEntity {
  evidenceTitle: string;
  evidenceType: EvidenceType;
  filePathOrUrl: string;
  relatedRecordType: string;
  relatedRecordId: string;
  submittedBy: string;
  dateCaptured: string;
  dateUploaded: string;
  sourceId: string;
  evidenceQualityScore: number;
  reviewerId: string;
  reviewNotes: string;
  approvalStatus: FoundationApprovalStatus;
  evidenceIds: string[];
}

export interface AuditLogEntry extends BaseEntity {
  eventType: string;
  entityType: string;
  entityId: string;
  actorId: string;
  actorRole: string;
  timestamp: string;
  previousValue: string;
  newValue: string;
  changeReason: string;
  source: string;
  ipDevicePlaceholder: string;
  approvalId: string;
  verificationId: string;
  severity: Priority;
  evidenceIds: string[];
  approvalStatus: FoundationApprovalStatus;
}

export interface VoterRecord extends BaseEntity {
  voterName: string;
  voterId: string;
  age: number;
  gender: string;
  villageId: string;
  boothId: string;
  householdId: string;
  communityIds: string[];
  segmentIds: string[];
  occupation: string;
  phonePlaceholder: string;
  supportStatus: string;
  persuasionScore: number;
  turnoutProbability: number;
  influenceLevel: string;
  primaryIssueIds: string[];
  relationshipOwnerId: string;
  lastContactDate: string;
  nextAction: string;
  approvalStatus: FoundationApprovalStatus;
  evidenceIds: string[];
}

export interface HouseholdRecord extends BaseEntity {
  householdName: string;
  villageId: string;
  boothId: string;
  addressLocality: string;
  familySize: number;
  eligibleVoters: number;
  primaryInfluencerId: string;
  communityIds: string[];
  supportStatus: string;
  persuasionScore: number;
  turnoutRisk: number;
  keyIssues: string[];
  assignedVolunteerId: string;
  relationshipOwnerId: string;
  visitHistoryIds: string[];
  conversationIds: string[];
  promiseIds: string[];
  followUpIds: string[];
  approvalStatus: FoundationApprovalStatus;
  evidenceIds: string[];
}

export interface InfluencerRecord extends BaseEntity {
  influencerName: string;
  category: string;
  villageId: string;
  communityIds: string[];
  boothIds: string[];
  occupation: string;
  organizations: string[];
  estimatedReach: number;
  influenceScore: number;
  politicalAlignment: string;
  supportStatus: string;
  relationshipStrength: number;
  relationshipOwnerId: string;
  lastContactDate: string;
  nextAction: string;
  riskLevel: Priority;
  opportunityLevel: Priority;
  approvalStatus: FoundationApprovalStatus;
  evidenceIds: string[];
}

export type SentimentDirection = "positive" | "neutral" | "negative" | "mixed" | "unknown";

export type ManagedSentimentRecord = SentimentRecord & {
  sentimentTitle: string;
  sentimentType: string;
  relatedEntityType: string;
  relatedEntityId: string;
  villageId: string;
  boothId: string;
  communityId: string;
  sentimentDirection: SentimentDirection;
  description: string;
  observedBy: string;
  dateObserved: string;
  sourceType: string;
  approvalStatus: FoundationApprovalStatus;
  evidenceIds: string[];
};

export type ImportBatchStatus = "uploaded" | "mapping" | "validating" | "ready_for_review" | "pending_approval" | "imported" | "failed" | "rolled_back";

export interface ImportBatch extends BaseEntity {
  importTitle: string;
  entityType: string;
  fileName: string;
  uploadedBy: string;
  uploadedAt: string;
  totalRows: number;
  validRows: number;
  invalidRows: number;
  duplicateRows: number;
  status: ImportBatchStatus;
  sourceId: string;
  approvalStatus: FoundationApprovalStatus;
  rollbackAvailable: boolean;
  evidenceIds: string[];
  mappingSummary: string;
  validationSummary: string;
}

export type CampaignStructureStatus = "active" | "inactive" | "forming" | "needs_review" | "overloaded" | "unassigned";

export type CampaignCoverageLevel = "covered" | "partial" | "uncovered" | "critical_gap";

export interface CampaignOrganization extends BaseEntity {
  organizationName: string;
  candidateId: string;
  campaignManagerOwnerId: string;
  warRoomLeadOwnerId: string;
  activeFrom: string;
  electionCycle: string;
  structureReadinessScore: number;
  approvalStatus: ApprovalStatus;
}

export interface CampaignRole extends BaseEntity {
  roleName: string;
  description: string;
  reportingManagerId: string;
  escalationManagerId: string;
  territoryScope: string;
  teamScope: string;
  permissionScope: string[];
  reviewCadence: ReviewCadence;
  status: CampaignStructureStatus;
  approvalStatus: ApprovalStatus;
}

export interface RoleResponsibility extends BaseEntity {
  campaignRoleId: string;
  responsibility: string;
  decisionRights: string;
  evidenceRequired: boolean;
  escalationTrigger: string;
  approvalStatus: ApprovalStatus;
}

export interface TeamMember extends BaseEntity {
  fullName: string;
  campaignRoleId: string;
  ownerId: string;
  zoneId: string;
  sectorId: string;
  villageIds: string[];
  boothIds: string[];
  communityIds: string[];
  teamId: string;
  managerOwnerId: string;
  escalationOwnerId: string;
  status: CampaignStructureStatus;
  performanceScore: number;
  coverageScore: number;
  workloadScore: number;
  availability: "available" | "limited" | "unavailable" | "election_mode";
  contactPlaceholder: string;
  approvalStatus: ApprovalStatus;
}

export interface TeamMemberAssignment extends BaseEntity {
  teamMemberId: string;
  assignmentType: "zone" | "sector" | "village" | "booth" | "community" | "task" | "visit" | "risk" | "opportunity";
  relatedEntityType: string;
  relatedEntityId: string;
  assignmentScope: string;
  startDate: string;
  endDate: string;
  status: CampaignStructureStatus;
  approvalStatus: ApprovalStatus;
}

export interface Zone extends BaseEntity {
  zoneName: string;
  zoneLeadOwnerId: string;
  villageIds: string[];
  boothIds: string[];
  teamIds: string[];
  coverageScore: number;
  performanceScore: number;
  status: CampaignStructureStatus;
  approvalStatus: ApprovalStatus;
}

export interface Sector extends BaseEntity {
  sectorName: string;
  zoneId: string;
  sectorLeadOwnerId: string;
  villageIds: string[];
  boothIds: string[];
  teamIds: string[];
  coverageScore: number;
  performanceScore: number;
  status: CampaignStructureStatus;
  approvalStatus: ApprovalStatus;
}

export interface VillageCluster extends BaseEntity {
  clusterName: string;
  zoneId: string;
  sectorId: string;
  villageIds: string[];
  coordinatorOwnerId: string;
  volunteerTeamId: string;
  coverageScore: number;
  riskScore: number;
  opportunityScore: number;
  status: CampaignStructureStatus;
  approvalStatus: ApprovalStatus;
}

export interface BoothCluster extends BaseEntity {
  clusterName: string;
  villageId: string;
  boothIds: string[];
  boothCoordinatorOwnerId: string;
  volunteerTeamId: string;
  coverageScore: number;
  readinessScore: number;
  status: CampaignStructureStatus;
  approvalStatus: ApprovalStatus;
}

export interface CommunityDesk extends BaseEntity {
  deskName: string;
  communityId: string;
  leadOwnerId: string;
  volunteerTeamId: string;
  coverageScore: number;
  supportScore: number;
  engagementScore: number;
  status: CampaignStructureStatus;
  approvalStatus: ApprovalStatus;
}

export interface VolunteerTeam extends BaseEntity {
  teamName: string;
  leadOwnerId: string;
  memberIds: string[];
  assignedVillageIds: string[];
  assignedBoothIds: string[];
  assignedCommunityIds: string[];
  assignedTaskIds: string[];
  performanceScore: number;
  availability: "available" | "limited" | "unavailable" | "election_mode";
  coverageScore: number;
  status: CampaignStructureStatus;
  approvalStatus: ApprovalStatus;
}

export interface VolunteerTeamMember extends BaseEntity {
  volunteerTeamId: string;
  teamMemberId: string;
  roleInTeam: string;
  assignedArea: string;
  availability: "available" | "limited" | "unavailable" | "election_mode";
  status: CampaignStructureStatus;
  approvalStatus: ApprovalStatus;
}

export interface CoverageRecord extends BaseEntity {
  coverageType: "zone" | "sector" | "village" | "booth" | "community" | "volunteer" | "owner";
  relatedEntityType: string;
  relatedEntityId: string;
  ownerId: string;
  teamId: string;
  coverageScore: number;
  coverageLevel: CampaignCoverageLevel;
  gapReason: string;
  nextAction: string;
  approvalStatus: ApprovalStatus;
}

export interface Roster extends BaseEntity {
  rosterName: string;
  rosterType: "daily" | "weekly" | "election_mode" | "polling_day" | "final_72_hours";
  dateRange: string;
  zoneId: string;
  sectorId: string;
  ownerId: string;
  status: CampaignStructureStatus;
  approvalStatus: ApprovalStatus;
}

export interface ShiftAssignment extends BaseEntity {
  rosterId: string;
  teamMemberId: string;
  campaignRoleId: string;
  shiftLabel: string;
  coverageArea: string;
  availability: "available" | "limited" | "unavailable" | "election_mode";
  status: "assigned" | "swap_requested" | "escalated" | "approved" | "missed";
  approvalStatus: ApprovalStatus;
}

export interface CampaignHierarchy extends BaseEntity {
  organizationId: string;
  parentUnitId: string;
  childUnitId: string;
  relationshipType: "reports_to" | "escalates_to" | "coordinates_with";
  depth: number;
  status: CampaignStructureStatus;
  approvalStatus: ApprovalStatus;
}

export interface CoverageGap extends BaseEntity {
  gapTitle: string;
  gapType: "unassigned_village" | "unassigned_booth" | "community_gap" | "volunteer_gap" | "owner_gap" | "reporting_gap";
  relatedEntityType: string;
  relatedEntityId: string;
  severity: Priority;
  detectedAt: string;
  recommendedOwnerId: string;
  recommendedAction: string;
  status: "open" | "assigned" | "in_review" | "resolved" | "accepted_risk";
  approvalStatus: ApprovalStatus;
}

export interface WorkloadMetric extends BaseEntity {
  ownerId: string;
  assignedVillages: number;
  assignedBooths: number;
  assignedCommunities: number;
  assignedTasks: number;
  assignedVisits: number;
  assignedFollowUps: number;
  assignedPromises: number;
  assignedRisks: number;
  assignedOpportunities: number;
  workloadScore: number;
  overloadStatus: "balanced" | "watch" | "overloaded" | "underutilized";
  recommendedAction: string;
  approvalStatus: ApprovalStatus;
}

export interface OrganizationUnit extends BaseEntity {
  unitName: string;
  unitType: "candidate" | "campaign_manager" | "war_room" | "intelligence" | "data" | "zone" | "sector" | "village" | "booth" | "community" | "volunteer_team";
  ownerId: string;
  parentUnitId: string;
  zoneId: string;
  sectorId: string;
  villageId: string;
  boothId: string;
  communityId: string;
  coverageScore: number;
  workloadScore: number;
  status: CampaignStructureStatus;
  approvalStatus: ApprovalStatus;
}

export type ConstituencyReadinessLevel = "ready" | "watch" | "risk" | "critical_gap";

export interface ConstituencyProfile extends BaseEntity {
  constituencyName: string;
  district: string;
  state: string;
  assemblyCode: string;
  candidateId: string;
  strategicSummary: string;
  totalVillagesTracked: number;
  totalBoothsTracked: number;
  estimatedVoters: number;
  dominantIssueIds: string[];
  readinessScore: number;
  coverageScore: number;
  approvalStatus: ApprovalStatus;
}

export interface ConstituencyZone extends BaseEntity {
  zoneName: string;
  zoneType: "urban" | "rural" | "mixed" | "industrial" | "gap";
  villageIds: string[];
  boothIds: string[];
  communityIds: string[];
  ownerId: string;
  riskScore: number;
  opportunityScore: number;
  sentimentScore: number;
  coverageScore: number;
  readinessLevel: ConstituencyReadinessLevel;
  priority: Priority;
  nextAction: string;
  approvalStatus: ApprovalStatus;
}

export interface ConstituencyWatchlistItem extends BaseEntity {
  title: string;
  watchType: "village" | "booth" | "community" | "issue" | "risk" | "opportunity" | "coverage_gap";
  relatedEntityType: string;
  relatedEntityId: string;
  zoneId: string;
  severity: Priority;
  reason: string;
  recommendedAction: string;
  ownerId: string;
  status: "open" | "assigned" | "watching" | "resolved";
  approvalStatus: ApprovalStatus;
}

export interface ConstituencyReport extends BaseEntity {
  title: string;
  reportType: "constituency_brief" | "village_watchlist" | "coverage_report" | "issue_heatmap" | "field_readiness";
  period: string;
  executiveSummary: string;
  zoneIds: string[];
  villageIds: string[];
  decisionLog: string[];
  approvalStatus: ApprovalStatus;
}
