# Phase 0 — Repository Audit and Technical Feasibility

**Audit date:** 2026-11-14  
**Branch:** `phase-0/repository-audit`  
**Audited base:** `main` at `83f2ca6bafa264fff0ba9edbb37a0e8ece8c33de`  
**Status:** Repository and public technical-feasibility audit complete; account-specific checks are owner-reported and must be rechecked before deployment.  
**Scope:** Read-only repository inspection and public documentation review. This phase does not implement the application or provision infrastructure.

## 1. Executive result

The repository is correctly established as an independent, public GitHub project. Its requirements, editorial governance, security baseline, data-portability policy, architecture direction and first Cloudflare feasibility review are already documented.

The live repository remains at the documentation/foundation stage. No application package manifest, Astro configuration, Wrangler configuration, TypeScript configuration, ignore file or CI workflow was found at the checked paths. The application, database schema/migrations, authentication, public website and deployment are not implemented in the audited repository state.

**Architecture decision:** Retain Astro + Cloudflare Workers + Cloudflare D1 for the initial release, subject to the safeguards and implementation gates below. Do not provision further resources, deploy, enable paid services or change billing as part of Phase 0.

## 2. Repository state verified

Repository: `Ituthema/-sa-opportunity-platform`

- Default branch: `main`
- Visibility: public (owner-approved existing setting)
- Archived: no
- Connected GitHub permissions: admin, maintain, push, pull and triage
- Latest commit at audit: `83f2ca6bafa264fff0ba9edbb37a0e8ece8c33de`
- Latest commit message: merge of PR #1, "Stage 2: document zero-cost Astro and Cloudflare feasibility"
- PR #1 is merged.
- Branches found: `main`, `stage-2/cloudflare-astro-feasibility`

The previous baseline `27f54e6d8a9c2898232034f06dd6d734f4cf95e4` is an ancestor, not the current main HEAD.

### Existing project documents inspected

- `README.md`
- `docs/PROJECT_CHARTER.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/EDITORIAL_WORKFLOW.md`
- `docs/SECURITY_AND_PRIVACY.md`
- `docs/DATA_PORTABILITY_AND_BACKUPS.md`
- `docs/PLATFORM_FEASIBILITY_2026-11-09.md`

The documents are consistent on the most important requirements: R0.00 initial budget; complete independence from `seta-careers-platform`; manual discovery and factual verification; separate human verification and editorial approval; no automatic publication; minimal personal-data collection; server-side admin security; and portable records and backups.

### Implementation files checked

The following paths were not present on `main` at the audit:

- `package.json`
- `astro.config.mjs`
- `wrangler.jsonc`
- `wrangler.toml`
- `tsconfig.json`
- `.gitignore`
- `AGENTS.md`
- `CONTRIBUTING.md`
- `.github/workflows/ci.yml`
- `.github/workflows/deploy.yml`

This confirms that the next development work should create a minimal application foundation rather than attempt to repair an existing application.

## 3. Cloudflare account state — owner-reported, not independently queried

The owner has previously reported the following dashboard state:

- Cloudflare Workers Free plan is accessible.
- A `workers.dev` subdomain is available in the account.
- D1 is accessible and a project database named `careeropportunities` has been created.
- The Billing page is accessible.
- No paid plan or paid add-on has been activated for this project.

These are owner-reported account facts, not independently verified through a Cloudflare account API in this audit. The earlier 2026-11-09 feasibility document stated that no resource had been created at that time; the later owner update about the existing D1 database supersedes that historical statement.

Still to confirm in the dashboard immediately before any deployment or additional provisioning:

- Current Workers and D1 plan labels and usage.
- The exact D1 database name/ID and that it is the intended project database.
- Whether any payment method or payment commitment is required for the intended Free features.
- That no paid subscription, add-on, spending commitment or usage-based billing setting has been enabled.
- The exact `workers.dev` hostname and whether it is enabled for this account.

Do not share account IDs, API tokens, credentials or private billing information in repository files or chat screenshots. If a payment prompt, upgrade prompt or paid commitment appears, stop.

## 4. Current official technical documentation review

Public first-party documentation was rechecked on 2026-11-14:

- Cloudflare Astro on Workers: https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/
- Cloudflare Workers limits: https://developers.cloudflare.com/workers/platform/limits/
- Cloudflare Workers pricing: https://developers.cloudflare.com/workers/platform/pricing/
- Cloudflare D1 limits: https://developers.cloudflare.com/d1/platform/limits/
- Cloudflare D1 pricing: https://developers.cloudflare.com/d1/platform/pricing/
- Cloudflare D1 Free quota enforcement: https://developers.cloudflare.com/changelog/post/2026-09-01-d1-free-tier-limit-enforcement/
- Astro Cloudflare adapter: https://docs.astro.build/en/guides/integrations-guide/cloudflare/
- GitHub Actions billing and usage: https://docs.github.com/en/actions/concepts/billing-and-usage

Provider limits and supported versions can change. Recheck before installing dependencies, provisioning resources and launch.

### Workers Free constraints relevant to this project

The current Cloudflare documentation lists:

- 100,000 Worker requests per day.
- 10 ms CPU time per HTTP request.
- 128 MB memory per isolate.
- 50 subrequests per invocation.

Cloudflare notes that SSR and authentication workloads can use 10–20 ms CPU time, so the 10 ms Free limit is a material design risk. This is not a reason to upgrade: optimise, measure, reduce runtime work, and stop if the workload cannot fit the approved budget.

### D1 Free constraints relevant to this project

The current D1 documentation lists:

