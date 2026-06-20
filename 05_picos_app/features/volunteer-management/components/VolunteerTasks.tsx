"use client";

import { CalendarClock, ChevronDown, MapPin, Plus, Search, UserRound } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { SectionHeader } from "@/features/political-intelligence/components/common";
import type { Volunteer } from "../types";
import {
  volunteerTaskAssigneeTypes,
  volunteerTaskCategories,
  volunteerTaskData,
  volunteerTaskEvidenceOptions,
  volunteerTaskLocationTypes,
  volunteerTaskPriorities,
  volunteerTaskRelatedModules,
  type VolunteerTask,
  type VolunteerTaskAssigneeType,
  type VolunteerTaskEvidence,
  type VolunteerTaskLocationType,
  type VolunteerTaskPriority,
  type VolunteerTaskStatus
} from "../taskData";

type TaskDraft = Omit<VolunteerTask, "id" | "status" | "overdue" | "createdAt" | "completedAt">;

const emptyDraft: TaskDraft = {
  title: "",
  category: "Field Outreach",
  description: "",
  assigneeType: "Individual Volunteer",
  assigneeIds: [],
  locationType: "Booth",
  location: "",
  priority: "Medium",
  dueDate: "",
  dueTime: "",
  expectedOutcome: "",
  evidenceRequired: ["Notes"],
  relatedModule: ""
};

const completedStatuses: VolunteerTaskStatus[] = ["Verified", "Completed", "Archived"];

