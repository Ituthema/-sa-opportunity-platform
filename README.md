# South African Opportunity Platform

An independent South African careers, education and skills-development opportunity platform. Its purpose is to help people discover relevant opportunities through clear, structured, carefully maintained information.

**Project principle:** people control facts, verification, editorial decisions and publication. Software supports the workflow; it does not replace human judgement.

## Current project status

This repository is at the documentation and foundation stage. The application, database, authentication, public website and deployment have **not** yet been implemented.

- Initial development budget: **R0.00**.
- Initial repository: GitHub.
- Initial architecture direction: Astro for the web application, Cloudflare Workers for server-side execution, and Cloudflare D1 for the first relational database.
- Public website and private editorial administration are separate interfaces within one platform and must share a properly secured backend.
- No AI-dependent workflow and no automatic factual verification or publication.
- No applicant accounts, CV uploads, identity-document collection or application fees in the initial scope.
- No paid services, subscriptions, domains or billable features without explicit approval.

See [Project charter](docs/PROJECT_CHARTER.md), [Architecture](docs/ARCHITECTURE.md), [Platform feasibility review](docs/PLATFORM_FEASIBILITY_2026-11-09.md), [Editorial workflow](docs/EDITORIAL_WORKFLOW.md), [Security and privacy](docs/SECURITY_AND_PRIVACY.md), [Data portability and backups](docs/DATA_PORTABILITY_AND_BACKUPS.md), and [Roadmap](docs/ROADMAP.md).

## Independence

This is a standalone project. It must not import, copy, depend on, or make changes to the separate `seta-careers-platform` repository or its deployment, database, domain, credentials, workflows or content. Shared public knowledge and independently researched facts are not a software dependency.

## Budget and service policy

The initial budget is R0.00. Prefer genuinely free and open-source options. A free tier is not a guarantee of production reliability or unlimited usage. Document limits, monitor usage and stop rather than automatically upgrading when a limit or payment prompt is reached. Any spending or activation of a paid feature requires explicit user approval.

## Human editorial control

Only a human reviewer may decide whether an opportunity's facts are accurate, whether eligibility information is sufficiently supported, whether an advert is still open, whether a record is suitable for publication, and whether it should be closed or archived. Technical checks may flag conditions for review but must not make those decisions.

## Public repository notice

This repository is currently public. Do not commit passwords, API tokens, private keys, personal applicant information, private evidence files, production secrets or confidential operational data. The project owner has instructed work to proceed with the repository in its current state. Public visibility is not a reason to weaken application security or expose future admin data.

## Contributing and changes

Work in small, reviewable increments. Inspect repository guidance before changing code. Keep documentation aligned with tested implementation; clearly label planned, implemented, tested, blocked and unknown capabilities. Do not describe a feature as operational until it has been implemented and validated.
