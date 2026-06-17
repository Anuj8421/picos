import { EvidenceDrawer } from "@/features/evidence/components/EvidenceDrawer";
import { PlatformShell } from "@/features/platform/PlatformShell";
import { CountPill, PriorityChip, SectionHeader } from "@/features/political-intelligence/components/common";
import { ConfidenceBadge, VerificationBadge } from "@/features/shared/intelligenceBadges";
import { SourceAttachmentPanel } from "@/features/sources/components/SourceAttachmentPanel";
import { AssignedTaskList, CreateTaskButton } from "@/features/tasks/components/TaskComponents";
import {
  entityDisplayName,
  findEvidenceFor,
  findSources,
  findTasksFor,
  getConstituencyRecommendations,
  getConstituencySummary,
  getConstituencyZoneSummaries,
  repository
} from "@/lib/domain/repositories";

export type ConstituencyScreen =
  | "dashboard"
  | "geography"
  | "zones"
  | "communities"
  | "issues"
  | "influencers"
  | "coverage-map"
  | "reports";

const screenMeta: Record<ConstituencyScreen, { title: string; subtitle: string }> = {
  dashboard: {
    title: "Constituency Intelligence Command Center",
    subtitle: "Sinnar-wide territory, village, booth, community, issue, risk, opportunity, source, and action intelligence for Uday Sangle."
  },
  geography: {
    title: "Constituency Geography",
    subtitle: "Village geography, zone shape, field coverage, booth gaps, and community influence distribution."
  },
  zones: {
    title: "Constituency Zone Manager",
    subtitle: "Zone-level readiness, owners, villages, booths, communities, watchlist items, and next campaign actions."
  },
  communities: {
    title: "Constituency Community Manager",
    subtitle: "Community support, sentiment, trend, village influence, evidence, and outreach task routing."
  },
  issues: {
    title: "Constituency Issue Manager",
    subtitle: "Local issue map across villages, communities, owners, political impact, verification, and action."
  },
  influencers: {
    title: "Constituency Influencer Manager",
    subtitle: "Local influence map connecting people, communities, villages, relationship strength, and follow-up actions."
  },
  "coverage-map": {
    title: "Constituency Coverage Map",
    subtitle: "Village, booth, ownership, visit, and coverage-gap heat map for Sinnar field command."
  },
  reports: {
    title: "Constituency Reports",
    subtitle: "Readiness briefs, village watchlists, coverage reports, issue heatmaps, decisions, and approval status."
  }
};

export function ConstituencyIntelligenceRoutePage({ screen }: { screen: ConstituencyScreen }) {
  const meta = screenMeta[screen];

  return (
    <PlatformShell activeCoreModule="constituency-intelligence" activeModuleSection={screen}>
      <header className="candidate-header campaign-structure-header">
        <div>
          <span className="eyebrow">Module 02 / Constituency Intelligence</span>
          <h1>{meta.title}</h1>
          <p>{meta.subtitle}</p>
        </div>
        <div className="manager-header-actions">
          <a className="action-btn" href="/ownership-registry">Ownership</a>
          <a className="action-btn" href="/constituency/villages">Villages</a>
          <a className="action-btn" href="/constituency/booths">Booths</a>
          <a className="action-btn" href="/visits">Visits</a>
        </div>
      </header>

      {screen === "dashboard" ? <ConstituencyDashboard /> : null}
      {screen === "geography" ? <GeographyScreen /> : null}
      {screen === "zones" ? <ZonesScreen /> : null}
      {screen === "communities" ? <CommunitiesScreen /> : null}
      {screen === "issues" ? <IssuesScreen /> : null}
      {screen === "influencers" ? <InfluencersScreen /> : null}
      {screen === "coverage-map" ? <CoverageMapScreen /> : null}
      {screen === "reports" ? <ReportsScreen /> : null}
    </PlatformShell>
  );
}

