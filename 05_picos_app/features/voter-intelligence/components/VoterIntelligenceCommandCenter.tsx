"use client";

import { useMemo, useState } from "react";
import { PlatformShell } from "@/features/platform/PlatformShell";
import { ConfidenceBadge } from "@/features/shared/intelligenceBadges";
import { CountPill, EmptyState, PriorityChip, SectionHeader, signed, trendClass } from "@/features/political-intelligence/components/common";
import { voterIntelligenceData } from "../data";
import type { VillageVoteSignal, VoterFilters } from "../types";

const defaultFilters: VoterFilters = {
  dateRange: "30 Days",
  village: "All",
  booth: "All",
  community: "All",
  gender: "All",
  ageGroup: "All",
  occupation: "All",
  supportStatus: "All",
  influenceLevel: "All",
  turnoutRisk: "All"
};

const filterOptions = {
  dateRange: ["Today", "7 Days", "30 Days", "Quarter"],
  village: ["All", "Sinnar Town", "Musalgaon", "Pangri", "Dubere", "Devpur", "Wavi"],
  booth: ["All", "Strong", "Weak", "Swing", "Growth", "Risk"],
  community: ["All", "Maratha", "Mali", "Vanjari", "Dhangar", "SC", "ST", "Minority", "Women", "Youth", "Farmers"],
  gender: ["All", "Women", "Men"],
  ageGroup: ["All", "18-25", "26-40", "41-60", "60+"],
  occupation: ["All", "Farmer", "Worker", "Student", "Business", "Service"],
  supportStatus: ["All", "Supporters", "Opponents", "Neutral", "Unknown", "Persuadable"],
  influenceLevel: ["All", "High", "Medium", "Low"],
  turnoutRisk: ["All", "High", "Medium", "Low"]
};

export function VoterIntelligenceCommandCenter() {
  const data = voterIntelligenceData;
  const [filters, setFilters] = useState(defaultFilters);
  const [query, setQuery] = useState("");
  const [mapMode, setMapMode] = useState<"Support" | "Opposition" | "Opportunity" | "Turnout" | "Issue" | "Community">("Opportunity");
  const [selectedVillageId, setSelectedVillageId] = useState(data.villages[0].id);
  const [assignedActions, setAssignedActions] = useState<string[]>([]);

  const filteredVillages = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    return data.villages.filter((village) => {
      if (filters.village !== "All" && village.village !== filters.village) return false;
      if (filters.booth !== "All" && village.classification !== filters.booth) return false;
      if (!normalized) return true;
      return JSON.stringify(village).toLowerCase().includes(normalized);
    });
  }, [data.villages, filters.booth, filters.village, query]);

  const selectedVillage = data.villages.find((village) => village.id === selectedVillageId) ?? data.villages[0];

  function updateFilter(key: keyof VoterFilters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <PlatformShell activeCoreModule="voter-intelligence" activeModuleSection="dashboard">
      <header className="candidate-header voter-header">
        <div>
          <span className="eyebrow">Voter strategy center</span>
          <h1>Voter Intelligence Command Center</h1>
          <p>Support, persuasion, turnout, community, village, and vote-growth intelligence.</p>
        </div>
        <label className="global-search">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search village, booth, community, influencer, issue, cluster, opportunity, risk" />
        </label>
      </header>

      <section className="voter-filter-rail" aria-label="Voter intelligence filters">
        {Object.entries(filterOptions).map(([key, options]) => (
          <label key={key}>
            <span>{labelize(key)}</span>
            <select value={filters[key as keyof VoterFilters]} onChange={(event) => updateFilter(key as keyof VoterFilters, event.target.value)}>
              {options.map((option) => (
                <option value={option} key={option}>{option}</option>
              ))}
            </select>
          </label>
        ))}
      </section>

      <main className="voter-workspace">
        <div className="voter-main">
          <section className="campaign-first-screen module-first-screen" id="overview">
            <VoterSituationRoom data={data} />
            <VillageHeatMap villages={filteredVillages} selectedVillage={selectedVillage} mapMode={mapMode} onModeChange={setMapMode} onSelect={setSelectedVillageId} />
          </section>
          <div className="workspace-grid two-column">
            <SupportDistribution distribution={data.supportDistribution} />
            <CommunitySupportCenter communities={data.communities} />
          </div>
          <TopCommunities communities={data.targetCommunities} />
          <div className="workspace-grid">
            <VillagesAttention villages={filteredVillages} />
          </div>
          <PersuasionCenter clusters={data.persuasionClusters} />
          <div className="workspace-grid two-column">
            <IssueVoteImpact issues={data.issueImpact} />
            <InfluencerImpact influencers={data.influencers} />
          </div>
          <div className="workspace-grid two-column">
            <TurnoutIntelligence turnout={data.turnout} />
            <BoothPerformance booths={data.booths} />
          </div>
          <div className="workspace-grid two-column">
            <VoteGain opportunities={data.gainOpportunities} />
            <VoteLoss risks={data.lossRisks} />
          </div>
          <AiVoterStrategy recommendations={data.recommendations} assignedActions={assignedActions} onAssign={(rec) => setAssignedActions((current) => [...current, rec])} />
          <ActionCenter />
        </div>

        <RightVoterPanel
          opportunities={data.gainOpportunities.slice(0, 3)}
          risks={data.lossRisks.slice(0, 3)}
          villages={data.villages.slice(0, 3)}
          assignedActions={assignedActions}
        />
      </main>
    </PlatformShell>
  );
}

