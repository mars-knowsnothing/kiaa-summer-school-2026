# Setup

## Prerequisites

- Node.js 20 or newer
- `pnpm`

## Install

```bash
pnpm install
```

## Local Development

```bash
pnpm dev
```

## Validation

```bash
pnpm build
pnpm lint
pnpm test
```

## Supabase

1. Create a Supabase project and copy the project URL plus anon key into `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
2. Set `SUPABASE_SERVICE_ROLE_KEY` in your local server environment only. Do not expose it to the browser.
3. Apply `supabase/migrations/20260413_initial_schema.sql` before building the application forms.
4. The browser client uses the public anon key; the server client uses the service role key for privileged writes.

## Notes

- The app uses the Next.js App Router with TypeScript and Tailwind CSS.
- Vitest is configured to pass cleanly when no test files exist yet.
- Playwright is configured for future end-to-end smoke tests against `http://127.0.0.1:3000`, but there are no E2E tests in the baseline scaffold yet.
