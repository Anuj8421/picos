"use client";

import { useMemo, useState } from "react";
import { PlatformShell } from "@/features/platform/PlatformShell";
import { ConfidenceBadge } from "@/features/shared/intelligenceBadges";
import { CountPill, EmptyState, PriorityChip, SectionHeader, signed, trendClass } from "@/features/political-intelligence/components/common";
import { turnoutIntelligenceData } from "../turnout-data";
import type { Priority, TurnoutFilters, TurnoutMapSignal, TurnoutTargetSignal } from "../types";

const defaultFilters: TurnoutFilters = {
  village: "All",
  booth: "All",
  community: "All",
  supportLevel: "All",
  turnoutProbability: "All",
  priority: "All",
  status: "All",
  dateRange: "30 Days"
};

const filterOptions: Record<keyof TurnoutFilters, string[]> = {
  village: ["All", "Sinnar Town", "Pangri", "Musalgaon", "Dubere", "Devpur", "Wavi"],
  booth: ["All", "Booth 102", "Booth 044", "Booth 067", "Booth 071", "Booth 086", "Booth 093"],
  community: ["All", "Youth", "Farmers", "Women", "Maratha", "Mali", "Vanjari", "Dhangar", "SC", "ST", "Minority", "Business Community"],
  supportLevel: ["All", "Supportive", "Persuadable", "Neutral", "Persuadable Support"],
  turnoutProbability: ["All", "High", "Medium", "Low"],
  priority: ["All", "Critical", "High", "Medium", "Low"],
  status: ["All", "Identified", "Contacted", "Confirmed", "Reminded", "Mobilized", "Voted", "Unknown", "Active", "At risk", "Needs staffing"],
  dateRange: ["Today", "7 Days", "30 Days", "Election Period"]
};

