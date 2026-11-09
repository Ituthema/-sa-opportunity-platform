# Zero-Cost Platform Feasibility Review

**Review date:** 2026-11-09  
**Status:** Technical compatibility confirmed; account-specific onboarding checks remain pending  
**Scope:** Astro, Cloudflare Workers and Cloudflare D1 for the initial R0.00 development stage

## 1. Executive decision

The proposed initial stack remains technically viable:

- Astro for the public website and server-rendered private editorial interface.
- Cloudflare Workers as the application runtime and deployment target.
- Cloudflare D1 as the initial relational database.
- GitHub as source control and the review/change-history system.

Current official Cloudflare documentation describes a supported Astro-on-Workers deployment path and the Cloudflare Astro adapter. D1 is available on the Workers Free plan. This confirms technical compatibility, not the availability or configuration of the owner's individual Cloudflare account.

**Decision:** Retain Astro + Workers + D1 for the first implementation. Do not provision resources, activate a paid plan, add billing, buy a domain, or deploy until the account-specific checks in section 6 have been completed.

## 2. Official documentation reviewed

The following first-party documentation was reviewed on 2026-11-09:

- Astro on Cloudflare Workers: https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/
- Workers platform limits: https://developers.cloudflare.com/workers/platform/limits/
- Workers pricing: https://developers.cloudflare.com/workers/platform/pricing/
- D1 pricing: https://developers.cloudflare.com/d1/platform/pricing/
- D1 limits: https://developers.cloudflare.com/d1/platform/limits/
- D1 FAQ: https://developers.cloudflare.com/d1/reference/faq/
- D1 free-tier enforcement changelog: https://developers.cloudflare.com/changelog/product/d1/

Provider limits and terms can change. Recheck these pages before provisioning and before launch.

## 3. Free-tier capacity and behaviour

### Cloudflare Workers Free

The current documentation lists:

- 100,000 Worker requests per day.
- 10 milliseconds CPU time per invocation.
- 128 MB memory.
- 50 subrequests per invocation.
- Up to 100 Workers per account.
- Static asset requests are included without charge under the documented Free plan behaviour.

The 10 ms CPU allowance is a meaningful constraint for dynamic SSR and admin requests. Keep public pages static/pre-rendered wherever their content does not need request-time rendering. Keep server routes lean, measure real execution time, and avoid expensive work inside request handlers.

### Cloudflare D1 on Workers Free

The current documentation lists:

- 5 million rows read per day.
- 100,000 rows written per day.
- 5 GB aggregate storage across the account.
- 500 MB maximum size for an individual Free-plan database.
- 10 databases per Free account.
- Seven days of Time Travel recovery.
- 50 D1 query subrequests per Worker invocation.

D1 is SQLite-compatible and each individual database processes queries serially. The initial workload should use one appropriately indexed database rather than creating multiple databases without a demonstrated need.

### Quota exhaustion

Since 2026-09-01, D1 Free-plan daily read and write limits are enforced. When either daily quota is exceeded, D1 queries fail until the daily reset at 00:00 UTC. Stored data is not deleted by this enforcement.

The application must handle quota errors safely, show a service-unavailable state where necessary, preserve editorial data, and never attempt to upgrade the account automatically.

### Paid-plan boundary

The current Workers Paid plan has a minimum account charge of US$5 per month. Usage-based services can introduce additional charges depending on the product and configuration.

This project remains R0.00 during initial development. Do not select Workers Paid, enable a paid add-on, purchase a domain, or enable usage-based billing. A limit being reached is a reason to pause and review, not permission to spend.

## 4. Architecture implications

1. Use Astro's supported Cloudflare adapter for server-rendered routes.
2. Pre-render content pages where practical to reduce Worker invocations and CPU usage.
3. Use D1 only behind a provider-independent data-access boundary.
4. Keep SQL migrations ordered, version-controlled and tested against SQLite-compatible behaviour.
5. Use explicit indexes for public filters, status, category, province, organisation and closing-date queries where supported by actual query plans.
6. Keep public queries limited to published records and approved fields.
7. Keep authentication, authorisation, approval and publication decisions server-side.
8. Keep request handlers short; do not perform scraping, AI processing, large imports or lengthy external calls inside page requests.
9. Export the full relational dataset in portable formats and test restoration independently of the hosting provider.
10. Treat D1-to-PostgreSQL as a planned data migration, not a drop-in connection-string change.

## 5. Suitability assessment

| Requirement | Assessment |
|---|---|
| R0.00 initial development | Feasible if only Free features are used |
| Mobile-first public website | Suitable |
| Searchable opportunity directory | Suitable with careful indexing and query design |
| Small private editorial team | Suitable in the initial stage, subject to security testing |
| Human verification and approval | Supported by the proposed application design |
| Initial relational data storage | Suitable within the Free storage and daily query quotas |
| Large traffic or high-volume writes | Not guaranteed by Free limits |
| Heavy SSR or CPU-intensive processing | Constrained by the 10 ms Free CPU limit |
| Future PostgreSQL migration | Feasible only with explicit schema/data migration work |
| Production reliability and support | Not guaranteed by a Free plan |

This is a feasibility assessment, not a production capacity guarantee or a security certification.

## 6. Account-specific checks still required

These checks cannot be established from public provider documentation or repository access:

- Confirm the owner's Cloudflare account can access Workers Free and D1 Free.
- Confirm the account onboarding flow does not require a paid commitment or payment method for the intended Free features.
- Inspect the account billing/subscription screen and confirm no paid Workers plan or paid add-on is active for this project.
- Confirm the account's current usage and resource quotas before creating any resource.
- Confirm a free `workers.dev` subdomain is available for the account.
- Stop if the dashboard requests a paid subscription, paid feature, card-backed commitment or upgrade.

No Cloudflare resource has been created and no account setting has been changed as part of this review.

## 7. Repository and security boundary

The GitHub repository is currently public and the owner has approved proceeding with its existing name and visibility. Therefore:

- Commit only public project documentation and source code.
- Never commit secrets, credentials, private applicant data, production data or private backups.
- Do not store real admin credentials in examples, issues or commits.
- Do not treat repository privacy as an application security control.
- Keep the independent platform separate from `seta-careers-platform`.

## 8. Stage 2 outcome

**Completed:** Official documentation review confirms a supported Astro-on-Workers path and a D1 Free tier with documented quotas and safe failure behaviour.

**Pending:** Account-specific onboarding, billing, subdomain and quota checks. No account access or provisioning has been performed.

**Next implementation gate:** Once the owner confirms the Cloudflare Free account checks, create the minimal Astro/Workers application skeleton and local D1 migration/test setup. Local development and automated tests must remain possible without deploying or creating billable resources.
