import type {
  BoothCluster,
  CampaignHierarchy,
  CampaignOrganization,
  CampaignRole,
  CommunityDesk,
  CoverageGap,
  CoverageRecord,
  OrganizationUnit,
  RoleResponsibility,
  Roster,
  Sector,
  ShiftAssignment,
  TeamMember,
  TeamMemberAssignment,
  VillageCluster,
  VolunteerTeam,
  VolunteerTeamMember,
  WorkloadMetric,
  Zone
} from "./types";

const now = "2026-06-12T11:00:00+05:30";

function base(id: string, sourceIds: string[], confidenceScore = 55) {
  return {
    id,
    createdAt: "2026-06-12T10:00:00+05:30",
    updatedAt: now,
    createdBy: "user-intel-lead",
    updatedBy: "user-intel-lead",
    verificationStatus: "needs_verification" as const,
    confidenceScore,
    sourceIds,
    notes: "Campaign Structure Layer mock record for PICOS command and control. Verify owners, reporting lines, and coverage before operational use."
  };
}

export const campaignOrganizations: CampaignOrganization[] = [
  {
    ...base("campaign-org-sinnar-2026", ["src-project-context"], 70),
    organizationName: "Uday Sangle Sinnar Campaign Command",
    candidateId: "cand-uday-sangle",
    campaignManagerOwnerId: "owner-campaign-manager",
    warRoomLeadOwnerId: "owner-war-room-lead",
    activeFrom: "2026-06-12",
    electionCycle: "Sinnar Assembly Readiness 2026",
    structureReadinessScore: 68,
    approvalStatus: "pending_review"
  }
];

export const campaignRoles: CampaignRole[] = [
  {
    ...base("camp-role-candidate", ["src-project-context"], 72),
    roleName: "Candidate",
    description: "Strategic principal for trust-building, public commitments, and final escalation decisions.",
    reportingManagerId: "",
    escalationManagerId: "owner-campaign-manager",
    territoryScope: "All Sinnar",
    teamScope: "Campaign-wide",
    permissionScope: ["approve_strategy", "view_all_intelligence", "close_major_escalations"],
    reviewCadence: "weekly",
    status: "active",
    approvalStatus: "approved"
  },
  {
    ...base("camp-role-campaign-manager", ["src-project-context"], 72),
    roleName: "Campaign Manager",
    description: "Owns execution rhythm, accountability, escalations, and cross-team prioritization.",
    reportingManagerId: "",
    escalationManagerId: "owner-campaign-manager",
    territoryScope: "All Sinnar",
    teamScope: "War room, field operations, community desks",
    permissionScope: ["assign_owners", "approve_reporting_lines", "rebalance_workload"],
    reviewCadence: "daily",
    status: "active",
    approvalStatus: "approved"
  },
  {
    ...base("camp-role-war-room-lead", ["src-project-context"], 68),
    roleName: "War Room Lead",
    description: "Runs daily intelligence synthesis, task routing, and status review.",
    reportingManagerId: "owner-campaign-manager",
    escalationManagerId: "owner-campaign-manager",
    territoryScope: "All Sinnar",
    teamScope: "Intelligence, data, reporting, task desk",
    permissionScope: ["triage_intelligence", "open_escalations", "generate_briefs"],
    reviewCadence: "daily",
    status: "active",
    approvalStatus: "approved"
  },
  {
    ...base("camp-role-zone-lead", ["src-field-reports"], 58),
    roleName: "Zone Lead",
    description: "Owns zone-level coverage, coordinator performance, and issue escalation.",
    reportingManagerId: "owner-war-room-lead",
    escalationManagerId: "owner-campaign-manager",
    territoryScope: "Assigned zone",
    teamScope: "Sector leads, village coordinators, booth coordinators",
    permissionScope: ["assign_sector_work", "verify_territory_coverage", "escalate_gaps"],
    reviewCadence: "weekly",
    status: "active",
    approvalStatus: "pending_review"
  },
  {
    ...base("camp-role-sector-lead", ["src-field-reports"], 56),
    roleName: "Sector Lead",
    description: "Manages sector execution across villages, booths, visits, and follow-ups.",
    reportingManagerId: "owner-zone-north",
    escalationManagerId: "owner-war-room-lead",
    territoryScope: "Assigned sector",
    teamScope: "Village coordinators and volunteer teams",
    permissionScope: ["assign_villages", "route_visits", "verify_followups"],
    reviewCadence: "weekly",
    status: "active",
    approvalStatus: "pending_review"
  },
  {
    ...base("camp-role-community-lead", ["src-field-reports"], 58),
    roleName: "Community Desk Lead",
    description: "Owns community-specific sentiment, outreach, influencer engagement, and promise follow-through.",
    reportingManagerId: "owner-war-room-lead",
    escalationManagerId: "owner-campaign-manager",
    territoryScope: "Assigned community",
    teamScope: "Community desk volunteers",
    permissionScope: ["manage_community_desk", "link_influencers", "open_promises"],
    reviewCadence: "weekly",
    status: "active",
    approvalStatus: "pending_review"
  },
  {
    ...base("camp-role-volunteer", ["src-field-reports"], 52),
    roleName: "Volunteer",
    description: "Executes assigned field visits, conversations, evidence capture, and follow-ups.",
    reportingManagerId: "owner-booth-town",
    escalationManagerId: "owner-war-room-lead",
    territoryScope: "Assigned village, booth, community, or shift",
    teamScope: "Volunteer team",
    permissionScope: ["submit_field_notes", "attach_evidence", "update_assigned_tasks"],
    reviewCadence: "daily",
    status: "forming",
    approvalStatus: "pending_review"
  }
];

