# Stage 4 — Secure Admin Foundation Plan

**Status: Planning only. No authentication code, secrets, Cloudflare Access application, database migration, deployment or account configuration has been created by this plan.**

## 1. Objective

Build a private editorial workspace that only explicitly authorised people can access. Every sensitive page, read and write must be protected on the server. The public opportunity website must remain public and must not be accidentally placed behind an admin login.

The initial operating model is owner-led. Do not add public registration or applicant accounts. The platform must not collect applicant CVs, identity documents, bank details or application fees.

## 2. Non-negotiable constraints

- Preserve the R0.00 development budget. No paid identity provider, add-on, domain, subscription, API, service or usage upgrade without explicit approval.
- Do not deploy or configure Cloudflare Access in the account without separate explicit approval.
- Do not connect to or modify the existing remote D1 database in this stage. Use local-only migrations and test data.
- Do not put credentials, password hashes from real accounts, session secrets or private data in GitHub. The repository is public.
- Do not build custom cryptography or weaken password-hashing work factors to fit a CPU limit.
- Do not trust browser-only route guards, hidden links, client-supplied roles, arbitrary identity headers or an unverified email string.
- All authentication and authorisation decisions must be enforced server-side and fail closed.
- Preserve provider independence in the application's authorisation layer so a future identity provider can replace the initial one without rewriting editorial permissions.
- Continue to keep this project independent of `seta-careers-platform`.

## 3. Leading authentication option to evaluate

### Candidate A — Cloudflare Access for the admin paths, application-owned roles

This is the preferred first option to evaluate, not an approved implementation decision.