export function TurnoutIntelligenceCenter() {
  const data = turnoutIntelligenceData;
  const [filters, setFilters] = useState(defaultFilters);
  const [query, setQuery] = useState("");
  const [mapMode, setMapMode] = useState<"Turnout" | "Risk" | "Opportunity" | "Priority">("Risk");
  const [selectedMapId, setSelectedMapId] = useState(data.heatMap[0].id);
  const [queuedActions, setQueuedActions] = useState<string[]>([]);

  const filteredTargets = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return data.targets.filter((target) => {
      const searchable = JSON.stringify(target).toLowerCase();
      if (filters.village !== "All" && target.village !== filters.village) return false;
      if (filters.booth !== "All" && !searchable.includes(filters.booth.toLowerCase())) return false;
      if (filters.community !== "All" && !searchable.includes(filters.community.toLowerCase())) return false;
      if (filters.supportLevel !== "All" && !searchable.includes(filters.supportLevel.toLowerCase())) return false;
      if (filters.turnoutProbability !== "All" && scoreLevel(target.currentTurnoutProbability) !== filters.turnoutProbability) return false;
      if (filters.priority !== "All" && target.priority !== filters.priority) return false;
      if (filters.status !== "All" && target.status !== filters.status) return false;
      return !normalized || searchable.includes(normalized);
    });
  }, [data.targets, filters, query]);

  const filteredMap = useMemo(() => {
    return data.heatMap.filter((point) => {
      const searchable = JSON.stringify(point).toLowerCase();
      if (filters.village !== "All" && point.village !== filters.village) return false;
      if (filters.booth !== "All" && point.booth !== filters.booth) return false;
      if (filters.community !== "All" && point.community !== filters.community) return false;
      if (filters.supportLevel !== "All" && point.supportLevel !== filters.supportLevel) return false;
      if (filters.turnoutProbability !== "All" && scoreLevel(point.expectedTurnout) !== filters.turnoutProbability) return false;
      if (filters.priority !== "All" && point.electionDayPriority !== filters.priority) return false;
      const normalized = query.trim().toLowerCase();
      return !normalized || searchable.includes(normalized);
    });
  }, [data.heatMap, filters, query]);

  const selectedPoint = filteredMap.find((point) => point.id === selectedMapId) ?? filteredMap[0] ?? data.heatMap[0];

  function updateFilter(key: keyof TurnoutFilters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <PlatformShell activeCoreModule="voter-intelligence" activeModuleSection="turnout-intelligence">
      <header className="candidate-header voter-header">
        <div>
          <span className="eyebrow">Voter Intelligence / Turnout Intelligence</span>
          <h1>Turnout Intelligence Center</h1>
          <p>Voter mobilization, turnout risk, election-day planning, and vote protection intelligence.</p>
        </div>
        <label className="global-search">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search village, booth, community, household, volunteer, campaign, task" />
        </label>
      </header>

      <section className="voter-filter-rail" aria-label="Turnout intelligence filters">
        {Object.entries(filterOptions).map(([key, options]) => {
          const filterKey = key as keyof TurnoutFilters;
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

      <main className="voter-workspace turnout-workspace">
        <div className="voter-main">
          <TurnoutPriorityCommand />
          <TurnoutOverview />
          <TurnoutCommandCenter />
          <TurnoutHeatMap points={filteredMap} selectedPoint={selectedPoint} mapMode={mapMode} onModeChange={setMapMode} onSelect={setSelectedMapId} />
          <HighPriorityTurnoutTargets targets={filteredTargets} />
          <div className="workspace-grid two-column">
            <CommunityTurnoutAnalysis />
            <VillageTurnoutAnalysis />
          </div>
          <BoothTurnoutAnalysis />
          <HouseholdTurnoutAnalysis />
          <div className="workspace-grid two-column">
            <FirstTimeVoterIntelligence />
            <SeniorCitizenMobilization />
          </div>
          <WomenTurnoutIntelligence />
          <MobilizationCampaigns />
          <ElectionDayOperations />
          <div className="workspace-grid two-column">
            <TurnoutPipeline />
            <VoteProtectionCenter />
          </div>
          <TurnoutForecasting />
          <AiTurnoutStrategy queuedActions={queuedActions} onQueue={(action) => setQueuedActions((current) => [...current, action])} />
          <TurnoutTaskCenter />
          <ElectionDayCommandPanel />
          <ActionCenter />
        </div>

        <TurnoutRightPanel queuedActions={queuedActions} />
      </main>
    </PlatformShell>
  );
}

function TurnoutPriorityCommand() {
  const highestRisk = [...turnoutIntelligenceData.heatMap].sort((a, b) => b.turnoutRisk - a.turnoutRisk)[0];
  const highestTarget = [...turnoutIntelligenceData.targets].sort((a, b) => b.expectedVotes - a.expectedVotes)[0];
  const criticalBooth = [...turnoutIntelligenceData.booths].sort((a, b) => b.risk - a.risk)[0];

  return (
    <section className="command-priority-grid voter-priority-grid turnout-priority-grid">
      <article className="priority-hero political-risk">
        <span className="eyebrow">Supporters At Risk</span>
        <h2>{highestRisk.village} / {highestRisk.booth}</h2>
        <strong>{highestRisk.turnoutRisk}%</strong>
        <p>{highestRisk.classification}: mobilization opportunity {highestRisk.mobilizationOpportunity}%.</p>
      </article>
      <article className="priority-hero community-sentiment">
        <span className="eyebrow">Highest Turnout Gain</span>
        <strong>{highestTarget.expectedVotes.toLocaleString("en-IN")}</strong>
        <p>{highestTarget.target} / {highestTarget.owner}</p>
      </article>
      <article className="priority-hero opponent-movement">
        <span className="eyebrow">Critical Booth</span>
        <h2>{criticalBooth.booth}</h2>
        <PriorityChip value={criticalBooth.priority} />
        <p>Readiness {criticalBooth.boothReadiness}% / risk {criticalBooth.risk}%</p>
      </article>
      <article className="priority-hero election-readiness">
        <span className="eyebrow">Expected Vote Gain</span>
        <strong>7.8K</strong>
        <p>Likely gain if critical mobilization targets are executed.</p>
      </article>
      <article className="priority-hero ai-recommendation">
        <span className="eyebrow">AI Turnout Strategy</span>
        <h2>{turnoutIntelligenceData.recommendations[0].recommendation}</h2>
        <p>{turnoutIntelligenceData.recommendations[0].reason}</p>
      </article>
    </section>
  );
}

function TurnoutOverview() {
  return (
    <section className="overview-bar" id="turnout-overview">
      {turnoutIntelligenceData.overview.map((metric) => (
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

function TurnoutCommandCenter() {
  return (
    <section className="panel" id="turnout-command-center">
      <SectionHeader title="Turnout Command Center" eyebrow="Supporters, confirmations, election-day risk, and critical targets" />
      <div className="turnout-command-grid">
        {turnoutIntelligenceData.command.map((metric) => (
          <article className={`turnout-command-card tone-${metric.tone}`} key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <p>{metric.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function TurnoutHeatMap({
  points,
  selectedPoint,
  mapMode,
  onModeChange,
  onSelect
}: {
  points: TurnoutMapSignal[];
  selectedPoint: TurnoutMapSignal;
  mapMode: "Turnout" | "Risk" | "Opportunity" | "Priority";
  onModeChange: (mode: "Turnout" | "Risk" | "Opportunity" | "Priority") => void;
  onSelect: (id: string) => void;
}) {
  const modes: Array<typeof mapMode> = ["Turnout", "Risk", "Opportunity", "Priority"];
  return (
    <section className="panel geo-panel turnout-heat-panel" id="turnout-heat-map">
      <SectionHeader title="Turnout Heat Map" eyebrow="Strong turnout, weak turnout, risk, mobilization opportunity, and election-day priority" actions={<CountPill>{points.length} points</CountPill>} />
      <div className="map-toolbar">
        <div className="segmented-control">
          {modes.map((mode) => <button className={`seg-btn ${mode === mapMode ? "is-active" : ""}`} onClick={() => onModeChange(mode)} type="button" key={mode}>{mode}</button>)}
        </div>
      </div>
      <div className="map-stage turnout-map-stage">
        <svg className="constituency-map" viewBox="0 0 100 100">
          <path d="M16,18 L48,9 L76,16 L91,39 L83,72 L61,91 L31,86 L10,62 L7,35 Z" />
          <path d="M29,22 L52,18 L73,28 L77,50 L65,68 L43,75 L25,61 L19,40 Z" />
          <path d="M50,12 L51,89" />
          <path d="M13,58 L88,40" />
          <path d="M25,61 L77,50" />
        </svg>
        {points.map((point) => (
          <button
            className={`map-marker turnout-marker turnout-${slug(point.classification)} ${selectedPoint.id === point.id ? "is-selected" : ""}`}
            key={point.id}
            onClick={() => onSelect(point.id)}
            style={{ left: `${point.x}%`, top: `${point.y}%`, width: 15 + valueForMode(point, mapMode) / 7, height: 15 + valueForMode(point, mapMode) / 7 }}
            type="button"
          >
            <span>{point.booth}</span>
          </button>
        ))}
        {!points.length ? <div className="map-empty-state">No turnout points match filters</div> : null}
      </div>
      <div className="map-detail">
        <span>{selectedPoint.classification}</span>
        <h3>{selectedPoint.village} / {selectedPoint.booth}</h3>
        <dl>
          <div><dt>Expected Turnout</dt><dd>{selectedPoint.expectedTurnout}%</dd></div>
          <div><dt>Risk</dt><dd>{selectedPoint.turnoutRisk}%</dd></div>
          <div><dt>Opportunity</dt><dd>{selectedPoint.mobilizationOpportunity}%</dd></div>
          <div><dt>Priority</dt><dd>{selectedPoint.electionDayPriority}</dd></div>
        </dl>
      </div>
    </section>
  );
}

function HighPriorityTurnoutTargets({ targets }: { targets: TurnoutTargetSignal[] }) {
  return (
    <section className="panel table-panel" id="high-priority-turnout-targets">
      <SectionHeader title="High Priority Turnout Targets" eyebrow="Where supporter turnout can be protected or recovered" actions={<CountPill>{targets.length} targets</CountPill>} />
      {targets.length ? (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>{["Target", "Type", "Village", "Current Turnout Probability", "Potential Turnout", "Expected Votes", "Priority", "Recommended Action", "Owner", "Status"].map((column) => <th key={column}>{column}</th>)}</tr>
            </thead>
            <tbody>
              {targets.map((target) => (
                <tr key={target.target}>
                  <td><strong>{target.target}</strong></td>
                  <td>{target.type}</td>
                  <td>{target.village}</td>
                  <td>{target.currentTurnoutProbability}%</td>
                  <td>{target.potentialTurnout}%</td>
                  <td>{target.expectedVotes.toLocaleString("en-IN")}</td>
                  <td><PriorityChip value={target.priority} /></td>
                  <td>{target.recommendedAction}</td>
                  <td>{target.owner}</td>
                  <td>{target.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <EmptyState title="No turnout targets match filters" body="Adjust village, booth, community, turnout probability, priority, or search filters." />}
    </section>
  );
}

function CommunityTurnoutAnalysis() {
  return <SimpleTable id="community-turnout-analysis" title="Community Turnout Analysis" columns={["Community", "Expected Turnout", "Historical Turnout", "Turnout Risk", "Mobilization Potential", "Priority"]} rows={turnoutIntelligenceData.communities.map((item) => [item.community, `${item.expectedTurnout}%`, `${item.historicalTurnout}%`, `${item.turnoutRisk}%`, item.mobilizationPotential.toLocaleString("en-IN"), item.priority])} priorityColumn={5} />;
}

function VillageTurnoutAnalysis() {
  return <SimpleTable id="village-turnout-analysis" title="Village Turnout Analysis" columns={["Village", "Expected Turnout", "Historical Turnout", "Support Base", "Mobilization Need", "Expected Votes", "Priority"]} rows={turnoutIntelligenceData.villages.map((item) => [item.village, `${item.expectedTurnout}%`, `${item.historicalTurnout}%`, item.supportBase.toLocaleString("en-IN"), `${item.mobilizationNeed}%`, item.expectedVotes.toLocaleString("en-IN"), item.priority])} priorityColumn={6} />;
}

function BoothTurnoutAnalysis() {
  return <SimpleTable id="booth-turnout-analysis" title="Booth Turnout Analysis" columns={["Booth", "Registered Voters", "Supporters", "Expected Turnout", "Target Turnout", "Risk", "Booth Readiness", "Coordinator", "Priority"]} rows={turnoutIntelligenceData.booths.map((item) => [item.booth, item.registeredVoters.toLocaleString("en-IN"), item.supporters.toLocaleString("en-IN"), `${item.expectedTurnout}%`, `${item.targetTurnout}%`, `${item.risk}%`, `${item.boothReadiness}%`, item.coordinator, item.priority])} priorityColumn={8} />;
}

function HouseholdTurnoutAnalysis() {
  return <SimpleTable id="household-turnout-analysis" title="Household Turnout Analysis" columns={["Household", "Support Level", "Turnout Probability", "Risk", "Influencer", "Expected Votes", "Recommended Follow-Up", "Priority"]} rows={turnoutIntelligenceData.households.map((item) => [item.household, item.supportLevel, `${item.turnoutProbability}%`, `${item.risk}%`, item.influencer, item.expectedVotes, item.recommendedFollowUp, item.priority])} priorityColumn={7} />;
}

function FirstTimeVoterIntelligence() {
  return <SimpleTable id="first-time-voter-intelligence" title="First-Time Voter Intelligence" columns={["Segment", "Total", "Village Distribution", "Community Distribution", "Engagement", "Support", "Turnout", "Priority Actions", "Priority"]} rows={turnoutIntelligenceData.firstTimeVoters.map((item) => [item.segment, item.totalVoters.toLocaleString("en-IN"), item.villageDistribution, item.communityDistribution, `${item.engagementLevel}%`, `${item.supportLevel}%`, `${item.turnoutProbability}%`, item.priorityActions, item.priority])} priorityColumn={8} />;
}

function SeniorCitizenMobilization() {
  return <SimpleTable id="senior-citizen-mobilization" title="Senior Citizen Mobilization" columns={["Segment", "Total Seniors", "Support", "Risk", "Transport Needs", "Special Assistance", "Election Day Plan", "Priority"]} rows={turnoutIntelligenceData.seniorCitizens.map((item) => [item.segment, item.totalSeniorCitizens.toLocaleString("en-IN"), `${item.supportLevel}%`, `${item.turnoutRisk}%`, item.transportationNeeds, item.specialAssistanceNeeded, item.electionDayPlan, item.priority])} priorityColumn={7} />;
}

function WomenTurnoutIntelligence() {
  return <SimpleTable id="women-turnout-intelligence" title="Women Turnout Intelligence" columns={["Segment", "Support", "Turnout Probability", "Community Breakdown", "Village Breakdown", "Mobilization Opportunity", "Priority"]} rows={turnoutIntelligenceData.womenTurnout.map((item) => [item.segment, `${item.supportLevel}%`, `${item.turnoutProbability}%`, item.communityBreakdown, item.villageBreakdown, item.mobilizationOpportunity.toLocaleString("en-IN"), item.priority])} priorityColumn={6} />;
}

function MobilizationCampaigns() {
  return (
    <section className="panel" id="mobilization-campaigns">
      <SectionHeader title="Mobilization Campaigns" eyebrow="Door-to-door, phone, volunteer, influencer, community, transport, and reminders" />
      <div className="turnout-card-grid">
        {turnoutIntelligenceData.campaigns.map((campaign) => (
          <article className="turnout-ops-card" key={campaign.campaign}>
            <div className="recommendation-top">
              <strong>{campaign.campaign}</strong>
              <PriorityChip value={campaign.priority} />
            </div>
            <Meter label="Coverage" value={campaign.coverage} />
            <Meter label="Impact" value={campaign.impact} />
            <p>{campaign.status} / {campaign.owner}</p>
            <b>{campaign.expectedVotes.toLocaleString("en-IN")} expected votes</b>
          </article>
        ))}
      </div>
    </section>
  );
}

function ElectionDayOperations() {
  return (
    <section className="panel" id="election-day-operations">
      <SectionHeader title="Election Day Operations" eyebrow="Booth, volunteer, transport, communication, escalation readiness" />
      <div className="turnout-card-grid">
        {turnoutIntelligenceData.electionDayOperations.map((operation) => (
          <article className="turnout-ops-card" key={operation.operation}>
            <div className="recommendation-top">
              <strong>{operation.operation}</strong>
              <PriorityChip value={operation.priority} />
            </div>
            <Meter label="Readiness" value={operation.readiness} danger={operation.readiness < 60} />
            <p>{operation.riskAlerts}</p>
            <small>{operation.owner} / {operation.status}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function TurnoutPipeline() {
  const total = turnoutIntelligenceData.pipeline[0].voters;
  return (
    <section className="panel" id="turnout-pipeline">
      <SectionHeader title="Turnout Pipeline" eyebrow="Identified, contacted, confirmed, reminded, mobilized, voted, unknown" />
      <div className="pipeline-grid turnout-pipeline-grid">
        {turnoutIntelligenceData.pipeline.map((stage) => (
          <article className="pipeline-stage" key={stage.stage}>
            <span>{stage.stage}</span>
            <strong>{stage.voters.toLocaleString("en-IN")}</strong>
            <p>{stage.expectedVotes.toLocaleString("en-IN")} expected votes</p>
            <Meter label="Pipeline share" value={stage.voters} max={total} />
          </article>
        ))}
      </div>
    </section>
  );
}

function VoteProtectionCenter() {
  return <SimpleTable id="vote-protection-center" title="Vote Protection Center" columns={["Area", "High Value Supporters", "Critical Booths", "Critical Villages", "Critical Communities", "Potential Risks", "Escalation Plan", "Priority"]} rows={turnoutIntelligenceData.voteProtection.map((item) => [item.area, item.highValueSupporters.toLocaleString("en-IN"), item.criticalBooths, item.criticalVillages, item.criticalCommunities, item.potentialRisks, item.escalationPlan, item.priority])} priorityColumn={7} />;
}

function TurnoutForecasting() {
  return (
    <section className="panel" id="turnout-forecasting">
      <SectionHeader title="Turnout Forecasting" eyebrow="Best, likely, worst, expected votes, additional possible, turnout gap" />
      <div className="forecast-grid turnout-forecast-grid">
        {turnoutIntelligenceData.forecasts.map((forecast) => (
          <article className="forecast-card" key={forecast.segment}>
            <div>
              <span>Turnout forecast</span>
              <h3>{forecast.segment}</h3>
            </div>
            <strong>{forecast.expectedVotes.toLocaleString("en-IN")}</strong>
            <p>Best {forecast.bestCase.toLocaleString("en-IN")} / Likely {forecast.likelyCase.toLocaleString("en-IN")} / Worst {forecast.worstCase.toLocaleString("en-IN")}</p>
            <small>Additional {forecast.additionalVotesPossible.toLocaleString("en-IN")} / gap {forecast.turnoutGap.toLocaleString("en-IN")}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function AiTurnoutStrategy({ queuedActions, onQueue }: { queuedActions: string[]; onQueue: (action: string) => void }) {
  return (
    <section className="panel recommendations-panel" id="ai-turnout-strategy">
      <SectionHeader title="AI Turnout Strategy" eyebrow="Villages, communities, booths, households, reminders, and expected turnout gain" />
      <div className="recommendation-list">
        {turnoutIntelligenceData.recommendations.map((item) => (
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

function TurnoutTaskCenter() {
  return <SimpleTable id="turnout-task-center" title="Turnout Task Center" columns={["Campaign", "Open", "Pending", "Overdue", "Completed", "Highest Priority Task"]} rows={turnoutIntelligenceData.tasks.map((item) => [item.campaign, item.openTasks, item.pendingTasks, item.overdueTasks, item.completedTasks, item.highestPriorityTask])} />;
}

function ElectionDayCommandPanel() {
  return (
    <section className="panel" id="election-day-command-panel">
      <SectionHeader title="Election Day Command Panel" eyebrow="Critical alerts, turnout alerts, booth alerts, volunteer alerts, village alerts" />
      <div className="turnout-alert-grid">
        {turnoutIntelligenceData.alerts.map((alert) => (
          <article className={`turnout-alert-card ${levelClass(alert.priority)}`} key={alert.alert}>
            <div className="recommendation-top">
              <span>{alert.type}</span>
              <PriorityChip value={alert.priority} />
            </div>
            <h3>{alert.alert}</h3>
            <p>{alert.owner} / {alert.status}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ActionCenter() {
  const actions = [
    ["Assign Volunteer Team", "/tasks/new?type=volunteer_team"],
    ["Create Mobilization Campaign", "/tasks/new?type=mobilization_campaign"],
    ["Create Booth Task", "/tasks/new?type=booth_task"],
    ["Create Transportation Plan", "/tasks/new?type=transportation_plan"],
    ["Schedule Follow-Up", "/events/new?type=turnout_follow_up"],
    ["Generate Turnout Report", "/reports/daily-brief/new?type=turnout_report"],
    ["Generate Election-Day Brief", "/reports/daily-brief/new?type=election_day_brief"],
    ["Generate Mobilization Strategy", "/reports/daily-brief/new?type=mobilization_strategy"]
  ];
  return (
    <section className="panel" id="turnout-actions">
      <SectionHeader title="Action Center" eyebrow="Turn turnout intelligence into field operations" />
      <div className="voter-action-grid">
        {actions.map(([label, href]) => <a className="action-panel-btn" href={href} key={label}>{label}</a>)}
      </div>
    </section>
  );
}

function TurnoutRightPanel({ queuedActions }: { queuedActions: string[] }) {
  const risks = [...turnoutIntelligenceData.heatMap].sort((a, b) => b.turnoutRisk - a.turnoutRisk).slice(0, 3);
  const opportunities = [...turnoutIntelligenceData.targets].sort((a, b) => b.expectedVotes - a.expectedVotes).slice(0, 3);
  const villages = turnoutIntelligenceData.villages.filter((item) => item.priority === "Critical" || item.priority === "High").slice(0, 4);
  const booths = turnoutIntelligenceData.booths.filter((item) => item.priority === "Critical" || item.priority === "High").slice(0, 4);
  const pendingActions = turnoutIntelligenceData.tasks.map((item) => `${item.campaign}: ${item.openTasks} open / ${item.overdueTasks} overdue`);

  return (
    <aside className="voter-intel-panel turnout-intel-panel">
      <SectionHeader title="Turnout Intel Panel" eyebrow="Always-on mobilization watch" />
      <PanelList title="Turnout Risks" items={risks.map((item) => `${item.village} ${item.booth}: risk ${item.turnoutRisk}%`)} />
      <PanelList title="Mobilization Opportunities" items={opportunities.map((item) => `${item.target}: ${item.expectedVotes.toLocaleString("en-IN")} votes`)} />
      <PanelList title="Critical Villages" items={villages.map((item) => `${item.village}: need ${item.mobilizationNeed}% / ${item.expectedVotes.toLocaleString("en-IN")} votes`)} />
      <PanelList title="Critical Booths" items={booths.map((item) => `${item.booth}: readiness ${item.boothReadiness}% / risk ${item.risk}%`)} />
      <PanelList title="Pending Actions" items={pendingActions} />
      <PanelList title="Election Day Alerts" items={turnoutIntelligenceData.alerts.map((item) => `${item.type}: ${item.alert}`)} />
      <PanelList title="Recent Changes" items={queuedActions.length ? queuedActions : ["No turnout actions queued from this session"]} />
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
      <SectionHeader title={title} eyebrow="Ranked turnout intelligence" actions={<CountPill>{rows.length} rows</CountPill>} />
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
      ) : <EmptyState title="No matching turnout intelligence" body="Adjust filters to restore this table." />}
    </section>
  );
}

function Meter({ label, value, danger, max = 100 }: { label: string; value: number; danger?: boolean; max?: number }) {
  const width = Math.min((value / max) * 100, 100);
  return (
    <div className="support-row">
      <span>{label}</span>
      <div><i className={danger ? "score-weak" : width > 65 ? "score-strong" : width > 40 ? "score-watch" : "score-weak"} style={{ width: `${width}%` }} /></div>
      <b>{Math.round(width)}%</b>
    </div>
  );
}

function valueForMode(point: TurnoutMapSignal, mode: "Turnout" | "Risk" | "Opportunity" | "Priority") {
  if (mode === "Turnout") return point.expectedTurnout;
  if (mode === "Risk") return point.turnoutRisk;
  if (mode === "Opportunity") return point.mobilizationOpportunity;
  return priorityScore(point.electionDayPriority);
}

function priorityScore(priority: Priority) {
  if (priority === "Critical") return 90;
  if (priority === "High") return 72;
  if (priority === "Medium") return 54;
  return 32;
}

function scoreLevel(value: number) {
  if (value >= 70) return "High";
  if (value >= 55) return "Medium";
  return "Low";
}

function levelClass(priority: Priority) {
  return `level-${priority.toLowerCase()}`;
}

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function labelize(value: string) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}