- 5 million rows read per day.
- 100,000 rows written per day.
- 5 GB total storage across the account.
- 500 MB maximum size per individual Free-plan database.
- 10 databases per Free account.
- 7 days of Time Travel recovery.
- 50 D1 query subrequests per Worker invocation.

Since 2026-09-01, D1 Free daily read/write limits are enforced. Queries fail until the daily reset when a limit is exceeded; stored data is not deleted. The application must display a safe service-unavailable state, preserve editorial records and never automatically upgrade the account.

### Astro and runtime compatibility

The current Cloudflare guide supports Astro deployment on Workers. The current adapter documentation identifies Astro 7 with `@astrojs/cloudflare@14`; Astro 6 and 7 require Node.js 22.12 or later. Pin mutually compatible versions during Phase 1 rather than installing unpinned latest packages.

### Important hidden-resource safeguard: Astro Sessions

The current Astro Cloudflare adapter automatically configures Workers KV for Astro Sessions and can automatically provision a KV namespace named `SESSION` during deployment. That would introduce another Cloudflare resource that has not been separately approved.

For the initial implementation:

- Explicitly disable Astro Sessions in the adapter configuration unless a separately reviewed need arises.
- Do not rely on automatic resource provisioning.
- Prefer a deliberately designed D1-backed server-side session store for admin session revocation and auditability, subject to security and CPU benchmarking.
- Do not add KV, R2, Queues, Durable Objects, Turnstile, Images or other services without a documented need and a separate no-cost/permission check.

### Android-first development and CI

The owner works from Android and does not rely on a desktop PC. Use GitHub's browser interface for repository review and changes where practical. Use standard GitHub-hosted Actions runners for repeatable builds and tests: GitHub documents standard runner use as free for public repositories. Do not use larger runners or paid cloud development environments. A deployment workflow must not be added until its credentials, permissions and cost boundary have been reviewed.

## 5. Recommended implementation architecture

1. **Framework:** Astro 7 with a compatible `@astrojs/cloudflare@14` adapter, pinned to tested versions.
2. **Runtime:** Cloudflare Workers Free.
3. **Database:** Existing D1 database `careeropportunities`, subject to dashboard confirmation.
4. **Database access:** A provider-isolated repository/data-access layer; SQLite-compatible, ordered SQL migrations; parameterised statements; explicit indexes; no direct D1 calls scattered through UI components.
5. **Public/admin separation:** Distinct public and admin route/layout areas in one application, with all admin authentication and authorisation enforced server-side.
6. **Editorial safety:** Public reads expose published records and approved fields only. Draft, evidence, review, audit and session data remain private.
7. **Authentication:** Use a maintained edge-compatible password hashing approach selected only after compatibility and CPU benchmarking. Use revocable server-side sessions, secure HttpOnly/Secure/SameSite cookies, CSRF protection, login throttling and audit events. Never invent or hand-roll cryptography.
8. **Astro sessions:** Disable adapter-managed KV sessions initially to avoid automatic KV provisioning. Use the approved D1-backed session design instead, if it passes tests.
9. **Rendering:** Pre-render pages that do not depend on live database content. Use on-demand rendering only where needed, and benchmark CPU usage for public listings, opportunity details and admin routes against the 10 ms Free limit. Do not claim performance suitability before measurement.
10. **Testing/build:** Use GitHub Actions standard runners on this public repository for pinned Node.js 22.12+ build, type checks, tests and local D1 migration tests. CI must not deploy or access production secrets.
11. **Data portability:** Preserve complete CSV/JSON/SQL export and tested restore requirements, including source, evidence, verification, approval and audit history.
12. **Deployment:** No deployment or further resource provisioning until owner-reported account state is rechecked and deployment-specific permission is obtained.

## 6. Phase 0 findings and risks

| Area | Result | Consequence |
|---|---|---|
| Repository and project identity | Verified | Continue on existing `main` and use PRs |
| Project governance documents | Verified | Preserve; use as acceptance criteria |
| Application code | Not present | Create clean minimal skeleton in Phase 1 |
| D1 schema and migrations | Not present | Design and test before real opportunity records |
| Admin authentication | Not implemented | Must be a separate security gate |
| Workers Free CPU limit | High implementation risk | Benchmark SSR and password hashing early |
| D1 quota enforcement | Confirmed | Index queries and handle quota errors safely |
| Astro KV auto-provisioning | Identified | Disable Astro Sessions to avoid unapproved KV |
| Cloudflare account state | Owner-reported | Recheck before deployment/provisioning |
| Android-only workflow | Known constraint | Use mobile-friendly GitHub workflow and hosted CI |
| Paid services | Not approved | R0.00 boundary remains absolute |

## 7. Phase 0 exit decision

**Phase 0 repository audit and public technical-feasibility review: complete.**

The stack remains viable for a small initial release, but it is not yet proven to meet the Workers Free 10 ms CPU limit for SSR and authentication. This must be tested in Phase 1 before real records or production credentials are used.

**Next recommended stage:** Phase 1 — create the minimal Astro/Workers project skeleton, pinned dependencies, safe configuration examples, CI build/test workflow and local D1 migration/test harness. Keep this stage local/CI-only: no deployment, no production data, no additional Cloudflare resources and no paid services.

## 8. Scope and change control

This audit changed no Cloudflare settings, created no Cloudflare resources, deployed no application and changed nothing in `seta-careers-platform`. It is documentation only.

Any future paid service, new provider resource, custom domain, deployment credential, public release or change to the human editorial-control rules requires separate review and explicit owner approval.
