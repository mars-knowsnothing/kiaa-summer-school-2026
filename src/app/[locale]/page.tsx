import Link from "next/link";
import {notFound} from "next/navigation";

import {agendaSchool, agendaWorkshop} from "@/content/agenda";
import {localized, localizedHomeContent, site} from "@/content/site";
import {speakerRoleLabels, speakerRoleOrder, speakers, type Speaker} from "@/content/speakers";
import {locales, type Locale} from "@/i18n/routing";

type LocalePageProps = {
  params: Promise<{locale: string}>;
};

export default async function LocaleHomePage({params}: LocalePageProps) {
  const {locale: rawLocale} = await params;
  if (!locales.includes(rawLocale as Locale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const home = localizedHomeContent(locale);

  return (
    <>
      {/* ════════════════════════════════════════════
          HERO — full-bleed background image
          ════════════════════════════════════════════ */}
      <section className="hero-fullbleed relative -mt-[1px] overflow-hidden">
        {/* Background image */}
        <img
          src="/hero-banner.png"
          srcSet="/hero-banner.png 1x, /hero-banner@2x.png 2x"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
          fetchPriority="high"
          decoding="async"
        />

        {/* Layered overlays for depth */}
        <div className="absolute inset-0 bg-[#070e1a]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070e1a] via-transparent to-[#070e1a]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070e1a]/60 via-transparent to-transparent" />

        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"}}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <div className="flex min-h-[70vh] flex-col justify-center py-20 sm:py-28 lg:py-32">
            <div className="max-w-3xl space-y-6">
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.4em] text-sky-400/90">
                {home.eyebrow}
              </p>

              <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-[3.4rem]">
                {home.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4">
                <span className="rounded-full border border-white/15 bg-white/[0.07] px-5 py-2 text-[0.8rem] tracking-[0.2em] text-white/75 backdrop-blur-sm">
                  {home.dates}
                </span>
              </div>

              <p className="text-[0.95rem] leading-7 text-white/60">
                {home.subtitle}
              </p>

              <p className="max-w-2xl text-sm leading-7 text-white/40">
                {home.description}
              </p>

              <p className="pt-2 text-2xl font-bold tracking-tight text-amber-400 sm:text-3xl">
                {localized(site.deadline, locale)}
              </p>

              <div className="flex flex-wrap gap-4 pt-3">
                <Link
                  href={`/${locale}/registration`}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#0d1b2e] transition-all duration-300 hover:shadow-[0_0_32px_rgba(255,255,255,0.2)]"
                >
                  {locale === "zh" ? "立即报名" : "Register Now"}
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade into page background */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--bg-soft)] to-transparent" />
      </section>

      {/* ════════════════════════════════════════════
          CONTENT — contained width, glass panels
          ════════════════════════════════════════════ */}
      <section className="mx-auto w-full max-w-6xl space-y-12 px-6 pb-20 pt-4">

        {/* ── Key Info Panel (3 columns) ── */}
        <div className="glass-panel p-6 sm:p-8">
          <div className="relative z-10 grid gap-8 lg:grid-cols-3">

            {/* Col 1: Dates */}
            <div className="space-y-5">
              <p className="section-eyebrow">{localized(site.sections.details, locale)}</p>
              <div className="space-y-4">
                <div>
                  <p className="text-lg font-semibold text-[var(--foreground)]">
                    {localized(agendaSchool.dateRange, locale)}
                  </p>
                  <p className="mt-0.5 text-sm text-[var(--muted)]">
                    {localized(agendaSchool.title, locale)}
                  </p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-[var(--foreground)]">
                    {localized(agendaWorkshop.dateRange, locale)}
                  </p>
                  <p className="mt-0.5 text-sm text-[var(--muted)]">
                    {localized(agendaWorkshop.title, locale)}
                  </p>
                </div>
              </div>
            </div>

            {/* Col 2: Location */}
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 flex-shrink-0 text-[var(--accent)]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
                </svg>
                <p className="section-eyebrow">{localized(site.sections.location, locale)}</p>
              </div>
              <p className="text-sm leading-6 text-[var(--foreground)]">
                {localized(site.host, locale)}
              </p>
              <p className="text-sm leading-6 text-[var(--muted)]">
                {localized(site.venue, locale)}
              </p>
            </div>

            {/* Col 3: Contacts */}
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 flex-shrink-0 text-[var(--accent)]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <p className="section-eyebrow">{localized(site.sections.contacts, locale)}</p>
              </div>
              <div className="space-y-3">
                {site.contacts.map((contact) => (
                  <div key={contact.email}>
                    <p className="text-sm font-medium text-[var(--foreground)]">
                      {localized(contact.name, locale)}
                      <span className="ml-2 text-xs text-[var(--muted-soft)]">
                        {localized(contact.role, locale)}
                      </span>
                    </p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-4 hover:decoration-[var(--accent)]/60"
                    >
                      {contact.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── Summer School (Week 1) ── */}
        <article className="glass-panel p-6 sm:p-8">
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

          <div className="relative z-10 mt-8 space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-soft)]">
              {localized(agendaSchool.lecturersNote, locale)}
            </p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {agendaSchool.lecturers.map((lecturer, i) => (
                <span key={i} className="glass-card inline-flex items-center gap-1.5 px-3.5 py-2 text-sm">
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

        {/* ── Workshop (Weeks 2–6) ── */}
        <article className="glass-panel p-6 sm:p-8">
          <div className="relative z-10 border-b border-white/[0.06] pb-5">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-[var(--accent)]">
              {localized(agendaWorkshop.dateRange, locale)}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[var(--foreground)]">
              {localized(agendaWorkshop.title, locale)}
            </h2>
          </div>

          <div className="relative z-10 mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-soft)]">
              {locale === "zh" ? "形式与内容" : "Format & Content"}
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted)]">
              {localized(agendaWorkshop.description, locale)}
            </p>
          </div>

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

        {/* ── Speakers & Committees ── */}
        <div className="space-y-6">
          <p className="section-eyebrow">{locale === "zh" ? "讲者与委员会" : "Speakers & Committees"}</p>
          {speakerRoleOrder.map((role) => {
            const entries: Speaker[] = speakers
              .filter((s) => s.role === role)
              .sort((a, b) => a.sortOrder - b.sortOrder);

            return (
              <article key={role} className="glass-panel p-6">
                <div className="relative z-10 border-b border-white/[0.06] pb-4">
                  <h2 className="text-xl font-semibold text-[var(--foreground)]">
                    {localized(speakerRoleLabels[role], locale)}
                  </h2>
                </div>
                <div className="relative z-10 mt-5 flex flex-wrap gap-2.5">
                  {entries.map((speaker) => (
                    <span
                      key={`${role}-${speaker.sortOrder}`}
                      className="glass-card inline-flex items-center gap-1.5 px-3.5 py-2 text-sm"
                    >
                      <span className="font-medium text-[var(--foreground)]">
                        {localized(speaker.name, locale)}
                      </span>
                      {speaker.note && (
                        <>
                          <span className="text-[var(--muted-soft)]">·</span>
                          <span className="text-xs text-[var(--muted)]">
                            {localized(speaker.note, locale)}
                          </span>
                        </>
                      )}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}

          {/* Host organizations */}
          <article className="glass-panel p-6">
            <div className="relative z-10 border-b border-white/[0.06] pb-4">
              <h2 className="text-xl font-semibold text-[var(--foreground)]">
                {locale === "zh" ? "主办单位" : "Host Organizations"}
              </h2>
            </div>
            <div className="relative z-10 mt-5 space-y-2 text-sm text-[var(--foreground)]">
              <p>{locale === "zh" ? "北京大学物理学院" : "School of Physics, Peking University"}</p>
              <p>{locale === "zh" ? "北京大学科维理天文与天体物理研究所" : "Kavli Institute for Astronomy and Astrophysics, Peking University"}</p>
            </div>
          </article>
        </div>

      </section>
    </>
  );
}
