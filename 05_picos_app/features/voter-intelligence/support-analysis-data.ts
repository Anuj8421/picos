import type { SupportAnalysisData } from "./types";

export const supportAnalysisData: SupportAnalysisData = {
  overview: [
    { label: "Supporters", value: "91.4K", trend: "Up", change: 6, confidence: 52 },
    { label: "Opponents", value: "72.8K", trend: "Down", change: -2, confidence: 49 },
    { label: "Neutral", value: "41.6K", trend: "Stable", change: 1, confidence: 47 },
    { label: "Persuadable", value: "31.7K", trend: "Up", change: 12, confidence: 51 },
    { label: "Unknown", value: "18.9K", trend: "Down", change: -4, confidence: 43 },
    { label: "Expected Votes", value: "101.2K", trend: "Up", change: 8, confidence: 50 },
    { label: "Potential Votes", value: "118.6K", trend: "Up", change: 13, confidence: 49 },
    { label: "At-Risk Votes", value: "9.8K", trend: "Down", change: -3, confidence: 46 },
    { label: "Net Support Score", value: "+18.6K", trend: "Up", change: 9, confidence: 48 }
  ],
  score: {
    currentSupport: 42,
    likelySupport: 47,
    potentialSupport: 55,
    expectedVoteShare: 43,
    expectedTurnout: 68,
    winProbability: 38,
    confidenceScore: 50,
    trend: "Up",
    monthly: 3,
    quarterly: 6,
    yearly: 11
  },
  distribution: [
    { status: "Support", share: 36, voters: 91400, movement: 6 },
    { status: "Opposition", share: 29, voters: 72800, movement: -2 },
    { status: "Neutral", share: 16, voters: 41600, movement: 1 },
    { status: "Persuadable", share: 12, voters: 31700, movement: 12 },
    { status: "Unknown", share: 7, voters: 18900, movement: -4 }
  ],
  communities: [
    { community: "Youth", currentSupport: 58, likelySupport: 63, potentialSupport: 69, trend: "Up", confidence: 54, priority: "Critical" },
    { community: "Farmers", currentSupport: 51, likelySupport: 56, potentialSupport: 63, trend: "Stable", confidence: 49, priority: "Critical" },
    { community: "Women", currentSupport: 57, likelySupport: 61, potentialSupport: 66, trend: "Up", confidence: 50, priority: "High" },
    { community: "Maratha", currentSupport: 57, likelySupport: 60, potentialSupport: 64, trend: "Stable", confidence: 48, priority: "High" },
    { community: "Mali", currentSupport: 49, likelySupport: 54, potentialSupport: 60, trend: "Up", confidence: 46, priority: "Medium" },
    { community: "SC", currentSupport: 45, likelySupport: 51, potentialSupport: 58, trend: "Up", confidence: 44, priority: "High" },
    { community: "Business", currentSupport: 52, likelySupport: 55, potentialSupport: 59, trend: "Stable", confidence: 45, priority: "Medium" },
    { community: "Cooperative Members", currentSupport: 43, likelySupport: 46, potentialSupport: 52, trend: "Down", confidence: 47, priority: "Critical" }
  ],
  villages: [
    { village: "Sinnar Town", currentSupport: 52, potentialSupport: 66, expectedGain: 3500, risk: 41, priority: "Critical", trend: "Up" },
    { village: "Pangri", currentSupport: 51, potentialSupport: 63, expectedGain: 2100, risk: 58, priority: "High", trend: "Up" },
    { village: "Musalgaon", currentSupport: 48, potentialSupport: 59, expectedGain: 1900, risk: 66, priority: "Critical", trend: "Down" },
    { village: "Dubere", currentSupport: 50, potentialSupport: 59, expectedGain: 850, risk: 54, priority: "Medium", trend: "Stable" },
    { village: "Devpur", currentSupport: 47, potentialSupport: 56, expectedGain: 720, risk: 71, priority: "High", trend: "Down" },
    { village: "Wavi", currentSupport: 54, potentialSupport: 60, expectedGain: 540, risk: 25, priority: "Low", trend: "Stable" }
  ],
  households: {
    supportiveHouseholds: 21800,
    neutralHouseholds: 10400,
    persuadableHouseholds: 8600,
    opposingHouseholds: 13400,
    highInfluenceHouseholds: 2400,
    atRiskHouseholds: 3100
  },
  influencers: {
    supportiveInfluencers: 132,
    neutralInfluencers: 118,
    opposingInfluencers: 96,
    persuadableInfluencers: 74,
    totalReach: 84600,
    expectedVoteImpact: 9350
  },
  segments: [
    { segment: "Youth", support: 58, persuasionPotential: 82, turnout: 58, expectedVotes: 3200, priority: "Critical" },
    { segment: "Farmers", support: 51, persuasionPotential: 79, turnout: 62, expectedVotes: 2800, priority: "Critical" },
    { segment: "Women", support: 57, persuasionPotential: 72, turnout: 64, expectedVotes: 2100, priority: "High" },
    { segment: "First-Time Voters", support: 56, persuasionPotential: 76, turnout: 54, expectedVotes: 1700, priority: "High" },
    { segment: "Cooperative Members", support: 43, persuasionPotential: 60, turnout: 67, expectedVotes: 1600, priority: "Critical" },
    { segment: "Industrial Workers", support: 47, persuasionPotential: 68, turnout: 55, expectedVotes: 1050, priority: "High" }
  ],
  heatMap: [
    { id: "support-sinnar-102", village: "Sinnar Town", booth: "Booth 102", community: "Youth", supportStrength: 52, oppositionStrength: 18, persuasionOpportunity: 82, turnoutOpportunity: 64, villageSupport: 52, boothSupport: 54, priority: "Critical", x: 50, y: 23 },
    { id: "support-pangri-044", village: "Pangri", booth: "Booth 044", community: "Farmers", supportStrength: 51, oppositionStrength: 22, persuasionOpportunity: 76, turnoutOpportunity: 73, villageSupport: 51, boothSupport: 50, priority: "High", x: 31, y: 43 },
    { id: "support-musalgaon-067", village: "Musalgaon", booth: "Booth 067", community: "Cooperative Members", supportStrength: 48, oppositionStrength: 31, persuasionOpportunity: 73, turnoutOpportunity: 66, villageSupport: 48, boothSupport: 45, priority: "Critical", x: 68, y: 38 },
    { id: "support-dubere-071", village: "Dubere", booth: "Booth 071", community: "Women", supportStrength: 50, oppositionStrength: 21, persuasionOpportunity: 62, turnoutOpportunity: 59, villageSupport: 50, boothSupport: 49, priority: "Medium", x: 42, y: 68 },
    { id: "support-devpur-086", village: "Devpur", booth: "Booth 086", community: "SC", supportStrength: 47, oppositionStrength: 25, persuasionOpportunity: 64, turnoutOpportunity: 71, villageSupport: 47, boothSupport: 46, priority: "High", x: 74, y: 71 },
    { id: "support-wavi-093", village: "Wavi", booth: "Booth 093", community: "Maratha", supportStrength: 54, oppositionStrength: 16, persuasionOpportunity: 43, turnoutOpportunity: 34, villageSupport: 54, boothSupport: 56, priority: "Low", x: 23, y: 76 }
  ],
  movement: [
    { change: "Youth support moved upward after employment circuit planning", supportGained: 1200, supportLost: 180, communitiesMoving: "Youth, Students", villagesMoving: "Sinnar Town, Wavi", influencersMoving: "Youth sports organizers", week: "Week 23", priority: "High" },
    { change: "Musalgaon support softened around cooperative pressure", supportGained: 260, supportLost: 980, communitiesMoving: "Farmers, Cooperative Members", villagesMoving: "Musalgaon", influencersMoving: "Cooperative office bearers", week: "Week 23", priority: "Critical" },
    { change: "Women SHG trust forum improved Dubere sentiment", supportGained: 620, supportLost: 120, communitiesMoving: "Women, SHG", villagesMoving: "Dubere, Devpur", influencersMoving: "SHG cluster conveners", week: "Week 22", priority: "Medium" },
    { change: "Farmer irrigation proof remains pending", supportGained: 420, supportLost: 360, communitiesMoving: "Farmers", villagesMoving: "Pangri", influencersMoving: "Farmer group captains", week: "Week 22", priority: "High" }
  ],
  gains: [
    { community: "Youth", village: "Sinnar Town", segment: "Youth", influencer: "Youth sports organizers", expectedVotes: 3200, reason: "Jobs and sports message has high conversion probability", priority: "Critical", status: "Active" },
    { community: "Farmers", village: "Pangri", segment: "Farmers", influencer: "Farmer group captains", expectedVotes: 2100, reason: "Irrigation issue can be owned through evidence visits", priority: "High", status: "Planning" },
    { community: "Women", village: "Dubere", segment: "Self-Help Groups", influencer: "SHG cluster conveners", expectedVotes: 980, reason: "Trust forums can convert household-level support", priority: "High", status: "Planning" },
    { community: "SC", village: "Devpur", segment: "Benefits-pending households", influencer: "Clinic and health volunteers", expectedVotes: 720, reason: "Benefits verification can create visible help", priority: "Medium", status: "Identified" }
  ],
  losses: [
    { community: "Farmers", village: "Musalgaon", segment: "Cooperative Members", influencer: "Cooperative office bearers", potentialVoteLoss: 1600, reason: "Opponent network consolidation and low relationship strength", severity: "Critical", status: "At Risk" },
    { community: "Youth", village: "Sinnar Town", segment: "Youth", influencer: "Youth sports organizers", potentialVoteLoss: 1400, reason: "Support may not convert without turnout confirmation", severity: "High", status: "Active" },
    { community: "Farmers", village: "Pangri", segment: "Farmers", influencer: "Farmer group captains", potentialVoteLoss: 1200, reason: "Irrigation proof not yet documented", severity: "High", status: "Open" },
    { community: "Industrial Workers", village: "Sinnar Town", segment: "Industrial Workers", influencer: "Worker anchors pending", potentialVoteLoss: 900, reason: "Negative sentiment around jobs and transport", severity: "High", status: "Planning" }
  ],
  turnoutImpact: {
    supportersLikelyToVote: 62400,
    supportersUnlikelyToVote: 14800,
    potentialTurnoutGain: 7800,
    expectedVoteImpact: 5300,
    mobilizationOpportunity: 11200
  },
  persuasionImpact: {
    currentSupport: 42,
    potentialSupport: 55,
    expectedConversion: 12400,
    expectedVotes: 18900,
    successProbability: 58
  },
  winProbability: [
    { scenario: "Current Scenario", expectedMargin: -23800, expectedVoteShare: 43, confidence: 50, winProbability: 38 },
    { scenario: "Best Case", expectedMargin: 4200, expectedVoteShare: 51, confidence: 42, winProbability: 58 },
    { scenario: "Likely Case", expectedMargin: -11200, expectedVoteShare: 46, confidence: 50, winProbability: 44 },
    { scenario: "Worst Case", expectedMargin: -40800, expectedVoteShare: 39, confidence: 47, winProbability: 24 }
  ],
  scenarios: [
    { scenario: "If Maratha support increases 5%", expectedVotes: 1300, marginImpact: 2600, winProbability: 40, priority: "High" },
    { scenario: "If Youth support increases 10%", expectedVotes: 3200, marginImpact: 6400, winProbability: 43, priority: "Critical" },
    { scenario: "If turnout increases 3%", expectedVotes: 5300, marginImpact: 10600, winProbability: 47, priority: "Critical" },
    { scenario: "If Musalgaon shifts 6 points", expectedVotes: 1900, marginImpact: 3800, winProbability: 41, priority: "Critical" },
    { scenario: "If farmer captains support publicly", expectedVotes: 1800, marginImpact: 3600, winProbability: 41, priority: "High" }
  ],
  recommendations: [
    { recommendation: "Defend Musalgaon immediately while building a neutral cooperative bridge.", reason: "The highest support-loss risk sits in a high-influence farmer network.", confidence: 48, expectedVotes: 1600, priority: "Critical", actionLabel: "Create Support Campaign" },
    { recommendation: "Convert Youth support into confirmed turnout before expanding messages.", reason: "Youth has the largest gain potential but low turnout confidence.", confidence: 56, expectedVotes: 3200, priority: "Critical", actionLabel: "Create Turnout Campaign" },
    { recommendation: "Use irrigation evidence to move farmer support from likely to firm.", reason: "Farmer support is reachable but not yet proof-backed.", confidence: 53, expectedVotes: 2800, priority: "Critical", actionLabel: "Create Persuasion Campaign" },
    { recommendation: "Grow women support through SHG-hosted issue forums.", reason: "Women support is positive and can be organized through trusted conveners.", confidence: 50, expectedVotes: 2100, priority: "High", actionLabel: "Assign Outreach Team" },
    { recommendation: "Prepare a weekly support report for Uday Sangle.", reason: "This screen should drive daily decisions and weekly course correction.", confidence: 55, expectedVotes: 5300, priority: "High", actionLabel: "Generate Weekly Strategy" }
  ],
  tasks: [
    { initiative: "Musalgaon support defense", openTasks: 8, pendingTasks: 6, overdueTasks: 2, completedTasks: 1, highestPriorityTask: "Map neutral cooperative bridge" },
    { initiative: "Youth turnout confirmation", openTasks: 10, pendingTasks: 7, overdueTasks: 1, completedTasks: 4, highestPriorityTask: "Confirm youth reminder chain owners" },
    { initiative: "Farmer irrigation proof", openTasks: 9, pendingTasks: 5, overdueTasks: 2, completedTasks: 3, highestPriorityTask: "Collect irrigation evidence packet" },
    { initiative: "Women SHG support growth", openTasks: 6, pendingTasks: 4, overdueTasks: 0, completedTasks: 5, highestPriorityTask: "Finalize Dubere forum invite list" },
    { initiative: "Weekly support reporting", openTasks: 4, pendingTasks: 3, overdueTasks: 0, completedTasks: 2, highestPriorityTask: "Prepare support movement brief" }
  ]
};
