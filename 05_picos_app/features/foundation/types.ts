import type { EntityType } from "@/lib/domain/enums";

export type FoundationFieldType = "text" | "textarea" | "select" | "date" | "datetime-local" | "time" | "number" | "checkbox" | "file";

export interface FoundationField {
  name: string;
  label: string;
  type: FoundationFieldType;
  required?: boolean;
  options?: string[];
}

export interface FoundationRecord {
  id: string;
  title: string;
  description: string;
  status: string;
  priority?: string;
  ownerId: string;
  relatedEntityType: string;
  relatedEntityId: string;
  verificationStatus: string;
  confidenceScore: number;
  approvalStatus: string;
  sourceIds: string[];
  evidenceIds: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  notes: string;
  values: Record<string, string | number | boolean | string[] | null>;
}

export interface FoundationConfig {
  key: string;
  title: string;
  eyebrow: string;
  description: string;
  basePath: string;
  entityType: EntityType | string;
  records: FoundationRecord[];
  fields: FoundationField[];
  actions: string[];
  supportsCreate?: boolean;
  supportsEdit?: boolean;
  supportsOverdue?: boolean;
  supportsReview?: boolean;
  supportsHistory?: boolean;
  activeModuleSection?: string;
}