export const roleResponsibilities: RoleResponsibility[] = [
  {
    ...base("resp-cm-escalation", ["src-project-context"], 72),
    campaignRoleId: "camp-role-campaign-manager",
    responsibility: "Resolve critical execution escalations within 24 hours.",
    decisionRights: "Can reassign owners, rebalance teams, and approve reporting-line changes.",
    evidenceRequired: true,
    escalationTrigger: "Critical risk, missed review, missing owner, or overloaded coordinator.",
    approvalStatus: "approved"
  },
  {
    ...base("resp-war-room-brief", ["src-project-context"], 68),
    campaignRoleId: "camp-role-war-room-lead",
    responsibility: "Convert field input into daily action priorities for Sinnar.",
    decisionRights: "Can create tasks, request evidence, and raise verification items.",
    evidenceRequired: true,
    escalationTrigger: "Unverified claim entering public strategy or overdue critical task.",
    approvalStatus: "approved"
  },
  {
    ...base("resp-zone-coverage", ["src-field-reports"], 58),
    campaignRoleId: "camp-role-zone-lead",
    responsibility: "Maintain village and booth coverage inside assigned zone.",
    decisionRights: "Can recommend coordinators and flag coverage gaps.",
    evidenceRequired: false,
    escalationTrigger: "Coverage below 60% or booth without coordinator.",
    approvalStatus: "pending_review"
  },
  {
    ...base("resp-community-sentiment", ["src-field-reports"], 56),
    campaignRoleId: "camp-role-community-lead",
    responsibility: "Track community sentiment, influencers, promises, and issue follow-ups.",
    decisionRights: "Can request visits and create community tasks.",
    evidenceRequired: true,
    escalationTrigger: "Support shift, disputed claim, or missed promise.",
    approvalStatus: "pending_review"
  }
];

export const zones: Zone[] = [
  {
    ...base("zone-urban", ["src-field-reports"], 60),
    zoneName: "Urban Command Zone",
    zoneLeadOwnerId: "owner-booth-town",
    villageIds: ["v-sinnar-town"],
    boothIds: ["booth-town-001", "booth-midc-001"],
    teamIds: ["vol-team-town-booth", "vol-team-youth"],
    coverageScore: 79,
    performanceScore: 72,
    status: "active",
    approvalStatus: "approved"
  },
  {
    ...base("zone-north", ["src-field-reports"], 56),
    zoneName: "North Rural Zone",
    zoneLeadOwnerId: "owner-zone-north",
    villageIds: ["v-wavi", "v-nandur"],
    boothIds: [],
    teamIds: ["vol-team-north"],
    coverageScore: 64,
    performanceScore: 61,
    status: "needs_review",
    approvalStatus: "pending_review"
  },
  {
    ...base("zone-rural", ["src-field-reports"], 55),
    zoneName: "Pangri-Musalgaon Rural Zone",
    zoneLeadOwnerId: "owner-sector-pangri",
    villageIds: ["v-pangri", "v-musalgaon"],
    boothIds: ["booth-pangri-001", "booth-musalgaon-001"],
    teamIds: ["vol-team-farmer", "vol-team-musalgaon"],
    coverageScore: 57,
    performanceScore: 58,
    status: "overloaded",
    approvalStatus: "pending_review"
  },
  {
    ...base("zone-south", ["src-field-reports"], 36),
    zoneName: "South Gap Zone",
    zoneLeadOwnerId: "",
    villageIds: ["v-devpur"],
    boothIds: [],
    teamIds: [],
    coverageScore: 0,
    performanceScore: 0,
    status: "unassigned",
    approvalStatus: "draft"
  }
];

export const sectors: Sector[] = [
  {
    ...base("sector-sinnar-town", ["src-field-reports"], 60),
    sectorName: "Sinnar Town Sector",
    zoneId: "zone-urban",
    sectorLeadOwnerId: "owner-booth-town",
    villageIds: ["v-sinnar-town"],
    boothIds: ["booth-town-001"],
    teamIds: ["vol-team-town-booth"],
    coverageScore: 76,
    performanceScore: 72,
    status: "active",
    approvalStatus: "approved"
  },
  {
    ...base("sector-midc-youth", ["src-field-reports"], 58),
    sectorName: "MIDC Youth Sector",
    zoneId: "zone-urban",
    sectorLeadOwnerId: "owner-youth-desk",
    villageIds: ["v-sinnar-town"],
    boothIds: ["booth-midc-001"],
    teamIds: ["vol-team-youth"],
    coverageScore: 82,
    performanceScore: 76,
    status: "active",
    approvalStatus: "approved"
  },
  {
    ...base("sector-wavi-nandur", ["src-field-reports"], 52),
    sectorName: "Wavi-Nandur Sector",
    zoneId: "zone-north",
    sectorLeadOwnerId: "owner-zone-north",
    villageIds: ["v-wavi", "v-nandur"],
    boothIds: [],
    teamIds: ["vol-team-north"],
    coverageScore: 64,
    performanceScore: 61,
    status: "needs_review",
    approvalStatus: "pending_review"
  },
  {
    ...base("sector-pangri", ["src-field-reports"], 55),
    sectorName: "Pangri Farmer Sector",
    zoneId: "zone-rural",
    sectorLeadOwnerId: "owner-sector-pangri",
    villageIds: ["v-pangri"],
    boothIds: ["booth-pangri-001"],
    teamIds: ["vol-team-farmer"],
    coverageScore: 66,
    performanceScore: 63,
    status: "active",
    approvalStatus: "pending_review"
  },
  {
    ...base("sector-musalgaon", ["src-field-reports"], 46),
    sectorName: "Musalgaon Cooperative Watch Sector",
    zoneId: "zone-rural",
    sectorLeadOwnerId: "owner-musalgaon-coordinator",
    villageIds: ["v-musalgaon"],
    boothIds: ["booth-musalgaon-001"],
    teamIds: ["vol-team-musalgaon"],
    coverageScore: 48,
    performanceScore: 49,
    status: "overloaded",
    approvalStatus: "changes_requested"
  },
  {
    ...base("sector-devpur", ["src-field-reports"], 34),
    sectorName: "Devpur Coverage Gap Sector",
    zoneId: "zone-south",
    sectorLeadOwnerId: "",
    villageIds: ["v-devpur"],
    boothIds: [],
    teamIds: [],
    coverageScore: 0,
    performanceScore: 0,
    status: "unassigned",
    approvalStatus: "draft"
  }
];

