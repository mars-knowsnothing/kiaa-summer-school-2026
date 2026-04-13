import Link from "next/link";
import {notFound} from "next/navigation";

import {HeroScene} from "@/components/home/hero-scene";
import {agendaSchool, agendaWorkshop} from "@/content/agenda";
import {localized, localizedHomeContent, site} from "@/content/site";
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
    <section className="homepage-shell mx-auto w-full max-w-6xl px-6 py-14 sm:py-16 lg:py-20">
      {/* Hero area */}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:items-start">
        <div className="space-y-8">
          <div className="space-y-5">
            <p className="section-eyebrow">
              {home.eyebrow}
            </p>
            <h1 className="section-title max-w-3xl text-4xl sm:text-6xl xl:text-7xl">
              {home.title}
            </h1>
            <p className="glass-btn inline-flex !cursor-default !text-xs !tracking-[0.28em] uppercase">
              {home.dates}
            </p>
            <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">
              {home.subtitle}
            </p>
            <p className="max-w-2xl text-base leading-7 text-[var(--muted-soft)]">
              {home.description}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <Link href={`/${locale}${site.links.speakers.href}`} className="glass-btn-primary">
              {localized(site.links.speakers.label, locale)}
            </Link>
            <Link href={`/${locale}${site.links.agenda.href}`} className="glass-btn">
              {localized(site.links.agenda.label, locale)}
            </Link>
            <Link href={`/${locale}${site.links.contact.href}`} className="glass-btn">
              {localized(site.links.contact.label, locale)}
            </Link>
          </div>
        </div>

        {/* Right column: 3D scene */}
        <HeroScene cards={home.scene} />
      </div>

      {/* ── Full-width info panel ── */}
      <div className="glass-panel mt-12 p-6 sm:p-8">
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_1fr_1.4fr]">

          {/* Column 1: Event Details */}
          <div className="space-y-5">
            <p className="section-eyebrow">{localized(site.sections.details, locale)}</p>

            <div className="space-y-4">
              <div>
                <p className="text-lg font-semibold text-[var(--foreground)]">
                  {localized(site.schoolDates, locale)}
                </p>
                <p className="mt-0.5 text-sm text-[var(--muted)]">
                  {localized(site.schoolCheckIn, locale)}
                </p>
              </div>
              <div>
                <p className="text-lg font-semibold text-[var(--foreground)]">
                  {localized(site.workshopDate, locale)}
                </p>
                <p className="mt-0.5 text-sm text-[var(--muted)]">
                  {localized(site.workshopCheckIn, locale)}
                </p>
              </div>
            </div>

            <Link
              href={`/${locale}${site.links.contact.href}`}
              className="glass-btn !px-4 !py-2 !text-xs"
            >
              {localized(site.checkInfoBtn, locale)}
            </Link>
          </div>

          {/* Column 2: Location + Contacts */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 flex-shrink-0 text-[var(--accent)]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
                </svg>
                <p className="section-eyebrow">{localized(site.sections.location, locale)}</p>
              </div>
              <p className="text-sm leading-6 text-[var(--foreground)]">
                {localized(site.host, locale)}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 flex-shrink-0 text-[var(--accent)]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z"/>
                </svg>
                <p className="section-eyebrow">{localized(site.sections.contacts, locale)}</p>
              </div>
              <p className="text-sm font-medium text-[var(--foreground)]">
                {site.contacts.map((c) => localized(c.name, locale)).join(" / ")}
              </p>
              <p className="text-xs text-[var(--muted)]">
                {site.contacts.map((c) => localized(c.role, locale)).join(" / ")}
              </p>
            </div>
          </div>

          {/* Column 3: Overview + Agenda */}
          <div className="space-y-4">
            <p className="section-eyebrow">{localized(site.sections.overview, locale)}</p>
            <p className="text-sm leading-6 text-[var(--muted)]">
              {home.description}
            </p>

            <div className="space-y-1.5">
              {[agendaSchool, agendaWorkshop].map((section) => (
                <div
                  key={localized(section.title, locale)}
                  className="flex items-baseline gap-4 text-sm"
                >
                  <span className="w-28 flex-shrink-0 font-medium text-[var(--foreground)]">
                    {localized(section.title, locale)}
                  </span>
                  <span className="text-[var(--muted)]">
                    {localized(section.dateRange, locale)}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
