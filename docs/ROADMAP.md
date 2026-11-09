# Staged Roadmap

This roadmap is a plan, not evidence that the listed work has been completed. Work should proceed in small, reviewable stages. Keep the initial budget at R0.00.

## Stage 1 — Repository and project foundation

- [x] Establish project identity and independent repository.
- [x] Record project charter and permanent constraints.
- [x] Record initial architecture direction.
- [x] Define human verification and publication workflow.
- [x] Define security, privacy, portability and backup requirements.
- [x] Confirm current repository name and public visibility are accepted for this stage (owner explicitly approved proceeding with the existing repository as-is).
- [ ] Add implementation-specific contribution and task rules after the first application structure exists.

## Stage 2 — Architecture validation and zero-cost account checks

- [x] Verify current Astro, Cloudflare Workers and D1 compatibility and deployment path (official documentation reviewed 2026-11-09; see [platform feasibility review](PLATFORM_FEASIBILITY_2026-11-09.md)).
- [ ] Check account onboarding, free-tier availability, payment-method requirements and overage behaviour before creating resources (owner dashboard confirmation required).
- [x] Record current quotas and safe limits with links and review date (reviewed 2026-11-09; recheck before provisioning and launch).
- [ ] Confirm that no paid feature or automatic billing is enabled (owner account dashboard check required).
- [ ] Define the application structure and server-side admin security design.
- Do not provision resources if a payment prompt or paid commitment is required.

## Stage 3 — Minimal application skeleton

- Create the Astro application and Workers deployment adapter.
- Add environment configuration examples without secrets.
- Add basic public layout and health checks.
- Add D1 schema and ordered migrations.
- Add automated tests for schema and core data-access behaviour.
- No real opportunities or public publishing yet.

## Stage 4 — Secure admin foundation

- Implement server-side authentication, session handling, CSRF protection, rate limits and roles.
- Test access controls and unauthorised requests.
- Implement audit logging.
- Add a private draft-entry workflow.
- Do not enter real credentials or operational data until security gates pass.

## Stage 5 — Editorial and listing management

- Implement structured opportunity records and source/evidence metadata.
- Implement distinct verification and editorial approval events.
- Implement draft, review, approval, publication, closure and archive controls.
- Add deterministic validation, duplicate warnings and date reminders.
- Require a human action for every factual or editorial decision.

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
- Launch only after all release gates are passed.

## Later — Evidence-led improvements

Possible later work includes richer alerts, RSS, PWA capabilities, additional editors, analytics and monetisation. Each requires a separate cost, privacy, reliability and maintenance review. Advertising remains disabled initially. No paid feature or upgrade may be activated without explicit approval.
