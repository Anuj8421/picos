"use client";

import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Download,
  Edit3,
  FileUp,
  Filter,
  Plus,
  Search
} from "lucide-react";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { PlatformShell } from "@/features/platform/PlatformShell";
import { CountPill, SectionHeader } from "@/features/political-intelligence/components/common";
import { volunteerBooths, volunteerCoordinators, volunteerData, volunteerRoles, volunteerZones } from "../data";
import type { Volunteer, VolunteerFiltersState, VolunteerStatus, VolunteerTab, WorkloadStatus } from "../types";

const profileTabs = ["Overview", "Tasks", "Activity", "Reports", "Attendance", "Performance", "Communication"] as const;

const emptyFilters: VolunteerFiltersState = {
  zone: "All",
  role: "All",
  status: "All",
  booth: "All",
  coordinator: "All",
  search: "",
  includeInactive: true
};

export function VolunteerManagementModule({ activeTab = "overview" }: { activeTab?: VolunteerTab }) {
  const [volunteers, setVolunteers] = useState<Volunteer[]>(volunteerData);
  const [filters, setFilters] = useState<VolunteerFiltersState>(emptyFilters);
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [profileVolunteer, setProfileVolunteer] = useState<Volunteer | null>(null);
  const [editVolunteer, setEditVolunteer] = useState<Volunteer | null>(null);
  const [quickVolunteer, setQuickVolunteer] = useState<Volunteer | null>(null);
  const [teamVolunteer, setTeamVolunteer] = useState<Volunteer | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [toast, setToast] = useState("");

  const visibleVolunteers = useMemo(() => filterVolunteers(volunteers, filters), [volunteers, filters]);
  const activeVolunteers = volunteers.filter((volunteer) => volunteer.status === "Active" || volunteer.status === "On Ground");
  const onGround = volunteers.filter((volunteer) => volunteer.status === "On Ground");
  const onLeave = volunteers.filter((volunteer) => volunteer.status === "On Leave");
  const newVolunteers = volunteers.filter((volunteer) => volunteer.status === "New");
  const avgCapacity = Math.round(volunteers.reduce((sum, volunteer) => sum + volunteer.capacity, 0) / volunteers.length);
  const overloaded = volunteers.filter((volunteer) => volunteer.workloadStatus === "Overloaded" || volunteer.workloadStatus === "Needs Follow-up");
  const activeTasks = volunteers.reduce((sum, volunteer) => sum + volunteer.activeTasks, 0);
  const nextDeadlines = volunteers.filter((volunteer) => volunteer.nextDeadline <= "2026-06-19").length;

  function updateFilter(key: keyof VolunteerFiltersState, value: string | boolean) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function exportRows(scope: "directory" | "workload" | "command" | "overview" | "tasks" | "reports" | "attendance" | "performance" | "settings") {
    const header = ["Name", "Role", "Status", "Zone", "Village", "Ward", "Booth", "Coordinator", "Campaigns", "Active Tasks", "Capacity"];
    const rows = visibleVolunteers.map((volunteer) => [
      volunteer.name,
      volunteer.role,
      volunteer.status,
      volunteer.zone,
      volunteer.village,
      volunteer.ward,
      volunteer.booth,
      volunteer.coordinator,
      volunteer.assignedCampaigns.length,
      volunteer.activeTasks,
      `${volunteer.capacity}%`
    ]);
    downloadCsv(`picos-volunteer-${scope}.csv`, [header, ...rows]);
    showToast(`${scopeLabel(scope)} export prepared`);
  }

  function addVolunteer(volunteer: Volunteer) {
    setVolunteers((current) => [volunteer, ...current]);
    setAddOpen(false);
    showToast(`${volunteer.name} added to volunteer directory`);
  }

  function saveVolunteer(updated: Volunteer) {
    setVolunteers((current) => current.map((volunteer) => (volunteer.id === updated.id ? updated : volunteer)));
    setEditVolunteer(null);
    setProfileVolunteer(updated);
    showToast(`${updated.name} profile updated`);
  }

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  }

  return (
    <PlatformShell activeCoreModule="volunteer-management" activeModuleSection={activeTab}>
      <header className="candidate-header volunteer-header">
        <div>
          <span className="eyebrow">PICOS / Field Force Operations</span>
          <h1>Volunteer Management</h1>
          <p>Manage volunteers, booth assignments, field workload, and reporting structure across Sinnar campaign operations.</p>
        </div>
        <div className="manager-header-actions">
          <button className="action-btn" type="button" onClick={() => setAddOpen(true)}><Plus size={16} /> Add Volunteer</button>
          <button className="action-btn" type="button" onClick={() => setUploadOpen(true)}><FileUp size={16} /> Upload Volunteers</button>
          <button className="action-btn" type="button" onClick={() => showToast("Task assignment workspace opened")}>Assign Task</button>
          <button className="action-btn" type="button" onClick={() => showToast("Volunteer report generation queued")}>Generate Report</button>
          <button className="action-btn" type="button" onClick={() => exportRows(exportScopeForTab(activeTab))}><Download size={16} /> Export</button>
          {["directory", "workload", "command-structure"].includes(activeTab) ? (
            <button className="action-btn" type="button" onClick={() => setFiltersVisible((current) => !current)}><Filter size={16} /> {filtersVisible ? "Hide Filters" : "Show Filters"}</button>
          ) : null}
        </div>
      </header>

      <main className="volunteer-workspace">
        <VolunteerStats total={volunteers.length} active={activeVolunteers.length} onGround={onGround.length} onLeave={onLeave.length} onboarding={newVolunteers.length} overloaded={overloaded.length} />
        {filtersVisible && ["directory", "workload", "command-structure"].includes(activeTab) ? <VolunteerFilters filters={filters} onChange={updateFilter} activeTab={activeTab} /> : null}

        {activeTab === "overview" ? (
          <OverviewTab
            volunteers={volunteers}
            visibleVolunteers={visibleVolunteers}
            filters={filters}
            avgCapacity={avgCapacity}
            activeTasks={activeTasks}
            overloaded={overloaded.length}
            nextDeadlines={nextDeadlines}
            onFilterChange={updateFilter}
            onAdd={() => setAddOpen(true)}
            onUpload={() => setUploadOpen(true)}
            onAssignTask={() => showToast("Task assignment workspace opened")}
            onGenerateReport={() => showToast("Volunteer report generation queued")}
            onExport={() => exportRows("overview")}
          />
        ) : null}
        {activeTab === "directory" ? (
          <DirectoryTab
            volunteers={visibleVolunteers}
            onProfile={setProfileVolunteer}
            onEdit={setEditVolunteer}
            onQuick={setQuickVolunteer}
          />
        ) : null}
        {activeTab === "workload" ? (
          <WorkloadTab
            volunteers={visibleVolunteers}
            totalVolunteers={volunteers.length}
            avgCapacity={avgCapacity}
            actionNeeded={overloaded.length}
            onProfile={setProfileVolunteer}
            onReassign={(volunteer) => showToast(`Reassignment queue opened for ${volunteer.name}`)}
            onFollowUp={(volunteer) => showToast(`Follow-up marker added for ${volunteer.name}`)}
            onExport={() => exportRows("workload")}
            onAdd={() => setAddOpen(true)}
          />
        ) : null}
        {activeTab === "command-structure" ? (
          <CommandStructureTab
            volunteers={visibleVolunteers}
            allVolunteers={volunteers}
            onProfile={setProfileVolunteer}
            onTeam={setTeamVolunteer}
            onExport={() => exportRows("command")}
            onAdd={() => setAddOpen(true)}
          />
        ) : null}
        {["tasks", "reports", "attendance", "performance", "settings"].includes(activeTab) ? (
          <VolunteerOperationsSubsection
            activeTab={activeTab}
            volunteers={visibleVolunteers}
            onProfile={setProfileVolunteer}
            onAdd={() => setAddOpen(true)}
            onExport={() => exportRows(exportScopeForTab(activeTab))}
            onPlaceholder={showToast}
          />
        ) : null}
      </main>

      {profileVolunteer ? <VolunteerProfileModal volunteer={profileVolunteer} onClose={() => setProfileVolunteer(null)} onEdit={() => setEditVolunteer(profileVolunteer)} /> : null}
      {editVolunteer ? <VolunteerEditModal volunteer={editVolunteer} onClose={() => setEditVolunteer(null)} onSave={saveVolunteer} /> : null}
      {quickVolunteer ? <QuickDetailsPanel volunteer={quickVolunteer} onClose={() => setQuickVolunteer(null)} onProfile={() => setProfileVolunteer(quickVolunteer)} /> : null}
      {teamVolunteer ? <TeamMembersPanel leader={teamVolunteer} volunteers={volunteers.filter((volunteer) => volunteer.reportsToId === teamVolunteer.id)} onClose={() => setTeamVolunteer(null)} onProfile={setProfileVolunteer} /> : null}
      {addOpen ? <AddVolunteerModal onClose={() => setAddOpen(false)} onAdd={addVolunteer} /> : null}
      {uploadOpen ? <UploadVolunteerModal onClose={() => setUploadOpen(false)} onQueued={() => showToast("Upload template review queued")} /> : null}
      {toast ? <div className="volunteer-toast" role="status">{toast}</div> : null}
    </PlatformShell>
  );
}

