# Project Charter

## 1. Purpose

Build an independent, trustworthy South African platform that organises and presents careers, education and skills-development opportunities. The intended audience includes school leavers, matriculants, unemployed people, TVET students, graduates, people seeking workplace experience and people pursuing artisan or occupational pathways.

The platform should make opportunity information easier to discover and understand without presenting itself as the employer, training provider, funder or application authority.

## 2. Product scope

The public information service may cover:

- Learnerships
- Internships and workplace experience
- Apprenticeships and artisan development
- Bursaries and scholarships
- Graduate programmes
- Entry-level and general employment vacancies
- Skills programmes and other credible education or career pathways
- Guides and directories for relevant institutions, employers and public bodies

Listings should be structured so visitors can filter and compare relevant facts, including opportunity type, province or location, organisation, sector, qualification or NQF requirements where stated, experience requirements, stipend or salary where stated, age requirements where stated, opening and closing dates, and the official application route.

A field must not be invented merely to make a listing look complete. Distinguish "not stated by source" from "not yet checked" where appropriate.

## 3. Intended user experience

The public experience should be mobile-first, accessible, fast and understandable on modest Android devices and slower connections. Core functions include search, category and location filters, useful deadline views, clear eligibility summaries, official source links, visible verification dates and transparent closed/archived states.

Search-engine discoverability is a product requirement. Public opportunity pages should render meaningful content in crawlable HTML and use appropriate metadata, canonical URLs, sitemaps and structured data only where the data genuinely supports it.

## 4. Editorial authority

The project owner and authorised human editors retain final control over all factual and editorial decisions. The system may:

- Require fields and validate formats.
- Calculate whether a stated date is in the past.
- Check whether a URL responds.
- Identify possible duplicate records.
- Produce review queues, reminders and reports.
- Record who changed or approved a record and when.
- Export records and maintain backups.

The system must not infer missing facts, decide that a source proves eligibility, decide that an opportunity is genuine or open, approve content, or publish content automatically.

A passed closing date is a reason to request human review, not proof that the opportunity has closed. Only an authorised human may change the editorial status to Closed or Archived.

## 5. Permanent constraints

1. Initial budget is R0.00. No paid plan, paid API, subscription, domain purchase, paid plugin, billable add-on or upgrade without explicit approval.
2. No AI dependency for discovery, extraction, verification, interpretation, eligibility decisions, editorial review or publication.
3. No automatic publication. Publication requires explicit human approval.
4. Public website and admin workspace must be separate in access and presentation. Admin data and actions require server-side authentication and authorisation.
5. The platform must remain independent of `seta-careers-platform`.
6. Preserve data portability and a credible future migration path.
7. Do not initially collect applicant CVs, identity documents, sensitive personal data or application fees.
8. Link applicants to the official application channel. Do not imply that the platform itself accepts or decides applications.
9. Do not weaken TLS verification or security controls to make an integration work.
10. Do not enable paid services automatically when free quotas are reached.

## 6. Budget governance

Before using any external service, document whether the relevant feature is genuinely free, whether a payment method is required, what the limits are, what happens when limits are exceeded, and whether overage billing can occur. Prefer configurations that fail safely without creating charges. Re-check current provider terms before launch because free-tier limits can change.

## 7. Definition of a trustworthy listing

A published listing must have a stable internal ID and public URL, a named organisation, an official source or application URL, the facts actually stated by the source, a recorded human verification event, a recorded human editorial approval, and a clear date of last verification. Missing or ambiguous facts must be labelled honestly.

The exact evidence and approval requirements are defined in the editorial workflow document.

## 8. Success measures

Measure quality as well as quantity:

- Percentage of published listings with a valid official source link.
- Percentage with a recorded human verification date and reviewer.
- Percentage with a recorded editorial approval.
- Number of expired or uncertain records awaiting human review.
- Broken-link and duplicate rates.
- Search and filter usefulness on mobile.
- Page performance and accessibility.
- Backup and restore test results.
- Actual service usage against free-tier limits.

Do not use listing volume as a reason to lower verification standards.
