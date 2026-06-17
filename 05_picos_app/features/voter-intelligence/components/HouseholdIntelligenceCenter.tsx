"use client";

import { useMemo, useState } from "react";
import { PlatformShell } from "@/features/platform/PlatformShell";
import { ConfidenceBadge } from "@/features/shared/intelligenceBadges";
import { CountPill, EmptyState, PriorityChip, SectionHeader, signed, trendClass } from "@/features/political-intelligence/components/common";
import { householdIntelligenceData } from "../household-data";
import type {
  HouseholdCommandRecord,
  HouseholdComparisonProfile,
  HouseholdFilters,
  HouseholdRelationshipEdge,
  HouseholdRelationshipNode
} from "../types";

const defaultFilters: HouseholdFilters = {
  village: "All",
  booth: "All",
  community: "All",
  support: "All",
  influence: "All",
  risk: "All",
  opportunity: "All",
  turnout: "All",
  visitPriority: "All",
  dateRange: "30 Days"
};

const filterOptions = {
  village: ["All", "Sinnar Town", "Musalgaon", "Pangri", "Dubere", "Devpur", "Wavi"],
  booth: ["All", "booth-midc-001", "booth-pangri-001", "booth-musalgaon-001", "booth-dubere-001", "booth-devpur-001", "booth-wavi-001"],
  community: ["All", "Farmers", "Youth", "Women", "SC", "Maratha"],
  support: ["All", "Strong", "Weak", "Neutral", "Persuadable", "Influential", "Risk", "Growth"],
  influence: ["All", "High", "Medium", "Low"],
  risk: ["All", "Critical", "High", "Medium", "Low"],
  opportunity: ["All", "Critical", "High", "Medium", "Low"],
  turnout: ["All", "High", "Medium", "Low"],
  visitPriority: ["All", "Critical", "High", "Medium", "Low"],
  dateRange: ["Today", "7 Days", "30 Days", "Quarter"]
};

