import { repository } from "@/lib/domain/repositories";
import type { ManagerConfig, ManagerField, ManagerRecord } from "./types";
import { managerRecordFromEntity } from "./manager-utils";

const verificationFields: ManagerField[] = [
  { name: "sourceIds", label: "Source", type: "select", options: repository.sourceRecords.map((source) => source.title) },
  { name: "evidenceIds", label: "Evidence", type: "select", options: repository.evidenceItems.map((evidence) => evidence.title) },
  { name: "confidenceScore", label: "Confidence score", type: "number", required: true },
  {
    name: "verificationStatus",
    label: "Verification status",
    type: "select",
    required: true,
    options: ["unverified", "needs_verification", "partially_verified", "verified", "disputed", "stale"]
  },
  { name: "notes", label: "Notes", type: "textarea" }
];

const recordActions = [
  "Save draft",
  "Save and verify later",
  "Save as verified",
  "Mark disputed",
  "Attach source",
  "Attach evidence",
  "Create related task",
  "Link related record"
];

const inboxRecords: ManagerRecord[] = repository.intelligenceSignals.map((signal) =>
  managerRecordFromEntity(signal, signal.title, signal.description, signal.status, {
    title: signal.title,
    description: signal.description,
    sourceType: signal.sourceType,
    submittedBy: signal.submittedBy,
    location: signal.location,
    relatedPerson: signal.relatedPersonId,
    relatedVillage: signal.relatedVillageId,
    relatedBooth: signal.relatedBoothId,
    relatedCommunity: signal.relatedCommunityId,
    priority: signal.priority,
    confidence: signal.confidenceScore,
    verificationStatus: signal.verificationStatus,
    assignedTo: signal.assignedTo,
    dueDate: signal.dueDate,
    status: signal.status
  }, { priority: signal.priority })
);

const sourceRecords: ManagerRecord[] = repository.sourceRecords.map((source) =>
  managerRecordFromEntity(source, source.title, source.nextVerificationStep, source.verificationStatus, {
    sourceTitle: source.title,
    sourceType: source.sourceType,
    publisher: source.publisher,
    author: "Not recorded",
    urlOrFilePath: source.urlOrPath,
    datePublished: source.datePublished,
    dateChecked: source.dateChecked,
    reliabilityScore: source.confidenceScore,
    politicalBias: "Not assessed",
    verificationStatus: source.verificationStatus,
    nextVerificationStep: source.nextVerificationStep,
    notes: source.notes
  })
);

const evidenceRecords: ManagerRecord[] = repository.evidenceItems.map((evidence) =>
  managerRecordFromEntity(evidence, evidence.title, evidence.nextVerificationStep, evidence.verificationStatus, {
    evidenceTitle: evidence.title,
    evidenceType: evidence.evidenceType,
    fileUploadPlaceholder: "Pending file upload",
    urlPath: evidence.urlOrPath,
    dateCaptured: evidence.dateCaptured,
    dateUploaded: evidence.createdAt,
    relatedClaim: evidence.relatedEntityId,
    relatedPerson: evidence.relatedEntityType === "person" ? evidence.relatedEntityId : "",
    relatedVillage: evidence.relatedEntityType === "village" ? evidence.relatedEntityId : "",
    relatedRisk: evidence.relatedEntityType === "political_risk" ? evidence.relatedEntityId : "",
    relatedOpportunity: evidence.relatedEntityType === "political_opportunity" ? evidence.relatedEntityId : "",
    source: evidence.sourceRecordId,
    confidenceScore: evidence.confidenceScore,
    verificationStatus: evidence.verificationStatus,
    notes: evidence.notes
  })
);

const candidateRecords: ManagerRecord[] = [
  ...repository.candidates.map((candidate) =>
    managerRecordFromEntity(candidate, candidate.fullName, candidate.designation, candidate.verificationStatus, {
      type: "Candidate profile",
      title: candidate.fullName,
      description: candidate.designation,
      date: candidate.updatedAt.slice(0, 10),
      location: "Sinnar",
      evidence: "Candidate profile evidence pending",
      source: candidate.sourceIds.join(", "),
      confidence: candidate.confidenceScore,
      verificationStatus: candidate.verificationStatus,
      relatedRecords: candidate.constituencyId
    })
  ),
  ...repository.politicalOrganizations.map((org) =>
    managerRecordFromEntity(org, org.name, org.role, org.status, {
      type: "Organization",
      title: org.name,
      description: org.role,
      date: org.updatedAt.slice(0, 10),
      location: org.reach,
      evidence: "Organization evidence pending",
      source: org.sourceIds.join(", "),
      confidence: org.confidenceScore,
      verificationStatus: org.verificationStatus,
      relatedRecords: org.organizationType
    })
  )
];

