import type { EntityType } from "@/lib/domain/enums";

export type FieldType = "text" | "textarea" | "select" | "date" | "datetime-local" | "number" | "checkbox";

export interface ManagerField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

export interface ManagerRecord {
  id: string;
  title: string;
  description: string;
  status: string;
  priority?: string;
  verificationStatus: string;
  confidenceScore: number;
  sourceIds: string[];
  evidenceIds: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  notes: string;
  values: Record<string, string | number | boolean | string[] | null>;
}

export interface ManagerConfig {
  key: string;
  title: string;
  eyebrow: string;
  description: string;
  basePath: string;
  entityType: EntityType | "candidate_record" | "daily_brief";
  activeCoreModule?:
    | "political-intelligence"
    | "campaign-structure"
    | "constituency-intelligence"
    | "booth-intelligence"
    | "voter-intelligence"
    | "issue-mapping"
    | "volunteer-management"
    | "whatsapp-operations"
    | "media-monitoring"
    | "social-media-management"
    | "event-management"
    | "war-room-dashboard"
    | "ai-assistant"
    | "election-analytics"
    | "grievance-management"
    | "knowledge-base";
  activeModuleSection?: string;
  activePoliticalSection:
    | "command-center"
    | "candidate-intelligence"
    | "opponent-intelligence"
    | "party-intelligence"
    | "relationship-intelligence"
    | "influencer-intelligence"
    | "political-events"
    | "political-risks"
    | "political-opportunities"
    | "intelligence-reports";
  fields: ManagerField[];
  records: ManagerRecord[];
  actions: string[];
}
