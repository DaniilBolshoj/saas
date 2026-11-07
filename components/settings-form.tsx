"use client";

import { useState } from "react";
import { aiLanguages } from "@/lib/ai-languages";

type Props = { initialLanguage: string };

export function SettingsForm({ initialLanguage }: Props) {
  const [language, setLanguage] = useState(initialLanguage);
  const [saved, setSaved] = useState(initialLanguage);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ kind: "error" | "success"; text: string } | null>(null);

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ preferredLanguage: language }),
      });
      const payload = await response.json() as { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Nepavyko išsaugoti nustatymo.");
      setSaved(language);
      setMessage({ kind: "success", text: "Nustatymas išsaugotas." });
    } catch (caught) {
      setMessage({ kind: "error", text: caught instanceof Error ? caught.message : "Nepavyko išsaugoti nustatymo." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={save} className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-1.5">
        <label htmlFor="preferred-language" className="block text-sm font-semibold">AI analizės kalba</label>
        <p className="text-sm leading-5 text-slate-600">
          Rizikos, veiksmai, klausimai ir santrauka bus rašomi šia kalba. Konkrečios analizės kalbą vėliau galėsite pakeisti rezultato ekrane, ir tai šio nustatymo nekeis.
        </p>
        <select
          id="preferred-language"
          value={language}
          onChange={(event) => { setLanguage(event.target.value); setMessage(null); }}
          className="mt-2 min-h-10 rounded-md border border-slate-300 bg-white px-3 text-sm shadow-sm outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
        >
          {aiLanguages.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}
        </select>
      </div>
      <div className="flex items-center gap-3">
        <button disabled={saving || language === saved} className="min-h-10 rounded-md bg-teal-800 px-4 text-sm font-medium text-white hover:bg-teal-900 disabled:cursor-not-allowed disabled:opacity-50">
          {saving ? "Saugoma..." : "Išsaugoti"}
        </button>
        {message && <span role={message.kind === "error" ? "alert" : "status"} className={`text-sm ${message.kind === "error" ? "text-rose-700" : "text-emerald-700"}`}>{message.text}</span>}
      </div>
    </form>
  );
}
