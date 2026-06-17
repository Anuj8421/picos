import type { HouseholdIntelligenceData } from "./types";

export const householdIntelligenceData: HouseholdIntelligenceData = {
  overview: [
    { label: "Total Households", value: "74.8K", trend: "Up", change: 3, confidence: 41 },
    { label: "Supportive Households", value: "21.4K", trend: "Up", change: 7, confidence: 52 },
    { label: "Opposing Households", value: "25.1K", trend: "Down", change: -2, confidence: 47 },
    { label: "Neutral Households", value: "12.8K", trend: "Stable", change: 0, confidence: 44 },
    { label: "Persuadable Households", value: "8.6K", trend: "Up", change: 13, confidence: 49 },
    { label: "High Influence Households", value: "1.9K", trend: "Up", change: 11, confidence: 50 },
    { label: "High Risk Households", value: "2.7K", trend: "Up", change: 8, confidence: 45 },
    { label: "Growth Opportunity Households", value: "5.1K", trend: "Up", change: 16, confidence: 54 }
  ],
  command: [
    { id: "hh-jadhav-pangri", householdName: "Jadhav Family", village: "Pangri", booth: "booth-pangri-001", address: "Pangri north farm lane", familySize: 7, eligibleVoters: 5, supportScore: 56, influenceScore: 74, riskScore: 54, opportunityScore: 78, visitPriority: "High", assignedWorker: "Farmer Cell", status: "Needs Visit", classification: "Persuadable", community: "Farmers", occupation: "Agriculture", education: "Mixed", economicProfile: "Small farmer", politicalAlignment: "Persuadable", relationshipStrength: 58, notes: "Irrigation concern can move wider family cluster.", x: 69, y: 67 },
    { id: "hh-shinde-musalgaon", householdName: "Shinde Family", village: "Musalgaon", booth: "booth-musalgaon-001", address: "Near cooperative road", familySize: 9, eligibleVoters: 7, supportScore: 42, influenceScore: 86, riskScore: 82, opportunityScore: 61, visitPriority: "Critical", assignedWorker: "Political Desk", status: "Follow-up", classification: "Risk", community: "Farmers", occupation: "Cooperative-linked agriculture", education: "Secondary", economicProfile: "Middle farmer", politicalAlignment: "Opponent-leaning", relationshipStrength: 39, notes: "External cooperative influence is active.", x: 76, y: 52 },
    { id: "hh-kale-sinnar", householdName: "Kale Family", village: "Sinnar Town", booth: "booth-midc-001", address: "MIDC approach road", familySize: 6, eligibleVoters: 4, supportScore: 64, influenceScore: 69, riskScore: 38, opportunityScore: 75, visitPriority: "High", assignedWorker: "Youth Outreach", status: "Action Active", classification: "Growth", community: "Youth", occupation: "Industrial worker", education: "Graduate", economicProfile: "Working class", politicalAlignment: "Supportive", relationshipStrength: 66, notes: "Youth employment message can convert nearby households.", x: 51, y: 45 },
    { id: "hh-pawar-dubere", householdName: "Pawar Family", village: "Dubere", booth: "booth-dubere-001", address: "SHG cluster lane", familySize: 8, eligibleVoters: 6, supportScore: 59, influenceScore: 63, riskScore: 41, opportunityScore: 70, visitPriority: "Medium", assignedWorker: "Women Outreach", status: "Covered", classification: "Growth", community: "Women", occupation: "SHG + agriculture", education: "Mixed", economicProfile: "Lower middle", politicalAlignment: "Persuadable", relationshipStrength: 55, notes: "SHG conveners can amplify issue forum.", x: 42, y: 63 },
    { id: "hh-more-devpur", householdName: "More Family", village: "Devpur", booth: "booth-devpur-001", address: "Devpur west hamlet", familySize: 5, eligibleVoters: 4, supportScore: 45, influenceScore: 51, riskScore: 68, opportunityScore: 57, visitPriority: "High", assignedWorker: "Booth Ops", status: "Monitoring", classification: "Weak", community: "SC", occupation: "Daily work", education: "Secondary", economicProfile: "Low income", politicalAlignment: "Neutral", relationshipStrength: 42, notes: "Coordinator gap and benefits issue need careful verification.", x: 48, y: 82 },
    { id: "hh-wagh-wavi", householdName: "Wagh Family", village: "Wavi", booth: "booth-wavi-001", address: "Wavi market side", familySize: 6, eligibleVoters: 5, supportScore: 53, influenceScore: 62, riskScore: 50, opportunityScore: 63, visitPriority: "Medium", assignedWorker: "Community Desk", status: "Covered", classification: "Neutral", community: "Maratha", occupation: "Small business", education: "Graduate", economicProfile: "Lower middle", politicalAlignment: "Neutral", relationshipStrength: 51, notes: "Neutral influencer bridge household.", x: 34, y: 29 }
  ],
  targets: [
    { household: "Jadhav Family", currentSupport: 56, potentialSupport: 72, expectedVoteGain: 4, priority: "High", reason: "Family influencer is respected among Pangri farmer cluster", recommendedAction: "Irrigation evidence visit with farmer convener", expectedImpact: 38 },
    { household: "Kale Family", currentSupport: 64, potentialSupport: 78, expectedVoteGain: 3, priority: "High", reason: "Youth employment message can spread through worker network", recommendedAction: "Invite to MIDC youth listening circle", expectedImpact: 32 },
    { household: "Pawar Family", currentSupport: 59, potentialSupport: 70, expectedVoteGain: 3, priority: "Medium", reason: "SHG engagement can move women-led households", recommendedAction: "Women issue forum follow-up", expectedImpact: 26 },
    { household: "Wagh Family", currentSupport: 53, potentialSupport: 64, expectedVoteGain: 2, priority: "Medium", reason: "Neutral small-business household with local credibility", recommendedAction: "Market access roundtable invite", expectedImpact: 18 }
  ],
  risks: [
    { household: "Shinde Family", riskType: "Cooperative external pressure", potentialVoteLoss: 6, severity: "Critical", reason: "Influence score is high and alignment is opponent-leaning", owner: "Political Desk", mitigationPlan: "Relationship visit through neutral farmer convener", status: "Follow-up" },
    { household: "More Family", riskType: "Benefits grievance and weak local worker contact", potentialVoteLoss: 3, severity: "High", reason: "Trust is low and coordinator coverage is incomplete", owner: "Booth Ops", mitigationPlan: "Verify issue, assign worker, avoid public claim until sourced", status: "Open" },
    { household: "Wagh Family", riskType: "Neutral influencer drift", potentialVoteLoss: 2, severity: "Medium", reason: "No committed relationship owner", owner: "Community Desk", mitigationPlan: "Assign relationship owner and invite to roundtable", status: "Monitoring" }
  ],
  familyMembers: [
    { householdId: "hh-jadhav-pangri", name: "Ramesh Jadhav", age: 52, gender: "Male", familyRole: "Head", occupation: "Farmer", politicalLeaning: "Persuadable", supportScore: 55, influenceScore: 78, relationshipStrength: 58, turnoutProbability: 72 },
    { householdId: "hh-jadhav-pangri", name: "Sunita Jadhav", age: 47, gender: "Female", familyRole: "Senior decision maker", occupation: "SHG member", politicalLeaning: "Neutral", supportScore: 52, influenceScore: 61, relationshipStrength: 54, turnoutProbability: 69 },
    { householdId: "hh-jadhav-pangri", name: "Amit Jadhav", age: 24, gender: "Male", familyRole: "Youth voter", occupation: "Job seeker", politicalLeaning: "Supportive", supportScore: 68, influenceScore: 49, relationshipStrength: 63, turnoutProbability: 64 },
    { householdId: "hh-shinde-musalgaon", name: "Vilas Shinde", age: 58, gender: "Male", familyRole: "Head", occupation: "Farmer", politicalLeaning: "Opponent-leaning", supportScore: 38, influenceScore: 86, relationshipStrength: 36, turnoutProbability: 76 },
    { householdId: "hh-shinde-musalgaon", name: "Mahesh Shinde", age: 31, gender: "Male", familyRole: "Coordinator in family", occupation: "Cooperative work", politicalLeaning: "Opponent-leaning", supportScore: 41, influenceScore: 70, relationshipStrength: 34, turnoutProbability: 71 },
    { householdId: "hh-kale-sinnar", name: "Nilesh Kale", age: 29, gender: "Male", familyRole: "Youth influencer", occupation: "Industrial worker", politicalLeaning: "Supportive", supportScore: 72, influenceScore: 67, relationshipStrength: 69, turnoutProbability: 68 },
    { householdId: "hh-pawar-dubere", name: "Meena Pawar", age: 43, gender: "Female", familyRole: "Primary influencer", occupation: "SHG convener", politicalLeaning: "Persuadable", supportScore: 60, influenceScore: 72, relationshipStrength: 57, turnoutProbability: 70 },
    { householdId: "hh-more-devpur", name: "Sanjay More", age: 38, gender: "Male", familyRole: "Worker", occupation: "Daily wage", politicalLeaning: "Neutral", supportScore: 45, influenceScore: 51, relationshipStrength: 42, turnoutProbability: 58 }
  ],
  influencers: [
    { householdId: "hh-jadhav-pangri", name: "Ramesh Jadhav", role: "Primary Influencer", influenceScore: 78, politicalAlignment: "Persuadable", relationshipStrength: 58, reach: 32, expectedImpact: 38 },
    { householdId: "hh-shinde-musalgaon", name: "Cooperative convener", role: "External Influencer", influenceScore: 84, politicalAlignment: "Opponent-leaning", relationshipStrength: 37, reach: 68, expectedImpact: 52 },
    { householdId: "hh-kale-sinnar", name: "Nilesh Kale", role: "Primary Influencer", influenceScore: 67, politicalAlignment: "Supportive", relationshipStrength: 69, reach: 24, expectedImpact: 32 },
    { householdId: "hh-pawar-dubere", name: "Meena Pawar", role: "Primary Influencer", influenceScore: 72, politicalAlignment: "Persuadable", relationshipStrength: 57, reach: 41, expectedImpact: 35 },
    { householdId: "hh-more-devpur", name: "Local benefits mediator", role: "External Influencer", influenceScore: 59, politicalAlignment: "Neutral", relationshipStrength: 44, reach: 18, expectedImpact: 22 }
  ],
  issues: [
    { householdId: "hh-jadhav-pangri", issue: "Irrigation", severity: "High", politicalImpact: 78, opportunity: 74, status: "Needs evidence visit" },
    { householdId: "hh-jadhav-pangri", issue: "Employment", severity: "Medium", politicalImpact: 58, opportunity: 62, status: "Youth follow-up" },
    { householdId: "hh-shinde-musalgaon", issue: "Cooperative influence", severity: "Critical", politicalImpact: 82, opportunity: 61, status: "Relationship risk" },
    { householdId: "hh-kale-sinnar", issue: "Employment", severity: "Critical", politicalImpact: 84, opportunity: 80, status: "Listening circle ready" },
    { householdId: "hh-pawar-dubere", issue: "Water", severity: "High", politicalImpact: 69, opportunity: 70, status: "SHG forum planning" },
    { householdId: "hh-more-devpur", issue: "Government benefits", severity: "High", politicalImpact: 64, opportunity: 57, status: "Needs verification" }
  ],
  support: [
    { householdId: "hh-jadhav-pangri", supportiveMembers: 2, opposingMembers: 1, neutralMembers: 1, persuadableMembers: 2, unknownMembers: 1 },
    { householdId: "hh-shinde-musalgaon", supportiveMembers: 1, opposingMembers: 4, neutralMembers: 1, persuadableMembers: 1, unknownMembers: 2 },
    { householdId: "hh-kale-sinnar", supportiveMembers: 3, opposingMembers: 0, neutralMembers: 1, persuadableMembers: 2, unknownMembers: 0 },
    { householdId: "hh-pawar-dubere", supportiveMembers: 2, opposingMembers: 1, neutralMembers: 2, persuadableMembers: 3, unknownMembers: 0 },
    { householdId: "hh-more-devpur", supportiveMembers: 1, opposingMembers: 1, neutralMembers: 2, persuadableMembers: 1, unknownMembers: 0 }
  ],
  visits: [
    { householdId: "hh-jadhav-pangri", visitDate: "2026-06-02", visitor: "Farmer Cell", purpose: "Irrigation issue intake", outcome: "Follow-up needed", notes: "Family wants visible ownership, not generic promise.", followUpRequired: "Yes", status: "Open" },
    { householdId: "hh-shinde-musalgaon", visitDate: "2026-05-29", visitor: "Political Desk", purpose: "Relationship bridge", outcome: "External influence identified", notes: "Use neutral farmer convener for next visit.", followUpRequired: "Yes", status: "Follow-up" },
    { householdId: "hh-kale-sinnar", visitDate: "2026-06-04", visitor: "Youth Outreach", purpose: "Jobs listening invitation", outcome: "Positive", notes: "Invite to MIDC listening circle.", followUpRequired: "No", status: "Completed" },
    { householdId: "hh-pawar-dubere", visitDate: "2026-06-01", visitor: "Women Outreach", purpose: "SHG issue forum", outcome: "Planning accepted", notes: "Water and healthcare were primary concerns.", followUpRequired: "Yes", status: "Planning" }
  ],
  engagement: [
    { householdId: "hh-jadhav-pangri", meetings: 2, phoneCalls: 4, issueResolution: 1, schemeAssistance: 0, eventsAttended: 1, volunteerEngagement: 1 },
    { householdId: "hh-shinde-musalgaon", meetings: 1, phoneCalls: 2, issueResolution: 0, schemeAssistance: 0, eventsAttended: 0, volunteerEngagement: 0 },
    { householdId: "hh-kale-sinnar", meetings: 3, phoneCalls: 5, issueResolution: 1, schemeAssistance: 0, eventsAttended: 2, volunteerEngagement: 2 },
    { householdId: "hh-pawar-dubere", meetings: 2, phoneCalls: 3, issueResolution: 1, schemeAssistance: 1, eventsAttended: 1, volunteerEngagement: 1 },
    { householdId: "hh-more-devpur", meetings: 1, phoneCalls: 1, issueResolution: 0, schemeAssistance: 1, eventsAttended: 0, volunteerEngagement: 0 }
  ],
  turnout: [
    { householdId: "hh-jadhav-pangri", expectedTurnout: 72, turnoutRisk: 38, firstTimeVoters: 1, seniorCitizens: 1, mobilizationNeeds: "Election day reminder and transport check", electionDayPlan: "Farmer volunteer morning call" },
    { householdId: "hh-shinde-musalgaon", expectedTurnout: 76, turnoutRisk: 28, firstTimeVoters: 0, seniorCitizens: 2, mobilizationNeeds: "Relationship risk management", electionDayPlan: "Do not antagonize; neutral contact only" },
    { householdId: "hh-kale-sinnar", expectedTurnout: 68, turnoutRisk: 46, firstTimeVoters: 1, seniorCitizens: 0, mobilizationNeeds: "Youth reminder chain", electionDayPlan: "Youth captain follow-up" },
    { householdId: "hh-pawar-dubere", expectedTurnout: 70, turnoutRisk: 40, firstTimeVoters: 0, seniorCitizens: 1, mobilizationNeeds: "Women group mobilization", electionDayPlan: "SHG reminder loop" },
    { householdId: "hh-more-devpur", expectedTurnout: 58, turnoutRisk: 62, firstTimeVoters: 0, seniorCitizens: 1, mobilizationNeeds: "Worker contact verification", electionDayPlan: "Booth worker pickup list" }
  ],
  persuasion: [
    { household: "Jadhav Family", persuasionScore: 76, reasons: "Irrigation issue, youth employment, reachable head of family", influencers: "Ramesh Jadhav, Farmer convener", recommendedMessaging: "Evidence-backed irrigation ownership", recommendedVisitor: "Uday Sangle + Farmer Cell", recommendedTiming: "Before Pangri village meeting", expectedVoteGain: 4 },
    { household: "Kale Family", persuasionScore: 72, reasons: "Youth employment concern and supportive worker network", influencers: "Nilesh Kale", recommendedMessaging: "Jobs, training, sports network", recommendedVisitor: "Youth Outreach", recommendedTiming: "Before MIDC listening circle", expectedVoteGain: 3 },
    { household: "Pawar Family", persuasionScore: 68, reasons: "Women-led SHG influence and water issue", influencers: "Meena Pawar", recommendedMessaging: "Water, safety, healthcare issue ownership", recommendedVisitor: "Women Outreach", recommendedTiming: "Before Dubere SHG forum", expectedVoteGain: 3 },
    { household: "More Family", persuasionScore: 54, reasons: "Needs verified benefits grievance; relationship is thin", influencers: "Local benefits mediator", recommendedMessaging: "Helpdesk-first, no public claim", recommendedVisitor: "Booth Ops", recommendedTiming: "After issue verification", expectedVoteGain: 2 }
  ],
  tasks: [
    { household: "Jadhav Family", openTasks: 4, pendingTasks: 2, overdueTasks: 1, completedTasks: 3, highestPriorityTask: "Schedule irrigation evidence visit" },
    { household: "Shinde Family", openTasks: 5, pendingTasks: 3, overdueTasks: 2, completedTasks: 1, highestPriorityTask: "Assign neutral relationship bridge" },
    { household: "Kale Family", openTasks: 2, pendingTasks: 1, overdueTasks: 0, completedTasks: 4, highestPriorityTask: "Invite to MIDC listening circle" },
    { household: "Pawar Family", openTasks: 3, pendingTasks: 2, overdueTasks: 0, completedTasks: 2, highestPriorityTask: "Confirm SHG forum attendance" },
    { household: "More Family", openTasks: 3, pendingTasks: 2, overdueTasks: 1, completedTasks: 0, highestPriorityTask: "Verify benefits grievance" }
  ],
  relationshipNodes: [
    { id: "rel-household", label: "Jadhav Family", type: "household", x: 50, y: 12 },
    { id: "rel-head", label: "Ramesh", type: "member", x: 30, y: 34 },
    { id: "rel-youth", label: "Amit", type: "member", x: 70, y: 34 },
    { id: "rel-convener", label: "Farmer convener", type: "influencer", x: 38, y: 60 },
    { id: "rel-farmer-cell", label: "Farmer Cell", type: "organization", x: 62, y: 60 },
    { id: "rel-sangle", label: "Uday Sangle", type: "political", x: 50, y: 84 }
  ],
  relationshipEdges: [
    { from: "rel-household", to: "rel-head", strength: 78 },
    { from: "rel-household", to: "rel-youth", strength: 54 },
    { from: "rel-head", to: "rel-convener", strength: 66 },
    { from: "rel-convener", to: "rel-farmer-cell", strength: 61 },
    { from: "rel-farmer-cell", to: "rel-sangle", strength: 72 },
    { from: "rel-youth", to: "rel-sangle", strength: 48 }
  ],
  recommendations: [
    { recommendation: "Visit the Jadhav Family before the Pangri irrigation meeting.", reason: "They are persuadable, influential, and connected to a farmer cluster that can move votes.", confidence: 58, expectedVotes: 4, priority: "High", actionLabel: "Schedule Visit" },
    { recommendation: "Assign a neutral bridge for the Shinde Family in Musalgaon.", reason: "High influence plus opponent-leaning external pressure makes this a vote-loss risk.", confidence: 50, expectedVotes: 6, priority: "Critical", actionLabel: "Assign Volunteer" },
    { recommendation: "Use Kale Family as a youth employment listening anchor.", reason: "Supportive worker network can expand MIDC youth outreach if handled quickly.", confidence: 61, expectedVotes: 3, priority: "High", actionLabel: "Create Outreach Plan" },
    { recommendation: "Verify the More Family benefits issue before persuasion messaging.", reason: "Low confidence and high turnout risk require source discipline before any political promise.", confidence: 42, expectedVotes: 2, priority: "Medium", actionLabel: "Create Task" }
  ],
  comparisons: [
    { household: "Jadhav Family", support: 56, influence: 74, issues: "Irrigation, employment", turnout: 72, persuasion: 76, relationshipStrength: 58 },
    { household: "Shinde Family", support: 42, influence: 86, issues: "Cooperative pressure", turnout: 76, persuasion: 43, relationshipStrength: 39 },
    { household: "Kale Family", support: 64, influence: 69, issues: "Employment", turnout: 68, persuasion: 72, relationshipStrength: 66 },
    { household: "Pawar Family", support: 59, influence: 63, issues: "Water, healthcare", turnout: 70, persuasion: 68, relationshipStrength: 55 }
  ]
};
