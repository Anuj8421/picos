import { EvidenceDrawer } from "@/features/evidence/components/EvidenceDrawer";
import { PlatformShell } from "@/features/platform/PlatformShell";
import { CountPill, PriorityChip, SectionHeader } from "@/features/political-intelligence/components/common";
import { ConfidenceBadge, VerificationBadge } from "@/features/shared/intelligenceBadges";
import { SourceAttachmentPanel } from "@/features/sources/components/SourceAttachmentPanel";
import { CreateTaskButton, TaskStatusBadge } from "@/features/tasks/components/TaskComponents";
import {
  getCampaignCoverageSummary,
  getCampaignStructureRecommendations,
  getCampaignWorkloadSummary,
  repository,
  entityDisplayName,
  findEvidenceFor,
  findSources
} from "@/lib/domain/repositories";
import type { BaseEntity, CoverageGap, EscalationChain } from "@/lib/domain/types";

export type CampaignStructureScreen =
  | "dashboard"
  | "org-chart"
  | "roles"
  | "team-members"
  | "zones"
  | "sectors"
  | "village-assignments"
  | "booth-assignments"
  | "community-desks"
  | "volunteer-teams"
  | "coverage-map"
  | "escalation-matrix"
  | "reporting-lines"
  | "rosters";

const screenMeta: Record<CampaignStructureScreen, { title: string; subtitle: string; href: string }> = {
  dashboard: {
    title: "Campaign Structure Dashboard",
    subtitle: "Command hierarchy, coverage, workload, gaps, escalation, and readiness for Uday Sangle's Sinnar campaign.",
    href: "/campaign-structure"
  },
  "org-chart": {
    title: "Organization Chart",
    subtitle: "Candidate to volunteer reporting structure with responsibilities, territories, performance, and escalation visibility.",
    href: "/campaign-structure/org-chart"
  },
  roles: {
    title: "Role & Responsibility Manager",
    subtitle: "Manage campaign roles, decision rights, permission scope, reporting structure, and review cadence.",
    href: "/campaign-structure/roles"
  },
  "team-members": {
    title: "Team Member Manager",
    subtitle: "Manage campaign members, coordinators, volunteers, status, coverage, workload, and assignment actions.",
    href: "/campaign-structure/team-members"
  },
  zones: {
    title: "Zone Manager",
    subtitle: "Manage zone leads, village and booth coverage, teams, performance, and status.",
    href: "/campaign-structure/zones"
  },
  sectors: {
    title: "Sector Manager",
    subtitle: "Manage sector leads, linked zones, villages, booths, teams, coverage, and performance.",
    href: "/campaign-structure/sectors"
  },
  "village-assignments": {
    title: "Village Assignment Manager",
    subtitle: "Assign villages to coordinators and teams, with risk, opportunity, and action accountability.",
    href: "/campaign-structure/village-assignments"
  },
  "booth-assignments": {
    title: "Booth Assignment Manager",
    subtitle: "Assign booths, coordinators, volunteer teams, coverage, readiness, and escalation paths.",
    href: "/campaign-structure/booth-assignments"
  },
  "community-desks": {
    title: "Community Desk Manager",
    subtitle: "Manage community-specific outreach teams, support, engagement, coverage, and desk staffing.",
    href: "/campaign-structure/community-desks"
  },
  "volunteer-teams": {
    title: "Volunteer Team Manager",
    subtitle: "Manage volunteer teams, assigned territories, assigned tasks, performance, availability, and rebalancing.",
    href: "/campaign-structure/volunteer-teams"
  },
  "coverage-map": {
    title: "Coverage Map",
    subtitle: "Covered and uncovered villages, booths, community desks, volunteer coverage, and gap heatmaps.",
    href: "/campaign-structure/coverage-map"
  },
  "escalation-matrix": {
    title: "Escalation Matrix",
    subtitle: "Campaign escalation chains for village, booth, influencer, community, risk, and execution failures.",
    href: "/campaign-structure/escalation-matrix"
  },
  "reporting-lines": {
    title: "Reporting Line Manager",
    subtitle: "Manage who reports to whom, direct reports, indirect reports, responsibilities, and approval changes.",
    href: "/campaign-structure/reporting-lines"
  },
  rosters: {
    title: "Shift / Roster Manager",
    subtitle: "Manage daily, weekly, election-mode, polling-day, and final-72-hour campaign rosters.",
    href: "/campaign-structure/rosters"
  }
};

type ManagerRow = {
  id: string;
  title: string;
  description: string;
  owner: string;
  scope: string;
  coverage: string;
  workload: string;
  status: string;
  approvalStatus: string;
  verificationStatus: string;
  confidenceScore: number;
  sourceIds: string[];
  entityType: string;
  relatedEntityType: string;
  relatedEntityId: string;
};

type ManagerConfig = {
  eyebrow: string;
  entityType: string;
  createLabel: string;
  rows: ManagerRow[];
  formFields: Array<{ label: string; type?: "input" | "select" | "textarea"; options?: string[] }>;
};

export function CampaignStructureRoutePage({ screen }: { screen: CampaignStructureScreen }) {
  const meta = screenMeta[screen];

  return (
    <PlatformShell activeCoreModule="campaign-structure" activeModuleSection={screen}>
      <header className="candidate-header campaign-structure-header">
        <div>
          <span className="eyebrow">Core Operations / Campaign Command Structure</span>
          <h1>{meta.title}</h1>
          <p>{meta.subtitle}</p>
        </div>
        <div className="manager-header-actions">
          <a className="action-btn" href="/ownership-registry">Ownership Registry</a>
          <a className="action-btn" href="/visits">Visit Intelligence</a>
          <a className="action-btn" href="/tasks">Tasks</a>
        </div>
      </header>

      {screen === "dashboard" ? <CampaignStructureDashboard /> : null}
      {screen === "org-chart" ? <OrganizationChartScreen /> : null}
      {screen === "coverage-map" ? <CoverageMapScreen /> : null}
      {screen !== "dashboard" && screen !== "org-chart" && screen !== "coverage-map" ? (
        <CampaignStructureManager screen={screen} />
      ) : null}
    </PlatformShell>
  );
}

