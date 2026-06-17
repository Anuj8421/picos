"use client";

import { useMemo, useState } from "react";
import { PlatformShell } from "@/features/platform/PlatformShell";
import { ConfidenceBadge, VerificationBadge } from "@/features/shared/intelligenceBadges";
import { CountPill, PriorityChip, SectionHeader, trendClass } from "@/features/political-intelligence/components/common";
import { repository } from "@/lib/domain/repositories";
import type { OwnershipRecord, OwnershipStatus, TerritoryAssignment } from "@/lib/domain/types";

const filters = {
  entityType: ["All", "village", "booth", "community", "household", "influencer", "issue", "political_risk", "political_opportunity", "task"],
  owner: ["All", ...repository.owners.map((owner) => owner.fullName)],
  coordinator: ["All", ...repository.owners.map((owner) => owner.fullName)],
  village: ["All", ...repository.villages.map((village) => village.name)],
  booth: ["All", ...repository.booths.map((booth) => booth.boothNumber)],
  status: ["All", "assigned", "unassigned", "overdue_review", "escalated", "inactive_owner", "pending_approval"]
};

type FilterKey = keyof typeof filters;
type FilterState = Record<FilterKey, string>;

const defaultFilters: FilterState = {
  entityType: "All",
  owner: "All",
  coordinator: "All",
  village: "All",
  booth: "All",
  status: "All"
};

export function OwnershipRegistryDashboard() {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState(defaultFilters);

  const filteredRecords = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return repository.ownershipRecords.filter((record) => {
      const searchable = JSON.stringify({
        ...record,
        primaryOwner: ownerName(record.primaryOwnerId),
        coordinator: ownerName(record.coordinatorId),
        village: villageName(record.villageId),
        booth: boothName(record.boothId)
      }).toLowerCase();

      if (activeFilters.entityType !== "All" && record.entityType !== activeFilters.entityType) return false;
      if (activeFilters.owner !== "All" && ownerName(record.primaryOwnerId) !== activeFilters.owner) return false;
      if (activeFilters.coordinator !== "All" && ownerName(record.coordinatorId) !== activeFilters.coordinator) return false;
      if (activeFilters.village !== "All" && villageName(record.villageId) !== activeFilters.village) return false;
      if (activeFilters.booth !== "All" && boothName(record.boothId) !== activeFilters.booth) return false;
      if (activeFilters.status !== "All" && record.ownershipStatus !== activeFilters.status) return false;
      return !normalized || searchable.includes(normalized);
    });
  }, [activeFilters, query]);

  function updateFilter(key: FilterKey, value: string) {
    setActiveFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <PlatformShell activeCoreModule="political-intelligence" activePoliticalSection="command-center">
      <header className="candidate-header ownership-header">
        <div>
          <span className="eyebrow">Core Operations / Accountability Engine</span>
          <h1>Ownership Registry</h1>
          <p>Accountability, territory ownership, responsibility assignment, escalation, and campaign command structure.</p>
        </div>
        <div className="header-tools">
          <label className="global-search">
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search owner, entity, village, booth, team, status" />
          </label>
          <div className="manager-header-actions">
            <a className="action-btn" href="/ownership-registry/list">List View</a>
            <a className="action-btn" href="/ownership-registry/new">New Ownership</a>
          </div>
        </div>
      </header>

      <section className="voter-filter-rail ownership-filter-rail" aria-label="Ownership registry filters">
        {Object.entries(filters).map(([key, options]) => (
          <label key={key}>
            <span>{labelize(key)}</span>
            <select value={activeFilters[key as FilterKey]} onChange={(event) => updateFilter(key as FilterKey, event.target.value)}>
              {options.map((option) => <option value={option} key={option}>{option}</option>)}
            </select>
          </label>
        ))}
      </section>

      <main className="ownership-workspace">
        <div className="ownership-main">
          <OwnershipOverview />
          <OwnershipCommandCenter records={filteredRecords} />
          <div className="workspace-grid two-column">
            <CampaignOrganizationStructure />
            <TerritoryOwnership />
          </div>
          <UnassignedRecords />
          <OwnerPerformance />
          <div className="workspace-grid two-column">
            <EscalationMatrix />
            <OwnershipHistory />
          </div>
          <div className="workspace-grid two-column">
            <ReviewCadence />
            <AiOwnershipRecommendations />
          </div>
        </div>

        <OwnershipSidePanel />
      </main>
    </PlatformShell>
  );
}

