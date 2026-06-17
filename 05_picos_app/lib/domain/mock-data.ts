import type {
  AuditLog,
  Booth,
  Candidate,
  Community,
  EvidenceItem,
  Influencer,
  IntelligenceReport,
  IntelligenceSignal,
  Issue,
  MediaMention,
  Opponent,
  Owner,
  OwnershipHistory,
  OwnershipRecord,
  Party,
  Person,
  PoliticalEvent,
  PoliticalOpportunity,
  PoliticalOrganization,
  PoliticalRisk,
  Recommendation,
  RelationshipEdge,
  ResearchTask,
  ReviewSchedule,
  Role,
  SentimentRecord,
  SourceRecord,
  Task,
  Team,
  TerritoryAssignment,
  EscalationChain,
  ReportingLine,
  User,
  Village,
  VisitChecklist,
  VisitFollowUp,
  VisitOutcome,
  VisitParticipant,
  VisitRecord,
  VisitReport
} from "./types";

const now = "2026-06-10T02:55:00+05:30";

function base(id: string, sourceIds: string[], confidenceScore = 55) {
  return {
    id,
    createdAt: "2026-06-10T02:10:00+05:30",
    updatedAt: now,
    createdBy: "user-intel-lead",
    updatedBy: "user-intel-lead",
    verificationStatus: "needs_verification" as const,
    confidenceScore,
    sourceIds,
    notes: "Working intelligence record for PICOS product development. Verify before public campaign use."
  };
}

export const roles: Role[] = [
  {
    ...base("role-super-admin", ["src-picos"], 80),
    name: "Super Admin",
    description: "Full system access for Avhad Enterprises and platform operators.",
    permissions: ["read_all", "write_all", "manage_users", "export_reports"],
    verificationStatus: "verified"
  },
  {
    ...base("role-intelligence-team", ["src-picos"], 80),
    name: "Intelligence Team",
    description: "Research, competitor tracking, issue tracking, sentiment, and media analysis.",
    permissions: ["read_intelligence", "write_signals", "verify_sources", "create_reports"],
    verificationStatus: "verified"
  },
  {
    ...base("role-campaign-manager", ["src-picos"], 80),
    name: "Campaign Manager",
    description: "Assigns tasks, manages field operations, and tracks readiness.",
    permissions: ["read_intelligence", "assign_tasks", "manage_events", "view_reports"],
    verificationStatus: "verified"
  }
];

export const users: User[] = [
  {
    ...base("user-intel-lead", ["src-picos"], 75),
    name: "Intelligence Lead",
    roleId: "role-intelligence-team",
    team: "War Room",
    status: "active",
    verificationStatus: "partially_verified"
  },
  {
    ...base("user-campaign-manager", ["src-picos"], 75),
    name: "Campaign Manager",
    roleId: "role-campaign-manager",
    team: "Campaign Operations",
    status: "active",
    verificationStatus: "partially_verified"
  }
];

export const owners: Owner[] = [
  {
    ...base("owner-campaign-manager", ["src-project-context"], 76),
    fullName: "Campaign Manager",
    role: "Campaign Manager",
    teamId: "team-war-room",
    phone: "Not recorded",
    status: "active",
    territoryFocus: "All Sinnar",
    assignedRecordCount: 18,
    completedActions: 42,
    openActions: 11,
    overdueActions: 2,
    coverageScore: 84,
    performanceScore: 79,
    approvalStatus: "approved",
    verificationStatus: "partially_verified"
  },
  {
    ...base("owner-war-room-lead", ["src-project-context"], 72),
    fullName: "War Room Lead",
    role: "War Room",
    teamId: "team-war-room",
    phone: "Not recorded",
    status: "active",
    territoryFocus: "Signals, dashboards, escalation",
    assignedRecordCount: 26,
    completedActions: 55,
    openActions: 17,
    overdueActions: 4,
    coverageScore: 78,
    performanceScore: 73,
    approvalStatus: "approved",
    verificationStatus: "partially_verified"
  },
  {
    ...base("owner-zone-north", ["src-field-reports"], 58),
    fullName: "North Zone Lead",
    role: "Zone Lead",
    teamId: "team-north-zone",
    phone: "Not recorded",
    status: "active",
    territoryFocus: "Wavi, Nandur Shingote",
    assignedRecordCount: 14,
    completedActions: 31,
    openActions: 9,
    overdueActions: 1,
    coverageScore: 72,
    performanceScore: 69,
    approvalStatus: "pending_review"
  },
  {
    ...base("owner-sector-pangri", ["src-field-reports"], 56),
    fullName: "Pangri Sector Coordinator",
    role: "Sector Lead",
    teamId: "team-rural-field",
    phone: "Not recorded",
    status: "active",
    territoryFocus: "Pangri rural belt",
    assignedRecordCount: 12,
    completedActions: 24,
    openActions: 10,
    overdueActions: 3,
    coverageScore: 66,
    performanceScore: 62,
    approvalStatus: "pending_review"
  },
  {
    ...base("owner-musalgaon-coordinator", ["src-field-reports"], 52),
    fullName: "Musalgaon Village Coordinator",
    role: "Village Coordinator",
    teamId: "team-musalgaon-field",
    phone: "Not recorded",
    status: "overloaded",
    territoryFocus: "Musalgaon",
    assignedRecordCount: 21,
    completedActions: 18,
    openActions: 19,
    overdueActions: 7,
    coverageScore: 48,
    performanceScore: 44,
    approvalStatus: "changes_requested"
  },
  {
    ...base("owner-booth-town", ["src-field-reports"], 54),
    fullName: "Sinnar Town Booth Coordinator",
    role: "Booth Coordinator",
    teamId: "team-sinnar-town-booth",
    phone: "Not recorded",
    status: "active",
    territoryFocus: "Town booths",
    assignedRecordCount: 16,
    completedActions: 33,
    openActions: 8,
    overdueActions: 1,
    coverageScore: 76,
    performanceScore: 74,
    approvalStatus: "approved"
  },
  {
    ...base("owner-youth-desk", ["src-campaign-brief"], 62),
    fullName: "Youth Desk Lead",
    role: "Community Lead",
    teamId: "team-youth-outreach",
    phone: "Not recorded",
    status: "active",
    territoryFocus: "Youth, sports, first-time voters",
    assignedRecordCount: 13,
    completedActions: 29,
    openActions: 6,
    overdueActions: 0,
    coverageScore: 82,
    performanceScore: 81,
    approvalStatus: "approved"
  },
  {
    ...base("owner-farmer-cell", ["src-field-reports"], 58),
    fullName: "Farmer Cell Lead",
    role: "Community Lead",
    teamId: "team-farmer-cell",
    phone: "Not recorded",
    status: "active",
    territoryFocus: "Farmers, irrigation issues",
    assignedRecordCount: 17,
    completedActions: 25,
    openActions: 12,
    overdueActions: 2,
    coverageScore: 70,
    performanceScore: 67,
    approvalStatus: "pending_review"
  }
];

export const teams: Team[] = [
  { ...base("team-war-room", ["src-project-context"], 74), name: "War Room Command", teamType: "War Room", leadOwnerId: "owner-war-room-lead", memberOwnerIds: ["owner-campaign-manager", "owner-war-room-lead"], territory: "All Sinnar", status: "active", coverageScore: 84, approvalStatus: "approved" },
  { ...base("team-north-zone", ["src-field-reports"], 56), name: "North Zone Field Team", teamType: "Zone", leadOwnerId: "owner-zone-north", memberOwnerIds: ["owner-zone-north"], territory: "Wavi, Nandur Shingote", status: "active", coverageScore: 72, approvalStatus: "pending_review" },
  { ...base("team-rural-field", ["src-field-reports"], 55), name: "Pangri Rural Field Team", teamType: "Sector", leadOwnerId: "owner-sector-pangri", memberOwnerIds: ["owner-sector-pangri", "owner-farmer-cell"], territory: "Pangri belt", status: "active", coverageScore: 66, approvalStatus: "pending_review" },
  { ...base("team-musalgaon-field", ["src-field-reports"], 48), name: "Musalgaon Field Team", teamType: "Village", leadOwnerId: "owner-musalgaon-coordinator", memberOwnerIds: ["owner-musalgaon-coordinator", "owner-farmer-cell"], territory: "Musalgaon", status: "forming", coverageScore: 48, approvalStatus: "changes_requested" },
  { ...base("team-sinnar-town-booth", ["src-field-reports"], 58), name: "Sinnar Town Booth Team", teamType: "Booth", leadOwnerId: "owner-booth-town", memberOwnerIds: ["owner-booth-town", "owner-youth-desk"], territory: "Town booths", status: "active", coverageScore: 76, approvalStatus: "approved" },
  { ...base("team-youth-outreach", ["src-campaign-brief"], 62), name: "Youth Outreach Team", teamType: "Community", leadOwnerId: "owner-youth-desk", memberOwnerIds: ["owner-youth-desk"], territory: "Sinnar Town and MIDC belt", status: "active", coverageScore: 82, approvalStatus: "approved" },
  { ...base("team-farmer-cell", ["src-field-reports"], 58), name: "Farmer Cell", teamType: "Community", leadOwnerId: "owner-farmer-cell", memberOwnerIds: ["owner-farmer-cell", "owner-sector-pangri"], territory: "Pangri, Musalgaon, Nandur", status: "active", coverageScore: 70, approvalStatus: "pending_review" }
];

