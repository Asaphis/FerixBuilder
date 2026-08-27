# FerixBuilder Customer Dashboard Rebuild Specification

## Purpose

The rebuilt customer dashboard is a **project and business control centre**, not a generic collection of application modules. It retains every feature required by the product blueprint while grouping related tasks into eight customer journeys.

| Customer journey | Blueprint capabilities retained | Visibility and behavior |
|---|---|---|
| Dashboard | Project status, progress, priority next action, timeline, notifications, preview state. | Always after a project request exists. It summarises rather than duplicates workflow forms. |
| Project | Guided onboarding, business/brand/content/requirements, scope, package/quote context, milestones, project history, files and reference material. | Onboarding is active only while requirements are incomplete; later it becomes an editable project brief tab. |
| Review | Private preview, desktop/tablet/mobile views, preview access restrictions, revision requests, allowance, attachments and revision history. | Available when a preview is published. Revision changes sit beside the preview they describe. |
| Delivery | Approval route, quote, payment state, invoices, payment history, protected release, delivery package and handover instructions. | Each tab unlocks according to the controlled project status; no payment or release can be skipped. |
| Business tools | Controlled customer, product/service and booking records; search, filters, local actions and future export. | Tabs appear only for modules included in the delivered application and the customer role. |
| Care & operations | Management request, hosting/deployment, domain, maintenance, health, monitoring, backups and permitted operational history. | Management request is always available; operations summaries are visible only after service acceptance. Never exposes credentials, server controls, or internal logs. |
| Support | Ticket creation, project-context messaging, secure attachments, ticket history and entitlement-based priority. | Available to active customers. |
| Settings | Profile, business members, notification preferences and permitted account settings. | Always for permitted customer roles. |

## Controlled customer lifecycle

The dashboard follows the required lifecycle: **Draft → Submitted → Under review → Quote pending → Quote accepted → In progress → Preview ready → Revision requested / Preview updated → Customer approved → Awaiting payment → Payment verified → Delivery ready → Delivered → Self-managed or Management requested / accepted**.

Each journey must expose only its relevant next action. The client can see progress and permitted summaries, but cannot create a payment confirmation, release delivery, approve managed service, or access technical credentials without the future tenant-scoped backend controls.

## Interaction verification

The rebuilt Review journey was exercised in the live browser. Selecting **Approve direction** opens an explicit confirmation rather than navigating immediately into payment. Confirming it records the visible preview approval state and exposes the contextual **Open delivery** handoff. This keeps the required order of preview → approval → payment/delivery clear in the customer interface.

The **Open delivery** handoff then opened the Delivery journey, where `Quote & payment` and `Release & downloads` operate as contextual tabs rather than separate sidebar pages. The release tab retained the controlled checklist: approved version, verified payment, final quality check, and protected release.

The consolidated Business tools journey was also checked live. The Customers tab created a local **New customer 1** record and showed its scoped record detail. The subsequent tab-isolation check is used to ensure customer, product, and booking records do not appear in the wrong business module.

After adding the customer record, the Products & services tab displayed an empty product state rather than the customer record. Adding a product then created **New product 1** only inside that product view. This confirms the contextual Business tabs retain separate preview record collections.

The Support journey was exercised after consolidation. A customer message created **Ticket #01** in the visible conversation, confirming that support stays an independent, project-context customer workflow rather than a repeated generic footer.

## End-to-end mobile validation

At a 390px phone viewport, the rebuilt dashboard verified all eight customer journeys and all 13 compatible legacy entry routes without redirecting to Login. The mobile verification also exercised explicit preview approval, customer-record creation followed by a clean Products tab, managed-service request submission with an operating note, numbered support-ticket creation, the Settings primary save action, and business-member invitation staging. This confirms that the mobile interface retains the complete customer workflow rather than a reduced version of the desktop dashboard.
