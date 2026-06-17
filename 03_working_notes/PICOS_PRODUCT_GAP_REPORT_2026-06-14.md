# PICOS Product Gap Report

Generated: 2026-06-14  
Project lens: Uday Sangle, Sinnar Assembly constituency  
Product reviewed: `05_picos_app` and PICOS planning documents  
Reference material reviewed: user-provided zip of photographed campaign/election service decks

## Executive Verdict

PICOS has a strong product vision and a broad prototype surface. It already thinks in the right campaign language: source discipline, candidate/opponent intelligence, constituency and voter intelligence, ownership, visits, conversations, follow-ups, promises, verification, approval, evidence, and daily reports.

The major gap is operational maturity. The app is currently closer to a structured command-center prototype than a field-deployable campaign operating system. The biggest missing pieces are persistence, authenticated role-based workflows, real data imports, booth-level operations, WhatsApp/social execution, media monitoring, grievance resolution, volunteer performance, election-day GOTV, and privacy controls.

Short version:

| Area | Status | Readiness |
|---|---|---:|
| Product concept | Strong and Sinnar-relevant | 75% |
| UI/module coverage | Broad prototype | 60% |
| Real campaign operations | Partial | 35% |
| Data readiness | Low | 25% |
| Field deployment readiness | Low | 25% |
| Competitive completeness vs reference decks | Good foundation, missing execution layers | 45% |

Best next move: do not add more dashboards first. Make the existing workflow real: database, auth, source/evidence uploads, imports, booth/village/volunteer data, field forms, and daily action reporting.

## Source Register

| Source | Date checked | What it supports | Confidence | Next verification step |
|---|---:|---|---|---|
| `PROJECT_CONTEXT.md` | 2026-06-14 | Master objective, Sinnar/Uday lens, PICOS frame | High | Keep updated after new verified research |
| `02_project_context/PICOS_PRODUCT_CONTEXT.md` | 2026-06-14 | Intended PICOS modules and phasing | High | Convert phase list into product backlog |
| `01_sources/extracted_text/political-intelligence-campaign-operating-system-picos.txt` | 2026-06-14 | Original PICOS module map | High | Preserve as planning source |
| `05_picos_app` code | 2026-06-14 | Current implementation state | High | Add persistence and route-level acceptance tests |
| `04_data_templates` | 2026-06-14 | Current starter data schemas | High | Populate with verified campaign data |
| `C:\Users\Anuj\Downloads\Uday sangle campaign-20260614T061958Z-3-001.zip` | 2026-06-14 | Reference competitor/service capabilities from photographed decks | Medium | Request original PDFs or clean scans for exact feature extraction |

Important: reference-deck observations are not externally verified. They are used only for product comparison.

## What PICOS Already Covers Well

| Strength | Evidence | Why it matters for Uday Sangle |
|---|---|---|
| Strong Sinnar-specific product framing | Project context and app copy repeatedly reference Uday Sangle and Sinnar | Keeps the product from becoming generic campaign CRM |
| Source, evidence, verification, approval mindset | Source registry, evidence repository, verification queue, approval queue, confidence badges | Reduces legal/reputation risk around opponent claims and unstable political facts |
| Candidate and opponent intelligence | Candidate screen, opponent manager, risks, opportunities, relationships | Helps build Sangle's positive narrative and monitor Kokate/Waje |
| Constituency and voter intelligence surfaces | Village, booth, community, household, influencer, turnout, persuasion, support screens | Correct direction for booth and village-level campaign decisions |
| Field visit workflow design | Visits, conversations, follow-ups, promises, timeline, audit placeholders | Converts campaign meetings into accountable action |
| Ownership/accountability model | Ownership registry, team members, reporting lines, escalation chains | Critical for converting strategy into booth/village execution |
| Import workflow concept | CSV import center with validation/approval language | Useful once real booth/voter/volunteer data begins |

## Main Product Gaps

