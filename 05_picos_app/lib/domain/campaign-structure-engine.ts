import {
  boothClusters,
  communityDesks,
  coverageGaps,
  coverageRecords,
  sectors,
  teamMembers,
  villageClusters,
  volunteerTeams,
  workloadMetrics,
  zones
} from "./campaign-structure-data";
import { booths, communities, owners, politicalOpportunities, politicalRisks, tasks, villages, visitRecords } from "./mock-data";
import { followUpRecords, promiseRecords } from "./foundation-data";

function pct(part: number, total: number) {
  if (!total) return 0;
  return Math.round((part / total) * 100);
}

function average(values: number[]) {
  const usable = values.filter((value) => Number.isFinite(value));
  if (!usable.length) return 0;
  return Math.round(usable.reduce((sum, value) => sum + value, 0) / usable.length);
}

function uniqueCount(values: string[]) {
  return new Set(values.filter(Boolean)).size;
}

export function getCampaignCoverageSummary() {
  const coveredVillageIds = villageClusters.flatMap((cluster) => (cluster.coverageScore > 0 ? cluster.villageIds : []));
  const coveredBoothIds = boothClusters.flatMap((cluster) => (cluster.coverageScore > 0 ? cluster.boothIds : []));
  const coveredCommunityIds = communityDesks.filter((desk) => desk.coverageScore > 0).map((desk) => desk.communityId);
  const activeVolunteerTeams = volunteerTeams.filter((team) => team.status === "active" || team.status === "needs_review");
  const assignedOwnerIds = teamMembers.map((member) => member.ownerId).filter(Boolean);

  const villageCoverage = pct(uniqueCount(coveredVillageIds), villages.length);
  const boothCoverage = pct(uniqueCount(coveredBoothIds), booths.length);
  const communityCoverage = pct(uniqueCount(coveredCommunityIds), communities.length);
  const volunteerCoverage = pct(activeVolunteerTeams.length, volunteerTeams.length);
  const ownerCoverage = pct(uniqueCount(assignedOwnerIds), owners.length);
  const overallCoverage = average([villageCoverage, boothCoverage, communityCoverage, volunteerCoverage, ownerCoverage]);
  const readinessScore = average([
    overallCoverage,
    average(zones.map((zone) => zone.performanceScore)),
    average(volunteerTeams.map((team) => team.performanceScore)),
    100 - pct(coverageGaps.filter((gap) => gap.status !== "resolved").length, Math.max(villages.length + booths.length, 1)) * 2
  ]);

  return {
    totalTeamMembers: teamMembers.length,
    totalVolunteers: teamMembers.filter((member) => member.campaignRoleId === "camp-role-volunteer").length,
    activeCoordinators: teamMembers.filter((member) => ["active", "needs_review"].includes(member.status) && member.campaignRoleId !== "camp-role-volunteer").length,
    zonesCovered: zones.filter((zone) => zone.coverageScore > 0).length,
    sectorsCovered: sectors.filter((sector) => sector.coverageScore > 0).length,
    villagesCovered: uniqueCount(coveredVillageIds),
    boothsCovered: uniqueCount(coveredBoothIds),
    communitiesCovered: uniqueCount(coveredCommunityIds),
    villageCoverage,
    boothCoverage,
    communityCoverage,
    volunteerCoverage,
    ownerCoverage,
    overallCoverage,
    coverageGaps: coverageGaps.filter((gap) => gap.status !== "resolved").length,
    overloadedCoordinators: workloadMetrics.filter((metric) => metric.overloadStatus === "overloaded").length,
    openEscalations: coverageGaps.filter((gap) => ["open", "assigned", "in_review"].includes(gap.status)).length,
    activeTeams: volunteerTeams.filter((team) => team.status === "active").length,
    inactiveTeams: volunteerTeams.filter((team) => team.status === "inactive" || team.status === "unassigned").length,
    teamReadinessScore: average(volunteerTeams.map((team) => average([team.performanceScore, team.coverageScore]))),
    campaignStructureReadinessScore: Math.max(0, Math.min(100, readinessScore)),
    gapRecords: coverageGaps,
    coverageRecords
  };
}

