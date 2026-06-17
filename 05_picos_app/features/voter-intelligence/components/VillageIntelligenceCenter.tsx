"use client";

import { useMemo, useState } from "react";
import { PlatformShell } from "@/features/platform/PlatformShell";
import { ConfidenceBadge } from "@/features/shared/intelligenceBadges";
import { CountPill, EmptyState, PriorityChip, SectionHeader, signed, trendClass } from "@/features/political-intelligence/components/common";
import { villageIntelligenceData } from "../village-data";
import type {
  VillageClass,
  VillageCommandRecord,
  VillageComparisonProfile,
  VillageFilters,
  VillageSupportProfile
} from "../types";

const defaultFilters: VillageFilters = {
  village: "All",
  supportLevel: "All",
  sentiment: "All",
  risk: "All",
  opportunity: "All",
  visitPriority: "All",
  coordinator: "All",
  issue: "All",
  dateRange: "30 Days"
};

const filterOptions = {
  village: ["All", "Sinnar Town", "Musalgaon", "Pangri", "Dubere", "Devpur", "Wavi", "Nandur Shingote", "Baragaon Pimpri"],
  supportLevel: ["All", "Strong", "Weak", "Swing", "Growth", "Risk"],
  sentiment: ["All", "High", "Medium", "Low"],
  risk: ["All", "Critical", "High", "Medium", "Low"],
  opportunity: ["All", "Critical", "High", "Medium", "Low"],
  visitPriority: ["All", "Critical", "High", "Medium", "Low"],
  coordinator: ["All", "Urban Desk", "Political Desk", "Farmer Cell", "Women Outreach", "Booth Ops", "Community Desk", "Issue Cell"],
  issue: ["All", "Employment", "Irrigation", "Water", "Agriculture", "Roads", "Healthcare", "Education", "Electricity"],
  dateRange: ["Today", "7 Days", "30 Days", "Quarter"]
};

