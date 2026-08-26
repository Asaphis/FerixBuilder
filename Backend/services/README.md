# Backend Services

Provider-facing implementations belong in this directory. The initial contracts define two future delivery boundaries: event-driven notifications and private object-storage authorization.

No customer file byte should be persisted in the database. The database will retain asset metadata and ownership; an object-storage provider will retain bytes; signed URLs will be created only after Backend verifies tenant and role access.
