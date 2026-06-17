import {
  BarChart3,
  BellRing,
  BookOpen,
  Bot,
  CalendarDays,
  ClipboardList,
  FileText,
  Gauge,
  Handshake,
  MapPinned,
  Megaphone,
  MessageCircle,
  Settings,
  ShieldCheck,
  Target,
  UserRound,
  Users,
  Vote,
  Wrench,
  type LucideIcon
} from "lucide-react";
import { PlatformShell, type CoreModuleId } from "@/features/platform/PlatformShell";
import { CountPill, SectionHeader } from "@/features/political-intelligence/components/common";

type ModuleLink = { label: string; href: string; detail: string };
type PlannedModuleConfig = {
  id: CoreModuleId | "settings" | "profile";
  title: string;
  eyebrow: string;
  summary: string;
  status: string;
  activeCoreModule?: CoreModuleId;
  activeProductSection?: "settings";
  icon: LucideIcon;
  metrics: Array<[string, string, string]>;
  primaryLinks: ModuleLink[];
  workflows: Array<[string, string, string]>;
  gaps: string[];
};

const moduleConfigs: Record<string, PlannedModuleConfig> = {
  "booth-intelligence": {
    id: "booth-intelligence",
    title: "Booth Intelligence",
    eyebrow: "PICOS / Core module 03",
    summary: "Booth-level records, assignments, risks, and coverage are available through the constituency and campaign structure managers.",
    status: "Input live",
    activeCoreModule: "booth-intelligence",
    icon: Vote,
    metrics: [["Booth manager", "Live", "Records open"], ["Assignments", "Live", "Structure linked"], ["GIS layer", "Planned", "Map integration pending"]],
    primaryLinks: [
      { label: "Open booth manager", href: "/constituency/booths", detail: "Booth records, view, create, and edit flows" },
      { label: "Booth assignments", href: "/campaign-structure/booth-assignments", detail: "Team and coverage ownership" },
      { label: "Coverage map", href: "/constituency/coverage-map", detail: "Weak geography and field map" }
    ],
    workflows: [["Booth intake", "Capture booth records from constituency data", "Open"], ["Coverage closure", "Assign owners against booth gaps", "Open"], ["Verification", "Attach sources before field use", "Open"]],
    gaps: ["Official Form 20 booth results are not loaded yet.", "Real GIS polygons are not connected.", "Booth-wise turnout model needs historical data."]
  },
  "issue-mapping": {
    id: "issue-mapping",
    title: "Issue Mapping",
    eyebrow: "PICOS / Core module 05",
    summary: "Issue intake, grievance signals, risks, opportunities, and verification queues are wired through the existing manager screens.",
    status: "Input live",
    activeCoreModule: "issue-mapping",
    icon: Target,
    metrics: [["Issue manager", "Live", "Records open"], ["Risk links", "Live", "Tasks connected"], ["Heatmap", "Planned", "Needs GIS layer"]],
    primaryLinks: [
      { label: "Open issues", href: "/issues", detail: "Issue records and create flow" },
      { label: "Political risks", href: "/risks", detail: "Risk mitigation and owners" },
      { label: "Opportunities", href: "/opportunities", detail: "Positive issue openings" }
    ],
    workflows: [["Issue intake", "Create or review issue records", "Open"], ["Convert to task", "Assign an owner and deadline", "Open"], ["Evidence review", "Attach proof before public use", "Open"]],
    gaps: ["Issue heatmap is represented as record-backed UI only.", "Duplicate issue clustering is not automated.", "Public claim approval history needs expansion."]
  },
  "volunteer-management": {
    id: "volunteer-management",
    title: "Volunteer Management",
    eyebrow: "PICOS / Core module 06",
    summary: "Volunteer teams, team members, ownership, and visit workload are available through campaign structure and field operations.",
    status: "Input live",
    activeCoreModule: "volunteer-management",
    icon: Handshake,
    metrics: [["Team records", "Live", "Members open"], ["Rosters", "Live", "Shift planning"], ["Mobile app", "Planned", "Field check-in pending"]],
    primaryLinks: [
      { label: "Team members", href: "/campaign-structure/team-members", detail: "People and responsibilities" },
      { label: "Volunteer teams", href: "/campaign-structure/volunteer-teams", detail: "Team coverage and assignments" },
      { label: "Visit workload", href: "/visits", detail: "Field execution dashboard" }
    ],
    workflows: [["Roster planning", "Create coverage rosters and shifts", "Open"], ["Field visits", "Track assigned outreach", "Open"], ["Escalations", "Move blocked work to owners", "Open"]],
    gaps: ["Volunteer attendance capture is not connected to mobile check-ins.", "Bulk volunteer import validation is still template-driven.", "Performance scoring is mock-data backed."]
  },
  "whatsapp-operations": {
    id: "whatsapp-operations",
    title: "WhatsApp Operations",
    eyebrow: "PICOS / Core module 07",
    summary: "Message-driven intelligence can be triaged through the inbox, conversations, evidence, and task queues while API integration is pending.",
    status: "Placeholder",
    activeCoreModule: "whatsapp-operations",
    icon: MessageCircle,
    metrics: [["Inbox", "Live", "Manual triage"], ["Conversations", "Live", "Records open"], ["WhatsApp API", "Planned", "Integration pending"]],
    primaryLinks: [
      { label: "Intelligence inbox", href: "/intelligence-inbox", detail: "Triage inbound signals" },
      { label: "Conversations", href: "/conversations", detail: "Log field conversations" },
      { label: "Attach evidence", href: "/evidence/new", detail: "Preserve message proof" }
    ],
    workflows: [["Message triage", "Convert inbound signal into evidence or task", "Open"], ["Follow-up", "Assign owner for field reply", "Open"], ["Audit", "Review message handling history", "Open"]],
    gaps: ["WhatsApp Business API is not integrated.", "Consent, opt-out, and broadcast rules need a policy screen.", "Message templates and delivery analytics are not built."]
  },
  "media-monitoring": {
    id: "media-monitoring",
    title: "Media Monitoring",
    eyebrow: "PICOS / Core module 08",
    summary: "Media mention records, evidence, sources, risks, and response tasks are connected through the media manager.",
    status: "Input live",
    activeCoreModule: "media-monitoring",
    icon: BellRing,
    metrics: [["Media manager", "Live", "Mentions open"], ["Response tasks", "Live", "Task queue"], ["Listening API", "Planned", "External feeds pending"]],
    primaryLinks: [
      { label: "Open media", href: "/media", detail: "Mention records and response status" },
      { label: "Create response task", href: "/tasks/new?relatedEntityType=media_mention", detail: "Assign owner for media action" },
      { label: "Attach source", href: "/sources/new?relatedEntityType=media_mention", detail: "Link public source" }
    ],
    workflows: [["Mention review", "Assess risk and opportunity", "Open"], ["Response assignment", "Create owner task", "Open"], ["Evidence storage", "Attach source and proof", "Open"]],
    gaps: ["Automated press and social listening is not connected.", "Sentiment scoring is manually represented.", "Response approval workflow needs richer states."]
  },
  "social-media-management": {
    id: "social-media-management",
    title: "Social Media Management",
    eyebrow: "PICOS / Core module 09",
    summary: "Social response work can currently be tracked through media, tasks, approvals, and evidence while channel publishing remains planned.",
    status: "Not started",
    activeCoreModule: "social-media-management",
    icon: Megaphone,
    metrics: [["Content tasks", "Live", "Task queue"], ["Approvals", "Live", "Review queue"], ["Publishing", "Planned", "Channel APIs pending"]],
    primaryLinks: [
      { label: "Create content task", href: "/tasks/new?relatedEntityType=social_media_post", detail: "Assign creative or response work" },
      { label: "Approval queue", href: "/approvals", detail: "Review before publishing" },
      { label: "Media monitoring", href: "/media-monitoring", detail: "Use monitored signals" }
    ],
    workflows: [["Content planning", "Create and assign content work", "Open"], ["Approval", "Route posts through review", "Open"], ["Evidence", "Attach screenshots or source links", "Open"]],
    gaps: ["No channel calendar, publishing API, or post composer yet.", "Engagement analytics are not imported.", "Asset library and caption approvals need dedicated screens."]
  },
  "event-management": {
    id: "event-management",
    title: "Event Management",
    eyebrow: "PICOS / Core module 10",
    summary: "Political events, visits, follow-ups, tasks, and evidence are connected through existing field operation screens.",
    status: "Input live",
    activeCoreModule: "event-management",
    icon: CalendarDays,
    metrics: [["Event manager", "Live", "Records open"], ["Visit calendar", "Live", "Field schedule"], ["Attendance", "Planned", "Bulk capture pending"]],
    primaryLinks: [
      { label: "Open events", href: "/events", detail: "Political event manager" },
      { label: "Visit calendar", href: "/visits/calendar", detail: "Field schedule" },
      { label: "Create visit", href: "/visits/new", detail: "Log a candidate or team visit" }
    ],
    workflows: [["Event intake", "Create meeting or rally record", "Open"], ["Visit follow-up", "Track post-event promises", "Open"], ["Report", "Generate event notes into daily brief", "Open"]],
    gaps: ["Attendance import and QR capture are not built.", "Venue logistics and permissions are not modeled.", "Event outcome analytics are mock-data backed."]
  },
  "war-room-dashboard": {
    id: "war-room-dashboard",
    title: "War Room Dashboard",
    eyebrow: "PICOS / Core module 11",
    summary: "The main command dashboard is live; this module page gives direct access to decision, risk, task, and report surfaces.",
    status: "Partial",
    activeCoreModule: "war-room-dashboard",
    icon: Gauge,
    metrics: [["Main dashboard", "Live", "Command screen"], ["Daily brief", "Live", "Report screen"], ["Realtime ops", "Planned", "Socket feed pending"]],
    primaryLinks: [
      { label: "Main dashboard", href: "/", detail: "Campaign situation room" },
      { label: "Daily brief", href: "/reports/daily-brief", detail: "Command report" },
      { label: "Action center", href: "/tasks", detail: "Open task queue" }
    ],
    workflows: [["Morning brief", "Review risks, opportunities, and visits", "Open"], ["Task command", "Assign owners and follow-ups", "Open"], ["Evidence gate", "Verify before public claims", "Open"]],
    gaps: ["Realtime refresh and alerts are not connected.", "Permission-specific war room views are not built.", "Exportable command snapshots need a workflow."]
  },
  "ai-assistant": {
    id: "ai-assistant",
    title: "AI Assistant",
    eyebrow: "PICOS / Core module 12",
    summary: "AI-like recommendations are visible across intelligence dashboards; this screen centralizes the planned assistant entry points.",
    status: "Not started",
    activeCoreModule: "ai-assistant",
    icon: Bot,
    metrics: [["Recommendations", "Live", "Dashboard cards"], ["Governance", "Partial", "Approvals linked"], ["Chat assistant", "Planned", "Model integration pending"]],
    primaryLinks: [
      { label: "Political recommendations", href: "/political-intelligence#ai-recommendations", detail: "Strategy recommendation cards" },
      { label: "Voter reports", href: "/voter-intelligence/reports", detail: "Report strategy center" },
      { label: "Approval queue", href: "/approvals", detail: "Human review layer" }
    ],
    workflows: [["Recommendation review", "Use surfaced intelligence suggestions", "Open"], ["Create task", "Turn recommendation into owner work", "Open"], ["Approve output", "Route generated content for approval", "Open"]],
    gaps: ["Interactive assistant chat is not implemented.", "Prompt, response, and rejection logs need storage.", "Model and policy settings are not connected."]
  },
  "election-analytics": {
    id: "election-analytics",
    title: "Election Analytics",
    eyebrow: "PICOS / Core module 13",
    summary: "Election analytics are partially represented through support, turnout, village, and booth screens while official result data is pending.",
    status: "Blocked",
    activeCoreModule: "election-analytics",
    icon: BarChart3,
    metrics: [["Support model", "Live", "Voter dashboards"], ["Turnout", "Live", "Turnout screen"], ["Official results", "Blocked", "Form 20 required"]],
    primaryLinks: [
      { label: "Support analysis", href: "/voter-intelligence/support-analysis", detail: "Support and gain/loss screen" },
      { label: "Turnout intelligence", href: "/voter-intelligence/turnout", detail: "Turnout risk and readiness" },
      { label: "Booth intelligence", href: "/booth-intelligence", detail: "Booth layer access" }
    ],
    workflows: [["Support review", "Study voter and community support", "Open"], ["Turnout risk", "Prioritize weak turnout groups", "Open"], ["Result import", "Load official results when available", "Pending"]],
    gaps: ["Official Form 20 and historic booth results are missing.", "Swing and margin models use placeholder intelligence.", "Scenario planning needs result-grade data."]
  },
  "grievance-management": {
    id: "grievance-management",
    title: "Grievance Management",
    eyebrow: "PICOS / Core module 14",
    summary: "Grievances can be tracked as issues, follow-ups, promises, tasks, and verification records until a dedicated grievance workflow is expanded.",
    status: "Partial",
    activeCoreModule: "grievance-management",
    icon: Wrench,
    metrics: [["Issue intake", "Live", "Manager open"], ["Follow-ups", "Live", "Accountability"], ["SLA engine", "Planned", "Escalation rules pending"]],
    primaryLinks: [
      { label: "Issue manager", href: "/issues", detail: "Capture grievance records" },
      { label: "Follow-ups", href: "/follow-ups", detail: "Track accountability" },
      { label: "Promises", href: "/promises", detail: "Commitment tracking" }
    ],
    workflows: [["Grievance intake", "Create issue or conversation record", "Open"], ["Owner assignment", "Create task and follow-up", "Open"], ["Closure proof", "Attach evidence before closing", "Open"]],
    gaps: ["Dedicated SLA clock and escalation ladder are not built.", "Citizen-facing intake is not connected.", "Closure satisfaction feedback needs a screen."]
  },
  "knowledge-base": {
    id: "knowledge-base",
    title: "Knowledge Base",
    eyebrow: "PICOS / Core module 15",
    summary: "Sources, evidence, reports, and audit logs form the current knowledge layer while a full document library is planned.",
    status: "Not started",
    activeCoreModule: "knowledge-base",
    icon: BookOpen,
    metrics: [["Sources", "Live", "Source manager"], ["Evidence", "Live", "Evidence manager"], ["Document library", "Planned", "Repository pending"]],
    primaryLinks: [
      { label: "Sources", href: "/sources", detail: "Public and internal source records" },
      { label: "Evidence", href: "/evidence", detail: "Proof and attachments" },
      { label: "Audit logs", href: "/audit-logs", detail: "Change history" }
    ],
    workflows: [["Source capture", "Register trusted source records", "Open"], ["Evidence review", "Check proof quality and status", "Open"], ["Report output", "Use daily brief and reports", "Open"]],
    gaps: ["Full-text document library is not implemented.", "Tagging, search indexing, and document permissions are pending.", "File upload storage is represented as metadata only."]
  },
  settings: {
    id: "settings",
    title: "Settings",
    eyebrow: "PICOS / System",
    summary: "System settings are now reachable. The current screen groups the settings areas that still need dedicated implementation.",
    status: "Planned",
    activeProductSection: "settings",
    icon: Settings,
    metrics: [["Permissions", "Planned", "Roles pending"], ["Integrations", "Planned", "APIs pending"], ["Governance", "Partial", "Verification linked"]],
    primaryLinks: [
      { label: "Verification queue", href: "/verification", detail: "Current governance workflow" },
      { label: "Approval queue", href: "/approvals", detail: "Review pending records" },
      { label: "Audit logs", href: "/audit-logs", detail: "System change history" }
    ],
    workflows: [["User roles", "Define access by campaign role", "Planned"], ["Integrations", "Connect WhatsApp, GIS, and imports", "Planned"], ["Data rules", "Set verification and stale-data rules", "Partial"]],
    gaps: ["Role permissions, notification rules, and integration keys are not stored yet.", "No user management backend is connected.", "Environment settings are not editable in-app."]
  },
  profile: {
    id: "profile",
    title: "Admin Profile",
    eyebrow: "PICOS / Campaign admin",
    summary: "The profile menu now opens a real profile workspace with links to the admin's queues and review surfaces.",
    status: "Reachable",
    activeProductSection: "settings",
    icon: UserRound,
    metrics: [["Role", "Admin", "Campaign administrator"], ["Queues", "Live", "Approvals and verification"], ["Preferences", "Planned", "Notifications pending"]],
    primaryLinks: [
      { label: "My tasks", href: "/tasks", detail: "Open assignment queue" },
      { label: "Verification queue", href: "/verification", detail: "Claims needing review" },
      { label: "Daily brief", href: "/reports/daily-brief", detail: "Command report" }
    ],
    workflows: [["Review queue", "Open pending approvals and verification", "Open"], ["Field oversight", "Check visits and follow-ups", "Open"], ["Preferences", "Notification and display settings", "Planned"]],
    gaps: ["Profile persistence and authentication are not connected.", "Notification preferences are not editable yet.", "Personal activity history is represented through shared audit logs."]
  }
};

