import { Crosshair } from "lucide-react";
import type { MatrixItem, SentimentSegment } from "../types";
import { CountPill, PriorityChip, scoreBand, SectionHeader, signed, trendClass } from "./common";

export function RiskOpportunityMatrix({
  items,
  selectedId,
  onSelect
}: {
  items: MatrixItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const selected = items.find((item) => item.id === selectedId) ?? items[0];

  return (
    <section className="panel matrix-panel" id="risk-matrix">
      <SectionHeader title="Risk vs Opportunity Matrix" eyebrow="Impact by probability" actions={<Crosshair size={18} />} />
      <div className="matrix-wrap">
        <div className="matrix-axis y-axis">Probability</div>
        <div className="matrix-axis x-axis">Impact</div>
        <div className="quadrant q1">High probability<br />Low impact</div>
        <div className="quadrant q2">High probability<br />High impact</div>
        <div className="quadrant q3">Low probability<br />Low impact</div>
        <div className="quadrant q4">Low probability<br />High impact</div>
        {items.map((item) => (
          <button
            aria-label={item.title}
            className={`matrix-point ${item.type} ${item.id === selected.id ? "is-selected" : ""}`}
            key={item.id}
            onClick={() => onSelect(item.id)}
            style={{ left: `${item.impact}%`, top: `${100 - item.probability}%` }}
            type="button"
          >
            <span />
          </button>
        ))}
      </div>
      <div className={`matrix-detail ${selected.type}`}>
        <span>{selected.type.toUpperCase()}</span>
        <h3>{selected.title}</h3>
        <dl>
          <div>
            <dt>Probability</dt>
            <dd>{selected.probability}</dd>
          </div>
          <div>
            <dt>Impact</dt>
            <dd>{selected.impact}</dd>
          </div>
          <div>
            <dt>Owner</dt>
            <dd>{selected.owner}</dd>
          </div>
          <div>
            <dt>Area</dt>
            <dd>{selected.affectedArea}</dd>
          </div>
        </dl>
        <p>{selected.action}</p>
      </div>
    </section>
  );
}

export function SentimentOverview({ sentiment }: { sentiment: SentimentSegment[] }) {
  return (
    <section className="panel sentiment-panel" id="sentiment">
      <SectionHeader title="Sentiment Overview" eyebrow="Community signal" actions={<CountPill>{sentiment.length} segments</CountPill>} />
      <div className="sentiment-list">
        {sentiment.map((item) => (
          <div className="sentiment-row" key={item.segment}>
            <div className="sentiment-name">{item.segment}</div>
            <div className="sentiment-bar">
              <span className={scoreBand(item.score)} style={{ width: `${item.score}%` }} />
            </div>
            <strong>{item.score}</strong>
            <span className={`trend-chip ${trendClass(item.trend)}`}>
              {item.trend} {signed(item.change)}
            </span>
            <span className="confidence-chip">{item.confidence}</span>
          </div>
        ))}
      </div>
      <div className="sentiment-note">
        <PriorityChip value="Medium" />
        <span>Community scores are directional until survey or booth-level evidence is attached.</span>
      </div>
    </section>
  );
}