function VoterSituationRoom({ data }: { data: typeof voterIntelligenceData }) {
  const supporters = data.supportDistribution.find((item) => item.status === "Supporters");
  const persuadable = data.supportDistribution.find((item) => item.status === "Persuadable");
  const turnoutReadiness = average(data.villages.map((village) => village.turnout));
  const supportStrength = average(data.communities.map((community) => community.support));
  const opportunity = average(data.villages.map((village) => village.opportunity));
  const riskVillages = data.villages.filter((village) => village.classification === "Risk" || village.classification === "Weak").length;
  const expectedGain = data.gainOpportunities.reduce((sum, item) => sum + item.expectedVotes, 0);
  const expectedLoss = data.lossRisks.reduce((sum, item) => sum + item.potentialVoteLoss, 0);
  const votePosition = average([supportStrength, turnoutReadiness, opportunity, 100 - Math.min(80, riskVillages * 12)]);
  const answer = votePosition >= 68 ? "Votes are moving, not secured." : "Vote engine is not safe yet.";
  const directive = expectedLoss > 0
    ? "Convert persuadable youth and farmers while containing Musalgaon, party-transition, and first-time voter turnout risks."
    : "Expand the top gain opportunities and assign village-level owners for every persuadable cluster.";
  const situationMetrics = [
    { label: "Vote Position", value: `${votePosition}%`, score: votePosition, state: "Composite voter posture", tone: "win" },
    { label: "Current Support", value: `${supporters?.value ?? 0}%`, score: supporters?.value ?? 0, state: `${supporters?.voters.toLocaleString() ?? 0} voters`, tone: "support" },
    { label: "Persuadable Voters", value: "31.7K", score: persuadable?.value ?? 0, state: "Conversion pool", tone: "coverage" },
    { label: "Turnout Readiness", value: `${turnoutReadiness}%`, score: turnoutReadiness, state: "Village turnout average", tone: "turnout" },
    { label: "Opportunity", value: `${opportunity}%`, score: opportunity, state: "Village gain climate", tone: "execution" },
    { label: "Expected Gain", value: `+${expectedGain.toLocaleString()}`, score: Math.min(100, expectedGain / 120), state: "Open vote upside", tone: "volunteer" },
    { label: "Expected Loss", value: `-${expectedLoss.toLocaleString()}`, score: Math.min(100, expectedLoss / 80), state: "Risk exposure", tone: "booth" }
  ] as const;

  return (
    <section className="situation-room module-situation-room">
      <div className="situation-room-lead">
        <div>
          <span className="eyebrow">Voter Situation Room</span>
          <h2>{answer}</h2>
          <div className="situation-status-strip" aria-label="Voter intelligence status">
            <span>{riskVillages} risk/weak villages</span>
            <span>{data.gainOpportunities.length} gain paths</span>
            <span>{data.lossRisks.length} loss risks</span>
          </div>
        </div>
        <p>The voter dashboard must show whether support can convert into votes: current support, persuadable pool, turnout readiness, expected gain, and expected loss.</p>
        <div className="situation-decision">
          <span>What should Uday do next?</span>
          <strong>{directive}</strong>
        </div>
        <div className="situation-directives">
          <a href="#village-attention">Fix villages</a>
          <a href="#persuasion">Convert voters</a>
          <a href="#turnout">Secure turnout</a>
        </div>
      </div>
      <div className="situation-metric-grid">
        {situationMetrics.map((metric, index) => (
          <article className={`situation-metric tone-${metric.tone} ${index === 0 ? "is-primary" : ""}`} key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <small>{metric.state}</small>
            <i><em style={{ width: `${metric.score}%` }} /></i>
          </article>
        ))}
      </div>
      <article className="module-risk-note">
        <span>Vote command priority</span>
        <strong>{data.recommendations[0].recommendation}</strong>
        <p>{data.recommendations[0].reason}</p>
      </article>
    </section>
  );
}

