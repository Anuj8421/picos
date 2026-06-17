"use client";

import { useEffect, useMemo, useState } from "react";
import { politicalIntelligenceData } from "../data";
import type { CommandFilters, MapMode, SearchResult } from "../types";
import { GlobalFilters } from "./GlobalFilters";
import { CommandHeader } from "./NavigationShell";
import { GeographicIntelligenceMap, PowerCentersNetwork } from "./NetworkAndMap";
import { OpponentActivityMonitor } from "./OpponentMonitor";
import { LiveIntelligenceFeed, PoliticalAlertsPanel } from "./FeedAndAlerts";
import { RiskOpportunityMatrix, SentimentOverview } from "./MatrixAndSentiment";
import { StrategicRecommendations } from "./StrategicRecommendations";
import { TopOpportunitiesTable, TopRisksTable, UpcomingEventsTimeline } from "./TablesAndTimeline";
import { LoadingState } from "./common";
import { PlatformShell } from "@/features/platform/PlatformShell";

const defaultFilters: CommandFilters = {
  dateRange: "7 Days",
  customStart: "2026-06-01",
  customEnd: "2026-06-10",
  community: "All",
  village: "All villages",
  booth: "All booths",
  party: "All",
  riskLevel: "All",
  opportunityLevel: "All",
  influencer: "All",
  eventType: "All"
};

