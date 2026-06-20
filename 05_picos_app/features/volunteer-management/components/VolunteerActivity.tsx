"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { getVolunteerActivityIntelligence, type IntelligenceIssue, type OpponentObservation, type RelationshipContact, type VolunteerObservation } from "../activityData";
import type { Volunteer } from "../types";

const activityViews = ["Outreach", "Calls", "Meetings", "Issues", "Opponent", "Community", "Relationships", "Observations", "Timeline"] as const;
type ActivityView = (typeof activityViews)[number];

export function VolunteerActivityProfile({ volunteer }: { volunteer: Volunteer }) {
  const intelligence = useMemo(() => getVolunteerActivityIntelligence(volunteer), [volunteer]);
  const [view, setView] = useState<ActivityView>("Outreach");
  const [observations, setObservations] = useState<VolunteerObservation[]>(intelligence.observations);
  const [observationText, setObservationText] = useState("");

  function addObservation(event: FormEvent) {
    event.preventDefault();
    const text = observationText.trim();
    if (!text) return;
    setObservations((current) => [{ id: `observation-${Date.now()}`, text, location: `${volunteer.village} / ${volunteer.booth}`, time: "Just now", priority: "Medium" }, ...current]);
    setObservationText("");
  }

  return <div className="volunteer-activity-intelligence">
    <section className="volunteer-contribution-panel">
      <div className="volunteer-contribution-score">
        <span>Intelligence Contribution Score</span>
        <strong>{intelligence.contribution.score}</strong>
        <div aria-label={`${intelligence.contribution.score}% intelligence contribution score`}><i style={{ width: `${intelligence.contribution.score}%` }} /></div>
        <small>Measures verified and actionable political intelligence.</small>
      </div>
      <div className="volunteer-contribution-metrics">
        <ActivityMetric label="Reports Submitted" value={intelligence.contribution.reportsSubmitted} />
        <ActivityMetric label="Reports Verified" value={intelligence.contribution.reportsVerified} />
        <ActivityMetric label="Actionable Insights" value={intelligence.contribution.actionableInsights} />
        <ActivityMetric label="Escalated Reports" value={intelligence.contribution.escalatedReports} tone="critical" />
        <ActivityMetric label="Influencer Contacts" value={intelligence.contribution.influencerContacts} />
      </div>
    </section>

    <nav className="volunteer-activity-tabs" aria-label="Volunteer intelligence activity views">
      {activityViews.map((item) => <button className={view === item ? "is-active" : ""} type="button" onClick={() => setView(item)} key={item}>{item}</button>)}
    </nav>

    <section className="volunteer-activity-view">
      {view === "Outreach" ? <OutreachIntelligence intelligence={intelligence.outreach} /> : null}
      {view === "Calls" ? <CallIntelligence intelligence={intelligence.calls} /> : null}
      {view === "Meetings" ? <MeetingIntelligence intelligence={intelligence.meetings} /> : null}
      {view === "Issues" ? <IssueIntelligence summary={intelligence.issueSummary} issues={intelligence.issues} /> : null}
      {view === "Opponent" ? <OpponentIntelligence summary={intelligence.opponentSummary} reports={intelligence.opponentReports} /> : null}
      {view === "Community" ? <CommunityIntelligence intelligence={intelligence.community} /> : null}
      {view === "Relationships" ? <RelationshipIntelligence contacts={intelligence.relationships} /> : null}
      {view === "Observations" ? <ObservationIntelligence observations={observations} value={observationText} onChange={setObservationText} onSubmit={addObservation} /> : null}
      {view === "Timeline" ? <ActivityTimeline entries={intelligence.timeline} /> : null}
    </section>
  </div>;
}

function IntelligenceHeader({ title, description, actions }: { title: string; description: string; actions?: ReactNode }) {
  return <div className="volunteer-intelligence-section-head"><div><h3>{title}</h3><p>{description}</p></div>{actions ?? <span>Field intelligence</span>}</div>;
}