export const villageClusters: VillageCluster[] = [
  { ...base("vcluster-town", ["src-field-reports"], 58), clusterName: "Sinnar Town Village Assignment", zoneId: "zone-urban", sectorId: "sector-sinnar-town", villageIds: ["v-sinnar-town"], coordinatorOwnerId: "owner-booth-town", volunteerTeamId: "vol-team-town-booth", coverageScore: 76, riskScore: 58, opportunityScore: 70, status: "active", approvalStatus: "approved" },
  { ...base("vcluster-wavi-nandur", ["src-field-reports"], 50), clusterName: "Wavi-Nandur Village Assignment", zoneId: "zone-north", sectorId: "sector-wavi-nandur", villageIds: ["v-wavi", "v-nandur"], coordinatorOwnerId: "owner-zone-north", volunteerTeamId: "vol-team-north", coverageScore: 64, riskScore: 58, opportunityScore: 63, status: "needs_review", approvalStatus: "pending_review" },
  { ...base("vcluster-pangri", ["src-field-reports"], 55), clusterName: "Pangri Farmer Assignment", zoneId: "zone-rural", sectorId: "sector-pangri", villageIds: ["v-pangri"], coordinatorOwnerId: "owner-sector-pangri", volunteerTeamId: "vol-team-farmer", coverageScore: 66, riskScore: 65, opportunityScore: 74, status: "active", approvalStatus: "pending_review" },
  { ...base("vcluster-musalgaon", ["src-field-reports"], 46), clusterName: "Musalgaon Recovery Assignment", zoneId: "zone-rural", sectorId: "sector-musalgaon", villageIds: ["v-musalgaon"], coordinatorOwnerId: "owner-musalgaon-coordinator", volunteerTeamId: "vol-team-musalgaon", coverageScore: 48, riskScore: 72, opportunityScore: 66, status: "overloaded", approvalStatus: "changes_requested" },
  { ...base("vcluster-devpur-gap", ["src-field-reports"], 34), clusterName: "Devpur Unassigned Assignment", zoneId: "zone-south", sectorId: "sector-devpur", villageIds: ["v-devpur"], coordinatorOwnerId: "", volunteerTeamId: "", coverageScore: 0, riskScore: 57, opportunityScore: 58, status: "unassigned", approvalStatus: "draft" }
];

export const boothClusters: BoothCluster[] = [
  { ...base("bcluster-town", ["src-eci-form20-needed"], 28), clusterName: "Sinnar Town Booth Cluster", villageId: "v-sinnar-town", boothIds: ["booth-town-001"], boothCoordinatorOwnerId: "owner-booth-town", volunteerTeamId: "vol-team-town-booth", coverageScore: 76, readinessScore: 61, status: "active", approvalStatus: "approved" },
  { ...base("bcluster-midc", ["src-eci-form20-needed"], 28), clusterName: "MIDC Booth Cluster", villageId: "v-sinnar-town", boothIds: ["booth-midc-001"], boothCoordinatorOwnerId: "owner-youth-desk", volunteerTeamId: "vol-team-youth", coverageScore: 82, readinessScore: 64, status: "active", approvalStatus: "approved" },
  { ...base("bcluster-pangri", ["src-eci-form20-needed"], 24), clusterName: "Pangri Booth Cluster", villageId: "v-pangri", boothIds: ["booth-pangri-001"], boothCoordinatorOwnerId: "owner-sector-pangri", volunteerTeamId: "vol-team-farmer", coverageScore: 66, readinessScore: 52, status: "needs_review", approvalStatus: "pending_review" },
  { ...base("bcluster-musalgaon", ["src-eci-form20-needed"], 22), clusterName: "Musalgaon Booth Cluster", villageId: "v-musalgaon", boothIds: ["booth-musalgaon-001"], boothCoordinatorOwnerId: "owner-musalgaon-coordinator", volunteerTeamId: "vol-team-musalgaon", coverageScore: 48, readinessScore: 41, status: "overloaded", approvalStatus: "changes_requested" }
];

export const communityDesks: CommunityDesk[] = [
  { ...base("desk-maratha", ["src-field-reports"], 48), deskName: "Maratha Desk", communityId: "comm-maratha", leadOwnerId: "owner-zone-north", volunteerTeamId: "vol-team-north", coverageScore: 58, supportScore: 58, engagementScore: 52, status: "needs_review", approvalStatus: "pending_review" },
  { ...base("desk-youth", ["src-campaign-brief"], 62), deskName: "Youth Desk", communityId: "comm-youth", leadOwnerId: "owner-youth-desk", volunteerTeamId: "vol-team-youth", coverageScore: 82, supportScore: 67, engagementScore: 74, status: "active", approvalStatus: "approved" },
  { ...base("desk-farmers", ["src-field-reports"], 58), deskName: "Farmers Desk", communityId: "comm-farmers", leadOwnerId: "owner-farmer-cell", volunteerTeamId: "vol-team-farmer", coverageScore: 70, supportScore: 61, engagementScore: 66, status: "active", approvalStatus: "pending_review" },
  { ...base("desk-women", ["src-field-reports"], 48), deskName: "Women Desk", communityId: "comm-women", leadOwnerId: "owner-war-room-lead", volunteerTeamId: "", coverageScore: 44, supportScore: 57, engagementScore: 41, status: "needs_review", approvalStatus: "draft" },
  { ...base("desk-business", ["src-field-reports"], 32), deskName: "Business Desk", communityId: "comm-minority", leadOwnerId: "", volunteerTeamId: "", coverageScore: 0, supportScore: 45, engagementScore: 22, status: "unassigned", approvalStatus: "draft" }
];