export function HouseholdIntelligenceCenter() {
  const data = householdIntelligenceData;
  const [filters, setFilters] = useState(defaultFilters);
  const [query, setQuery] = useState("");
  const [selectedHouseholdId, setSelectedHouseholdId] = useState(data.command[0].id);
  const [mapLayer, setMapLayer] = useState<"Support" | "Influence" | "Risk" | "Opportunity">("Opportunity");
  const [compareA, setCompareA] = useState("Jadhav Family");
  const [compareB, setCompareB] = useState("Shinde Family");
  const [queuedActions, setQueuedActions] = useState<string[]>([]);

  const filteredHouseholds = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return data.command.filter((household) => {
      if (filters.village !== "All" && household.village !== filters.village) return false;
      if (filters.booth !== "All" && household.booth !== filters.booth) return false;
      if (filters.community !== "All" && household.community !== filters.community) return false;
      if (filters.support !== "All" && household.classification !== filters.support) return false;
      if (filters.influence !== "All" && scoreLevel(household.influenceScore) !== filters.influence) return false;
      if (filters.risk !== "All" && priorityFromScore(household.riskScore) !== filters.risk) return false;
      if (filters.opportunity !== "All" && priorityFromScore(household.opportunityScore) !== filters.opportunity) return false;
      if (filters.visitPriority !== "All" && household.visitPriority !== filters.visitPriority) return false;
      if (!normalized) return true;
      return JSON.stringify(household).toLowerCase().includes(normalized);
    });
  }, [data.command, filters.booth, filters.community, filters.influence, filters.opportunity, filters.risk, filters.support, filters.village, filters.visitPriority, query]);

  const selectedHousehold = data.command.find((household) => household.id === selectedHouseholdId) ?? data.command[0];
  const householdMembers = data.familyMembers.filter((member) => member.householdId === selectedHousehold.id);
  const householdInfluencers = data.influencers.filter((item) => item.householdId === selectedHousehold.id);
  const householdIssues = data.issues.filter((item) => item.householdId === selectedHousehold.id);
  const householdSupport = data.support.find((item) => item.householdId === selectedHousehold.id);
  const householdVisits = data.visits.filter((item) => item.householdId === selectedHousehold.id);
  const householdEngagement = data.engagement.find((item) => item.householdId === selectedHousehold.id);
  const householdTurnout = data.turnout.find((item) => item.householdId === selectedHousehold.id);
  const comparisonA = data.comparisons.find((item) => item.household === compareA) ?? data.comparisons[0];
  const comparisonB = data.comparisons.find((item) => item.household === compareB) ?? data.comparisons[1];

  function updateFilter(key: keyof HouseholdFilters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <PlatformShell activeCoreModule="voter-intelligence" activeModuleSection="household-intelligence">
      <header className="candidate-header voter-header">
        <div>
          <span className="eyebrow">Voter Intelligence / Household Intelligence</span>
          <h1>Household Intelligence Center</h1>
          <p>Family-level political, social, issue, support, and persuasion intelligence.</p>
        </div>
        <label className="global-search">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search household, family member, influencer, village, issue, task, volunteer" />
        </label>
      </header>

      <section className="voter-filter-rail" aria-label="Household intelligence filters">
        {Object.entries(filterOptions).map(([key, options]) => (
          <label key={key}>
            <span>{labelize(key)}</span>
            <select value={filters[key as keyof HouseholdFilters]} onChange={(event) => updateFilter(key as keyof HouseholdFilters, event.target.value)}>
              {options.map((option) => <option value={option} key={option}>{option}</option>)}
            </select>
          </label>
        ))}
      </section>

      <main className="voter-workspace household-workspace">
        <div className="voter-main">
          <HouseholdPriorityCommand data={data} />
          <HouseholdOverview metrics={data.overview} />
          <HouseholdCommandTable households={filteredHouseholds} selectedHouseholdId={selectedHousehold.id} onSelect={setSelectedHouseholdId} />
          <div className="workspace-grid two-column visual-grid">
            <HouseholdGeographicMap households={filteredHouseholds} selectedHousehold={selectedHousehold} layer={mapLayer} onLayerChange={setMapLayer} onSelect={setSelectedHouseholdId} />
            <HouseholdProfilePanel household={selectedHousehold} />
          </div>
          <div className="workspace-grid two-column">
            <TopHouseholdsToTarget targets={data.targets} />
            <TopHouseholdsAtRisk risks={data.risks} />
          </div>
          <div className="workspace-grid two-column">
            <FamilyMemberIntelligence members={householdMembers} household={selectedHousehold.householdName} />
            <HouseholdInfluencerAnalysis influencers={householdInfluencers} household={selectedHousehold.householdName} />
          </div>
          <div className="workspace-grid two-column">
            <HouseholdIssueIntelligence issues={householdIssues} household={selectedHousehold.householdName} />
            <HouseholdSupportAnalysis support={householdSupport} household={selectedHousehold.householdName} />
          </div>
          <div className="workspace-grid two-column">
            <HouseholdVisitHistoryPanel visits={householdVisits} household={selectedHousehold.householdName} />
            <HouseholdEngagementTracker engagement={householdEngagement} household={selectedHousehold.householdName} />
          </div>
          <div className="workspace-grid two-column">
            <HouseholdTurnoutAnalysis turnout={householdTurnout} household={selectedHousehold.householdName} />
            <HouseholdPersuasionAnalysis persuasion={data.persuasion} />
          </div>
          <div className="workspace-grid two-column visual-grid">
            <HouseholdTaskCenter tasks={data.tasks} />
            <HouseholdRelationshipMap nodes={data.relationshipNodes} edges={data.relationshipEdges} />
          </div>
          <AiHouseholdStrategy recommendations={data.recommendations} queuedActions={queuedActions} onQueue={(item) => setQueuedActions((current) => [...current, item])} />
          <HouseholdComparisonMode profiles={data.comparisons} compareA={comparisonA} compareB={comparisonB} setCompareA={setCompareA} setCompareB={setCompareB} />
          <HouseholdActionCenter />
        </div>
      </main>
    </PlatformShell>
  );
}

