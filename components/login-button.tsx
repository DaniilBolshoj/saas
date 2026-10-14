"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function LoginButton() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const authError = searchParams.get("error");

  async function signIn() {
    setLoading(true);
    setError(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (signInError) throw signInError;
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Prisijungti nepavyko.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={signIn}
        disabled={loading}
        className="flex min-h-11 w-full items-center justify-center gap-3 rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-800 transition hover:bg-slate-50 disabled:opacity-60"
      >
        <span aria-hidden="true" className="font-bold text-lg">G</span>
        {loading ? "Jungiama..." : "Prisijungti su Google"}
      </button>
      {(error || authError) && <p role="alert" className="text-sm text-rose-700">{error ?? "Google prisijungimas nepavyko. Bandykite dar kartą."}</p>}
    </div>
  );
}