function ConstituencyDashboard() {
  const summary = getConstituencySummary();
  const profile = repository.constituencyProfiles[0];
  const sources = findSources(profile.sourceIds);
  const evidence = findEvidenceFor("constituency_profile", profile.id);
  const recommendations = getConstituencyRecommendations();

  const metrics = [
    ["Readiness", `${summary.readinessScore}%`, "Command score", "Combined coverage, ownership, issue, and watchlist posture"],
    ["Village Coverage", `${summary.villageCoverage}%`, `${summary.villagesTracked} tracked`, "Village intelligence coverage"],
    ["Booth Coverage", `${summary.boothCoverage}%`, `${summary.boothsTracked} tracked`, "Booth data and assignment coverage"],
    ["Ownership", `${summary.ownershipCoverage}%`, "Accountability", "Village and booth ownership coverage"],
    ["Communities", summary.communitiesTracked, "Segments", "Tracked community intelligence records"],
    ["Issues", summary.issuesTracked, "Mapped", "Local issues with political impact"],
    ["Active Visits", summary.activeVisits, "Field ops", "Planned or active visit intelligence"],
    ["Overdue Follow-ups", summary.overdueFollowUps, "Action drag", "Follow-up records requiring owner action"],
    ["Open Watchlist", summary.openWatchlist, "Watch", "Open constituency watchlist items"],
    ["Critical Watchlist", summary.criticalWatchlist, "Critical", "Escalation candidates"],
    ["Risks", summary.riskCount, "Risk register", "Political risks feeding command view"],
    ["Opportunities", summary.opportunityCount, "Opportunity register", "Actionable political openings"]
  ] as const;

  return (
    <main className="campaign-structure-workspace constituency-workspace">
      <section className="campaign-first-screen module-first-screen" id="overview">
        <ConstituencySituationRoom metrics={metrics} recommendations={recommendations.length} summary={summary} />
        <ConstituencyMapPanel mode="coverage" />
      </section>

      <section className="workspace-grid two-column">
        <ZoneReadinessPanel />
        <WatchlistPanel />
      </section>

      <section className="panel">
        <SectionHeader title="Constituency Recommendations" eyebrow="Action layer generated from coverage, watchlist, ownership, and verification gaps" actions={<CountPill>{recommendations.length} actions</CountPill>} />
        <div className="campaign-recommendation-grid">
          {recommendations.map((item) => (
            <article className="campaign-recommendation-card" key={`${item.relatedEntityType}-${item.relatedEntityId}-${item.title}`}>
              <div className="badge-row">
                <PriorityChip value={item.severity} />
                <VerificationBadge status={item.verificationStatus} />
                <ConfidenceBadge score={item.confidenceScore} />
              </div>
              <strong>{item.title}</strong>
              <p>{item.recommendation}</p>
              <span>{entityDisplayName(item.relatedEntityType, item.relatedEntityId)}</span>
              <div className="row-actions">
                <a href={`/tasks/new?relatedEntityType=${item.relatedEntityType}&relatedEntityId=${item.relatedEntityId}`}>Create task</a>
                <a href="/verification/new">Verify</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <InputProcessingIntelligenceAction />

      <section className="workspace-grid two-column">
        <SourceAttachmentPanel sources={sources} />
        <EvidenceDrawer evidence={evidence} sources={sources} />
      </section>
    </main>
  );
}

function ConstituencySituationRoom({
  metrics,
  recommendations,
  summary
}: {
  metrics: ReadonlyArray<readonly [string, string | number, string, string]>;
  recommendations: number;
  summary: ReturnType<typeof getConstituencySummary>;
}) {
  const communitySentiment = average(repository.communities.map((community) => community.sentimentScore));
  const opponentSignals = repository.mediaMentions.filter((mention) => mention.riskLevel === "critical" || mention.riskLevel === "high").length;
  const territoryScore = average([summary.readinessScore, summary.villageCoverage, summary.boothCoverage, summary.ownershipCoverage, communitySentiment]);
  const answer = territoryScore >= 68 ? "Sinnar map is usable, not locked." : "Sinnar territory is not ready yet.";
  const directive = summary.criticalWatchlist > 0 || summary.overdueFollowUps > 0
    ? "Close critical watchlist items, overdue follow-ups, and booth ownership gaps before expanding field promises."
    : "Move growth villages into visits and lock owners for swing, weak, and risk villages.";
  const situationMetrics = [
    { label: "Territory Advantage", score: territoryScore, state: "Composite map posture", detail: "Readiness, coverage, booth, ownership, sentiment", tone: "win" },
    { label: "Village Coverage", score: summary.villageCoverage, state: `${summary.villagesTracked} tracked`, detail: "Village intelligence coverage", tone: "coverage" },
    { label: "Booth Coverage", score: summary.boothCoverage, state: `${summary.boothsTracked} tracked`, detail: "Booth data and assignment coverage", tone: "booth" },
    { label: "Ownership", score: summary.ownershipCoverage, state: "Accountability", detail: "Village and booth owner coverage", tone: "execution" },
    { label: "Community Sentiment", score: communitySentiment, state: "Mapped voters", detail: "Average community sentiment", tone: "support" },
    { label: "Risks", score: Math.min(100, summary.riskCount * 10), state: `${summary.riskCount} active`, detail: "Political risks feeding command view", tone: "volunteer" },
    { label: "Opportunities", score: Math.min(100, summary.opportunityCount * 10), state: `${summary.opportunityCount} open`, detail: "Actionable political openings", tone: "turnout" }
  ] as const;

  return (
    <section className="situation-room module-situation-room">
      <div className="situation-room-lead">
        <div>
          <span className="eyebrow">Constituency Situation Room</span>
          <h2>{answer}</h2>
          <div className="situation-status-strip" aria-label="Constituency intelligence status">
            <span>{summary.openWatchlist} watchlist</span>
            <span>{opponentSignals} opponent/media signals</span>
            <span>{recommendations} recommended actions</span>
          </div>
        </div>
        <p>Politics is geography: village coverage, booth readiness, ownership, and community movement decide whether Sinnar field strength becomes votes.</p>
        <div className="situation-decision">
          <span>What should Uday do next?</span>
          <strong>{directive}</strong>
        </div>
        <div className="situation-directives">
          <a href="/constituency/coverage-map">Secure weak geography</a>
          <a href="/constituency/booths">Close booth gaps</a>
          <a href="/visits">Push field visits</a>
        </div>
      </div>
      <div className="situation-metric-grid">
        {situationMetrics.map((metric, index) => (
          <article className={`situation-metric tone-${metric.tone} ${index === 0 ? "is-primary" : ""}`} key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.score}%</strong>
            <small>{metric.state}</small>
            <i><em style={{ width: `${metric.score}%` }} /></i>
            <p>{metric.detail}</p>
          </article>
        ))}
      </div>
      <article className="module-risk-note">
        <span>Constituency pressure</span>
        <strong>{summary.criticalWatchlist} critical watchlist items</strong>
        <p>{metrics.find(([label]) => label === "Overdue Follow-ups")?.[3] ?? "Follow-up records requiring owner action"}</p>
      </article>
    </section>
  );
}

function GeographyScreen() {
  return (
    <main className="campaign-structure-workspace constituency-workspace">
      <section className="workspace-grid top-grid">
        <ConstituencyMapPanel mode="geography" />
        <section className="panel">
          <SectionHeader title="Geographic Inputs" eyebrow="Manual records and imports" />
          <div className="campaign-control-grid">
            <a href="/constituency/villages/new"><strong>Add Village</strong><span>Manual full-page village record</span></a>
            <a href="/constituency/booths/new"><strong>Add Booth</strong><span>Manual booth and coordinator record</span></a>
            <a href="/imports/new"><strong>Import CSV</strong><span>Village, booth, voter, or survey template</span></a>
            <a href="/sources/new"><strong>Add Source</strong><span>Attach public or internal source record</span></a>
            <a href="/evidence/new"><strong>Add Evidence</strong><span>Attach map, field photo, document, or report</span></a>
            <a href="/verification"><strong>Verification Queue</strong><span>Check geography before command use</span></a>
          </div>
        </section>
      </section>

      <section className="panel">
        <SectionHeader title="Village Geography Table" eyebrow="Sinnar geography layer" actions={<CountPill>{repository.villages.length} villages</CountPill>} />
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Village</th>
                <th>Zone</th>
                <th>Risk</th>
                <th>Opportunity</th>
                <th>Sentiment</th>
                <th>Dominant Issues</th>
                <th>Verification</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {repository.villages.map((village) => (
                <tr key={village.id}>
                  <td><strong>{village.name}</strong></td>
                  <td>{village.zone}</td>
                  <td>{village.riskScore}</td>
                  <td>{village.opportunityScore}</td>
                  <td>{village.sentimentScore}</td>
                  <td>{village.dominantIssues.join(", ")}</td>
                  <td><VerificationBadge status={village.verificationStatus} /></td>
                  <td><div className="row-actions"><a href={`/constituency/villages/${village.id}`}>View</a><a href={`/tasks/new?relatedEntityType=village&relatedEntityId=${village.id}`}>Task</a></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function ZonesScreen() {
  const zones = getConstituencyZoneSummaries();

  return (
    <main className="campaign-structure-workspace constituency-workspace">
      <section className="constituency-zone-grid">
        {zones.map((zone) => (
          <ZoneCard zone={zone} key={zone.id} />
        ))}
      </section>

      <section className="campaign-manager-grid">
        <section className="panel">
          <SectionHeader title="Zone Command Table" eyebrow="Constituency processing layer" actions={<CountPill>{zones.length} zones</CountPill>} />
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Zone</th>
                  <th>Owner</th>
                  <th>Villages</th>
                  <th>Booths</th>
                  <th>Coverage</th>
                  <th>Risk</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {zones.map((zone) => (
                  <tr key={zone.id}>
                    <td><strong>{zone.zoneName}</strong><p className="table-description">{zone.nextAction}</p></td>
                    <td>{ownerName(zone.ownerId)}</td>
                    <td>{zone.villageCount}</td>
                    <td>{zone.boothCount}</td>
                    <td>{zone.coverageScore}%</td>
                    <td>{zone.riskScore}</td>
                    <td><PriorityChip value={zone.priority} /></td>
                    <td><CreateTaskButton relatedEntityType="constituency_zone" relatedEntityId={zone.id} label="Create task" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <ManualEntryPanel title="Create Zone Record" entityLabel="Zone" createHref="/tasks/new?relatedEntityType=constituency_zone&relatedEntityId=new-zone" />
      </section>
    </main>
  );
}

function CommunitiesScreen() {
  return (
    <main className="campaign-structure-workspace constituency-workspace">
      <section className="campaign-manager-grid">
        <section className="panel">
          <SectionHeader title="Community Intelligence" eyebrow="Support, sentiment, trend, and outreach" actions={<CountPill>{repository.communities.length} communities</CountPill>} />
          <div className="constituency-record-grid">
            {repository.communities.map((community) => (
              <article className="campaign-recommendation-card" key={community.id}>
                <div className="badge-row">
                  <VerificationBadge status={community.verificationStatus} />
                  <ConfidenceBadge score={community.confidenceScore} />
                </div>
                <strong>{community.name}</strong>
                <p>{community.supportLevel}% support / {community.sentimentScore}% sentiment / {community.trend} trend</p>
                <div className="progress-track"><i style={{ width: `${community.supportLevel}%` }} /></div>
                <div className="row-actions">
                  <a href={`/tasks/new?relatedEntityType=community&relatedEntityId=${community.id}`}>Create task</a>
                  <a href="/communities">Open manager</a>
                </div>
              </article>
            ))}
          </div>
        </section>
        <ManualEntryPanel title="Create Community Record" entityLabel="Community" createHref="/communities/new" />
      </section>
    </main>
  );
}

function IssuesScreen() {
  return (
    <main className="campaign-structure-workspace constituency-workspace">
      <section className="campaign-manager-grid">
        <section className="panel">
          <SectionHeader title="Issue Heatmap" eyebrow="Issue mapping with political impact" actions={<CountPill>{repository.issues.length} issues</CountPill>} />
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Issue</th>
                  <th>Location</th>
                  <th>Severity</th>
                  <th>Owner</th>
                  <th>Impact</th>
                  <th>Status</th>
                  <th>Verification</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {repository.issues.map((issue) => (
                  <tr key={issue.id}>
                    <td><strong>{issue.title}</strong><p className="table-description">{issue.affectedPopulation}</p></td>
                    <td>{issue.location}</td>
                    <td><PriorityChip value={issue.severity} /></td>
                    <td>{issue.owner}</td>
                    <td>{issue.politicalImpact}</td>
                    <td>{issue.status}</td>
                    <td><VerificationBadge status={issue.verificationStatus} /></td>
                    <td><div className="row-actions"><a href={`/issues/${issue.id}`}>View</a><a href={`/tasks/new?relatedEntityType=issue&relatedEntityId=${issue.id}`}>Task</a></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <ManualEntryPanel title="Create Issue Record" entityLabel="Issue" createHref="/issues/new" />
      </section>
    </main>
  );
}

function InfluencersScreen() {
  return (
    <main className="campaign-structure-workspace constituency-workspace">
      <section className="campaign-manager-grid">
        <section className="panel">
          <SectionHeader title="Influencer Network" eyebrow="People, communities, areas, alignment, and influence score" actions={<CountPill>{repository.influencers.length} influencers</CountPill>} />
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Influencer</th>
                  <th>Type</th>
                  <th>Area</th>
                  <th>Community</th>
                  <th>Alignment</th>
                  <th>Reach</th>
                  <th>Verification</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {repository.influencers.map((influencer) => (
                  <tr key={influencer.id}>
                    <td><strong>{personName(influencer.personId)}</strong></td>
                    <td>{influencer.influenceType}</td>
                    <td>{influencer.primaryArea}</td>
                    <td>{communityName(influencer.primaryCommunityId)}</td>
                    <td>{influencer.alignment}</td>
                    <td>{influencer.reachScore}</td>
                    <td><VerificationBadge status={influencer.verificationStatus} /></td>
                    <td><div className="row-actions"><a href="/relationships/new">Map relation</a><a href={`/tasks/new?relatedEntityType=influencer&relatedEntityId=${influencer.id}`}>Task</a></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <ManualEntryPanel title="Create Influencer Record" entityLabel="Influencer" createHref="/influencers/new" />
      </section>
    </main>
  );
}

function CoverageMapScreen() {
  const summary = getConstituencySummary();

  return (
    <main className="campaign-structure-workspace constituency-workspace">
      <section className="overview-bar constituency-overview">
        {[
          ["Village Coverage", `${summary.villageCoverage}%`, "Input layer"],
          ["Booth Coverage", `${summary.boothCoverage}%`, "Booth layer"],
          ["Owner Coverage", `${summary.ownershipCoverage}%`, "Ownership layer"],
          ["Coverage Gaps", summary.coverageGaps, "Escalation layer"]
        ].map(([label, value, detail]) => (
          <article className="metric-cell compact" key={label}>
            <div className="metric-label">{label}</div>
            <div className="metric-value-row"><strong>{value}</strong><span className="trend-chip trend-stable">{detail}</span></div>
          </article>
        ))}
      </section>
      <section className="workspace-grid top-grid">
        <ConstituencyMapPanel mode="coverage" />
        <section className="panel">
          <SectionHeader title="Coverage Gaps" eyebrow="Campaign structure feed" actions={<CountPill>{repository.coverageGaps.length} gaps</CountPill>} />
          <div className="coverage-engine-list">
            {repository.coverageGaps.map((gap) => (
              <article className={`coverage-engine-row level-${gap.severity}`} key={gap.id}>
                <div>
                  <strong>{gap.gapTitle}</strong>
                  <small>{entityDisplayName(gap.relatedEntityType, gap.relatedEntityId)}</small>
                </div>
                <PriorityChip value={gap.severity} />
                <p>{gap.recommendedAction}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

function ReportsScreen() {
  const profile = repository.constituencyProfiles[0];
  const reports = repository.constituencyReports;
  const tasks = findTasksFor("constituency_profile", profile.id);

  return (
    <main className="campaign-structure-workspace constituency-workspace">
      <section className="workspace-grid two-column">
        {reports.map((report) => (
          <section className="panel" key={report.id}>
            <SectionHeader title={report.title} eyebrow={`${report.reportType.replaceAll("_", " ")} / ${report.period}`} actions={<VerificationBadge status={report.verificationStatus} />} />
            <p>{report.executiveSummary}</p>
            <div className="badge-row">
              <ConfidenceBadge score={report.confidenceScore} />
              <span className="table-status">{report.approvalStatus.replaceAll("_", " ")}</span>
            </div>
            <div className="context-list">
              {report.decisionLog.map((decision) => (
                <article className="context-row" key={decision}>
                  <strong>{decision}</strong>
                  <span>Decision log</span>
                </article>
              ))}
            </div>
            <div className="row-actions">
              <a href={`/tasks/new?relatedEntityType=constituency_report&relatedEntityId=${report.id}`}>Create task</a>
              <a href="/approvals/new">Request approval</a>
            </div>
          </section>
        ))}
        <section className="panel">
          <SectionHeader title="Report Builder Inputs" eyebrow="No public claims without sources" />
          <div className="campaign-control-grid">
            <a href="/sources/new"><strong>Attach Source</strong><span>Public or internal source record</span></a>
            <a href="/evidence/new"><strong>Attach Evidence</strong><span>Document, field report, election result, image, or note</span></a>
            <a href="/verification/new"><strong>Request Verification</strong><span>Queue claims before approval</span></a>
            <a href="/approvals/new"><strong>Request Approval</strong><span>Approve report before campaign use</span></a>
            <a href="/reports/daily-brief"><strong>Daily Brief</strong><span>Push findings into the daily command brief</span></a>
            <a href="/tasks/new"><strong>Create Task</strong><span>Convert report action into owner work</span></a>
          </div>
        </section>
      </section>
      <AssignedTaskList tasks={tasks} />
    </main>
  );
}

function ZoneReadinessPanel() {
  const zones = getConstituencyZoneSummaries();

  return (
    <section className="panel">
      <SectionHeader title="Zone Readiness" eyebrow="Constituency intelligence processing layer" actions={<CountPill>{zones.length} zones</CountPill>} />
      <div className="coverage-engine-list">
        {zones.map((zone) => (
          <article className="coverage-engine-row" key={zone.id}>
            <div>
              <strong>{zone.zoneName}</strong>
              <small>{zone.villageCount} villages / {zone.boothCount} booths / top risk: {zone.topVillage}</small>
            </div>
            <PriorityChip value={zone.priority} />
            <div className="progress-track"><i style={{ width: `${zone.coverageScore}%` }} /></div>
          </article>
        ))}
      </div>
    </section>
  );
}

function WatchlistPanel() {
  return (
    <section className="panel">
      <SectionHeader title="Constituency Watchlist" eyebrow="Risks, issues, booth gaps, and coverage gaps" actions={<CountPill>{repository.constituencyWatchlistItems.length} items</CountPill>} />
      <div className="coverage-engine-list">
        {repository.constituencyWatchlistItems.map((item) => (
          <article className="coverage-engine-row" key={item.id}>
            <div>
              <strong>{item.title}</strong>
              <small>{entityDisplayName(item.relatedEntityType, item.relatedEntityId)} / owner {ownerName(item.ownerId)}</small>
            </div>
            <PriorityChip value={item.severity} />
            <p>{item.recommendedAction}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ZoneCard({ zone }: { zone: ReturnType<typeof getConstituencyZoneSummaries>[number] }) {
  return (
    <article className="campaign-command-card">
      <div className="badge-row">
        <PriorityChip value={zone.priority} />
        <VerificationBadge status={zone.verificationStatus} />
      </div>
      <span>{zone.zoneType.replaceAll("_", " ")} zone</span>
      <strong>{zone.coverageScore}%</strong>
      <p>{zone.zoneName}: {zone.villageCount} villages, {zone.boothCount} booths, {zone.watchlistCount} watchlist items.</p>
      <a href={`/tasks/new?relatedEntityType=constituency_zone&relatedEntityId=${zone.id}`}>Create zone task</a>
    </article>
  );
}

function ConstituencyMapPanel({ mode }: { mode: "geography" | "coverage" }) {
  return (
    <section className="campaign-coverage-map-panel">
      <SectionHeader title={mode === "coverage" ? "Coverage Heat Map" : "Sinnar Field Map"} eyebrow="Interactive map placeholder backed by village records" actions={<CountPill>{repository.villages.length} villages</CountPill>} />
      <div className="campaign-map-stage constituency-map-stage">
        <svg className="campaign-map-lines" viewBox="0 0 100 100" aria-hidden="true">
          <path d="M18 20 L64 12 L88 42 L74 79 L35 88 L11 55 Z" />
          <path d="M26 33 C43 19 63 28 78 42" />
          <path d="M34 82 C42 58 55 44 82 43" />
        </svg>
        {repository.villages.map((village) => {
          const level = village.riskScore >= 65 ? "critical" : village.sentimentScore >= 60 ? "covered" : "partial";
          return (
            <a className={`campaign-map-marker level-${level}`} href={`/constituency/villages/${village.id}`} key={village.id} style={{ left: `${village.mapX}%`, top: `${village.mapY}%` }}>
              <strong>{village.name}</strong>
              <span>{mode === "coverage" ? `${village.sentimentScore}% sentiment` : village.zone}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function InputProcessingIntelligenceAction() {
  return (
    <section className="panel">
      <SectionHeader title="Traceable Data Flow" eyebrow="Every dashboard value points back to an input screen" />
      <div className="integration-matrix">
        <a href="/constituency/villages"><strong>Input Layer</strong><span>Villages, booths, communities, issues, influencers, imports, sources, evidence</span></a>
        <a href="/verification"><strong>Processing Layer</strong><span>Verification, approvals, evidence review, audit logs, confidence scoring</span></a>
        <a href="/constituency"><strong>Intelligence Layer</strong><span>Readiness, watchlist, sentiment, risks, opportunities, zone summaries</span></a>
        <a href="/tasks"><strong>Action Layer</strong><span>Tasks, ownership, escalations, visits, follow-ups, promises</span></a>
        <a href="/constituency/reports"><strong>Reporting Layer</strong><span>Briefs, coverage reports, issue heatmaps, decision logs</span></a>
        <a href="/ownership-registry"><strong>Ownership Layer</strong><span>Primary owner, coordinator, volunteer team, escalation owner, review cadence</span></a>
      </div>
    </section>
  );
}

function ManualEntryPanel({ title, entityLabel, createHref }: { title: string; entityLabel: string; createHref: string }) {
  return (
    <aside className="panel">
      <SectionHeader title={title} eyebrow="Manual full-page entry required" />
      <form className="constituency-manual-form">
        <label>
          <span>{entityLabel} name</span>
          <input placeholder={`Enter ${entityLabel.toLowerCase()} name`} />
        </label>
        <label>
          <span>Primary owner</span>
          <select defaultValue="">
            <option value="">Select owner</option>
            {repository.owners.map((owner) => <option value={owner.id} key={owner.id}>{owner.fullName}</option>)}
          </select>
        </label>
        <label>
          <span>Verification status</span>
          <select defaultValue="needs_verification">
            <option value="unverified">unverified</option>
            <option value="needs_verification">needs_verification</option>
            <option value="partially_verified">partially_verified</option>
            <option value="verified">verified</option>
            <option value="disputed">disputed</option>
            <option value="stale">stale</option>
          </select>
        </label>
        <label>
          <span>Confidence score</span>
          <input defaultValue={50} max={100} min={0} type="number" />
        </label>
        <label>
          <span>Source</span>
          <select defaultValue="">
            <option value="">Select source</option>
            {repository.sourceRecords.map((source) => <option value={source.id} key={source.id}>{source.title}</option>)}
          </select>
        </label>
        <label>
          <span>Evidence</span>
          <select defaultValue="">
            <option value="">Select evidence</option>
            {repository.evidenceItems.map((item) => <option value={item.id} key={item.id}>{item.title}</option>)}
          </select>
        </label>
        <label className="full-span">
          <span>Notes and next verification step</span>
          <textarea placeholder="Record source, confidence logic, approval need, and next verification step." />
        </label>
        <div className="form-actions compact-actions">
          <a href={createHref}>Open full create flow</a>
          <a href="/imports/new">CSV import</a>
          <a href="/sources/new">Attach source</a>
          <a href="/evidence/new">Attach evidence</a>
        </div>
      </form>
    </aside>
  );
}

function average(values: number[]) {
  const usable = values.filter((value) => Number.isFinite(value));
  if (!usable.length) return 0;
  return Math.round(usable.reduce((sum, value) => sum + value, 0) / usable.length);
}

function ownerName(id: string) {
  return repository.owners.find((owner) => owner.id === id)?.fullName ?? (id ? id : "Unassigned");
}

function communityName(id: string) {
  return repository.communities.find((community) => community.id === id)?.name ?? (id ? id : "Not linked");
}

function personName(id: string) {
  return repository.persons.find((person) => person.id === id)?.fullName ?? (id ? id : "Not linked");
}
