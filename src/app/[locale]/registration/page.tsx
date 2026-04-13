import {notFound} from "next/navigation";
import {getTranslations} from "next-intl/server";

import {ApplicationForm} from "@/components/application/application-form";
import {locales, type Locale} from "@/i18n/routing";

type LocalePageProps = {
  params: Promise<{locale: string}>;
};

export default async function ApplicationPage({params}: LocalePageProps) {
  const {locale: rawLocale} = await params;
  if (!locales.includes(rawLocale as Locale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const t = await getTranslations({locale, namespace: "application"});

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 sm:py-20">
      <div className="max-w-3xl space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--muted)]">
          {t("deadline")}
        </p>
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
          {t("title")}
        </h1>
        <p className="text-lg leading-8 text-[var(--muted)]">
          {t("subtitle")}
        </p>
      </div>

      <ApplicationForm locale={locale} />
    </section>
  );
}
