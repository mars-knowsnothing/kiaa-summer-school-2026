import type {ReactNode} from "react";

import {NextIntlClientProvider} from "next-intl";
import {getMessages, getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";

import {SiteFooter} from "@/components/layout/site-footer";
import {SiteHeader} from "@/components/layout/site-header";
import {locales, type Locale} from "@/i18n/routing";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{locale: string}>;
};

export default async function LocaleLayout({children, params}: LocaleLayoutProps) {
  const {locale: rawLocale} = await params;
  if (!locales.includes(rawLocale as Locale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const messages = await getMessages({locale});
  const site = await getTranslations({locale, namespace: "site"});
  const navigation = await getTranslations({locale, namespace: "navigation"});
  const localeSwitch = await getTranslations({locale, namespace: "localeSwitch"});
  const alternateLocale: Locale = locale === "zh" ? "en" : "zh";

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader
          locale={locale}
          navLabels={{
            registration: navigation("application"),
          }}
          localeSwitchLabel={localeSwitch(alternateLocale)}
          siteName={site("name")}
        />
        <main className="flex-1">{children}</main>
        <SiteFooter footerNote={site("footer")} locale={locale} />
      </div>
    </NextIntlClientProvider>
  );
}
