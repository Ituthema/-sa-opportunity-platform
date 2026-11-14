# Staged Roadmap

This roadmap is a plan, not evidence that the listed work has been completed. Work should proceed in small, reviewable stages. Keep the initial budget at R0.00. Each stage must pass its acceptance gate before the next begins.

## Stage 1 — Repository and project foundation

- [x] Establish project identity and independent repository.
- [x] Record project charter and permanent constraints.
- [x] Record initial architecture direction.
- [x] Define human verification and publication workflow.
- [x] Define security, privacy, portability and backup requirements.
- [x] Confirm current repository name and public visibility are accepted for this stage (owner explicitly approved proceeding with the existing repository as-is).
- [x] Record project documentation links and repository working rules.
- [ ] Add implementation-specific contribution and task rules alongside the first application structure.

## Stage 2 — Phase 0: Repository audit and technical feasibility

- [x] Revalidate repository metadata, default branch, visibility, latest commit, branches and merged pull requests (audit 2026-11-14).
- [x] Inspect project charter, architecture, editorial workflow, security, portability, roadmap and README.
- [x] Check for existing application manifests, framework configuration, Wrangler configuration, ignore rules and CI workflows; none were found at the checked paths on `main`.
- [x] Refresh official Astro, Cloudflare Workers and D1 documentation review (2026-11-14; see [Phase 0 audit](PHASE_0_AUDIT_2026-11-14.md)).
- [x] Record current Workers and D1 Free limits, quota exhaustion behaviour and the 10 ms CPU risk.
- [x] Record owner-reported Cloudflare account state: Workers Free accessible, `workers.dev` subdomain available, D1 project database `careeropportunities` created, Billing page accessible and no paid plan/add-on reported active. This is not independent account API verification.
- [x] Record the proposed application, database, authentication, session, testing and Android-first development boundaries.
- [ ] Recheck account plan, current usage, exact database identity, payment-method requirement and absence of paid commitments in the dashboard immediately before deployment or any further provisioning.
- [ ] Reconfirm the exact `workers.dev` hostname and intended production binding before deployment.
- Do not provision additional resources, deploy, or proceed through a payment/upgrade prompt without explicit owner approval.

**Stage 2 exit:** Repository and public technical-feasibility audit complete. Account-specific rechecks remain a deployment gate, not permission to create or upgrade resources.

## Stage 3 — Phase 1: Minimal application and D1 foundation (in review)

- [x] Add a minimal Astro 7 application and compatible pinned `@astrojs/cloudflare@14` adapter (CI validation pending).
- [x] Configure Node.js 22.12 or later in GitHub-hosted CI.
- [x] Add explicit Cloudflare adapter configuration and disable Astro Sessions to prevent unapproved Workers KV provisioning.
- [x] Add a Wrangler configuration example with a deliberately invalid local-only D1 ID, no secrets and no deployment workflow.
- [x] Add a provider-isolated, parameterised D1 read layer and ordered SQLite-compatible initial migration for `careeropportunities`.
- [x] Add local D1 migration command and Node built-in data-access tests (CI validation pending).
- [x] Add GitHub Actions CI on standard hosted runners for checks, tests, local migration and build; no production secrets or deployment (CI validation pending).
- [x] Add a safe environment example, `.gitignore`, `AGENTS.md` working rules and a generic D1 health endpoint.
- [x] Keep the initial public shell separate from future admin routes; no credentials, real opportunities or public publishing.
- [ ] Benchmark representative Worker CPU use, especially SSR and password hashing, against the 10 ms Free limit before production use.
- [x] No production deployment or additional Cloudflare resource provisioning in this stage.

**Phase 1 acceptance remains pending until the pull-request CI run passes and the implementation is reviewed.** The remote database identity and binding remain unverified; the Wrangler database ID is a local-only placeholder.

## Stage 4 — Secure admin foundation

- Implement server-side authentication, revocable session handling, CSRF protection, login throttling and roles.
- Select and benchmark a maintained password-hashing implementation compatible with the Workers runtime and Free CPU budget.
- Test access controls and unauthorised requests.
- Implement security-relevant audit logging without recording secrets.
- Add a private draft-entry workflow.
- Do not enter real credentials or operational data until security gates pass.

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
