# Source Map

Last organized: 2026-06-10 Asia/Calcutta.

This file explains what source material exists, which files are canonical, and which facts need verification.

## Source Inventory

| Source PDF | Pages | Role | Extracted text |
|---|---:|---|---|
| `01_sources/original_pdfs/Anuj Avhad.pdf` | 1 | Project owner and system scope | `01_sources/extracted_text/anuj-avhad.txt` |
| `01_sources/original_pdfs/Political Intelligence & Campaign Operating System (PICOS).pdf` | 3 | Product architecture for PICOS | `01_sources/extracted_text/political-intelligence-campaign-operating-system-picos.txt` |
| `01_sources/original_pdfs/Uday Sangle Campaign Strategy.pdf` | 7 | Canonical campaign strategy / master intelligence profile | `01_sources/extracted_text/uday-sangle-campaign-strategy.txt` |
| `01_sources/original_pdfs/Uday Sangle Campaign Strategy (1).pdf` | 7 | Preserved duplicate of campaign strategy text | `01_sources/extracted_text/uday-sangle-campaign-strategy-1.txt` |
| `01_sources/original_pdfs/Uday Sangle Master Profile.pdf` | 7 | Research objectives and master subject profile | `01_sources/extracted_text/uday-sangle-master-profile.txt` |
| `01_sources/original_pdfs/Uday Sangle Overview.pdf` | 6 | Comprehensive competitor analysis | `01_sources/extracted_text/uday-sangle-overview.txt` |
| `01_sources/original_pdfs/Uday Sangle Overview (1).pdf` | 5 | Alternate competitor analysis | `01_sources/extracted_text/uday-sangle-overview-1.txt` |

Full extraction metadata is in `01_sources/source_manifest.json`.

## Canonical Use Rules

- Use `Uday Sangle Campaign Strategy.pdf` as the canonical campaign strategy source.
- Keep `Uday Sangle Campaign Strategy (1).pdf` for preservation only. Its extracted text hash is identical to the canonical strategy file.
- Use both Overview PDFs because they are not duplicates. They overlap but contain different depth and citation sets.
- Use `Uday Sangle Master Profile.pdf` for research objectives and long-term intelligence priorities.
- Use `Political Intelligence & Campaign Operating System (PICOS).pdf` for product design and module structure.
- Use `Anuj Avhad.pdf` for project-owner scope and initial operating rules.

## Important Conflicts

### 2024 Sinnar Vote Count

Conflict:

- Some documents list Kokate around 145,501 and Uday Sangle around 105,137.
- The competitor-analysis PDFs list Kokate at 138,565 and Uday Sangale/Sangle at 97,681, margin 40,884.

Working treatment:

- Use 138,565 / 97,681 / 40,884 as the temporary working value.
- Mark all analytics as provisional until official ECI Form 20 is collected.

### Uday Sangle Party Status

Conflict:

- Project PDFs describe Sangle as expelled from NCP(SP) and associated with BJP circles.
- News reports support expulsion and movement toward BJP, but formal current membership should be verified from BJP/candidate primary sources before use.

Working treatment:

- Write: "expelled from NCP(SP) and reported to have moved toward BJP-aligned circles."
- Do not write definitive current membership unless verified.

### Kokate Legal Status

Conflict:

- Some PDFs say Bombay High Court suspended sentence but did not stay conviction.
- Later reporting says the Supreme Court stayed the conviction only to the extent of avoiding MLA disqualification.

Working treatment:

- Treat legal status as date-sensitive.
- Verify from court order or current reporting before campaign use.

## External Sources Checked

These were checked only to resolve unstable facts and should not replace primary records:

- 2024 result table showing Sinnar: Manikrao Kokate 138,565; Uday Sangale 97,681; margin 40,884: https://en.wikipedia.org/wiki/2024_Maharashtra_Legislative_Assembly_election
- Times of India report on NCP(SP) expelling Uday Sangle and Sunita Charoskar, dated 2025-11-03: https://timesofindia.indiatimes.com/city/nashik/ncp-sp-expels-uday-sangle-of-sinnar-and-sunita-charoskar-of-dindori/articleshow/125039857.cms
- Times of India report on Supreme Court partial relief for Manikrao Kokate, dated 2025-12-22: https://timesofindia.indiatimes.com/india/partial-relief-sc-stays-conviction-of-ncps-manikrao-kokate-in-fraud-case-ex-minister-wont-be-disqualified-as-mla/articleshow/126119823.cms
- Economic Times report on Kokate portfolio removal, dated 2025-12-18: https://economictimes.indiatimes.com/news/politics-and-nation/ncps-manikrao-kokate-stripped-of-portfolio-as-court-issues-arrest-warrant/articleshow/126044652.cms
- Economic Times report on Kokate resignation, dated 2025-12-19: https://economictimes.indiatimes.com/news/politics-and-nation/ncp-accepts-minister-manikrao-kokates-resignation/articleshow/126063553.cms

## Next Source Collection

Highest value missing sources:

- Official ECI Form 20 for Sinnar 2024.
- Booth-wise result sheet.
- Candidate affidavit and assets/liabilities declaration.
- Public BJP/NCP/Shiv Sena statements confirming current affiliation.
- Court order or reliable legal update for Kokate's case.
- Uday Sangle biography, speeches, interviews, media archive, photos, and achievement proof.
- Internal campaign organization list, volunteer map, village map, and booth map.
