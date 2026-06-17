import type { Priority, Trend } from "../types";
import type { ReactNode } from "react";

export function signed(value: number) {
  return value > 0 ? `+${value}` : String(value);
}

export function severityClass(value: string) {
  return `level-${value.toLowerCase().replace(/\s+/g, "-")}`;
}

export function trendClass(trend: Trend) {
  return `trend-${trend.toLowerCase()}`;
}

export function scoreBand(score: number) {
  if (score >= 75) return "score-strong";
  if (score >= 55) return "score-watch";
  return "score-weak";
}

export function SectionHeader({
  title,
  eyebrow,
  actions
}: {
  title: string;
  eyebrow?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="section-header">
      <div>
        {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
        <h2>{title}</h2>
      </div>
      {actions ? <div className="section-actions">{actions}</div> : null}
    </div>
  );
}

export function PriorityChip({ value }: { value: Priority | string }) {
  return <span className={`priority-chip ${severityClass(value)}`}>{value}</span>;
}

export function CountPill({ children }: { children: ReactNode }) {
  return <span className="count-pill">{children}</span>;
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="empty-state">
      <strong>{title}</strong>
      <p>{body}</p>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="loading-state" aria-live="polite">
      <div className="loading-header" />
      <div className="loading-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>
      <div className="loading-body">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
