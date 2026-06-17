import { entityDisplayName, repository } from "@/lib/domain/repositories";
import type { BaseEntity } from "@/lib/domain/types";
import type { FoundationConfig, FoundationField, FoundationRecord } from "./types";

type FoundationEntity = BaseEntity & {
  approvalStatus?: string;
  evidenceIds?: string[];
  ownerId?: string;
  relatedEntityType?: string;
  relatedEntityId?: string;
  priority?: string;
  status?: string;
};

const priorityOptions = ["critical", "high", "medium", "low"];
const verificationOptions = ["unverified", "needs_verification", "partially_verified", "verified", "disputed", "stale"];
const approvalOptions = ["draft", "pending_review", "approved", "rejected", "changes_requested", "needs_revision", "escalated"];
const ownerOptions = repository.owners.map((owner) => owner.fullName);
const teamOptions = repository.teams.map((team) => team.name);
const villageOptions = repository.villages.map((village) => village.name);
const boothOptions = repository.booths.map((booth) => booth.boothNumber);
const communityOptions = repository.communities.map((community) => community.name);
const sourceOptions = repository.sourceRecords.map((source) => source.title);
const evidenceOptions = repository.evidenceItems.map((evidence) => evidence.title);
const entityTypeOptions = [
  "candidate",
  "village",
  "booth",
  "community",
  "household",
  "influencer",
  "issue",
  "political_risk",
  "political_opportunity",
  "visit_record",
  "conversation_log",
  "follow_up_record",
  "promise_record",
  "task",
  "ownership_record"
];

function recordFromEntity(
  entity: FoundationEntity,
  title: string,
  description: string,
  status: string,
  values: FoundationRecord["values"],
  options: { priority?: string; ownerId?: string; relatedEntityType?: string; relatedEntityId?: string; evidenceIds?: string[] } = {}
): FoundationRecord {
  return {
    id: entity.id,
    title,
    description,
    status,
    priority: options.priority ?? entity.priority,
    ownerId: options.ownerId ?? entity.ownerId ?? "",
    relatedEntityType: options.relatedEntityType ?? entity.relatedEntityType ?? "",
    relatedEntityId: options.relatedEntityId ?? entity.relatedEntityId ?? "",
    verificationStatus: entity.verificationStatus,
    confidenceScore: entity.confidenceScore,
    approvalStatus: entity.approvalStatus ?? "pending_review",
    sourceIds: entity.sourceIds,
    evidenceIds: options.evidenceIds ?? entity.evidenceIds ?? [],
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
    createdBy: entity.createdBy,
    updatedBy: entity.updatedBy,
    notes: entity.notes,
    values
  };
}

const field = (name: string, label: string, type: FoundationField["type"] = "text", required = false, options?: string[]): FoundationField => ({
  name,
  label,
  type,
  required,
  options
});

const sourceEvidenceFields: FoundationField[] = [
  field("sourceIds", "Source", "select", true, sourceOptions),
  field("evidenceIds", "Evidence", "select", false, evidenceOptions),
  field("verificationStatus", "Verification status", "select", true, verificationOptions),
  field("confidenceScore", "Confidence score", "number", true),
  field("approvalStatus", "Approval status", "select", true, approvalOptions)
];

const commonActions = ["Create task", "Attach evidence", "Link source", "Add note"];

const conversationRecords = repository.conversationLogs.map((item) =>
  recordFromEntity(item, item.conversationTitle, item.summary, item.approvalStatus, {
    ...item,
    participants: item.participants.join(", "),
    relatedEntity: entityDisplayName(item.relatedEntityType, item.relatedEntityId)
  }, { priority: item.followUpRequired ? "high" : "medium", ownerId: item.ownerId, relatedEntityType: item.relatedEntityType, relatedEntityId: item.relatedEntityId, evidenceIds: item.evidenceIds })
);

const followUpRecords = repository.followUpRecords.map((item) =>
  recordFromEntity(item, item.title, item.reason, item.status, {
    ...item,
    relatedEntity: entityDisplayName(item.relatedEntityType, item.relatedEntityId)
  }, { priority: item.priority, ownerId: item.ownerId, relatedEntityType: item.relatedEntityType, relatedEntityId: item.relatedEntityId, evidenceIds: item.evidenceIds })
);

