"use client";

import { useMemo, useState } from "react";
import { PlatformShell } from "@/features/platform/PlatformShell";
import { ConfidenceBadge } from "@/features/shared/intelligenceBadges";
import { CountPill, EmptyState, PriorityChip, SectionHeader, signed, trendClass } from "@/features/political-intelligence/components/common";
import { segmentIntelligenceData } from "../segments-data";
import type { Priority, SegmentCommandRecord, SegmentComparisonProfile, SegmentFilters } from "../types";

const defaultFilters: SegmentFilters = {
  segment: "All",
  ageGroup: "All",
  gender: "All",
  occupation: "All",
  supportLevel: "All",
  turnout: "All",
  priority: "All",
  status: "All",
  dateRange: "30 Days"
};

const filterOptions: Record<keyof SegmentFilters, string[]> = {
  segment: ["All", "Youth", "Women", "Farmers", "Business Owners", "Government Employees", "Teachers", "Senior Citizens", "First-Time Voters", "Small Traders", "Industrial Workers", "Professionals", "Students", "Self-Help Groups", "Cooperative Members"],
  ageGroup: ["All", "18-22", "18-25", "18-29", "25-55", "26-65", "30-60", "60+"],
  gender: ["All", "Mixed", "Women", "Men"],
  occupation: ["All", "Students", "Farmers", "Business", "Government service", "Teachers", "Industrial workers", "SHG members", "Cooperative"],
  supportLevel: ["All", "High", "Medium", "Low"],
  turnout: ["All", "High", "Medium", "Low"],
  priority: ["All", "Critical", "High", "Medium", "Low"],
  status: ["All", "Active", "Monitoring", "Planning", "At Risk", "Dormant"],
  dateRange: ["Today", "7 Days", "30 Days", "Quarter"]
};