| Priority | Gap | Current state | Impact | Recommendation |
|---|---|---|---|---|
| P0 | No real persistence | Forms submit to routes, but no database/write layer is visible | Data entered by field teams will not become durable campaign memory | Add database, server actions/API routes, migrations, audit log writes |
| P0 | No auth or role-based access | User types exist in planning docs, but not implemented | Candidate, manager, volunteer, booth coordinator and content team need different access | Implement roles, permissions, login, and sensitive-data controls |
| P0 | Official election/booth data missing | Templates show booth and volunteer CSVs mostly empty; Form 20 still missing | Booth classification and vote-gap strategy remain speculative | Collect Form 20, booth-wise results, village-booth mapping, coordinator list |
| P0 | Booth Intelligence is not a full module | Core module is marked placeholder; booth manager exists under constituency | Booth operations are central to winning Sinnar | Build dedicated booth dashboard, booth book, coordinator roster, safe/lean/swing/weak/critical map |
| P0 | Privacy and PII controls missing | Voter/household/phone placeholders exist, but no data-protection design | Voter and volunteer data are sensitive | Add consent rules, access controls, encryption plan, retention policy, export/delete controls |
| P1 | WhatsApp Operations missing | Core module placeholder | WhatsApp is one of the most important campaign channels | Add group registry, admins, village/booth/community groups, broadcast logs, content approval, reach tracking |
| P1 | Social Media Management missing | Core module placeholder; candidate screen has only basic social notes | Digital advantage is a key Sangle opportunity | Add content calendar, asset workflow, approvals, post performance, Marathi/local-language narrative tracker |
| P1 | Media Monitoring is only intake | Media manager exists, but no collection/monitoring pipeline | Opponent/legal/news narratives can move quickly | Add manual clipping inbox first, then RSS/YouTube/social monitoring later |
| P1 | Volunteer management is indirect | Owners, teams, rosters, volunteer teams exist, but no true volunteer attendance/performance workflow | Ground strength cannot be measured cleanly | Add volunteer profile, availability, booth assignment, attendance, report submission, performance score |
| P1 | Grievance resolution workflow is incomplete | Issues, visits, promises and follow-ups exist separately | Public trust depends on closing problems, not only recording them | Build grievance intake -> owner -> SLA -> evidence -> closure -> public-proof flow |
| P1 | Field mobile/offline workflow missing | Desktop/web forms exist | Booth workers and coordinators need fast mobile entry in villages | Make core forms mobile-first, add photo/GPS capture placeholders, plan offline mode later |
| P1 | Election-day GOTV missing | Turnout screens exist as analysis, not operations | Final 72 hours and polling day need a different command mode | Add voter slip/family card, call center, transport, senior citizen support, hourly turnout tracking |
| P2 | AI Assistant is not implemented | AI strategy/recommendation copy appears static/mock | AI should retrieve verified knowledge, not invent claims | Build retrieval over sources/evidence first; generate drafts only with source notes |
| P2 | Election analytics are premature | Predictive ideas exist but data quality is low | Bad predictions can mislead the campaign | Delay win probability until booth, field, turnout and sentiment data are real |
| P2 | Budget/resource tracking missing | Reference decks include cost/activity planning; PICOS does not | Campaign operations require money, vehicles, manpower, print, events | Add campaign budget, activity cost, vendor, inventory and logistics tracker |

## Module Maturity

| PICOS module | Current implementation | Maturity | Key missing item |
|---|---|---:|---|
| Political Intelligence | Active command center and managers | 3/5 | Real feeds, persistence, current source updates |
| Constituency Intelligence | Active screens and managers | 3/5 | Verified village/booth master data |
| Booth Intelligence | Placeholder core module; booth manager under constituency | 2/5 | Dedicated booth operations dashboard |
| Voter Intelligence | Many active screens, mock data | 3/5 | Legal/secure real data capture and privacy model |
| Issue Mapping | Issue manager and some visual surfaces | 2/5 | Grievance SLA and resolution proof workflow |
| Volunteer Management | Owners/teams/structure but not full volunteer ops | 2/5 | Attendance, reporting, performance, booth duty |
| WhatsApp Operations | Placeholder | 1/5 | Group/broadcast/content workflow |
| Media Monitoring | Manager only | 2/5 | Monitoring intake and response workflow |
| Social Media Management | Placeholder | 1/5 | Calendar, approvals, performance analytics |
| Event Management | Event manager and visit workflow | 2/5 | Attendance, event ROI, post-event follow-up |
| War Room Dashboard | Political command center exists | 2/5 | Single election-mode action board |
| AI Assistant | Static recommendation concepts | 1/5 | RAG over verified sources and evidence |
| Election Analytics | Some turnout/support/persuasion screens | 2/5 | Official booth data and model governance |
| Grievance Management | Issues/promises/follow-ups partial | 2/5 | Citizen intake and closure tracker |
| Knowledge Base | Source/evidence foundations | 2/5 | Asset library, uploads, retrieval, tagging |