export const sourceRecords: SourceRecord[] = [
  {
    ...base("src-project-context", [], 85),
    title: "PROJECT_CONTEXT.md",
    sourceType: "internal_context",
    urlOrPath: "PROJECT_CONTEXT.md",
    publisher: "PICOS project workspace",
    datePublished: "2026-06-10",
    dateChecked: "2026-06-10",
    reliability: "medium",
    nextVerificationStep: "Use this as project memory; attach primary records before public use.",
    verificationStatus: "partially_verified"
  },
  {
    ...base("src-source-map", [], 85),
    title: "SOURCE_MAP.md",
    sourceType: "internal_source_map",
    urlOrPath: "02_project_context/SOURCE_MAP.md",
    publisher: "PICOS project workspace",
    datePublished: "2026-06-10",
    dateChecked: "2026-06-10",
    reliability: "medium",
    nextVerificationStep: "Collect missing primary records listed in source map.",
    verificationStatus: "partially_verified"
  },
  {
    ...base("src-campaign-brief", [], 82),
    title: "Campaign Intelligence Brief",
    sourceType: "internal_brief",
    urlOrPath: "02_project_context/CAMPAIGN_INTELLIGENCE_BRIEF.md",
    publisher: "PICOS project workspace",
    datePublished: "2026-06-10",
    dateChecked: "2026-06-10",
    reliability: "medium",
    nextVerificationStep: "Convert brief claims into source-attached records.",
    verificationStatus: "partially_verified"
  },
  {
    ...base("src-eci-form20-needed", [], 25),
    title: "Official ECI Form 20 for Sinnar 2024",
    sourceType: "official_record_needed",
    urlOrPath: "pending",
    publisher: "Election Commission of India",
    datePublished: "pending",
    dateChecked: "2026-06-10",
    reliability: "high",
    nextVerificationStep: "Collect official booth-wise Form 20 and attach to election records.",
    verificationStatus: "unverified"
  },
  {
    ...base("src-field-reports", [], 50),
    title: "Internal field and volunteer reports",
    sourceType: "field_report",
    urlOrPath: "internal",
    publisher: "Campaign field network",
    datePublished: "2026-06-10",
    dateChecked: "2026-06-10",
    reliability: "low",
    nextVerificationStep: "Confirm each signal with two independent local sources.",
    verificationStatus: "needs_verification"
  }
];

export const evidenceItems: EvidenceItem[] = [
  {
    ...base("ev-eci-form20", ["src-eci-form20-needed"], 20),
    title: "ECI Form 20 Sinnar 2024",
    evidenceType: "election_result",
    sourceRecordId: "src-eci-form20-needed",
    urlOrPath: "pending",
    dateCaptured: "pending",
    dateChecked: "2026-06-10",
    relatedEntityType: "candidate",
    relatedEntityId: "cand-uday-sangle",
    nextVerificationStep: "Collect official Form 20 before booth analytics."
  },
  {
    ...base("ev-candidate-portrait", ["src-project-context"], 20),
    title: "Verified candidate portrait",
    evidenceType: "image",
    sourceRecordId: "src-project-context",
    urlOrPath: "pending",
    dateCaptured: "pending",
    dateChecked: "2026-06-10",
    relatedEntityType: "candidate",
    relatedEntityId: "cand-uday-sangle",
    nextVerificationStep: "Upload candidate-office approved image."
  },
  {
    ...base("ev-party-status-primary", ["src-source-map"], 35),
    title: "Primary confirmation of current party status",
    evidenceType: "document",
    sourceRecordId: "src-source-map",
    urlOrPath: "pending",
    dateCaptured: "pending",
    dateChecked: "2026-06-10",
    relatedEntityType: "candidate",
    relatedEntityId: "cand-uday-sangle",
    nextVerificationStep: "Collect primary party or candidate statement."
  },
  {
    ...base("ev-youth-sports-archive", ["src-campaign-brief"], 45),
    title: "Youth sports event archive",
    evidenceType: "image",
    sourceRecordId: "src-campaign-brief",
    urlOrPath: "pending",
    dateCaptured: "pending",
    dateChecked: "2026-06-10",
    relatedEntityType: "political_organization",
    relatedEntityId: "org-sahyadri-yuva-manch",
    nextVerificationStep: "Upload event photos, videos, and attendance notes."
  },
  {
    ...base("ev-visit-pangri-photos", ["src-field-reports"], 48),
    title: "Pangri irrigation visit field photos",
    evidenceType: "image",
    sourceRecordId: "src-field-reports",
    urlOrPath: "pending-upload",
    dateCaptured: "2026-06-09",
    dateChecked: "2026-06-10",
    relatedEntityType: "visit_record",
    relatedEntityId: "visit-pangri-irrigation",
    nextVerificationStep: "Upload timestamped field photos and confirm location with coordinator."
  },
  {
    ...base("ev-visit-youth-notes", ["src-field-reports"], 52),
    title: "MIDC youth listening circle notes",
    evidenceType: "field_report",
    sourceRecordId: "src-field-reports",
    urlOrPath: "internal-note-pending",
    dateCaptured: "2026-06-10",
    dateChecked: "2026-06-10",
    relatedEntityType: "visit_record",
    relatedEntityId: "visit-midc-youth-listening",
    nextVerificationStep: "Attach scanned volunteer note and cross-check participant count."
  },
  {
    ...base("ev-visit-musalgaon-followup", ["src-field-reports"], 44),
    title: "Musalgaon follow-up evidence packet",
    evidenceType: "document",
    sourceRecordId: "src-field-reports",
    urlOrPath: "pending-upload",
    dateCaptured: "pending",
    dateChecked: "2026-06-10",
    relatedEntityType: "visit_record",
    relatedEntityId: "visit-musalgaon-owner-recovery",
    nextVerificationStep: "Collect issue photos, owner notes, and meeting attendance before escalation review."
  }
];

export const parties: Party[] = [
  { ...base("party-ncp-ajit", ["src-project-context"], 70), name: "NCP", faction: "Ajit Pawar faction", alignment: "Opponent camp", localStrength: 82 },
  { ...base("party-ncp-sp", ["src-source-map"], 65), name: "NCP", faction: "Sharad Pawar faction", alignment: "Former association", localStrength: 54 },
  { ...base("party-bjp-aligned", ["src-source-map"], 45), name: "BJP-aligned circles", faction: "Needs primary confirmation", alignment: "Reported movement", localStrength: 62 },
  { ...base("party-shiv-sena", ["src-campaign-brief"], 60), name: "Shiv Sena networks", faction: "Factional local influence", alignment: "Mixed", localStrength: 66 }
];

export const candidates: Candidate[] = [
  {
    ...base("cand-uday-sangle", ["src-project-context", "src-campaign-brief"], 68),
    fullName: "Uday Sangle",
    designation: "Political leader, entrepreneur, social activist, sports activist",
    constituencyId: "v-sinnar-town",
    partyStatus: "Expelled from NCP(SP); reported BJP-aligned movement needs primary verification",
    age: "Needs verification",
    politicalExperience: "Long Shiv Sena association, 2024 Assembly contestant, grassroots organizer",
    currentPosition: "Public leader and primary challenger profile in Sinnar",
    electionStatus: "2024 Sinnar Assembly candidate; result figures provisional until ECI Form 20",
    publicIdentity: ["grassroots leader", "entrepreneur", "social activist", "sports activist"]
  }
];

export const opponents: Opponent[] = [
  {
    ...base("opp-manikrao-kokate", ["src-project-context", "src-source-map"], 65),
    fullName: "Manikrao Kokate",
    partyId: "party-ncp-ajit",
    role: "Principal competitor",
    strengths: ["Incumbency network", "Cooperative influence", "Administrative access"],
    weaknesses: ["Anti-incumbency", "Party-switching perception", "Date-sensitive legal/reputation risk"],
    riskLevel: "high",
    influenceScore: 82,
    latestMovement: "Reported cooperative-network outreach and legal-reputation monitoring item."
  },
  {
    ...base("opp-rajabhau-waje", ["src-campaign-brief"], 62),
    fullName: "Rajabhau Waje",
    partyId: "party-shiv-sena",
    role: "Secondary or potential major competitor",
    strengths: ["Farmer image", "APMC influence", "MP visibility"],
    weaknesses: ["May be split between parliamentary and local work", "Factional dynamics"],
    riskLevel: "medium",
    influenceScore: 70,
    latestMovement: "Farmer credibility remains strategically relevant if local positioning increases."
  }
];

export const persons: Person[] = [
  { ...base("person-uday-sangle", ["src-project-context"], 68), fullName: "Uday Sangle", role: "Candidate", affiliation: "Reported BJP-aligned circles", influenceScore: 92, relationshipToCandidate: "supportive" },
  { ...base("person-sheetal-sangle", ["src-campaign-brief"], 55), fullName: "Sheetal Sangle", role: "Former President, Nashik Zilla Parishad", affiliation: "Family political network", influenceScore: 72, relationshipToCandidate: "supportive" },
  { ...base("person-kokate", ["src-project-context"], 65), fullName: "Manikrao Kokate", role: "Opponent", affiliation: "NCP Ajit faction", influenceScore: 86, relationshipToCandidate: "opposed" },
  { ...base("person-waje", ["src-campaign-brief"], 62), fullName: "Rajabhau Waje", role: "Potential competitor", affiliation: "Shiv Sena-linked network", influenceScore: 70, relationshipToCandidate: "neutral" },
  { ...base("person-youth-organizer", ["src-field-reports"], 42), fullName: "Youth organizer cluster", role: "Local youth network", affiliation: "Sahyadri-linked", influenceScore: 66, relationshipToCandidate: "supportive" }
];

export const politicalOrganizations: PoliticalOrganization[] = [
  { ...base("org-sahyadri-yuva-manch", ["src-campaign-brief"], 68), name: "Sahyadri Yuva Manch", organizationType: "Social / Youth", role: "Founded by Uday Sangle", influenceScore: 78, reach: "Youth, sports, village networks", status: "Active" },
  { ...base("org-cooperative-network", ["src-field-reports"], 52), name: "Cooperative network", organizationType: "Cooperative", role: "Opponent influence channel", influenceScore: 84, reach: "Farmer and local patronage network", status: "Mapping" },
  { ...base("org-village-workers", ["src-field-reports"], 50), name: "Village worker network", organizationType: "Campaign organization", role: "Local reporting and mobilization", influenceScore: 76, reach: "Village and booth workers", status: "Partially mapped" }
];

export const communities: Community[] = [
  { ...base("comm-maratha", ["src-field-reports"], 55), name: "Maratha", supportLevel: 58, sentimentScore: 57, trend: "Stable", confidenceLevel: "Medium" },
  { ...base("comm-mali", ["src-field-reports"], 42), name: "Mali", supportLevel: 55, sentimentScore: 54, trend: "Up", confidenceLevel: "Low" },
  { ...base("comm-vanjari", ["src-field-reports"], 38), name: "Vanjari", supportLevel: 49, sentimentScore: 48, trend: "Stable", confidenceLevel: "Low" },
  { ...base("comm-dhangar", ["src-field-reports"], 40), name: "Dhangar", supportLevel: 53, sentimentScore: 52, trend: "Up", confidenceLevel: "Low" },
  { ...base("comm-sc", ["src-field-reports"], 36), name: "SC", supportLevel: 50, sentimentScore: 51, trend: "Down", confidenceLevel: "Low" },
  { ...base("comm-st", ["src-field-reports"], 33), name: "ST", supportLevel: 47, sentimentScore: 46, trend: "Stable", confidenceLevel: "Low" },
  { ...base("comm-minority", ["src-field-reports"], 32), name: "Minority", supportLevel: 45, sentimentScore: 44, trend: "Stable", confidenceLevel: "Low" },
  { ...base("comm-farmers", ["src-field-reports"], 58), name: "Farmers", supportLevel: 61, sentimentScore: 60, trend: "Up", confidenceLevel: "Medium" },
  { ...base("comm-women", ["src-field-reports"], 52), name: "Women", supportLevel: 57, sentimentScore: 56, trend: "Up", confidenceLevel: "Medium" },
  { ...base("comm-youth", ["src-field-reports"], 64), name: "Youth", supportLevel: 67, sentimentScore: 66, trend: "Up", confidenceLevel: "Medium" }
];

