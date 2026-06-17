import { BellRing, ClipboardList, FileText, MapPinned, ShieldAlert, Target, Users, Vote } from "lucide-react";
import { PlatformShell } from "@/features/platform/PlatformShell";
import { CountPill, PriorityChip, SectionHeader } from "@/features/political-intelligence/components/common";
import { ConfidenceBadge, VerificationBadge } from "@/features/shared/intelligenceBadges";
import {
  getCampaignCoverageSummary,
  getCampaignWorkloadSummary,
  getConstituencyRecommendations,
  getConstituencySummary,
  repository
} from "@/lib/domain/repositories";

const coreModuleStatus = [
  { number: "01", name: "Political Intelligence", href: "/political-intelligence", status: "Live", layer: "Intelligence", signal: "Risks, opponents, opportunities" },
  { number: "02", name: "Constituency Intelligence", href: "/constituency", status: "Live", layer: "Intelligence", signal: "Coverage, zones, villages" },
  { number: "03", name: "Booth Intelligence", href: "/constituency/booths", status: "Input live", layer: "Input", signal: "Booth manager connected" },
  { number: "04", name: "Voter Intelligence", href: "/voter-intelligence", status: "Live", layer: "Intelligence", signal: "Voter, household, turnout" },
  { number: "05", name: "Issue Mapping", href: "/issues", status: "Input live", layer: "Processing", signal: "Issue intake connected" },
  { number: "06", name: "Volunteer Management", href: "/team-members", status: "Input live", layer: "Action", signal: "Owners and teams connected" },
  { number: "07", name: "WhatsApp Operations", href: "/intelligence-inbox", status: "Placeholder", layer: "Input", signal: "Feeds into inbox" },
  { number: "08", name: "Media Monitoring", href: "/media", status: "Input live", layer: "Processing", signal: "Media manager connected" },
  { number: "09", name: "Social Media Management", href: "#", status: "Not started", layer: "Action", signal: "Needs module build" },
  { number: "10", name: "Event Management", href: "/events", status: "Input live", layer: "Action", signal: "Event manager connected" },
  { number: "11", name: "War Room Dashboard", href: "/", status: "Partial", layer: "Command", signal: "Main dashboard active" },
  { number: "12", name: "AI Assistant", href: "#", status: "Not started", layer: "Intelligence", signal: "Recommendations only" },
  { number: "13", name: "Election Analytics", href: "#", status: "Blocked", layer: "Intelligence", signal: "Form 20 required" },
  { number: "14", name: "Grievance Management", href: "/issues", status: "Partial", layer: "Processing", signal: "Issue manager covers base" },
  { number: "15", name: "Knowledge Base", href: "#", status: "Not started", layer: "Output", signal: "Needs document library" }
] as const;