function ActivityMetric({ label, value, tone = "neutral" }: { label: string; value: string | number; tone?: "neutral" | "critical" | "warning" }) {
  return <article className={`volunteer-intel-metric is-${tone}`}><span>{label}</span><strong>{value}</strong></article>;
}

function InsightFeed({ title, items }: { title: string; items: string[] }) {
  return <section className="volunteer-insight-feed"><h4>{title}</h4>{items.map((item, index) => <article key={`${item}-${index}`}><span>{index + 1}</span><p>{item}</p></article>)}</section>;
}

function ChipGroup({ title, items }: { title: string; items: string[] }) {
  return <section className="volunteer-intelligence-chips"><h4>{title}</h4><div>{items.map((item) => <span key={item}>{item}</span>)}</div></section>;
}

function OutreachIntelligence({ intelligence }: { intelligence: ReturnType<typeof getVolunteerActivityIntelligence>["outreach"] }) {
  const total = intelligence.sentiment.reduce((sum, item) => sum + item.value, 0);
  return <div className="volunteer-intelligence-view-content">
    <IntelligenceHeader title="Field Outreach Intelligence" description="What household conversations revealed about voter mood and local priorities." />
    <div className="volunteer-activity-summary-grid">
      <ActivityMetric label="Households Visited" value={intelligence.householdsVisited} />
      <ActivityMetric label="Candidate Awareness" value={`${intelligence.candidateAwareness}%`} />
      <ActivityMetric label="Opposition Presence" value={intelligence.oppositionPresence} tone={intelligence.oppositionPresence === "High" ? "critical" : "warning"} />
      <ActivityMetric label="Community Leaders" value={intelligence.communityLeaders} />
    </div>
    <div className="volunteer-intelligence-two-column">
      <section className="volunteer-sentiment-panel"><h4>Voter Sentiment Distribution</h4>{intelligence.sentiment.map((item) => <div className={`volunteer-sentiment-row is-${item.label.toLowerCase()}`} key={item.label}><span>{item.label}</span><div><i style={{ width: `${Math.round((item.value / total) * 100)}%` }} /></div><strong>{item.value}</strong></div>)}</section>
      <div className="volunteer-intelligence-stack"><ChipGroup title="Top Local Issues Identified" items={intelligence.topIssues} /><InsightFeed title="Recent Findings" items={intelligence.findings} /></div>
    </div>
  </div>;
}

function CallIntelligence({ intelligence }: { intelligence: ReturnType<typeof getVolunteerActivityIntelligence>["calls"] }) {
  return <div className="volunteer-intelligence-view-content">
    <IntelligenceHeader title="Political Call Intelligence" description="What voters are saying, which concerns are growing, and what needs action." actions={<a className="volunteer-call-logs-cta" href="/volunteer-management/reports?type=call-intelligence">View All Call Logs</a>} />
    <div className="volunteer-call-intelligence-layout">
      <section className="volunteer-call-feed">
        <div className="volunteer-call-panel-title"><div><h4>Recent Call Intelligence</h4><p>The five latest voter conversations and extracted campaign signals.</p></div><span>5 recent</span></div>
        {intelligence.recentCalls.map((call) => <article className="volunteer-call-record" key={call.id}>
          <div className="volunteer-call-record-head">
            <span className={`volunteer-call-outcome is-${activitySlug(call.outcome)}`}>{call.outcome}</span>
            <div><span className={`volunteer-intelligence-severity is-${call.priority.toLowerCase()}`}>{call.priority}</span><span className={`volunteer-call-status is-${call.status.toLowerCase()}`}>{call.status}</span></div>
          </div>
          <div className="volunteer-call-intelligence-text"><span>Intelligence gathered</span><strong>{call.intelligence}</strong></div>
          <dl className="volunteer-call-meta"><div><dt>Caller</dt><dd>{call.caller}</dd></div><div><dt>Voter</dt><dd>{call.voterId}</dd></div><div><dt>Location</dt><dd>{call.location}</dd></div><div><dt>Date &amp; Time</dt><dd>{call.dateTime}</dd></div></dl>
          <div className={`volunteer-call-followup ${call.followUpRequired ? "is-required" : ""}`}><span>Follow-up Required</span><strong>{call.followUpRequired ? "Yes" : "No"}</strong></div>
        </article>)}
      </section>

      <aside className="volunteer-call-analysis">
        <section className="volunteer-call-insights-panel">
          <div className="volunteer-call-panel-title"><div><h4>Overall Call Insights</h4><p>Patterns emerging across all voter conversations.</p></div></div>
          <ChipGroup title="Top Discussion Topics" items={intelligence.overallInsights.topTopics} />
          <div className="volunteer-call-key-insights"><article><span>Most Active Area</span><strong>{intelligence.overallInsights.mostActiveArea}</strong></article><article><span>Sentiment Trend</span><strong>{intelligence.overallInsights.sentimentTrend}</strong></article></div>
          <div className="volunteer-call-support"><h5>Support Level</h5>{intelligence.overallInsights.supportDistribution.map((item) => <div className={`is-${item.label.toLowerCase()}`} key={item.label}><span>{item.label}</span><i><b style={{ width: `${item.value}%` }} /></i><strong>{item.value}%</strong></div>)}</div>
        </section>

        <section className="volunteer-call-concerns-panel">
          <div className="volunteer-call-panel-title"><div><h4>Overall Voter Concerns</h4><p>Top concerns this week, ranked by mentions.</p></div></div>
          <ol>{intelligence.voterConcerns.map((concern, index) => <li key={concern.name}><span>{index + 1}</span><div><strong>{concern.name}</strong><small>{concern.mentions} mentions</small></div><b className={`is-${concern.trend.toLowerCase()}`}>{concern.trend}</b></li>)}</ol>
        </section>
      </aside>
    </div>
  </div>;
}