export const villages: Village[] = [
  { ...base("v-sinnar-town", ["src-field-reports"], 58), name: "Sinnar Town", zone: "Urban", populationEstimate: 0, politicalStrength: "swing", riskScore: 58, opportunityScore: 70, sentimentScore: 63, influenceScore: 78, mapX: 51, mapY: 45, dominantIssues: ["media narrative", "urban service grievances"] },
  { ...base("v-wavi", ["src-field-reports"], 45), name: "Wavi", zone: "North", populationEstimate: 0, politicalStrength: "swing", riskScore: 61, opportunityScore: 64, sentimentScore: 56, influenceScore: 60, mapX: 34, mapY: 29, dominantIssues: ["influencer alignment"] },
  { ...base("v-nandur", ["src-field-reports"], 48), name: "Nandur Shingote", zone: "North", populationEstimate: 0, politicalStrength: "swing", riskScore: 54, opportunityScore: 62, sentimentScore: 55, influenceScore: 63, mapX: 62, mapY: 24, dominantIssues: ["farmer credibility competition"] },
  { ...base("v-dubere", ["src-field-reports"], 52), name: "Dubere", zone: "Central", populationEstimate: 0, politicalStrength: "lean", riskScore: 39, opportunityScore: 68, sentimentScore: 59, influenceScore: 55, mapX: 42, mapY: 63, dominantIssues: ["women group issue forum"] },
  { ...base("v-pangri", ["src-field-reports"], 55), name: "Pangri", zone: "Rural", populationEstimate: 0, politicalStrength: "swing", riskScore: 65, opportunityScore: 74, sentimentScore: 60, influenceScore: 67, mapX: 69, mapY: 67, dominantIssues: ["irrigation", "crop loss"] },
  { ...base("v-musalgaon", ["src-field-reports"], 50), name: "Musalgaon", zone: "Rural", populationEstimate: 0, politicalStrength: "critical", riskScore: 72, opportunityScore: 66, sentimentScore: 52, influenceScore: 74, mapX: 76, mapY: 52, dominantIssues: ["cooperative network activity"] },
  { ...base("v-devpur", ["src-field-reports"], 45), name: "Devpur", zone: "South", populationEstimate: 0, politicalStrength: "weak", riskScore: 57, opportunityScore: 58, sentimentScore: 50, influenceScore: 46, mapX: 48, mapY: 82, dominantIssues: ["coordinator coverage gap"] }
];

export const booths: Booth[] = [
  { ...base("booth-town-001", ["src-eci-form20-needed"], 20), boothNumber: "Town-001", villageId: "v-sinnar-town", totalVoters: 0, pastVoteSangle: null, pastVoteOpponent: null, classification: "swing", coordinatorId: "user-campaign-manager" },
  { ...base("booth-midc-001", ["src-eci-form20-needed"], 20), boothNumber: "MIDC-001", villageId: "v-sinnar-town", totalVoters: 0, pastVoteSangle: null, pastVoteOpponent: null, classification: "lean", coordinatorId: "user-campaign-manager" },
  { ...base("booth-pangri-001", ["src-eci-form20-needed"], 20), boothNumber: "Pangri-001", villageId: "v-pangri", totalVoters: 0, pastVoteSangle: null, pastVoteOpponent: null, classification: "swing", coordinatorId: "user-intel-lead" },
  { ...base("booth-musalgaon-001", ["src-eci-form20-needed"], 20), boothNumber: "Musalgaon-001", villageId: "v-musalgaon", totalVoters: 0, pastVoteSangle: null, pastVoteOpponent: null, classification: "critical", coordinatorId: "user-intel-lead" }
];

export const influencers: Influencer[] = [
  { ...base("inf-youth-organizer", ["src-field-reports"], 48), personId: "person-youth-organizer", influenceType: "youth_sports", primaryArea: "Sinnar Town", primaryCommunityId: "comm-youth", reachScore: 68, alignment: "supportive" },
  { ...base("inf-farmer-groups", ["src-field-reports"], 42), personId: "person-waje", influenceType: "farmer_network", primaryArea: "Nandur Shingote", primaryCommunityId: "comm-farmers", reachScore: 64, alignment: "neutral" },
  { ...base("inf-cooperative", ["src-field-reports"], 40), personId: "person-kokate", influenceType: "cooperative", primaryArea: "Musalgaon", primaryCommunityId: "comm-farmers", reachScore: 78, alignment: "opposed" }
];

export const issues: Issue[] = [
  { ...base("issue-youth-employment", ["src-field-reports"], 58), title: "Youth employment grievance rising near industrial belt", issueType: "employment", location: "Malegaon MIDC", severity: "high", affectedPopulation: "Youth", status: "action_drafted", owner: "Youth Outreach", politicalImpact: 81 },
  { ...base("issue-irrigation-pangri", ["src-field-reports"], 55), title: "Farmer irrigation complaints concentrated in Pangri belt", issueType: "agriculture", location: "Pangri", severity: "medium", affectedPopulation: "Farmers", status: "open", owner: "Farmer Cell", politicalImpact: 68 },
  { ...base("issue-party-status", ["src-source-map"], 65), title: "Party-transition perception risk remains unresolved", issueType: "reputation", location: "All villages", severity: "high", affectedPopulation: "All", status: "needs_verification", owner: "Narrative Desk", politicalImpact: 84 }
];

export const politicalEvents: PoliticalEvent[] = [
  { ...base("event-form20-followup", ["src-source-map"], 70), title: "ECI Form 20 collection follow-up", description: "Collect official booth-wise result source.", eventType: "Research", date: "2026-06-11", time: "10:00", location: "All booths", relatedPersonId: "person-uday-sangle", relatedVillageId: "v-sinnar-town", priority: "high", owner: "Research Desk", status: "scheduled" },
  { ...base("event-youth-listening", ["src-field-reports"], 55), title: "Youth employment listening circle", description: "Capture named youth employment concerns.", eventType: "Community Event", date: "2026-06-12", time: "18:30", location: "Malegaon MIDC", relatedPersonId: "person-youth-organizer", relatedVillageId: "v-sinnar-town", priority: "medium", owner: "Youth Outreach", status: "planning" },
  { ...base("event-irrigation-walk", ["src-field-reports"], 52), title: "Farmer irrigation issue walk-through", description: "Validate irrigation issue claims.", eventType: "Village Visit", date: "2026-06-14", time: "08:00", location: "Pangri", relatedPersonId: "person-uday-sangle", relatedVillageId: "v-pangri", priority: "medium", owner: "Farmer Cell", status: "planning" }
];

export const mediaMentions: MediaMention[] = [
  { ...base("media-party-status", ["src-source-map"], 45), date: "2026-06-10", platform: "WhatsApp", title: "Party status discussion circulating", url: "internal", personMentionedId: "person-uday-sangle", sentiment: "mixed", riskLevel: "high", reach: "Local groups", summary: "Party-transition narrative needs source-safe response." },
  { ...base("media-kokate-legal", ["src-source-map"], 35), date: "2026-06-10", platform: "WhatsApp", title: "Unverified legal update being reshared", url: "internal", personMentionedId: "person-kokate", sentiment: "negative", riskLevel: "critical", reach: "Local groups", summary: "Do not use publicly until current legal source is checked." }
];

export const intelligenceSignals: IntelligenceSignal[] = [
  { ...base("sig-kokate-legal-whatsapp", ["src-source-map"], 35), title: "Unverified legal update being reshared in WhatsApp groups", description: "A local WhatsApp chain is circulating a claim about Manikrao Kokate's legal status.", sourceType: "WhatsApp observation", submittedBy: "Digital watch desk", location: "Sinnar Town", relatedPersonId: "person-kokate", relatedVillageId: "v-sinnar-town", relatedBoothId: "booth-town-001", relatedCommunityId: "comm-farmers", category: "Legal Reputation Risk", priority: "critical", impactScore: 89, assignedTo: "Research + Legal Review", dueDate: "2026-06-12", status: "verifying", nextVerificationStep: "Collect current court order or reputable dated report before campaign reference." },
  { ...base("sig-coop-activity", ["src-field-reports"], 52), title: "Reported opponent activity spike around cooperative network meetings", description: "Multiple local reports indicate increased outreach through cooperative-linked contacts.", sourceType: "Village coordinator report", submittedBy: "Village coordinator network", location: "Musalgaon", relatedPersonId: "person-kokate", relatedVillageId: "v-musalgaon", relatedBoothId: "booth-musalgaon-001", relatedCommunityId: "comm-farmers", category: "Opponent Movement", priority: "high", impactScore: 76, assignedTo: "Constituency Intelligence", dueDate: "2026-06-13", status: "assigned", nextVerificationStep: "Confirm names, timing, and attendance with two local sources." },
  { ...base("sig-youth-employment", ["src-field-reports"], 58), title: "Youth employment grievance rising near industrial belt", description: "Volunteer calls show repeated concern around local job access and training pathways.", sourceType: "Volunteer note", submittedBy: "Volunteer phone bank", location: "Malegaon MIDC", relatedPersonId: "person-youth-organizer", relatedVillageId: "v-sinnar-town", relatedBoothId: "booth-midc-001", relatedCommunityId: "comm-youth", category: "Issue Escalation", priority: "high", impactScore: 81, assignedTo: "Youth Outreach", dueDate: "2026-06-12", status: "triage", nextVerificationStep: "Collect 20 named issue statements." },
  { ...base("sig-irrigation-pangri", ["src-field-reports"], 55), title: "Farmer irrigation complaints concentrated in Pangri belt", description: "Ground notes point to water distribution and crop-loss anxiety.", sourceType: "Field report", submittedBy: "Farmer cell", location: "Pangri", relatedPersonId: "person-uday-sangle", relatedVillageId: "v-pangri", relatedBoothId: "booth-pangri-001", relatedCommunityId: "comm-farmers", category: "Farmer Issue", priority: "medium", impactScore: 68, assignedTo: "Farmer Cell", dueDate: "2026-06-14", status: "new", nextVerificationStep: "Validate with local agriculture officers and photo evidence." },
  { ...base("sig-booth-data-gap", ["src-source-map"], 80), title: "Booth data gap blocks precise swing analysis", description: "Official ECI Form 20 and booth-wise result data are still missing.", sourceType: "Research finding", submittedBy: "Research Desk", location: "All villages", relatedPersonId: "person-uday-sangle", relatedVillageId: "v-sinnar-town", relatedBoothId: "booth-town-001", relatedCommunityId: "comm-youth", category: "Data Quality", priority: "critical", impactScore: 92, assignedTo: "Research Desk", dueDate: "2026-06-18", status: "assigned", nextVerificationStep: "Collect official Form 20 and attach source record." }
];

