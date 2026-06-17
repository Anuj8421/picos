"use client";

import {
  Archive,
  BrainCircuit,
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  CheckCircle2,
  Download,
  FileText,
  GitBranch,
  MapPinned,
  MessageSquareText,
  Network,
  Plus,
  Search,
  Share2,
  ShieldAlert,
  Sparkles,
  Upload,
  Users
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { candidateIntelligenceData } from "../data";
import type {
  AchievementRecord,
  CandidateInsight,
  CommunitySupport,
  DossierMilestone,
  EvidenceItem,
  GeographySupport,
  JourneyEvent,
  MediaSignal,
  OrganizationRecord,
  PerceptionPoint,
  RelationshipNode,
  RiskRegisterItem,
  SocialSignal,
  SwotItem
} from "../types";
import { CountPill, EmptyState, PriorityChip, scoreBand, SectionHeader, severityClass, signed, trendClass } from "@/features/political-intelligence/components/common";
import { PlatformShell } from "@/features/platform/PlatformShell";

const achievementCategories = [
  "All",
  "Roads",
  "Water",
  "Agriculture",
  "Youth",
  "Sports",
  "Education",
  "Healthcare",
  "Women",
  "Employment",
  "Infrastructure"
];

const evidenceTypes = ["All", "Image", "Video", "Document", "Certificate", "Letter", "Media Mention", "Report"];

const candidateTabs = [
  ["overview", "Overview"],
  ["biography", "Biography"],
  ["relationships", "Family & Relationships"],
  ["organizations", "Organizations"],
  ["achievements", "Achievements"],
  ["perception", "Perception"],
  ["community-support", "Community Support"],
  ["geography", "Geography"],
  ["swot", "SWOT"],
  ["media", "Media"],
  ["elections", "Elections"],
  ["risks", "Risks"],
  ["opportunities", "Opportunities"],
  ["ai-insights", "AI Insights"],
  ["evidence", "Evidence Repository"]
] as const;

type CandidateTab = (typeof candidateTabs)[number][0];

type CandidateActionIcon =
  | "archive"
  | "brain"
  | "briefcase"
  | "calendar"
  | "file"
  | "map"
  | "message"
  | "network"
  | "plus"
  | "shield"
  | "sparkles"
  | "upload"
  | "users";

type CandidateActionLink = {
  label: string;
  href: string;
  icon: CandidateActionIcon;
};

const candidateActionPanels: Record<CandidateTab, { title: string; summary: string; actions: CandidateActionLink[] }> = {
  overview: {
    title: "Candidate record hub",
    summary: "Add and review the records that power the dossier overview.",
    actions: [
      { icon: "plus", href: "/candidate-intelligence/manage/new?type=candidate_profile", label: "Add Candidate Record" },
      { icon: "archive", href: "/candidate-intelligence/manage", label: "Open Records" },
      { icon: "file", href: "/reports/daily-brief/new?type=candidate_dossier", label: "Generate Dossier" }
    ]
  },
  biography: {
    title: "Biography data",
    summary: "Create political milestones and link proof from this biography view.",
    actions: [
      { icon: "plus", href: "/candidate-intelligence/manage/new?type=biography", label: "Add Milestone" },
      { icon: "archive", href: "/candidate-intelligence/manage", label: "Open Records" },
      { icon: "file", href: "/sources/new?relatedEntityType=candidate_record", label: "Attach Source" }
    ]
  },
  relationships: {
    title: "Relationship data",
    summary: "Add family, worker, organization, and influence relationships here.",
    actions: [
      { icon: "network", href: "/candidate-intelligence/manage/new?type=relationship", label: "Add Relationship" },
      { icon: "network", href: "/relationships", label: "Open Map" },
      { icon: "file", href: "/sources/new?relatedEntityType=relationship_edge", label: "Attach Source" }
    ]
  },
  organizations: {
    title: "Organization data",
    summary: "Add business, NGO, sports, and worker-network records from this tab.",
    actions: [
      { icon: "briefcase", href: "/candidate-intelligence/manage/new?type=organization", label: "Add Organization" },
      { icon: "archive", href: "/candidate-intelligence/manage", label: "Open Records" },
      { icon: "upload", href: "/evidence/new?relatedEntityType=candidate_record", label: "Attach Evidence" }
    ]
  },
  achievements: {
    title: "Achievement data",
    summary: "Add achievements only where the achievement library is reviewed.",
    actions: [
      { icon: "plus", href: "/candidate-intelligence/manage/new?type=achievement", label: "Add Achievement" },
      { icon: "upload", href: "/evidence/new?relatedEntityType=candidate_record", label: "Attach Evidence" },
      { icon: "archive", href: "/candidate-intelligence/manage", label: "Open Records" }
    ]
  },
  perception: {
    title: "Perception data",
    summary: "Capture sentiment, trust, acceptance, and verification notes here.",
    actions: [
      { icon: "message", href: "/candidate-intelligence/manage/new?type=perception", label: "Add Perception Update" },
      { icon: "file", href: "/sources/new?relatedEntityType=candidate_record", label: "Attach Source" },
      { icon: "calendar", href: "/tasks/new?relatedEntityType=candidate_record", label: "Create Follow-up" }
    ]
  },
  "community-support": {
    title: "Community support data",
    summary: "Add community support signals from the support analysis tab.",
    actions: [
      { icon: "users", href: "/candidate-intelligence/manage/new?type=community_support", label: "Add Support Signal" },
      { icon: "users", href: "/communities/new?from=candidate-intelligence", label: "Add Community" },
      { icon: "file", href: "/sources/new?relatedEntityType=community", label: "Attach Source" }
    ]
  },
  geography: {
    title: "Geography data",
    summary: "Add geography notes and connect them to village intelligence.",
    actions: [
      { icon: "map", href: "/candidate-intelligence/manage/new?type=geography", label: "Add Geography Note" },
      { icon: "map", href: "/constituency/villages", label: "Open Villages" },
      { icon: "upload", href: "/evidence/new?relatedEntityType=village", label: "Attach Evidence" }
    ]
  },
  swot: {
    title: "SWOT data",
    summary: "Create strengths, weaknesses, opportunities, and threats from this view.",
    actions: [
      { icon: "sparkles", href: "/candidate-intelligence/manage/new?type=swot", label: "Add SWOT Item" },
      { icon: "calendar", href: "/tasks/new?relatedEntityType=candidate_record", label: "Create Task" },
      { icon: "file", href: "/reports/daily-brief/new?type=swot", label: "Generate Brief" }
    ]
  },
  media: {
    title: "Media data",
    summary: "Add candidate media mentions and evidence from the media tab.",
    actions: [
      { icon: "message", href: "/media/new?relatedPerson=uday-sangle", label: "Add Media Mention" },
      { icon: "upload", href: "/evidence/new?relatedEntityType=media_mention", label: "Attach Evidence" },
      { icon: "archive", href: "/media", label: "Open Media" }
    ]
  },
  elections: {
    title: "Election data",
    summary: "Add election history with source discipline from this table.",
    actions: [
      { icon: "plus", href: "/candidate-intelligence/manage/new?type=election", label: "Add Election Record" },
      { icon: "file", href: "/sources/new?relatedEntityType=candidate_record", label: "Attach Source" },
      { icon: "archive", href: "/candidate-intelligence/manage", label: "Open Records" }
    ]
  },
  risks: {
    title: "Candidate risk data",
    summary: "Add political, legal, media, and reputation risks from this register.",
    actions: [
      { icon: "shield", href: "/risks/new?relatedPerson=uday-sangle", label: "Add Risk" },
      { icon: "calendar", href: "/tasks/new?relatedEntityType=political_risk", label: "Create Task" },
      { icon: "archive", href: "/risks", label: "Open Risk Register" }
    ]
  },
  opportunities: {
    title: "Opportunity data",
    summary: "Add vote-building opportunities from this candidate opportunity register.",
    actions: [
      { icon: "sparkles", href: "/opportunities/new?relatedPerson=uday-sangle", label: "Add Opportunity" },
      { icon: "calendar", href: "/tasks/new?relatedEntityType=political_opportunity", label: "Create Task" },
      { icon: "archive", href: "/opportunities", label: "Open Opportunities" }
    ]
  },
  "ai-insights": {
    title: "AI insight data",
    summary: "Turn candidate insights into records, tasks, and briefs here.",
    actions: [
      { icon: "brain", href: "/candidate-intelligence/manage/new?type=ai_insight", label: "Add Insight" },
      { icon: "calendar", href: "/tasks/new?relatedEntityType=candidate_record", label: "Create Task" },
      { icon: "file", href: "/reports/daily-brief/new?type=candidate_insight", label: "Generate Brief" }
    ]
  },
  evidence: {
    title: "Evidence data",
    summary: "Upload proof and sources from the evidence repository tab.",
    actions: [
      { icon: "upload", href: "/evidence/new?relatedEntityType=candidate_record", label: "Upload Evidence" },
      { icon: "file", href: "/sources/new?relatedEntityType=candidate_record", label: "Attach Source" },
      { icon: "archive", href: "/evidence", label: "Open Evidence" }
    ]
  }
};

export function CandidateIntelligenceCenter() {
  const data = candidateIntelligenceData;
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<CandidateTab>("overview");
  const [selectedBioId, setSelectedBioId] = useState(data.biography[2].id);
  const [selectedJourneyId, setSelectedJourneyId] = useState(data.journey[0].id);
  const [selectedRelationId, setSelectedRelationId] = useState(data.relationships.nodes[0].id);
  const [selectedGeoId, setSelectedGeoId] = useState(data.geography[0].id);
  const [achievementCategory, setAchievementCategory] = useState("All");
  const [evidenceType, setEvidenceType] = useState("All");
  const [perceptionView, setPerceptionView] = useState<"monthly" | "quarterly" | "yearly">("monthly");
  const [queuedSwotIds, setQueuedSwotIds] = useState<string[]>([]);
  const [toast, setToast] = useState("");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredAchievements = useMemo(() => {
    return data.achievements.filter((item) => {
      if (achievementCategory !== "All" && item.category !== achievementCategory) return false;
      if (!normalizedQuery) return true;
      return haystack(item).includes(normalizedQuery);
    });
  }, [achievementCategory, data.achievements, normalizedQuery]);

  const filteredEvidence = useMemo(() => {
    return data.evidence.filter((item) => {
      if (evidenceType !== "All" && item.type !== evidenceType) return false;
      if (!normalizedQuery) return true;
      return haystack(item).includes(normalizedQuery);
    });
  }, [data.evidence, evidenceType, normalizedQuery]);

  const selectedBio = data.biography.find((item) => item.id === selectedBioId) ?? data.biography[0];
  const selectedJourney = data.journey.find((item) => item.id === selectedJourneyId) ?? data.journey[0];
  const selectedRelation = data.relationships.nodes.find((item) => item.id === selectedRelationId) ?? data.relationships.nodes[0];
  const selectedGeo = data.geography.find((item) => item.id === selectedGeoId) ?? data.geography[0];

  useEffect(() => {
    function syncTabFromHash() {
      const hash = window.location.hash.replace("#", "");
      if (isCandidateTab(hash)) setActiveTab(hash);
    }

    syncTabFromHash();
    window.addEventListener("hashchange", syncTabFromHash);
    return () => window.removeEventListener("hashchange", syncTabFromHash);
  }, []);

  function action(label: string) {
    setToast(`${label} queued`);
    window.setTimeout(() => setToast(""), 1800);
  }

  function selectTab(tab: CandidateTab) {
    setActiveTab(tab);
    window.history.replaceState(null, "", `#${tab}`);
  }

  function renderActiveTab() {
    if (activeTab === "overview") {
      return (
        <div className="candidate-tab-grid">
          <CandidateSnapshotSection snapshot={data.snapshot} />
          <CandidateSignalBoard data={data} />
          <AiCandidateInsights insights={data.insights.slice(0, 3)} onAction={action} />
        </div>
      );
    }

    if (activeTab === "biography") {
      return (
        <div className="candidate-tab-grid">
          <BiographyTimeline milestones={data.biography} selected={selectedBio} onSelect={setSelectedBioId} />
          <PoliticalJourneyMap events={data.journey} selected={selectedJourney} onSelect={setSelectedJourneyId} />
        </div>
      );
    }

    if (activeTab === "relationships") {
      return (
        <RelationshipGraph
          edges={data.relationships.edges}
          nodes={data.relationships.nodes}
          selected={selectedRelation}
          onSelect={setSelectedRelationId}
        />
      );
    }

    if (activeTab === "organizations") return <OrganizationIntelligence organizations={data.organizations} />;
    if (activeTab === "achievements") {
      return <AchievementLibrary achievements={filteredAchievements} category={achievementCategory} onCategoryChange={setAchievementCategory} />;
    }
    if (activeTab === "perception") {
      return (
        <PublicPerceptionDashboard
          current={data.perception.current}
          points={data.perception[perceptionView]}
          view={perceptionView}
          onViewChange={setPerceptionView}
        />
      );
    }
    if (activeTab === "community-support") return <CommunitySupportAnalysis support={data.communitySupport} />;
    if (activeTab === "geography") return <GeographicSupportMap areas={data.geography} selected={selectedGeo} onSelect={setSelectedGeoId} />;
    if (activeTab === "swot") {
      return (
        <SwotEngine
          items={data.swot}
          queuedIds={queuedSwotIds}
          onQueue={(id) => setQueuedSwotIds((current) => (current.includes(id) ? current : [...current, id]))}
        />
      );
    }
    if (activeTab === "media") {
      return (
        <div className="candidate-tab-grid">
          <MediaIntelligence media={data.media} />
          <SocialMediaIntelligence social={data.social} />
        </div>
      );
    }
    if (activeTab === "elections") return <ElectionPerformance performance={data.electionPerformance} />;
    if (activeTab === "risks") return <CandidateRiskRegister risks={data.risks} />;
    if (activeTab === "opportunities") return <CandidateOpportunityRegister opportunities={data.opportunities} />;
    if (activeTab === "ai-insights") return <AiCandidateInsights insights={data.insights} onAction={action} />;
    return <EvidenceRepository evidence={filteredEvidence} evidenceType={evidenceType} onEvidenceTypeChange={setEvidenceType} />;
  }

  return (
    <PlatformShell activeCoreModule="political-intelligence" activePoliticalSection="candidate-intelligence">
      <header className="candidate-header">
        <div>
          <span className="eyebrow">Uday Sangle master dossier</span>
          <h1>Candidate Intelligence Center</h1>
          <p>Candidate overview screen with tabbed political, social, organizational, perception, and evidence intelligence.</p>
        </div>
        <label className="global-search candidate-search">
          <Search size={18} />
          <input
            aria-label="Candidate intelligence search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search achievements, events, documents, media, relationships, organizations"
          />
        </label>
      </header>

      <main className="candidate-workspace unified-candidate-workspace">
        <CandidateActionStrip activeTab={activeTab} onAction={action} />
        <CandidateTabNavigation activeTab={activeTab} onSelect={selectTab} />
        <section className="candidate-tab-panel" id={activeTab}>
          {renderActiveTab()}
        </section>
      </main>
      {toast ? <div className="toast">{toast}</div> : null}
    </PlatformShell>
  );
}

function isCandidateTab(value: string): value is CandidateTab {
  return candidateTabs.some(([tab]) => tab === value);
}

function CandidateActionStrip({ activeTab, onAction }: { activeTab: CandidateTab; onAction: (label: string) => void }) {
  const panel = candidateActionPanels[activeTab];

  return (
    <section className="candidate-action-strip" aria-label="Candidate intelligence submodule actions">
      <div className="candidate-action-context">
        <span className="eyebrow">Submodule data</span>
        <strong>{panel.title}</strong>
        <p>{panel.summary}</p>
      </div>
      <div className="candidate-action-controls">
        {panel.actions.map((item) => (
          <ActionLink icon={candidateActionIcon(item.icon)} href={item.href} key={item.label} label={item.label} />
        ))}
        <ActionButton icon={<Download size={16} />} label="Export Dossier" onClick={onAction} />
        <ActionButton icon={<Share2 size={16} />} label="Share Intelligence" onClick={onAction} />
      </div>
    </section>
  );
}

function candidateActionIcon(icon: CandidateActionIcon) {
  if (icon === "archive") return <Archive size={16} />;
  if (icon === "brain") return <BrainCircuit size={16} />;
  if (icon === "briefcase") return <BriefcaseBusiness size={16} />;
  if (icon === "calendar") return <CalendarDays size={16} />;
  if (icon === "file") return <FileText size={16} />;
  if (icon === "map") return <MapPinned size={16} />;
  if (icon === "message") return <MessageSquareText size={16} />;
  if (icon === "network") return <Network size={16} />;
  if (icon === "shield") return <ShieldAlert size={16} />;
  if (icon === "sparkles") return <Sparkles size={16} />;
  if (icon === "upload") return <Upload size={16} />;
  if (icon === "users") return <Users size={16} />;
  return <Plus size={16} />;
}

function CandidateTabNavigation({
  activeTab,
  onSelect
}: {
  activeTab: CandidateTab;
  onSelect: (tab: CandidateTab) => void;
}) {
  return (
    <nav className="candidate-tab-nav" aria-label="Candidate Intelligence internal tabs">
      {candidateTabs.map(([tab, label]) => (
        <button className={activeTab === tab ? "is-active" : ""} key={tab} onClick={() => onSelect(tab)} type="button">
          {label}
        </button>
      ))}
    </nav>
  );
}

function CandidateSignalBoard({ data }: { data: typeof candidateIntelligenceData }) {
  const topRisk = data.risks[0];
  const farmerSupport = data.communitySupport.find((item) => item.community === "Farmers") ?? data.communitySupport[0];
  const election = data.electionPerformance[0];
  const topInsight = data.insights[0];
  const opponentThreat = data.swot.find((item) => item.item.includes("Kokate")) ?? data.swot.find((item) => item.category === "Threats");

  return (
    <section className="command-priority-grid candidate-signal-board" aria-label="Candidate intelligence dominant signals">
      <article className="priority-hero political-risk">
        <span className="eyebrow">Political Risks</span>
        <h2>{topRisk.risk}</h2>
        <PriorityChip value={topRisk.severity} />
        <p>{topRisk.mitigation}</p>
      </article>
      <article className="priority-hero community-sentiment">
        <span className="eyebrow">Community Sentiment</span>
        <strong>{farmerSupport.sentiment}</strong>
        <p>{farmerSupport.community} support is {farmerSupport.support}% with {farmerSupport.confidence}% confidence.</p>
      </article>
      <article className="priority-hero opponent-movement">
        <span className="eyebrow">Opponent Movement</span>
        <h2>{opponentThreat?.item ?? "Opponent pressure watch"}</h2>
        <p>{opponentThreat?.owner ?? "Political Desk"} / {opponentThreat?.status ?? "Monitoring"}</p>
      </article>
      <article className="priority-hero election-readiness">
        <span className="eyebrow">Election Readiness</span>
        <h2>{election.votes}</h2>
        <p>{election.sourceStatus}</p>
      </article>
      <article className="priority-hero ai-recommendation">
        <span className="eyebrow">AI Recommendations</span>
        <h2>{topInsight.title}</h2>
        <p>{topInsight.action}</p>
      </article>
    </section>
  );
}

function CandidateRiskRegister({ risks }: { risks: RiskRegisterItem[] }) {
  return (
    <section className="panel candidate-panel" id="candidate-risk-register">
      <SectionHeader title="Political Risk Register" eyebrow="Opponent, media, legal, reputation, party risk" actions={<ShieldAlert size={18} />} />
      <div className="register-list">
        {risks.map((risk) => (
          <article className={`register-item ${severityClass(risk.severity)}`} key={risk.id}>
            <div><PriorityChip value={risk.severity} /><strong>{risk.probability}/{risk.impact}</strong></div>
            <h3>{risk.risk}</h3>
            <p>{risk.mitigation}</p>
            <span>{risk.owner} / {risk.status}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function CandidateOpportunityRegister({ opportunities }: { opportunities: typeof candidateIntelligenceData.opportunities }) {
  return (
    <section className="panel candidate-panel" id="candidate-opportunity-register">
      <SectionHeader title="Political Opportunity Register" eyebrow="Impact, community, geography, expected vote impact" actions={<Sparkles size={18} />} />
      <div className="register-list">
        {opportunities.map((opportunity) => (
          <article className={`register-item ${severityClass(opportunity.priority)}`} key={opportunity.id}>
            <div><PriorityChip value={opportunity.priority} /><strong>{opportunity.expectedVoteImpact}</strong></div>
            <h3>{opportunity.opportunity}</h3>
            <p>{opportunity.potentialImpact}</p>
            <span>{opportunity.targetCommunity} / {opportunity.targetGeography} / {opportunity.owner}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function CandidateSnapshotSection({ snapshot }: { snapshot: typeof candidateIntelligenceData.snapshot }) {
  return (
    <section className="candidate-snapshot" id="candidate-snapshot">
      <div className="candidate-photo">
        <Camera size={26} />
        <strong>US</strong>
        <span>{snapshot.photoStatus}</span>
      </div>
      <div className="snapshot-core">
        <span className="eyebrow">Candidate snapshot</span>
        <h2>{snapshot.fullName}</h2>
        <p>{snapshot.designation}</p>
        <div className="snapshot-grid">
          <span>
            Party <b>{snapshot.party}</b>
          </span>
          <span>
            Constituency <b>{snapshot.constituency}</b>
          </span>
          <span>
            Age <b>{snapshot.age}</b>
          </span>
          <span>
            Political Experience <b>{snapshot.politicalExperience}</b>
          </span>
          <span>
            Current Position <b>{snapshot.currentPosition}</b>
          </span>
          <span>
            Election Status <b>{snapshot.electionStatus}</b>
          </span>
        </div>
      </div>
      <div className="snapshot-metrics">
        {snapshot.metrics.map((metric) => (
          <article className="metric-cell compact" key={metric.label}>
            <div className="metric-label">{metric.label}</div>
            <div className="metric-value-row">
              <strong>{metric.value}</strong>
              <span className={`trend-chip ${trendClass(metric.trend)}`}>
                {metric.trend} {typeof metric.change === "number" ? `${signed(metric.change)}%` : ""}
              </span>
            </div>
            {metric.previous ? <div className="metric-meta">Prev {metric.previous}</div> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function BiographyTimeline({
  milestones,
  selected,
  onSelect
}: {
  milestones: DossierMilestone[];
  selected: DossierMilestone;
  onSelect: (id: string) => void;
}) {
  return (
    <section className="panel candidate-panel" id="political-biography">
      <SectionHeader title="Political Biography" eyebrow="Expandable evidence timeline" actions={<CountPill>{milestones.length} milestones</CountPill>} />
      <div className="bio-layout">
        <div className="bio-timeline">
          {milestones.map((milestone) => (
            <button
              className={`bio-node ${milestone.id === selected.id ? "is-selected" : ""}`}
              key={milestone.id}
              onClick={() => onSelect(milestone.id)}
              type="button"
            >
              <span>{milestone.date}</span>
              <strong>{milestone.title}</strong>
              <small>{milestone.category}</small>
            </button>
          ))}
        </div>
        <div className="bio-detail">
          <span className="category-chip">{selected.category}</span>
          <h3>{selected.title}</h3>
          <p>{selected.description}</p>
          <dl>
            <div>
              <dt>Evidence</dt>
              <dd>{selected.evidence}</dd>
            </div>
            <div>
              <dt>Media</dt>
              <dd>{selected.mediaReferences}</dd>
            </div>
            <div>
              <dt>Documents</dt>
              <dd>{selected.documents}</dd>
            </div>
            <div>
              <dt>Confidence</dt>
              <dd>{selected.confidence}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

function PoliticalJourneyMap({
  events,
  selected,
  onSelect
}: {
  events: JourneyEvent[];
  selected: JourneyEvent;
  onSelect: (id: string) => void;
}) {
  const lanes = ["Organization", "Party", "Election", "Achievement", "Risk"];
  return (
    <section className="panel candidate-panel" id="journey-map">
      <SectionHeader title="Political Journey Map" eyebrow="Organizations, parties, elections, risks" actions={<GitBranch size={18} />} />
      <div className="journey-stage">
        {lanes.map((lane, index) => (
          <div className="journey-lane" key={lane} style={{ top: `${16 + index * 17}%` }}>
            <span>{lane}</span>
          </div>
        ))}
        {events.map((event) => {
          const laneIndex = lanes.indexOf(event.lane);
          return (
            <button
              className={`journey-event lane-${event.lane.toLowerCase()} ${event.id === selected.id ? "is-selected" : ""}`}
              key={event.id}
              onClick={() => onSelect(event.id)}
              style={{ left: `${event.x}%`, top: `${14 + laneIndex * 17}%` }}
              type="button"
            >
              <span>{event.date}</span>
              <strong>{event.title}</strong>
            </button>
          );
        })}
      </div>
      <div className="journey-detail">
        <span className="category-chip">{selected.lane}</span>
        <h3>{selected.title}</h3>
        <p>{selected.description}</p>
        <small>{selected.evidence} / {selected.documents}</small>
      </div>
    </section>
  );
}

function RelationshipGraph({
  nodes,
  edges,
  selected,
  onSelect
}: {
  nodes: RelationshipNode[];
  edges: { from: string; to: string; strength: number; relationship: string }[];
  selected: RelationshipNode;
  onSelect: (id: string) => void;
}) {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  return (
    <section className="panel candidate-panel" id="relationship-map">
      <SectionHeader title="Family & Relationship Intelligence" eyebrow="Family, organizations, workers, media" actions={<Network size={18} />} />
      <div className="candidate-network-stage">
        <svg viewBox="0 0 100 100" aria-label="Candidate relationship graph">
          {edges.map((edge) => {
            const from = nodeMap.get(edge.from);
            const to = nodeMap.get(edge.to);
            if (!from || !to) return null;
            return <line key={`${edge.from}-${edge.to}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} className={`rel-${edge.relationship.toLowerCase()}`} style={{ strokeWidth: Math.max(1, edge.strength / 32) }} />;
          })}
        </svg>
        {nodes.map((node) => (
          <button
            className={`candidate-node node-${node.type} rel-${node.relationship.toLowerCase()} ${node.id === selected.id ? "is-selected" : ""}`}
            key={node.id}
            onClick={() => onSelect(node.id)}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            type="button"
          >
            <span />
            <b>{node.label}</b>
          </button>
        ))}
      </div>
      <div className="network-detail">
        <span>{selected.type} / {selected.relationship}</span>
        <h3>{selected.label}</h3>
        <p>Influence {selected.influence}. Network reach {selected.reach}. Relationship strength is intelligence, not a public claim.</p>
      </div>
    </section>
  );
}

function OrganizationIntelligence({ organizations }: { organizations: OrganizationRecord[] }) {
  return (
    <section className="panel candidate-panel" id="organization-intelligence">
      <SectionHeader title="Business & Organizational Intelligence" eyebrow="Companies, trusts, NGOs, sports, worker networks" actions={<BriefcaseBusiness size={18} />} />
      <div className="organization-grid">
        {organizations.map((org) => (
          <article className="org-card" key={org.id}>
            <span className="category-chip">{org.type}</span>
            <h3>{org.name}</h3>
            <p>{org.role}</p>
            <div className="mini-meter"><span style={{ width: `${org.influence}%` }} /></div>
            <dl>
              <div><dt>Reach</dt><dd>{org.reach}</dd></div>
              <div><dt>Status</dt><dd>{org.status}</dd></div>
              <div><dt>Relationships</dt><dd>{org.relationships}</dd></div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

function AchievementLibrary({
  achievements,
  category,
  onCategoryChange
}: {
  achievements: AchievementRecord[];
  category: string;
  onCategoryChange: (category: string) => void;
}) {
  return (
    <section className="panel candidate-panel" id="achievement-intelligence">
      <SectionHeader title="Achievement Intelligence" eyebrow="Evidence-backed categorized library" actions={<CountPill>{achievements.length} records</CountPill>} />
      <div className="tab-strip">
        {achievementCategories.map((item) => (
          <button className={item === category ? "is-active" : ""} key={item} onClick={() => onCategoryChange(item)} type="button">{item}</button>
        ))}
      </div>
      <div className="achievement-grid">
        {achievements.length ? achievements.map((achievement) => (
          <article className="achievement-card" key={achievement.id}>
            <span className="category-chip">{achievement.category}</span>
            <h3>{achievement.title}</h3>
            <p>{achievement.description}</p>
            <dl>
              <div><dt>Location</dt><dd>{achievement.location}</dd></div>
              <div><dt>Impact</dt><dd>{achievement.impact}</dd></div>
              <div><dt>Evidence</dt><dd>{achievement.evidence}</dd></div>
              <div><dt>Media</dt><dd>{achievement.mediaCoverage}</dd></div>
              <div><dt>Docs</dt><dd>{achievement.documents}</dd></div>
            </dl>
          </article>
        )) : <EmptyState title="No achievements in this view" body="Change category or search to recover records." />}
      </div>
    </section>
  );
}

function PublicPerceptionDashboard({
  current,
  points,
  view,
  onViewChange
}: {
  current: { positive: number; neutral: number; negative: number; trust: number; popularity: number; acceptance: number };
  points: PerceptionPoint[];
  view: "monthly" | "quarterly" | "yearly";
  onViewChange: (view: "monthly" | "quarterly" | "yearly") => void;
}) {
  return (
    <section className="panel candidate-panel" id="perception-dashboard">
      <SectionHeader title="Public Perception Dashboard" eyebrow="Sentiment, trust, popularity, acceptance" />
      <div className="perception-layout">
        <div className="perception-current">
          <div><strong>{current.positive}%</strong><span>Positive</span></div>
          <div><strong>{current.neutral}%</strong><span>Neutral</span></div>
          <div><strong>{current.negative}%</strong><span>Negative</span></div>
          <div><strong>{current.trust}</strong><span>Trust</span></div>
          <div><strong>{current.popularity}</strong><span>Popularity</span></div>
          <div><strong>{current.acceptance}</strong><span>Acceptance</span></div>
        </div>
        <div className="perception-chart">
          <div className="segmented-control compact">
            {(["monthly", "quarterly", "yearly"] as const).map((item) => (
              <button className={view === item ? "seg-btn is-active" : "seg-btn"} key={item} onClick={() => onViewChange(item)} type="button">{item}</button>
            ))}
          </div>
          <div className="bar-chart">
            {points.map((point) => (
              <div className="bar-group" key={point.label}>
                <span className="bar positive" style={{ height: `${point.positive}%` }} />
                <span className="bar neutral" style={{ height: `${point.neutral}%` }} />
                <span className="bar negative" style={{ height: `${point.negative}%` }} />
                <b style={{ bottom: `${point.trust}%` }}>{point.trust}</b>
                <small>{point.label}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CommunitySupportAnalysis({ support }: { support: CommunitySupport[] }) {
  return (
    <section className="panel candidate-panel" id="community-support">
      <SectionHeader title="Community Support Analysis" eyebrow="Support, sentiment, trend, confidence" />
      <div className="community-grid">
        {support.map((item) => (
          <article className="community-card" key={item.community}>
            <div><strong>{item.community}</strong><span className={`trend-chip ${trendClass(item.trend)}`}>{item.trend}</span></div>
            <div className="support-row"><span>Support</span><div><i className={scoreBand(item.support)} style={{ width: `${item.support}%` }} /></div><b>{item.support}%</b></div>
            <div className="support-row"><span>Sentiment</span><div><i className={scoreBand(item.sentiment)} style={{ width: `${item.sentiment}%` }} /></div><b>{item.sentiment}</b></div>
            <div className="support-row"><span>Confidence</span><div><i className={scoreBand(item.confidence)} style={{ width: `${item.confidence}%` }} /></div><b>{item.confidence}</b></div>
          </article>
        ))}
      </div>
    </section>
  );
}

function GeographicSupportMap({
  areas,
  selected,
  onSelect
}: {
  areas: GeographySupport[];
  selected: GeographySupport;
  onSelect: (id: string) => void;
}) {
  return (
    <section className="panel candidate-panel" id="geographic-support">
      <SectionHeader title="Geographic Support Map" eyebrow="Strong, weak, swing, growth, risk areas" actions={<MapPinned size={18} />} />
      <div className="geo-support-layout">
        <div className="map-stage candidate-heatmap">
          <svg className="constituency-map" viewBox="0 0 100 100" aria-label="Candidate support heat map">
            <path d="M16,18 L48,9 L76,16 L91,39 L83,72 L61,91 L31,86 L10,62 L7,35 Z" />
            <path d="M29,22 L52,18 L73,28 L77,50 L65,68 L43,75 L25,61 L19,40 Z" />
            <path d="M50,12 L51,89" />
            <path d="M13,58 L88,40" />
          </svg>
          {areas.map((area) => (
            <button
              className={`map-marker support-${area.classification.toLowerCase()} ${area.id === selected.id ? "is-selected" : ""}`}
              key={area.id}
              onClick={() => onSelect(area.id)}
              style={{ left: `${area.x}%`, top: `${area.y}%`, width: 12 + area.support / 7, height: 12 + area.support / 7 }}
              type="button"
            >
              <span>{area.name}</span>
            </button>
          ))}
        </div>
        <div className="map-detail">
          <span>{selected.classification}</span>
          <h3>{selected.name}</h3>
          <dl>
            <div><dt>Support</dt><dd>{selected.support}%</dd></div>
            <div><dt>Booth</dt><dd>{selected.booth}</dd></div>
            <div><dt>Ward</dt><dd>{selected.ward}</dd></div>
            <div><dt>Community</dt><dd>{selected.community}</dd></div>
          </dl>
          <p>{selected.note}</p>
        </div>
      </div>
    </section>
  );
}

function SwotEngine({
  items,
  queuedIds,
  onQueue
}: {
  items: SwotItem[];
  queuedIds: string[];
  onQueue: (id: string) => void;
}) {
  const categories: SwotItem["category"][] = ["Strengths", "Weaknesses", "Opportunities", "Threats"];
  return (
    <section className="panel candidate-panel" id="swot">
      <SectionHeader title="SWOT Analysis" eyebrow="Priority, impact, owner, status, review date" actions={<Sparkles size={18} />} />
      <div className="swot-grid">
        {categories.map((category) => (
          <div className={`swot-column swot-${category.toLowerCase()}`} key={category}>
            <h3>{category}</h3>
            {items.filter((item) => item.category === category).map((item) => (
              <article className="swot-item" key={item.id}>
                <div><PriorityChip value={item.priority} /><strong>{item.impact}</strong></div>
                <p>{item.item}</p>
                <span>{item.owner} / {queuedIds.includes(item.id) ? "Review queued" : item.status}</span>
                <button type="button" onClick={() => onQueue(item.id)}>
                  <CheckCircle2 size={14} />
                  Review {item.reviewDate}
                </button>
              </article>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function MediaIntelligence({ media }: { media: MediaSignal[] }) {
  return (
    <section className="panel candidate-panel" id="media-intelligence">
      <SectionHeader title="Media Intelligence" eyebrow="Coverage, sentiment, reach, influence" />
      <div className="media-grid">
        {media.map((item) => (
          <article className="media-card" key={item.channel}>
            <span className="category-chip">{item.channel}</span>
            <strong>{item.coverage}</strong>
            <div className="mini-meter"><span style={{ width: `${item.sentiment}%` }} /></div>
            <p>{item.topItem}</p>
            <small>{item.reach} / influence {item.influence}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function SocialMediaIntelligence({ social }: { social: SocialSignal[] }) {
  return (
    <section className="panel candidate-panel" id="social-intelligence">
      <SectionHeader title="Social Media Intelligence" eyebrow="Followers, reach, engagement, growth, sentiment" />
      <div className="social-grid">
        {social.map((item) => (
          <article className="social-card" key={item.platform}>
            <h3>{item.platform}</h3>
            <dl>
              <div><dt>Followers</dt><dd>{item.followers}</dd></div>
              <div><dt>Reach</dt><dd>{item.reach}</dd></div>
              <div><dt>Engagement</dt><dd>{item.engagement}</dd></div>
              <div><dt>Growth</dt><dd>{item.growth}</dd></div>
              <div><dt>Sentiment</dt><dd>{item.sentiment}</dd></div>
            </dl>
            <p>{item.topContent}</p>
            <small>{item.audienceBreakdown}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function ElectionPerformance({ performance }: { performance: typeof candidateIntelligenceData.electionPerformance }) {
  return (
    <section className="panel candidate-panel" id="election-performance">
      <SectionHeader title="Election Performance" eyebrow="Votes, vote share, margins, turnout, opponent" />
      <div className="table-scroll">
        <table>
          <thead><tr><th>Year</th><th>Election</th><th>Votes</th><th>Vote Share</th><th>Margin</th><th>Turnout</th><th>Opponent</th><th>Source</th></tr></thead>
          <tbody>
            {performance.map((item) => (
              <tr key={`${item.year}-${item.election}`}>
                <td>{item.year}</td><td>{item.election}</td><td>{item.votes}</td><td>{item.voteShare}</td><td>{item.margin}</td><td>{item.turnout}</td><td>{item.opponent}</td><td>{item.sourceStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function RiskOpportunityRegisters({
  risks,
  opportunities
}: {
  risks: RiskRegisterItem[];
  opportunities: typeof candidateIntelligenceData.opportunities;
}) {
  return (
    <section className="candidate-register-grid">
      <div className="panel candidate-panel" id="candidate-risk-register">
        <SectionHeader title="Political Risk Register" eyebrow="Opponent, media, legal, reputation, party risk" />
        <div className="register-list">
          {risks.map((risk) => (
            <article className={`register-item ${severityClass(risk.severity)}`} key={risk.id}>
              <div><PriorityChip value={risk.severity} /><strong>{risk.probability}/{risk.impact}</strong></div>
              <h3>{risk.risk}</h3>
              <p>{risk.mitigation}</p>
              <span>{risk.owner} / {risk.status}</span>
            </article>
          ))}
        </div>
      </div>
      <div className="panel candidate-panel" id="candidate-opportunity-register">
        <SectionHeader title="Political Opportunity Register" eyebrow="Impact, community, geography, expected vote impact" />
        <div className="register-list">
          {opportunities.map((opportunity) => (
            <article className={`register-item ${severityClass(opportunity.priority)}`} key={opportunity.id}>
              <div><PriorityChip value={opportunity.priority} /><strong>{opportunity.expectedVoteImpact}</strong></div>
              <h3>{opportunity.opportunity}</h3>
              <p>{opportunity.potentialImpact}</p>
              <span>{opportunity.targetCommunity} / {opportunity.targetGeography} / {opportunity.owner}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AiCandidateInsights({ insights, onAction }: { insights: CandidateInsight[]; onAction: (label: string) => void }) {
  return (
    <section className="panel candidate-panel" id="ai-candidate-insights">
      <SectionHeader title="AI Candidate Insights" eyebrow="Strengths, weaknesses, concerns, actions" actions={<BrainCircuit size={18} />} />
      <div className="insight-grid">
        {insights.map((insight) => (
          <article className={`insight-card ${severityClass(insight.priority)}`} key={insight.id}>
            <div><span className="category-chip">{insight.type}</span><PriorityChip value={insight.priority} /></div>
            <h3>{insight.title}</h3>
            <p>{insight.detail}</p>
            <button className="action-btn" type="button" onClick={() => onAction(insight.action)}>
              <BrainCircuit size={16} />
              <span>{insight.action}</span>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function EvidenceRepository({
  evidence,
  evidenceType,
  onEvidenceTypeChange
}: {
  evidence: EvidenceItem[];
  evidenceType: string;
  onEvidenceTypeChange: (type: string) => void;
}) {
  return (
    <section className="panel candidate-panel" id="evidence-repository">
      <SectionHeader title="Evidence Repository" eyebrow="Images, videos, documents, certificates, letters, media, reports" actions={<Archive size={18} />} />
      <div className="tab-strip">
        {evidenceTypes.map((type) => (
          <button className={type === evidenceType ? "is-active" : ""} key={type} onClick={() => onEvidenceTypeChange(type)} type="button">{type}</button>
        ))}
      </div>
      <div className="evidence-grid">
        {evidence.length ? evidence.map((item) => (
          <article className="evidence-card" key={item.id}>
            <span className="category-chip">{item.type}</span>
            <h3>{item.title}</h3>
            <p>{item.category}</p>
            <dl>
              <div><dt>Source</dt><dd>{item.source}</dd></div>
              <div><dt>Status</dt><dd>{item.status}</dd></div>
              <div><dt>Date</dt><dd>{item.date}</dd></div>
            </dl>
          </article>
        )) : <EmptyState title="No evidence in this view" body="Change type or search to recover repository records." />}
      </div>
    </section>
  );
}

function ActionButton({ icon, label, onClick }: { icon: ReactNode; label: string; onClick: (label: string) => void }) {
  return (
    <button className="action-panel-btn" type="button" onClick={() => onClick(label)}>
      {icon}
      <span>{label}</span>
    </button>
  );
}

function ActionLink({ icon, label, href }: { icon: ReactNode; label: string; href: string }) {
  return (
    <a className="action-panel-btn" href={href}>
      {icon}
      <span>{label}</span>
    </a>
  );
}

function haystack(value: unknown) {
  return JSON.stringify(value).toLowerCase();
}