const promiseRecords = repository.promiseRecords.map((item) =>
  recordFromEntity(item, item.promiseTitle, item.promiseDescription, item.status, {
    ...item,
    relatedEntity: entityDisplayName(item.relatedEntityType, item.relatedEntityId),
    fulfillmentEvidenceIds: item.fulfillmentEvidenceIds.join(", ")
  }, { priority: item.priority, ownerId: item.ownerId, relatedEntityType: item.relatedEntityType, relatedEntityId: item.relatedEntityId, evidenceIds: item.evidenceIds })
);

const timelineRecords = repository.intelligenceTimelineEvents.map((item) =>
  recordFromEntity(item, item.eventTitle, item.summary, item.eventType, {
    ...item,
    relatedEntity: entityDisplayName(item.entityType, item.entityId)
  }, { priority: item.severity, ownerId: item.actorId, relatedEntityType: item.entityType, relatedEntityId: item.entityId, evidenceIds: item.evidenceIds })
);

const verificationRecords = repository.verificationRequests.map((item) =>
  recordFromEntity(item, `${item.recordType} / ${item.recordId}`, item.nextVerificationStep, item.verificationDecision, {
    ...item,
    relatedEntity: entityDisplayName(item.recordType, item.recordId)
  }, { priority: item.verificationDecision === "needs_more_evidence" || item.verificationDecision === "disputed" ? "high" : "medium", ownerId: item.verifierId, relatedEntityType: item.recordType, relatedEntityId: item.recordId, evidenceIds: item.evidenceIds })
);

const approvalRecords = repository.approvalRequests.map((item) =>
  recordFromEntity(item, item.approvalTitle, item.decisionNote, item.status, {
    ...item,
    relatedEntity: entityDisplayName(item.recordType, item.recordId)
  }, { priority: item.status === "escalated" ? "critical" : "high", ownerId: item.approverId, relatedEntityType: item.recordType, relatedEntityId: item.recordId, evidenceIds: item.evidenceIds })
);

const evidenceReviewRecords = repository.evidenceReviews.map((item) =>
  recordFromEntity(item, item.evidenceTitle, item.reviewNotes, item.approvalStatus, {
    ...item,
    relatedEntity: entityDisplayName(item.relatedRecordType, item.relatedRecordId)
  }, { priority: item.evidenceQualityScore < 55 ? "high" : "medium", ownerId: item.reviewerId, relatedEntityType: item.relatedRecordType, relatedEntityId: item.relatedRecordId, evidenceIds: item.evidenceIds })
);

const auditRecords = repository.auditLogEntries.map((item) =>
  recordFromEntity(item, `${item.eventType} / ${item.entityId}`, item.changeReason, item.eventType, {
    ...item,
    relatedEntity: entityDisplayName(item.entityType, item.entityId)
  }, { priority: item.severity, ownerId: item.actorId, relatedEntityType: item.entityType, relatedEntityId: item.entityId, evidenceIds: item.evidenceIds })
);

const voterRecords = repository.voterRecords.map((item) =>
  recordFromEntity(item, item.voterName, item.nextAction, item.supportStatus, {
    ...item,
    communityIds: item.communityIds.join(", "),
    segmentIds: item.segmentIds.join(", "),
    primaryIssueIds: item.primaryIssueIds.join(", ")
  }, { priority: item.persuasionScore >= 70 ? "high" : "medium", ownerId: item.relationshipOwnerId, relatedEntityType: "voter_record", relatedEntityId: item.id, evidenceIds: item.evidenceIds })
);

const householdRecords = repository.householdRecords.map((item) =>
  recordFromEntity(item, item.householdName, item.addressLocality, item.supportStatus, {
    ...item,
    communityIds: item.communityIds.join(", "),
    keyIssues: item.keyIssues.join(", "),
    visitHistoryIds: item.visitHistoryIds.join(", "),
    conversationIds: item.conversationIds.join(", "),
    promiseIds: item.promiseIds.join(", "),
    followUpIds: item.followUpIds.join(", ")
  }, { priority: item.turnoutRisk >= 60 ? "high" : "medium", ownerId: item.relationshipOwnerId, relatedEntityType: "household_record", relatedEntityId: item.id, evidenceIds: item.evidenceIds })
);

