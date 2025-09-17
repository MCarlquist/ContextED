# Copilot Instructions for ContextED

## Project Overview
ContextED is a monorepo web application for educators and community leaders, featuring:
- **Frontend:** Angular (client/) with Leaflet.js for interactive mapping
- **Backend:** Node.js/Express (backend/) with Supabase (PostgreSQL + PostGIS) for geospatial data

## Architecture & Data Flow
- **client/**: Angular SPA, main entry is `src/main.ts`. Routing in `app/app.routes.ts`. Map UI in `app/components/map/`.
- **backend/**: Express server (`src/app.ts`), API routes in `src/routes/`, middleware in `src/middleware/`, config in `src/config/`. Supabase integration in `src/config/supabase.ts`.
- **Data Flow:** Frontend communicates with backend via REST API. Backend proxies requests to Supabase for auth and data. Geospatial queries use PostGIS via Supabase.

## Developer Workflows
- **Backend:**
  - Install: `npm install` in `backend/`
  - Start (dev): `npm start` (uses Nodemon for hot-reload)
  - Environment: `.env` required with Supabase and JWT credentials
- **Frontend:**
  - Install: `npm install` in `client/`
  - Start: `ng serve` (Angular CLI)
- **Testing:** No explicit test scripts found; add tests in `client/src/app` or `backend/src` as needed

## Conventions & Patterns
- **TypeScript everywhere** (Angular + Express)
- **API routes:** Defined in `backend/src/routes/`, grouped by domain (e.g., `auth.ts`, `api.ts`)
- **Middleware:** Auth, error handling, logging, and security in `backend/src/middleware/`
- **Config:** Centralized in `backend/src/config/`
- **Environment variables:** All secrets/config in `.env` (see `backend/README.md` for template)
- **Frontend structure:** Feature modules in `client/src/app/components/` and `client/src/app/pages/`
- **Mapping:** Leaflet.js usage in `client/src/app/components/map/`

## Integration Points
- **Supabase:** Used for authentication and database (PostgreSQL + PostGIS). Keys in `.env`.
- **JWT:** Used for backend auth; secret in `.env` as `JWT_SECRET`
- **CORS:** Configured to allow requests from frontend URL

## Examples
- **Add a new API route:**
  - Create a file in `backend/src/routes/`, export a router, and import it in `app.ts`
- **Add a new Angular page/component:**
  - Add to `client/src/app/pages/` or `client/src/app/components/`, update routing in `app.routes.ts`

## Key Files
- `client/src/app/components/map/map.component.ts`: Map UI logic
- `backend/src/app.ts`: Express app entry
- `backend/src/routes/api.ts`: Main API routes
- `backend/src/config/supabase.ts`: Supabase client setup
- `.env`: Secrets and config

## Notes
- No custom build scripts; use standard Angular/Node commands
- No monorepo tooling (e.g., Nx, Lerna) detected
- No explicit test or CI/CD config found

---
For questions or unclear patterns, check `README.md` in root and backend/ for more details.
