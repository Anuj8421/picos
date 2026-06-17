import {
  booths,
  candidates,
  communities,
  evidenceItems,
  influencers,
  intelligenceReports,
  intelligenceSignals,
  issues,
  mediaMentions,
  opponents,
  owners,
  ownershipHistory,
  ownershipRecords,
  parties,
  persons,
  politicalEvents,
  politicalOpportunities,
  politicalOrganizations,
  politicalRisks,
  recommendations,
  relationshipEdges,
  researchTasks,
  reviewSchedules,
  roles,
  sentimentRecords,
  sourceRecords,
  tasks,
  teams,
  territoryAssignments,
  escalationChains,
  reportingLines,
  users,
  villages,
  visitChecklists,
  visitFollowUps,
  visitOutcomes,
  visitParticipants,
  visitRecords,
  visitReports
} from "./mock-data";
import {
  approvalRequests,
  auditLogEntries,
  conversationLogs,
  evidenceReviews,
  followUpRecords,
  householdRecords,
  importBatches,
  influencerRecords,
  intelligenceTimelineEvents,
  managedSentimentRecords,
  promiseRecords,
  verificationRequests,
  voterRecords
} from "./foundation-data";
import {
  boothClusters,
  campaignHierarchy,
  campaignOrganizations,
  campaignRoles,
  communityDesks,
  coverageGaps,
  coverageRecords,
  organizationUnits,
  roleResponsibilities,
  rosters,
  sectors,
  shiftAssignments,
  teamMemberAssignments,
  teamMembers,
  villageClusters,
  volunteerTeamMembers,
  volunteerTeams,
  workloadMetrics,
  zones
} from "./campaign-structure-data";
export { getCampaignCoverageSummary, getCampaignStructureRecommendations, getCampaignWorkloadSummary } from "./campaign-structure-engine";
import {
  constituencyProfiles,
  constituencyReports,
  constituencyWatchlistItems,
  constituencyZones
} from "./constituency-data";
export { getConstituencyRecommendations, getConstituencySummary, getConstituencyZoneSummaries } from "./constituency-engine";
import type { EntityType } from "./enums";
import type { BaseEntity, EvidenceItem, SourceRecord, Task } from "./types";

export const repository = {
  candidates,
  opponents,
  parties,
  politicalOrganizations,
  persons,
  influencers,
  villages,
  booths,
  communities,
  issues,
  politicalEvents,
  mediaMentions,
  intelligenceSignals,
  politicalRisks,
  politicalOpportunities,
  evidenceItems,
  sourceRecords,
  researchTasks,
  users,
  roles,
  relationshipEdges,
  sentimentRecords,
  intelligenceReports,
  recommendations,
  tasks,
  owners,
  teams,
  ownershipRecords,
  territoryAssignments,
  reportingLines,
  escalationChains,
  ownershipHistory,
  reviewSchedules,
  visitRecords,
  visitOutcomes,
  visitParticipants,
  visitFollowUps,
  visitReports,
  visitChecklists,
  conversationLogs,
  followUpRecords,
  promiseRecords,
  intelligenceTimelineEvents,
  verificationRequests,
  approvalRequests,
  evidenceReviews,
  auditLogEntries,
  voterRecords,
  householdRecords,
  influencerRecords,
  managedSentimentRecords,
  importBatches,
  campaignOrganizations,
  campaignRoles,
  roleResponsibilities,
  teamMembers,
  teamMemberAssignments,
  zones,
  sectors,
  villageClusters,
  boothClusters,
  communityDesks,
  volunteerTeams,
  volunteerTeamMembers,
  coverageRecords,
  rosters,
  shiftAssignments,
  campaignHierarchy,
  coverageGaps,
  workloadMetrics,
  organizationUnits,
  constituencyProfiles,
  constituencyZones,
  constituencyWatchlistItems,
  constituencyReports
};

export function findSources(sourceIds: string[]): SourceRecord[] {
  return sourceRecords.filter((source) => sourceIds.includes(source.id));
}

export function findEvidenceFor(entityType: EntityType | string, entityId: string): EvidenceItem[] {
  return evidenceItems.filter((evidence) => evidence.relatedEntityType === entityType && evidence.relatedEntityId === entityId);
}