export function VolunteerTasksPage({ volunteers, onProfile, onToast }: { volunteers: Volunteer[]; onProfile: (volunteer: Volunteer) => void; onToast: (message: string) => void }) {
  const [tasks, setTasks] = useState<VolunteerTask[]>(volunteerTaskData);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editorTask, setEditorTask] = useState<VolunteerTask | "new" | null>(null);
  const volunteerById = useMemo(() => new Map(volunteers.map((volunteer) => [volunteer.id, volunteer])), [volunteers]);
  const visibleTasks = useMemo(() => tasks.filter((task) => {
    const assignees = task.assigneeIds.map((id) => volunteerById.get(id)?.name ?? "").join(" ");
    const matchesQuery = !query.trim() || assignees.toLowerCase().includes(query.trim().toLowerCase());
    const requiresAttention = task.overdue || task.status === "Submitted" || (task.priority === "Critical" && !completedStatuses.includes(task.status));
    const matchesStatus = statusFilter === "All" || (statusFilter === "Attention Required" ? requiresAttention : statusFilter === "Overdue" ? task.overdue : task.status === statusFilter);
    return matchesQuery && matchesStatus && task.status !== "Archived";
  }), [query, statusFilter, tasks, volunteerById]);

  const completed = tasks.filter((task) => completedStatuses.includes(task.status)).length;
  const overdue = tasks.filter((task) => task.overdue && !completedStatuses.includes(task.status)).length;
  const pendingVerification = tasks.filter((task) => task.status === "Submitted").length;
  const completionRate = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
  const completedWithTiming = tasks.filter((task) => task.completedAt);
  const averageCompletionDays = completedWithTiming.length
    ? Math.max(1, Math.round(completedWithTiming.reduce((sum, task) => sum + daysBetween(task.createdAt, task.completedAt ?? task.createdAt), 0) / completedWithTiming.length))
    : 0;

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("view") === "attention") setStatusFilter("Attention Required");
  }, []);

  function saveTask(draft: TaskDraft) {
    if (editorTask && editorTask !== "new") {
      setTasks((current) => current.map((task) => task.id === editorTask.id ? { ...task, ...draft } : task));
      onToast(`${draft.title} updated`);
    } else {
      setTasks((current) => [{ ...draft, id: `task-${Date.now()}`, status: "Assigned", overdue: false, createdAt: new Date().toISOString().slice(0, 10) }, ...current]);
      onToast(`${draft.title} assigned`);
    }
    setEditorTask(null);
  }

  function updateTask(taskId: string, update: Partial<VolunteerTask>, message: string) {
    setTasks((current) => current.map((task) => task.id === taskId ? { ...task, ...update } : task));
    onToast(message);
  }

  function extendDeadline(task: VolunteerTask) {
    const date = new Date(`${task.dueDate}T00:00:00Z`);
    date.setUTCDate(date.getUTCDate() + 2);
    updateTask(task.id, { dueDate: date.toISOString().slice(0, 10), overdue: false }, `${task.title} deadline extended by two days`);
  }

  return (
    <section className="volunteer-task-layout">
      <div className="volunteer-page-title volunteer-task-title">
        <div>
          <span className="eyebrow">Field execution</span>
          <h2>Campaign Tasks</h2>
          <p>Assign geographically linked field work, monitor evidence, and verify campaign outcomes.</p>
        </div>
        <button className="action-btn action-btn-primary" type="button" onClick={() => setEditorTask("new")}><Plus size={16} /> Create Task</button>
      </div>

      <section className="volunteer-task-metrics" aria-label="Task analytics">
        <TaskMetric label="Tasks Assigned" value={tasks.filter((task) => task.status !== "Archived").length} />
        <TaskMetric label="Tasks Completed" value={completed} tone="healthy" />
        <TaskMetric label="Tasks Overdue" value={overdue} tone="critical" />
        <TaskMetric label="Pending Verification" value={pendingVerification} tone="warning" />
        <TaskMetric label="Completion Rate" value={`${completionRate}%`} />
        <TaskMetric label="Avg. Completion" value={`${averageCompletionDays} day${averageCompletionDays === 1 ? "" : "s"}`} />
      </section>

      <section className="panel volunteer-task-panel">
        <SectionHeader
          title="Campaign Task Queue"
          eyebrow="Field assignments and accountability"
          actions={<div className="volunteer-task-filters"><label className="volunteer-task-search"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search assigned volunteers" aria-label="Search assigned volunteers" /></label><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter tasks by status"><option>All</option><option>Attention Required</option><option>Overdue</option><option>Assigned</option><option>Accepted</option><option>In Progress</option><option>Submitted</option><option>Verified</option><option>Completed</option><option>Escalated</option></select></div>}
        />
        <div className="volunteer-task-list">
          {visibleTasks.length ? visibleTasks.map((task) => {
            const assignees = task.assigneeIds.map((id) => volunteerById.get(id)).filter((volunteer): volunteer is Volunteer => Boolean(volunteer));
            return <article className="volunteer-task-row" key={task.id}>
              <div className="volunteer-task-main">
                <div><span className={`volunteer-task-priority is-${task.priority.toLowerCase()}`}>{task.priority}</span><strong>{task.title}</strong></div>
                <p>{task.expectedOutcome}</p>
                <small>{task.category}{task.relatedModule ? ` / ${task.relatedModule}` : ""}</small>
              </div>
              <button className="volunteer-task-assignee" type="button" onClick={() => assignees[0] && onProfile(assignees[0])}><UserRound size={14} /><span><small>Assigned to</small><strong>{assignees.map((volunteer) => volunteer.name).join(", ") || "Unassigned"}</strong></span></button>
              <div className="volunteer-task-location"><MapPin size={14} /><span><small>{task.locationType}</small><strong>{task.location}</strong></span></div>
              <div className="volunteer-task-due"><CalendarClock size={14} /><span><small>Due</small><strong>{formatTaskDate(task.dueDate)}{task.dueTime ? ` / ${task.dueTime}` : ""}</strong></span></div>
              <span className={`volunteer-task-status is-${slug(task.status)}`}>{task.status}</span>
              <TaskActions task={task} onEdit={() => setEditorTask(task)} onReassign={() => setEditorTask(task)} onExtend={() => extendDeadline(task)} onUpdate={updateTask} />
            </article>;
          }) : <div className="volunteer-task-empty"><Search size={22} /><strong>No assignments found</strong><span>Change the volunteer search or status filter.</span><button type="button" onClick={() => { setQuery(""); setStatusFilter("All"); }}>Reset task filters</button></div>}
        </div>
      </section>

      {editorTask ? <TaskEditorModal task={editorTask === "new" ? null : editorTask} volunteers={volunteers} onClose={() => setEditorTask(null)} onSave={saveTask} /> : null}
    </section>
  );
}

function TaskMetric({ label, value, tone = "neutral" }: { label: string; value: string | number; tone?: "neutral" | "healthy" | "warning" | "critical" }) {
  return <article className={`volunteer-task-metric is-${tone}`}><span>{label}</span><strong>{value}</strong></article>;
}

