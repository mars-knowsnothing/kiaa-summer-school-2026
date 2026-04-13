"use client";

import {useActionState} from "react";

import {login} from "@/lib/console/actions";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, {});

  return (
    <form action={formAction} className="relative z-10 mt-6 space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="username" className="block text-sm font-medium text-[var(--foreground)]">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          autoComplete="username"
          className="glass-input"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className="block text-sm font-medium text-[var(--foreground)]">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="glass-input"
        />
      </div>

      {state?.error && (
        <p className="glass-error text-center text-sm">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="glass-btn-primary w-full"
      >
        {isPending ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}
