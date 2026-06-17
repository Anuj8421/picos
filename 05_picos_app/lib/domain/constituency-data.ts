import type { ConstituencyProfile, ConstituencyReport, ConstituencyWatchlistItem, ConstituencyZone } from "./types";

const now = "2026-06-14T12:30:00+05:30";

function base(id: string, sourceIds: string[], confidenceScore = 55) {
  return {
    id,
    createdAt: "2026-06-14T12:00:00+05:30",
    updatedAt: now,
    createdBy: "user-intel-lead",
    updatedBy: "user-intel-lead",
    verificationStatus: "needs_verification" as const,
    confidenceScore,
    sourceIds,
    notes: "Constituency Intelligence mock record for Sinnar. Keep internal until source, evidence, verification, and approval are complete."
  };
}

export const constituencyProfiles: ConstituencyProfile[] = [
  {
    ...base("const-sinnar", ["src-project-context", "src-source-map"], 66),
    constituencyName: "Sinnar Assembly Constituency",
    district: "Nashik",
    state: "Maharashtra",
    assemblyCode: "Needs official confirmation",
    candidateId: "cand-uday-sangle",
    strategicSummary: "Sinnar is a mixed rural, urban, farmer, youth, and cooperative-network battlefield where Uday Sangle needs verified village, booth, issue, and ownership coverage.",
    totalVillagesTracked: 7,
    totalBoothsTracked: 4,
    estimatedVoters: 0,
    dominantIssueIds: ["issue-irrigation-pangri", "issue-youth-employment"],
    readinessScore: 61,
    coverageScore: 58,
    approvalStatus: "pending_review"
  }
];

export const constituencyZones: ConstituencyZone[] = [
  {
    ...base("czone-urban", ["src-field-reports"], 60),
    zoneName: "Sinnar Urban Belt",
    zoneType: "urban",
    villageIds: ["v-sinnar-town"],
    boothIds: ["booth-town-001", "booth-midc-001"],
    communityIds: ["comm-youth", "comm-women", "comm-minority"],
    ownerId: "owner-booth-town",
    riskScore: 56,
    opportunityScore: 72,
    sentimentScore: 63,
    coverageScore: 79,
    readinessLevel: "watch",
    priority: "high",
    nextAction: "Complete booth source verification and maintain youth employment listening circuit.",
    approvalStatus: "approved"
  },
  {
    ...base("czone-north", ["src-field-reports"], 52),
    zoneName: "North Rural Belt",
    zoneType: "rural",
    villageIds: ["v-wavi", "v-nandur"],
    boothIds: [],
    communityIds: ["comm-maratha", "comm-farmers"],
    ownerId: "owner-zone-north",
    riskScore: 58,
    opportunityScore: 63,
    sentimentScore: 55,
    coverageScore: 64,
    readinessLevel: "watch",
    priority: "medium",
    nextAction: "Map Wavi and Nandur booth coverage and confirm farmer influencer network.",
    approvalStatus: "pending_review"
  },
  {
    ...base("czone-rural-core", ["src-field-reports"], 50),
    zoneName: "Pangri-Musalgaon Rural Core",
    zoneType: "rural",
    villageIds: ["v-pangri", "v-musalgaon"],
    boothIds: ["booth-pangri-001", "booth-musalgaon-001"],
    communityIds: ["comm-farmers", "comm-maratha"],
    ownerId: "owner-sector-pangri",
    riskScore: 69,
    opportunityScore: 70,
    sentimentScore: 56,
    coverageScore: 57,
    readinessLevel: "risk",
    priority: "critical",
    nextAction: "Rebalance Musalgaon ownership and complete Pangri irrigation evidence packet.",
    approvalStatus: "pending_review"
  },
  {
    ...base("czone-central-south", ["src-field-reports"], 44),
    zoneName: "Central-South Gap Belt",
    zoneType: "gap",
    villageIds: ["v-dubere", "v-devpur"],
    boothIds: [],
    communityIds: ["comm-women", "comm-sc", "comm-st"],
    ownerId: "",
    riskScore: 55,
    opportunityScore: 60,
    sentimentScore: 51,
    coverageScore: 22,
    readinessLevel: "critical_gap",
    priority: "critical",
    nextAction: "Assign owner for Devpur and create first-pass village verification visits.",
    approvalStatus: "draft"
  }
];

export const constituencyWatchlistItems: ConstituencyWatchlistItem[] = [
  {
    ...base("cwatch-devpur-owner-gap", ["src-field-reports"], 34),
    title: "Devpur ownership and visit coverage gap",
    watchType: "coverage_gap",
    relatedEntityType: "village",
    relatedEntityId: "v-devpur",
    zoneId: "czone-central-south",
    severity: "critical",
    reason: "No active owner, coordinator, booth mapping, or volunteer team is attached.",
    recommendedAction: "Assign temporary owner and schedule a verification visit.",
    ownerId: "owner-campaign-manager",
    status: "open",
    approvalStatus: "draft"
  },
  {
    ...base("cwatch-musalgaon-coop", ["src-field-reports"], 46),
    title: "Musalgaon cooperative-network movement",
    watchType: "risk",
    relatedEntityType: "village",
    relatedEntityId: "v-musalgaon",
    zoneId: "czone-rural-core",
    severity: "critical",
    reason: "Field notes indicate opponent activity and overloaded local ownership.",
    recommendedAction: "Assign backup owner and verify activity through two local sources.",
    ownerId: "owner-musalgaon-coordinator",
    status: "assigned",
    approvalStatus: "pending_review"
  },
  {
    ...base("cwatch-pangri-irrigation", ["src-field-reports"], 55),
    title: "Pangri irrigation evidence packet",
    watchType: "issue",
    relatedEntityType: "issue",
    relatedEntityId: "issue-irrigation-pangri",
    zoneId: "czone-rural-core",
    severity: "high",
    reason: "Farmer sentiment can improve if the campaign closes the evidence and follow-up loop.",
    recommendedAction: "Attach field photos, conversation notes, and next action owner.",
    ownerId: "owner-farmer-cell",
    status: "watching",
    approvalStatus: "pending_review"
  },
  {
    ...base("cwatch-form20", ["src-source-map"], 80),
    title: "Official booth-wise Form 20 still missing",
    watchType: "booth",
    relatedEntityType: "political_risk",
    relatedEntityId: "risk-form20-missing",
    zoneId: "czone-urban",
    severity: "critical",
    reason: "Booth analytics and public election claims remain provisional without official source.",
    recommendedAction: "Collect official ECI Form 20 and attach source/evidence record.",
    ownerId: "owner-war-room-lead",
    status: "assigned",
    approvalStatus: "approved"
  }
];

export const constituencyReports: ConstituencyReport[] = [
  {
    ...base("creport-sinnar-readiness", ["src-project-context", "src-field-reports"], 58),
    title: "Sinnar Constituency Readiness Brief",
    reportType: "constituency_brief",
    period: "2026-06",
    executiveSummary: "Constituency coverage is usable for command review but not yet election-mode ready because booth sources, Devpur coverage, and Musalgaon owner load remain unresolved.",
    zoneIds: ["czone-urban", "czone-north", "czone-rural-core", "czone-central-south"],
    villageIds: ["v-sinnar-town", "v-wavi", "v-nandur", "v-pangri", "v-musalgaon", "v-dubere", "v-devpur"],
    decisionLog: [
      "Collect Form 20 before booth-level public claims.",
      "Assign Devpur owner.",
      "Close Pangri irrigation evidence packet.",
      "Rebalance Musalgaon field ownership."
    ],
    approvalStatus: "pending_review"
  }
];
