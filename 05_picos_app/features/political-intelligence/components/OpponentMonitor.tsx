import { AlertTriangle, Newspaper, Radio, Shield } from "lucide-react";
import type { OpponentProfile } from "../types";
import { SectionHeader, severityClass } from "./common";

export function OpponentActivityMonitor({ opponents }: { opponents: OpponentProfile[] }) {
  return (
    <section className="panel opponents-panel" id="opponents">
      <SectionHeader title="Opponent Activity Monitor" eyebrow="Kokate, Waje, and other challengers" actions={<AlertTriangle size={18} />} />
      <div className="opponent-grid">
        {opponents.map((opponent) => (
          <article className={`opponent-card ${severityClass(opponent.riskLevel)}`} key={opponent.id}>
            <div className="opponent-head">
              <div>
                <h3>{opponent.name}</h3>
                <span>{opponent.role}</span>
              </div>
              <strong>{opponent.influenceScore}</strong>
            </div>
            <div className="opponent-party">{opponent.party}</div>
            <div className="opponent-stats">
              <span>
                <Radio size={14} />
                Events <b>{opponent.recentEvents}</b>
              </span>
              <span>
                <Newspaper size={14} />
                Media <b>{opponent.mediaMentions}</b>
              </span>
              <span>
                <Shield size={14} />
                Risk <b>{opponent.riskLevel}</b>
              </span>
              <span>
                Sentiment <b>{opponent.sentiment}</b>
              </span>
            </div>
            <p>{opponent.latestMovement}</p>
            <div className="verification-line">{opponent.sourceStatus}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
