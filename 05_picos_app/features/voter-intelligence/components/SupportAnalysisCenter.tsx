"use client";

import { useMemo, useState } from "react";
import { PlatformShell } from "@/features/platform/PlatformShell";
import { ConfidenceBadge } from "@/features/shared/intelligenceBadges";
import { CountPill, EmptyState, PriorityChip, SectionHeader, signed, trendClass } from "@/features/political-intelligence/components/common";
import { supportAnalysisData } from "../support-analysis-data";
import type { Priority, SupportFilters, SupportHeatMapPoint, SupportHeatMode } from "../types";

const defaultFilters: SupportFilters = {
  community: "All",
  village: "All",
  segment: "All",
  supportLevel: "All",
  turnout: "All",
  priority: "All",
  risk: "All",
  opportunity: "All",
  dateRange: "30 Days"
};

const filterOptions: Record<keyof SupportFilters, string[]> = {
  community: ["All", "Youth", "Farmers", "Women", "Maratha", "Mali", "SC", "Business", "Cooperative Members"],
  village: ["All", "Sinnar Town", "Pangri", "Musalgaon", "Dubere", "Devpur", "Wavi"],
  segment: ["All", "Youth", "Farmers", "Women", "First-Time Voters", "Cooperative Members", "Industrial Workers"],
  supportLevel: ["All", "High", "Medium", "Low"],
  turnout: ["All", "High", "Medium", "Low"],
  priority: ["All", "Critical", "High", "Medium", "Low"],
  risk: ["All", "High", "Medium", "Low"],
  opportunity: ["All", "High", "Medium", "Low"],
  dateRange: ["Today", "7 Days", "30 Days", "Quarter"]
};