export function VillageIntelligenceCenter() {
  const data = villageIntelligenceData;
  const [filters, setFilters] = useState(defaultFilters);
  const [query, setQuery] = useState("");
  const [selectedVillageId, setSelectedVillageId] = useState(data.command[0].id);
  const [mapLayer, setMapLayer] = useState<"Classification" | "Support" | "Risk" | "Opportunity" | "Visits">("Classification");
  const [compareA, setCompareA] = useState("Pangri");
  const [compareB, setCompareB] = useState("Musalgaon");
  const [queuedActions, setQueuedActions] = useState<string[]>([]);

  const filteredVillages = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return data.command.filter((village) => {
      if (filters.village !== "All" && village.village !== filters.village) return false;
      if (filters.supportLevel !== "All" && village.classification !== filters.supportLevel) return false;
      if (filters.sentiment !== "All" && scoreLevel(village.sentimentScore) !== filters.sentiment) return false;
      if (filters.risk !== "All" && priorityFromScore(village.riskScore) !== filters.risk) return false;
      if (filters.opportunity !== "All" && priorityFromScore(village.opportunityScore) !== filters.opportunity) return false;
      if (filters.visitPriority !== "All" && village.visitPriority !== filters.visitPriority) return false;
      if (filters.coordinator !== "All" && village.assignedCoordinator !== filters.coordinator) return false;
      if (!normalized) return true;
      return JSON.stringify(village).toLowerCase().includes(normalized);
    });
  }, [data.command, filters.coordinator, filters.opportunity, filters.risk, filters.sentiment, filters.supportLevel, filters.village, filters.visitPriority, query]);

  const selectedVillage = data.command.find((village) => village.id === selectedVillageId) ?? data.command[0];
  const comparisonA = data.comparisons.find((item) => item.village === compareA) ?? data.comparisons[0];
  const comparisonB = data.comparisons.find((item) => item.village === compareB) ?? data.comparisons[1];

  function updateFilter(key: keyof VillageFilters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <PlatformShell activeCoreModule="voter-intelligence" activeModuleSection="village-intelligence">
      <header className="candidate-header voter-header">
        <div>
          <span className="eyebrow">Voter Intelligence / Village Intelligence</span>
          <h1>Village Intelligence Center</h1>
          <p>Village-level political, voter, issue, sentiment, and opportunity intelligence.</p>
        </div>
        <label className="global-search">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search village, influencer, issue, coordinator, task, event, community" />
        </label>
      </header>

      <section className="voter-filter-rail" aria-label="Village intelligence filters">
        {Object.entries(filterOptions).map(([key, options]) => (
          <label key={key}>
            <span>{labelize(key)}</span>
            <select value={filters[key as keyof VillageFilters]} onChange={(event) => updateFilter(key as keyof VillageFilters, event.target.value)}>
              {options.map((option) => <option value={option} key={option}>{option}</option>)}
            </select>
          </label>
        ))}
      </section>

      <main className="voter-workspace village-workspace">
        <div className="voter-main">
          <VillagePriorityCommand data={data} />
          <VillageOverview metrics={data.overview} />
          <VillageCommandTable villages={filteredVillages} selectedVillageId={selectedVillage.id} onSelect={setSelectedVillageId} />
          <div className="workspace-grid two-column visual-grid">
            <VillageClassificationMap villages={filteredVillages} selectedVillage={selectedVillage} layer={mapLayer} onLayerChange={setMapLayer} onSelect={setSelectedVillageId} />
            <TopVillagesToTarget targets={data.targets} />
          </div>
          <TopVillagesAtRisk risks={data.risks} />
          <div className="workspace-grid two-column">
            <VillageSupportAnalysis support={data.support} />
            <CommunityBreakdownByVillage breakdown={data.communityBreakdown} />
          </div>
          <div className="workspace-grid two-column">
            <VillageIssueIntelligence issues={data.issues} filters={filters} />
            <VillageInfluencerNetwork influencers={data.influencers} filters={filters} />
          </div>
          <div className="workspace-grid two-column">
            <VillageVisitPlanner visits={data.visitPlanner} />
            <VillageEngagementTracker engagement={data.engagement} />
          </div>
          <div className="workspace-grid two-column">
            <VillageSentimentTracker sentiment={data.sentiment} />
            <VillageTaskCenter tasks={data.tasks} />
          </div>
          <div className="workspace-grid two-column">
            <VillageOpportunityAnalysis opportunities={data.opportunities} />
            <VillageRiskAnalysis risks={data.risks} />
          </div>
          <AiVillageStrategy recommendations={data.recommendations} queuedActions={queuedActions} onQueue={(item) => setQueuedActions((current) => [...current, item])} />
          <VillageComparisonMode profiles={data.comparisons} compareA={comparisonA} compareB={comparisonB} setCompareA={setCompareA} setCompareB={setCompareB} />
          <VillageActionCenter />
        </div>

        <VillageRightPanel
          villages={data.command}
          visits={data.visitPlanner}
          tasks={data.tasks}
          risks={data.risks}
          influencers={data.influencers}
          queuedActions={queuedActions}
        />
      </main>
    </PlatformShell>
  );
}

function VillagePriorityCommand({ data }: { data: typeof villageIntelligenceData }) {
  const topTarget = data.targets[0];
  const topRisk = data.risks[0];
  const urgentVisit = data.visitPlanner[0];
  return (
    <section className="command-priority-grid voter-priority-grid village-priority-grid">
      <article className="priority-hero political-risk">
        <span className="eyebrow">Focus Village Next</span>
        <h2>{topTarget.village}</h2>
        <strong>{topTarget.voteGainPotential}</strong>
        <p>{topTarget.reason} / {topTarget.recommendedAction}</p>
      </article>
      <article className="priority-hero community-sentiment">
        <span className="eyebrow">Visit Required</span>
        <strong>{urgentVisit.village}</strong>
        <p>{urgentVisit.recommendedVisitor} / {urgentVisit.purpose}</p>
      </article>
      <article className="priority-hero opponent-movement">
        <span className="eyebrow">Highest Risk</span>
        <h2>{topRisk.village}</h2>
        <PriorityChip value={topRisk.severity} />
        <p>{topRisk.riskType}</p>
      </article>
      <article className="priority-hero election-readiness">
        <span className="eyebrow">Ground Coverage Gap</span>
        <strong>46</strong>
        <p>Uncovered villages need coordinator and booth verification.</p>
      </article>
      <article className="priority-hero ai-recommendation">
        <span className="eyebrow">AI Village Strategy</span>
        <h2>{data.recommendations[0].recommendation}</h2>
        <p>{data.recommendations[0].reason}</p>
      </article>
    </section>
  );
}