## Comparison With Reference Deck Capabilities

The zip photos appear to include several campaign software/service references:

- Election management software pages around voter lists, booth data, party workers, survey, family cards, voter slips, exports, data backup/upload, and administrative controls.
- Political consulting decks covering data analysis, booth-level intelligence, office management, leadership advisory, political pulse tracking, volunteer/booth management, social media posting, campaign strategy, call center, and manpower grids.
- Campaign service brochures covering political assessment, party cadre development, political event management, local cadre management, booth management, war-room management, door-to-door campaigning, digital presence, public relations, logistics, and individual politician support.
- Strategy decks covering booth segmentation, battle zones, target voters, demographic targeting, symbolic campaigns, content workflow, WhatsApp/Facebook/YouTube/Instagram posting, campaign budget tables, and final campaign goals.

| Reference capability | Present in PICOS? | Gap |
|---|---|---|
| Voter list import/export and backup | Partial concept only | Need real import, validation, dedupe, export, backup |
| Voter slip/family card generation | No | Add printable and WhatsApp-shareable voter slip/family card workflow if legally appropriate |
| Booth worker/party worker management | Partial through owners/teams | Need dedicated booth-worker roster, attendance, daily reports |
| Booth battle-zone segmentation | Partial through mock classifications | Need official booth data and action map |
| Survey and public pulse | Partial sentiment records | Need survey forms, call/field collection, trend dashboard |
| Call center/telecalling | No | Add contact attempts, call scripts, outcomes, follow-up tasks |
| Door-to-door campaign management | Partial visits/households | Need route plans, daily targets, completion tracking |
| WhatsApp operations | No active module | Build soon; this is a major miss |
| Social media calendar and posting workflow | No active module | Build content operations and approval queue |
| Political event logistics | Partial event/visit records | Need attendance, logistics, budget, post-event conversion |
| War-room mode | Partial command center | Need election-mode action board and escalation screen |
| Budget and resource planning | No | Add activity cost, manpower, vehicle, print, media spend tracking |
| Leadership advisory/strategy packaging | Partial reports | Need clear packaged outputs for candidate and campaign manager |

## Data Gaps Blocking Product Value

| Missing data | Why it matters | First action |
|---|---|---|
| Official ECI Form 20 for Sinnar 2024 | Resolves vote total conflict and anchors analytics | Collect and register source |
| Booth-wise 2024 result sheet | Enables booth classification and swing targeting | Import into booth table |
| Village-booth mapping | Needed for field assignments and village dashboards | Build master geography file |
| Campaign org chart | Needed for ownership and escalation | Collect core team, taluka, village, booth, youth, women, social media teams |
| Volunteer roster | Needed for real ground strength | Populate volunteer/team templates |
| WhatsApp group map | Needed for controlled distribution | List group name, owner, admins, audience, geography |
| Candidate verified biography | Needed for website, speeches, content, trust narrative | Collect resume, interviews, affidavit, source proofs |
| Achievement evidence | Needed for positive campaign story | Collect photos, documents, media clips, before-after proof |
| Opponent current legal/political status | Needed for safe contrast messaging | Verify from current court/order and primary sources |
| Media/social archive | Needed for perception and risk monitoring | Build media mention and content asset database |
| Active village issues/grievances | Needed for trust-building operations | Launch issue intake and resolution workflow |