export function SupportAnalysisCenter() {
  const data = supportAnalysisData;
  const [filters, setFilters] = useState(defaultFilters);
  const [query, setQuery] = useState("");
  const [heatMode, setHeatMode] = useState<SupportHeatMode>("Support Strength");
  const [selectedPointId, setSelectedPointId] = useState(data.heatMap[0].id);
  const [queuedActions, setQueuedActions] = useState<string[]>([]);

  const filteredVillages = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return data.villages.filter((village) => {
      const searchable = JSON.stringify(village).toLowerCase();
      if (filters.village !== "All" && village.village !== filters.village) return false;
      if (filters.priority !== "All" && village.priority !== filters.priority) return false;
      if (filters.supportLevel !== "All" && scoreLevel(village.currentSupport) !== filters.supportLevel) return false;
      if (filters.risk !== "All" && scoreLevel(village.risk) !== filters.risk) return false;
      if (filters.opportunity !== "All" && scoreLevel(village.expectedGain / 40) !== filters.opportunity) return false;
      return !normalized || searchable.includes(normalized);
    });
  }, [data.villages, filters, query]);

  const filteredHeatMap = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return data.heatMap.filter((point) => {
      const searchable = JSON.stringify(point).toLowerCase();
      if (filters.village !== "All" && point.village !== filters.village) return false;
      if (filters.community !== "All" && point.community !== filters.community) return false;
      if (filters.priority !== "All" && point.priority !== filters.priority) return false;
      if (filters.supportLevel !== "All" && scoreLevel(point.supportStrength) !== filters.supportLevel) return false;
      if (filters.turnout !== "All" && scoreLevel(point.turnoutOpportunity) !== filters.turnout) return false;
      return !normalized || searchable.includes(normalized);
    });
  }, [data.heatMap, filters, query]);

  const selectedPoint = filteredHeatMap.find((point) => point.id === selectedPointId) ?? filteredHeatMap[0] ?? data.heatMap[0];

  function updateFilter(key: keyof SupportFilters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <PlatformShell activeCoreModule="voter-intelligence" activeModuleSection="support-analysis">
      <header className="candidate-header voter-header">
        <div>
          <span className="eyebrow">Voter Intelligence / Support Analysis</span>
          <h1>Support Analysis Center</h1>
          <p>Constituency-wide support, opposition, persuasion, turnout, and vote strength intelligence.</p>
        </div>
        <label className="global-search">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search village, community, segment, influencer, household, issue, task" />
        </label>
      </header>

      <section className="voter-filter-rail" aria-label="Support analysis filters">
        {Object.entries(filterOptions).map(([key, options]) => {
          const filterKey = key as keyof SupportFilters;
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

      <main className="voter-workspace support-workspace">
        <div className="voter-main">
          <SupportPriorityCommand />
          <SupportOverview />
          <ConstituencySupportScore />
          <SupportDistribution />
          <div className="workspace-grid two-column">
            <CommunitySupportAnalysis />
            <VillageSupportAnalysis villages={filteredVillages} />
          </div>
          <div className="workspace-grid two-column">
            <HouseholdSupportAnalysis />
            <InfluencerSupportAnalysis />
          </div>
          <SegmentSupportAnalysis />
          <SupportHeatMap points={filteredHeatMap} selectedPoint={selectedPoint} heatMode={heatMode} onModeChange={setHeatMode} onSelect={setSelectedPointId} />
          <SupportMovementTracker />
          <div className="workspace-grid two-column">
            <TopSupportGains />
            <TopSupportLosses />
          </div>
          <div className="workspace-grid two-column">
            <TurnoutImpactAnalysis />
            <PersuasionImpactAnalysis />
          </div>
          <WinProbabilityModel />
          <ScenarioSimulator queuedActions={queuedActions} onQueue={(action) => setQueuedActions((current) => [...current, action])} />
          <AiSupportStrategy queuedActions={queuedActions} onQueue={(action) => setQueuedActions((current) => [...current, action])} />
          <TaskCenter />
          <ActionCenter />
        </div>

        <SupportRightPanel queuedActions={queuedActions} />
      </main>
    </PlatformShell>
  );
}

function SupportPriorityCommand() {
  const score = supportAnalysisData.score;
  const topGain = supportAnalysisData.gains[0];
  const topLoss = supportAnalysisData.losses[0];
  return (
    <section className="command-priority-grid voter-priority-grid support-priority-grid">
      <article className="priority-hero political-risk">
        <span className="eyebrow">Current Support</span>
        <h2>Constituency support score</h2>
        <strong>{score.currentSupport}%</strong>
        <p>Likely {score.likelySupport}% / potential {score.potentialSupport}% / confidence {score.confidenceScore}%.</p>
      </article>
      <article className="priority-hero community-sentiment">
        <span className="eyebrow">Top Support Gain</span>
        <strong>{topGain.expectedVotes.toLocaleString()}</strong>
        <p>{topGain.community} / {topGain.village}</p>
      </article>
      <article className="priority-hero opponent-movement">
        <span className="eyebrow">Top Support Loss</span>
        <h2>{topLoss.village}</h2>
        <PriorityChip value={topLoss.severity} />
        <p>{topLoss.reason}</p>
      </article>
      <article className="priority-hero election-readiness">
        <span className="eyebrow">Win Probability</span>
        <strong>{score.winProbability}%</strong>
        <p>Expected vote share {score.expectedVoteShare}% at {score.expectedTurnout}% turnout.</p>
      </article>
      <article className="priority-hero ai-recommendation">
        <span className="eyebrow">AI Support Strategy</span>
        <h2>{supportAnalysisData.recommendations[0].recommendation}</h2>
        <p>{supportAnalysisData.recommendations[0].reason}</p>
      </article>
    </section>
  );
}

function SupportOverview() {
  return (
    <section className="overview-bar" id="support-overview">
      {supportAnalysisData.overview.map((metric) => (
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

function ConstituencySupportScore() {
  const score = supportAnalysisData.score;
  return (
    <section className="panel" id="constituency-support-score">
      <SectionHeader title="Constituency Support Score" eyebrow="Current, likely, potential support and win probability" />
      <div className="support-score-grid">
        <MetricBlock label="Current Support" value={`${score.currentSupport}%`} />
        <MetricBlock label="Likely Support" value={`${score.likelySupport}%`} />
        <MetricBlock label="Potential Support" value={`${score.potentialSupport}%`} />
        <MetricBlock label="Expected Vote Share" value={`${score.expectedVoteShare}%`} />
        <MetricBlock label="Expected Turnout" value={`${score.expectedTurnout}%`} />
        <MetricBlock label="Win Probability" value={`${score.winProbability}%`} />
        <MetricBlock label="Confidence Score" value={`${score.confidenceScore}%`} />
        <MetricBlock label="Trend" value={score.trend} />
        <MetricBlock label="Monthly" value={`${signed(score.monthly)}%`} />
        <MetricBlock label="Quarterly" value={`${signed(score.quarterly)}%`} />
        <MetricBlock label="Yearly" value={`${signed(score.yearly)}%`} />
      </div>
    </section>
  );
}

function SupportDistribution() {
  let offset = 0;
  const total = supportAnalysisData.distribution.reduce((sum, item) => sum + item.share, 0);
  const segments = supportAnalysisData.distribution.map((item) => {
    const normalized = total ? (item.share / total) * 100 : 0;
    const segment = `${normalized} ${100 - normalized}`;
    const dashOffset = -offset;
    offset += normalized;
    return { ...item, segment, dashOffset };
  });

  return (
    <section className="panel" id="support-distribution-model">
      <SectionHeader title="Support Distribution" eyebrow="Support, opposition, neutral, persuadable, unknown with movement" />
      <div className="support-donut-layout">
        <svg className="support-donut" viewBox="0 0 42 42">
          {segments.map((segment, index) => (
            <circle cx="21" cy="21" fill="transparent" key={segment.status} r="15.9" stroke={`var(--donut-${index + 1})`} strokeDasharray={segment.segment} strokeDashoffset={segment.dashOffset} strokeWidth="5" />
          ))}
        </svg>
        <div className="support-breakdown">
          {supportAnalysisData.distribution.map((item, index) => (
            <article key={item.status}>
              <span style={{ background: `var(--donut-${index + 1})` }} />
              <strong>{item.status}</strong>
              <b>{item.share}%</b>
              <small>{item.voters.toLocaleString()} voters / {signed(item.movement)}% movement</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CommunitySupportAnalysis() {
  return <SimpleTable id="community-support-analysis" title="Community Support Analysis" columns={["Community", "Current", "Likely", "Potential", "Trend", "Confidence", "Priority"]} rows={supportAnalysisData.communities.map((item) => [item.community, `${item.currentSupport}%`, `${item.likelySupport}%`, `${item.potentialSupport}%`, item.trend, `${item.confidence}%`, item.priority])} priorityColumn={6} />;
}

function VillageSupportAnalysis({ villages }: { villages: typeof supportAnalysisData.villages }) {
  return <SimpleTable id="village-support-analysis" title="Village Support Analysis" columns={["Village", "Current", "Potential", "Expected Gain", "Risk", "Priority", "Trend"]} rows={villages.map((item) => [item.village, `${item.currentSupport}%`, `${item.potentialSupport}%`, item.expectedGain.toLocaleString(), `${item.risk}%`, item.priority, item.trend])} priorityColumn={5} />;
}

function HouseholdSupportAnalysis() {
  const item = supportAnalysisData.households;
  const rows: Array<[string, string | number]> = [
    ["Supportive Households", item.supportiveHouseholds],
    ["Neutral Households", item.neutralHouseholds],
    ["Persuadable Households", item.persuadableHouseholds],
    ["Opposing Households", item.opposingHouseholds],
    ["High Influence Households", item.highInfluenceHouseholds],
    ["At Risk Households", item.atRiskHouseholds]
  ];
  return <MetricGrid title="Household Support Analysis" eyebrow="Household support categories" rows={rows} />;
}

function InfluencerSupportAnalysis() {
  const item = supportAnalysisData.influencers;
  const rows: Array<[string, string | number]> = [
    ["Supportive Influencers", item.supportiveInfluencers],
    ["Neutral Influencers", item.neutralInfluencers],
    ["Opposing Influencers", item.opposingInfluencers],
    ["Persuadable Influencers", item.persuadableInfluencers],
    ["Total Reach", item.totalReach],
    ["Expected Vote Impact", item.expectedVoteImpact]
  ];
  return <MetricGrid title="Influencer Support Analysis" eyebrow="Influence-side support categories" rows={rows} />;
}

function SegmentSupportAnalysis() {
  return <SimpleTable id="segment-support-analysis-center" title="Segment Support Analysis" columns={["Segment", "Support", "Persuasion Potential", "Turnout", "Expected Votes", "Priority"]} rows={supportAnalysisData.segments.map((item) => [item.segment, `${item.support}%`, item.persuasionPotential, `${item.turnout}%`, item.expectedVotes.toLocaleString(), item.priority])} priorityColumn={5} />;
}

function SupportHeatMap({ points, selectedPoint, heatMode, onModeChange, onSelect }: { points: SupportHeatMapPoint[]; selectedPoint: SupportHeatMapPoint; heatMode: SupportHeatMode; onModeChange: (mode: SupportHeatMode) => void; onSelect: (id: string) => void }) {
  const modes: SupportHeatMode[] = ["Support Strength", "Opposition Strength", "Persuasion Opportunity", "Turnout Opportunity", "Village Support", "Booth Support"];
  return (
    <section className="panel geo-panel support-heat-panel" id="support-heat-map">
      <SectionHeader title="Support Heat Map" eyebrow="Support strength, opposition, persuasion, turnout, village and booth support" actions={<CountPill>{points.length} points</CountPill>} />
      <div className="map-toolbar">
        <div className="segmented-control">
          {modes.map((mode) => <button className={`seg-btn ${mode === heatMode ? "is-active" : ""}`} onClick={() => onModeChange(mode)} type="button" key={mode}>{mode}</button>)}
        </div>
      </div>
      <div className="map-stage support-map-stage">
        <svg className="constituency-map" viewBox="0 0 100 100">
          <path d="M16,18 L48,9 L76,16 L91,39 L83,72 L61,91 L31,86 L10,62 L7,35 Z" />
          <path d="M29,22 L52,18 L73,28 L77,50 L65,68 L43,75 L25,61 L19,40 Z" />
          <path d="M50,12 L51,89" />
          <path d="M13,58 L88,40" />
        </svg>
        {points.map((point) => (
          <button className={`map-marker support-map-marker ${point.priority === "Critical" ? "is-critical" : ""} ${selectedPoint.id === point.id ? "is-selected" : ""}`} key={point.id} onClick={() => onSelect(point.id)} style={{ left: `${point.x}%`, top: `${point.y}%`, width: 15 + valueForMode(point, heatMode) / 7, height: 15 + valueForMode(point, heatMode) / 7 }} type="button">
            <span>{point.village}</span>
          </button>
        ))}
        {!points.length ? <div className="map-empty-state">No support points match filters</div> : null}
      </div>
      <div className="map-detail">
        <span>{selectedPoint.priority}</span>
        <h3>{selectedPoint.village} / {selectedPoint.booth}</h3>
        <dl>
          <div><dt>Support</dt><dd>{selectedPoint.supportStrength}%</dd></div>
          <div><dt>Opposition</dt><dd>{selectedPoint.oppositionStrength}%</dd></div>
          <div><dt>Persuasion</dt><dd>{selectedPoint.persuasionOpportunity}%</dd></div>
          <div><dt>Turnout</dt><dd>{selectedPoint.turnoutOpportunity}%</dd></div>
        </dl>
      </div>
    </section>
  );
}

function SupportMovementTracker() {
  return <SimpleTable id="support-movement-tracker" title="Support Movement Tracker" columns={["What Changed", "Gained", "Lost", "Communities Moving", "Villages Moving", "Influencers Moving", "Week", "Priority"]} rows={supportAnalysisData.movement.map((item) => [item.change, item.supportGained.toLocaleString(), item.supportLost.toLocaleString(), item.communitiesMoving, item.villagesMoving, item.influencersMoving, item.week, item.priority])} priorityColumn={7} />;
}

function TopSupportGains() {
  return <SimpleTable id="top-support-gains" title="Top Support Gains" columns={["Community", "Village", "Segment", "Influencer", "Expected Votes", "Reason", "Priority", "Status"]} rows={supportAnalysisData.gains.map((item) => [item.community, item.village, item.segment, item.influencer, item.expectedVotes.toLocaleString(), item.reason, item.priority, item.status])} priorityColumn={6} />;
}

function TopSupportLosses() {
  return <SimpleTable id="top-support-losses" title="Top Support Losses" columns={["Community", "Village", "Segment", "Influencer", "Potential Loss", "Reason", "Severity", "Status"]} rows={supportAnalysisData.losses.map((item) => [item.community, item.village, item.segment, item.influencer, item.potentialVoteLoss.toLocaleString(), item.reason, item.severity, item.status])} priorityColumn={6} />;
}

function TurnoutImpactAnalysis() {
  const item = supportAnalysisData.turnoutImpact;
  const rows: Array<[string, string | number]> = [
    ["Supporters likely to vote", item.supportersLikelyToVote],
    ["Supporters unlikely to vote", item.supportersUnlikelyToVote],
    ["Potential turnout gain", item.potentialTurnoutGain],
    ["Expected vote impact", item.expectedVoteImpact],
    ["Mobilization opportunity", item.mobilizationOpportunity]
  ];
  return <MetricGrid title="Turnout Impact Analysis" eyebrow="Support conversion through mobilization" rows={rows} />;
}

function PersuasionImpactAnalysis() {
  const item = supportAnalysisData.persuasionImpact;
  const rows: Array<[string, string | number]> = [
    ["Current Support", `${item.currentSupport}%`],
    ["Potential Support", `${item.potentialSupport}%`],
    ["Expected Conversion", item.expectedConversion],
    ["Expected Votes", item.expectedVotes],
    ["Success Probability", `${item.successProbability}%`]
  ];
  return <MetricGrid title="Persuasion Impact Analysis" eyebrow="Support conversion through persuasion" rows={rows} />;
}

function WinProbabilityModel() {
  return (
    <section className="panel" id="win-probability-model">
      <SectionHeader title="Win Probability Model" eyebrow="Current, best, likely, worst case support outcomes" />
      <div className="forecast-grid support-forecast-grid">
        {supportAnalysisData.winProbability.map((item) => (
          <article className="forecast-card" key={item.scenario}>
            <div>
              <span>{item.scenario}</span>
              <h3>{item.expectedMargin > 0 ? `+${item.expectedMargin.toLocaleString()}` : item.expectedMargin.toLocaleString()} margin</h3>
            </div>
            <strong>{item.winProbability}%</strong>
            <p>Vote share {item.expectedVoteShare}% / confidence {item.confidence}%</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ScenarioSimulator({ queuedActions, onQueue }: { queuedActions: string[]; onQueue: (action: string) => void }) {
  return (
    <section className="panel" id="support-scenario-simulator">
      <SectionHeader title="Scenario Simulator" eyebrow="Expected votes, margin impact, and win probability" />
      <div className="scenario-grid support-scenario-grid">
        {supportAnalysisData.scenarios.map((scenario) => (
          <article className="scenario-card" key={scenario.scenario}>
            <span>{scenario.scenario}</span>
            <strong>{scenario.expectedVotes.toLocaleString()}</strong>
            <p>Margin impact {scenario.marginImpact.toLocaleString()} / win probability {scenario.winProbability}%</p>
            <PriorityChip value={scenario.priority} />
            <a className="action-btn" href={`/tasks/new?title=${encodeURIComponent(scenario.scenario)}`} onClick={() => onQueue(scenario.scenario)}>{queuedActions.includes(scenario.scenario) ? "Queued" : "Create Scenario Task"}</a>
          </article>
        ))}
      </div>
    </section>
  );
}

function AiSupportStrategy({ queuedActions, onQueue }: { queuedActions: string[]; onQueue: (action: string) => void }) {
  return (
    <section className="panel recommendations-panel" id="ai-support-strategy">
      <SectionHeader title="AI Support Strategy" eyebrow="Where to strengthen, what is being lost, and what gains are available" />
      <div className="recommendation-list">
        {supportAnalysisData.recommendations.map((item) => (
          <article className={`recommendation-card ${levelClass(item.priority)}`} key={item.recommendation}>
            <div className="recommendation-top">
              <div className="badge-row"><PriorityChip value={item.priority} /><ConfidenceBadge score={item.confidence} /></div>
              <a className="action-btn" href={`/tasks/new?title=${encodeURIComponent(item.actionLabel)}`} onClick={() => onQueue(item.recommendation)}>{queuedActions.includes(item.recommendation) ? "Queued" : item.actionLabel}</a>
            </div>
            <h3>{item.recommendation}</h3>
            <p><b>Reason:</b> {item.reason}</p>
            <p><b>Expected votes:</b> {item.expectedVotes.toLocaleString()}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function TaskCenter() {
  return <SimpleTable id="support-task-center" title="Task Center" columns={["Initiative", "Open", "Pending", "Overdue", "Completed", "Highest Priority Task"]} rows={supportAnalysisData.tasks.map((item) => [item.initiative, item.openTasks, item.pendingTasks, item.overdueTasks, item.completedTasks, item.highestPriorityTask])} />;
}

function ActionCenter() {
  const actions = [
    ["Create Support Campaign", "/tasks/new?type=support_campaign"],
    ["Create Persuasion Campaign", "/tasks/new?type=support_persuasion"],
    ["Create Turnout Campaign", "/tasks/new?type=support_turnout"],
    ["Assign Outreach Team", "/tasks/new?type=support_outreach"],
    ["Generate Support Report", "/reports/daily-brief/new?type=support_report"],
    ["Generate Win Probability Report", "/reports/daily-brief/new?type=win_probability"],
    ["Generate Candidate Brief", "/candidate-intelligence/manage/new?type=support_brief"],
    ["Generate Weekly Strategy", "/reports/daily-brief/new?type=weekly_support_strategy"]
  ];
  return (
    <section className="panel" id="support-actions">
      <SectionHeader title="Action Center" eyebrow="Turn support analysis into campaign action" />
      <div className="voter-action-grid">
        {actions.map(([label, href]) => <a className="action-panel-btn" href={href} key={label}>{label}</a>)}
      </div>
    </section>
  );
}

function SupportRightPanel({ queuedActions }: { queuedActions: string[] }) {
  return (
    <aside className="voter-intel-panel support-intel-panel">
      <SectionHeader title="Support Intel Panel" eyebrow="Always-on support watch" />
      <PanelList title="Support Alerts" items={supportAnalysisData.recommendations.slice(0, 3).map((item) => item.recommendation)} />
      <PanelList title="Support Gains" items={supportAnalysisData.gains.map((item) => `${item.community} ${item.village}: ${item.expectedVotes.toLocaleString()} votes`)} />
      <PanelList title="Support Losses" items={supportAnalysisData.losses.map((item) => `${item.village}: ${item.potentialVoteLoss.toLocaleString()} vote loss`)} />
      <PanelList title="Top Risks" items={supportAnalysisData.losses.slice(0, 3).map((item) => `${item.segment}: ${item.reason}`)} />
      <PanelList title="Top Opportunities" items={supportAnalysisData.gains.slice(0, 3).map((item) => `${item.segment}: ${item.reason}`)} />
      <PanelList title="Recent Changes" items={queuedActions.length ? queuedActions : supportAnalysisData.movement.map((item) => item.change)} />
    </aside>
  );
}

function MetricBlock({ label, value }: { label: string; value: string | number }) {
  return (
    <article className="support-score-card">
      <span>{label}</span>
      <strong>{typeof value === "number" ? value.toLocaleString() : value}</strong>
    </article>
  );
}

function MetricGrid({ title, eyebrow, rows }: { title: string; eyebrow: string; rows: Array<[string, string | number]> }) {
  return (
    <section className="panel">
      <SectionHeader title={title} eyebrow={eyebrow} />
      <div className="support-score-grid compact-support-grid">
        {rows.map(([label, value]) => <MetricBlock label={label} value={value} key={label} />)}
      </div>
    </section>
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
      <SectionHeader title={title} eyebrow="Ranked support intelligence" actions={<CountPill>{rows.length} rows</CountPill>} />
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
      ) : <EmptyState title="No matching support intelligence" body="Adjust filters to restore this table." />}
    </section>
  );
}

function valueForMode(point: SupportHeatMapPoint, mode: SupportHeatMode) {
  if (mode === "Support Strength") return point.supportStrength;
  if (mode === "Opposition Strength") return point.oppositionStrength;
  if (mode === "Persuasion Opportunity") return point.persuasionOpportunity;
  if (mode === "Turnout Opportunity") return point.turnoutOpportunity;
  if (mode === "Village Support") return point.villageSupport;
  return point.boothSupport;
}

function scoreLevel(value: number) {
  if (value >= 65) return "High";
  if (value >= 45) return "Medium";
  return "Low";
}

function levelClass(priority: Priority) {
  return `level-${priority.toLowerCase()}`;
}

function labelize(value: string) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}
