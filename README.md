# Developer CV

A developer CV/portfolio project powered by Payload CMS, Next.js, React, Vercel Postgres, shadcn/ui, and next-intl.

## Stack

- Payload CMS 3 with the Next.js App Router
- Vercel Postgres via `@payloadcms/db-vercel-postgres`
- Vercel Blob for Payload media uploads
- Next.js 16 and React 19
- next-intl with English and Ukrainian routes
- Tailwind CSS and shadcn/ui components

## Local Setup

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Open `http://localhost:3000/en` or `http://localhost:3000/uk` for the public CV. Open `http://localhost:3000/admin` to create the first Payload admin user and edit CV content.

## Environment

The project expects Vercel Postgres-compatible variables:

```env
POSTGRES_URL=postgres://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
PAYLOAD_SECRET=replace-with-a-long-random-secret
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
CRON_SECRET=replace-with-a-long-random-secret
PREVIEW_SECRET=replace-with-a-long-random-secret
```

Use Vercel's Postgres integration to populate `POSTGRES_URL` in production and Vercel Blob to populate `BLOB_READ_WRITE_TOKEN` for Payload media uploads. Keep `.env` and `.env.local` out of git.

## CV Content

Payload includes CV-focused content models:

- `Profile` global: name, headline, location, summary, email, links.
- `Experiences`: company, localized role/location/summary/highlights, dates, technologies.
- `Projects`: localized description, links, stack, featured flag, sort order.
- `Skills`: localized categories and skill entries.
- `Education`: institution, localized degree/location/description, dates.
- `Certifications`: localized title, issuer, date, URL.

Localized fields support `en` and `uk`.

## Scripts

```bash
pnpm dev
pnpm lint
pnpm exec tsc --noEmit
pnpm build
pnpm generate:types
pnpm generate:importmap
```

`pnpm build` can run before a local database is available. Template routes that depend on Payload content skip static params until `POSTGRES_URL` points to a running database.
