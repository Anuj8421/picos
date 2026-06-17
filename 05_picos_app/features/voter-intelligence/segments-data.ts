import type { SegmentIntelligenceData } from "./types";

export const segmentIntelligenceData: SegmentIntelligenceData = {
  overview: [
    { label: "Total Segments", value: "14", trend: "Stable", change: 0, confidence: 54 },
    { label: "Supportive Segments", value: "4", trend: "Up", change: 6, confidence: 52 },
    { label: "Opposing Segments", value: "3", trend: "Down", change: -3, confidence: 47 },
    { label: "Persuadable Segments", value: "6", trend: "Up", change: 9, confidence: 50 },
    { label: "High Value Segments", value: "5", trend: "Up", change: 11, confidence: 53 },
    { label: "Growth Segments", value: "4", trend: "Up", change: 13, confidence: 49 },
    { label: "Risk Segments", value: "3", trend: "Up", change: 5, confidence: 46 },
    { label: "Expected Vote Gain", value: "12.4K", trend: "Up", change: 15, confidence: 51 }
  ],
  command: [
    { id: "seg-youth", segmentName: "Youth", estimatedVoters: 38600, supportScore: 58, sentiment: "Positive", turnout: 58, persuasionPotential: 82, voteValue: 3200, priority: "Critical", status: "Active", ageGroup: "18-29", gender: "Mixed", occupation: "Students, job seekers, workers" },
    { id: "seg-women", segmentName: "Women", estimatedVoters: 78600, supportScore: 57, sentiment: "Positive", turnout: 64, persuasionPotential: 72, voteValue: 2100, priority: "High", status: "Planning", ageGroup: "18+", gender: "Women", occupation: "SHG, homemakers, professionals" },
    { id: "seg-farmers", segmentName: "Farmers", estimatedVoters: 52400, supportScore: 51, sentiment: "Neutral", turnout: 62, persuasionPotential: 79, voteValue: 2800, priority: "Critical", status: "Active", ageGroup: "26-65", gender: "Mixed", occupation: "Farmers and farm workers" },
    { id: "seg-business", segmentName: "Business Owners", estimatedVoters: 9200, supportScore: 52, sentiment: "Neutral", turnout: 66, persuasionPotential: 55, voteValue: 650, priority: "Medium", status: "Monitoring", ageGroup: "30-60", gender: "Mixed", occupation: "Small traders, business owners" },
    { id: "seg-govt", segmentName: "Government Employees", estimatedVoters: 6400, supportScore: 49, sentiment: "Neutral", turnout: 72, persuasionPotential: 48, voteValue: 420, priority: "Low", status: "Monitoring", ageGroup: "30-60", gender: "Mixed", occupation: "Government service" },
    { id: "seg-teachers", segmentName: "Teachers", estimatedVoters: 3100, supportScore: 54, sentiment: "Neutral", turnout: 70, persuasionPotential: 62, voteValue: 520, priority: "Medium", status: "Planning", ageGroup: "28-62", gender: "Mixed", occupation: "Teachers and education workers" },
    { id: "seg-seniors", segmentName: "Senior Citizens", estimatedVoters: 8100, supportScore: 59, sentiment: "Positive", turnout: 52, persuasionPotential: 44, voteValue: 720, priority: "High", status: "At Risk", ageGroup: "60+", gender: "Mixed", occupation: "Retired and senior households" },
    { id: "seg-first-time", segmentName: "First-Time Voters", estimatedVoters: 6200, supportScore: 56, sentiment: "Positive", turnout: 54, persuasionPotential: 76, voteValue: 1700, priority: "High", status: "Active", ageGroup: "18-22", gender: "Mixed", occupation: "Students, first job seekers" },
    { id: "seg-traders", segmentName: "Small Traders", estimatedVoters: 7600, supportScore: 50, sentiment: "Neutral", turnout: 63, persuasionPotential: 52, voteValue: 480, priority: "Medium", status: "Monitoring", ageGroup: "28-60", gender: "Mixed", occupation: "Retail and market traders" },
    { id: "seg-industrial", segmentName: "Industrial Workers", estimatedVoters: 11800, supportScore: 47, sentiment: "Negative", turnout: 55, persuasionPotential: 68, voteValue: 1050, priority: "High", status: "Planning", ageGroup: "22-50", gender: "Mixed", occupation: "MIDC and industrial workers" },
    { id: "seg-professionals", segmentName: "Professionals", estimatedVoters: 5400, supportScore: 53, sentiment: "Neutral", turnout: 68, persuasionPotential: 51, voteValue: 360, priority: "Low", status: "Dormant", ageGroup: "25-55", gender: "Mixed", occupation: "Doctors, engineers, consultants" },
    { id: "seg-students", segmentName: "Students", estimatedVoters: 8400, supportScore: 60, sentiment: "Positive", turnout: 50, persuasionPotential: 74, voteValue: 1100, priority: "High", status: "Active", ageGroup: "18-25", gender: "Mixed", occupation: "Students" },
    { id: "seg-shg", segmentName: "Self-Help Groups", estimatedVoters: 14100, supportScore: 61, sentiment: "Positive", turnout: 58, persuasionPotential: 70, voteValue: 980, priority: "High", status: "Planning", ageGroup: "25-60", gender: "Women", occupation: "SHG members" },
    { id: "seg-coop", segmentName: "Cooperative Members", estimatedVoters: 19200, supportScore: 43, sentiment: "Negative", turnout: 67, persuasionPotential: 60, voteValue: 1600, priority: "Critical", status: "At Risk", ageGroup: "30-65", gender: "Mixed", occupation: "Cooperative-linked farmers and staff" }
  ],
  matrix: [
    { segment: "Youth", support: 58, opposition: 14, neutral: 18, persuadable: 10, turnout: 58, influence: 72, voteValue: 3200 },
    { segment: "Women", support: 57, opposition: 13, neutral: 19, persuadable: 11, turnout: 64, influence: 66, voteValue: 2100 },
    { segment: "Farmers", support: 51, opposition: 22, neutral: 16, persuadable: 11, turnout: 62, influence: 78, voteValue: 2800 },
    { segment: "Business Owners", support: 52, opposition: 18, neutral: 21, persuadable: 9, turnout: 66, influence: 55, voteValue: 650 },
    { segment: "Government Employees", support: 49, opposition: 20, neutral: 24, persuadable: 7, turnout: 72, influence: 43, voteValue: 420 },
    { segment: "Teachers", support: 54, opposition: 15, neutral: 22, persuadable: 9, turnout: 70, influence: 62, voteValue: 520 },
    { segment: "Senior Citizens", support: 59, opposition: 12, neutral: 21, persuadable: 8, turnout: 52, influence: 44, voteValue: 720 },
    { segment: "First-Time Voters", support: 56, opposition: 12, neutral: 20, persuadable: 12, turnout: 54, influence: 58, voteValue: 1700 },
    { segment: "Small Traders", support: 50, opposition: 20, neutral: 22, persuadable: 8, turnout: 63, influence: 50, voteValue: 480 },
    { segment: "Industrial Workers", support: 47, opposition: 25, neutral: 16, persuadable: 12, turnout: 55, influence: 57, voteValue: 1050 },
    { segment: "Professionals", support: 53, opposition: 16, neutral: 24, persuadable: 7, turnout: 68, influence: 46, voteValue: 360 },
    { segment: "Students", support: 60, opposition: 10, neutral: 20, persuadable: 10, turnout: 50, influence: 62, voteValue: 1100 },
    { segment: "Self-Help Groups", support: 61, opposition: 11, neutral: 18, persuadable: 10, turnout: 58, influence: 67, voteValue: 980 },
    { segment: "Cooperative Members", support: 43, opposition: 31, neutral: 16, persuadable: 10, turnout: 67, influence: 86, voteValue: 1600 }
  ],
  highValue: [
    { segment: "Youth", currentSupport: 58, potentialSupport: 69, expectedVoteGain: 3200, priority: "Critical", recommendedAction: "Run jobs, sports, and first-time voter activation circuit", owner: "Youth Outreach", status: "Active" },
    { segment: "Farmers", currentSupport: 51, potentialSupport: 63, expectedVoteGain: 2800, priority: "Critical", recommendedAction: "Irrigation evidence campaign with farmer captains", owner: "Farmer Cell", status: "Active" },
    { segment: "Women", currentSupport: 57, potentialSupport: 66, expectedVoteGain: 2100, priority: "High", recommendedAction: "SHG and water-healthcare trust forums", owner: "Women Outreach", status: "Planning" },
    { segment: "Cooperative Members", currentSupport: 43, potentialSupport: 52, expectedVoteGain: 1600, priority: "Critical", recommendedAction: "Neutral bridge mapping before direct outreach", owner: "Political Desk", status: "At Risk" },
    { segment: "First-Time Voters", currentSupport: 56, potentialSupport: 68, expectedVoteGain: 1700, priority: "High", recommendedAction: "Voting guidance plus youth reminder network", owner: "Youth Outreach", status: "Active" }
  ],
  demographics: [
    { segment: "Youth", age: "18-29", gender: "Mixed", occupation: "Students, job seekers, workers", income: "Low to emerging", education: "College, ITI, graduate", communityMix: "Maratha, OBC, SC, urban youth", villageDistribution: "Sinnar Town, Wavi, Dubere", boothDistribution: "Booths 102, 093, 071" },
    { segment: "Women", age: "18+", gender: "Women", occupation: "SHG, homemakers, workers, professionals", income: "Mixed", education: "Mixed", communityMix: "Women across Maratha, OBC, SC, Mali", villageDistribution: "Dubere, Devpur, Sinnar Town", boothDistribution: "Booths 071, 086, 102" },
    { segment: "Farmers", age: "26-65", gender: "Mixed", occupation: "Farmers, farm workers", income: "Agriculture dependent", education: "Mixed", communityMix: "Maratha, OBC, Vanjari, Dhangar", villageDistribution: "Pangri, Musalgaon, Devpur", boothDistribution: "Booths 044, 067, 086" },
    { segment: "Cooperative Members", age: "30-65", gender: "Mixed", occupation: "Cooperative-linked farmers and staff", income: "Agriculture/cooperative linked", education: "Mixed", communityMix: "Farmers, Maratha, OBC", villageDistribution: "Musalgaon, Pangri", boothDistribution: "Booths 067, 044" },
    { segment: "Industrial Workers", age: "22-50", gender: "Mixed", occupation: "MIDC and industrial workers", income: "Wage and lower-middle", education: "ITI, high school, diploma", communityMix: "Youth, OBC, SC, migrants", villageDistribution: "Sinnar Town, industrial belt", boothDistribution: "Booths 102, 071" }
  ],
  support: [
    { segment: "Youth", strongSupporters: 31, weakSupporters: 27, neutral: 18, opposition: 14, persuadable: 10, unknown: 0 },
    { segment: "Women", strongSupporters: 29, weakSupporters: 28, neutral: 19, opposition: 13, persuadable: 11, unknown: 0 },
    { segment: "Farmers", strongSupporters: 24, weakSupporters: 27, neutral: 16, opposition: 22, persuadable: 11, unknown: 0 },
    { segment: "Cooperative Members", strongSupporters: 17, weakSupporters: 26, neutral: 16, opposition: 31, persuadable: 10, unknown: 0 },
    { segment: "First-Time Voters", strongSupporters: 27, weakSupporters: 29, neutral: 20, opposition: 12, persuadable: 12, unknown: 0 },
    { segment: "Industrial Workers", strongSupporters: 20, weakSupporters: 27, neutral: 16, opposition: 25, persuadable: 12, unknown: 0 }
  ],
  sentiment: [
    { segment: "Youth", positive: 58, neutral: 28, negative: 14, trend: "Up", confidence: 54, historicalMovement: 8, monthly: 4, quarterly: 7, yearly: 11 },
    { segment: "Women", positive: 57, neutral: 30, negative: 13, trend: "Up", confidence: 50, historicalMovement: 5, monthly: 2, quarterly: 6, yearly: 9 },
    { segment: "Farmers", positive: 44, neutral: 34, negative: 22, trend: "Stable", confidence: 49, historicalMovement: 1, monthly: -1, quarterly: 2, yearly: 4 },
    { segment: "Cooperative Members", positive: 36, neutral: 33, negative: 31, trend: "Down", confidence: 47, historicalMovement: -5, monthly: -3, quarterly: -4, yearly: -7 },
    { segment: "Industrial Workers", positive: 41, neutral: 34, negative: 25, trend: "Down", confidence: 45, historicalMovement: -3, monthly: -2, quarterly: -1, yearly: 1 },
    { segment: "Self-Help Groups", positive: 61, neutral: 28, negative: 11, trend: "Up", confidence: 52, historicalMovement: 6, monthly: 3, quarterly: 6, yearly: 8 }
  ],
  issues: [
    { segment: "Youth", topIssues: "Jobs, sports, education, exam support", severity: "Critical", politicalImpact: 82 },
    { segment: "Farmers", topIssues: "Water, irrigation, MSP, crop prices", severity: "Critical", politicalImpact: 79 },
    { segment: "Women", topIssues: "Safety, healthcare, water, SHG support", severity: "High", politicalImpact: 72 },
    { segment: "Business Owners", topIssues: "Infrastructure, taxes, licensing, market access", severity: "Medium", politicalImpact: 55 },
    { segment: "Industrial Workers", topIssues: "Jobs, wages, transport, housing", severity: "High", politicalImpact: 68 },
    { segment: "Cooperative Members", topIssues: "Cooperative access, agriculture, patronage pressure", severity: "Critical", politicalImpact: 76 }
  ],
  influencers: [
    { segment: "Youth", topInfluencers: "Youth sports organizers, students, coaching centers", influenceScore: 72, alignment: "Supportive", relationshipStrength: 74, expectedVoteImpact: 1450 },
    { segment: "Farmers", topInfluencers: "Farmer group captains, cooperative office bearers", influenceScore: 78, alignment: "Mixed", relationshipStrength: 58, expectedVoteImpact: 1800 },
    { segment: "Women", topInfluencers: "SHG cluster conveners, clinic volunteers", influenceScore: 66, alignment: "Persuadable", relationshipStrength: 55, expectedVoteImpact: 900 },
    { segment: "Teachers", topInfluencers: "Local teachers network", influenceScore: 62, alignment: "Neutral", relationshipStrength: 53, expectedVoteImpact: 520 },
    { segment: "Cooperative Members", topInfluencers: "Cooperative office bearers", influenceScore: 86, alignment: "Opponent-leaning", relationshipStrength: 42, expectedVoteImpact: 1600 }
  ],
  geography: [
    { segment: "Youth", villageDistribution: "Sinnar Town, Wavi, Dubere", boothDistribution: "102, 093, 071", clusterAnalysis: "Urban youth and first-time voter cluster", influenceZones: "Sports, coaching, college, MIDC", x: 50, y: 24 },
    { segment: "Farmers", villageDistribution: "Pangri, Musalgaon, Devpur", boothDistribution: "044, 067, 086", clusterAnalysis: "Irrigation and cooperative linked rural cluster", influenceZones: "Farmer groups, irrigation committees", x: 31, y: 43 },
    { segment: "Women", villageDistribution: "Dubere, Devpur, Sinnar Town", boothDistribution: "071, 086, 102", clusterAnalysis: "SHG and household service cluster", influenceZones: "SHG, health volunteers, water issue forums", x: 42, y: 68 },
    { segment: "Cooperative Members", villageDistribution: "Musalgaon, Pangri", boothDistribution: "067, 044", clusterAnalysis: "High influence cooperative network", influenceZones: "Cooperative offices, farmer captains", x: 68, y: 38 },
    { segment: "Industrial Workers", villageDistribution: "Sinnar Town, industrial belt", boothDistribution: "102, 071", clusterAnalysis: "Workplace and transport route cluster", influenceZones: "MIDC, worker routes, local rooms", x: 57, y: 54 }
  ],
  persuasion: [
    { segment: "Youth", currentSupport: 58, potentialSupport: 69, expectedGain: 3200, conversionProbability: 64, priority: "Critical", recommendedMessage: "Jobs, sports, youth opportunity, accessible leadership", recommendedAction: "Launch youth jobs and sports circuit" },
    { segment: "Farmers", currentSupport: 51, potentialSupport: 63, expectedGain: 2800, conversionProbability: 59, priority: "Critical", recommendedMessage: "Irrigation proof, farmer respect, issue ownership", recommendedAction: "Run farmer evidence visits" },
    { segment: "Women", currentSupport: 57, potentialSupport: 66, expectedGain: 2100, conversionProbability: 62, priority: "High", recommendedMessage: "Water, healthcare, safety, SHG support", recommendedAction: "Create women issue forums" },
    { segment: "Cooperative Members", currentSupport: 43, potentialSupport: 52, expectedGain: 1600, conversionProbability: 43, priority: "Critical", recommendedMessage: "Neutral trust, agriculture, non-confrontational engagement", recommendedAction: "Map neutral bridge before outreach" },
    { segment: "Industrial Workers", currentSupport: 47, potentialSupport: 58, expectedGain: 1050, conversionProbability: 52, priority: "High", recommendedMessage: "Jobs, wages, transport, housing", recommendedAction: "Worker listening round through local anchors" }
  ],
  turnout: [
    { segment: "Youth", expectedTurnout: 58, targetTurnout: 72, turnoutGap: 14, mobilizationPotential: 1900, expectedVoteGain: 1400, priority: "Critical" },
    { segment: "Women", expectedTurnout: 64, targetTurnout: 72, turnoutGap: 8, mobilizationPotential: 1500, expectedVoteGain: 900, priority: "High" },
    { segment: "Farmers", expectedTurnout: 62, targetTurnout: 75, turnoutGap: 13, mobilizationPotential: 2500, expectedVoteGain: 1600, priority: "Critical" },
    { segment: "Senior Citizens", expectedTurnout: 52, targetTurnout: 66, turnoutGap: 14, mobilizationPotential: 720, expectedVoteGain: 520, priority: "High" },
    { segment: "First-Time Voters", expectedTurnout: 54, targetTurnout: 68, turnoutGap: 14, mobilizationPotential: 1700, expectedVoteGain: 1100, priority: "High" },
    { segment: "Cooperative Members", expectedTurnout: 67, targetTurnout: 72, turnoutGap: 5, mobilizationPotential: 900, expectedVoteGain: 360, priority: "Medium" }
  ],
  messages: [
    { messageTheme: "Jobs", targetSegment: "Youth", expectedImpact: 3200, effectiveness: 64, status: "Ready" },
    { messageTheme: "Farmers", targetSegment: "Farmers", expectedImpact: 2800, effectiveness: 59, status: "Evidence needed" },
    { messageTheme: "Women", targetSegment: "Women", expectedImpact: 2100, effectiveness: 62, status: "Planning" },
    { messageTheme: "Infrastructure", targetSegment: "Business Owners", expectedImpact: 650, effectiveness: 46, status: "Monitoring" },
    { messageTheme: "Leadership", targetSegment: "Teachers", expectedImpact: 520, effectiveness: 48, status: "Draft" },
    { messageTheme: "Trust", targetSegment: "Cooperative Members", expectedImpact: 1600, effectiveness: 43, status: "Bridge first" },
    { messageTheme: "Governance", targetSegment: "Government Employees", expectedImpact: 420, effectiveness: 41, status: "Low touch" },
    { messageTheme: "Development", targetSegment: "Industrial Workers", expectedImpact: 1050, effectiveness: 52, status: "Needs anchors" }
  ],
  campaigns: [
    { campaign: "Youth Jobs Circuit", targetSegment: "Youth", reach: 8600, engagement: 62, impact: 72, expectedVotes: 1900, status: "Active", priority: "Critical" },
    { campaign: "Irrigation Evidence Visits", targetSegment: "Farmers", reach: 10400, engagement: 55, impact: 79, expectedVotes: 1800, status: "Active", priority: "Critical" },
    { campaign: "SHG Trust Forums", targetSegment: "Women", reach: 5200, engagement: 58, impact: 66, expectedVotes: 980, status: "Planning", priority: "High" },
    { campaign: "First-Time Voter Guidance", targetSegment: "First-Time Voters", reach: 6200, engagement: 49, impact: 61, expectedVotes: 1100, status: "Active", priority: "High" },
    { campaign: "Worker Listening Round", targetSegment: "Industrial Workers", reach: 3800, engagement: 38, impact: 52, expectedVotes: 640, status: "Planning", priority: "Medium" }
  ],
  opportunities: [
    { opportunity: "Youth jobs circuit can unlock urban first-time voters", segment: "Youth", expectedVotes: 3200, priority: "Critical", owner: "Youth Outreach", status: "Active", actionPlan: "Sports organizers plus jobs listening sessions" },
    { opportunity: "Farmer irrigation proof can shift rural persuadables", segment: "Farmers", expectedVotes: 2800, priority: "Critical", owner: "Farmer Cell", status: "Active", actionPlan: "Evidence visit with farmer captains" },
    { opportunity: "Women SHG forums can grow trust in Dubere and Devpur", segment: "Women", expectedVotes: 2100, priority: "High", owner: "Women Outreach", status: "Planning", actionPlan: "SHG conveners host issue forums" },
    { opportunity: "First-time voters need voting guidance and reminders", segment: "First-Time Voters", expectedVotes: 1700, priority: "High", owner: "Youth Outreach", status: "Active", actionPlan: "Booth slip help and WhatsApp reminders" },
    { opportunity: "Industrial worker frustration is reachable through local anchors", segment: "Industrial Workers", expectedVotes: 1050, priority: "High", owner: "Worker Outreach", status: "Planning", actionPlan: "Workplace route listening and transport issues" }
  ],
  risks: [
    { risk: "Cooperative network hardens against campaign", segment: "Cooperative Members", potentialVoteLoss: 1600, severity: "Critical", owner: "Political Desk", mitigation: "Use neutral bridge, avoid direct confrontation", status: "At Risk" },
    { risk: "Youth support fails to convert into turnout", segment: "Youth", potentialVoteLoss: 1400, severity: "High", owner: "Youth Outreach", mitigation: "Reminder chain, event-day volunteers, booth help", status: "Active" },
    { risk: "Farmer frustration remains unowned", segment: "Farmers", potentialVoteLoss: 1800, severity: "Critical", owner: "Farmer Cell", mitigation: "Document issue proof and assign public follow-up owner", status: "Open" },
    { risk: "Industrial worker segment drifts negative", segment: "Industrial Workers", potentialVoteLoss: 900, severity: "High", owner: "Worker Outreach", mitigation: "Local anchor listening round", status: "Planning" }
  ],
  comparisons: [
    { segment: "Youth", support: 58, sentiment: "Positive", issues: "Jobs, sports, education", turnout: 58, persuasion: 82, influence: 72, expectedVotes: 3200 },
    { segment: "Farmers", support: 51, sentiment: "Neutral", issues: "Water, irrigation, MSP", turnout: 62, persuasion: 79, influence: 78, expectedVotes: 2800 },
    { segment: "Women", support: 57, sentiment: "Positive", issues: "Safety, healthcare, water", turnout: 64, persuasion: 72, influence: 66, expectedVotes: 2100 },
    { segment: "Students", support: 60, sentiment: "Positive", issues: "Education, jobs, exam support", turnout: 50, persuasion: 74, influence: 62, expectedVotes: 1100 },
    { segment: "Professionals", support: 53, sentiment: "Neutral", issues: "Governance, infrastructure", turnout: 68, persuasion: 51, influence: 46, expectedVotes: 360 },
    { segment: "Cooperative Members", support: 43, sentiment: "Negative", issues: "Cooperative access, agriculture", turnout: 67, persuasion: 60, influence: 86, expectedVotes: 1600 }
  ],
  recommendations: [
    { recommendation: "Prioritize Youth first: high vote gain, positive sentiment, low turnout risk if unmanaged.", reason: "Youth combines 3.2K gain potential, persuasive jobs messaging, and existing organizer anchors.", confidence: 56, expectedVotes: 3200, priority: "Critical", actionLabel: "Create Segment Campaign" },
    { recommendation: "Treat Farmers as an evidence-led segment, not a message-only segment.", reason: "Irrigation and water concerns require proof capture before support shifts meaningfully.", confidence: 53, expectedVotes: 2800, priority: "Critical", actionLabel: "Create Persuasion Campaign" },
    { recommendation: "Use SHG conveners to turn women support into household follow-up.", reason: "Women segment is supportive but needs trust forums and turnout assistance.", confidence: 50, expectedVotes: 2100, priority: "High", actionLabel: "Assign Outreach Team" },
    { recommendation: "Do not directly push Cooperative Members before neutral bridge mapping.", reason: "Influence is high and sentiment is negative; direct outreach could increase opposition.", confidence: 47, expectedVotes: 1600, priority: "Critical", actionLabel: "Generate Campaign Brief" },
    { recommendation: "Industrial Workers need workplace-route listening, not generic development messaging.", reason: "The segment is negative but reachable through jobs, transport, and local anchors.", confidence: 45, expectedVotes: 1050, priority: "High", actionLabel: "Generate Strategy Document" }
  ],
  tasks: [
    { segment: "Youth", openTasks: 8, pendingTasks: 5, overdueTasks: 1, completedTasks: 4, highestPriorityTask: "Confirm youth jobs circuit anchors" },
    { segment: "Farmers", openTasks: 9, pendingTasks: 6, overdueTasks: 2, completedTasks: 3, highestPriorityTask: "Collect irrigation evidence packet" },
    { segment: "Women", openTasks: 7, pendingTasks: 4, overdueTasks: 0, completedTasks: 5, highestPriorityTask: "Finalize SHG forum invite list" },
    { segment: "Cooperative Members", openTasks: 6, pendingTasks: 5, overdueTasks: 2, completedTasks: 1, highestPriorityTask: "Map neutral bridge and validators" },
    { segment: "First-Time Voters", openTasks: 5, pendingTasks: 4, overdueTasks: 1, completedTasks: 3, highestPriorityTask: "Create booth guidance reminder chain" },
    { segment: "Industrial Workers", openTasks: 4, pendingTasks: 3, overdueTasks: 0, completedTasks: 1, highestPriorityTask: "Identify worker listening anchors" }
  ]
};