export function VoterSegmentsIntelligenceCenter() {
  const data = segmentIntelligenceData;
  const [filters, setFilters] = useState(defaultFilters);
  const [query, setQuery] = useState("");
  const [selectedSegmentId, setSelectedSegmentId] = useState(data.command[0].id);
  const [compareA, setCompareA] = useState("Youth");
  const [compareB, setCompareB] = useState("Farmers");
  const [queuedActions, setQueuedActions] = useState<string[]>([]);

  const filteredSegments = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return data.command.filter((segment) => {
      const searchable = JSON.stringify(segment).toLowerCase();
      if (filters.segment !== "All" && segment.segmentName !== filters.segment) return false;
      if (filters.ageGroup !== "All" && segment.ageGroup !== filters.ageGroup) return false;
      if (filters.gender !== "All" && segment.gender !== filters.gender) return false;
      if (filters.occupation !== "All" && !searchable.includes(filters.occupation.toLowerCase())) return false;
      if (filters.supportLevel !== "All" && scoreLevel(segment.supportScore) !== filters.supportLevel) return false;
      if (filters.turnout !== "All" && scoreLevel(segment.turnout) !== filters.turnout) return false;
      if (filters.priority !== "All" && segment.priority !== filters.priority) return false;
      if (filters.status !== "All" && segment.status !== filters.status) return false;
      return !normalized || searchable.includes(normalized);
    });
  }, [data.command, filters, query]);

  const selectedSegment = data.command.find((segment) => segment.id === selectedSegmentId) ?? data.command[0];
  const comparisonA = data.comparisons.find((item) => item.segment === compareA) ?? data.comparisons[0];
  const comparisonB = data.comparisons.find((item) => item.segment === compareB) ?? data.comparisons[1];

  function updateFilter(key: keyof SegmentFilters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <PlatformShell activeCoreModule="voter-intelligence" activeModuleSection="voter-segments">
      <header className="candidate-header voter-header">
        <div>
          <span className="eyebrow">Voter Intelligence / Voter Segments</span>
          <h1>Voter Segments Intelligence Center</h1>
          <p>Audience segmentation, targeting, persuasion, turnout, and campaign strategy intelligence.</p>
        </div>
        <label className="global-search">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search segment, issue, campaign, influencer, village, community, task" />
        </label>
      </header>

      <section className="voter-filter-rail" aria-label="Voter segment filters">
        {Object.entries(filterOptions).map(([key, options]) => {
          const filterKey = key as keyof SegmentFilters;
          return (
            <label key={key}>
              <span>{labelize(key)}</span>
              <select value={filters[filterKey]} onChange={(event) => updateFilter(filterKey, event.target.value)}>
                {options.map((option) => <option value={option} key={option}>{option}</option>)}
              </select>
            </label>
          );
        })}
      </section>

      <main className="voter-workspace segment-workspace">
        <div className="voter-main">
          <SegmentPriorityCommand />
          <SegmentOverview />
          <SegmentCommandCenter segments={filteredSegments} selectedSegmentId={selectedSegment.id} onSelect={setSelectedSegmentId} />
          <SegmentProfile segment={selectedSegment} />
          <SegmentClassificationMatrix />
          <HighValueSegments />
          <div className="workspace-grid two-column">
            <SegmentDemographics />
            <SegmentSupportAnalysis />
          </div>
          <div className="workspace-grid two-column">
            <SegmentSentimentAnalysis />
            <SegmentIssueIntelligence />
          </div>
          <div className="workspace-grid two-column">
            <SegmentInfluencerAnalysis />
            <SegmentGeographicAnalysis />
          </div>
          <div className="workspace-grid two-column">
            <SegmentPersuasionAnalysis />
            <SegmentTurnoutAnalysis />
          </div>
          <MessageIntelligence />
          <OutreachCampaigns />
          <div className="workspace-grid two-column">
            <SegmentOpportunityAnalysis />
            <SegmentRiskAnalysis />
          </div>
          <SegmentComparisonMode profiles={data.comparisons} compareA={comparisonA} compareB={comparisonB} setCompareA={setCompareA} setCompareB={setCompareB} />
          <AiSegmentStrategy queuedActions={queuedActions} onQueue={(action) => setQueuedActions((current) => [...current, action])} />
          <SegmentTaskCenter />
          <ActionCenter />
        </div>

        <SegmentRightPanel queuedActions={queuedActions} />
      </main>
    </PlatformShell>
  );
}

function SegmentPriorityCommand() {
  const topGain = [...segmentIntelligenceData.highValue].sort((a, b) => b.expectedVoteGain - a.expectedVoteGain)[0];
  const topRisk = segmentIntelligenceData.risks[0];
  const topGrowth = segmentIntelligenceData.command.find((item) => item.segmentName === "Youth") ?? segmentIntelligenceData.command[0];
  return (
    <section className="command-priority-grid voter-priority-grid segment-priority-grid">
      <article className="priority-hero political-risk">
        <span className="eyebrow">Top Segment To Target</span>
        <h2>{topGain.segment}</h2>
        <strong>{topGain.expectedVoteGain.toLocaleString("en-IN")}</strong>
        <p>{topGain.recommendedAction}</p>
      </article>
      <article className="priority-hero community-sentiment">
        <span className="eyebrow">Growth Segment</span>
        <strong>{topGrowth.persuasionPotential}</strong>
        <p>{topGrowth.segmentName}: persuasion potential / vote value {topGrowth.voteValue.toLocaleString("en-IN")}</p>
      </article>
      <article className="priority-hero opponent-movement">
        <span className="eyebrow">Segment Risk</span>
        <h2>{topRisk.segment}</h2>
        <PriorityChip value={topRisk.severity} />
        <p>{topRisk.risk}</p>
      </article>
      <article className="priority-hero election-readiness">
        <span className="eyebrow">Expected Vote Gain</span>
        <strong>12.4K</strong>
        <p>Aggregate gain from high-value segment strategy.</p>
      </article>
      <article className="priority-hero ai-recommendation">
        <span className="eyebrow">AI Segment Strategy</span>
        <h2>{segmentIntelligenceData.recommendations[0].recommendation}</h2>
        <p>{segmentIntelligenceData.recommendations[0].reason}</p>
      </article>
    </section>
  );
}

