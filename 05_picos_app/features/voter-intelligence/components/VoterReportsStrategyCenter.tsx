"use client";

import { useMemo, useState } from "react";
import { PlatformShell } from "@/features/platform/PlatformShell";
import { ConfidenceBadge } from "@/features/shared/intelligenceBadges";
import { CountPill, EmptyState, PriorityChip, SectionHeader, signed, trendClass } from "@/features/political-intelligence/components/common";
import { voterReportsData } from "../reports-data";
import type { AiStrategyReport, ElectionReadinessMetric, Priority, ReportFilters, ReportLibraryItem, ReportTemplate, VoterWinProbabilityReport } from "../types";

const defaultFilters: ReportFilters = {
  reportType: "All",
  village: "All",
  community: "All",
  dateRange: "30 Days",
  status: "All",
  priority: "All",
  recipient: "All"
};

const filterOptions: Record<keyof ReportFilters, string[]> = {
  reportType: ["All", "Daily Reports", "Weekly Reports", "Monthly Reports", "Community Reports", "Village Reports", "Household Reports", "Influencer Reports", "Turnout Reports", "Persuasion Reports", "Election Readiness Reports"],
  village: ["All", "Sinnar Town", "Pangri", "Musalgaon", "Dubere", "Devpur", "Wavi"],
  community: ["All", "Youth", "Women", "Farmers", "Maratha", "Mali", "Vanjari", "Dhangar", "SC", "Business", "Cooperative Members"],
  dateRange: ["Today", "7 Days", "30 Days", "Quarter", "Election Period"],
  status: ["All", "Generated", "Scheduled", "Pending", "Draft", "Published"],
  priority: ["All", "Critical", "High", "Medium", "Low"],
  recipient: ["All", "Candidate", "Campaign Manager", "Booth Coordinators", "Volunteers", "Community Teams"]
};

