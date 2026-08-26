# Backend

**Backend** is the authenticated FerixBuilder service layer. It owns API procedures, database queries, role and tenant authorization, workflow services, secure integration adapters, and protected file/download decisions.

The managed runtime continues to load this directory through the compatible `server` path at the repository root. New API work should live in `Backend/routers/`; reusable business services should live in `Backend/services/`; framework plumbing in `Backend/_core/` should not be altered unless infrastructure itself must change.

All customer-facing mutations must be authenticated, validated, audited where sensitive, and scoped to an authorized business. Frontend code must never receive provider secrets, database credentials, private storage keys, or infrastructure credentials.
