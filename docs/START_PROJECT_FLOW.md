# Start Your Project Entry Flow

The public **Start your project** calls-to-action now open the dedicated `/start-project` page, rather than the account registration page.

| Public action | Destination | Purpose |
|---|---|---|
| Start your project | `/start-project` | Collect a short project brief: name, business, email, direction, and project context. |
| Create account | `/register` | Create and verify a secure customer account. |
| Log in | `/login` | Return to the dashboard after setup is complete. |

The new project-brief page was opened and populated in the browser at desktop width. Its five required fields and project-direction selector match the supplied reference structure. The test did not submit invented contact data, because the submitted project brief is designed to be a real, persisted customer enquiry.

After a real brief is submitted, its name, business name, project direction, and context are retained for the subsequent registration and onboarding preview flow. The customer receives a clear choice to create an account or log in.

## Phone-width handoff verification

At a **390 × 844** viewport, an automated browser test intercepted the enquiry transport rather than creating a fictitious live lead. It completed the full customer journey: project brief → confirmation → account registration with prefilled name and email → verification → onboarding with prefilled business name, Online store selection, and requirements. The handoff therefore preserves the submitted brief while keeping the account-registration screen distinct.
