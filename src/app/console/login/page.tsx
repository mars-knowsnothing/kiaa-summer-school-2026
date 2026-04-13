import {redirect} from "next/navigation";

import {getSession} from "@/lib/console/auth";
import {LoginForm} from "./login-form";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const session = await getSession();
  if (session.authenticated) redirect("/console/dashboard");

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="glass-panel w-full max-w-sm p-8">
        <h1 className="relative z-10 text-center text-2xl font-bold text-[var(--foreground)]">
          Admin Console
        </h1>
        <p className="relative z-10 mt-2 text-center text-sm text-[var(--muted)]">
          KIAA Summer School 2026
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
