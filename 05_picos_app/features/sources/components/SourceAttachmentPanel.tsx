import type { SourceRecord } from "@/lib/domain/types";
import { ConfidenceBadge, SourceBadge, VerificationBadge } from "@/features/shared/intelligenceBadges";

export function SourceAttachmentPanel({ sources }: { sources: SourceRecord[] }) {
  return (
    <section className="attachment-panel">
      <div className="section-header compact-header">
        <div>
          <div className="eyebrow">Source Attachments</div>
          <h2>Sources linked to this record</h2>
        </div>
        <a className="action-btn" href="/sources/new">Attach source</a>
      </div>
      <div className="attachment-grid">
        {sources.length ? (
          sources.map((source) => (
            <article className="attachment-card" key={source.id}>
              <SourceBadge source={source} />
              <h3>{source.title}</h3>
              <p>{source.nextVerificationStep}</p>
              <div className="badge-row">
                <VerificationBadge status={source.verificationStatus} />
                <ConfidenceBadge score={source.confidenceScore} />
              </div>
            </article>
          ))
        ) : (
          <article className="attachment-card">
            <h3>No source attached</h3>
            <p>Create or link a source before using this record in public-facing material.</p>
          </article>
        )}
      </div>
    </section>
  );
}