function TaskActions({ task, onEdit, onReassign, onExtend, onUpdate }: { task: VolunteerTask; onEdit: () => void; onReassign: () => void; onExtend: () => void; onUpdate: (taskId: string, update: Partial<VolunteerTask>, message: string) => void }) {
  const nextStep = getNextTaskStep(task.status);
  return <details className="volunteer-task-actions"><summary>Actions <ChevronDown size={13} /></summary><div>
    <button type="button" onClick={onEdit}>Edit Task</button>
    <button type="button" onClick={onReassign}>Reassign Task</button>
    <button type="button" onClick={onExtend}>Extend Deadline</button>
    {nextStep ? <button type="button" onClick={() => onUpdate(task.id, { status: nextStep.status, overdue: nextStep.status === "Completed" ? false : task.overdue, completedAt: nextStep.status === "Completed" ? new Date().toISOString().slice(0, 10) : task.completedAt }, `${task.title}: ${nextStep.label.toLowerCase()}`)}>{nextStep.label}</button> : null}
    {task.status === "Submitted" ? <button type="button" onClick={() => onUpdate(task.id, { status: "Returned For Rework" }, `${task.title} returned for rework`)}>Return For Rework</button> : null}
    {["Assigned", "Accepted"].includes(task.status) ? <button type="button" onClick={() => onUpdate(task.id, { status: "Rejected" }, `${task.title} rejected`)}>Reject Task</button> : null}
    <button type="button" onClick={() => onUpdate(task.id, { status: "Escalated" }, `${task.title} escalated`)}>Escalate Task</button>
    <button type="button" onClick={() => onUpdate(task.id, { status: "Archived" }, `${task.title} archived`)}>Archive Task</button>
  </div></details>;
}

