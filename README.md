# Universe ’25 Copilot Demo Repo

This repo is intentionally tiny and slightly imperfect so you can demo building out a Custom Copilot Agent to help improve it.

## Prereqs
- Node.js 20+
- npm 9+

## Setup
- Install deps: `npm install`
- Run tests: `npm test`
- Start server (optional): `npm run dev`

## Repo intent
- `src/routes/items.ts` starts with only `GET /items`.
- Logging is inconsistent (some `console.*` usage) to give our custom agent something to clean up.
- `src/lib/pricing.ts` contains a deliberately gnarly pricing function for a refactoring demonstration with some flavor of using a Copilot Agent.