export const volunteerTeams: VolunteerTeam[] = [
  { ...base("vol-team-town-booth", ["src-field-reports"], 58), teamName: "Town Booth Strike Team", leadOwnerId: "owner-booth-town", memberIds: ["member-booth-town", "member-volunteer-asha"], assignedVillageIds: ["v-sinnar-town"], assignedBoothIds: ["booth-town-001"], assignedCommunityIds: ["comm-women"], assignedTaskIds: ["task-town-roster"], performanceScore: 72, availability: "available", coverageScore: 76, status: "active", approvalStatus: "approved" },
  { ...base("vol-team-youth", ["src-campaign-brief"], 62), teamName: "Youth Outreach Team", leadOwnerId: "owner-youth-desk", memberIds: ["member-youth-desk", "member-volunteer-nikhil"], assignedVillageIds: ["v-sinnar-town"], assignedBoothIds: ["booth-midc-001"], assignedCommunityIds: ["comm-youth"], assignedTaskIds: ["task-youth-listening"], performanceScore: 76, availability: "available", coverageScore: 82, status: "active", approvalStatus: "approved" },
  { ...base("vol-team-farmer", ["src-field-reports"], 58), teamName: "Farmer Evidence Team", leadOwnerId: "owner-farmer-cell", memberIds: ["member-farmer-cell", "member-sector-pangri"], assignedVillageIds: ["v-pangri", "v-nandur"], assignedBoothIds: ["booth-pangri-001"], assignedCommunityIds: ["comm-farmers"], assignedTaskIds: ["task-pangri-evidence"], performanceScore: 68, availability: "limited", coverageScore: 70, status: "active", approvalStatus: "pending_review" },
  { ...base("vol-team-musalgaon", ["src-field-reports"], 46), teamName: "Musalgaon Recovery Team", leadOwnerId: "owner-musalgaon-coordinator", memberIds: ["member-musalgaon"], assignedVillageIds: ["v-musalgaon"], assignedBoothIds: ["booth-musalgaon-001"], assignedCommunityIds: ["comm-farmers"], assignedTaskIds: ["task-musalgaon-owner"], performanceScore: 49, availability: "limited", coverageScore: 48, status: "overloaded", approvalStatus: "changes_requested" },
  { ...base("vol-team-north", ["src-field-reports"], 52), teamName: "North Rural Field Team", leadOwnerId: "owner-zone-north", memberIds: ["member-zone-north"], assignedVillageIds: ["v-wavi", "v-nandur"], assignedBoothIds: [], assignedCommunityIds: ["comm-maratha"], assignedTaskIds: ["task-north-coverage"], performanceScore: 61, availability: "available", coverageScore: 64, status: "needs_review", approvalStatus: "pending_review" }
];

