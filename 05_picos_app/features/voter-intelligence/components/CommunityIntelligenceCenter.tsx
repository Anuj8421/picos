"use client";

import { useMemo, useState } from "react";
import { PlatformShell } from "@/features/platform/PlatformShell";
import { ConfidenceBadge } from "@/features/shared/intelligenceBadges";
import { CountPill, EmptyState, PriorityChip, SectionHeader, signed, trendClass } from "@/features/political-intelligence/components/common";
import { communityIntelligenceData } from "../community-data";
import type {
  CommunityCommandRecord,
  CommunityComparisonProfile,
  CommunityFilters,
  CommunityGeoSignal,
  CommunityNetworkEdge,
  CommunityNetworkNode,
  CommunitySentiment
} from "../types";

const defaultFilters: CommunityFilters = {
  community: "All",
  village: "All",
  booth: "All",
  issue: "All",
  sentiment: "All",
  supportLevel: "All",
  influenceScore: "All",
  riskLevel: "All",
  opportunityLevel: "All",
  dateRange: "30 Days"
};

const filterOptions = {
  community: ["All", "Maratha", "Mali", "Vanjari", "Dhangar", "SC", "ST", "Minority", "Women", "Youth", "Farmers", "Business Owners"],
  village: ["All", "Sinnar Town", "Musalgaon", "Pangri", "Dubere", "Devpur", "Wavi"],
  booth: ["All", "booth-midc-001", "booth-pangri-001", "booth-musalgaon-001", "booth-dubere-001", "booth-wavi-001", "booth-devpur-001"],
  issue: ["All", "Employment", "Irrigation", "Water", "Reservation", "Agriculture", "Representation", "Trust-building"],
  sentiment: ["All", "Positive", "Neutral", "Negative"],
  supportLevel: ["All", "Strong", "Competitive", "Weak"],
  influenceScore: ["All", "High", "Medium", "Low"],
  riskLevel: ["All", "Critical", "High", "Medium", "Low"],
  opportunityLevel: ["All", "Critical", "High", "Medium", "Low"],
  dateRange: ["Today", "7 Days", "30 Days", "Quarter", "Year"]
};

const supportMatrixColumns = ["Support", "Opposition", "Neutral", "Persuadable", "Turnout", "Influence"] as const;

