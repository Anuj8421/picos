import type { EvidenceItem, SourceRecord } from "@/lib/domain/types";
import { EvidenceTypeBadge, SourceBadge, VerificationBadge, ConfidenceBadge } from "@/features/shared/intelligenceBadges";

export function EvidenceDrawer({
  evidence,
  sources
}: {
  evidence: EvidenceItem[];
  sources: SourceRecord[];
}) {
  return (
    <section className="context-card">
      <h3>Related Evidence</h3>
      <div className="context-list">
        {evidence.length ? (
          evidence.map((item) => (
            <article className="context-row" key={item.id}>
              <EvidenceTypeBadge evidence={item} />
              <strong>{item.title}</strong>
              <span>{item.urlOrPath}</span>
              <div className="badge-row">
                <VerificationBadge status={item.verificationStatus} />
                <ConfidenceBadge score={item.confidenceScore} />
              </div>
            </article>
          ))
        ) : (
          <p>No evidence attached yet.</p>
        )}
      </div>
      <h3>Related Sources</h3>
      <div className="context-list">
        {sources.length ? (
          sources.map((source) => (
            <article className="context-row" key={source.id}>
              <SourceBadge source={source} />
              <strong>{source.publisher}</strong>
              <span>Checked {source.dateChecked}</span>
            </article>
          ))
        ) : (
          <p>No sources attached yet.</p>
        )}
      </div>
    </section>
  );
}
