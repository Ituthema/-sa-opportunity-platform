# Phase 1 — Technical Implementation and Acceptance Specification

**Status:** Phase 1 foundation delivered and merged. This specification records the exact implementation, repository map, repeatable validation procedure, acceptance evidence, and boundaries for subsequent work. It does not authorise new infrastructure, remote database access, deployment, or paid services.

**Repository:** `Ituthema/-sa-opportunity-platform`  
**Baseline branch:** `main`  
**Baseline commit at specification preparation:** `4abf94b7d7ab6c8d6f59f13b0567778d08a14950`  
**Original implementation PR:** [#3 — Phase 1: Astro application and safe D1 foundation](https://github.com/Ituthema/-sa-opportunity-platform/pull/3)  
**Original Phase 1 branch:** `phase-1/astro-d1-foundation`  
**Runtime/framework:** Astro 7.4.4, `@astrojs/cloudflare` 14.4.8, Wrangler 4.161.0  
**Node.js in CI:** 22.23.4  
**Database binding:** `DB`, configured for the owner-reported D1 database name `careeropportunities`  
**Initial budget:** R0.00

---

## 1. Purpose

This specification defines what the Phase 1 foundation is responsible for, which repository files implement it, how it is validated, and what evidence is required before calling it accepted.

The guiding rule is incremental delivery:

- Establish and test the smallest reliable application foundation.
- Preserve the already merged Phase 1 implementation.
- Do not implement future features merely because the architecture could support them.
- Add a feature only when its stage is reached, its requirements are approved, and its own acceptance criteria are defined.
- Keep the application and data model portable so later expansion does not require a wholesale rewrite.

This repository is independent of the separate `seta-careers-platform` project. No code, credentials, deployments, databases, workflows, or private content may be copied from or coupled to that project.

## 2. Phase 1 outcome and status

Phase 1 is the **minimal Astro and D1 foundation**, not the first complete public release.

The implementation was merged to `main`. PR #4 corrected the Cloudflare runtime configuration and passed the recorded CI run. PR #5 reconciled project documentation. The current repository also contains a separate Stage 4 secure-administration plan; that plan is not authentication implementation.

### Delivered and accepted in Phase 1

- Minimal Astro server application using the Cloudflare Workers adapter.
- Astro Sessions explicitly disabled to avoid adapter-managed KV provisioning.
- Wrangler configuration with a D1 binding named `DB`.
- A deliberately invalid, local-only D1 database ID placeholder.
- One portable SQLite/D1 migration for the initial opportunities table.
- Provider-isolated, parameterised read functions for published opportunities.
- A generic database health endpoint that does not expose internal error details.
- A minimal prerendered public landing page.
- Node built-in tests for the opportunity repository.
- GitHub Actions CI using standard GitHub-hosted runners.
- Local-only D1 migration validation.
- No production deployment, remote D1 operation, production secret, new Cloudflare resource, or paid service.

### Recorded validation evidence

The successful PR #4 CI run (run ID `43680630953`) recorded:

| Check | Result |
|---|---|
| Dependency installation with Node.js 22.23.4 | Passed |
| Wrangler binding type generation | Passed |
| Astro diagnostics | 0 errors, 0 warnings, 0 hints |
| Node built-in tests | 4 passed, 0 failed |
| Initial migration on a fresh local D1 database | Passed; 5 SQL commands executed |
| Astro Cloudflare production build | Passed |

The migration used the local database. No remote D1 database was read or changed.

**Acceptance statement:** The scoped Phase 1 foundation is accepted as delivered. This does not mean the platform is production-ready or that the future capabilities listed in this document have been implemented.

## 3. Fixed architectural decisions

The following decisions are part of the accepted foundation and must not be changed casually:

1. **Astro remains the application framework.** Do not replace it solely to add future routes, server functionality, or administration.
2. **Cloudflare Workers is the intended server runtime.** Use the supported Astro Cloudflare adapter.
3. **D1 is the initial relational database.** The application accesses it through an injected binding, not by embedding account credentials or provider discovery throughout the code.
4. **The D1 binding name is `DB`.** Keep binding names consistent across Wrangler configuration, generated types, runtime access and tests.
5. **Astro Sessions remain disabled in this foundation.** Do not enable sessions or allow an adapter to provision KV without a separately reviewed design and explicit approval.
6. **Public reads expose published records only.** Use parameterised SQL for values supplied by a request.
7. **Migrations remain ordered and portable.** Schema changes must be committed as migration files and tested against a fresh local database.
8. **CI does not deploy.** CI must not access production secrets or perform remote D1 operations.
9. **Human editorial control is permanent.** Software can validate formats and flag issues, but people discover, verify, approve, publish, close and archive opportunities.
10. **The budget remains R0.00 initially.** No paid service, upgrade, billing activation, subscription, add-on, domain, API or billable resource without separate explicit approval.

## 4. Exact repository file map

The following files exist in the accepted Phase 1 implementation on `main`.

| File | Responsibility | Phase 1 treatment |
|---|---|---|
| `package.json` | Pinned dependencies, Node engine and validation scripts | Existing; change only with compatibility review |
| `astro.config.mjs` | Astro server output, Cloudflare adapter and Sessions disabled | Existing; preserve decisions |
| `wrangler.jsonc` | Worker entrypoint, compatibility settings, assets and D1 binding | Existing; D1 ID is a local-only placeholder |
| `src/env.d.ts` | Type declarations for the runtime D1 binding | Existing; keep aligned with generated/runtime types |
| `src/pages/index.astro` | Minimal prerendered public landing page | Existing; no opportunity directory implied |
| `src/pages/health.ts` | Non-prerendered database health endpoint | Existing; no remote connectivity proven |
| `src/lib/opportunities/repository.js` | Parameterised published-opportunity reads | Existing; keep provider boundary |
| `migrations/0001_initial_opportunities.sql` | Initial SQLite/D1 opportunities schema and indexes | Existing; never edit an applied migration; add a new migration for later schema changes |
| `tests/opportunity-repository.test.js` | Node tests for repository query behaviour | Existing; extend with regression tests as requirements arise |
| `.github/workflows/ci.yml` | Hosted CI for install and validation | Existing; no deployment job |
| `.env.example` | Safe local environment example | Existing; never add real credentials |
| `.gitignore` | Excludes generated files, local databases, environment secrets and exports | Existing; preserve private-data exclusions |
| `AGENTS.md` | Repository-specific working rules and project constraints | Existing; follow before code changes |

Related documentation already present:

- `docs/PHASE_1_IMPLEMENTATION.md` — delivery and validation record.
- `docs/ARCHITECTURE.md` — architecture principles.
- `docs/PROJECT_CHARTER.md` — project scope and constraints.
- `docs/EDITORIAL_WORKFLOW.md` — human editorial process.
- `docs/SECURITY_AND_PRIVACY.md` — security and privacy requirements.
- `docs/DATA_PORTABILITY_AND_BACKUPS.md` — portability and backup requirements.
- `docs/STAGE_4_SECURE_ADMIN_PLAN.md` — future secure-admin planning only.
- `docs/ROADMAP.md` — staged delivery roadmap.

Do not create speculative folders or placeholder files for future modules simply to make the repository look complete. Add a file when an approved task needs it.

## 5. Implementation tasks and traceability

The following task register records the Phase 1 work and its evidence. It is not a request to repeat completed work.

| Task | Implementation requirement | Exact files | Acceptance evidence | Status |
|---|---|---|---|---|
| P1-01 | Configure pinned Astro and Cloudflare adapter | `package.json`, `astro.config.mjs` | Wrangler types, Astro check and build pass | Complete |
| P1-02 | Configure Worker entrypoint and local D1 binding | `wrangler.jsonc`, `src/env.d.ts` | Binding types generate; placeholder remains non-production | Complete |
| P1-03 | Add portable initial opportunity schema | `migrations/0001_initial_opportunities.sql` | Migration applies to fresh local D1 | Complete |
| P1-04 | Add safe published-record repository reads | `src/lib/opportunities/repository.js` | Parameterised query tests; public reads constrained to published status | Complete |
| P1-05 | Add generic database health endpoint | `src/pages/health.ts` | Endpoint compiles; generic success/degraded responses and no-store header | Complete at build/code-review level; live remote probe not tested |
| P1-06 | Add minimal static public shell | `src/pages/index.astro` | Astro build succeeds with prerendered landing page | Complete |
| P1-07 | Add automated checks and local migration validation | `tests/opportunity-repository.test.js`, `.github/workflows/ci.yml`, `package.json` | PR #4 CI run 43680630953 passed | Complete |
| P1-08 | Record implementation and limitations | `docs/PHASE_1_IMPLEMENTATION.md`, `docs/ROADMAP.md`, `README.md` | Docs reflect verified results and outstanding gates | Complete |

### Required regression behaviour

Any later change to the Phase 1 foundation must continue to prove that:

- A blank or whitespace-only slug does not issue a database query.
- Slug values are bound as SQL parameters.
- Category and province values are bound as SQL parameters.
- Public opportunity reads always constrain results to `status = 'published'`.
- List limits have a safe default and are bounded to the supported maximum.
- The health response does not disclose SQL, credentials, binding identifiers or stack traces.
- Local migrations can be applied to a fresh local D1 database.
- No CI workflow deploys or accesses remote D1.

## 6. Validation commands

Run commands from the repository root in the GitHub Codespaces terminal, another compatible Node.js 22.23.4+ environment, or the standard GitHub Actions runner. Do not assume an Android terminal has the required Node/Wrangler environment.

### 6.1 Install dependencies

```bash
npm install --no-audit --no-fund
```

The repository currently has no committed lockfile in the inspected tree. Do not silently change dependency versions or introduce a lockfile policy as part of unrelated work. If lockfile adoption is proposed, handle it as a reviewed repository change.

### 6.2 Generate Worker binding types and run Astro diagnostics

```bash
npm run check
```

This currently runs:

```bash
wrangler types && astro check
```

Expected result: type generation completes and Astro reports no errors.

### 6.3 Run unit tests

```bash
npm test
```

Expected result: all four existing Node tests pass. Any new test must be deterministic and must not require production credentials or remote services.

### 6.4 Apply migrations to local D1 only

```bash
npm run db:migrate:local
```

This currently runs:

```bash
wrangler d1 migrations apply careeropportunities --local --config wrangler.jsonc
```

Expected result: the ordered migrations apply to the local Wrangler database. Local state is kept under ignored Wrangler files.

### 6.5 Build the Astro Cloudflare application

```bash
npm run build
```

Expected result: Astro produces the Cloudflare Worker build without errors.

### 6.6 Run the complete validation sequence

```bash
npm run validate
```

This currently runs, in order:

1. `npm run check`
2. `npm test`
3. `npm run db:migrate:local`
4. `npm run build`

**The required CI command is `npm run validate`.** The GitHub Actions workflow must continue to run on standard hosted runners, with read-only repository permissions, no production secrets and no deployment step.

## 7. GitHub Actions acceptance procedure

For a normal code change:

1. Work on a dedicated branch created from the current `main`.
2. Keep the change limited to the approved task.
3. Open a pull request against `main`.
4. Confirm the CI workflow runs.
5. Inspect the full job result, not only the green PR badge.
6. Confirm all checks pass and the diff contains no secrets, local database files, real records or unrelated changes.
7. Review the implementation against the relevant acceptance criteria.
8. Merge only after the checks and review pass.

For Android-only operation, these steps can be completed through GitHub's mobile website or app. A local desktop setup is not a prerequisite for reviewing the repository and CI results.

## 8. Explicitly out of scope for Phase 1

The following features are deliberately not included in the Phase 1 foundation and must not be added as incidental work:

- Administrator authentication, sessions or roles.
- Cloudflare Access application or account configuration.
- Admin dashboard, private forms or editorial interface.
- Opportunity creation, editing, verification, approval or publishing UI.
- Public opportunity directory or dynamic opportunity detail pages.
- Public search, filtering or pagination interface.
- Employer, SETA, province or qualification management screens.
- Real opportunity data or private evidence files.
- Applicant accounts, CV uploads, identity-document collection or application fees.
- Email, SMS, deadline notifications or scheduled expiry jobs.
- Dedicated search infrastructure, analytics, microservices or mobile applications.
- Production deployment, remote D1 reads/writes or production secrets.
- Paid services, upgrades, billing activation or new billable Cloudflare resources.

These are not rejected as future possibilities. They are deferred to their own roadmap stages and require separate specifications, cost checks, implementation tasks and acceptance tests.

## 9. Outstanding gates after Phase 1

The following items remain unverified or belong to later stages:

| Gate | What remains | Required before |
|---|---|---|
| Remote D1 identity | Verify the exact existing database and account binding in the Cloudflare dashboard | Any remote D1 operation |
| Remote runtime connectivity | Test the Worker binding against the verified database | Deployment/runtime acceptance |
| Workers Free CPU | Measure representative server rendering and any later authentication workload against current limits | Production architecture decision |
| Secure administration | Follow `docs/STAGE_4_SECURE_ADMIN_PLAN.md`; choose and test an authentication approach | Any private admin implementation |
| Editorial workflow | Implement separate human verification, approval and publication events | Real opportunity publishing |
| Public directory | Build public listing/detail routes and search only when the corresponding stage is approved | Public opportunity launch |
| Backup and restore | Complete an independent export and restore test | Production data use |
| Production deployment | Recheck account, billing, hostname, binding, limits and obtain explicit deployment approval | Any deployment |

The configured D1 database ID in `wrangler.jsonc` is intentionally `00000000-0000-0000-0000-000000000000`. It is a local-only placeholder, not a usable production identifier. Do not run remote D1 commands with it.

## 10. Safety rules — prohibited without separate approval

Do not run or add automation for:

- `wrangler deploy` or any production deployment.
- `wrangler d1 migrations apply ... --remote`.
- `wrangler d1 create`, database deletion, or new Cloudflare resource provisioning.
- `wrangler secret put` or uploading production credentials.
- Enabling Astro Sessions or provisioning KV.
- Enabling Cloudflare Access or changing account-level security configuration.
- Activating paid Workers, D1, Zero Trust, email, storage or other services.
- Any workflow that deploys automatically or modifies a remote database.

A documentation task or passing local CI is not authorisation for any of these operations.

## 11. Completion criteria

Phase 1 foundation is considered complete when all of the following are true:

- [x] Astro and the Cloudflare adapter are pinned and configured.
- [x] Wrangler configuration contains the intended D1 binding and a clearly marked local-only placeholder ID.
- [x] The initial portable migration applies to a fresh local D1 database.
- [x] Repository reads use parameterised SQL and expose published records only.
- [x] Unit tests pass.
- [x] Astro diagnostics and Cloudflare build pass.
- [x] GitHub Actions runs the full local validation sequence without deployment or production credentials.
- [x] The implementation and its limitations are documented.
- [x] No paid service, remote D1 operation, deployment or additional resource provisioning was used.

All Phase 1 foundation criteria above are recorded as satisfied by the merged implementation and PR #4 CI evidence.

**Phase 1 does not certify production readiness.** The outstanding gates in Section 9 remain mandatory.

## 12. Change control

Before changing a file listed in Section 4:

1. Read `AGENTS.md` and the relevant architecture/security documentation.
2. Identify which accepted behaviour or decision the change affects.
3. Add or update a focused test.
4. Keep the change within one approved task or explain why a second task is inseparable.
5. Run `npm run validate`.
6. Update the implementation record and roadmap only after evidence exists.
7. Do not mark a feature implemented or tested based solely on a plan or package installation.

If a future requirement would require a paid feature, remote database operation, account configuration, deployment, or a change to the R0.00 boundary, stop and obtain explicit approval first.

---

**Final Phase 1 decision:** Retain the merged Astro + Cloudflare Workers + D1 foundation. Do not rebuild it or expand it prematurely. Use this specification as the baseline for reviewing future implementation work, and advance only to the next separately approved roadmap stage after its prerequisites and acceptance criteria are satisfied.