export function MainDashboard() {
  const constituency = getConstituencySummary();
  const campaign = getCampaignCoverageSummary();
  const workload = getCampaignWorkloadSummary();
  const recommendations = getConstituencyRecommendations();
  const criticalRisks = repository.politicalRisks.filter((risk) => risk.severity === "critical");
  const highSignals = repository.intelligenceSignals.filter((signal) => signal.priority === "critical" || signal.priority === "high");
  const pendingVerification = repository.verificationRequests.filter((item) => item.verificationDecision !== "verified").length;
  const pendingApprovals = repository.approvalRequests.filter((item) => item.status !== "approved").length;
  const openTasks = repository.tasks.filter((task) => !["completed", "cancelled"].includes(task.status));
  const overdueFollowUps = repository.followUpRecords.filter((item) => ["overdue", "escalated"].includes(item.status));
  const avgCommunitySentiment = average(repository.communities.map((community) => community.sentimentScore));
  const readiness = average([constituency.readinessScore, campaign.campaignStructureReadinessScore, campaign.teamReadinessScore]);
  const today = "2026-06-14";
  const todayVisits = repository.visitRecords.filter((visit) => visit.scheduledDate === today);
  const todayMeetings = repository.politicalEvents.filter((event) => event.date === today);
  const todayFollowUps = repository.followUpRecords.filter((item) => item.dueDate === today && item.status !== "completed");
  const todayPromises = repository.promiseRecords.filter((item) => item.dueDate === today && !["fulfilled", "archived"].includes(item.status));
  const escalations = repository.escalationChains.filter((chain) => chain.status !== "resolved");
  const criticalOpportunities = repository.politicalOpportunities.filter((item) => item.priority === "critical" || item.priority === "high");
  const supportStrength = average(repository.communities.map((community) => community.supportLevel));
  const turnoutReadiness = average(repository.voterRecords.map((voter) => voter.turnoutProbability));
  const boothReadiness = constituency.boothCoverage;
  const volunteerReadiness = campaign.teamReadinessScore;
  const executionReadiness = average([campaign.campaignStructureReadinessScore, 100 - Math.min(100, openTasks.length * 5), 100 - Math.min(100, overdueFollowUps.length * 12)]);
  const campaignCoverage = average([constituency.villageCoverage, constituency.ownershipCoverage, campaign.communityCoverage]);
  const winningProbability = average([supportStrength, turnoutReadiness, executionReadiness, campaignCoverage, readiness]);
  const persuadableVoters = repository.voterRecords.filter((voter) => voter.supportStatus.toLowerCase().includes("swing") || voter.persuasionScore >= 55).length;
  const turnoutRisk = repository.voterRecords.filter((voter) => voter.turnoutProbability < 55).length;
  const expectedGain = repository.visitOutcomes.filter((outcome) => outcome.expectedVoteImpact > 0).reduce((sum, outcome) => sum + outcome.expectedVoteImpact, 0);
  const expectedLoss = Math.abs(repository.visitOutcomes.filter((outcome) => outcome.expectedVoteImpact < 0).reduce((sum, outcome) => sum + outcome.expectedVoteImpact, 0));
  const communityMovement = repository.communities.filter((community) => community.trend === "Up").length - repository.communities.filter((community) => community.trend === "Down").length;
  const urgentCount = criticalRisks.length + overdueFollowUps.length + escalations.length;
  const situationTone = winningProbability >= 65 ? "advantage" : "contested";
  const commandDirective = urgentCount > 0
    ? "Stabilize risks, close field follow-ups, and protect weak geography before expanding the schedule."
    : "Expand growth villages, convert persuadable voters, and lock turnout owners while the field is stable.";

  const situationMetrics = [
    { label: "Winning Probability", score: winningProbability, state: winningProbability >= 65 ? "Leaning positive" : "Fight state", detail: "Composite campaign posture", tone: "win" },
    { label: "Support Strength", score: supportStrength, state: "Community base", detail: "Average mapped community support", tone: "support" },
    { label: "Turnout Readiness", score: turnoutReadiness, state: "Mobilization", detail: "Voter turnout probability", tone: "turnout" },
    { label: "Execution Readiness", score: executionReadiness, state: "Field command", detail: "Tasks, owners, follow-ups", tone: "execution" },
    { label: "Campaign Coverage", score: campaignCoverage, state: "Territory", detail: "Village, ownership, community coverage", tone: "coverage" },
    { label: "Booth Readiness", score: boothReadiness, state: "Booth layer", detail: "Booth coverage and source readiness", tone: "booth" },
    { label: "Volunteer Readiness", score: volunteerReadiness, state: "Teams", detail: "Team performance and coverage", tone: "volunteer" }
  ] as const;

  const readinessScorecard = [
    ["Intelligence Readiness", constituency.readinessScore, "Signals, watchlist, source coverage"],
    ["Coverage Readiness", campaignCoverage, "Villages, communities, ownership"],
    ["Turnout Readiness", turnoutReadiness, "Voter turnout probability"],
    ["Execution Readiness", executionReadiness, "Tasks, visits, follow-ups"],
    ["Booth Readiness", boothReadiness, "Booth data and assignments"],
    ["Election Readiness", readiness, "Overall campaign operating score"]
  ] as const;

  return (
    <PlatformShell activeProductSection="main-dashboard" activeModuleSection="overview">
      <header className="candidate-header main-dashboard-header">
        <div>
          <span className="eyebrow">PICOS / Election War Room / Sinnar</span>
          <h1>Are we winning?</h1>
          <p>Current campaign posture for Uday Sangle: support strength, geography, turnout, field execution, alerts, and what should happen next.</p>
        </div>
        <div className="manager-header-actions">
          <a className="action-btn" href="/intelligence-inbox"><BellRing aria-hidden="true" /> Inbox</a>
          <a className="action-btn" href="/tasks"><ClipboardList aria-hidden="true" /> Tasks</a>
          <a className="action-btn" href="/reports/daily-brief"><FileText aria-hidden="true" /> Daily Brief</a>
          <a className="action-btn" href="/ownership-registry"><Users aria-hidden="true" /> Ownership</a>
        </div>
      </header>

      <main className="main-dashboard-workspace">
        <div className="campaign-first-screen" id="overview">
          <section className={`situation-room is-${situationTone}`}>
            <div className="situation-room-lead">
              <div>
                <span className="eyebrow">Campaign Situation Room</span>
                <h2>{winningProbability >= 65 ? "Yes, but not safely." : "Not safely yet."}</h2>
                <div className="situation-status-strip" aria-label="Current war room status">
                  <span><Vote aria-hidden="true" /> {winningProbability}% win model</span>
                  <span><ShieldAlert aria-hidden="true" /> {urgentCount} urgent</span>
                  <span><MapPinned aria-hidden="true" /> Sinnar field map live</span>
                </div>
              </div>
              <p>Support and community movement are useful, but booth readiness, official booth data, and field execution still decide whether the lead converts into votes.</p>
              <div className="situation-decision">
                <span>Command directive</span>
                <strong>{commandDirective}</strong>
              </div>
              <div className="situation-directives">
                <a href="/constituency/coverage-map"><MapPinned aria-hidden="true" /> Secure weak geography</a>
                <a href="/visits"><Target aria-hidden="true" /> Execute today's field plan</a>
                <a href="/risks"><ShieldAlert aria-hidden="true" /> Contain critical risks</a>
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
          </section>
          <ConstituencyWarMap />
        </div>

        <section className="workspace-grid two-column main-war-room-grid">
          <TodayPanel
            todayVisits={todayVisits.length}
            todayMeetings={todayMeetings.length}
            todayFollowUps={todayFollowUps.length}
            todayPromises={todayPromises.length}
            escalations={escalations.length}
            criticalRisks={criticalRisks.length}
            criticalOpportunities={criticalOpportunities.length}
          />
          <VoteEngine
            currentSupport={supportStrength}
            persuadableVoters={persuadableVoters}
            turnoutRisk={turnoutRisk}
            expectedGain={expectedGain}
            expectedLoss={expectedLoss}
            communityMovement={communityMovement}
          />
        </section>

        <section className="workspace-grid two-column main-war-room-grid">
          <CampaignReadinessScorecard items={readinessScorecard} />
          <IntelligenceFeed highSignals={highSignals.length} recommendations={recommendations.length} />
        </section>

        <section className="workspace-grid main-war-room-grid" id="critical-alerts">
          <CriticalAlerts />
        </section>

        <section className="panel operational-panel" id="action-center">
          <SectionHeader title="Execution Queues" eyebrow="Operational layer" actions={<CountPill>{openTasks.length} open tasks</CountPill>} />
          <ActionCenter openTasks={openTasks.length} overloadedOwners={workload.overloaded.length} overdueFollowUps={overdueFollowUps.length} />
        </section>

        <section className="panel operational-panel is-muted" id="module-health">
          <SectionHeader title="15 Core Module Health" eyebrow="PICOS product structure" actions={<CountPill>{coreModuleStatus.length} modules</CountPill>} />
          <div className="main-module-grid">
            {coreModuleStatus.map((module) => (
              <a className={`main-module-card status-${module.status.toLowerCase().replaceAll(" ", "-")}`} href={module.href} key={module.number}>
                <span>{module.number}</span>
                <strong>{module.name}</strong>
                <small>{module.layer}</small>
                <p>{module.signal}</p>
                <b>{module.status}</b>
              </a>
            ))}
          </div>
        </section>

        <section className="workspace-grid two-column operational-panel is-muted" id="data-operations">
          <DataOperationsPanel pendingVerification={pendingVerification} pendingApprovals={pendingApprovals} />
          <ReportsPanel />
        </section>

        <section className="panel operational-panel is-muted" id="system-gaps">
          <SectionHeader title="System Gaps" eyebrow="What remains missing above the 15 modules" />
          <div className="main-gap-grid">
            {[
              ["Settings", "Permissions, integrations, security, notification rules, and data governance are not built yet."],
              ["Global Search", "Cross-module search across people, villages, booths, issues, evidence, reports, and tasks is missing."],
              ["Map / GIS Command Center", "Current maps are record-backed UI placeholders; real GIS layers are still missing."],
              ["AI Governance", "AI recommendation approval history, rejected suggestions, and reasoning logs are not complete."],
              ["Data Quality Center", "Duplicate detection, stale-record review, and confidence decay rules need their own screen."],
              ["Import / Export Center", "CSV imports exist as a manager path, but templates, validation errors, and exports need full workflows."]
            ].map(([title, body]) => (
              <article className="campaign-recommendation-card" key={title}>
                <strong>{title}</strong>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PlatformShell>
  );
}

function CriticalAlerts() {
  const alerts = [
    ...repository.politicalRisks.filter((risk) => risk.severity === "critical").map((risk) => ({
      title: risk.risk,
      detail: risk.mitigation,
      priority: risk.severity,
      href: `/tasks/new?relatedEntityType=political_risk&relatedEntityId=${risk.id}`,
      verificationStatus: risk.verificationStatus,
      confidenceScore: risk.confidenceScore
    })),
    ...repository.coverageGaps.filter((gap) => gap.severity === "critical").map((gap) => ({
      title: gap.gapTitle,
      detail: gap.recommendedAction,
      priority: gap.severity,
      href: `/tasks/new?relatedEntityType=coverage_gap&relatedEntityId=${gap.id}`,
      verificationStatus: gap.verificationStatus,
      confidenceScore: gap.confidenceScore
    }))
  ].slice(0, 6);

  return (
    <section className="panel">
      <SectionHeader title="Critical Alerts" eyebrow="Risk and coverage failures" actions={<CountPill>{alerts.length} alerts</CountPill>} />
      <div className="coverage-engine-list">
        {alerts.map((alert) => (
          <article className="coverage-engine-row" key={alert.title}>
            <div>
              <strong>{alert.title}</strong>
              <small>{alert.detail}</small>
            </div>
            <PriorityChip value={alert.priority} />
            <div className="badge-row">
              <VerificationBadge status={alert.verificationStatus} />
              <ConfidenceBadge score={alert.confidenceScore} />
              <a href={alert.href}>Create task</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ConstituencyWarMap() {
  const classifiedVillages = repository.villages.map((village) => ({ ...village, mapClass: villageMapClass(village) }));
  const classCounts = {
    strong: classifiedVillages.filter((village) => village.mapClass === "strong").length,
    weak: classifiedVillages.filter((village) => village.mapClass === "weak").length,
    swing: classifiedVillages.filter((village) => village.mapClass === "swing").length,
    growth: classifiedVillages.filter((village) => village.mapClass === "growth").length,
    risk: classifiedVillages.filter((village) => village.mapClass === "risk").length
  };

  return (
    <section className="panel war-map-panel">
      <SectionHeader title="Constituency War Map" eyebrow="Politics is geography" actions={<a className="action-btn" href="/constituency/coverage-map">Open map</a>} />
      <div className="war-map-stage">
        <svg className="campaign-map-lines" viewBox="0 0 100 100" aria-hidden="true">
          <path d="M18 20 L64 12 L88 42 L74 79 L35 88 L11 55 Z" />
          <path d="M26 33 C43 19 63 28 78 42" />
          <path d="M34 82 C42 58 55 44 82 43" />
          <path d="M16 55 C34 44 52 47 74 79" />
        </svg>
        {classifiedVillages.map((village) => (
          <a className={`war-map-marker is-${village.mapClass}`} href={`/constituency/villages/${village.id}`} key={village.id} style={{ left: `${village.mapX}%`, top: `${village.mapY}%` }}>
            <strong>{village.name}</strong>
            <span>{village.mapClass}</span>
          </a>
        ))}
      </div>
      <div className="war-map-legend">
        <span className="is-strong">Strong Villages <b>{classCounts.strong}</b></span>
        <span className="is-weak">Weak Villages <b>{classCounts.weak}</b></span>
        <span className="is-swing">Swing Villages <b>{classCounts.swing}</b></span>
        <span className="is-growth">Growth Villages <b>{classCounts.growth}</b></span>
        <span className="is-risk">Risk Villages <b>{classCounts.risk}</b></span>
      </div>
    </section>
  );
}

function TodayPanel({
  todayVisits,
  todayMeetings,
  todayFollowUps,
  todayPromises,
  escalations,
  criticalRisks,
  criticalOpportunities
}: {
  todayVisits: number;
  todayMeetings: number;
  todayFollowUps: number;
  todayPromises: number;
  escalations: number;
  criticalRisks: number;
  criticalOpportunities: number;
}) {
  const rows = [
    ["Today's Visits", todayVisits, "/visits"],
    ["Today's Meetings", todayMeetings, "/events"],
    ["Today's Follow-ups", todayFollowUps, "/follow-ups"],
    ["Today's Promises Due", todayPromises, "/promises"],
    ["Escalations", escalations, "/escalations"],
    ["Critical Risks", criticalRisks, "/risks"],
    ["Critical Opportunities", criticalOpportunities, "/opportunities"]
  ] as const;

  return (
    <section className="panel today-panel">
      <SectionHeader title="Today" eyebrow="What should Uday do next?" actions={<CountPill>June 14</CountPill>} />
      <div className="today-command-list">
        {rows.map(([label, value, href]) => (
          <a className={value > 0 ? "is-live" : ""} href={href} key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </a>
        ))}
      </div>
      <article className="today-directive">
        <span>Primary directive</span>
        <strong>Close field follow-ups before creating new promises.</strong>
        <p>Execution confidence improves fastest when overdue promises, ownership gaps, and critical verification work are closed today.</p>
      </article>
    </section>
  );
}

function VoteEngine({
  currentSupport,
  persuadableVoters,
  turnoutRisk,
  expectedGain,
  expectedLoss,
  communityMovement
}: {
  currentSupport: number;
  persuadableVoters: number;
  turnoutRisk: number;
  expectedGain: number;
  expectedLoss: number;
  communityMovement: number;
}) {
  const rows = [
    ["Current Support", `${currentSupport}%`, "Mapped community average"],
    ["Persuadable Voters", persuadableVoters, "Records needing conversion"],
    ["Turnout Risk", turnoutRisk, "Low turnout probability records"],
    ["Expected Gain", `+${expectedGain}`, "From visit outcomes"],
    ["Expected Loss", `-${expectedLoss}`, "From unresolved risk outcomes"],
    ["Community Movement", communityMovement >= 0 ? `+${communityMovement}` : communityMovement, "Up trends minus down trends"]
  ] as const;

  return (
    <section className="panel vote-engine-panel">
      <SectionHeader title="Vote Engine" eyebrow="Support, persuasion, turnout, gain/loss" actions={<a className="action-btn" href="/voter-intelligence/support-analysis">Support analysis</a>} />
      <div className="vote-engine-grid">
        {rows.map(([label, value, detail]) => (
          <article key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <p>{detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function CampaignReadinessScorecard({ items }: { items: ReadonlyArray<readonly [string, number, string]> }) {
  return (
    <section className="panel readiness-scorecard">
      <SectionHeader title="Campaign Readiness Scorecard" eyebrow="Can the campaign convert support into votes?" actions={<a className="action-btn" href="/campaign-structure">Structure</a>} />
      <div className="readiness-score-list">
        {items.map(([label, score, detail]) => (
          <article key={label}>
            <div>
              <strong>{label}</strong>
              <span>{detail}</span>
            </div>
            <b>{score}%</b>
            <i><em style={{ width: `${score}%` }} /></i>
          </article>
        ))}
      </div>
    </section>
  );
}

function IntelligenceFeed({ highSignals, recommendations }: { highSignals: number; recommendations: number }) {
  const feed = [
    ...repository.intelligenceSignals.slice(0, 4).map((signal) => ({
      title: signal.title,
      detail: signal.description,
      priority: signal.priority,
      href: `/intelligence-inbox/${signal.id}`,
      verificationStatus: signal.verificationStatus,
      confidenceScore: signal.confidenceScore
    })),
    ...repository.mediaMentions.slice(0, 2).map((mention) => ({
      title: mention.title,
      detail: mention.summary,
      priority: mention.riskLevel,
      href: `/media/${mention.id}`,
      verificationStatus: mention.verificationStatus,
      confidenceScore: mention.confidenceScore
    }))
  ];

  return (
    <section className="panel intelligence-feed-panel">
      <SectionHeader title="Intelligence Feed" eyebrow="Signals above module status" actions={<CountPill>{highSignals} high priority / {recommendations} recs</CountPill>} />
      <div className="intelligence-feed-list">
        {feed.map((item) => (
          <a href={item.href} key={`${item.href}-${item.title}`}>
            <div className="badge-row">
              <PriorityChip value={item.priority} />
              <VerificationBadge status={item.verificationStatus} />
              <ConfidenceBadge score={item.confidenceScore} />
            </div>
            <strong>{item.title}</strong>
            <p>{item.detail}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

function ActionCenter({ openTasks, overloadedOwners, overdueFollowUps }: { openTasks: number; overloadedOwners: number; overdueFollowUps: number }) {
  const actions = [
    ["Open Tasks", openTasks, "/tasks", "Task backlog across modules"],
    ["Overloaded Owners", overloadedOwners, "/ownership-registry", "Coordinator workload issues"],
    ["Overdue Follow-ups", overdueFollowUps, "/follow-ups", "Field actions needing closure"],
    ["Unassigned Ownership", repository.ownershipRecords.filter((record) => record.ownershipStatus === "unassigned").length, "/ownership-registry", "Records without responsible owner"],
    ["Open Escalations", repository.escalationChains.filter((chain) => chain.status !== "resolved").length, "/escalations", "Escalation chain items"],
    ["Pending Promises", repository.promiseRecords.filter((promise) => !["fulfilled", "archived"].includes(promise.status)).length, "/promises", "Promise tracking items"]
  ] as const;

  return (
    <div className="main-action-grid">
      {actions.map(([label, value, href, detail]) => (
        <a className="campaign-command-card" href={href} key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
          <p>{detail}</p>
        </a>
      ))}
    </div>
  );
}

function DataOperationsPanel({ pendingVerification, pendingApprovals }: { pendingVerification: number; pendingApprovals: number }) {
  const operations = [
    ["Input", "Intelligence Inbox", repository.intelligenceSignals.length, "/intelligence-inbox"],
    ["Input", "Sources", repository.sourceRecords.length, "/sources"],
    ["Input", "Evidence", repository.evidenceItems.length, "/evidence"],
    ["Input", "Imports", repository.importBatches.length, "/imports"],
    ["Processing", "Verification", pendingVerification, "/verification"],
    ["Processing", "Approvals", pendingApprovals, "/approvals"],
    ["Action", "Tasks", repository.tasks.length, "/tasks"],
    ["Output", "Reports", repository.intelligenceReports.length + repository.constituencyReports.length + repository.visitReports.length, "/reports/daily-brief"]
  ] as const;

  return (
    <section className="panel">
      <SectionHeader title="Data Operations" eyebrow="Input to report traceability" />
      <div className="integration-matrix">
        {operations.map(([layer, label, value, href]) => (
          <a href={href} key={label}>
            <span>{layer}</span>
            <strong>{label}</strong>
            <b>{value} records</b>
          </a>
        ))}
      </div>
    </section>
  );
}

function ReportsPanel() {
  return (
    <section className="panel" id="reports">
      <SectionHeader title="Reports" eyebrow="Campaign output layer" />
      <div className="coverage-engine-list">
        {[
          ["Daily Intelligence Brief", "/reports/daily-brief", "What changed, risks, opportunities, opponent movement, recommended actions."],
          ["Constituency Readiness Brief", "/constituency/reports", "Zone, village, booth, issue, watchlist, and decision log."],
          ["Voter Reports", "/voter-intelligence/reports", "Voter segments, support analysis, turnout, persuasion, and field strategy."],
          ["Visit Reports", "/visits/reports", "Field visits, outcomes, follow-ups, promises, and action closure."]
        ].map(([title, href, detail]) => (
          <article className="coverage-engine-row" key={title}>
            <div>
              <strong>{title}</strong>
              <small>{detail}</small>
            </div>
            <a href={href}>Open</a>
          </article>
        ))}
      </div>
    </section>
  );
}

function average(values: number[]) {
  const usable = values.filter((value) => Number.isFinite(value));
  if (!usable.length) return 0;
  return Math.round(usable.reduce((sum, value) => sum + value, 0) / usable.length);
}

function villageMapClass(village: (typeof repository.villages)[number]) {
  if (village.politicalStrength === "critical" || village.riskScore >= 68) return "risk";
  if (village.politicalStrength === "weak") return "weak";
  if (village.opportunityScore >= 68 && village.sentimentScore >= 56) return "growth";
  if (village.politicalStrength === "swing") return "swing";
  return "strong";
}
