import type { BaseEntity } from "@/lib/domain/types";
import type { ManagerRecord } from "./types";

export function managerRecordFromEntity<T extends BaseEntity>(
  entity: T,
  title: string,
  description: string,
  status: string,
  values: ManagerRecord["values"],
  options?: { priority?: string; evidenceIds?: string[] }
): ManagerRecord {
  return {
    id: entity.id,
    title,
    description,
    status,
    priority: options?.priority,
    verificationStatus: entity.verificationStatus,
    confidenceScore: entity.confidenceScore,
    sourceIds: entity.sourceIds,
    evidenceIds: options?.evidenceIds ?? [],
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
    createdBy: entity.createdBy,
    updatedBy: entity.updatedBy,
    notes: entity.notes,
    values
  };
}

export function prettyValue(value: unknown) {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (value == null || value === "") return "Not recorded";
  return String(value);
}
