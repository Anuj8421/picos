"use client";

import { useMemo, useState } from "react";
import { PlatformShell } from "@/features/platform/PlatformShell";
import { ConfidenceBadge } from "@/features/shared/intelligenceBadges";
import { CountPill, EmptyState, PriorityChip, SectionHeader, signed, trendClass } from "@/features/political-intelligence/components/common";
import { influencerIntelligenceData } from "../influencer-data";
import type {
  InfluenceNetworkEdge,
  InfluenceNetworkNode,
  InfluencerCommandRecord,
  InfluencerComparisonProfile,
  InfluencerFilters
} from "../types";

const defaultFilters: InfluencerFilters = {
  village: "All",
  community: "All",
  category: "All",
  supportLevel: "All",
  influenceScore: "All",
  riskLevel: "All",
  opportunityLevel: "All",
  relationshipStrength: "All",
  dateRange: "30 Days"
};

const filterOptions = {
  village: ["All", "Sinnar Town", "Musalgaon", "Pangri", "Dubere", "Devpur", "Wavi"],
  community: ["All", "Farmers", "Youth", "Women", "Maratha", "SC"],
  category: ["All", "Sarpanch", "Ex-Sarpanch", "Teacher", "Doctor", "Farmer Leader", "Business Leader", "Religious Leader", "Social Worker", "Political Worker", "Youth Leader", "Women Leader", "NGO Leader", "Media Personality", "Contractor", "Cooperative Leader"],
  supportLevel: ["All", "Supportive", "Neutral", "Opposing", "Persuadable", "High Influence", "High Risk", "Growth Opportunity"],
  influenceScore: ["All", "High", "Medium", "Low"],
  riskLevel: ["All", "Critical", "High", "Medium", "Low"],
  opportunityLevel: ["All", "Critical", "High", "Medium", "Low"],
  relationshipStrength: ["All", "High", "Medium", "Low"],
  dateRange: ["Today", "7 Days", "30 Days", "Quarter"]
};

