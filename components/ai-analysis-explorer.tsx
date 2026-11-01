"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { aiLanguages, getAiLanguageName } from "@/lib/ai-languages";

type ActionItem = {
  title: string;
  description: string;
};

type ExtractedLink = {
  url: string;
  title: string;
  description: string;
};

type AnalysisContent = {
  summary: string;
  action_items: ActionItem[];
  extracted_links: ExtractedLink[];
};

type AnalysisResponse = {
  analysis: {
    id: string;
    summary: string;
    action_items: ActionItem[];
  };
  extracted_links: ExtractedLink[];
  sourceLanguage: string;
};

type Props = {
  organizationId: string;
  preferredLanguage: string;
};

export function AiAnalysisExplorer({ organizationId, preferredLanguage: initialPreferredLanguage }: Props) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [consent, setConsent] = useState(false);
  const [preferredLanguage, setPreferredLanguage] = useState(initialPreferredLanguage);
  const [savingPreferredLanguage, setSavingPreferredLanguage] = useState(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [displayedAnalysis, setDisplayedAnalysis] = useState<AnalysisContent | null>(null);
  const [resultLanguage, setResultLanguage] = useState(initialPreferredLanguage);
  const [translations, setTranslations] = useState<Record<string, AnalysisContent>>({});
  const [loading, setLoading] = useState(false);
  const [translationLoading, setTranslationLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedUrls, setSavedUrls] = useState<Record<string, boolean>>({});
  const [savingUrl, setSavingUrl] = useState<string | null>(null);
  const [replyIntent, setReplyIntent] = useState("");
  const [replyDraft, setReplyDraft] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);

  async function analyze() {
    setLoading(true);
    setError(null);
    setResult(null);
    setDisplayedAnalysis(null);
    setTranslations({});
    setReplyDraft("");
    setSavedUrls({});
    setCompletedActions({});

    try {
      const response = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ operation: "analyze", organizationId, text, consent }),
      });
      const payload = await response.json() as AnalysisResponse & { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Analizė nepavyko.");
      setResult(payload);
      const baseAnalysis = {
        ...payload.analysis,
        extracted_links: payload.extracted_links,
      };
      setDisplayedAnalysis(baseAnalysis);
      setResultLanguage(preferredLanguage);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Įvyko netikėta klaida.");
    } finally {
      setLoading(false);
    }
  }

  async function updatePreferredLanguage(language: string) {
    const previousLanguage = preferredLanguage;
    setPreferredLanguage(language);
    setSavingPreferredLanguage(true);
    setError(null);
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ preferredLanguage: language }),
      });
      const payload = await response.json() as { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Kalbos nustatymo išsaugoti nepavyko.");
    } catch (caught) {
      setPreferredLanguage(previousLanguage);
      setError(caught instanceof Error ? caught.message : "Kalbos nustatymo išsaugoti nepavyko.");
    } finally {
      setSavingPreferredLanguage(false);
    }
  }

  async function changeResultLanguage(language: string) {
    if (!result) return;
    setError(null);
    setResultLanguage(language);

    const baseAnalysis = {
      ...result.analysis,
      extracted_links: result.extracted_links,
    };
    if (language === preferredLanguage) {
      setDisplayedAnalysis(baseAnalysis);
      return;
    }
    if (translations[language]) {
      setDisplayedAnalysis(translations[language]);
      return;
    }

    setTranslationLoading(true);
    try {
      const response = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          operation: "translate",
          organizationId,
          text,
          analysis: baseAnalysis,
          targetLanguage: language,
          consent,
        }),
      });
      const payload = await response.json() as { analysis?: AnalysisContent; error?: string };
      if (!response.ok || !payload.analysis) throw new Error(payload.error ?? "Vertimas nepavyko.");
      setTranslations((current) => ({ ...current, [language]: payload.analysis! }));
      setDisplayedAnalysis(payload.analysis);
    } catch (caught) {
      setResultLanguage(preferredLanguage);
      setDisplayedAnalysis(baseAnalysis);
      setError(caught instanceof Error ? caught.message : "Vertimas nepavyko.");
    } finally {
      setTranslationLoading(false);
    }
  }

  async function generateReply() {
    if (!replyIntent.trim()) return;
    setReplyLoading(true);
    setError(null);
    setReplyDraft("");
    try {
      const response = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          operation: "reply",
          organizationId,
          text,
          replyText: replyIntent,
          consent,
        }),
      });
      const payload = await response.json() as { replyDraft?: string; error?: string };
      if (!response.ok || !payload.replyDraft) throw new Error(payload.error ?? "Atsakymo juodraščio paruošti nepavyko.");
      setReplyDraft(payload.replyDraft);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Atsakymo juodraščio paruošti nepavyko.");
    } finally {
      setReplyLoading(false);
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

  async function deleteAnalysis() {
    if (!result) return;
    setDeleting(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/analyze", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ analysisId: result.analysis.id }),
      });
      const payload = await response.json() as { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Analizės ištrinti nepavyko.");
      setResult(null);
      setText("");
      setConsent(false);
      setCompletedActions({});
      setSavedUrls({});
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Analizės ištrinti nepavyko.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-6xl space-y-8 text-slate-900">
      <header className="space-y-4">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
          <Sparkles aria-hidden="true" className="size-3.5" />
          AI palaikomas Explorer
        </span>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Paverskite pokalbį projekto ištekliais</h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-600">
            Įklijuokite komandos susirašinėjimą. AI išskirs santrauką, veiksmus ir jame rastas nuorodas.
          </p>
        </div>
      </header>

      <div className="space-y-3">
        <label htmlFor="preferred-language" className="block text-sm font-medium">Numatytoji AI kalba</label>
        <select
          id="preferred-language"
          value={preferredLanguage}
          onChange={(event) => void updatePreferredLanguage(event.target.value)}
          disabled={savingPreferredLanguage}
          className="min-h-10 rounded-md border border-slate-300 bg-white px-3 text-sm shadow-sm outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
        >
          {aiLanguages.map((language) => (
            <option key={language.code} value={language.code}>{language.name}</option>
          ))}
        </select>
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
              Sutinku, kad tekstas ir atsakymo gairės būtų siunčiami Google Gemini analizei / vertimui, o analizė saugoma LinkOps iki 90 dienų. Juose gali būti asmens ar konfidencialių duomenų.
            </label>
          </div>
          <button
            type="button"
            onClick={analyze}
            disabled={loading || savingPreferredLanguage || text.trim().length === 0 || !consent}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-teal-800 px-4 text-sm font-medium text-white transition hover:bg-teal-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading && <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
            {loading ? "Analizuojama..." : "Analizuoti su AI"}
          </button>
        </div>
      </div>

      <aside className="min-w-0 space-y-5" aria-label="AI analizės rezultatai">
      {error && (
        <p role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {error}
        </p>
      )}

      {loading && (
        <div role="status" aria-live="polite" className="flex min-h-56 flex-col items-center justify-center gap-4 rounded-3xl border border-slate-100 bg-white p-6 text-center text-sm text-slate-600 shadow-xl shadow-slate-200/50">
          <span aria-hidden="true" className="size-8 animate-spin rounded-full border-[3px] border-emerald-800/15 border-t-emerald-700" />
          Skaitome pokalbį ir ieškome projektui svarbių išteklių...
        </div>
      )}

      {result && displayedAnalysis && (
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
                setDisplayedAnalysis(null);
                setTranslations({});
                setText("");
                setConsent(false);
                setReplyIntent("");
                setReplyDraft("");
              } catch (caught) {
                setError(caught instanceof Error ? caught.message : "Analizės ištrinti nepavyko.");
              }
            }} className="text-xs font-medium text-slate-500 underline underline-offset-4 hover:text-rose-700">Ištrinti šią analizę</button>
          </div>
          <div className="flex flex-wrap items-center gap-3 rounded-md border border-slate-200 bg-white px-4 py-3">
            <label htmlFor="result-language" className="text-sm font-medium">Analizės kalba</label>
            <select
              id="result-language"
              value={resultLanguage}
              onChange={(event) => void changeResultLanguage(event.target.value)}
              disabled={translationLoading}
              className="min-h-9 rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-teal-700 disabled:opacity-60"
            >
              <option value={preferredLanguage}>Numatytoji: {getAiLanguageName(preferredLanguage)}</option>
              <option value="source">Užsakovo kalba{getAiLanguageName(result.sourceLanguage) ? `: ${getAiLanguageName(result.sourceLanguage)}` : ""}</option>
              {aiLanguages.filter((language) => language.code !== preferredLanguage).map((language) => (
                <option key={language.code} value={language.code}>{language.name}</option>
              ))}
            </select>
            {translationLoading && <span role="status" className="text-xs text-slate-500">Verčiama...</span>}
          </div>
          <details className="rounded-md border border-slate-200 bg-white px-4 py-3">
            <summary className="cursor-pointer text-sm font-medium">Rodyti originalų užsakovo tekstą</summary>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">{text}</p>
          </details>
          <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold">Santrauka</h2>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">{displayedAnalysis.summary}</p>
          </article>

          <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold">Veiksmai <span className="font-normal text-slate-500">({displayedAnalysis.action_items.length})</span></h2>
            {displayedAnalysis.action_items.length === 0 ? (
              <p className="mt-3 text-sm text-slate-500">Veiksmų nerasta.</p>
            ) : (
              <ul className="mt-3 divide-y divide-slate-100">
                {displayedAnalysis.action_items.map((item, index) => (
                  <li key={`${item.title}-${index}`} className="py-3 first:pt-0 last:pb-0">
                    <h3 className="text-sm font-medium">{item.title}</h3>
                    {item.description && <p className="mt-1 text-sm leading-5 text-slate-600">{item.description}</p>}
                  </li>
                  );
                })}
              </ul>
            )}
          </section>

          <section className="space-y-3">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-base font-semibold">Rastos nuorodos</h2>
              <span className="text-xs text-slate-500">{displayedAnalysis.extracted_links.length}</span>
            </div>
            {displayedAnalysis.extracted_links.length === 0 ? (
              <p className="rounded-md border border-dashed border-slate-300 px-4 py-6 text-center text-sm text-slate-500">Nuorodų pokalbyje nerasta.</p>
            ) : displayedAnalysis.extracted_links.map((link) => (
              <article key={link.url} className="flex flex-col gap-4 rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold">{link.title}</h3>
                  <a href={link.url} target="_blank" rel="noreferrer" className="mt-1 block truncate text-xs text-teal-800 underline decoration-teal-800/30 underline-offset-2">
                    {link.url}
                  </a>
                  {link.description && <p className="mt-2 text-sm leading-5 text-slate-600">{link.description}</p>}
                </div>
              </article>
            ))}
          </section>

          <section className="space-y-3 rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <div>
              <h2 className="text-base font-semibold">Atsakymo užsakovui juodraštis</h2>
              <p className="mt-1 text-sm leading-5 text-slate-600">
                Parašykite atsakymo esmę {getAiLanguageName(preferredLanguage)} kalba. AI paruoš juodraštį užsakovo kalba; jis nebus automatiškai išsiųstas.
              </p>
            </div>
            <textarea
              value={replyIntent}
              onChange={(event) => setReplyIntent(event.target.value)}
              maxLength={3_000}
              rows={3}
              placeholder="Pvz., Sutinku, padarysiu iki penktadienio."
              className="block w-full resize-y rounded-md border border-slate-300 px-3 py-2 text-sm leading-6 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
            />
            <button
              type="button"
              onClick={() => void generateReply()}
              disabled={!consent || !replyIntent.trim() || replyLoading}
              className="inline-flex min-h-9 items-center justify-center gap-2 rounded-md bg-teal-800 px-3 text-sm font-medium text-white hover:bg-teal-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {replyLoading ? "Ruošiamas juodraštis..." : "Paruošti užsakovo kalba"}
            </button>
            {replyDraft && (
              <div className="rounded-md bg-slate-50 p-3">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Peržiūrėkite prieš siųsdami</p>
                <p className="whitespace-pre-wrap text-sm leading-6 text-slate-800">{replyDraft}</p>
              </div>
            )}
          </section>
        </div>
      )}
      {!result && !loading && (
        <div className="flex min-h-[28rem] flex-col items-center justify-center rounded-3xl border border-slate-100 bg-white px-6 py-10 text-center shadow-xl shadow-slate-200/50">
          <span className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-emerald-50 to-cyan-50 text-emerald-700 ring-1 ring-emerald-100">
            <Sparkles aria-hidden="true" className="size-8" />
          </span>
          <h2 className="mt-5 text-lg font-bold tracking-tight text-slate-900">Įžvalgos pasirodys čia</h2>
          <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
            Įklijuokite pokalbio tekstą, patvirtinkite sutikimą ir paleiskite analizę. Santrauka, veiksmai bei rastos nuorodos bus rodomi šiame skydelyje.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">Santrauka</span>
            <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">Veiksmai</span>
            <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">Nuorodos</span>
          </div>
        </div>
      )}
      </aside>
      </div>
    </section>
  );
}