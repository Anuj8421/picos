import type { PersuasionIntelligenceData } from "./types";

export const persuasionIntelligenceData: PersuasionIntelligenceData = {
  overview: [
    { label: "Persuadable Voters", value: "31.7K", trend: "Up", change: 12, confidence: 54 },
    { label: "Persuadable Households", value: "8.6K", trend: "Up", change: 9, confidence: 51 },
    { label: "Persuadable Influencers", value: "74", trend: "Up", change: 14, confidence: 52 },
    { label: "Persuadable Villages", value: "37", trend: "Stable", change: 2, confidence: 49 },
    { label: "Persuadable Communities", value: "5", trend: "Up", change: 6, confidence: 50 },
    { label: "Potential Vote Gain", value: "18.9K", trend: "Up", change: 16, confidence: 53 },
    { label: "Conversion Probability", value: "58%", trend: "Up", change: 7, confidence: 48 },
    { label: "Persuasion Success Rate", value: "42%", trend: "Up", change: 5, confidence: 47 }
  ],
  command: [
    { label: "Total Persuasion Opportunities", value: "42", detail: "Tracked across communities, villages, households, influencers, issues, and campaigns.", tone: "positive" },
    { label: "High Probability", value: "14", detail: "Ready for direct outreach or issue proof within 7 days.", tone: "positive" },
    { label: "Medium Probability", value: "19", detail: "Needs one field validation step before campaign action.", tone: "watch" },
    { label: "Low Probability", value: "9", detail: "Keep under monitoring unless risk rises.", tone: "risk" },
    { label: "Critical Opportunities", value: "6", detail: "Could materially change Sinnar vote math if executed quickly.", tone: "risk" },
    { label: "Top Vote Gain Opportunities", value: "8.7K", detail: "Combined likely gain from the top four ranked interventions.", tone: "positive" },
    { label: "Opportunity Value", value: "18.9K", detail: "Best-case reachable vote gain from current mock field intelligence.", tone: "positive" },
    { label: "Conversion Score", value: "63", detail: "Weighted by probability, influence reach, issue salience, and urgency.", tone: "watch" }
  ],
  opportunities: [
    { opportunity: "Youth employment conversion circuit", target: "Youth voters in Sinnar Town", type: "Community", currentSupport: 52, potentialSupport: 68, expectedVoteGain: 3200, conversionProbability: 64, priority: "Critical", recommendedAction: "Launch youth employment listening circuit with sports organizers as anchors", owner: "Youth Outreach", status: "Planning", issue: "Employment", influencer: "Youth sports organizers" },
    { opportunity: "Farmer irrigation proof visits", target: "Pangri and Musalgaon farmer belt", type: "Issue", currentSupport: 48, potentialSupport: 61, expectedVoteGain: 2800, conversionProbability: 59, priority: "Critical", recommendedAction: "Run irrigation evidence visit with Uday Sangle and farmer captains", owner: "Farmer Cell", status: "Analyzing", issue: "Irrigation", influencer: "Farmer group captains" },
    { opportunity: "Cooperative neutral bridge", target: "Cooperative-linked farmer network", type: "Influencer", currentSupport: 42, potentialSupport: 55, expectedVoteGain: 2600, conversionProbability: 43, priority: "Critical", recommendedAction: "Map neutral bridge before public engagement", owner: "Political Desk", status: "Identified", issue: "Agriculture", influencer: "Cooperative office bearers" },
    { opportunity: "Women SHG trust forums", target: "Women voters in Dubere and Devpur", type: "Community", currentSupport: 55, potentialSupport: 66, expectedVoteGain: 1500, conversionProbability: 62, priority: "High", recommendedAction: "Hold SHG issue forums around water, healthcare, and scheme access", owner: "Women Outreach", status: "Outreach Started", issue: "Water", influencer: "SHG cluster conveners" },
    { opportunity: "Benefits verification camps", target: "SC and Mali household clusters", type: "Household", currentSupport: 49, potentialSupport: 60, expectedVoteGain: 1200, conversionProbability: 57, priority: "High", recommendedAction: "Create benefits verification desks with booth worker follow-up", owner: "Booth Coordination", status: "Planning", issue: "Government Benefits", influencer: "Clinic and health volunteers" },
    { opportunity: "Dubere water issue listening session", target: "Dubere village households", type: "Village", currentSupport: 50, potentialSupport: 59, expectedVoteGain: 850, conversionProbability: 54, priority: "Medium", recommendedAction: "Use a listening session to collect proof, owners, and public follow-up dates", owner: "Village Coordinator", status: "Engaged", issue: "Water", influencer: "SHG cluster conveners" }
  ],
  communities: [
    { community: "Youth", currentSupport: 52, potentialSupport: 68, expectedGain: 3200, mainIssues: "Employment, sports infrastructure, exam support", influencers: "Youth sports organizers", opportunityScore: 82, priority: "Critical" },
    { community: "Farmers", currentSupport: 48, potentialSupport: 61, expectedGain: 2800, mainIssues: "Irrigation, crop prices, cooperative access", influencers: "Farmer group captains", opportunityScore: 79, priority: "Critical" },
    { community: "Women", currentSupport: 55, potentialSupport: 66, expectedGain: 1500, mainIssues: "Water, healthcare, SHG support, safety", influencers: "SHG cluster conveners", opportunityScore: 72, priority: "High" },
    { community: "Maratha", currentSupport: 57, potentialSupport: 64, expectedGain: 1300, mainIssues: "Leadership trust, village development, employment", influencers: "Local teachers network", opportunityScore: 67, priority: "High" },
    { community: "Mali", currentSupport: 49, potentialSupport: 60, expectedGain: 900, mainIssues: "Benefits access, roads, livelihood support", influencers: "Booth worker clusters", opportunityScore: 61, priority: "Medium" },
    { community: "SC", currentSupport: 45, potentialSupport: 58, expectedGain: 700, mainIssues: "Scheme delivery, housing, local grievance resolution", influencers: "Clinic and health volunteers", opportunityScore: 58, priority: "Medium" },
    { community: "Business Community", currentSupport: 51, potentialSupport: 59, expectedGain: 650, mainIssues: "Town services, permissions, market access", influencers: "Trader association contacts", opportunityScore: 55, priority: "Medium" },
    { community: "Dhangar", currentSupport: 50, potentialSupport: 56, expectedGain: 420, mainIssues: "Roads, water, local representation", influencers: "Village elders", opportunityScore: 49, priority: "Low" }
  ],
  villages: [
    { village: "Sinnar Town", currentSupport: 52, potentialSupport: 66, expectedGain: 3500, topIssues: "Employment, services, youth opportunity", influencers: "Youth sports organizers", priority: "Critical", recommendedAction: "Build youth employment and sports-led conversion circuit" },
    { village: "Pangri", currentSupport: 51, potentialSupport: 63, expectedGain: 2100, topIssues: "Irrigation, farmer relief, road follow-up", influencers: "Farmer group captains", priority: "High", recommendedAction: "Candidate visit with irrigation proof capture" },
    { village: "Musalgaon", currentSupport: 48, potentialSupport: 59, expectedGain: 1900, topIssues: "Cooperative influence, agriculture, trust repair", influencers: "Cooperative office bearers", priority: "Critical", recommendedAction: "Use neutral farmer bridge before direct pitch" },
    { village: "Dubere", currentSupport: 50, potentialSupport: 59, expectedGain: 850, topIssues: "Water, SHG support, healthcare", influencers: "SHG cluster conveners", priority: "Medium", recommendedAction: "Run women-led listening session" },
    { village: "Devpur", currentSupport: 47, potentialSupport: 56, expectedGain: 720, topIssues: "Healthcare, benefits, transport", influencers: "Clinic and health volunteers", priority: "Medium", recommendedAction: "Health and benefits verification camp" },
    { village: "Wavi", currentSupport: 54, potentialSupport: 60, expectedGain: 540, topIssues: "Education, youth guidance, village roads", influencers: "Local teachers network", priority: "Low", recommendedAction: "Assign education/youth listening owner" }
  ],
  households: [
    { household: "Pangri irrigation household cluster", village: "Pangri", currentAlignment: "Persuadable", potentialAlignment: "Supportive", influencer: "Farmer group captains", expectedVotes: 180, priority: "High", recommendedVisitor: "Farmer Cell Lead", recommendedAction: "Visit after irrigation evidence is documented" },
    { household: "Dubere SHG household cluster", village: "Dubere", currentAlignment: "Neutral", potentialAlignment: "Supportive", influencer: "SHG cluster conveners", expectedVotes: 140, priority: "Medium", recommendedVisitor: "Women Outreach Lead", recommendedAction: "Invite to SHG issue forum and capture follow-up commitments" },
    { household: "Musalgaon cooperative household cluster", village: "Musalgaon", currentAlignment: "Opponent-leaning", potentialAlignment: "Neutral", influencer: "Cooperative office bearers", expectedVotes: 220, priority: "Critical", recommendedVisitor: "Neutral farmer bridge", recommendedAction: "No public pitch until bridge is confirmed" },
    { household: "Sinnar youth first-time voter cluster", village: "Sinnar Town", currentAlignment: "Neutral", potentialAlignment: "Supportive", influencer: "Youth sports organizers", expectedVotes: 260, priority: "High", recommendedVisitor: "Youth Outreach Team", recommendedAction: "Employment pledge listening and event invite" },
    { household: "Devpur benefits pending cluster", village: "Devpur", currentAlignment: "Persuadable", potentialAlignment: "Supportive", influencer: "Clinic and health volunteers", expectedVotes: 110, priority: "Medium", recommendedVisitor: "Booth Worker", recommendedAction: "Benefits verification and household follow-up" }
  ],
  influencers: [
    { influencer: "Farmer group captains", currentAlignment: "Mixed", potentialAlignment: "Supportive", influenceReach: 4700, expectedVoteGain: 1800, priority: "High", recommendedStrategy: "Give them evidence ownership in irrigation visits" },
    { influencer: "Youth sports organizers", currentAlignment: "Supportive", potentialAlignment: "Campaign Anchor", influenceReach: 3200, expectedVoteGain: 1450, priority: "High", recommendedStrategy: "Convert support into a repeat youth outreach circuit" },
    { influencer: "Cooperative office bearers", currentAlignment: "Opponent-leaning", potentialAlignment: "Neutral", influenceReach: 6100, expectedVoteGain: 2600, priority: "Critical", recommendedStrategy: "Engage through a trusted neutral farmer bridge" },
    { influencer: "SHG cluster conveners", currentAlignment: "Persuadable", potentialAlignment: "Supportive", influenceReach: 2400, expectedVoteGain: 900, priority: "Medium", recommendedStrategy: "Let them host women issue forums and follow-up desks" },
    { influencer: "Local teachers network", currentAlignment: "Neutral", potentialAlignment: "Credible validator", influenceReach: 2100, expectedVoteGain: 650, priority: "Medium", recommendedStrategy: "Use education and career guidance sessions as low-risk entry" }
  ],
  issues: [
    { issue: "Employment", affectedVoters: 11800, affectedVillages: "Sinnar Town, Wavi, Dubere", affectedCommunities: "Youth, Maratha, Women", conversionPotential: 3200, priority: "Critical" },
    { issue: "Irrigation", affectedVoters: 10400, affectedVillages: "Pangri, Musalgaon", affectedCommunities: "Farmers, Maratha", conversionPotential: 2800, priority: "Critical" },
    { issue: "Water", affectedVoters: 7200, affectedVillages: "Dubere, Devpur", affectedCommunities: "Women, Farmers", conversionPotential: 1500, priority: "High" },
    { issue: "Government Benefits", affectedVoters: 5100, affectedVillages: "Devpur, Wavi", affectedCommunities: "SC, Mali, Women", conversionPotential: 1200, priority: "High" },
    { issue: "Agriculture", affectedVoters: 9600, affectedVillages: "Pangri, Musalgaon, Devpur", affectedCommunities: "Farmers", conversionPotential: 1600, priority: "High" },
    { issue: "Healthcare", affectedVoters: 4300, affectedVillages: "Devpur, Dubere", affectedCommunities: "Women, Senior voters", conversionPotential: 720, priority: "Medium" },
    { issue: "Roads", affectedVoters: 3900, affectedVillages: "Wavi, Pangri", affectedCommunities: "Farmers, Youth", conversionPotential: 540, priority: "Medium" },
    { issue: "Education", affectedVoters: 3100, affectedVillages: "Wavi, Sinnar Town", affectedCommunities: "Youth, Parents", conversionPotential: 480, priority: "Low" }
  ],
  messages: [
    { messageTheme: "Employment", targetAudience: "Youth voters", expectedImpact: 3200, conversionProbability: 64 },
    { messageTheme: "Farmer Support", targetAudience: "Farmers in Pangri and Musalgaon", expectedImpact: 2800, conversionProbability: 59 },
    { messageTheme: "Trust and Accessibility", targetAudience: "Maratha and neutral households", expectedImpact: 1300, conversionProbability: 56 },
    { messageTheme: "Women Empowerment", targetAudience: "SHG and women voter clusters", expectedImpact: 1500, conversionProbability: 62 },
    { messageTheme: "Government Schemes", targetAudience: "SC, Mali, and benefits-pending households", expectedImpact: 1200, conversionProbability: 57 },
    { messageTheme: "Infrastructure", targetAudience: "Road and water affected villages", expectedImpact: 860, conversionProbability: 52 },
    { messageTheme: "Leadership", targetAudience: "Influencers and village validators", expectedImpact: 900, conversionProbability: 48 },
    { messageTheme: "Development", targetAudience: "Business and town service voters", expectedImpact: 650, conversionProbability: 46 }
  ],
  communityMatrix: [
    { community: "Youth", support: 52, neutral: 24, persuadable: 18, opposition: 6, conversionPotential: 82 },
    { community: "Farmers", support: 48, neutral: 26, persuadable: 19, opposition: 7, conversionPotential: 79 },
    { community: "Women", support: 55, neutral: 21, persuadable: 17, opposition: 7, conversionPotential: 72 },
    { community: "Maratha", support: 57, neutral: 18, persuadable: 14, opposition: 11, conversionPotential: 67 },
    { community: "Mali", support: 49, neutral: 27, persuadable: 16, opposition: 8, conversionPotential: 61 },
    { community: "SC", support: 45, neutral: 29, persuadable: 16, opposition: 10, conversionPotential: 58 },
    { community: "Business", support: 51, neutral: 25, persuadable: 13, opposition: 11, conversionPotential: 55 },
    { community: "Dhangar", support: 50, neutral: 23, persuadable: 11, opposition: 16, conversionPotential: 49 }
  ],
  villageMatrix: [
    { village: "Sinnar Town", currentSupport: 52, potentialSupport: 66, expectedGain: 3500, conversionScore: 84, priority: "Critical" },
    { village: "Pangri", currentSupport: 51, potentialSupport: 63, expectedGain: 2100, conversionScore: 76, priority: "High" },
    { village: "Musalgaon", currentSupport: 48, potentialSupport: 59, expectedGain: 1900, conversionScore: 73, priority: "Critical" },
    { village: "Dubere", currentSupport: 50, potentialSupport: 59, expectedGain: 850, conversionScore: 61, priority: "Medium" },
    { village: "Devpur", currentSupport: 47, potentialSupport: 56, expectedGain: 720, conversionScore: 57, priority: "Medium" },
    { village: "Wavi", currentSupport: 54, potentialSupport: 60, expectedGain: 540, conversionScore: 49, priority: "Low" }
  ],
  actions: [
    { action: "Create Outreach Campaign", target: "Youth voters in Sinnar Town", expectedVoteGain: 3200, effortRequired: "High", priority: "Critical", owner: "Youth Outreach", status: "Ready to plan" },
    { action: "Village Visit", target: "Pangri irrigation belt", expectedVoteGain: 2100, effortRequired: "Medium", priority: "High", owner: "Farmer Cell", status: "Needs evidence packet" },
    { action: "Influencer Engagement", target: "Cooperative office bearers", expectedVoteGain: 2600, effortRequired: "High", priority: "Critical", owner: "Political Desk", status: "Bridge mapping" },
    { action: "Listening Session", target: "Dubere SHG network", expectedVoteGain: 850, effortRequired: "Medium", priority: "Medium", owner: "Women Outreach", status: "Invites pending" },
    { action: "Scheme Awareness", target: "SC and Mali household clusters", expectedVoteGain: 1200, effortRequired: "Medium", priority: "High", owner: "Booth Coordination", status: "Planning" },
    { action: "Issue Resolution", target: "Water and healthcare affected households", expectedVoteGain: 720, effortRequired: "High", priority: "Medium", owner: "Village Coordinator", status: "Field verification" },
    { action: "Volunteer Drive", target: "First-time voter cluster", expectedVoteGain: 640, effortRequired: "Low", priority: "Medium", owner: "Youth Outreach", status: "Open" }
  ],
  pipeline: [
    { stage: "Identified", count: 42, expectedVotes: 18900 },
    { stage: "Analyzing", count: 18, expectedVotes: 9800 },
    { stage: "Planning", count: 11, expectedVotes: 6400 },
    { stage: "Outreach Started", count: 7, expectedVotes: 3100 },
    { stage: "Engaged", count: 4, expectedVotes: 1600 },
    { stage: "Converted", count: 2, expectedVotes: 420 },
    { stage: "Lost", count: 1, expectedVotes: 180 }
  ],
  forecasts: [
    { segment: "Youth employment circuit", type: "Community", bestCase: 4200, likelyCase: 3200, worstCase: 1600, expectedVoteGain: 3200 },
    { segment: "Pangri farmer belt", type: "Village", bestCase: 2800, likelyCase: 2100, worstCase: 900, expectedVoteGain: 2100 },
    { segment: "Cooperative neutral bridge", type: "Influencer", bestCase: 3400, likelyCase: 2600, worstCase: 700, expectedVoteGain: 2600 },
    { segment: "Irrigation proof campaign", type: "Issue", bestCase: 3800, likelyCase: 2800, worstCase: 1100, expectedVoteGain: 2800 },
    { segment: "Benefits verification campaign", type: "Campaign", bestCase: 1800, likelyCase: 1200, worstCase: 500, expectedVoteGain: 1200 }
  ],
  success: [
    { activity: "Youth sports organizer follow-up", expectedImpact: 900, actualImpact: 760, successRate: 84, lessonsLearned: "Group-led invitations work better than generic campaign messages." },
    { activity: "Farmer listening circle", expectedImpact: 650, actualImpact: 480, successRate: 74, lessonsLearned: "Action dates and visible issue owners are required before support moves." },
    { activity: "SHG issue forum pilot", expectedImpact: 420, actualImpact: 360, successRate: 86, lessonsLearned: "Women conveners increase attendance when follow-up desks are present." },
    { activity: "Benefits awareness desk", expectedImpact: 300, actualImpact: 210, successRate: 70, lessonsLearned: "Household-level verification is needed after the public event." },
    { activity: "Teacher network career session", expectedImpact: 260, actualImpact: 180, successRate: 69, lessonsLearned: "Neutral validators help but need stronger next-step asks." }
  ],
  scenarios: [
    { scenario: "If Youth support increases 10%", expectedVoteGain: 3200, seatImpact: "Reduces working margin pressure by about 8%", winProbabilityChange: 5 },
    { scenario: "If Maratha support increases 5%", expectedVoteGain: 1300, seatImpact: "Improves village validation in mixed booths", winProbabilityChange: 2 },
    { scenario: "If Pangri shifts 6 points", expectedVoteGain: 2100, seatImpact: "Creates a visible farmer-belt momentum signal", winProbabilityChange: 3 },
    { scenario: "If cooperative office bearers become neutral", expectedVoteGain: 2600, seatImpact: "Blocks opponent consolidation in farmer networks", winProbabilityChange: 4 },
    { scenario: "If irrigation proof campaign is resolved", expectedVoteGain: 2800, seatImpact: "Makes farmer persuasion measurable across two village clusters", winProbabilityChange: 4 }
  ],
  tasks: [
    { campaign: "Youth employment circuit", openTasks: 8, pendingTasks: 5, overdueTasks: 1, completedTasks: 3, highestPriorityTask: "Confirm anchor list and first listening location" },
    { campaign: "Irrigation proof visits", openTasks: 7, pendingTasks: 4, overdueTasks: 2, completedTasks: 2, highestPriorityTask: "Collect field evidence before Uday Sangle visit" },
    { campaign: "Cooperative neutral bridge", openTasks: 6, pendingTasks: 5, overdueTasks: 2, completedTasks: 1, highestPriorityTask: "Identify trusted neutral intermediary" },
    { campaign: "SHG trust forums", openTasks: 5, pendingTasks: 3, overdueTasks: 0, completedTasks: 3, highestPriorityTask: "Finalize Dubere invite list" },
    { campaign: "Benefits verification desks", openTasks: 4, pendingTasks: 3, overdueTasks: 1, completedTasks: 1, highestPriorityTask: "Assign booth workers to household follow-up" }
  ],
  recommendations: [
    { recommendation: "Start with the youth employment circuit because it has the highest combined probability and vote gain.", reason: "Youth voters show high persuadability, a clear message theme, and available supportive anchors.", confidence: 58, expectedImpact: 3200, priority: "Critical", actionLabel: "Create Outreach Campaign" },
    { recommendation: "Do not directly confront the cooperative network; build a neutral farmer bridge first.", reason: "The reach is large, but current alignment is opponent-leaning and direct pressure may harden opposition.", confidence: 50, expectedImpact: 2600, priority: "Critical", actionLabel: "Assign Influencer Team" },
    { recommendation: "Pair Pangri farmer visits with documented irrigation proof and public follow-up dates.", reason: "Farmer persuasion needs evidence ownership more than messaging volume.", confidence: 55, expectedImpact: 2100, priority: "High", actionLabel: "Create Village Visit" },
    { recommendation: "Use SHG conveners as hosts, not just attendees, for women trust forums.", reason: "Host status increases credibility and improves household follow-up conversion.", confidence: 52, expectedImpact: 850, priority: "Medium", actionLabel: "Create Listening Session" },
    { recommendation: "Convert benefits complaints into verification tasks before promising campaign action.", reason: "Public claims are not verified yet; household-level proof reduces reputation risk.", confidence: 49, expectedImpact: 1200, priority: "High", actionLabel: "Create Task" },
    { recommendation: "Generate a candidate brief before each persuasion visit.", reason: "Uday Sangle should enter each village with the issue, owner, influencer, and expected vote impact already visible.", confidence: 57, expectedImpact: 1800, priority: "High", actionLabel: "Generate Candidate Brief" }
  ]
};
