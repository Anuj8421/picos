import type { TurnoutIntelligenceData } from "./types";

export const turnoutIntelligenceData: TurnoutIntelligenceData = {
  overview: [
    { label: "Expected Turnout", value: "68.4%", trend: "Up", change: 4, confidence: 52 },
    { label: "Turnout Risk Voters", value: "14.8K", trend: "Down", change: -3, confidence: 49 },
    { label: "High Priority Voters", value: "9.4K", trend: "Up", change: 8, confidence: 51 },
    { label: "First Time Voters", value: "6.2K", trend: "Up", change: 11, confidence: 50 },
    { label: "Senior Citizen Voters", value: "8.1K", trend: "Stable", change: 1, confidence: 47 },
    { label: "Women Voters", value: "78.6K", trend: "Up", change: 3, confidence: 46 },
    { label: "Mobilization Opportunities", value: "11.2K", trend: "Up", change: 10, confidence: 50 },
    { label: "Expected Vote Gain", value: "7.8K", trend: "Up", change: 12, confidence: 48 }
  ],
  command: [
    { label: "Supporters Likely To Vote", value: "62.4K", detail: "Support base with current turnout probability above 70%.", tone: "positive" },
    { label: "Supporters Unlikely To Vote", value: "14.8K", detail: "Supporters requiring transport, reminders, or household follow-up.", tone: "risk" },
    { label: "Persuaded But Unconfirmed", value: "5.6K", detail: "Recently persuaded voters not yet confirmed for election-day plan.", tone: "watch" },
    { label: "Election-Day Risk Voters", value: "4.3K", detail: "High support, high friction, low confirmation clusters.", tone: "risk" },
    { label: "High Value Supporters", value: "9.4K", detail: "High influence or high booth impact supporters requiring protection.", tone: "positive" },
    { label: "Critical Mobilization Targets", value: "23", detail: "Villages, booths, and segments needing immediate operations ownership.", tone: "watch" }
  ],
  heatMap: [
    { id: "tm-sinnar-102", village: "Sinnar Town", booth: "Booth 102", community: "Youth", age: "18-25", gender: "Mixed", supportLevel: "Supportive", classification: "Mobilization Opportunity", expectedTurnout: 64, turnoutRisk: 41, mobilizationOpportunity: 82, electionDayPriority: "Critical", x: 50, y: 23 },
    { id: "tm-pangri-044", village: "Pangri", booth: "Booth 044", community: "Farmers", age: "36-55", gender: "Mixed", supportLevel: "Supportive", classification: "Election-Day Priority", expectedTurnout: 61, turnoutRisk: 58, mobilizationOpportunity: 76, electionDayPriority: "High", x: 31, y: 43 },
    { id: "tm-musalgaon-067", village: "Musalgaon", booth: "Booth 067", community: "Farmers", age: "36-60", gender: "Mixed", supportLevel: "Persuadable", classification: "Turnout Risk", expectedTurnout: 55, turnoutRisk: 66, mobilizationOpportunity: 73, electionDayPriority: "Critical", x: 68, y: 38 },
    { id: "tm-dubere-071", village: "Dubere", booth: "Booth 071", community: "Women", age: "26-55", gender: "Women", supportLevel: "Supportive", classification: "Weak Turnout", expectedTurnout: 59, turnoutRisk: 54, mobilizationOpportunity: 62, electionDayPriority: "Medium", x: 42, y: 68 },
    { id: "tm-devpur-086", village: "Devpur", booth: "Booth 086", community: "SC", age: "55+", gender: "Mixed", supportLevel: "Supportive", classification: "Turnout Risk", expectedTurnout: 52, turnoutRisk: 71, mobilizationOpportunity: 64, electionDayPriority: "High", x: 74, y: 71 },
    { id: "tm-wavi-093", village: "Wavi", booth: "Booth 093", community: "Maratha", age: "26-45", gender: "Mixed", supportLevel: "Neutral", classification: "Strong Turnout", expectedTurnout: 73, turnoutRisk: 25, mobilizationOpportunity: 43, electionDayPriority: "Low", x: 23, y: 76 }
  ],
  targets: [
    { target: "Youth supporters not yet confirmed", type: "Voter Segment", village: "Sinnar Town", currentTurnoutProbability: 54, potentialTurnout: 76, expectedVotes: 1900, priority: "Critical", recommendedAction: "Assign youth volunteer reminder teams and event-day confirmation calls", owner: "Youth Outreach", status: "Contacted" },
    { target: "Pangri farmer supporters needing transport", type: "Village", village: "Pangri", currentTurnoutProbability: 57, potentialTurnout: 73, expectedVotes: 1320, priority: "High", recommendedAction: "Create transport list and morning booth route plan", owner: "Farmer Cell", status: "Identified" },
    { target: "Musalgaon cooperative-linked supporters", type: "Booth", village: "Musalgaon", currentTurnoutProbability: 49, potentialTurnout: 65, expectedVotes: 1180, priority: "Critical", recommendedAction: "Confirm supporter list through neutral booth validators", owner: "Booth Command", status: "Unknown" },
    { target: "Dubere women household clusters", type: "Household", village: "Dubere", currentTurnoutProbability: 58, potentialTurnout: 71, expectedVotes: 820, priority: "Medium", recommendedAction: "Women volunteer follow-up with polling-day assistance checklist", owner: "Women Outreach", status: "Reminded" },
    { target: "Devpur senior citizen supporters", type: "Voter Segment", village: "Devpur", currentTurnoutProbability: 46, potentialTurnout: 66, expectedVotes: 720, priority: "High", recommendedAction: "Build assisted voting and transport roster", owner: "Senior Voter Desk", status: "Identified" },
    { target: "Wavi low-touch supporters", type: "Village", village: "Wavi", currentTurnoutProbability: 62, potentialTurnout: 70, expectedVotes: 460, priority: "Medium", recommendedAction: "Run final-week phone confirmation and booth slip distribution", owner: "Village Coordinator", status: "Confirmed" }
  ],
  communities: [
    { community: "Youth", expectedTurnout: 58, historicalTurnout: 61, turnoutRisk: 49, mobilizationPotential: 1900, priority: "Critical" },
    { community: "Farmers", expectedTurnout: 62, historicalTurnout: 67, turnoutRisk: 44, mobilizationPotential: 2500, priority: "Critical" },
    { community: "Women", expectedTurnout: 64, historicalTurnout: 66, turnoutRisk: 38, mobilizationPotential: 1500, priority: "High" },
    { community: "Maratha", expectedTurnout: 69, historicalTurnout: 71, turnoutRisk: 29, mobilizationPotential: 980, priority: "Medium" },
    { community: "Mali", expectedTurnout: 61, historicalTurnout: 63, turnoutRisk: 42, mobilizationPotential: 760, priority: "Medium" },
    { community: "Vanjari", expectedTurnout: 63, historicalTurnout: 65, turnoutRisk: 36, mobilizationPotential: 640, priority: "Medium" },
    { community: "Dhangar", expectedTurnout: 60, historicalTurnout: 62, turnoutRisk: 41, mobilizationPotential: 420, priority: "Low" },
    { community: "SC", expectedTurnout: 56, historicalTurnout: 60, turnoutRisk: 53, mobilizationPotential: 720, priority: "High" },
    { community: "ST", expectedTurnout: 55, historicalTurnout: 58, turnoutRisk: 50, mobilizationPotential: 260, priority: "Low" },
    { community: "Minority", expectedTurnout: 59, historicalTurnout: 62, turnoutRisk: 46, mobilizationPotential: 310, priority: "Medium" },
    { community: "Business Community", expectedTurnout: 66, historicalTurnout: 68, turnoutRisk: 31, mobilizationPotential: 390, priority: "Low" }
  ],
  villages: [
    { village: "Sinnar Town", expectedTurnout: 64, historicalTurnout: 68, supportBase: 18400, mobilizationNeed: 82, expectedVotes: 1900, priority: "Critical" },
    { village: "Pangri", expectedTurnout: 61, historicalTurnout: 66, supportBase: 9400, mobilizationNeed: 76, expectedVotes: 1320, priority: "High" },
    { village: "Musalgaon", expectedTurnout: 55, historicalTurnout: 64, supportBase: 8800, mobilizationNeed: 85, expectedVotes: 1180, priority: "Critical" },
    { village: "Dubere", expectedTurnout: 59, historicalTurnout: 63, supportBase: 4200, mobilizationNeed: 63, expectedVotes: 820, priority: "Medium" },
    { village: "Devpur", expectedTurnout: 52, historicalTurnout: 60, supportBase: 3600, mobilizationNeed: 71, expectedVotes: 720, priority: "High" },
    { village: "Wavi", expectedTurnout: 73, historicalTurnout: 70, supportBase: 3100, mobilizationNeed: 34, expectedVotes: 460, priority: "Low" }
  ],
  booths: [
    { booth: "Booth 102", registeredVoters: 1240, supporters: 620, expectedTurnout: 64, targetTurnout: 78, risk: 41, boothReadiness: 58, coordinator: "Youth Booth Team", priority: "Critical" },
    { booth: "Booth 044", registeredVoters: 980, supporters: 510, expectedTurnout: 61, targetTurnout: 75, risk: 58, boothReadiness: 52, coordinator: "Farmer Cell", priority: "High" },
    { booth: "Booth 067", registeredVoters: 1080, supporters: 480, expectedTurnout: 55, targetTurnout: 72, risk: 66, boothReadiness: 45, coordinator: "Booth Command", priority: "Critical" },
    { booth: "Booth 071", registeredVoters: 760, supporters: 390, expectedTurnout: 59, targetTurnout: 72, risk: 54, boothReadiness: 61, coordinator: "Women Outreach", priority: "Medium" },
    { booth: "Booth 086", registeredVoters: 690, supporters: 330, expectedTurnout: 52, targetTurnout: 68, risk: 71, boothReadiness: 49, coordinator: "Senior Voter Desk", priority: "High" },
    { booth: "Booth 093", registeredVoters: 720, supporters: 360, expectedTurnout: 73, targetTurnout: 76, risk: 25, boothReadiness: 74, coordinator: "Village Coordinator", priority: "Low" }
  ],
  households: [
    { household: "Sinnar youth supporter clusters", supportLevel: "Supportive", turnoutProbability: 54, risk: 45, influencer: "Youth sports organizers", expectedVotes: 260, recommendedFollowUp: "Volunteer call plus event-day reminder", priority: "Critical" },
    { household: "Pangri transport-needed clusters", supportLevel: "Supportive", turnoutProbability: 57, risk: 58, influencer: "Farmer group captains", expectedVotes: 180, recommendedFollowUp: "Add to transport route and morning confirmation", priority: "High" },
    { household: "Musalgaon low-confirmation clusters", supportLevel: "Persuadable Support", turnoutProbability: 49, risk: 66, influencer: "Cooperative validators", expectedVotes: 220, recommendedFollowUp: "Validator confirmation before booth-day operations", priority: "Critical" },
    { household: "Dubere women supporter clusters", supportLevel: "Supportive", turnoutProbability: 58, risk: 48, influencer: "SHG cluster conveners", expectedVotes: 140, recommendedFollowUp: "Women volunteer visit and assistance check", priority: "Medium" },
    { household: "Devpur senior assistance clusters", supportLevel: "Supportive", turnoutProbability: 46, risk: 71, influencer: "Clinic and health volunteers", expectedVotes: 110, recommendedFollowUp: "Assisted voting roster and transport confirmation", priority: "High" }
  ],
  firstTimeVoters: [
    { segment: "Sinnar Town first-time voters", totalVoters: 2100, villageDistribution: "Sinnar Town 52%, Wavi 14%, Dubere 11%", communityDistribution: "Youth, Maratha, Women", engagementLevel: 62, supportLevel: 57, turnoutProbability: 54, priorityActions: "Campus-style youth calls, booth-slip help, event-day reminders", priority: "Critical" },
    { segment: "Rural first-time voter clusters", totalVoters: 1800, villageDistribution: "Pangri 24%, Musalgaon 21%, Devpur 13%", communityDistribution: "Farmers, Youth, Mali", engagementLevel: 49, supportLevel: 53, turnoutProbability: 48, priorityActions: "Volunteer home visits and family-level voting plan", priority: "High" },
    { segment: "Women first-time voter clusters", totalVoters: 950, villageDistribution: "Dubere 22%, Sinnar Town 20%, Devpur 18%", communityDistribution: "Women, SC, Mali", engagementLevel: 54, supportLevel: 58, turnoutProbability: 51, priorityActions: "SHG conveners plus polling-day assistance plan", priority: "High" },
    { segment: "Low-engagement first-time voters", totalVoters: 1350, villageDistribution: "Musalgaon 26%, Pangri 18%, Wavi 12%", communityDistribution: "Youth, Farmers", engagementLevel: 38, supportLevel: 45, turnoutProbability: 41, priorityActions: "Direct confirmation and WhatsApp reminder chain", priority: "Medium" }
  ],
  seniorCitizens: [
    { segment: "Devpur senior supporters", totalSeniorCitizens: 980, supportLevel: 56, turnoutRisk: 71, transportationNeeds: 220, specialAssistanceNeeded: "Transport, companion volunteer, booth slip assistance", electionDayPlan: "Morning transport route with senior voter desk owner", priority: "High" },
    { segment: "Pangri senior farmer households", totalSeniorCitizens: 1240, supportLevel: 61, turnoutRisk: 54, transportationNeeds: 180, specialAssistanceNeeded: "Route planning and medical support escalation", electionDayPlan: "Pre-noon booth movement with farmer cell volunteers", priority: "High" },
    { segment: "Sinnar Town senior clusters", totalSeniorCitizens: 2100, supportLevel: 59, turnoutRisk: 42, transportationNeeds: 260, specialAssistanceNeeded: "Phone confirmation and booth help desk", electionDayPlan: "Ward-level vehicle assignment", priority: "Medium" },
    { segment: "Wavi senior supporters", totalSeniorCitizens: 680, supportLevel: 64, turnoutRisk: 28, transportationNeeds: 70, specialAssistanceNeeded: "Reminder call only for most clusters", electionDayPlan: "Monitor turnout by 11 AM", priority: "Low" }
  ],
  womenTurnout: [
    { segment: "SHG network supporters", supportLevel: 62, turnoutProbability: 58, communityBreakdown: "Women, Mali, SC", villageBreakdown: "Dubere, Devpur, Sinnar Town", mobilizationOpportunity: 980, priority: "High" },
    { segment: "Water issue affected women", supportLevel: 57, turnoutProbability: 55, communityBreakdown: "Women, Farmers", villageBreakdown: "Dubere, Pangri", mobilizationOpportunity: 620, priority: "High" },
    { segment: "Urban women service voters", supportLevel: 60, turnoutProbability: 63, communityBreakdown: "Women, Business, Youth", villageBreakdown: "Sinnar Town", mobilizationOpportunity: 430, priority: "Medium" },
    { segment: "Low-contact women households", supportLevel: 52, turnoutProbability: 49, communityBreakdown: "Women, SC, Mali", villageBreakdown: "Devpur, Musalgaon", mobilizationOpportunity: 510, priority: "Medium" }
  ],
  campaigns: [
    { campaign: "Door-to-Door Confirmation", coverage: 48, impact: 72, status: "Active", expectedVotes: 2100, owner: "Booth Command", priority: "Critical" },
    { campaign: "Phone Outreach", coverage: 54, impact: 61, status: "Active", expectedVotes: 1250, owner: "Volunteer Desk", priority: "High" },
    { campaign: "Volunteer Outreach", coverage: 42, impact: 66, status: "Needs staffing", expectedVotes: 1400, owner: "Volunteer Management", priority: "High" },
    { campaign: "Influencer Outreach", coverage: 36, impact: 58, status: "Planning", expectedVotes: 860, owner: "Influencer Desk", priority: "Medium" },
    { campaign: "Community Meetings", coverage: 39, impact: 52, status: "Scheduled", expectedVotes: 720, owner: "Community Desk", priority: "Medium" },
    { campaign: "Transportation Support", coverage: 28, impact: 69, status: "At risk", expectedVotes: 980, owner: "Election-Day Ops", priority: "Critical" },
    { campaign: "Reminder Campaigns", coverage: 63, impact: 57, status: "Active", expectedVotes: 510, owner: "WhatsApp Operations", priority: "Medium" }
  ],
  electionDayOperations: [
    { operation: "Booth Readiness", readiness: 58, riskAlerts: "Booths 067, 086 need stronger coordinator confirmation", owner: "Booth Command", status: "At risk", priority: "Critical" },
    { operation: "Volunteer Readiness", readiness: 61, riskAlerts: "Volunteer coverage weak in Musalgaon and Devpur", owner: "Volunteer Desk", status: "Needs staffing", priority: "High" },
    { operation: "Transportation Readiness", readiness: 46, riskAlerts: "Senior and farmer transport list incomplete", owner: "Election-Day Ops", status: "At risk", priority: "Critical" },
    { operation: "Communication Readiness", readiness: 72, riskAlerts: "WhatsApp reminder chain ready, phone fallback pending", owner: "WhatsApp Operations", status: "Active", priority: "Medium" },
    { operation: "Issue Escalation Readiness", readiness: 55, riskAlerts: "Polling-day issue escalation owner needed per critical booth", owner: "War Room", status: "Planning", priority: "High" }
  ],
  pipeline: [
    { stage: "Identified", voters: 14800, expectedVotes: 7800 },
    { stage: "Contacted", voters: 9100, expectedVotes: 5300 },
    { stage: "Confirmed", voters: 6200, expectedVotes: 4300 },
    { stage: "Reminded", voters: 3900, expectedVotes: 2800 },
    { stage: "Mobilized", voters: 2100, expectedVotes: 1700 },
    { stage: "Voted", voters: 0, expectedVotes: 0 },
    { stage: "Unknown", voters: 4300, expectedVotes: 1200 }
  ],
  voteProtection: [
    { area: "Musalgaon booth cluster", highValueSupporters: 1180, criticalBooths: "Booth 067", criticalVillages: "Musalgaon", criticalCommunities: "Farmers", potentialRisks: "Low confirmation and weak booth readiness", escalationPlan: "War-room owner plus booth validator by 10 AM", priority: "Critical" },
    { area: "Sinnar youth cluster", highValueSupporters: 1900, criticalBooths: "Booth 102", criticalVillages: "Sinnar Town", criticalCommunities: "Youth", potentialRisks: "Support exists but election-day confirmation is weak", escalationPlan: "Youth team reminder chain and turnout check every 2 hours", priority: "Critical" },
    { area: "Devpur senior supporters", highValueSupporters: 720, criticalBooths: "Booth 086", criticalVillages: "Devpur", criticalCommunities: "SC, senior voters", potentialRisks: "Transport and assistance friction", escalationPlan: "Senior transport roster and health volunteer escalation", priority: "High" },
    { area: "Pangri farmer supporters", highValueSupporters: 1320, criticalBooths: "Booth 044", criticalVillages: "Pangri", criticalCommunities: "Farmers", potentialRisks: "Morning turnout lag and transport gaps", escalationPlan: "Farmer cell morning mobilization route", priority: "High" }
  ],
  forecasts: [
    { segment: "Total mobilization program", bestCase: 9800, likelyCase: 7800, worstCase: 3900, expectedVotes: 7800, additionalVotesPossible: 3200, turnoutGap: 6100 },
    { segment: "Critical booth operations", bestCase: 4200, likelyCase: 3100, worstCase: 1500, expectedVotes: 3100, additionalVotesPossible: 1400, turnoutGap: 2100 },
    { segment: "Village mobilization", bestCase: 3600, likelyCase: 2600, worstCase: 1200, expectedVotes: 2600, additionalVotesPossible: 900, turnoutGap: 1800 },
    { segment: "Senior and transport support", bestCase: 1800, likelyCase: 1200, worstCase: 500, expectedVotes: 1200, additionalVotesPossible: 520, turnoutGap: 980 },
    { segment: "First-time voter confirmation", bestCase: 2400, likelyCase: 1700, worstCase: 700, expectedVotes: 1700, additionalVotesPossible: 800, turnoutGap: 1500 }
  ],
  recommendations: [
    { recommendation: "Treat transportation readiness as the first election-day blocker.", reason: "Senior, farmer, and low-mobility supporter clusters have high support but low turnout confidence.", confidence: 51, expectedVotes: 1200, priority: "Critical", actionLabel: "Create Transportation Plan" },
    { recommendation: "Move Musalgaon Booth 067 into command monitoring.", reason: "It combines low expected turnout, high risk, weak booth readiness, and meaningful supporter volume.", confidence: 50, expectedVotes: 1180, priority: "Critical", actionLabel: "Create Booth Task" },
    { recommendation: "Confirm Sinnar Town youth supporters before expanding persuasion work.", reason: "Existing support can be lost if first-time and youth voters are not reminded and routed to booths.", confidence: 55, expectedVotes: 1900, priority: "Critical", actionLabel: "Assign Volunteer Team" },
    { recommendation: "Use SHG conveners for women turnout confirmation, not only message distribution.", reason: "Women clusters show support but require household-level polling-day assistance.", confidence: 49, expectedVotes: 980, priority: "High", actionLabel: "Create Mobilization Campaign" },
    { recommendation: "Create a 10 AM turnout escalation rule for every critical booth.", reason: "Early lag detection prevents support leakage and gives volunteers time to recover voters.", confidence: 53, expectedVotes: 1600, priority: "High", actionLabel: "Generate Election-Day Brief" }
  ],
  tasks: [
    { campaign: "Door-to-Door Confirmation", openTasks: 14, pendingTasks: 9, overdueTasks: 3, completedTasks: 8, highestPriorityTask: "Finish Musalgaon supporter confirmation list" },
    { campaign: "Transportation Support", openTasks: 11, pendingTasks: 8, overdueTasks: 4, completedTasks: 2, highestPriorityTask: "Confirm senior citizen transport route owners" },
    { campaign: "Booth Readiness", openTasks: 10, pendingTasks: 6, overdueTasks: 2, completedTasks: 5, highestPriorityTask: "Assign booth 067 escalation owner" },
    { campaign: "First-Time Voter Confirmation", openTasks: 8, pendingTasks: 6, overdueTasks: 1, completedTasks: 4, highestPriorityTask: "Youth reminder list for Sinnar Town" },
    { campaign: "Women Turnout Follow-Up", openTasks: 7, pendingTasks: 4, overdueTasks: 0, completedTasks: 5, highestPriorityTask: "SHG household assistance checklist" }
  ],
  alerts: [
    { alert: "Transportation readiness below safe threshold", type: "Critical Alert", priority: "Critical", owner: "Election-Day Ops", status: "At risk" },
    { alert: "Booth 067 requires command monitoring", type: "Booth Alert", priority: "Critical", owner: "Booth Command", status: "Open" },
    { alert: "Musalgaon turnout risk is increasing", type: "Village Alert", priority: "Critical", owner: "Village Coordinator", status: "Open" },
    { alert: "Volunteer coverage weak in Devpur", type: "Volunteer Alert", priority: "High", owner: "Volunteer Desk", status: "Needs staffing" },
    { alert: "Youth supporter confirmation below target", type: "Turnout Alert", priority: "High", owner: "Youth Outreach", status: "Active" }
  ]
};
