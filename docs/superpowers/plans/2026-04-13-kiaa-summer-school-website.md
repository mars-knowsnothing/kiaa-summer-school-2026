# KIAA Summer School Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual Next.js website for the 2026 KIAA summer school and workshop with dynamic content pages, a multi-path application flow, and Supabase-backed data and file handling.

**Architecture:** Use Next.js App Router with locale-prefixed routes and `next-intl` dictionaries for EN/ZH content. Keep static event content in typed local data during the first pass, then add Supabase-backed submission flows and storage for application documents. Implement the visual system as reusable UI sections, with the 3D hero isolated behind a client component boundary so the rest of the site stays server-rendered and fast.

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, shadcn/ui, `next-intl`, React Hook Form, Zod, Supabase, Framer Motion, React Three Fiber, Vitest, Playwright

---

## File Structure

- `package.json`: project scripts and runtime dependencies
- `src/app/[locale]/layout.tsx`: locale shell, font setup, navigation, footer
- `src/app/[locale]/page.tsx`: bilingual landing page
- `src/app/[locale]/speakers/page.tsx`: speakers, scientific committee, local committee
- `src/app/[locale]/agenda/page.tsx`: week-by-week agenda
- `src/app/[locale]/application/page.tsx`: application entry screen and multistep flow
- `src/app/[locale]/referee/[token]/page.tsx`: referee upload portal
- `src/app/[locale]/contact/page.tsx`: contacts and venue details
- `src/app/api/referees/notify/route.ts`: webhook endpoint to send referee invitation emails
- `src/components/layout/site-header.tsx`: nav bar and locale toggle
- `src/components/layout/site-footer.tsx`: footer with hosts, dates, contact links
- `src/components/home/hero-scene.tsx`: client-only 3D hero visualization
- `src/components/application/application-wizard.tsx`: top-level application flow controller
- `src/components/application/school-only-form.tsx`: category 1 form
- `src/components/application/workshop-form.tsx`: category 2 form
- `src/components/application/referee-upload-form.tsx`: category 3 form
- `src/components/application/file-drop.tsx`: drag and drop upload control with filename validation
- `src/components/application/form-progress.tsx`: step indicator and transitions
- `src/content/site.ts`: static event copy and navigation labels
- `src/content/speakers.ts`: typed speaker and committee data
- `src/content/agenda.ts`: typed agenda data
- `src/i18n/routing.ts`: locale config and route helpers
- `src/i18n/request.ts`: message loading for `next-intl`
- `messages/en.json`: English dictionary
- `messages/zh.json`: Chinese dictionary
- `src/lib/env.ts`: environment validation
- `src/lib/supabase/client.ts`: browser Supabase client
- `src/lib/supabase/server.ts`: server Supabase client
- `src/lib/application/schema.ts`: Zod schemas and filename regex rules
- `src/lib/application/upload.ts`: storage upload helpers
- `src/lib/application/referee.ts`: token generation and referee email payload shaping
- `src/lib/utils.ts`: shared helpers
- `supabase/migrations/20260413_initial_schema.sql`: schema, enums, RLS, storage notes
- `tests/unit/application-schema.test.ts`: validation tests
- `tests/unit/content.test.ts`: content structure tests
- `tests/e2e/home.spec.ts`: homepage smoke test
- `tests/e2e/application.spec.ts`: application flow test
- `docs/setup.md`: local environment and Supabase setup notes

### Task 1: Scaffold the app and baseline tooling

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `src/app/globals.css`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `docs/setup.md`

- [ ] **Step 1: Write the failing setup check**

```bash
pnpm test
```

Expected: command fails because the app and test config do not exist yet.

- [ ] **Step 2: Create the baseline project configuration**

```json
{
  "name": "kiaa-summer-school-2026",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "next lint",
    "test": "vitest run",
    "test:e2e": "playwright test"
  }
}
```

- [ ] **Step 3: Add styling and test config**

```ts
// tailwind.config.ts
import type {Config} from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {extend: {}},
  plugins: []
};

export default config;
```

