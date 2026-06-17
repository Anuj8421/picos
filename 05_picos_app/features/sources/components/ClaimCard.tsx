import { ConfidenceBadge, VerificationBadge } from "@/features/shared/intelligenceBadges";

export function ClaimCard({
  title,
  description,
  verificationStatus,
  confidenceScore,
  nextVerificationStep
}: {
  title: string;
  description: string;
  verificationStatus: string;
  confidenceScore: number;
  nextVerificationStep?: string;
}) {
  return (
    <article className="claim-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="badge-row">
        <VerificationBadge status={verificationStatus} />
        <ConfidenceBadge score={confidenceScore} />
      </div>
      <small>{nextVerificationStep ?? "Next verification step not recorded."}</small>
    </article>
  );
}
