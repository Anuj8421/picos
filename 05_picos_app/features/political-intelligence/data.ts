import type { PoliticalIntelligenceData } from "./types";

export const politicalIntelligenceData: PoliticalIntelligenceData = {
  meta: {
    screen: "Political Intelligence Command Center",
    constituency: "Sinnar Assembly, Nashik, Maharashtra",
    subject: "Uday Sangle",
    referenceDate: "2026-06-10",
    dataStatus: "Dummy intelligence dataset for product design. Verify before public use.",
    sourceDiscipline:
      "Facts, assumptions, and hypotheses are separated. Current legal and party-status items require fresh verification before campaign use."
  },
  metrics: [
    {
      label: "Political Health Score",
      value: 74,
      previous: 70,
      change: 5.7,
      trend: "Up",
      signal: "Worker cohesion improved after village follow-up calls.",
      tone: "positive"
    },
    {
      label: "Public Sentiment Score",
      value: 62,
      previous: 59,
      change: 5.1,
      trend: "Up",
      signal: "Youth and farmer grievance listening activity is gaining recall.",
      tone: "positive"
    },
    {
      label: "Opportunity Score",
      value: 78,
      previous: 72,
      change: 8.3,
      trend: "Up",
      signal: "Openings visible in farmer, youth, and anti-incumbency clusters.",
      tone: "positive"
    },
    {
      label: "Risk Score",
      value: 41,
      previous: 46,
      change: -10.9,
      trend: "Down",
      signal: "Risk is lower but legal and party-transition narratives remain sensitive.",
      tone: "watch"
    },
    {
      label: "Influence Score",
      value: 68,
      previous: 66,
      change: 3,
      trend: "Up",
      signal: "Volunteer reporting and Sahyadri Yuva Manch channels are active.",
      tone: "positive"
    },
    {
      label: "Election Readiness Score",
      value: 54,
      previous: 51,
      change: 5.9,
      trend: "Up",
      signal: "Readiness is improving, but booth-level source coverage is incomplete.",
      tone: "neutral"
    }
  ],
  liveFeed: [
    {
      id: "feed-001",
      date: "2026-06-10",
      timestamp: "09:20",
      title: "Unverified legal update being reshared in WhatsApp groups",
      summary:
        "A local WhatsApp chain is circulating a claim about Manikrao Kokate's legal status. Treat as sensitive until the current court record or reliable reporting is checked.",
      priority: "Critical",
      source: "Digital watch desk",
      sourceType: "Internal monitoring",
      category: "Legal Reputation Risk",
      eventType: "Media",
      impactScore: 89,
      assignedTeam: "Research + Legal Review",
      status: "Needs verification",
      community: "All",
      village: "Sinnar Town",
      booth: "Town cluster",
      party: "NCP Ajit faction",
      influencer: "WhatsApp admins",
      confidence: "Low",
      nextStep: "Collect current court order or reputable dated report before any campaign reference."
    },
    {
      id: "feed-002",
      date: "2026-06-10",
      timestamp: "08:45",
      title: "Reported opponent activity spike around cooperative network meetings",
      summary:
        "Multiple local reports indicate increased outreach through cooperative-linked contacts in Musalgaon and nearby villages.",
      priority: "High",
      source: "Village coordinator reports",
      sourceType: "Internal field input",
      category: "Opponent Movement",
      eventType: "Meeting",
      impactScore: 76,
      assignedTeam: "Constituency Intelligence",
      status: "Assigned",
      community: "Farmers",
      village: "Musalgaon",
      booth: "Rural belt",
      party: "NCP Ajit faction",
      influencer: "Cooperative leaders",
      confidence: "Medium",
      nextStep: "Ask village coordinators to confirm names, timing, and attendance."
    },
    {
      id: "feed-003",
      date: "2026-06-09",
      timestamp: "19:35",
      title: "Youth employment grievance rising near industrial belt",
      summary:
        "Volunteer calls show repeated concern around local job access, contract hiring, and training pathways for youth.",
      priority: "High",
      source: "Volunteer phone bank",
      sourceType: "Internal report",
      category: "Issue Escalation",
      eventType: "Grievance",
      impactScore: 81,
      assignedTeam: "Youth Outreach",
      status: "Action drafted",
      community: "Youth",
      village: "Malegaon MIDC",
      booth: "Industrial belt",
      party: "All",
      influencer: "Youth organizers",
      confidence: "Medium",
      nextStep: "Prepare employment listening visit and collect 20 named issue statements."
    },
    {
      id: "feed-004",
      date: "2026-06-09",
      timestamp: "16:10",
      title: "Farmer irrigation complaints concentrated in Pangri belt",
      summary:
        "Ground notes point to water distribution and crop-loss anxiety as high-salience topics in the Pangri cluster.",
      priority: "Medium",
      source: "Issue intake sheet",
      sourceType: "Internal report",
      category: "Farmer Issue",
      eventType: "Grievance",
      impactScore: 68,
      assignedTeam: "Farmer Cell",
      status: "Open",
      community: "Farmers",
      village: "Pangri",
      booth: "Pangri cluster",
      party: "All",
      influencer: "Farmer groups",
      confidence: "Medium",
      nextStep: "Validate with local agriculture officers and collect photo evidence where appropriate."
    },
    {
      id: "feed-005",
      date: "2026-06-08",
      timestamp: "21:05",
      title: "Influencer alignment watch item in Wavi cluster",
      summary:
        "Two local intermediaries appear to be negotiating visibility with multiple camps. This is a watch item, not a confirmed defection.",
      priority: "Medium",
      source: "Political listener network",
      sourceType: "Internal field input",
      category: "Influencer Movement",
      eventType: "Relationship",
      impactScore: 64,
      assignedTeam: "Political Desk",
      status: "Monitoring",
      community: "OBC",
      village: "Wavi",
      booth: "Wavi cluster",
      party: "Multiple",
      influencer: "Local intermediaries",
      confidence: "Low",
      nextStep: "Confirm through two independent local sources before action."
    },
    {
      id: "feed-006",
      date: "2026-06-07",
      timestamp: "11:30",
      title: "Women's self-help group leaders request local issue forum",
      summary:
        "A local contact network wants a structured forum around water, health access, and safety near Dubere.",
      priority: "Medium",
      source: "Women outreach team",
      sourceType: "Internal report",
      category: "Community Opportunity",
      eventType: "Community Event",
      impactScore: 72,
      assignedTeam: "Women Outreach",
      status: "Planning",
      community: "Women",
      village: "Dubere",
      booth: "Dubere cluster",
      party: "All",
      influencer: "SHG leaders",
      confidence: "Medium",
      nextStep: "Schedule small-group listening session and prepare issue capture form."
    },
    {
      id: "feed-007",
      date: "2026-06-06",
      timestamp: "18:00",
      title: "Rajabhau Waje network remains influential in farmer narrative",
      summary:
        "Field reports continue to associate Waje-linked networks with farmer credibility. If he re-enters local positioning, anti-Kokate votes could fragment.",
      priority: "High",
      source: "Competitor profile brief",
      sourceType: "Project context",
      category: "Competitor Watch",
      eventType: "Political Signal",
      impactScore: 79,
      assignedTeam: "Strategy Desk",
      status: "Monitoring",
      community: "Farmers",
      village: "Nandur Shingote",
      booth: "North belt",
      party: "Shiv Sena factions",
      influencer: "Farmer groups",
      confidence: "Medium",
      nextStep: "Map active village coordinators linked to Waje network."
    },
    {
      id: "feed-008",
      date: "2026-06-04",
      timestamp: "13:40",
      title: "Booth data gap blocks precise swing analysis",
      summary:
        "The system still needs official ECI Form 20 and booth-wise result data before prediction or precise target setting.",
      priority: "Critical",
      source: "Source map",
      sourceType: "Project documentation",
      category: "Data Quality",
      eventType: "Research Task",
      impactScore: 92,
      assignedTeam: "Research Desk",
      status: "Blocked",
      community: "All",
      village: "All villages",
      booth: "All booths",
      party: "All",
      influencer: "Election data sources",
      confidence: "High",
      nextStep: "Collect official ECI Form 20 and attach source record."
    },
    {
      id: "feed-009",
      date: "2026-06-02",
      timestamp: "20:25",
      title: "Clean leadership narrative tests well in volunteer interviews",
      summary:
        "Volunteer feedback suggests that accountable, accessible leadership remains a usable contrast message, subject to evidence discipline.",
      priority: "Medium",
      source: "Volunteer interviews",
      sourceType: "Internal report",
      category: "Narrative Opportunity",
      eventType: "Research Task",
      impactScore: 70,
      assignedTeam: "Content Strategy",
      status: "Drafting",
      community: "All",
      village: "Sinnar Town",
      booth: "Mixed",
      party: "All",
      influencer: "Volunteer captains",
      confidence: "Medium",
      nextStep: "Build proof-backed achievement library before mass communication."
    },
    {
      id: "feed-010",
      date: "2026-05-30",
      timestamp: "10:50",
      title: "Village coordinator coverage uneven in southern belt",
      summary:
        "Coverage notes show stronger reporting in town and north belt than in several southern villages.",
      priority: "Medium",
      source: "Organization chart draft",
      sourceType: "Internal report",
      category: "Organization Risk",
      eventType: "Volunteer",
      impactScore: 66,
      assignedTeam: "Campaign Operations",
      status: "Open",
      community: "All",
      village: "Devpur",
      booth: "South belt",
      party: "All",
      influencer: "Village coordinators",
      confidence: "Medium",
      nextStep: "Assign taluka coordinator to verify booth worker names and reporting cadence."
    },
    {
      id: "feed-011",
      date: "2026-05-23",
      timestamp: "17:15",
      title: "Sports network remains strong mobilization channel",
      summary:
        "Sahyadri Yuva Manch and sports-linked youth relationships remain a useful path for trust-building and attendance.",
      priority: "Low",
      source: "Candidate profile sources",
      sourceType: "Project documentation",
      category: "Influence Channel",
      eventType: "Relationship",
      impactScore: 58,
      assignedTeam: "Youth Outreach",
      status: "Active",
      community: "Youth",
      village: "Sinnar Town",
      booth: "Town cluster",
      party: "All",
      influencer: "Sports organizers",
      confidence: "Medium",
      nextStep: "Create event calendar for non-political youth engagement."
    },
    {
      id: "feed-012",
      date: "2026-05-15",
      timestamp: "09:05",
      title: "Party-transition perception risk remains unresolved",
      summary:
        "Project sources support expulsion from NCP(SP) and reported movement toward BJP-aligned circles, but formal current status needs primary-source confirmation.",
      priority: "High",
      source: "Source map",
      sourceType: "Project documentation",
      category: "Narrative Risk",
      eventType: "Research Task",
      impactScore: 84,
      assignedTeam: "Research + Candidate Office",
      status: "Needs verification",
      community: "All",
      village: "All villages",
      booth: "All booths",
      party: "BJP-aligned circles",
      influencer: "Party workers",
      confidence: "High",
      nextStep: "Collect primary statement or official party/candidate confirmation."
    }
  ],
  alerts: [
    {
      id: "alert-001",
      severity: "Critical",
      description: "Legal-status WhatsApp claim is spreading without a verified dated source.",
      affectedArea: "Sinnar Town and mixed WhatsApp groups",
      recommendedAction:
        "Freeze public use. Assign one researcher to verify court or reputable news source and record source date.",
      owner: "Research + Legal Review"
    },
    {
      id: "alert-002",
      severity: "High",
      description: "Opponent-linked cooperative outreach appears active in Musalgaon belt.",
      affectedArea: "Musalgaon, Pangri, rural farmer cluster",
      recommendedAction:
        "Dispatch field listeners and prepare farmer issue meeting with source-backed talking points.",
      owner: "Constituency Intelligence"
    },
    {
      id: "alert-003",
      severity: "High",
      description: "Booth-wise election data is missing, limiting precise vote-target decisions.",
      affectedArea: "All booths",
      recommendedAction: "Collect official ECI Form 20 before any numerical swing or booth conversion plan.",
      owner: "Research Desk"
    },
    {
      id: "alert-004",
      severity: "Medium",
      description: "Youth employment grievance is becoming a repeat issue near industrial villages.",
      affectedArea: "Malegaon MIDC belt",
      recommendedAction: "Schedule youth listening visit and prepare issue-resolution tracker.",
      owner: "Youth Outreach"
    }
  ],
  matrixItems: [
    {
      id: "matrix-001",
      type: "risk",
      title: "Party-transition perception hardens",
      probability: 72,
      impact: 82,
      owner: "Narrative Desk",
      affectedArea: "All villages",
      action: "Verify current status and create a disciplined explanation line."
    },
    {
      id: "matrix-002",
      type: "risk",
      title: "Opponent cooperative network locks farmer intermediaries",
      probability: 64,
      impact: 77,
      owner: "Political Desk",
      affectedArea: "Musalgaon and Pangri belt",
      action: "Map cooperative contacts and identify neutral farmer conveners."
    },
    {
      id: "matrix-003",
      type: "opportunity",
      title: "Youth employment listening campaign",
      probability: 78,
      impact: 74,
      owner: "Youth Outreach",
      affectedArea: "Industrial belt and town",
      action: "Run small listening circles and convert issues into action commitments."
    },
    {
      id: "matrix-004",
      type: "opportunity",
      title: "Verified clean-leadership narrative",
      probability: 69,
      impact: 86,
      owner: "Content Strategy",
      affectedArea: "Constituency-wide",
      action: "Build evidence library before mass content."
    },
    {
      id: "matrix-005",
      type: "risk",
      title: "Anti-Kokate vote fragmentation",
      probability: 52,
      impact: 80,
      owner: "Strategy Desk",
      affectedArea: "Farmer and Shiv Sena-influenced belts",
      action: "Monitor Waje network and protect Sangle as the local alternative."
    },
    {
      id: "matrix-006",
      type: "opportunity",
      title: "Women's local issue forum",
      probability: 61,
      impact: 67,
      owner: "Women Outreach",
      affectedArea: "Dubere cluster",
      action: "Create recurring forum tied to grievance resolution."
    }
  ],
  sentiment: [
    { segment: "Maratha", score: 58, trend: "Stable", change: 1, confidence: "Medium" },
    { segment: "Mali", score: 55, trend: "Up", change: 4, confidence: "Low" },
    { segment: "Vanjari", score: 49, trend: "Stable", change: 0, confidence: "Low" },
    { segment: "Dhangar", score: 53, trend: "Up", change: 3, confidence: "Low" },
    { segment: "SC", score: 51, trend: "Down", change: -2, confidence: "Low" },
    { segment: "ST", score: 47, trend: "Stable", change: 1, confidence: "Low" },
    { segment: "Minority", score: 45, trend: "Stable", change: 0, confidence: "Low" },
    { segment: "Youth", score: 67, trend: "Up", change: 6, confidence: "Medium" },
    { segment: "Women", score: 57, trend: "Up", change: 3, confidence: "Medium" },
    { segment: "Farmers", score: 61, trend: "Up", change: 5, confidence: "Medium" }
  ],
  opponents: [
    {
      id: "opponent-kokate",
      name: "Manikrao Kokate",
      role: "Principal competitor",
      party: "NCP Ajit faction",
      recentEvents: 6,
      mediaMentions: 14,
      sentiment: 48,
      riskLevel: "High",
      influenceScore: 82,
      latestMovement: "Reported cooperative-network outreach and legal-reputation monitoring item.",
      sourceStatus: "Date-sensitive. Verify latest legal and political status before public use."
    },
    {
      id: "opponent-waje",
      name: "Rajabhau Waje",
      role: "Secondary or potential major competitor",
      party: "Shiv Sena-linked network",
      recentEvents: 3,
      mediaMentions: 7,
      sentiment: 55,
      riskLevel: "Medium",
      influenceScore: 70,
      latestMovement: "Farmer credibility remains strategically relevant if local positioning increases.",
      sourceStatus: "Monitor parliamentary and local activity separately."
    },
    {
      id: "opponent-other",
      name: "Other Opponents",
      role: "Factional candidates, independents, local leaders",
      party: "Multiple",
      recentEvents: 8,
      mediaMentions: 5,
      sentiment: 42,
      riskLevel: "Medium",
      influenceScore: 58,
      latestMovement: "Small candidates and village leaders can alter margins in close booth clusters.",
      sourceStatus: "Requires village-wise tracking."
    }
  ],
  powerCenters: {
    nodes: [
      { id: "uday", label: "Uday Sangle", type: "candidate", x: 50, y: 48, influence: 92 },
      { id: "warroom", label: "Core War Room", type: "team", x: 37, y: 37, influence: 80 },
      { id: "sahyadri", label: "Sahyadri Yuva Manch", type: "organization", x: 26, y: 59, influence: 78 },
      { id: "youth", label: "Youth Network", type: "community", x: 18, y: 72, influence: 72 },
      { id: "women", label: "Women Leaders", type: "community", x: 38, y: 77, influence: 60 },
      { id: "farmers", label: "Farmer Groups", type: "community", x: 68, y: 68, influence: 74 },
      { id: "coop", label: "Cooperative Network", type: "organization", x: 78, y: 48, influence: 84 },
      { id: "kokate", label: "Kokate Network", type: "opponent", x: 88, y: 37, influence: 86 },
      { id: "waje", label: "Waje Network", type: "opponent", x: 73, y: 20, influence: 70 },
      { id: "media", label: "Local Media", type: "media", x: 56, y: 21, influence: 65 },
      { id: "bjp", label: "BJP-aligned Circles", type: "party", x: 25, y: 28, influence: 62 },
      { id: "village", label: "Village Coordinators", type: "team", x: 49, y: 88, influence: 76 }
    ],
    edges: [
      { from: "uday", to: "warroom", strength: 88, label: "Command" },
      { from: "uday", to: "sahyadri", strength: 74, label: "Youth reach" },
      { from: "sahyadri", to: "youth", strength: 82, label: "Sports network" },
      { from: "uday", to: "women", strength: 57, label: "Outreach" },
      { from: "uday", to: "farmers", strength: 64, label: "Issue listening" },
      { from: "farmers", to: "coop", strength: 68, label: "Influence channel" },
      { from: "coop", to: "kokate", strength: 82, label: "Opponent strength" },
      { from: "waje", to: "farmers", strength: 61, label: "Farmer credibility" },
      { from: "media", to: "kokate", strength: 54, label: "Mention flow" },
      { from: "media", to: "uday", strength: 49, label: "Visibility" },
      { from: "bjp", to: "uday", strength: 38, label: "Reported, verify" },
      { from: "warroom", to: "village", strength: 71, label: "Field reporting" },
      { from: "village", to: "farmers", strength: 66, label: "Ground input" }
    ]
  },
  villages: [
    { id: "v-sinnar-town", name: "Sinnar Town", x: 51, y: 45, risk: 58, opportunity: 70, sentiment: 63, influence: 78, events: 8, booths: 28, topIssue: "Media narrative and urban service grievances" },
    { id: "v-wavi", name: "Wavi", x: 34, y: 29, risk: 61, opportunity: 64, sentiment: 56, influence: 60, events: 4, booths: 16, topIssue: "Influencer alignment watch" },
    { id: "v-nandur", name: "Nandur Shingote", x: 62, y: 24, risk: 54, opportunity: 62, sentiment: 55, influence: 63, events: 3, booths: 18, topIssue: "Farmer credibility competition" },
    { id: "v-dubere", name: "Dubere", x: 42, y: 63, risk: 39, opportunity: 68, sentiment: 59, influence: 55, events: 5, booths: 14, topIssue: "Women-led local issue forum" },
    { id: "v-pangri", name: "Pangri", x: 69, y: 67, risk: 65, opportunity: 74, sentiment: 60, influence: 67, events: 6, booths: 20, topIssue: "Irrigation and crop-loss concerns" },
    { id: "v-musalgaon", name: "Musalgaon", x: 76, y: 52, risk: 72, opportunity: 66, sentiment: 52, influence: 74, events: 7, booths: 22, topIssue: "Cooperative-network activity" },
    { id: "v-devpur", name: "Devpur", x: 48, y: 82, risk: 57, opportunity: 58, sentiment: 50, influence: 46, events: 2, booths: 12, topIssue: "Coordinator coverage gap" },
    { id: "v-baragaon", name: "Baragaon Pimpri", x: 24, y: 48, risk: 42, opportunity: 59, sentiment: 54, influence: 49, events: 2, booths: 11, topIssue: "Road and water follow-up" },
    { id: "v-midc", name: "Malegaon MIDC", x: 58, y: 57, risk: 66, opportunity: 80, sentiment: 64, influence: 61, events: 9, booths: 15, topIssue: "Youth employment and training" },
    { id: "v-vadangali", name: "Vadangali", x: 31, y: 74, risk: 44, opportunity: 53, sentiment: 49, influence: 43, events: 1, booths: 10, topIssue: "Volunteer reporting cadence" }
  ],
  risks: [
    { id: "risk-001", risk: "Official booth-wise result data missing", probability: 82, impact: 92, owner: "Research Desk", status: "Blocked", targetDate: "2026-06-18" },
    { id: "risk-002", risk: "Party-transition narrative becomes opponent attack line", probability: 72, impact: 84, owner: "Narrative Desk", status: "Needs verification", targetDate: "2026-06-16" },
    { id: "risk-003", risk: "Legal claim about opponent used without fresh verification", probability: 66, impact: 88, owner: "Legal Review", status: "Hold public use", targetDate: "2026-06-12" },
    { id: "risk-004", risk: "Cooperative intermediaries consolidate against Sangle", probability: 64, impact: 77, owner: "Political Desk", status: "Mapping", targetDate: "2026-06-22" },
    { id: "risk-005", risk: "Anti-Kokate vote fragments if Waje network reactivates locally", probability: 52, impact: 80, owner: "Strategy Desk", status: "Monitoring", targetDate: "2026-06-25" },
    { id: "risk-006", risk: "Southern belt coordinator coverage remains thin", probability: 57, impact: 66, owner: "Campaign Ops", status: "Open", targetDate: "2026-06-20" },
    { id: "risk-007", risk: "WhatsApp rumor cycles outrun official clarification", probability: 63, impact: 70, owner: "Digital Desk", status: "Watch", targetDate: "2026-06-14" },
    { id: "risk-008", risk: "Urban service issues remain unowned", probability: 48, impact: 63, owner: "Issue Cell", status: "Open", targetDate: "2026-06-21" },
    { id: "risk-009", risk: "Women outreach stays event-based instead of relationship-based", probability: 45, impact: 58, owner: "Women Outreach", status: "Planning", targetDate: "2026-06-19" },
    { id: "risk-010", risk: "Content team publishes broad claims without source notes", probability: 50, impact: 73, owner: "Content Lead", status: "Guardrail needed", targetDate: "2026-06-13" }
  ],
  opportunities: [
    { id: "opp-001", opportunity: "Youth employment listening circuit", voteImpact: "High", targetCommunity: "Youth", priority: "High", owner: "Youth Outreach", status: "Action drafted" },
    { id: "opp-002", opportunity: "Farmer irrigation grievance documentation", voteImpact: "High", targetCommunity: "Farmers", priority: "High", owner: "Farmer Cell", status: "Open" },
    { id: "opp-003", opportunity: "Verified clean-governance narrative", voteImpact: "High", targetCommunity: "All", priority: "High", owner: "Content Strategy", status: "Needs evidence library" },
    { id: "opp-004", opportunity: "Women's self-help group issue forums", voteImpact: "Medium", targetCommunity: "Women", priority: "Medium", owner: "Women Outreach", status: "Planning" },
    { id: "opp-005", opportunity: "Sports and youth volunteer recruitment", voteImpact: "Medium", targetCommunity: "Youth", priority: "Medium", owner: "Volunteer Lead", status: "Active" },
    { id: "opp-006", opportunity: "Village coordinator verification sprint", voteImpact: "Medium", targetCommunity: "All", priority: "High", owner: "Campaign Ops", status: "Open" },
    { id: "opp-007", opportunity: "Neutral influencer bridge-building in Wavi", voteImpact: "Medium", targetCommunity: "OBC", priority: "Medium", owner: "Political Desk", status: "Monitoring" },
    { id: "opp-008", opportunity: "Booth result source collection", voteImpact: "High", targetCommunity: "All", priority: "High", owner: "Research Desk", status: "Blocked" },
    { id: "opp-009", opportunity: "Local media relationship audit", voteImpact: "Medium", targetCommunity: "Urban voters", priority: "Medium", owner: "Media Desk", status: "Open" },
    { id: "opp-010", opportunity: "Issue-resolution proof tracker", voteImpact: "High", targetCommunity: "All", priority: "High", owner: "Issue Cell", status: "Design needed" }
  ],
  upcomingEvents: [
    { id: "event-001", date: "2026-06-11", time: "10:00", type: "Research", title: "ECI Form 20 collection follow-up", area: "All booths", owner: "Research Desk", risk: "High" },
    { id: "event-002", date: "2026-06-12", time: "18:30", type: "Community Event", title: "Youth employment listening circle", area: "Malegaon MIDC", owner: "Youth Outreach", risk: "Medium" },
    { id: "event-003", date: "2026-06-14", time: "08:00", type: "Village Visit", title: "Farmer irrigation issue walk-through", area: "Pangri", owner: "Farmer Cell", risk: "Medium" },
    { id: "event-004", date: "2026-06-16", time: "16:00", type: "War Room", title: "Party-status verification review", area: "Candidate office", owner: "Research + Candidate Office", risk: "High" },
    { id: "event-005", date: "2026-06-18", time: "11:30", type: "Media", title: "Local media relationship audit", area: "Sinnar Town", owner: "Media Desk", risk: "Medium" },
    { id: "event-006", date: "2026-06-20", time: "15:00", type: "Organization", title: "Southern belt coordinator verification sprint", area: "Devpur and Vadangali", owner: "Campaign Ops", risk: "Medium" }
  ],
  recommendations: [
    {
      id: "rec-001",
      priority: "Critical",
      recommendation: "Collect official ECI Form 20 before numerical targeting.",
      reason:
        "The project has conflicting 2024 vote totals. Prediction and booth targeting will be unreliable until the official booth result source is attached.",
      expectedImpact: "Enables village and booth prioritization based on verified margins instead of document conflict.",
      action: "Create task"
    },
    {
      id: "rec-002",
      priority: "High",
      recommendation: "Prepare a verified party-transition explanation line for Uday Sangle.",
      reason:
        "Opponents can use party movement as a trust attack. The current source base supports expulsion and reported BJP-aligned movement, not definitive current status.",
      expectedImpact: "Reduces narrative risk and gives workers a consistent, source-safe response.",
      action: "Assign"
    },
    {
      id: "rec-003",
      priority: "High",
      recommendation: "Launch a youth employment listening circuit in the MIDC belt.",
      reason:
        "Youth sentiment is improving and employment grievances are repeating. This is a trust-building opportunity if captured with names, locations, and follow-up owners.",
      expectedImpact: "Strengthens youth support and creates issue-resolution proof for digital content.",
      action: "Schedule"
    },
    {
      id: "rec-004",
      priority: "High",
      recommendation: "Do not amplify opponent legal claims until freshly verified.",
      reason: "Legal status is date-sensitive and public misuse can create reputation and legal risk.",
      expectedImpact: "Protects the campaign from backlash while preserving intelligence value.",
      action: "Review"
    },
    {
      id: "rec-005",
      priority: "Medium",
      recommendation: "Map cooperative-linked intermediaries in Musalgaon and Pangri.",
      reason:
        "Opponent strength appears connected to cooperative and farmer networks. Uday Sangle needs neutral bridges, not only public messaging.",
      expectedImpact: "Improves influence routing in farmer-heavy clusters.",
      action: "Map"
    },
    {
      id: "rec-006",
      priority: "Medium",
      recommendation: "Convert women's group interest near Dubere into a recurring issue forum.",
      reason: "One event can create visibility, but recurring issue capture creates trust and organization.",
      expectedImpact: "Builds durable women-led support channels.",
      action: "Assign"
    }
  ],
  filters: {
    communities: ["All", "Maratha", "Mali", "Vanjari", "Dhangar", "SC", "ST", "Minority", "Youth", "Women", "Farmers", "OBC"],
    villages: ["All villages", "Sinnar Town", "Wavi", "Nandur Shingote", "Dubere", "Pangri", "Musalgaon", "Devpur", "Baragaon Pimpri", "Malegaon MIDC", "Vadangali"],
    booths: ["All booths", "Town cluster", "Rural belt", "Industrial belt", "North belt", "South belt", "Pangri cluster", "Dubere cluster", "Wavi cluster", "Mixed"],
    parties: ["All", "NCP Ajit faction", "BJP-aligned circles", "Shiv Sena factions", "Multiple"],
    riskLevels: ["All", "Critical", "High", "Medium", "Low"],
    opportunityLevels: ["All", "High", "Medium", "Low"],
    influencers: ["All", "WhatsApp admins", "Cooperative leaders", "Youth organizers", "Farmer groups", "Local intermediaries", "SHG leaders", "Village coordinators", "Sports organizers", "Party workers"],
    eventTypes: ["All", "Media", "Meeting", "Grievance", "Relationship", "Community Event", "Political Signal", "Research Task", "Volunteer"]
  }
};