- [ ] **Step 4: Verify tooling boots**

Run: `pnpm install && pnpm test`
Expected: Vitest starts and reports no test files instead of config errors.

- [ ] **Step 5: Commit**

```bash
git add package.json next.config.ts tsconfig.json tailwind.config.ts postcss.config.js src/app/globals.css vitest.config.ts playwright.config.ts docs/setup.md
git commit -m "chore: scaffold nextjs website tooling"
```

### Task 2: Add locale routing, shared layout, and site chrome

**Files:**
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/components/layout/site-header.tsx`
- Create: `src/components/layout/site-footer.tsx`
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/request.ts`
- Create: `messages/en.json`
- Create: `messages/zh.json`
- Test: `tests/e2e/home.spec.ts`

- [ ] **Step 1: Write the failing homepage smoke test**

```ts
import {test, expect} from "@playwright/test";

test("zh home renders header and language switch", async ({page}) => {
  await page.goto("/zh");
  await expect(page.getByRole("link", {name: /speakers/i})).toBeVisible();
  await expect(page.getByRole("button", {name: /EN|中/})).toBeVisible();
});
```

- [ ] **Step 2: Define locale config**

```ts
// src/i18n/routing.ts
export const locales = ["en", "zh"] as const;
export const defaultLocale = "zh";
export type Locale = (typeof locales)[number];
```

- [ ] **Step 3: Implement the shared shell**

```tsx
// src/app/[locale]/layout.tsx
export default async function LocaleLayout({children, params}: LayoutProps) {
  const {locale} = await params;
  return (
    <html lang={locale}>
      <body>
        <SiteHeader locale={locale} />
        {children}
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Run the smoke test**

Run: `pnpm test:e2e tests/e2e/home.spec.ts`
Expected: PASS, `/zh` renders with nav and locale toggle.

- [ ] **Step 5: Commit**

```bash
git add src/app/[locale]/layout.tsx src/components/layout/site-header.tsx src/components/layout/site-footer.tsx src/i18n/routing.ts src/i18n/request.ts messages/en.json messages/zh.json tests/e2e/home.spec.ts
git commit -m "feat: add bilingual app shell"
```

### Task 3: Build the static content foundation for Home, Speakers, Agenda, and Contact

**Files:**
- Create: `src/app/[locale]/page.tsx`
- Create: `src/app/[locale]/speakers/page.tsx`
- Create: `src/app/[locale]/agenda/page.tsx`
- Create: `src/app/[locale]/contact/page.tsx`
- Create: `src/content/site.ts`
- Create: `src/content/speakers.ts`
- Create: `src/content/agenda.ts`
- Test: `tests/unit/content.test.ts`

- [ ] **Step 1: Write failing content structure tests**

```ts
import {describe, expect, it} from "vitest";
import {speakers} from "@/content/speakers";

describe("speakers content", () => {
  it("includes lecturer and committee roles", () => {
    expect(new Set(speakers.map((speaker) => speaker.role))).toEqual(
      new Set(["lecturer", "scientific_committee", "local_committee"])
    );
  });
});
```

- [ ] **Step 2: Create typed content modules**

```ts
// src/content/speakers.ts
export const speakers = [
  {nameZh: "白雪宁", nameEn: "Xue-Ning Bai", role: "lecturer"},
  {nameZh: "龙凤", nameEn: "Feng Long", role: "scientific_committee"}
] as const;
```

- [ ] **Step 3: Render the content pages**

```tsx
// src/app/[locale]/speakers/page.tsx
export default function SpeakersPage() {
  return <SpeakerDirectory speakers={speakers} />;
}
```

- [ ] **Step 4: Run unit tests**

Run: `pnpm test tests/unit/content.test.ts`
Expected: PASS, typed content covers the required role groups.

- [ ] **Step 5: Commit**

```bash
git add src/app/[locale]/page.tsx src/app/[locale]/speakers/page.tsx src/app/[locale]/agenda/page.tsx src/app/[locale]/contact/page.tsx src/content/site.ts src/content/speakers.ts src/content/agenda.ts tests/unit/content.test.ts
git commit -m "feat: add bilingual event content pages"
```

### Task 4: Add the visual system and hero scene

**Files:**
- Create: `src/components/home/hero-scene.tsx`
- Modify: `src/app/[locale]/page.tsx`
- Modify: `src/app/globals.css`
- Test: `tests/e2e/home.spec.ts`

- [ ] **Step 1: Extend the homepage smoke test for hero content**

```ts
test("home shows title and dates", async ({page}) => {
  await page.goto("/en");
  await expect(page.getByRole("heading", {name: /KIAA Summer School/i})).toBeVisible();
  await expect(page.getByText(/July 20 - Aug 28, 2026/)).toBeVisible();
});
```

- [ ] **Step 2: Add the isolated client hero scene**

```tsx
"use client";

