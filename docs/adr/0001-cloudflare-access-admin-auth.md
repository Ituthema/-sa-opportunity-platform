# ADR-0001: Conditional recommendation to evaluate Cloudflare Access

- Status: Proposed; not approved for account configuration or deployment
- Date: 2026-11-16
- Stage: 4.1 — Secure admin threat model and design decision

## Context

The platform has a minimal Astro application on Cloudflare Workers with a D1 binding. It has no authentication, admin routes, admin schema, production hostname or production deployment. Astro Sessions are disabled. The repository is public and the initial budget is R0.00.

Admin access must be protected server-side on every page and API request, while public pages remain public. Authentication identity must be separate from application-owned active-account status, roles, editorial permissions and audit history.

Workers Free currently documents 10 ms CPU per HTTP request. Cloudflare notes that heavier authentication and SSR work commonly uses 10–20 ms. A custom password system is therefore not a safe default under the current free-tier constraint. Never weaken password KDF parameters to fit a quota.

## Options

### A — Cloudflare Access on admin paths, application-owned roles

Cloudflare documents Access protection for a hostname or path and a Worker identity API through ctx.access.getIdentity(). Its August 2026 changelog documents local Access simulation through Wrangler dev configuration. Astro's Cloudflare adapter exposes the Worker ExecutionContext through Astro.locals.cfContext.

Benefits: authentication occurs before application handling; avoids storing application passwords; avoids password-reset implementation; preserves provider-neutral application permissions.

Conditions: verify Zero Trust Free eligibility and billing in the actual account; choose an identity method; ensure every admin page and API path is covered; prove Astro context integration locally; keep public paths accessible; verify identity cannot be forged through caller-supplied headers.

### B — Application-managed passwords and sessions

Fallback only. Requires a maintained OWASP-accepted password KDF, secure sessions, expiry and revocation, CSRF controls, login abuse controls, recovery and audit events. Benchmark on the actual Worker runtime. Do not weaken cryptographic parameters. If secure authentication cannot fit approved free limits, stop and present alternatives.

### C — Third-party hosted identity

Not selected initially because it adds another service, account dependency and possible cost. Reconsider only with a documented free-tier, privacy and portability review and explicit approval.

## Conditional recommendation

Evaluate Option A first: Cloudflare Access narrowly scoped to future admin routes, with application-owned active-admin mapping, roles and audit events. This is not permission to enable Zero Trust, create an Access application, configure an identity provider, enable workers.dev, add a domain, deploy, run remote D1 operations or activate paid services.

## Proposed request flow

1. Public routes remain available without Access.
2. Admin paths are challenged or denied by the Access policy before reaching the Worker.
3. The application obtains identity only from the verified Access execution context.
4. Identity is mapped by provider issuer and stable subject to a locally provisioned admin.
5. The application checks active status and the required role for the specific operation.
6. Missing, invalid, unmapped, inactive or insufficiently privileged identities are denied.
7. Sensitive actions create redacted audit events.
8. Admin responses are non-cacheable and excluded from indexing.

## Proposed route boundary

- Admin pages: /admin/*
- Admin-only APIs: /api/admin/*
- Public routes remain outside this Access policy.
- No such admin routes currently exist. Before implementation, enumerate exact paths and test nested paths, trailing slashes, encoded paths and every HTTP method.

## Identity and security contract

- Investigate Astro.locals.cfContext.access and verify the actual Access identity API and types in the current adapter/runtime before relying on it.
- Never trust a browser-submitted email, role or arbitrary identity header.
- Store provider issuer/tenant and stable subject identifiers; email is display/contact metadata, not the sole permanent key.
- Require an explicitly provisioned, active local account. Access authentication alone grants no editorial permission.
- Enforce permissions in server-side service functions for every sensitive action.
- Fail closed if identity context is absent, invalid or unavailable.
- Protect every admin page and API; keep admin responses out of public caches and search indexes.
- Apply CSRF protection and Origin validation to state-changing requests; any exception requires a written, tested rationale.
- Record security and editorial events without logging tokens, cookies, passwords or private evidence.

## Evidence reviewed 2026-11-16

- Cloudflare Workers Access: https://developers.cloudflare.com/workers/configuration/cloudflare-access/
- Workers Access local simulation and ctx.access.getIdentity(): https://developers.cloudflare.com/changelog/post/2026-08-14-workers-access/
- Astro Cloudflare adapter and Astro.locals.cfContext: https://docs.astro.build/en/guides/integrations-guide/cloudflare/
- Workers Free CPU and request limits: https://developers.cloudflare.com/workers/platform/limits/

Cloudflare documents hostname/path protection and requires Zero Trust to be enabled. The current Wrangler config has workers_dev=false, preview_urls=false, no custom domain and a local-only placeholder D1 ID. There is no deployed hostname or live admin route.

Not verified: account-specific Access Free eligibility, billing implications, identity-provider options, active hostname, policy coverage or deployed runtime behaviour.

## Gates before implementation

- [ ] Owner confirms the threat model, route boundary and conditional recommendation.
- [ ] Verify Access Free eligibility and billing requirements in the actual account without enabling it.
- [ ] Confirm identity provider options for the owner and future named editors.
- [ ] Prove local Astro access to the Access identity context using Wrangler local simulation only.
- [ ] Test missing, present, unmapped and inactive identities; failures must deny.
- [ ] Prove all admin pages and APIs are covered and public pages remain public.
- [ ] Approve schema and provider-neutral authorisation design before migrations.
- [ ] Obtain separate explicit approval before account configuration, hostname enablement, deployment, remote D1 or paid services.

## Consequences

If Access is adopted, the application avoids owning password storage and reset, but still requires local identity mapping, role enforcement, CSRF review and audit history. Access is a Cloudflare dependency at the outer boundary; keep internal authorisation provider-neutral. Production readiness remains a separate approval gate.