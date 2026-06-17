import type { VoterIntelligenceData } from "./types";

export const voterIntelligenceData: VoterIntelligenceData = {
  metrics: [
    { label: "Total Voters", value: "3.21L", previous: "3.19L", change: 0.6, trend: "Up", confidence: 44 },
    { label: "Supporters", value: "96.4K", previous: "92.1K", change: 4.7, trend: "Up", confidence: 58 },
    { label: "Opponents", value: "1.18L", previous: "1.20L", change: -1.5, trend: "Down", confidence: 52 },
    { label: "Neutral", value: "53.8K", previous: "56.0K", change: -3.9, trend: "Down", confidence: 47 },
    { label: "Unknown", value: "42.6K", previous: "47.4K", change: -10.1, trend: "Down", confidence: 38 },
    { label: "Persuadable", value: "31.7K", previous: "28.2K", change: 12.4, trend: "Up", confidence: 55 },
    { label: "High Influence Voters", value: "4.8K", previous: "4.2K", change: 14.3, trend: "Up", confidence: 51 },
    { label: "Turnout Risk Voters", value: "24.5K", previous: "22.9K", change: 7.0, trend: "Up", confidence: 49 },
    { label: "Vote Growth Opportunity", value: "18.9K", previous: "15.8K", change: 19.6, trend: "Up", confidence: 57 }
  ],
  supportDistribution: [
    { status: "Supporters", value: 30, voters: 96400 },
    { status: "Opponents", value: 37, voters: 118000 },
    { status: "Neutral", value: 17, voters: 53800 },
    { status: "Unknown", value: 13, voters: 42600 },
    { status: "Persuadable", value: 10, voters: 31700 }
  ],
  communities: [
    { community: "Maratha", support: 58, opposition: 27, neutral: 15, trend: "Stable", confidence: 55, influence: 82, opportunity: 64, risk: 48 },
    { community: "Mali", support: 55, opposition: 25, neutral: 20, trend: "Up", confidence: 42, influence: 58, opportunity: 67, risk: 41 },
    { community: "Vanjari", support: 49, opposition: 34, neutral: 17, trend: "Stable", confidence: 38, influence: 61, opportunity: 52, risk: 56 },
    { community: "Dhangar", support: 53, opposition: 29, neutral: 18, trend: "Up", confidence: 40, influence: 54, opportunity: 59, risk: 44 },
    { community: "SC", support: 50, opposition: 31, neutral: 19, trend: "Down", confidence: 36, influence: 48, opportunity: 57, risk: 62 },
    { community: "ST", support: 47, opposition: 32, neutral: 21, trend: "Stable", confidence: 33, influence: 39, opportunity: 50, risk: 55 },
    { community: "Minority", support: 45, opposition: 35, neutral: 20, trend: "Stable", confidence: 32, influence: 43, opportunity: 61, risk: 59 },
    { community: "Women", support: 57, opposition: 24, neutral: 19, trend: "Up", confidence: 52, influence: 66, opportunity: 72, risk: 39 },
    { community: "Youth", support: 67, opposition: 18, neutral: 15, trend: "Up", confidence: 64, influence: 74, opportunity: 80, risk: 34 },
    { community: "Farmers", support: 61, opposition: 25, neutral: 14, trend: "Up", confidence: 58, influence: 86, opportunity: 78, risk: 46 }
  ],
  targetCommunities: [
    { community: "Youth", potentialVoteGain: 4200, currentSupport: 67, targetSupport: 74, priority: "Critical", recommendedAction: "Employment listening circuit in MIDC belt", owner: "Youth Outreach" },
    { community: "Farmers", potentialVoteGain: 3800, currentSupport: 61, targetSupport: 68, priority: "High", recommendedAction: "Irrigation proof campaign and village visits", owner: "Farmer Cell" },
    { community: "Women", potentialVoteGain: 2700, currentSupport: 57, targetSupport: 63, priority: "High", recommendedAction: "SHG issue forums and safety/water agenda", owner: "Women Outreach" },
    { community: "Mali", potentialVoteGain: 1600, currentSupport: 55, targetSupport: 60, priority: "Medium", recommendedAction: "Community leader listening meetings", owner: "Community Desk" }
  ],
  villages: [
    { id: "v-sinnar-town", village: "Sinnar Town", classification: "Growth", currentSupport: 63, opposition: 30, opportunity: 72, turnout: 68, potentialGain: 3100, majorIssue: "Urban services and media narrative", influencer: "Volunteer captains", priority: "High", recommendedAction: "Ward-wise service grievance drive", expectedVoteImpact: 1900, x: 51, y: 45 },
    { id: "v-musalgaon", village: "Musalgaon", classification: "Risk", currentSupport: 48, opposition: 42, opportunity: 66, turnout: 61, potentialGain: 2200, majorIssue: "Cooperative influence", influencer: "Cooperative leaders", priority: "Critical", recommendedAction: "Farmer intermediary mapping", expectedVoteImpact: 1500, x: 76, y: 52 },
    { id: "v-pangri", village: "Pangri", classification: "Swing", currentSupport: 56, opposition: 32, opportunity: 74, turnout: 64, potentialGain: 2600, majorIssue: "Irrigation and crop loss", influencer: "Farmer groups", priority: "High", recommendedAction: "Irrigation walk-through with evidence capture", expectedVoteImpact: 1700, x: 69, y: 67 },
    { id: "v-dubere", village: "Dubere", classification: "Growth", currentSupport: 59, opposition: 26, opportunity: 68, turnout: 66, potentialGain: 1500, majorIssue: "Women group issue forum", influencer: "SHG leaders", priority: "Medium", recommendedAction: "Recurring women-led issue forum", expectedVoteImpact: 900, x: 42, y: 63 },
    { id: "v-devpur", village: "Devpur", classification: "Weak", currentSupport: 46, opposition: 38, opportunity: 58, turnout: 55, potentialGain: 1200, majorIssue: "Coordinator coverage gap", influencer: "Village coordinators", priority: "High", recommendedAction: "Booth worker verification sprint", expectedVoteImpact: 700, x: 48, y: 82 },
    { id: "v-wavi", village: "Wavi", classification: "Swing", currentSupport: 54, opposition: 33, opportunity: 64, turnout: 62, potentialGain: 1400, majorIssue: "Influencer alignment", influencer: "Local intermediaries", priority: "Medium", recommendedAction: "Neutral influencer bridge-building", expectedVoteImpact: 850, x: 34, y: 29 }
  ],
  persuasionClusters: [
    { village: "Sinnar MIDC", community: "Youth", currentSupport: 62, potentialGain: 2200, issue: "Employment", recommendedIntervention: "Job access listening session and skills camp", expectedVotes: 1350, confidence: 62 },
    { village: "Pangri", community: "Farmers", currentSupport: 56, potentialGain: 1900, issue: "Irrigation", recommendedIntervention: "Issue documentation visit with follow-up owner", expectedVotes: 1200, confidence: 58 },
    { village: "Dubere", community: "Women", currentSupport: 57, potentialGain: 1300, issue: "Water, health access, safety", recommendedIntervention: "SHG forum with grievance tracker", expectedVotes: 760, confidence: 54 },
    { village: "Musalgaon", community: "Farmers", currentSupport: 48, potentialGain: 1600, issue: "Cooperative influence", recommendedIntervention: "Farmer conveners and proof-backed contrast", expectedVotes: 920, confidence: 50 }
  ],
  issueImpact: [
    { issue: "Employment", affectedVoters: 18200, affectedVillages: "Sinnar Town, MIDC belt", affectedCommunities: "Youth", politicalImpact: 84, opportunity: 80, priority: "Critical" },
    { issue: "Agriculture", affectedVoters: 24100, affectedVillages: "Pangri, Musalgaon, Nandur belt", affectedCommunities: "Farmers", politicalImpact: 82, opportunity: 78, priority: "High" },
    { issue: "Water", affectedVoters: 16800, affectedVillages: "Dubere, Baragaon Pimpri", affectedCommunities: "Women, Farmers", politicalImpact: 76, opportunity: 72, priority: "High" },
    { issue: "Roads", affectedVoters: 12600, affectedVillages: "South belt", affectedCommunities: "Mixed", politicalImpact: 66, opportunity: 58, priority: "Medium" },
    { issue: "Healthcare", affectedVoters: 8700, affectedVillages: "Rural clusters", affectedCommunities: "Women, Senior Citizens", politicalImpact: 59, opportunity: 54, priority: "Medium" }
  ],
  influencers: [
    { influencer: "Youth sports organizers", influencedVoters: 3200, influenceScore: 78, supportStatus: "Supportive", relationshipStrength: 74, politicalAlignment: "Sangle-leaning", potentialVoteImpact: 1450 },
    { influencer: "Cooperative leaders", influencedVoters: 6100, influenceScore: 86, supportStatus: "Opponent-leaning", relationshipStrength: 42, politicalAlignment: "Kokate network", potentialVoteImpact: 2200 },
    { influencer: "SHG leaders", influencedVoters: 2400, influenceScore: 63, supportStatus: "Neutral", relationshipStrength: 55, politicalAlignment: "Persuadable", potentialVoteImpact: 900 },
    { influencer: "Farmer conveners", influencedVoters: 4700, influenceScore: 74, supportStatus: "Mixed", relationshipStrength: 58, politicalAlignment: "Competitive", potentialVoteImpact: 1800 }
  ],
  turnout: [
    { label: "Likely Voters", value: 168000, mobilizationPriority: "Medium", turnoutRiskScore: 31 },
    { label: "Unlikely Voters", value: 39200, mobilizationPriority: "High", turnoutRiskScore: 72 },
    { label: "First Time Voters", value: 18200, mobilizationPriority: "Critical", turnoutRiskScore: 61 },
    { label: "Senior Citizens", value: 35600, mobilizationPriority: "Medium", turnoutRiskScore: 49 },
    { label: "Women Voters", value: 151000, mobilizationPriority: "High", turnoutRiskScore: 54 }
  ],
  booths: [
    { classification: "Strong", currentSupport: 66, expectedSupport: 70, potentialGain: 1800, boothPriority: "Medium" },
    { classification: "Weak", currentSupport: 42, expectedSupport: 49, potentialGain: 2400, boothPriority: "High" },
    { classification: "Swing", currentSupport: 53, expectedSupport: 60, potentialGain: 5200, boothPriority: "Critical" },
    { classification: "Growth", currentSupport: 58, expectedSupport: 64, potentialGain: 3100, boothPriority: "High" },
    { classification: "Risk", currentSupport: 49, expectedSupport: 47, potentialGain: -1200, boothPriority: "Critical" }
  ],
  gainOpportunities: [
    { opportunity: "Youth employment campaign", expectedVotes: 4200, community: "Youth", village: "MIDC belt", priority: "Critical", owner: "Youth Outreach", status: "Action drafted", targetDate: "2026-06-18" },
    { opportunity: "Farmer irrigation ownership", expectedVotes: 3800, community: "Farmers", village: "Pangri belt", priority: "High", owner: "Farmer Cell", status: "Open", targetDate: "2026-06-20" },
    { opportunity: "Women SHG forums", expectedVotes: 2100, community: "Women", village: "Dubere", priority: "High", owner: "Women Outreach", status: "Planning", targetDate: "2026-06-21" }
  ],
  lossRisks: [
    { risk: "Cooperative network consolidation", potentialVoteLoss: 2600, affectedArea: "Musalgaon belt", community: "Farmers", severity: "Critical", owner: "Political Desk", mitigationPlan: "Map intermediaries and neutral conveners", status: "Mapping" },
    { risk: "Party-transition attack line", potentialVoteLoss: 2200, affectedArea: "All villages", community: "Mixed", severity: "High", owner: "Narrative Desk", mitigationPlan: "Verified explanation line and worker FAQ", status: "Needs verification" },
    { risk: "Low turnout among first-time voters", potentialVoteLoss: 1600, affectedArea: "Town and MIDC", community: "Youth", severity: "High", owner: "Volunteer Lead", mitigationPlan: "Youth volunteer reminder network", status: "Open" }
  ],
  recommendations: [
    { recommendation: "Prioritize MIDC youth employment outreach this week.", reason: "Youth has the highest support growth and clear issue ownership gap.", expectedVoteImpact: 4200, confidence: 62, actionLabel: "Create Outreach Campaign" },
    { recommendation: "Send Uday Sangle to Pangri for irrigation evidence capture.", reason: "Farmer persuasion clusters show strong opportunity and medium confidence.", expectedVoteImpact: 1700, confidence: 58, actionLabel: "Create Village Visit" },
    { recommendation: "Assign a cooperative influence mapping task in Musalgaon.", reason: "Vote-loss risk is critical and connected to opponent movement.", expectedVoteImpact: 1500, confidence: 50, actionLabel: "Create Volunteer Task" },
    { recommendation: "Launch women-led issue forums in Dubere.", reason: "Women voters are high-value growth targets with SHG relationship openings.", expectedVoteImpact: 900, confidence: 54, actionLabel: "Create Listening Session" }
  ]
};