export function InfluencerIntelligenceCenter() {
  const data = influencerIntelligenceData;
  const [filters, setFilters] = useState(defaultFilters);
  const [query, setQuery] = useState("");
  const [selectedInfluencerId, setSelectedInfluencerId] = useState(data.command[0].id);
  const [compareA, setCompareA] = useState("Cooperative office bearers");
  const [compareB, setCompareB] = useState("Youth sports organizers");
  const [queuedActions, setQueuedActions] = useState<string[]>([]);

  const filteredInfluencers = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return data.command.filter((influencer) => {
      if (filters.village !== "All" && influencer.village !== filters.village) return false;
      if (filters.community !== "All" && influencer.community !== filters.community) return false;
      if (filters.category !== "All" && influencer.category !== filters.category) return false;
      if (filters.supportLevel !== "All" && influencer.supportLevel !== filters.supportLevel) return false;
      if (filters.influenceScore !== "All" && scoreLevel(influencer.influenceScore) !== filters.influenceScore) return false;
      if (filters.riskLevel !== "All" && priorityFromScore(influencer.influenceScore - influencer.relationshipStrength + 35) !== filters.riskLevel) return false;
      if (filters.opportunityLevel !== "All" && priorityFromScore(influencer.influenceScore) !== filters.opportunityLevel) return false;
      if (filters.relationshipStrength !== "All" && scoreLevel(influencer.relationshipStrength) !== filters.relationshipStrength) return false;
      if (!normalized) return true;
      return JSON.stringify(influencer).toLowerCase().includes(normalized);
    });
  }, [data.command, filters.category, filters.community, filters.influenceScore, filters.opportunityLevel, filters.relationshipStrength, filters.riskLevel, filters.supportLevel, filters.village, query]);

  const selectedInfluencer = data.command.find((influencer) => influencer.id === selectedInfluencerId) ?? data.command[0];
  const comparisonA = data.comparisons.find((item) => item.influencer === compareA) ?? data.comparisons[0];
  const comparisonB = data.comparisons.find((item) => item.influencer === compareB) ?? data.comparisons[1];

  function updateFilter(key: keyof InfluencerFilters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <PlatformShell activeCoreModule="voter-intelligence" activeModuleSection="influencer-intelligence">
      <header className="candidate-header voter-header">
        <div>
          <span className="eyebrow">Voter Intelligence / Influencer Intelligence</span>
          <h1>Influencer Intelligence Center</h1>
          <p>Political influence, relationship, reach, alignment, and voter impact intelligence.</p>
        </div>
        <label className="global-search">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search influencer, community, village, organization, occupation, issue, task, relationship" />
        </label>
      </header>

      <section className="voter-filter-rail" aria-label="Influencer intelligence filters">
        {Object.entries(filterOptions).map(([key, options]) => (
          <label key={key}>
            <span>{labelize(key)}</span>
            <select value={filters[key as keyof InfluencerFilters]} onChange={(event) => updateFilter(key as keyof InfluencerFilters, event.target.value)}>
              {options.map((option) => <option value={option} key={option}>{option}</option>)}
            </select>
          </label>
        ))}
      </section>

      <main className="voter-workspace influencer-workspace">
        <div className="voter-main">
          <InfluencerPriorityCommand data={data} />
          <InfluencerOverview metrics={data.overview} />
          <InfluencerCommandTable influencers={filteredInfluencers} selectedInfluencerId={selectedInfluencer.id} onSelect={setSelectedInfluencerId} />
          <div className="workspace-grid two-column visual-grid">
            <InfluenceNetworkMap nodes={data.networkNodes} edges={data.networkEdges} />
            <InfluencerProfile influencer={selectedInfluencer} />
          </div>
          <div className="workspace-grid two-column">
            <TopInfluencersTable rows={data.topInfluencers} />
            <InfluencersAtRisk risks={data.risks} />
          </div>
          <div className="workspace-grid two-column">
            <InfluencerCategories categories={data.categories} />
            <CommunityInfluenceAnalysis rows={data.communityAnalysis} />
          </div>
          <div className="workspace-grid two-column">
            <VillageInfluenceAnalysis rows={data.villageAnalysis} />
            <OrganizationInfluenceAnalysis rows={data.organizationAnalysis} />
          </div>
          <div className="workspace-grid two-column">
            <RelationshipManagement rows={data.relationships} />
            <EngagementTracker rows={data.engagement} />
          </div>
          <div className="workspace-grid two-column">
            <InfluencerSentiment rows={data.sentiment} />
            <TaskCenter rows={data.tasks} />
          </div>
          <div className="workspace-grid two-column">
            <InfluencerOpportunityAnalysis rows={data.opportunities} />
            <InfluencerRiskAnalysis rows={data.riskAnalysis} />
          </div>
          <AiInfluencerStrategy recommendations={data.recommendations} queuedActions={queuedActions} onQueue={(item) => setQueuedActions((current) => [...current, item])} />
          <InfluencerComparisonMode profiles={data.comparisons} compareA={comparisonA} compareB={comparisonB} setCompareA={setCompareA} setCompareB={setCompareB} />
          <InfluencerActionCenter />
        </div>

        <InfluencerRightPanel
          influencers={data.command}
          risks={data.risks}
          relationships={data.relationships}
          tasks={data.tasks}
          queuedActions={queuedActions}
        />
      </main>
    </PlatformShell>
  );
}

function InfluencerPriorityCommand({ data }: { data: typeof influencerIntelligenceData }) {
  const topImpact = data.topInfluencers[0];
  const topRisk = data.risks[0];
  const growth = data.opportunities[0];
  return (
    <section className="command-priority-grid voter-priority-grid influencer-priority-grid">
      <article className="priority-hero political-risk">
        <span className="eyebrow">Highest Vote Impact</span>
        <h2>{topImpact.influencer}</h2>
        <strong>{topImpact.expectedVoteImpact}</strong>
        <p>{topImpact.recommendedAction} / reach {topImpact.reach.toLocaleString("en-IN")}</p>
      </article>
      <article className="priority-hero community-sentiment">
        <span className="eyebrow">Growth Influence</span>
        <strong>{growth.influencer}</strong>
        <p>{growth.targetCommunity} / expected gain {growth.expectedVoteGain}</p>
      </article>
      <article className="priority-hero opponent-movement">
        <span className="eyebrow">Influence Risk</span>
        <h2>{topRisk.influencer}</h2>
        <PriorityChip value={topRisk.severity} />
        <p>{topRisk.risk}</p>
      </article>
      <article className="priority-hero election-readiness">
        <span className="eyebrow">Persuadable Influencers</span>
        <strong>74</strong>
        <p>Best conversion pool: farmer, women, and teacher networks.</p>
      </article>
      <article className="priority-hero ai-recommendation">
        <span className="eyebrow">AI Influencer Strategy</span>
        <h2>{data.recommendations[0].recommendation}</h2>
        <p>{data.recommendations[0].reason}</p>
      </article>
    </section>
  );
}