export function CommandCenter() {
  const data = politicalIntelligenceData;
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<CommandFilters>(defaultFilters);
  const [selectedMatrixId, setSelectedMatrixId] = useState(data.matrixItems[0].id);
  const [selectedNodeId, setSelectedNodeId] = useState(data.powerCenters.nodes[0].id);
  const [selectedVillageId, setSelectedVillageId] = useState(data.villages[0].id);
  const [mapMode, setMapMode] = useState<MapMode>("Risk");
  const [networkZoom, setNetworkZoom] = useState(1);
  const [mapZoom, setMapZoom] = useState(1);
  const [assignedRecommendationIds, setAssignedRecommendationIds] = useState<string[]>([]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 450);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredFeed = useMemo(() => {
    return data.liveFeed.filter((event) => {
      if (!matchesDate(event.date, filters, data.meta.referenceDate)) return false;
      if (!matchesValue(filters.community, event.community)) return false;
      if (!matchesValue(filters.village, event.village)) return false;
      if (!matchesValue(filters.booth, event.booth)) return false;
      if (!matchesValue(filters.party, event.party)) return false;
      if (!matchesValue(filters.riskLevel, event.priority)) return false;
      if (!matchesValue(filters.influencer, event.influencer)) return false;
      if (!matchesValue(filters.eventType, event.eventType)) return false;
      if (!normalizedQuery) return true;
      return haystack(event).includes(normalizedQuery);
    });
  }, [data.liveFeed, data.meta.referenceDate, filters, normalizedQuery]);

  const filteredAlerts = useMemo(() => {
    return data.alerts.filter((alert) => {
      if (!matchesValue(filters.riskLevel, alert.severity)) return false;
      if (!normalizedQuery) return true;
      return haystack(alert).includes(normalizedQuery);
    });
  }, [data.alerts, filters.riskLevel, normalizedQuery]);

  const filteredRisks = useMemo(() => {
    return data.risks.filter((risk) => {
      if (filters.riskLevel !== "All" && riskLevelFromScore(risk.impact, risk.probability) !== filters.riskLevel) return false;
      if (!normalizedQuery) return true;
      return haystack(risk).includes(normalizedQuery);
    });
  }, [data.risks, filters.riskLevel, normalizedQuery]);

  const filteredOpportunities = useMemo(() => {
    return data.opportunities.filter((opportunity) => {
      if (!matchesValue(filters.opportunityLevel, opportunity.priority)) return false;
      if (!matchesValue(filters.community, opportunity.targetCommunity)) return false;
      if (!normalizedQuery) return true;
      return haystack(opportunity).includes(normalizedQuery);
    });
  }, [data.opportunities, filters.community, filters.opportunityLevel, normalizedQuery]);

  const filteredEvents = useMemo(() => {
    return data.upcomingEvents.filter((event) => {
      if (filters.eventType !== "All" && event.type !== filters.eventType) return false;
      if (!normalizedQuery) return true;
      return haystack(event).includes(normalizedQuery);
    });
  }, [data.upcomingEvents, filters.eventType, normalizedQuery]);

  const searchResults = useMemo(() => {
    if (!normalizedQuery) return [];
    const results: SearchResult[] = [];
    data.liveFeed.forEach((item) => pushResult(results, "Feed", item.id, item.title, `${item.village} / ${item.category}`, item, normalizedQuery));
    data.alerts.forEach((item) => pushResult(results, "Alert", item.id, item.description, `${item.affectedArea} / ${item.owner}`, item, normalizedQuery));
    data.villages.forEach((item) => pushResult(results, "Village", item.id, item.name, item.topIssue, item, normalizedQuery));
    data.powerCenters.nodes.forEach((item) => pushResult(results, "Power Center", item.id, item.label, `${item.type} / influence ${item.influence}`, item, normalizedQuery));
    data.opponents.forEach((item) => pushResult(results, "Opponent", item.id, item.name, item.latestMovement, item, normalizedQuery));
    data.risks.forEach((item) => pushResult(results, "Risk", item.id, item.risk, `${item.owner} / ${item.status}`, item, normalizedQuery));
    data.opportunities.forEach((item) => pushResult(results, "Opportunity", item.id, item.opportunity, `${item.targetCommunity} / ${item.status}`, item, normalizedQuery));
    data.upcomingEvents.forEach((item) => pushResult(results, "Event", item.id, item.title, `${item.area} / ${item.owner}`, item, normalizedQuery));
    data.recommendations.forEach((item) => pushResult(results, "Recommendation", item.id, item.recommendation, item.expectedImpact, item, normalizedQuery));
    return results;
  }, [data, normalizedQuery]);

  function updateFilter<K extends keyof CommandFilters>(key: K, value: CommandFilters[K]) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function assignRecommendation(id: string) {
    setAssignedRecommendationIds((current) => (current.includes(id) ? current : [...current, id]));
    setToast("Recommendation assigned to action queue");
  }

  return (
    <PlatformShell activeCoreModule="political-intelligence" activePoliticalSection="command-center">
      <div className="main-shell">
        <CommandHeader
          dataStatus={data.meta.dataStatus}
          query={query}
          results={searchResults}
          sourceDiscipline={data.meta.sourceDiscipline}
          onQueryChange={setQuery}
        />
        <GlobalFilters filters={filters} options={data.filters} onChange={updateFilter} onReset={() => setFilters(defaultFilters)} />

        {isLoading ? (
          <LoadingState />
        ) : (
          <main className="workspace module-dashboard-workspace political-command-workspace">
            <section className="campaign-first-screen module-first-screen" id="overview">
              <PoliticalSituationRoom
                alerts={filteredAlerts.length}
                criticalRisks={filteredRisks.slice(0, 2)}
                feedCount={filteredFeed.length}
                metrics={data.metrics}
                recommendation={data.recommendations[0].recommendation}
                sentiment={data.sentiment.find((item) => item.segment === "Farmers")?.score ?? data.sentiment[0].score}
                topOpponent={data.opponents[0]}
              />
              <GeographicIntelligenceMap
                mode={mapMode}
                selectedVillageId={selectedVillageId}
                villages={data.villages}
                zoom={mapZoom}
                onModeChange={setMapMode}
                onSelectVillage={setSelectedVillageId}
                onZoom={(direction) => setMapZoom((value) => clampZoom(direction === "in" ? value + 0.15 : value - 0.15))}
              />
            </section>
            <div className="workspace-grid top-grid">
              <LiveIntelligenceFeed feed={filteredFeed} />
              <PoliticalAlertsPanel alerts={filteredAlerts} />
            </div>
            <div className="workspace-grid two-column">
              <RiskOpportunityMatrix items={data.matrixItems} selectedId={selectedMatrixId} onSelect={setSelectedMatrixId} />
              <SentimentOverview sentiment={data.sentiment} />
            </div>
            <OpponentActivityMonitor opponents={data.opponents} />
            <div className="workspace-grid two-column visual-grid">
              <PowerCentersNetwork
                edges={data.powerCenters.edges}
                nodes={data.powerCenters.nodes}
                selectedNodeId={selectedNodeId}
                zoom={networkZoom}
                onSelectNode={setSelectedNodeId}
                onZoom={(direction) => setNetworkZoom((value) => clampZoom(direction === "in" ? value + 0.15 : value - 0.15))}
              />
              <StrategicRecommendations
                assignedIds={assignedRecommendationIds}
                recommendations={data.recommendations}
                onAssign={assignRecommendation}
              />
            </div>
            <div className="workspace-grid two-column">
              <TopRisksTable risks={filteredRisks} />
              <TopOpportunitiesTable opportunities={filteredOpportunities} />
            </div>
            <div className="workspace-grid bottom-grid">
              <UpcomingEventsTimeline events={filteredEvents} />
            </div>
          </main>
        )}
      </div>
      {toast ? <div className="toast">{toast}</div> : null}
    </PlatformShell>
  );
}