export const politicalRisks: PoliticalRisk[] = [
  { ...base("risk-form20-missing", ["src-source-map"], 80), risk: "Official booth-wise result data missing", probability: 82, impact: 92, severity: "critical", owner: "Research Desk", mitigation: "Collect official ECI Form 20 before booth analytics.", status: "blocked", targetResolutionDate: "2026-06-18", previousSeverity: "high" },
  { ...base("risk-party-transition", ["src-source-map"], 65), risk: "Party-transition narrative becomes opponent attack line", probability: 72, impact: 84, severity: "high", owner: "Narrative Desk", mitigation: "Verified explanation line and worker FAQ.", status: "needs_verification", targetResolutionDate: "2026-06-16", previousSeverity: "medium" },
  { ...base("risk-legal-claim", ["src-source-map"], 55), risk: "Legal claim about opponent used without fresh verification", probability: 66, impact: 88, severity: "critical", owner: "Legal Review", mitigation: "Hold claims until dated evidence is attached.", status: "guardrail_needed", targetResolutionDate: "2026-06-12", previousSeverity: "high" },
  { ...base("risk-cooperative-network", ["src-field-reports"], 52), risk: "Cooperative intermediaries consolidate against Sangle", probability: 64, impact: 77, severity: "high", owner: "Political Desk", mitigation: "Map cooperative contacts and identify neutral farmer conveners.", status: "mapping", targetResolutionDate: "2026-06-22", previousSeverity: "medium" }
];

export const politicalOpportunities: PoliticalOpportunity[] = [
  { ...base("opp-youth-employment", ["src-field-reports"], 58), opportunity: "Youth employment listening circuit", potentialImpact: "High trust gain", targetCommunityId: "comm-youth", targetVillageId: "v-sinnar-town", priority: "high", owner: "Youth Outreach", status: "action_drafted", expectedVoteImpact: "High", previousPriority: "medium" },
  { ...base("opp-farmer-irrigation", ["src-field-reports"], 55), opportunity: "Farmer irrigation grievance documentation", potentialImpact: "Farmer credibility", targetCommunityId: "comm-farmers", targetVillageId: "v-pangri", priority: "high", owner: "Farmer Cell", status: "open", expectedVoteImpact: "High", previousPriority: "medium" },
  { ...base("opp-clean-governance", ["src-campaign-brief"], 62), opportunity: "Verified clean-governance narrative", potentialImpact: "Constituency-wide trust", targetCommunityId: "comm-youth", targetVillageId: "v-sinnar-town", priority: "high", owner: "Content Strategy", status: "needs_evidence_library", expectedVoteImpact: "High", previousPriority: "high" }
];

export const researchTasks: ResearchTask[] = [
  { ...base("research-form20", ["src-source-map"], 80), priority: "critical", question: "What are the official 2024 booth-wise results for Sinnar?", owner: "Research Desk", status: "blocked", sourceNeeded: "ECI Form 20", outputExpected: "Booth-wise result table", deadline: "2026-06-18" },
  { ...base("research-party-status", ["src-source-map"], 65), priority: "high", question: "What is Uday Sangle's formally verified current party status?", owner: "Candidate Office", status: "open", sourceNeeded: "Primary party/candidate statement", outputExpected: "Source-attached party status record", deadline: "2026-06-16" }
];

export const sentimentRecords: SentimentRecord[] = [
  ...communities.map((community) => ({
    ...base(`sent-${community.id}`, community.sourceIds, community.confidenceScore),
    entityType: "community" as const,
    entityId: community.id,
    segment: community.name,
    score: community.sentimentScore,
    previousScore: community.sentimentScore - (community.trend === "Up" ? 3 : community.trend === "Down" ? -2 : 0),
    trend: community.trend,
    period: "2026-06"
  })),
  { ...base("sent-candidate-trust", ["src-field-reports"], 58), entityType: "candidate", entityId: "cand-uday-sangle", segment: "Overall Trust", score: 61, previousScore: 59, trend: "Up", period: "2026-06" }
];

export const relationshipEdges: RelationshipEdge[] = [
  { ...base("rel-uday-sheetal", ["src-campaign-brief"], 55), fromEntityType: "candidate", fromEntityId: "cand-uday-sangle", toEntityType: "person", toEntityId: "person-sheetal-sangle", relationship: "supportive", strength: 82, influenceWeight: 72, label: "Family political network" },
  { ...base("rel-uday-sahyadri", ["src-campaign-brief"], 68), fromEntityType: "candidate", fromEntityId: "cand-uday-sangle", toEntityType: "political_organization", toEntityId: "org-sahyadri-yuva-manch", relationship: "supportive", strength: 78, influenceWeight: 78, label: "Youth reach" },
  { ...base("rel-kokate-coop", ["src-field-reports"], 50), fromEntityType: "opponent", fromEntityId: "opp-manikrao-kokate", toEntityType: "political_organization", toEntityId: "org-cooperative-network", relationship: "opposed", strength: 82, influenceWeight: 84, label: "Opponent strength" },
  { ...base("rel-uday-village-workers", ["src-field-reports"], 50), fromEntityType: "candidate", fromEntityId: "cand-uday-sangle", toEntityType: "political_organization", toEntityId: "org-village-workers", relationship: "supportive", strength: 80, influenceWeight: 76, label: "Field reporting" }
];

export const recommendations: Recommendation[] = [
  { ...base("rec-form20", ["src-source-map"], 80), title: "Collect official ECI Form 20 before numerical targeting.", reason: "The project has conflicting 2024 vote totals.", expectedImpact: "Enables verified village and booth prioritization.", priority: "critical", actionLabel: "Create task", relatedEntityType: "research_task", relatedEntityId: "research-form20" },
  { ...base("rec-party-status", ["src-source-map"], 65), title: "Prepare a verified party-transition explanation line for Uday Sangle.", reason: "Opponents can use party movement as a trust attack.", expectedImpact: "Reduces narrative risk and gives workers a consistent response.", priority: "high", actionLabel: "Assign", relatedEntityType: "political_risk", relatedEntityId: "risk-party-transition" },
  { ...base("rec-youth-circuit", ["src-field-reports"], 58), title: "Launch a youth employment listening circuit in the MIDC belt.", reason: "Youth sentiment is improving and employment grievances are repeating.", expectedImpact: "Strengthens youth support and creates issue-resolution proof.", priority: "high", actionLabel: "Schedule", relatedEntityType: "political_opportunity", relatedEntityId: "opp-youth-employment" }
];

export const tasks: Task[] = [
  { ...base("task-form20", ["src-source-map"], 75), title: "Collect official Sinnar 2024 Form 20", description: "Obtain official booth-wise result document and attach as evidence.", type: "research", priority: "critical", owner: "Research Desk", dueDate: "2026-06-18", relatedEntityType: "research_task", relatedEntityId: "research-form20", status: "blocked", evidenceRequired: true, completionNotes: "" },
  { ...base("task-party-status", ["src-source-map"], 65), title: "Verify Uday Sangle current party status", description: "Collect primary party or candidate statement.", type: "verification", priority: "high", owner: "Candidate Office", dueDate: "2026-06-16", relatedEntityType: "political_risk", relatedEntityId: "risk-party-transition", status: "open", evidenceRequired: true, completionNotes: "" },
  { ...base("task-youth-listening", ["src-field-reports"], 58), title: "Schedule youth employment listening circle", description: "Plan MIDC belt listening session and capture named issue statements.", type: "field", priority: "high", owner: "Youth Outreach", dueDate: "2026-06-12", relatedEntityType: "political_opportunity", relatedEntityId: "opp-youth-employment", status: "assigned", evidenceRequired: true, completionNotes: "" },
  { ...base("task-visit-pangri-evidence", ["src-field-reports"], 52), title: "Attach Pangri irrigation visit evidence", description: "Upload field photos and validate the irrigation complaint cluster before candidate follow-up.", type: "field_verification", priority: "high", owner: "Farmer Cell", dueDate: "2026-06-13", relatedEntityType: "visit_record", relatedEntityId: "visit-pangri-irrigation", status: "assigned", evidenceRequired: true, completionNotes: "" },
  { ...base("task-visit-musalgaon-recovery", ["src-field-reports"], 46), title: "Recover overdue Musalgaon visit follow-up", description: "Close pending ownership follow-up and confirm next coordinator visit.", type: "follow_up", priority: "critical", owner: "Campaign Manager", dueDate: "2026-06-11", relatedEntityType: "visit_record", relatedEntityId: "visit-musalgaon-owner-recovery", status: "in_progress", evidenceRequired: true, completionNotes: "" }
];

export const intelligenceReports: IntelligenceReport[] = [
  {
    ...base("report-daily-2026-06-10", ["src-field-reports", "src-source-map"], 62),
    title: "Daily Intelligence Brief",
    reportType: "daily_brief",
    date: "2026-06-10",
    executiveSummary:
      "Verification discipline is the highest priority. Booth data and party-status proof are blocking confident targeting and narrative work.",
    sectionIds: ["risk-form20-missing", "risk-party-transition", "opp-youth-employment", "sig-coop-activity"],
    decisionLog: ["Hold opponent legal claims until verified.", "Prioritize Form 20 collection.", "Prepare youth listening circuit."]
  }
];

