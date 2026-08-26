# FerixBuilder Customer Workspace Audit

The current workspace has a routed dashboard shell, project, preview, revisions, payments, downloads, customer/business, technical-care, system-health, and support pages. However, several essential customer-control features from the product blueprint are still represented only as high-level preview pages or are absent from the navigation.

| Required customer capability | Current state | Completion required in preview mode |
|---|---|---|
| Guided onboarding | Missing | Add Business, Brand, Content, Requirements, and Review stages with save-later states. |
| Project scope and quote | Partial | Show package, scoped items, revision allowance, quote decision, and milestone history. |
| Project files | Missing | Add an authorized project-file area for brand assets, requirements, screenshots, and delivery material states. |
| Responsive preview | Partial | Add desktop, tablet, and mobile preview modes, version metadata, review state, and direct revision/approval actions. |
| Revision workflow | Partial | Add ticket history, remaining allowance, request form, attachment state, and status tracking. |
| Approval and payment route | Partial | Add explicit approval confirmation, quote/payment states, invoice history, and controlled delivery status. |
| Downloads and delivery | Partial | Add release checklist, delivery contents, locked/unlocked state, and delivery instructions. |
| Managed service request | Missing | Add request, review, acceptance, and safe operational-summary states. |
| Support conversation | Partial | Add ticket list, active conversation, priority/status, and message composer. |
| Settings and notifications | Missing | Add profile, business members, notification preferences, and account settings. |

The next implementation pass will add the missing pages and make every existing customer module present a specific, usable preview workflow rather than a generic route placeholder. Real payment capture, delivery release, file signing, tenant authorization, and staff decisions remain server-controlled future integrations; the current task provides the complete customer experience in safe preview mode.

The dashboard primary action was exercised in the browser and now routes directly to the dedicated `/workspace/onboarding` sequence, confirming that a customer can begin a structured request rather than remain on the dashboard.

The preview route was also exercised end-to-end. Its Request changes action now opens `/workspace/revisions`, presenting a contextual feedback form, revision allowance, reference attachment action, and status history.

A preview revision was entered and submitted through the customer form. The workspace immediately displayed a tracked Revision request #01 state with the remaining allowance, confirming the preview interaction path works without an account lock.

The dedicated support page was also exercised in the browser. A customer message was entered and submitted, then appeared as a visible conversation entry with a support-ticket confirmation state.

The workspace intentionally remains **preview-mode client state** at this stage. Persistent tenant data, file storage, server-authorised payment verification, protected delivery release, and managed infrastructure operations are future backend work. The preview does not expose database access, infrastructure controls, SSH, credentials, or other-tenant data.