## What PICOS Should Add

### P0: Make The Product Real

1. Database with migrations for all core entities.
2. Server-side create/edit flows for managers and foundation forms.
3. Role-based auth for Super Admin, Candidate, Campaign Manager, Intelligence Team, Content Team, Volunteer, Booth Coordinator, and Constituency Coordinator.
4. Source/evidence file uploads with metadata, confidence, and next verification step.
5. Audit log writes on every create/edit/approval/verification action.
6. CSV import that actually validates, previews, dedupes, imports, and can roll back.

### P0: Build Booth Operating Core

1. Dedicated Booth Intelligence module.
2. Booth book: booth number, village, voters, community mix, past result, coordinator, workers, risks, issues.
3. Safe/lean/swing/weak/critical classification with source and confidence.
4. Booth action plan: owner, next visit, pending issue, WhatsApp group, volunteer gap.
5. Battle-zone dashboard for swing/weak/high-opportunity booths.

### P1: Build Field And Trust Workflows

1. Mobile-first visit/conversation/follow-up/promise forms.
2. Grievance intake and resolution SLA.
3. Before-after evidence capture for local issue work.
4. Volunteer attendance and daily report submission.
5. Door-to-door route and household coverage tracker.
6. Promise-to-task-to-proof loop.

### P1: Build Digital Operations

1. WhatsApp group registry and broadcast planner.
2. Content calendar with approval status.
3. Marathi/local-language content bank.
4. Platform performance tracking for Facebook, Instagram, YouTube, X and WhatsApp.
5. Rapid response workflow for opponent claims and media issues.

### P1: Build War Room Mode

1. Daily action board.
2. Critical alerts: booth gaps, volunteer gaps, issue spikes, opponent moves, media risks.
3. Candidate briefing view: today, tomorrow, this week.
4. Final 72-hour election mode.
5. Polling-day turnout, transport, senior citizen assistance, call center and booth incident tracking.

### P2: Build AI After Data Quality

1. AI retrieval over source/evidence records.
2. Draft speeches, posts and press notes with source notes.
3. Opponent claim risk check before public content.
4. Daily brief generation from verified records only.
5. No winning-probability claims until official booth and field data are sufficient.

## Product Positioning Gap

Right now PICOS can look like a broad political dashboard. The stronger positioning is:

> PICOS is a Sinnar-specific campaign operating system that turns evidence, village intelligence, booth work, volunteer accountability, WhatsApp/social operations, grievances, and daily war-room decisions into measurable vote-building action for Uday Sangle.

This positioning is stronger than a generic "political intelligence dashboard" because it ties the product directly to votes, trust, organization, and Sinnar field execution.

## Recommended 30-Day Build Sequence

| Week | Build focus | Output |
|---|---|---|
| Week 1 | Persistence, auth, source/evidence upload, audit logs | App can save real records safely |
| Week 2 | Form 20/booth/village/volunteer imports | First real Sinnar data foundation |
| Week 3 | Booth Intelligence plus field forms | Booth action board and mobile field reporting |
| Week 4 | WhatsApp/social/media/grievance workflows | Campaign communication and trust loop begins |

## Do Not Prioritize Yet

| Item | Why wait |
|---|---|
| Winning probability score | Data quality is not ready |
| Heavy AI strategy engine | It will hallucinate without verified knowledge base |
| More decorative dashboards | Core problem is workflow/persistence, not visual coverage |
| Public attack content | Opponent legal/political claims are date-sensitive and need verification |
| Full native mobile app | Mobile-first web forms are enough for the first field pilot |

## Bottom Line

PICOS does not miss the vision. It misses the operational backbone.

If the product is meant to help Uday Sangle gain votes in Sinnar, the next version must become a real campaign machine: verified data in, accountable owner assigned, field action completed, proof attached, daily report generated, and booth/village strategy updated.

The highest-return gap to close is Booth + Field + WhatsApp + Grievance + Persistence. That combination directly improves vote conversion, trust building, worker discipline, and election readiness.