export const ownershipRecords: OwnershipRecord[] = [
  {
    ...base("own-v-musalgaon", ["src-field-reports"], 52),
    entityType: "village",
    entityId: "v-musalgaon",
    entityName: "Musalgaon",
    primaryOwnerId: "owner-musalgaon-coordinator",
    secondaryOwnerId: "owner-farmer-cell",
    coordinatorId: "owner-musalgaon-coordinator",
    volunteerTeamId: "team-musalgaon-field",
    reportingManagerId: "owner-zone-north",
    escalationOwnerId: "owner-campaign-manager",
    reviewCadence: "daily",
    lastReviewedDate: "2026-06-09",
    nextReviewDate: "2026-06-11",
    ownershipStatus: "escalated",
    approvalStatus: "changes_requested",
    priority: "critical",
    villageId: "v-musalgaon",
    boothId: "booth-musalgaon-001",
    coverageScore: 48
  },
  {
    ...base("own-booth-town-001", ["src-field-reports"], 58),
    entityType: "booth",
    entityId: "booth-town-001",
    entityName: "Town-001",
    primaryOwnerId: "owner-booth-town",
    secondaryOwnerId: "owner-youth-desk",
    coordinatorId: "owner-booth-town",
    volunteerTeamId: "team-sinnar-town-booth",
    reportingManagerId: "owner-war-room-lead",
    escalationOwnerId: "owner-campaign-manager",
    reviewCadence: "weekly",
    lastReviewedDate: "2026-06-10",
    nextReviewDate: "2026-06-17",
    ownershipStatus: "assigned",
    approvalStatus: "approved",
    priority: "high",
    villageId: "v-sinnar-town",
    boothId: "booth-town-001",
    coverageScore: 76
  },
  {
    ...base("own-comm-youth", ["src-campaign-brief"], 62),
    entityType: "community",
    entityId: "comm-youth",
    entityName: "Youth",
    primaryOwnerId: "owner-youth-desk",
    secondaryOwnerId: "owner-booth-town",
    coordinatorId: "owner-youth-desk",
    volunteerTeamId: "team-youth-outreach",
    reportingManagerId: "owner-war-room-lead",
    escalationOwnerId: "owner-campaign-manager",
    reviewCadence: "weekly",
    lastReviewedDate: "2026-06-10",
    nextReviewDate: "2026-06-17",
    ownershipStatus: "assigned",
    approvalStatus: "approved",
    priority: "high",
    villageId: "v-sinnar-town",
    boothId: "booth-midc-001",
    coverageScore: 82
  },
  {
    ...base("own-issue-irrigation", ["src-field-reports"], 55),
    entityType: "issue",
    entityId: "issue-irrigation-pangri",
    entityName: "Farmer irrigation complaints concentrated in Pangri belt",
    primaryOwnerId: "owner-farmer-cell",
    secondaryOwnerId: "owner-sector-pangri",
    coordinatorId: "owner-sector-pangri",
    volunteerTeamId: "team-farmer-cell",
    reportingManagerId: "owner-war-room-lead",
    escalationOwnerId: "owner-campaign-manager",
    reviewCadence: "weekly",
    lastReviewedDate: "2026-06-07",
    nextReviewDate: "2026-06-12",
    ownershipStatus: "overdue_review",
    approvalStatus: "pending_review",
    priority: "high",
    villageId: "v-pangri",
    boothId: "booth-pangri-001",
    coverageScore: 63
  },
  {
    ...base("own-risk-form20", ["src-source-map"], 80),
    entityType: "political_risk",
    entityId: "risk-form20-missing",
    entityName: "Official booth-wise result data missing",
    primaryOwnerId: "owner-war-room-lead",
    secondaryOwnerId: "owner-campaign-manager",
    coordinatorId: "owner-war-room-lead",
    volunteerTeamId: "team-war-room",
    reportingManagerId: "owner-campaign-manager",
    escalationOwnerId: "owner-campaign-manager",
    reviewCadence: "daily",
    lastReviewedDate: "2026-06-10",
    nextReviewDate: "2026-06-11",
    ownershipStatus: "assigned",
    approvalStatus: "approved",
    priority: "critical",
    villageId: "v-sinnar-town",
    boothId: "booth-town-001",
    coverageScore: 84
  },
  {
    ...base("own-opp-youth", ["src-field-reports"], 58),
    entityType: "political_opportunity",
    entityId: "opp-youth-employment",
    entityName: "Youth employment listening circuit",
    primaryOwnerId: "owner-youth-desk",
    secondaryOwnerId: "owner-war-room-lead",
    coordinatorId: "owner-youth-desk",
    volunteerTeamId: "team-youth-outreach",
    reportingManagerId: "owner-campaign-manager",
    escalationOwnerId: "owner-campaign-manager",
    reviewCadence: "weekly",
    lastReviewedDate: "2026-06-10",
    nextReviewDate: "2026-06-14",
    ownershipStatus: "assigned",
    approvalStatus: "approved",
    priority: "high",
    villageId: "v-sinnar-town",
    boothId: "booth-midc-001",
    coverageScore: 80
  },
  {
    ...base("own-household-gap", ["src-field-reports"], 35),
    entityType: "household",
    entityId: "household-high-influence-001",
    entityName: "High influence household cluster - Devpur",
    primaryOwnerId: "",
    secondaryOwnerId: "",
    coordinatorId: "",
    volunteerTeamId: "",
    reportingManagerId: "owner-war-room-lead",
    escalationOwnerId: "owner-campaign-manager",
    reviewCadence: "weekly",
    lastReviewedDate: "2026-06-01",
    nextReviewDate: "2026-06-08",
    ownershipStatus: "unassigned",
    approvalStatus: "draft",
    priority: "high",
    villageId: "v-devpur",
    boothId: "",
    coverageScore: 0
  },
  {
    ...base("own-task-youth-listening", ["src-field-reports"], 58),
    entityType: "task",
    entityId: "task-youth-listening",
    entityName: "Schedule youth employment listening circle",
    primaryOwnerId: "owner-youth-desk",
    secondaryOwnerId: "owner-booth-town",
    coordinatorId: "owner-youth-desk",
    volunteerTeamId: "team-youth-outreach",
    reportingManagerId: "owner-war-room-lead",
    escalationOwnerId: "owner-campaign-manager",
    reviewCadence: "daily",
    lastReviewedDate: "2026-06-10",
    nextReviewDate: "2026-06-11",
    ownershipStatus: "assigned",
    approvalStatus: "approved",
    priority: "high",
    villageId: "v-sinnar-town",
    boothId: "booth-midc-001",
    coverageScore: 78
  }
];

export const territoryAssignments: TerritoryAssignment[] = [
  { ...base("terr-sinnar-town", ["src-field-reports"], 58), zone: "Urban", sector: "Sinnar Town", villageId: "v-sinnar-town", boothId: "booth-town-001", assignedOwnerId: "owner-booth-town", coordinatorId: "owner-booth-town", volunteerTeamId: "team-sinnar-town-booth", coverage: 76, status: "assigned", heatX: 48, heatY: 30, approvalStatus: "approved" },
  { ...base("terr-midc", ["src-field-reports"], 58), zone: "Urban", sector: "MIDC belt", villageId: "v-sinnar-town", boothId: "booth-midc-001", assignedOwnerId: "owner-youth-desk", coordinatorId: "owner-youth-desk", volunteerTeamId: "team-youth-outreach", coverage: 82, status: "assigned", heatX: 60, heatY: 34, approvalStatus: "approved" },
  { ...base("terr-pangri", ["src-field-reports"], 55), zone: "Rural", sector: "Pangri belt", villageId: "v-pangri", boothId: "booth-pangri-001", assignedOwnerId: "owner-sector-pangri", coordinatorId: "owner-sector-pangri", volunteerTeamId: "team-rural-field", coverage: 66, status: "overdue_review", heatX: 67, heatY: 70, approvalStatus: "pending_review" },
  { ...base("terr-musalgaon", ["src-field-reports"], 52), zone: "Rural", sector: "Musalgaon", villageId: "v-musalgaon", boothId: "booth-musalgaon-001", assignedOwnerId: "owner-musalgaon-coordinator", coordinatorId: "owner-musalgaon-coordinator", volunteerTeamId: "team-musalgaon-field", coverage: 48, status: "escalated", heatX: 77, heatY: 52, approvalStatus: "changes_requested" },
  { ...base("terr-wavi", ["src-field-reports"], 50), zone: "North", sector: "Wavi", villageId: "v-wavi", boothId: "", assignedOwnerId: "owner-zone-north", coordinatorId: "owner-zone-north", volunteerTeamId: "team-north-zone", coverage: 72, status: "assigned", heatX: 34, heatY: 28, approvalStatus: "pending_review" },
  { ...base("terr-devpur", ["src-field-reports"], 34), zone: "South", sector: "Devpur", villageId: "v-devpur", boothId: "", assignedOwnerId: "", coordinatorId: "", volunteerTeamId: "", coverage: 0, status: "unassigned", heatX: 49, heatY: 83, approvalStatus: "draft" }
];

export const reportingLines: ReportingLine[] = [
  { ...base("line-cm-war", ["src-project-context"], 74), ownerId: "owner-war-room-lead", reportsToOwnerId: "owner-campaign-manager", level: "War Room", scope: "Daily intelligence and escalation", status: "active", approvalStatus: "approved" },
  { ...base("line-north-war", ["src-field-reports"], 58), ownerId: "owner-zone-north", reportsToOwnerId: "owner-war-room-lead", level: "Zone", scope: "North zone villages", status: "active", approvalStatus: "pending_review" },
  { ...base("line-pangri-war", ["src-field-reports"], 56), ownerId: "owner-sector-pangri", reportsToOwnerId: "owner-war-room-lead", level: "Sector", scope: "Pangri rural belt", status: "active", approvalStatus: "pending_review" },
  { ...base("line-musalgaon-north", ["src-field-reports"], 52), ownerId: "owner-musalgaon-coordinator", reportsToOwnerId: "owner-zone-north", level: "Village", scope: "Musalgaon", status: "pending_review", approvalStatus: "changes_requested" },
  { ...base("line-town-war", ["src-field-reports"], 58), ownerId: "owner-booth-town", reportsToOwnerId: "owner-war-room-lead", level: "Booth", scope: "Sinnar Town booths", status: "active", approvalStatus: "approved" },
  { ...base("line-youth-war", ["src-campaign-brief"], 62), ownerId: "owner-youth-desk", reportsToOwnerId: "owner-war-room-lead", level: "Community Desk", scope: "Youth outreach", status: "active", approvalStatus: "approved" },
  { ...base("line-farmer-war", ["src-field-reports"], 58), ownerId: "owner-farmer-cell", reportsToOwnerId: "owner-war-room-lead", level: "Community Desk", scope: "Farmer cell", status: "active", approvalStatus: "pending_review" }
];