function VoterPriorityCommand({ data }: { data: typeof voterIntelligenceData }) {
  const topOpp = data.gainOpportunities[0];
  const topRisk = data.lossRisks[0];
  return (
    <section className="command-priority-grid voter-priority-grid">
      <article className="priority-hero political-risk">
        <span className="eyebrow">Where Votes Can Be Gained</span>
        <h2>{topOpp.opportunity}</h2>
        <strong>{topOpp.expectedVotes}</strong>
        <p>{topOpp.community} / {topOpp.village} / owner {topOpp.owner}</p>
      </article>
      <article className="priority-hero community-sentiment">
        <span className="eyebrow">Top Community</span>
        <strong>Youth</strong>
        <p>Highest opportunity score and strongest support trend.</p>
      </article>
      <article className="priority-hero opponent-movement">
        <span className="eyebrow">Vote Loss Risk</span>
        <h2>{topRisk.risk}</h2>
        <PriorityChip value={topRisk.severity} />
        <p>{topRisk.mitigationPlan}</p>
      </article>
      <article className="priority-hero election-readiness">
        <span className="eyebrow">Persuadable Voters</span>
        <strong>31.7K</strong>
        <p>Best next target: MIDC youth, Pangri farmers, Dubere women.</p>
      </article>
      <article className="priority-hero ai-recommendation">
        <span className="eyebrow">AI Voter Strategy</span>
        <h2>{data.recommendations[0].recommendation}</h2>
        <p>{data.recommendations[0].reason}</p>
      </article>
    </section>
  );
}

function VoterOverview({ metrics }: { metrics: typeof voterIntelligenceData.metrics }) {
  return (
    <section className="overview-bar" id="overview">
      {metrics.map((metric) => (
        <article className="metric-cell" key={metric.label}>
          <div className="metric-label">{metric.label}</div>
          <div className="metric-value-row">
            <strong>{metric.value}</strong>
            <span className={`trend-chip ${trendClass(metric.trend)}`}>{metric.trend}</span>
          </div>
          <div className="metric-meta">
            <span>Prev {metric.previous}</span>
            <span>{signed(metric.change)}%</span>
          </div>
          <ConfidenceBadge score={metric.confidence} />
        </article>
      ))}
    </section>
  );
}

