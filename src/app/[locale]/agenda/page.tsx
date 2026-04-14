import {agendaSchool, agendaWorkshop} from "@/content/agenda";
import {localized, site} from "@/content/site";
import {locales, type Locale} from "@/i18n/routing";
import {notFound} from "next/navigation";

type LocalePageProps = {
  params: Promise<{locale: string}>;
};

export default async function AgendaPage({params}: LocalePageProps) {
  const {locale: rawLocale} = await params;
  if (!locales.includes(rawLocale as Locale)) {
    notFound();
  }

  const locale = rawLocale as Locale;

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16 sm:py-20">
      {/* ── Page header ── */}
      <div className="max-w-3xl space-y-4">
        <p className="section-eyebrow">
          {localized(site.sections.details, locale)}
        </p>
        <h1 className="section-title text-4xl sm:text-5xl">
          {localized(site.links.agenda.label, locale)}
        </h1>
        <p className="text-lg leading-8 text-[var(--muted)]">
          {localized(site.dates, locale)}
        </p>
      </div>

      {/* ═══════════════════════════════════════════
          Part 1 — Summer School (Week 1)
          ═══════════════════════════════════════════ */}
      <article className="glass-panel p-6 sm:p-8">
        {/* Section header */}
        <div className="relative z-10 flex flex-col gap-3 border-b border-white/[0.06] pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-[var(--accent)]">
              {localized(agendaSchool.dateRange, locale)}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[var(--foreground)]">
              {localized(agendaSchool.title, locale)}
            </h2>
          </div>
          <p className="text-sm text-[var(--muted)]">
            {localized(agendaSchool.languageNote, locale)}
          </p>
        </div>

        {/* Teaching topics */}
        <div className="relative z-10 mt-6 space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-soft)]">
            {locale === "zh" ? "讲授内容" : "Topics"}
          </p>
          <ol className="mt-3 grid gap-3">
            {agendaSchool.topics.map((topic, i) => (
              <li key={i} className="glass-card flex items-start gap-4 p-4">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-xs font-bold text-[var(--accent)]">
                  {i + 1}
                </span>
                <p className="text-sm leading-6 text-[var(--foreground)]">
                  {localized(topic, locale)}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Lecturers */}
        <div className="relative z-10 mt-8 space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-soft)]">
            {localized(agendaSchool.lecturersNote, locale)}
          </p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {agendaSchool.lecturers.map((lecturer, i) => (
              <span
                key={i}
                className="glass-card inline-flex items-center gap-1.5 px-3.5 py-2 text-sm"
              >
                <span className="font-medium text-[var(--foreground)]">
                  {localized(lecturer.name, locale)}
                </span>
                <span className="text-[var(--muted-soft)]">·</span>
                <span className="text-xs text-[var(--muted)]">
                  {localized(lecturer.affiliation, locale)}
                </span>
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* ═══════════════════════════════════════════
          Part 2 — Workshop (Weeks 2–6)
          ═══════════════════════════════════════════ */}
      <article className="glass-panel p-6 sm:p-8">
        {/* Section header */}
        <div className="relative z-10 border-b border-white/[0.06] pb-5">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-[var(--accent)]">
            {localized(agendaWorkshop.dateRange, locale)}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[var(--foreground)]">
            {localized(agendaWorkshop.title, locale)}
          </h2>
        </div>

        {/* Description */}
        <div className="relative z-10 mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-soft)]">
            {locale === "zh" ? "形式与内容" : "Format & Content"}
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted)]">
            {localized(agendaWorkshop.description, locale)}
          </p>
        </div>

        {/* Detail items */}
        <div className="relative z-10 mt-6 grid gap-4 sm:grid-cols-3">
          {agendaWorkshop.items.map((item, i) => (
            <div key={i} className="glass-card p-5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/10">
                  {i === 0 ? (
                    <svg className="h-3.5 w-3.5 text-[var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4-4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 00-3-3.87" />
                      <path d="M16 3.13a4 4 0 010 7.75" />
                    </svg>
                  ) : i === 1 ? (
                    <svg className="h-3.5 w-3.5 text-[var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                  ) : (
                    <svg className="h-3.5 w-3.5 text-[var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  )}
                </span>
                <p className="text-sm font-semibold text-[var(--foreground)]">
                  {localized(item.label, locale)}
                </p>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                {localized(item.text, locale)}
              </p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