export function CommunityIntelligenceCenter() {
  const data = communityIntelligenceData;
  const [filters, setFilters] = useState(defaultFilters);
  const [query, setQuery] = useState("");
  const [selectedCommunityId, setSelectedCommunityId] = useState(data.command[0].id);
  const [sentimentMode, setSentimentMode] = useState<"Monthly" | "Quarterly" | "Yearly">("Monthly");
  const [mapLayer, setMapLayer] = useState<"Support" | "Sentiment" | "Influence" | "Issues">("Support");
  const [compareA, setCompareA] = useState("Youth");
  const [compareB, setCompareB] = useState("Farmers");
  const [queuedActions, setQueuedActions] = useState<string[]>([]);

  const filteredCommunities = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return data.command.filter((community) => {
      if (filters.community !== "All" && community.community !== filters.community) return false;
      if (filters.sentiment !== "All" && community.sentiment !== filters.sentiment) return false;
      if (filters.supportLevel !== "All" && supportLevel(community.currentSupport) !== filters.supportLevel) return false;
      if (filters.influenceScore !== "All" && scoreLevel(community.influence) !== filters.influenceScore) return false;
      if (filters.riskLevel !== "All" && priorityFromScore(community.risk) !== filters.riskLevel) return false;
      if (filters.opportunityLevel !== "All" && priorityFromScore(community.opportunity) !== filters.opportunityLevel) return false;
      if (!normalized) return true;
      return JSON.stringify(community).toLowerCase().includes(normalized);
    });
  }, [data.command, filters.community, filters.influenceScore, filters.opportunityLevel, filters.riskLevel, filters.sentiment, filters.supportLevel, query]);

  const filteredGeo = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return data.geo.filter((zone) => {
      if (filters.community !== "All" && zone.community !== filters.community) return false;
      if (filters.village !== "All" && zone.village !== filters.village) return false;
      if (filters.booth !== "All" && zone.booth !== filters.booth) return false;
      if (filters.issue !== "All" && zone.issue !== filters.issue) return false;
      if (filters.sentiment !== "All" && zone.sentiment !== filters.sentiment) return false;
      if (!normalized) return true;
      return JSON.stringify(zone).toLowerCase().includes(normalized);
    });
  }, [data.geo, filters.booth, filters.community, filters.issue, filters.sentiment, filters.village, query]);

  const selectedCommunity = data.command.find((community) => community.id === selectedCommunityId) ?? data.command[0];
  const comparisonA = data.comparisons.find((item) => item.community === compareA) ?? data.comparisons[0];
  const comparisonB = data.comparisons.find((item) => item.community === compareB) ?? data.comparisons[1];

  function updateFilter(key: keyof CommunityFilters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <PlatformShell activeCoreModule="voter-intelligence" activeModuleSection="community-intelligence">
      <header className="candidate-header voter-header">
        <div>
          <span className="eyebrow">Voter Intelligence / Community Intelligence</span>
          <h1>Community Intelligence Center</h1>
          <p>Political, social, issue, sentiment, and influence intelligence by community.</p>
        </div>
        <label className="global-search">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search community, influencer, leader, issue, village, organization, event" />
        </label>
      </header>

      <section className="voter-filter-rail" aria-label="Community intelligence filters">
        {Object.entries(filterOptions).map(([key, options]) => (
          <label key={key}>
            <span>{labelize(key)}</span>
            <select value={filters[key as keyof CommunityFilters]} onChange={(event) => updateFilter(key as keyof CommunityFilters, event.target.value)}>
              {options.map((option) => <option value={option} key={option}>{option}</option>)}
            </select>
          </label>
        ))}
      </section>

      <main className="voter-workspace community-workspace">
        <div className="voter-main">
          <CommunityPriorityCommand data={data} />
          <CommunityOverview metrics={data.overview} />
          <CommunityCommandTable communities={filteredCommunities} selectedCommunityId={selectedCommunity.id} onSelect={setSelectedCommunityId} />
          <div className="workspace-grid two-column">
            <CommunitySupportMatrix communities={filteredCommunities} selectedCommunity={selectedCommunity} onSelect={setSelectedCommunityId} />
            <CommunitySentimentEngine communities={filteredCommunities} trends={data.trends} mode={sentimentMode} onModeChange={setSentimentMode} />
          </div>
          <div className="workspace-grid two-column">
            <CommunityIssueIntelligence issues={data.issues} filters={filters} />
            <CommunityInfluencerMap influencers={data.influencers} filters={filters} />
          </div>
          <div className="workspace-grid two-column visual-grid">
            <CommunityGeographicMap zones={filteredGeo} layer={mapLayer} onLayerChange={setMapLayer} />
            <CommunitySupportTrends trends={data.trends} />
          </div>
          <div className="workspace-grid two-column">
            <CommunityRiskAnalysis risks={data.risks} />
            <CommunityOpportunityAnalysis opportunities={data.opportunities} />
          </div>
          <CommunityEngagementTracker engagement={data.engagement} />
          <div className="workspace-grid two-column visual-grid">
            <CommunityLeadershipNetwork nodes={data.networkNodes} edges={data.networkEdges} />
            <CommunityComparisonMode profiles={data.comparisons} compareA={comparisonA} compareB={comparisonB} setCompareA={setCompareA} setCompareB={setCompareB} />
          </div>
          <CommunityActionCenter />
          <AiCommunityStrategy recommendations={data.recommendations} queuedActions={queuedActions} onQueue={(item) => setQueuedActions((current) => [...current, item])} />
        </div>

        <CommunityRightPanel
          risks={data.risks.slice(0, 3)}
          opportunities={data.opportunities.slice(0, 3)}
          influencers={data.influencers.slice(0, 3)}
          trends={data.trends.slice(0, 4)}
          engagement={data.engagement.slice(0, 3)}
          queuedActions={queuedActions}
        />
      </main>
    </PlatformShell>
  );
}

