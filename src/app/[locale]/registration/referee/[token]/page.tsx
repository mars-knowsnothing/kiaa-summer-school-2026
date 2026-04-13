import {notFound} from "next/navigation";
import {getTranslations} from "next-intl/server";

import {RefereeForm} from "@/components/application/referee-form";
import {locales, type Locale} from "@/i18n/routing";

type RefereePageProps = {
  params: Promise<{locale: string; token: string}>;
};

export default async function RefereePage({params}: RefereePageProps) {
  const {locale: rawLocale, token} = await params;
  if (!locales.includes(rawLocale as Locale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const t = await getTranslations({locale, namespace: "referee"});

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-6 py-16 sm:py-20">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
          {t("title")}
        </h1>
        <p className="text-lg leading-8 text-[var(--muted)]">
          {t("subtitle")}
        </p>
      </div>

      <RefereeForm token={token} />
    </section>
  );
}