function PoliticalSituationRoom({
  alerts,
  criticalRisks,
  feedCount,
  metrics,
  topOpponent,
  sentiment,
  recommendation
}: {
  alerts: number;
  criticalRisks: { risk: string; impact: number; probability: number }[];
  feedCount: number;
  metrics: typeof politicalIntelligenceData.metrics;
  topOpponent: { name: string; latestMovement: string; riskLevel: string };
  sentiment: number;
  recommendation: string;
}) {
  const politicalHealth = metricValue(metrics, "Political Health Score");
  const publicSentiment = metricValue(metrics, "Public Sentiment Score");
  const opportunityScore = metricValue(metrics, "Opportunity Score");
  const riskScore = metricValue(metrics, "Risk Score");
  const influenceScore = metricValue(metrics, "Influence Score");
  const readiness = metricValue(metrics, "Election Readiness Score");
  const advantage = Math.round((politicalHealth + publicSentiment + opportunityScore + influenceScore + readiness + (100 - riskScore)) / 6);
  const answer = advantage >= 68 ? "Environment is helping, but not safe." : "Political ground is not safe yet.";
  const directive = riskScore >= 45
    ? "Verify sensitive claims, counter opponent movement, and protect high-risk villages before scaling messaging."
    : "Convert opportunity clusters into visits, source-backed narratives, and owner-assigned field actions.";
  const situationMetrics = [
    { label: "Political Advantage", score: advantage, state: "Composite posture", detail: "Health, sentiment, opportunity, influence, readiness, risk", tone: "win" },
    { label: "Public Sentiment", score: publicSentiment, state: "Voter climate", detail: "Mapped perception and issue recall", tone: "support" },
    { label: "Opportunity", score: opportunityScore, state: "Openings", detail: "Farmer, youth, women, anti-incumbency routes", tone: "coverage" },
    { label: "Risk Pressure", score: riskScore, state: "Narrative risk", detail: "Lower is better; verification required", tone: "booth" },
    { label: "Influence", score: influenceScore, state: "Network strength", detail: "Workers, local leaders, organizations", tone: "volunteer" },
    { label: "Election Readiness", score: readiness, state: "Proof gap", detail: "Booth source and official result readiness", tone: "execution" },
    { label: "Farmer Sentiment", score: sentiment, state: "Priority segment", detail: "High-value trust path", tone: "turnout" }
  ] as const;

  return (
    <section className="situation-room module-situation-room">
      <div className="situation-room-lead">
        <div>
          <span className="eyebrow">Political Situation Room</span>
          <h2>{answer}</h2>
          <div className="situation-status-strip" aria-label="Political intelligence status">
            <span>{feedCount} live signals</span>
            <span>{alerts} alerts</span>
            <span>{topOpponent.name} watch</span>
          </div>
        </div>
        <p>{topOpponent.latestMovement}</p>
        <div className="situation-decision">
          <span>What should Uday do next?</span>
          <strong>{directive}</strong>
        </div>
        <div className="situation-directives">
          <a href="#live-feed">Read live signals</a>
          <a href="#top-risks">Contain risks</a>
          <a href="#ai-recommendations">Assign strategy</a>
        </div>
      </div>
      <div className="situation-metric-grid">
        {situationMetrics.map((metric, index) => (
          <article className={`situation-metric tone-${metric.tone} ${index === 0 ? "is-primary" : ""}`} key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.score}%</strong>
            <small>{metric.state}</small>
            <i><em style={{ width: `${metric.score}%` }} /></i>
            <p>{metric.detail}</p>
          </article>
        ))}
      </div>
      <article className="module-risk-note">
        <span>Critical political risk</span>
        <strong>{criticalRisks[0]?.risk ?? "No matching risk"}</strong>
        <p>{criticalRisks[1]?.risk ?? recommendation}</p>
      </article>
    </section>
  );
}

function metricValue(metrics: typeof politicalIntelligenceData.metrics, label: string) {
  return metrics.find((metric) => metric.label === label)?.value ?? 0;
}

function matchesValue(filterValue: string, actualValue: string) {
  if (filterValue === "All" || filterValue === "All villages" || filterValue === "All booths") return true;
  if (actualValue === "All" || actualValue === "All villages" || actualValue === "All booths") return true;
  return actualValue === filterValue;
}

function matchesDate(date: string, filters: CommandFilters, referenceDate: string) {
  const eventDate = new Date(`${date}T00:00:00`);
  const reference = new Date(`${referenceDate}T00:00:00`);
  if (filters.dateRange === "Today") return date === referenceDate;
  if (filters.dateRange === "7 Days") return daysBetween(eventDate, reference) <= 7;
  if (filters.dateRange === "30 Days") return daysBetween(eventDate, reference) <= 30;
  if (filters.customStart && eventDate < new Date(`${filters.customStart}T00:00:00`)) return false;
  if (filters.customEnd && eventDate > new Date(`${filters.customEnd}T23:59:59`)) return false;
  return true;
}

function daysBetween(start: Date, end: Date) {
  return Math.abs(end.getTime() - start.getTime()) / 86400000;
}

function riskLevelFromScore(impact: number, probability: number) {
  const score = (impact + probability) / 2;
  if (score >= 85) return "Critical";
  if (score >= 68) return "High";
  if (score >= 50) return "Medium";
  return "Low";
}

function haystack(value: unknown) {
  return JSON.stringify(value).toLowerCase();
}

function pushResult(
  results: SearchResult[],
  kind: string,
  id: string,
  title: string,
  subtitle: string,
  source: unknown,
  query: string
) {
  if (haystack(source).includes(query)) results.push({ id, kind, title, subtitle });
}

function clampZoom(value: number) {
  return Math.max(0.8, Math.min(1.45, Number(value.toFixed(2))));
}
