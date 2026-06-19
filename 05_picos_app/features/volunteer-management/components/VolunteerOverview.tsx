"use client";

import {
  AlertTriangle,
  ArrowRight,
  ClipboardCheck,
  Gauge,
  MapPinCheck,
  Network,
  ShieldAlert,
  UserPlus,
  Users
} from "lucide-react";
import type { ReactNode } from "react";
import { SectionHeader } from "@/features/political-intelligence/components/common";
import { volunteerCoverage, volunteerIntelligenceFeed, volunteerRecentReports } from "../overviewData";
import type { Volunteer } from "../types";

type VolunteerOverviewProps = {
  volunteers: Volunteer[];
  avgCapacity: number;
  onPlaceholder: (message: string) => void;
};

const routes = {
  directory: "/volunteer-management/directory",
  workload: "/volunteer-management/workload",
  command: "/volunteer-management/command-structure",
  reports: "/volunteer-management/reports",
  performance: "/volunteer-management/performance",
  coverage: "/campaign-structure/coverage-map",
  warRoom: "/war-room-dashboard"
} as const;

export function VolunteerOverview({ volunteers, avgCapacity, onPlaceholder }: VolunteerOverviewProps) {
  const activeVolunteers = volunteers.filter((volunteer) => volunteer.status === "Active" || volunteer.status === "On Ground").length;
  const newVolunteers = volunteers.filter((volunteer) => volunteer.status === "New").length;
  const overdueTasks = volunteers.reduce((sum, volunteer) => sum + volunteer.overdueTasks, 0);
  const criticalReports = volunteerIntelligenceFeed.filter((entry) => entry.priority === "Critical").length;
  const coverageScore = Math.round((volunteerCoverage.coveredBooths / volunteerCoverage.totalBooths) * 100);
  const topVolunteer = [...volunteers].sort((a, b) => b.performanceScore - a.performanceScore)[0];
  const topCoordinator = [...volunteers]
    .filter((volunteer) => volunteer.role.includes("Coordinator") || volunteer.role === "Campaign Manager")
    .sort((a, b) => b.performanceScore - a.performanceScore)[0];
  const mostActive = [...volunteers].sort((a, b) => (b.doorVisits + b.callsMade) - (a.doorVisits + a.callsMade))[0];

  return (
    <section className="volunteer-command-center">
      <section className="volunteer-attention-hero" aria-labelledby="attention-required-title">
        <div className="volunteer-attention-heading">
          <div>
            <h2 id="attention-required-title">Attention Required</h2>
            <p>Resolve the highest-risk gaps affecting today&apos;s field operation.</p>
          </div>
          <a className="action-btn action-btn-primary" href={routes.warRoom}>Open Action Queue <ArrowRight size={15} /></a>
        </div>
        <div className="volunteer-executive-alerts">
          <ExecutiveAlert href={routes.workload} icon={<ClipboardCheck size={17} />} label="Overdue tasks" value={overdueTasks} action="Review deadlines" tone="critical" />
          <ExecutiveAlert href={routes.coverage} icon={<MapPinCheck size={17} />} label="Uncovered booths" value={volunteerCoverage.uncoveredBooths} action="Assign coverage" tone="critical" />
          <ExecutiveAlert href={`${routes.directory}?status=New`} icon={<UserPlus size={17} />} label="Awaiting approval" value={newVolunteers} action="Review onboarding" tone="warning" />
          <ExecutiveAlert href={routes.reports} icon={<ShieldAlert size={17} />} label="Critical reports" value={criticalReports} action="Verify intelligence" tone="warning" />
          <ExecutiveAlert href={routes.coverage} icon={<Users size={17} />} label="Volunteer shortages" value={volunteerCoverage.weakBooths} action="Rebalance teams" tone="warning" />
        </div>
      </section>

      <CommandSection title="Volunteer Operations Hub">
        <div className="volunteer-primary-nav">
          <PrimaryNavigationCard href={routes.directory} icon={<Users size={21} />} title="Volunteer Directory" description="Find, review and manage the campaign field force." action="Open Directory" />
          <PrimaryNavigationCard href={routes.workload} icon={<Gauge size={21} />} title="Field Workload" description="Balance assignments, deadlines and volunteer capacity." action="Open Workload" />
          <PrimaryNavigationCard href={routes.command} icon={<Network size={21} />} title="Command Structure" description="Follow reporting lines from leadership to booth teams." action="Open Structure" />
        </div>
      </CommandSection>

      <CommandSection title="Operational Health">
        <div className="volunteer-health-strip">
          <HealthMetric href={routes.directory} label="Total Volunteers" value={volunteers.length} detail="Field force records" />
          <HealthMetric href={`${routes.directory}?status=Active`} label="Active Volunteers" value={activeVolunteers} detail="Active or on ground" />
          <HealthMetric href={routes.coverage} label="Coverage Score" value={`${coverageScore}%`} detail={`${volunteerCoverage.coveredBooths} booths covered`} tone="healthy" />
          <HealthMetric href={routes.workload} label="Average Workload" value={`${avgCapacity}%`} detail="Across the field force" tone={avgCapacity > 80 ? "warning" : "neutral"} />
        </div>
      </CommandSection>

      <CommandSection title="Field Intelligence" actions={<a className="action-btn" href={routes.reports}>View All Reports</a>}>
        <div className="volunteer-report-feed">
          {volunteerRecentReports.slice(0, 5).map((report) => (
            <article className="volunteer-report-row" key={report.id}>
              <span className={`volunteer-report-marker is-${report.status.toLowerCase()}`} aria-hidden="true" />
              <div className="volunteer-report-main">
                <strong>{report.reportType}</strong>
                <small>{report.volunteer} / {report.village}</small>
              </div>
              <time>{report.date}</time>
              <span className={`volunteer-feed-status is-${report.status.toLowerCase()}`}>{report.status}</span>
              <button type="button" onClick={() => onPlaceholder(`${report.reportType} opened for review`)}>Review <ArrowRight size={14} /></button>
            </article>
          ))}
        </div>
      </CommandSection>

      <CommandSection title="Performance Snapshot" actions={<a className="action-btn" href={routes.performance}>View Performance</a>}>
        <div className="volunteer-performance-highlights">
          <PerformanceHighlight href={routes.performance} label="Top Volunteer" value={topVolunteer?.name ?? "No data"} detail={`${topVolunteer?.performanceScore ?? 0}% overall score`} />
          <PerformanceHighlight href={routes.performance} label="Top Coordinator" value={topCoordinator?.name ?? "No data"} detail={`${topCoordinator?.reportQualityScore ?? 0}% report quality`} />
          <PerformanceHighlight href={routes.performance} label="Most Active Booth" value={mostActive?.booth ?? "No data"} detail={`${mostActive?.village ?? "No village"} / ${mostActive?.name ?? "Unassigned"}`} />
        </div>
      </CommandSection>
    </section>
  );
}

