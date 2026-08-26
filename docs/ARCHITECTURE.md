# FerixBuilder Architecture

FerixBuilder is one full-stack deployment with three deliberate workspace areas. This keeps typed contracts and security consistent while preserving the separation needed for future public/customer and internal-operation products.

| Area | Responsibility | Must not own |
|---|---|---|
| `Backend` | Authenticated tRPC API, database access, tenant authorization, business workflow services, secure integrations, and signed file decisions | Customer marketing presentation or administrative browser state |
| `Web/frontend` | Public marketing, account entry, onboarding, customer dashboard, preview/revision, billing, delivery, and support experiences | Provider secrets, database queries, or internal operations controls |
| `Web/admin` | Authenticated internal workflows for requests, projects, payments, delivery, support, infrastructure, and team operations | Trust decisions made only in the browser |
| `shared/contracts` | Provider-neutral TypeScript types, workflow events, payloads, and cross-area constants | Application-specific UI or database implementations |

## Security boundaries

Every business-owned record will be scoped by its business identifier in Backend. The server, not the browser, verifies membership and roles on each query, mutation, export, file upload, preview, and download. Sensitive actions, including payment reconciliation, delivery release, and management acceptance, require an authorized internal role and an audit event.

Files are private by default. Asset bytes will be stored through the managed object-storage abstraction; metadata such as business, project, filename, type, and storage key will be recorded in the database. Backend will issue time-limited download access only after a tenant and entitlement check.

## Event foundation

The first delivery events are `project.submitted`, `preview.available`, `payment.confirmed`, `delivery.released`, and `support.reply.received`. Backend will dispatch them to in-app and email channel implementations when those integrations are enabled. The initial service contract has no outbound provider configured, preventing accidental delivery during foundation work.
