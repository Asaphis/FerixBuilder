# FerixBuilder

FerixBuilder is a productized platform for custom business websites and applications. Businesses will submit requirements, preview the completed work, request controlled revisions, approve and pay, receive a managed delivery, and optionally engage FerixBuilder for ongoing technical management.

## Workspace map

| Path | Purpose |
|---|---|
| `Backend/` | Authenticated API, database queries, service workflows, security controls, and provider integrations |
| `Web/frontend/` | Editorial public experience and future customer product surfaces |
| `Web/admin/` | Protected internal operations application and implementation notes |
| `shared/contracts/` | Shared TypeScript event, workspace, and asset contracts |
| `docs/` | Architecture, conventions, and delivery roadmap |
| `drizzle/` | Database schema and generated migrations |

The runtime uses compatibility links named `server` and `client`, pointing to `Backend` and `Web/frontend`. Do not delete these links: the managed development and deployment configuration relies on them.

## Local development

Run `pnpm dev` to start the unified application. Use `pnpm check` to run the TypeScript compiler, `pnpm test` to run Vitest, and `pnpm format` to apply the repository formatter. Database changes follow this order: update `drizzle/schema.ts`, generate the migration, inspect the generated SQL, apply it through the approved database workflow, and add tests.

## Working conventions

Backend procedures are tRPC-first. Browser code uses the typed tRPC client and never directly queries the database or handles provider secrets. Files belong in object storage rather than database columns or public folders. Cross-area concepts belong in `shared/contracts`, not duplicated types. Time is persisted in UTC and displayed locally in the browser. New sensitive operations need an authorization check and an audit-log decision.

## Initial roadmap

The foundation is followed by customer acquisition and guided intake; the request-to-quote-to-preview-to-payment-to-delivery lifecycle; support and notifications; customer data modules; and finally managed hosting, deployment, domain, and observability capabilities. See `docs/ARCHITECTURE.md` for the boundaries that guide that work.