function CommandSection({ title, actions, children }: { title: string; actions?: ReactNode; children: ReactNode }) {
  return <section className="volunteer-command-band"><SectionHeader title={title} actions={actions} />{children}</section>;
}

function ExecutiveAlert({ href, icon, label, value, action, tone }: { href: string; icon: ReactNode; label: string; value: number; action: string; tone: "critical" | "warning" }) {
  return <a className={`volunteer-executive-alert is-${tone}`} href={href}><span>{icon}</span><div><strong>{label}</strong><small>{action}</small></div><b>{value}</b></a>;
}

function PrimaryNavigationCard({ href, icon, title, description, action }: { href: string; icon: ReactNode; title: string; description: string; action: string }) {
  return <a className="volunteer-primary-nav-card" href={href}><span>{icon}</span><div><h3>{title}</h3><p>{description}</p></div><b>{action} <ArrowRight size={15} /></b></a>;
}

function HealthMetric({ href, label, value, detail, tone = "neutral" }: { href: string; label: string; value: string | number; detail: string; tone?: "neutral" | "healthy" | "warning" }) {
  return <a className={`volunteer-health-metric is-${tone}`} href={href}><span>{label}</span><strong>{value}</strong><small>{detail}</small></a>;
}

function PerformanceHighlight({ href, label, value, detail }: { href: string; label: string; value: string; detail: string }) {
  return <a className="volunteer-performance-highlight" href={href}><span>{label}</span><strong>{value}</strong><small>{detail}</small><ArrowRight size={15} /></a>;
}
