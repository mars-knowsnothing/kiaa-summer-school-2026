import {localized, site} from "@/content/site";
import {speakerRoleLabels, speakerRoleOrder, speakers, type Speaker} from "@/content/speakers";
import {locales, type Locale} from "@/i18n/routing";
import {notFound} from "next/navigation";

type LocalePageProps = {
  params: Promise<{locale: string}>;
};

export default async function SpeakersPage({params}: LocalePageProps) {
  const {locale: rawLocale} = await params;
  if (!locales.includes(rawLocale as Locale)) {
    notFound();
  }

  const locale = rawLocale as Locale;

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 sm:py-20">
      <div className="max-w-3xl space-y-4">
        <p className="section-eyebrow">
          {localized(site.sections.overview, locale)}
        </p>
        <h1 className="section-title text-4xl sm:text-5xl">
          {localized(site.links.speakers.label, locale)}
        </h1>
        <p className="text-lg leading-8 text-[var(--muted)]">
          {localized(site.description, locale)}
        </p>
      </div>

      <div className="grid gap-8">
        {speakerRoleOrder.map((role) => {
          const entries: Speaker[] = speakers
            .filter((speaker) => speaker.role === role)
            .sort((a, b) => a.sortOrder - b.sortOrder);

          return (
            <article key={role} className="glass-panel p-6">
              <div className="relative z-10 flex flex-col gap-2 border-b border-white/[0.06] pb-4 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="text-2xl font-semibold">{localized(speakerRoleLabels[role], locale)}</h2>
              </div>
              <div className="relative z-10 mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {entries.map((speaker) => (
                  <div key={`${role}-${speaker.sortOrder}`} className="glass-card p-4">
                    <p className="text-lg font-medium">{localized(speaker.name, locale)}</p>
                    {speaker.note ? (
                      <p className="mt-2 text-sm text-[var(--muted)]">{localized(speaker.note, locale)}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