export const escalationChains: EscalationChain[] = [
  { ...base("esc-own-musalgaon", ["src-field-reports"], 52), entityType: "village", entityId: "v-musalgaon", entityName: "Musalgaon", currentOwnerId: "owner-musalgaon-coordinator", escalationOwnerId: "owner-campaign-manager", daysOverdue: 4, severity: "critical", status: "escalated", nextAction: "Campaign manager to assign support owner for cooperative bridge.", approvalStatus: "pending_review" },
  { ...base("esc-household-devpur", ["src-field-reports"], 34), entityType: "household", entityId: "household-high-influence-001", entityName: "High influence household cluster - Devpur", currentOwnerId: "", escalationOwnerId: "owner-war-room-lead", daysOverdue: 3, severity: "high", status: "open", nextAction: "Assign booth or village owner before next review.", approvalStatus: "draft" },
  { ...base("esc-irrigation", ["src-field-reports"], 55), entityType: "issue", entityId: "issue-irrigation-pangri", entityName: "Pangri irrigation complaints", currentOwnerId: "owner-farmer-cell", escalationOwnerId: "owner-campaign-manager", daysOverdue: 2, severity: "high", status: "in_review", nextAction: "Collect evidence packet and set candidate visit owner.", approvalStatus: "pending_review" },
  { ...base("esc-form20", ["src-source-map"], 80), entityType: "political_risk", entityId: "risk-form20-missing", entityName: "Official booth-wise result data missing", currentOwnerId: "owner-war-room-lead", escalationOwnerId: "owner-campaign-manager", daysOverdue: 0, severity: "critical", status: "in_review", nextAction: "Research desk to provide Form 20 acquisition status.", approvalStatus: "approved" }
];

export const ownershipHistory: OwnershipHistory[] = [
  { ...base("own-hist-001", ["src-field-reports"], 60), ownershipRecordId: "own-v-musalgaon", previousOwnerId: "owner-farmer-cell", newOwnerId: "owner-musalgaon-coordinator", changedDate: "2026-06-06", reason: "Village risk required local coordinator ownership.", approvedBy: "owner-campaign-manager", approvalStatus: "approved" },
  { ...base("own-hist-002", ["src-field-reports"], 58), ownershipRecordId: "own-comm-youth", previousOwnerId: "owner-war-room-lead", newOwnerId: "owner-youth-desk", changedDate: "2026-06-07", reason: "Youth desk created for employment and sports outreach.", approvedBy: "owner-campaign-manager", approvalStatus: "approved" },
  { ...base("own-hist-003", ["src-field-reports"], 54), ownershipRecordId: "own-issue-irrigation", previousOwnerId: "owner-sector-pangri", newOwnerId: "owner-farmer-cell", changedDate: "2026-06-08", reason: "Issue required farmer cell evidence collection.", approvedBy: "owner-war-room-lead", approvalStatus: "pending_review" },
  { ...base("own-hist-004", ["src-source-map"], 76), ownershipRecordId: "own-risk-form20", previousOwnerId: "owner-campaign-manager", newOwnerId: "owner-war-room-lead", changedDate: "2026-06-09", reason: "War room to own daily research follow-up.", approvedBy: "owner-campaign-manager", approvalStatus: "approved" }
];

export const reviewSchedules: ReviewSchedule[] = [
  { ...base("review-daily-critical", ["src-project-context"], 70), name: "Daily Critical Ownership Review", cadence: "daily", entityType: "all", ownerId: "owner-war-room-lead", nextRun: "2026-06-11T09:00:00+05:30", status: "active", approvalStatus: "approved" },
  { ...base("review-weekly-villages", ["src-field-reports"], 60), name: "Weekly Village Ownership Review", cadence: "weekly", entityType: "village", ownerId: "owner-zone-north", nextRun: "2026-06-17T18:00:00+05:30", status: "active", approvalStatus: "pending_review" },
  { ...base("review-election-booths", ["src-source-map"], 55), name: "Election Mode Booth Review", cadence: "election_mode", entityType: "booth", ownerId: "owner-campaign-manager", nextRun: "Election mode trigger", status: "needs_review", approvalStatus: "pending_review" },
  { ...base("review-monthly-teams", ["src-project-context"], 66), name: "Monthly Owner Performance Review", cadence: "monthly", entityType: "all", ownerId: "owner-campaign-manager", nextRun: "2026-06-30T20:00:00+05:30", status: "active", approvalStatus: "approved" }
];