export function findEvidenceByIds(evidenceIds: string[]): EvidenceItem[] {
  return evidenceItems.filter((evidence) => evidenceIds.includes(evidence.id));
}

export function findTasksFor(entityType: EntityType | string, entityId: string): Task[] {
  return tasks.filter((task) => task.relatedEntityType === entityType && task.relatedEntityId === entityId);
}

export function findById<T extends BaseEntity>(records: T[], id: string): T | undefined {
  return records.find((record) => record.id === id);
}

export function findConversationLogsForEntity(entityType: string, entityId: string) {
  return conversationLogs.filter((record) => record.relatedEntityType === entityType && record.relatedEntityId === entityId);
}

export function findFollowUpsForEntity(entityType: string, entityId: string) {
  return followUpRecords.filter((record) => record.relatedEntityType === entityType && record.relatedEntityId === entityId);
}

export function findPromisesForEntity(entityType: string, entityId: string) {
  return promiseRecords.filter((record) => record.relatedEntityType === entityType && record.relatedEntityId === entityId);
}

export function findTimelineEventsForEntity(entityType: string, entityId: string) {
  return intelligenceTimelineEvents.filter((event) => event.entityType === entityType && event.entityId === entityId);
}

export function entityDisplayName(entityType: string, entityId: string) {
  if (!entityId) return "Not linked";
  if (entityType === "candidate") return candidates.find((item) => item.id === entityId)?.fullName ?? entityId;
  if (entityType === "village") return villages.find((item) => item.id === entityId)?.name ?? entityId;
  if (entityType === "booth") return booths.find((item) => item.id === entityId)?.boothNumber ?? entityId;
  if (entityType === "community") return communities.find((item) => item.id === entityId)?.name ?? entityId;
  if (entityType === "issue") return issues.find((item) => item.id === entityId)?.title ?? entityId;
  if (entityType === "political_risk") return politicalRisks.find((item) => item.id === entityId)?.risk ?? entityId;
  if (entityType === "political_opportunity") return politicalOpportunities.find((item) => item.id === entityId)?.opportunity ?? entityId;
  if (entityType === "visit_record") return visitRecords.find((item) => item.id === entityId)?.visitTitle ?? entityId;
  if (entityType === "conversation_log") return conversationLogs.find((item) => item.id === entityId)?.conversationTitle ?? entityId;
  if (entityType === "follow_up_record") return followUpRecords.find((item) => item.id === entityId)?.title ?? entityId;
  if (entityType === "promise_record") return promiseRecords.find((item) => item.id === entityId)?.promiseTitle ?? entityId;
  if (entityType === "ownership_record") return ownershipRecords.find((item) => item.id === entityId)?.entityName ?? entityId;
  if (entityType === "campaign_organization") return campaignOrganizations.find((item) => item.id === entityId)?.organizationName ?? entityId;
  if (entityType === "campaign_role") return campaignRoles.find((item) => item.id === entityId)?.roleName ?? entityId;
  if (entityType === "team_member") return teamMembers.find((item) => item.id === entityId)?.fullName ?? entityId;
  if (entityType === "zone") return zones.find((item) => item.id === entityId)?.zoneName ?? entityId;
  if (entityType === "sector") return sectors.find((item) => item.id === entityId)?.sectorName ?? entityId;
  if (entityType === "community_desk") return communityDesks.find((item) => item.id === entityId)?.deskName ?? entityId;
  if (entityType === "volunteer_team") return volunteerTeams.find((item) => item.id === entityId)?.teamName ?? entityId;
  if (entityType === "coverage_gap") return coverageGaps.find((item) => item.id === entityId)?.gapTitle ?? entityId;
  if (entityType === "roster") return rosters.find((item) => item.id === entityId)?.rosterName ?? entityId;
  if (entityType === "constituency_profile") return constituencyProfiles.find((item) => item.id === entityId)?.constituencyName ?? entityId;
  if (entityType === "constituency_zone") return constituencyZones.find((item) => item.id === entityId)?.zoneName ?? entityId;
  if (entityType === "constituency_watchlist_item") return constituencyWatchlistItems.find((item) => item.id === entityId)?.title ?? entityId;
  if (entityType === "constituency_report") return constituencyReports.find((item) => item.id === entityId)?.title ?? entityId;
  return entityId;
}