function CampaignStructureDashboard() {
  const coverage = getCampaignCoverageSummary();
  const workload = getCampaignWorkloadSummary();
  const recommendations = getCampaignStructureRecommendations();
  const organization = repository.campaignOrganizations[0];
  const sources = findSources(organization.sourceIds);
  const evidence = findEvidenceFor("campaign_organization", organization.id);

  const metrics = [
    ["Total Team Members", coverage.totalTeamMembers, "+8%", "Active structure"],
    ["Total Volunteers", coverage.totalVolunteers, "+2", "Volunteer layer"],
    ["Active Coordinators", coverage.activeCoordinators, "+3", "Command owners"],
    ["Zones Covered", coverage.zonesCovered, `${coverage.villageCoverage}%`, "Zone coverage"],
    ["Sectors Covered", coverage.sectorsCovered, `${coverage.boothCoverage}%`, "Sector coverage"],
    ["Villages Covered", coverage.villagesCovered, `${coverage.villageCoverage}%`, "Village coverage"],
    ["Booths Covered", coverage.boothsCovered, `${coverage.boothCoverage}%`, "Booth coverage"],
    ["Communities Covered", coverage.communitiesCovered, `${coverage.communityCoverage}%`, "Community desks"],
    ["Coverage %", `${coverage.overallCoverage}%`, "+6%", "Total readiness"],
    ["Coverage Gaps", coverage.coverageGaps, "Open", "Needs owner action"],
    ["Overloaded Coordinators", coverage.overloadedCoordinators, "Critical", "Rebalance"],
    ["Open Escalations", coverage.openEscalations, "Live", "Command risk"],
    ["Active Teams", coverage.activeTeams, "Live", "Field capacity"],
    ["Inactive Teams", coverage.inactiveTeams, "Watch", "Coverage drag"],
    ["Team Readiness", `${coverage.teamReadinessScore}%`, "Rising", "Team capability"],
    ["Structure Readiness", `${coverage.campaignStructureReadinessScore}%`, "Watch", "Campaign command"]
  ] as const;

  return (
    <main className="campaign-structure-workspace">
      <section className="campaign-first-screen module-first-screen" id="overview">
        <CampaignStructureSituationRoom coverage={coverage} metrics={metrics} overloadedOwners={workload.overloaded.length} recommendations={recommendations.length} />
        <CampaignStructureCoverageMapPanel coverage={coverage} />
      </section>

      <section className="workspace-grid two-column">
        <CoverageSummaryPanel />
        <WorkloadSummaryPanel />
      </section>

      <section className="panel">
        <SectionHeader title="AI Campaign Structure Recommendations" eyebrow="Generated from coverage, workload, ownership, source, and verification gaps" actions={<CountPill>{recommendations.length} recommendations</CountPill>} />
        <div className="campaign-recommendation-grid">
          {recommendations.map((item) => (
            <article className="campaign-recommendation-card" key={`${item.category}-${item.title}`}>
              <div className="badge-row">
                <PriorityChip value={item.severity} />
                <VerificationBadge status={item.verificationStatus} />
                <ConfidenceBadge score={item.confidenceScore} />
              </div>
              <strong>{item.title}</strong>
              <p>{item.recommendation}</p>
              <div className="row-actions">
                <a href={`/tasks/new?relatedEntityType=${item.relatedEntityType}&relatedEntityId=${item.relatedEntityId}`}>Create task</a>
                <a href="/approvals/new">Request approval</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="workspace-grid two-column">
        <SourceAttachmentPanel sources={sources} />
        <EvidenceDrawer evidence={evidence} sources={sources} />
      </section>

      <IntegrationMatrix />
    </main>
  );
}

function CampaignStructureSituationRoom({
  coverage,
  metrics,
  overloadedOwners,
  recommendations
}: {
  coverage: ReturnType<typeof getCampaignCoverageSummary>;
  metrics: ReadonlyArray<readonly [string, string | number, string, string]>;
  overloadedOwners: number;
  recommendations: number;
}) {
  const executionReadiness = average([coverage.overallCoverage, coverage.teamReadinessScore, coverage.campaignStructureReadinessScore, 100 - Math.min(100, coverage.coverageGaps * 10), 100 - Math.min(100, overloadedOwners * 18)]);
  const answer = executionReadiness >= 68 ? "Organization can execute, not at election mode." : "Execution machine is not ready yet.";
  const directive = coverage.coverageGaps > 0 || overloadedOwners > 0
    ? "Close Devpur coverage, rebalance overloaded coordinators, and lock booth/community owners before scaling visits."
    : "Move the structure into election-mode rosters and assign owners to every priority village.";
  const situationMetrics = [
    { label: "Execution Readiness", score: executionReadiness, state: "Composite structure posture", detail: "Coverage, team, gaps, workload", tone: "win" },
    { label: "Coverage", score: coverage.overallCoverage, state: "Total readiness", detail: "Villages, booths, communities", tone: "coverage" },
    { label: "Team Readiness", score: coverage.teamReadinessScore, state: "Field capacity", detail: "Team capability and availability", tone: "volunteer" },
    { label: "Structure Readiness", score: coverage.campaignStructureReadinessScore, state: "Command chain", detail: "Reporting, ownership, escalation", tone: "execution" },
    { label: "Village Coverage", score: coverage.villageCoverage, state: `${coverage.villagesCovered} covered`, detail: "Village owner coverage", tone: "support" },
    { label: "Booth Coverage", score: coverage.boothCoverage, state: `${coverage.boothsCovered} covered`, detail: "Booth assignment coverage", tone: "booth" },
    { label: "Community Coverage", score: coverage.communityCoverage, state: `${coverage.communitiesCovered} desks`, detail: "Community desk coverage", tone: "turnout" }
  ] as const;

  return (
    <section className="situation-room module-situation-room">
      <div className="situation-room-lead">
        <div>
          <span className="eyebrow">Execution Situation Room</span>
          <h2>{answer}</h2>
          <div className="situation-status-strip" aria-label="Campaign structure status">
            <span>{coverage.coverageGaps} gaps</span>
            <span>{overloadedOwners} overloaded</span>
            <span>{recommendations} recommendations</span>
          </div>
        </div>
        <p>Campaign structure is the machine that turns Uday's support into repeatable field action: owners, teams, booths, rosters, and escalation paths.</p>
        <div className="situation-decision">
          <span>What should Uday do next?</span>
          <strong>{directive}</strong>
        </div>
        <div className="situation-directives">
          <a href="/campaign-structure/coverage-map">Close coverage gaps</a>
          <a href="/campaign-structure/team-members">Rebalance owners</a>
          <a href="/campaign-structure/rosters">Lock rosters</a>
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
        <span>Structure pressure</span>
        <strong>{coverage.coverageGaps} open coverage gaps</strong>
        <p>{metrics.find(([label]) => label === "Overloaded Coordinators")?.[3] ?? "Rebalance workload before election mode."}</p>
      </article>
    </section>
  );
}

function CampaignStructureCoverageMapPanel({ coverage }: { coverage: ReturnType<typeof getCampaignCoverageSummary> }) {
  return (
    <section className="panel campaign-coverage-map-panel">
      <SectionHeader title="Campaign Coverage Map" eyebrow="Politics is geography plus ownership" actions={<CountPill>{coverage.overallCoverage}% total coverage</CountPill>} />
      <div className="campaign-map-stage">
        <svg viewBox="0 0 100 100" className="campaign-map-lines" aria-hidden="true">
          <path d="M18 18 C35 5 62 11 78 25 C91 41 83 70 62 84 C42 96 19 83 12 63 C4 42 7 25 18 18Z" />
          <path d="M22 42 L76 52" />
          <path d="M48 18 L48 86" />
        </svg>
        {repository.villages.map((village) => {
          const coverageRecord = repository.coverageRecords.find((record) => record.relatedEntityId.includes(village.id) || record.gapReason.includes(village.name));
          const cluster = repository.villageClusters.find((item) => item.villageIds.includes(village.id));
          const level = cluster && cluster.coverageScore > 65 ? "covered" : cluster && cluster.coverageScore > 0 ? "partial" : "critical";
          return (
            <a className={`campaign-map-marker level-${level}`} href={`/constituency/villages/${village.id}`} style={{ left: `${village.mapX}%`, top: `${village.mapY}%` }} key={village.id}>
              <strong>{village.name}</strong>
              <span>{cluster?.coverageScore ?? coverageRecord?.coverageScore ?? 0}%</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function OrganizationChartScreen() {
  const childrenByParent = repository.organizationUnits.reduce<Record<string, typeof repository.organizationUnits>>((acc, unit) => {
    const key = unit.parentUnitId || "root";
    acc[key] = [...(acc[key] ?? []), unit];
    return acc;
  }, {});

  function renderUnit(unitId: string, depth = 0) {
    const children = childrenByParent[unitId] ?? [];
    return children.map((unit) => (
      <details className={`campaign-org-node depth-${depth}`} open={depth < 2} key={unit.id}>
        <summary>
          <span>{unit.unitType.replaceAll("_", " ")}</span>
          <strong>{unit.unitName}</strong>
          <small>{ownerName(unit.ownerId)} / coverage {unit.coverageScore}% / workload {unit.workloadScore}%</small>
        </summary>
        <div className="campaign-org-actions">
          <a href={`/campaign-structure/roles?unit=${unit.id}`}>View responsibilities</a>
          <a href={`/campaign-structure/coverage-map?unit=${unit.id}`}>View territories</a>
          <a href={`/campaign-structure/team-members?unit=${unit.id}`}>View performance</a>
          <a href={`/campaign-structure/escalation-matrix?unit=${unit.id}`}>View escalations</a>
        </div>
        {renderUnit(unit.id, depth + 1)}
      </details>
    ));
  }

  return (
    <main className="campaign-structure-workspace">
      <section className="campaign-org-chart-shell">
        <SectionHeader title="Interactive Campaign Hierarchy" eyebrow="Expand, collapse, inspect responsibilities, territories, performance, and escalations" />
        <div className="campaign-org-tree">{renderUnit("root")}</div>
      </section>
      <section className="workspace-grid two-column">
        <CampaignHierarchyTable />
        <EscalationPathExamples />
      </section>
    </main>
  );
}

function CoverageMapScreen() {
  const coverage = getCampaignCoverageSummary();

  return (
    <main className="campaign-structure-workspace">
      <section className="campaign-map-filters" aria-label="Coverage map filters">
        {["Zone", "Sector", "Village", "Community", "Team", "Coverage Level"].map((label) => (
          <label key={label}>
            <span>{label}</span>
            <select defaultValue="">
              <option value="">All</option>
              <option value="covered">Covered</option>
              <option value="partial">Partial</option>
              <option value="critical">Critical gap</option>
            </select>
          </label>
        ))}
      </section>

      <section className="panel campaign-coverage-map-panel">
        <SectionHeader title="Sinnar Coverage Map" eyebrow="Covered villages, uncovered villages, covered booths, community desks, volunteer coverage, heatmap" actions={<CountPill>{coverage.overallCoverage}% total coverage</CountPill>} />
        <div className="campaign-map-stage">
          <svg viewBox="0 0 100 100" className="campaign-map-lines" aria-hidden="true">
            <path d="M18 18 C35 5 62 11 78 25 C91 41 83 70 62 84 C42 96 19 83 12 63 C4 42 7 25 18 18Z" />
            <path d="M22 42 L76 52" />
            <path d="M48 18 L48 86" />
          </svg>
          {repository.villages.map((village) => {
            const coverageRecord = repository.coverageRecords.find((record) => record.relatedEntityId.includes(village.id) || record.gapReason.includes(village.name));
            const cluster = repository.villageClusters.find((item) => item.villageIds.includes(village.id));
            const level = cluster && cluster.coverageScore > 65 ? "covered" : cluster && cluster.coverageScore > 0 ? "partial" : "critical";
            return (
              <a className={`campaign-map-marker level-${level}`} href={`/constituency/villages/${village.id}`} style={{ left: `${village.mapX}%`, top: `${village.mapY}%` }} key={village.id}>
                <strong>{village.name}</strong>
                <span>{cluster?.coverageScore ?? coverageRecord?.coverageScore ?? 0}%</span>
              </a>
            );
          })}
        </div>
      </section>

      <section className="workspace-grid two-column">
        <CoverageSummaryPanel />
        <GapTable />
      </section>
    </main>
  );
}

function CampaignStructureManager({ screen }: { screen: Exclude<CampaignStructureScreen, "dashboard" | "org-chart" | "coverage-map"> }) {
  const config = getManagerConfig(screen);
  return (
    <main className="campaign-structure-workspace">
      <section className="overview-bar campaign-manager-overview">
        <Metric label="Records" value={config.rows.length} detail={config.createLabel} />
        <Metric label="Needs Review" value={config.rows.filter((row) => row.status.includes("review") || row.status === "pending_review").length} detail="Verification/approval" tone="watch" />
        <Metric label="Critical / Overloaded" value={config.rows.filter((row) => row.status.includes("overloaded") || row.status.includes("escalated") || row.status.includes("unassigned")).length} detail="Command attention" tone="critical" />
        <Metric label="Avg Confidence" value={`${average(config.rows.map((row) => row.confidenceScore))}%`} detail="Source discipline" />
        <Metric label="Task Ready" value={config.rows.length} detail="Every row can become action" tone="positive" />
      </section>

      <section className="manager-list-toolbar">
        <div>
          <span className="eyebrow">{config.eyebrow}</span>
          <h2>{config.rows.length} campaign command records</h2>
        </div>
        <div className="manager-toolbar-actions">
          <a className="action-btn" href="#manual-entry">Manual Entry</a>
          <a className="action-btn" href="/imports/new">CSV Import</a>
          <a className="action-btn" href="/verification">Verification Queue</a>
          <a className="action-btn" href="/approvals">Approval Queue</a>
        </div>
      </section>

      <section className="manager-table-panel">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                {["Record", "Owner / Lead", "Scope", "Coverage", "Workload / Readiness", "Status", "Verification", "Approval", "Confidence", "Actions"].map((column) => <th key={column}>{column}</th>)}
              </tr>
            </thead>
            <tbody>
              {config.rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <strong>{row.title}</strong>
                    <p className="table-description">{row.description}</p>
                  </td>
                  <td>{row.owner}</td>
                  <td>{row.scope}</td>
                  <td>{row.coverage}</td>
                  <td>{row.workload}</td>
                  <td><span className={`table-status status-${row.status.replaceAll("_", "-")}`}>{row.status.replaceAll("_", " ")}</span></td>
                  <td><VerificationBadge status={row.verificationStatus} /></td>
                  <td><span className={`task-status status-${row.approvalStatus.replaceAll("_", "-")}`}>{row.approvalStatus.replaceAll("_", " ")}</span></td>
                  <td><ConfidenceBadge score={row.confidenceScore} /></td>
                  <td>
                    <div className="row-actions">
                      <a href={`/ownership-registry?entityType=${row.entityType}&entityId=${row.id}`}>Ownership</a>
                      <a href={`/tasks/new?relatedEntityType=${row.entityType}&relatedEntityId=${row.id}`}>Task</a>
                      <a href={`/evidence/new?relatedEntityType=${row.entityType}&relatedEntityId=${row.id}`}>Evidence</a>
                      <a href={`/approvals/new?recordType=${row.entityType}&recordId=${row.id}`}>Approve</a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="campaign-manager-grid">
        <ManualEntryFrame config={config} />
      </section>

      {screen === "escalation-matrix" ? <EscalationPathExamples /> : null}
      {screen === "reporting-lines" ? <ReportingLinesContext /> : null}
      {screen === "rosters" ? <RosterShiftPanel /> : null}
    </main>
  );
}

function ManualEntryFrame({ config }: { config: ManagerConfig }) {
  return (
    <form className="manager-form campaign-manual-form" id="manual-entry" action="#">
      <section className="form-section">
        <div className="section-header">
          <div>
            <span className="eyebrow">Full-page manual input</span>
            <h2>{config.createLabel}</h2>
          </div>
          <CountPill>CSV supported, not required</CountPill>
        </div>
        <div className="form-grid">
          {config.formFields.map((field) => (
            <label className={field.type === "textarea" ? "full-span" : ""} key={field.label}>
              <span>{field.label}</span>
              {field.type === "textarea" ? (
                <textarea placeholder={`Enter ${field.label.toLowerCase()}`} />
              ) : field.type === "select" ? (
                <select defaultValue="">
                  <option value="">Select</option>
                  {(field.options ?? []).map((option) => <option value={option} key={option}>{option}</option>)}
                </select>
              ) : (
                <input placeholder={`Enter ${field.label.toLowerCase()}`} />
              )}
            </label>
          ))}
          <label>
            <span>Source Record</span>
            <select defaultValue="">
              <option value="">Attach source</option>
              {repository.sourceRecords.map((source) => <option value={source.id} key={source.id}>{source.title}</option>)}
            </select>
          </label>
          <label>
            <span>Evidence Item</span>
            <select defaultValue="">
              <option value="">Attach evidence</option>
              {repository.evidenceItems.map((item) => <option value={item.id} key={item.id}>{item.title}</option>)}
            </select>
          </label>
          <label>
            <span>Verification Status</span>
            <select defaultValue="needs_verification">
              {["unverified", "needs_verification", "partially_verified", "verified", "disputed", "stale"].map((status) => <option value={status} key={status}>{status.replaceAll("_", " ")}</option>)}
            </select>
          </label>
          <label>
            <span>Confidence Score</span>
            <input type="number" min="0" max="100" placeholder="0-100" />
          </label>
          <label>
            <span>Approval Status</span>
            <select defaultValue="pending_review">
              {["draft", "pending_review", "approved", "rejected", "changes_requested"].map((status) => <option value={status} key={status}>{status.replaceAll("_", " ")}</option>)}
            </select>
          </label>
          <label className="full-span">
            <span>Audit Note</span>
            <textarea placeholder="Record reason, source date checked, next verification step, and approval note" />
          </label>
        </div>
      </section>
      <div className="form-actions">
        <button type="submit">Save draft</button>
        <button type="submit">Submit for verification</button>
        <a href="/imports/new">Open CSV import</a>
      </div>
    </form>
  );
}

function CoverageSummaryPanel() {
  const coverage = getCampaignCoverageSummary();
  const rows = [
    ["Village Coverage", coverage.villageCoverage, `${coverage.villagesCovered}/${repository.villages.length}`],
    ["Booth Coverage", coverage.boothCoverage, `${coverage.boothsCovered}/${repository.booths.length}`],
    ["Community Coverage", coverage.communityCoverage, `${coverage.communitiesCovered}/${repository.communities.length}`],
    ["Volunteer Coverage", coverage.volunteerCoverage, `${coverage.activeTeams}/${repository.volunteerTeams.length}`],
    ["Owner Coverage", coverage.ownerCoverage, `${repository.teamMembers.filter((member) => member.ownerId).length}/${repository.teamMembers.length}`]
  ] as const;

  return (
    <section className="panel">
      <SectionHeader title="Coverage Engine" eyebrow="Calculated from zones, sectors, village clusters, booth clusters, community desks, teams, and owners" />
      <div className="coverage-engine-list">
        {rows.map(([label, value, detail]) => (
          <article className="coverage-engine-row" key={label}>
            <span>{label}</span>
            <strong>{value}%</strong>
            <div className="progress-track"><i style={{ width: `${value}%` }} /></div>
            <small>{detail}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function WorkloadSummaryPanel() {
  const workload = getCampaignWorkloadSummary();

  return (
    <section className="panel">
      <SectionHeader title="Workload Engine" eyebrow="Calculated from assignments, tasks, visits, follow-ups, promises, risks, and opportunities" actions={<CountPill>{workload.averageWorkloadScore}% avg</CountPill>} />
      <div className="workload-list">
        {workload.rows.slice(0, 6).map((row) => (
          <article className={`workload-row status-${row.overloadStatus}`} key={row.ownerId}>
            <div>
              <strong>{row.ownerName}</strong>
              <span>{row.assignedVillages} villages / {row.assignedBooths} booths / {row.assignedTasks} tasks / {row.assignedVisits} visits</span>
            </div>
            <strong>{row.workloadScore}%</strong>
            <span>{row.overloadStatus}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function IntegrationMatrix() {
  const links = [
    ["Ownership Registry", "/ownership-registry", "Primary owner, secondary owner, coordinator, escalation owner"],
    ["Visit Intelligence", "/visits", "Field movement, conversations, outcomes, follow-ups"],
    ["Tasks", "/tasks", "Convert gaps, recommendations, roster misses, and escalations"],
    ["Villages", "/constituency/villages", "Territory coverage and village command"],
    ["Booths", "/constituency/booths", "Booth assignment and readiness"],
    ["Communities", "/communities", "Community desks and sentiment ownership"],
    ["Risks", "/risks", "Execution risk and escalation"],
    ["Opportunities", "/opportunities", "Upside ownership and outreach teams"],
    ["Verification", "/verification", "Record quality gate"],
    ["Approvals", "/approvals", "Decision and publishing gate"],
    ["Audit Logs", "/audit-logs", "Change history and accountability"]
  ];

  return (
    <section className="panel">
      <SectionHeader title="Connected PICOS Integrations" eyebrow="Campaign Structure is the command layer behind execution" />
      <div className="integration-matrix">
        {links.map(([label, href, detail]) => (
          <a href={href} key={label}>
            <strong>{label}</strong>
            <span>{detail}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function CampaignHierarchyTable() {
  return (
    <section className="panel table-panel">
      <SectionHeader title="Hierarchy Relationships" eyebrow="Reports to, escalates to, coordinates with" />
      <div className="table-scroll">
        <table>
          <thead>
            <tr><th>Parent</th><th>Child</th><th>Relationship</th><th>Depth</th><th>Verification</th><th>Approval</th></tr>
          </thead>
          <tbody>
            {repository.campaignHierarchy.map((row) => (
              <tr key={row.id}>
                <td>{organizationUnitName(row.parentUnitId)}</td>
                <td>{organizationUnitName(row.childUnitId)}</td>
                <td>{row.relationshipType.replaceAll("_", " ")}</td>
                <td>{row.depth}</td>
                <td><VerificationBadge status={row.verificationStatus} /></td>
                <td><TaskStatusBadge status={row.approvalStatus} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function EscalationPathExamples() {
  const paths = [
    ["Village Issue", "Village Coordinator", "Sector Lead", "Zone Lead", "Campaign Manager"],
    ["Booth Issue", "Booth Coordinator", "Sector Lead", "Campaign Manager", "War Room Daily Review"],
    ["Influencer Issue", "Relationship Owner", "Intelligence Lead", "Campaign Manager", "Candidate Review"],
    ["Community Desk Gap", "Community Lead", "War Room Lead", "Campaign Manager", "Roster Rebalance"]
  ];

  return (
    <section className="panel">
      <SectionHeader title="Escalation Path Examples" eyebrow="Campaign command chain, not HR workflow" />
      <div className="escalation-path-list">
        {paths.map((path) => (
          <article className="escalation-path" key={path[0]}>
            {path.map((step, index) => (
              <span key={`${path[0]}-${step}`}>{index > 0 ? "-> " : ""}{step}</span>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}

function GapTable() {
  return (
    <section className="panel table-panel">
      <SectionHeader title="Detected Coverage Gaps" eyebrow="Unassigned territories, community gaps, overload, missing source records" />
      <div className="table-scroll">
        <table>
          <thead>
            <tr><th>Gap</th><th>Type</th><th>Severity</th><th>Recommendation</th><th>Action</th></tr>
          </thead>
          <tbody>
            {repository.coverageGaps.map((gap) => (
              <tr key={gap.id}>
                <td><strong>{gap.gapTitle}</strong></td>
                <td>{gap.gapType.replaceAll("_", " ")}</td>
                <td><PriorityChip value={gap.severity} /></td>
                <td>{gap.recommendedAction}</td>
                <td><CreateTaskButton relatedEntityType="coverage_gap" relatedEntityId={gap.id} label="Create task" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ReportingLinesContext() {
  return (
    <section className="panel">
      <SectionHeader title="Reporting Line Change Controls" eyebrow="Approval required for command changes" />
      <div className="campaign-control-grid">
        {["Change reporting line", "Approve change", "View history", "Create escalation", "Attach source", "Attach evidence"].map((item) => (
          <a href={item.includes("Approve") ? "/approvals/new" : item.includes("source") ? "/sources/new" : item.includes("evidence") ? "/evidence/new" : "/tasks/new"} key={item}>{item}</a>
        ))}
      </div>
    </section>
  );
}

function RosterShiftPanel() {
  return (
    <section className="panel table-panel">
      <SectionHeader title="Shift Assignments" eyebrow="Daily, weekly, election mode, polling day, final 72 hours" />
      <div className="table-scroll">
        <table>
          <thead>
            <tr><th>Person</th><th>Role</th><th>Shift</th><th>Coverage Area</th><th>Availability</th><th>Status</th><th>Approval</th></tr>
          </thead>
          <tbody>
            {repository.shiftAssignments.map((shift) => (
              <tr key={shift.id}>
                <td>{teamMemberName(shift.teamMemberId)}</td>
                <td>{roleName(shift.campaignRoleId)}</td>
                <td>{shift.shiftLabel}</td>
                <td>{shift.coverageArea}</td>
                <td>{shift.availability.replaceAll("_", " ")}</td>
                <td><TaskStatusBadge status={shift.status} /></td>
                <td><TaskStatusBadge status={shift.approvalStatus} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function getManagerConfig(screen: Exclude<CampaignStructureScreen, "dashboard" | "org-chart" | "coverage-map">): ManagerConfig {
  if (screen === "roles") {
    return {
      eyebrow: "Role, responsibility, permission, and review cadence",
      entityType: "campaign_role",
      createLabel: "Create campaign role",
      rows: repository.campaignRoles.map((role) => rowFromEntity(role, {
        entityType: "campaign_role",
        title: role.roleName,
        description: role.description,
        owner: ownerName(role.reportingManagerId) || "Top-level",
        scope: role.territoryScope,
        coverage: role.teamScope,
        workload: `${role.permissionScope.length} permissions`,
        status: role.status,
        approvalStatus: role.approvalStatus
      })),
      formFields: commonFormFields(["Role Name", "Reporting Manager", "Escalation Manager", "Territory Scope", "Team Scope", "Permission Scope", "Review Cadence", "Status"])
    };
  }

  if (screen === "team-members") {
    return {
      eyebrow: "People, coordinators, volunteers, coverage, workload, availability",
      entityType: "team_member",
      createLabel: "Create team member",
      rows: repository.teamMembers.map((member) => rowFromEntity(member, {
        entityType: "team_member",
        title: member.fullName,
        description: `${roleName(member.campaignRoleId)} / ${member.availability.replaceAll("_", " ")}`,
        owner: ownerName(member.ownerId) || "Volunteer placeholder",
        scope: `${zoneName(member.zoneId)} / ${sectorName(member.sectorId)}`,
        coverage: `${member.coverageScore}%`,
        workload: `${member.workloadScore}% workload`,
        status: member.status,
        approvalStatus: member.approvalStatus
      })),
      formFields: commonFormFields(["Name", "Role", "Zone", "Sector", "Village", "Community", "Team", "Manager", "Escalation Owner", "Availability", "Contact Placeholder"])
    };
  }

  if (screen === "zones") {
    return {
      eyebrow: "Zone lead, villages, booths, teams, coverage, performance",
      entityType: "zone",
      createLabel: "Create zone",
      rows: repository.zones.map((zone) => rowFromEntity(zone, {
        entityType: "zone",
        title: zone.zoneName,
        description: `${zone.villageIds.length} villages / ${zone.boothIds.length} booths / ${zone.teamIds.length} teams`,
        owner: ownerName(zone.zoneLeadOwnerId) || "Unassigned",
        scope: zone.villageIds.map((id) => villageName(id)).join(", "),
        coverage: `${zone.coverageScore}%`,
        workload: `${zone.performanceScore}% performance`,
        status: zone.status,
        approvalStatus: zone.approvalStatus
      })),
      formFields: commonFormFields(["Zone Name", "Zone Lead", "Villages Covered", "Booths Covered", "Teams", "Coverage Score", "Performance Score", "Status"])
    };
  }

  if (screen === "sectors") {
    return {
      eyebrow: "Sector lead, zone linkage, villages, booths, teams",
      entityType: "sector",
      createLabel: "Create sector",
      rows: repository.sectors.map((sector) => rowFromEntity(sector, {
        entityType: "sector",
        title: sector.sectorName,
        description: `${zoneName(sector.zoneId)} / ${sector.villageIds.length} villages / ${sector.boothIds.length} booths`,
        owner: ownerName(sector.sectorLeadOwnerId) || "Unassigned",
        scope: sector.villageIds.map((id) => villageName(id)).join(", "),
        coverage: `${sector.coverageScore}%`,
        workload: `${sector.performanceScore}% performance`,
        status: sector.status,
        approvalStatus: sector.approvalStatus
      })),
      formFields: commonFormFields(["Sector Name", "Zone", "Sector Lead", "Villages", "Booths", "Teams", "Coverage", "Performance", "Status"])
    };
  }

  if (screen === "village-assignments") {
    return {
      eyebrow: "Village owner, coordinator, team, risk, opportunity, escalation",
      entityType: "village_cluster",
      createLabel: "Create village assignment",
      rows: repository.villageClusters.map((cluster) => rowFromEntity(cluster, {
        entityType: "village_cluster",
        title: cluster.clusterName,
        description: cluster.villageIds.map((id) => villageName(id)).join(", "),
        owner: ownerName(cluster.coordinatorOwnerId) || "Unassigned",
        scope: `${zoneName(cluster.zoneId)} / ${sectorName(cluster.sectorId)}`,
        coverage: `${cluster.coverageScore}% / risk ${cluster.riskScore}`,
        workload: `Opportunity ${cluster.opportunityScore}`,
        status: cluster.status,
        approvalStatus: cluster.approvalStatus
      })),
      formFields: commonFormFields(["Village", "Owner", "Coordinator", "Volunteer Team", "Coverage", "Risk", "Opportunity", "Status"])
    };
  }

  if (screen === "booth-assignments") {
    return {
      eyebrow: "Booth coordinator, volunteer team, coverage, readiness",
      entityType: "booth_cluster",
      createLabel: "Create booth assignment",
      rows: repository.boothClusters.map((cluster) => rowFromEntity(cluster, {
        entityType: "booth_cluster",
        title: cluster.clusterName,
        description: `${villageName(cluster.villageId)} / ${cluster.boothIds.map((id) => boothName(id)).join(", ")}`,
        owner: ownerName(cluster.boothCoordinatorOwnerId) || "Unassigned",
        scope: teamName(cluster.volunteerTeamId),
        coverage: `${cluster.coverageScore}%`,
        workload: `${cluster.readinessScore}% readiness`,
        status: cluster.status,
        approvalStatus: cluster.approvalStatus
      })),
      formFields: commonFormFields(["Booth", "Village", "Booth Coordinator", "Volunteer Team", "Coverage", "Readiness", "Status"])
    };
  }

  if (screen === "community-desks") {
    return {
      eyebrow: "Community desk lead, support, engagement, coverage",
      entityType: "community_desk",
      createLabel: "Create community desk",
      rows: repository.communityDesks.map((desk) => rowFromEntity(desk, {
        entityType: "community_desk",
        title: desk.deskName,
        description: communityName(desk.communityId),
        owner: ownerName(desk.leadOwnerId) || "Unassigned",
        scope: teamName(desk.volunteerTeamId),
        coverage: `${desk.coverageScore}% / support ${desk.supportScore}`,
        workload: `${desk.engagementScore}% engagement`,
        status: desk.status,
        approvalStatus: desk.approvalStatus
      })),
      formFields: commonFormFields(["Desk Name", "Community", "Lead", "Team", "Coverage", "Support Score", "Engagement Score", "Status"])
    };
  }

  if (screen === "volunteer-teams") {
    return {
      eyebrow: "Volunteer team lead, members, territories, tasks, performance, availability",
      entityType: "volunteer_team",
      createLabel: "Create volunteer team",
      rows: repository.volunteerTeams.map((team) => rowFromEntity(team, {
        entityType: "volunteer_team",
        title: team.teamName,
        description: `${team.memberIds.length} members / ${team.assignedTaskIds.length} assigned tasks`,
        owner: ownerName(team.leadOwnerId) || "Unassigned",
        scope: `${team.assignedVillageIds.map((id) => villageName(id)).join(", ")} / ${team.assignedCommunityIds.map((id) => communityName(id)).join(", ")}`,
        coverage: `${team.coverageScore}%`,
        workload: `${team.performanceScore}% performance / ${team.availability.replaceAll("_", " ")}`,
        status: team.status,
        approvalStatus: team.approvalStatus
      })),
      formFields: commonFormFields(["Team", "Lead", "Members", "Assigned Territories", "Assigned Tasks", "Performance", "Availability", "Coverage", "Status"])
    };
  }

  if (screen === "escalation-matrix") {
    const escalationRows: ManagerRow[] = [
      ...repository.escalationChains.map((chain) => escalationRow(chain)),
      ...repository.coverageGaps.map((gap) => coverageGapRow(gap))
    ];
    return {
      eyebrow: "Escalation chain, current owner, escalation owner, overdue, severity, status",
      entityType: "escalation_chain",
      createLabel: "Create escalation chain",
      rows: escalationRows,
      formFields: commonFormFields(["Entity", "Current Owner", "Escalation Owner", "Days Overdue", "Severity", "Status", "Next Action"])
    };
  }

  if (screen === "reporting-lines") {
    return {
      eyebrow: "Person, manager, reports to, direct reports, responsibilities, coverage",
      entityType: "reporting_line",
      createLabel: "Create reporting line",
      rows: repository.reportingLines.map((line) => rowFromEntity(line, {
        entityType: "reporting_line",
        title: `${ownerName(line.ownerId)} -> ${ownerName(line.reportsToOwnerId)}`,
        description: `${line.level} / ${line.scope}`,
        owner: ownerName(line.ownerId),
        scope: `Reports to ${ownerName(line.reportsToOwnerId)}`,
        coverage: line.scope,
        workload: `${directReportCount(line.ownerId)} direct reports`,
        status: line.status,
        approvalStatus: line.approvalStatus
      })),
      formFields: commonFormFields(["Person", "Manager", "Reports To", "Responsibilities", "Coverage", "Change Reason", "Status"])
    };
  }

  return {
    eyebrow: "Roster, shifts, coverage area, availability, approval",
    entityType: "roster",
    createLabel: "Create shift or roster",
    rows: repository.rosters.map((roster) => rowFromEntity(roster, {
      entityType: "roster",
      title: roster.rosterName,
      description: `${roster.rosterType.replaceAll("_", " ")} / ${roster.dateRange}`,
      owner: ownerName(roster.ownerId) || "Unassigned",
      scope: `${zoneName(roster.zoneId)} / ${sectorName(roster.sectorId)}`,
      coverage: `${repository.shiftAssignments.filter((shift) => shift.rosterId === roster.id).length} shifts`,
      workload: roster.rosterType.replaceAll("_", " "),
      status: roster.status,
      approvalStatus: roster.approvalStatus
    })),
    formFields: commonFormFields(["Person", "Role", "Shift", "Coverage Area", "Availability", "Status", "Roster Type", "Approval Note"])
  };
}

function rowFromEntity<T extends BaseEntity>(
  entity: T,
  row: Omit<ManagerRow, "id" | "verificationStatus" | "confidenceScore" | "sourceIds" | "relatedEntityType" | "relatedEntityId">
): ManagerRow {
  return {
    ...row,
    id: entity.id,
    verificationStatus: entity.verificationStatus,
    confidenceScore: entity.confidenceScore,
    sourceIds: entity.sourceIds,
    relatedEntityType: row.entityType,
    relatedEntityId: entity.id
  };
}

function escalationRow(chain: EscalationChain): ManagerRow {
  return rowFromEntity(chain, {
    entityType: "escalation_chain",
    title: chain.entityName,
    description: chain.nextAction,
    owner: ownerName(chain.currentOwnerId) || "Unassigned",
    scope: `${chain.entityType} / ${chain.daysOverdue} days overdue`,
    coverage: chain.severity,
    workload: ownerName(chain.escalationOwnerId),
    status: chain.status,
    approvalStatus: chain.approvalStatus
  });
}

function coverageGapRow(gap: CoverageGap): ManagerRow {
  return rowFromEntity(gap, {
    entityType: "coverage_gap",
    title: gap.gapTitle,
    description: gap.recommendedAction,
    owner: ownerName(gap.recommendedOwnerId) || "Unassigned",
    scope: `${gap.gapType.replaceAll("_", " ")} / ${entityDisplayName(gap.relatedEntityType, gap.relatedEntityId)}`,
    coverage: gap.severity,
    workload: gap.status,
    status: gap.status,
    approvalStatus: gap.approvalStatus
  });
}

function commonFormFields(labels: string[]) {
  return labels.map((label) => ({
    label,
    type: label === "Status" || label === "Availability" || label === "Review Cadence" ? "select" as const : label.includes("Description") || label.includes("Responsibilities") || label.includes("Reason") || label.includes("Note") ? "textarea" as const : "input" as const,
    options: label === "Status" ? ["active", "inactive", "forming", "needs_review", "overloaded", "unassigned"] : label === "Availability" ? ["available", "limited", "unavailable", "election_mode"] : label === "Review Cadence" ? ["daily", "weekly", "monthly", "election_mode"] : undefined
  }));
}

function Metric({ label, value, detail, tone = "neutral" }: { label: string; value: string | number; detail: string; tone?: "neutral" | "watch" | "critical" | "positive" }) {
  return (
    <article className={`metric-cell metric-${tone}`}>
      <div className="metric-label">{label}</div>
      <div className="metric-value-row"><strong>{value}</strong></div>
      <div className="metric-meta"><span>{detail}</span><span>PICOS</span></div>
    </article>
  );
}

function average(values: number[]) {
  if (!values.length) return 0;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function ownerName(id: string) {
  return repository.owners.find((owner) => owner.id === id)?.fullName ?? "";
}

function roleName(id: string) {
  return repository.campaignRoles.find((role) => role.id === id)?.roleName ?? "Role pending";
}

function teamMemberName(id: string) {
  return repository.teamMembers.find((member) => member.id === id)?.fullName ?? "Unassigned";
}

function zoneName(id: string) {
  return repository.zones.find((zone) => zone.id === id)?.zoneName ?? "All zones";
}

function sectorName(id: string) {
  return repository.sectors.find((sector) => sector.id === id)?.sectorName ?? "All sectors";
}

function villageName(id: string) {
  return repository.villages.find((village) => village.id === id)?.name ?? "Village pending";
}

function boothName(id: string) {
  return repository.booths.find((booth) => booth.id === id)?.boothNumber ?? "Booth pending";
}

function communityName(id: string) {
  return repository.communities.find((community) => community.id === id)?.name ?? "Community pending";
}

function teamName(id: string) {
  return repository.volunteerTeams.find((team) => team.id === id)?.teamName ?? repository.teams.find((team) => team.id === id)?.name ?? "Team pending";
}

function organizationUnitName(id: string) {
  return repository.organizationUnits.find((unit) => unit.id === id)?.unitName ?? "Root";
}

function directReportCount(ownerId: string) {
  return repository.reportingLines.filter((line) => line.reportsToOwnerId === ownerId).length;
}
