"use client";

import { useMemo, useState } from "react";
import { PlatformShell } from "@/features/platform/PlatformShell";
import { ConfidenceBadge } from "@/features/shared/intelligenceBadges";
import { CountPill, EmptyState, PriorityChip, SectionHeader, signed, trendClass } from "@/features/political-intelligence/components/common";
import { persuasionIntelligenceData } from "../persuasion-data";
import type {
  CommunityConversionMatrixRow,
  PersuasionFilters,
  PersuasionOpportunity,
  Priority,
  VillageConversionMatrixRow
} from "../types";

const defaultFilters: PersuasionFilters = {
  village: "All",
  community: "All",
  issue: "All",
  influencer: "All",
  conversionScore: "All",
  priority: "All",
  status: "All",
  dateRange: "30 Days"
};

const filterOptions: Record<keyof PersuasionFilters, string[]> = {
  village: ["All", "Sinnar Town", "Pangri", "Musalgaon", "Dubere", "Devpur", "Wavi"],
  community: ["All", "Youth", "Farmers", "Women", "Maratha", "Mali", "SC", "Business Community"],
  issue: ["All", "Employment", "Irrigation", "Water", "Government Benefits", "Agriculture", "Healthcare", "Roads", "Education"],
  influencer: ["All", "Youth sports organizers", "Farmer group captains", "Cooperative office bearers", "SHG cluster conveners", "Clinic and health volunteers", "Local teachers network"],
  conversionScore: ["All", "High", "Medium", "Low"],
  priority: ["All", "Critical", "High", "Medium", "Low"],
  status: ["All", "Identified", "Analyzing", "Planning", "Outreach Started", "Engaged", "Converted", "Lost"],
  dateRange: ["Today", "7 Days", "30 Days", "Quarter"]
};