const influencerRecords = repository.influencerRecords.map((item) =>
  recordFromEntity(item, item.influencerName, item.nextAction, item.supportStatus, {
    ...item,
    communityIds: item.communityIds.join(", "),
    boothIds: item.boothIds.join(", "),
    organizations: item.organizations.join(", ")
  }, { priority: item.opportunityLevel, ownerId: item.relationshipOwnerId, relatedEntityType: "influencer_record", relatedEntityId: item.id, evidenceIds: item.evidenceIds })
);

const sentimentRecords = repository.managedSentimentRecords.map((item) =>
  recordFromEntity(item, item.sentimentTitle, item.description, item.sentimentDirection, {
    ...item,
    relatedEntity: entityDisplayName(item.relatedEntityType, item.relatedEntityId)
  }, { priority: item.sentimentDirection === "negative" ? "high" : "medium", ownerId: item.observedBy, relatedEntityType: item.relatedEntityType, relatedEntityId: item.relatedEntityId, evidenceIds: item.evidenceIds })
);

const importRecords = repository.importBatches.map((item) =>
  recordFromEntity(item, item.importTitle, item.validationSummary, item.status, {
    ...item
  }, { priority: item.invalidRows || item.duplicateRows ? "high" : "medium", ownerId: item.uploadedBy, relatedEntityType: "import_batch", relatedEntityId: item.id, evidenceIds: item.evidenceIds })
);

