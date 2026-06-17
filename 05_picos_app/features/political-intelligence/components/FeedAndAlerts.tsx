import { BellRing, Clock3, RadioTower } from "lucide-react";
import type { LiveIntelligenceEvent, PoliticalAlert } from "../types";
import { CountPill, EmptyState, PriorityChip, SectionHeader, severityClass } from "./common";

export function LiveIntelligenceFeed({ feed }: { feed: LiveIntelligenceEvent[] }) {
  return (
    <section className="panel live-feed-panel" id="live-feed">
      <SectionHeader
        title="Live Intelligence Feed"
        eyebrow="What happened and what is happening"
        actions={<CountPill>{feed.length} signals</CountPill>}
      />
      <div className="feed-list">
        {feed.length ? (
          feed.map((event) => (
            <article className="feed-row" key={event.id}>
              <div className="feed-time">
                <Clock3 size={16} />
                <strong>{event.timestamp}</strong>
                <span>{event.date}</span>
              </div>
              <div className="feed-body">
                <div className="feed-title-line">
                  <PriorityChip value={event.priority} />
                  <span className="category-chip">{event.category}</span>
                  <span className="category-chip">{event.confidence} confidence</span>
                </div>
                <h3>{event.title}</h3>
                <p>{event.summary}</p>
                <div className="feed-meta-grid">
                  <span>
                    Source <b>{event.source}</b>
                  </span>
                  <span>
                    Impact <b>{event.impactScore}</b>
                  </span>
                  <span>
                    Team <b>{event.assignedTeam}</b>
                  </span>
                  <span>
                    Status <b>{event.status}</b>
                  </span>
                  <span>
                    Area <b>{event.village}</b>
                  </span>
                  <span>
                    Party <b>{event.party}</b>
                  </span>
                </div>
                <div className="next-step">Next: {event.nextStep}</div>
              </div>
            </article>
          ))
        ) : (
          <EmptyState title="No matching intelligence" body="Adjust filters or search terms to recover the live feed." />
        )}
      </div>
    </section>
  );
}

export function PoliticalAlertsPanel({ alerts }: { alerts: PoliticalAlert[] }) {
  return (
    <aside className="panel alerts-panel" id="alerts">
      <SectionHeader
        title="Political Alerts"
        eyebrow="Priority watchlist"
        actions={<CountPill>{alerts.length} active</CountPill>}
      />
      <div className="alert-list">
        {alerts.length ? (
          alerts.map((alert) => (
            <article className={`alert-row ${severityClass(alert.severity)}`} key={alert.id}>
              <div className="alert-top">
                <span>
                  <BellRing size={14} />
                  {alert.severity}
                </span>
                <strong>{alert.owner}</strong>
              </div>
              <h3>{alert.description}</h3>
              <p>
                <b>Area:</b> {alert.affectedArea}
              </p>
              <p>
                <b>Action:</b> {alert.recommendedAction}
              </p>
            </article>
          ))
        ) : (
          <EmptyState title="No critical alerts" body="The alert panel will repopulate when a matching critical signal appears." />
        )}
      </div>
      <div className="signal-footer">
        <RadioTower size={16} />
        <span>Critical and high alerts are source-gated before public campaign use.</span>
      </div>
    </aside>
  );
}