function MeetingIntelligence({ intelligence }: { intelligence: ReturnType<typeof getVolunteerActivityIntelligence>["meetings"] }) {
  return <div className="volunteer-intelligence-view-content">
    <IntelligenceHeader title="Political Meeting Intelligence" description="What communities are discussing, who matters, and where opportunities are emerging." actions={<a className="volunteer-call-logs-cta" href="/volunteer-management/reports?type=meeting-intelligence">View All Meetings</a>} />
    <div className="volunteer-meeting-intelligence-layout">
      <section className="volunteer-meeting-feed">
        <div className="volunteer-call-panel-title"><div><h4>Recent Meeting Intelligence</h4><p>The five latest meetings and the political signals gathered from each.</p></div><span>5 recent</span></div>
        {intelligence.recentMeetings.map((meeting) => <article className="volunteer-meeting-record" key={meeting.id}>
          <div className="volunteer-meeting-record-head"><div><span className="volunteer-meeting-type">{meeting.type}</span><strong>{meeting.name}</strong></div><div><span className={`volunteer-intelligence-severity is-${meeting.priority.toLowerCase()}`}>{meeting.priority}</span><span className={`volunteer-call-status is-${meeting.status.toLowerCase()}`}>{meeting.status}</span></div></div>
          <div className="volunteer-meeting-finding"><span>Key finding</span><strong>{meeting.keyFinding}</strong></div>
          <div className="volunteer-meeting-topics">{meeting.discussionTopics.map((topic) => <span key={topic}>{topic}</span>)}</div>
          <dl className="volunteer-meeting-meta"><div><dt>Location</dt><dd>{meeting.location}</dd></div><div><dt>Date &amp; Time</dt><dd>{meeting.dateTime}</dd></div><div><dt>Attendance</dt><dd>{meeting.attendance} attendees</dd></div></dl>
          <div className="volunteer-meeting-outcome"><span>Meeting Outcome</span><strong>{meeting.outcome}</strong></div>
        </article>)}
      </section>

      <aside className="volunteer-meeting-analysis">
        <section className="volunteer-meeting-insights-panel">
          <div className="volunteer-call-panel-title"><div><h4>Meeting Insights Summary</h4><p>What all recent meetings are telling the campaign.</p></div></div>
          <ChipGroup title="Most Discussed Topics" items={intelligence.insights.mostDiscussedTopics} />
          <ChipGroup title="Most Active Areas" items={intelligence.insights.mostActiveAreas} />
          <div className="volunteer-meeting-sentiment"><h5>Community Sentiment</h5>{Object.entries(intelligence.insights.communitySentiment).map(([label, value]) => <div className={`is-${label}`} key={label}><span>{label}</span><i><b style={{ width: `${value}%` }} /></i><strong>{value}%</strong></div>)}</div>
          <div className="volunteer-meeting-potential"><span>Volunteer Recruitment Potential</span><strong>{intelligence.insights.recruitmentPotential}</strong></div>
          <section className="volunteer-meeting-opportunities"><h5>Emerging Political Opportunities</h5>{intelligence.insights.opportunities.map((item) => <p key={item}>{item}</p>)}</section>
        </section>

        <section className="volunteer-meeting-concerns-panel">
          <div className="volunteer-call-panel-title"><div><h4>Key Community Concerns</h4><p>Issues repeated across community meetings.</p></div></div>
          <div>{intelligence.communityConcerns.map((concern, index) => <article key={concern.name}><span>{index + 1}</span><div><strong>{concern.name}</strong><small>{concern.mentions} mentions / {concern.affectedAreas.join(", ")}</small></div><div><b className={`is-${concern.trend.toLowerCase()}`}>{concern.trend}</b><small>{concern.politicalRisk} risk</small></div></article>)}</div>
        </section>
      </aside>
    </div>

    <section className="volunteer-meeting-network">
      <div className="volunteer-call-panel-title"><div><h4>Influential Attendees Network</h4><p>Relationship intelligence identified through recent meetings.</p></div><span>{intelligence.influentialAttendees.length} contacts</span></div>
      <div>{intelligence.influentialAttendees.map((person) => <article key={person.id}><div className="volunteer-meeting-person-head"><span>{person.name.split(" ").map((part) => part[0]).join("")}</span><div><strong>{person.name}</strong><small>{person.role} / {person.location}</small></div><b className={`is-${person.influence.toLowerCase()}`}>{person.influence} influence</b></div><p>{person.notes}</p><div className="volunteer-meeting-relationship"><span>Relationship</span><strong>{person.relationship}</strong></div></article>)}</div>
    </section>
  </div>;
}

