# Architecture

Monolith-first architecture with separate frontend and backend folders.

- `frontend/`: React + Vite client
- `backend/`: Express API
- `database/`: SQL schema + seeds
- `docs/`: operations and developer docs

## Why monolith first
- Faster MVP delivery
- Lower infra and maintenance complexity
- Easier observability and debugging
- Can later split high-traffic modules into services
