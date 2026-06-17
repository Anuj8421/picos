import { PlatformShell } from "@/features/platform/PlatformShell";
import { ConfidenceBadge, VerificationBadge } from "@/features/shared/intelligenceBadges";
import { EvidenceDrawer } from "@/features/evidence/components/EvidenceDrawer";
import { SourceAttachmentPanel } from "@/features/sources/components/SourceAttachmentPanel";
import { ClaimCard } from "@/features/sources/components/ClaimCard";
import { AssignedTaskList, CreateTaskButton, TaskStatusBadge } from "@/features/tasks/components/TaskComponents";
import { findEvidenceFor, findSources, findTasksFor } from "@/lib/domain/repositories";
import type { ManagerConfig, ManagerField, ManagerRecord } from "../types";
import { prettyValue } from "../manager-utils";

export function ManagerListPage({ config }: { config: ManagerConfig }) {
  return (
    <PlatformShell activeCoreModule={config.activeCoreModule ?? "political-intelligence"} activePoliticalSection={config.activePoliticalSection} activeModuleSection={config.activeModuleSection}>
      <ManagerHeader config={config} mode="List" />
      <main className="manager-workspace">
        <section className="manager-list-toolbar">
          <div>
            <span className="eyebrow">{config.eyebrow}</span>
            <h2>{config.records.length} records</h2>
          </div>
          <div className="manager-toolbar-actions">
            <a className="action-btn" href={`${config.basePath}/new`}>Create new</a>
            <a className="action-btn" href="/sources/new">Attach source</a>
            <a className="action-btn" href="/evidence/new">Attach evidence</a>
          </div>
        </section>

        <section className="manager-table-panel">
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Record</th>
                  <th>Status</th>
                  <th>Verification</th>
                  <th>Confidence</th>
                  <th>Sources</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {config.records.map((record) => (
                  <tr key={record.id}>
                    <td>
                      <strong>{record.title}</strong>
                      <p className="table-description">{record.description}</p>
                    </td>
                    <td>{record.priority ? <span className={`priority-chip level-${record.priority}`}>{record.priority}</span> : <span className="table-status">{record.status}</span>}</td>
                    <td><VerificationBadge status={record.verificationStatus} /></td>
                    <td><ConfidenceBadge score={record.confidenceScore} /></td>
                    <td>{record.sourceIds.length}</td>
                    <td>{record.updatedAt.slice(0, 10)}</td>
                    <td>
                      <div className="row-actions">
                        <a href={`${config.basePath}/${record.id}`}>View</a>
                        <a href={`${config.basePath}/${record.id}/edit`}>Edit</a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </PlatformShell>
  );
}

export function ManagerDetailPage({ config, id }: { config: ManagerConfig; id: string }) {
  const record = config.records.find((item) => item.id === id) ?? config.records[0];
  const sources = findSources(record.sourceIds);
  const evidence = findEvidenceFor(config.entityType, record.id);
  const relatedTasks = findTasksFor(config.entityType, record.id);

  return (
    <PlatformShell activeCoreModule={config.activeCoreModule ?? "political-intelligence"} activePoliticalSection={config.activePoliticalSection} activeModuleSection={config.activeModuleSection}>
      <ManagerHeader config={config} mode="Detail" record={record} />
      <main className="manager-detail-layout">
        <section className="manager-detail-main">
          <ClaimCard
            title={record.title}
            description={record.description}
            verificationStatus={record.verificationStatus}
            confidenceScore={record.confidenceScore}
            nextVerificationStep={sources[0]?.nextVerificationStep}
          />

          <section className="manager-record-grid">
            {config.fields.map((field) => (
              <article className="manager-field-card" key={field.name}>
                <span>{field.label}</span>
                <strong>{prettyValue(record.values[field.name])}</strong>
              </article>
            ))}
          </section>

          <section className="manager-actions-panel">
            <h2>Actions</h2>
            <div className="manager-action-grid">
              {config.actions.map((action) => (
                <a href={routeForAction(action, config, record)} key={action}>{action}</a>
              ))}
            </div>
          </section>
        </section>

        <ManagerContextPanel config={config} record={record} sources={sources} evidence={evidence} relatedTasks={relatedTasks} />
      </main>
    </PlatformShell>
  );
}

export function ManagerFormPage({
  config,
  id,
  mode,
  initialValues = {}
}: {
  config: ManagerConfig;
  id?: string;
  mode: "new" | "edit";
  initialValues?: ManagerRecord["values"];
}) {
  const record = id ? config.records.find((item) => item.id === id) : undefined;
  const sources = findSources(record?.sourceIds ?? []);
  const evidence = record ? findEvidenceFor(config.entityType, record.id) : [];
  const relatedTasks = record ? findTasksFor(config.entityType, record.id) : [];

  return (
    <PlatformShell activeCoreModule={config.activeCoreModule ?? "political-intelligence"} activePoliticalSection={config.activePoliticalSection} activeModuleSection={config.activeModuleSection}>
      <ManagerHeader config={config} mode={mode === "new" ? "Create" : "Edit"} record={record} />
      <main className="manager-form-layout">
        <form className="manager-form" action={config.basePath}>
          <section className="form-section" id="core-fields">
            <div className="section-header">
              <div>
                <div className="eyebrow">Full-page data entry</div>
                <h2>{mode === "new" ? `Create ${config.title} Record` : `Edit ${record?.title ?? config.title}`}</h2>
              </div>
            </div>
            <div className="form-grid">
              {config.fields.map((field) => (
                <ManagerInput key={field.name} field={field} value={record?.values[field.name] ?? initialValues[field.name]} />
              ))}
            </div>
          </section>

          <section className="form-section" id="source-evidence">
            <SourceAttachmentPanel sources={sources} />
            <EvidenceDrawer evidence={evidence} sources={sources} />
          </section>

          <section className="form-section" id="verification">
            <div className="verification-form-grid">
              <label>
                <span>Verification status</span>
                <select defaultValue={record?.verificationStatus ?? "needs_verification"}>
                  <option value="unverified">unverified</option>
                  <option value="needs_verification">needs_verification</option>
                  <option value="partially_verified">partially_verified</option>
                  <option value="verified">verified</option>
                  <option value="disputed">disputed</option>
                  <option value="stale">stale</option>
                </select>
              </label>
              <label>
                <span>Confidence score</span>
                <input defaultValue={record?.confidenceScore ?? 50} max={100} min={0} type="number" />
              </label>
              <label className="full-span">
                <span>Next verification step</span>
                <textarea defaultValue={sources[0]?.nextVerificationStep ?? "Record the next verification step before public use."} />
              </label>
            </div>
          </section>

          <section className="form-section" id="related-records">
            <AssignedTaskList tasks={relatedTasks} />
            <CreateTaskButton relatedEntityType={config.entityType} relatedEntityId={record?.id ?? "new-record"} />
          </section>

          <section className="form-section" id="audit-trail">
            <div className="audit-placeholder">
              <h3>Audit trail placeholder</h3>
              <p>Created by {record?.createdBy ?? "current user"} and last updated by {record?.updatedBy ?? "current user"}. Full audit events will appear after persistence is added.</p>
            </div>
          </section>

          <section className="form-actions" id="form-actions">
            <button type="submit">Save draft</button>
            <button type="submit">Save and verify later</button>
            <button type="submit">Save as verified</button>
            <button type="submit">Mark disputed</button>
            <a href="/sources/new">Attach source</a>
            <a href="/evidence/new">Attach evidence</a>
            <a href={`/tasks/new?relatedEntityType=${config.entityType}&relatedEntityId=${record?.id ?? "new-record"}`}>Create related task</a>
            <a href={config.basePath}>Cancel</a>
          </section>
        </form>

        <ManagerContextPanel config={config} record={record} sources={sources} evidence={evidence} relatedTasks={relatedTasks} />
      </main>
    </PlatformShell>
  );
}

function ManagerHeader({ config, mode, record }: { config: ManagerConfig; mode: string; record?: ManagerRecord }) {
  return (
    <header className="candidate-header manager-header">
      <div>
        <span className="eyebrow">{config.eyebrow} / {mode}</span>
        <h1>{record ? record.title : config.title}</h1>
        <p>{config.description}</p>
      </div>
      <div className="manager-header-actions">
        <a className="action-btn" href={config.basePath}>List</a>
        <a className="action-btn" href={`${config.basePath}/new`}>New</a>
      </div>
    </header>
  );
}

function ManagerInput({ field, value }: { field: ManagerField; value: unknown }) {
  const defaultValue = typeof value === "string" || typeof value === "number" ? value : "";
  return (
    <label className={field.type === "textarea" ? "full-span" : ""}>
      <span>{field.label}{field.required ? " *" : ""}</span>
      {field.type === "textarea" ? (
        <textarea defaultValue={String(defaultValue)} placeholder={field.placeholder} required={field.required} />
      ) : field.type === "select" ? (
        <select defaultValue={String(defaultValue)} required={field.required}>
          <option value="">Select</option>
          {(field.options ?? []).map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : field.type === "checkbox" ? (
        <input defaultChecked={Boolean(value)} required={field.required} type="checkbox" />
      ) : (
        <input defaultValue={defaultValue} max={field.name.toLowerCase().includes("score") || field.name.toLowerCase().includes("coverage") ? 100 : undefined} min={field.type === "number" ? 0 : undefined} placeholder={field.placeholder} required={field.required} type={field.type} />
      )}
    </label>
  );
}

function ManagerContextPanel({
  config,
  record,
  sources,
  evidence,
  relatedTasks
}: {
  config: ManagerConfig;
  record?: ManagerRecord;
  sources: ReturnType<typeof findSources>;
  evidence: ReturnType<typeof findEvidenceFor>;
  relatedTasks: ReturnType<typeof findTasksFor>;
}) {
  return (
    <aside className="manager-context-panel">
      <section className="context-card">
        <h3>Record Context</h3>
        <div className="badge-row">
          <VerificationBadge status={record?.verificationStatus ?? "needs_verification"} />
          <ConfidenceBadge score={record?.confidenceScore ?? 50} />
        </div>
        <p>{record?.notes ?? "New record. Add notes, source, evidence, and verification details before operational use."}</p>
      </section>
      <EvidenceDrawer evidence={evidence} sources={sources} />
      <AssignedTaskList tasks={relatedTasks} />
      <section className="context-card">
        <h3>Related People</h3>
        <p>Related person/entity links will appear here after persistence and relationship mapping are connected.</p>
      </section>
      <section className="context-card">
        <h3>Audit Trail</h3>
        <p>{record ? `Updated ${record.updatedAt.slice(0, 10)} by ${record.updatedBy}.` : "Audit trail starts after this record is saved."}</p>
      </section>
      <section className="context-card">
        <h3>Actions</h3>
        <div className="context-actions">
          <a href="/sources/new">Link Source</a>
          <a href="/evidence/new">Attach Evidence</a>
          <a href={`/tasks/new?relatedEntityType=${config.entityType}&relatedEntityId=${record?.id ?? "new-record"}`}>Create Task</a>
        </div>
      </section>
    </aside>
  );
}

function routeForAction(action: string, config: ManagerConfig, record: ManagerRecord) {
  if (action.includes("Task")) return `/tasks/new?relatedEntityType=${config.entityType}&relatedEntityId=${record.id}`;
  if (action.includes("source") || action.includes("Source")) return "/sources/new";
  if (action.includes("evidence") || action.includes("Evidence")) return "/evidence/new";
  if (action.includes("Risk")) return `/risks/new?from=${record.id}`;
  if (action.includes("Opportunity")) return `/opportunities/new?from=${record.id}`;
  if (action.includes("Event")) return `/events/new?from=${record.id}`;
  return `${config.basePath}/${record.id}/edit`;
}
