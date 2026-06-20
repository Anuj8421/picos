import type { Volunteer } from "./types";

export type IntelligenceIssue = {
  id: string;
  category: "Water" | "Roads" | "Healthcare" | "Education" | "Agriculture" | "Infrastructure";
  summary: string;
  location: string;
  severity: "High" | "Medium" | "Low";
  affectedPopulation: string;
  politicalRisk: "High" | "Medium" | "Low";
  status: "Verified" | "Pending Review" | "Escalated";
};

export type OpponentObservation = {
  id: string;
  type: "Meeting" | "Rally" | "Booth Visit" | "Door-to-Door Campaign";
  location: string;
  estimatedAttendance: string;
  publicResponse: string;
  evidence: string;
};

export type CallIntelligenceRecord = {
  id: string;
  caller: string;
  voterId: string;
  location: string;
  dateTime: string;
  outcome: "Supportive" | "Neutral" | "Opposition" | "Undecided" | "Follow-up Required";
  intelligence: string;
  priority: "High" | "Medium" | "Low";
  followUpRequired: boolean;
  status: "Open" | "Reviewed" | "Escalated" | "Resolved";
};

export type AggregatedCallConcern = {
  name: string;
  mentions: number;
  trend: "Increasing" | "Stable" | "Decreasing";
};

export type MeetingIntelligenceRecord = {
  id: string;
  name: string;
  type: "Ward Meeting" | "Village Meeting" | "Farmer Gathering" | "Youth Meeting" | "Community Discussion" | "Volunteer Coordination Meeting" | "Women’s Group Meeting" | "Business Association Meeting";
  location: string;
  dateTime: string;
  attendance: number;
  discussionTopics: string[];
  keyFinding: string;
  outcome: "Action Required" | "Follow-Up Needed" | "Issue Escalated" | "Volunteer Recruitment Opportunity" | "Community Support Identified";
  priority: "High" | "Medium" | "Low";
  status: "Open" | "Reviewed" | "Escalated" | "Resolved";
};

export type MeetingInfluentialAttendee = {
  id: string;
  name: string;
  role: "Village Head" | "Farmer Leader" | "Business Owner" | "Teacher" | "Youth Leader" | "Women’s Group Leader" | "Religious Leader";
  location: string;
  influence: "High" | "Medium" | "Low";
  relationship: "Friendly" | "Neutral" | "Unknown" | "Supportive";
  notes: string;
};

export type MeetingCommunityConcern = {
  name: string;
  mentions: number;
  affectedAreas: string[];
  trend: "Increasing" | "Stable" | "Decreasing";
  politicalRisk: "High" | "Medium" | "Low";
};

export type RelationshipContact = {
  id: string;
  name: string;
  role: "Community Leader" | "Business Owner" | "Farmer Representative" | "Youth Leader" | "Women’s Group Leader";
  village: string;
  influence: "High" | "Medium" | "Emerging";
  notes: string;
};

export type VolunteerObservation = {
  id: string;
  text: string;
  location: string;
  time: string;
  priority: "High" | "Medium" | "Low";
};

export type IntelligenceTimelineEntry = {
  id: string;
  date: string;
  action: string;
  detail: string;
  module: "Issue Mapping" | "Booth Intelligence" | "Political Intelligence" | "War Room";
};