const opponentRecords = repository.opponents.map((opponent) =>
  managerRecordFromEntity(opponent, opponent.fullName, opponent.latestMovement, opponent.riskLevel, {
    opponentName: opponent.fullName,
    party: opponent.partyId,
    constituency: "Sinnar",
    position: opponent.role,
    politicalHistory: "Needs structured history",
    strengths: opponent.strengths.join(", "),
    weaknesses: opponent.weaknesses.join(", "),
    supportBase: "Needs village-wise mapping",
    businessInterests: "Needs verification",
    familyNetwork: "Needs verification",
    legalReputationRisks: opponent.weaknesses.join(", "),
    mediaMentions: repository.mediaMentions.filter((mention) => mention.personMentionedId.includes(opponent.id)).length,
    electionHistory: "Needs official records",
    sourceEvidenceLinks: opponent.sourceIds.join(", ")
  }, { priority: opponent.riskLevel })
);

const villageRecords = repository.villages.map((village) =>
  managerRecordFromEntity(village, village.name, village.dominantIssues.join(", "), village.politicalStrength, {
    villageName: village.name,
    zone: village.zone,
    ward: village.zone,
    populationEstimate: village.populationEstimate,
    keyCommunities: "Needs mapping",
    issues: village.dominantIssues.join(", "),
    influencers: "Needs mapping",
    currentSentiment: village.sentimentScore,
    candidateStrength: village.politicalStrength,
    opponentStrength: "Needs scoring",
    riskScore: village.riskScore,
    opportunityScore: village.opportunityScore
  })
);

const boothRecords = repository.booths.map((booth) =>
  managerRecordFromEntity(booth, booth.boothNumber, `Village ${booth.villageId}`, booth.classification, {
    boothNumber: booth.boothNumber,
    boothName: booth.boothNumber,
    village: booth.villageId,
    totalVoters: booth.totalVoters,
    maleVoters: 0,
    femaleVoters: 0,
    youthVoters: 0,
    seniorVoters: 0,
    pastVoteData: "Pending official Form 20",
    boothCoordinator: booth.coordinatorId,
    classification: booth.classification,
    sourceEvidence: booth.sourceIds.join(", ")
  })
);

const communityRecords = repository.communities.map((community) =>
  managerRecordFromEntity(community, community.name, `${community.supportLevel}% support / ${community.sentimentScore} sentiment`, community.trend, {
    communityName: community.name,
    estimatedVoterBase: "Needs survey",
    keyLeaders: "Needs mapping",
    issues: "Needs issue records",
    candidateSupportScore: community.supportLevel,
    opponentSupportScore: "Needs scoring",
    sentiment: community.sentimentScore,
    trend: community.trend,
    confidence: community.confidenceScore,
    villagesWhereInfluential: "Needs mapping",
    sourcesEvidence: community.sourceIds.join(", ")
  })
);

const issueRecords = repository.issues.map((issue) =>
  managerRecordFromEntity(issue, issue.title, issue.affectedPopulation, issue.status, {
    issueTitle: issue.title,
    category: issue.issueType,
    description: issue.title,
    location: issue.location,
    village: issue.location,
    booth: "Not linked",
    communityAffected: issue.affectedPopulation,
    severity: issue.severity,
    affectedPopulation: issue.affectedPopulation,
    politicalImpact: issue.politicalImpact,
    owner: issue.owner,
    status: issue.status,
    evidence: "Needs attachment",
    source: issue.sourceIds.join(", "),
    nextAction: "Verify and assign owner"
  }, { priority: issue.severity })
);

const eventRecords = repository.politicalEvents.map((event) =>
  managerRecordFromEntity(event, event.title, event.description, event.status, {
    eventTitle: event.title,
    eventType: event.eventType,
    dateTime: `${event.date} ${event.time}`,
    location: event.location,
    organizer: event.owner,
    relatedCandidateOpponentParty: event.relatedPersonId,
    expectedAudience: "Needs estimate",
    actualAttendance: "Not recorded",
    politicalImpact: event.priority,
    mediaCoverage: "Not attached",
    evidence: "Needs attachment",
    source: event.sourceIds.join(", "),
    followUpTasks: "Create follow-up task"
  }, { priority: event.priority })
);

const riskRecords = repository.politicalRisks.map((risk) =>
  managerRecordFromEntity(risk, risk.risk, risk.mitigation, risk.status, {
    riskTitle: risk.risk,
    riskCategory: risk.severity,
    description: risk.risk,
    probability: risk.probability,
    impact: risk.impact,
    severity: risk.severity,
    relatedPerson: "Needs link",
    relatedVillage: "Needs link",
    relatedCommunity: "Needs link",
    owner: risk.owner,
    mitigationPlan: risk.mitigation,
    status: risk.status,
    evidence: "Needs attachment",
    source: risk.sourceIds.join(", "),
    reviewDate: risk.targetResolutionDate
  }, { priority: risk.severity })
);

