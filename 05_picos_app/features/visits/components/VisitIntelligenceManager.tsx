import { EvidenceDrawer } from "@/features/evidence/components/EvidenceDrawer";
import { PlatformShell } from "@/features/platform/PlatformShell";
import { ConfidenceBadge, VerificationBadge } from "@/features/shared/intelligenceBadges";
import { SourceAttachmentPanel } from "@/features/sources/components/SourceAttachmentPanel";
import { findEvidenceFor, findSources, repository } from "@/lib/domain/repositories";
import type { Priority, VerificationStatus } from "@/lib/domain/enums";
import type { ApprovalStatus, VisitFollowUp, VisitRecord, VisitType } from "@/lib/domain/types";
import type { ReactNode } from "react";

const today = "2026-06-12";

const visitTypeOptions: VisitType[] = [
  "candidate_visit",
  "village_visit",
  "booth_visit",
  "household_visit",
  "influencer_meeting",
  "community_meeting",
  "issue_verification",
  "risk_verification",
  "opportunity_validation",
  "volunteer_visit",
  "media_visit",
  "event_followup",
  "other"
];

const visitStatusOptions = ["planned", "scheduled", "in_progress", "completed", "follow_up_required", "escalated", "cancelled", "archived"];
const priorityOptions: Priority[] = ["critical", "high", "medium", "low"];
const verificationOptions: VerificationStatus[] = ["unverified", "needs_verification", "partially_verified", "verified", "disputed", "stale"];
const approvalOptions: ApprovalStatus[] = ["draft", "pending_review", "approved", "rejected", "changes_requested"];