export function getCampaignWorkloadSummary() {
  const ownerRows = owners.map((owner) => {
    const staticMetric = workloadMetrics.find((metric) => metric.ownerId === owner.id);
    const assignedVillages = uniqueCount(teamMembers.filter((member) => member.ownerId === owner.id).flatMap((member) => member.villageIds));
    const assignedBooths = uniqueCount(teamMembers.filter((member) => member.ownerId === owner.id).flatMap((member) => member.boothIds));
    const assignedCommunities = uniqueCount(teamMembers.filter((member) => member.ownerId === owner.id).flatMap((member) => member.communityIds));
    const assignedTasks = tasks.filter((task) => task.owner === owner.fullName || task.owner === owner.role || task.owner === owner.territoryFocus).length;
    const assignedVisits = visitRecords.filter((visit) => [visit.primaryOwnerId, visit.secondaryOwnerId, visit.coordinatorId, visit.escalationOwnerId].includes(owner.id)).length;
    const assignedFollowUps = followUpRecords.filter((followUp) => followUp.ownerId === owner.id).length;
    const assignedPromises = promiseRecords.filter((promise) => promise.ownerId === owner.id || promise.escalationOwnerId === owner.id).length;
    const assignedRisks = politicalRisks.filter((risk) => risk.owner === owner.fullName || risk.owner === owner.role).length;
    const assignedOpportunities = politicalOpportunities.filter((opportunity) => opportunity.owner === owner.fullName || opportunity.owner === owner.role || opportunity.owner === owner.territoryFocus).length;
    const calculatedScore = Math.min(
      100,
      assignedVillages * 9 +
        assignedBooths * 7 +
        assignedCommunities * 6 +
        assignedTasks * 5 +
        assignedVisits * 6 +
        assignedFollowUps * 4 +
        assignedPromises * 4 +
        assignedRisks * 8 +
        assignedOpportunities * 5
    );
    const workloadScore = Math.max(staticMetric?.workloadScore ?? 0, calculatedScore);
    const overloadStatus =
      workloadScore >= 82 ? "overloaded" : workloadScore >= 70 ? "watch" : workloadScore <= 25 ? "underutilized" : "balanced";

    return {
      ownerId: owner.id,
      ownerName: owner.fullName,
      assignedVillages: Math.max(staticMetric?.assignedVillages ?? 0, assignedVillages),
      assignedBooths: Math.max(staticMetric?.assignedBooths ?? 0, assignedBooths),
      assignedCommunities: Math.max(staticMetric?.assignedCommunities ?? 0, assignedCommunities),
      assignedTasks: Math.max(staticMetric?.assignedTasks ?? 0, assignedTasks),
      assignedVisits: Math.max(staticMetric?.assignedVisits ?? 0, assignedVisits),
      assignedFollowUps: Math.max(staticMetric?.assignedFollowUps ?? 0, assignedFollowUps),
      assignedPromises: Math.max(staticMetric?.assignedPromises ?? 0, assignedPromises),
      assignedRisks: Math.max(staticMetric?.assignedRisks ?? 0, assignedRisks),
      assignedOpportunities: Math.max(staticMetric?.assignedOpportunities ?? 0, assignedOpportunities),
      workloadScore,
      overloadStatus,
      recommendedAction: staticMetric?.recommendedAction ?? (overloadStatus === "underutilized" ? "Consider assigning coverage gap support." : "Monitor in next review.")
    };
  });

  return {
    rows: ownerRows,
    averageWorkloadScore: average(ownerRows.map((row) => row.workloadScore)),
    overloaded: ownerRows.filter((row) => row.overloadStatus === "overloaded"),
    underutilized: ownerRows.filter((row) => row.overloadStatus === "underutilized"),
    watch: ownerRows.filter((row) => row.overloadStatus === "watch")
  };
}

export function getCampaignStructureRecommendations() {
  const workload = getCampaignWorkloadSummary();
  const recommendations = [
    ...coverageGaps.map((gap) => ({
      title: gap.gapTitle,
      category: "Coverage Gap",
      severity: gap.severity,
      recommendation: gap.recommendedAction,
      relatedEntityType: gap.relatedEntityType,
      relatedEntityId: gap.relatedEntityId,
      confidenceScore: gap.confidenceScore,
      verificationStatus: gap.verificationStatus
    })),
    ...workload.overloaded.map((row) => ({
      title: `${row.ownerName} workload is overloaded`,
      category: "Overloaded Coordinator",
      severity: "critical" as const,
      recommendation: row.recommendedAction,
      relatedEntityType: "owner",
      relatedEntityId: row.ownerId,
      confidenceScore: 58,
      verificationStatus: "needs_verification" as const
    })),
    ...workload.underutilized.map((row) => ({
      title: `${row.ownerName} can absorb coverage support`,
      category: "Underutilized Volunteer/Owner",
      severity: "medium" as const,
      recommendation: "Review for Devpur, business desk, or booth-source support assignment.",
      relatedEntityType: "owner",
      relatedEntityId: row.ownerId,
      confidenceScore: 45,
      verificationStatus: "needs_verification" as const
    }))
  ];

  return recommendations.slice(0, 10);
}
