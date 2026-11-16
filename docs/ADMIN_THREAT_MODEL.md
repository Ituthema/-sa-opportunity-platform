# Stage 4 — Secure Administration Threat Model

Status: Initial design baseline; implementation and security review outstanding.
Date: 2026-11-16.

## 1. Security objectives

1. Only explicitly authorised, active administrators can access editorial functions.
2. Public pages remain public; admin protection must not expose or block unrelated routes.
3. Authentication and authorisation are enforced server-side on every page and API request.
4. Draft, rejected, unpublished, evidence-only and administrative data never leak through public routes.
5. Important editorial and account-security actions are attributable and auditable.
6. Security operates within R0.00 without weakening cryptography or activating paid services.
7. No applicant CVs, identity documents, bank details or application fees are collected.

## 2. Assets

| Asset | Impact if compromised |
|---|---|
| Admin identity and Access policy | Unauthorised access or owner lockout |
| Local admin mapping and roles | Privilege escalation |
| Draft opportunities | Premature or misleading publication |
| Source and evidence metadata | Loss of traceability or altered facts |
| Verification and approval history | False appearance of editorial review |
| Publication controls | Incorrect public information |
| Audit history | Inability to investigate changes |
| D1 and backups | Data loss or disclosure |
| Access tokens and cookies | Account compromise |
| Public content integrity | Reputational harm and misinformation |

## 3. Trust boundaries

- Browser to Cloudflare Access: all requests are untrusted until policy evaluation.
- Access to Worker: trust only the verified runtime identity context for a request that passed the intended Access application.
- Worker to application authorisation: provider identity is not permission; map it to an active local administrator.
- Application to D1: server-controlled parameterised operations; never expose admin bindings to client code.
- Public response: return approved published fields and records only.
- Public GitHub repository: never commit secrets, real admin identities, private evidence, production data or backups.
- Cloudflare account: account-level configuration is owner-controlled and requires separate approval.

## 4. Threat register

| Threat | Required mitigation and test |
|---|---|
| Unauthenticated direct access | Gate /admin and nested paths; test direct requests |
| Unprotected admin API | Enumerate and protect every /api/admin endpoint; call directly in tests |
| Identity-header spoofing | Use trusted runtime context; forged headers alone must not authenticate |
| Unmapped identity | Require explicit local mapping; deny by default |
| Disabled administrator | Check local active state on every request; deny immediately after disable |
| Privilege escalation | Server-side permission checks per operation; negative role tests |
| Public policy overreach | Path-specific policy; public route regression tests |
| Path/method bypass | Test encoded, nested, trailing-slash paths and every method |
| CSRF/cross-origin mutation | Origin validation and robust CSRF controls; adversarial tests |
| Cache leakage | Non-cacheable admin responses; inspect response headers and cache behaviour |
| Search indexing | Access gate, noindex and exclude admin paths from sitemap |
| XSS | Contextual output encoding, validation, CSP and XSS tests |
| SQL injection | Parameterised SQL and hostile-input tests |
| Secret leakage | Redacted logs, secret scanning and public repository review |
| Audit gaps/tampering | Append-only application audit events, transactionally coupled to sensitive changes |
| Account recovery/lockout | Document revocation and recovery; avoid weak fallback authentication |
| Resource exhaustion | Bounded inputs, rate controls, usage monitoring and safe failure |
| Data loss | Versioned migrations, independent private exports and tested restore |
| Dependency compromise | Pin dependencies, review updates, CI and dependency auditing |

## 5. Proposed route policy

| Route | Visibility | Control |
|---|---|---|
| / and public content | Public | No admin authentication |
| /health | Public or operationally restricted after review | No internal details or secrets |
| /opportunities/* | Public published content | Server query filters published status |
| /admin/* | Private | Access gate plus active local admin and role check |
| /api/admin/* | Private | Same protection plus per-action authorisation |
| Other /api/* | Explicit per endpoint | Deny by default for admin data |

No admin routes are implemented yet. Before implementation, enumerate every route and test policy matching for nested paths, encoded characters, trailing slashes and methods.

## 6. Provisional permission matrix

| Action | Owner | Editor | Reviewer |
|---|---:|---:|---:|
| View dashboard | Yes | Yes | Yes |
| Create/edit draft | Yes | Yes | No by default |
| Add/amend source evidence | Yes | Yes | Yes |
| Record verification | Yes | No | Yes |
| Approve/reject editorially | Yes | No | Yes |
| Publish/unpublish | Yes | No by default | Yes |
| Close/archive | Yes | No by default | Yes |
| Manage admin identities/roles | Yes | No | No |
| Change security configuration | Yes | No | No |

Owner approval is required for the final permission matrix. Even a single-owner workflow records verification and editorial approval as distinct decisions.

## 7. Data and logging restrictions

- Never store credentials, Access tokens, session cookies or password material in Git.
- Never log raw tokens, secrets, private evidence or unnecessary personal data.
- Audit events contain actor, action, target, timestamp and redacted change summary.
- Restrict audit history to authorised roles.
- Define retention and backup handling before real editorial data is used.
- Do not place production D1 data or backups in this public repository.
- Human reviewers remain responsible for evidence and editorial decisions.

## 8. Minimum security tests

- Anonymous requests to every admin page and API are denied.
- Valid Access identity without a local account is denied.
- Inactive local account is denied.
- Editor cannot call reviewer/owner actions directly.
- Reviewer cannot manage owner accounts or security configuration.
- Forged identity and role headers do not grant access.
- Missing or malformed Access context fails closed.
- Public pages remain reachable without Access and return published records only.
- Admin pages and APIs emit non-cacheable headers and are excluded from indexing.
- CSRF and cross-origin state changes are rejected.
- Sensitive actions create audit events without secrets.
- Tests use simulated identities and local D1 only.

## 9. Out of scope

- Applicant accounts and profiles.
- CV, ID or document uploads.
- Public user-generated content.
- Payments or application fees.
- Email/SMS notifications.
- Automated discovery, factual verification or publication.
- Production deployment or account-level Access configuration.

## 10. Acceptance status

This document establishes the initial threat model only. It does not demonstrate that any threat has been mitigated. Stage 4 cannot be accepted until identity mapping, server-side role enforcement, CSRF controls, audit events, automated negative tests and security review are implemented and passed.