# Phase 1 — Minimal Astro and D1 foundation

**Status:** Implementation proposed in branch `phase-1/astro-d1-foundation`. Acceptance depends on GitHub Actions results and review; this document does not claim a successful build until CI passes.

## Scope
- Minimal Astro server application with the Cloudflare Workers adapter.
- Explicitly disabled Astro Sessions to prevent adapter-managed KV namespace provisioning.
- A single D1 binding named `DB`, pointing by name to the owner-reported existing `careeropportunities` database.
- A placeholder database ID in Wrangler configuration for local-only work. It is deliberately not a usable production identifier.
- One initial SQLite-compatible opportunity schema migration.
- Provider-isolated, parameterised read operations that return published records only.
- A generic database health endpoint that does not expose operational error details. Cloudflare bindings are imported through the current `cloudflare:workers` API, with types generated from Wrangler configuration.
- Node built-in tests for the data-access layer.
- GitHub Actions validation on standard hosted runners; no deploy job, secrets or Cloudflare account access.

## Local database testing
Run `npm install`, then `npm run db:migrate:local`. Wrangler creates/uses its local development database under the ignored `.wrangler/` directory. The configured D1 ID is a placeholder and must not be used for remote commands.

## Required account-specific follow-up
Before any remote D1 operation or deployment, the owner must verify the exact `careeropportunities` database in the Cloudflare dashboard and separately approve the operation. Replace the placeholder ID only after that verification. Do not paste API tokens or credentials into GitHub files or chat.

## Known limitations
- No production deployment or remote database connection has been performed.
- No real opportunity records are included.
- No admin authentication, sessions, roles, editorial workflow UI, public search UI or publishing workflow is implemented.
- The health route tests the D1 binding at runtime; local build/test CI does not prove production connectivity.
- Workers Free 10 ms CPU suitability remains unproven and requires measured testing before production use.
- This is a foundation, not a launch-ready service.

## Phase 1 acceptance
1. CI installs dependencies and passes Astro checks/build.
2. Node tests pass.
3. The initial migration applies successfully to a fresh local D1 database.
4. No deployment, remote D1 operation, new Cloudflare resource, paid service or production secret is used.
5. Review confirms public reads are restricted to published records and parameterised filters.
