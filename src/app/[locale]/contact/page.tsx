import {localized, site} from "@/content/site";
import {locales, type Locale} from "@/i18n/routing";
import {notFound} from "next/navigation";

type LocalePageProps = {
  params: Promise<{locale: string}>;
};

export default async function ContactPage({params}: LocalePageProps) {
  const {locale: rawLocale} = await params;
  if (!locales.includes(rawLocale as Locale)) {
    notFound();
  }

  const locale = rawLocale as Locale;

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 sm:py-20">
      <div className="max-w-3xl space-y-4">
        <p className="section-eyebrow">
          {localized(site.sections.contacts, locale)}
        </p>
        <h1 className="section-title text-4xl sm:text-5xl">
          {localized(site.links.contact.label, locale)}
        </h1>
        <p className="text-lg leading-8 text-[var(--muted)]">
          {localized(site.venue, locale)}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="glass-panel p-6">
          <p className="section-eyebrow">
            {localized(site.sections.details, locale)}
          </p>
          <h2 className="relative z-10 mt-3 text-2xl font-semibold">{localized(site.host, locale)}</h2>
          <p className="relative z-10 mt-3 text-[var(--muted)]">{localized(site.venue, locale)}</p>
          <p className="relative z-10 mt-4 text-sm text-[var(--muted-soft)]">{localized(site.checkIn, locale)}</p>
        </article>

        <article className="glass-panel p-6">
          <p className="section-eyebrow">
            {localized(site.sections.contacts, locale)}
          </p>
          <div className="relative z-10 mt-4 grid gap-4">
            {site.contacts.map((contact) => (
              <div key={contact.email} className="glass-card p-4">
                <p className="text-lg font-medium">{localized(contact.name, locale)}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{localized(contact.role, locale)}</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-3 inline-block text-sm text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-4 transition hover:decoration-[var(--accent)]/60"
                >
                  {contact.email}
                </a>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
