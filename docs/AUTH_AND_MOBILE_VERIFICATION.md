# Authentication Entry and Mobile Verification

The public header now exposes both `Log in` and `Create account` routes. The login and registration pages route users into the existing nonce-protected OAuth service rather than introducing a separate credential store.

The shared mobile navigation was verified by opening the menu state and contained both `/login` and `/register` paths. Mobile screenshots were captured for the home, login, registration, and contact pages after the contact hero and form spacing were reduced.

The visible `Log in securely` control was clicked from the live login page. It set the one-time state and redirected to the configured Manus sign-in page with the expected callback URL and state parameters. No credentials were entered during this verification.