export function VolunteerStats({
  total,
  active,
  onGround,
  onLeave,
  onboarding,
  overloaded
}: {
  total: number;
  active: number;
  onGround: number;
  onLeave: number;
  onboarding: number;
  overloaded: number;
}) {
  const stats = [
    ["Total Volunteers", total, "Campaign field force"],
    ["Active Volunteers", active, "Available for assignment"],
    ["On Ground", onGround, "Currently in field"],
    ["On Leave", onLeave, "Temporarily unavailable"],
    ["New / Onboarding", onboarding, "Needs coordinator review"],
    ["Overloaded / Action Needed", overloaded, "Rebalance required"]
  ] as const;

  return (
    <section className="volunteer-stat-grid" aria-label="Volunteer summary">
      {stats.map(([label, value, detail]) => (
        <article className="volunteer-stat-card" key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
          <small>{detail}</small>
        </article>
      ))}
    </section>
  );
}

export function VolunteerFilters({
  filters,
  activeTab,
  onChange
}: {
  filters: VolunteerFiltersState;
  activeTab: VolunteerTab;
  onChange: (key: keyof VolunteerFiltersState, value: string | boolean) => void;
}) {
  return (
    <section className="volunteer-filter-bar" aria-label="Volunteer filters">
      <label className="volunteer-search">
        <Search size={16} />
        <input value={filters.search} onChange={(event) => onChange("search", event.target.value)} placeholder="Search volunteers" />
      </label>
      <FilterSelect label="Zone / Village / Ward" value={filters.zone} options={["All", ...volunteerZones]} onChange={(value) => onChange("zone", value)} />
      <FilterSelect label="Role" value={filters.role} options={["All", ...volunteerRoles]} onChange={(value) => onChange("role", value)} />
      <FilterSelect label="Status" value={filters.status} options={["All", "Active", "Inactive", "On Ground", "On Leave", "New", "Stable", "Busy", "Overloaded", "Needs Follow-up"]} onChange={(value) => onChange("status", value)} />
      <FilterSelect label="Booth" value={filters.booth} options={["All", ...volunteerBooths]} onChange={(value) => onChange("booth", value)} />
      {activeTab === "workload" ? <FilterSelect label="Coordinator" value={filters.coordinator} options={["All", ...volunteerCoordinators]} onChange={(value) => onChange("coordinator", value)} /> : null}
      {activeTab === "workload" ? (
        <label className="volunteer-toggle">
          <input type="checkbox" checked={filters.includeInactive} onChange={(event) => onChange("includeInactive", event.target.checked)} />
          <span>Show inactive / on-leave</span>
        </label>
      ) : null}
    </section>
  );
}