function SegmentOverview() {
  return (
    <section className="overview-bar" id="segment-overview">
      {segmentIntelligenceData.overview.map((metric) => (
        <article className="metric-cell" key={metric.label}>
          <div className="metric-label">{metric.label}</div>
          <div className="metric-value-row">
            <strong>{metric.value}</strong>
            <span className={`trend-chip ${trendClass(metric.trend)}`}>{metric.trend}</span>
          </div>
          <div className="metric-meta"><span>{signed(metric.change)}%</span><span>Movement</span></div>
          <ConfidenceBadge score={metric.confidence} />
        </article>
      ))}
    </section>
  );
}

function SegmentCommandCenter({ segments, selectedSegmentId, onSelect }: { segments: SegmentCommandRecord[]; selectedSegmentId: string; onSelect: (id: string) => void }) {
  return (
    <section className="panel table-panel" id="segment-command-center">
      <SectionHeader title="Segment Command Center" eyebrow="Estimated voters, support, sentiment, turnout, persuasion, vote value" actions={<CountPill>{segments.length} segments</CountPill>} />
      {segments.length ? (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>{["Segment Name", "Estimated Voters", "Support Score", "Sentiment", "Turnout", "Persuasion Potential", "Vote Value", "Priority", "Status"].map((column) => <th key={column}>{column}</th>)}</tr>
            </thead>
            <tbody>
              {segments.map((segment) => (
                <tr className={selectedSegmentId === segment.id ? "is-selected-row" : ""} key={segment.id} onClick={() => onSelect(segment.id)}>
                  <td><button className="table-link-btn" type="button">{segment.segmentName}</button></td>
                  <td>{segment.estimatedVoters.toLocaleString("en-IN")}</td>
                  <td>{segment.supportScore}</td>
                  <td><span className={`sentiment-pill sentiment-${segment.sentiment.toLowerCase()}`}>{segment.sentiment}</span></td>
                  <td>{segment.turnout}%</td>
                  <td>{segment.persuasionPotential}</td>
                  <td>{segment.voteValue.toLocaleString("en-IN")}</td>
                  <td><PriorityChip value={segment.priority} /></td>
                  <td>{segment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <EmptyState title="No segments match filters" body="Adjust segment, age, occupation, priority, status, or search filters." />}
    </section>
  );
}

function SegmentProfile({ segment }: { segment: SegmentCommandRecord }) {
  return (
    <section className="panel" id="segment-profile">
      <SectionHeader title="Selected Segment Profile" eyebrow="Current targeting profile and campaign posture" />
      <div className="segment-profile-grid">
        <article>
          <span>Segment</span>
          <strong>{segment.segmentName}</strong>
          <p>{segment.ageGroup} / {segment.gender} / {segment.occupation}</p>
        </article>
        <Meter label="Support" value={segment.supportScore} />
        <Meter label="Turnout" value={segment.turnout} />
        <Meter label="Persuasion" value={segment.persuasionPotential} />
        <Meter label="Vote Value" value={segment.voteValue} max={3400} />
      </div>
    </section>
  );
}

function SegmentClassificationMatrix() {
  return (
    <section className="panel" id="segment-classification-matrix">
      <SectionHeader title="Segment Classification Matrix" eyebrow="Support, opposition, neutral, persuadable, turnout, influence, vote value" />
      <div className="segment-matrix">
        {["Segment", "Support", "Oppose", "Neutral", "Persuadable", "Turnout", "Influence", "Vote Value"].map((header) => <strong className="conversion-matrix-head" key={header}>{header}</strong>)}
        {segmentIntelligenceData.matrix.map((row) => (
          <div className="segment-matrix-row" key={row.segment}>
            <button type="button">{row.segment}</button>
            <span className="matrix-cell-support">{row.support}%</span>
            <span className="matrix-cell-risk">{row.opposition}%</span>
            <span className="matrix-cell-neutral">{row.neutral}%</span>
            <span className="matrix-cell-watch">{row.persuadable}%</span>
            <span>{row.turnout}%</span>
            <span>{row.influence}</span>
            <span className="matrix-cell-strong">{row.voteValue.toLocaleString("en-IN")}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function HighValueSegments() {
  return <SimpleTable id="high-value-segments" title="High Value Segments" columns={["Segment", "Current Support", "Potential Support", "Expected Vote Gain", "Priority", "Recommended Action", "Owner", "Status"]} rows={segmentIntelligenceData.highValue.map((item) => [item.segment, `${item.currentSupport}%`, `${item.potentialSupport}%`, item.expectedVoteGain.toLocaleString("en-IN"), item.priority, item.recommendedAction, item.owner, item.status])} priorityColumn={4} />;
}

function SegmentDemographics() {
  return <SimpleTable id="segment-demographics" title="Segment Demographics" columns={["Segment", "Age", "Gender", "Occupation", "Income", "Education", "Community Mix", "Village Distribution", "Booth Distribution"]} rows={segmentIntelligenceData.demographics.map((item) => [item.segment, item.age, item.gender, item.occupation, item.income, item.education, item.communityMix, item.villageDistribution, item.boothDistribution])} />;
}

function SegmentSupportAnalysis() {
  return <SimpleTable id="segment-support-analysis" title="Segment Support Analysis" columns={["Segment", "Strong", "Weak", "Neutral", "Opposition", "Persuadable", "Unknown"]} rows={segmentIntelligenceData.support.map((item) => [item.segment, `${item.strongSupporters}%`, `${item.weakSupporters}%`, `${item.neutral}%`, `${item.opposition}%`, `${item.persuadable}%`, `${item.unknown}%`])} />;
}

function SegmentSentimentAnalysis() {
  return <SimpleTable id="segment-sentiment-analysis" title="Segment Sentiment Analysis" columns={["Segment", "Positive", "Neutral", "Negative", "Trend", "Confidence", "Historical", "Monthly", "Quarterly", "Yearly"]} rows={segmentIntelligenceData.sentiment.map((item) => [item.segment, `${item.positive}%`, `${item.neutral}%`, `${item.negative}%`, item.trend, `${item.confidence}%`, `${signed(item.historicalMovement)}%`, `${signed(item.monthly)}%`, `${signed(item.quarterly)}%`, `${signed(item.yearly)}%`])} />;
}

function SegmentIssueIntelligence() {
  return <SimpleTable id="segment-issue-intelligence" title="Segment Issue Intelligence" columns={["Segment", "Top Issues", "Severity", "Political Impact"]} rows={segmentIntelligenceData.issues.map((item) => [item.segment, item.topIssues, item.severity, item.politicalImpact])} priorityColumn={2} />;
}

function SegmentInfluencerAnalysis() {
  return <SimpleTable id="segment-influencer-analysis" title="Segment Influencer Analysis" columns={["Segment", "Top Influencers", "Influence Score", "Alignment", "Relationship", "Expected Vote Impact"]} rows={segmentIntelligenceData.influencers.map((item) => [item.segment, item.topInfluencers, item.influenceScore, item.alignment, item.relationshipStrength, item.expectedVoteImpact.toLocaleString("en-IN")])} />;
}

function SegmentGeographicAnalysis() {
  return (
    <section className="panel geo-panel" id="segment-geographic-analysis">
      <SectionHeader title="Segment Geographic Analysis" eyebrow="Village distribution, booth distribution, clusters, and influence zones" />
      <div className="map-stage segment-map-stage">
        <svg className="constituency-map" viewBox="0 0 100 100">
          <path d="M16,18 L48,9 L76,16 L91,39 L83,72 L61,91 L31,86 L10,62 L7,35 Z" />
          <path d="M29,22 L52,18 L73,28 L77,50 L65,68 L43,75 L25,61 L19,40 Z" />
          <path d="M50,12 L51,89" />
          <path d="M13,58 L88,40" />
        </svg>
        {segmentIntelligenceData.geography.map((item) => (
          <button className="map-marker segment-map-marker" key={item.segment} style={{ left: `${item.x}%`, top: `${item.y}%` }} type="button">
            <span>{item.segment}</span>
          </button>
        ))}
      </div>
      <div className="segment-zone-list">
        {segmentIntelligenceData.geography.map((item) => (
          <article className="context-row" key={item.segment}>
            <strong>{item.segment}</strong>
            <span>{item.villageDistribution} / {item.influenceZones}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function SegmentPersuasionAnalysis() {
  return <SimpleTable id="segment-persuasion-analysis" title="Segment Persuasion Analysis" columns={["Segment", "Current", "Potential", "Expected Gain", "Conversion", "Priority", "Message", "Action"]} rows={segmentIntelligenceData.persuasion.map((item) => [item.segment, `${item.currentSupport}%`, `${item.potentialSupport}%`, item.expectedGain.toLocaleString("en-IN"), `${item.conversionProbability}%`, item.priority, item.recommendedMessage, item.recommendedAction])} priorityColumn={5} />;
}

function SegmentTurnoutAnalysis() {
  return <SimpleTable id="segment-turnout-analysis" title="Segment Turnout Analysis" columns={["Segment", "Expected Turnout", "Target Turnout", "Gap", "Mobilization Potential", "Expected Vote Gain", "Priority"]} rows={segmentIntelligenceData.turnout.map((item) => [item.segment, `${item.expectedTurnout}%`, `${item.targetTurnout}%`, `${item.turnoutGap}%`, item.mobilizationPotential.toLocaleString("en-IN"), item.expectedVoteGain.toLocaleString("en-IN"), item.priority])} priorityColumn={6} />;
}

function MessageIntelligence() {
  return <SimpleTable id="message-intelligence" title="Message Intelligence" columns={["Message Theme", "Target Segment", "Expected Impact", "Effectiveness", "Status"]} rows={segmentIntelligenceData.messages.map((item) => [item.messageTheme, item.targetSegment, item.expectedImpact.toLocaleString("en-IN"), `${item.effectiveness}%`, item.status])} />;
}

function OutreachCampaigns() {
  return (
    <section className="panel" id="outreach-campaigns">
      <SectionHeader title="Outreach Campaigns" eyebrow="Campaign reach, engagement, impact, expected votes, and status" />
      <div className="turnout-card-grid segment-campaign-grid">
        {segmentIntelligenceData.campaigns.map((campaign) => (
          <article className="turnout-ops-card" key={campaign.campaign}>
            <div className="recommendation-top">
              <strong>{campaign.campaign}</strong>
              <PriorityChip value={campaign.priority} />
            </div>
            <small>{campaign.targetSegment} / {campaign.status}</small>
            <Meter label="Engagement" value={campaign.engagement} />
            <Meter label="Impact" value={campaign.impact} />
            <p>Reach {campaign.reach.toLocaleString("en-IN")}</p>
            <b>{campaign.expectedVotes.toLocaleString("en-IN")} expected votes</b>
          </article>
        ))}
      </div>
    </section>
  );
}

function SegmentOpportunityAnalysis() {
  return <SimpleTable id="segment-opportunity-analysis" title="Segment Opportunity Analysis" columns={["Opportunity", "Segment", "Expected Votes", "Priority", "Owner", "Status", "Action Plan"]} rows={segmentIntelligenceData.opportunities.map((item) => [item.opportunity, item.segment, item.expectedVotes.toLocaleString("en-IN"), item.priority, item.owner, item.status, item.actionPlan])} priorityColumn={3} />;
}

function SegmentRiskAnalysis() {
  return <SimpleTable id="segment-risk-analysis" title="Segment Risk Analysis" columns={["Risk", "Segment", "Potential Vote Loss", "Severity", "Owner", "Mitigation", "Status"]} rows={segmentIntelligenceData.risks.map((item) => [item.risk, item.segment, item.potentialVoteLoss.toLocaleString("en-IN"), item.severity, item.owner, item.mitigation, item.status])} priorityColumn={3} />;
}

function SegmentComparisonMode({ profiles, compareA, compareB, setCompareA, setCompareB }: { profiles: SegmentComparisonProfile[]; compareA: SegmentComparisonProfile; compareB: SegmentComparisonProfile; setCompareA: (segment: string) => void; setCompareB: (segment: string) => void }) {
  return (
    <section className="panel" id="segment-comparison-mode">
      <SectionHeader title="Segment Comparison Mode" eyebrow="Compare support, sentiment, issues, turnout, persuasion, influence, expected votes" />
      <div className="comparison-controls">
        <select value={compareA.segment} onChange={(event) => setCompareA(event.target.value)}>
          {profiles.map((profile) => <option value={profile.segment} key={profile.segment}>{profile.segment}</option>)}
        </select>
        <select value={compareB.segment} onChange={(event) => setCompareB(event.target.value)}>
          {profiles.map((profile) => <option value={profile.segment} key={profile.segment}>{profile.segment}</option>)}
        </select>
      </div>
      <div className="comparison-grid">
        {[compareA, compareB].map((profile) => (
          <article key={profile.segment}>
            <h3>{profile.segment}</h3>
            <Meter label="Support" value={profile.support} />
            <Meter label="Turnout" value={profile.turnout} />
            <Meter label="Persuasion" value={profile.persuasion} />
            <Meter label="Influence" value={profile.influence} />
            <small>Sentiment: {profile.sentiment}</small>
            <small>Issues: {profile.issues}</small>
            <small>Expected votes: {profile.expectedVotes.toLocaleString("en-IN")}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function AiSegmentStrategy({ queuedActions, onQueue }: { queuedActions: string[]; onQueue: (action: string) => void }) {
  return (
    <section className="panel recommendations-panel" id="ai-segment-strategy">
      <SectionHeader title="AI Segment Strategy" eyebrow="Attention, gain, risk, message, outreach, expected vote impact" />
      <div className="recommendation-list">
        {segmentIntelligenceData.recommendations.map((item) => (
          <article className={`recommendation-card ${levelClass(item.priority)}`} key={item.recommendation}>
            <div className="recommendation-top">
              <div className="badge-row"><PriorityChip value={item.priority} /><ConfidenceBadge score={item.confidence} /></div>
              <a className="action-btn" href={`/tasks/new?title=${encodeURIComponent(item.actionLabel)}`} onClick={() => onQueue(item.recommendation)}>{queuedActions.includes(item.recommendation) ? "Queued" : item.actionLabel}</a>
            </div>
            <h3>{item.recommendation}</h3>
            <p><b>Reason:</b> {item.reason}</p>
            <p><b>Expected votes:</b> {item.expectedVotes.toLocaleString("en-IN")}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SegmentTaskCenter() {
  return <SimpleTable id="segment-task-center" title="Segment Task Center" columns={["Segment", "Open", "Pending", "Overdue", "Completed", "Highest Priority Task"]} rows={segmentIntelligenceData.tasks.map((item) => [item.segment, item.openTasks, item.pendingTasks, item.overdueTasks, item.completedTasks, item.highestPriorityTask])} />;
}

function ActionCenter() {
  const actions = [
    ["Create Segment Campaign", "/tasks/new?type=segment_campaign"],
    ["Assign Outreach Team", "/tasks/new?type=segment_outreach"],
    ["Assign Volunteer Team", "/tasks/new?type=segment_volunteers"],
    ["Create Persuasion Campaign", "/tasks/new?type=segment_persuasion"],
    ["Create Turnout Campaign", "/tasks/new?type=segment_turnout"],
    ["Generate Segment Report", "/reports/daily-brief/new?type=segment_report"],
    ["Generate Campaign Brief", "/candidate-intelligence/manage/new?type=segment_brief"],
    ["Generate Strategy Document", "/reports/daily-brief/new?type=segment_strategy"]
  ];
  return (
    <section className="panel" id="segment-actions">
      <SectionHeader title="Action Center" eyebrow="Turn segment intelligence into campaign targeting action" />
      <div className="voter-action-grid">
        {actions.map(([label, href]) => <a className="action-panel-btn" href={href} key={label}>{label}</a>)}
      </div>
    </section>
  );
}

function SegmentRightPanel({ queuedActions }: { queuedActions: string[] }) {
  const topSegments = [...segmentIntelligenceData.highValue].sort((a, b) => b.expectedVoteGain - a.expectedVoteGain).slice(0, 3);
  const growthSegments = [...segmentIntelligenceData.command].sort((a, b) => b.persuasionPotential - a.persuasionPotential).slice(0, 3);
  const riskSegments = segmentIntelligenceData.risks.slice(0, 4);
  const pendingActions = segmentIntelligenceData.tasks.map((item) => `${item.segment}: ${item.openTasks} open / ${item.overdueTasks} overdue`);
  const alerts = segmentIntelligenceData.risks.map((item) => `${item.segment}: ${item.risk}`);
  return (
    <aside className="voter-intel-panel segment-intel-panel">
      <SectionHeader title="Segment Intel Panel" eyebrow="Always-on targeting watch" />
      <PanelList title="Top Segments" items={topSegments.map((item) => `${item.segment}: ${item.expectedVoteGain.toLocaleString("en-IN")} votes`)} />
      <PanelList title="Growth Segments" items={growthSegments.map((item) => `${item.segmentName}: persuasion ${item.persuasionPotential} / value ${item.voteValue.toLocaleString("en-IN")}`)} />
      <PanelList title="Risk Segments" items={riskSegments.map((item) => `${item.segment}: ${item.potentialVoteLoss.toLocaleString("en-IN")} vote loss risk`)} />
      <PanelList title="Pending Actions" items={pendingActions} />
      <PanelList title="Campaign Alerts" items={alerts} />
      <PanelList title="Recent Changes" items={queuedActions.length ? queuedActions : ["No segment actions queued from this session"]} />
    </aside>
  );
}

function PanelList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="context-card">
      <h3>{title}</h3>
      <div className="context-list">
        {items.map((item) => <article className="context-row" key={item}>{item}</article>)}
      </div>
    </section>
  );
}

function SimpleTable({ id, title, columns, rows, priorityColumn }: { id: string; title: string; columns: string[]; rows: Array<Array<string | number>>; priorityColumn?: number }) {
  return (
    <section className="panel table-panel" id={id}>
      <SectionHeader title={title} eyebrow="Ranked segment intelligence" actions={<CountPill>{rows.length} rows</CountPill>} />
      {rows.length ? (
        <div className="table-scroll">
          <table>
            <thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>{row.map((cell, cellIndex) => <td key={`${index}-${cellIndex}`}>{priorityColumn === cellIndex ? <PriorityChip value={String(cell)} /> : cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <EmptyState title="No matching segment intelligence" body="Adjust filters to restore this table." />}
    </section>
  );
}

function Meter({ label, value, danger, max = 100 }: { label: string; value: number; danger?: boolean; max?: number }) {
  const width = Math.min((value / max) * 100, 100);
  return (
    <div className="support-row">
      <span>{label}</span>
      <div><i className={danger ? "score-weak" : width > 65 ? "score-strong" : width > 40 ? "score-watch" : "score-weak"} style={{ width: `${width}%` }} /></div>
      <b>{max === 100 ? `${Math.round(width)}%` : value.toLocaleString("en-IN")}</b>
    </div>
  );
}

function scoreLevel(value: number) {
  if (value >= 65) return "High";
  if (value >= 50) return "Medium";
  return "Low";
}

function levelClass(priority: Priority) {
  return `level-${priority.toLowerCase()}`;
}

function labelize(value: string) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}
