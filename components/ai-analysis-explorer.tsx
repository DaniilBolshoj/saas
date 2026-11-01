"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, ArrowUpRight, CheckCircle2, CircleHelp, FileText, Link2, LockKeyhole, Sparkles, Trash2 } from "lucide-react";
import { aiLanguages, getAiLanguageName, getAiLanguageNameInLithuanian } from "@/lib/ai-languages";

type ActionItem = {
  order: number;
  title: string;
  description: string;
  timing: string;
};

type ExtractedLink = {
  url: string;
  title: string;
  description: string;
};

type AnalysisContent = {
  summary: string;
  requirements: { requirement: string; clarity: "clear" | "unclear"; evidence: string }[];
  risks: { risk: string; severity: "critical" | "high" | "medium" | "low"; evidence: string }[];
  deadline: { value: string; evidence: string };
  budget: { value: string; evidence: string };
  client_questions: string[];
  action_items: ActionItem[];
  recommendation: { decision: "take" | "negotiate" | "decline"; rationale: string };
  extracted_links: ExtractedLink[];
};

type AnalysisResponse = {
  analysis: {
    id: string;
    summary: string;
    action_items: ActionItem[];
    project_assessment: Omit<AnalysisContent, "summary" | "action_items" | "extracted_links">;
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
  const [completedActions, setCompletedActions] = useState<Record<number, boolean>>({});
  const [deleting, setDeleting] = useState(false);

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
        summary: payload.analysis.summary,
        action_items: payload.analysis.action_items,
        ...payload.analysis.project_assessment,
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
      summary: result.analysis.summary,
      action_items: result.analysis.action_items,
      ...result.analysis.project_assessment,
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
      setDisplayedAnalysis(null);
      setTranslations({});
      setText("");
      setConsent(false);
      setReplyIntent("");
      setReplyDraft("");
      setCompletedActions({});
      setSavedUrls({});
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Analizės ištrinti nepavyko.");
    } finally {
      setDeleting(false);
    }
  }

  const prioritizedRisks = displayedAnalysis
    ? [...displayedAnalysis.risks].sort((left, right) => {
      const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return severityOrder[left.severity] - severityOrder[right.severity];
    })
    : [];

  return (
    <section className="mx-auto w-full max-w-6xl space-y-8 text-slate-900">
      <header className="space-y-4">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
          <Sparkles aria-hidden="true" className="size-3.5" />
          AI palaikomas Explorer
        </span>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Įvertinkite kliento projektą prieš sutikdami</h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-600">
            Įklijuokite kliento žinutę ar projekto aprašymą. Gausite reikalavimus, rizikas, klausimus klientui ir konkrečius kitus žingsnius.
          </p>
        </div>
      </header>

      <div className="space-y-5">
        <div className="space-y-2">
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
        </div>
        <div className="space-y-2">
        <label htmlFor="conversation" className="block text-sm font-medium">Kliento žinutė ar projekto aprašymas</label>
        <textarea
          id="conversation"
          value={text}
          onChange={(event) => setText(event.target.value)}
          maxLength={12_000}
          rows={9}
          placeholder="Įklijuokite kliento el. laišką, pokalbio ištrauką ar projekto aprašymą..."
          className="block w-full resize-y rounded-md border border-slate-300 bg-white px-4 py-3 text-sm leading-6 shadow-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
        />
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <span className="block text-xs text-slate-500">{text.length.toLocaleString()} / 12 000</span>
            <label className="flex max-w-2xl items-start gap-2 text-xs leading-5 text-slate-600">
              <LockKeyhole aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-slate-400" />
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
            <button type="button" onClick={() => void deleteAnalysis()} disabled={deleting} className="inline-flex min-h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium text-rose-600 transition hover:bg-rose-50 hover:text-rose-700 disabled:cursor-not-allowed disabled:opacity-50">
              <Trash2 aria-hidden="true" className="size-4" />
              {deleting ? "Trinama..." : "Ištrinti šią analizę"}
            </button>
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
            <h2 className="flex items-center gap-2 text-base font-semibold"><FileText aria-hidden="true" className="size-4 text-teal-700" />Santrauka</h2>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">{displayedAnalysis.summary}</p>
          </article>

          <section className={`rounded-md border p-5 shadow-sm ${displayedAnalysis.recommendation.decision === "decline" ? "border-rose-200 bg-rose-50" : displayedAnalysis.recommendation.decision === "negotiate" ? "border-amber-200 bg-amber-50" : "border-emerald-200 bg-emerald-50"}`}>
            <h2 className="text-base font-semibold">Rekomendacija: {displayedAnalysis.recommendation.decision === "take" ? "Imtis" : displayedAnalysis.recommendation.decision === "negotiate" ? "Derėtis prieš sutinkant" : "Atsisakyti"}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-800">{displayedAnalysis.recommendation.rationale}</p>
            <div className="mt-4 border-t border-current/10 pt-3">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-rose-950">
                <AlertTriangle aria-hidden="true" className="size-4 text-rose-700" />
                Svarbiausios rizikos
              </h3>
              {displayedAnalysis.risks.length === 0 ? (
                <p className="mt-2 text-sm text-slate-600">Aiškių rizikų tekste nenustatyta.</p>
              ) : (
                <ul className="mt-2 space-y-3">
                  {prioritizedRisks.slice(0, 3).map((risk, index) => (
                    <li key={`${risk.risk}-${index}`}>
                      <p className="text-sm font-medium text-slate-900">{risk.risk}</p>
                      <p className="mt-1 text-xs font-bold uppercase text-rose-800">
                        {risk.severity === "critical" ? "Kritinė" : risk.severity === "high" ? "Aukšta" : risk.severity === "medium" ? "Vidutinė" : "Žema"}
                      </p>
                      {risk.evidence && <p className="mt-1 text-xs text-slate-600">„{risk.evidence}“</p>}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="flex items-center gap-2 text-base font-semibold">
              <CheckCircle2 aria-hidden="true" className="size-4 text-emerald-600" />
              Veiksmai
              <span className="font-normal text-slate-500">
                ({Object.values(completedActions).filter(Boolean).length} iš {displayedAnalysis.action_items.length} atlikta)
              </span>
            </h2>
            {displayedAnalysis.action_items.length === 0 ? (
              <p className="mt-3 text-sm text-slate-500">Veiksmų nerasta.</p>
            ) : (
              <ul className="mt-3 divide-y divide-slate-100">
                {displayedAnalysis.action_items
                  .map((item, index) => ({ item, index }))
                  .sort((left, right) => left.item.order - right.item.order)
                  .map(({ item, index }) => {
                    const isCompleted = completedActions[index] ?? false;
                    return (
                      <li key={`${item.title}-${index}`} className="py-3 first:pt-0 last:pb-0">
                        <label className="flex cursor-pointer items-start gap-3">
                          <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={(event) => setCompletedActions((current) => ({ ...current, [index]: event.target.checked }))}
                            className="mt-0.5 size-4 shrink-0 accent-emerald-600"
                          />
                          <span className="min-w-0">
                            <span className={`block text-sm font-medium ${isCompleted ? "text-slate-500 line-through" : "text-slate-900"}`}>{item.order}. {item.title}</span>
                            {item.description && <span className="mt-1 block text-sm leading-5 text-slate-600">{item.description}</span>}
                            <span className="mt-1 block text-xs font-medium text-teal-800">{item.timing}</span>
                          </span>
                        </label>
                      </li>
                    );
                  })}
              </ul>
            )}
          </section>

          <section className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="flex items-center gap-2 text-base font-semibold"><FileText aria-hidden="true" className="size-4 text-teal-700" />Terminas</h2>
              <p className="mt-2 text-sm font-medium text-slate-900">{displayedAnalysis.deadline.value}</p>
              {displayedAnalysis.deadline.evidence && <p className="mt-1 text-xs text-slate-500">„{displayedAnalysis.deadline.evidence}“</p>}
            </article>
            <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="flex items-center gap-2 text-base font-semibold"><FileText aria-hidden="true" className="size-4 text-teal-700" />Biudžetas</h2>
              <p className="mt-2 text-sm font-medium text-slate-900">{displayedAnalysis.budget.value}</p>
              {displayedAnalysis.budget.evidence && <p className="mt-1 text-xs text-slate-500">„{displayedAnalysis.budget.evidence}“</p>}
            </article>
          </section>

          <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold">Reikalavimai</h2>
            {displayedAnalysis.requirements.length === 0 ? (
              <p className="mt-3 text-sm text-slate-500">Konkrečių reikalavimų tekste nerasta.</p>
            ) : (
              <ul className="mt-3 space-y-3">
                {displayedAnalysis.requirements.map((requirement, index) => (
                  <li key={`${requirement.requirement}-${index}`} className="border-t border-slate-100 pt-3 first:border-0 first:pt-0">
                    <p className="text-sm font-medium">{requirement.requirement}</p>
                    <p className={`mt-1 text-xs font-semibold ${requirement.clarity === "clear" ? "text-emerald-700" : "text-amber-700"}`}>
                      {requirement.clarity === "clear" ? "Aišku" : "Neaišku / patikslinti"}
                    </p>
                    {requirement.evidence && <p className="mt-1 text-xs text-slate-500">„{requirement.evidence}“</p>}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {prioritizedRisks.length > 3 && (
            <section className="rounded-md border border-rose-200 bg-rose-50/50 p-5 shadow-sm">
              <h2 className="flex items-center gap-2 text-base font-semibold text-rose-950">
                <AlertTriangle aria-hidden="true" className="size-4 text-rose-700" />Kitos rizikos
              </h2>
              <ul className="mt-3 space-y-3">
                {prioritizedRisks.slice(3).map((risk, index) => (
                  <li key={`${risk.risk}-${index}`} className="border-t border-rose-100 pt-3 first:border-0 first:pt-0">
                    <p className="text-sm font-medium text-slate-900">{risk.risk}</p>
                    <p className="mt-1 text-xs font-bold uppercase text-rose-800">
                      {risk.severity === "critical" ? "Kritinė" : risk.severity === "high" ? "Aukšta" : risk.severity === "medium" ? "Vidutinė" : "Žema"}
                    </p>
                    {risk.evidence && <p className="mt-1 text-xs text-slate-600">„{risk.evidence}“</p>}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="rounded-md border border-amber-200 bg-amber-50/50 p-5 shadow-sm">
            <h2 className="flex items-center gap-2 text-base font-semibold"><CircleHelp aria-hidden="true" className="size-4 text-amber-700" />Klausimai klientui</h2>
            {displayedAnalysis.client_questions.length === 0 ? (
              <p className="mt-3 text-sm text-slate-600">Papildomų klausimų nenustatyta.</p>
            ) : (
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-800">
                {displayedAnalysis.client_questions.map((question, index) => <li key={`${question}-${index}`}>{question}</li>)}
              </ol>
            )}
          </section>

          {displayedAnalysis.extracted_links.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="flex items-center gap-2 text-base font-semibold"><Link2 aria-hidden="true" className="size-4 text-teal-700" />Rastos nuorodos</h2>
                <span className="text-xs text-slate-500">{displayedAnalysis.extracted_links.length}</span>
              </div>
              {displayedAnalysis.extracted_links.map((link) => (
              <article key={link.url} className="flex flex-col gap-4 rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold">{link.title}</h3>
                  <p className="mt-1 truncate text-xs text-slate-500">{link.url}</p>
                  {link.description && <p className="mt-2 text-sm leading-5 text-slate-600">{link.description}</p>}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a href={link.url} target="_blank" rel="noreferrer" className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg bg-slate-100 px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-200">
                      Atidaryti <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => void saveLink(link)}
                      disabled={savedUrls[link.url] || savingUrl !== null}
                      className="inline-flex min-h-9 items-center justify-center rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50/50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {savedUrls[link.url] ? "Išsaugota" : savingUrl === link.url ? "Saugoma..." : "Išsaugoti į projektą"}
                    </button>
                  </div>
                </div>
              </article>
              ))}
            </section>
          )}

          <section className="space-y-3 rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <div>
              <h2 className="text-base font-semibold">Atsakymo užsakovui juodraštis</h2>
              <p className="mt-1 text-sm leading-5 text-slate-600">
                Parašykite atsakymo esmę {getAiLanguageNameInLithuanian(preferredLanguage)} kalba. AI paruoš juodraštį kliento kalba; jis nebus automatiškai išsiųstas.
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
            Įklijuokite kliento žinutę, patvirtinkite sutikimą ir paleiskite analizę. Čia matysite reikalavimus, rizikas, sąlygas, klausimus ir konkrečius veiksmus.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">Santrauka</span>
            <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">Veiksmai</span>
            <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">Nuorodos</span>
          </div>
        </div>
      )}
      </aside>
    </section>
  );
}