const opportunityRecords = repository.politicalOpportunities.map((opportunity) =>
  managerRecordFromEntity(opportunity, opportunity.opportunity, opportunity.potentialImpact, opportunity.status, {
    opportunityTitle: opportunity.opportunity,
    category: opportunity.priority,
    description: opportunity.potentialImpact,
    targetCommunity: opportunity.targetCommunityId,
    targetGeography: opportunity.targetVillageId,
    expectedVoteImpact: opportunity.expectedVoteImpact,
    priority: opportunity.priority,
    owner: opportunity.owner,
    status: opportunity.status,
    actionPlan: "Needs action plan",
    evidence: "Needs attachment",
    source: opportunity.sourceIds.join(", "),
    reviewDate: opportunity.updatedAt.slice(0, 10)
  }, { priority: opportunity.priority })
);

const taskRecords = repository.tasks.map((task) =>
  managerRecordFromEntity(task, task.title, task.description, task.status, {
    taskTitle: task.title,
    taskType: task.type,
    description: task.description,
    priority: task.priority,
    owner: task.owner,
    dueDate: task.dueDate,
    relatedEntityType: task.relatedEntityType,
    relatedEntityId: task.relatedEntityId,
    evidenceRequired: task.evidenceRequired,
    status: task.status,
    completionNotes: task.completionNotes
  }, { priority: task.priority })
);

const relationshipRecords = repository.relationshipEdges.map((edge) =>
  managerRecordFromEntity(edge, edge.label, `${edge.fromEntityId} to ${edge.toEntityId}`, edge.relationship, {
    entityA: edge.fromEntityId,
    entityB: edge.toEntityId,
    relationshipType: edge.label,
    politicalAlignment: edge.relationship,
    strengthScore: edge.strength,
    direction: `${edge.fromEntityType} -> ${edge.toEntityType}`,
    evidence: "Needs attachment",
    source: edge.sourceIds.join(", "),
    confidence: edge.confidenceScore,
    verificationStatus: edge.verificationStatus,
    notes: edge.notes
  })
);

const mediaRecords = repository.mediaMentions.map((mention) =>
  managerRecordFromEntity(mention, mention.title, mention.summary, mention.riskLevel, {
    mediaTitle: mention.title,
    mediaType: mention.platform,
    publisherChannelPage: mention.platform,
    authorReporter: "Not recorded",
    url: mention.url,
    date: mention.date,
    relatedPerson: mention.personMentionedId,
    relatedParty: "Needs link",
    relatedIssue: "Needs link",
    sentiment: mention.sentiment,
    reachEstimate: mention.reach,
    riskLevel: mention.riskLevel,
    opportunityLevel: "Needs scoring",
    evidenceSource: mention.sourceIds.join(", "),
    responseNeeded: mention.riskLevel === "critical" ? "Yes" : "Review"
  }, { priority: mention.riskLevel })
);

const dailyBriefRecords = repository.intelligenceReports.map((report) =>
  managerRecordFromEntity(report, report.title, report.executiveSummary, report.reportType, {
    executiveSummary: report.executiveSummary,
    whatChangedSinceYesterday: "Verification blockers remain the highest priority.",
    criticalAlerts: "Booth data and legal-claim guardrail.",
    riskChanges: "Form 20 and party-status risks remain elevated.",
    opportunityChanges: "Youth employment and farmer irrigation opportunities emerging.",
    opponentMovement: "Cooperative network activity requires verification.",
    communitySentimentMovement: "Youth and farmers trending upward.",
    villageWatchlist: "Musalgaon, Pangri, Sinnar Town",
    pendingVerification: "Form 20, party status, legal claims",
    overdueTasks: "Check task register",
    recommendedActions: report.decisionLog.join(", "),
    decisionLog: report.decisionLog.join(", ")
  })
);

const ownerName = (id: string) => repository.owners.find((owner) => owner.id === id)?.fullName ?? (id ? id : "Unassigned");
const teamName = (id: string) => repository.teams.find((team) => team.id === id)?.name ?? (id ? id : "Unassigned");
const villageName = (id: string) => repository.villages.find((village) => village.id === id)?.name ?? (id ? id : "Not linked");
const boothName = (id: string) => repository.booths.find((booth) => booth.id === id)?.boothNumber ?? (id ? id : "Not linked");

const ownerOptions = repository.owners.map((owner) => owner.fullName);
const teamOptions = repository.teams.map((team) => team.name);
const villageOptions = repository.villages.map((village) => village.name);
const boothOptions = repository.booths.map((booth) => booth.boothNumber);
const approvalOptions = ["draft", "pending_review", "approved", "rejected", "changes_requested"];
const reviewCadenceOptions = ["daily", "weekly", "monthly", "election_mode"];
const ownershipStatusOptions = ["assigned", "unassigned", "overdue_review", "escalated", "inactive_owner", "pending_approval"];
const ownershipEntityOptions = ["village", "booth", "community", "household", "influencer", "issue", "political_risk", "political_opportunity", "task", "visit", "promise", "political_event", "campaign", "intelligence_report"];