export function HeroScene() {
  return <div aria-label="protoplanetary disk hero" className="h-[28rem] w-full" />;
}
```

- [ ] **Step 3: Compose the hero with content and motion wrappers**

```tsx
// src/app/[locale]/page.tsx
<section className="relative overflow-hidden">
  <HeroScene />
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/80" />
</section>
```

- [ ] **Step 4: Re-run homepage e2e**

Run: `pnpm test:e2e tests/e2e/home.spec.ts`
Expected: PASS, content remains visible with the hero scene mounted.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/hero-scene.tsx src/app/[locale]/page.tsx src/app/globals.css tests/e2e/home.spec.ts
git commit -m "feat: add deep-space hero section"
```

### Task 5: Define environment, Supabase clients, and database schema

**Files:**
- Create: `src/lib/env.ts`
- Create: `src/lib/supabase/client.ts`
- Create: `src/lib/supabase/server.ts`
- Create: `supabase/migrations/20260413_initial_schema.sql`
- Modify: `docs/setup.md`
- Test: `tests/unit/application-schema.test.ts`

- [ ] **Step 1: Write a failing env validation test**

```ts
import {describe, expect, it} from "vitest";
import {envSchema} from "@/lib/env";

describe("env schema", () => {
  it("requires supabase url and anon key", () => {
    const result = envSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});
```

- [ ] **Step 2: Implement env validation and clients**

```ts
// src/lib/env.ts
import {z} from "zod";

export const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1)
});
```

- [ ] **Step 3: Create the initial SQL migration**

```sql
create type speaker_role as enum ('lecturer', 'scientific_committee', 'local_committee');
create type apply_enum as enum ('school_only', 'school_and_workshop');
create type status_enum as enum ('pending', 'approved', 'rejected');
```

- [ ] **Step 4: Run unit tests**

Run: `pnpm test tests/unit/application-schema.test.ts`
Expected: PASS, the env schema rejects missing configuration.

- [ ] **Step 5: Commit**

```bash
git add src/lib/env.ts src/lib/supabase/client.ts src/lib/supabase/server.ts supabase/migrations/20260413_initial_schema.sql docs/setup.md tests/unit/application-schema.test.ts
git commit -m "feat: add supabase schema and environment config"
```

### Task 6: Implement application schemas, filename validation, and reusable upload UI

**Files:**
- Create: `src/lib/application/schema.ts`
- Create: `src/components/application/file-drop.tsx`
- Create: `src/components/application/form-progress.tsx`
- Test: `tests/unit/application-schema.test.ts`

- [ ] **Step 1: Write failing filename validation tests**

```ts
import {describe, expect, it} from "vitest";
import {schoolOnlyZipName} from "@/lib/application/schema";

describe("application filename rules", () => {
  it("accepts the school-only zip naming format", () => {
    expect(schoolOnlyZipName.test("暑期学校申请材料-北京大学-张三.zip")).toBe(true);
  });
});
```

- [ ] **Step 2: Define Zod schemas and regex rules**

