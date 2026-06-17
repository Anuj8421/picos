import type { BaseEntity } from "./types";

export function needsVerification(record: BaseEntity) {
  return ["unverified", "needs_verification", "disputed", "stale"].includes(record.verificationStatus);
}

export function verificationLabel(status: string) {
  return status.replaceAll("_", " ");
}

export function confidenceLevel(score: number) {
  if (score >= 75) return "high";
  if (score >= 50) return "medium";
  return "low";
}
