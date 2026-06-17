import type { InfluencerIntelligenceData } from "./types";

export const influencerIntelligenceData: InfluencerIntelligenceData = {
  overview: [
    { label: "Total Influencers", value: "486", trend: "Up", change: 9, confidence: 50 },
    { label: "Supportive Influencers", value: "132", trend: "Up", change: 11, confidence: 56 },
    { label: "Opposing Influencers", value: "96", trend: "Down", change: -4, confidence: 48 },
    { label: "Neutral Influencers", value: "118", trend: "Stable", change: 0, confidence: 44 },
    { label: "Persuadable Influencers", value: "74", trend: "Up", change: 14, confidence: 51 },
    { label: "High Impact Influencers", value: "41", trend: "Up", change: 17, confidence: 53 },
    { label: "At Risk Influencers", value: "29", trend: "Up", change: 8, confidence: 46 },
    { label: "Growth Opportunity Influencers", value: "67", trend: "Up", change: 18, confidence: 55 }
  ],
  command: [
    { id: "inf-coop-musalgaon", name: "Cooperative office bearers", category: "Cooperative Leader", village: "Musalgaon", community: "Farmers", occupation: "Cooperative network", organizations: ["Cooperative network", "Farmer groups"], influenceScore: 86, estimatedVotersInfluenced: 6100, politicalAlignment: "Opponent-leaning", relationshipStrength: 42, supportLevel: "High Risk", priority: "Critical", status: "Mapping", photoLabel: "CO", notes: "High reach through cooperative-linked contacts; engage through neutral farmer intermediaries." },
    { id: "inf-youth-sinnar", name: "Youth sports organizers", category: "Youth Leader", village: "Sinnar Town", community: "Youth", occupation: "Sports organizer", organizations: ["Sports clubs", "Youth volunteer circles"], influenceScore: 78, estimatedVotersInfluenced: 3200, politicalAlignment: "Supportive", relationshipStrength: 74, supportLevel: "Supportive", priority: "High", status: "Active", photoLabel: "YS", notes: "Can anchor youth employment and sports outreach." },
    { id: "inf-farmer-pangri", name: "Farmer group captains", category: "Farmer Leader", village: "Pangri", community: "Farmers", occupation: "Farmer convener", organizations: ["Farmer groups", "Irrigation committees"], influenceScore: 74, estimatedVotersInfluenced: 4700, politicalAlignment: "Mixed", relationshipStrength: 58, supportLevel: "Persuadable", priority: "High", status: "Follow-up", photoLabel: "FG", notes: "Irrigation evidence capture can convert relationship into visible support." },
    { id: "inf-shg-dubere", name: "SHG cluster conveners", category: "Women Leader", village: "Dubere", community: "Women", occupation: "SHG convener", organizations: ["SHG network", "Women issue forum"], influenceScore: 63, estimatedVotersInfluenced: 2400, politicalAlignment: "Persuadable", relationshipStrength: 55, supportLevel: "Growth Opportunity", priority: "Medium", status: "Planning", photoLabel: "SH", notes: "Women-led issue forums can build trust around water, healthcare, and safety." },
    { id: "inf-teachers-wavi", name: "Local teachers network", category: "Teacher", village: "Wavi", community: "Maratha", occupation: "Teacher network", organizations: ["Education circles", "Local study groups"], influenceScore: 62, estimatedVotersInfluenced: 2100, politicalAlignment: "Neutral", relationshipStrength: 53, supportLevel: "Neutral", priority: "Medium", status: "Monitoring", photoLabel: "TN", notes: "Neutral credibility channel; useful for youth, education, and village listening." },
    { id: "inf-health-devpur", name: "Clinic and health volunteers", category: "Doctor", village: "Devpur", community: "Women", occupation: "Health volunteer network", organizations: ["Health volunteers", "Clinic contacts"], influenceScore: 57, estimatedVotersInfluenced: 1800, politicalAlignment: "Neutral", relationshipStrength: 49, supportLevel: "Persuadable", priority: "Medium", status: "Open", photoLabel: "HV", notes: "Healthcare issue channel in weak village belt." }
  ],
  networkNodes: [
    { id: "n-influencer", label: "Farmer captains", type: "influencer", x: 50, y: 12 },
    { id: "n-community", label: "Farmers", type: "community", x: 28, y: 34 },
    { id: "n-village", label: "Pangri", type: "village", x: 72, y: 34 },
    { id: "n-org", label: "Irrigation committees", type: "organization", x: 38, y: 62 },
    { id: "n-voters", label: "4.7K voters", type: "voters", x: 66, y: 82 },
    { id: "n-coop", label: "Cooperatives", type: "organization", x: 76, y: 62 }
  ],
  networkEdges: [
    { from: "n-influencer", to: "n-community", strength: 74 },
    { from: "n-influencer", to: "n-village", strength: 68 },
    { from: "n-community", to: "n-org", strength: 61 },
    { from: "n-org", to: "n-voters", strength: 58 },
    { from: "n-village", to: "n-coop", strength: 66 },
    { from: "n-coop", to: "n-voters", strength: 70 }
  ],
  topInfluencers: [
    { influencer: "Cooperative office bearers", influenceScore: 86, reach: 6100, support: "Opponent-leaning", relationship: 42, expectedVoteImpact: 2600, priority: "Critical", recommendedAction: "Map neutral intermediaries" },
    { influencer: "Youth sports organizers", influenceScore: 78, reach: 3200, support: "Supportive", relationship: 74, expectedVoteImpact: 1450, priority: "High", recommendedAction: "Anchor youth employment circuit" },
    { influencer: "Farmer group captains", influenceScore: 74, reach: 4700, support: "Mixed", relationship: 58, expectedVoteImpact: 1800, priority: "High", recommendedAction: "Irrigation evidence visit" },
    { influencer: "SHG cluster conveners", influenceScore: 63, reach: 2400, support: "Persuadable", relationship: 55, expectedVoteImpact: 900, priority: "Medium", recommendedAction: "Women forum follow-up" }
  ],
  risks: [
    { influencer: "Cooperative office bearers", risk: "Opponent network consolidation", potentialVoteImpact: 2600, severity: "Critical", reason: "High farmer reach and low relationship strength", owner: "Political Desk", mitigation: "Use neutral farmer bridge, avoid direct public confrontation", status: "Mapping" },
    { influencer: "Farmer group captains", risk: "Irrigation frustration may drift", potentialVoteImpact: 1200, severity: "High", reason: "Issue ownership not yet proven through field evidence", owner: "Farmer Cell", mitigation: "Schedule evidence visit with Uday Sangle", status: "Follow-up" },
    { influencer: "Local teachers network", risk: "Neutral network may remain passive", potentialVoteImpact: 650, severity: "Medium", reason: "No clear relationship owner", owner: "Community Desk", mitigation: "Assign education/youth listening relationship manager", status: "Monitoring" }
  ],
  categories: [
    { category: "Sarpanch", count: 42, supportive: 14, persuadable: 9, risk: 8, combinedReach: 18400 },
    { category: "Teacher", count: 38, supportive: 10, persuadable: 12, risk: 4, combinedReach: 11200 },
    { category: "Farmer Leader", count: 64, supportive: 18, persuadable: 20, risk: 11, combinedReach: 28600 },
    { category: "Business Leader", count: 31, supportive: 7, persuadable: 10, risk: 6, combinedReach: 9600 },
    { category: "Youth Leader", count: 57, supportive: 24, persuadable: 13, risk: 5, combinedReach: 17300 },
    { category: "Women Leader", count: 46, supportive: 13, persuadable: 16, risk: 4, combinedReach: 14100 },
    { category: "Cooperative Leader", count: 28, supportive: 4, persuadable: 5, risk: 12, combinedReach: 19200 }
  ],
  communityAnalysis: [
    { community: "Farmers", topInfluencers: "Cooperative office bearers, Farmer group captains", combinedReach: 10800, supportScore: 54, opportunityScore: 78, riskScore: 76 },
    { community: "Youth", topInfluencers: "Youth sports organizers", combinedReach: 3200, supportScore: 67, opportunityScore: 80, riskScore: 34 },
    { community: "Women", topInfluencers: "SHG cluster conveners, Clinic volunteers", combinedReach: 4200, supportScore: 57, opportunityScore: 72, riskScore: 39 },
    { community: "Maratha", topInfluencers: "Local teachers network", combinedReach: 2100, supportScore: 58, opportunityScore: 64, riskScore: 48 },
    { community: "SC", topInfluencers: "Health volunteers, booth contacts", combinedReach: 1600, supportScore: 50, opportunityScore: 57, riskScore: 62 }
  ],
  villageAnalysis: [
    { village: "Musalgaon", topInfluencers: "Cooperative office bearers", combinedReach: 6100, support: 48, risk: 78, opportunity: 66, influenceDensity: 86 },
    { village: "Sinnar Town", topInfluencers: "Youth sports organizers", combinedReach: 3200, support: 63, risk: 44, opportunity: 72, influenceDensity: 78 },
    { village: "Pangri", topInfluencers: "Farmer group captains", combinedReach: 4700, support: 56, risk: 57, opportunity: 74, influenceDensity: 74 },
    { village: "Dubere", topInfluencers: "SHG cluster conveners", combinedReach: 2400, support: 59, risk: 39, opportunity: 68, influenceDensity: 63 },
    { village: "Wavi", topInfluencers: "Local teachers network", combinedReach: 2100, support: 54, risk: 52, opportunity: 64, influenceDensity: 62 }
  ],
  organizationAnalysis: [
    { organization: "Farmer Groups", members: 124, reach: 21200, politicalAlignment: "Mixed", influence: 78 },
    { organization: "Sports Organizations", members: 86, reach: 9600, politicalAlignment: "Supportive", influence: 71 },
    { organization: "SHG Network", members: 142, reach: 14100, politicalAlignment: "Persuadable", influence: 66 },
    { organization: "Cooperatives", members: 58, reach: 19200, politicalAlignment: "Opponent-leaning", influence: 86 },
    { organization: "Educational Institutions", members: 73, reach: 11200, politicalAlignment: "Neutral", influence: 62 },
    { organization: "NGOs and Trusts", members: 39, reach: 6400, politicalAlignment: "Neutral", influence: 55 }
  ],
  relationships: [
    { influencer: "Cooperative office bearers", relationshipStrength: 42, history: "Limited direct contact; indirect political linkage", lastContact: "2026-05-28", lastMeeting: "2026-05-18", lastEvent: "Cooperative gathering", nextAction: "Map neutral bridge", assignedTeam: "Political Desk", status: "Risk" },
    { influencer: "Youth sports organizers", relationshipStrength: 74, history: "Strong campaign event support", lastContact: "2026-06-05", lastMeeting: "2026-06-02", lastEvent: "Sports volunteer meet", nextAction: "Youth employment event", assignedTeam: "Youth Outreach", status: "Active" },
    { influencer: "Farmer group captains", relationshipStrength: 58, history: "Issue-based contact through farmer cell", lastContact: "2026-06-03", lastMeeting: "2026-05-30", lastEvent: "Farmer listening", nextAction: "Irrigation visit", assignedTeam: "Farmer Cell", status: "Follow-up" },
    { influencer: "SHG cluster conveners", relationshipStrength: 55, history: "Initial women forum planning", lastContact: "2026-06-01", lastMeeting: "2026-05-29", lastEvent: "SHG meeting", nextAction: "Dubere issue forum", assignedTeam: "Women Outreach", status: "Planning" }
  ],
  engagement: [
    { influencer: "Cooperative office bearers", meetings: 1, calls: 2, events: 1, visits: 1, issueResolution: 0, introductions: 1, followUps: 4 },
    { influencer: "Youth sports organizers", meetings: 6, calls: 9, events: 4, visits: 3, issueResolution: 2, introductions: 7, followUps: 3 },
    { influencer: "Farmer group captains", meetings: 4, calls: 6, events: 2, visits: 3, issueResolution: 1, introductions: 4, followUps: 5 },
    { influencer: "SHG cluster conveners", meetings: 3, calls: 5, events: 2, visits: 2, issueResolution: 1, introductions: 3, followUps: 4 },
    { influencer: "Local teachers network", meetings: 2, calls: 3, events: 1, visits: 1, issueResolution: 0, introductions: 2, followUps: 2 }
  ],
  sentiment: [
    { influencer: "Cooperative office bearers", sentiment: "Negative", trend: "Down", confidence: 48, influenceImpact: 86, historicalMovement: -6 },
    { influencer: "Youth sports organizers", sentiment: "Positive", trend: "Up", confidence: 64, influenceImpact: 78, historicalMovement: 9 },
    { influencer: "Farmer group captains", sentiment: "Neutral", trend: "Up", confidence: 55, influenceImpact: 74, historicalMovement: 4 },
    { influencer: "SHG cluster conveners", sentiment: "Positive", trend: "Up", confidence: 52, influenceImpact: 63, historicalMovement: 5 },
    { influencer: "Local teachers network", sentiment: "Neutral", trend: "Stable", confidence: 46, influenceImpact: 62, historicalMovement: 0 }
  ],
  opportunities: [
    { influencer: "Youth sports organizers", expectedVoteGain: 1450, targetCommunity: "Youth", priority: "High", owner: "Youth Outreach", status: "Active", actionPlan: "Make them anchors for employment listening circuit" },
    { influencer: "Farmer group captains", expectedVoteGain: 1800, targetCommunity: "Farmers", priority: "High", owner: "Farmer Cell", status: "Follow-up", actionPlan: "Co-host irrigation evidence capture visit" },
    { influencer: "SHG cluster conveners", expectedVoteGain: 900, targetCommunity: "Women", priority: "Medium", owner: "Women Outreach", status: "Planning", actionPlan: "Run Dubere SHG issue forum" },
    { influencer: "Local teachers network", expectedVoteGain: 650, targetCommunity: "Youth", priority: "Medium", owner: "Community Desk", status: "Monitoring", actionPlan: "Education/youth listening round" }
  ],
  riskAnalysis: [
    { influencer: "Cooperative office bearers", potentialVoteLoss: 2600, riskType: "Opponent network consolidation", severity: "Critical", owner: "Political Desk", mitigationPlan: "Neutral bridge mapping and farmer listening circuit", status: "Mapping" },
    { influencer: "Farmer group captains", potentialVoteLoss: 1200, riskType: "Irrigation frustration drift", severity: "High", owner: "Farmer Cell", mitigationPlan: "Evidence capture with public follow-up owner", status: "Follow-up" },
    { influencer: "Local teachers network", potentialVoteLoss: 650, riskType: "Neutral network remains passive", severity: "Medium", owner: "Community Desk", mitigationPlan: "Assign relationship manager", status: "Monitoring" }
  ],
  tasks: [
    { influencer: "Cooperative office bearers", openTasks: 6, pendingTasks: 4, overdueTasks: 2, completedTasks: 1, highestPriorityTask: "Map neutral farmer bridge" },
    { influencer: "Youth sports organizers", openTasks: 3, pendingTasks: 2, overdueTasks: 0, completedTasks: 8, highestPriorityTask: "Confirm youth employment event anchors" },
    { influencer: "Farmer group captains", openTasks: 5, pendingTasks: 3, overdueTasks: 1, completedTasks: 4, highestPriorityTask: "Schedule irrigation evidence visit" },
    { influencer: "SHG cluster conveners", openTasks: 4, pendingTasks: 3, overdueTasks: 0, completedTasks: 3, highestPriorityTask: "Confirm Dubere forum invite list" }
  ],
  recommendations: [
    { recommendation: "Meet Farmer group captains before the Pangri irrigation visit.", reason: "They are persuadable, have high farmer reach, and can validate issue evidence publicly.", confidence: 58, expectedVotes: 1800, priority: "High", actionLabel: "Schedule Meeting" },
    { recommendation: "Assign a senior relationship manager to cooperative office bearers.", reason: "They are the highest-risk influence cluster and can move votes against the campaign.", confidence: 50, expectedVotes: 2600, priority: "Critical", actionLabel: "Assign Relationship Manager" },
    { recommendation: "Strengthen youth sports organizers as campaign-positive anchors.", reason: "They are already supportive and can extend youth employment outreach in Sinnar Town.", confidence: 64, expectedVotes: 1450, priority: "High", actionLabel: "Create Community Outreach Plan" },
    { recommendation: "Use SHG cluster conveners for women issue forums in Dubere.", reason: "Relationship is still persuadable but the issue channel is strong.", confidence: 52, expectedVotes: 900, priority: "Medium", actionLabel: "Create Follow-up" }
  ],
  comparisons: [
    { influencer: "Cooperative office bearers", reach: 6100, influence: 86, communities: "Farmers", villages: "Musalgaon", support: "Opponent-leaning", risk: 78, opportunity: 66, relationshipStrength: 42 },
    { influencer: "Youth sports organizers", reach: 3200, influence: 78, communities: "Youth", villages: "Sinnar Town", support: "Supportive", risk: 34, opportunity: 80, relationshipStrength: 74 },
    { influencer: "Farmer group captains", reach: 4700, influence: 74, communities: "Farmers", villages: "Pangri", support: "Mixed", risk: 57, opportunity: 74, relationshipStrength: 58 },
    { influencer: "SHG cluster conveners", reach: 2400, influence: 63, communities: "Women", villages: "Dubere", support: "Persuadable", risk: 39, opportunity: 68, relationshipStrength: 55 }
  ]
};