const ownershipRecords = repository.ownershipRecords.map((record) =>
  managerRecordFromEntity(record, record.entityName, `${record.entityType} owned by ${ownerName(record.primaryOwnerId)}`, record.ownershipStatus, {
    entityType: record.entityType,
    entityId: record.entityId,
    entityName: record.entityName,
    primaryOwner: ownerName(record.primaryOwnerId),
    secondaryOwner: ownerName(record.secondaryOwnerId),
    coordinator: ownerName(record.coordinatorId),
    volunteerTeam: teamName(record.volunteerTeamId),
    reportingManager: ownerName(record.reportingManagerId),
    escalationOwner: ownerName(record.escalationOwnerId),
    reviewCadence: record.reviewCadence,
    lastReviewedDate: record.lastReviewedDate,
    nextReviewDate: record.nextReviewDate,
    ownershipStatus: record.ownershipStatus,
    approvalStatus: record.approvalStatus,
    priority: record.priority,
    village: villageName(record.villageId),
    booth: boothName(record.boothId),
    coverageScore: record.coverageScore
  }, { priority: record.priority })
);

const ownerRecords = repository.owners.map((owner) =>
  managerRecordFromEntity(owner, owner.fullName, `${owner.role} / ${owner.territoryFocus}`, owner.status, {
    fullName: owner.fullName,
    role: owner.role,
    team: teamName(owner.teamId),
    phone: owner.phone,
    status: owner.status,
    territoryFocus: owner.territoryFocus,
    assignedRecordCount: owner.assignedRecordCount,
    completedActions: owner.completedActions,
    openActions: owner.openActions,
    overdueActions: owner.overdueActions,
    coverageScore: owner.coverageScore,
    performanceScore: owner.performanceScore,
    approvalStatus: owner.approvalStatus
  }, { priority: owner.overdueActions > 5 ? "critical" : owner.overdueActions > 2 ? "high" : "medium" })
);

const teamRecords = repository.teams.map((team) =>
  managerRecordFromEntity(team, team.name, `${team.teamType} team covering ${team.territory}`, team.status, {
    teamName: team.name,
    teamType: team.teamType,
    leadOwner: ownerName(team.leadOwnerId),
    members: team.memberOwnerIds.map(ownerName).join(", "),
    territory: team.territory,
    status: team.status,
    coverageScore: team.coverageScore,
    approvalStatus: team.approvalStatus
  }, { priority: team.coverageScore < 55 ? "high" : "medium" })
);

const territoryRecords = repository.territoryAssignments.map((territory) =>
  managerRecordFromEntity(territory, `${territory.zone} / ${territory.sector}`, `${villageName(territory.villageId)} / ${boothName(territory.boothId)}`, territory.status, {
    zone: territory.zone,
    sector: territory.sector,
    village: villageName(territory.villageId),
    booth: boothName(territory.boothId),
    assignedOwner: ownerName(territory.assignedOwnerId),
    coordinator: ownerName(territory.coordinatorId),
    volunteerTeam: teamName(territory.volunteerTeamId),
    coverage: territory.coverage,
    status: territory.status,
    heatX: territory.heatX,
    heatY: territory.heatY,
    approvalStatus: territory.approvalStatus
  }, { priority: territory.status === "escalated" || territory.status === "unassigned" ? "critical" : territory.status === "overdue_review" ? "high" : "medium" })
);

const reportingLineRecords = repository.reportingLines.map((line) =>
  managerRecordFromEntity(line, `${ownerName(line.ownerId)} reports to ${ownerName(line.reportsToOwnerId)}`, line.scope, line.status, {
    owner: ownerName(line.ownerId),
    reportsTo: ownerName(line.reportsToOwnerId),
    level: line.level,
    scope: line.scope,
    status: line.status,
    approvalStatus: line.approvalStatus
  }, { priority: line.status === "pending_review" ? "high" : "medium" })
);

const escalationRecords = repository.escalationChains.map((chain) =>
  managerRecordFromEntity(chain, chain.entityName, `${chain.daysOverdue} days overdue / ${chain.nextAction}`, chain.status, {
    entityType: chain.entityType,
    entityId: chain.entityId,
    entityName: chain.entityName,
    currentOwner: ownerName(chain.currentOwnerId),
    escalationOwner: ownerName(chain.escalationOwnerId),
    daysOverdue: chain.daysOverdue,
    severity: chain.severity,
    status: chain.status,
    nextAction: chain.nextAction,
    approvalStatus: chain.approvalStatus
  }, { priority: chain.severity })
);

const field = (name: string, label: string, type: ManagerField["type"] = "text", required = false, options?: string[]): ManagerField => ({
  name,
  label,
  type,
  required,
  options
});

