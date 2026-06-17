import { BrainCircuit, CheckCircle2 } from "lucide-react";
import type { StrategicRecommendation } from "../types";
import { CountPill, PriorityChip, SectionHeader, severityClass } from "./common";

export function StrategicRecommendations({
  recommendations,
  assignedIds,
  onAssign
}: {
  recommendations: StrategicRecommendation[];
  assignedIds: string[];
  onAssign: (id: string) => void;
}) {
  return (
    <section className="panel recommendations-panel" id="ai-recommendations">
      <SectionHeader
        title="AI Strategic Recommendations"
        eyebrow="What requires action next"
        actions={<CountPill>{recommendations.length} decisions</CountPill>}
      />
      <div className="recommendation-list">
        {recommendations.map((rec) => {
          const assigned = assignedIds.includes(rec.id);
          return (
            <article className={`recommendation-card ${severityClass(rec.priority)}`} key={rec.id}>
              <div className="recommendation-top">
                <PriorityChip value={rec.priority} />
                <button className="action-btn" type="button" onClick={() => onAssign(rec.id)}>
                  {assigned ? <CheckCircle2 size={16} /> : <BrainCircuit size={16} />}
                  <span>{assigned ? "Assigned" : rec.action}</span>
                </button>
              </div>
              <h3>{rec.recommendation}</h3>
              <p>
                <b>Reason:</b> {rec.reason}
              </p>
              <p>
                <b>Expected impact:</b> {rec.expectedImpact}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
