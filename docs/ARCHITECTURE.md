# Architecture Direction

## Status

This document records the approved initial architecture direction, not a claim that infrastructure has been provisioned or application code has been implemented.

## 1. Initial architecture

- **Web application:** Astro, with server-rendered pages for public opportunity detail pages and the admin interface.
- **Server runtime and deployment target:** Cloudflare Workers.
- **Initial relational database:** Cloudflare D1 (SQLite-compatible).
- **Source control:** this independent GitHub repository.
- **Initial hosting address:** a provider-supplied subdomain if available at no cost. Do not buy a custom domain during the R0.00 phase.
- **File storage:** none initially. Store source URLs and evidence metadata rather than uploading advert files. Reassess storage only when a demonstrated need exists.

The exact Astro adapter, deployment configuration, D1 binding and build process must be confirmed against current provider documentation during implementation. Do not assume a dashboard setting or command is available without checking it.

## 2. Public and admin separation

The public site and admin workspace are two distinct interfaces of the same platform and data system.

Public routes expose only approved public content. Admin routes must be protected by server-side authentication and authorisation. Hiding an admin link in the browser is not security. Every sensitive read and write must be checked on the server.

The initial admin is for the owner and any explicitly authorised editors. Use least privilege. Do not introduce public user registration or applicant accounts in the first release.

## 3. Initial logical data domains

The relational model should be designed around stable IDs and explicit relationships. Likely domains include:

- Opportunities and opportunity categories.
- Organisations and institution directory entries.
- Official source records and source URLs.
- Evidence references and human verification events.
- Editorial reviews and publication decisions.
- Admin users, roles and authentication events.
- Audit history and record-change history.
- Guides, categories, redirects and SEO metadata.

A published opportunity should retain its source history and review history. Closing-date changes, corrections, closure decisions and archival decisions should be traceable.

## 4. Editorial states

The initial workflow should support at least:

- Draft
- Awaiting verification
- Verified
- Awaiting editorial approval
- Approved
- Published
- Closed
- Archived
- Rejected

Verification and editorial approval are separate human decisions. A record must not become public merely because technical validation passes. A published record can be changed or unpublished only through an authorised, auditable human action.

## 5. Data access and migration

Keep application business rules separate from provider-specific database and hosting details. Use a clear data-access layer, documented SQL migrations, stable identifiers, explicit foreign keys and portable export formats.

D1 is SQLite-compatible, not PostgreSQL. A later move to PostgreSQL is a real data and SQL migration, not a connection-string change. Avoid relying unnecessarily on provider-specific SQL features. Document unavoidable differences and write export/import tooling before a migration becomes urgent.

The future hosting/database choice is deliberately undecided. Potential future options may include a PostgreSQL-backed application stack, but no migration or paid service is approved by this document.

## 6. Security boundaries

- Keep secrets out of source control and browser bundles.
- Use server-side admin sessions and role checks.
- Use modern password hashing; never store plaintext passwords.
- Use secure, HTTP-only, appropriately SameSite cookies and HTTPS.
- Protect state-changing requests against CSRF.
- Rate-limit authentication attempts and protect account recovery.
- Validate input on the server and use parameterised database queries.
- Record security-relevant admin actions without logging passwords, tokens or unnecessary personal data.
- Keep public queries restricted to published records and approved public fields.

Security implementation must be tested before real editorial records or credentials are entered.

## 7. Free-tier and reliability caveat

Cloudflare free-tier products have quotas and conditions that can change. Free service does not guarantee production-grade uptime, support or unlimited traffic. Before deployment, record the then-current Workers and D1 limits, payment requirements, overage behaviour and account-specific restrictions. Configure monitoring and safe failure behaviour. Never enable paid usage automatically.

## 8. Not in the initial architecture

- AI or LLM services.
- Automated scraping or automated factual extraction.
- Automated verification or eligibility decisions.
- Automatic publication or automatic closure.
- Applicant accounts, CV uploads or ID-document uploads.
- Paid storage or third-party paid integrations.
- A custom paid domain.
- Ad network integration or active advertising.

These exclusions may be reconsidered only through an explicit, documented decision that does not violate the permanent human-control and budget principles.