function HouseholdPriorityCommand({ data }: { data: typeof householdIntelligenceData }) {
  const topTarget = data.targets[0];
  const topRisk = data.risks[0];
  const highInfluence = [...data.command].sort((a, b) => b.influenceScore - a.influenceScore)[0];
  return (
    <section className="command-priority-grid voter-priority-grid household-priority-grid">
      <article className="priority-hero political-risk">
        <span className="eyebrow">Family Can Move Votes</span>
        <h2>{topTarget.household}</h2>
        <strong>{topTarget.expectedVoteGain}</strong>
        <p>{topTarget.reason} / {topTarget.recommendedAction}</p>
      </article>
      <article className="priority-hero community-sentiment">
        <span className="eyebrow">Influence Cluster</span>
        <strong>{highInfluence.householdName}</strong>
        <p>{highInfluence.village} / influence {highInfluence.influenceScore}</p>
      </article>
      <article className="priority-hero opponent-movement">
        <span className="eyebrow">Household Risk</span>
        <h2>{topRisk.household}</h2>
        <PriorityChip value={topRisk.severity} />
        <p>{topRisk.riskType}</p>
      </article>
      <article className="priority-hero election-readiness">
        <span className="eyebrow">Persuadable Households</span>
        <strong>8.6K</strong>
        <p>Highest leverage: farmer, youth, and women-led family clusters.</p>
      </article>
      <article className="priority-hero ai-recommendation">
        <span className="eyebrow">AI Household Strategy</span>
        <h2>{data.recommendations[0].recommendation}</h2>
        <p>{data.recommendations[0].reason}</p>
      </article>
    </section>
  );
}

