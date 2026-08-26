# Web/admin

**Web/admin** is FerixBuilder's protected internal operations application area. It will host project review, quoting, preview publication, payment reconciliation, delivery release, support, managed-service review, team permissions, and audit views.

At this foundation stage, the browser route `/admin` loads the protected entry point in `src/AdminEntry.tsx`. The application shares authentication and typed API contracts with Backend, while internal-only procedures are secured server-side in `Backend/routers/`.
