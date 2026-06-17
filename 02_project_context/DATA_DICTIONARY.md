# Data Dictionary

Starter CSV templates live in `04_data_templates/`. These are intentionally simple so the team can begin collecting structured data immediately.

## Core Entities

### Source

Records where each claim came from.

Key fields: `source_id`, `title`, `source_type`, `url_or_path`, `publisher`, `date_published`, `date_checked`, `reliability`, `notes`.

### Candidate

Stores verified candidate information.

Key fields: `candidate_id`, `name`, `constituency`, `party_status`, `public_identity`, `bio_status`, `confidence`, `notes`.

### Opponent

Stores competitor intelligence.

Key fields: `opponent_id`, `name`, `party`, `role`, `strengths`, `weaknesses`, `risks`, `source_id`, `confidence`.

### Village

Constituency geography and field unit.

Key fields: `village_id`, `name`, `zone`, `population_estimate`, `dominant_issues`, `political_strength`, `notes`.

### Booth

Election operation unit.

Key fields: `booth_id`, `booth_number`, `village_id`, `total_voters`, `past_vote_sangle`, `past_vote_opponent`, `classification`, `coordinator_id`.

### Volunteer

Ground organization record.

Key fields: `volunteer_id`, `name`, `phone`, `village_id`, `booth_id`, `role`, `status`, `assigned_tasks`, `performance_notes`.

### Issue

Local problem or grievance.

Key fields: `issue_id`, `issue_type`, `location`, `severity`, `affected_population`, `status`, `owner`, `political_impact`, `evidence_source`.

### Media Mention

News and social coverage.

Key fields: `mention_id`, `date`, `platform`, `title`, `url`, `person_mentioned`, `sentiment`, `risk_level`, `summary`.

### Research Task

Open intelligence task.

Key fields: `task_id`, `priority`, `question`, `owner`, `status`, `source_needed`, `output_expected`, `deadline`, `notes`.

## Classification Standards

Booth classification:

- `safe`: strong historic and current support.
- `lean`: favorable but needs maintenance.
- `swing`: persuadable or uncertain.
- `weak`: low support but recoverable.
- `critical`: high strategic importance or high risk.

Confidence:

- `high`: official or primary source, or multiple reliable sources agree.
- `medium`: reputable source but not primary, or source requires update.
- `low`: internal claim, unsourced claim, or single weak source.

Status:

- `todo`
- `in_progress`
- `blocked`
- `verified`
- `rejected`
- `archived`
