import type { CommunityIntelligenceData } from "./types";

export const communityIntelligenceData: CommunityIntelligenceData = {
  overview: [
    { label: "Total Communities Tracked", value: "11", trend: "Up", change: 12, confidence: 54 },
    { label: "Supportive Communities", value: "4", trend: "Up", change: 18, confidence: 57 },
    { label: "Opposing Communities", value: "2", trend: "Down", change: -7, confidence: 46 },
    { label: "Neutral Communities", value: "3", trend: "Stable", change: 0, confidence: 43 },
    { label: "Persuadable Communities", value: "5", trend: "Up", change: 15, confidence: 52 },
    { label: "High Risk Communities", value: "3", trend: "Up", change: 9, confidence: 48 },
    { label: "High Opportunity Communities", value: "4", trend: "Up", change: 21, confidence: 58 },
    { label: "Community Coverage", value: "68%", trend: "Up", change: 8, confidence: 50 }
  ],
  command: [
    { id: "comm-maratha", community: "Maratha", populationEstimate: 86000, estimatedVoters: 61200, currentSupport: 58, opposition: 27, neutral: 15, persuadable: 18, turnout: 66, sentiment: "Positive", trend: "Stable", influence: 82, risk: 48, opportunity: 64, confidence: 55 },
    { id: "comm-mali", community: "Mali", populationEstimate: 31000, estimatedVoters: 22100, currentSupport: 55, opposition: 25, neutral: 20, persuadable: 21, turnout: 62, sentiment: "Positive", trend: "Up", influence: 58, risk: 41, opportunity: 67, confidence: 42 },
    { id: "comm-vanjari", community: "Vanjari", populationEstimate: 27000, estimatedVoters: 19400, currentSupport: 49, opposition: 34, neutral: 17, persuadable: 20, turnout: 59, sentiment: "Neutral", trend: "Stable", influence: 61, risk: 56, opportunity: 52, confidence: 38 },
    { id: "comm-dhangar", community: "Dhangar", populationEstimate: 19000, estimatedVoters: 13500, currentSupport: 53, opposition: 29, neutral: 18, persuadable: 19, turnout: 58, sentiment: "Neutral", trend: "Up", influence: 54, risk: 44, opportunity: 59, confidence: 40 },
    { id: "comm-sc", community: "SC", populationEstimate: 24000, estimatedVoters: 17100, currentSupport: 50, opposition: 31, neutral: 19, persuadable: 23, turnout: 57, sentiment: "Neutral", trend: "Down", influence: 48, risk: 62, opportunity: 57, confidence: 36 },
    { id: "comm-st", community: "ST", populationEstimate: 9000, estimatedVoters: 6200, currentSupport: 47, opposition: 32, neutral: 21, persuadable: 24, turnout: 54, sentiment: "Neutral", trend: "Stable", influence: 39, risk: 55, opportunity: 50, confidence: 33 },
    { id: "comm-minority", community: "Minority", populationEstimate: 15000, estimatedVoters: 10600, currentSupport: 45, opposition: 35, neutral: 20, persuadable: 22, turnout: 56, sentiment: "Negative", trend: "Stable", influence: 43, risk: 59, opportunity: 61, confidence: 32 },
    { id: "comm-women", community: "Women", populationEstimate: 151000, estimatedVoters: 151000, currentSupport: 57, opposition: 24, neutral: 19, persuadable: 26, turnout: 64, sentiment: "Positive", trend: "Up", influence: 66, risk: 39, opportunity: 72, confidence: 52 },
    { id: "comm-youth", community: "Youth", populationEstimate: 78000, estimatedVoters: 64200, currentSupport: 67, opposition: 18, neutral: 15, persuadable: 29, turnout: 61, sentiment: "Positive", trend: "Up", influence: 74, risk: 34, opportunity: 80, confidence: 64 },
    { id: "comm-farmers", community: "Farmers", populationEstimate: 114000, estimatedVoters: 82000, currentSupport: 61, opposition: 25, neutral: 14, persuadable: 24, turnout: 68, sentiment: "Positive", trend: "Up", influence: 86, risk: 46, opportunity: 78, confidence: 58 },
    { id: "comm-business", community: "Business Owners", populationEstimate: 12000, estimatedVoters: 8700, currentSupport: 51, opposition: 33, neutral: 16, persuadable: 17, turnout: 70, sentiment: "Neutral", trend: "Stable", influence: 70, risk: 52, opportunity: 55, confidence: 41 }
  ],
  issues: [
    { community: "Maratha", topIssues: ["Reservation", "Agriculture", "Employment"], severity: "High", affectedPopulation: 32600, politicalImpact: 78, opportunityScore: 64, owner: "Community Desk" },
    { community: "Farmers", topIssues: ["Water", "MSP", "Irrigation"], severity: "Critical", affectedPopulation: 42100, politicalImpact: 84, opportunityScore: 78, owner: "Farmer Cell" },
    { community: "Women", topIssues: ["Safety", "Healthcare", "Water"], severity: "High", affectedPopulation: 36800, politicalImpact: 76, opportunityScore: 72, owner: "Women Outreach" },
    { community: "Youth", topIssues: ["Jobs", "Training", "Sports"], severity: "Critical", affectedPopulation: 28100, politicalImpact: 86, opportunityScore: 80, owner: "Youth Outreach" },
    { community: "SC", topIssues: ["Local access", "Employment", "Representation"], severity: "High", affectedPopulation: 9200, politicalImpact: 69, opportunityScore: 57, owner: "Social Justice Desk" },
    { community: "Business Owners", topIssues: ["Permits", "Roads", "Market access"], severity: "Medium", affectedPopulation: 3900, politicalImpact: 58, opportunityScore: 55, owner: "Urban Desk" }
  ],
  influencers: [
    { name: "Youth sports organizers", community: "Youth", category: "Youth Leaders", influenceScore: 78, reach: 3200, alignment: "Supportive", relationshipStrength: 74, village: "Sinnar Town" },
    { name: "Cooperative office bearers", community: "Farmers", category: "Business Leaders", influenceScore: 86, reach: 6100, alignment: "Opponent-leaning", relationshipStrength: 42, village: "Musalgaon" },
    { name: "SHG cluster conveners", community: "Women", category: "Social Workers", influenceScore: 63, reach: 2400, alignment: "Persuadable", relationshipStrength: 55, village: "Dubere" },
    { name: "Farmer conveners", community: "Farmers", category: "Farmer Leaders", influenceScore: 74, reach: 4700, alignment: "Mixed", relationshipStrength: 58, village: "Pangri" },
    { name: "Local teachers network", community: "Maratha", category: "Teachers", influenceScore: 62, reach: 2100, alignment: "Neutral", relationshipStrength: 53, village: "Wavi" },
    { name: "Clinic and health volunteers", community: "Women", category: "Doctors", influenceScore: 57, reach: 1800, alignment: "Neutral", relationshipStrength: 49, village: "Devpur" }
  ],
  geo: [
    { id: "geo-youth-town", village: "Sinnar Town", booth: "booth-midc-001", community: "Youth", support: 67, sentiment: "Positive", influence: 74, issue: "Employment", x: 51, y: 45 },
    { id: "geo-farmers-pangri", village: "Pangri", booth: "booth-pangri-001", community: "Farmers", support: 61, sentiment: "Positive", influence: 86, issue: "Irrigation", x: 69, y: 67 },
    { id: "geo-farmers-musalgaon", village: "Musalgaon", booth: "booth-musalgaon-001", community: "Farmers", support: 48, sentiment: "Neutral", influence: 82, issue: "Cooperative influence", x: 76, y: 52 },
    { id: "geo-women-dubere", village: "Dubere", booth: "booth-dubere-001", community: "Women", support: 57, sentiment: "Positive", influence: 66, issue: "Water", x: 42, y: 63 },
    { id: "geo-maratha-wavi", village: "Wavi", booth: "booth-wavi-001", community: "Maratha", support: 58, sentiment: "Positive", influence: 82, issue: "Agriculture", x: 34, y: 29 },
    { id: "geo-sc-devpur", village: "Devpur", booth: "booth-devpur-001", community: "SC", support: 50, sentiment: "Neutral", influence: 48, issue: "Representation", x: 48, y: 82 }
  ],
  trends: [
    { community: "Youth", monthly: 8, quarterly: 14, yearly: 21, currentSupport: 67 },
    { community: "Farmers", monthly: 5, quarterly: 9, yearly: 15, currentSupport: 61 },
    { community: "Maratha", monthly: 4, quarterly: 6, yearly: 8, currentSupport: 58 },
    { community: "Women", monthly: 2, quarterly: 7, yearly: 11, currentSupport: 57 },
    { community: "Minority", monthly: -3, quarterly: -4, yearly: -2, currentSupport: 45 },
    { community: "SC", monthly: -2, quarterly: 1, yearly: 3, currentSupport: 50 }
  ],
  risks: [
    { risk: "Maratha reservation dissatisfaction could be redirected by opponents", community: "Maratha", probability: 58, impact: 76, severity: "High", owner: "Community Desk", status: "Monitoring" },
    { risk: "Farmer irrigation complaints harden without proof-backed ownership", community: "Farmers", probability: 64, impact: 84, severity: "Critical", owner: "Farmer Cell", status: "Action required" },
    { risk: "Youth unemployment frustration converts into turnout drop", community: "Youth", probability: 52, impact: 79, severity: "High", owner: "Youth Outreach", status: "Open" },
    { risk: "SC sentiment decline needs verification and local listening", community: "SC", probability: 46, impact: 62, severity: "Medium", owner: "Social Justice Desk", status: "Needs verification" }
  ],
  opportunities: [
    { opportunity: "Sports outreach and employment camps", community: "Youth", expectedVoteGain: 4200, priority: "Critical", owner: "Youth Outreach", status: "Action drafted" },
    { opportunity: "Farmer listening sessions with irrigation evidence capture", community: "Farmers", expectedVoteGain: 3800, priority: "High", owner: "Farmer Cell", status: "Open" },
    { opportunity: "Women issue forums through SHG conveners", community: "Women", expectedVoteGain: 2700, priority: "High", owner: "Women Outreach", status: "Planning" },
    { opportunity: "Business roundtables in Sinnar Town", community: "Business Owners", expectedVoteGain: 900, priority: "Medium", owner: "Urban Desk", status: "Scoping" }
  ],
  engagement: [
    { community: "Youth", meetings: 8, visits: 12, listeningSessions: 5, events: 3, outreachCampaigns: 2, volunteerActivity: "High", nextAction: "MIDC job-access listening circle" },
    { community: "Farmers", meetings: 6, visits: 14, listeningSessions: 4, events: 2, outreachCampaigns: 1, volunteerActivity: "High", nextAction: "Pangri irrigation walk-through" },
    { community: "Women", meetings: 5, visits: 8, listeningSessions: 4, events: 2, outreachCampaigns: 1, volunteerActivity: "Medium", nextAction: "Dubere SHG forum" },
    { community: "Maratha", meetings: 4, visits: 6, listeningSessions: 2, events: 1, outreachCampaigns: 1, volunteerActivity: "Medium", nextAction: "Reservation + agriculture leader round" },
    { community: "SC", meetings: 2, visits: 3, listeningSessions: 1, events: 0, outreachCampaigns: 0, volunteerActivity: "Low", nextAction: "Verification listening session" }
  ],
  networkNodes: [
    { id: "n-community", label: "Farmers", type: "community", x: 50, y: 12 },
    { id: "n-leader", label: "Farmer conveners", type: "leader", x: 34, y: 34 },
    { id: "n-organization", label: "Cooperative network", type: "organization", x: 66, y: 34 },
    { id: "n-influencer", label: "Irrigation voices", type: "influencer", x: 42, y: 62 },
    { id: "n-village-pangri", label: "Pangri", type: "village", x: 25, y: 82 },
    { id: "n-village-musalgaon", label: "Musalgaon", type: "village", x: 72, y: 82 }
  ],
  networkEdges: [
    { from: "n-community", to: "n-leader", strength: 72 },
    { from: "n-community", to: "n-organization", strength: 86 },
    { from: "n-leader", to: "n-influencer", strength: 64 },
    { from: "n-influencer", to: "n-village-pangri", strength: 69 },
    { from: "n-organization", to: "n-village-musalgaon", strength: 82 }
  ],
  comparisons: [
    { community: "Youth", support: 67, sentiment: "Positive", primaryIssue: "Jobs", influence: 74, turnout: 61, opportunity: 80 },
    { community: "Farmers", support: 61, sentiment: "Positive", primaryIssue: "Irrigation", influence: 86, turnout: 68, opportunity: 78 },
    { community: "Women", support: 57, sentiment: "Positive", primaryIssue: "Water", influence: 66, turnout: 64, opportunity: 72 },
    { community: "Maratha", support: 58, sentiment: "Positive", primaryIssue: "Reservation", influence: 82, turnout: 66, opportunity: 64 },
    { community: "SC", support: 50, sentiment: "Neutral", primaryIssue: "Representation", influence: 48, turnout: 57, opportunity: 57 },
    { community: "Minority", support: 45, sentiment: "Negative", primaryIssue: "Trust-building", influence: 43, turnout: 56, opportunity: 61 }
  ],
  recommendations: [
    { recommendation: "Focus Uday Sangle's next visible outreach on Youth and Farmers.", reason: "Both communities combine rising sentiment, high opportunity, and issues that can be owned through field action.", expectedGain: 8000, confidence: 61, actionLabel: "Create Community Campaign" },
    { recommendation: "Send the Farmer Cell to Pangri before the next public meeting.", reason: "Irrigation has critical political impact and needs evidence capture before messaging.", expectedGain: 1700, confidence: 58, actionLabel: "Schedule Community Meeting" },
    { recommendation: "Build a women-led Dubere issue forum around water, safety, and healthcare.", reason: "Women voters show positive trend and strong persuadability through SHG conveners.", expectedGain: 1200, confidence: 54, actionLabel: "Create Listening Session" },
    { recommendation: "Verify SC sentiment decline with local listening before any messaging.", reason: "Confidence is low and risk is rising; assumptions could create reputation damage.", expectedGain: 700, confidence: 42, actionLabel: "Create Task" }
  ]
};
