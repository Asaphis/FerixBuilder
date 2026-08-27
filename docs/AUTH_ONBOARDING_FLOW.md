# Customer Access and Onboarding Flow

FerixBuilder now separates **account creation** from **business and project onboarding**. Registration collects only the customer name, email, phone number, password, password confirmation, and agreement acceptance. A new account enters the email-verification stage before it is allowed into the onboarding workspace.

| Customer state | Destination | Purpose |
|---|---|---|
| New registration | `/verify-email` | Verify the account before project setup. |
| Verified account with incomplete onboarding | `/workspace/onboarding` | Complete the progressive business and project-request wizard. |
| Returning account with complete onboarding | `/dashboard` | Continue directly to project status, preview, support, and delivery tracking. |
| Returning account with incomplete onboarding | `/workspace/onboarding` | Resume the saved onboarding draft. |

The browser test entered a valid new registration, accepted the terms, and was routed to `/verify-email`. After a six-digit preview verification code was supplied, the account was routed directly to `/workspace/onboarding`, where the nine-step business and project-request wizard was visible.

The dashboard route was then opened directly for the verified but incomplete account. It correctly redirected to `/workspace/onboarding`, preventing setup from being skipped. The Business step was populated with a business name and description as part of the project-request test.

The progressive onboarding controls were then used to open the Build step and select the Online store project type. The selected card displayed its active state, confirming the customer can select a project direction without mixing that decision into account registration.

The Requirements step was opened and populated with a clear customer outcome: browsing clothing, WhatsApp contact, online orders, and responsive delivery. This confirms the new onboarding collects the essential project request separately from the registration form.

The review step displayed the submitted business, project type, description, contact, requirements, and hosting choice before the project request was sent. Submission then routed the customer to `/dashboard`, which showed Account Created, Requirements Submitted, Awaiting Review, Quote Pending, and Delivery Not Started. The dashboard handoff is therefore complete.

The completed customer then opened `/login`, entered their email and password, and selected Sign in. The flow returned directly to `/dashboard` rather than onboarding, confirming that a returning user who has already completed setup receives the correct dashboard destination.

The supporting account-recovery route was also exercised. A registered email can be entered at `/forgot-password`; the visible preview outcome provides the controlled `/reset-password` continuation. In production, this interface must be connected to the secure identity provider’s signed reset-link workflow rather than browser-local preview state.

The completed onboarding was reopened to verify the expanded Contact stage. It now includes business phone, WhatsApp, email, address, city, state or region, country, opening hours, and optional social-profile fields, while keeping account registration separate and lightweight.

For the selected Online store request, the Content step correctly changes its prompt to products, categories, and availability, with an explicit provide-later option. The Brand step presents eight style directions and a staging area for a logo, images, or brand guide, preserving the requested progressive project brief.

The Hosting step gives the customer a clear self-managed or managed-service choice. Selecting “Manage it for me” records a management request for FerixBuilder review; it does not expose hosting, domain, server, database, or credential controls to the customer.

The Contact stage now presents **separate optional inputs** for Instagram, Facebook, TikTok, X, and YouTube. The Brand stage provides an explicit choice between entering brand colours and staging a brand guide, alongside staging for a logo, business photos, or product images.

## Phone-width end-to-end verification

At a **390 × 844** viewport, the automated browser check successfully completed both flows:

| Flow | Verified result |
|---|---|
| New customer | Register → email verification → nine-step onboarding → project request submission → dashboard. |
| Returning customer | Login after onboarding completion → dashboard, without redirecting back to onboarding. |

The phone test also asserted the separate Instagram, Facebook, TikTok, X, and YouTube fields in onboarding before completing the project request.

> This is a customer-flow preview using browser-local state. Production credentials, verification, password recovery, tenant authorisation, and persistence remain the responsibility of the existing secure identity and backend layers.
