# Public Website Verification

The FerixBuilder public routes were rendered successfully at desktop and mobile sizes: `/`, `/services`, `/pricing`, `/examples`, `/how-it-works`, `/about`, `/contact`, `/faq`, `/privacy`, `/terms`, and `/refund-policy`.

The small-viewport layout was inspected across the public route set. The shared menu behavior was also checked by opening the mobile-navigation state and following its Pricing link; the menu became present and the application route changed to `/pricing`.

The contact page runs through the typed `contact.submit` API procedure. Its input contract validates name, business name, email, service type, and project context, and the Back-end persists accepted enquiries to the `contactInquiries` table. The interface shows a success state after acceptance and an error state if the request fails.
