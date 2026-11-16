# Staged Roadmap

This roadmap is a plan, not evidence that the listed work has been completed. Work should proceed in small, reviewable stages. Keep the initial budget at R0.00. Each stage must pass its acceptance gate before the next begins.

## Stage 1 — Repository and project foundation

- [x] Establish project identity and independent repository.
- [x] Record project charter and permanent constraints.
- [x] Record initial architecture direction.
- [x] Define human verification and publication workflow.
- [x] Define security, privacy, portability and backup requirements.
- [x] Confirm current repository name and public visibility are accepted for this stage (owner explicitly approved proceeding with the existing repository as-is).
- [x] Record project documentation links and repository working rules, including implementation-specific guidance in `AGENTS.md`.

## Stage 2 — Phase 0: Repository audit and technical feasibility

- [x] Revalidate repository metadata, default branch, visibility, latest commit, branches and merged pull requests (audit 2026-11-14).
- [x] Inspect project charter, architecture, editorial workflow, security, portability, roadmap and README.
- [x] Check for existing application manifests, framework configuration, Wrangler configuration, ignore rules and CI workflows; none were found at the checked paths on `main` at the time of the audit.
- [x] Refresh official Astro, Cloudflare Workers and D1 documentation review (2026-11-14; see [Phase 0 audit](PHASE_0_AUDIT_2026-11-14.md)).
- [x] Record current Workers and D1 Free limits, quota exhaustion behaviour and the 10 ms CPU risk.
- [x] Record owner-reported Cloudflare account state: Workers Free accessible, `workers.dev` subdomain available, D1 project database `careeropportunities` created, Billing page accessible and no paid plan/add-on reported active. This is not independent account API verification.
- [x] Record the proposed application, database, authentication, session, testing and Android-first development boundaries.
- [ ] Recheck account plan, current usage, exact database identity, payment-method requirement and absence of paid commitments in the dashboard immediately before deployment or any further provisioning.
- [ ] Reconfirm the exact `workers.dev` hostname and intended production binding before deployment.
- Do not provision additional resources, deploy, or proceed through a payment/upgrade prompt without explicit owner approval.

**Stage 2 exit:** Repository and public technical-feasibility audit complete. Account-specific rechecks remain a deployment gate, not permission to create or upgrade resources.

## Stage 3 — Phase 1: Minimal application and D1 foundation (delivered)

- [x] Add a minimal Astro 7 application and compatible pinned `@astrojs/cloudflare@14` adapter.
- [x] Configure Node.js 22.23.4 or later in GitHub-hosted CI to satisfy the selected Astro release engine requirement.
- [x] Add explicit Cloudflare adapter configuration and disable Astro Sessions to prevent unapproved Workers KV provisioning.
- [x] Add a Wrangler configuration example with a deliberately invalid local-only D1 ID, no secrets and no deployment workflow.
- [x] Add a provider-isolated, parameterised D1 read layer and ordered SQLite-compatible initial migration for `careeropportunities`.
- [x] Add local D1 migration command and Node built-in data-access tests.
- [x] Add GitHub Actions CI on standard hosted runners for type generation, checks, tests, local migration and build; no production secrets or deployment.
- [x] Add a safe environment example, `.gitignore`, `AGENTS.md` working rules and a generic D1 health endpoint.
- [x] Keep the initial public shell separate from future admin routes; no credentials, real opportunities or public publishing.
- [ ] Benchmark representative Worker CPU use, especially SSR and future password hashing, against the 10 ms Free limit before production use.
- [x] No production deployment or additional Cloudflare resource provisioning in this stage.

**Phase 1 exit:** The implementation is merged into `main`; PR #4 CI passed (type generation, Astro checks, four tests, local D1 migration and build), and the implementation was reviewed. PR #5 reconciled the README and roadmap after validation. The local migration used no remote database. This completes the scoped foundation only; it does not establish production readiness.