export const teamMembers: TeamMember[] = [
  { ...base("member-campaign-manager", ["src-project-context"], 72), fullName: "Campaign Manager", campaignRoleId: "camp-role-campaign-manager", ownerId: "owner-campaign-manager", zoneId: "", sectorId: "", villageIds: ["v-sinnar-town", "v-pangri", "v-musalgaon", "v-wavi", "v-nandur", "v-devpur"], boothIds: ["booth-town-001", "booth-midc-001", "booth-pangri-001", "booth-musalgaon-001"], communityIds: ["comm-youth", "comm-farmers", "comm-women"], teamId: "vol-team-town-booth", managerOwnerId: "", escalationOwnerId: "owner-campaign-manager", status: "active", performanceScore: 79, coverageScore: 84, workloadScore: 78, availability: "election_mode", contactPlaceholder: "Campaign office contact pending", approvalStatus: "approved" },
  { ...base("member-war-room", ["src-project-context"], 70), fullName: "War Room Lead", campaignRoleId: "camp-role-war-room-lead", ownerId: "owner-war-room-lead", zoneId: "", sectorId: "", villageIds: ["v-sinnar-town", "v-pangri"], boothIds: [], communityIds: ["comm-youth", "comm-farmers"], teamId: "vol-team-youth", managerOwnerId: "owner-campaign-manager", escalationOwnerId: "owner-campaign-manager", status: "active", performanceScore: 76, coverageScore: 80, workloadScore: 82, availability: "election_mode", contactPlaceholder: "War room contact pending", approvalStatus: "approved" },
  { ...base("member-zone-north", ["src-field-reports"], 56), fullName: "North Zone Lead", campaignRoleId: "camp-role-zone-lead", ownerId: "owner-zone-north", zoneId: "zone-north", sectorId: "sector-wavi-nandur", villageIds: ["v-wavi", "v-nandur"], boothIds: [], communityIds: ["comm-maratha"], teamId: "vol-team-north", managerOwnerId: "owner-war-room-lead", escalationOwnerId: "owner-campaign-manager", status: "needs_review", performanceScore: 61, coverageScore: 64, workloadScore: 65, availability: "available", contactPlaceholder: "Field contact pending", approvalStatus: "pending_review" },
  { ...base("member-sector-pangri", ["src-field-reports"], 55), fullName: "Pangri Sector Lead", campaignRoleId: "camp-role-sector-lead", ownerId: "owner-sector-pangri", zoneId: "zone-rural", sectorId: "sector-pangri", villageIds: ["v-pangri"], boothIds: ["booth-pangri-001"], communityIds: ["comm-farmers"], teamId: "vol-team-farmer", managerOwnerId: "owner-war-room-lead", escalationOwnerId: "owner-campaign-manager", status: "active", performanceScore: 63, coverageScore: 66, workloadScore: 76, availability: "limited", contactPlaceholder: "Field contact pending", approvalStatus: "pending_review" },
  { ...base("member-musalgaon", ["src-field-reports"], 44), fullName: "Musalgaon Village Coordinator", campaignRoleId: "camp-role-sector-lead", ownerId: "owner-musalgaon-coordinator", zoneId: "zone-rural", sectorId: "sector-musalgaon", villageIds: ["v-musalgaon"], boothIds: ["booth-musalgaon-001"], communityIds: ["comm-farmers"], teamId: "vol-team-musalgaon", managerOwnerId: "owner-zone-north", escalationOwnerId: "owner-campaign-manager", status: "overloaded", performanceScore: 49, coverageScore: 48, workloadScore: 88, availability: "limited", contactPlaceholder: "Field contact pending", approvalStatus: "changes_requested" },
  { ...base("member-booth-town", ["src-field-reports"], 58), fullName: "Sinnar Town Booth Coordinator", campaignRoleId: "camp-role-sector-lead", ownerId: "owner-booth-town", zoneId: "zone-urban", sectorId: "sector-sinnar-town", villageIds: ["v-sinnar-town"], boothIds: ["booth-town-001"], communityIds: ["comm-women"], teamId: "vol-team-town-booth", managerOwnerId: "owner-war-room-lead", escalationOwnerId: "owner-campaign-manager", status: "active", performanceScore: 72, coverageScore: 76, workloadScore: 68, availability: "available", contactPlaceholder: "Booth desk contact pending", approvalStatus: "approved" },
  { ...base("member-youth-desk", ["src-campaign-brief"], 62), fullName: "Youth Desk Lead", campaignRoleId: "camp-role-community-lead", ownerId: "owner-youth-desk", zoneId: "zone-urban", sectorId: "sector-midc-youth", villageIds: ["v-sinnar-town"], boothIds: ["booth-midc-001"], communityIds: ["comm-youth"], teamId: "vol-team-youth", managerOwnerId: "owner-war-room-lead", escalationOwnerId: "owner-campaign-manager", status: "active", performanceScore: 76, coverageScore: 82, workloadScore: 71, availability: "available", contactPlaceholder: "Youth desk contact pending", approvalStatus: "approved" },
  { ...base("member-farmer-cell", ["src-field-reports"], 58), fullName: "Farmer Cell Lead", campaignRoleId: "camp-role-community-lead", ownerId: "owner-farmer-cell", zoneId: "zone-rural", sectorId: "sector-pangri", villageIds: ["v-pangri", "v-nandur"], boothIds: ["booth-pangri-001"], communityIds: ["comm-farmers"], teamId: "vol-team-farmer", managerOwnerId: "owner-war-room-lead", escalationOwnerId: "owner-campaign-manager", status: "active", performanceScore: 68, coverageScore: 70, workloadScore: 74, availability: "limited", contactPlaceholder: "Farmer cell contact pending", approvalStatus: "pending_review" },
  { ...base("member-volunteer-nikhil", ["src-field-reports"], 48), fullName: "Volunteer Nikhil Placeholder", campaignRoleId: "camp-role-volunteer", ownerId: "", zoneId: "zone-urban", sectorId: "sector-midc-youth", villageIds: ["v-sinnar-town"], boothIds: ["booth-midc-001"], communityIds: ["comm-youth"], teamId: "vol-team-youth", managerOwnerId: "owner-youth-desk", escalationOwnerId: "owner-war-room-lead", status: "forming", performanceScore: 52, coverageScore: 44, workloadScore: 35, availability: "available", contactPlaceholder: "Volunteer contact pending", approvalStatus: "draft" },
  { ...base("member-volunteer-asha", ["src-field-reports"], 48), fullName: "Volunteer Asha Placeholder", campaignRoleId: "camp-role-volunteer", ownerId: "", zoneId: "zone-urban", sectorId: "sector-sinnar-town", villageIds: ["v-sinnar-town"], boothIds: ["booth-town-001"], communityIds: ["comm-women"], teamId: "vol-team-town-booth", managerOwnerId: "owner-booth-town", escalationOwnerId: "owner-war-room-lead", status: "forming", performanceScore: 50, coverageScore: 42, workloadScore: 32, availability: "available", contactPlaceholder: "Volunteer contact pending", approvalStatus: "draft" }
];

export const teamMemberAssignments: TeamMemberAssignment[] = [
  { ...base("assign-youth-desk-midc", ["src-field-reports"], 56), teamMemberId: "member-youth-desk", assignmentType: "community", relatedEntityType: "community", relatedEntityId: "comm-youth", assignmentScope: "MIDC youth listening circuit and youth desk outreach.", startDate: "2026-06-12", endDate: "Election mode", status: "active", approvalStatus: "approved" },
  { ...base("assign-farmer-pangri", ["src-field-reports"], 55), teamMemberId: "member-farmer-cell", assignmentType: "village", relatedEntityType: "village", relatedEntityId: "v-pangri", assignmentScope: "Farmer evidence packets, irrigation issues, promise tracking.", startDate: "2026-06-12", endDate: "Election mode", status: "active", approvalStatus: "pending_review" },
  { ...base("assign-musalgaon-recovery", ["src-field-reports"], 44), teamMemberId: "member-musalgaon", assignmentType: "village", relatedEntityType: "village", relatedEntityId: "v-musalgaon", assignmentScope: "Musalgaon ownership recovery and cooperative movement monitoring.", startDate: "2026-06-12", endDate: "2026-06-20", status: "overloaded", approvalStatus: "changes_requested" },
  { ...base("assign-devpur-gap", ["src-field-reports"], 34), teamMemberId: "", assignmentType: "village", relatedEntityType: "village", relatedEntityId: "v-devpur", assignmentScope: "Unassigned Devpur coverage recovery.", startDate: "Pending", endDate: "Pending", status: "unassigned", approvalStatus: "draft" }
];

