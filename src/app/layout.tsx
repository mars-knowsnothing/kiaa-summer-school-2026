import type {Metadata} from "next";
import type {ReactNode} from "react";
import {Sora} from "next/font/google";

import {defaultLocale} from "@/i18n/routing";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "KIAA Summer School & Workshop 2026",
  description: "Bilingual website for the 2026 KIAA summer school and workshop."
};

export default async function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang={defaultLocale} className={sora.variable}>
      <body className="font-[var(--font-sora),ui-sans-serif,system-ui,-apple-system,sans-serif]">
        {children}
      </body>
    </html>
  );
}