The [Phase 1 technical implementation and acceptance specification](PHASE_1_TECHNICAL_ACCEPTANCE_SPEC.md) records the exact file map, task traceability, validation commands, acceptance evidence and explicit out-of-scope boundaries. Use it as the baseline when reviewing changes to the Phase 1 foundation; do not repeat completed work or add future features prematurely.

## Stage 4 — Secure admin foundation (planning complete; implementation not started)

The detailed design, decision gates and acceptance criteria are in [Stage 4 Secure Admin Foundation Plan](STAGE_4_SECURE_ADMIN_PLAN.md).

### 4.1 — Threat model and design decisions
- [ ] Document assets, trust boundaries and abuse cases.
- [ ] Define exact admin page and admin API route boundaries.
- [ ] Compare Cloudflare Access and application-managed authentication.
- [ ] Record an architecture decision before implementation.

### 4.2 — Free-tier and runtime feasibility
- [ ] Recheck current Workers Free and D1 limits.
- [ ] Verify Access Free eligibility and account-specific setup requirements without enabling it.
- [ ] Test local Astro identity-context integration with mocked identity.
- [ ] Benchmark any proposed password KDF; never lower security parameters to fit a CPU limit.
- [ ] Do not deploy a benchmark Worker or configure Access without separate approval.

### 4.3 — Schema and provider boundary
- [ ] Design local migrations for admin identities, roles, optional sessions and audit events.
- [ ] Keep identity-provider mapping separate from provider-neutral authorisation.
- [ ] Add portable constraints, indexes, relationships and retention rules.

### 4.4 — Server-side authentication and authorisation
- [ ] Protect every admin page and API route on the server.
- [ ] Implement least-privilege role checks for every sensitive action.
- [ ] Deny inactive or unmapped identities.
- [ ] Implement session/revocation and CSRF controls appropriate to the selected method.
- [ ] Preserve public access only to approved published records.

### 4.5 — Security tests and review
- [ ] Test unauthenticated, inactive, unmapped and insufficient-role requests.
- [ ] Test direct API calls, forged identity headers, CSRF, expiry/revocation and logout.
- [ ] Test audit completeness and secret redaction.
- [ ] Confirm public pages cannot expose drafts or admin data.
- [ ] Pass CI and a documented security review.

### 4.6 — Acceptance and later deployment gate
- [ ] Obtain human review of the design and implementation.
- [ ] Confirm free-tier and billing position.
- [ ] Document account recovery, revocation, backups and incident response.
- [ ] Keep production credentials and real editorial records out until security acceptance.
- [ ] Obtain separate approval before deployment, Access account configuration, remote D1 migration or paid-service activation.

**Stage 4 status:** Planning is recorded; no authentication code, account configuration, migration or deployment has been performed. The current recommendation is to evaluate narrowly scoped Cloudflare Access for admin paths first, while retaining application-owned roles and audit history. Adoption remains conditional on Free eligibility, account setup, path coverage and successful Astro integration tests.

## Stage 5 — Editorial and listing management

- Implement structured opportunity records and source/evidence metadata.
- Implement distinct verification and editorial approval events.
- Implement draft, review, approval, publication, closure and archive controls.
- Add deterministic validation, duplicate warnings and date reminders.
- Require an explicit human action for every factual or editorial decision.

## Stage 6 — Public information website

- Build crawlable opportunity pages, category pages, search and filters.
- Add official source links, last-verified dates and clear status labels.
- Add guides and institution directories.
- Add sitemap, robots, canonical URLs and suitable structured data.
- Test mobile usability, accessibility and performance.

## Stage 7 — Backup, recovery and controlled launch

- Implement complete exports and backups.
- Perform a restore test and document results.
- Review security, privacy, editorial accuracy and source-link behaviour.
- Verify current free-tier usage and limits.
- Reconfirm the account's no-paid-service boundary.
- Launch only after all release gates are passed and deployment is explicitly approved.

## Later — Evidence-led improvements

Possible later work includes richer alerts, RSS, PWA capabilities, additional editors, analytics and monetisation. Each requires a separate cost, privacy, reliability and maintenance review. Advertising remains disabled initially. No paid feature, subscription, upgrade or billable resource may be activated without explicit approval.