Cloudflare documents Access protection for a specific hostname or path, including a `workers.dev` hostname or a path routed to a Worker. A path-based policy can protect admin paths while leaving public routes on the same Worker available to everyone. Cloudflare also documents that a Worker can read the authenticated identity through its Access execution context; absence of that context must be treated as unauthenticated. See the official [Workers and Cloudflare Access guide](https://developers.cloudflare.com/workers/configuration/cloudflare-access/).

Potential benefits:
- Avoids storing or verifying application passwords in the Worker.
- Avoids creating a custom password-reset and session-authentication system.
- Separates the identity gate from the platform's own role and editorial permission model.
- Can protect the admin URL without making the public website private, provided the exact path policies are configured and tested.

Conditions to verify before choosing it:
1. Confirm Zero Trust / Access can be enabled for this account without a paid commitment or billing activation.
2. Confirm the current Free allowance and any identity-provider or policy restrictions. Cloudflare's current pricing page lists a Free tier for teams under 50 users, but account eligibility and current terms must be checked before use: [Cloudflare Zero Trust plans](https://www.cloudflare.com/plans/).
3. Confirm that a path-based application can protect every admin page and every admin mutation endpoint on the intended hostname, while leaving public pages unprotected.
4. Confirm the selected login method is usable by the owner and any future named editors.
5. Validate that the Astro adapter exposes the authenticated Access context as expected. Do not trust client-provided identity headers.
6. Test unauthenticated, authenticated, expired-session, wrong-identity and direct API requests. A protected admin page is not enough if an API route remains exposed.
7. Confirm that local development can use mocked/simulated Access identity without creating an account application or exposing a real admin.

Important boundary: Access is an authentication gate, not the platform's complete authorisation system. The application must still map a verified provider identity to an active local admin account and enforce role permissions for every protected operation.

Do not protect the entire Worker if that would also block the public site. Evaluate path-based protection for both the admin interface and any admin-only API paths. Avoid broad account-wide Access changes.

## 4. Fallback option — application-managed authentication

Only evaluate this if Access is unavailable, unsuitable or introduces a cost or operational dependency that is not accepted.

A self-managed login system would require a maintained password-hashing library and a supported secure algorithm. OWASP currently recommends Argon2id with at least 19 MiB memory and two iterations (or another OWASP-accepted configuration); it explicitly rejects fast general-purpose hashes such as plain SHA-256 for password storage. See the [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html).

This fallback is not selected yet because Cloudflare Workers Free currently documents a 10 ms CPU limit per HTTP request. Cloudflare notes that authentication and server-side rendering workloads can commonly use 10–20 ms. This makes it unsafe to assume that a robust password hash plus the rest of the request will fit the Free limit. See [Cloudflare Workers limits](https://developers.cloudflare.com/workers/platform/limits/).

Rules for the fallback:
- Never reduce password-hash parameters merely to pass a performance test.
- Never substitute SHA-256, MD5 or another fast hash for a password KDF.
- Benchmark the actual maintained implementation and recommended security parameters on the actual target runtime before adoption.
- If a safe configuration cannot operate within the approved free-tier limits, stop and present architecture alternatives. Do not silently activate a paid plan or external service.
- Do not implement account recovery by emailing a plaintext password or revealing whether an account exists.

## 5. Identity, roles and permission model

Keep identity separate from application permissions.

Proposed local admin account fields:
- Stable internal admin ID.
- Identity-provider key and provider subject identifier.
- Verified email address for display and administrative contact, where available.
- Active / disabled state.
- Role assignment.
- Created, updated and last-authorised timestamps.

Do not use an unverified request header or a browser-submitted email as the account identity. Prefer a stable provider subject plus issuer/provider identifier; confirm the actual identity claims available from the selected provider before defining the final schema.

Initial roles:
- **Owner:** full administrative control, including account management and all editorial actions.
- **Editor:** create and edit draft records, capture official source links and evidence metadata, and submit records for verification. Cannot approve or publish by default.
- **Reviewer:** verify facts against official sources, record verification events, make the separate editorial approval decision, and perform permitted publish/close/archive actions.
- A single-owner launch can use one owner account for all actions, but verification and editorial approval must still be recorded as separate events with actor and timestamp. Do not collapse the two decisions into one boolean.

Every protected action must check both authentication and the required role on the server. UI visibility is only a convenience and never a permission boundary.

## 6. Session and browser security

If Access is selected, Access manages the outer authentication session; the app still validates identity and local account status on every protected request.

If application-managed authentication is selected, the implementation must include:
- High-entropy, unpredictable opaque session tokens.
- Only a cryptographic hash of the session token stored in the database.
- Server-side expiry, revocation and rotation.
- Secure, HttpOnly, SameSite cookies with appropriate path and HTTPS requirements.
- Session renewal and logout invalidation.
- Session fixation protection after authentication or privilege changes.
- CSRF protection for every state-changing browser request.
- Origin checks and a synchronizer-token or equally robust CSRF design.
- No state-changing GET requests.

Regardless of provider:
- Fail closed if authentication context is missing, invalid or cannot be verified.
- Do not expose session tokens, password material or security secrets in logs, URLs, HTML, client JavaScript or analytics.
- Set and test appropriate security headers and a restrictive Content Security Policy.
- Keep admin pages and responses out of public caches and search indexing.

## 7. Audit and security-event records

Create an append-only audit trail for security-relevant events. At minimum:
- Successful and failed authentication.
- Logout and session revocation where applicable.
- Admin account activation, deactivation and role changes.
- Opportunity create/edit actions.
- Source/evidence changes.
- Verification decision.
- Editorial approval/rejection.
- Publication, unpublication, closure and archival.
- Security configuration changes.

Each event should capture actor, action, target record, timestamp and a minimal redacted change summary. Never log passwords, raw session tokens, API keys, private evidence content or unnecessary personal data. Restrict audit reads to authorised roles. Document retention and privacy handling before real operations.

## 8. Login abuse and recovery

- Apply rate limiting or equivalent abuse controls to any app-managed login and recovery endpoints.
- Use generic authentication failure responses that do not disclose whether an account exists.
- Add safe delay/lockout controls without creating an easy denial-of-service path against the owner.
- Keep recovery manual and documented for the initial owner-only system unless a secure, free and maintainable recovery channel is verified.
- Record security events without retaining unnecessary IP or device data.
- Never place reset tokens in logs or public repository files.

If Access handles login, verify the Access policy, allowed identities, session duration and emergency revocation procedure instead of duplicating password recovery inside the app.

## 9. Implementation sequence

### 4.1 — Threat model and design decisions
- [ ] Document assets, trust boundaries, likely threats and abuse cases.
- [ ] Confirm exact public and admin route boundaries, including admin API endpoints.
- [ ] Confirm the intended initial owner identity and future editor model without committing personal secrets.
- [ ] Compare Cloudflare Access with application-managed authentication for cost, identity method, portability, operational burden and security.
- [ ] Record an Architecture Decision Record (ADR) before implementation.

### 4.2 — Free-tier and runtime feasibility
- [ ] Recheck current Workers Free CPU, memory, request and D1 limits.
- [ ] Verify the current Access Free eligibility and account-specific setup requirements without enabling it.
- [ ] Test the Astro/Cloudflare adapter's local identity-context integration using mocked identity only.
- [ ] If the fallback is considered, benchmark a maintained OWASP-recommended password KDF. Local emulator timing is preliminary only; it is not proof of deployed Worker CPU time.
- [ ] Do not deploy a benchmark Worker or configure an Access application without separate approval.

### 4.3 — Schema and provider boundary
- [ ] Design portable local migrations for admin identities, role assignments, sessions if needed, and audit events.
- [ ] Keep provider identity mapping behind a small authentication adapter.
- [ ] Keep authorisation decisions in provider-neutral application code.
- [ ] Add indexes, foreign keys, constraints and documented retention rules.
- [ ] Use only local D1 in tests; do not connect to the existing remote database.

### 4.4 — Server-side authentication and authorisation
- [ ] Implement one authentication gate for every admin page and API route.
- [ ] Implement role/permission checks at each protected server action.
- [ ] Ensure inactive or unmapped identities are denied.
- [ ] Implement secure logout/revocation behaviour appropriate to the selected provider.
- [ ] Add CSRF protections for all state-changing actions.
- [ ] Keep public opportunity reads unaffected and restricted to published records.

### 4.5 — Security tests and review
- [ ] Test unauthenticated access to every admin route and API.
- [ ] Test authenticated but inactive/unmapped identities.
- [ ] Test each role against allowed and denied actions.
- [ ] Test direct API calls, forged identity headers, CSRF attempts, session expiry/revocation and logout.
- [ ] Test audit-event completeness and secret redaction.
- [ ] Test that public routes remain public and do not expose draft or private admin data.
- [ ] Run CI, dependency review and a documented security checklist.

### 4.6 — Acceptance and later deployment gate
- [ ] Obtain human review of the authentication design and implementation.
- [ ] Verify all Stage 4 tests and CI checks pass.
- [ ] Confirm the free-tier and billing position again.
- [ ] Document recovery, revocation, backups and incident response.
- [ ] Keep production credentials and real editorial records out until the security gate passes.
- [ ] Request separate approval before any non-production or production deployment, Access account configuration, remote D1 migration or paid-service activation.

## 10. Stage 4 acceptance criteria

Stage 4 is not complete until:
1. Every admin route and API endpoint is server-side protected.
2. Only an explicitly mapped, active identity can access the admin workspace.
3. Role permissions are enforced on every sensitive action.
4. CSRF protection, session/revocation behaviour and abuse controls are tested for the selected authentication method.
5. Audit events record security and editorial actions without exposing secrets.
6. Public routes remain public and never expose drafts or admin data.
7. Automated tests cover both allowed and denied paths.
8. CI passes and a security review is recorded.
9. No paid service, remote database operation, deployment or unapproved resource was used.

**Stage 4 completion does not automatically authorise production launch.** Public deployment, remote D1 connectivity, real credentials, real editorial records and the later editorial workflow remain separate approval gates.

## 11. Current recommendation

Evaluate Cloudflare Access first as a narrowly scoped gate for admin paths, with application-owned roles and audit history. It is the strongest initial candidate for an owner-only admin under the R0.00 constraint because it may avoid password-hashing CPU costs on Workers Free. Do not adopt it until its Free eligibility, account setup, path coverage and Astro identity integration are verified. If those conditions fail, stop and compare a secure self-managed design against a different free architecture rather than weakening authentication.