export const volunteerTeamMembers: VolunteerTeamMember[] = [
  { ...base("vtm-youth-lead", ["src-campaign-brief"], 62), volunteerTeamId: "vol-team-youth", teamMemberId: "member-youth-desk", roleInTeam: "Lead", assignedArea: "MIDC and youth community", availability: "available", status: "active", approvalStatus: "approved" },
  { ...base("vtm-youth-vol", ["src-field-reports"], 48), volunteerTeamId: "vol-team-youth", teamMemberId: "member-volunteer-nikhil", roleInTeam: "Volunteer", assignedArea: "Youth listening notes", availability: "available", status: "forming", approvalStatus: "draft" },
  { ...base("vtm-town-lead", ["src-field-reports"], 58), volunteerTeamId: "vol-team-town-booth", teamMemberId: "member-booth-town", roleInTeam: "Lead", assignedArea: "Town booths", availability: "available", status: "active", approvalStatus: "approved" },
  { ...base("vtm-town-vol", ["src-field-reports"], 48), volunteerTeamId: "vol-team-town-booth", teamMemberId: "member-volunteer-asha", roleInTeam: "Volunteer", assignedArea: "Women desk conversations", availability: "available", status: "forming", approvalStatus: "draft" },
  { ...base("vtm-farmer-lead", ["src-field-reports"], 58), volunteerTeamId: "vol-team-farmer", teamMemberId: "member-farmer-cell", roleInTeam: "Lead", assignedArea: "Pangri and farmer issues", availability: "limited", status: "active", approvalStatus: "pending_review" },
  { ...base("vtm-musalgaon-lead", ["src-field-reports"], 44), volunteerTeamId: "vol-team-musalgaon", teamMemberId: "member-musalgaon", roleInTeam: "Lead", assignedArea: "Musalgaon recovery", availability: "limited", status: "overloaded", approvalStatus: "changes_requested" }
];

export const coverageRecords: CoverageRecord[] = [
  { ...base("cov-zone-urban", ["src-field-reports"], 60), coverageType: "zone", relatedEntityType: "zone", relatedEntityId: "zone-urban", ownerId: "owner-booth-town", teamId: "vol-team-town-booth", coverageScore: 79, coverageLevel: "covered", gapReason: "", nextAction: "Maintain booth readiness checks.", approvalStatus: "approved" },
  { ...base("cov-zone-north", ["src-field-reports"], 52), coverageType: "zone", relatedEntityType: "zone", relatedEntityId: "zone-north", ownerId: "owner-zone-north", teamId: "vol-team-north", coverageScore: 64, coverageLevel: "partial", gapReason: "Booth coordinator mapping incomplete.", nextAction: "Complete Wavi-Nandur booth assignments.", approvalStatus: "pending_review" },
  { ...base("cov-zone-rural", ["src-field-reports"], 50), coverageType: "zone", relatedEntityType: "zone", relatedEntityId: "zone-rural", ownerId: "owner-sector-pangri", teamId: "vol-team-farmer", coverageScore: 57, coverageLevel: "partial", gapReason: "Musalgaon owner overloaded.", nextAction: "Add backup owner for Musalgaon.", approvalStatus: "pending_review" },
  { ...base("cov-zone-south", ["src-field-reports"], 34), coverageType: "zone", relatedEntityType: "zone", relatedEntityId: "zone-south", ownerId: "", teamId: "", coverageScore: 0, coverageLevel: "critical_gap", gapReason: "Devpur has no owner, coordinator, or team.", nextAction: "Assign zone/sector owner and minimum volunteer team.", approvalStatus: "draft" },
  { ...base("cov-desk-business", ["src-field-reports"], 32), coverageType: "community", relatedEntityType: "community_desk", relatedEntityId: "desk-business", ownerId: "", teamId: "", coverageScore: 0, coverageLevel: "critical_gap", gapReason: "Business desk is still unassigned.", nextAction: "Nominate owner and link source/evidence plan.", approvalStatus: "draft" }
];

export const coverageGaps: CoverageGap[] = [
  { ...base("gap-devpur-unassigned", ["src-field-reports"], 34), gapTitle: "Devpur has no active owner or volunteer team", gapType: "unassigned_village", relatedEntityType: "village", relatedEntityId: "v-devpur", severity: "critical", detectedAt: "2026-06-12T10:30:00+05:30", recommendedOwnerId: "owner-zone-north", recommendedAction: "Assign temporary north-zone owner and create Devpur coverage visit.", status: "open", approvalStatus: "draft" },
  { ...base("gap-business-desk", ["src-field-reports"], 32), gapTitle: "Business community desk not staffed", gapType: "community_gap", relatedEntityType: "community_desk", relatedEntityId: "desk-business", severity: "high", detectedAt: "2026-06-12T10:35:00+05:30", recommendedOwnerId: "owner-war-room-lead", recommendedAction: "Create desk lead search task and attach source notes.", status: "open", approvalStatus: "draft" },
  { ...base("gap-musalgaon-overload", ["src-field-reports"], 44), gapTitle: "Musalgaon coordinator overloaded", gapType: "owner_gap", relatedEntityType: "team_member", relatedEntityId: "member-musalgaon", severity: "critical", detectedAt: "2026-06-12T10:40:00+05:30", recommendedOwnerId: "owner-campaign-manager", recommendedAction: "Assign backup coordinator and rebalance farmer cell workload.", status: "assigned", approvalStatus: "pending_review" },
  { ...base("gap-booth-source", ["src-source-map"], 78), gapTitle: "Official booth source missing for readiness calculations", gapType: "reporting_gap", relatedEntityType: "political_risk", relatedEntityId: "risk-form20-missing", severity: "critical", detectedAt: "2026-06-12T10:45:00+05:30", recommendedOwnerId: "owner-war-room-lead", recommendedAction: "Collect official ECI Form 20 before public booth analytics.", status: "in_review", approvalStatus: "approved" }
];

