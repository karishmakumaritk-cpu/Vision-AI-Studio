# Architecture

Monolith architecture with split concerns:
- `frontend/`: React + Vite UI
- `backend/`: Express API + services
- `database/`: SQL schema/seeds

This is optimized for fast iteration and low infra cost for 0-10k users.