function VillageOverview({ metrics }: { metrics: typeof villageIntelligenceData.overview }) {
  return (
    <section className="overview-bar" id="village-overview">
      {metrics.map((metric) => (
        <article className="metric-cell" key={metric.label}>
          <div className="metric-label">{metric.label}</div>
          <div className="metric-value-row">
            <strong>{metric.value}</strong>
            <span className={`trend-chip ${trendClass(metric.trend)}`}>{metric.trend}</span>
          </div>
          <div className="metric-meta">
            <span>{signed(metric.change)}%</span>
            <span>Movement</span>
          </div>
          <ConfidenceBadge score={metric.confidence} />
        </article>
      ))}
    </section>
  );
}

function VillageCommandTable({ villages, selectedVillageId, onSelect }: { villages: VillageCommandRecord[]; selectedVillageId: string; onSelect: (id: string) => void }) {
  return (
    <section className="panel table-panel" id="village-command-table">
      <SectionHeader title="Village Command Table" eyebrow="Support, sentiment, influence, risk, opportunity, visits" actions={<CountPill>{villages.length} villages</CountPill>} />
      {villages.length ? (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                {["Village Name", "Class", "Population", "Estimated Voters", "Support", "Sentiment", "Influence", "Risk", "Opportunity", "Visit Priority", "Coordinator", "Status"].map((column) => <th key={column}>{column}</th>)}
              </tr>
            </thead>
            <tbody>
              {villages.map((village) => (
                <tr className={selectedVillageId === village.id ? "is-selected-row" : ""} key={village.id} onClick={() => onSelect(village.id)}>
                  <td><button className="table-link-btn" type="button">{village.village}</button></td>
                  <td><span className={`village-class-chip village-${village.classification.toLowerCase()}`}>{village.classification}</span></td>
                  <td>{village.population.toLocaleString()}</td>
                  <td>{village.estimatedVoters.toLocaleString()}</td>
                  <td>{village.supportScore}</td>
                  <td>{village.sentimentScore}</td>
                  <td>{village.influenceScore}</td>
                  <td>{village.riskScore}</td>
                  <td>{village.opportunityScore}</td>
                  <td><PriorityChip value={village.visitPriority} /></td>
                  <td>{village.assignedCoordinator}</td>
                  <td>{village.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <EmptyState title="No village records match filters" body="Adjust village, classification, risk, opportunity, coordinator, or search filters." />}
    </section>
  );
}

function VillageClassificationMap({ villages, selectedVillage, layer, onLayerChange, onSelect }: { villages: VillageCommandRecord[]; selectedVillage: VillageCommandRecord; layer: "Classification" | "Support" | "Risk" | "Opportunity" | "Visits"; onLayerChange: (layer: "Classification" | "Support" | "Risk" | "Opportunity" | "Visits") => void; onSelect: (id: string) => void }) {
  return (
    <section className="panel geo-panel" id="village-classification-map">
      <SectionHeader title="Village Classification Map" eyebrow="Strong, weak, swing, growth, risk villages" />
      <div className="map-toolbar">
        <div className="segmented-control">
          {(["Classification", "Support", "Risk", "Opportunity", "Visits"] as const).map((item) => <button className={`seg-btn ${layer === item ? "is-active" : ""}`} onClick={() => onLayerChange(item)} type="button" key={item}>{item}</button>)}
        </div>
      </div>
      <div className="map-stage">
        <svg className="constituency-map" viewBox="0 0 100 100">
          <path d="M16,18 L48,9 L76,16 L91,39 L83,72 L61,91 L31,86 L10,62 L7,35 Z" />
          <path d="M29,22 L52,18 L73,28 L77,50 L65,68 L43,75 L25,61 L19,40 Z" />
          <path d="M50,12 L51,89" />
          <path d="M13,58 L88,40" />
        </svg>
        {villages.map((village) => (
          <button
            className={`map-marker village-map-marker support-${village.classification.toLowerCase()} ${selectedVillage.id === village.id ? "is-selected" : ""}`}
            key={village.id}
            onClick={() => onSelect(village.id)}
            style={{ left: `${village.x}%`, top: `${village.y}%`, width: 14 + mapValue(village, layer) / 8, height: 14 + mapValue(village, layer) / 8 }}
            type="button"
          >
            <span>{village.village}</span>
          </button>
        ))}
      </div>
      <div className="village-classification-legend">
        {(["Strong", "Weak", "Swing", "Growth", "Risk"] as VillageClass[]).map((item) => <span className={`village-class-chip village-${item.toLowerCase()}`} key={item}>{item}</span>)}
      </div>
      <div className="map-detail">
        <span>{selectedVillage.classification} village</span>
        <h3>{selectedVillage.village}</h3>
        <dl>
          <div><dt>Support</dt><dd>{selectedVillage.supportScore}</dd></div>
          <div><dt>Risk</dt><dd>{selectedVillage.riskScore}</dd></div>
          <div><dt>Opportunity</dt><dd>{selectedVillage.opportunityScore}</dd></div>
          <div><dt>Visit</dt><dd>{selectedVillage.visitPriority}</dd></div>
        </dl>
      </div>
    </section>
  );
}

function TopVillagesToTarget({ targets }: { targets: typeof villageIntelligenceData.targets }) {
  return <SimpleTable id="top-villages-target" title="Top Villages To Target" columns={["Village", "Current Support", "Potential Support", "Vote Gain Potential", "Priority", "Reason", "Recommended Action", "Expected Impact"]} rows={targets.map((item) => [item.village, `${item.currentSupport}%`, `${item.potentialSupport}%`, item.voteGainPotential, item.priority, item.reason, item.recommendedAction, item.expectedImpact])} priorityColumn={4} />;
}

function TopVillagesAtRisk({ risks }: { risks: typeof villageIntelligenceData.risks }) {
  return <SimpleTable id="top-villages-risk" title="Top Villages At Risk" columns={["Village", "Risk Type", "Potential Vote Loss", "Severity", "Reason", "Owner", "Mitigation Plan", "Status"]} rows={risks.map((item) => [item.village, item.riskType, item.potentialVoteLoss, item.severity, item.reason, item.owner, item.mitigationPlan, item.status])} priorityColumn={3} />;
}

function VillageSupportAnalysis({ support }: { support: VillageSupportProfile[] }) {
  return (
    <section className="panel" id="village-support-analysis">
      <SectionHeader title="Village Support Analysis" eyebrow="Supporters, opponents, neutral, persuadable, unknown" />
      <div className="village-support-grid">
        {support.map((item) => (
          <article className="village-support-card" key={item.village}>
            <h3>{item.village}</h3>
            <Meter label="Supporters" value={item.supporters} />
            <Meter label="Opponents" value={item.opponents} danger />
            <Meter label="Neutral" value={item.neutral} />
            <Meter label="Persuadable" value={item.persuadable} />
            <Meter label="Unknown" value={item.unknown} danger />
          </article>
        ))}
      </div>
    </section>
  );
}

function CommunityBreakdownByVillage({ breakdown }: { breakdown: typeof villageIntelligenceData.communityBreakdown }) {
  return (
    <section className="panel" id="village-community-breakdown">
      <SectionHeader title="Community Breakdown By Village" eyebrow="Community mix and support level" />
      <div className="community-breakdown-grid">
        {breakdown.map((item) => (
          <article className="community-mix-card" key={item.village}>
            <div>
              <h3>{item.village}</h3>
              <span>{item.supportLevel}</span>
            </div>
            <div className="community-mix-bars">
              {[
                ["Maratha", item.maratha],
                ["Mali", item.mali],
                ["Vanjari", item.vanjari],
                ["Dhangar", item.dhangar],
                ["SC", item.sc],
                ["ST", item.st],
                ["Minority", item.minority],
                ["Youth", item.youth],
                ["Women", item.women],
                ["Farmers", item.farmers]
              ].map(([label, value]) => <Meter label={String(label)} value={Number(value)} key={label} />)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function VillageIssueIntelligence({ issues, filters }: { issues: typeof villageIntelligenceData.issues; filters: VillageFilters }) {
  const rows = issues.filter((issue) => (filters.village === "All" || issue.village === filters.village) && (filters.issue === "All" || issue.topIssues.includes(filters.issue)));
  return <SimpleTable id="village-issues" title="Village Issue Intelligence" columns={["Village", "Top Issues", "Severity", "Affected Population", "Political Impact", "Opportunity Score"]} rows={rows.map((item) => [item.village, item.topIssues.join(", "), item.severity, item.affectedPopulation, item.politicalImpact, item.opportunityScore])} priorityColumn={2} />;
}

function VillageInfluencerNetwork({ influencers, filters }: { influencers: typeof villageIntelligenceData.influencers; filters: VillageFilters }) {
  const rows = influencers.filter((item) => filters.village === "All" || item.village === filters.village);
  return <SimpleTable id="village-influencers" title="Village Influencer Network" columns={["Influencer", "Village", "Type", "Influence Score", "Alignment", "Relationship Strength", "Reach"]} rows={rows.map((item) => [item.name, item.village, item.type, item.influenceScore, item.alignment, item.relationshipStrength, item.reach])} />;
}

function VillageVisitPlanner({ visits }: { visits: typeof villageIntelligenceData.visitPlanner }) {
  return <SimpleTable id="village-visit-planner" title="Village Visit Planner" columns={["Village", "Last Visit", "Visit Frequency", "Pending Visit", "Visit Priority", "Recommended Visitor", "Purpose", "Expected Outcome", "Status"]} rows={visits.map((item) => [item.village, item.lastVisit, item.visitFrequency, item.pendingVisit, item.visitPriority, item.recommendedVisitor, item.purpose, item.expectedOutcome, item.status])} priorityColumn={4} />;
}

function VillageEngagementTracker({ engagement }: { engagement: typeof villageIntelligenceData.engagement }) {
  return <SimpleTable id="village-engagement" title="Village Engagement Tracker" columns={["Village", "Meetings", "Events", "Listening Sessions", "Volunteer Activities", "Issue Resolution", "Campaign Activities"]} rows={engagement.map((item) => [item.village, item.meetings, item.events, item.listeningSessions, item.volunteerActivities, item.issueResolutionActivities, item.campaignActivities])} />;
}

function VillageSentimentTracker({ sentiment }: { sentiment: typeof villageIntelligenceData.sentiment }) {
  return (
    <section className="panel" id="village-sentiment">
      <SectionHeader title="Village Sentiment Tracker" eyebrow="Current, previous, trend, confidence, monthly change" />
      <div className="village-sentiment-list">
        {sentiment.map((item) => (
          <article key={item.village}>
            <div>
              <strong>{item.village}</strong>
              <span className={`trend-chip ${trendClass(item.trend)}`}>{item.trend}</span>
            </div>
            <Meter label="Current" value={item.currentSentiment} />
            <Meter label="Previous" value={item.previousSentiment} />
            <div className="metric-meta"><span>Monthly {signed(item.monthlyChange)}%</span><ConfidenceBadge score={item.confidence} /></div>
          </article>
        ))}
      </div>
    </section>
  );
}

function VillageTaskCenter({ tasks }: { tasks: typeof villageIntelligenceData.tasks }) {
  return <SimpleTable id="village-task-center" title="Village Task Center" columns={["Village", "Open", "Pending", "Overdue", "Completed", "Highest Priority Task"]} rows={tasks.map((item) => [item.village, item.openTasks, item.pendingTasks, item.overdueTasks, item.completedTasks, item.highestPriorityTask])} />;
}

function VillageOpportunityAnalysis({ opportunities }: { opportunities: typeof villageIntelligenceData.opportunities }) {
  return <SimpleTable id="village-opportunities" title="Village Opportunity Analysis" columns={["Opportunity", "Village", "Expected Votes", "Priority", "Owner", "Status", "Target Date"]} rows={opportunities.map((item) => [item.opportunity, item.village, item.expectedVotes, item.priority, item.owner, item.status, item.targetDate])} priorityColumn={3} />;
}

function VillageRiskAnalysis({ risks }: { risks: typeof villageIntelligenceData.risks }) {
  return <SimpleTable id="village-risks" title="Village Risk Analysis" columns={["Risk", "Village", "Potential Vote Loss", "Severity", "Owner", "Mitigation", "Status"]} rows={risks.map((item) => [item.riskType, item.village, item.potentialVoteLoss, item.severity, item.owner, item.mitigationPlan, item.status])} priorityColumn={3} />;
}

function AiVillageStrategy({ recommendations, queuedActions, onQueue }: { recommendations: typeof villageIntelligenceData.recommendations; queuedActions: string[]; onQueue: (recommendation: string) => void }) {
  return (
    <section className="panel recommendations-panel" id="ai-village-strategy">
      <SectionHeader title="AI Village Strategy" eyebrow="Which villages should Uday Sangle focus on next and why?" />
      <div className="recommendation-list">
        {recommendations.map((item) => (
          <article className="recommendation-card level-high" key={item.recommendation}>
            <div className="recommendation-top">
              <div className="badge-row">
                <PriorityChip value={item.priority} />
                <ConfidenceBadge score={item.confidence} />
              </div>
              <a className="action-btn" href={`/tasks/new?title=${encodeURIComponent(item.actionLabel)}`} onClick={() => onQueue(item.recommendation)}>{queuedActions.includes(item.recommendation) ? "Queued" : item.actionLabel}</a>
            </div>
            <h3>{item.recommendation}</h3>
            <p><b>Reason:</b> {item.reason}</p>
            <p><b>Expected vote impact:</b> {item.expectedVoteImpact.toLocaleString()} votes</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function VillageComparisonMode({ profiles, compareA, compareB, setCompareA, setCompareB }: { profiles: VillageComparisonProfile[]; compareA: VillageComparisonProfile; compareB: VillageComparisonProfile; setCompareA: (village: string) => void; setCompareB: (village: string) => void }) {
  return (
    <section className="panel" id="village-comparison">
      <SectionHeader title="Village Comparison Mode" eyebrow="Support, sentiment, issues, influencers, risks, opportunities, turnout, community mix" />
      <div className="comparison-controls">
        <select value={compareA.village} onChange={(event) => setCompareA(event.target.value)}>
          {profiles.map((profile) => <option value={profile.village} key={profile.village}>{profile.village}</option>)}
        </select>
        <select value={compareB.village} onChange={(event) => setCompareB(event.target.value)}>
          {profiles.map((profile) => <option value={profile.village} key={profile.village}>{profile.village}</option>)}
        </select>
      </div>
      <div className="comparison-grid">
        {[compareA, compareB].map((profile) => (
          <article key={profile.village}>
            <h3>{profile.village}</h3>
            <Meter label="Support" value={profile.support} />
            <Meter label="Sentiment" value={profile.sentiment} />
            <Meter label="Turnout" value={profile.turnout} />
            <small>Issues: {profile.issues}</small>
            <small>Influencers: {profile.influencers}</small>
            <small>Risks: {profile.risks}</small>
            <small>Opportunities: {profile.opportunities}</small>
            <small>Community mix: {profile.communityMix}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function VillageActionCenter() {
  const actions = [
    ["Schedule Visit", "/events/new?type=village_visit"],
    ["Create Task", "/tasks/new?type=village_task"],
    ["Assign Coordinator", "/tasks/new?type=assign_coordinator"],
    ["Assign Volunteer Team", "/tasks/new?type=volunteer_team"],
    ["Create Community Meeting", "/events/new?type=community_meeting"],
    ["Create Listening Session", "/events/new?type=listening_session"],
    ["Generate Village Report", "/reports/daily-brief/new?type=village"],
    ["Generate Outreach Plan", "/tasks/new?type=outreach_plan"],
    ["Generate Speech Brief", "/candidate-intelligence/manage/new?type=speech_brief"]
  ];
  return (
    <section className="panel" id="village-actions">
      <SectionHeader title="Action Center" eyebrow="Turn village intelligence into ground operations" />
      <div className="voter-action-grid">
        {actions.map(([label, href]) => <a className="action-panel-btn" href={href} key={label}>{label}</a>)}
      </div>
    </section>
  );
}

function VillageRightPanel({ villages, visits, tasks, risks, influencers, queuedActions }: { villages: typeof villageIntelligenceData.command; visits: typeof villageIntelligenceData.visitPlanner; tasks: typeof villageIntelligenceData.tasks; risks: typeof villageIntelligenceData.risks; influencers: typeof villageIntelligenceData.influencers; queuedActions: string[] }) {
  const priorityVillages = [...villages].sort((a, b) => b.opportunityScore - a.opportunityScore).slice(0, 3);
  const riskVillages = [...villages].sort((a, b) => b.riskScore - a.riskScore).slice(0, 3);
  return (
    <aside className="voter-intel-panel">
      <SectionHeader title="Village Intel Panel" eyebrow="Always-on ground operations watch" />
      <PanelList title="Highest Priority Villages" items={priorityVillages.map((item) => `${item.village}: opportunity ${item.opportunityScore}`)} />
      <PanelList title="Highest Risk Villages" items={riskVillages.map((item) => `${item.village}: risk ${item.riskScore}`)} />
      <PanelList title="Upcoming Visits" items={visits.map((item) => `${item.pendingVisit} / ${item.village}`)} />
      <PanelList title="Pending Village Tasks" items={tasks.map((item) => `${item.village}: ${item.openTasks} open / ${item.overdueTasks} overdue`)} />
      <PanelList title="Village Alerts" items={risks.map((item) => `${item.village}: ${item.riskType}`)} />
      <PanelList title="Influencer Alerts" items={influencers.slice(0, 4).map((item) => `${item.village}: ${item.name} / ${item.alignment}`)} />
      <PanelList title="Queued Actions" items={queuedActions.length ? queuedActions : ["No village actions queued from this session"]} />
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
      <SectionHeader title={title} eyebrow="Ranked village intelligence" actions={<CountPill>{rows.length} rows</CountPill>} />
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
      ) : <EmptyState title="No matching village intelligence" body="Adjust filters to restore this table." />}
    </section>
  );
}

function Meter({ label, value, danger }: { label: string; value: number; danger?: boolean }) {
  return (
    <div className="support-row">
      <span>{label}</span>
      <div><i className={danger ? "score-weak" : value > 65 ? "score-strong" : "score-watch"} style={{ width: `${Math.min(value, 100)}%` }} /></div>
      <b>{value}</b>
    </div>
  );
}

function mapValue(village: VillageCommandRecord, layer: string) {
  if (layer === "Support") return village.supportScore;
  if (layer === "Risk") return village.riskScore;
  if (layer === "Opportunity") return village.opportunityScore;
  if (layer === "Visits") return village.visitPriority === "Critical" ? 82 : village.visitPriority === "High" ? 68 : village.visitPriority === "Medium" ? 52 : 38;
  return village.classification === "Risk" ? 78 : village.classification === "Growth" ? 70 : village.classification === "Swing" ? 62 : village.classification === "Strong" ? 66 : 50;
}

function scoreLevel(value: number) {
  if (value >= 62) return "High";
  if (value >= 48) return "Medium";
  return "Low";
}

function priorityFromScore(value: number) {
  if (value >= 76) return "Critical";
  if (value >= 62) return "High";
  if (value >= 45) return "Medium";
  return "Low";
}

function labelize(value: string) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}
