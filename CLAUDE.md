# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev                   # start dev server
pnpm build                 # production build (runs next-sitemap postbuild)
pnpm lint                  # ESLint
pnpm lint:fix              # ESLint with auto-fix
pnpm exec tsc --noEmit     # type-check without emitting

pnpm generate:types        # regenerate src/payload-types.ts from Payload schema
pnpm generate:importmap    # regenerate Payload admin import map

pnpm test:int              # Vitest integration tests (tests/int/**/*.int.spec.ts)
pnpm test:e2e              # Playwright e2e tests (tests/e2e/)
pnpm test                  # both suites
```

After changing any Payload collection or global schema, run `pnpm generate:types` to keep `src/payload-types.ts` in sync.

## Architecture

This is a **Payload CMS 3 + Next.js 16** monorepo — Payload runs inside the Next.js app, not as a separate service.

### Route groups

- `src/app/(frontend)/` — public-facing CV site
- `src/app/(payload)/` — Payload admin UI (`/admin`) and REST/GraphQL API (`/api`)

### Internationalisation

`next-intl` handles locale routing. All public URLs are prefixed: `/en/...` and `/uk/...`. The middleware in `src/proxy.ts` intercepts every non-API/admin request and redirects to the appropriate locale prefix. Locale-aware translation strings live in `messages/en.json` and `messages/uk.json`; the routing config is in `src/i18n/routing.ts`.

Payload's own localisation supports `en` and `uk` for content fields. Pass `locale` to every `payload.find()` / `payload.findGlobal()` call to get the right language variant.

### CV data flow

`src/app/(frontend)/cv-page.tsx` is the shared server component that renders the full CV. It calls `getPayload()` directly (server-side, no HTTP round-trip) to fetch all CV data in parallel, then passes typed props to child components. Both `/en/page.tsx` and `/uk/page.tsx` simply render `<CVPage locale="en|uk" />`.

### Payload collections and globals

Collections: `Pages`, `Posts`, `Experiences`, `Projects`, `Skills`, `Education`, `Certifications`, `Media`, `Categories`, `Users`

Globals: `Profile` (name, headline, location, summary, email, links), `Header`, `Footer`

All CV-specific collections (`Experiences`, `Projects`, `Skills`, `Education`, `Certifications`) have localized fields for the content that changes per language; non-linguistic fields (dates, URLs, company name) are not localized.

### Plugins

Configured in `src/plugins/index.ts`:
- `@payloadcms/storage-vercel-blob` — media storage
- `@payloadcms/plugin-redirects` — URL redirects with cache revalidation
- `@payloadcms/plugin-nested-docs` — nested categories
- `@payloadcms/plugin-seo` — SEO meta
- `@payloadcms/plugin-form-builder` — contact forms
- `@payloadcms/plugin-search` — full-text search over `posts`

### UI components

shadcn/ui components live in `src/components/ui/`. The `components.json` file drives the shadcn CLI. Tailwind CSS v4 with the `@tailwindcss/postcss` plugin.

### Environment variables

| Variable | Purpose |
|---|---|
| `POSTGRES_URL` | Vercel Postgres connection string |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token for media uploads |
| `PAYLOAD_SECRET` | Payload encryption secret |
| `NEXT_PUBLIC_SERVER_URL` | Public base URL |
| `CRON_SECRET` | Bearer token for Payload job queue cron endpoint |
| `PREVIEW_SECRET` | Draft/preview mode secret |