function SupportDistribution({ distribution }: { distribution: typeof voterIntelligenceData.supportDistribution }) {
  let offset = 0;
  const totalShare = distribution.reduce((sum, item) => sum + item.value, 0);
  const segments = distribution.map((item) => {
    const normalizedValue = totalShare ? (item.value / totalShare) * 100 : 0;
    const segment = `${normalizedValue} ${100 - normalizedValue}`;
    const dashOffset = -offset;
    offset += normalizedValue;
    return { ...item, segment, dashOffset };
  });
  return (
    <section className="panel" id="support-distribution">
      <SectionHeader title="Support Distribution" eyebrow="Supporters, opponents, neutral, unknown, persuadable" />
      <div className="support-donut-layout">
        <svg className="support-donut" viewBox="0 0 42 42">
          {segments.map((segment, index) => (
            <circle
              cx="21"
              cy="21"
              fill="transparent"
              key={segment.status}
              r="15.9"
              stroke={`var(--donut-${index + 1})`}
              strokeDasharray={segment.segment}
              strokeDashoffset={segment.dashOffset}
              strokeWidth="5"
            />
          ))}
        </svg>
        <div className="support-breakdown">
          {distribution.map((item, index) => (
            <article key={item.status}>
              <span style={{ background: `var(--donut-${index + 1})` }} />
              <strong>{item.status}</strong>
              <b>{item.value}%</b>
              <small>{item.voters.toLocaleString()} voters</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CommunitySupportCenter({ communities }: { communities: typeof voterIntelligenceData.communities }) {
  return (
    <section className="panel" id="community-support">
      <SectionHeader title="Community Support Command Center" eyebrow="Support, opposition, neutral, influence, opportunity, risk" />
      <div className="voter-community-grid">
        {communities.map((community) => (
          <article className="voter-community-card" key={community.community}>
            <div>
              <strong>{community.community}</strong>
              <span className={`trend-chip ${trendClass(community.trend)}`}>{community.trend}</span>
            </div>
            <Meter label="Support" value={community.support} />
            <Meter label="Oppose" value={community.opposition} danger />
            <Meter label="Opportunity" value={community.opportunity} />
            <Meter label="Risk" value={community.risk} danger />
            <ConfidenceBadge score={community.confidence} />
          </article>
        ))}
      </div>
    </section>
  );
}

function TopCommunities({ communities }: { communities: typeof voterIntelligenceData.targetCommunities }) {
  return <SimpleTable id="target-communities" title="Top Communities To Target" columns={["Community", "Potential Vote Gain", "Current Support", "Target Support", "Priority", "Recommended Action", "Owner"]} rows={communities.map((item) => [item.community, item.potentialVoteGain, `${item.currentSupport}%`, `${item.targetSupport}%`, item.priority, item.recommendedAction, item.owner])} />;
}

function VillageHeatMap({ villages, selectedVillage, mapMode, onModeChange, onSelect }: { villages: VillageVoteSignal[]; selectedVillage: VillageVoteSignal; mapMode: "Support" | "Opposition" | "Opportunity" | "Turnout" | "Issue" | "Community"; onModeChange: (mode: "Support" | "Opposition" | "Opportunity" | "Turnout" | "Issue" | "Community") => void; onSelect: (id: string) => void }) {
  const modes: Array<typeof mapMode> = ["Support", "Opposition", "Opportunity", "Turnout", "Issue", "Community"];
  return (
    <section className="panel geo-panel" id="village-map">
      <SectionHeader title="Village Intelligence Heat Map" eyebrow="Strong, weak, swing, growth, risk villages" />
      <div className="map-toolbar">
        <div className="segmented-control">
          {modes.map((mode) => <button className={`seg-btn ${mode === mapMode ? "is-active" : ""}`} onClick={() => onModeChange(mode)} type="button" key={mode}>{mode}</button>)}
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
          <button className={`map-marker support-${village.classification.toLowerCase()} ${selectedVillage.id === village.id ? "is-selected" : ""}`} key={village.id} onClick={() => onSelect(village.id)} style={{ left: `${village.x}%`, top: `${village.y}%`, width: 14 + valueForMode(village, mapMode) / 8, height: 14 + valueForMode(village, mapMode) / 8 }} type="button">
            <span>{village.village}</span>
          </button>
        ))}
      </div>
      <div className="map-detail">
        <span>{selectedVillage.classification}</span>
        <h3>{selectedVillage.village}</h3>
        <dl>
          <div><dt>Support</dt><dd>{selectedVillage.currentSupport}%</dd></div>
          <div><dt>Potential Gain</dt><dd>{selectedVillage.potentialGain}</dd></div>
          <div><dt>Issue</dt><dd>{selectedVillage.majorIssue}</dd></div>
          <div><dt>Impact</dt><dd>{selectedVillage.expectedVoteImpact}</dd></div>
        </dl>
      </div>
    </section>
  );
}

function VillagesAttention({ villages }: { villages: VillageVoteSignal[] }) {
  return <SimpleTable id="village-attention" title="Top Villages Requiring Attention" columns={["Village", "Current Support", "Potential Gain", "Major Issue", "Influencer", "Priority", "Recommended Action", "Expected Vote Impact"]} rows={villages.map((item) => [item.village, `${item.currentSupport}%`, item.potentialGain, item.majorIssue, item.influencer, item.priority, item.recommendedAction, item.expectedVoteImpact])} />;
}

function PersuasionCenter({ clusters }: { clusters: typeof voterIntelligenceData.persuasionClusters }) {
  return <SimpleTable id="persuasion" title="Persuasion Opportunity Center" columns={["Village", "Community", "Current Support", "Potential Gain", "Issue", "Recommended Intervention", "Expected Votes", "Confidence"]} rows={clusters.map((item) => [item.village, item.community, `${item.currentSupport}%`, item.potentialGain, item.issue, item.recommendedIntervention, item.expectedVotes, `${item.confidence}%`])} />;
}

function IssueVoteImpact({ issues }: { issues: typeof voterIntelligenceData.issueImpact }) {
  return <SimpleTable id="issue-impact" title="Issue To Vote Impact Analysis" columns={["Issue", "Affected Voters", "Affected Villages", "Affected Communities", "Political Impact", "Opportunity", "Priority"]} rows={issues.map((item) => [item.issue, item.affectedVoters, item.affectedVillages, item.affectedCommunities, item.politicalImpact, item.opportunity, item.priority])} />;
}

function InfluencerImpact({ influencers }: { influencers: typeof voterIntelligenceData.influencers }) {
  return <SimpleTable id="influencers" title="Influencer Impact" columns={["Influencer", "Influenced Voters", "Influence Score", "Support Status", "Relationship Strength", "Political Alignment", "Potential Vote Impact"]} rows={influencers.map((item) => [item.influencer, item.influencedVoters, item.influenceScore, item.supportStatus, item.relationshipStrength, item.politicalAlignment, item.potentialVoteImpact])} />;
}

function TurnoutIntelligence({ turnout }: { turnout: typeof voterIntelligenceData.turnout }) {
  return (
    <section className="panel" id="turnout">
      <SectionHeader title="Turnout Intelligence" eyebrow="Likely, unlikely, first-time, senior, women voters" />
      <div className="turnout-grid">
        {turnout.map((item) => (
          <article className="turnout-card" key={item.label}>
            <strong>{item.value.toLocaleString()}</strong>
            <span>{item.label}</span>
            <PriorityChip value={item.mobilizationPriority} />
            <Meter label="Risk" value={item.turnoutRiskScore} danger />
          </article>
        ))}
      </div>
    </section>
  );
}

function BoothPerformance({ booths }: { booths: typeof voterIntelligenceData.booths }) {
  return <SimpleTable id="booths" title="Booth Performance Overview" columns={["Classification", "Current Support", "Expected Support", "Potential Gain", "Booth Priority"]} rows={booths.map((item) => [item.classification, `${item.currentSupport}%`, `${item.expectedSupport}%`, item.potentialGain, item.boothPriority])} />;
}

function VoteGain({ opportunities }: { opportunities: typeof voterIntelligenceData.gainOpportunities }) {
  return <SimpleTable id="vote-gain" title="Vote Gain Opportunities" columns={["Opportunity", "Expected Votes", "Community", "Village", "Priority", "Owner", "Status", "Target Date"]} rows={opportunities.map((item) => [item.opportunity, item.expectedVotes, item.community, item.village, item.priority, item.owner, item.status, item.targetDate])} />;
}

function VoteLoss({ risks }: { risks: typeof voterIntelligenceData.lossRisks }) {
  return <SimpleTable id="vote-loss" title="Vote Loss Risks" columns={["Risk", "Potential Vote Loss", "Affected Area", "Community", "Severity", "Owner", "Mitigation Plan", "Status"]} rows={risks.map((item) => [item.risk, item.potentialVoteLoss, item.affectedArea, item.community, item.severity, item.owner, item.mitigationPlan, item.status])} />;
}

function AiVoterStrategy({ recommendations, assignedActions, onAssign }: { recommendations: typeof voterIntelligenceData.recommendations; assignedActions: string[]; onAssign: (rec: string) => void }) {
  return (
    <section className="panel recommendations-panel" id="ai-strategy">
      <SectionHeader title="AI Voter Strategy" eyebrow="What should Uday Sangle do this week?" />
      <div className="recommendation-list">
        {recommendations.map((item) => (
          <article className="recommendation-card level-high" key={item.recommendation}>
            <div className="recommendation-top">
              <ConfidenceBadge score={item.confidence} />
              <a className="action-btn" href={`/tasks/new?title=${encodeURIComponent(item.actionLabel)}`} onClick={() => onAssign(item.recommendation)}>{assignedActions.includes(item.recommendation) ? "Queued" : item.actionLabel}</a>
            </div>
            <h3>{item.recommendation}</h3>
            <p><b>Reason:</b> {item.reason}</p>
            <p><b>Expected vote impact:</b> {item.expectedVoteImpact}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ActionCenter() {
  const actions = [
    ["Create Outreach Campaign", "/tasks/new?type=outreach"],
    ["Create Village Visit", "/events/new?type=village_visit"],
    ["Assign Community Team", "/tasks/new?type=community_team"],
    ["Create Listening Session", "/events/new?type=listening_session"],
    ["Create Volunteer Task", "/tasks/new?type=volunteer"],
    ["Create Issue Resolution Plan", "/issues/new"],
    ["Generate Voter Report", "/reports/daily-brief/new?type=voter"],
    ["Generate Community Report", "/reports/daily-brief/new?type=community"],
    ["Generate Village Report", "/reports/daily-brief/new?type=village"]
  ];
  return (
    <section className="panel" id="actions">
      <SectionHeader title="Action Center" eyebrow="Turn voter intelligence into field action" />
      <div className="voter-action-grid">
        {actions.map(([label, href]) => <a className="action-panel-btn" href={href} key={label}>{label}</a>)}
      </div>
    </section>
  );
}

function RightVoterPanel({ opportunities, risks, villages, assignedActions }: { opportunities: typeof voterIntelligenceData.gainOpportunities; risks: typeof voterIntelligenceData.lossRisks; villages: typeof voterIntelligenceData.villages; assignedActions: string[] }) {
  return (
    <aside className="voter-intel-panel">
      <SectionHeader title="Voter Intel Panel" eyebrow="Always-on vote movement watch" />
      <PanelList title="Top Vote Opportunities" items={opportunities.map((item) => `${item.expectedVotes} votes / ${item.opportunity}`)} />
      <PanelList title="Top Vote Risks" items={risks.map((item) => `${item.potentialVoteLoss} loss / ${item.risk}`)} />
      <PanelList title="Upcoming Visits" items={["MIDC youth listening", "Pangri irrigation walk-through", "Dubere SHG forum"]} />
      <PanelList title="Pending Actions" items={assignedActions.length ? assignedActions : ["No actions queued from this session"]} />
      <PanelList title="Community Alerts" items={["Youth opportunity rising", "SC trend needs review", "Farmers require issue ownership"]} />
      <PanelList title="Village Alerts" items={villages.map((village) => `${village.village}: ${village.classification}`)} />
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

function SimpleTable({ id, title, columns, rows }: { id: string; title: string; columns: string[]; rows: Array<Array<string | number>> }) {
  return (
    <section className="panel table-panel" id={id}>
      <SectionHeader title={title} eyebrow="Ranked intelligence" actions={<CountPill>{rows.length} rows</CountPill>} />
      {rows.length ? (
        <div className="table-scroll">
          <table>
            <thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
            <tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={`${index}-${cellIndex}`}>{cellIndex === 4 && String(cell).match(/Critical|High|Medium|Low/) ? <PriorityChip value={String(cell)} /> : cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      ) : <EmptyState title="No matching voter intelligence" body="Adjust filters to restore this table." />}
    </section>
  );
}

function Meter({ label, value, danger }: { label: string; value: number; danger?: boolean }) {
  return (
    <div className="support-row">
      <span>{label}</span>
      <div><i className={danger ? "score-weak" : value > 65 ? "score-strong" : "score-watch"} style={{ width: `${value}%` }} /></div>
      <b>{value}</b>
    </div>
  );
}

function valueForMode(village: VillageVoteSignal, mode: string) {
  if (mode === "Support") return village.currentSupport;
  if (mode === "Opposition") return village.opposition;
  if (mode === "Opportunity") return village.opportunity;
  if (mode === "Turnout") return village.turnout;
  if (mode === "Issue") return village.expectedVoteImpact / 25;
  return village.potentialGain / 45;
}

function labelize(value: string) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}

function average(values: number[]) {
  const usable = values.filter((value) => Number.isFinite(value));
  if (!usable.length) return 0;
  return Math.round(usable.reduce((sum, value) => sum + value, 0) / usable.length);
}
