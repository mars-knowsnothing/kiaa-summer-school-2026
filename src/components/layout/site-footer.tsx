import type {Locale} from "@/i18n/routing";

type SiteFooterProps = {
  locale: Locale;
  footerNote: string;
};

export function SiteFooter({footerNote, locale}: SiteFooterProps) {
  return (
    <footer className="border-t border-white/[0.06] bg-[rgba(255,255,255,0.03)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-6 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>{footerNote}</p>
        <p className="text-[var(--muted-soft)]">{locale === "zh" ? "中文 / English" : "English / 中文"}</p>
      </div>
    </footer>
  );
}
