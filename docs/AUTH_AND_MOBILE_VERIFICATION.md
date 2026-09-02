# Authentication Entry and Mobile Verification

The public header now exposes both `Log in` and `Create account` routes. The login and registration pages use email-based authentication with verification via Resend.

The shared mobile navigation was verified by opening the menu state and contained both `/login` and `/register` paths. Mobile screenshots were captured for the home, login, registration, and contact pages after the contact hero and form spacing were reduced.

The authentication system uses JWT tokens with email verification through Resend API.
