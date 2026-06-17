import type { VillageIntelligenceData } from "./types";

export const villageIntelligenceData: VillageIntelligenceData = {
  overview: [
    { label: "Total Villages", value: "128", trend: "Stable", change: 0, confidence: 42 },
    { label: "Strong Villages", value: "31", trend: "Up", change: 8, confidence: 53 },
    { label: "Weak Villages", value: "22", trend: "Down", change: -5, confidence: 45 },
    { label: "Swing Villages", value: "37", trend: "Up", change: 12, confidence: 49 },
    { label: "Growth Villages", value: "24", trend: "Up", change: 16, confidence: 55 },
    { label: "Risk Villages", value: "14", trend: "Up", change: 9, confidence: 48 },
    { label: "Covered Villages", value: "82", trend: "Up", change: 11, confidence: 51 },
    { label: "Uncovered Villages", value: "46", trend: "Down", change: -11, confidence: 44 }
  ],
  command: [
    { id: "v-sinnar-town", village: "Sinnar Town", classification: "Growth", population: 74200, estimatedVoters: 52400, supportScore: 63, sentimentScore: 66, influenceScore: 74, riskScore: 44, opportunityScore: 72, visitPriority: "High", assignedCoordinator: "Urban Desk", status: "Action Active", x: 51, y: 45 },
    { id: "v-musalgaon", village: "Musalgaon", classification: "Risk", population: 18600, estimatedVoters: 13200, supportScore: 48, sentimentScore: 46, influenceScore: 82, riskScore: 78, opportunityScore: 66, visitPriority: "Critical", assignedCoordinator: "Political Desk", status: "Needs Visit", x: 76, y: 52 },
    { id: "v-pangri", village: "Pangri", classification: "Swing", population: 15100, estimatedVoters: 10800, supportScore: 56, sentimentScore: 59, influenceScore: 68, riskScore: 57, opportunityScore: 74, visitPriority: "High", assignedCoordinator: "Farmer Cell", status: "Covered", x: 69, y: 67 },
    { id: "v-dubere", village: "Dubere", classification: "Growth", population: 12200, estimatedVoters: 8700, supportScore: 59, sentimentScore: 62, influenceScore: 61, riskScore: 39, opportunityScore: 68, visitPriority: "Medium", assignedCoordinator: "Women Outreach", status: "Action Active", x: 42, y: 63 },
    { id: "v-devpur", village: "Devpur", classification: "Weak", population: 9400, estimatedVoters: 6600, supportScore: 46, sentimentScore: 43, influenceScore: 48, riskScore: 62, opportunityScore: 58, visitPriority: "High", assignedCoordinator: "Booth Ops", status: "Uncovered", x: 48, y: 82 },
    { id: "v-wavi", village: "Wavi", classification: "Swing", population: 13400, estimatedVoters: 9600, supportScore: 54, sentimentScore: 56, influenceScore: 63, riskScore: 52, opportunityScore: 64, visitPriority: "Medium", assignedCoordinator: "Community Desk", status: "Monitoring", x: 34, y: 29 },
    { id: "v-nandur-shingote", village: "Nandur Shingote", classification: "Strong", population: 16500, estimatedVoters: 11800, supportScore: 66, sentimentScore: 68, influenceScore: 71, riskScore: 38, opportunityScore: 60, visitPriority: "Medium", assignedCoordinator: "Farmer Cell", status: "Covered", x: 24, y: 54 },
    { id: "v-baragaon-pimpri", village: "Baragaon Pimpri", classification: "Weak", population: 11200, estimatedVoters: 7900, supportScore: 44, sentimentScore: 42, influenceScore: 51, riskScore: 68, opportunityScore: 57, visitPriority: "High", assignedCoordinator: "Issue Cell", status: "Needs Visit", x: 58, y: 25 }
  ],
  targets: [
    { village: "Sinnar Town", currentSupport: 63, potentialSupport: 70, voteGainPotential: 3100, priority: "Critical", reason: "Urban service grievances and youth employment conversion", recommendedAction: "Ward-wise grievance and youth jobs circuit", expectedImpact: 1900 },
    { village: "Pangri", currentSupport: 56, potentialSupport: 66, voteGainPotential: 2600, priority: "High", reason: "Irrigation issue can be owned with evidence", recommendedAction: "Irrigation walk-through with farmer conveners", expectedImpact: 1700 },
    { village: "Musalgaon", currentSupport: 48, potentialSupport: 59, voteGainPotential: 2200, priority: "High", reason: "High-risk but high-opportunity cooperative belt", recommendedAction: "Neutral intermediary mapping and visit", expectedImpact: 1500 },
    { village: "Dubere", currentSupport: 59, potentialSupport: 65, voteGainPotential: 1500, priority: "Medium", reason: "Women SHG forums can consolidate support", recommendedAction: "Women-led issue forum", expectedImpact: 900 }
  ],
  risks: [
    { village: "Musalgaon", riskType: "Cooperative network consolidation", potentialVoteLoss: 2600, severity: "Critical", reason: "Opponent-linked intermediaries have high reach", owner: "Political Desk", mitigationPlan: "Map conveners and engage neutral farmer voices", status: "Mapping" },
    { village: "Baragaon Pimpri", riskType: "Water grievance hardening", potentialVoteLoss: 1300, severity: "High", reason: "Unresolved water issue is becoming a trust problem", owner: "Issue Cell", mitigationPlan: "Collect field evidence and assign public follow-up owner", status: "Needs visit" },
    { village: "Devpur", riskType: "Coordinator coverage gap", potentialVoteLoss: 900, severity: "High", reason: "Weak booth coverage and low contact verification", owner: "Booth Ops", mitigationPlan: "Booth worker verification sprint", status: "Open" },
    { village: "Wavi", riskType: "Neutral influencer drift", potentialVoteLoss: 750, severity: "Medium", reason: "Local intermediaries are not locked into relationship plan", owner: "Community Desk", mitigationPlan: "Bridge-building meeting with two neutral influencers", status: "Monitoring" }
  ],
  support: [
    { village: "Sinnar Town", supporters: 63, opponents: 30, neutral: 18, persuadable: 24, unknown: 11 },
    { village: "Musalgaon", supporters: 48, opponents: 42, neutral: 20, persuadable: 27, unknown: 14 },
    { village: "Pangri", supporters: 56, opponents: 32, neutral: 19, persuadable: 28, unknown: 10 },
    { village: "Dubere", supporters: 59, opponents: 26, neutral: 21, persuadable: 25, unknown: 12 },
    { village: "Devpur", supporters: 46, opponents: 38, neutral: 23, persuadable: 22, unknown: 18 },
    { village: "Wavi", supporters: 54, opponents: 33, neutral: 20, persuadable: 24, unknown: 15 }
  ],
  communityBreakdown: [
    { village: "Sinnar Town", maratha: 28, mali: 11, vanjari: 8, dhangar: 6, sc: 10, st: 2, minority: 8, youth: 27, women: 48, farmers: 19, supportLevel: "Growth" },
    { village: "Musalgaon", maratha: 31, mali: 9, vanjari: 7, dhangar: 5, sc: 8, st: 2, minority: 3, youth: 21, women: 49, farmers: 54, supportLevel: "Risk" },
    { village: "Pangri", maratha: 34, mali: 8, vanjari: 6, dhangar: 7, sc: 7, st: 3, minority: 2, youth: 19, women: 48, farmers: 61, supportLevel: "Swing" },
    { village: "Dubere", maratha: 25, mali: 12, vanjari: 9, dhangar: 4, sc: 11, st: 2, minority: 4, youth: 23, women: 51, farmers: 42, supportLevel: "Growth" },
    { village: "Devpur", maratha: 23, mali: 10, vanjari: 7, dhangar: 8, sc: 14, st: 4, minority: 3, youth: 20, women: 49, farmers: 47, supportLevel: "Weak" },
    { village: "Wavi", maratha: 30, mali: 9, vanjari: 10, dhangar: 6, sc: 8, st: 2, minority: 2, youth: 22, women: 48, farmers: 52, supportLevel: "Swing" }
  ],
  issues: [
    { village: "Sinnar Town", topIssues: ["Employment", "Urban services", "Roads"], severity: "Critical", affectedPopulation: 18200, politicalImpact: 84, opportunityScore: 80 },
    { village: "Pangri", topIssues: ["Irrigation", "Agriculture", "Electricity"], severity: "High", affectedPopulation: 7100, politicalImpact: 78, opportunityScore: 74 },
    { village: "Musalgaon", topIssues: ["Cooperative influence", "Agriculture", "Water"], severity: "High", affectedPopulation: 6900, politicalImpact: 76, opportunityScore: 66 },
    { village: "Dubere", topIssues: ["Water", "Healthcare", "Safety"], severity: "Medium", affectedPopulation: 4200, politicalImpact: 62, opportunityScore: 68 },
    { village: "Devpur", topIssues: ["Roads", "Booth coverage", "Education"], severity: "High", affectedPopulation: 3600, politicalImpact: 61, opportunityScore: 58 }
  ],
  influencers: [
    { name: "Cooperative conveners", village: "Musalgaon", type: "Business Leader", influenceScore: 86, alignment: "Opponent-leaning", relationshipStrength: 42, reach: 6100 },
    { name: "Farmer group captains", village: "Pangri", type: "Farmer Leader", influenceScore: 74, alignment: "Mixed", relationshipStrength: 58, reach: 4700 },
    { name: "Youth sports organizers", village: "Sinnar Town", type: "Youth Leader", influenceScore: 78, alignment: "Supportive", relationshipStrength: 74, reach: 3200 },
    { name: "SHG cluster leaders", village: "Dubere", type: "Social Worker", influenceScore: 63, alignment: "Persuadable", relationshipStrength: 55, reach: 2400 },
    { name: "Local teachers network", village: "Wavi", type: "Teacher", influenceScore: 62, alignment: "Neutral", relationshipStrength: 53, reach: 2100 }
  ],
  visitPlanner: [
    { village: "Musalgaon", lastVisit: "2026-05-24", visitFrequency: "Biweekly", pendingVisit: "2026-06-13", visitPriority: "Critical", recommendedVisitor: "Uday Sangle + Political Desk", purpose: "Cooperative influence mapping", expectedOutcome: "Neutral conveners identified", status: "Scheduled" },
    { village: "Pangri", lastVisit: "2026-06-02", visitFrequency: "Weekly", pendingVisit: "2026-06-12", visitPriority: "High", recommendedVisitor: "Uday Sangle + Farmer Cell", purpose: "Irrigation evidence capture", expectedOutcome: "Issue ownership proof", status: "Ready" },
    { village: "Devpur", lastVisit: "2026-05-10", visitFrequency: "Monthly", pendingVisit: "2026-06-15", visitPriority: "High", recommendedVisitor: "Booth Ops Lead", purpose: "Coordinator verification", expectedOutcome: "Booth contact gap closed", status: "Open" },
    { village: "Dubere", lastVisit: "2026-06-01", visitFrequency: "Monthly", pendingVisit: "2026-06-18", visitPriority: "Medium", recommendedVisitor: "Women Outreach", purpose: "SHG issue forum", expectedOutcome: "Women forum pipeline", status: "Planning" }
  ],
  engagement: [
    { village: "Sinnar Town", meetings: 9, events: 4, listeningSessions: 6, volunteerActivities: 14, issueResolutionActivities: 3, campaignActivities: 7 },
    { village: "Musalgaon", meetings: 4, events: 1, listeningSessions: 2, volunteerActivities: 5, issueResolutionActivities: 1, campaignActivities: 3 },
    { village: "Pangri", meetings: 6, events: 2, listeningSessions: 4, volunteerActivities: 8, issueResolutionActivities: 2, campaignActivities: 4 },
    { village: "Dubere", meetings: 5, events: 2, listeningSessions: 4, volunteerActivities: 7, issueResolutionActivities: 2, campaignActivities: 3 },
    { village: "Devpur", meetings: 2, events: 0, listeningSessions: 1, volunteerActivities: 2, issueResolutionActivities: 0, campaignActivities: 1 }
  ],
  sentiment: [
    { village: "Sinnar Town", currentSentiment: 66, previousSentiment: 61, trend: "Up", confidence: 55, monthlyChange: 5 },
    { village: "Musalgaon", currentSentiment: 46, previousSentiment: 49, trend: "Down", confidence: 48, monthlyChange: -3 },
    { village: "Pangri", currentSentiment: 59, previousSentiment: 55, trend: "Up", confidence: 53, monthlyChange: 4 },
    { village: "Dubere", currentSentiment: 62, previousSentiment: 59, trend: "Up", confidence: 51, monthlyChange: 3 },
    { village: "Devpur", currentSentiment: 43, previousSentiment: 45, trend: "Down", confidence: 42, monthlyChange: -2 },
    { village: "Wavi", currentSentiment: 56, previousSentiment: 56, trend: "Stable", confidence: 46, monthlyChange: 0 }
  ],
  opportunities: [
    { opportunity: "Ward-wise grievance and youth employment circuit", village: "Sinnar Town", expectedVotes: 3100, priority: "Critical", owner: "Urban Desk", status: "Action drafted", targetDate: "2026-06-18" },
    { opportunity: "Irrigation evidence visit", village: "Pangri", expectedVotes: 1700, priority: "High", owner: "Farmer Cell", status: "Ready", targetDate: "2026-06-12" },
    { opportunity: "Neutral cooperative intermediary mapping", village: "Musalgaon", expectedVotes: 1500, priority: "High", owner: "Political Desk", status: "Mapping", targetDate: "2026-06-13" },
    { opportunity: "Women SHG forum", village: "Dubere", expectedVotes: 900, priority: "Medium", owner: "Women Outreach", status: "Planning", targetDate: "2026-06-18" }
  ],
  tasks: [
    { village: "Musalgaon", openTasks: 8, pendingTasks: 5, overdueTasks: 2, completedTasks: 4, highestPriorityTask: "Map cooperative intermediaries" },
    { village: "Pangri", openTasks: 6, pendingTasks: 4, overdueTasks: 1, completedTasks: 7, highestPriorityTask: "Collect irrigation evidence" },
    { village: "Devpur", openTasks: 5, pendingTasks: 4, overdueTasks: 2, completedTasks: 2, highestPriorityTask: "Verify booth coordinator list" },
    { village: "Sinnar Town", openTasks: 7, pendingTasks: 3, overdueTasks: 0, completedTasks: 11, highestPriorityTask: "Run youth listening circle" },
    { village: "Dubere", openTasks: 4, pendingTasks: 3, overdueTasks: 0, completedTasks: 5, highestPriorityTask: "Confirm SHG conveners" }
  ],
  recommendations: [
    { recommendation: "Send Uday Sangle to Pangri for irrigation evidence capture this week.", reason: "Swing village with high opportunity, farmer issue intensity, and reachable conveners.", expectedVoteImpact: 1700, confidence: 58, priority: "High", actionLabel: "Schedule Visit" },
    { recommendation: "Treat Musalgaon as the top risk village and map cooperative intermediaries.", reason: "Risk score is highest and potential vote loss can erase gains elsewhere.", expectedVoteImpact: 1500, confidence: 50, priority: "Critical", actionLabel: "Create Task" },
    { recommendation: "Close Devpur coordinator gaps before the next field cycle.", reason: "Weak classification is linked to uncovered booth operations, not just persuasion.", expectedVoteImpact: 700, confidence: 46, priority: "High", actionLabel: "Assign Coordinator" },
    { recommendation: "Run a women-led issue forum in Dubere.", reason: "Growth village with SHG relationship opening and water/health issues.", expectedVoteImpact: 900, confidence: 54, priority: "Medium", actionLabel: "Create Listening Session" }
  ],
  comparisons: [
    { village: "Pangri", support: 56, sentiment: 59, issues: "Irrigation, agriculture", influencers: "Farmer group captains", risks: "Issue frustration", opportunities: "Irrigation ownership", turnout: 64, communityMix: "Farmers 61%, Maratha 34%" },
    { village: "Musalgaon", support: 48, sentiment: 46, issues: "Cooperative influence, water", influencers: "Cooperative conveners", risks: "Opponent network consolidation", opportunities: "Neutral intermediary bridge", turnout: 61, communityMix: "Farmers 54%, Maratha 31%" },
    { village: "Sinnar Town", support: 63, sentiment: 66, issues: "Employment, urban services", influencers: "Youth sports organizers", risks: "Urban narrative attacks", opportunities: "Youth jobs circuit", turnout: 68, communityMix: "Youth 27%, Women 48%" },
    { village: "Dubere", support: 59, sentiment: 62, issues: "Water, healthcare", influencers: "SHG cluster leaders", risks: "Unresolved water issue", opportunities: "Women forums", turnout: 66, communityMix: "Women 51%, Farmers 42%" }
  ]
};