export const managerConfigs: Record<string, ManagerConfig> = {
  "ownership-registry": {
    key: "ownership-registry",
    title: "Ownership Registry",
    eyebrow: "Core operations accountability",
    description: "Accountability, territory ownership, responsibility assignment, escalation, and campaign command structure.",
    basePath: "/ownership-registry",
    entityType: "ownership_record",
    activePoliticalSection: "command-center",
    records: ownershipRecords,
    actions: ["Assign owner", "Reassign owner", "Escalate", "Review", "Create related task", "Attach source", "Attach evidence", "Generate ownership report"],
    fields: [
      field("entityType", "Entity type", "select", true, ownershipEntityOptions),
      field("entityId", "Entity ID", "text", true),
      field("entityName", "Entity name", "text", true),
      field("primaryOwner", "Primary owner", "select", true, ownerOptions),
      field("secondaryOwner", "Secondary owner", "select", false, ownerOptions),
      field("coordinator", "Coordinator", "select", false, ownerOptions),
      field("volunteerTeam", "Volunteer team", "select", false, teamOptions),
      field("reportingManager", "Reporting manager", "select", true, ownerOptions),
      field("escalationOwner", "Escalation owner", "select", true, ownerOptions),
      field("reviewCadence", "Review cadence", "select", true, reviewCadenceOptions),
      field("lastReviewedDate", "Last reviewed date", "date"),
      field("nextReviewDate", "Next review date", "date", true),
      field("ownershipStatus", "Ownership status", "select", true, ownershipStatusOptions),
      field("approvalStatus", "Approval status", "select", true, approvalOptions),
      field("priority", "Priority", "select", true, ["critical", "high", "medium", "low"]),
      field("village", "Village", "select", false, villageOptions),
      field("booth", "Booth", "select", false, boothOptions),
      field("coverageScore", "Coverage score", "number", true),
      ...verificationFields
    ]
  },
  "team-members": {
    key: "team-members",
    title: "Team Members Manager",
    eyebrow: "Ownership actor registry",
    description: "Campaign owners, coordinators, leads, and volunteer-facing accountable people used by the Ownership Registry.",
    basePath: "/team-members",
    entityType: "owner",
    activePoliticalSection: "command-center",
    records: ownerRecords,
    actions: ["Save draft", "Approve owner", "Mark inactive", "Create related task", "Attach source", "Attach evidence", "Review workload"],
    fields: [
      field("fullName", "Full name", "text", true),
      field("role", "Campaign role", "select", true, ["Campaign Manager", "War Room", "Zone Lead", "Sector Lead", "Village Coordinator", "Booth Coordinator", "Community Lead", "Volunteer Team Lead"]),
      field("team", "Team", "select", true, teamOptions),
      field("phone", "Phone"),
      field("status", "Owner status", "select", true, ["active", "inactive", "overloaded", "unavailable"]),
      field("territoryFocus", "Territory focus", "textarea"),
      field("assignedRecordCount", "Assigned records", "number"),
      field("completedActions", "Completed actions", "number"),
      field("openActions", "Open actions", "number"),
      field("overdueActions", "Overdue actions", "number"),
      field("coverageScore", "Coverage score", "number"),
      field("performanceScore", "Performance score", "number"),
      field("approvalStatus", "Approval status", "select", true, approvalOptions),
      ...verificationFields
    ]
  },
  territories: {
    key: "territories",
    title: "Territories Manager",
    eyebrow: "Territory ownership input",
    description: "Zone, sector, village, booth, owner, coordinator, volunteer team, and coverage assignment manager.",
    basePath: "/territories",
    entityType: "territory_assignment",
    activePoliticalSection: "command-center",
    records: territoryRecords,
    actions: ["Assign", "Reassign", "Escalate coverage gap", "Create related task", "Attach source", "Attach evidence", "Generate coverage report"],
    fields: [
      field("zone", "Zone", "text", true),
      field("sector", "Sector", "text", true),
      field("village", "Village", "select", true, villageOptions),
      field("booth", "Booth", "select", false, boothOptions),
      field("assignedOwner", "Assigned owner", "select", true, ownerOptions),
      field("coordinator", "Coordinator", "select", false, ownerOptions),
      field("volunteerTeam", "Volunteer team", "select", false, teamOptions),
      field("coverage", "Coverage", "number", true),
      field("status", "Status", "select", true, ownershipStatusOptions),
      field("heatX", "Map X", "number"),
      field("heatY", "Map Y", "number"),
      field("approvalStatus", "Approval status", "select", true, approvalOptions),
      ...verificationFields
    ]
  },
  "reporting-lines": {
    key: "reporting-lines",
    title: "Reporting Lines Manager",
    eyebrow: "Campaign command structure",
    description: "Reporting line manager for accountability, review flow, and escalation visibility.",
    basePath: "/reporting-lines",
    entityType: "reporting_line",
    activePoliticalSection: "command-center",
    records: reportingLineRecords,
    actions: ["Approve reporting line", "Request change", "Create related task", "Attach source", "Attach evidence"],
    fields: [
      field("owner", "Owner", "select", true, ownerOptions),
      field("reportsTo", "Reports to", "select", true, ownerOptions),
      field("level", "Level", "select", true, ["Candidate", "Campaign Manager", "War Room", "Zone", "Sector", "Village", "Booth", "Community Desk"]),
      field("scope", "Scope", "textarea", true),
      field("status", "Status", "select", true, ["active", "inactive", "pending_review"]),
      field("approvalStatus", "Approval status", "select", true, approvalOptions),
      ...verificationFields
    ]
  },
  escalations: {
    key: "escalations",
    title: "Escalation Manager",
    eyebrow: "Escalation chain input",
    description: "Escalation matrix for overdue ownership, stuck actions, inactive owners, and critical accountability gaps.",
    basePath: "/escalations",
    entityType: "escalation_chain",
    activePoliticalSection: "command-center",
    records: escalationRecords,
    actions: ["Escalate", "Resolve", "Create related task", "Attach source", "Attach evidence", "Notify reporting manager"],
    fields: [
      field("entityType", "Entity type", "select", true, ownershipEntityOptions),
      field("entityId", "Entity ID", "text", true),
      field("entityName", "Entity name", "text", true),
      field("currentOwner", "Current owner", "select", false, ownerOptions),
      field("escalationOwner", "Escalation owner", "select", true, ownerOptions),
      field("daysOverdue", "Days overdue", "number", true),
      field("severity", "Severity", "select", true, ["critical", "high", "medium", "low"]),
      field("status", "Status", "select", true, ["open", "in_review", "escalated", "resolved"]),
      field("nextAction", "Next action", "textarea", true),
      field("approvalStatus", "Approval status", "select", true, approvalOptions),
      ...verificationFields
    ]
  },
  "intelligence-inbox": {
    key: "intelligence-inbox",
    title: "Intelligence Inbox",
    eyebrow: "Central intake",
    description: "All incoming field reports, media updates, WhatsApp observations, volunteer notes, and research findings land here first.",
    basePath: "/intelligence-inbox",
    entityType: "intelligence_signal",
    activePoliticalSection: "command-center",
    records: inboxRecords,
    actions: ["Assign", "Verify", "Convert to Risk", "Convert to Opportunity", "Convert to Event", "Attach Evidence", "Create Task", "Archive"],
    fields: [
      field("title", "Title", "text", true),
      field("description", "Description", "textarea", true),
      field("sourceType", "Source type", "select", true, ["Field report", "WhatsApp observation", "Media update", "Volunteer note", "Research finding", "Local rumour", "Community signal", "Opponent movement"]),
      field("submittedBy", "Submitted by"),
      field("location", "Location"),
      field("relatedPerson", "Related person"),
      field("relatedVillage", "Related village"),
      field("relatedBooth", "Related booth"),
      field("relatedCommunity", "Related community"),
      field("priority", "Priority", "select", true, ["critical", "high", "medium", "low"]),
      field("assignedTo", "Assigned to"),
      field("dueDate", "Due date", "date"),
      field("status", "Status", "select", true, ["new", "triage", "assigned", "verifying", "verified", "rejected", "archived"]),
      ...verificationFields
    ]
  },
  sources: {
    key: "sources",
    title: "Source Registry",
    eyebrow: "Source control",
    description: "Registry for source records used to verify public and internal intelligence claims.",
    basePath: "/sources",
    entityType: "source_record",
    activePoliticalSection: "intelligence-reports",
    records: sourceRecords,
    actions: recordActions,
    fields: [
      field("sourceTitle", "Source title", "text", true),
      field("sourceType", "Source type", "text", true),
      field("publisher", "Publisher"),
      field("author", "Author"),
      field("urlOrFilePath", "URL or file path"),
      field("datePublished", "Date published", "date"),
      field("dateChecked", "Date checked", "date"),
      field("reliabilityScore", "Reliability score", "number"),
      field("politicalBias", "Political bias"),
      field("nextVerificationStep", "Next verification step", "textarea"),
      ...verificationFields
    ]
  },
  evidence: {
    key: "evidence",
    title: "Evidence Repository",
    eyebrow: "Proof archive",
    description: "Repository for images, videos, documents, court records, election results, speeches, interviews, and internal notes.",
    basePath: "/evidence",
    entityType: "evidence_item",
    activePoliticalSection: "intelligence-reports",
    records: evidenceRecords,
    actions: recordActions,
    fields: [
      field("evidenceTitle", "Evidence title", "text", true),
      field("evidenceType", "Evidence type", "select", true, ["image", "video", "document", "news_article", "affidavit", "election_result", "field_report", "social_post", "court_record", "speech", "interview", "internal_note"]),
      field("fileUploadPlaceholder", "File upload placeholder"),
      field("urlPath", "URL/path"),
      field("dateCaptured", "Date captured", "date"),
      field("dateUploaded", "Date uploaded", "date"),
      field("relatedClaim", "Related claim"),
      field("relatedPerson", "Related person"),
      field("relatedVillage", "Related village"),
      field("relatedRisk", "Related risk"),
      field("relatedOpportunity", "Related opportunity"),
      ...verificationFields
    ]
  },
  "candidate-manage": {
    key: "candidate-manage",
    title: "Candidate Data Manager",
    eyebrow: "Candidate input system",
    description: "Full-page input system for biography milestones, achievements, family relationships, organizations, election history, risks, opportunities, speeches, and statements.",
    basePath: "/candidate-intelligence/manage",
    entityType: "candidate_record",
    activePoliticalSection: "candidate-intelligence",
    records: candidateRecords,
    actions: recordActions,
    fields: [
      field("type", "Type", "select", true, [
        "Candidate profile",
        "Biography milestone",
        "Achievement",
        "Family relationship",
        "Organization",
        "Election history",
        "Media mention",
        "Risk",
        "Opportunity",
        "Speech",
        "Public statement",
        "Perception update",
        "Community support signal",
        "Geographic support note",
        "SWOT item",
        "AI insight",
        "Evidence note",
        "Dossier brief"
      ]),
      field("title", "Title", "text", true),
      field("description", "Description", "textarea", true),
      field("date", "Date", "date"),
      field("location", "Location"),
      field("relatedRecords", "Related records"),
      ...verificationFields
    ]
  },
  opponents: {
    key: "opponents",
    title: "Opponent Intelligence Manager",
    eyebrow: "Competitor input system",
    description: "Structured opponent profile and movement intelligence manager.",
    basePath: "/opponents",
    entityType: "opponent",
    activePoliticalSection: "opponent-intelligence",
    records: opponentRecords,
    actions: recordActions,
    fields: ["opponentName", "party", "constituency", "position", "politicalHistory", "strengths", "weaknesses", "supportBase", "businessInterests", "familyNetwork", "legalReputationRisks", "mediaMentions", "electionHistory", "sourceEvidenceLinks"].map((name) => field(name, name.replace(/([A-Z])/g, " $1"))).concat(verificationFields)
  },
  villages: {
    key: "villages",
    title: "Village Data Manager",
    eyebrow: "Constituency intelligence input",
    description: "Village-level political, issue, sentiment, and strength records.",
    basePath: "/constituency/villages",
    entityType: "village",
    activeCoreModule: "constituency-intelligence",
    activeModuleSection: "villages",
    activePoliticalSection: "command-center",
    records: villageRecords,
    actions: recordActions,
    fields: ["villageName", "zone", "ward", "populationEstimate", "keyCommunities", "issues", "influencers", "currentSentiment", "candidateStrength", "opponentStrength", "riskScore", "opportunityScore"].map((name) => field(name, name.replace(/([A-Z])/g, " $1"))).concat(verificationFields)
  },
  booths: {
    key: "booths",
    title: "Booth Data Manager",
    eyebrow: "Booth intelligence input",
    description: "Booth-level voters, vote history, coordinators, classification, and source records.",
    basePath: "/constituency/booths",
    entityType: "booth",
    activeCoreModule: "constituency-intelligence",
    activeModuleSection: "booths",
    activePoliticalSection: "command-center",
    records: boothRecords,
    actions: recordActions,
    fields: ["boothNumber", "boothName", "village", "totalVoters", "maleVoters", "femaleVoters", "youthVoters", "seniorVoters", "pastVoteData", "boothCoordinator", "classification", "sourceEvidence"].map((name) => field(name, name.replace(/([A-Z])/g, " $1"))).concat(verificationFields)
  },
  communities: {
    key: "communities",
    title: "Community Intelligence Manager",
    eyebrow: "Community input system",
    description: "Community support, sentiment, leaders, issues, and village influence manager.",
    basePath: "/communities",
    entityType: "community",
    activePoliticalSection: "command-center",
    records: communityRecords,
    actions: recordActions,
    fields: ["communityName", "estimatedVoterBase", "keyLeaders", "issues", "candidateSupportScore", "opponentSupportScore", "sentiment", "trend", "confidence", "villagesWhereInfluential", "sourcesEvidence"].map((name) => field(name, name.replace(/([A-Z])/g, " $1"))).concat(verificationFields)
  },
  issues: {
    key: "issues",
    title: "Issue Mapping Intake",
    eyebrow: "Issue input system",
    description: "Grievance, local problem, severity, owner, impact, and next-action intake.",
    basePath: "/issues",
    entityType: "issue",
    activePoliticalSection: "command-center",
    records: issueRecords,
    actions: recordActions,
    fields: ["issueTitle", "category", "description", "location", "village", "booth", "communityAffected", "severity", "affectedPopulation", "politicalImpact", "owner", "status", "nextAction"].map((name) => field(name, name.replace(/([A-Z])/g, " $1"))).concat(verificationFields)
  },
  events: {
    key: "events",
    title: "Political Events Manager",
    eyebrow: "Event input system",
    description: "Rallies, meetings, village visits, party events, government events, and follow-up tasks.",
    basePath: "/events",
    entityType: "political_event",
    activePoliticalSection: "political-events",
    records: eventRecords,
    actions: recordActions,
    fields: ["eventTitle", "eventType", "dateTime", "location", "organizer", "relatedCandidateOpponentParty", "expectedAudience", "actualAttendance", "politicalImpact", "mediaCoverage", "followUpTasks"].map((name) => field(name, name.replace(/([A-Z])/g, " $1"))).concat(verificationFields)
  },
  risks: {
    key: "risks",
    title: "Risk Register Manager",
    eyebrow: "Risk input system",
    description: "Political, media, legal, reputation, party, village, and community risk manager.",
    basePath: "/risks",
    entityType: "political_risk",
    activePoliticalSection: "political-risks",
    records: riskRecords,
    actions: recordActions,
    fields: ["riskTitle", "riskCategory", "description", "probability", "impact", "severity", "relatedPerson", "relatedVillage", "relatedCommunity", "owner", "mitigationPlan", "status", "reviewDate"].map((name) => field(name, name.replace(/([A-Z])/g, " $1"))).concat(verificationFields)
  },
  opportunities: {
    key: "opportunities",
    title: "Opportunity Register Manager",
    eyebrow: "Opportunity input system",
    description: "Political opportunity, target community, target geography, action plan, and vote-impact manager.",
    basePath: "/opportunities",
    entityType: "political_opportunity",
    activePoliticalSection: "political-opportunities",
    records: opportunityRecords,
    actions: recordActions,
    fields: ["opportunityTitle", "category", "description", "targetCommunity", "targetGeography", "expectedVoteImpact", "priority", "owner", "status", "actionPlan", "reviewDate"].map((name) => field(name, name.replace(/([A-Z])/g, " $1"))).concat(verificationFields)
  },
  tasks: {
    key: "tasks",
    title: "Task Assignment System",
    eyebrow: "Task input system",
    description: "Tasks created from signals, risks, opportunities, events, recommendations, media mentions, and issues.",
    basePath: "/tasks",
    entityType: "task",
    activePoliticalSection: "command-center",
    records: taskRecords,
    actions: recordActions,
    fields: ["taskTitle", "taskType", "description", "priority", "owner", "dueDate", "relatedEntityType", "relatedEntityId", "evidenceRequired", "status", "completionNotes"].map((name) => field(name, name.replace(/([A-Z])/g, " $1"))).concat(verificationFields)
  },
  relationships: {
    key: "relationships",
    title: "Relationship Map Manager",
    eyebrow: "Relationship input system",
    description: "People, organizations, parties, influencers, alignment, strength, direction, and evidence manager.",
    basePath: "/relationships",
    entityType: "relationship_edge",
    activePoliticalSection: "relationship-intelligence",
    records: relationshipRecords,
    actions: recordActions,
    fields: ["entityA", "entityB", "relationshipType", "politicalAlignment", "strengthScore", "direction", "evidence", "source", "confidence", "verificationStatus", "notes"].map((name) => field(name, name.replace(/([A-Z])/g, " $1"))).concat(verificationFields)
  },
  media: {
    key: "media",
    title: "Media Monitoring Intake",
    eyebrow: "Media input system",
    description: "News, TV, YouTube, social page, reporter, sentiment, reach, risk, opportunity, and response tracking.",
    basePath: "/media",
    entityType: "media_mention",
    activePoliticalSection: "intelligence-reports",
    records: mediaRecords,
    actions: recordActions,
    fields: ["mediaTitle", "mediaType", "publisherChannelPage", "authorReporter", "url", "date", "relatedPerson", "relatedParty", "relatedIssue", "sentiment", "reachEstimate", "riskLevel", "opportunityLevel", "evidenceSource", "responseNeeded"].map((name) => field(name, name.replace(/([A-Z])/g, " $1"))).concat(verificationFields)
  },
  "daily-brief": {
    key: "daily-brief",
    title: "Daily Brief Builder",
    eyebrow: "Intelligence report input",
    description: "Daily report builder for changes, risks, opportunities, opponent movement, sentiment, watchlists, verification, tasks, actions, and decisions.",
    basePath: "/reports/daily-brief",
    entityType: "daily_brief",
    activePoliticalSection: "intelligence-reports",
    records: dailyBriefRecords,
    actions: recordActions,
    fields: ["executiveSummary", "whatChangedSinceYesterday", "criticalAlerts", "riskChanges", "opportunityChanges", "opponentMovement", "communitySentimentMovement", "villageWatchlist", "pendingVerification", "overdueTasks", "recommendedActions", "decisionLog"].map((name) => field(name, name.replace(/([A-Z])/g, " $1"), "textarea")).concat(verificationFields)
  }
};

export function getManagerConfig(key: string) {
  const config = managerConfigs[key];
  if (!config) throw new Error(`Unknown manager config: ${key}`);
  return config;
}