export function VoterReportsStrategyCenter() {
  const data = voterReportsData;
  const [filters, setFilters] = useState(defaultFilters);
  const [query, setQuery] = useState("");
  const [selectedReportId, setSelectedReportId] = useState(data.library[0].id);
  const [selectedSections, setSelectedSections] = useState(data.builder.sections.slice(0, 6));
  const [queuedActions, setQueuedActions] = useState<string[]>([]);

  const filteredLibrary = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return data.library.filter((report) => {
      const searchable = JSON.stringify(report).toLowerCase();
      if (filters.reportType !== "All" && report.type !== filters.reportType) return false;
      if (filters.status !== "All" && report.status !== filters.status) return false;
      if (filters.priority !== "All" && report.priority !== filters.priority) return false;
      if (filters.recipient !== "All" && report.consumer !== filters.recipient) return false;
      if (filters.village !== "All" && !searchable.includes(filters.village.toLowerCase())) return false;
      if (filters.community !== "All" && !searchable.includes(filters.community.toLowerCase())) return false;
      return !normalized || searchable.includes(normalized);
    });
  }, [data.library, filters, query]);

  const selectedReport = filteredLibrary.find((report) => report.id === selectedReportId) ?? filteredLibrary[0] ?? data.library[0];

  function updateFilter(key: keyof ReportFilters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function toggleSection(section: string) {
    setSelectedSections((current) => current.includes(section) ? current.filter((item) => item !== section) : [...current, section]);
  }

  function queueAction(action: string) {
    setQueuedActions((current) => current.includes(action) ? current : [...current, action]);
  }

  return (
    <PlatformShell activeCoreModule="voter-intelligence" activeModuleSection="voter-reports">
      <header className="candidate-header voter-header">
        <div>
          <span className="eyebrow">Voter Intelligence / Reports & Strategy</span>
          <h1>Voter Reports & Strategy Center</h1>
          <p>Operational, strategic, executive, and election-readiness reporting for Uday Sangle's Sinnar campaign.</p>
        </div>
        <label className="global-search">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search report, village, community, issue, influencer, household, campaign" />
        </label>
      </header>

      <section className="voter-filter-rail" aria-label="Voter report filters">
        {Object.entries(filterOptions).map(([key, options]) => {
          const filterKey = key as keyof ReportFilters;
          return (
            <label key={key}>
              <span>{labelize(key)}</span>
              <select value={filters[filterKey]} onChange={(event) => updateFilter(filterKey, event.target.value)}>
                {options.map((option) => <option value={option} key={option}>{option}</option>)}
              </select>
            </label>
          );
        })}
      </section>

      <main className="voter-workspace reports-workspace">
        <div className="voter-main">
          <ReportsPriorityCommand />
          <ReportOverview />
          <ReportLibrary reports={filteredLibrary} selectedReport={selectedReport} onSelect={setSelectedReportId} />
          <DailyVoterBrief />
          <WeeklyStrategyReport />
          <div className="workspace-grid two-column">
            <TemplateGrid id="community-reports" title="Community Reports" eyebrow="Generate Maratha, Mali, Vanjari, Dhangar, women, youth, farmer, and custom reports" items={data.communityReports} />
            <TemplateGrid id="village-reports" title="Village Reports" eyebrow="Generate village summary, intelligence, risks, opportunities, influencers, support, and visit recommendations" items={data.villageReports} />
          </div>
          <div className="workspace-grid two-column">
            <TemplateGrid id="household-reports" title="Household Reports" eyebrow="High influence, persuadable, at-risk, and mobilization household reports" items={data.householdReports} />
            <TemplateGrid id="influencer-reports" title="Influencer Reports" eyebrow="Directory, reach, risk, opportunity, relationship, and engagement reports" items={data.influencerReports} />
          </div>
          <div className="workspace-grid two-column">
            <TemplateGrid id="turnout-reports" title="Turnout Reports" eyebrow="Turnout risk, booth mobilization, community turnout, election-day, transport, and volunteer readiness" items={data.turnoutReports} />
            <TemplateGrid id="persuasion-reports" title="Persuasion Reports" eyebrow="Conversion opportunities, expected vote gain, high priority targets, and campaign recommendations" items={data.persuasionReports} />
          </div>
          <TemplateGrid id="support-reports" title="Support Reports" eyebrow="Support summary, trends, risks, opportunities, and win probability" items={data.supportReports} />
          <ElectionReadinessReport items={data.readiness} />
          <WinProbabilityReport items={data.winProbability} />
          <ReportBuilder selectedSections={selectedSections} onToggleSection={toggleSection} onQueue={queueAction} />
          <ExecutiveBriefing />
          <AiStrategyReports queuedActions={queuedActions} onQueue={queueAction} />
          <ReportScheduler />
          <ExportCenter />
          <ActionCenter queuedActions={queuedActions} onQueue={queueAction} />
        </div>

      </main>
    </PlatformShell>
  );
}

function ReportsPriorityCommand() {
  const candidateAction = voterReportsData.executiveBriefing[voterReportsData.executiveBriefing.length - 1];
  const criticalFinding = voterReportsData.rightPanel.criticalFindings[1];
  const pendingReport = voterReportsData.library.find((report) => report.status === "Pending" && report.priority === "Critical") ?? voterReportsData.library[0];
  const weakestReadiness = [...voterReportsData.readiness].sort((a, b) => a.score - b.score)[0];

  return (
    <section className="command-priority-grid voter-priority-grid reports-priority-grid">
      <article className="priority-hero political-risk">
        <span className="eyebrow">Candidate Action Now</span>
        <h2>{candidateAction.candidateAction}</h2>
        <strong>NOW</strong>
        <p>{candidateAction.answer}</p>
      </article>
      <article className="priority-hero community-sentiment">
        <span className="eyebrow">Critical Finding</span>
        <strong>14.8K</strong>
        <p>{criticalFinding}</p>
      </article>
      <article className="priority-hero opponent-movement">
        <span className="eyebrow">Pending Report</span>
        <h2>{pendingReport.title}</h2>
        <PriorityChip value={pendingReport.priority} />
        <p>{pendingReport.summary}</p>
      </article>
      <article className="priority-hero election-readiness">
        <span className="eyebrow">Weakest Readiness</span>
        <strong>{weakestReadiness.score}%</strong>
        <p>{weakestReadiness.area}: {weakestReadiness.action}</p>
      </article>
      <article className="priority-hero ai-recommendation">
        <span className="eyebrow">AI Strategy Report</span>
        <h2>{voterReportsData.aiStrategyReports[0].recommendation}</h2>
        <p>{voterReportsData.aiStrategyReports[0].expectedVoteImpact.toLocaleString()} expected vote impact.</p>
      </article>
    </section>
  );
}

