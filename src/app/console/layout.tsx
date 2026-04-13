import type {ReactNode} from "react";

export const metadata = {
  title: "Admin Console — KIAA Summer School 2026",
};

export default function ConsoleLayout({children}: {children: ReactNode}) {
  return (
    <div className="mx-auto min-h-screen max-w-7xl px-6 py-10">
      {children}
    </div>
  );
}