export const workloadMetrics: WorkloadMetric[] = [
  { ...base("workload-campaign-manager", ["src-project-context"], 70), ownerId: "owner-campaign-manager", assignedVillages: 6, assignedBooths: 4, assignedCommunities: 3, assignedTasks: 3, assignedVisits: 1, assignedFollowUps: 1, assignedPromises: 0, assignedRisks: 1, assignedOpportunities: 0, workloadScore: 78, overloadStatus: "watch", recommendedAction: "Delegate Devpur setup and Form 20 research follow-up to war room.", approvalStatus: "approved" },
  { ...base("workload-war-room", ["src-project-context"], 68), ownerId: "owner-war-room-lead", assignedVillages: 2, assignedBooths: 0, assignedCommunities: 2, assignedTasks: 2, assignedVisits: 1, assignedFollowUps: 0, assignedPromises: 0, assignedRisks: 1, assignedOpportunities: 0, workloadScore: 82, overloadStatus: "overloaded", recommendedAction: "Move community desk staffing to campaign manager approval queue.", approvalStatus: "approved" },
  { ...base("workload-zone-north", ["src-field-reports"], 56), ownerId: "owner-zone-north", assignedVillages: 2, assignedBooths: 0, assignedCommunities: 1, assignedTasks: 1, assignedVisits: 1, assignedFollowUps: 0, assignedPromises: 0, assignedRisks: 0, assignedOpportunities: 0, workloadScore: 65, overloadStatus: "balanced", recommendedAction: "Add Wavi-Nandur booth coordinator mapping.", approvalStatus: "pending_review" },
  { ...base("workload-musalgaon", ["src-field-reports"], 44), ownerId: "owner-musalgaon-coordinator", assignedVillages: 1, assignedBooths: 1, assignedCommunities: 1, assignedTasks: 1, assignedVisits: 1, assignedFollowUps: 1, assignedPromises: 0, assignedRisks: 0, assignedOpportunities: 0, workloadScore: 88, overloadStatus: "overloaded", recommendedAction: "Assign backup owner and schedule recovery review.", approvalStatus: "changes_requested" },
  { ...base("workload-youth", ["src-campaign-brief"], 62), ownerId: "owner-youth-desk", assignedVillages: 1, assignedBooths: 1, assignedCommunities: 1, assignedTasks: 1, assignedVisits: 1, assignedFollowUps: 1, assignedPromises: 1, assignedRisks: 0, assignedOpportunities: 1, workloadScore: 71, overloadStatus: "balanced", recommendedAction: "Keep youth listening circuit active and attach evidence to claims.", approvalStatus: "approved" }
];

export const organizationUnits: OrganizationUnit[] = [
  { ...base("unit-candidate", ["src-project-context"], 70), unitName: "Uday Sangle", unitType: "candidate", ownerId: "owner-campaign-manager", parentUnitId: "", zoneId: "", sectorId: "", villageId: "", boothId: "", communityId: "", coverageScore: 100, workloadScore: 60, status: "active", approvalStatus: "approved" },
  { ...base("unit-campaign-manager", ["src-project-context"], 70), unitName: "Campaign Manager", unitType: "campaign_manager", ownerId: "owner-campaign-manager", parentUnitId: "unit-candidate", zoneId: "", sectorId: "", villageId: "", boothId: "", communityId: "", coverageScore: 84, workloadScore: 78, status: "active", approvalStatus: "approved" },
  { ...base("unit-war-room", ["src-project-context"], 68), unitName: "War Room", unitType: "war_room", ownerId: "owner-war-room-lead", parentUnitId: "unit-campaign-manager", zoneId: "", sectorId: "", villageId: "", boothId: "", communityId: "", coverageScore: 80, workloadScore: 82, status: "active", approvalStatus: "approved" },
  { ...base("unit-urban-zone", ["src-field-reports"], 60), unitName: "Urban Command Zone", unitType: "zone", ownerId: "owner-booth-town", parentUnitId: "unit-war-room", zoneId: "zone-urban", sectorId: "", villageId: "", boothId: "", communityId: "", coverageScore: 79, workloadScore: 68, status: "active", approvalStatus: "approved" },
  { ...base("unit-rural-zone", ["src-field-reports"], 52), unitName: "Pangri-Musalgaon Rural Zone", unitType: "zone", ownerId: "owner-sector-pangri", parentUnitId: "unit-war-room", zoneId: "zone-rural", sectorId: "", villageId: "", boothId: "", communityId: "", coverageScore: 57, workloadScore: 76, status: "overloaded", approvalStatus: "pending_review" },
  { ...base("unit-youth-desk", ["src-campaign-brief"], 62), unitName: "Youth Desk", unitType: "community", ownerId: "owner-youth-desk", parentUnitId: "unit-war-room", zoneId: "zone-urban", sectorId: "sector-midc-youth", villageId: "v-sinnar-town", boothId: "booth-midc-001", communityId: "comm-youth", coverageScore: 82, workloadScore: 71, status: "active", approvalStatus: "approved" },
  { ...base("unit-devpur-gap", ["src-field-reports"], 34), unitName: "Devpur Gap", unitType: "village", ownerId: "", parentUnitId: "unit-rural-zone", zoneId: "zone-south", sectorId: "sector-devpur", villageId: "v-devpur", boothId: "", communityId: "", coverageScore: 0, workloadScore: 0, status: "unassigned", approvalStatus: "draft" }
];