```ts
export const schoolOnlyZipName = /^暑期学校申请材料-[^-]+-[^-]+\.zip$/;
export const workshopZipName = /^暑期学校和讨论班申请材料-[^-]+-[^-]+\.zip$/;
export const refereeUploadName = /^讨论班-[^-]+-[^-]+(\.pdf|\.zip)$/;
```

- [ ] **Step 3: Build the reusable file drop**

```tsx
type FileDropProps = {
  accept: string;
  validateName: (file: File) => boolean;
};
```

- [ ] **Step 4: Run unit tests**

Run: `pnpm test tests/unit/application-schema.test.ts`
Expected: PASS, regex rules enforce the PRD filename formats.

- [ ] **Step 5: Commit**

```bash
git add src/lib/application/schema.ts src/components/application/file-drop.tsx src/components/application/form-progress.tsx tests/unit/application-schema.test.ts
git commit -m "feat: add application validation primitives"
```

### Task 7: Implement the school-only application flow

**Files:**
- Create: `src/components/application/school-only-form.tsx`
- Create: `src/components/application/application-wizard.tsx`
- Modify: `src/app/[locale]/application/page.tsx`
- Create: `src/lib/application/upload.ts`
- Test: `tests/e2e/application.spec.ts`

- [ ] **Step 1: Write the failing school-only flow test**

```ts
import {test, expect} from "@playwright/test";

test("school-only applicant sees required fields", async ({page}) => {
  await page.goto("/zh/application");
  await page.getByLabel("只参加暑期学校").check();
  await expect(page.getByLabel("姓名")).toBeVisible();
  await expect(page.getByLabel("酒店代订")).toBeVisible();
});
```

- [ ] **Step 2: Implement the form component**

```tsx
const schema = schoolOnlyApplicationSchema;

export function SchoolOnlyForm() {
  const form = useForm({resolver: zodResolver(schema)});
  return <form>{/* full name, id number, phone, halal, upload, hotel */}</form>;
}
```

- [ ] **Step 3: Wire the page-level wizard**

```tsx
// src/app/[locale]/application/page.tsx
export default function ApplicationPage() {
  return <ApplicationWizard />;
}
```

- [ ] **Step 4: Run the e2e flow**

Run: `pnpm test:e2e tests/e2e/application.spec.ts -g "school-only applicant sees required fields"`
Expected: PASS, required controls are rendered after selecting the first path.

- [ ] **Step 5: Commit**

```bash
git add src/components/application/school-only-form.tsx src/components/application/application-wizard.tsx src/app/[locale]/application/page.tsx src/lib/application/upload.ts tests/e2e/application.spec.ts
git commit -m "feat: add school-only application flow"
```

### Task 8: Implement the school-plus-workshop flow and referee notification endpoint

**Files:**
- Create: `src/components/application/workshop-form.tsx`
- Create: `src/app/api/referees/notify/route.ts`
- Create: `src/lib/application/referee.ts`
- Modify: `src/components/application/application-wizard.tsx`
- Test: `tests/e2e/application.spec.ts`

- [ ] **Step 1: Add the failing workshop flow test**

```ts
test("workshop applicant sees referee fields", async ({page}) => {
  await page.goto("/zh/application");
  await page.getByLabel("参加暑期学校+讨论班").check();
  await expect(page.getByLabel("推荐人姓名")).toBeVisible();
  await expect(page.getByLabel("推荐人邮件")).toBeVisible();
});
```

- [ ] **Step 2: Implement the workshop form**

```tsx
export function WorkshopForm() {
  const form = useForm({resolver: zodResolver(workshopApplicationSchema)});
  return <form>{/* shared fields + referee + funding upload */}</form>;
}
```

- [ ] **Step 3: Add referee token and notify route**

```ts
// src/lib/application/referee.ts
export function buildRefereeInvite(input: {applicationId: string; refereeEmail: string}) {
  return {token: crypto.randomUUID(), ...input};
}
```

- [ ] **Step 4: Run the targeted test**

Run: `pnpm test:e2e tests/e2e/application.spec.ts -g "workshop applicant sees referee fields"`
Expected: PASS, the second path renders referee and funding inputs.

- [ ] **Step 5: Commit**

