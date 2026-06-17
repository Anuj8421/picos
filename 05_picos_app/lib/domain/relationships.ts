import { relationshipEdges } from "./mock-data";
import type { EntityType } from "./enums";

export function getRelationshipsFor(entityType: EntityType | string, entityId: string) {
  return relationshipEdges.filter(
    (edge) =>
      (edge.fromEntityType === entityType && edge.fromEntityId === entityId) ||
      (edge.toEntityType === entityType && edge.toEntityId === entityId)
  );
}
