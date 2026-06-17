import type { EvidenceItem, SourceRecord } from "@/lib/domain/types";

export function VerificationBadge({ status }: { status: string }) {
  return <span className={`verification-badge status-${status.replaceAll("_", "-")}`}>{status.replaceAll("_", " ")}</span>;
}

export function ConfidenceBadge({ score }: { score: number }) {
  const level = score >= 75 ? "high" : score >= 50 ? "medium" : "low";
  return <span className={`confidence-score confidence-${level}`}>{score}% confidence</span>;
}

export function SourceBadge({ source }: { source?: SourceRecord }) {
  return <span className="source-badge">{source ? source.title : "Source pending"}</span>;
}

export function EvidenceTypeBadge({ evidence }: { evidence?: EvidenceItem }) {
  return <span className="source-badge">{evidence ? evidence.evidenceType.replaceAll("_", " ") : "Evidence pending"}</span>;
}
