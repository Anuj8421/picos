import { Activity, TrendingDown, TrendingUp } from "lucide-react";
import type { IntelligenceMetric } from "../types";
import { signed, trendClass } from "./common";

export function OverviewBar({ metrics }: { metrics: IntelligenceMetric[] }) {
  return (
    <section className="overview-bar" id="overview" aria-label="Intelligence overview bar">
      {metrics.map((metric) => {
        const TrendIcon = metric.trend === "Down" ? TrendingDown : metric.trend === "Up" ? TrendingUp : Activity;
        return (
          <article className={`metric-cell tone-${metric.tone}`} key={metric.label}>
            <div className="metric-label">{metric.label}</div>
            <div className="metric-value-row">
              <strong>{metric.value}</strong>
              <span className={`trend-chip ${trendClass(metric.trend)}`}>
                <TrendIcon size={14} />
                {metric.trend}
              </span>
            </div>
            <div className="metric-meta">
              <span>Prev {metric.previous}</span>
              <span>{signed(metric.change)}%</span>
            </div>
            <p>{metric.signal}</p>
          </article>
        );
      })}
    </section>
  );
}