export const campaignHierarchy: CampaignHierarchy[] = [
  { ...base("hier-candidate-cm", ["src-project-context"], 70), organizationId: "campaign-org-sinnar-2026", parentUnitId: "unit-candidate", childUnitId: "unit-campaign-manager", relationshipType: "reports_to", depth: 1, status: "active", approvalStatus: "approved" },
  { ...base("hier-cm-war", ["src-project-context"], 68), organizationId: "campaign-org-sinnar-2026", parentUnitId: "unit-campaign-manager", childUnitId: "unit-war-room", relationshipType: "reports_to", depth: 2, status: "active", approvalStatus: "approved" },
  { ...base("hier-war-urban", ["src-field-reports"], 58), organizationId: "campaign-org-sinnar-2026", parentUnitId: "unit-war-room", childUnitId: "unit-urban-zone", relationshipType: "reports_to", depth: 3, status: "active", approvalStatus: "approved" },
  { ...base("hier-war-rural", ["src-field-reports"], 52), organizationId: "campaign-org-sinnar-2026", parentUnitId: "unit-war-room", childUnitId: "unit-rural-zone", relationshipType: "reports_to", depth: 3, status: "needs_review", approvalStatus: "pending_review" },
  { ...base("hier-war-youth", ["src-campaign-brief"], 62), organizationId: "campaign-org-sinnar-2026", parentUnitId: "unit-war-room", childUnitId: "unit-youth-desk", relationshipType: "coordinates_with", depth: 3, status: "active", approvalStatus: "approved" },
  { ...base("hier-rural-devpur", ["src-field-reports"], 34), organizationId: "campaign-org-sinnar-2026", parentUnitId: "unit-rural-zone", childUnitId: "unit-devpur-gap", relationshipType: "escalates_to", depth: 4, status: "unassigned", approvalStatus: "draft" }
];

export const rosters: Roster[] = [
  { ...base("roster-daily-war-room", ["src-project-context"], 68), rosterName: "Daily War Room Coverage", rosterType: "daily", dateRange: "2026-06-12", zoneId: "", sectorId: "", ownerId: "owner-war-room-lead", status: "active", approvalStatus: "approved" },
  { ...base("roster-weekly-field", ["src-field-reports"], 56), rosterName: "Weekly Field Coverage", rosterType: "weekly", dateRange: "2026-06-12 to 2026-06-18", zoneId: "zone-rural", sectorId: "sector-pangri", ownerId: "owner-sector-pangri", status: "needs_review", approvalStatus: "pending_review" },
  { ...base("roster-final-72", ["src-project-context"], 64), rosterName: "Final 72 Hours Skeleton Roster", rosterType: "final_72_hours", dateRange: "Election mode trigger", zoneId: "", sectorId: "", ownerId: "owner-campaign-manager", status: "forming", approvalStatus: "pending_review" },
  { ...base("roster-polling-day", ["src-project-context"], 62), rosterName: "Polling Day Booth Roster", rosterType: "polling_day", dateRange: "Polling day trigger", zoneId: "zone-urban", sectorId: "sector-sinnar-town", ownerId: "owner-booth-town", status: "forming", approvalStatus: "pending_review" }
];

export const shiftAssignments: ShiftAssignment[] = [
  { ...base("shift-war-room-am", ["src-project-context"], 68), rosterId: "roster-daily-war-room", teamMemberId: "member-war-room", campaignRoleId: "camp-role-war-room-lead", shiftLabel: "08:00-14:00 intelligence desk", coverageArea: "All Sinnar", availability: "election_mode", status: "assigned", approvalStatus: "approved" },
  { ...base("shift-youth-evening", ["src-field-reports"], 56), rosterId: "roster-weekly-field", teamMemberId: "member-youth-desk", campaignRoleId: "camp-role-community-lead", shiftLabel: "18:00-21:00 youth follow-up", coverageArea: "MIDC youth circuit", availability: "available", status: "assigned", approvalStatus: "approved" },
  { ...base("shift-pangri-morning", ["src-field-reports"], 54), rosterId: "roster-weekly-field", teamMemberId: "member-farmer-cell", campaignRoleId: "camp-role-community-lead", shiftLabel: "07:00-11:00 farmer evidence route", coverageArea: "Pangri irrigation belt", availability: "limited", status: "assigned", approvalStatus: "pending_review" },
  { ...base("shift-musalgaon-escalated", ["src-field-reports"], 42), rosterId: "roster-weekly-field", teamMemberId: "member-musalgaon", campaignRoleId: "camp-role-sector-lead", shiftLabel: "Escalated recovery visit", coverageArea: "Musalgaon", availability: "limited", status: "escalated", approvalStatus: "changes_requested" },
  { ...base("shift-devpur-open", ["src-field-reports"], 34), rosterId: "roster-final-72", teamMemberId: "", campaignRoleId: "camp-role-volunteer", shiftLabel: "Devpur gap owner needed", coverageArea: "Devpur", availability: "unavailable", status: "missed", approvalStatus: "draft" }
];