export function PersuasionIntelligenceCenter() {
  const data = persuasionIntelligenceData;
  const [filters, setFilters] = useState(defaultFilters);
  const [query, setQuery] = useState("");
  const [queuedActions, setQueuedActions] = useState<string[]>([]);

  const filteredOpportunities = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return data.opportunities.filter((opportunity) => {
      const searchable = JSON.stringify(opportunity).toLowerCase();
      if (filters.village !== "All" && !searchable.includes(filters.village.toLowerCase())) return false;
      if (filters.community !== "All" && !searchable.includes(filters.community.toLowerCase())) return false;
      if (filters.issue !== "All" && opportunity.issue !== filters.issue) return false;
      if (filters.influencer !== "All" && opportunity.influencer !== filters.influencer) return false;
      if (filters.conversionScore !== "All" && scoreLevel(opportunity.conversionProbability) !== filters.conversionScore) return false;
      if (filters.priority !== "All" && opportunity.priority !== filters.priority) return false;
      if (filters.status !== "All" && opportunity.status !== filters.status) return false;
      return !normalized || searchable.includes(normalized);
    });
  }, [data.opportunities, filters, query]);

  function updateFilter(key: keyof PersuasionFilters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <PlatformShell activeCoreModule="voter-intelligence" activeModuleSection="persuasion-intelligence">
      <header className="candidate-header voter-header">
        <div>
          <span className="eyebrow">Voter Intelligence / Persuasion Intelligence</span>
          <h1>Persuasion Intelligence Center</h1>
          <p>Vote conversion opportunities, voter movement intelligence, and campaign action planning.</p>
        </div>
        <label className="global-search">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search village, community, influencer, household, issue, opportunity, campaign" />
        </label>
      </header>

      <section className="voter-filter-rail" aria-label="Persuasion intelligence filters">
        {Object.entries(filterOptions).map(([key, options]) => {
          const filterKey = key as keyof PersuasionFilters;
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

      <main className="voter-workspace persuasion-workspace">
        <div className="voter-main">
          <PersuasionPriorityCommand data={data} />
          <PersuasionOverview metrics={data.overview} />
          <PersuasionCommandCenter />
          <TopVoteConversionOpportunities opportunities={filteredOpportunities} />
          <div className="workspace-grid two-column">
            <PersuadableCommunities />
            <PersuadableVillages />
          </div>
          <div className="workspace-grid two-column">
            <PersuadableHouseholds />
            <PersuadableInfluencers />
          </div>
          <div className="workspace-grid two-column">
            <IssueBasedPersuasion />
            <MessageEffectivenessAnalysis />
          </div>
          <div className="workspace-grid two-column">
            <CommunityConversionMatrix rows={data.communityMatrix} />
            <VillageConversionMatrix rows={data.villageMatrix} />
          </div>
          <CampaignActionRecommendations queuedActions={queuedActions} onQueue={(action) => setQueuedActions((current) => [...current, action])} />
          <div className="workspace-grid two-column">
            <PersuasionPipeline />
            <VoteGainForecasting />
          </div>
          <div className="workspace-grid two-column">
            <ConversionSuccessTracker />
            <ScenarioSimulator queuedActions={queuedActions} onQueue={(action) => setQueuedActions((current) => [...current, action])} />
          </div>
          <AiPersuasionEngine queuedActions={queuedActions} onQueue={(action) => setQueuedActions((current) => [...current, action])} />
          <TaskCenter />
          <ActionCenter />
        </div>

        <PersuasionRightPanel opportunities={data.opportunities} queuedActions={queuedActions} />
      </main>
    </PlatformShell>
  );
}

function PersuasionPriorityCommand({ data }: { data: typeof persuasionIntelligenceData }) {
  const topGain = [...data.opportunities].sort((a, b) => b.expectedVoteGain - a.expectedVoteGain)[0];
  const topProbability = [...data.opportunities].sort((a, b) => b.conversionProbability - a.conversionProbability)[0];
  const critical = data.opportunities.find((item) => item.priority === "Critical") ?? data.opportunities[0];

  return (
    <section className="command-priority-grid voter-priority-grid persuasion-priority-grid">
      <article className="priority-hero political-risk">
        <span className="eyebrow">Highest Vote Gain</span>
        <h2>{topGain.opportunity}</h2>
        <strong>{topGain.expectedVoteGain.toLocaleString()}</strong>
        <p>{topGain.recommendedAction}</p>
      </article>
      <article className="priority-hero community-sentiment">
        <span className="eyebrow">Highest Probability</span>
        <strong>{topProbability.conversionProbability}%</strong>
        <p>{topProbability.target} / {topProbability.owner}</p>
      </article>
      <article className="priority-hero opponent-movement">
        <span className="eyebrow">Critical Opportunity</span>
        <h2>{critical.target}</h2>
        <PriorityChip value={critical.priority} />
        <p>{critical.issue} / {critical.influencer}</p>
      </article>
      <article className="priority-hero election-readiness">
        <span className="eyebrow">Potential Vote Gain</span>
        <strong>18.9K</strong>
        <p>Current mock pipeline value across persuasion campaigns.</p>
      </article>
      <article className="priority-hero ai-recommendation">
        <span className="eyebrow">AI Persuasion Engine</span>
        <h2>{data.recommendations[0].recommendation}</h2>
        <p>{data.recommendations[0].reason}</p>
      </article>
    </section>
  );
}

function PersuasionOverview({ metrics }: { metrics: typeof persuasionIntelligenceData.overview }) {
  return (
    <section className="overview-bar" id="persuasion-overview">
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

function PersuasionCommandCenter() {
  return (
    <section className="panel" id="persuasion-command-center">
      <SectionHeader title="Persuasion Command Center" eyebrow="Probability, opportunity value, urgency, and conversion readiness" />
      <div className="persuasion-command-grid">
        {persuasionIntelligenceData.command.map((metric) => (
          <article className={`persuasion-command-card tone-${metric.tone}`} key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <p>{metric.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function TopVoteConversionOpportunities({ opportunities }: { opportunities: PersuasionOpportunity[] }) {
  return (
    <section className="panel table-panel" id="top-vote-conversion-opportunities">
      <SectionHeader title="Top Vote Conversion Opportunities" eyebrow="Specific actions most likely to gain votes" actions={<CountPill>{opportunities.length} opportunities</CountPill>} />
      {opportunities.length ? (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                {["Opportunity", "Target", "Type", "Current Support", "Potential Support", "Expected Vote Gain", "Conversion Probability", "Priority", "Recommended Action", "Owner", "Status"].map((column) => <th key={column}>{column}</th>)}
              </tr>
            </thead>
            <tbody>
              {opportunities.map((item) => (
                <tr key={item.opportunity}>
                  <td><strong>{item.opportunity}</strong></td>
                  <td>{item.target}</td>
                  <td>{item.type}</td>
                  <td>{item.currentSupport}%</td>
                  <td>{item.potentialSupport}%</td>
                  <td>{item.expectedVoteGain.toLocaleString()}</td>
                  <td>{item.conversionProbability}%</td>
                  <td><PriorityChip value={item.priority} /></td>
                  <td>{item.recommendedAction}</td>
                  <td>{item.owner}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <EmptyState title="No persuasion opportunities match filters" body="Adjust village, issue, influencer, priority, or search filters." />}
    </section>
  );
}

function PersuadableCommunities() {
  return <SimpleTable id="persuadable-communities" title="Persuadable Communities" columns={["Community", "Current", "Potential", "Expected Gain", "Main Issues", "Influencers", "Score", "Priority"]} rows={persuasionIntelligenceData.communities.map((item) => [item.community, `${item.currentSupport}%`, `${item.potentialSupport}%`, item.expectedGain.toLocaleString(), item.mainIssues, item.influencers, item.opportunityScore, item.priority])} priorityColumn={7} />;
}

function PersuadableVillages() {
  return <SimpleTable id="persuadable-villages" title="Persuadable Villages" columns={["Village", "Current", "Potential", "Expected Gain", "Top Issues", "Influencers", "Priority", "Recommended Action"]} rows={persuasionIntelligenceData.villages.map((item) => [item.village, `${item.currentSupport}%`, `${item.potentialSupport}%`, item.expectedGain.toLocaleString(), item.topIssues, item.influencers, item.priority, item.recommendedAction])} priorityColumn={6} />;
}

function PersuadableHouseholds() {
  return <SimpleTable id="persuadable-households" title="Persuadable Households" columns={["Household", "Village", "Current Alignment", "Potential Alignment", "Influencer", "Expected Votes", "Priority", "Visitor", "Action"]} rows={persuasionIntelligenceData.households.map((item) => [item.household, item.village, item.currentAlignment, item.potentialAlignment, item.influencer, item.expectedVotes, item.priority, item.recommendedVisitor, item.recommendedAction])} priorityColumn={6} />;
}

function PersuadableInfluencers() {
  return <SimpleTable id="persuadable-influencers" title="Persuadable Influencers" columns={["Influencer", "Current Alignment", "Potential Alignment", "Reach", "Expected Gain", "Priority", "Strategy"]} rows={persuasionIntelligenceData.influencers.map((item) => [item.influencer, item.currentAlignment, item.potentialAlignment, item.influenceReach.toLocaleString(), item.expectedVoteGain.toLocaleString(), item.priority, item.recommendedStrategy])} priorityColumn={5} />;
}

function IssueBasedPersuasion() {
  return <SimpleTable id="issue-based-persuasion" title="Issue-Based Persuasion" columns={["Issue", "Affected Voters", "Affected Villages", "Affected Communities", "Conversion Potential", "Priority"]} rows={persuasionIntelligenceData.issues.map((item) => [item.issue, item.affectedVoters.toLocaleString(), item.affectedVillages, item.affectedCommunities, item.conversionPotential.toLocaleString(), item.priority])} priorityColumn={5} />;
}

function MessageEffectivenessAnalysis() {
  return <SimpleTable id="message-effectiveness" title="Message Effectiveness Analysis" columns={["Message Theme", "Target Audience", "Expected Impact", "Conversion Probability"]} rows={persuasionIntelligenceData.messages.map((item) => [item.messageTheme, item.targetAudience, item.expectedImpact.toLocaleString(), `${item.conversionProbability}%`])} />;
}

function CommunityConversionMatrix({ rows }: { rows: CommunityConversionMatrixRow[] }) {
  return (
    <section className="panel" id="community-conversion-matrix">
      <SectionHeader title="Community Conversion Matrix" eyebrow="Support, neutral, persuadable, opposition, and conversion potential" />
      <div className="conversion-matrix community-conversion-matrix">
        {["Community", "Support", "Neutral", "Persuadable", "Opposition", "Potential"].map((header) => <strong className="conversion-matrix-head" key={header}>{header}</strong>)}
        {rows.map((row) => (
          <div className="conversion-matrix-row" key={row.community}>
            <button type="button">{row.community}</button>
            <span className="matrix-cell-support">{row.support}%</span>
            <span className="matrix-cell-neutral">{row.neutral}%</span>
            <span className="matrix-cell-watch">{row.persuadable}%</span>
            <span className="matrix-cell-risk">{row.opposition}%</span>
            <span className="matrix-cell-strong">{row.conversionPotential}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function VillageConversionMatrix({ rows }: { rows: VillageConversionMatrixRow[] }) {
  return (
    <section className="panel" id="village-conversion-matrix">
      <SectionHeader title="Village Conversion Matrix" eyebrow="Current support, potential support, expected gain, score, and priority" />
      <div className="conversion-matrix village-conversion-matrix">
        {["Village", "Current", "Potential", "Gain", "Score", "Priority"].map((header) => <strong className="conversion-matrix-head" key={header}>{header}</strong>)}
        {rows.map((row) => (
          <div className="conversion-matrix-row" key={row.village}>
            <button type="button">{row.village}</button>
            <span>{row.currentSupport}%</span>
            <span className="matrix-cell-support">{row.potentialSupport}%</span>
            <span className="matrix-cell-watch">{row.expectedGain.toLocaleString()}</span>
            <span className="matrix-cell-strong">{row.conversionScore}</span>
            <span><PriorityChip value={row.priority} /></span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CampaignActionRecommendations({ queuedActions, onQueue }: { queuedActions: string[]; onQueue: (action: string) => void }) {
  return (
    <section className="panel table-panel" id="campaign-action-recommendations">
      <SectionHeader title="Campaign Action Recommendations" eyebrow="Convert persuasion intelligence into field execution" actions={<CountPill>{persuasionIntelligenceData.actions.length} actions</CountPill>} />
      <div className="table-scroll">
        <table>
          <thead>
            <tr>{["Action", "Target", "Expected Vote Gain", "Effort", "Priority", "Owner", "Status", "Task"].map((column) => <th key={column}>{column}</th>)}</tr>
          </thead>
          <tbody>
            {persuasionIntelligenceData.actions.map((item) => (
              <tr key={`${item.action}-${item.target}`}>
                <td><strong>{item.action}</strong></td>
                <td>{item.target}</td>
                <td>{item.expectedVoteGain.toLocaleString()}</td>
                <td>{item.effortRequired}</td>
                <td><PriorityChip value={item.priority} /></td>
                <td>{item.owner}</td>
                <td>{item.status}</td>
                <td><a className="action-btn" href={`/tasks/new?title=${encodeURIComponent(item.action)}`} onClick={() => onQueue(`${item.action}: ${item.target}`)}>{queuedActions.includes(`${item.action}: ${item.target}`) ? "Queued" : "Create Task"}</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function PersuasionPipeline() {
  const totalExpected = persuasionIntelligenceData.pipeline[0].expectedVotes;
  return (
    <section className="panel" id="persuasion-pipeline">
      <SectionHeader title="Persuasion Pipeline" eyebrow="Identified to converted vote movement" />
      <div className="pipeline-grid">
        {persuasionIntelligenceData.pipeline.map((stage) => (
          <article className="pipeline-stage" key={stage.stage}>
            <span>{stage.stage}</span>
            <strong>{stage.count}</strong>
            <p>{stage.expectedVotes.toLocaleString()} expected votes</p>
            <Meter label="Pipeline share" value={stage.expectedVotes} max={totalExpected} />
          </article>
        ))}
      </div>
    </section>
  );
}

function VoteGainForecasting() {
  return (
    <section className="panel" id="vote-gain-forecasting">
      <SectionHeader title="Vote Gain Forecasting" eyebrow="Best, likely, worst, and expected vote gain by segment" />
      <div className="forecast-grid">
        {persuasionIntelligenceData.forecasts.map((forecast) => (
          <article className="forecast-card" key={forecast.segment}>
            <div>
              <span>{forecast.type}</span>
              <h3>{forecast.segment}</h3>
            </div>
            <strong>{forecast.expectedVoteGain.toLocaleString()}</strong>
            <p>Best {forecast.bestCase.toLocaleString()} / Likely {forecast.likelyCase.toLocaleString()} / Worst {forecast.worstCase.toLocaleString()}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ConversionSuccessTracker() {
  return <SimpleTable id="conversion-success-tracker" title="Conversion Success Tracker" columns={["Activity", "Expected", "Actual", "Success Rate", "Lessons Learned"]} rows={persuasionIntelligenceData.success.map((item) => [item.activity, item.expectedImpact.toLocaleString(), item.actualImpact.toLocaleString(), `${item.successRate}%`, item.lessonsLearned])} />;
}

function ScenarioSimulator({ queuedActions, onQueue }: { queuedActions: string[]; onQueue: (action: string) => void }) {
  return (
    <section className="panel" id="scenario-simulator">
      <SectionHeader title="Scenario Simulator" eyebrow="What happens if a community, village, influencer, or issue shifts?" />
      <div className="scenario-grid">
        {persuasionIntelligenceData.scenarios.map((scenario) => (
          <article className="scenario-card" key={scenario.scenario}>
            <span>{scenario.scenario}</span>
            <strong>{scenario.expectedVoteGain.toLocaleString()}</strong>
            <p>{scenario.seatImpact}</p>
            <b>Win probability {signed(scenario.winProbabilityChange)}%</b>
            <a className="action-btn" href={`/tasks/new?title=${encodeURIComponent(scenario.scenario)}`} onClick={() => onQueue(scenario.scenario)}>{queuedActions.includes(scenario.scenario) ? "Queued" : "Create Scenario Task"}</a>
          </article>
        ))}
      </div>
    </section>
  );
}

function AiPersuasionEngine({ queuedActions, onQueue }: { queuedActions: string[]; onQueue: (action: string) => void }) {
  return (
    <section className="panel recommendations-panel" id="ai-persuasion-engine">
      <SectionHeader title="AI Persuasion Engine" eyebrow="Highest probability conversions, important villages, communities, influencers, and issues" />
      <div className="recommendation-list">
        {persuasionIntelligenceData.recommendations.map((item) => (
          <article className={`recommendation-card ${levelClass(item.priority)}`} key={item.recommendation}>
            <div className="recommendation-top">
              <div className="badge-row"><PriorityChip value={item.priority} /><ConfidenceBadge score={item.confidence} /></div>
              <a className="action-btn" href={`/tasks/new?title=${encodeURIComponent(item.actionLabel)}`} onClick={() => onQueue(item.recommendation)}>{queuedActions.includes(item.recommendation) ? "Queued" : item.actionLabel}</a>
            </div>
            <h3>{item.recommendation}</h3>
            <p><b>Reason:</b> {item.reason}</p>
            <p><b>Expected impact:</b> {item.expectedImpact.toLocaleString()} votes</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function TaskCenter() {
  return <SimpleTable id="persuasion-task-center" title="Task Center" columns={["Campaign", "Open", "Pending", "Overdue", "Completed", "Highest Priority Task"]} rows={persuasionIntelligenceData.tasks.map((item) => [item.campaign, item.openTasks, item.pendingTasks, item.overdueTasks, item.completedTasks, item.highestPriorityTask])} />;
}

function ActionCenter() {
  const actions = [
    ["Create Outreach Campaign", "/tasks/new?type=outreach_campaign"],
    ["Create Village Visit", "/events/new?type=village_visit"],
    ["Assign Influencer Team", "/tasks/new?type=influencer_team"],
    ["Assign Community Team", "/tasks/new?type=community_team"],
    ["Create Listening Session", "/events/new?type=listening_session"],
    ["Generate Persuasion Plan", "/reports/daily-brief/new?type=persuasion_plan"],
    ["Generate Community Strategy", "/reports/daily-brief/new?type=community_strategy"],
    ["Generate Village Strategy", "/reports/daily-brief/new?type=village_strategy"],
    ["Generate Candidate Brief", "/candidate-intelligence/manage/new?type=persuasion_brief"]
  ];
  return (
    <section className="panel" id="persuasion-actions">
      <SectionHeader title="Action Center" eyebrow="Turn conversion intelligence into campaign execution" />
      <div className="voter-action-grid">
        {actions.map(([label, href]) => <a className="action-panel-btn" href={href} key={label}>{label}</a>)}
      </div>
    </section>
  );
}

function PersuasionRightPanel({ opportunities, queuedActions }: { opportunities: PersuasionOpportunity[]; queuedActions: string[] }) {
  const topOpportunities = [...opportunities].sort((a, b) => b.expectedVoteGain - a.expectedVoteGain).slice(0, 3);
  const highVillages = persuasionIntelligenceData.villages.filter((item) => item.priority === "Critical" || item.priority === "High").slice(0, 4);
  const highCommunities = persuasionIntelligenceData.communities.filter((item) => item.priority === "Critical" || item.priority === "High").slice(0, 4);
  const highInfluencers = persuasionIntelligenceData.influencers.filter((item) => item.priority === "Critical" || item.priority === "High").slice(0, 4);
  const pendingActions = persuasionIntelligenceData.tasks.map((item) => `${item.campaign}: ${item.openTasks} open / ${item.overdueTasks} overdue`);

  return (
    <aside className="voter-intel-panel persuasion-intel-panel">
      <SectionHeader title="Persuasion Intel Panel" eyebrow="Always-on conversion watch" />
      <PanelList title="Top Conversion Opportunities" items={topOpportunities.map((item) => `${item.opportunity}: ${item.expectedVoteGain.toLocaleString()} votes / ${item.conversionProbability}%`)} />
      <PanelList title="High Priority Villages" items={highVillages.map((item) => `${item.village}: ${item.expectedGain.toLocaleString()} gain / ${item.priority}`)} />
      <PanelList title="High Priority Communities" items={highCommunities.map((item) => `${item.community}: score ${item.opportunityScore} / ${item.expectedGain.toLocaleString()} gain`)} />
      <PanelList title="High Priority Influencers" items={highInfluencers.map((item) => `${item.influencer}: reach ${item.influenceReach.toLocaleString()}`)} />
      <PanelList title="Pending Actions" items={pendingActions} />
      <PanelList title="Recent Changes" items={queuedActions.length ? queuedActions : ["No persuasion actions queued from this session"]} />
      <PanelList title="Alerts" items={["Cooperative network needs neutral bridge before direct engagement", "Youth employment circuit is the highest-probability conversion path", "Field proof required before public irrigation claims"]} />
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
      <SectionHeader title={title} eyebrow="Ranked persuasion intelligence" actions={<CountPill>{rows.length} rows</CountPill>} />
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
      ) : <EmptyState title="No matching persuasion intelligence" body="Adjust filters to restore this table." />}
    </section>
  );
}

function Meter({ label, value, max }: { label: string; value: number; max: number }) {
  const width = Math.min((value / max) * 100, 100);
  return (
    <div className="support-row">
      <span>{label}</span>
      <div><i className={width > 65 ? "score-strong" : width > 35 ? "score-watch" : "score-weak"} style={{ width: `${width}%` }} /></div>
      <b>{Math.round(width)}%</b>
    </div>
  );
}

function scoreLevel(value: number) {
  if (value >= 60) return "High";
  if (value >= 45) return "Medium";
  return "Low";
}

function levelClass(priority: Priority) {
  return `level-${priority.toLowerCase()}`;
}

function labelize(value: string) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}