function OwnershipOverview() {
  const total = repository.ownershipRecords.length;
  const unassigned = repository.ownershipRecords.filter((record) => record.ownershipStatus === "unassigned").length;
  const overdue = repository.ownershipRecords.filter((record) => record.ownershipStatus === "overdue_review").length;
  const escalated = repository.ownershipRecords.filter((record) => record.ownershipStatus === "escalated").length;
  const activeOwners = repository.owners.filter((owner) => owner.status === "active").length;
  const inactiveOwners = repository.owners.filter((owner) => owner.status !== "active").length;
  const coverage = Math.round(repository.ownershipRecords.reduce((sum, record) => sum + record.coverageScore, 0) / total);
  const metrics = [
    ["Total Owned Records", total, "Up", "+12%"],
    ["Unassigned Records", unassigned, "Down", "-4%"],
    ["Overdue Reviews", overdue, "Down", "-2%"],
    ["Escalated Records", escalated, "Stable", "0%"],
    ["Active Owners", activeOwners, "Up", "+8%"],
    ["Inactive Owners", inactiveOwners, "Stable", "0%"],
    ["Coverage %", `${coverage}%`, "Up", "+6%"]
  ] as const;

  return (
    <section className="overview-bar ownership-overview-bar" id="ownership-overview">
      {metrics.map(([label, value, trend, change]) => (
        <article className="metric-cell" key={label}>
          <div className="metric-label">{label}</div>
          <div className="metric-value-row">
            <strong>{value}</strong>
            <span className={`trend-chip ${trendClass(trend)}`}>{trend}</span>
          </div>
          <div className="metric-meta"><span>{change}</span><span>Trend</span></div>
        </article>
      ))}
    </section>
  );
}

