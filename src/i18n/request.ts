import {getRequestConfig} from "next-intl/server";

import en from "../../messages/en.json";
import zh from "../../messages/zh.json";

import {defaultLocale, locales, type Locale} from "./routing";

const messagesByLocale = {
  en,
  zh
} as const;

export default getRequestConfig(async ({requestLocale}) => {
  const resolvedLocale = await requestLocale;
  const locale = locales.includes(resolvedLocale as Locale)
    ? (resolvedLocale as Locale)
    : defaultLocale;

  return {
    locale,
    messages: messagesByLocale[locale]
  };
});