function TaskEditorModal({ task, volunteers, onClose, onSave }: { task: VolunteerTask | null; volunteers: Volunteer[]; onClose: () => void; onSave: (draft: TaskDraft) => void }) {
  const [draft, setDraft] = useState<TaskDraft>(() => task ? taskToDraft(task) : { ...emptyDraft });
  const [assigneeQuery, setAssigneeQuery] = useState("");
  const selectableVolunteers = useMemo(() => volunteers.filter((volunteer) => {
    const roleMatches = draft.assigneeType === "Booth Coordinator" ? volunteer.role === "Booth Coordinator" : draft.assigneeType === "Ward Coordinator" ? volunteer.role === "Ward Coordinator" : true;
    return roleMatches && `${volunteer.name} ${volunteer.role} ${volunteer.booth}`.toLowerCase().includes(assigneeQuery.toLowerCase());
  }), [assigneeQuery, draft.assigneeType, volunteers]);
  const locationOptions = useMemo(() => getLocationOptions(draft.locationType, volunteers), [draft.locationType, volunteers]);
  const allowsMultiple = draft.assigneeType === "Multiple Volunteers" || draft.assigneeType === "Volunteer Team";

  function update<K extends keyof TaskDraft>(key: K, value: TaskDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function toggleAssignee(id: string) {
    update("assigneeIds", allowsMultiple ? (draft.assigneeIds.includes(id) ? draft.assigneeIds.filter((item) => item !== id) : [...draft.assigneeIds, id]) : [id]);
  }

  function toggleEvidence(value: VolunteerTaskEvidence) {
    if (value === "No Evidence Required") return update("evidenceRequired", [value]);
    const withoutNone = draft.evidenceRequired.filter((item) => item !== "No Evidence Required");
    update("evidenceRequired", withoutNone.includes(value) ? withoutNone.filter((item) => item !== value) : [...withoutNone, value]);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!draft.assigneeIds.length || !draft.location || !draft.evidenceRequired.length) return;
    onSave(draft);
  }

  return <div className="volunteer-modal-backdrop" role="dialog" aria-modal="true" aria-label={task ? "Edit campaign task" : "Create campaign task"}>
    <form className="panel volunteer-task-modal" onSubmit={submit}>
      <div className="volunteer-modal-head"><div><span className="eyebrow">Campaign field assignment</span><h2>{task ? "Edit Task" : "Create Task"}</h2><p>Define ownership, geography, deadline, evidence, and the expected field outcome.</p></div><button className="action-btn" type="button" onClick={onClose}>Close</button></div>
      <div className="volunteer-task-form">
        <label className="wide">Task Title<input required list="volunteer-task-titles" value={draft.title} onChange={(event) => update("title", event.target.value)} placeholder="e.g. Booth Verification" /><datalist id="volunteer-task-titles"><option value="Door-to-Door Survey" /><option value="Booth Verification" /><option value="Issue Collection" /><option value="Ward Meeting" /><option value="Volunteer Recruitment" /><option value="Opponent Activity Monitoring" /><option value="Voter List Validation" /><option value="Event Mobilization" /></datalist></label>
        <label>Task Category<select value={draft.category} onChange={(event) => update("category", event.target.value as TaskDraft["category"])}>{volunteerTaskCategories.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Priority<select value={draft.priority} onChange={(event) => update("priority", event.target.value as VolunteerTaskPriority)}>{volunteerTaskPriorities.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="wide">Task Description<textarea required value={draft.description} onChange={(event) => update("description", event.target.value)} placeholder="Give clear field instructions and relevant context." /></label>
        <label>Assign As<select value={draft.assigneeType} onChange={(event) => { update("assigneeType", event.target.value as VolunteerTaskAssigneeType); update("assigneeIds", []); }}>{volunteerTaskAssigneeTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Search Volunteers<input value={assigneeQuery} onChange={(event) => setAssigneeQuery(event.target.value)} placeholder="Name, role or booth" /></label>
        <fieldset className="wide volunteer-task-assignee-options"><legend>Assigned To</legend>{selectableVolunteers.map((volunteer) => <label key={volunteer.id}><input type={allowsMultiple ? "checkbox" : "radio"} name="task-assignee" checked={draft.assigneeIds.includes(volunteer.id)} onChange={() => toggleAssignee(volunteer.id)} /><span><strong>{volunteer.name}</strong><small>{volunteer.role} / {volunteer.booth}</small></span></label>)}</fieldset>
        <label>Location Level<select value={draft.locationType} onChange={(event) => { update("locationType", event.target.value as VolunteerTaskLocationType); update("location", ""); }}>{volunteerTaskLocationTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Location Assignment<select required value={draft.location} onChange={(event) => update("location", event.target.value)}><option value="">Select location</option>{locationOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Due Date<input required type="date" value={draft.dueDate} onChange={(event) => update("dueDate", event.target.value)} /></label>
        <label>Due Time <span className="volunteer-optional">Optional</span><input type="time" value={draft.dueTime} onChange={(event) => update("dueTime", event.target.value)} /></label>
        <label className="wide">Expected Outcome<textarea required value={draft.expectedOutcome} onChange={(event) => update("expectedOutcome", event.target.value)} placeholder="e.g. Collect feedback from 50 households." /></label>
        <fieldset className="wide volunteer-task-evidence"><legend>Evidence Required</legend>{volunteerTaskEvidenceOptions.map((item) => <label key={item}><input type="checkbox" checked={draft.evidenceRequired.includes(item)} onChange={() => toggleEvidence(item)} />{item}</label>)}</fieldset>
        <label className="wide">Related Module <span className="volunteer-optional">Optional</span><select value={draft.relatedModule} onChange={(event) => update("relatedModule", event.target.value as TaskDraft["relatedModule"])}>{volunteerTaskRelatedModules.map((item) => <option value={item} key={item || "none"}>{item || "No related module"}</option>)}</select></label>
      </div>
      <div className="volunteer-task-form-actions"><button className="action-btn" type="button" onClick={onClose}>Cancel</button><button className="action-btn action-btn-primary" type="submit" disabled={!draft.assigneeIds.length || !draft.evidenceRequired.length}>{task ? "Save Changes" : "Create & Assign Task"}</button></div>
    </form>
  </div>;
}

function taskToDraft(task: VolunteerTask): TaskDraft {
  const { id: _id, status: _status, overdue: _overdue, createdAt: _createdAt, completedAt: _completedAt, ...draft } = task;
  return draft;
}

function getLocationOptions(type: VolunteerTaskLocationType, volunteers: Volunteer[]) {
  if (type === "Constituency") return ["Sinnar"];
  const values = volunteers.map((volunteer) => type === "Zone" ? volunteer.zone : type === "Ward" ? volunteer.ward : type === "Village" ? volunteer.village : volunteer.booth);
  return [...new Set(values)].sort();
}

function formatTaskDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short" }).format(new Date(`${value}T00:00:00Z`));
}

function daysBetween(start: string, end: string) {
  return Math.max(0, Math.round((Date.parse(`${end}T00:00:00Z`) - Date.parse(`${start}T00:00:00Z`)) / 86400000));
}

function getNextTaskStep(status: VolunteerTaskStatus): { label: string; status: VolunteerTaskStatus } | null {
  const steps: Partial<Record<VolunteerTaskStatus, { label: string; status: VolunteerTaskStatus }>> = {
    Created: { label: "Assign Task", status: "Assigned" },
    Assigned: { label: "Accept Task", status: "Accepted" },
    Accepted: { label: "Start Task", status: "In Progress" },
    "In Progress": { label: "Submit for Verification", status: "Submitted" },
    Submitted: { label: "Verify Completion", status: "Verified" },
    Verified: { label: "Mark Completed", status: "Completed" }
  };
  return steps[status] ?? null;
}

function slug(value: string) {
  return value.toLowerCase().replaceAll(" ", "-");
}
