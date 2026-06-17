import type { CandidateIntelligenceData } from "./types";

export const candidateIntelligenceData: CandidateIntelligenceData = {
  snapshot: {
    fullName: "Uday Sangle",
    designation: "Political leader, entrepreneur, social activist, sports activist",
    party: "Expelled from NCP(SP); reported BJP-aligned movement needs primary verification",
    constituency: "Sinnar Assembly, Nashik, Maharashtra",
    age: "Needs verification",
    politicalExperience: "Long Shiv Sena association, 2024 Assembly contestant, grassroots organizer",
    currentPosition: "Public leader and primary challenger profile in Sinnar",
    electionStatus: "2024 Sinnar Assembly candidate; result figures provisional until ECI Form 20",
    photoStatus: "Candidate photo asset pending verified upload",
    metrics: [
      { label: "Public Sentiment Score", value: 62, previous: 59, change: 5.1, trend: "Up" },
      { label: "Influence Score", value: 68, previous: 66, change: 3, trend: "Up" },
      { label: "Recognition Score", value: 73, previous: 70, change: 4.3, trend: "Up" },
      { label: "Political Strength Score", value: 71, previous: 68, change: 4.4, trend: "Up" },
      { label: "Political Risk Score", value: 43, previous: 46, change: -6.5, trend: "Down" }
    ]
  },
  biography: [
    {
      id: "bio-001",
      date: "To verify",
      category: "Birth",
      title: "Birth and early life record",
      description: "Birth date, birthplace, and early family context need primary confirmation.",
      evidence: "Not collected",
      mediaReferences: "None attached",
      documents: "Candidate biography task required",
      confidence: "Low"
    },
    {
      id: "bio-002",
      date: "To verify",
      category: "Education",
      title: "Education history",
      description: "Education details are not yet verified in the project memory.",
      evidence: "Not collected",
      mediaReferences: "None attached",
      documents: "Certificates or official profile needed",
      confidence: "Low"
    },
    {
      id: "bio-003",
      date: "Pre-2024",
      category: "Social Work",
      title: "Sahyadri Yuva Manch and youth engagement",
      description: "Project sources identify Uday Sangle as founder of Sahyadri Yuva Manch with youth and sports reach.",
      evidence: "Project PDFs",
      mediaReferences: "To attach",
      documents: "Uday Sangle master profile",
      confidence: "Medium"
    },
    {
      id: "bio-004",
      date: "Pre-2024",
      category: "Political Entry",
      title: "Long association with Shiv Sena",
      description: "Sources describe a long association with Shiv Sena before the 2024 Assembly election cycle.",
      evidence: "Project PDFs",
      mediaReferences: "To verify externally",
      documents: "Campaign intelligence brief",
      confidence: "Medium"
    },
    {
      id: "bio-005",
      date: "2024",
      category: "Party Change",
      title: "Joined NCP Sharad Pawar faction before Assembly election",
      description: "Project context records Sangle joining NCP(SP) before contesting Sinnar in 2024.",
      evidence: "Project PDFs",
      mediaReferences: "Needs current source attachment",
      documents: "Source map",
      confidence: "Medium"
    },
    {
      id: "bio-006",
      date: "2024",
      category: "Election Participation",
      title: "Contested Sinnar Assembly election",
      description: "Working result value is Uday Sangle 97,681 votes against Manikrao Kokate 138,565, margin 40,884. Official Form 20 is still required.",
      evidence: "Public result tables and project sources",
      mediaReferences: "External result table referenced in source map",
      documents: "ECI Form 20 pending",
      confidence: "Medium"
    },
    {
      id: "bio-007",
      date: "Post-2024",
      category: "Current Role",
      title: "Expelled from NCP(SP), reported BJP-aligned movement",
      description: "Existing sources support expulsion and reported movement toward BJP-aligned circles. Formal current membership requires primary confirmation.",
      evidence: "Source map notes",
      mediaReferences: "Times of India reference in source map",
      documents: "Primary party/candidate confirmation pending",
      confidence: "Medium"
    }
  ],
  journey: [
    { id: "journey-001", date: "Pre-2024", category: "Organization", title: "Sahyadri Yuva Manch", description: "Youth and sports network became a key influence channel.", evidence: "Project PDFs", mediaReferences: "To attach", documents: "Master profile", confidence: "Medium", x: 18, lane: "Organization" },
    { id: "journey-002", date: "Pre-2024", category: "Party", title: "Shiv Sena association", description: "Long-term association created worker and rural network base.", evidence: "Project PDFs", mediaReferences: "To verify", documents: "Campaign brief", confidence: "Medium", x: 34, lane: "Party" },
    { id: "journey-003", date: "2024", category: "Party", title: "NCP(SP) entry", description: "Joined NCP(SP) before contesting Sinnar.", evidence: "Project PDFs", mediaReferences: "To attach", documents: "Source map", confidence: "Medium", x: 52, lane: "Party" },
    { id: "journey-004", date: "2024", category: "Election", title: "Sinnar Assembly contest", description: "Became major challenger to Manikrao Kokate.", evidence: "Project PDFs and result tables", mediaReferences: "Source map reference", documents: "Form 20 pending", confidence: "Medium", x: 68, lane: "Election" },
    { id: "journey-005", date: "Post-2024", category: "Risk", title: "Party-transition perception risk", description: "Current party status and transition narrative need disciplined verification.", evidence: "Source map", mediaReferences: "To verify", documents: "Primary confirmation pending", confidence: "Medium", x: 84, lane: "Risk" }
  ],
  relationships: {
    nodes: [
      { id: "uday", label: "Uday Sangle", type: "candidate", relationship: "Supportive", influence: 92, reach: 88, x: 50, y: 48 },
      { id: "sheetal", label: "Sheetal Sangle", type: "family", relationship: "Supportive", influence: 72, reach: 70, x: 35, y: 28 },
      { id: "sahyadri", label: "Sahyadri Yuva Manch", type: "organization", relationship: "Supportive", influence: 78, reach: 76, x: 23, y: 60 },
      { id: "youth", label: "Youth Leaders", type: "community", relationship: "Supportive", influence: 70, reach: 74, x: 16, y: 77 },
      { id: "farmers", label: "Farmer Groups", type: "community", relationship: "Neutral", influence: 68, reach: 82, x: 72, y: 67 },
      { id: "women", label: "Women SHG Leaders", type: "community", relationship: "Neutral", influence: 58, reach: 62, x: 42, y: 82 },
      { id: "bjp", label: "BJP-aligned Circles", type: "party", relationship: "Unknown", influence: 62, reach: 68, x: 73, y: 28 },
      { id: "media", label: "Local Media", type: "media", relationship: "Neutral", influence: 65, reach: 75, x: 55, y: 18 },
      { id: "workers", label: "Village Workers", type: "worker", relationship: "Supportive", influence: 76, reach: 84, x: 58, y: 88 },
      { id: "business", label: "Business Network", type: "business", relationship: "Unknown", influence: 52, reach: 50, x: 84, y: 50 }
    ],
    edges: [
      { from: "uday", to: "sheetal", strength: 82, relationship: "Supportive" },
      { from: "uday", to: "sahyadri", strength: 78, relationship: "Supportive" },
      { from: "sahyadri", to: "youth", strength: 84, relationship: "Supportive" },
      { from: "uday", to: "farmers", strength: 62, relationship: "Neutral" },
      { from: "uday", to: "women", strength: 55, relationship: "Neutral" },
      { from: "uday", to: "bjp", strength: 38, relationship: "Unknown" },
      { from: "uday", to: "media", strength: 47, relationship: "Neutral" },
      { from: "uday", to: "workers", strength: 80, relationship: "Supportive" },
      { from: "uday", to: "business", strength: 42, relationship: "Unknown" }
    ]
  },
  organizations: [
    { id: "org-001", name: "Sahyadri Yuva Manch", type: "Social / Youth", role: "Founder", influence: 78, reach: "Youth, sports, village networks", status: "Active", relationships: "Youth leaders, sports organizers" },
    { id: "org-002", name: "Sports network", type: "Sports", role: "Sports activist", influence: 70, reach: "Youth and local event networks", status: "Active", relationships: "Tournament organizers, volunteers" },
    { id: "org-003", name: "Business interests", type: "Business", role: "Entrepreneur", influence: 52, reach: "Needs mapping", status: "Needs verification", relationships: "Companies and holdings not yet attached" },
    { id: "org-004", name: "Political worker network", type: "Campaign organization", role: "Leader", influence: 76, reach: "Village-level workers", status: "Partially mapped", relationships: "Taluka, village, booth coordinators" }
  ],
  achievements: [
    { id: "ach-001", category: "Youth", title: "Youth and sports mobilization", description: "Built youth engagement through sports and social activity.", location: "Sinnar", impact: "Trust and volunteer recruitment", evidence: "Needs photos and event records", mediaCoverage: "To attach", documents: "Achievement proof task" },
    { id: "ach-002", category: "Agriculture", title: "Farmer issue advocacy", description: "Positioning around irrigation, crop prices, and local farmer grievances.", location: "Pangri and rural belt", impact: "Farmer trust-building opportunity", evidence: "Needs issue statements", mediaCoverage: "To attach", documents: "Issue register" },
    { id: "ach-003", category: "Women", title: "Women group issue forum opportunity", description: "Women SHG leaders are potential recurring issue forum partners.", location: "Dubere cluster", impact: "Women-led support channel", evidence: "Needs meeting proof", mediaCoverage: "None", documents: "Event plan" },
    { id: "ach-004", category: "Infrastructure", title: "Road and water grievance capture", description: "Initial village issue records identify road, water, and service concerns.", location: "Baragaon Pimpri and Sinnar Town", impact: "Local problem-solving proof if resolved", evidence: "Needs before-after record", mediaCoverage: "To attach", documents: "Grievance tracker" }
  ],
  perception: {
    current: { positive: 42, neutral: 36, negative: 22, trust: 61, popularity: 64, acceptance: 58 },
    monthly: [
      { label: "Feb", positive: 36, neutral: 42, negative: 22, trust: 56 },
      { label: "Mar", positive: 38, neutral: 40, negative: 22, trust: 58 },
      { label: "Apr", positive: 39, neutral: 39, negative: 22, trust: 59 },
      { label: "May", positive: 41, neutral: 37, negative: 22, trust: 60 },
      { label: "Jun", positive: 42, neutral: 36, negative: 22, trust: 61 }
    ],
    quarterly: [
      { label: "Q2 2025", positive: 34, neutral: 43, negative: 23, trust: 54 },
      { label: "Q3 2025", positive: 36, neutral: 41, negative: 23, trust: 56 },
      { label: "Q4 2025", positive: 38, neutral: 40, negative: 22, trust: 58 },
      { label: "Q1 2026", positive: 40, neutral: 38, negative: 22, trust: 60 }
    ],
    yearly: [
      { label: "2024", positive: 39, neutral: 37, negative: 24, trust: 57 },
      { label: "2025", positive: 40, neutral: 38, negative: 22, trust: 59 },
      { label: "2026", positive: 42, neutral: 36, negative: 22, trust: 61 }
    ]
  },
  communitySupport: [
    { community: "Maratha", support: 58, sentiment: 57, trend: "Stable", confidence: 55 },
    { community: "Mali", support: 55, sentiment: 54, trend: "Up", confidence: 42 },
    { community: "Vanjari", support: 49, sentiment: 48, trend: "Stable", confidence: 38 },
    { community: "Dhangar", support: 53, sentiment: 52, trend: "Up", confidence: 40 },
    { community: "SC", support: 50, sentiment: 51, trend: "Down", confidence: 36 },
    { community: "ST", support: 47, sentiment: 46, trend: "Stable", confidence: 33 },
    { community: "Minority", support: 45, sentiment: 44, trend: "Stable", confidence: 32 },
    { community: "Farmers", support: 61, sentiment: 60, trend: "Up", confidence: 58 },
    { community: "Women", support: 57, sentiment: 56, trend: "Up", confidence: 52 },
    { community: "Youth", support: 67, sentiment: 66, trend: "Up", confidence: 64 },
    { community: "Senior Citizens", support: 48, sentiment: 49, trend: "Stable", confidence: 35 }
  ],
  geography: [
    { id: "geo-001", name: "Sinnar Town", classification: "Growth", support: 63, x: 51, y: 45, booth: "Town cluster", ward: "Urban", community: "Mixed", note: "Recognition is high; service issues need ownership." },
    { id: "geo-002", name: "Malegaon MIDC", classification: "Strong", support: 67, x: 58, y: 57, booth: "Industrial belt", ward: "Industrial", community: "Youth", note: "Employment listening can convert attention into trust." },
    { id: "geo-003", name: "Musalgaon", classification: "Risk", support: 48, x: 76, y: 52, booth: "Rural belt", ward: "Rural", community: "Farmers", note: "Cooperative influence creates opponent pressure." },
    { id: "geo-004", name: "Pangri", classification: "Swing", support: 56, x: 69, y: 67, booth: "Pangri cluster", ward: "Rural", community: "Farmers", note: "Irrigation issue could shape support." },
    { id: "geo-005", name: "Dubere", classification: "Growth", support: 59, x: 42, y: 63, booth: "Dubere cluster", ward: "Rural", community: "Women", note: "Women SHG forum opportunity." },
    { id: "geo-006", name: "Devpur", classification: "Weak", support: 46, x: 48, y: 82, booth: "South belt", ward: "Rural", community: "Mixed", note: "Coordinator coverage is thin." }
  ],
  swot: [
    { id: "swot-001", category: "Strengths", item: "Grassroots worker loyalty", priority: "High", impact: 84, owner: "Campaign Ops", status: "Active", reviewDate: "2026-06-20" },
    { id: "swot-002", category: "Strengths", item: "Youth and sports connect", priority: "High", impact: 78, owner: "Youth Outreach", status: "Active", reviewDate: "2026-06-18" },
    { id: "swot-003", category: "Weaknesses", item: "No Assembly win yet", priority: "Medium", impact: 66, owner: "Narrative Desk", status: "Message needed", reviewDate: "2026-06-22" },
    { id: "swot-004", category: "Weaknesses", item: "Biography and achievement proof incomplete", priority: "High", impact: 80, owner: "Research Desk", status: "Open", reviewDate: "2026-06-15" },
    { id: "swot-005", category: "Opportunities", item: "Anti-incumbency against entrenched leadership", priority: "High", impact: 86, owner: "Strategy Desk", status: "Monitoring", reviewDate: "2026-06-25" },
    { id: "swot-006", category: "Opportunities", item: "Youth employment issue ownership", priority: "High", impact: 82, owner: "Youth Outreach", status: "Action drafted", reviewDate: "2026-06-16" },
    { id: "swot-007", category: "Threats", item: "Opponent party-switching attack", priority: "High", impact: 78, owner: "Narrative Desk", status: "Needs verification", reviewDate: "2026-06-14" },
    { id: "swot-008", category: "Threats", item: "Kokate cooperative and patronage network", priority: "High", impact: 82, owner: "Political Desk", status: "Mapping", reviewDate: "2026-06-21" }
  ],
  media: [
    { channel: "News Coverage", coverage: 14, sentiment: 52, reach: "District", influence: 64, topItem: "Election and party-transition mentions" },
    { channel: "TV Coverage", coverage: 3, sentiment: 48, reach: "Regional", influence: 58, topItem: "Needs clipping archive" },
    { channel: "Digital Coverage", coverage: 22, sentiment: 55, reach: "Local digital", influence: 66, topItem: "WhatsApp and local pages" },
    { channel: "Interviews", coverage: 2, sentiment: 60, reach: "Local", influence: 52, topItem: "Candidate interview archive needed" },
    { channel: "Press Conferences", coverage: 1, sentiment: 50, reach: "Local", influence: 48, topItem: "Press kit pending" }
  ],
  social: [
    { platform: "Facebook", followers: "Needs audit", reach: "Medium", engagement: "Medium", growth: "+3%", sentiment: 58, topContent: "Village visit posts", audienceBreakdown: "Local adults and workers" },
    { platform: "Instagram", followers: "Needs audit", reach: "Medium", engagement: "High", growth: "+6%", sentiment: 62, topContent: "Youth and sports content", audienceBreakdown: "Youth" },
    { platform: "YouTube", followers: "Needs audit", reach: "Low", engagement: "Medium", growth: "+2%", sentiment: 55, topContent: "Speech clips", audienceBreakdown: "Political viewers" },
    { platform: "X", followers: "Needs audit", reach: "Low", engagement: "Low", growth: "Stable", sentiment: 50, topContent: "News reactions", audienceBreakdown: "Media and political users" },
    { platform: "WhatsApp", followers: "Group audit needed", reach: "High", engagement: "High", growth: "+5%", sentiment: 57, topContent: "Local issue updates", audienceBreakdown: "Workers and local groups" }
  ],
  electionPerformance: [
    { year: "2024", election: "Sinnar Assembly", votes: "97,681 working value", voteShare: "Needs official calculation", margin: "40,884 behind Manikrao Kokate", turnout: "Needs Form 20", opponent: "Manikrao Kokate", sourceStatus: "Provisional until official ECI Form 20 is collected" }
  ],
  risks: [
    { id: "crisk-001", risk: "Opponent attack on party transition", probability: 72, impact: 84, severity: "High", owner: "Narrative Desk", mitigation: "Verified explanation line and worker FAQ", status: "Open" },
    { id: "crisk-002", risk: "Public legal claim without fresh source", probability: 64, impact: 88, severity: "Critical", owner: "Legal Review", mitigation: "Hold claims until dated evidence attached", status: "Guardrail needed" },
    { id: "crisk-003", risk: "Achievement library lacks proof", probability: 70, impact: 78, severity: "High", owner: "Research Desk", mitigation: "Collect evidence repository items", status: "Open" }
  ],
  opportunities: [
    { id: "copp-001", opportunity: "Youth employment ownership", potentialImpact: "High trust gain", targetCommunity: "Youth", targetGeography: "MIDC belt", priority: "High", owner: "Youth Outreach", status: "Action drafted", expectedVoteImpact: "High" },
    { id: "copp-002", opportunity: "Farmer issue proof campaign", potentialImpact: "Farmer credibility", targetCommunity: "Farmers", targetGeography: "Pangri, Musalgaon", priority: "High", owner: "Farmer Cell", status: "Open", expectedVoteImpact: "High" },
    { id: "copp-003", opportunity: "Women-led issue forum", potentialImpact: "Relationship depth", targetCommunity: "Women", targetGeography: "Dubere", priority: "Medium", owner: "Women Outreach", status: "Planning", expectedVoteImpact: "Medium" }
  ],
  insights: [
    { id: "ins-001", type: "Current strengths", title: "Youth and worker loyalty are the strongest usable assets.", detail: "Sports, youth, and village worker networks give Sangle a grassroots route that should be structured into repeatable field reporting.", action: "Create youth and worker operating calendar", priority: "High" },
    { id: "ins-002", type: "Emerging weakness", title: "Biography and achievement proof are too thin for a dossier-grade campaign.", detail: "The system needs verified photos, documents, media clips, and source notes before public narrative scaling.", action: "Open evidence sprint", priority: "High" },
    { id: "ins-003", type: "Community concern", title: "Farmers need issue ownership, not generic messaging.", detail: "Irrigation, crop prices, and cooperative influence should become village-specific issue records.", action: "Schedule Pangri and Musalgaon visits", priority: "High" },
    { id: "ins-004", type: "Recommended messaging", title: "Use accountable local problem-solving as the central contrast.", detail: "This helps Sangle build trust without making risky public allegations about opponents.", action: "Generate source-safe speech brief", priority: "Medium" }
  ],
  evidence: [
    { id: "ev-001", type: "Image", title: "Candidate verified portrait", category: "Profile", source: "Candidate office", status: "Needed", date: "Open" },
    { id: "ev-002", type: "Document", title: "ECI Form 20 Sinnar 2024", category: "Election", source: "Election Commission", status: "Needed", date: "Open" },
    { id: "ev-003", type: "Media Mention", title: "NCP(SP) expulsion report", category: "Party status", source: "News reference in source map", status: "Needs attachment", date: "2025-11-03" },
    { id: "ev-004", type: "Report", title: "Village coordinator organization chart", category: "Organization", source: "Campaign operations", status: "Draft needed", date: "Open" },
    { id: "ev-005", type: "Video", title: "Youth sports event clips", category: "Youth", source: "Sahyadri Yuva Manch archive", status: "Needed", date: "Open" },
    { id: "ev-006", type: "Certificate", title: "Education or public profile proof", category: "Biography", source: "Candidate office", status: "Needed", date: "Open" }
  ]
};