export function VisitDashboardPage() {
  const visits = repository.visitRecords;
  const scheduled = visits.filter((visit) => ["planned", "scheduled", "in_progress"].includes(visit.status));
  const completed = visits.filter((visit) => ["completed", "follow_up_required"].includes(visit.status));
  const followUpVisits = visits.filter((visit) => visit.status === "follow_up_required" || visit.followUpsRequired);
  const escalatedVisits = visits.filter((visit) => visit.status === "escalated");
  const completionRate = Math.round((completed.length / Math.max(visits.length, 1)) * 100);
  const upcomingVisits = scheduled
    .filter((visit) => visit.scheduledDate >= today)
    .sort((a, b) => a.scheduledDate.localeCompare(b.scheduledDate))
    .slice(0, 5);
  const overdueFollowUps = repository.visitFollowUps.filter((followUp) => followUp.dueDate <= today && followUp.status !== "completed");
  const highImpactVisits = [...visits].sort((a, b) => b.expectedVoteImpact - a.expectedVoteImpact).slice(0, 5);

  const supportImproved = visits.filter((visit) => visit.supportAfter > visit.supportBefore).length;
  const sentimentImproved = visits.filter((visit) => visit.sentimentAfter > visit.sentimentBefore).length;
  const risksReduced = visits.filter((visit) => visit.riskAfter < visit.riskBefore).length;
  const opportunitiesCreated = visits.filter((visit) => visit.opportunityAfter > visit.opportunityBefore).length;
  const promisesMade = visits.filter((visit) => visit.promisesMade.trim()).length;

  return (
    <VisitShell activeModuleSection="field-operations">
      <VisitHeader
        eyebrow="Voter Intelligence / Field Operations"
        title="Visit Intelligence Manager"
        description="Village visits, household visits, influencer meetings, booth reviews, issue verification, promises, evidence, follow-ups, and field impact for Uday Sangle in Sinnar."
      />

      <main className="visit-workspace">
        <section className="visit-main">
          <section className="overview-bar visit-overview-bar">
            <Metric label="Total visits" value={visits.length} detail="All field visit records" />
            <Metric label="Scheduled" value={scheduled.length} detail="Planned or active" tone="neutral" />
            <Metric label="Completed" value={completed.length} detail="Completed or follow-up" tone="positive" />
            <Metric label="Follow-up required" value={followUpVisits.length} detail="Needs next action" tone="watch" />
            <Metric label="Escalated" value={escalatedVisits.length} detail="Command attention" tone="critical" />
            <Metric label="Candidate visits" value={visits.filter((visit) => visit.visitType === "candidate_visit").length} detail="Uday-facing visits" tone="watch" />
            <Metric label="Village visits" value={visits.filter((visit) => visit.visitType === "village_visit").length} detail="Village field movement" tone="neutral" />
            <Metric label="Household visits" value={visits.filter((visit) => visit.visitType === "household_visit").length} detail="Household intelligence" tone="neutral" />
            <Metric label="Influencer meetings" value={visits.filter((visit) => visit.visitType === "influencer_meeting").length} detail="Relationship fieldwork" tone="positive" />
            <Metric label="Completion rate" value={`${completionRate}%`} detail="Completed field cycle" tone="positive" />
          </section>

          <VisitFilters />

          <section className="panel">
            <div className="section-header">
              <div>
                <span className="eyebrow">Visit command table</span>
                <h2>Field Movement Control</h2>
              </div>
              <div className="section-actions">
                <a className="action-btn" href="/visits/new">Create Visit</a>
                <a className="action-btn" href="/visits/calendar">Calendar</a>
              </div>
            </div>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Visit Title</th>
                    <th>Visit Type</th>
                    <th>Related Entity</th>
                    <th>Village</th>
                    <th>Owner</th>
                    <th>Scheduled</th>
                    <th>Actual</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Sentiment</th>
                    <th>Support</th>
                    <th>Vote Impact</th>
                    <th>Follow-up</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visits.map((visit) => {
                    const followUps = followUpsForVisit(visit.id);
                    return (
                      <tr key={visit.id}>
                        <td>
                          <strong>{visit.visitTitle}</strong>
                          <p className="table-description">{visit.purpose}</p>
                        </td>
                        <td>{formatLabel(visit.visitType)}</td>
                        <td>{relatedEntityLabel(visit)}</td>
                        <td>{villageName(visit.villageId)}</td>
                        <td>{ownerName(visit.primaryOwnerId)}</td>
                        <td>{visit.scheduledDate}</td>
                        <td>{visit.actualDate || "Pending"}</td>
                        <td><StatusChip value={visit.status} /></td>
                        <td><span className={`priority-chip level-${visit.priority}`}>{visit.priority}</span></td>
                        <td><DeltaChip before={visit.sentimentBefore} after={visit.sentimentAfter} /></td>
                        <td><DeltaChip before={visit.supportBefore} after={visit.supportAfter} /></td>
                        <td><VoteImpact value={visit.expectedVoteImpact} /></td>
                        <td>{followUps.length ? <StatusChip value={followUps[0].status} /> : "None"}</td>
                        <td>
                          <div className="row-actions">
                            <a href={`/visits/${visit.id}`}>View</a>
                            <a href={`/visits/${visit.id}/edit`}>Edit</a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section className="visit-impact-grid">
            <ImpactCard label="Support improved" value={supportImproved} detail="Visits where support score moved up" />
            <ImpactCard label="Sentiment improved" value={sentimentImproved} detail="Field conversations improved mood" />
            <ImpactCard label="Risks reduced" value={risksReduced} detail="Risk score moved down after visit" />
            <ImpactCard label="Opportunities created" value={opportunitiesCreated} detail="Opportunity score moved up" />
            <ImpactCard label="Issues discovered" value={visits.filter((visit) => visit.issuesRaised.trim()).length} detail="Issue intelligence captured" />
            <ImpactCard label="Promises made" value={promisesMade} detail="Promises requiring tracking" />
            <ImpactCard label="Follow-ups pending" value={repository.visitFollowUps.filter((followUp) => followUp.status !== "completed").length} detail="Open follow-up records" />
          </section>

          <section className="workspace-grid three-column">
            <VisitListPanel title="Upcoming Visits" eyebrow="Next 7 days" visits={upcomingVisits} />
            <FollowUpPanel title="Overdue Follow-ups" eyebrow="Action required" followUps={overdueFollowUps} />
            <VisitListPanel title="High Impact Visits" eyebrow="Expected vote impact" visits={highImpactVisits} showImpact />
          </section>

          <section className="panel">
            <div className="section-header">
              <div>
                <span className="eyebrow">AI visit recommendations</span>
                <h2>Field Prioritization Engine</h2>
              </div>
            </div>
            <div className="visit-recommendation-grid">
              <RecommendationCard title="Prioritize candidate farmer review" detail="Pangri has high vote impact and evidence-linked farmer concerns. Complete evidence before Uday Sangle makes commitments." priority="critical" />
              <RecommendationCard title="Close Musalgaon ownership gap" detail="Risk increased after the visit. Assign backup owner today and keep escalation visible until follow-up evidence is attached." priority="critical" />
              <RecommendationCard title="Convert youth listening into action brief" detail="Youth support and opportunity scores improved. A fast brief will turn sentiment into visible campaign credibility." priority="high" />
              <RecommendationCard title="Repeat visits where promises exist" detail="Every promise should become an owner, due date, task, evidence requirement, and report line before public use." priority="high" />
            </div>
          </section>
        </section>
      </main>
    </VisitShell>
  );
}

export function VisitCreatePage() {
  return (
    <VisitShell activeModuleSection="field-operations">
      <VisitHeader
        eyebrow="Voter Intelligence / Field Operations / Create"
        title="Create Visit Record"
        description="Full-page visit intake for field teams, coordinators, war room analysts, and campaign managers."
      />
      <VisitForm mode="new" />
    </VisitShell>
  );
}

export function VisitDetailPage({ id }: { id: string }) {
  const visit = getVisit(id);
  const sources = findSources(visit.sourceIds);
  const evidence = findEvidenceFor("visit_record", visit.id);
  const outcomes = repository.visitOutcomes.filter((outcome) => outcome.visitRecordId === visit.id);
  const participants = repository.visitParticipants.filter((participant) => participant.visitRecordId === visit.id);

  return (
    <VisitShell activeModuleSection="field-operations">
      <VisitHeader eyebrow="Visit dossier" title={visit.visitTitle} description={visit.purpose} />
      <main className="visit-detail-layout">
        <section className="visit-detail-main">
          <section className="panel visit-snapshot">
            <div>
              <span className="eyebrow">{formatLabel(visit.visitType)}</span>
              <h2>{visit.visitTitle}</h2>
              <p>{visit.conversationSummary}</p>
            </div>
            <div className="visit-snapshot-metrics">
              <Metric label="Status" value={formatLabel(visit.status)} detail={visit.priority} tone={visit.priority === "critical" ? "critical" : "watch"} />
              <Metric label="Vote impact" value={visit.expectedVoteImpact} detail="Expected vote movement" tone={visit.expectedVoteImpact >= 0 ? "positive" : "critical"} />
              <Metric label="Confidence" value={`${visit.confidenceScore}%`} detail={visit.verificationStatus.replaceAll("_", " ")} tone="neutral" />
            </div>
          </section>

          <section className="manager-record-grid">
            <FieldCard label="Related entity" value={relatedEntityLabel(visit)} />
            <FieldCard label="Village" value={villageName(visit.villageId)} />
            <FieldCard label="Booth" value={boothName(visit.boothId)} />
            <FieldCard label="Community" value={communityName(visit.communityId)} />
            <FieldCard label="Primary owner" value={ownerName(visit.primaryOwnerId)} />
            <FieldCard label="Coordinator" value={ownerName(visit.coordinatorId)} />
            <FieldCard label="Volunteer team" value={teamName(visit.volunteerTeamId)} />
            <FieldCard label="Escalation owner" value={ownerName(visit.escalationOwnerId)} />
            <FieldCard label="Scheduled" value={`${visit.scheduledDate} ${visit.startTime}`} />
            <FieldCard label="Actual" value={visit.actualDate ? `${visit.actualDate} ${visit.endTime}` : "Pending"} />
            <FieldCard label="Next action due" value={visit.nextActionDueDate} />
            <FieldCard label="Approval" value={visit.approvalStatus.replaceAll("_", " ")} />
          </section>

          <DossierSection title="Participants" items={participants.map((item) => `${item.personName} - ${formatLabel(item.participantType)} - ${item.roleOrAffiliation}`)} />
          <DossierText title="Conversation Summary" body={visit.conversationSummary} />
          <DossierText title="Issues Raised" body={visit.issuesRaised || "No issue notes captured yet."} />
          <DossierText title="Promises Made" body={visit.promisesMade || "No promise recorded yet."} />
          <DossierText title="Follow-ups" body={visit.followUpsRequired || "No follow-up recorded yet."} />

          <section className="panel">
            <div className="section-header">
              <div>
                <span className="eyebrow">Before / after score movement</span>
                <h2>Visit Impact</h2>
              </div>
            </div>
            <div className="visit-score-grid">
              <ScoreMovement label="Sentiment" before={visit.sentimentBefore} after={visit.sentimentAfter} />
              <ScoreMovement label="Support" before={visit.supportBefore} after={visit.supportAfter} />
              <ScoreMovement label="Risk" before={visit.riskBefore} after={visit.riskAfter} invert />
              <ScoreMovement label="Opportunity" before={visit.opportunityBefore} after={visit.opportunityAfter} />
              <ScoreMovement label="Turnout" before={visit.turnoutBefore} after={visit.turnoutAfter} />
            </div>
          </section>

          <section className="workspace-grid two-column">
            <EvidenceDrawer evidence={evidence} sources={sources} />
            <SourceAttachmentPanel sources={sources} />
          </section>

          <section className="panel">
            <div className="section-header">
              <div>
                <span className="eyebrow">Timeline</span>
                <h2>Visit Intelligence Timeline</h2>
              </div>
            </div>
            <div className="visit-timeline">
              {visit.auditTrail.map((event) => (
                <article className="visit-timeline-item" key={event}>
                  <span>{visit.updatedAt.slice(0, 10)}</span>
                  <strong>{event}</strong>
                </article>
              ))}
              {outcomes.map((outcome) => (
                <article className="visit-timeline-item" key={outcome.id}>
                  <span>{outcome.updatedAt.slice(0, 10)}</span>
                  <strong>{formatLabel(outcome.outcomeType)} moved {outcome.delta > 0 ? "+" : ""}{outcome.delta}</strong>
                  <p>{outcome.summary}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="workspace-grid two-column">
            <section className="panel">
              <div className="section-header">
                <div>
                  <span className="eyebrow">AI visit insight</span>
                  <h2>Operational Read</h2>
                </div>
              </div>
              <p className="visit-dossier-copy">{visitInsight(visit)}</p>
            </section>
            <section className="panel">
              <div className="section-header">
                <div>
                  <span className="eyebrow">Audit trail placeholder</span>
                  <h2>Change History</h2>
                </div>
              </div>
              <p className="visit-dossier-copy">
                Created by {visit.createdBy} and last updated by {visit.updatedBy} on {visit.updatedAt.slice(0, 10)}. Full event-level audit logging will appear after persistence is connected.
              </p>
            </section>
          </section>

          <section className="manager-actions-panel">
            <h2>Actions</h2>
            <div className="manager-action-grid">
              <a href={`/visits/${visit.id}/edit`}>Edit</a>
              <a href={`/tasks/new?relatedEntityType=visit_record&relatedEntityId=${visit.id}`}>Create follow-up task</a>
              <a href={`/tasks/new?relatedEntityType=visit_record&relatedEntityId=${visit.id}&type=promise`}>Create promise</a>
              <a href="/evidence/new">Attach evidence</a>
              <a href="/sources/new">Link source</a>
              <a href="/visits/reports">Generate visit report</a>
              <a href="/escalations/new">Escalate</a>
              <a href={`/visits/${visit.id}/edit`}>Mark completed</a>
              <a href={`/visits/${visit.id}/edit`}>Archive</a>
            </div>
          </section>
        </section>
      </main>
    </VisitShell>
  );
}

export function VisitEditPage({ id }: { id: string }) {
  const visit = getVisit(id);
  return (
    <VisitShell activeModuleSection="field-operations">
      <VisitHeader
        eyebrow="Voter Intelligence / Field Operations / Edit"
        title={`Edit ${visit.visitTitle}`}
        description="Preserve audit trail context while updating ownership, scores, evidence, verification, approval, and next action."
      />
      <VisitForm mode="edit" visit={visit} />
    </VisitShell>
  );
}

export function VisitCalendarPage() {
  const visits = repository.visitRecords;
  const calendarDays = Array.from({ length: 35 }, (_, index) => index + 1);
  const visitsByDay = (day: number) => visits.filter((visit) => Number(visit.scheduledDate.slice(-2)) === day);

  return (
    <VisitShell activeModuleSection="visit-calendar">
      <VisitHeader eyebrow="Visit calendar" title="Field Visit Calendar" description="Monthly, weekly, and daily visit planning for candidate visits, village visits, follow-ups, influencer meetings, and household visits." />
      <main className="visit-workspace">
        <section className="visit-main">
          <VisitFilters compact />
          <section className="panel">
            <div className="section-header">
              <div>
                <span className="eyebrow">June 2026</span>
                <h2>Monthly View</h2>
              </div>
              <div className="segmented-control">
                <button className="seg-btn is-active">Monthly</button>
                <button className="seg-btn">Weekly</button>
                <button className="seg-btn">Daily</button>
              </div>
            </div>
            <div className="visit-calendar-grid">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => <strong key={day}>{day}</strong>)}
              {calendarDays.map((day) => (
                <article className="visit-calendar-cell" key={day}>
                  <span>{day}</span>
                  {visitsByDay(day).map((visit) => (
                    <a className={`visit-calendar-event level-${visit.priority}`} href={`/visits/${visit.id}`} key={visit.id}>
                      {visit.visitTitle}
                    </a>
                  ))}
                </article>
              ))}
            </div>
          </section>

          <section className="workspace-grid two-column">
            <VisitListPanel title="Weekly View" eyebrow="Scheduled visits" visits={visits.filter((visit) => ["planned", "scheduled"].includes(visit.status))} />
            <VisitListPanel title="Daily View" eyebrow={today} visits={visits.filter((visit) => visit.scheduledDate === today || visit.nextActionDueDate === today)} />
          </section>
        </section>
      </main>
    </VisitShell>
  );
}

export function VisitFollowUpsPage() {
  const followUps = repository.visitFollowUps;
  const overdue = followUps.filter((followUp) => followUp.dueDate < today && followUp.status !== "completed");
  const dueToday = followUps.filter((followUp) => followUp.dueDate === today && followUp.status !== "completed");
  const dueThisWeek = followUps.filter((followUp) => followUp.dueDate >= today && followUp.dueDate <= "2026-06-19" && followUp.status !== "completed");
  const escalated = followUps.filter((followUp) => followUp.status === "escalated");

  return (
    <VisitShell activeModuleSection="visit-follow-ups">
      <VisitHeader eyebrow="Visit follow-ups" title="Visit Follow-up Manager" description="Track every promise, next action, overdue field commitment, and escalation created by visit intelligence." />
      <main className="visit-workspace">
        <section className="visit-main">
          <section className="overview-bar visit-followup-bar">
            <Metric label="Follow-ups required" value={followUps.length} detail="All visit follow-ups" />
            <Metric label="Overdue" value={overdue.length} detail="Past due date" tone="critical" />
            <Metric label="Due today" value={dueToday.length} detail={today} tone="watch" />
            <Metric label="Due this week" value={dueThisWeek.length} detail="Next 7 days" tone="neutral" />
            <Metric label="Escalated" value={escalated.length} detail="Command review" tone="critical" />
          </section>

          <section className="panel">
            <div className="section-header">
              <div>
                <span className="eyebrow">Follow-up command table</span>
                <h2>Promises and Next Actions</h2>
              </div>
            </div>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Visit</th>
                    <th>Follow-up</th>
                    <th>Owner</th>
                    <th>Due date</th>
                    <th>Status</th>
                    <th>Related entity</th>
                    <th>Priority</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {followUps.map((followUp) => (
                    <tr key={followUp.id}>
                      <td><a href={`/visits/${followUp.visitRecordId}`}>{getVisit(followUp.visitRecordId).visitTitle}</a></td>
                      <td>
                        <strong>{followUp.title}</strong>
                        <p className="table-description">{followUp.actionRequired}</p>
                      </td>
                      <td>{ownerName(followUp.ownerId)}</td>
                      <td>{followUp.dueDate}</td>
                      <td><StatusChip value={followUp.status} /></td>
                      <td>{followUp.relatedEntityType} / {followUp.relatedEntityId}</td>
                      <td><span className={`priority-chip level-${followUp.priority}`}>{followUp.priority}</span></td>
                      <td>
                        <div className="row-actions">
                          <a href={`/tasks/new?relatedEntityType=visit_follow_up&relatedEntityId=${followUp.id}`}>Create task</a>
                          <a href={`/visits/${followUp.visitRecordId}/edit`}>Mark complete</a>
                          <a href="/escalations/new">Escalate</a>
                          <a href="/evidence/new">Attach evidence</a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </section>
      </main>
    </VisitShell>
  );
}

export function VisitReportsPage() {
  const reportTemplates = [
    ["Daily visit report", "Summarize what changed today, overdue promises, and immediate next actions."],
    ["Weekly field visit report", "Compare weekly visit coverage, gaps, owners, and vote impact."],
    ["Village visit report", "Produce a village-specific dossier with issues, promises, support movement, and risks."],
    ["Candidate visit report", "Brief Uday Sangle on commitments, safe claims, owners, and follow-up timeline."],
    ["Influencer meeting report", "Track alignment, reach, risk of backlash, and relationship next step."],
    ["Follow-up pending report", "List overdue promises and tasks by owner and escalation chain."],
    ["Promise generated from visits report", "Turn every promise into owner, date, evidence, and approval status."],
    ["Visit impact report", "Measure support, sentiment, risk, opportunity, turnout, and vote impact movement."]
  ];

  return (
    <VisitShell activeModuleSection="visit-reports">
      <VisitHeader eyebrow="Visit reports" title="Visit Reports & Field Briefs" description="Generate operational reports from visits, evidence, sources, owners, follow-ups, and score movement." />
      <main className="visit-workspace">
        <section className="visit-main">
          <section className="panel">
            <div className="section-header">
              <div>
                <span className="eyebrow">Generated reports</span>
                <h2>Visit Intelligence Reports</h2>
              </div>
            </div>
            <div className="report-template-grid">
              {repository.visitReports.map((report) => (
                <article className="report-template-card" key={report.id}>
                  <span className={`table-status status-${report.status}`}>{formatLabel(report.status)}</span>
                  <strong>{report.title}</strong>
                  <p>{report.executiveSummary}</p>
                  <small>{formatLabel(report.reportType)} / {report.period} / {report.visitIds.length} visits</small>
                  <div className="badge-row">
                    <VerificationBadge status={report.verificationStatus} />
                    <ConfidenceBadge score={report.confidenceScore} />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="panel">
            <div className="section-header">
              <div>
                <span className="eyebrow">Report generator</span>
                <h2>Templates</h2>
              </div>
            </div>
            <div className="report-template-grid">
              {reportTemplates.map(([title, detail]) => (
                <article className="report-template-card" key={title}>
                  <strong>{title}</strong>
                  <p>{detail}</p>
                  <div className="row-actions">
                    <a href="/visits/reports">Generate</a>
                    <a href="/sources/new">Attach source</a>
                    <a href="/evidence/new">Attach evidence</a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>
      </main>
    </VisitShell>
  );
}

function VisitForm({ mode, visit }: { mode: "new" | "edit"; visit?: VisitRecord }) {
  const sources = findSources(visit?.sourceIds ?? []);
  const evidence = visit ? findEvidenceFor("visit_record", visit.id) : [];

  return (
    <main className="visit-form-layout">
      <form className="manager-form visit-form" action="/visits">
        <FormSection id="visit-basics" eyebrow="Visit basics" title={mode === "new" ? "Create Visit Record" : "Edit Visit Record"}>
          <TextInput label="Visit title" defaultValue={visit?.visitTitle} required />
          <SelectInput label="Visit type" options={visitTypeOptions} defaultValue={visit?.visitType} required />
          <SelectInput label="Status" options={visitStatusOptions} defaultValue={visit?.status ?? "planned"} required />
          <SelectInput label="Priority" options={priorityOptions} defaultValue={visit?.priority ?? "medium"} required />
          <TextArea label="Purpose" defaultValue={visit?.purpose} required />
        </FormSection>

        <FormSection id="related-entity" eyebrow="Related entity" title="Link Visit To Intelligence Object">
          <SelectInput label="Related entity type" options={["candidate", "village", "booth", "community", "household", "influencer", "issue", "political_risk", "political_opportunity", "political_event", "task"]} defaultValue={visit?.relatedEntityType} required />
          <TextInput label="Related entity ID" defaultValue={visit?.relatedEntityId} required />
          <SelectInput label="Issue" options={repository.issues.map((issue) => issue.title)} defaultValue={issueName(visit?.issueId ?? "")} />
          <SelectInput label="Risk" options={repository.politicalRisks.map((risk) => risk.risk)} defaultValue={riskName(visit?.riskId ?? "")} />
          <SelectInput label="Opportunity" options={repository.politicalOpportunities.map((opportunity) => opportunity.opportunity)} defaultValue={opportunityName(visit?.opportunityId ?? "")} />
        </FormSection>

        <FormSection id="location" eyebrow="Location" title="Territory and Locality">
          <SelectInput label="Village" options={repository.villages.map((village) => village.name)} defaultValue={villageName(visit?.villageId ?? "")} required />
          <SelectInput label="Booth" options={repository.booths.map((booth) => booth.boothNumber)} defaultValue={boothName(visit?.boothId ?? "")} />
          <SelectInput label="Community" options={repository.communities.map((community) => community.name)} defaultValue={communityName(visit?.communityId ?? "")} />
          <TextInput label="Household ID" defaultValue={visit?.householdId} />
          <TextInput label="Address/locality" defaultValue={visit?.addressOrLocality} />
          <TextInput label="GPS/location placeholder" defaultValue={visit?.gpsLocation ?? "GPS pending"} />
        </FormSection>

        <FormSection id="ownership" eyebrow="Ownership" title="Owner, Coordinator, Team, Escalation">
          <SelectInput label="Primary owner" options={repository.owners.map((owner) => owner.fullName)} defaultValue={ownerName(visit?.primaryOwnerId ?? "")} required />
          <SelectInput label="Secondary owner" options={repository.owners.map((owner) => owner.fullName)} defaultValue={ownerName(visit?.secondaryOwnerId ?? "")} />
          <SelectInput label="Coordinator" options={repository.owners.map((owner) => owner.fullName)} defaultValue={ownerName(visit?.coordinatorId ?? "")} />
          <SelectInput label="Volunteer team" options={repository.teams.map((team) => team.name)} defaultValue={teamName(visit?.volunteerTeamId ?? "")} />
          <SelectInput label="Escalation owner" options={repository.owners.map((owner) => owner.fullName)} defaultValue={ownerName(visit?.escalationOwnerId ?? "")} required />
        </FormSection>

        <FormSection id="schedule" eyebrow="Schedule" title="Dates, Time, Review">
          <DateInput label="Scheduled date" defaultValue={visit?.scheduledDate} required />
          <DateInput label="Actual date" defaultValue={visit?.actualDate} />
          <TextInput label="Start time" type="time" defaultValue={visit?.startTime} />
          <TextInput label="End time" type="time" defaultValue={visit?.endTime} />
          <DateInput label="Review date" defaultValue={visit?.reviewDate} />
          <DateInput label="Next action due date" defaultValue={visit?.nextActionDueDate} />
        </FormSection>

        <FormSection id="participants" eyebrow="Participants" title="Visitors and People Met">
          <TextArea label="Visitors" defaultValue={visit?.visitors.join(", ")} />
          <TextArea label="People met" defaultValue={visit?.peopleMet.join(", ")} />
          <TextArea label="Community leaders met" defaultValue={visit?.communityLeadersMet.join(", ")} />
          <TextArea label="Influencers met" defaultValue={visit?.influencersMet.join(", ")} />
          <TextArea label="Volunteers present" defaultValue={visit?.volunteersPresent.join(", ")} />
        </FormSection>

        <FormSection id="intelligence" eyebrow="Intelligence captured" title="Conversation and Local Signal">
          <TextArea label="Conversation summary" defaultValue={visit?.conversationSummary} required />
          <TextArea label="Key observations" defaultValue={visit?.keyObservations} />
          <TextArea label="Issues raised" defaultValue={visit?.issuesRaised} />
          <TextArea label="Objections raised" defaultValue={visit?.objectionsRaised} />
          <TextArea label="Public mood" defaultValue={visit?.publicMood} />
          <TextArea label="Local political movement" defaultValue={visit?.localPoliticalMovement} />
          <TextArea label="Opponent activity observed" defaultValue={visit?.opponentActivityObserved} />
        </FormSection>

        <FormSection id="scores" eyebrow="Before / after scores" title="Impact Scores">
          <NumberInput label="Sentiment before" defaultValue={visit?.sentimentBefore} />
          <NumberInput label="Sentiment after" defaultValue={visit?.sentimentAfter} />
          <NumberInput label="Support before" defaultValue={visit?.supportBefore} />
          <NumberInput label="Support after" defaultValue={visit?.supportAfter} />
          <NumberInput label="Risk before" defaultValue={visit?.riskBefore} />
          <NumberInput label="Risk after" defaultValue={visit?.riskAfter} />
          <NumberInput label="Opportunity before" defaultValue={visit?.opportunityBefore} />
          <NumberInput label="Opportunity after" defaultValue={visit?.opportunityAfter} />
          <NumberInput label="Turnout before" defaultValue={visit?.turnoutBefore} />
          <NumberInput label="Turnout after" defaultValue={visit?.turnoutAfter} />
          <NumberInput label="Expected vote impact" defaultValue={visit?.expectedVoteImpact} max={2000} min={-2000} />
        </FormSection>

        <FormSection id="follow-ups" eyebrow="Promises and follow-ups" title="Action Commitments">
          <TextArea label="Promises made" defaultValue={visit?.promisesMade} />
          <TextArea label="Follow-ups required" defaultValue={visit?.followUpsRequired} />
          <TextArea label="Next action" defaultValue={visit?.nextAction} required />
          <SelectInput label="Next action owner" options={repository.owners.map((owner) => owner.fullName)} defaultValue={ownerName(visit?.nextActionOwnerId ?? "")} />
          <DateInput label="Due date" defaultValue={visit?.nextActionDueDate} />
        </FormSection>

        <section className="form-section" id="source-evidence">
          <div className="section-header">
            <div>
              <span className="eyebrow">Source and evidence</span>
              <h2>Proof Attachments</h2>
            </div>
          </div>
          <div className="visit-upload-grid">
            <FieldCard label="Attach source" value="Use Source Registry link" />
            <FieldCard label="Attach evidence" value="Use Evidence Repository link" />
            <FieldCard label="Upload evidence placeholder" value="File upload after persistence" />
            <FieldCard label="Field photos placeholder" value="Image upload after storage" />
            <FieldCard label="Documents placeholder" value="Document upload after storage" />
          </div>
          <SourceAttachmentPanel sources={sources} />
          <EvidenceDrawer evidence={evidence} sources={sources} />
        </section>

        <FormSection id="verification" eyebrow="Verification and approval" title="Review Gate">
          <SelectInput label="Verification status" options={verificationOptions} defaultValue={visit?.verificationStatus ?? "needs_verification"} required />
          <NumberInput label="Confidence score" defaultValue={visit?.confidenceScore ?? 50} required />
          <SelectInput label="Approval status" options={approvalOptions} defaultValue={visit?.approvalStatus ?? "draft"} required />
          <SelectInput label="Reviewer" options={repository.owners.map((owner) => owner.fullName)} defaultValue={ownerName(visit?.reviewerId ?? "")} />
          <TextArea label="Review notes" defaultValue={visit?.reviewNotes ?? "Record next verification step before public use."} />
        </FormSection>

        <section className="form-section" id="audit-trail">
          <div className="audit-placeholder">
            <h3>Audit trail placeholder</h3>
            <p>
              {mode === "edit"
                ? `Last updated by ${visit?.updatedBy ?? "current user"} at ${visit?.updatedAt ?? "pending"}.`
                : "Audit trail starts when this visit is saved."}
            </p>
            {mode === "edit" ? (
              <label>
                <span>Change reason</span>
                <textarea defaultValue="Update field intelligence, score movement, evidence, or ownership details." />
              </label>
            ) : null}
          </div>
        </section>

        <section className="form-actions">
          <button type="submit">Save Draft</button>
          <button type="submit">Submit for Verification</button>
          <button type="submit">Mark Follow-up Required</button>
          <a href={`/tasks/new?relatedEntityType=visit_record&relatedEntityId=${visit?.id ?? "new-visit"}`}>Create Task</a>
          <a href={`/tasks/new?relatedEntityType=visit_record&relatedEntityId=${visit?.id ?? "new-visit"}&type=promise`}>Create Promise</a>
          <a href="/issues/new">Convert to Issue</a>
          <a href="/risks/new">Convert to Risk</a>
          <a href="/opportunities/new">Convert to Opportunity</a>
          <a href="/visits">Cancel</a>
        </section>
      </form>
    </main>
  );
}

function VisitShell({ activeModuleSection, children }: { activeModuleSection: string; children: ReactNode }) {
  return (
    <PlatformShell activeCoreModule="voter-intelligence" activeModuleSection={activeModuleSection}>
      {children}
    </PlatformShell>
  );
}

function VisitHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <header className="candidate-header manager-header">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="manager-header-actions">
        <a className="action-btn" href="/visits">Dashboard</a>
        <a className="action-btn" href="/visits/new">New Visit</a>
        <a className="action-btn" href="/visits/calendar">Calendar</a>
        <a className="action-btn" href="/visits/follow-ups">Follow-ups</a>
        <a className="action-btn" href="/visits/reports">Reports</a>
      </div>
    </header>
  );
}

function VisitFilters({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`visit-filter-rail ${compact ? "is-compact" : ""}`}>
      <label>
        <span>Date range</span>
        <select defaultValue="7">
          <option value="7">Next 7 days</option>
          <option value="30">Next 30 days</option>
          <option value="custom">Custom</option>
        </select>
      </label>
      <label>
        <span>Visit type</span>
        <select defaultValue="">
          <option value="">All types</option>
          {visitTypeOptions.map((type) => <option key={type}>{formatLabel(type)}</option>)}
        </select>
      </label>
      <label>
        <span>Status</span>
        <select defaultValue="">
          <option value="">All statuses</option>
          {visitStatusOptions.map((status) => <option key={status}>{formatLabel(status)}</option>)}
        </select>
      </label>
      <label>
        <span>Village</span>
        <select defaultValue="">
          <option value="">All villages</option>
          {repository.villages.map((village) => <option key={village.id}>{village.name}</option>)}
        </select>
      </label>
      <label>
        <span>Booth</span>
        <select defaultValue="">
          <option value="">All booths</option>
          {repository.booths.map((booth) => <option key={booth.id}>{booth.boothNumber}</option>)}
        </select>
      </label>
      <label>
        <span>Community</span>
        <select defaultValue="">
          <option value="">All communities</option>
          {repository.communities.map((community) => <option key={community.id}>{community.name}</option>)}
        </select>
      </label>
      <label>
        <span>Owner</span>
        <select defaultValue="">
          <option value="">All owners</option>
          {repository.owners.map((owner) => <option key={owner.id}>{owner.fullName}</option>)}
        </select>
      </label>
      <label>
        <span>Priority</span>
        <select defaultValue="">
          <option value="">All priorities</option>
          {priorityOptions.map((priority) => <option key={priority}>{priority}</option>)}
        </select>
      </label>
      <label>
        <span>Follow-up</span>
        <select defaultValue="">
          <option value="">All</option>
          <option>Required</option>
          <option>Overdue</option>
          <option>Escalated</option>
        </select>
      </label>
    </section>
  );
}

function Metric({ label, value, detail, tone = "neutral" }: { label: string; value: string | number; detail: string; tone?: "neutral" | "positive" | "watch" | "critical" }) {
  const toneClass = tone === "critical" ? "tone-critical" : tone === "positive" ? "tone-positive" : tone === "watch" ? "tone-watch" : "tone-neutral";
  return (
    <article className={`metric-cell compact ${toneClass}`}>
      <span className="metric-label">{label}</span>
      <div className="metric-value-row"><strong>{value}</strong></div>
      <p>{detail}</p>
    </article>
  );
}

function ImpactCard({ label, value, detail }: { label: string; value: number; detail: string }) {
  return (
    <article className="visit-impact-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{detail}</p>
    </article>
  );
}

function VisitListPanel({ title, eyebrow, visits, showImpact = false }: { title: string; eyebrow: string; visits: VisitRecord[]; showImpact?: boolean }) {
  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
        </div>
      </div>
      <div className="context-list">
        {visits.map((visit) => (
          <article className="context-row" key={visit.id}>
            <div className="badge-row">
              <StatusChip value={visit.status} />
              <span className={`priority-chip level-${visit.priority}`}>{visit.priority}</span>
            </div>
            <strong><a href={`/visits/${visit.id}`}>{visit.visitTitle}</a></strong>
            <span>{visit.scheduledDate} / {ownerName(visit.primaryOwnerId)}</span>
            {showImpact ? <VoteImpact value={visit.expectedVoteImpact} /> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function FollowUpPanel({ title, eyebrow, followUps }: { title: string; eyebrow: string; followUps: VisitFollowUp[] }) {
  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
        </div>
      </div>
      <div className="context-list">
        {followUps.map((followUp) => (
          <article className="context-row" key={followUp.id}>
            <StatusChip value={followUp.status} />
            <strong>{followUp.title}</strong>
            <span>{ownerName(followUp.ownerId)} / due {followUp.dueDate}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function RecommendationCard({ title, detail, priority }: { title: string; detail: string; priority: Priority }) {
  return (
    <article className={`recommendation-card level-${priority}`}>
      <div className="recommendation-top">
        <span className={`priority-chip level-${priority}`}>{priority}</span>
      </div>
      <h3>{title}</h3>
      <p>{detail}</p>
    </article>
  );
}

function FormSection({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section className="form-section" id={id}>
      <div className="section-header">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
        </div>
      </div>
      <div className="form-grid">{children}</div>
    </section>
  );
}

function TextInput({ label, defaultValue, type = "text", required = false }: { label: string; defaultValue?: string; type?: string; required?: boolean }) {
  return (
    <label>
      <span>{label}{required ? " *" : ""}</span>
      <input defaultValue={defaultValue ?? ""} required={required} type={type} />
    </label>
  );
}

function DateInput({ label, defaultValue, required = false }: { label: string; defaultValue?: string; required?: boolean }) {
  return <TextInput label={label} defaultValue={defaultValue} required={required} type="date" />;
}

function NumberInput({ label, defaultValue, min = 0, max = 100, required = false }: { label: string; defaultValue?: number; min?: number; max?: number; required?: boolean }) {
  return (
    <label>
      <span>{label}{required ? " *" : ""}</span>
      <input defaultValue={defaultValue ?? 50} max={max} min={min} required={required} type="number" />
    </label>
  );
}

function TextArea({ label, defaultValue, required = false }: { label: string; defaultValue?: string; required?: boolean }) {
  return (
    <label className="full-span">
      <span>{label}{required ? " *" : ""}</span>
      <textarea defaultValue={defaultValue ?? ""} required={required} />
    </label>
  );
}

function SelectInput({ label, options, defaultValue, required = false }: { label: string; options: readonly string[]; defaultValue?: string; required?: boolean }) {
  return (
    <label>
      <span>{label}{required ? " *" : ""}</span>
      <select defaultValue={defaultValue ?? ""} required={required}>
        <option value="">Select</option>
        {options.map((option) => <option key={option} value={option}>{formatLabel(option)}</option>)}
      </select>
    </label>
  );
}

function FieldCard({ label, value }: { label: string; value: string | number }) {
  return (
    <article className="manager-field-card">
      <span>{label}</span>
      <strong>{value || "Not recorded"}</strong>
    </article>
  );
}

function DossierSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <span className="eyebrow">Visit dossier</span>
          <h2>{title}</h2>
        </div>
      </div>
      <div className="context-list">
        {items.length ? items.map((item) => <article className="context-row" key={item}>{item}</article>) : <p className="table-description">No records captured yet.</p>}
      </div>
    </section>
  );
}

function DossierText({ title, body }: { title: string; body: string }) {
  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <span className="eyebrow">Visit dossier</span>
          <h2>{title}</h2>
        </div>
      </div>
      <p className="visit-dossier-copy">{body}</p>
    </section>
  );
}

function ScoreMovement({ label, before, after, invert = false }: { label: string; before: number; after: number; invert?: boolean }) {
  const rawDelta = after - before;
  const positive = invert ? rawDelta <= 0 : rawDelta >= 0;
  return (
    <article className={`visit-score-card ${positive ? "is-positive" : "is-negative"}`}>
      <span>{label}</span>
      <strong>{before} {"->"} {after}</strong>
      <p>{rawDelta > 0 ? "+" : ""}{rawDelta} movement</p>
    </article>
  );
}

function DeltaChip({ before, after }: { before: number; after: number }) {
  const delta = after - before;
  const trend = delta > 0 ? "up" : delta < 0 ? "down" : "stable";
  return <span className={`trend-chip trend-${trend}`}>{delta > 0 ? "+" : ""}{delta}</span>;
}

function VoteImpact({ value }: { value: number }) {
  return <span className={`vote-impact ${value >= 0 ? "is-positive" : "is-negative"}`}>{value > 0 ? "+" : ""}{value}</span>;
}

function StatusChip({ value }: { value: string }) {
  return <span className={`table-status status-${value.replaceAll("_", "-")}`}>{formatLabel(value)}</span>;
}

function getVisit(id: string) {
  return repository.visitRecords.find((visit) => visit.id === id) ?? repository.visitRecords[0];
}

function followUpsForVisit(visitId: string) {
  return repository.visitFollowUps.filter((followUp) => followUp.visitRecordId === visitId);
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

function communityName(id: string) {
  return repository.communities.find((community) => community.id === id)?.name ?? (id ? id : "Not linked");
}

function issueName(id: string) {
  return repository.issues.find((issue) => issue.id === id)?.title ?? "";
}

function riskName(id: string) {
  return repository.politicalRisks.find((risk) => risk.id === id)?.risk ?? "";
}

function opportunityName(id: string) {
  return repository.politicalOpportunities.find((opportunity) => opportunity.id === id)?.opportunity ?? "";
}

function relatedEntityLabel(visit: VisitRecord) {
  if (visit.relatedEntityType === "candidate") return "Uday Sangle";
  if (visit.relatedEntityType === "issue") return issueName(visit.relatedEntityId) || visit.relatedEntityId;
  if (visit.relatedEntityType === "political_opportunity") return opportunityName(visit.relatedEntityId) || visit.relatedEntityId;
  if (visit.relatedEntityType === "ownership_record") return repository.ownershipRecords.find((record) => record.id === visit.relatedEntityId)?.entityName ?? visit.relatedEntityId;
  if (visit.relatedEntityType === "booth") return boothName(visit.relatedEntityId);
  if (visit.relatedEntityType === "village") return villageName(visit.relatedEntityId);
  if (visit.relatedEntityType === "influencer") return visit.relatedEntityId;
  return `${visit.relatedEntityType} / ${visit.relatedEntityId}`;
}

function visitInsight(visit: VisitRecord) {
  const supportDelta = visit.supportAfter - visit.supportBefore;
  const sentimentDelta = visit.sentimentAfter - visit.sentimentBefore;
  const riskDelta = visit.riskAfter - visit.riskBefore;
  const opportunityDelta = visit.opportunityAfter - visit.opportunityBefore;

  if (visit.status === "escalated" || riskDelta > 0) {
    return "This visit created or exposed operational risk. Keep it visible in escalation review, assign an owner-backed follow-up, and require evidence before using the finding in public campaign messaging.";
  }

  if (visit.expectedVoteImpact >= 500 || supportDelta >= 6 || opportunityDelta >= 8) {
    return "This visit has high campaign upside. Convert the captured promise into a task, attach source/evidence, and prepare a short field brief for Uday Sangle's next action in this territory.";
  }

  if (sentimentDelta > 0 || supportDelta > 0) {
    return "This visit improved field mood. Schedule a repeat touchpoint before sentiment cools and make sure the next action owner closes the loop with the people met.";
  }

  return "This visit needs more verification before it should influence strategy. Attach field evidence, confirm the source trail, and review confidence before escalation or reporting.";
}

function formatLabel(value: string) {
  return value.replaceAll("_", " ");
}
