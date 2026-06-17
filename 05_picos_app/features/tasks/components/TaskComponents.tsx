import type { Task } from "@/lib/domain/types";
import { ConfidenceBadge, VerificationBadge } from "@/features/shared/intelligenceBadges";

export function TaskStatusBadge({ status }: { status: string }) {
  return <span className={`task-status status-${status.replaceAll("_", "-")}`}>{status.replaceAll("_", " ")}</span>;
}

export function CreateTaskButton({
  relatedEntityType,
  relatedEntityId,
  label = "Create related task"
}: {
  relatedEntityType: string;
  relatedEntityId: string;
  label?: string;
}) {
  return (
    <a className="action-btn" href={`/tasks/new?relatedEntityType=${relatedEntityType}&relatedEntityId=${relatedEntityId}`}>
      {label}
    </a>
  );
}

export function AssignedTaskList({ tasks }: { tasks: Task[] }) {
  return (
    <section className="context-card">
      <h3>Related Tasks</h3>
      <div className="context-list">
        {tasks.length ? (
          tasks.map((task) => (
            <article className="context-row" key={task.id}>
              <TaskStatusBadge status={task.status} />
              <strong>{task.title}</strong>
              <span>{task.owner} / due {task.dueDate}</span>
              <div className="badge-row">
                <VerificationBadge status={task.verificationStatus} />
                <ConfidenceBadge score={task.confidenceScore} />
              </div>
            </article>
          ))
        ) : (
          <p>No tasks linked yet.</p>
        )}
      </div>
    </section>
  );
}

export function TaskDrawer({ task }: { task?: Task }) {
  return (
    <section className="context-card">
      <h3>Task Context</h3>
      {task ? (
        <article className="context-row">
          <TaskStatusBadge status={task.status} />
          <strong>{task.title}</strong>
          <span>{task.description}</span>
          <span>{task.evidenceRequired ? "Evidence required" : "Evidence optional"}</span>
        </article>
      ) : (
        <p>Select a task to view assignment details.</p>
      )}
    </section>
  );
}
