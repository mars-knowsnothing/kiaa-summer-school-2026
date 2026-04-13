"use client";

import {useState, useCallback} from "react";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {AnimatePresence, motion} from "framer-motion";

import type {Locale} from "@/i18n/routing";

type NavLabels = {
  speakers: string;
  agenda: string;
  application: string;
  contact: string;
};

type SiteHeaderProps = {
  locale: Locale;
  navLabels: NavLabels;
  localeSwitchLabel: string;
  siteName: string;
};

export function getLocaleSwitchHref(pathname: string, locale: Locale): string {
  const alternateLocale: Locale = locale === "zh" ? "en" : "zh";
  const segments = pathname.split("/").filter(Boolean);

  if (segments[0] === locale) {
    segments[0] = alternateLocale;
    return `/${segments.join("/")}`;
  }

  return `/${alternateLocale}`;
}

const navLinks = [
  {key: "speakers" as const, href: "/speakers"},
  {key: "agenda" as const, href: "/agenda"},
  {key: "application" as const, href: "/registration"},
  {key: "contact" as const, href: "/contact"},
];

export function SiteHeader({
  locale,
  navLabels,
  localeSwitchLabel,
  siteName
}: SiteHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const localeSwitchHref = getLocaleSwitchHref(pathname, locale);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobile = useCallback(() => setMobileOpen((v) => !v), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <header
      className="glass sticky top-0 z-50"
      style={{borderRadius: 0, borderLeft: "none", borderRight: "none", borderTop: "none"}}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href={`/${locale}`}
          className="text-sm font-semibold tracking-[0.20em] uppercase text-[var(--foreground)]"
        >
          {siteName}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 text-sm md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === `/${locale}${link.href}`;
            return (
              <Link
                key={link.key}
                href={`/${locale}${link.href}`}
                className={`rounded-full px-3.5 py-1.5 transition-all duration-200 ${
                  isActive
                    ? "bg-black/[0.06] text-[var(--foreground)]"
                    : "text-[var(--muted)] hover:bg-black/[0.04] hover:text-[var(--foreground)]"
                }`}
              >
                {navLabels[link.key]}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => router.push(localeSwitchHref)}
            className="glass-btn ml-2 !py-1.5 !px-3.5 !text-xs"
          >
            {localeSwitchLabel}
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={toggleMobile}
          aria-label="Toggle menu"
          className="flex flex-col items-center justify-center gap-[5px] p-1.5 md:hidden"
        >
          <span
            className={`block h-[1.5px] w-5 rounded-full bg-[var(--foreground)]/70 transition-transform duration-200 ${
              mobileOpen ? "translate-y-[6.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-5 rounded-full bg-[var(--foreground)]/70 transition-opacity duration-200 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-5 rounded-full bg-[var(--foreground)]/70 transition-transform duration-200 ${
              mobileOpen ? "-translate-y-[6.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{height: 0, opacity: 0}}
            animate={{height: "auto", opacity: 1}}
            exit={{height: 0, opacity: 0}}
            transition={{duration: 0.25, ease: "easeInOut"}}
            className="overflow-hidden border-t border-black/[0.04] md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-0.5 px-6 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={`/${locale}${link.href}`}
                  onClick={closeMobile}
                  className="rounded-[var(--glass-radius-xs)] px-3.5 py-2.5 text-sm text-[var(--muted)] transition hover:bg-black/[0.04] hover:text-[var(--foreground)]"
                >
                  {navLabels[link.key]}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  closeMobile();
                  router.push(localeSwitchHref);
                }}
                className="mt-1 rounded-[var(--glass-radius-xs)] border border-black/[0.06] px-3.5 py-2.5 text-left text-sm font-medium text-[var(--muted)] transition hover:bg-black/[0.04] hover:text-[var(--foreground)]"
              >
                {localeSwitchLabel}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