function HouseholdOverview({ metrics }: { metrics: typeof householdIntelligenceData.overview }) {
  return (
    <section className="overview-bar" id="household-overview">
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

function HouseholdCommandTable({ households, selectedHouseholdId, onSelect }: { households: HouseholdCommandRecord[]; selectedHouseholdId: string; onSelect: (id: string) => void }) {
  return (
    <section className="panel table-panel" id="household-command-table">
      <SectionHeader title="Household Command Table" eyebrow="Family support, influence, risk, opportunity, visit priority" actions={<CountPill>{households.length} households</CountPill>} />
      {households.length ? (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                {["Household Name", "Village", "Booth", "Family Size", "Eligible Voters", "Support", "Influence", "Risk", "Opportunity", "Visit Priority", "Worker", "Status"].map((column) => <th key={column}>{column}</th>)}
              </tr>
            </thead>
            <tbody>
              {households.map((household) => (
                <tr className={selectedHouseholdId === household.id ? "is-selected-row" : ""} key={household.id} onClick={() => onSelect(household.id)}>
                  <td><button className="table-link-btn" type="button">{household.householdName}</button></td>
                  <td>{household.village}</td>
                  <td>{household.booth}</td>
                  <td>{household.familySize}</td>
                  <td>{household.eligibleVoters}</td>
                  <td>{household.supportScore}</td>
                  <td>{household.influenceScore}</td>
                  <td>{household.riskScore}</td>
                  <td>{household.opportunityScore}</td>
                  <td><PriorityChip value={household.visitPriority} /></td>
                  <td>{household.assignedWorker}</td>
                  <td><span className={`household-class-chip household-${household.classification.toLowerCase()}`}>{household.classification}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <EmptyState title="No household records match filters" body="Adjust village, booth, support, influence, risk, opportunity, or search filters." />}
    </section>
  );
}

function HouseholdGeographicMap({ households, selectedHousehold, layer, onLayerChange, onSelect }: { households: HouseholdCommandRecord[]; selectedHousehold: HouseholdCommandRecord; layer: "Support" | "Influence" | "Risk" | "Opportunity"; onLayerChange: (layer: "Support" | "Influence" | "Risk" | "Opportunity") => void; onSelect: (id: string) => void }) {
  return (
    <section className="panel geo-panel" id="household-geographic-map">
      <SectionHeader title="Household Geographic Map" eyebrow="Village clusters, support, influence, risk, opportunity" />
      <div className="map-toolbar">
        <div className="segmented-control">
          {(["Support", "Influence", "Risk", "Opportunity"] as const).map((item) => <button className={`seg-btn ${layer === item ? "is-active" : ""}`} onClick={() => onLayerChange(item)} type="button" key={item}>{item}</button>)}
        </div>
      </div>
      <div className="map-stage">
        <svg className="constituency-map" viewBox="0 0 100 100">
          <path d="M16,18 L48,9 L76,16 L91,39 L83,72 L61,91 L31,86 L10,62 L7,35 Z" />
          <path d="M29,22 L52,18 L73,28 L77,50 L65,68 L43,75 L25,61 L19,40 Z" />
          <path d="M50,12 L51,89" />
          <path d="M13,58 L88,40" />
        </svg>
        {households.map((household) => (
          <button
            className={`map-marker household-map-marker household-${household.classification.toLowerCase()} ${selectedHousehold.id === household.id ? "is-selected" : ""}`}
            key={household.id}
            onClick={() => onSelect(household.id)}
            style={{ left: `${household.x}%`, top: `${household.y}%`, width: 14 + mapValue(household, layer) / 8, height: 14 + mapValue(household, layer) / 8 }}
            type="button"
          >
            <span>{household.householdName}</span>
          </button>
        ))}
      </div>
      <div className="map-detail">
        <span>{layer} layer</span>
        <h3>{selectedHousehold.householdName}</h3>
        <dl>
          <div><dt>Village</dt><dd>{selectedHousehold.village}</dd></div>
          <div><dt>Support</dt><dd>{selectedHousehold.supportScore}</dd></div>
          <div><dt>Influence</dt><dd>{selectedHousehold.influenceScore}</dd></div>
          <div><dt>Risk</dt><dd>{selectedHousehold.riskScore}</dd></div>
        </dl>
      </div>
    </section>
  );
}

function HouseholdProfilePanel({ household }: { household: HouseholdCommandRecord }) {
  return (
    <section className="panel" id="household-profile">
      <SectionHeader title="Household Profile Panel" eyebrow="Selected household intelligence" />
      <div className="household-profile-grid">
        {[
          ["Household", household.householdName],
          ["Village", household.village],
          ["Booth", household.booth],
          ["Address", household.address],
          ["Family Members", household.familySize],
          ["Primary Influencer", household.notes],
          ["Community", household.community],
          ["Occupation", household.occupation],
          ["Education", household.education],
          ["Economic Profile", household.economicProfile],
          ["Support Level", household.classification],
          ["Political Alignment", household.politicalAlignment],
          ["Relationship Strength", household.relationshipStrength],
          ["Notes", household.notes]
        ].map(([label, value]) => (
          <article key={String(label)}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function TopHouseholdsToTarget({ targets }: { targets: typeof householdIntelligenceData.targets }) {
  return <SimpleTable id="top-households-target" title="Top Households To Target" columns={["Household", "Current Support", "Potential Support", "Expected Vote Gain", "Priority", "Reason", "Recommended Action", "Expected Impact"]} rows={targets.map((item) => [item.household, `${item.currentSupport}%`, `${item.potentialSupport}%`, item.expectedVoteGain, item.priority, item.reason, item.recommendedAction, item.expectedImpact])} priorityColumn={4} />;
}

function TopHouseholdsAtRisk({ risks }: { risks: typeof householdIntelligenceData.risks }) {
  return <SimpleTable id="top-households-risk" title="Top Households At Risk" columns={["Household", "Risk Type", "Potential Vote Loss", "Severity", "Reason", "Owner", "Mitigation Plan", "Status"]} rows={risks.map((item) => [item.household, item.riskType, item.potentialVoteLoss, item.severity, item.reason, item.owner, item.mitigationPlan, item.status])} priorityColumn={3} />;
}

function FamilyMemberIntelligence({ members, household }: { members: typeof householdIntelligenceData.familyMembers; household: string }) {
  return <SimpleTable id="family-member-intelligence" title="Family Member Intelligence" columns={["Name", "Age", "Gender", "Role", "Occupation", "Political Leaning", "Support", "Influence", "Relationship", "Turnout"]} rows={members.map((item) => [item.name, item.age, item.gender, item.familyRole, item.occupation, item.politicalLeaning, item.supportScore, item.influenceScore, item.relationshipStrength, item.turnoutProbability])} emptyTitle={`No family member intelligence for ${household}`} />;
}

function HouseholdInfluencerAnalysis({ influencers, household }: { influencers: typeof householdIntelligenceData.influencers; household: string }) {
  return <SimpleTable id="household-influencers" title="Household Influencer Analysis" columns={["Influencer", "Role", "Influence", "Alignment", "Relationship", "Reach", "Expected Impact"]} rows={influencers.map((item) => [item.name, item.role, item.influenceScore, item.politicalAlignment, item.relationshipStrength, item.reach, item.expectedImpact])} emptyTitle={`No influencer intelligence for ${household}`} />;
}

function HouseholdIssueIntelligence({ issues, household }: { issues: typeof householdIntelligenceData.issues; household: string }) {
  return <SimpleTable id="household-issues" title="Household Issue Intelligence" columns={["Issue", "Severity", "Political Impact", "Opportunity", "Status"]} rows={issues.map((item) => [item.issue, item.severity, item.politicalImpact, item.opportunity, item.status])} priorityColumn={1} emptyTitle={`No issue intelligence for ${household}`} />;
}

function HouseholdSupportAnalysis({ support, household }: { support?: typeof householdIntelligenceData.support[number]; household: string }) {
  if (!support) return <section className="panel"><EmptyState title={`No support map for ${household}`} body="Select another household or add support observations." /></section>;
  return (
    <section className="panel" id="household-support-analysis">
      <SectionHeader title="Household Support Analysis" eyebrow="Family support map" />
      <div className="household-support-map">
        <Meter label="Supportive" value={support.supportiveMembers} max={8} />
        <Meter label="Opposing" value={support.opposingMembers} max={8} danger />
        <Meter label="Neutral" value={support.neutralMembers} max={8} />
        <Meter label="Persuadable" value={support.persuadableMembers} max={8} />
        <Meter label="Unknown" value={support.unknownMembers} max={8} danger />
      </div>
    </section>
  );
}

function HouseholdVisitHistoryPanel({ visits, household }: { visits: typeof householdIntelligenceData.visits; household: string }) {
  return <SimpleTable id="household-visit-history" title="Household Visit History" columns={["Visit Date", "Visitor", "Purpose", "Outcome", "Notes", "Follow-up", "Status"]} rows={visits.map((item) => [item.visitDate, item.visitor, item.purpose, item.outcome, item.notes, item.followUpRequired, item.status])} emptyTitle={`No visit history for ${household}`} />;
}

function HouseholdEngagementTracker({ engagement, household }: { engagement?: typeof householdIntelligenceData.engagement[number]; household: string }) {
  if (!engagement) return <section className="panel"><EmptyState title={`No engagement record for ${household}`} body="Add field contact before analysis." /></section>;
  return (
    <section className="panel" id="household-engagement">
      <SectionHeader title="Household Engagement Tracker" eyebrow="Meetings, calls, schemes, events, volunteer links" />
      <div className="household-engagement-grid">
        {[
          ["Meetings", engagement.meetings],
          ["Phone Calls", engagement.phoneCalls],
          ["Issue Resolution", engagement.issueResolution],
          ["Scheme Assistance", engagement.schemeAssistance],
          ["Events Attended", engagement.eventsAttended],
          ["Volunteer Engagement", engagement.volunteerEngagement]
        ].map(([label, value]) => <article key={String(label)}><strong>{value}</strong><span>{label}</span></article>)}
      </div>
    </section>
  );
}

function HouseholdTurnoutAnalysis({ turnout, household }: { turnout?: typeof householdIntelligenceData.turnout[number]; household: string }) {
  if (!turnout) return <section className="panel"><EmptyState title={`No turnout analysis for ${household}`} body="Add turnout observations before analysis." /></section>;
  return (
    <section className="panel" id="household-turnout">
      <SectionHeader title="Household Turnout Analysis" eyebrow="Expected turnout, risk, first-time voters, seniors" />
      <Meter label="Expected Turnout" value={turnout.expectedTurnout} />
      <Meter label="Turnout Risk" value={turnout.turnoutRisk} danger />
      <div className="household-turnout-notes">
        <article><strong>{turnout.firstTimeVoters}</strong><span>First Time Voters</span></article>
        <article><strong>{turnout.seniorCitizens}</strong><span>Senior Citizens</span></article>
      </div>
      <p><b>Mobilization:</b> {turnout.mobilizationNeeds}</p>
      <p><b>Election day plan:</b> {turnout.electionDayPlan}</p>
    </section>
  );
}

function HouseholdPersuasionAnalysis({ persuasion }: { persuasion: typeof householdIntelligenceData.persuasion }) {
  return <SimpleTable id="household-persuasion" title="Household Persuasion Analysis" columns={["Household", "Persuasion", "Reasons", "Influencers", "Messaging", "Visitor", "Timing", "Expected Gain"]} rows={persuasion.map((item) => [item.household, item.persuasionScore, item.reasons, item.influencers, item.recommendedMessaging, item.recommendedVisitor, item.recommendedTiming, item.expectedVoteGain])} />;
}

function HouseholdTaskCenter({ tasks }: { tasks: typeof householdIntelligenceData.tasks }) {
  return <SimpleTable id="household-task-center" title="Household Task Center" columns={["Household", "Open", "Pending", "Overdue", "Completed", "Highest Priority Task"]} rows={tasks.map((item) => [item.household, item.openTasks, item.pendingTasks, item.overdueTasks, item.completedTasks, item.highestPriorityTask])} />;
}

function HouseholdRelationshipMap({ nodes, edges }: { nodes: HouseholdRelationshipNode[]; edges: HouseholdRelationshipEdge[] }) {
  return (
    <section className="panel" id="household-relationship-map">
      <SectionHeader title="Household Relationship Map" eyebrow="Household to members, influencers, organizations, political relationships" />
      <div className="community-network-stage household-network-stage">
        <svg viewBox="0 0 100 100">
          {edges.map((edge) => {
            const from = nodes.find((node) => node.id === edge.from);
            const to = nodes.find((node) => node.id === edge.to);
            if (!from || !to) return null;
            return <line key={`${edge.from}-${edge.to}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} strokeWidth={Math.max(1, edge.strength / 35)} />;
          })}
        </svg>
        {nodes.map((node) => (
          <button className={`community-network-node household-network-node node-${node.type}`} key={node.id} style={{ left: `${node.x}%`, top: `${node.y}%` }} type="button">
            <span />
            <b>{node.label}</b>
          </button>
        ))}
      </div>
    </section>
  );
}

function AiHouseholdStrategy({ recommendations, queuedActions, onQueue }: { recommendations: typeof householdIntelligenceData.recommendations; queuedActions: string[]; onQueue: (recommendation: string) => void }) {
  return (
    <section className="panel recommendations-panel" id="ai-household-strategy">
      <SectionHeader title="AI Household Strategy" eyebrow="Which families can move votes and what should we do next?" />
      <div className="recommendation-list">
        {recommendations.map((item) => (
          <article className="recommendation-card level-high" key={item.recommendation}>
            <div className="recommendation-top">
              <div className="badge-row"><PriorityChip value={item.priority} /><ConfidenceBadge score={item.confidence} /></div>
              <a className="action-btn" href={`/tasks/new?title=${encodeURIComponent(item.actionLabel)}`} onClick={() => onQueue(item.recommendation)}>{queuedActions.includes(item.recommendation) ? "Queued" : item.actionLabel}</a>
            </div>
            <h3>{item.recommendation}</h3>
            <p><b>Reason:</b> {item.reason}</p>
            <p><b>Expected votes:</b> {item.expectedVotes}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HouseholdComparisonMode({ profiles, compareA, compareB, setCompareA, setCompareB }: { profiles: HouseholdComparisonProfile[]; compareA: HouseholdComparisonProfile; compareB: HouseholdComparisonProfile; setCompareA: (household: string) => void; setCompareB: (household: string) => void }) {
  return (
    <section className="panel" id="household-comparison">
      <SectionHeader title="Household Comparison Mode" eyebrow="Support, influence, issues, turnout, persuasion, relationship strength" />
      <div className="comparison-controls">
        <select value={compareA.household} onChange={(event) => setCompareA(event.target.value)}>
          {profiles.map((profile) => <option value={profile.household} key={profile.household}>{profile.household}</option>)}
        </select>
        <select value={compareB.household} onChange={(event) => setCompareB(event.target.value)}>
          {profiles.map((profile) => <option value={profile.household} key={profile.household}>{profile.household}</option>)}
        </select>
      </div>
      <div className="comparison-grid">
        {[compareA, compareB].map((profile) => (
          <article key={profile.household}>
            <h3>{profile.household}</h3>
            <Meter label="Support" value={profile.support} />
            <Meter label="Influence" value={profile.influence} />
            <Meter label="Turnout" value={profile.turnout} />
            <Meter label="Persuasion" value={profile.persuasion} />
            <Meter label="Relationship" value={profile.relationshipStrength} />
            <small>Issues: {profile.issues}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function HouseholdActionCenter() {
  const actions = [
    ["Schedule Visit", "/events/new?type=household_visit"],
    ["Assign Volunteer", "/tasks/new?type=assign_volunteer"],
    ["Assign Coordinator", "/tasks/new?type=assign_coordinator"],
    ["Create Task", "/tasks/new?type=household_task"],
    ["Create Follow-up", "/tasks/new?type=follow_up"],
    ["Create Outreach Plan", "/tasks/new?type=outreach_plan"],
    ["Generate Household Report", "/reports/daily-brief/new?type=household"],
    ["Generate Persuasion Plan", "/tasks/new?type=persuasion_plan"],
    ["Generate Visit Brief", "/candidate-intelligence/manage/new?type=visit_brief"]
  ];
  return (
    <section className="panel" id="household-actions">
      <SectionHeader title="Action Center" eyebrow="Turn household intelligence into field action" />
      <div className="voter-action-grid">
        {actions.map(([label, href]) => <a className="action-panel-btn" href={href} key={label}>{label}</a>)}
      </div>
    </section>
  );
}

function SimpleTable({ id, title, columns, rows, priorityColumn, emptyTitle }: { id: string; title: string; columns: string[]; rows: Array<Array<string | number>>; priorityColumn?: number; emptyTitle?: string }) {
  return (
    <section className="panel table-panel" id={id}>
      <SectionHeader title={title} eyebrow="Ranked household intelligence" actions={<CountPill>{rows.length} rows</CountPill>} />
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
      ) : <EmptyState title={emptyTitle ?? "No matching household intelligence"} body="Adjust filters or select another household." />}
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

function mapValue(household: HouseholdCommandRecord, layer: string) {
  if (layer === "Support") return household.supportScore;
  if (layer === "Influence") return household.influenceScore;
  if (layer === "Risk") return household.riskScore;
  return household.opportunityScore;
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