function CommunityPriorityCommand({ data }: { data: typeof communityIntelligenceData }) {
  const topOpportunity = data.opportunities[0];
  const topRisk = data.risks[0];
  const topInfluencer = data.influencers[1];
  return (
    <section className="command-priority-grid voter-priority-grid community-priority-grid">
      <article className="priority-hero political-risk">
        <span className="eyebrow">Focus Community Next</span>
        <h2>{topOpportunity.community}</h2>
        <strong>{topOpportunity.expectedVoteGain}</strong>
        <p>{topOpportunity.opportunity} / owner {topOpportunity.owner}</p>
      </article>
      <article className="priority-hero community-sentiment">
        <span className="eyebrow">Sentiment Movement</span>
        <strong>Youth</strong>
        <p>Highest monthly support movement and clearest issue ownership path.</p>
      </article>
      <article className="priority-hero opponent-movement">
        <span className="eyebrow">Community Risk</span>
        <h2>{topRisk.community}</h2>
        <PriorityChip value={topRisk.severity} />
        <p>{topRisk.risk}</p>
      </article>
      <article className="priority-hero election-readiness">
        <span className="eyebrow">Influencer Alert</span>
        <h2>{topInfluencer.name}</h2>
        <p>{topInfluencer.community} / {topInfluencer.alignment} / reach {topInfluencer.reach.toLocaleString()}</p>
      </article>
      <article className="priority-hero ai-recommendation">
        <span className="eyebrow">AI Community Strategy</span>
        <h2>{data.recommendations[0].recommendation}</h2>
        <p>{data.recommendations[0].reason}</p>
      </article>
    </section>
  );
}

