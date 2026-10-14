"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ActionItem = {
  title: string;
  description: string;
};

type ExtractedLink = {
  url: string;
  title: string;
  description: string;
};

type AnalysisResponse = {
  analysis: {
    id: string;
    summary: string;
    action_items: ActionItem[];
  };
  extracted_links: ExtractedLink[];
};

type Props = {
  organizationId: string;
};

export function AiAnalysisExplorer({ organizationId }: Props) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [consent, setConsent] = useState(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedUrls, setSavedUrls] = useState<Record<string, boolean>>({});
  const [savingUrl, setSavingUrl] = useState<string | null>(null);

  async function analyze() {
    setLoading(true);
    setError(null);
    setResult(null);
    setSavedUrls({});

    try {
      const response = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ organizationId, text, consent }),
      });
      const payload = await response.json() as AnalysisResponse & { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Analizė nepavyko.");
      setResult(payload);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Įvyko netikėta klaida.");
    } finally {
      setLoading(false);
    }
  }

  async function saveLink(link: ExtractedLink) {
    if (!result) return;
    setSavingUrl(link.url);
    setError(null);

    try {
      const response = await fetch("/api/links", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          organizationId,
          title: link.title,
          url: link.url,
          description: link.description,
          aiAnalysisId: result.analysis.id,
        }),
      });
      const payload = await response.json() as { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Nuorodos išsaugoti nepavyko.");
      setSavedUrls((current) => ({ ...current, [link.url]: true }));
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Nuorodos išsaugoti nepavyko.");
    } finally {
      setSavingUrl(null);
    }
  }

  return (
    <section className="mx-auto w-full max-w-4xl space-y-6 text-slate-900">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">LinkOps / Explorer</p>
        <h1 className="text-2xl font-semibold tracking-tight">Paverskite pokalbį projekto ištekliais</h1>
        <p className="max-w-2xl text-sm leading-6 text-slate-600">
          Įklijuokite komandos susirašinėjimą. AI išskirs santrauką, veiksmus ir jame rastas nuorodas.
        </p>
      </header>

      <div className="space-y-3">
        <label htmlFor="conversation" className="text-sm font-medium">Susirašinėjimo tekstas</label>
        <textarea
          id="conversation"
          value={text}
          onChange={(event) => setText(event.target.value)}
          maxLength={12_000}
          rows={9}
          placeholder="Įklijuokite Slack, el. pašto ar kito pokalbio ištrauką..."
          className="block w-full resize-y rounded-md border border-slate-300 bg-white px-4 py-3 text-sm leading-6 shadow-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <span className="block text-xs text-slate-500">{text.length.toLocaleString()} / 12 000</span>
            <label className="flex max-w-2xl items-start gap-2 text-xs leading-5 text-slate-600">
              <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-0.5 size-4 shrink-0 accent-teal-900" />
              Sutinku, kad tekstas būtų siunčiamas OpenAI analizei ir saugomas LinkOps iki 90 dienų. Jame gali būti asmens ar konfidencialių duomenų.
            </label>
          </div>
          <button
            type="button"
            onClick={analyze}
            disabled={loading || text.trim().length === 0 || !consent}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-teal-800 px-4 text-sm font-medium text-white transition hover:bg-teal-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading && <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
            {loading ? "Analizuojama..." : "Analizuoti su AI"}
          </button>
        </div>
      </div>

      {error && (
        <p role="alert" className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {error}
        </p>
      )}

      {loading && (
        <div role="status" aria-live="polite" className="flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600">
          <span aria-hidden="true" className="size-5 animate-spin rounded-full border-2 border-teal-800/20 border-t-teal-800" />
          Skaitome pokalbį ir ieškome projektui svarbių išteklių...
        </div>
      )}

      {result && (
        <div className="space-y-5" aria-live="polite">
          <div className="flex justify-end">
            <button type="button" onClick={async () => {
              try {
                const response = await fetch("/api/ai/analyze", {
                  method: "DELETE",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({ analysisId: result.analysis.id }),
                });
                if (!response.ok) throw new Error("Analizės ištrinti nepavyko.");
                setResult(null);
                setText("");
                setConsent(false);
              } catch (caught) {
                setError(caught instanceof Error ? caught.message : "Analizės ištrinti nepavyko.");
              }
            }} className="text-xs font-medium text-slate-500 underline underline-offset-4 hover:text-rose-700">Ištrinti šią analizę</button>
          </div>
          <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold">Santrauka</h2>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">{result.analysis.summary}</p>
          </article>

          <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold">Veiksmai <span className="font-normal text-slate-500">({result.analysis.action_items.length})</span></h2>
            {result.analysis.action_items.length === 0 ? (
              <p className="mt-3 text-sm text-slate-500">Veiksmų nerasta.</p>
            ) : (
              <ul className="mt-3 divide-y divide-slate-100">
                {result.analysis.action_items.map((item, index) => (
                  <li key={`${item.title}-${index}`} className="py-3 first:pt-0 last:pb-0">
                    <h3 className="text-sm font-medium">{item.title}</h3>
                    {item.description && <p className="mt-1 text-sm leading-5 text-slate-600">{item.description}</p>}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="space-y-3">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-base font-semibold">Rastos nuorodos</h2>
              <span className="text-xs text-slate-500">{result.extracted_links.length}</span>
            </div>
            {result.extracted_links.length === 0 ? (
              <p className="rounded-md border border-dashed border-slate-300 px-4 py-6 text-center text-sm text-slate-500">Nuorodų pokalbyje nerasta.</p>
            ) : result.extracted_links.map((link) => (
              <article key={link.url} className="flex flex-col gap-4 rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold">{link.title}</h3>
                  <a href={link.url} target="_blank" rel="noreferrer" className="mt-1 block truncate text-xs text-teal-800 underline decoration-teal-800/30 underline-offset-2">
                    {link.url}
                  </a>
                  {link.description && <p className="mt-2 text-sm leading-5 text-slate-600">{link.description}</p>}
                </div>
                <button
                  type="button"
                  onClick={() => void saveLink(link)}
                  disabled={savedUrls[link.url] || savingUrl !== null}
                  className="inline-flex min-h-9 shrink-0 items-center justify-center rounded-md border border-slate-300 px-3 text-sm font-medium text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {savedUrls[link.url] ? "Išsaugota" : savingUrl === link.url ? "Saugoma..." : "Išsaugoti į projektą"}
                </button>
              </article>
            ))}
          </section>
        </div>
      )}
    </section>
  );
}