export const visitRecords: VisitRecord[] = [
  {
    ...base("visit-pangri-irrigation", ["src-field-reports"], 58),
    visitTitle: "Pangri irrigation verification visit",
    visitType: "issue_verification",
    status: "follow_up_required",
    priority: "high",
    relatedEntityType: "issue",
    relatedEntityId: "issue-irrigation-pangri",
    villageId: "v-pangri",
    boothId: "booth-pangri-001",
    communityId: "comm-farmers",
    householdId: "",
    influencerId: "",
    issueId: "issue-irrigation-pangri",
    riskId: "",
    opportunityId: "",
    primaryOwnerId: "owner-farmer-cell",
    secondaryOwnerId: "owner-sector-pangri",
    coordinatorId: "owner-sector-pangri",
    volunteerTeamId: "team-farmer-cell",
    escalationOwnerId: "owner-campaign-manager",
    scheduledDate: "2026-06-09",
    actualDate: "2026-06-09",
    startTime: "09:30",
    endTime: "11:05",
    reviewDate: "2026-06-12",
    nextActionDueDate: "2026-06-13",
    addressOrLocality: "Pangri irrigation belt",
    gpsLocation: "GPS pending",
    visitors: ["Farmer Cell Lead", "Pangri Sector Coordinator"],
    peopleMet: ["Farmer group cluster", "Local water users"],
    communityLeadersMet: ["Farmer representative cluster"],
    influencersMet: [],
    volunteersPresent: ["Pangri rural field volunteer team"],
    purpose: "Verify repeated irrigation complaints and assess whether a candidate follow-up visit is justified.",
    conversationSummary: "Farmers repeated crop-loss concerns and asked for visible follow-up from Uday Sangle's team before the next village meeting.",
    keyObservations: "Issue is emotionally salient and can create trust if documented and followed up quickly.",
    issuesRaised: "Canal rotation, water release timing, crop-loss support, lack of visible local accountability.",
    objectionsRaised: "Skepticism that campaign visits lead to actual action.",
    publicMood: "Frustrated but open to structured follow-up.",
    localPoliticalMovement: "Opponent-aligned cooperative network is being discussed as an influence channel.",
    opponentActivityObserved: "Field notes mention cooperative-network outreach; requires independent confirmation.",
    promisesMade: "Prepare an evidence packet and schedule a candidate-side review before the next farmer meeting.",
    followUpsRequired: "Upload field photos, collect two independent confirmations, and assign candidate follow-up owner.",
    sentimentBefore: 52,
    sentimentAfter: 59,
    supportBefore: 51,
    supportAfter: 58,
    riskBefore: 65,
    riskAfter: 57,
    opportunityBefore: 64,
    opportunityAfter: 72,
    turnoutBefore: 50,
    turnoutAfter: 53,
    expectedVoteImpact: 420,
    approvalStatus: "pending_review",
    evidenceIds: ["ev-visit-pangri-photos"],
    taskIds: ["task-visit-pangri-evidence"],
    nextAction: "Complete evidence packet and schedule farmer follow-up commitment review.",
    nextActionOwnerId: "owner-farmer-cell",
    reviewerId: "owner-war-room-lead",
    reviewNotes: "Do not use externally until issue evidence is attached.",
    auditTrail: ["Created from field report intake.", "Linked to irrigation issue and farmer cell owner."]
  },
  {
    ...base("visit-midc-youth-listening", ["src-field-reports"], 60),
    visitTitle: "MIDC youth employment listening circle",
    visitType: "community_meeting",
    status: "completed",
    priority: "high",
    relatedEntityType: "political_opportunity",
    relatedEntityId: "opp-youth-employment",
    villageId: "v-sinnar-town",
    boothId: "booth-midc-001",
    communityId: "comm-youth",
    householdId: "",
    influencerId: "inf-youth-organizer",
    issueId: "",
    riskId: "",
    opportunityId: "opp-youth-employment",
    primaryOwnerId: "owner-youth-desk",
    secondaryOwnerId: "owner-booth-town",
    coordinatorId: "owner-youth-desk",
    volunteerTeamId: "team-youth-outreach",
    escalationOwnerId: "owner-campaign-manager",
    scheduledDate: "2026-06-10",
    actualDate: "2026-06-10",
    startTime: "18:30",
    endTime: "20:00",
    reviewDate: "2026-06-12",
    nextActionDueDate: "2026-06-14",
    addressOrLocality: "MIDC belt, Sinnar Town",
    gpsLocation: "GPS pending",
    visitors: ["Youth Desk Lead", "Sinnar Town Booth Coordinator"],
    peopleMet: ["Youth organizer cluster", "First-time voter group"],
    communityLeadersMet: [],
    influencersMet: ["Youth organizer cluster"],
    volunteersPresent: ["Youth outreach volunteer team"],
    purpose: "Collect named employment concerns and convert youth sentiment into measurable campaign action.",
    conversationSummary: "Youth participants asked for training, job access, sports infrastructure, and a visible response plan from Uday Sangle's team.",
    keyObservations: "High trust upside if listening circle converts into a documented action calendar.",
    issuesRaised: "Employment access, skills training, sports ground maintenance, transport timings.",
    objectionsRaised: "Doubt that local leaders keep youth promises after elections.",
    publicMood: "Energetic and cautiously positive.",
    localPoliticalMovement: "Youth networks are open to an issue-first relationship if follow-up is fast.",
    opponentActivityObserved: "No direct opponent event observed during visit.",
    promisesMade: "Prepare youth issue sheet and schedule a second circle with training partners.",
    followUpsRequired: "Collect participant list, attach field notes, and create youth issue report.",
    sentimentBefore: 61,
    sentimentAfter: 68,
    supportBefore: 63,
    supportAfter: 70,
    riskBefore: 42,
    riskAfter: 37,
    opportunityBefore: 72,
    opportunityAfter: 84,
    turnoutBefore: 56,
    turnoutAfter: 62,
    expectedVoteImpact: 560,
    approvalStatus: "pending_review",
    evidenceIds: ["ev-visit-youth-notes"],
    taskIds: ["task-youth-listening"],
    nextAction: "Turn participant concerns into a youth employment action brief.",
    nextActionOwnerId: "owner-youth-desk",
    reviewerId: "owner-war-room-lead",
    reviewNotes: "Participant data must stay internal and campaign-approved.",
    auditTrail: ["Created from youth listening event.", "Linked to youth opportunity and source record."]
  },
  {
    ...base("visit-musalgaon-owner-recovery", ["src-field-reports"], 46),
    visitTitle: "Musalgaon ownership recovery visit",
    visitType: "village_visit",
    status: "escalated",
    priority: "critical",
    relatedEntityType: "ownership_record",
    relatedEntityId: "own-v-musalgaon",
    villageId: "v-musalgaon",
    boothId: "booth-musalgaon-001",
    communityId: "comm-farmers",
    householdId: "",
    influencerId: "",
    issueId: "",
    riskId: "",
    opportunityId: "",
    primaryOwnerId: "owner-musalgaon-coordinator",
    secondaryOwnerId: "owner-farmer-cell",
    coordinatorId: "owner-musalgaon-coordinator",
    volunteerTeamId: "team-musalgaon-field",
    escalationOwnerId: "owner-campaign-manager",
    scheduledDate: "2026-06-08",
    actualDate: "2026-06-08",
    startTime: "16:00",
    endTime: "17:20",
    reviewDate: "2026-06-11",
    nextActionDueDate: "2026-06-11",
    addressOrLocality: "Musalgaon village core",
    gpsLocation: "GPS pending",
    visitors: ["Musalgaon Village Coordinator"],
    peopleMet: ["Village worker cluster"],
    communityLeadersMet: ["Farmer representative cluster"],
    influencersMet: [],
    volunteersPresent: ["Musalgaon field team"],
    purpose: "Recover ownership coverage after repeated overdue actions and confirm next operating owner.",
    conversationSummary: "Workers reported overload and requested direct campaign manager support for follow-up commitments.",
    keyObservations: "Village ownership is the bottleneck; without owner relief, field intelligence will stay stale.",
    issuesRaised: "Coordinator overload, pending farmer issue notes, incomplete booth worker map.",
    objectionsRaised: "Volunteers want clearer escalation and faster feedback from war room.",
    publicMood: "Operationally strained.",
    localPoliticalMovement: "Opponent network may exploit delayed follow-up if not corrected.",
    opponentActivityObserved: "Unverified reports of cooperative-network calls to local workers.",
    promisesMade: "Assign support owner and close overdue visit evidence packet.",
    followUpsRequired: "Campaign manager must appoint backup owner and review escalation within 24 hours.",
    sentimentBefore: 48,
    sentimentAfter: 47,
    supportBefore: 49,
    supportAfter: 48,
    riskBefore: 72,
    riskAfter: 75,
    opportunityBefore: 52,
    opportunityAfter: 50,
    turnoutBefore: 46,
    turnoutAfter: 45,
    expectedVoteImpact: -180,
    approvalStatus: "changes_requested",
    evidenceIds: ["ev-visit-musalgaon-followup"],
    taskIds: ["task-visit-musalgaon-recovery"],
    nextAction: "Assign backup village owner and close overdue evidence packet.",
    nextActionOwnerId: "owner-campaign-manager",
    reviewerId: "owner-campaign-manager",
    reviewNotes: "Escalated because support, sentiment, and risk moved in the wrong direction.",
    auditTrail: ["Created from Ownership Registry escalation.", "Escalated to campaign manager."]
  },
  {
    ...base("visit-town-booth-readiness", ["src-field-reports"], 54),
    visitTitle: "Sinnar Town booth readiness visit",
    visitType: "booth_visit",
    status: "scheduled",
    priority: "high",
    relatedEntityType: "booth",
    relatedEntityId: "booth-town-001",
    villageId: "v-sinnar-town",
    boothId: "booth-town-001",
    communityId: "comm-women",
    householdId: "",
    influencerId: "",
    issueId: "",
    riskId: "",
    opportunityId: "",
    primaryOwnerId: "owner-booth-town",
    secondaryOwnerId: "owner-youth-desk",
    coordinatorId: "owner-booth-town",
    volunteerTeamId: "team-sinnar-town-booth",
    escalationOwnerId: "owner-war-room-lead",
    scheduledDate: "2026-06-13",
    actualDate: "",
    startTime: "10:00",
    endTime: "12:00",
    reviewDate: "2026-06-14",
    nextActionDueDate: "2026-06-14",
    addressOrLocality: "Town booth cluster",
    gpsLocation: "GPS pending",
    visitors: ["Sinnar Town Booth Coordinator", "Youth Desk Lead"],
    peopleMet: [],
    communityLeadersMet: [],
    influencersMet: [],
    volunteersPresent: ["Sinnar Town Booth Team"],
    purpose: "Review booth readiness, volunteer coverage, and women/youth issue signals.",
    conversationSummary: "Scheduled visit. Notes will be captured after field team returns.",
    keyObservations: "Pre-visit hypothesis: booth volunteer coverage can improve persuasion and turnout readiness.",
    issuesRaised: "",
    objectionsRaised: "",
    publicMood: "Pending visit",
    localPoliticalMovement: "Pending visit",
    opponentActivityObserved: "Pending visit",
    promisesMade: "",
    followUpsRequired: "Prepare booth checklist and evidence capture plan.",
    sentimentBefore: 58,
    sentimentAfter: 58,
    supportBefore: 57,
    supportAfter: 57,
    riskBefore: 50,
    riskAfter: 50,
    opportunityBefore: 64,
    opportunityAfter: 64,
    turnoutBefore: 58,
    turnoutAfter: 58,
    expectedVoteImpact: 260,
    approvalStatus: "draft",
    evidenceIds: [],
    taskIds: [],
    nextAction: "Complete booth readiness checklist during visit.",
    nextActionOwnerId: "owner-booth-town",
    reviewerId: "owner-war-room-lead",
    reviewNotes: "Scheduled visit record.",
    auditTrail: ["Created from booth readiness plan."]
  },
  {
    ...base("visit-wavi-influencer-bridge", ["src-field-reports"], 50),
    visitTitle: "Wavi influencer bridge meeting",
    visitType: "influencer_meeting",
    status: "planned",
    priority: "medium",
    relatedEntityType: "influencer",
    relatedEntityId: "inf-youth-organizer",
    villageId: "v-wavi",
    boothId: "",
    communityId: "comm-youth",
    householdId: "",
    influencerId: "inf-youth-organizer",
    issueId: "",
    riskId: "",
    opportunityId: "opp-youth-employment",
    primaryOwnerId: "owner-zone-north",
    secondaryOwnerId: "owner-youth-desk",
    coordinatorId: "owner-zone-north",
    volunteerTeamId: "team-north-zone",
    escalationOwnerId: "owner-war-room-lead",
    scheduledDate: "2026-06-15",
    actualDate: "",
    startTime: "17:00",
    endTime: "18:00",
    reviewDate: "2026-06-16",
    nextActionDueDate: "2026-06-16",
    addressOrLocality: "Wavi local meeting point",
    gpsLocation: "GPS pending",
    visitors: ["North Zone Lead", "Youth Desk Lead"],
    peopleMet: [],
    communityLeadersMet: [],
    influencersMet: ["Youth organizer cluster"],
    volunteersPresent: ["North Zone Field Team"],
    purpose: "Assess whether youth influencer bridge can expand support without creating factional backlash.",
    conversationSummary: "Planned visit. Capture alignment, influence, and commitment level.",
    keyObservations: "Influencer alignment may unlock youth persuasion in the North zone.",
    issuesRaised: "",
    objectionsRaised: "",
    publicMood: "Pending visit",
    localPoliticalMovement: "Pending visit",
    opponentActivityObserved: "Pending visit",
    promisesMade: "",
    followUpsRequired: "Confirm meeting attendance and attach meeting notes.",
    sentimentBefore: 55,
    sentimentAfter: 55,
    supportBefore: 54,
    supportAfter: 54,
    riskBefore: 45,
    riskAfter: 45,
    opportunityBefore: 63,
    opportunityAfter: 63,
    turnoutBefore: 52,
    turnoutAfter: 52,
    expectedVoteImpact: 190,
    approvalStatus: "draft",
    evidenceIds: [],
    taskIds: [],
    nextAction: "Confirm influencer meeting and capture alignment score.",
    nextActionOwnerId: "owner-zone-north",
    reviewerId: "owner-war-room-lead",
    reviewNotes: "Pre-visit planning record.",
    auditTrail: ["Created from North zone outreach plan."]
  },
  {
    ...base("visit-candidate-farmer-review", ["src-field-reports"], 57),
    visitTitle: "Candidate farmer concern review",
    visitType: "candidate_visit",
    status: "scheduled",
    priority: "critical",
    relatedEntityType: "candidate",
    relatedEntityId: "cand-uday-sangle",
    villageId: "v-pangri",
    boothId: "booth-pangri-001",
    communityId: "comm-farmers",
    householdId: "",
    influencerId: "",
    issueId: "issue-irrigation-pangri",
    riskId: "",
    opportunityId: "",
    primaryOwnerId: "owner-campaign-manager",
    secondaryOwnerId: "owner-farmer-cell",
    coordinatorId: "owner-sector-pangri",
    volunteerTeamId: "team-farmer-cell",
    escalationOwnerId: "owner-campaign-manager",
    scheduledDate: "2026-06-16",
    actualDate: "",
    startTime: "08:30",
    endTime: "10:30",
    reviewDate: "2026-06-17",
    nextActionDueDate: "2026-06-17",
    addressOrLocality: "Pangri farmer meeting location",
    gpsLocation: "GPS pending",
    visitors: ["Campaign Manager", "Farmer Cell Lead"],
    peopleMet: [],
    communityLeadersMet: ["Farmer representative cluster"],
    influencersMet: [],
    volunteersPresent: ["Farmer Cell"],
    purpose: "Use candidate presence to close trust gap created by verified irrigation complaints.",
    conversationSummary: "Scheduled candidate visit pending evidence packet completion.",
    keyObservations: "High upside but evidence must be ready before public commitment.",
    issuesRaised: "Pending visit",
    objectionsRaised: "Pending visit",
    publicMood: "Pending visit",
    localPoliticalMovement: "Pending visit",
    opponentActivityObserved: "Pending visit",
    promisesMade: "",
    followUpsRequired: "Brief Uday Sangle with verified issue evidence and safe commitment options.",
    sentimentBefore: 59,
    sentimentAfter: 59,
    supportBefore: 58,
    supportAfter: 58,
    riskBefore: 57,
    riskAfter: 57,
    opportunityBefore: 72,
    opportunityAfter: 72,
    turnoutBefore: 53,
    turnoutAfter: 53,
    expectedVoteImpact: 740,
    approvalStatus: "pending_review",
    evidenceIds: ["ev-visit-pangri-photos"],
    taskIds: ["task-visit-pangri-evidence"],
    nextAction: "Prepare candidate briefing note and promise guardrails.",
    nextActionOwnerId: "owner-campaign-manager",
    reviewerId: "owner-campaign-manager",
    reviewNotes: "Candidate commitment must be evidence-backed and reputation-safe.",
    auditTrail: ["Created from Pangri issue verification visit.", "Requires campaign manager approval."]
  },
  {
    ...base("visit-devpur-household-cluster", ["src-field-reports"], 42),
    visitTitle: "Devpur household cluster verification",
    visitType: "household_visit",
    status: "planned",
    priority: "high",
    relatedEntityType: "household",
    relatedEntityId: "household-high-influence-001",
    villageId: "v-devpur",
    boothId: "",
    communityId: "comm-women",
    householdId: "household-high-influence-001",
    influencerId: "",
    issueId: "",
    riskId: "",
    opportunityId: "",
    primaryOwnerId: "",
    secondaryOwnerId: "",
    coordinatorId: "",
    volunteerTeamId: "",
    escalationOwnerId: "owner-war-room-lead",
    scheduledDate: "2026-06-14",
    actualDate: "",
    startTime: "15:00",
    endTime: "16:30",
    reviewDate: "2026-06-15",
    nextActionDueDate: "2026-06-15",
    addressOrLocality: "Devpur high influence household cluster",
    gpsLocation: "GPS pending",
    visitors: ["War Room Lead"],
    peopleMet: [],
    communityLeadersMet: [],
    influencersMet: [],
    volunteersPresent: [],
    purpose: "Verify an unassigned high-influence household cluster and assign a responsible field owner.",
    conversationSummary: "Planned household visit. Capture household concerns, relationship context, and safe follow-up path.",
    keyObservations: "Ownership is missing, so this visit must first establish accountability before persuasion work.",
    issuesRaised: "",
    objectionsRaised: "",
    publicMood: "Pending visit",
    localPoliticalMovement: "Pending visit",
    opponentActivityObserved: "Pending visit",
    promisesMade: "",
    followUpsRequired: "Assign household owner after visit and attach field note.",
    sentimentBefore: 50,
    sentimentAfter: 50,
    supportBefore: 50,
    supportAfter: 50,
    riskBefore: 60,
    riskAfter: 60,
    opportunityBefore: 58,
    opportunityAfter: 58,
    turnoutBefore: 48,
    turnoutAfter: 48,
    expectedVoteImpact: 120,
    approvalStatus: "draft",
    evidenceIds: [],
    taskIds: [],
    nextAction: "Assign household owner and capture visit evidence.",
    nextActionOwnerId: "owner-war-room-lead",
    reviewerId: "owner-war-room-lead",
    reviewNotes: "Household-level details must remain internal and evidence-controlled.",
    auditTrail: ["Created from unassigned household ownership gap."]
  }
];

