"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function CreateOrganizationForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/organizations", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const payload = await response.json() as { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Komandos sukurti nepavyko.");
      router.replace("/dashboard");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Komandos sukurti nepavyko.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <label className="block space-y-2 text-sm font-medium">
        Komandos pavadinimas
        <input value={name} onChange={(event) => setName(event.target.value)} required maxLength={100} className="min-h-11 w-full rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-teal-800 focus:ring-2 focus:ring-teal-800/20" placeholder="Pvz., Northstar Studio" />
      </label>
      {error && <p role="alert" className="text-sm text-rose-700">{error}</p>}
      <button disabled={loading || !name.trim()} className="min-h-11 w-full rounded-md bg-teal-900 px-4 text-sm font-medium text-white hover:bg-teal-950 disabled:opacity-50">
        {loading ? "Kuriama..." : "Sukurti komandą"}
      </button>
    </form>
  );
}