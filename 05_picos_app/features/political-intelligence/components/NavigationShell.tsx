import {
  Activity,
  AlertTriangle,
  BrainCircuit,
  CalendarDays,
  Crosshair,
  MapPinned,
  Network,
  Radar,
  Search,
  ShieldAlert,
  Target,
  Users
} from "lucide-react";
import type { SearchResult } from "../types";
import { EmptyState } from "./common";

const navItems = [
  { label: "Overview", href: "#overview", icon: Activity },
  { label: "Live Feed", href: "#live-feed", icon: Radar },
  { label: "Alerts", href: "#alerts", icon: ShieldAlert },
  { label: "Matrix", href: "#risk-matrix", icon: Crosshair },
  { label: "Sentiment", href: "#sentiment", icon: Users },
  { label: "Opponents", href: "#opponents", icon: AlertTriangle },
  { label: "Power Centers", href: "#power-centers", icon: Network },
  { label: "Map", href: "#geo-map", icon: MapPinned },
  { label: "Risks", href: "#top-risks", icon: ShieldAlert },
  { label: "Opportunities", href: "#top-opportunities", icon: Target },
  { label: "Events", href: "#events", icon: CalendarDays },
  { label: "AI Strategy", href: "#ai-recommendations", icon: BrainCircuit }
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand-block">
        <div className="brand-mark">PI</div>
        <div>
          <strong>PICOS</strong>
          <span>Political Intel</span>
        </div>
      </div>
      <nav className="left-nav" aria-label="Political intelligence sections">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a href={item.href} key={item.href}>
              <Icon size={16} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>
      <div className="nav-footer">
        <span className="status-dot" />
        <span>Internal command mode</span>
      </div>
    </aside>
  );
}

export function CommandHeader({
  query,
  onQueryChange,
  results,
  dataStatus,
  sourceDiscipline
}: {
  query: string;
  onQueryChange: (value: string) => void;
  results: SearchResult[];
  dataStatus: string;
  sourceDiscipline: string;
}) {
  return (
    <header className="command-header">
      <div className="title-block">
        <span className="eyebrow">Sinnar political war room</span>
        <h1>Political Intelligence Command Center</h1>
        <p>Real-time political environment, risks, opportunities, sentiment, and intelligence monitoring.</p>
      </div>

      <div className="header-tools">
        <label className="global-search">
          <Search size={18} />
          <input
            aria-label="Global search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search people, villages, booths, issues, events, media"
          />
        </label>
        <div className="source-chip" title={sourceDiscipline}>
          {dataStatus}
        </div>
      </div>

      {query ? <SearchResults results={results} /> : null}
    </header>
  );
}

function SearchResults({ results }: { results: SearchResult[] }) {
  return (
    <div className="search-results-panel">
      <div className="search-results-head">
        <strong>Search results</strong>
        <span>{results.length} matches</span>
      </div>
      {results.length ? (
        results.slice(0, 8).map((result) => (
          <a className="search-result" href={hrefForResult(result)} key={`${result.kind}-${result.id}`}>
            <span>{result.kind}</span>
            <strong>{result.title}</strong>
            <small>{result.subtitle}</small>
          </a>
        ))
      ) : (
        <EmptyState title="No search matches" body="Try a village, opponent, issue, party, source, or team name." />
      )}
    </div>
  );
}

function hrefForResult(result: SearchResult) {
  if (result.kind === "Feed") return "#live-feed";
  if (result.kind === "Alert") return "#alerts";
  if (result.kind === "Village") return "#geo-map";
  if (result.kind === "Power Center") return "#power-centers";
  if (result.kind === "Opponent") return "#opponents";
  if (result.kind === "Risk") return "#top-risks";
  if (result.kind === "Opportunity") return "#top-opportunities";
  if (result.kind === "Event") return "#events";
  return "#ai-recommendations";
}