export const visitOutcomes: VisitOutcome[] = [
  { ...base("visit-outcome-pangri-support", ["src-field-reports"], 58), visitRecordId: "visit-pangri-irrigation", outcomeType: "support", beforeScore: 51, afterScore: 58, delta: 7, expectedVoteImpact: 420, summary: "Support improved after field team acknowledged irrigation complaints and assigned follow-up." },
  { ...base("visit-outcome-youth-opportunity", ["src-field-reports"], 60), visitRecordId: "visit-midc-youth-listening", outcomeType: "opportunity", beforeScore: 72, afterScore: 84, delta: 12, expectedVoteImpact: 560, summary: "Youth employment opportunity strengthened after listening circle." },
  { ...base("visit-outcome-musalgaon-risk", ["src-field-reports"], 46), visitRecordId: "visit-musalgaon-owner-recovery", outcomeType: "risk", beforeScore: 72, afterScore: 75, delta: 3, expectedVoteImpact: -180, summary: "Risk increased because ownership overload was not resolved during the visit." }
];

export const visitParticipants: VisitParticipant[] = [
  { ...base("visit-participant-pangri-001", ["src-field-reports"], 52), visitRecordId: "visit-pangri-irrigation", personName: "Farmer Cell Lead", participantType: "visitor", roleOrAffiliation: "Campaign farmer cell", contactStatus: "Known owner" },
  { ...base("visit-participant-pangri-002", ["src-field-reports"], 46), visitRecordId: "visit-pangri-irrigation", personName: "Farmer group cluster", participantType: "person_met", roleOrAffiliation: "Local farmers", contactStatus: "Names pending evidence-safe capture" },
  { ...base("visit-participant-youth-001", ["src-field-reports"], 54), visitRecordId: "visit-midc-youth-listening", personName: "Youth Desk Lead", participantType: "visitor", roleOrAffiliation: "Campaign youth desk", contactStatus: "Known owner" },
  { ...base("visit-participant-youth-002", ["src-field-reports"], 48), visitRecordId: "visit-midc-youth-listening", personName: "Youth organizer cluster", participantType: "influencer", roleOrAffiliation: "Sahyadri-linked youth network", contactStatus: "Needs relationship verification" },
  { ...base("visit-participant-musalgaon-001", ["src-field-reports"], 42), visitRecordId: "visit-musalgaon-owner-recovery", personName: "Musalgaon Village Coordinator", participantType: "visitor", roleOrAffiliation: "Village coordinator", contactStatus: "Known owner" }
];

export const visitFollowUps: VisitFollowUp[] = [
  { ...base("visit-followup-pangri-evidence", ["src-field-reports"], 52), visitRecordId: "visit-pangri-irrigation", title: "Complete Pangri evidence packet", actionRequired: "Upload field photos, capture two independent confirmations, and tag the issue record.", ownerId: "owner-farmer-cell", dueDate: "2026-06-13", status: "assigned", priority: "high", relatedEntityType: "issue", relatedEntityId: "issue-irrigation-pangri", evidenceRequired: true },
  { ...base("visit-followup-youth-brief", ["src-field-reports"], 56), visitRecordId: "visit-midc-youth-listening", title: "Create youth action brief", actionRequired: "Convert listening notes into a campaign-safe action brief and task list.", ownerId: "owner-youth-desk", dueDate: "2026-06-14", status: "open", priority: "high", relatedEntityType: "political_opportunity", relatedEntityId: "opp-youth-employment", evidenceRequired: true },
  { ...base("visit-followup-musalgaon-owner", ["src-field-reports"], 44), visitRecordId: "visit-musalgaon-owner-recovery", title: "Assign Musalgaon backup owner", actionRequired: "Campaign manager must assign backup owner and confirm escalation closure.", ownerId: "owner-campaign-manager", dueDate: "2026-06-11", status: "escalated", priority: "critical", relatedEntityType: "ownership_record", relatedEntityId: "own-v-musalgaon", evidenceRequired: true },
  { ...base("visit-followup-booth-checklist", ["src-field-reports"], 50), visitRecordId: "visit-town-booth-readiness", title: "Prepare town booth visit checklist", actionRequired: "Carry booth readiness checklist, volunteer attendance sheet, and evidence capture template.", ownerId: "owner-booth-town", dueDate: "2026-06-13", status: "open", priority: "high", relatedEntityType: "booth", relatedEntityId: "booth-town-001", evidenceRequired: false }
];

export const visitReports: VisitReport[] = [
  { ...base("visit-report-daily-2026-06-10", ["src-field-reports"], 58), title: "Daily Visit Report - 2026-06-10", reportType: "daily_visit_report", period: "2026-06-10", visitIds: ["visit-pangri-irrigation", "visit-midc-youth-listening"], executiveSummary: "Field visits improved youth and farmer opportunity signals, but Musalgaon ownership remains escalated.", generatedBy: "War Room Lead", status: "draft" },
  { ...base("visit-report-impact-june", ["src-field-reports"], 55), title: "Visit Impact Report - June Field Layer", reportType: "visit_impact_report", period: "2026-06", visitIds: ["visit-pangri-irrigation", "visit-midc-youth-listening", "visit-musalgaon-owner-recovery"], executiveSummary: "Highest upside comes from evidence-backed farmer follow-up and youth employment listening circuits.", generatedBy: "Intelligence Lead", status: "generated" }
];

export const visitChecklists: VisitChecklist[] = [
  { ...base("visit-checklist-evidence", ["src-project-context"], 70), visitType: "issue_verification", item: "Capture field photo, source note, date checked, and next verification step.", required: true, ownerId: "owner-war-room-lead", status: "active" },
  { ...base("visit-checklist-promise", ["src-project-context"], 68), visitType: "candidate_visit", item: "Record every promise with owner, due date, source, and approval status.", required: true, ownerId: "owner-campaign-manager", status: "active" },
  { ...base("visit-checklist-booth", ["src-project-context"], 64), visitType: "booth_visit", item: "Validate booth coordinator, volunteer attendance, weak areas, and turnout blockers.", required: true, ownerId: "owner-booth-town", status: "active" },
  { ...base("visit-checklist-influencer", ["src-project-context"], 62), visitType: "influencer_meeting", item: "Capture alignment, reach, risk of backlash, and next relationship step.", required: true, ownerId: "owner-zone-north", status: "active" }
];

export const auditLogs: AuditLog[] = [
  {
    ...base("audit-001", ["src-project-context"], 70),
    actorId: "user-intel-lead",
    action: "created_domain_mock_data",
    entityType: "intelligence_report",
    entityId: "report-daily-2026-06-10",
    beforeSummary: "Static feature-level UI data",
    afterSummary: "Centralized domain mock data with verification metadata",
    verificationStatus: "verified"
  }
];
