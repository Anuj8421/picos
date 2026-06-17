import { CalendarDays } from "lucide-react";
import type { OpportunityRecord, RiskRecord, UpcomingEvent } from "../types";
import { CountPill, EmptyState, PriorityChip, SectionHeader } from "./common";

export function TopRisksTable({ risks }: { risks: RiskRecord[] }) {
  return (
    <section className="panel table-panel" id="top-risks">
      <SectionHeader title="Top Risks" eyebrow="Highest pressure items" actions={<CountPill>{risks.length} rows</CountPill>} />
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Risk</th>
              <th>Probability</th>
              <th>Impact</th>
              <th>Owner</th>
              <th>Mitigation Status</th>
              <th>Target</th>
            </tr>
          </thead>
          <tbody>
            {risks.length ? (
              risks.map((risk) => (
                <tr key={risk.id}>
                  <td>{risk.risk}</td>
                  <td>{risk.probability}</td>
                  <td>{risk.impact}</td>
                  <td>{risk.owner}</td>
                  <td>
                    <span className="table-status">{risk.status}</span>
                  </td>
                  <td>{risk.targetDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <EmptyState title="No matching risks" body="Change filters to restore the risk register." />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function TopOpportunitiesTable({ opportunities }: { opportunities: OpportunityRecord[] }) {
  return (
    <section className="panel table-panel" id="top-opportunities">
      <SectionHeader
        title="Top Opportunities"
        eyebrow="Vote-building openings"
        actions={<CountPill>{opportunities.length} rows</CountPill>}
      />
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Opportunity</th>
              <th>Votes Impact</th>
              <th>Target Community</th>
              <th>Priority</th>
              <th>Owner</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.length ? (
              opportunities.map((opportunity) => (
                <tr key={opportunity.id}>
                  <td>{opportunity.opportunity}</td>
                  <td>{opportunity.voteImpact}</td>
                  <td>{opportunity.targetCommunity}</td>
                  <td>
                    <PriorityChip value={opportunity.priority} />
                  </td>
                  <td>{opportunity.owner}</td>
                  <td>
                    <span className="table-status">{opportunity.status}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <EmptyState title="No matching opportunities" body="Change filters to restore the opportunity table." />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function UpcomingEventsTimeline({ events }: { events: UpcomingEvent[] }) {
  return (
    <section className="panel events-panel" id="events">
      <SectionHeader
        title="Upcoming Political Events"
        eyebrow="Rallies, meetings, reviews, field moves"
        actions={<CountPill>{events.length} scheduled</CountPill>}
      />
      <div className="event-timeline">
        {events.length ? (
          events.map((event) => (
            <article className="event-row" key={event.id}>
              <div className="event-date">
                <CalendarDays size={16} />
                <strong>{event.date.slice(5)}</strong>
                <span>{event.time}</span>
              </div>
              <div>
                <span className="category-chip">{event.type}</span>
                <h3>{event.title}</h3>
                <p>
                  {event.area} / {event.owner}
                </p>
              </div>
              <PriorityChip value={event.risk} />
            </article>
          ))
        ) : (
          <EmptyState title="No upcoming events" body="Add political, community, or research events to activate the timeline." />
        )}
      </div>
    </section>
  );
}
