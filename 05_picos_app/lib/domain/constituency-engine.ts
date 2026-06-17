import { constituencyWatchlistItems, constituencyZones } from "./constituency-data";
import { boothClusters, coverageGaps, villageClusters } from "./campaign-structure-data";
import { booths, communities, issues, ownershipRecords, politicalOpportunities, politicalRisks, villages, visitRecords } from "./mock-data";
import { followUpRecords, voterRecords } from "./foundation-data";

function pct(part: number, total: number) {
  if (!total) return 0;
  return Math.round((part / total) * 100);
}

function average(values: number[]) {
  const usable = values.filter((value) => Number.isFinite(value));
  if (!usable.length) return 0;
  return Math.round(usable.reduce((sum, value) => sum + value, 0) / usable.length);
}

function unique(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}

export function getConstituencySummary() {
  const ownedVillages = unique(ownershipRecords.filter((record) => record.entityType === "village" && record.primaryOwnerId).map((record) => record.entityId));
  const ownedBooths = unique(ownershipRecords.filter((record) => record.entityType === "booth" && record.primaryOwnerId).map((record) => record.entityId));
  const coveredVillages = unique(villageClusters.flatMap((cluster) => (cluster.coverageScore > 0 ? cluster.villageIds : [])));
  const coveredBooths = unique(boothClusters.flatMap((cluster) => (cluster.coverageScore > 0 ? cluster.boothIds : [])));
  const openWatchlist = constituencyWatchlistItems.filter((item) => item.status !== "resolved");
  const criticalWatchlist = openWatchlist.filter((item) => item.severity === "critical");
  const activeVisits = visitRecords.filter((visit) => ["planned", "scheduled", "in_progress", "follow_up_required", "escalated"].includes(visit.status));
  const overdueFollowUps = followUpRecords.filter((followUp) => ["overdue", "escalated"].includes(followUp.status));

  const villageCoverage = pct(coveredVillages.length, villages.length);
  const boothCoverage = pct(coveredBooths.length, booths.length);
  const ownershipCoverage = average([pct(ownedVillages.length, villages.length), pct(ownedBooths.length, booths.length)]);
  const issueCoverage = pct(issues.filter((issue) => issue.owner).length, Math.max(issues.length, 1));
  const readinessScore = Math.max(
    0,
    Math.min(
      100,
      average([
        villageCoverage,
        boothCoverage,
        ownershipCoverage,
        issueCoverage,
        average(constituencyZones.map((zone) => zone.coverageScore)),
        100 - criticalWatchlist.length * 10
      ])
    )
  );

  return {
    villagesTracked: villages.length,
    boothsTracked: booths.length,
    communitiesTracked: communities.length,
    issuesTracked: issues.length,
    activeVisits: activeVisits.length,
    overdueFollowUps: overdueFollowUps.length,
    villageCoverage,
    boothCoverage,
    ownershipCoverage,
    issueCoverage,
    readinessScore,
    criticalWatchlist: criticalWatchlist.length,
    openWatchlist: openWatchlist.length,
    riskCount: politicalRisks.length,
    opportunityCount: politicalOpportunities.length,
    voterRecords: voterRecords.length,
    coverageGaps: coverageGaps.length
  };
}

export function getConstituencyZoneSummaries() {
  return constituencyZones.map((zone) => {
    const zoneVillages = villages.filter((village) => zone.villageIds.includes(village.id));
    const zoneBooths = booths.filter((booth) => zone.boothIds.includes(booth.id));
    const zoneWatchlist = constituencyWatchlistItems.filter((item) => item.zoneId === zone.id && item.status !== "resolved");
    const zoneVisits = visitRecords.filter((visit) => zone.villageIds.includes(visit.villageId) || zone.boothIds.includes(visit.boothId));
    const zoneIssues = issues.filter((issue) => zoneVillages.some((village) => issue.location.includes(village.name) || issue.location === village.name));

    return {
      ...zone,
      villageCount: zoneVillages.length,
      boothCount: zoneBooths.length,
      watchlistCount: zoneWatchlist.length,
      visitCount: zoneVisits.length,
      issueCount: zoneIssues.length,
      topVillage: zoneVillages.sort((a, b) => b.riskScore - a.riskScore)[0]?.name ?? "Not mapped"
    };
  });
}

export function getConstituencyRecommendations() {
  const summary = getConstituencySummary();
  const recommendations = [
    ...constituencyWatchlistItems.map((item) => ({
      title: item.title,
      severity: item.severity,
      recommendation: item.recommendedAction,
      relatedEntityType: item.relatedEntityType,
      relatedEntityId: item.relatedEntityId,
      confidenceScore: item.confidenceScore,
      verificationStatus: item.verificationStatus
    }))
  ];

  if (summary.boothCoverage < 80) {
    recommendations.push({
      title: "Booth coverage below election-mode threshold",
      severity: "critical" as const,
      recommendation: "Prioritize official booth source collection and booth coordinator mapping.",
      relatedEntityType: "booth",
      relatedEntityId: "booth-town-001",
      confidenceScore: 50,
      verificationStatus: "needs_verification" as const
    });
  }

  if (summary.ownershipCoverage < 80) {
    recommendations.push({
      title: "Territory ownership incomplete",
      severity: "high" as const,
      recommendation: "Open Ownership Registry and assign missing village, booth, and issue owners.",
      relatedEntityType: "ownership_record",
      relatedEntityId: "own-v-musalgaon",
      confidenceScore: 54,
      verificationStatus: "needs_verification" as const
    });
  }

  return recommendations.slice(0, 8);
}
