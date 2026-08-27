# FerixBuilder Customer Dashboard Information Architecture Audit

## Scope and conclusion

The current customer workspace contains **17 routed dashboard views**. The routes are navigable and each view has a recognisable title, but the present navigation is **too fragmented for a customer-facing product**. Several pages repeat the same card structure and some pages have the same underlying task divided into separate destinations. This is why the dashboard can feel misaligned even though its links work.

The correct direction is **not** to place every function on a single dashboard page. The correct direction is to reduce the permanent sidebar to a small number of meaningful customer journeys, then use tabs or contextual sub-navigation inside each journey.

## Current page inventory

| # | Current page | Current purpose and behavior | Assessment |
|---:|---|---|---|
| 1 | Dashboard | Project lifecycle summary, status metrics, current stage, and direct actions into the project journey. | **Keep.** It is the customer home and should remain an overview only. |
| 2 | Onboarding | Nine-step business and project-request intake; saves locally and submits the request to the dashboard. | **Keep as a flow, not a permanent sidebar page.** It is relevant to a new or incomplete request only. |
| 3 | My project | Scope, milestone, and quote-decision information. | **Keep inside a Project hub.** It overlaps with Dashboard lifecycle information. |
| 4 | Project files | Stages customer-provided logos, documents, screenshots, and references. | **Move into the Project hub.** Files are part of the active project, not a separate top-level destination. |
| 5 | Preview website | Shows responsive preview modes and links to revision and approval actions. | **Keep inside a Review hub.** |
| 6 | Revisions | Creates and tracks structured change requests. | **Merge with Preview website.** Revisions are an action taken while reviewing a preview. |
| 7 | Payments | Explains quote, approval, invoice, and payment status. | **Keep inside a Delivery hub.** |
| 8 | Downloads | Shows controlled delivery release and handover materials. | **Merge with Payments in a Delivery hub.** Payment and release are two stages of the same handover journey. |
| 9 | Customers | Adds, searches, filters, and opens local customer records. | **Move into Business tools.** Show only when the delivered product needs customer management. |
| 10 | Products | Adds, searches, filters, and opens local product or offer records. | **Move into Business tools.** Show only for commerce or catalogue projects. |
| 11 | Bookings | Adds, searches, filters, and opens local booking-type records. | **Move into Business tools.** Show only for booking-enabled projects. |
| 12 | Domain | Launch and domain connection information; currently routes to management request. | **Merge with Care & operations.** Its action and present contents overlap with technical care and management. |
| 13 | Technical care | Optional post-delivery care information; currently routes to management request. | **Merge with Care & operations.** It shares the same operational state presentation as Domain and System health. |
| 14 | Management request | Selects optional hosting, domain, maintenance, monitoring, or backup services. | **Keep as a tab in Care & operations.** It is the requested action from the care-related screens. |
| 15 | System health | Managed-service system visibility information; currently routes to management request. | **Merge with Care & operations.** It should appear only after a care plan is accepted. |
| 16 | Support | Creates a project-context support request and displays the local conversation. | **Keep.** It has a distinct customer task and own interaction model. |
| 17 | Settings | Edits profile fields and preview notification preferences. | **Keep.** It is distinct account management. |

## Confirmed duplication and alignment issues

The UI review confirmed four notable problems.

| Area | What is duplicated or misaligned now | Correct treatment |
|---|---|---|
| Project initiation | Onboarding and My project both describe the project brief, scope, and lifecycle. | Make onboarding an initial-only state of the **Project** journey. Once submitted, replace it with a Project brief tab rather than retaining a permanent onboarding sidebar item. |
| Review | Preview and Revisions are separate sidebar routes, yet the preview page’s primary action is “Request changes.” | Use one **Review** destination with `Preview` and `Changes` tabs. A revision form remains available, but it no longer feels disconnected from the preview it refers to. |
| Delivery | Payments and Downloads both describe approval, payment, and protected release in near-identical delivery cards. | Use one **Delivery** destination with `Payment & invoices` and `Release & downloads` tabs, sequenced by status. |
| Care and operations | Domain, Technical care, and System health use the same managed-operations card and each forwards to Management request. | Use one **Care & operations** destination with `Domain`, `Care plan`, `Health`, and `Request service` tabs. Health remains hidden until care is active. |
| Business modules | Customers, Products, and Bookings use the same search/filter/list implementation and are always shown, even when the project has no relevant feature. | Use one **Business tools** destination with conditional tabs for only the features included in that customer’s project. |

The screenshots also show a visual alignment problem across many pages: each route repeats the same three metrics, large heading, large white workflow card, and the same support/team footer. This creates consistency, but it reduces page distinction. After the information architecture is consolidated, each hub should have a single primary panel that reflects its journey: a project timeline, preview canvas, delivery checklist, business-data table, or care status.

## Recommended customer navigation

The recommended permanent customer navigation is **eight top-level destinations**, with state-aware tabs inside each destination.

| Recommended top-level page | Internal sections | When it appears |
|---|---|---|
| Dashboard | Current stage, alerts, next action | Always |
| Project | Brief & scope, files, milestones | Always after the customer starts a request; the onboarding wizard is shown here only until completion |
| Review | Preview, changes | When a preview exists |
| Delivery | Quote, payment & invoices, release & downloads | When scope/approval moves into delivery |
| Business tools | Customers, products, bookings | Only for projects that include the relevant feature |
| Care & operations | Domain, care plan, system health, request service | Domain/care when applicable; health only when managed care is active |
| Support | Tickets and project messages | Always |
| Settings | Profile, notifications, workspace preferences | Always |

> **Key rule:** a page belongs in the sidebar only if it represents a unique customer journey. A related task should be an internal tab or contextual panel, not another permanent navigation item.

## Expected behavior after consolidation

The project journey should be the customer’s main path: submit requirements, review scope, supply files, preview work, request changes, approve, pay, receive delivery, and request ongoing care. Each status must reveal the next appropriate action and hide unsupported tools. For example, a restaurant project should not see Products unless commerce is included; a self-hosted project should not see System health; and an approved project should naturally progress from Review to Delivery.

The present preview interactions are useful prototypes: file staging, preview device switching, revision request creation, local support messages, management request selection, and business-record filtering work as local preview states. They should be carried into the consolidated hubs, then later connected to tenant-scoped backend records. The customer must never receive infrastructure credentials, database access, or another customer’s information.

## Recommended implementation order

1. Replace the 17-item sidebar with the eight recommended journeys while preserving routes as backward-compatible redirects.
2. Build the Project, Review, Delivery, Business tools, and Care & operations hubs with focused tabs and conditional visibility.
3. Rework the visual hierarchy so every hub has one dominant functional panel and only relevant supporting status cards.
4. Connect the final hub structure to tenant-scoped persisted data, payment states, project statuses, uploads, and real support records.