function OverviewTab({
  volunteers,
  visibleVolunteers,
  filters,
  avgCapacity,
  activeTasks,
  overloaded,
  nextDeadlines,
  onFilterChange,
  onAdd,
  onUpload,
  onAssignTask,
  onGenerateReport,
  onExport
}: {
  volunteers: Volunteer[];
  visibleVolunteers: Volunteer[];
  filters: VolunteerFiltersState;
  avgCapacity: number;
  activeTasks: number;
  overloaded: number;
  nextDeadlines: number;
  onFilterChange: (key: keyof VolunteerFiltersState, value: string | boolean) => void;
  onAdd: () => void;
  onUpload: () => void;
  onAssignTask: () => void;
  onGenerateReport: () => void;
  onExport: () => void;
}) {
  const activeVolunteers = volunteers.filter((volunteer) => volunteer.status === "Active" || volunteer.status === "On Ground").length;
  const onGroundVolunteers = volunteers.filter((volunteer) => volunteer.status === "On Ground").length;
  const coordinators = volunteers.filter((volunteer) => volunteer.role.includes("Coordinator") || volunteer.role === "Campaign Manager").length;
  const reportingLevels = new Set(volunteers.map((volunteer) => volunteer.role)).size;
  const totalTeams = volunteers.filter((leader) => volunteers.some((volunteer) => volunteer.reportsToId === leader.id)).length;
  const hubVolunteers = visibleVolunteers.length ? visibleVolunteers : volunteers;
  const strongCoverage = hubVolunteers.filter((volunteer) => volunteer.capacity >= 70 && volunteer.status !== "Inactive").slice(0, 3);
  const weakCoverage = hubVolunteers.filter((volunteer) => volunteer.capacity < 45 || volunteer.workloadStatus === "Needs Follow-up").slice(0, 3);
  const noVolunteerBooths = ["Booth 138 / Devpur Extension", "Booth 142 / Industrial Rooms", "Booth 151 / Wavi Periphery"];
  const recentReports = hubVolunteers
    .filter((volunteer) => volunteer.reportsSubmitted > 0)
    .slice(0, 5)
    .map((volunteer) => ({
      title: `${volunteer.village} ${volunteer.booth}`,
      detail: `${volunteer.reportsSubmitted} reports / ${volunteer.issuesReported} issue notes / ${volunteer.opponentActivityReported} activity notes`,
      owner: volunteer.name
    }));

  return (
    <section className="volunteer-overview-grid">
      <section className="panel volunteer-hub-section">
        <SectionHeader title="Volunteer Operations Hub" eyebrow="Access volunteer directory, field workload, and command structure operations." />
        <div className="volunteer-hub-grid">
          <a className="volunteer-hub-card" href="/volunteer-management/directory">
            <div className="volunteer-hub-card-head">
              <span className="volunteer-hub-icon">VD</span>
              <strong>Volunteer Directory</strong>
            </div>
            <p>Browse, search, filter and manage campaign volunteers across villages, wards and booths.</p>
            <div className="volunteer-hub-metrics">
              <Metric label="Total Volunteers" value={volunteers.length} />
              <Metric label="Active Volunteers" value={activeVolunteers} />
              <Metric label="On Ground Volunteers" value={onGroundVolunteers} />
            </div>
            <div className="volunteer-avatar-stack" aria-label="Volunteer preview">
              {volunteers.slice(0, 3).map((volunteer) => <Avatar name={volunteer.name} small key={volunteer.id} />)}
            </div>
            <span className="volunteer-hub-cta">Open Directory <ArrowRight size={16} /></span>
          </a>

          <a className="volunteer-hub-card" href="/volunteer-management/workload">
            <div className="volunteer-hub-card-head">
              <span className="volunteer-hub-icon">FW</span>
              <strong>Field Workload</strong>
            </div>
            <p>Monitor volunteer task assignments, field capacity, deadlines and operational workload.</p>
            <div className="volunteer-hub-metrics">
              <Metric label="Active Tasks" value={activeTasks} />
              <Metric label="Average Capacity" value={`${avgCapacity}%`} />
              <Metric label="Overloaded Volunteers" value={overloaded} />
            </div>
            <div className="volunteer-mini-bars" aria-label="Workload preview">
              {volunteers.slice(1, 4).map((volunteer) => <CapacityBar value={volunteer.capacity} compact key={volunteer.id} />)}
            </div>
            <span className="volunteer-hub-cta">Open Workload <ArrowRight size={16} /></span>
          </a>

          <a className="volunteer-hub-card" href="/volunteer-management/command-structure">
            <div className="volunteer-hub-card-head">
              <span className="volunteer-hub-icon">CS</span>
              <strong>Command Structure</strong>
            </div>
            <p>View reporting hierarchy from Candidate level down to Booth Volunteers.</p>
            <div className="volunteer-hub-metrics">
              <Metric label="Total Coordinators" value={coordinators} />
              <Metric label="Reporting Levels" value={reportingLevels} />
              <Metric label="Total Teams" value={totalTeams} />
            </div>
            <div className="volunteer-mini-chain">
              {["Candidate", "Campaign Manager", "Constituency Coordinator", "Ward Coordinator", "Booth Coordinator"].map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
            <span className="volunteer-hub-cta">Open Structure <ArrowRight size={16} /></span>
          </a>
        </div>
      </section>

      <VolunteerFilters filters={filters} onChange={onFilterChange} activeTab="overview" />

      <section className="workspace-grid two-column">
        <div className="panel">
          <SectionHeader title="Recent Volunteer Activity" eyebrow="Field movement from filtered volunteers" actions={<a className="action-btn" href="/volunteer-management/tasks">View Tasks</a>} />
          <div className="coverage-engine-list">
            {hubVolunteers.slice(0, 5).map((volunteer) => (
              <article className="coverage-engine-row" key={volunteer.id}>
                <div>
                  <strong>{volunteer.name}</strong>
                  <small>{volunteer.lastActivity}</small>
                </div>
                <span className={`volunteer-status workload-${slug(volunteer.workloadStatus)}`}>{volunteer.workloadStatus}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="panel">
          <SectionHeader title="Coverage Overview" eyebrow="Booth volunteer coverage health" actions={<a className="action-btn" href="/campaign-structure/coverage-map">View Coverage</a>} />
          <div className="volunteer-coverage-grid">
            <CoverageList title="Strong Coverage" items={strongCoverage.map((volunteer) => `${volunteer.booth} / ${volunteer.village} / ${volunteer.name}`)} tone="strong" />
            <CoverageList title="Weak Coverage" items={weakCoverage.map((volunteer) => `${volunteer.booth} / ${volunteer.village} / ${volunteer.capacity}% capacity`)} tone="watch" />
            <CoverageList title="No Volunteer Assigned" items={noVolunteerBooths} tone="weak" />
          </div>
        </div>
      </section>

      <section className="panel">
        <SectionHeader title="Recent Reports" eyebrow="Volunteer field intelligence" actions={<a className="action-btn" href="/volunteer-management/reports">View Reports</a>} />
        <div className="workspace-grid two-column">
          <div className="coverage-engine-list">
            {recentReports.map((report) => (
              <article className="coverage-engine-row" key={`${report.title}-${report.owner}`}>
                <div>
                  <strong>{report.title}</strong>
                  <small>{report.detail}</small>
                </div>
                <span className="volunteer-status status-active">{report.owner}</span>
              </article>
            ))}
            <article className="coverage-engine-row">
              <div><strong>Booth alerts</strong><small>2 weak coverage booths and 3 deadline risks need coordinator review.</small></div>
              <a href="/volunteer-management/tasks">Open Tasks</a>
            </article>
          </div>
          <div className="volunteer-report-summary">
            <MetricCard label="Issue Reports" value={hubVolunteers.reduce((sum, volunteer) => sum + volunteer.issuesReported, 0)} detail="Volunteer-raised field issues" />
            <MetricCard label="Booth Alerts" value={weakCoverage.length + noVolunteerBooths.length} detail="Weak or uncovered booth signals" />
            <MetricCard label="Opponent Activity Reports" value={hubVolunteers.reduce((sum, volunteer) => sum + volunteer.opponentActivityReported, 0)} detail="Reports requiring verification" />
          </div>
        </div>
      </section>

      <div className="volunteer-overview-actions">
        <button className="action-btn" type="button" onClick={onAdd}><Plus size={16} /> Add Volunteer</button>
        <button className="action-btn" type="button" onClick={onUpload}><FileUp size={16} /> Upload Volunteers</button>
        <button className="action-btn" type="button" onClick={onAssignTask}>Assign Task</button>
        <button className="action-btn" type="button" onClick={onGenerateReport}>Generate Report</button>
        <button className="action-btn" type="button" onClick={onExport}><Download size={16} /> Export</button>
      </div>
    </section>
  );
}

function CoverageList({ title, items, tone }: { title: string; items: string[]; tone: "strong" | "watch" | "weak" }) {
  return (
    <article className={`coverage-preview-card is-${tone}`}>
      <strong>{title}</strong>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </article>
  );
}

function DirectoryTab({
  volunteers,
  onProfile,
  onEdit,
  onQuick
}: {
  volunteers: Volunteer[];
  onProfile: (volunteer: Volunteer) => void;
  onEdit: (volunteer: Volunteer) => void;
  onQuick: (volunteer: Volunteer) => void;
}) {
  return (
    <section className="panel">
      <SectionHeader title="Volunteer Directory" eyebrow="Field force cards" actions={<CountPill>{volunteers.length} visible</CountPill>} />
      <div className="volunteer-card-grid">
        {volunteers.map((volunteer) => (
          <VolunteerCard volunteer={volunteer} onProfile={onProfile} onEdit={onEdit} onQuick={onQuick} key={volunteer.id} />
        ))}
      </div>
    </section>
  );
}

function VolunteerOperationsSubsection({
  activeTab,
  volunteers,
  onProfile,
  onAdd,
  onExport,
  onPlaceholder
}: {
  activeTab: VolunteerTab;
  volunteers: Volunteer[];
  onProfile: (volunteer: Volunteer) => void;
  onAdd: () => void;
  onExport: () => void;
  onPlaceholder: (message: string) => void;
}) {
  const meta: Record<string, { title: string; eyebrow: string; body: string; primary: string }> = {
    tasks: { title: "Volunteer Tasks", eyebrow: "Assignment queue", body: "Track assignment pressure, booth follow-ups, issue verification tasks, and coordinator rebalancing.", primary: "Create Task" },
    reports: { title: "Volunteer Reports", eyebrow: "Field intelligence reports", body: "Review booth reports, village reports, issue reports, sentiment reports, and opponent activity reports.", primary: "Generate Report" },
    attendance: { title: "Volunteer Attendance", eyebrow: "Field presence", body: "Monitor attendance score, meetings attended, field presence, and missed update patterns.", primary: "Mark Attendance" },
    performance: { title: "Volunteer Performance", eyebrow: "Volunteer scorecard", body: "Compare task completion, attendance, activity, report quality, and overall volunteer scores.", primary: "Review Performance" },
    settings: { title: "Volunteer Settings", eyebrow: "Module controls", body: "Configure volunteer statuses, coordinator rules, task categories, upload templates, and notification placeholders.", primary: "Save Settings" }
  };
  const item = meta[activeTab] ?? meta.tasks;

  return (
    <section className="volunteer-subsection-layout">
      <div className="volunteer-page-title">
        <div>
          <span className="eyebrow">{item.eyebrow}</span>
          <h2>{item.title}</h2>
          <p>{item.body}</p>
        </div>
        <div className="manager-header-actions">
          <button className="action-btn" type="button" onClick={() => onPlaceholder(`${item.primary} placeholder opened`)}>{item.primary}</button>
          <button className="action-btn" type="button" onClick={onAdd}><Plus size={16} /> Add Volunteer</button>
          <button className="action-btn" type="button" onClick={onExport}><Download size={16} /> Export</button>
        </div>
      </div>
      <section className="panel">
        <SectionHeader title={`${item.title} Snapshot`} eyebrow="Operational preview" actions={<CountPill>{volunteers.length} volunteers</CountPill>} />
        <div className="volunteer-table-wrap">
          <table className="volunteer-table">
            <thead>
              <tr>
                <th>Volunteer</th>
                <th>Role</th>
                <th>Booth / Village</th>
                <th>Active Tasks</th>
                <th>Reports</th>
                <th>Attendance</th>
                <th>Performance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((volunteer) => (
                <tr key={volunteer.id}>
                  <td><button className="volunteer-person-link" type="button" onClick={() => onProfile(volunteer)}><Avatar name={volunteer.name} small /> {volunteer.name}</button></td>
                  <td>{volunteer.role}</td>
                  <td>{volunteer.booth} / {volunteer.village}</td>
                  <td>{volunteer.activeTasks}</td>
                  <td>{volunteer.reportsSubmitted}</td>
                  <td>{volunteer.attendanceScore}%</td>
                  <td>{volunteer.performanceScore}%</td>
                  <td><button type="button" onClick={() => onProfile(volunteer)}>Profile</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}

export function VolunteerCard({
  volunteer,
  onProfile,
  onEdit,
  onQuick
}: {
  volunteer: Volunteer;
  onProfile: (volunteer: Volunteer) => void;
  onEdit: (volunteer: Volunteer) => void;
  onQuick: (volunteer: Volunteer) => void;
}) {
  return (
    <article className="volunteer-card">
      <div className="volunteer-card-head">
        <Avatar name={volunteer.name} />
        <button className="volunteer-icon-btn" type="button" aria-label={`Edit ${volunteer.name}`} onClick={() => onEdit(volunteer)}><Edit3 size={15} /></button>
      </div>
      <div>
        <strong>{volunteer.name}</strong>
        <p>{volunteer.role}</p>
      </div>
      <div className="volunteer-badge-row">
        <StatusBadge value={volunteer.status} />
        <span>{volunteer.village} / {volunteer.ward} / {volunteer.booth}</span>
      </div>
      <div className="volunteer-card-metrics">
        <Metric label="Campaigns" value={volunteer.assignedCampaigns.length} />
        <Metric label="Active Tasks" value={volunteer.activeTasks} />
        <Metric label="Capacity" value={`${volunteer.capacity}%`} />
      </div>
      <CapacityBar value={volunteer.capacity} />
      <div className="volunteer-card-actions">
        <button type="button" onClick={() => onProfile(volunteer)}>View Profile</button>
        <button className="volunteer-arrow-btn" type="button" aria-label={`Open quick details for ${volunteer.name}`} onClick={() => onQuick(volunteer)}><ArrowRight size={16} /></button>
      </div>
    </article>
  );
}

function WorkloadTab({
  volunteers,
  totalVolunteers,
  avgCapacity,
  actionNeeded,
  onProfile,
  onReassign,
  onFollowUp,
  onExport,
  onAdd
}: {
  volunteers: Volunteer[];
  totalVolunteers: number;
  avgCapacity: number;
  actionNeeded: number;
  onProfile: (volunteer: Volunteer) => void;
  onReassign: (volunteer: Volunteer) => void;
  onFollowUp: (volunteer: Volunteer) => void;
  onExport: () => void;
  onAdd: () => void;
}) {
  const activeTasks = volunteers.reduce((sum, volunteer) => sum + volunteer.activeTasks, 0);

  return (
    <section className="volunteer-workload-layout">
      <div className="volunteer-page-title">
        <div>
          <span className="eyebrow">Field Capacity / Workload</span>
          <h2>Volunteer Workload</h2>
          <p>Showing workload for all volunteers across active campaign tasks.</p>
        </div>
        <div className="manager-header-actions">
          <button className="action-btn" type="button" onClick={onExport}><Download size={16} /> Export Workload</button>
          <button className="action-btn" type="button" onClick={onAdd}><Plus size={16} /> Add Volunteer</button>
        </div>
      </div>
      <div className="volunteer-workload-stats">
        <MetricCard label="Total Volunteers" value={totalVolunteers} detail="Directory size" />
        <MetricCard label="Active Tasks" value={activeTasks} detail="Visible workload" />
        <MetricCard label="Average Field Capacity" value={`${avgCapacity}%`} detail="Across all volunteers" />
        <MetricCard label="Action Needed" value={actionNeeded} detail="Overloaded or follow-up" />
      </div>
      <VolunteerWorkloadTable volunteers={volunteers} onProfile={onProfile} onReassign={onReassign} onFollowUp={onFollowUp} />
    </section>
  );
}

export function VolunteerWorkloadTable({
  volunteers,
  onProfile,
  onReassign,
  onFollowUp
}: {
  volunteers: Volunteer[];
  onProfile: (volunteer: Volunteer) => void;
  onReassign: (volunteer: Volunteer) => void;
  onFollowUp: (volunteer: Volunteer) => void;
}) {
  return (
    <section className="panel volunteer-table-panel">
      <SectionHeader title="Field Task Load" eyebrow="Volunteer workload table" actions={<CountPill>{volunteers.length} rows</CountPill>} />
      <div className="volunteer-table-wrap">
        <table className="volunteer-table">
          <thead>
            <tr>
              <th>Volunteer</th>
              <th>Role</th>
              <th>Booth / Village</th>
              <th>Assigned Tasks</th>
              <th>Field Capacity</th>
              <th>Status</th>
              <th>Next Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((volunteer) => (
              <tr key={volunteer.id}>
                <td><button className="volunteer-person-link" type="button" onClick={() => onProfile(volunteer)}><Avatar name={volunteer.name} small /> {volunteer.name}</button></td>
                <td>{volunteer.role}</td>
                <td>{volunteer.booth} / {volunteer.village}</td>
                <td>{volunteer.activeTasks}</td>
                <td><CapacityBar value={volunteer.capacity} compact /></td>
                <td><WorkloadBadge value={volunteer.workloadStatus} /></td>
                <td>{volunteer.nextDeadline}</td>
                <td>
                  <div className="row-actions">
                    <button type="button" onClick={() => onProfile(volunteer)}>View</button>
                    <button type="button" onClick={() => onReassign(volunteer)}>Reassign</button>
                    <button type="button" onClick={() => onFollowUp(volunteer)}>Follow-up</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function CommandStructureTab({
  volunteers,
  allVolunteers,
  onProfile,
  onTeam,
  onExport,
  onAdd
}: {
  volunteers: Volunteer[];
  allVolunteers: Volunteer[];
  onProfile: (volunteer: Volunteer) => void;
  onTeam: (volunteer: Volunteer) => void;
  onExport: () => void;
  onAdd: () => void;
}) {
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(allVolunteers.map((volunteer) => volunteer.id)));
  const root = allVolunteers.find((volunteer) => !volunteer.reportsToId) ?? allVolunteers[0];

  function toggle(id: string) {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <section className="volunteer-command-layout">
      <div className="volunteer-page-title">
        <div>
          <span className="eyebrow">Command Structure / Org Chart</span>
          <h2>Volunteer Command Structure</h2>
          <p>Reporting structure across constituency, wards, villages, booths, and volunteer teams.</p>
        </div>
        <div className="manager-header-actions">
          <button className="action-btn" type="button" onClick={() => setExpanded(new Set())}>Collapse All</button>
          <button className="action-btn" type="button" onClick={() => setExpanded(new Set(allVolunteers.map((volunteer) => volunteer.id)))}>Expand All</button>
          <button className="action-btn" type="button" onClick={onExport}><Download size={16} /> Export</button>
          <button className="action-btn" type="button" onClick={onAdd}><Plus size={16} /> Add Volunteer</button>
        </div>
      </div>
      <CommandStructureChart root={root} volunteers={volunteers} allVolunteers={allVolunteers} expanded={expanded} onToggle={toggle} onProfile={onProfile} onTeam={onTeam} />
    </section>
  );
}

export function CommandStructureChart({
  root,
  volunteers,
  allVolunteers,
  expanded,
  onToggle,
  onProfile,
  onTeam
}: {
  root: Volunteer;
  volunteers: Volunteer[];
  allVolunteers: Volunteer[];
  expanded: Set<string>;
  onToggle: (id: string) => void;
  onProfile: (volunteer: Volunteer) => void;
  onTeam: (volunteer: Volunteer) => void;
}) {
  return (
    <section className="panel command-tree-panel">
      <SectionHeader title="Candidate to Booth Volunteer Chain" eyebrow="Political field hierarchy" actions={<CountPill>{volunteers.length} visible people</CountPill>} />
      <div className="command-tree">
        <CommandNode volunteer={root} allVolunteers={allVolunteers} expanded={expanded} onToggle={onToggle} onProfile={onProfile} onTeam={onTeam} depth={0} />
      </div>
    </section>
  );
}

function CommandNode({
  volunteer,
  allVolunteers,
  expanded,
  onToggle,
  onProfile,
  onTeam,
  depth
}: {
  volunteer: Volunteer;
  allVolunteers: Volunteer[];
  expanded: Set<string>;
  onToggle: (id: string) => void;
  onProfile: (volunteer: Volunteer) => void;
  onTeam: (volunteer: Volunteer) => void;
  depth: number;
}) {
  const children = allVolunteers.filter((item) => item.reportsToId === volunteer.id);
  const isExpanded = expanded.has(volunteer.id);

  return (
    <div className="command-node" style={{ marginLeft: depth ? 22 : 0 }}>
      <div className="command-person-card">
        <button className="command-toggle" type="button" aria-label={`${isExpanded ? "Collapse" : "Expand"} ${volunteer.name}`} onClick={() => onToggle(volunteer.id)}>
          {children.length ? isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} /> : <span />}
        </button>
        <button className="command-card-main" type="button" onClick={() => onProfile(volunteer)}>
          <Avatar name={volunteer.name} />
          <span>
            <strong>{volunteer.name}</strong>
            <small>{volunteer.role}</small>
          </span>
        </button>
        <StatusDot value={volunteer.status} />
        <button className="team-count-badge" type="button" onClick={() => onTeam(volunteer)}>{children.length} team</button>
        <span className="command-area-tag">{volunteer.zone} / {volunteer.booth}</span>
      </div>
      {children.length && isExpanded ? (
        <div className="command-children">
          {children.map((child) => (
            <CommandNode volunteer={child} allVolunteers={allVolunteers} expanded={expanded} onToggle={onToggle} onProfile={onProfile} onTeam={onTeam} depth={depth + 1} key={child.id} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function VolunteerProfileModal({ volunteer, onClose, onEdit }: { volunteer: Volunteer; onClose: () => void; onEdit: () => void }) {
  const [tab, setTab] = useState<(typeof profileTabs)[number]>("Overview");
  return (
    <div className="volunteer-modal-backdrop" role="dialog" aria-modal="true" aria-label={`${volunteer.name} profile`}>
      <section className="volunteer-profile-modal">
        <div className="volunteer-modal-head">
          <div className="volunteer-profile-title">
            <Avatar name={volunteer.name} />
            <div>
              <span className="eyebrow">Volunteer Profile</span>
              <h2>{volunteer.name}</h2>
              <p>{volunteer.role} / {volunteer.village} / {volunteer.booth}</p>
            </div>
          </div>
          <div className="manager-header-actions">
            <button type="button" className="action-btn" onClick={onEdit}><Edit3 size={15} /> Edit</button>
            <button type="button" className="action-btn" onClick={onClose}>Close</button>
          </div>
        </div>
        <div className="volunteer-profile-tabs">
          {profileTabs.map((item) => (
            <button className={tab === item ? "is-active" : ""} type="button" onClick={() => setTab(item)} key={item}>{item}</button>
          ))}
        </div>
        <div className="volunteer-profile-body">
          {tab === "Overview" ? <ProfileOverview volunteer={volunteer} /> : null}
          {tab === "Tasks" ? <ProfileTasks volunteer={volunteer} /> : null}
          {tab === "Activity" ? <ProfileActivity volunteer={volunteer} /> : null}
          {tab === "Reports" ? <ProfileReports volunteer={volunteer} /> : null}
          {tab === "Attendance" ? <ScorePanel title="Attendance" scores={[["Attendance score", volunteer.attendanceScore], ["Meetings attended", volunteer.meetingsAttended], ["Last activity freshness", volunteer.attendanceScore - 4]]} /> : null}
          {tab === "Performance" ? <ProfilePerformance volunteer={volunteer} /> : null}
          {tab === "Communication" ? <ProfileCommunication volunteer={volunteer} /> : null}
        </div>
      </section>
    </div>
  );
}

function ProfileOverview({ volunteer }: { volunteer: Volunteer }) {
  const rows = [
    ["Mobile", volunteer.phone],
    ["WhatsApp", volunteer.whatsapp],
    ["Village", volunteer.village],
    ["Ward", volunteer.ward],
    ["Booth", volunteer.booth],
    ["Reports To", volunteer.coordinator],
    ["Skills", volunteer.skills.join(", ")],
    ["Status", volunteer.status]
  ] as const;
  return <DetailGrid rows={rows} />;
}

function ProfileTasks({ volunteer }: { volunteer: Volunteer }) {
  return <ScorePanel title="Assigned Tasks" scores={[["Assigned tasks", volunteer.activeTasks], ["Pending", Math.max(0, volunteer.activeTasks - volunteer.verifiedTasks)], ["Completed", volunteer.completedTasks], ["Verified", volunteer.verifiedTasks], ["Overdue", volunteer.overdueTasks]]} />;
}

function ProfileActivity({ volunteer }: { volunteer: Volunteer }) {
  return <ScorePanel title="Field Activity" scores={[["Door-to-door visits", volunteer.doorVisits], ["Calls made", volunteer.callsMade], ["Meetings attended", volunteer.meetingsAttended], ["Issues reported", volunteer.issuesReported], ["Opponent activity reported", volunteer.opponentActivityReported]]} />;
}

function ProfileReports({ volunteer }: { volunteer: Volunteer }) {
  return <DetailGrid rows={[["Booth report", `${volunteer.reportsSubmitted} submitted`], ["Village report", "Latest village notes available"], ["Issue report", `${volunteer.issuesReported} issue records`], ["Sentiment report", "Field sentiment updates attached"], ["Opponent activity report", `${volunteer.opponentActivityReported} activity notes`]]} />;
}

function ProfilePerformance({ volunteer }: { volunteer: Volunteer }) {
  return <ScorePanel title="Performance" scores={[["Task completion score", volunteer.performanceScore], ["Attendance score", volunteer.attendanceScore], ["Activity score", volunteer.activityScore], ["Report quality score", volunteer.reportQualityScore], ["Overall volunteer score", Math.round((volunteer.performanceScore + volunteer.attendanceScore + volunteer.activityScore + volunteer.reportQualityScore) / 4)]]} />;
}

function ProfileCommunication({ volunteer }: { volunteer: Volunteer }) {
  return <DetailGrid rows={[["Mobile", volunteer.phone], ["WhatsApp", volunteer.whatsapp], ["Coordinator", volunteer.coordinator], ["Last activity", volunteer.lastActivity], ["Next deadline", volunteer.nextDeadline]]} />;
}

export function AddVolunteerModal({ onClose, onAdd }: { onClose: () => void; onAdd: (volunteer: Volunteer) => void }) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "New Volunteer");
    const role = String(data.get("role") || "Volunteer") as Volunteer["role"];
    const village = String(data.get("village") || "Sinnar Town");
    const booth = String(data.get("booth") || "Booth Pending");
    onAdd({
      id: `vol-${Date.now()}`,
      name,
      role,
      status: "New",
      workloadStatus: "Stable",
      phone: String(data.get("phone") || "+91"),
      whatsapp: String(data.get("whatsapp") || data.get("phone") || "+91"),
      village,
      ward: String(data.get("ward") || "Ward Pending"),
      booth,
      zone: String(data.get("zone") || "New Assignment"),
      coordinator: String(data.get("coordinator") || "Priya Kale"),
      reportsToId: "vol-priya-kale",
      skills: String(data.get("skills") || "Field follow-up").split(",").map((item) => item.trim()).filter(Boolean),
      assignedCampaigns: ["Onboarding"],
      activeTasks: 1,
      completedTasks: 0,
      verifiedTasks: 0,
      overdueTasks: 0,
      capacity: 20,
      performanceScore: 50,
      attendanceScore: 50,
      activityScore: 40,
      reportQualityScore: 45,
      lastActivity: "Added to PICOS volunteer directory",
      nextDeadline: "2026-06-22",
      reportsSubmitted: 0,
      doorVisits: 0,
      callsMade: 0,
      meetingsAttended: 0,
      issuesReported: 0,
      opponentActivityReported: 0
    });
  }

  return (
    <FormModal title="Add Volunteer" onClose={onClose} onSubmit={submit} submitLabel="Add Volunteer">
      <FormFields />
    </FormModal>
  );
}

function VolunteerEditModal({ volunteer, onClose, onSave }: { volunteer: Volunteer; onClose: () => void; onSave: (volunteer: Volunteer) => void }) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSave({
      ...volunteer,
      name: String(data.get("name") || volunteer.name),
      role: String(data.get("role") || volunteer.role) as Volunteer["role"],
      phone: String(data.get("phone") || volunteer.phone),
      whatsapp: String(data.get("whatsapp") || volunteer.whatsapp),
      village: String(data.get("village") || volunteer.village),
      ward: String(data.get("ward") || volunteer.ward),
      booth: String(data.get("booth") || volunteer.booth),
      zone: String(data.get("zone") || volunteer.zone),
      coordinator: String(data.get("coordinator") || volunteer.coordinator),
      skills: String(data.get("skills") || volunteer.skills.join(", ")).split(",").map((item) => item.trim()).filter(Boolean)
    });
  }

  return (
    <FormModal title={`Edit ${volunteer.name}`} onClose={onClose} onSubmit={submit} submitLabel="Save Changes">
      <FormFields volunteer={volunteer} />
    </FormModal>
  );
}

function UploadVolunteerModal({ onClose, onQueued }: { onClose: () => void; onQueued: () => void }) {
  return (
    <div className="volunteer-modal-backdrop" role="dialog" aria-modal="true" aria-label="Upload volunteers">
      <section className="volunteer-small-modal">
        <div className="volunteer-modal-head">
          <div>
            <span className="eyebrow">Bulk Intake</span>
            <h2>Upload Volunteers</h2>
            <p>CSV upload placeholder for volunteer onboarding, booth mapping, and coordinator assignment.</p>
          </div>
          <button type="button" className="action-btn" onClick={onClose}>Close</button>
        </div>
        <div className="volunteer-upload-box">
          <FileUp size={28} />
          <strong>Drop volunteer CSV here</strong>
          <p>Expected fields: name, role, mobile, village, ward, booth, coordinator, skills.</p>
          <button type="button" className="action-btn" onClick={() => { onQueued(); onClose(); }}>Queue Upload Review</button>
        </div>
      </section>
    </div>
  );
}

function QuickDetailsPanel({ volunteer, onClose, onProfile }: { volunteer: Volunteer; onClose: () => void; onProfile: () => void }) {
  return (
    <aside className="volunteer-side-panel" aria-label={`${volunteer.name} quick details`}>
      <div className="volunteer-modal-head">
        <div>
          <span className="eyebrow">Quick Details</span>
          <h2>{volunteer.name}</h2>
        </div>
        <button type="button" className="action-btn" onClick={onClose}>Close</button>
      </div>
      <ProfileOverview volunteer={volunteer} />
      <button className="action-btn" type="button" onClick={onProfile}>Open Full Profile</button>
    </aside>
  );
}

function TeamMembersPanel({ leader, volunteers, onClose, onProfile }: { leader: Volunteer; volunteers: Volunteer[]; onClose: () => void; onProfile: (volunteer: Volunteer) => void }) {
  return (
    <aside className="volunteer-side-panel" aria-label={`${leader.name} team members`}>
      <div className="volunteer-modal-head">
        <div>
          <span className="eyebrow">Team Count</span>
          <h2>{leader.name} Team</h2>
        </div>
        <button type="button" className="action-btn" onClick={onClose}>Close</button>
      </div>
      <div className="coverage-engine-list">
        {volunteers.length ? volunteers.map((volunteer) => (
          <article className="coverage-engine-row" key={volunteer.id}>
            <div><strong>{volunteer.name}</strong><small>{volunteer.role} / {volunteer.booth}</small></div>
            <button type="button" onClick={() => onProfile(volunteer)}>Profile</button>
          </article>
        )) : <p className="table-description">No direct team members assigned yet.</p>}
      </div>
    </aside>
  );
}

function FormModal({
  title,
  children,
  submitLabel,
  onClose,
  onSubmit
}: {
  title: string;
  children: ReactNode;
  submitLabel: string;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="volunteer-modal-backdrop" role="dialog" aria-modal="true" aria-label={title}>
      <form className="volunteer-small-modal" onSubmit={onSubmit}>
        <div className="volunteer-modal-head">
          <div>
            <span className="eyebrow">Volunteer Record</span>
            <h2>{title}</h2>
          </div>
          <button className="action-btn" type="button" onClick={onClose}>Close</button>
        </div>
        <div className="volunteer-form-grid">{children}</div>
        <div className="manager-header-actions">
          <button className="action-btn" type="submit">{submitLabel}</button>
          <button className="action-btn" type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

function FormFields({ volunteer }: { volunteer?: Volunteer }) {
  return (
    <>
      <label>Name<input name="name" defaultValue={volunteer?.name} required /></label>
      <label>Role<select name="role" defaultValue={volunteer?.role ?? "Volunteer"}>{volunteerRoles.map((role) => <option key={role}>{role}</option>)}</select></label>
      <label>Mobile<input name="phone" defaultValue={volunteer?.phone} /></label>
      <label>WhatsApp<input name="whatsapp" defaultValue={volunteer?.whatsapp} /></label>
      <label>Village<input name="village" defaultValue={volunteer?.village} /></label>
      <label>Ward<input name="ward" defaultValue={volunteer?.ward} /></label>
      <label>Booth<input name="booth" defaultValue={volunteer?.booth} /></label>
      <label>Zone<input name="zone" defaultValue={volunteer?.zone} /></label>
      <label>Coordinator<input name="coordinator" defaultValue={volunteer?.coordinator} /></label>
      <label className="wide">Skills<textarea name="skills" defaultValue={volunteer?.skills.join(", ")} /></label>
    </>
  );
}

function filterVolunteers(volunteers: Volunteer[], filters: VolunteerFiltersState) {
  const query = filters.search.trim().toLowerCase();
  return volunteers.filter((volunteer) => {
    const matchesQuery = !query || `${volunteer.name} ${volunteer.role} ${volunteer.village} ${volunteer.ward} ${volunteer.booth} ${volunteer.coordinator}`.toLowerCase().includes(query);
    const matchesZone = filters.zone === "All" || volunteer.zone === filters.zone || volunteer.village === filters.zone || volunteer.ward === filters.zone;
    const matchesRole = filters.role === "All" || volunteer.role === filters.role;
    const matchesStatus = filters.status === "All" || volunteer.status === filters.status || volunteer.workloadStatus === filters.status;
    const matchesBooth = filters.booth === "All" || volunteer.booth === filters.booth;
    const matchesCoordinator = filters.coordinator === "All" || volunteer.coordinator === filters.coordinator;
    const availability = filters.includeInactive || !["Inactive", "On Leave"].includes(volunteer.status);
    return matchesQuery && matchesZone && matchesRole && matchesStatus && matchesBooth && matchesCoordinator && availability;
  });
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="select-filter">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

function Avatar({ name, small = false }: { name: string; small?: boolean }) {
  return <span className={`volunteer-avatar ${small ? "small" : ""}`}>{initials(name)}</span>;
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return <span><b>{value}</b><small>{label}</small></span>;
}

function MetricCard({ label, value, detail }: { label: string; value: string | number; detail: string }) {
  return <article className="volunteer-stat-card"><span>{label}</span><strong>{value}</strong><small>{detail}</small></article>;
}

function CapacityBar({ value, compact = false }: { value: number; compact?: boolean }) {
  return <span className={`capacity-bar ${compact ? "compact" : ""}`}><i style={{ width: `${Math.min(100, value)}%` }} /><b>{value}%</b></span>;
}

function StatusBadge({ value }: { value: VolunteerStatus }) {
  return <span className={`volunteer-status status-${slug(value)}`}>{value}</span>;
}

function WorkloadBadge({ value }: { value: WorkloadStatus }) {
  return <span className={`volunteer-status workload-${slug(value)}`}>{value}</span>;
}

function StatusDot({ value }: { value: VolunteerStatus }) {
  return <span className={`volunteer-dot status-${slug(value)}`} title={value} />;
}

function DetailGrid({ rows }: { rows: ReadonlyArray<readonly [string, string]> }) {
  return (
    <div className="volunteer-detail-grid">
      {rows.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
    </div>
  );
}

function ScorePanel({ title, scores }: { title: string; scores: Array<[string, number]> }) {
  return (
    <div className="volunteer-score-panel">
      <h3>{title}</h3>
      {scores.map(([label, value]) => (
        <div className="volunteer-score-row" key={label}>
          <span>{label}</span>
          <CapacityBar value={Math.min(100, value)} compact />
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}

function downloadCsv(filename: string, rows: Array<Array<string | number>>) {
  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll("\"", "\"\"")}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function initials(name: string) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

function slug(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

function exportScopeForTab(activeTab: VolunteerTab) {
  if (activeTab === "command-structure") return "command";
  return activeTab;
}

function scopeLabel(scope: "directory" | "workload" | "command" | "overview" | "tasks" | "reports" | "attendance" | "performance" | "settings") {
  if (scope === "command") return "command structure";
  return scope;
}
