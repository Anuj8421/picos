"use client";

import {
  BarChart3,
  BellRing,
  BookOpen,
  Bot,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  FileText,
  Gauge,
  Handshake,
  LayoutDashboard,
  MapPinned,
  Megaphone,
  MessageCircle,
  Network,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Target,
  UserRound,
  Users,
  Vote,
  Wrench,
  type LucideIcon
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";

type CoreModuleId =
  | "political-intelligence"
  | "campaign-structure"
  | "constituency-intelligence"
  | "booth-intelligence"
  | "voter-intelligence"
  | "issue-mapping"
  | "volunteer-management"
  | "whatsapp-operations"
  | "media-monitoring"
  | "social-media-management"
  | "event-management"
  | "war-room-dashboard"
  | "ai-assistant"
  | "election-analytics"
  | "grievance-management"
  | "knowledge-base";

type ProductSectionId = "main-dashboard" | "reports" | "settings";
type ProductSection = { id: ProductSectionId; label: string; href: string; layer: string; short: string; icon: LucideIcon };
type CoreModule = { id: CoreModuleId; number: string; label: string; href: string; status: string; icon: LucideIcon };

const productSections: ProductSection[] = [
  { id: "main-dashboard", label: "Main Dashboard", href: "/", layer: "Command", short: "C", icon: LayoutDashboard },
  { id: "reports", label: "Reports", href: "/reports/daily-brief", layer: "Output", short: "R", icon: FileText },
  { id: "settings", label: "Settings", href: "#", layer: "System", short: "S", icon: Settings }
];

const primaryProductSections = productSections.filter((section) => section.id === "main-dashboard");
const utilityProductSections = productSections.filter((section) => section.id !== "main-dashboard");

const coreModules: CoreModule[] = [
  { id: "political-intelligence", number: "01", label: "Political Intelligence", href: "/political-intelligence", status: "active", icon: ShieldAlert },
  { id: "campaign-structure", number: "CS", label: "Campaign Structure", href: "/campaign-structure", status: "active", icon: Network },
  { id: "constituency-intelligence", number: "02", label: "Constituency Intelligence", href: "/constituency", status: "active", icon: MapPinned },
  { id: "booth-intelligence", number: "03", label: "Booth Intelligence", href: "#", status: "placeholder", icon: Vote },
  { id: "voter-intelligence", number: "04", label: "Voter Intelligence", href: "/voter-intelligence", status: "active", icon: Users },
  { id: "issue-mapping", number: "05", label: "Issue Mapping", href: "#", status: "placeholder", icon: Target },
  { id: "volunteer-management", number: "06", label: "Volunteer Management", href: "#", status: "placeholder", icon: Handshake },
  { id: "whatsapp-operations", number: "07", label: "WhatsApp Operations", href: "#", status: "placeholder", icon: MessageCircle },
  { id: "media-monitoring", number: "08", label: "Media Monitoring", href: "#", status: "placeholder", icon: BellRing },
  { id: "social-media-management", number: "09", label: "Social Media Management", href: "#", status: "placeholder", icon: Megaphone },
  { id: "event-management", number: "10", label: "Event Management", href: "#", status: "placeholder", icon: CalendarDays },
  { id: "war-room-dashboard", number: "11", label: "War Room Dashboard", href: "#", status: "placeholder", icon: Gauge },
  { id: "ai-assistant", number: "12", label: "AI Assistant", href: "#", status: "placeholder", icon: Bot },
  { id: "election-analytics", number: "13", label: "Election Analytics", href: "#", status: "placeholder", icon: BarChart3 },
  { id: "grievance-management", number: "14", label: "Grievance Management", href: "#", status: "placeholder", icon: Wrench },
  { id: "knowledge-base", number: "15", label: "Knowledge Base", href: "#", status: "placeholder", icon: BookOpen }
];

const globalSearchTargets = [
  ...productSections.map((section) => ({
    label: section.label,
    href: section.href,
    group: "Platform",
    detail: `${section.layer} layer`
  })),
  ...coreModules.map((module) => ({
    label: module.label,
    href: module.href,
    group: module.status === "active" ? "Live module" : "Planned module",
    detail: "PICOS core module"
  })),
  { label: "Daily Intelligence Brief", href: "/reports/daily-brief", group: "Report", detail: "Risks, opportunities, tasks, and movement" },
  { label: "Ownership Registry", href: "/ownership-registry", group: "Action", detail: "Assign accountable campaign owners" },
  { label: "Visit Intelligence", href: "/visits", group: "Field", detail: "Track field visits and follow-ups" },
  { label: "Verification Queue", href: "/verification", group: "Evidence", detail: "Check claims before public use" },
  { label: "CSV Imports", href: "/imports", group: "Data", detail: "Bring field records into PICOS" }
];

const politicalSections = [
  ["command-center", "Command Center", "/political-intelligence"],
  ["candidate-intelligence", "Candidate Intelligence", "/candidate-intelligence"],
  ["opponent-intelligence", "Opponent Intelligence", "/opponents"],
  ["party-intelligence", "Party Intelligence", "/political-intelligence#power-centers"],
  ["relationship-intelligence", "Relationship Intelligence", "/relationships"],
  ["influencer-intelligence", "Influencer Intelligence", "/relationships/new"],
  ["political-events", "Political Events", "/events"],
  ["political-risks", "Political Risks", "/risks"],
  ["political-opportunities", "Political Opportunities", "/opportunities"],
  ["intelligence-reports", "Intelligence Reports", "/reports/daily-brief"]
] as const;

const constituencySections = [
  ["dashboard", "Command Center", "/constituency"],
  ["geography", "Geography", "/constituency/geography"],
  ["zones", "Zones", "/constituency/zones"],
  ["villages", "Villages", "/constituency/villages"],
  ["booths", "Booths", "/constituency/booths"],
  ["communities", "Communities", "/constituency/communities"],
  ["issues", "Issues", "/constituency/issues"],
  ["influencers", "Influencers", "/constituency/influencers"],
  ["coverage-map", "Coverage Map", "/constituency/coverage-map"],
  ["reports", "Reports", "/constituency/reports"]
] as const;

const voterSections = [
  ["dashboard", "Dashboard", "/voter-intelligence"],
  ["community-intelligence", "Community Intelligence", "/voter-intelligence/community"],
  ["village-intelligence", "Village Intelligence", "/voter-intelligence/villages"],
  ["household-intelligence", "Household Intelligence", "/voter-intelligence/households"],
  ["influencer-intelligence", "Influencer Intelligence", "/voter-intelligence/influencers"],
  ["field-operations", "Field Operations", "/visits"],
  ["voter-segments", "Voter Segments", "/voter-intelligence/segments"],
  ["persuasion-intelligence", "Persuasion Intelligence", "/voter-intelligence/persuasion"],
  ["turnout-intelligence", "Turnout Intelligence", "/voter-intelligence/turnout"],
  ["support-analysis", "Support Analysis", "/voter-intelligence/support-analysis"],
  ["voter-issues", "Voter Issues", "/voter-intelligence#issue-impact"],
  ["voter-heatmaps", "Voter Heatmaps", "/voter-intelligence#village-map"],
  ["voter-reports", "Voter Reports", "/voter-intelligence/reports"]
] as const;

const voterFieldOperationSections = [
  ["field-operations", "Visit Manager", "/visits"],
  ["field-conversations", "Conversations", "/conversations"],
  ["field-follow-ups", "Follow-ups", "/follow-ups"],
  ["field-promises", "Promises", "/promises"],
  ["field-timeline", "Timeline", "/intelligence-timeline"],
  ["field-voters", "Voters", "/voters"],
  ["field-households", "Households", "/households"],
  ["field-influencers", "Influencers", "/influencers"],
  ["field-sentiment", "Sentiment", "/sentiment"],
  ["visit-calendar", "Visit Calendar", "/visits/calendar"],
  ["visit-follow-ups", "Visit Follow-ups", "/visits/follow-ups"],
  ["visit-reports", "Visit Reports", "/visits/reports"],
  ["field-verification", "Verification Queue", "/verification"],
  ["field-approvals", "Approval Queue", "/approvals"],
  ["field-evidence-review", "Evidence Review", "/evidence-review"],
  ["field-audit", "Audit Logs", "/audit-logs"],
  ["field-imports", "CSV Imports", "/imports"]
] as const;

const campaignStructureSections = [
  ["dashboard", "Dashboard", "/campaign-structure"],
  ["org-chart", "Organization Chart", "/campaign-structure/org-chart"],
  ["roles", "Roles & Responsibilities", "/campaign-structure/roles"],
  ["team-members", "Team Members", "/campaign-structure/team-members"],
  ["zones", "Zones", "/campaign-structure/zones"],
  ["sectors", "Sectors", "/campaign-structure/sectors"],
  ["village-assignments", "Village Assignments", "/campaign-structure/village-assignments"],
  ["booth-assignments", "Booth Assignments", "/campaign-structure/booth-assignments"],
  ["community-desks", "Community Desks", "/campaign-structure/community-desks"],
  ["volunteer-teams", "Volunteer Teams", "/campaign-structure/volunteer-teams"],
  ["coverage-map", "Coverage Map", "/campaign-structure/coverage-map"],
  ["escalation-matrix", "Escalation Matrix", "/campaign-structure/escalation-matrix"],
  ["reporting-lines", "Reporting Lines", "/campaign-structure/reporting-lines"],
  ["rosters", "Shift / Rosters", "/campaign-structure/rosters"]
] as const;

export function PlatformShell({
  activeCoreModule,
  activeProductSection,
  activePoliticalSection = "command-center",
  activeModuleSection,
  children
}: {
  activeCoreModule?: CoreModuleId;
  activeProductSection?: ProductSectionId;
  activePoliticalSection?: (typeof politicalSections)[number][0];
  activeModuleSection?: string;
  children: ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [globalQuery, setGlobalQuery] = useState("");
  const resolvedActiveCoreModule = activeProductSection ? undefined : activeCoreModule ?? "political-intelligence";
  const activeContext = getActiveContext(resolvedActiveCoreModule, activeProductSection);
  const searchResults = useMemo(() => {
    const query = globalQuery.trim().toLowerCase();
    if (!query) return globalSearchTargets.slice(0, 6);
    return globalSearchTargets
      .filter((target) => `${target.label} ${target.group} ${target.detail}`.toLowerCase().includes(query))
      .slice(0, 8);
  }, [globalQuery]);

  return (
    <div className={`platform-shell ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <ProductSidebar
        activeCoreModule={resolvedActiveCoreModule}
        activeProductSection={activeProductSection}
        activePoliticalSection={activePoliticalSection}
        activeModuleSection={activeModuleSection}
        isCollapsed={isSidebarCollapsed}
      />
      <main className="platform-main">
        <GlobalHeader
          activeContext={activeContext}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setIsSidebarCollapsed((current) => !current)}
          query={globalQuery}
          onQueryChange={setGlobalQuery}
          searchResults={searchResults}
        />
        {children}
      </main>
    </div>
  );
}

function ProductSidebar({
  activeCoreModule,
  activeProductSection,
  activePoliticalSection,
  activeModuleSection,
  isCollapsed
}: {
  activeCoreModule?: CoreModuleId;
  activeProductSection?: ProductSectionId;
  activePoliticalSection: (typeof politicalSections)[number][0];
  activeModuleSection?: string;
  isCollapsed: boolean;
}) {
  return (
    <aside className={`product-sidebar ${isCollapsed ? "is-collapsed" : ""}`} id="picos-product-sidebar" aria-label="PICOS core module navigation">
      <div className="module-nav-brand">
        <div className="brand-mark">PI</div>
        <div>
          <strong>PICOS</strong>
          <span>Political Intelligence & Campaign Operating System</span>
        </div>
      </div>
      <div className="sidebar-context-row" aria-label="Campaign context">
        <span>Sinnar</span>
        <span>Uday Sangle desk</span>
      </div>

      <section className="product-section-nav" aria-label="PICOS platform navigation">
        <div className="nav-section-title">
          <strong>Platform</strong>
          <span>Above all core modules</span>
        </div>
        <div className="data-op-list">
          {primaryProductSections.map((section) => {
            const Icon = section.icon;
            return (
              <a className={`data-op-item ${activeProductSection === section.id ? "is-active" : ""}`} href={section.href} key={section.id} aria-current={activeProductSection === section.id ? "page" : undefined}>
                <Icon className="sidebar-item-icon" size={16} aria-hidden="true" />
                <span className="layer-pill" data-short={section.short}>{section.layer}</span>
                <strong>{section.label}</strong>
              </a>
            );
          })}
        </div>
      </section>

      <nav className="core-module-list">
        <div className="module-list-header">
          <span>Core modules</span>
        </div>
        {coreModules.map((module) => {
          const isActive = module.id === activeCoreModule;
          const Icon = module.icon;
          return (
            <div className={`core-module-shell ${isActive ? "is-expanded" : ""}`} key={module.id}>
              <a
                className={`core-module-item status-${module.status} ${isActive ? "is-active" : ""}`}
                href={module.href}
                aria-current={isActive ? "page" : undefined}
                aria-disabled={module.status === "placeholder" ? true : undefined}
                title={module.status === "placeholder" ? `${module.label} planned module` : `${module.label} live module`}
              >
                <span className="module-icon-wrap"><Icon size={15} aria-hidden="true" /></span>
                <strong>{module.label}</strong>
                <span className="module-status-dot" aria-hidden="true" />
              </a>
              {isActive ? <CoreModuleExpansion activeCoreModule={activeCoreModule} activePoliticalSection={activePoliticalSection} activeModuleSection={activeModuleSection} /> : null}
            </div>
          );
        })}
      </nav>

      <section className="sidebar-utility-nav" aria-label="PICOS reports and settings navigation">
        <div className="data-op-list">
          {utilityProductSections.map((section) => {
            const Icon = section.icon;
            return (
              <a className={`data-op-item ${activeProductSection === section.id ? "is-active" : ""}`} href={section.href} key={section.id} aria-current={activeProductSection === section.id ? "page" : undefined}>
                <Icon className="sidebar-item-icon" size={16} aria-hidden="true" />
                <span className="layer-pill" data-short={section.short}>{section.layer}</span>
                <strong>{section.label}</strong>
              </a>
            );
          })}
        </div>
      </section>

    </aside>
  );
}

function GlobalHeader({
  activeContext,
  isSidebarCollapsed,
  onToggleSidebar,
  query,
  onQueryChange,
  searchResults
}: {
  activeContext: { label: string; eyebrow: string };
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  query: string;
  onQueryChange: (value: string) => void;
  searchResults: typeof globalSearchTargets;
}) {
  return (
    <header className="platform-global-header">
      <div className="global-header-left">
        <button
          className="sidebar-toggle-btn"
          type="button"
          aria-controls="picos-product-sidebar"
          aria-expanded={!isSidebarCollapsed}
          aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={onToggleSidebar}
        >
          {isSidebarCollapsed ? <PanelLeftOpen size={18} aria-hidden="true" /> : <PanelLeftClose size={18} aria-hidden="true" />}
        </button>
        <div className="global-header-context">
          <span>{activeContext.eyebrow}</span>
          <strong>{activeContext.label}</strong>
        </div>
      </div>

      <div className="global-header-search-wrap">
        <label className="global-header-search">
          <Search size={17} aria-hidden="true" />
          <input
            aria-label="Global PICOS search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search modules, villages, tasks, reports, sources"
          />
        </label>
        {query ? (
          <div className="global-search-results" role="listbox" aria-label="Global search results">
            <div className="global-search-results-head">
              <strong>Search PICOS</strong>
              <span>{searchResults.length} matches</span>
            </div>
            {searchResults.length ? (
              searchResults.map((result) => (
                <a className="global-search-result" href={result.href} key={`${result.group}-${result.label}`}>
                  <span>{result.group}</span>
                  <strong>{result.label}</strong>
                  <small>{result.detail}</small>
                </a>
              ))
            ) : (
              <div className="global-search-empty">No matching module or workflow found.</div>
            )}
          </div>
        ) : null}
      </div>

      <div className="global-header-actions">
        <a className="global-icon-btn" href="/intelligence-inbox" aria-label="Open intelligence inbox">
          <BellRing size={17} aria-hidden="true" />
          <span>3</span>
        </a>
        <details className="global-dropdown">
          <summary aria-label="Open action menu">
            <Plus size={17} aria-hidden="true" />
            <span>Action</span>
            <ChevronDown size={14} aria-hidden="true" />
          </summary>
          <div className="global-dropdown-menu">
            <a href="/tasks/new"><ClipboardList size={15} aria-hidden="true" /> New task</a>
            <a href="/visits/new"><CalendarDays size={15} aria-hidden="true" /> Log visit</a>
            <a href="/evidence/new"><ShieldCheck size={15} aria-hidden="true" /> Attach evidence</a>
            <a href="/imports/new"><FileText size={15} aria-hidden="true" /> Import records</a>
          </div>
        </details>
        <details className="global-dropdown profile-dropdown">
          <summary aria-label="Open profile menu">
            <span className="profile-avatar">AA</span>
            <span className="profile-copy">
              <strong>Anuj Avhad</strong>
              <small>Campaign admin</small>
            </span>
            <ChevronDown size={14} aria-hidden="true" />
          </summary>
          <div className="global-dropdown-menu align-right">
            <a href="#"><UserRound size={15} aria-hidden="true" /> Profile</a>
            <a href="/verification"><ShieldCheck size={15} aria-hidden="true" /> Verification queue</a>
            <a href="/reports/daily-brief"><FileText size={15} aria-hidden="true" /> Daily brief</a>
          </div>
        </details>
      </div>
    </header>
  );
}

function getActiveContext(activeCoreModule?: CoreModuleId, activeProductSection?: ProductSectionId) {
  const product = activeProductSection ? productSections.find((section) => section.id === activeProductSection) : undefined;
  if (product) return { label: product.label, eyebrow: "Platform" };

  const module = activeCoreModule ? coreModules.find((item) => item.id === activeCoreModule) : undefined;
  if (module) return { label: module.label, eyebrow: module.status === "active" ? "Live module" : "Planned module" };

  return { label: "PICOS Command", eyebrow: "Sinnar campaign desk" };
}

function CoreModuleExpansion({
  activeCoreModule,
  activePoliticalSection,
  activeModuleSection
}: {
  activeCoreModule?: CoreModuleId;
  activePoliticalSection: (typeof politicalSections)[number][0];
  activeModuleSection?: string;
}) {
  if (activeCoreModule === "political-intelligence") {
    return (
      <div className="core-module-expansion">
        <span>Active module</span>
        <div className="core-module-tree">
          {politicalSections.map(([id, label, href]) => (
            <a className={activePoliticalSection === id ? "is-active" : ""} href={href} key={id}>{label}</a>
          ))}
        </div>
      </div>
    );
  }

  if (activeCoreModule === "voter-intelligence") {
    const fieldOpsActive = activeModuleSection === "field-operations" || voterFieldOperationSections.some(([id]) => id === activeModuleSection);

    return (
      <div className="core-module-expansion">
        <span>Active module</span>
        <div className="core-module-tree">
          {voterSections.map(([id, label, href]) => (
            <div className="core-module-branch" key={id}>
              <a className={activeModuleSection === id || (id === "field-operations" && fieldOpsActive) ? "is-active" : ""} href={href}>{label}</a>
              {id === "field-operations" ? (
                <div className="core-module-subtree">
                  {voterFieldOperationSections.map(([fieldId, fieldLabel, fieldHref]) => (
                    <a className={activeModuleSection === fieldId ? "is-active" : ""} href={fieldHref} key={fieldId}>{fieldLabel}</a>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeCoreModule === "constituency-intelligence") {
    return (
      <div className="core-module-expansion">
        <span>Active module</span>
        <div className="core-module-tree">
          {constituencySections.map(([id, label, href]) => (
            <a className={activeModuleSection === id ? "is-active" : ""} href={href} key={id}>{label}</a>
          ))}
        </div>
      </div>
    );
  }

  if (activeCoreModule === "campaign-structure") {
    return (
      <div className="core-module-expansion">
        <span>Active module</span>
        <div className="core-module-tree">
          {campaignStructureSections.map(([id, label, href]) => (
            <a className={activeModuleSection === id ? "is-active" : ""} href={href} key={id}>{label}</a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="core-module-expansion">
      <span>Collapsed module</span>
      <small>This product module is visible in the PICOS structure and will be expanded when its screens are built.</small>
    </div>
  );
}