function CommunityOverview({ metrics }: { metrics: typeof communityIntelligenceData.overview }) {
  return (
    <section className="overview-bar" id="community-overview">
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

function CommunityCommandTable({ communities, selectedCommunityId, onSelect }: { communities: CommunityCommandRecord[]; selectedCommunityId: string; onSelect: (id: string) => void }) {
  return (
    <section className="panel table-panel" id="community-command-table">
      <SectionHeader title="Community Command Table" eyebrow="Political support, sentiment, influence, risk, opportunity" actions={<CountPill>{communities.length} communities</CountPill>} />
      {communities.length ? (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                {["Community", "Population Estimate", "Estimated Voters", "Current Support", "Sentiment", "Trend", "Influence", "Risk", "Opportunity", "Confidence"].map((column) => <th key={column}>{column}</th>)}
              </tr>
            </thead>
            <tbody>
              {communities.map((community) => (
                <tr className={selectedCommunityId === community.id ? "is-selected-row" : ""} key={community.id} onClick={() => onSelect(community.id)}>
                  <td><button className="table-link-btn" type="button">{community.community}</button></td>
                  <td>{community.populationEstimate.toLocaleString()}</td>
                  <td>{community.estimatedVoters.toLocaleString()}</td>
                  <td>{community.currentSupport}%</td>
                  <td><span className={`sentiment-pill sentiment-${community.sentiment.toLowerCase()}`}>{community.sentiment}</span></td>
                  <td><span className={`trend-chip ${trendClass(community.trend)}`}>{community.trend}</span></td>
                  <td>{community.influence}</td>
                  <td>{community.risk}</td>
                  <td>{community.opportunity}</td>
                  <td><ConfidenceBadge score={community.confidence} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <EmptyState title="No community records match filters" body="Adjust community, sentiment, risk, opportunity, or search filters." />}
    </section>
  );
}

function CommunitySupportMatrix({ communities, selectedCommunity, onSelect }: { communities: CommunityCommandRecord[]; selectedCommunity: CommunityCommandRecord; onSelect: (id: string) => void }) {
  return (
    <section className="panel" id="community-support-matrix">
      <SectionHeader title="Community Support Matrix" eyebrow="Support, opposition, neutral, persuadable, turnout, influence" />
      <div className="community-matrix">
        <div className="community-matrix-head" />
        {supportMatrixColumns.map((column) => <strong key={column}>{column}</strong>)}
        {communities.map((community) => (
          <div className="community-matrix-row" key={community.id}>
            <button className={selectedCommunity.id === community.id ? "is-active" : ""} onClick={() => onSelect(community.id)} type="button">{community.community}</button>
            {supportMatrixColumns.map((column) => {
              const value = matrixValue(community, column);
              return <span className={heatClass(value)} key={`${community.id}-${column}`}>{value}</span>;
            })}
          </div>
        ))}
      </div>
      <div className="map-detail compact-detail">
        <span>{selectedCommunity.sentiment} sentiment</span>
        <h3>{selectedCommunity.community}</h3>
        <dl>
          <div><dt>Support</dt><dd>{selectedCommunity.currentSupport}%</dd></div>
          <div><dt>Persuadable</dt><dd>{selectedCommunity.persuadable}%</dd></div>
          <div><dt>Risk</dt><dd>{selectedCommunity.risk}</dd></div>
          <div><dt>Opportunity</dt><dd>{selectedCommunity.opportunity}</dd></div>
        </dl>
      </div>
    </section>
  );
}

function CommunitySentimentEngine({ communities, trends, mode, onModeChange }: { communities: CommunityCommandRecord[]; trends: typeof communityIntelligenceData.trends; mode: "Monthly" | "Quarterly" | "Yearly"; onModeChange: (mode: "Monthly" | "Quarterly" | "Yearly") => void }) {
  const sentimentCounts = ["Positive", "Neutral", "Negative"].map((sentiment) => ({
    sentiment,
    count: communities.filter((community) => community.sentiment === sentiment).length
  }));
  const topTrends = trends.slice(0, 5);
  return (
    <section className="panel" id="community-sentiment-engine">
      <SectionHeader title="Community Sentiment Engine" eyebrow="Monthly, quarterly, yearly movement" actions={
        <div className="segmented-control">
          {(["Monthly", "Quarterly", "Yearly"] as const).map((item) => <button className={`seg-btn ${mode === item ? "is-active" : ""}`} onClick={() => onModeChange(item)} type="button" key={item}>{item}</button>)}
        </div>
      } />
      <div className="sentiment-engine-grid">
        {sentimentCounts.map((item) => (
          <article className={`sentiment-tile sentiment-${item.sentiment.toLowerCase()}`} key={item.sentiment}>
            <strong>{item.count}</strong>
            <span>{item.sentiment}</span>
          </article>
        ))}
      </div>
      <div className="community-trend-list">
        {topTrends.map((trend) => {
          const movement = mode === "Monthly" ? trend.monthly : mode === "Quarterly" ? trend.quarterly : trend.yearly;
          return (
            <article key={trend.community}>
              <div>
                <strong>{trend.community}</strong>
                <span>{signed(movement)}%</span>
              </div>
              <div className="sentiment-bar"><span className={movement >= 0 ? "score-strong" : "score-weak"} style={{ width: `${Math.min(Math.abs(movement) * 5, 100)}%` }} /></div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function CommunityIssueIntelligence({ issues, filters }: { issues: typeof communityIntelligenceData.issues; filters: CommunityFilters }) {
  const rows = issues.filter((issue) => filters.community === "All" || issue.community === filters.community);
  return <SimpleTable id="community-issues" title="Community Issue Intelligence" columns={["Community", "Top Issues", "Severity", "Affected Population", "Political Impact", "Opportunity Score", "Owner"]} rows={rows.map((item) => [item.community, item.topIssues.join(", "), item.severity, item.affectedPopulation, item.politicalImpact, item.opportunityScore, item.owner])} priorityColumn={2} />;
}

function CommunityInfluencerMap({ influencers, filters }: { influencers: typeof communityIntelligenceData.influencers; filters: CommunityFilters }) {
  const rows = influencers.filter((influencer) => filters.community === "All" || influencer.community === filters.community);
  return <SimpleTable id="community-influencers" title="Community Influencer Map" columns={["Influencer", "Community", "Category", "Influence Score", "Reach", "Alignment", "Relationship Strength", "Village"]} rows={rows.map((item) => [item.name, item.community, item.category, item.influenceScore, item.reach, item.alignment, item.relationshipStrength, item.village])} />;
}

function CommunityGeographicMap({ zones, layer, onLayerChange }: { zones: CommunityGeoSignal[]; layer: "Support" | "Sentiment" | "Influence" | "Issues"; onLayerChange: (layer: "Support" | "Sentiment" | "Influence" | "Issues") => void }) {
  const selected = zones[0];
  return (
    <section className="panel geo-panel" id="community-geographic-map">
      <SectionHeader title="Community Geographic Map" eyebrow="Village, booth, influence zones, issue layers" />
      <div className="map-toolbar">
        <div className="segmented-control">
          {(["Support", "Sentiment", "Influence", "Issues"] as const).map((item) => <button className={`seg-btn ${layer === item ? "is-active" : ""}`} onClick={() => onLayerChange(item)} type="button" key={item}>{item}</button>)}
        </div>
      </div>
      <div className="map-stage">
        <svg className="constituency-map" viewBox="0 0 100 100">
          <path d="M16,18 L48,9 L76,16 L91,39 L83,72 L61,91 L31,86 L10,62 L7,35 Z" />
          <path d="M29,22 L52,18 L73,28 L77,50 L65,68 L43,75 L25,61 L19,40 Z" />
          <path d="M50,12 L51,89" />
          <path d="M13,58 L88,40" />
        </svg>
        {zones.map((zone) => (
          <button className={`map-marker community-map-marker sentiment-${zone.sentiment.toLowerCase()}`} key={zone.id} style={{ left: `${zone.x}%`, top: `${zone.y}%`, width: 14 + zone.influence / 8, height: 14 + zone.influence / 8 }} type="button">
            <span>{zone.community} / {zone.village}</span>
          </button>
        ))}
      </div>
      {selected ? (
        <div className="map-detail">
          <span>{layer} layer</span>
          <h3>{selected.community} in {selected.village}</h3>
          <dl>
            <div><dt>Booth</dt><dd>{selected.booth}</dd></div>
            <div><dt>Support</dt><dd>{selected.support}%</dd></div>
            <div><dt>Influence</dt><dd>{selected.influence}</dd></div>
            <div><dt>Issue</dt><dd>{selected.issue}</dd></div>
          </dl>
        </div>
      ) : <EmptyState title="No mapped community zones" body="Adjust filters to restore the geographic layer." />}
    </section>
  );
}

function CommunitySupportTrends({ trends }: { trends: typeof communityIntelligenceData.trends }) {
  return (
    <section className="panel" id="community-support-trends">
      <SectionHeader title="Community Support Trends" eyebrow="Support movement over time" />
      <div className="support-trend-grid">
        {trends.map((trend) => (
          <article className="support-trend-card" key={trend.community}>
            <div>
              <strong>{trend.community}</strong>
              <span>{trend.currentSupport}% support</span>
            </div>
            <div className="trend-columns">
              <span style={{ height: `${Math.max(12, Math.abs(trend.monthly) * 5)}%` }} className={trend.monthly >= 0 ? "score-strong" : "score-weak"} />
              <span style={{ height: `${Math.max(12, Math.abs(trend.quarterly) * 4)}%` }} className={trend.quarterly >= 0 ? "score-strong" : "score-weak"} />
              <span style={{ height: `${Math.max(12, Math.abs(trend.yearly) * 3)}%` }} className={trend.yearly >= 0 ? "score-strong" : "score-weak"} />
            </div>
            <small>M {signed(trend.monthly)} / Q {signed(trend.quarterly)} / Y {signed(trend.yearly)}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function CommunityRiskAnalysis({ risks }: { risks: typeof communityIntelligenceData.risks }) {
  return <SimpleTable id="community-risks" title="Community Risk Analysis" columns={["Risk", "Community", "Probability", "Impact", "Severity", "Owner", "Status"]} rows={risks.map((item) => [item.risk, item.community, item.probability, item.impact, item.severity, item.owner, item.status])} priorityColumn={4} />;
}

function CommunityOpportunityAnalysis({ opportunities }: { opportunities: typeof communityIntelligenceData.opportunities }) {
  return <SimpleTable id="community-opportunities" title="Community Opportunity Analysis" columns={["Opportunity", "Community", "Expected Vote Gain", "Priority", "Owner", "Status"]} rows={opportunities.map((item) => [item.opportunity, item.community, item.expectedVoteGain, item.priority, item.owner, item.status])} priorityColumn={3} />;
}

function CommunityEngagementTracker({ engagement }: { engagement: typeof communityIntelligenceData.engagement }) {
  return <SimpleTable id="community-engagement" title="Community Engagement Tracker" columns={["Community", "Meetings", "Visits", "Listening Sessions", "Events", "Outreach Campaigns", "Volunteer Activity", "Next Action"]} rows={engagement.map((item) => [item.community, item.meetings, item.visits, item.listeningSessions, item.events, item.outreachCampaigns, item.volunteerActivity, item.nextAction])} />;
}

function CommunityLeadershipNetwork({ nodes, edges }: { nodes: CommunityNetworkNode[]; edges: CommunityNetworkEdge[] }) {
  return (
    <section className="panel" id="community-leadership-network">
      <SectionHeader title="Community Leadership Network" eyebrow="Community to leaders, organizations, influencers, villages" />
      <div className="community-network-stage">
        <svg viewBox="0 0 100 100">
          {edges.map((edge) => {
            const from = nodes.find((node) => node.id === edge.from);
            const to = nodes.find((node) => node.id === edge.to);
            if (!from || !to) return null;
            return <line key={`${edge.from}-${edge.to}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} strokeWidth={Math.max(1, edge.strength / 35)} />;
          })}
        </svg>
        {nodes.map((node) => (
          <button className={`community-network-node node-${node.type}`} key={node.id} style={{ left: `${node.x}%`, top: `${node.y}%` }} type="button">
            <span />
            <b>{node.label}</b>
          </button>
        ))}
      </div>
    </section>
  );
}

function CommunityComparisonMode({ profiles, compareA, compareB, setCompareA, setCompareB }: { profiles: CommunityComparisonProfile[]; compareA: CommunityComparisonProfile; compareB: CommunityComparisonProfile; setCompareA: (community: string) => void; setCompareB: (community: string) => void }) {
  return (
    <section className="panel" id="community-comparison">
      <SectionHeader title="Community Comparison Mode" eyebrow="Compare support, sentiment, issues, influence, turnout" />
      <div className="comparison-controls">
        <select value={compareA.community} onChange={(event) => setCompareA(event.target.value)}>
          {profiles.map((profile) => <option value={profile.community} key={profile.community}>{profile.community}</option>)}
        </select>
        <select value={compareB.community} onChange={(event) => setCompareB(event.target.value)}>
          {profiles.map((profile) => <option value={profile.community} key={profile.community}>{profile.community}</option>)}
        </select>
      </div>
      <div className="comparison-grid">
        {[compareA, compareB].map((profile) => (
          <article key={profile.community}>
            <h3>{profile.community}</h3>
            <span className={`sentiment-pill sentiment-${profile.sentiment.toLowerCase()}`}>{profile.sentiment}</span>
            <Meter label="Support" value={profile.support} />
            <Meter label="Influence" value={profile.influence} />
            <Meter label="Turnout" value={profile.turnout} />
            <Meter label="Opportunity" value={profile.opportunity} />
            <small>Primary issue: {profile.primaryIssue}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function CommunityActionCenter() {
  const actions = [
    ["Create Community Campaign", "/tasks/new?type=community_campaign"],
    ["Schedule Community Meeting", "/events/new?type=community_meeting"],
    ["Assign Outreach Team", "/tasks/new?type=outreach_team"],
    ["Create Listening Session", "/events/new?type=listening_session"],
    ["Create Task", "/tasks/new?type=community_intelligence"],
    ["Generate Report", "/reports/daily-brief/new?type=community"],
    ["Generate Speech", "/candidate-intelligence/manage/new?type=speech"],
    ["Generate Outreach Plan", "/tasks/new?type=outreach_plan"]
  ];
  return (
    <section className="panel" id="community-actions">
      <SectionHeader title="Community Action Center" eyebrow="Convert community intelligence into field action" />
      <div className="voter-action-grid">
        {actions.map(([label, href]) => <a className="action-panel-btn" href={href} key={label}>{label}</a>)}
      </div>
    </section>
  );
}

function AiCommunityStrategy({ recommendations, queuedActions, onQueue }: { recommendations: typeof communityIntelligenceData.recommendations; queuedActions: string[]; onQueue: (recommendation: string) => void }) {
  return (
    <section className="panel recommendations-panel" id="ai-community-strategy">
      <SectionHeader title="AI Community Strategy" eyebrow="Which communities should Uday Sangle focus on next?" />
      <div className="recommendation-list">
        {recommendations.map((item) => (
          <article className="recommendation-card level-high" key={item.recommendation}>
            <div className="recommendation-top">
              <ConfidenceBadge score={item.confidence} />
              <a className="action-btn" href={`/tasks/new?title=${encodeURIComponent(item.actionLabel)}`} onClick={() => onQueue(item.recommendation)}>{queuedActions.includes(item.recommendation) ? "Queued" : item.actionLabel}</a>
            </div>
            <h3>{item.recommendation}</h3>
            <p><b>Reason:</b> {item.reason}</p>
            <p><b>Expected gain:</b> {item.expectedGain.toLocaleString()} votes</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function CommunityRightPanel({ risks, opportunities, influencers, trends, engagement, queuedActions }: { risks: typeof communityIntelligenceData.risks; opportunities: typeof communityIntelligenceData.opportunities; influencers: typeof communityIntelligenceData.influencers; trends: typeof communityIntelligenceData.trends; engagement: typeof communityIntelligenceData.engagement; queuedActions: string[] }) {
  return (
    <aside className="voter-intel-panel">
      <SectionHeader title="Community Intel Panel" eyebrow="Always-on community watch" />
      <PanelList title="Top Community Risks" items={risks.map((item) => `${item.community}: ${item.risk}`)} />
      <PanelList title="Top Community Opportunities" items={opportunities.map((item) => `${item.expectedVoteGain} votes / ${item.opportunity}`)} />
      <PanelList title="Influencer Alerts" items={influencers.map((item) => `${item.name}: ${item.alignment}`)} />
      <PanelList title="Sentiment Changes" items={trends.map((item) => `${item.community}: ${signed(item.monthly)}% monthly`)} />
      <PanelList title="Upcoming Meetings" items={engagement.map((item) => item.nextAction)} />
      <PanelList title="Pending Tasks" items={queuedActions.length ? queuedActions : ["No community tasks queued from this session"]} />
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
      <SectionHeader title={title} eyebrow="Ranked community intelligence" actions={<CountPill>{rows.length} rows</CountPill>} />
      {rows.length ? (
        <div className="table-scroll">
          <table>
            <thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${index}-${cellIndex}`}>{priorityColumn === cellIndex ? <PriorityChip value={String(cell)} /> : cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <EmptyState title="No matching community intelligence" body="Adjust filters to restore this table." />}
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

function matrixValue(community: CommunityCommandRecord, column: (typeof supportMatrixColumns)[number]) {
  if (column === "Support") return community.currentSupport;
  if (column === "Opposition") return community.opposition;
  if (column === "Neutral") return community.neutral;
  if (column === "Persuadable") return community.persuadable;
  if (column === "Turnout") return community.turnout;
  return community.influence;
}

function heatClass(value: number) {
  if (value >= 70) return "matrix-cell-hot";
  if (value >= 58) return "matrix-cell-strong";
  if (value >= 45) return "matrix-cell-watch";
  return "matrix-cell-weak";
}

function supportLevel(value: number) {
  if (value >= 60) return "Strong";
  if (value >= 50) return "Competitive";
  return "Weak";
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