export type VolunteerActivityIntelligence = {
  contribution: {
    score: number;
    reportsSubmitted: number;
    reportsVerified: number;
    actionableInsights: number;
    escalatedReports: number;
    influencerContacts: number;
  };
  outreach: {
    householdsVisited: number;
    sentiment: Array<{ label: "Supportive" | "Neutral" | "Opposition" | "Undecided"; value: number }>;
    topIssues: string[];
    candidateAwareness: number;
    oppositionPresence: "Low" | "Moderate" | "High";
    communityLeaders: number;
    findings: string[];
  };
  calls: {
    callsMade: number;
    successfulConversations: number;
    followUpsRequired: number;
    concerns: string[];
    sentimentChanges: number;
    visitRequests: number;
    insights: string[];
    recentCalls: CallIntelligenceRecord[];
    overallInsights: {
      topTopics: string[];
      mostActiveArea: string;
      sentimentTrend: string;
      supportDistribution: Array<{ label: "Supportive" | "Neutral" | "Undecided"; value: number }>;
    };
    voterConcerns: AggregatedCallConcern[];
  };
  meetings: {
    attended: number;
    topics: string[];
    actionItems: number;
    recruitmentOpportunities: number;
    findings: string[];
    recentMeetings: MeetingIntelligenceRecord[];
    insights: {
      mostDiscussedTopics: string[];
      mostActiveAreas: string[];
      communitySentiment: { positive: number; neutral: number; negative: number };
      recruitmentPotential: "High" | "Medium" | "Low";
      opportunities: string[];
    };
    influentialAttendees: MeetingInfluentialAttendee[];
    communityConcerns: MeetingCommunityConcern[];
  };
  issueSummary: { total: number; verified: number; pending: number; highRisk: number };
  issues: IntelligenceIssue[];
  opponentSummary: { total: number; meetings: number; rallies: number; boothVisits: number; doorToDoor: number };
  opponentReports: OpponentObservation[];
  community: {
    mood: string;
    candidatePerception: string;
    partyPerception: string;
    concerns: string[];
    opportunities: string[];
    feedback: string[];
  };
  relationships: RelationshipContact[];
  observations: VolunteerObservation[];
  timeline: IntelligenceTimelineEntry[];
};

