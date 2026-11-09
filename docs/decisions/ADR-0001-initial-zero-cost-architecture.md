# ADR-0001: Initial Zero-Cost Architecture Direction

- **Status:** Accepted direction; implementation pending.
- **Date:** 2026-11-09.
- **Decision owners:** Project owner.

## Context

The project needs a mobile-first, search-engine-friendly South African opportunity information service with a protected editorial workspace. Initial development must remain within a R0.00 budget, avoid vendor lock-in and preserve a credible future migration path.

The editorial model requires human-controlled research, verification, approval and publication. The platform does not need applicant accounts or document uploads in its first release.

## Decision

Use the following initial direction:

- Astro for the web application and server-rendered public pages.
- Cloudflare Workers as the initial server-side runtime and deployment target.
- Cloudflare D1 as the initial relational database.
- GitHub for source control.
- A free provider subdomain initially; no custom domain purchase.
- No object storage initially; store source URLs and evidence metadata.
- Separate public and admin interfaces with server-side authentication and authorisation.
- No AI services or automated factual/editorial decisions.

## Reasons

This direction offers a plausible low-cost path for a small initial application, supports server-rendered public pages and uses a relational data model. It can be implemented incrementally and kept portable through stable IDs, migrations and complete exports.

## Constraints and risks

- Free-tier quotas and terms can change.
- Free service does not guarantee production-grade uptime or support.
- D1 is SQLite-compatible, not PostgreSQL; future migration requires deliberate conversion and testing.
- Secure admin authentication and authorisation must be implemented by the application.
- Provider onboarding may request a payment method or present paid options. Stop if proceeding would create a charge or commitment.
- Public repository visibility requires strict secret and private-data hygiene.

## Consequences

The architecture is approved as a direction, not as a commitment to provision services regardless of current terms. Validate current provider documentation, free limits, payment requirements and deployment compatibility before implementation. Do not enable billing or paid products without explicit approval.

## Revisit when

Reassess if usage, reliability, data volume, operational complexity, free-tier limits, security requirements or budget materially change.
