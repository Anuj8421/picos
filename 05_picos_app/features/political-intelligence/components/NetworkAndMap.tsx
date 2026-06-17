import { MapPinned, Network, ZoomIn, ZoomOut } from "lucide-react";
import type { MapMode, PowerCenterEdge, PowerCenterNode, VillageSignal } from "../types";
import { SectionHeader } from "./common";

export function PowerCentersNetwork({
  nodes,
  edges,
  selectedNodeId,
  zoom,
  onSelectNode,
  onZoom
}: {
  nodes: PowerCenterNode[];
  edges: PowerCenterEdge[];
  selectedNodeId: string;
  zoom: number;
  onSelectNode: (id: string) => void;
  onZoom: (direction: "in" | "out") => void;
}) {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const selected = nodeMap.get(selectedNodeId) ?? nodes[0];

  return (
    <section className="panel network-panel" id="power-centers">
      <SectionHeader
        title="Political Power Centers"
        eyebrow="Influence relationships"
        actions={
          <div className="icon-button-row">
            <button className="icon-btn" type="button" onClick={() => onZoom("out")} aria-label="Zoom out">
              <ZoomOut size={16} />
            </button>
            <button className="icon-btn" type="button" onClick={() => onZoom("in")} aria-label="Zoom in">
              <ZoomIn size={16} />
            </button>
          </div>
        }
      />
      <div className="network-stage">
        <div className="network-layer" style={{ transform: `scale(${zoom})` }}>
          <svg className="network-svg" viewBox="0 0 100 100" role="img" aria-label="Power center relationship map">
            {edges.map((edge) => {
              const from = nodeMap.get(edge.from);
              const to = nodeMap.get(edge.to);
              if (!from || !to) return null;
              return (
                <line
                  className="network-edge"
                  key={`${edge.from}-${edge.to}`}
                  style={{ strokeWidth: Math.max(1, edge.strength / 34) }}
                  x1={from.x}
                  x2={to.x}
                  y1={from.y}
                  y2={to.y}
                />
              );
            })}
          </svg>
          {nodes.map((node) => {
            const radius = 8 + node.influence / 18;
            return (
              <button
                className={`network-node node-${node.type} ${node.id === selected.id ? "is-selected" : ""}`}
                key={node.id}
                onClick={() => onSelectNode(node.id)}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                type="button"
              >
                <span style={{ width: radius, height: radius }} />
                <b>{node.label}</b>
              </button>
            );
          })}
        </div>
      </div>
      <div className="network-detail">
        <span>
          <Network size={14} />
          {selected.type}
        </span>
        <h3>{selected.label}</h3>
        <p>Influence weight {selected.influence}. Relationship strength is directional intelligence and needs local validation for operational use.</p>
      </div>
    </section>
  );
}

export function GeographicIntelligenceMap({
  villages,
  selectedVillageId,
  mode,
  zoom,
  onModeChange,
  onSelectVillage,
  onZoom
}: {
  villages: VillageSignal[];
  selectedVillageId: string;
  mode: MapMode;
  zoom: number;
  onModeChange: (mode: MapMode) => void;
  onSelectVillage: (id: string) => void;
  onZoom: (direction: "in" | "out") => void;
}) {
  const selected = villages.find((village) => village.id === selectedVillageId) ?? villages[0];
  const modes: MapMode[] = ["Risk", "Opportunity", "Sentiment", "Influence", "Events"];

  return (
    <section className="panel geo-panel" id="geo-map">
      <SectionHeader
        title="Geographic Intelligence Map"
        eyebrow="Villages, issues, sentiment, influence"
        actions={
          <div className="icon-button-row">
            <button className="icon-btn" type="button" onClick={() => onZoom("out")} aria-label="Zoom out">
              <ZoomOut size={16} />
            </button>
            <button className="icon-btn" type="button" onClick={() => onZoom("in")} aria-label="Zoom in">
              <ZoomIn size={16} />
            </button>
          </div>
        }
      />
      <div className="map-toolbar">
        <div className="segmented-control">
          {modes.map((item) => (
            <button
              className={`seg-btn ${mode === item ? "is-active" : ""}`}
              key={item}
              onClick={() => onModeChange(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="map-stage">
        <div className="map-layer" style={{ transform: `scale(${zoom})` }}>
          <svg className="constituency-map" viewBox="0 0 100 100" aria-label="Abstract Sinnar constituency map">
            <path d="M16,18 L48,9 L76,16 L91,39 L83,72 L61,91 L31,86 L10,62 L7,35 Z" />
            <path d="M29,22 L52,18 L73,28 L77,50 L65,68 L43,75 L25,61 L19,40 Z" />
            <path d="M50,12 L51,89" />
            <path d="M13,58 L88,40" />
          </svg>
          {villages.map((village) => {
            const value = mapValue(village, mode);
            const radius = mode === "Events" ? 10 + village.events * 1.2 : 10 + value / 10;
            return (
              <button
                className={`map-marker ${mapColor(value, mode)} ${village.id === selected.id ? "is-selected" : ""}`}
                key={village.id}
                onClick={() => onSelectVillage(village.id)}
                style={{ left: `${village.x}%`, top: `${village.y}%`, width: radius, height: radius }}
                type="button"
              >
                <span>{village.name}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="map-detail">
        <span>
          <MapPinned size={14} />
          {mode} mode
        </span>
        <h3>{selected.name}</h3>
        <dl>
          <div>
            <dt>Risk</dt>
            <dd>{selected.risk}</dd>
          </div>
          <div>
            <dt>Opportunity</dt>
            <dd>{selected.opportunity}</dd>
          </div>
          <div>
            <dt>Sentiment</dt>
            <dd>{selected.sentiment}</dd>
          </div>
          <div>
            <dt>Influence</dt>
            <dd>{selected.influence}</dd>
          </div>
          <div>
            <dt>Events</dt>
            <dd>{selected.events}</dd>
          </div>
          <div>
            <dt>Booths</dt>
            <dd>{selected.booths}</dd>
          </div>
        </dl>
        <p>{selected.topIssue}</p>
      </div>
    </section>
  );
}

function mapValue(village: VillageSignal, mode: MapMode) {
  if (mode === "Risk") return village.risk;
  if (mode === "Opportunity") return village.opportunity;
  if (mode === "Sentiment") return village.sentiment;
  if (mode === "Influence") return village.influence;
  return village.events;
}

function mapColor(value: number, mode: MapMode) {
  if (mode === "Risk") return value >= 65 ? "map-hot" : value >= 50 ? "map-warm" : "map-cool";
  if (mode === "Opportunity") return value >= 70 ? "map-good" : value >= 55 ? "map-watch" : "map-cool";
  if (mode === "Sentiment") return value >= 60 ? "map-good" : value >= 50 ? "map-watch" : "map-cold";
  if (mode === "Influence") return value >= 70 ? "map-good" : value >= 55 ? "map-watch" : "map-cold";
  return value >= 6 ? "map-hot" : value >= 3 ? "map-watch" : "map-cool";
}