function IssueIntelligence({ summary, issues }: { summary: ReturnType<typeof getVolunteerActivityIntelligence>["issueSummary"]; issues: IntelligenceIssue[] }) {
  return <div className="volunteer-intelligence-view-content">
    <IntelligenceHeader title="Issue Intelligence" description="Verified community problems ranked by severity, affected population, and political risk." />
    <div className="volunteer-activity-summary-grid"><ActivityMetric label="Total Issues Submitted" value={summary.total} /><ActivityMetric label="Verified Issues" value={summary.verified} /><ActivityMetric label="Pending Review" value={summary.pending} tone="warning" /><ActivityMetric label="High-Risk Issues" value={summary.highRisk} tone="critical" /></div>
    <div className="volunteer-issue-intelligence-list">{issues.map((issue) => <article key={issue.id}><div><span className={`volunteer-intelligence-severity is-${issue.severity.toLowerCase()}`}>{issue.severity}</span><strong>{issue.category}</strong><p>{issue.summary}</p></div><dl><div><dt>Location</dt><dd>{issue.location}</dd></div><div><dt>Affected</dt><dd>{issue.affectedPopulation}</dd></div><div><dt>Political Risk</dt><dd>{issue.politicalRisk}</dd></div><div><dt>Status</dt><dd>{issue.status}</dd></div></dl></article>)}</div>
  </div>;
}