function OwnershipCommandCenter({ records }: { records: OwnershipRecord[] }) {
  return (
    <section className="panel table-panel" id="ownership-command-center">
      <SectionHeader title="Ownership Command Center" eyebrow="Who is responsible for every record in PICOS?" actions={<CountPill>{records.length} records</CountPill>} />
      <div className="table-scroll">
        <table>
          <thead>
            <tr>{["Entity Type", "Entity Name", "Primary Owner", "Coordinator", "Volunteer Team", "Reporting Manager", "Escalation Owner", "Status", "Review Date", "Priority", "Actions"].map((column) => <th key={column}>{column}</th>)}</tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.entityType}</td>
                <td><strong>{record.entityName}</strong></td>
                <td>{ownerName(record.primaryOwnerId)}</td>
                <td>{ownerName(record.coordinatorId)}</td>
                <td>{teamName(record.volunteerTeamId)}</td>
                <td>{ownerName(record.reportingManagerId)}</td>
                <td>{ownerName(record.escalationOwnerId)}</td>
                <td><span className={`table-status status-${record.ownershipStatus.replace(/_/g, "-")}`}>{record.ownershipStatus}</span></td>
                <td>{record.nextReviewDate}</td>
                <td><PriorityChip value={record.priority} /></td>
                <td>
                  <div className="row-actions">
                    <a href={`/ownership-registry/${record.id}`}>View</a>
                    <a href={`/ownership-registry/${record.id}/edit`}>Edit</a>
                    <a href={`/tasks/new?relatedEntityType=ownership_record&relatedEntityId=${record.id}`}>Task</a>
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

function CampaignOrganizationStructure() {
  const rows = [
    ["Candidate", "Uday Sangle", "Strategic accountability"],
    ["Campaign Manager", ownerName("owner-campaign-manager"), "Approval and escalation"],
    ["War Room", ownerName("owner-war-room-lead"), "Daily command"],
    ["Zone Leads", "North Zone Lead", "Territory supervision"],
    ["Sector Leads", "Pangri Sector Coordinator", "Sector execution"],
    ["Village Coordinators", "Musalgaon Village Coordinator", "Village ownership"],
    ["Booth Coordinators", "Sinnar Town Booth Coordinator", "Booth readiness"],
    ["Volunteers", "Field and community teams", "Execution and follow-up"]
  ];
  return (
    <section className="panel" id="campaign-organization-structure">
      <SectionHeader title="Campaign Organization Structure" eyebrow="Candidate to volunteer accountability hierarchy" />
      <div className="ownership-org-tree">
        {rows.map(([level, name, scope], index) => (
          <article className="ownership-org-node" key={level}>
            <span>{String(index + 1).padStart(2, "0")} / {level}</span>
            <strong>{name}</strong>
            <small>{scope}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function TerritoryOwnership() {
  return (
    <section className="panel geo-panel" id="territory-ownership">
      <SectionHeader title="Territory Ownership" eyebrow="Zone, sector, village, booth, owner, coverage, status heat map" />
      <div className="map-stage ownership-map-stage">
        <svg className="constituency-map" viewBox="0 0 100 100">
          <path d="M16,18 L48,9 L76,16 L91,39 L83,72 L61,91 L31,86 L10,62 L7,35 Z" />
          <path d="M29,22 L52,18 L73,28 L77,50 L65,68 L43,75 L25,61 L19,40 Z" />
          <path d="M50,12 L51,89" />
          <path d="M13,58 L88,40" />
        </svg>
        {repository.territoryAssignments.map((territory) => (
          <a className={`ownership-map-marker ownership-${territory.status.replace(/_/g, "-")}`} href={`/territories/${territory.id}`} key={territory.id} style={{ left: `${territory.heatX}%`, top: `${territory.heatY}%` }}>
            <span>{villageName(territory.villageId)}</span>
          </a>
        ))}
      </div>
      <div className="territory-list">
        {repository.territoryAssignments.map((territory) => <TerritoryRow key={territory.id} territory={territory} />)}
      </div>
    </section>
  );
}

function TerritoryRow({ territory }: { territory: TerritoryAssignment }) {
  return (
    <article className="context-row">
      <strong>{territory.zone} / {territory.sector}</strong>
      <span>{villageName(territory.villageId)} / {ownerName(territory.assignedOwnerId)} / coverage {territory.coverage}% / {territory.status}</span>
    </article>
  );
}

function UnassignedRecords() {
  const records = repository.ownershipRecords.filter((record) => record.ownershipStatus === "unassigned" || !record.primaryOwnerId);
  return (
    <section className="panel" id="unassigned-records">
      <SectionHeader title="Unassigned Records" eyebrow="Villages, booths, issues, risks, influencers, households, and tasks without accountable owners" actions={<CountPill>{records.length} gaps</CountPill>} />
      <div className="ownership-card-grid">
        {records.map((record) => (
          <article className="ownership-gap-card" key={record.id}>
            <div className="recommendation-top">
              <span>{record.entityType}</span>
              <PriorityChip value={record.priority} />
            </div>
            <h3>{record.entityName}</h3>
            <p>Escalation owner: {ownerName(record.escalationOwnerId)}</p>
            <div className="row-actions">
              <a href={`/ownership-registry/${record.id}/edit`}>Assign</a>
              <a href={`/escalations/new?from=${record.id}`}>Escalate</a>
              <a href={`/ownership-registry/${record.id}`}>Review</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function OwnerPerformance() {
  return (
    <section className="panel table-panel" id="owner-performance">
      <SectionHeader title="Owner Performance" eyebrow="Assigned records, completed actions, open actions, overdue actions, coverage, performance" />
      <div className="table-scroll">
        <table>
          <thead><tr>{["Owner", "Assigned", "Completed", "Open", "Overdue", "Coverage", "Performance", "Status"].map((column) => <th key={column}>{column}</th>)}</tr></thead>
          <tbody>
            {repository.owners.map((owner) => (
              <tr key={owner.id}>
                <td><strong>{owner.fullName}</strong><p className="table-description">{owner.role}</p></td>
                <td>{owner.assignedRecordCount}</td>
                <td>{owner.completedActions}</td>
                <td>{owner.openActions}</td>
                <td>{owner.overdueActions}</td>
                <td>{owner.coverageScore}%</td>
                <td>{owner.performanceScore}%</td>
                <td><span className={`table-status status-${owner.status.replace(/_/g, "-")}`}>{owner.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function EscalationMatrix() {
  return (
    <section className="panel table-panel" id="escalation-matrix">
      <SectionHeader title="Escalation Matrix" eyebrow="Entity, current owner, escalation owner, days overdue, severity, status" />
      <div className="table-scroll">
        <table>
          <thead><tr>{["Entity", "Current Owner", "Escalation Owner", "Days Overdue", "Severity", "Status"].map((column) => <th key={column}>{column}</th>)}</tr></thead>
          <tbody>
            {repository.escalationChains.map((item) => (
              <tr key={item.id}>
                <td><strong>{item.entityName}</strong><p className="table-description">{item.nextAction}</p></td>
                <td>{ownerName(item.currentOwnerId)}</td>
                <td>{ownerName(item.escalationOwnerId)}</td>
                <td>{item.daysOverdue}</td>
                <td><PriorityChip value={item.severity} /></td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function OwnershipHistory() {
  return (
    <section className="panel table-panel" id="ownership-history">
      <SectionHeader title="Ownership History" eyebrow="Previous owner, new owner, date, reason, approved by" />
      <div className="table-scroll">
        <table>
          <thead><tr>{["Record", "Previous Owner", "New Owner", "Date", "Reason", "Approved By"].map((column) => <th key={column}>{column}</th>)}</tr></thead>
          <tbody>
            {repository.ownershipHistory.map((item) => (
              <tr key={item.id}>
                <td>{ownershipTitle(item.ownershipRecordId)}</td>
                <td>{ownerName(item.previousOwnerId)}</td>
                <td>{ownerName(item.newOwnerId)}</td>
                <td>{item.changedDate}</td>
                <td>{item.reason}</td>
                <td>{ownerName(item.approvedBy)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ReviewCadence() {
  return (
    <section className="panel" id="review-cadence">
      <SectionHeader title="Review Cadence" eyebrow="Daily, weekly, monthly, election-mode schedules" />
      <div className="ownership-card-grid">
        {repository.reviewSchedules.map((schedule) => (
          <article className="ownership-gap-card" key={schedule.id}>
            <div className="recommendation-top">
              <span>{schedule.cadence}</span>
              <span className={`table-status status-${schedule.status.replace(/_/g, "-")}`}>{schedule.status}</span>
            </div>
            <h3>{schedule.name}</h3>
            <p>{schedule.entityType} / owner: {ownerName(schedule.ownerId)}</p>
            <small>Next run: {schedule.nextRun}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function AiOwnershipRecommendations() {
  const recommendations = [
    ["Assign Devpur household cluster before the next village review.", "Unassigned high-influence household cluster creates follow-up leakage.", "high"],
    ["Relieve Musalgaon coordinator with a secondary cooperative bridge owner.", "Current owner is overloaded and record is escalated.", "critical"],
    ["Approve Pangri irrigation ownership after evidence packet is attached.", "Issue has high vote impact and pending review status.", "high"],
    ["Move final 72-hour booth reviews to election-mode cadence.", "Booth ownership should tighten before campaign acceleration.", "medium"]
  ] as const;
  return (
    <section className="panel recommendations-panel" id="ai-ownership-recommendations">
      <SectionHeader title="AI Ownership Recommendations" eyebrow="Unowned records, overloaded coordinators, coverage gaps, escalation risks" />
      <div className="recommendation-list">
        {recommendations.map(([title, reason, priority]) => (
          <article className={`recommendation-card level-${priority}`} key={title}>
            <div className="recommendation-top">
              <PriorityChip value={priority} />
              <a className="action-btn" href={`/tasks/new?title=${encodeURIComponent(title)}`}>Create Task</a>
            </div>
            <h3>{title}</h3>
            <p>{reason}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function OwnershipSidePanel() {
  const escalated = repository.ownershipRecords.filter((record) => record.ownershipStatus === "escalated");
  const overdue = repository.ownershipRecords.filter((record) => record.ownershipStatus === "overdue_review");
  const unassigned = repository.ownershipRecords.filter((record) => record.ownershipStatus === "unassigned");
  return (
    <aside className="voter-intel-panel ownership-intel-panel">
      <SectionHeader title="Ownership Watch" eyebrow="Accountability status" />
      <PanelList title="Escalated Records" items={escalated.map((record) => `${record.entityName}: ${ownerName(record.escalationOwnerId)}`)} />
      <PanelList title="Overdue Reviews" items={overdue.map((record) => `${record.entityName}: review due ${record.nextReviewDate}`)} />
      <PanelList title="Unassigned Records" items={unassigned.map((record) => `${record.entityType}: ${record.entityName}`)} />
      <PanelList title="Overloaded Owners" items={repository.owners.filter((owner) => owner.status === "overloaded").map((owner) => `${owner.fullName}: ${owner.overdueActions} overdue`)} />
      <section className="context-card">
        <h3>Verification State</h3>
        <div className="badge-row">
          <VerificationBadge status="needs_verification" />
          <ConfidenceBadge score={58} />
        </div>
        <p>Ownership data is mock operational intelligence. Verify owners before field use.</p>
      </section>
    </aside>
  );
}

function PanelList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="context-card">
      <h3>{title}</h3>
      <div className="context-list">
        {items.length ? items.map((item) => <article className="context-row" key={item}>{item}</article>) : <article className="context-row">No records in this category.</article>}
      </div>
    </section>
  );
}

function ownerName(id: string) {
  return repository.owners.find((owner) => owner.id === id)?.fullName ?? (id ? id : "Unassigned");
}

function teamName(id: string) {
  return repository.teams.find((team) => team.id === id)?.name ?? (id ? id : "Unassigned");
}

function villageName(id: string) {
  return repository.villages.find((village) => village.id === id)?.name ?? (id ? id : "Not linked");
}

function boothName(id: string) {
  return repository.booths.find((booth) => booth.id === id)?.boothNumber ?? (id ? id : "Not linked");
}

function ownershipTitle(id: string) {
  return repository.ownershipRecords.find((record) => record.id === id)?.entityName ?? id;
}

function labelize(value: string) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}
