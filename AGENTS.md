# Repository working rules

## Project identity and constraints
- This repository is the independent South African Opportunity Platform.
- Never import, copy, depend on, or modify the separate `seta-careers-platform` project.
- Initial development budget is R0.00. Do not activate paid plans, subscriptions, domains, APIs, add-ons or billable resources.
- Do not deploy or provision Cloudflare resources without separate explicit approval.
- Work from Android/browser-friendly GitHub workflows; do not assume a desktop computer.

## Editorial control
- A human must discover, verify, approve, publish, close and archive opportunity records.
- Technical validation may flag issues but must never make factual or editorial decisions.
- No AI-dependent extraction, verification or automatic publication.

## Security and data
- Never commit secrets, real credentials, production data, private evidence or private backups.
- Keep all admin authentication and authorisation server-side.
- Use parameterised SQL and restrict public reads to approved published records.
- Do not collect applicant CVs, identity documents or application fees in the initial platform.
- Keep migrations ordered and portable; document schema changes.

## Development
- Pin direct dependency versions and review updates deliberately.
- Add tests for data-access and editorial rules.
- CI must use standard GitHub-hosted runners and must not deploy or access production secrets.
- Label capabilities accurately as planned, implemented, tested, blocked or unknown.
- Do not merge a stage until its acceptance criteria and CI checks pass.