function InfluencerOverview({ metrics }: { metrics: typeof influencerIntelligenceData.overview }) {
  return (
    <section className="overview-bar" id="influencer-overview">
      {metrics.map((metric) => (
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

function InfluencerCommandTable({ influencers, selectedInfluencerId, onSelect }: { influencers: InfluencerCommandRecord[]; selectedInfluencerId: string; onSelect: (id: string) => void }) {
  return (
    <section className="panel table-panel" id="influencer-command-table">
      <SectionHeader title="Influencer Command Table" eyebrow="Influence score, reach, alignment, relationship, priority" actions={<CountPill>{influencers.length} influencers</CountPill>} />
      {influencers.length ? (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                {["Name", "Category", "Village", "Community", "Influence", "Estimated Voters", "Alignment", "Relationship", "Support Level", "Priority", "Status"].map((column) => <th key={column}>{column}</th>)}
              </tr>
            </thead>
            <tbody>
              {influencers.map((influencer) => (
                <tr className={selectedInfluencerId === influencer.id ? "is-selected-row" : ""} key={influencer.id} onClick={() => onSelect(influencer.id)}>
                  <td><button className="table-link-btn" type="button">{influencer.name}</button></td>
                  <td>{influencer.category}</td>
                  <td>{influencer.village}</td>
                  <td>{influencer.community}</td>
                  <td>{influencer.influenceScore}</td>
                  <td>{influencer.estimatedVotersInfluenced.toLocaleString("en-IN")}</td>
                  <td>{influencer.politicalAlignment}</td>
                  <td>{influencer.relationshipStrength}</td>
                  <td><span className={`influencer-support-chip ${supportClass(influencer.supportLevel)}`}>{influencer.supportLevel}</span></td>
                  <td><PriorityChip value={influencer.priority} /></td>
                  <td>{influencer.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <EmptyState title="No influencer records match filters" body="Adjust village, category, support, relationship, or search filters." />}
    </section>
  );
}

function InfluenceNetworkMap({ nodes, edges }: { nodes: InfluenceNetworkNode[]; edges: InfluenceNetworkEdge[] }) {
  return (
    <section className="panel" id="influence-network-map">
      <SectionHeader title="Influence Network Map" eyebrow="Influencer to communities, villages, organizations, voters" />
      <div className="community-network-stage influence-network-stage">
        <svg viewBox="0 0 100 100">
          {edges.map((edge) => {
            const from = nodes.find((node) => node.id === edge.from);
            const to = nodes.find((node) => node.id === edge.to);
            if (!from || !to) return null;
            return <line key={`${edge.from}-${edge.to}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} strokeWidth={Math.max(1, edge.strength / 34)} />;
          })}
        </svg>
        {nodes.map((node) => (
          <button className={`community-network-node influence-network-node node-${node.type}`} key={node.id} style={{ left: `${node.x}%`, top: `${node.y}%` }} type="button">
            <span />
            <b>{node.label}</b>
          </button>
        ))}
      </div>
    </section>
  );
}

function InfluencerProfile({ influencer }: { influencer: InfluencerCommandRecord }) {
  return (
    <section className="panel" id="influencer-profile">
      <SectionHeader title="Influencer Profile" eyebrow="Selected political influence profile" />
      <div className="influencer-profile-layout">
        <div className="influencer-photo">{influencer.photoLabel}</div>
        <div className="household-profile-grid influencer-profile-grid">
          {[
            ["Name", influencer.name],
            ["Category", influencer.category],
            ["Community", influencer.community],
            ["Village", influencer.village],
            ["Occupation", influencer.occupation],
            ["Organizations", influencer.organizations.join(", ")],
            ["Political Alignment", influencer.politicalAlignment],
            ["Relationship Strength", influencer.relationshipStrength],
            ["Estimated Reach", influencer.estimatedVotersInfluenced.toLocaleString("en-IN")],
            ["Influence Score", influencer.influenceScore],
            ["Notes", influencer.notes]
          ].map(([label, value]) => <article key={String(label)}><span>{label}</span><strong>{value}</strong></article>)}
        </div>
      </div>
    </section>
  );
}

function TopInfluencersTable({ rows }: { rows: typeof influencerIntelligenceData.topInfluencers }) {
  return <SimpleTable id="top-influencers" title="Top Influencers" columns={["Influencer", "Influence Score", "Reach", "Support", "Relationship", "Expected Vote Impact", "Priority", "Recommended Action"]} rows={rows.map((item) => [item.influencer, item.influenceScore, item.reach, item.support, item.relationship, item.expectedVoteImpact, item.priority, item.recommendedAction])} priorityColumn={6} />;
}

function InfluencersAtRisk({ risks }: { risks: typeof influencerIntelligenceData.risks }) {
  return <SimpleTable id="influencers-risk" title="Influencers At Risk" columns={["Influencer", "Risk", "Potential Vote Impact", "Severity", "Reason", "Owner", "Mitigation", "Status"]} rows={risks.map((item) => [item.influencer, item.risk, item.potentialVoteImpact, item.severity, item.reason, item.owner, item.mitigation, item.status])} priorityColumn={3} />;
}

function InfluencerCategories({ categories }: { categories: typeof influencerIntelligenceData.categories }) {
  return <SimpleTable id="influencer-categories" title="Influencer Categories" columns={["Category", "Count", "Supportive", "Persuadable", "Risk", "Combined Reach"]} rows={categories.map((item) => [item.category, item.count, item.supportive, item.persuadable, item.risk, item.combinedReach])} />;
}

function CommunityInfluenceAnalysis({ rows }: { rows: typeof influencerIntelligenceData.communityAnalysis }) {
  return <SimpleTable id="community-influence-analysis" title="Community Influence Analysis" columns={["Community", "Top Influencers", "Combined Reach", "Support Score", "Opportunity", "Risk"]} rows={rows.map((item) => [item.community, item.topInfluencers, item.combinedReach, item.supportScore, item.opportunityScore, item.riskScore])} />;
}

function VillageInfluenceAnalysis({ rows }: { rows: typeof influencerIntelligenceData.villageAnalysis }) {
  return <SimpleTable id="village-influence-analysis" title="Village Influence Analysis" columns={["Village", "Top Influencers", "Combined Reach", "Support", "Risk", "Opportunity", "Influence Density"]} rows={rows.map((item) => [item.village, item.topInfluencers, item.combinedReach, item.support, item.risk, item.opportunity, item.influenceDensity])} />;
}

function OrganizationInfluenceAnalysis({ rows }: { rows: typeof influencerIntelligenceData.organizationAnalysis }) {
  return <SimpleTable id="organization-influence-analysis" title="Organization Influence Analysis" columns={["Organization", "Members", "Reach", "Alignment", "Influence"]} rows={rows.map((item) => [item.organization, item.members, item.reach, item.politicalAlignment, item.influence])} />;
}

function RelationshipManagement({ rows }: { rows: typeof influencerIntelligenceData.relationships }) {
  return <SimpleTable id="relationship-management" title="Relationship Management" columns={["Influencer", "Relationship", "History", "Last Contact", "Last Meeting", "Last Event", "Next Action", "Assigned Team", "Status"]} rows={rows.map((item) => [item.influencer, item.relationshipStrength, item.history, item.lastContact, item.lastMeeting, item.lastEvent, item.nextAction, item.assignedTeam, item.status])} />;
}

function EngagementTracker({ rows }: { rows: typeof influencerIntelligenceData.engagement }) {
  return <SimpleTable id="influencer-engagement" title="Engagement Tracker" columns={["Influencer", "Meetings", "Calls", "Events", "Visits", "Issue Resolution", "Introductions", "Follow-ups"]} rows={rows.map((item) => [item.influencer, item.meetings, item.calls, item.events, item.visits, item.issueResolution, item.introductions, item.followUps])} />;
}

function InfluencerSentiment({ rows }: { rows: typeof influencerIntelligenceData.sentiment }) {
  return <SimpleTable id="influencer-sentiment" title="Influencer Sentiment" columns={["Influencer", "Sentiment", "Trend", "Confidence", "Influence Impact", "Historical Movement"]} rows={rows.map((item) => [item.influencer, item.sentiment, item.trend, item.confidence, item.influenceImpact, `${signed(item.historicalMovement)}%`])} />;
}

function InfluencerOpportunityAnalysis({ rows }: { rows: typeof influencerIntelligenceData.opportunities }) {
  return <SimpleTable id="influencer-opportunities" title="Influencer Opportunity Analysis" columns={["Influencer", "Expected Vote Gain", "Target Community", "Priority", "Owner", "Status", "Action Plan"]} rows={rows.map((item) => [item.influencer, item.expectedVoteGain, item.targetCommunity, item.priority, item.owner, item.status, item.actionPlan])} priorityColumn={3} />;
}

function InfluencerRiskAnalysis({ rows }: { rows: typeof influencerIntelligenceData.riskAnalysis }) {
  return <SimpleTable id="influencer-risk-analysis" title="Influencer Risk Analysis" columns={["Influencer", "Potential Vote Loss", "Risk Type", "Severity", "Owner", "Mitigation Plan", "Status"]} rows={rows.map((item) => [item.influencer, item.potentialVoteLoss, item.riskType, item.severity, item.owner, item.mitigationPlan, item.status])} priorityColumn={3} />;
}

function TaskCenter({ rows }: { rows: typeof influencerIntelligenceData.tasks }) {
  return <SimpleTable id="influencer-task-center" title="Task Center" columns={["Influencer", "Open", "Pending", "Overdue", "Completed", "Highest Priority Task"]} rows={rows.map((item) => [item.influencer, item.openTasks, item.pendingTasks, item.overdueTasks, item.completedTasks, item.highestPriorityTask])} />;
}

function AiInfluencerStrategy({ recommendations, queuedActions, onQueue }: { recommendations: typeof influencerIntelligenceData.recommendations; queuedActions: string[]; onQueue: (recommendation: string) => void }) {
  return (
    <section className="panel recommendations-panel" id="ai-influencer-strategy">
      <SectionHeader title="AI Influencer Strategy" eyebrow="Which people can influence votes and how should Uday Sangle engage them?" />
      <div className="recommendation-list">
        {recommendations.map((item) => (
          <article className="recommendation-card level-high" key={item.recommendation}>
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

function InfluencerComparisonMode({ profiles, compareA, compareB, setCompareA, setCompareB }: { profiles: InfluencerComparisonProfile[]; compareA: InfluencerComparisonProfile; compareB: InfluencerComparisonProfile; setCompareA: (influencer: string) => void; setCompareB: (influencer: string) => void }) {
  return (
    <section className="panel" id="influencer-comparison">
      <SectionHeader title="Influencer Comparison Mode" eyebrow="Reach, influence, communities, villages, support, risk, opportunity, relationship" />
      <div className="comparison-controls">
        <select value={compareA.influencer} onChange={(event) => setCompareA(event.target.value)}>
          {profiles.map((profile) => <option value={profile.influencer} key={profile.influencer}>{profile.influencer}</option>)}
        </select>
        <select value={compareB.influencer} onChange={(event) => setCompareB(event.target.value)}>
          {profiles.map((profile) => <option value={profile.influencer} key={profile.influencer}>{profile.influencer}</option>)}
        </select>
      </div>
      <div className="comparison-grid">
        {[compareA, compareB].map((profile) => (
          <article key={profile.influencer}>
            <h3>{profile.influencer}</h3>
            <Meter label="Reach" value={profile.reach} max={6500} />
            <Meter label="Influence" value={profile.influence} />
            <Meter label="Risk" value={profile.risk} danger />
            <Meter label="Opportunity" value={profile.opportunity} />
            <Meter label="Relationship" value={profile.relationshipStrength} />
            <small>Communities: {profile.communities}</small>
            <small>Villages: {profile.villages}</small>
            <small>Support: {profile.support}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function InfluencerActionCenter() {
  const actions = [
    ["Schedule Meeting", "/events/new?type=influencer_meeting"],
    ["Assign Relationship Manager", "/tasks/new?type=relationship_manager"],
    ["Create Task", "/tasks/new?type=influencer_task"],
    ["Create Follow-up", "/tasks/new?type=influencer_follow_up"],
    ["Create Community Outreach Plan", "/tasks/new?type=community_outreach"],
    ["Generate Influencer Report", "/reports/daily-brief/new?type=influencer"],
    ["Generate Visit Brief", "/candidate-intelligence/manage/new?type=visit_brief"],
    ["Generate Engagement Strategy", "/tasks/new?type=engagement_strategy"]
  ];
  return (
    <section className="panel" id="influencer-actions">
      <SectionHeader title="Action Center" eyebrow="Turn influence intelligence into relationship action" />
      <div className="voter-action-grid">
        {actions.map(([label, href]) => <a className="action-panel-btn" href={href} key={label}>{label}</a>)}
      </div>
    </section>
  );
}

function InfluencerRightPanel({ influencers, risks, relationships, tasks, queuedActions }: { influencers: typeof influencerIntelligenceData.command; risks: typeof influencerIntelligenceData.risks; relationships: typeof influencerIntelligenceData.relationships; tasks: typeof influencerIntelligenceData.tasks; queuedActions: string[] }) {
  const highestImpact = [...influencers].sort((a, b) => b.influenceScore - a.influenceScore).slice(0, 3);
  return (
    <aside className="voter-intel-panel">
      <SectionHeader title="Influencer Intel Panel" eyebrow="Always-on power network watch" />
      <PanelList title="Highest Impact Influencers" items={highestImpact.map((item) => `${item.name}: influence ${item.influenceScore}`)} />
      <PanelList title="At Risk Influencers" items={risks.map((item) => `${item.influencer}: ${item.risk}`)} />
      <PanelList title="Upcoming Meetings" items={relationships.map((item) => `${item.influencer}: ${item.nextAction}`)} />
      <PanelList title="Pending Follow-ups" items={tasks.map((item) => `${item.influencer}: ${item.openTasks} open / ${item.overdueTasks} overdue`)} />
      <PanelList title="Recent Changes" items={queuedActions.length ? queuedActions : ["No influencer actions queued from this session"]} />
      <PanelList title="Influencer Alerts" items={["Cooperative network requires neutral bridge", "Youth sports network ready for activation", "Farmer captains need irrigation proof"]} />
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
      <SectionHeader title={title} eyebrow="Ranked influence intelligence" actions={<CountPill>{rows.length} rows</CountPill>} />
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
      ) : <EmptyState title="No matching influencer intelligence" body="Adjust filters to restore this table." />}
    </section>
  );
}

function Meter({ label, value, danger, max = 100 }: { label: string; value: number; danger?: boolean; max?: number }) {
  const width = Math.min((value / max) * 100, 100);
  return (
    <div className="support-row">
      <span>{label}</span>
      <div><i className={danger ? "score-weak" : width > 65 ? "score-strong" : "score-watch"} style={{ width: `${width}%` }} /></div>
      <b>{value}</b>
    </div>
  );
}

function supportClass(value: string) {
  return `influencer-${value.toLowerCase().replace(/\s+/g, "-")}`;
}

function scoreLevel(value: number) {
  if (value >= 70) return "High";
  if (value >= 50) return "Medium";
  return "Low";
}

function priorityFromScore(value: number) {
  if (value >= 78) return "Critical";
  if (value >= 62) return "High";
  if (value >= 45) return "Medium";
  return "Low";
}

function labelize(value: string) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}