export function PlannedModuleWorkspace({ moduleKey }: { moduleKey: keyof typeof moduleConfigs }) {
  const config = moduleConfigs[moduleKey];
  const Icon = config.icon;

  return (
    <PlatformShell activeCoreModule={config.activeCoreModule} activeProductSection={config.activeProductSection}>
      <header className="candidate-header main-dashboard-header">
        <div>
          <span className="eyebrow">{config.eyebrow}</span>
          <h1>{config.title}</h1>
          <p>{config.summary}</p>
        </div>
        <div className="manager-header-actions">
          {config.primaryLinks.slice(0, 3).map((link) => (
            <a className="action-btn" href={link.href} key={link.href}>
              <Icon aria-hidden="true" /> {link.label}
            </a>
          ))}
        </div>
      </header>

      <main className="main-dashboard-workspace">
        <section className="panel operational-panel">
          <SectionHeader title={`${config.title} Status`} eyebrow={config.status} actions={<CountPill>{config.metrics.length} signals</CountPill>} />
          <div className="main-module-grid">
            {config.metrics.map(([label, value, detail]) => (
              <article className="main-module-card status-live" key={label}>
                <span>{value}</span>
                <strong>{label}</strong>
                <small>{config.title}</small>
                <p>{detail}</p>
                <b>{config.status}</b>
              </article>
            ))}
          </div>
        </section>

        <section className="workspace-grid two-column operational-panel">
          <div className="panel">
            <SectionHeader title="Open Connected Screens" eyebrow="No dead ends" />
            <div className="coverage-engine-list">
              {config.primaryLinks.map((link) => (
                <article className="coverage-engine-row" key={link.href}>
                  <div>
                    <strong>{link.label}</strong>
                    <small>{link.detail}</small>
                  </div>
                  <a href={link.href}>Open</a>
                </article>
              ))}
            </div>
          </div>
          <div className="panel">
            <SectionHeader title="Workflow Coverage" eyebrow="Current operating path" />
            <div className="coverage-engine-list">
              {config.workflows.map(([title, detail, state]) => (
                <article className="coverage-engine-row" key={title}>
                  <div>
                    <strong>{title}</strong>
                    <small>{detail}</small>
                  </div>
                  <b>{state}</b>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="panel operational-panel is-muted">
          <SectionHeader title="Known Build Gaps" eyebrow="Visible instead of broken" />
          <div className="main-gap-grid">
            {config.gaps.map((gap) => (
              <article className="campaign-recommendation-card" key={gap}>
                <strong>Pending capability</strong>
                <p>{gap}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PlatformShell>
  );
}