function OpponentIntelligence({ summary, reports }: { summary: ReturnType<typeof getVolunteerActivityIntelligence>["opponentSummary"]; reports: OpponentObservation[] }) {
  return <div className="volunteer-intelligence-view-content">
    <IntelligenceHeader title="Opponent Intelligence" description="Observed opponent movement and measured public response from the field." />
    <div className="volunteer-activity-summary-grid is-five"><ActivityMetric label="Activities Observed" value={summary.total} /><ActivityMetric label="Meetings" value={summary.meetings} /><ActivityMetric label="Rallies" value={summary.rallies} /><ActivityMetric label="Booth Visits" value={summary.boothVisits} /><ActivityMetric label="Door-to-Door" value={summary.doorToDoor} /></div>
    <div className="volunteer-opponent-report-list">{reports.map((report) => <article key={report.id}><div><span>{report.type}</span><strong>{report.location}</strong></div><dl><div><dt>Estimated Attendance</dt><dd>{report.estimatedAttendance}</dd></div><div><dt>Public Response</dt><dd>{report.publicResponse}</dd></div><div><dt>Evidence</dt><dd>{report.evidence}</dd></div></dl></article>)}</div>
  </div>;
}

function CommunityIntelligence({ intelligence }: { intelligence: ReturnType<typeof getVolunteerActivityIntelligence>["community"] }) {
  return <div className="volunteer-intelligence-view-content">
    <IntelligenceHeader title="Community Feedback" description="Community mood, political perception, concerns, and emerging campaign opportunities." />
    <div className="volunteer-community-perception"><article><span>Community Mood</span><strong>{intelligence.mood}</strong></article><article><span>Candidate Perception</span><strong>{intelligence.candidatePerception}</strong></article><article><span>Party Perception</span><strong>{intelligence.partyPerception}</strong></article></div>
    <div className="volunteer-intelligence-two-column"><div className="volunteer-intelligence-stack"><ChipGroup title="Public Concerns" items={intelligence.concerns} /><ChipGroup title="Emerging Opportunities" items={intelligence.opportunities} /></div><InsightFeed title="Recent Community Feedback" items={intelligence.feedback} /></div>
  </div>;
}

function RelationshipIntelligence({ contacts }: { contacts: RelationshipContact[] }) {
  return <div className="volunteer-intelligence-view-content">
    <IntelligenceHeader title="Relationship Intelligence" description="Influential local contacts discovered through volunteer field activity." />
    <div className="volunteer-relationship-grid">{contacts.map((contact) => <article key={contact.id}><div><span>{contact.name.split(" ").map((part) => part[0]).join("")}</span><div><strong>{contact.name}</strong><small>{contact.role}</small></div><b className={`is-${contact.influence.toLowerCase()}`}>{contact.influence}</b></div><p>{contact.notes}</p><small>{contact.village}</small></article>)}</div>
  </div>;
}

function ObservationIntelligence({ observations, value, onChange, onSubmit }: { observations: VolunteerObservation[]; value: string; onChange: (value: string) => void; onSubmit: (event: FormEvent) => void }) {
  return <div className="volunteer-intelligence-view-content">
    <IntelligenceHeader title="Volunteer Observations" description="Unstructured field signals that may become actionable political intelligence." />
    <form className="volunteer-observation-composer" onSubmit={onSubmit}><label>What did you notice today?<textarea value={value} onChange={(event) => onChange(event.target.value)} placeholder="Record a shift in public mood, opponent movement, leadership change, or emerging issue." /></label><button type="submit" disabled={!value.trim()}>Add Observation</button></form>
    <div className="volunteer-observation-feed">{observations.map((observation) => <article key={observation.id}><span className={`volunteer-intelligence-severity is-${observation.priority.toLowerCase()}`}>{observation.priority}</span><div><p>{observation.text}</p><small>{observation.location} / {observation.time}</small></div></article>)}</div>
  </div>;
}

function ActivityTimeline({ entries }: { entries: ReturnType<typeof getVolunteerActivityIntelligence>["timeline"] }) {
  return <div className="volunteer-intelligence-view-content">
    <IntelligenceHeader title="Activity Timeline" description="Chronological history of intelligence-generating field activity." />
    <div className="volunteer-intelligence-timeline">{entries.map((entry) => <article key={entry.id}><time>{entry.date}</time><span aria-hidden="true" /><div><strong>{entry.action}</strong><p>{entry.detail}</p><small>{entry.module}</small></div></article>)}</div>
  </div>;
}

function activitySlug(value: string) {
  return value.toLowerCase().replaceAll(" ", "-");
}