```bash
git add src/components/application/workshop-form.tsx src/app/api/referees/notify/route.ts src/lib/application/referee.ts src/components/application/application-wizard.tsx tests/e2e/application.spec.ts
git commit -m "feat: add workshop application and referee notification"
```

### Task 9: Implement the referee upload portal

**Files:**
- Create: `src/app/[locale]/referee/[token]/page.tsx`
- Create: `src/components/application/referee-upload-form.tsx`
- Modify: `src/lib/application/schema.ts`
- Test: `tests/e2e/application.spec.ts`

- [ ] **Step 1: Add a failing referee upload test**

```ts
test("referee portal shows upload instructions", async ({page}) => {
  await page.goto("/zh/referee/test-token");
  await expect(page.getByText(/推荐信上传/)).toBeVisible();
  await expect(page.getByText(/讨论班-学校名-学生姓名/)).toBeVisible();
});
```

- [ ] **Step 2: Implement the upload form**

```tsx
export function RefereeUploadForm() {
  return <form>{/* PDF or ZIP upload with filename validation */}</form>;
}
```

- [ ] **Step 3: Add the token route page**

```tsx
export default function RefereePortalPage() {
  return <RefereeUploadForm />;
}
```

- [ ] **Step 4: Run the referee test**

Run: `pnpm test:e2e tests/e2e/application.spec.ts -g "referee portal shows upload instructions"`
Expected: PASS, the route renders the filename rule and upload control.

- [ ] **Step 5: Commit**

```bash
git add src/app/[locale]/referee/[token]/page.tsx src/components/application/referee-upload-form.tsx src/lib/application/schema.ts tests/e2e/application.spec.ts
git commit -m "feat: add referee upload portal"
```

### Task 10: Finish submission wiring, QA, and delivery docs

**Files:**
- Modify: `src/components/application/school-only-form.tsx`
- Modify: `src/components/application/workshop-form.tsx`
- Modify: `src/components/application/referee-upload-form.tsx`
- Modify: `docs/setup.md`
- Modify: `README.md`
- Test: `tests/e2e/home.spec.ts`
- Test: `tests/e2e/application.spec.ts`

- [ ] **Step 1: Add a failing end-to-end happy path assertion**

```ts
test("school-only submission shows success state", async ({page}) => {
  await page.goto("/zh/application");
  await page.getByLabel("只参加暑期学校").check();
  await page.getByRole("button", {name: /提交/}).click();
  await expect(page.getByText(/申请已提交/)).toBeVisible();
});
```

- [ ] **Step 2: Connect forms to storage and database actions**

```ts
const path = await uploadApplicationFile(file);
await submitApplication({...values, fileUrl: path});
```

- [ ] **Step 3: Document setup and deployment**

```md
## Supabase

1. Create the `applications` and `recommendations` tables from `supabase/migrations/20260413_initial_schema.sql`.
2. Configure the storage bucket for application uploads.
3. Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`.
```

- [ ] **Step 4: Run the full test suite**

Run: `pnpm test && pnpm test:e2e`
Expected: PASS, unit coverage verifies validation and e2e covers the key visitor and applicant journeys.

- [ ] **Step 5: Commit**

```bash
git add src/components/application/school-only-form.tsx src/components/application/workshop-form.tsx src/components/application/referee-upload-form.tsx docs/setup.md README.md tests/e2e/home.spec.ts tests/e2e/application.spec.ts
git commit -m "feat: complete application submission flows"
```

## Self-Review

- Spec coverage: home, speakers, agenda, contact, bilingual routing, application paths, referee portal, Supabase schema, webhook notification, and 3D hero all map to tasks above.
- Gaps checked: no PRD requirement remains unassigned; dynamic speaker rendering is satisfied by typed content first and can later be switched to Supabase without changing page contracts.
- Placeholder scan: removed generic instructions and kept exact files, commands, regex values, and route targets.
- Type consistency: `school_only`, `school_and_workshop`, and the three filename patterns are named consistently across schema, UI, and tests.