export function getVolunteerActivityIntelligence(volunteer: Volunteer): VolunteerActivityIntelligence {
  const supportive = Math.max(1, Math.round(volunteer.doorVisits * 0.43));
  const neutral = Math.max(1, Math.round(volunteer.doorVisits * 0.2));
  const opposition = Math.max(1, Math.round(volunteer.doorVisits * 0.14));
  const undecided = Math.max(0, volunteer.doorVisits - supportive - neutral - opposition);
  const verifiedReports = Math.min(volunteer.reportsSubmitted, Math.max(1, Math.round(volunteer.reportsSubmitted * 0.72)));
  const influencerContacts = Math.max(2, Math.round(volunteer.meetingsAttended * 0.35));
  const actionableInsights = volunteer.issuesReported + volunteer.opponentActivityReported + influencerContacts;
  const contributionScore = Math.min(100, Math.round((verifiedReports * 2.2) + (actionableInsights * 1.8) + (volunteer.activityScore * 0.35)));

  const issues: IntelligenceIssue[] = [
    { id: `${volunteer.id}-water`, category: "Water", summary: "Irregular supply affecting household routines.", location: `${volunteer.village} / ${volunteer.booth}`, severity: "High", affectedPopulation: "40–60 households", politicalRisk: "High", status: "Verified" },
    { id: `${volunteer.id}-roads`, category: "Roads", summary: "Approach road condition repeatedly raised during outreach.", location: volunteer.ward, severity: "Medium", affectedPopulation: "Two local lanes", politicalRisk: "Medium", status: "Pending Review" },
    { id: `${volunteer.id}-health`, category: "Healthcare", summary: "Residents requested a local health-camp follow-up.", location: volunteer.village, severity: "Low", affectedPopulation: "Women and senior citizens", politicalRisk: "Low", status: "Pending Review" }
  ];

  const opponentReports: OpponentObservation[] = [
    { id: `${volunteer.id}-opponent-1`, type: "Door-to-Door Campaign", location: volunteer.ward, estimatedAttendance: "8–12 workers", publicResponse: "Mixed; several households remained undecided.", evidence: "Notes submitted" },
    { id: `${volunteer.id}-opponent-2`, type: "Booth Visit", location: volunteer.booth, estimatedAttendance: "4 local organizers", publicResponse: "Limited engagement observed.", evidence: "Location confirmation" }
  ];

  const relationships: RelationshipContact[] = [
    { id: `${volunteer.id}-leader-1`, name: "Meera Deshmukh", role: "Women’s Group Leader", village: volunteer.village, influence: "High", notes: "Coordinates two active self-help groups and community meetings." },
    { id: `${volunteer.id}-leader-2`, name: "Ramesh Jagtap", role: "Farmer Representative", village: volunteer.village, influence: "Medium", notes: "Useful contact for irrigation and market-access discussions." },
    { id: `${volunteer.id}-leader-3`, name: "Akash Pawar", role: "Youth Leader", village: volunteer.village, influence: "Emerging", notes: "Organizes local sports activity and youth employment discussions." }
  ];

  return {
    contribution: { score: contributionScore, reportsSubmitted: volunteer.reportsSubmitted, reportsVerified: verifiedReports, actionableInsights, escalatedReports: Math.max(1, volunteer.opponentActivityReported), influencerContacts },
    outreach: {
      householdsVisited: volunteer.doorVisits,
      sentiment: [{ label: "Supportive", value: supportive }, { label: "Neutral", value: neutral }, { label: "Opposition", value: opposition }, { label: "Undecided", value: undecided }],
      topIssues: ["Water supply", "Road conditions", "Youth employment"],
      candidateAwareness: Math.min(96, 58 + Math.round(volunteer.activityScore * 0.35)),
      oppositionPresence: volunteer.opponentActivityReported > 3 ? "High" : volunteer.opponentActivityReported > 1 ? "Moderate" : "Low",
      communityLeaders: influencerContacts,
      findings: [`Water supply concerns reported during ${Math.max(4, Math.round(volunteer.doorVisits * 0.18))} household conversations.`, `${undecided} undecided voters identified for coordinator follow-up.`]
    },
    calls: {
      callsMade: volunteer.callsMade,
      successfulConversations: Math.round(volunteer.callsMade * 0.68),
      followUpsRequired: Math.max(2, Math.round(volunteer.callsMade * 0.16)),
      concerns: ["Employment", "Water reliability", "Local transport"],
      sentimentChanges: Math.max(1, Math.round(volunteer.callsMade * 0.06)),
      visitRequests: Math.max(1, Math.round(volunteer.callsMade * 0.04)),
      insights: ["Employment concerns were repeated across multiple household calls.", `${Math.max(1, Math.round(volunteer.callsMade * 0.04))} follow-up meetings were requested.`],
      recentCalls: [
        { id: `${volunteer.id}-call-1`, caller: volunteer.name, voterId: "Voter SNR-1842", location: `${volunteer.village} / ${volunteer.booth}`, dateTime: "20 Jun, 16:40", outcome: "Follow-up Required", intelligence: "Water supply interruptions reported; household requested escalation.", priority: "High", followUpRequired: true, status: "Open" },
        { id: `${volunteer.id}-call-2`, caller: volunteer.name, voterId: "Voter SNR-0937", location: volunteer.ward, dateTime: "20 Jun, 15:25", outcome: "Undecided", intelligence: "Requested a candidate visit before deciding support.", priority: "High", followUpRequired: true, status: "Escalated" },
        { id: `${volunteer.id}-call-3`, caller: volunteer.name, voterId: "Voter SNR-2251", location: volunteer.village, dateTime: "20 Jun, 13:10", outcome: "Neutral", intelligence: "Employment opportunities and youth engagement were discussed.", priority: "Medium", followUpRequired: true, status: "Reviewed" },
        { id: `${volunteer.id}-call-4`, caller: volunteer.name, voterId: "Voter SNR-1476", location: `${volunteer.ward} / East Lane`, dateTime: "20 Jun, 11:55", outcome: "Opposition", intelligence: "Road condition complaints remain the primary source of dissatisfaction.", priority: "Medium", followUpRequired: false, status: "Reviewed" },
        { id: `${volunteer.id}-call-5`, caller: volunteer.name, voterId: "Voter SNR-3184", location: volunteer.booth, dateTime: "19 Jun, 19:20", outcome: "Supportive", intelligence: "Positive response to direct follow-up on the healthcare-camp request.", priority: "Low", followUpRequired: false, status: "Resolved" }
      ],
      overallInsights: {
        topTopics: ["Water Supply", "Employment", "Road Infrastructure"],
        mostActiveArea: volunteer.village,
        sentimentTrend: "Increasingly positive after direct follow-up",
        supportDistribution: [{ label: "Supportive", value: 62 }, { label: "Neutral", value: 24 }, { label: "Undecided", value: 14 }]
      },
      voterConcerns: [
        { name: "Water Supply", mentions: Math.max(12, Math.round(volunteer.callsMade * 0.18)), trend: "Increasing" },
        { name: "Employment", mentions: Math.max(9, Math.round(volunteer.callsMade * 0.14)), trend: "Increasing" },
        { name: "Road Repairs", mentions: Math.max(7, Math.round(volunteer.callsMade * 0.11)), trend: "Stable" },
        { name: "Electricity", mentions: Math.max(4, Math.round(volunteer.callsMade * 0.07)), trend: "Decreasing" },
        { name: "Healthcare", mentions: Math.max(3, Math.round(volunteer.callsMade * 0.05)), trend: "Stable" }
      ]
    },
    meetings: {
      attended: volunteer.meetingsAttended,
      topics: ["Youth engagement", "Irrigation support", "Booth coverage"],
      actionItems: Math.max(2, Math.round(volunteer.meetingsAttended * 0.6)),
      recruitmentOpportunities: Math.max(1, Math.round(volunteer.meetingsAttended * 0.3)),
      findings: ["Youth group requested a structured engagement program.", "Farmer representatives raised irrigation reliability concerns."],
      recentMeetings: [
        { id: `${volunteer.id}-meeting-1`, name: "North Ward Community Review", type: "Ward Meeting", location: `${volunteer.ward} / ${volunteer.village}`, dateTime: "20 Jun, 18:30", attendance: 23, discussionTopics: ["Water Supply", "Road Repairs"], keyFinding: "Residents remain dissatisfied with water reliability and want a named follow-up owner.", outcome: "Action Required", priority: "High", status: "Open" },
        { id: `${volunteer.id}-meeting-2`, name: "Musalgaon Farmer Dialogue", type: "Farmer Gathering", location: "Musalgaon / Booth 071", dateTime: "20 Jun, 12:00", attendance: 31, discussionTopics: ["Agriculture", "Irrigation Support"], keyFinding: "Farmers requested irrigation support and a direct candidate discussion.", outcome: "Follow-Up Needed", priority: "High", status: "Reviewed" },
        { id: `${volunteer.id}-meeting-3`, name: "Youth Employment Circle", type: "Youth Meeting", location: `${volunteer.village} / Youth Hall`, dateTime: "19 Jun, 17:15", attendance: 18, discussionTopics: ["Youth Employment", "Volunteer Recruitment"], keyFinding: "Strong interest in campaign volunteering and skills-based engagement.", outcome: "Volunteer Recruitment Opportunity", priority: "Medium", status: "Reviewed" },
        { id: `${volunteer.id}-meeting-4`, name: "Women’s SHG Listening Session", type: "Women’s Group Meeting", location: "Dubere / Booth 084", dateTime: "19 Jun, 11:30", attendance: 27, discussionTopics: ["Healthcare", "Water Supply"], keyFinding: "Women’s groups offered support for a healthcare-camp outreach initiative.", outcome: "Community Support Identified", priority: "Medium", status: "Resolved" },
        { id: `${volunteer.id}-meeting-5`, name: "Booth Team Coordination", type: "Volunteer Coordination Meeting", location: `${volunteer.booth} / ${volunteer.ward}`, dateTime: "18 Jun, 19:00", attendance: 14, discussionTopics: ["Booth Coverage", "Voter Follow-Ups"], keyFinding: "Two coverage gaps require reassignment before the next field cycle.", outcome: "Issue Escalated", priority: "High", status: "Escalated" }
      ],
      insights: {
        mostDiscussedTopics: ["Water Supply", "Road Infrastructure", "Agriculture", "Employment"],
        mostActiveAreas: [volunteer.village, "Musalgaon", "Wavi"],
        communitySentiment: { positive: 54, neutral: 31, negative: 15 },
        recruitmentPotential: "High",
        opportunities: ["Strong youth engagement", "Farmer support opportunity", "Women’s group outreach opportunity"]
      },
      influentialAttendees: [
        { id: `${volunteer.id}-attendee-1`, name: "Suresh Kedar", role: "Farmer Leader", location: "Musalgaon", influence: "High", relationship: "Friendly", notes: "Strong influence among local farmers and interested in a candidate meeting." },
        { id: `${volunteer.id}-attendee-2`, name: "Kavita More", role: "Women’s Group Leader", location: "Dubere", influence: "High", relationship: "Supportive", notes: "Can assist with healthcare outreach and women volunteer recruitment." },
        { id: `${volunteer.id}-attendee-3`, name: "Rahul Jadhav", role: "Youth Leader", location: volunteer.village, influence: "Medium", relationship: "Neutral", notes: "Organizes youth activities and wants an employment-focused discussion." }
      ],
      communityConcerns: [
        { name: "Water Supply", mentions: 18, affectedAreas: [volunteer.village, "Dubere"], trend: "Increasing", politicalRisk: "High" },
        { name: "Road Conditions", mentions: 14, affectedAreas: [volunteer.ward, "Musalgaon"], trend: "Increasing", politicalRisk: "High" },
        { name: "Agriculture", mentions: 11, affectedAreas: ["Musalgaon", "Wavi"], trend: "Stable", politicalRisk: "Medium" },
        { name: "Employment", mentions: 9, affectedAreas: [volunteer.village], trend: "Increasing", politicalRisk: "Medium" },
        { name: "Healthcare", mentions: 7, affectedAreas: ["Dubere"], trend: "Stable", politicalRisk: "Low" }
      ]
    },
    issueSummary: { total: volunteer.issuesReported, verified: Math.max(1, Math.round(volunteer.issuesReported * 0.58)), pending: Math.max(1, Math.round(volunteer.issuesReported * 0.28)), highRisk: issues.filter((issue) => issue.politicalRisk === "High").length },
    issues,
    opponentSummary: { total: volunteer.opponentActivityReported, meetings: Math.max(0, volunteer.opponentActivityReported - 2), rallies: volunteer.opponentActivityReported > 3 ? 1 : 0, boothVisits: 1, doorToDoor: 1 },
    opponentReports,
    community: {
      mood: volunteer.performanceScore > 82 ? "Cautiously positive" : "Mixed and issue-sensitive",
      candidatePerception: "Accessible, with demand for more visible local follow-up.",
      partyPerception: "Stable base; undecided households remain persuadable.",
      concerns: ["Water reliability", "Road maintenance", "Employment"],
      opportunities: ["Health-camp coordination", "Youth listening forum", "Farmer follow-up meeting"],
      feedback: ["Farmers are seeking clearer irrigation support.", "Youth employment is becoming a dominant local issue."]
    },
    relationships,
    observations: [
      { id: `${volunteer.id}-observation-1`, text: "Growing dissatisfaction with road conditions near the approach lane.", location: volunteer.ward, time: "Today, 16:20", priority: "High" },
      { id: `${volunteer.id}-observation-2`, text: "Undecided households responded positively to direct follow-up.", location: volunteer.booth, time: "Today, 13:45", priority: "Medium" },
      { id: `${volunteer.id}-observation-3`, text: "Village leadership is discussing a joint irrigation representation.", location: volunteer.village, time: "Yesterday, 18:10", priority: "Medium" }
    ],
    timeline: [
      { id: `${volunteer.id}-timeline-1`, date: "19 Jun", action: "Submitted Water Issue Report", detail: `${volunteer.village} household evidence attached.`, module: "Issue Mapping" },
      { id: `${volunteer.id}-timeline-2`, date: "19 Jun", action: `Identified ${undecided} Undecided Voters`, detail: `${volunteer.booth} follow-up list prepared.`, module: "Booth Intelligence" },
      { id: `${volunteer.id}-timeline-3`, date: "18 Jun", action: "Attended Ward Meeting", detail: "Youth employment and irrigation discussed.", module: "Political Intelligence" },
      { id: `${volunteer.id}-timeline-4`, date: "18 Jun", action: "Reported Opponent Outreach", detail: `${volunteer.ward} observation escalated for review.`, module: "War Room" }
    ]
  };
}
