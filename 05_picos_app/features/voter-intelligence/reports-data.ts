import type { VoterReportsData } from "./types";

export const voterReportsData: VoterReportsData = {
  overview: [
    { label: "Reports Generated", value: "128", trend: "Up", change: 18, confidence: 62 },
    { label: "Scheduled Reports", value: "17", trend: "Up", change: 9, confidence: 67 },
    { label: "Pending Reports", value: "11", trend: "Down", change: -6, confidence: 58 },
    { label: "Draft Reports", value: "7", trend: "Stable", change: 0, confidence: 55 },
    { label: "Published Reports", value: "46", trend: "Up", change: 12, confidence: 64 },
    { label: "Report Consumers", value: "5 teams", trend: "Stable", change: 0, confidence: 70 },
    { label: "Last Generated", value: "Today 08:30", trend: "Stable", change: 0, confidence: 72 }
  ],
  library: [
    {
      id: "daily-voter-brief",
      title: "Daily Voter Brief",
      type: "Daily Reports",
      status: "Generated",
      priority: "Critical",
      consumer: "Candidate",
      lastGenerated: "Today 08:30",
      owner: "War Room Desk",
      sourceLayer: "Support, turnout, persuasion, village movement",
      summary: "Candidate-facing brief on what changed, what requires action, and what Uday Sangle should do today."
    },
    {
      id: "weekly-strategy-report",
      title: "Weekly Strategy Report",
      type: "Weekly Reports",
      status: "Draft",
      priority: "Critical",
      consumer: "Campaign Manager",
      lastGenerated: "Yesterday 21:00",
      owner: "Strategy Cell",
      sourceLayer: "Support movement, turnout movement, persuasion progress",
      summary: "Weekly operating strategy for vote gain, risk defense, and resource allocation."
    },
    {
      id: "monthly-readiness-report",
      title: "Monthly Election Readiness Report",
      type: "Monthly Reports",
      status: "Scheduled",
      priority: "High",
      consumer: "Campaign Manager",
      lastGenerated: "May 31",
      owner: "Election Analytics",
      sourceLayer: "Readiness, booths, volunteers, influencers",
      summary: "Monthly rollup of campaign readiness and structural gaps."
    },
    {
      id: "community-youth-report",
      title: "Youth Community Strategy Report",
      type: "Community Reports",
      status: "Generated",
      priority: "Critical",
      consumer: "Community Teams",
      lastGenerated: "Today 07:15",
      owner: "Youth Desk",
      sourceLayer: "Segments, community sentiment, influencer network",
      summary: "Youth support is high but turnout conversion needs confirmed reminder owners."
    },
    {
      id: "village-musalgaon-report",
      title: "Musalgaon Risk And Opportunity Report",
      type: "Village Reports",
      status: "Pending",
      priority: "Critical",
      consumer: "Candidate",
      lastGenerated: "2 days ago",
      owner: "Village Desk",
      sourceLayer: "Village support, cooperative risk, farmer issues",
      summary: "Village needs immediate relationship defense and a neutral cooperative bridge."
    },
    {
      id: "household-influence-report",
      title: "High Influence Household Report",
      type: "Household Reports",
      status: "Draft",
      priority: "High",
      consumer: "Booth Coordinators",
      lastGenerated: "Yesterday 18:20",
      owner: "Booth Ops",
      sourceLayer: "Household intelligence and local influencers",
      summary: "Prioritizes household clusters that can move multi-family voting behavior."
    },
    {
      id: "influencer-reach-report",
      title: "Influencer Reach And Risk Report",
      type: "Influencer Reports",
      status: "Generated",
      priority: "High",
      consumer: "Campaign Manager",
      lastGenerated: "Today 06:40",
      owner: "Relationship Desk",
      sourceLayer: "Influencer alignment, reach, relationship strength",
      summary: "Ranks influencers by vote impact, relationship risk, and next engagement action."
    },
    {
      id: "turnout-risk-report",
      title: "Turnout Risk Report",
      type: "Turnout Reports",
      status: "Generated",
      priority: "Critical",
      consumer: "Booth Coordinators",
      lastGenerated: "Today 08:05",
      owner: "Turnout Desk",
      sourceLayer: "Turnout risk, booth readiness, volunteer coverage",
      summary: "Identifies supporter clusters that may not convert without field follow-up."
    },
    {
      id: "persuasion-gain-report",
      title: "Persuasion Vote Gain Report",
      type: "Persuasion Reports",
      status: "Scheduled",
      priority: "High",
      consumer: "Campaign Manager",
      lastGenerated: "Yesterday 20:05",
      owner: "Persuasion Desk",
      sourceLayer: "Conversion matrix, issues, message effectiveness",
      summary: "Ranks conversion opportunities by expected vote gain and probability."
    },
    {
      id: "election-readiness-report",
      title: "Election Readiness Report",
      type: "Election Readiness Reports",
      status: "Pending",
      priority: "Critical",
      consumer: "Candidate",
      lastGenerated: "3 days ago",
      owner: "War Room Desk",
      sourceLayer: "Readiness, tasks, booth status, volunteer gaps",
      summary: "Shows whether the campaign is structurally ready to turn support into votes."
    }
  ],
  dailyBrief: [
    {
      section: "Support Changes",
      finding: "Youth and women support moved upward, but cooperative-linked farmer support softened in Musalgaon.",
      change: "+1.8K likely supporters / -980 at-risk supporters",
      recommendedAction: "Schedule a Musalgaon bridge meeting and confirm youth turnout owners.",
      priority: "Critical",
      confidence: 54
    },
    {
      section: "Community Changes",
      finding: "Farmers are responsive to irrigation proof, while cooperative members need relationship repair.",
      change: "Farmers stable, cooperative members down",
      recommendedAction: "Build an evidence packet before the next farmer visit.",
      priority: "High",
      confidence: 51
    },
    {
      section: "Village Changes",
      finding: "Sinnar Town and Pangri show gains; Musalgaon and Devpur show risk drift.",
      change: "2 gain villages / 2 risk villages",
      recommendedAction: "Send separate field tasks for gain conversion and risk defense.",
      priority: "Critical",
      confidence: 49
    },
    {
      section: "Influencer Changes",
      finding: "Youth sports organizers can move turnout; cooperative office bearers remain unresolved.",
      change: "3 influencer clusters moved positive / 1 high-risk cluster",
      recommendedAction: "Uday should personally call the top two neutral cooperative connectors.",
      priority: "Critical",
      confidence: 50
    },
    {
      section: "Risks",
      finding: "Turnout risk can erase some of the current support gains.",
      change: "14.8K supportive voters still unlikely to vote",
      recommendedAction: "Launch supporter confirmation and reminder chain tasks.",
      priority: "Critical",
      confidence: 56
    },
    {
      section: "Opportunities",
      finding: "Youth, farmers, and SHG networks have the largest near-term vote gain potential.",
      change: "Expected gain pool 8.1K to 12.4K votes",
      recommendedAction: "Run three parallel tracks: youth turnout, farmer proof visits, SHG trust forums.",
      priority: "High",
      confidence: 52
    },
    {
      section: "Recommended Actions",
      finding: "The candidate should act on relationship repair before message expansion.",
      change: "Action priority shifted from broadcast to field confirmation",
      recommendedAction: "Spend this week on Musalgaon, youth turnout, farmer evidence, and women SHG conveners.",
      priority: "Critical",
      confidence: 57
    }
  ],
  weeklyStrategy: [
    { metric: "Support Movement", current: "+6% net movement", movement: "Up", expectedVoteGain: 5300, priorityAction: "Convert soft youth support into confirmed turnout", priority: "Critical" },
    { metric: "Turnout Movement", current: "68% expected turnout", movement: "Stable", expectedVoteGain: 7800, priorityAction: "Close supporter reminder gaps in priority booths", priority: "Critical" },
    { metric: "Persuasion Progress", current: "12.4K expected conversion pool", movement: "Up", expectedVoteGain: 12400, priorityAction: "Focus on farmer irrigation proof and women SHG trust", priority: "High" },
    { metric: "Community Trends", current: "Youth and women positive", movement: "Up", expectedVoteGain: 4100, priorityAction: "Build community-specific weekly briefs", priority: "High" },
    { metric: "Village Trends", current: "2 gain / 2 risk villages", movement: "Mixed", expectedVoteGain: 5700, priorityAction: "Protect Musalgaon while expanding Pangri", priority: "Critical" },
    { metric: "Expected Vote Gain", current: "18.9K ceiling", movement: "Up", expectedVoteGain: 18900, priorityAction: "Prioritize confidence-backed gains first", priority: "High" },
    { metric: "Priority Actions", current: "24 active tasks", movement: "Up", expectedVoteGain: 6400, priorityAction: "Close overdue verification and field confirmation tasks", priority: "High" }
  ],
  communityReports: [
    { title: "Maratha Report", scope: "Community support, local leaders, village distribution", output: "Candidate visit and influencer plan", actionTrigger: "Public alignment from trusted village anchors", priority: "High", readiness: 71 },
    { title: "Mali Report", scope: "Issue response, persuasion, turnout pockets", output: "Community-specific message sheet", actionTrigger: "Run follow-up meetings in high opportunity villages", priority: "Medium", readiness: 63 },
    { title: "Vanjari Report", scope: "Support posture, risks, local connectors", output: "Relationship map and village watchlist", actionTrigger: "Verify leadership alignment before outreach", priority: "Medium", readiness: 58 },
    { title: "Dhangar Report", scope: "Sentiment, issue map, mobilization needs", output: "Community meeting plan", actionTrigger: "Identify two credible local conveners", priority: "Medium", readiness: 56 },
    { title: "Women Report", scope: "SHG networks, household trust, safety issues", output: "Women outreach calendar", actionTrigger: "Schedule SHG-hosted issue forums", priority: "High", readiness: 74 },
    { title: "Youth Report", scope: "Jobs, sports, first-time voters, turnout risk", output: "Youth turnout and engagement plan", actionTrigger: "Assign reminder chain owners", priority: "Critical", readiness: 79 },
    { title: "Farmers Report", scope: "Irrigation, crop prices, cooperative influence", output: "Evidence visit plan", actionTrigger: "Collect proof packet before public messaging", priority: "Critical", readiness: 68 },
    { title: "Custom Community Reports", scope: "Selected community, issue, village, and date range", output: "Custom campaign brief", actionTrigger: "Generate when a field signal changes", priority: "High", readiness: 62 }
  ],
  villageReports: [
    { title: "Village Summary", scope: "Support, turnout, issues, influencers", output: "One-page village brief", actionTrigger: "Before each candidate visit", priority: "High", readiness: 76 },
    { title: "Village Intelligence", scope: "Full village profile and movement", output: "War room planning sheet", actionTrigger: "Weekly review for priority villages", priority: "High", readiness: 70 },
    { title: "Village Risks", scope: "Vote loss, opponent activity, relationship weakness", output: "Risk mitigation packet", actionTrigger: "When risk score crosses high", priority: "Critical", readiness: 66 },
    { title: "Village Opportunities", scope: "Gain pools, persuasion pockets, influencer support", output: "Vote gain plan", actionTrigger: "When expected gain crosses 500 votes", priority: "High", readiness: 72 },
    { title: "Village Influencers", scope: "Local anchors and relationship status", output: "Influencer engagement brief", actionTrigger: "Before candidate or coordinator calls", priority: "High", readiness: 69 },
    { title: "Village Support", scope: "Support, opposition, neutral, persuadable", output: "Support conversion dashboard", actionTrigger: "When movement changes week over week", priority: "Critical", readiness: 73 },
    { title: "Village Visit Recommendations", scope: "Visit purpose, visitor, expected outcome", output: "Candidate travel decision memo", actionTrigger: "Before weekly route planning", priority: "Critical", readiness: 75 }
  ],
  householdReports: [
    { title: "High Influence Households", scope: "Households with multi-family vote influence", output: "Priority visit list", actionTrigger: "Assign senior relationship owner", priority: "High", readiness: 61 },
    { title: "Persuadable Households", scope: "Neutral and soft support homes", output: "Persuasion call sheet", actionTrigger: "After village issue validation", priority: "High", readiness: 58 },
    { title: "At Risk Households", scope: "Supportive homes showing drift", output: "Retention task list", actionTrigger: "Immediate follow-up by booth team", priority: "Critical", readiness: 54 },
    { title: "Mobilization Households", scope: "Supporters with turnout risk", output: "Election-day mobilization list", actionTrigger: "Before turnout confirmation drives", priority: "Critical", readiness: 64 }
  ],
  influencerReports: [
    { title: "Influencer Directory", scope: "Influencer identity, role, community, village", output: "Relationship database extract", actionTrigger: "Weekly relationship audit", priority: "High", readiness: 72 },
    { title: "Influencer Reach", scope: "Estimated voters influenced and active networks", output: "Reach ranking", actionTrigger: "Before message cascade planning", priority: "High", readiness: 69 },
    { title: "Influencer Risk", scope: "Opponent-leaning and relationship weakness", output: "Risk repair plan", actionTrigger: "When relationship strength drops", priority: "Critical", readiness: 62 },
    { title: "Influencer Opportunities", scope: "Persuadable influencers and vote gain", output: "Opportunity list", actionTrigger: "When expected vote impact is high", priority: "High", readiness: 65 },
    { title: "Relationship Status", scope: "Last contact, next action, assigned owner", output: "Call and visit queue", actionTrigger: "Daily relationship review", priority: "High", readiness: 67 },
    { title: "Engagement Status", scope: "Meetings, calls, events, follow-ups", output: "Engagement health report", actionTrigger: "Weekly execution check", priority: "Medium", readiness: 70 }
  ],
  turnoutReports: [
    { title: "Turnout Risk Report", scope: "Supporters unlikely to vote", output: "Supporter protection plan", actionTrigger: "Daily in election mode", priority: "Critical", readiness: 76 },
    { title: "Booth Mobilization Report", scope: "Booth readiness and volunteer gaps", output: "Booth action sheet", actionTrigger: "When booth readiness falls under 65", priority: "Critical", readiness: 67 },
    { title: "Community Turnout Report", scope: "Turnout by community and segment", output: "Community mobilization plan", actionTrigger: "Before community team meetings", priority: "High", readiness: 71 },
    { title: "Election Day Readiness Report", scope: "Transport, volunteers, booth plans, escalation", output: "Election-day command checklist", actionTrigger: "Weekly until election mode", priority: "Critical", readiness: 58 },
    { title: "Transportation Plan", scope: "Senior citizens and assisted voters", output: "Transport coordination list", actionTrigger: "When assistance need is high", priority: "High", readiness: 49 },
    { title: "Volunteer Readiness", scope: "Coverage, attendance, ownership, training", output: "Volunteer deployment report", actionTrigger: "Weekly volunteer operations review", priority: "Critical", readiness: 55 }
  ],
  persuasionReports: [
    { title: "Conversion Opportunities", scope: "Highest conversion pools", output: "Persuasion target plan", actionTrigger: "Weekly persuasion review", priority: "Critical", readiness: 74 },
    { title: "Expected Vote Gain", scope: "Forecasted gain by village and community", output: "Vote gain model", actionTrigger: "Before resource allocation", priority: "High", readiness: 68 },
    { title: "High Priority Targets", scope: "Households, villages, communities, influencers", output: "Target queue", actionTrigger: "Daily field assignment", priority: "Critical", readiness: 64 },
    { title: "Campaign Recommendations", scope: "Messages, visits, issue proof, owners", output: "Recommended campaign plan", actionTrigger: "Weekly candidate briefing", priority: "Critical", readiness: 70 }
  ],
  supportReports: [
    { title: "Support Summary", scope: "Support, opposition, neutral, unknown", output: "Constituency support brief", actionTrigger: "Daily candidate review", priority: "Critical", readiness: 78 },
    { title: "Support Trends", scope: "Weekly and monthly support movement", output: "Movement dashboard", actionTrigger: "When support shifts by 3 points", priority: "High", readiness: 69 },
    { title: "Support Risks", scope: "Potential vote loss and drift zones", output: "Support defense report", actionTrigger: "When risk crosses high", priority: "Critical", readiness: 66 },
    { title: "Support Opportunities", scope: "Gain pools and persuasion potential", output: "Support growth plan", actionTrigger: "Before outreach planning", priority: "High", readiness: 72 },
    { title: "Win Probability", scope: "Current, likely, best, worst case", output: "Candidate decision model", actionTrigger: "Weekly strategy meeting", priority: "Critical", readiness: 60 }
  ],
  readiness: [
    { area: "Support Readiness", score: 62, trend: "Up", gap: "Soft support still needs vote confirmation", action: "Convert youth and women support into named turnout owners", priority: "Critical" },
    { area: "Turnout Readiness", score: 58, trend: "Stable", gap: "Volunteer and transport gaps remain", action: "Complete booth mobilization and senior citizen transport plan", priority: "Critical" },
    { area: "Volunteer Readiness", score: 55, trend: "Stable", gap: "Coverage uneven across priority villages", action: "Assign extra booth teams in Musalgaon and Devpur", priority: "Critical" },
    { area: "Booth Readiness", score: 57, trend: "Down", gap: "Critical booths need coordinator confirmation", action: "Verify booth owner, polling agent, and escalation chain", priority: "Critical" },
    { area: "Influencer Readiness", score: 64, trend: "Up", gap: "Neutral cooperative connectors unresolved", action: "Candidate-level outreach to top relationship bridges", priority: "High" },
    { area: "Campaign Readiness", score: 61, trend: "Up", gap: "Reports exist but execution tasks lag", action: "Convert report findings into task owners within 24 hours", priority: "High" },
    { area: "Overall Readiness Score", score: 60, trend: "Up", gap: "Campaign is improving but not yet election-ready", action: "Focus this week on risk defense, turnout confirmation, and proof-backed persuasion", priority: "Critical" }
  ],
  winProbability: [
    { scenario: "Current Scenario", expectedMargin: -23800, expectedVoteShare: 43, probability: 38, confidence: 50, trend: "Stable" },
    { scenario: "Likely Scenario", expectedMargin: -11200, expectedVoteShare: 46, probability: 44, confidence: 50, trend: "Up" },
    { scenario: "Best Case", expectedMargin: 4200, expectedVoteShare: 51, probability: 58, confidence: 42, trend: "Up" },
    { scenario: "Worst Case", expectedMargin: -40800, expectedVoteShare: 39, probability: 24, confidence: 47, trend: "Down" }
  ],
  builder: {
    sections: ["Executive Summary", "Critical Alerts", "Support Changes", "Turnout Movement", "Persuasion Progress", "Community Trends", "Village Watchlist", "Influencer Movement", "Risks", "Opportunities", "Recommended Actions", "Task Follow-Up"],
    communities: ["Youth", "Women", "Farmers", "Maratha", "Mali", "Vanjari", "Dhangar", "SC", "Business", "Cooperative Members"],
    villages: ["Sinnar Town", "Pangri", "Musalgaon", "Dubere", "Devpur", "Wavi"],
    booths: ["Booth 102", "Booth 044", "Booth 067", "Booth 071", "Booth 086", "Booth 093"],
    dateRanges: ["Today", "7 Days", "30 Days", "Quarter", "Election Period"],
    metrics: ["Support Score", "Turnout Risk", "Persuasion Potential", "Expected Vote Gain", "Expected Vote Loss", "Readiness Score", "Confidence", "Task Completion"]
  },
  executiveBriefing: [
    { question: "Where are we strong?", answer: "Youth, women, SHG networks, and Sinnar Town support movement are positive.", candidateAction: "Use visible youth and women forums to convert goodwill into turnout ownership.", priority: "High" },
    { question: "Where are we weak?", answer: "Cooperative-linked farmer networks in Musalgaon and some booth readiness gaps remain weak.", candidateAction: "Meet neutral cooperative bridges and demand booth readiness verification.", priority: "Critical" },
    { question: "What changed?", answer: "The main shift is from broad support growth to the need for field confirmation.", candidateAction: "Ask every desk to convert findings into owners, dates, and proof.", priority: "High" },
    { question: "What risks exist?", answer: "Support may not become votes without turnout and relationship repair.", candidateAction: "Prioritize turnout confirmation and high-risk village visits before new messaging.", priority: "Critical" },
    { question: "What opportunities exist?", answer: "The largest immediate vote gains sit in youth turnout, farmers, and women SHG trust forums.", candidateAction: "Run three parallel execution tracks this week.", priority: "Critical" },
    { question: "What should Uday Sangle do this week?", answer: "Defend Musalgaon, confirm youth turnout chains, collect farmer evidence, and host SHG-backed forums.", candidateAction: "Approve the weekly field route and candidate call list today.", priority: "Critical" }
  ],
  aiStrategyReports: [
    { title: "Community Strategy", strategyType: "Community", recommendation: "Create separate youth, women, and farmer tracks instead of one broad message.", expectedVoteImpact: 8100, priority: "Critical", confidence: 55 },
    { title: "Village Strategy", strategyType: "Village", recommendation: "Protect Musalgaon while expanding Sinnar Town and Pangri gains.", expectedVoteImpact: 5700, priority: "Critical", confidence: 50 },
    { title: "Influencer Strategy", strategyType: "Influencer", recommendation: "Separate supportive amplifiers from neutral bridge-builders.", expectedVoteImpact: 4300, priority: "High", confidence: 53 },
    { title: "Turnout Strategy", strategyType: "Turnout", recommendation: "Turn soft support into confirmed voters before adding new persuasion targets.", expectedVoteImpact: 7800, priority: "Critical", confidence: 56 },
    { title: "Persuasion Strategy", strategyType: "Persuasion", recommendation: "Use issue proof and trusted visitor matching for persuadable households.", expectedVoteImpact: 12400, priority: "High", confidence: 52 },
    { title: "Election Strategy", strategyType: "Election", recommendation: "Operate the next week as risk defense plus vote conversion, not only awareness.", expectedVoteImpact: 18900, priority: "Critical", confidence: 51 },
    { title: "Weekly Action Plan", strategyType: "Execution", recommendation: "Convert every critical report into task owner, due date, and verification step.", expectedVoteImpact: 6400, priority: "High", confidence: 60 },
    { title: "Monthly Action Plan", strategyType: "Readiness", recommendation: "Move readiness from 60 to 72 by closing booth, volunteer, and source verification gaps.", expectedVoteImpact: 11200, priority: "High", confidence: 58 }
  ],
  scheduler: [
    { report: "Daily Voter Brief", frequency: "Daily", recipients: "Candidate, Campaign Manager", nextRun: "Tomorrow 07:30", owner: "War Room Desk", status: "Active" },
    { report: "Weekly Strategy Report", frequency: "Weekly", recipients: "Candidate, Campaign Manager, Community Teams", nextRun: "Monday 08:00", owner: "Strategy Cell", status: "Draft schedule" },
    { report: "Election Readiness Report", frequency: "Weekly", recipients: "Candidate, Booth Coordinators", nextRun: "Friday 19:00", owner: "Election Analytics", status: "Needs booth verification" },
    { report: "Turnout Risk Report", frequency: "Election Mode", recipients: "Booth Coordinators, Volunteers", nextRun: "Election mode trigger", owner: "Turnout Desk", status: "Prepared" },
    { report: "War Room Situation Brief", frequency: "War Room Mode", recipients: "Candidate, War Room Leads", nextRun: "On command", owner: "War Room Desk", status: "Prepared" },
    { report: "Monthly Campaign Readiness", frequency: "Monthly", recipients: "Campaign Manager", nextRun: "Month end 20:00", owner: "Operations", status: "Active" }
  ],
  exportOptions: [
    { format: "PDF", bestFor: "Candidate briefings and printable village reports", readiness: 86, status: "Ready" },
    { format: "Excel", bestFor: "Booth coordinator lists and field task review", readiness: 78, status: "Ready" },
    { format: "CSV", bestFor: "Data exports and analysis handoff", readiness: 81, status: "Ready" },
    { format: "Print", bestFor: "Village visit packets and meeting notes", readiness: 74, status: "Template ready" },
    { format: "Presentation", bestFor: "Strategy reviews and donor or leadership briefings", readiness: 62, status: "Needs design review" },
    { format: "Share Link", bestFor: "Internal access with role permissions", readiness: 59, status: "Permission model pending" }
  ],
  actions: [
    { label: "Generate Daily Brief", href: "/reports/daily-brief/new?module=voter", priority: "Critical" },
    { label: "Generate Weekly Brief", href: "/reports/daily-brief/new?type=weekly_voter_brief", priority: "Critical" },
    { label: "Generate Village Report", href: "/reports/daily-brief/new?type=village_report", priority: "High" },
    { label: "Generate Community Report", href: "/reports/daily-brief/new?type=community_report", priority: "High" },
    { label: "Generate Election Readiness Report", href: "/reports/daily-brief/new?type=election_readiness", priority: "Critical" },
    { label: "Generate Candidate Brief", href: "/candidate-intelligence/manage/new?type=voter_brief", priority: "Critical" },
    { label: "Generate War Room Brief", href: "/reports/daily-brief/new?type=war_room_brief", priority: "Critical" },
    { label: "Generate Campaign Strategy", href: "/reports/daily-brief/new?type=campaign_strategy", priority: "High" }
  ],
  rightPanel: {
    pendingReports: [
      "Musalgaon Risk And Opportunity Report",
      "Election Readiness Report",
      "High Influence Household Report",
      "Village Visit Recommendations"
    ],
    recentlyGenerated: [
      "Daily Voter Brief: Today 08:30",
      "Turnout Risk Report: Today 08:05",
      "Youth Community Strategy Report: Today 07:15",
      "Influencer Reach And Risk Report: Today 06:40"
    ],
    criticalFindings: [
      "Musalgaon cooperative network needs immediate repair",
      "14.8K supportive voters still need turnout confirmation",
      "Farmer support requires evidence-backed irrigation follow-up",
      "Booth and volunteer readiness are below election-ready threshold"
    ],
    reportAlerts: [
      "Weekly Strategy Report is still draft",
      "Election Readiness Report needs booth verification",
      "Transportation Plan readiness is below 50",
      "Share link export is waiting on role permission model"
    ],
    upcomingScheduled: [
      "Daily Voter Brief: Tomorrow 07:30",
      "Weekly Strategy Report: Monday 08:00",
      "Election Readiness Report: Friday 19:00",
      "Monthly Campaign Readiness: Month end 20:00"
    ]
  }
};