function ReportOverview() {
  return (
    <section className="overview-bar" id="report-overview">
      {voterReportsData.overview.map((metric) => (
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

function ReportLibrary({ reports, selectedReport, onSelect }: { reports: ReportLibraryItem[]; selectedReport: ReportLibraryItem; onSelect: (id: string) => void }) {
  return (
    <section className="panel report-library-panel" id="report-library">
      <SectionHeader title="Report Library" eyebrow="Daily, weekly, monthly, community, village, household, influencer, turnout, persuasion, and readiness reports" actions={<CountPill>{reports.length} reports</CountPill>} />
      {reports.length ? (
        <div className="report-library-layout">
          <div className="report-library-list">
            {reports.map((report) => (
              <button className={`report-library-item ${selectedReport.id === report.id ? "is-active" : ""}`} key={report.id} onClick={() => onSelect(report.id)} type="button">
                <span>{report.type}</span>
                <strong>{report.title}</strong>
                <small>{report.lastGenerated} / {report.consumer}</small>
              </button>
            ))}
          </div>
          <article className="report-detail-card">
            <div className="recommendation-top">
              <div className="badge-row">
                <PriorityChip value={selectedReport.priority} />
                <span className={`table-status status-${selectedReport.status.toLowerCase()}`}>{selectedReport.status}</span>
              </div>
              <a className="action-btn" href={`/reports/daily-brief/new?report=${encodeURIComponent(selectedReport.id)}`}>Generate</a>
            </div>
            <span className="eyebrow">{selectedReport.type}</span>
            <h3>{selectedReport.title}</h3>
            <p>{selectedReport.summary}</p>
            <dl className="report-meta-grid">
              <div><dt>Consumer</dt><dd>{selectedReport.consumer}</dd></div>
              <div><dt>Owner</dt><dd>{selectedReport.owner}</dd></div>
              <div><dt>Last Generated</dt><dd>{selectedReport.lastGenerated}</dd></div>
              <div><dt>Source Layer</dt><dd>{selectedReport.sourceLayer}</dd></div>
            </dl>
          </article>
        </div>
      ) : <EmptyState title="No reports match filters" body="Adjust report type, village, community, status, priority, recipient, or search filters." />}
    </section>
  );
}

function DailyVoterBrief() {
  return (
    <section className="panel" id="daily-voter-brief">
      <SectionHeader title="Daily Voter Brief" eyebrow="Support changes, community changes, village changes, influencer changes, risks, opportunities, recommended actions" />
      <div className="brief-section-grid">
        {voterReportsData.dailyBrief.map((item) => (
          <article className={`brief-card ${levelClass(item.priority)}`} key={item.section}>
            <div className="recommendation-top">
              <span>{item.section}</span>
              <div className="badge-row"><PriorityChip value={item.priority} /><ConfidenceBadge score={item.confidence} /></div>
            </div>
            <h3>{item.finding}</h3>
            <p><b>Change:</b> {item.change}</p>
            <p><b>Action:</b> {item.recommendedAction}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function WeeklyStrategyReport() {
  return <SimpleTable id="weekly-strategy-report" title="Weekly Strategy Report" columns={["Metric", "Current", "Movement", "Expected Vote Gain", "Priority Action", "Priority"]} rows={voterReportsData.weeklyStrategy.map((item) => [item.metric, item.current, item.movement, item.expectedVoteGain.toLocaleString(), item.priorityAction, item.priority])} priorityColumn={5} />;
}

function TemplateGrid({ id, title, eyebrow, items }: { id: string; title: string; eyebrow: string; items: ReportTemplate[] }) {
  return (
    <section className="panel" id={id}>
      <SectionHeader title={title} eyebrow={eyebrow} actions={<CountPill>{items.length} templates</CountPill>} />
      <div className="report-template-grid">
        {items.map((item) => (
          <article className="report-template-card" key={item.title}>
            <div className="recommendation-top">
              <strong>{item.title}</strong>
              <PriorityChip value={item.priority} />
            </div>
            <p>{item.scope}</p>
            <small>{item.output}</small>
            <Meter label="Readiness" value={item.readiness} danger={item.readiness < 60} />
            <a className="action-btn" href={`/reports/daily-brief/new?type=${encodeURIComponent(item.title)}`}>{item.actionTrigger}</a>
          </article>
        ))}
      </div>
    </section>
  );
}

function ElectionReadinessReport({ items }: { items: ElectionReadinessMetric[] }) {
  return (
    <section className="panel" id="election-readiness-report">
      <SectionHeader title="Election Readiness Report" eyebrow="Support, turnout, volunteer, booth, influencer, campaign, and overall readiness" />
      <div className="readiness-grid">
        {items.map((item) => (
          <article className={`readiness-card ${levelClass(item.priority)}`} key={item.area}>
            <div className="recommendation-top">
              <strong>{item.area}</strong>
              <span className={`trend-chip ${trendClass(item.trend)}`}>{item.trend}</span>
            </div>
            <Meter label="Readiness Score" value={item.score} danger={item.score < 60} />
            <p>{item.gap}</p>
            <small>{item.action}</small>
            <PriorityChip value={item.priority} />
          </article>
        ))}
      </div>
    </section>
  );
}

function WinProbabilityReport({ items }: { items: VoterWinProbabilityReport[] }) {
  return (
    <section className="panel" id="win-probability-report">
      <SectionHeader title="Win Probability Report" eyebrow="Current, likely, best, worst case, expected margin, vote share, confidence, trend" />
      <div className="forecast-grid report-forecast-grid">
        {items.map((item) => (
          <article className="forecast-card" key={item.scenario}>
            <div className="recommendation-top">
              <span>{item.scenario}</span>
              <span className={`trend-chip ${trendClass(item.trend)}`}>{item.trend}</span>
            </div>
            <strong>{item.probability}%</strong>
            <p>Margin {formatMargin(item.expectedMargin)} / vote share {item.expectedVoteShare}%</p>
            <ConfidenceBadge score={item.confidence} />
          </article>
        ))}
      </div>
    </section>
  );
}

function ReportBuilder({ selectedSections, onToggleSection, onQueue }: { selectedSections: string[]; onToggleSection: (section: string) => void; onQueue: (action: string) => void }) {
  const builder = voterReportsData.builder;
  return (
    <section className="panel" id="report-builder">
      <SectionHeader title="Report Builder" eyebrow="Select sections, communities, villages, booths, date range, and metrics" actions={<CountPill>{selectedSections.length} sections</CountPill>} />
      <div className="report-builder-layout">
        <div className="builder-section-list">
          {builder.sections.map((section) => (
            <button className={`builder-section-toggle ${selectedSections.includes(section) ? "is-active" : ""}`} key={section} onClick={() => onToggleSection(section)} type="button">
              {section}
            </button>
          ))}
        </div>
        <div className="builder-control-grid">
          <label><span>Community</span><select defaultValue="Youth">{builder.communities.map((item) => <option value={item} key={item}>{item}</option>)}</select></label>
          <label><span>Village</span><select defaultValue="Musalgaon">{builder.villages.map((item) => <option value={item} key={item}>{item}</option>)}</select></label>
          <label><span>Booth</span><select defaultValue="Booth 067">{builder.booths.map((item) => <option value={item} key={item}>{item}</option>)}</select></label>
          <label><span>Date Range</span><select defaultValue="30 Days">{builder.dateRanges.map((item) => <option value={item} key={item}>{item}</option>)}</select></label>
          <div className="builder-metric-pills">
            {builder.metrics.map((metric) => <span key={metric}>{metric}</span>)}
          </div>
          <a className="action-panel-btn" href="/reports/daily-brief/new?builder=voter" onClick={() => onQueue("Custom voter strategy report")}>Generate Report</a>
        </div>
      </div>
    </section>
  );
}

function ExecutiveBriefing() {
  return (
    <section className="panel" id="executive-briefing">
      <SectionHeader title="Executive Briefing" eyebrow="Candidate-focused answers for Uday Sangle" />
      <div className="brief-section-grid executive-brief-grid">
        {voterReportsData.executiveBriefing.map((item) => (
          <article className={`brief-card ${levelClass(item.priority)}`} key={item.question}>
            <div className="recommendation-top">
              <span>{item.question}</span>
              <PriorityChip value={item.priority} />
            </div>
            <h3>{item.answer}</h3>
            <p>{item.candidateAction}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AiStrategyReports({ queuedActions, onQueue }: { queuedActions: string[]; onQueue: (action: string) => void }) {
  return (
    <section className="panel recommendations-panel" id="ai-strategy-reports">
      <SectionHeader title="AI Strategy Reports" eyebrow="Community, village, influencer, turnout, persuasion, election, weekly, and monthly action plans" />
      <div className="recommendation-list">
        {voterReportsData.aiStrategyReports.map((item: AiStrategyReport) => (
          <article className={`recommendation-card ${levelClass(item.priority)}`} key={item.title}>
            <div className="recommendation-top">
              <div className="badge-row"><PriorityChip value={item.priority} /><ConfidenceBadge score={item.confidence} /></div>
              <a className="action-btn" href={`/reports/daily-brief/new?type=${encodeURIComponent(item.strategyType)}`} onClick={() => onQueue(item.title)}>{queuedActions.includes(item.title) ? "Queued" : "Generate"}</a>
            </div>
            <span className="eyebrow">{item.strategyType}</span>
            <h3>{item.recommendation}</h3>
            <p><b>Expected vote impact:</b> {item.expectedVoteImpact.toLocaleString()}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ReportScheduler() {
  return <SimpleTable id="report-scheduler" title="Report Scheduler" columns={["Report", "Frequency", "Recipients", "Next Run", "Owner", "Status"]} rows={voterReportsData.scheduler.map((item) => [item.report, item.frequency, item.recipients, item.nextRun, item.owner, item.status])} />;
}

function ExportCenter() {
  return (
    <section className="panel" id="export-center">
      <SectionHeader title="Export Center" eyebrow="PDF, Excel, CSV, print, presentation, and share link outputs" />
      <div className="export-grid">
        {voterReportsData.exportOptions.map((option) => (
          <article className="export-card" key={option.format}>
            <strong>{option.format}</strong>
            <p>{option.bestFor}</p>
            <Meter label="Readiness" value={option.readiness} danger={option.readiness < 65} />
            <small>{option.status}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function ActionCenter({ queuedActions, onQueue }: { queuedActions: string[]; onQueue: (action: string) => void }) {
  return (
    <section className="panel" id="reports-action-center">
      <SectionHeader title="Action Center" eyebrow="Generate voter intelligence reports and strategy outputs" />
      <div className="voter-action-grid">
        {voterReportsData.actions.map((action) => (
          <a className={`action-panel-btn ${levelClass(action.priority)}`} href={action.href} key={action.label} onClick={() => onQueue(action.label)}>
            {queuedActions.includes(action.label) ? "Queued: " : ""}{action.label}
          </a>
        ))}
      </div>
    </section>
  );
}

function SimpleTable({ id, title, columns, rows, priorityColumn }: { id: string; title: string; columns: string[]; rows: Array<Array<string | number>>; priorityColumn?: number }) {
  return (
    <section className="panel table-panel" id={id}>
      <SectionHeader title={title} eyebrow="Decision-ready voter reporting" actions={<CountPill>{rows.length} rows</CountPill>} />
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
      ) : <EmptyState title="No reporting rows match filters" body="Adjust report filters or search to restore this table." />}
    </section>
  );
}

function Meter({ label, value, danger, max = 100 }: { label: string; value: number; danger?: boolean; max?: number }) {
  const width = Math.min((value / max) * 100, 100);
  return (
    <div className="support-row">
      <span>{label}</span>
      <div><i className={danger ? "score-weak" : width > 70 ? "score-strong" : width > 50 ? "score-watch" : "score-weak"} style={{ width: `${width}%` }} /></div>
      <b>{max === 100 ? `${Math.round(width)}%` : value.toLocaleString()}</b>
    </div>
  );
}

function formatMargin(value: number) {
  return value > 0 ? `+${value.toLocaleString()}` : value.toLocaleString();
}

function levelClass(priority: Priority) {
  return `level-${priority.toLowerCase()}`;
}

function labelize(value: string) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}