export const foundationConfigs: Record<string, FoundationConfig> = {
  conversations: {
    key: "conversations",
    title: "Conversation Logs",
    eyebrow: "Field intelligence input",
    description: "Political conversations from visits, calls, meetings, household outreach, influencer meetings, and issue verification.",
    basePath: "/conversations",
    entityType: "conversation_log",
    records: conversationRecords,
    actions: ["Create follow-up", "Create promise", "Convert to issue", "Convert to risk", "Convert to opportunity", "Attach evidence", "Link source", ...commonActions],
    activeModuleSection: "field-conversations",
    fields: [
      field("conversationTitle", "Conversation title", "text", true),
      field("conversationType", "Conversation type", "select", true, ["visit", "call", "meeting", "household_outreach", "influencer_meeting", "community_meeting", "issue_verification", "field_interaction"]),
      field("relatedVisitId", "Related visit ID"),
      field("relatedEntityType", "Related entity type", "select", true, entityTypeOptions),
      field("relatedEntityId", "Related entity ID", "text", true),
      field("villageId", "Village", "select", false, villageOptions),
      field("boothId", "Booth", "select", false, boothOptions),
      field("communityId", "Community", "select", false, communityOptions),
      field("householdId", "Household ID"),
      field("influencerId", "Influencer ID"),
      field("issueId", "Issue ID"),
      field("riskId", "Risk ID"),
      field("opportunityId", "Opportunity ID"),
      field("participants", "Participants", "textarea"),
      field("personSpokenTo", "Person spoken to", "text", true),
      field("spokenBy", "Spoken by", "text", true),
      field("date", "Date", "date", true),
      field("time", "Time", "time"),
      field("location", "Location"),
      field("summary", "Summary", "textarea", true),
      field("keyPoints", "Key points", "textarea"),
      field("objectionsRaised", "Objections raised", "textarea"),
      field("issuesRaised", "Issues raised", "textarea"),
      field("promisesMade", "Promises made", "textarea"),
      field("sentimentObserved", "Sentiment observed"),
      field("supportObserved", "Support observed"),
      field("politicalAlignment", "Political alignment"),
      field("followUpRequired", "Follow-up required", "checkbox"),
      field("nextAction", "Next action", "textarea", true),
      field("ownerId", "Owner", "select", true, ownerOptions),
      ...sourceEvidenceFields
    ]
  },
  "follow-ups": {
    key: "follow-ups",
    title: "Follow-up Records",
    eyebrow: "Action accountability",
    description: "Track every follow-up required after visits, conversations, issues, promises, risks, opportunities, and tasks.",
    basePath: "/follow-ups",
    entityType: "follow_up_record",
    records: followUpRecords,
    supportsOverdue: true,
    actions: ["Mark complete", "Escalate", "Attach evidence", "Create task", "Convert to promise", "Generate follow-up report", ...commonActions],
    activeModuleSection: "field-follow-ups",
    fields: [
      field("title", "Title", "text", true),
      field("followUpType", "Follow-up type", "text", true),
      field("relatedEntityType", "Related entity type", "select", true, entityTypeOptions),
      field("relatedEntityId", "Related entity ID", "text", true),
      field("relatedVisitId", "Related visit ID"),
      field("relatedConversationId", "Related conversation ID"),
      field("relatedPromiseId", "Related promise ID"),
      field("villageId", "Village", "select", false, villageOptions),
      field("boothId", "Booth", "select", false, boothOptions),
      field("householdId", "Household ID"),
      field("influencerId", "Influencer ID"),
      field("communityId", "Community", "select", false, communityOptions),
      field("ownerId", "Owner", "select", true, ownerOptions),
      field("assignedTeamId", "Assigned team", "select", false, teamOptions),
      field("dueDate", "Due date", "date", true),
      field("priority", "Priority", "select", true, priorityOptions),
      field("status", "Status", "select", true, ["open", "assigned", "in_progress", "waiting", "completed", "overdue", "escalated", "cancelled"]),
      field("reason", "Reason", "textarea", true),
      field("expectedOutcome", "Expected outcome", "textarea"),
      field("actualOutcome", "Actual outcome", "textarea"),
      field("completionNotes", "Completion notes", "textarea"),
      field("evidenceRequired", "Evidence required", "checkbox"),
      ...sourceEvidenceFields
    ]
  },
  promises: {
    key: "promises",
    title: "Promise Tracking",
    eyebrow: "Trust accountability",
    description: "Track promises made by candidate, campaign team, coordinators, volunteers, influencers, or opposition.",
    basePath: "/promises",
    entityType: "promise_record",
    records: promiseRecords,
    supportsOverdue: true,
    actions: ["Create follow-up", "Create task", "Mark fulfilled", "Mark broken", "Escalate", "Attach evidence", "Generate promise report", ...commonActions],
    activeModuleSection: "field-promises",
    fields: [
      field("promiseTitle", "Promise title", "text", true),
      field("promiseType", "Promise type", "text", true),
      field("promiseMadeBy", "Promise made by", "text", true),
      field("promiseMadeTo", "Promise made to", "text", true),
      field("relatedEntityType", "Related entity type", "select", true, entityTypeOptions),
      field("relatedEntityId", "Related entity ID", "text", true),
      field("relatedVisitId", "Related visit ID"),
      field("relatedConversationId", "Related conversation ID"),
      field("villageId", "Village", "select", false, villageOptions),
      field("boothId", "Booth", "select", false, boothOptions),
      field("communityId", "Community", "select", false, communityOptions),
      field("householdId", "Household ID"),
      field("influencerId", "Influencer ID"),
      field("issueId", "Issue ID"),
      field("promiseDescription", "Promise description", "textarea", true),
      field("datePromised", "Date promised", "date", true),
      field("dueDate", "Due date", "date", true),
      field("priority", "Priority", "select", true, priorityOptions),
      field("politicalImpact", "Political impact", "number"),
      field("trustImpact", "Trust impact", "number"),
      field("status", "Status", "select", true, ["recorded", "assigned", "in_progress", "fulfilled", "partially_fulfilled", "broken", "disputed", "overdue", "escalated", "archived"]),
      field("ownerId", "Owner", "select", true, ownerOptions),
      field("escalationOwnerId", "Escalation owner", "select", false, ownerOptions),
      field("completionNotes", "Completion notes", "textarea"),
      ...sourceEvidenceFields
    ]
  },
  "intelligence-timeline": {
    key: "intelligence-timeline",
    title: "Intelligence Timeline",
    eyebrow: "Cross-system event stream",
    description: "Every important intelligence event across PICOS, from owner assignment to score changes and report generation.",
    basePath: "/intelligence-timeline",
    entityType: "intelligence_timeline_event",
    records: timelineRecords,
    supportsCreate: false,
    supportsEdit: false,
    actions: ["Open related record", "Create task", "Attach evidence", "Add note", "Export timeline"],
    activeModuleSection: "field-timeline",
    fields: [
      field("eventTitle", "Event title"),
      field("eventType", "Event type"),
      field("entityType", "Entity type", "select", false, entityTypeOptions),
      field("entityId", "Entity ID"),
      field("eventDate", "Event date", "date"),
      field("eventTime", "Event time", "time"),
      field("actorId", "User/actor", "select", false, ownerOptions),
      field("villageId", "Village", "select", false, villageOptions),
      field("boothId", "Booth", "select", false, boothOptions),
      field("communityId", "Community", "select", false, communityOptions),
      field("severity", "Severity", "select", false, priorityOptions),
      field("summary", "Summary", "textarea"),
      field("previousValue", "Previous value", "textarea"),
      field("newValue", "New value", "textarea"),
      field("relatedRecordUrl", "Related record URL"),
      ...sourceEvidenceFields
    ]
  },
  verification: {
    key: "verification",
    title: "Verification Queue",
    eyebrow: "Quality gate",
    description: "Verify records before they affect dashboards, reports, AI recommendations, or public-facing claims.",
    basePath: "/verification",
    entityType: "verification_request",
    records: verificationRecords,
    supportsCreate: false,
    supportsEdit: false,
    supportsReview: true,
    actions: ["Verify", "Request evidence", "Mark disputed", "Mark stale", "Reject", "Send to approval", "Create task"],
    activeModuleSection: "field-verification",
    fields: [
      field("recordType", "Record type"),
      field("recordId", "Record ID"),
      field("submittedBy", "Submitted by"),
      field("submittedAt", "Submitted at", "datetime-local"),
      field("verificationNotes", "Verification notes", "textarea"),
      field("verifierId", "Verifier", "select", false, ownerOptions),
      field("verificationDecision", "Verification decision", "select", false, ["pending", "in_review", "verified", "needs_more_evidence", "disputed", "stale", "rejected"]),
      field("nextVerificationStep", "Next verification step", "textarea"),
      ...sourceEvidenceFields
    ]
  },
  approvals: {
    key: "approvals",
    title: "Approval Queue",
    eyebrow: "Decision gate",
    description: "Approve records before they impact strategic intelligence, candidate briefs, public reports, or AI recommendations.",
    basePath: "/approvals",
    entityType: "approval_request",
    records: approvalRecords,
    supportsCreate: false,
    supportsEdit: false,
    supportsReview: true,
    actions: ["Approve", "Reject", "Request revision", "Escalate", "Add decision note", "Create task"],
    activeModuleSection: "field-approvals",
    fields: [
      field("approvalTitle", "Approval title"),
      field("approvalType", "Approval type", "select", false, ["Data approval", "Bulk import approval", "Sensitive claim approval", "Public report approval", "AI recommendation approval", "Ownership change approval", "Promise closure approval"]),
      field("recordType", "Record type"),
      field("recordId", "Record ID"),
      field("submittedBy", "Submitted by"),
      field("submittedAt", "Submitted at", "datetime-local"),
      field("approverId", "Approver", "select", false, ownerOptions),
      field("status", "Status", "select", false, ["pending", "approved", "rejected", "needs_revision", "escalated"]),
      field("decisionNote", "Decision note", "textarea"),
      ...sourceEvidenceFields
    ]
  },
  "evidence-review": {
    key: "evidence-review",
    title: "Evidence Review Queue",
    eyebrow: "Proof quality control",
    description: "Review evidence quality, validity, source link, and sufficiency before records are promoted.",
    basePath: "/evidence-review",
    entityType: "evidence_review",
    records: evidenceReviewRecords,
    supportsCreate: false,
    supportsEdit: false,
    supportsReview: true,
    actions: ["Approve evidence", "Reject evidence", "Mark insufficient", "Mark disputed", "Link to record", "Request better evidence", "Create task"],
    activeModuleSection: "field-evidence-review",
    fields: [
      field("evidenceTitle", "Evidence title"),
      field("evidenceType", "Evidence type"),
      field("filePathOrUrl", "File path or URL"),
      field("relatedRecordType", "Related record type"),
      field("relatedRecordId", "Related record ID"),
      field("submittedBy", "Submitted by"),
      field("dateCaptured", "Date captured", "date"),
      field("dateUploaded", "Date uploaded", "date"),
      field("sourceId", "Source"),
      field("evidenceQualityScore", "Evidence quality score", "number"),
      field("reviewerId", "Reviewer", "select", false, ownerOptions),
      field("reviewNotes", "Review notes", "textarea"),
      ...sourceEvidenceFields
    ]
  },
  "audit-logs": {
    key: "audit-logs",
    title: "Audit Logs",
    eyebrow: "Change accountability",
    description: "Track who changed what, when, why, and through which approval or verification gate.",
    basePath: "/audit-logs",
    entityType: "audit_log_entry",
    records: auditRecords,
    supportsCreate: false,
    supportsEdit: false,
    actions: ["Open related record", "Create task", "Export audit trail"],
    activeModuleSection: "field-audit",
    fields: [
      field("eventType", "Event type"),
      field("entityType", "Entity type", "select", false, entityTypeOptions),
      field("entityId", "Entity ID"),
      field("actorId", "Actor", "select", false, ownerOptions),
      field("actorRole", "Actor role"),
      field("timestamp", "Timestamp", "datetime-local"),
      field("previousValue", "Previous value", "textarea"),
      field("newValue", "New value", "textarea"),
      field("changeReason", "Change reason", "textarea"),
      field("source", "Source"),
      field("ipDevicePlaceholder", "IP/device placeholder"),
      field("approvalId", "Approval ID"),
      field("verificationId", "Verification ID"),
      field("severity", "Severity", "select", false, priorityOptions),
      ...sourceEvidenceFields
    ]
  },
  voters: {
    key: "voters",
    title: "Voter Data Manager",
    eyebrow: "Manual voter input",
    description: "Manual voter-level data management for support, persuasion, turnout, issues, and relationship ownership.",
    basePath: "/voters",
    entityType: "voter_record",
    records: voterRecords,
    actions: ["Create household link", "Create follow-up", "Create visit", "Create task", "Attach evidence", "Link source", ...commonActions],
    activeModuleSection: "field-voters",
    fields: [
      field("voterName", "Voter name", "text", true),
      field("voterId", "Voter ID"),
      field("age", "Age", "number"),
      field("gender", "Gender", "select", false, ["Not recorded", "Female", "Male", "Other"]),
      field("villageId", "Village", "select", true, villageOptions),
      field("boothId", "Booth", "select", true, boothOptions),
      field("householdId", "Household ID"),
      field("communityIds", "Community IDs"),
      field("segmentIds", "Segment IDs"),
      field("occupation", "Occupation"),
      field("phonePlaceholder", "Phone placeholder"),
      field("supportStatus", "Support status"),
      field("persuasionScore", "Persuasion score", "number"),
      field("turnoutProbability", "Turnout probability", "number"),
      field("influenceLevel", "Influence level"),
      field("primaryIssueIds", "Primary issue IDs"),
      field("relationshipOwnerId", "Relationship owner", "select", false, ownerOptions),
      field("lastContactDate", "Last contact date", "date"),
      field("nextAction", "Next action", "textarea"),
      ...sourceEvidenceFields
    ]
  },
  households: {
    key: "households",
    title: "Household Data Manager",
    eyebrow: "Manual household input",
    description: "Household-level data management for support, issues, voters, visits, conversations, promises, and follow-ups.",
    basePath: "/households",
    entityType: "household_record",
    records: householdRecords,
    actions: ["Add voter", "Add visit", "Add conversation", "Add follow-up", "Add promise", "Create task", ...commonActions],
    activeModuleSection: "field-households",
    fields: [
      field("householdName", "Household name", "text", true),
      field("villageId", "Village", "select", true, villageOptions),
      field("boothId", "Booth", "select", false, boothOptions),
      field("addressLocality", "Address/locality", "textarea"),
      field("familySize", "Family size", "number"),
      field("eligibleVoters", "Eligible voters", "number"),
      field("primaryInfluencerId", "Primary influencer ID"),
      field("communityIds", "Community IDs"),
      field("supportStatus", "Support status"),
      field("persuasionScore", "Persuasion score", "number"),
      field("turnoutRisk", "Turnout risk", "number"),
      field("keyIssues", "Key issues", "textarea"),
      field("assignedVolunteerId", "Assigned volunteer", "select", false, ownerOptions),
      field("relationshipOwnerId", "Relationship owner", "select", false, ownerOptions),
      field("visitHistoryIds", "Visit history IDs", "textarea"),
      field("conversationIds", "Conversation IDs", "textarea"),
      field("promiseIds", "Promise IDs", "textarea"),
      field("followUpIds", "Follow-up IDs", "textarea"),
      ...sourceEvidenceFields
    ]
  },
  influencers: {
    key: "influencers",
    title: "Influencer Data Manager",
    eyebrow: "Manual influencer input",
    description: "Political influencer management for reach, alignment, relationship strength, risk, opportunity, and next action.",
    basePath: "/influencers",
    entityType: "influencer_record",
    records: influencerRecords,
    actions: ["Schedule visit", "Add conversation", "Add follow-up", "Add promise", "Create task", "Link relationship", ...commonActions],
    activeModuleSection: "field-influencers",
    fields: [
      field("influencerName", "Influencer name", "text", true),
      field("category", "Category"),
      field("villageId", "Village", "select", true, villageOptions),
      field("communityIds", "Community IDs"),
      field("boothIds", "Booth IDs"),
      field("occupation", "Occupation"),
      field("organizations", "Organizations", "textarea"),
      field("estimatedReach", "Estimated reach", "number"),
      field("influenceScore", "Influence score", "number"),
      field("politicalAlignment", "Political alignment"),
      field("supportStatus", "Support status"),
      field("relationshipStrength", "Relationship strength", "number"),
      field("relationshipOwnerId", "Relationship owner", "select", false, ownerOptions),
      field("lastContactDate", "Last contact date", "date"),
      field("nextAction", "Next action", "textarea"),
      field("riskLevel", "Risk level", "select", false, priorityOptions),
      field("opportunityLevel", "Opportunity level", "select", false, priorityOptions),
      ...sourceEvidenceFields
    ]
  },
  sentiment: {
    key: "sentiment",
    title: "Sentiment Records Manager",
    eyebrow: "Mood and support signal input",
    description: "Track sentiment from communities, villages, households, influencers, media, issues, events, visits, and field reports.",
    basePath: "/sentiment",
    entityType: "sentiment_record",
    records: sentimentRecords,
    actions: ["Create task", "Attach evidence", "Link source", "Convert to risk", "Convert to opportunity", ...commonActions],
    activeModuleSection: "field-sentiment",
    fields: [
      field("sentimentTitle", "Sentiment title", "text", true),
      field("sentimentType", "Sentiment type"),
      field("relatedEntityType", "Related entity type", "select", true, entityTypeOptions),
      field("relatedEntityId", "Related entity ID", "text", true),
      field("villageId", "Village", "select", false, villageOptions),
      field("boothId", "Booth", "select", false, boothOptions),
      field("communityId", "Community", "select", false, communityOptions),
      field("score", "Score", "number"),
      field("sentimentDirection", "Sentiment direction", "select", true, ["positive", "neutral", "negative", "mixed", "unknown"]),
      field("description", "Description", "textarea"),
      field("observedBy", "Observed by", "select", false, ownerOptions),
      field("dateObserved", "Date observed", "date"),
      field("sourceType", "Source type"),
      ...sourceEvidenceFields
    ]
  },
  imports: {
    key: "imports",
    title: "CSV Import Center",
    eyebrow: "Bulk input with approval",
    description: "Bulk import records while preserving manual forms, source assignment, validation, duplicate checks, and approval.",
    basePath: "/imports",
    entityType: "import_batch",
    records: importRecords,
    supportsReview: true,
    supportsHistory: true,
    actions: ["Map columns", "Validate required fields", "Preview rows", "Detect duplicates", "Submit for approval", "Import", "Rollback import", "Create task"],
    activeModuleSection: "field-imports",
    fields: [
      field("importTitle", "Import title", "text", true),
      field("entityType", "Entity type", "select", true, ["Voters", "Households", "Influencers", "Communities", "Villages", "Booths", "Issues", "Sentiment", "Support status", "Turnout data", "Media mentions", "Tasks", "Ownership records", "Visits", "Conversations", "Follow-ups", "Promises"]),
      field("fileName", "File name"),
      field("uploadedBy", "Uploaded by"),
      field("uploadedAt", "Uploaded at", "datetime-local"),
      field("totalRows", "Total rows", "number"),
      field("validRows", "Valid rows", "number"),
      field("invalidRows", "Invalid rows", "number"),
      field("duplicateRows", "Duplicate rows", "number"),
      field("status", "Status", "select", true, ["uploaded", "mapping", "validating", "ready_for_review", "pending_approval", "imported", "failed", "rolled_back"]),
      field("sourceId", "Source", "select", true, sourceOptions),
      field("mappingSummary", "Mapping summary", "textarea"),
      field("validationSummary", "Validation summary", "textarea"),
      field("rollbackAvailable", "Rollback available", "checkbox"),
      ...sourceEvidenceFields
    ]
  }
};

export function getFoundationConfig(key: string) {
  const config = foundationConfigs[key];
  if (!config) throw new Error(`Unknown foundation config: ${key}`);
  return config;
}
