import { RotateCcw, SlidersHorizontal } from "lucide-react";
import type { CommandFilters, FilterOptions } from "../types";

const dateRanges: CommandFilters["dateRange"][] = ["Today", "7 Days", "30 Days", "Custom"];

export function GlobalFilters({
  filters,
  options,
  onChange,
  onReset
}: {
  filters: CommandFilters;
  options: FilterOptions;
  onChange: <K extends keyof CommandFilters>(key: K, value: CommandFilters[K]) => void;
  onReset: () => void;
}) {
  return (
    <section className="filter-rail" aria-label="Global filters">
      <div className="filter-title">
        <SlidersHorizontal size={16} />
        <span>Filters</span>
      </div>
      <div className="segmented-control" role="group" aria-label="Date range">
        {dateRanges.map((range) => (
          <button
            className={`seg-btn ${filters.dateRange === range ? "is-active" : ""}`}
            key={range}
            type="button"
            onClick={() => onChange("dateRange", range)}
          >
            {range}
          </button>
        ))}
      </div>
      <div className={`custom-dates ${filters.dateRange === "Custom" ? "is-visible" : ""}`}>
        <label>
          <span>From</span>
          <input
            type="date"
            value={filters.customStart}
            onChange={(event) => onChange("customStart", event.target.value)}
          />
        </label>
        <label>
          <span>To</span>
          <input
            type="date"
            value={filters.customEnd}
            onChange={(event) => onChange("customEnd", event.target.value)}
          />
        </label>
      </div>
      <SelectFilter label="Community" value={filters.community} options={options.communities} onChange={(value) => onChange("community", value)} />
      <SelectFilter label="Village" value={filters.village} options={options.villages} onChange={(value) => onChange("village", value)} />
      <SelectFilter label="Booth" value={filters.booth} options={options.booths} onChange={(value) => onChange("booth", value)} />
      <SelectFilter label="Party" value={filters.party} options={options.parties} onChange={(value) => onChange("party", value)} />
      <SelectFilter label="Risk" value={filters.riskLevel} options={options.riskLevels} onChange={(value) => onChange("riskLevel", value)} />
      <SelectFilter
        label="Opportunity"
        value={filters.opportunityLevel}
        options={options.opportunityLevels}
        onChange={(value) => onChange("opportunityLevel", value)}
      />
      <SelectFilter
        label="Influencer"
        value={filters.influencer}
        options={options.influencers}
        onChange={(value) => onChange("influencer", value)}
      />
      <SelectFilter
        label="Event"
        value={filters.eventType}
        options={options.eventTypes}
        onChange={(value) => onChange("eventType", value)}
      />
      <button className="reset-btn" type="button" onClick={onReset}>
        <RotateCcw size={16} />
        <span>Reset</span>
      </button>
    </section>
  );
}

function SelectFilter({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="select-filter">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
