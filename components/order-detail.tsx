"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, CheckCircle2, CircleHelp, FileText, Trash2 } from "lucide-react";
import {
  decisionLabels,
  orderStatusLabels,
  orderStatuses,
  type AnalysisSnapshot,
  type OrderStatus,
} from "@/lib/order-schemas";

type Task = { id: string; title: string; description: string; timing: string; completed: boolean };

type Props = {
  project: {
    id: string;
    name: string;
    status: OrderStatus;
    createdAt: string;
    clientName: string | null;
    languageName: string | null;
  };
  initialTasks: Task[];
  snapshot: AnalysisSnapshot | null;
  originalText: string | null;
};

const severityLabels = { critical: "Kritinė", high: "Aukšta", medium: "Vidutinė", low: "Žema" } as const;
const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 } as const;

export function OrderDetail({ project, initialTasks, snapshot, originalText }: Props) {
  const router = useRouter();
  const [tasks, setTasks] = useState(initialTasks);
  const [status, setStatus] = useState(project.status);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const doneCount = tasks.filter((task) => task.completed).length;
  const risks = snapshot ? [...snapshot.risks].sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]) : [];

  async function toggleTask(task: Task) {
    const next = !task.completed;
    setError(null);
    setTasks((current) => current.map((item) => (item.id === task.id ? { ...item, completed: next } : item)));
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status: next ? "completed" : "new" }),
      });
      const payload = await response.json() as { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Nepavyko atnaujinti užduoties.");
    } catch (caught) {
      setTasks((current) => current.map((item) => (item.id === task.id ? { ...item, completed: task.completed } : item)));
      setError(caught instanceof Error ? caught.message : "Nepavyko atnaujinti užduoties.");
    }
  }

  async function changeStatus(next: OrderStatus) {
    const previous = status;
    setStatus(next);
    setError(null);
    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      const payload = await response.json() as { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Nepavyko atnaujinti užsakymo.");
      router.refresh();
    } catch (caught) {
      setStatus(previous);
      setError(caught instanceof Error ? caught.message : "Nepavyko atnaujinti užsakymo.");
    }
  }

  async function deleteOrder() {
    if (!window.confirm("Ištrinti užsakymą kartu su analize ir kliento tekstu? Šio veiksmo atšaukti negalima.")) return;
    setBusy(true);
    setError(null);
    try {
      const response = await fetch(`/api/projects/${project.id}`, { method: "DELETE" });
      const payload = await response.json() as { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Nepavyko ištrinti užsakymo.");
      router.replace("/dashboard/orders");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Nepavyko ištrinti užsakymo.");
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight">{project.name}</h1>
          <p className="mt-1 text-sm text-slate-600">
            {project.clientName ? `${project.clientName} · ` : ""}
            {new Date(project.createdAt).toLocaleDateString("lt-LT")}
            {project.languageName ? ` · ${project.languageName}` : ""}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <label className="sr-only" htmlFor="order-status">Užsakymo būsena</label>
          <select
            id="order-status"
            value={status}
            onChange={(event) => void changeStatus(event.target.value as OrderStatus)}
            className="min-h-9 rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-teal-700"
          >
            {orderStatuses.map((value) => <option key={value} value={value}>{orderStatusLabels[value]}</option>)}
          </select>
          <button type="button" onClick={() => void deleteOrder()} disabled={busy} title="Ištrinti užsakymą" className="grid size-9 place-items-center rounded-md text-slate-500 hover:bg-rose-50 hover:text-rose-700 disabled:opacity-50">
            <Trash2 aria-hidden="true" className="size-4" />
          </button>
        </div>
      </header>

      {error && <p role="alert" className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</p>}

      <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="flex items-center gap-2 text-base font-semibold">
          <CheckCircle2 aria-hidden="true" className="size-4 text-emerald-600" />
          Užduotys
          <span className="font-normal text-slate-500">({doneCount} iš {tasks.length} atlikta)</span>
        </h2>
        {tasks.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">Užduočių nėra.</p>
        ) : (
          <ul className="mt-3 divide-y divide-slate-100">
            {tasks.map((task, index) => (
              <li key={task.id} className="py-3 first:pt-0 last:pb-0">
                <label className="flex cursor-pointer items-start gap-3">
                  <input type="checkbox" checked={task.completed} onChange={() => void toggleTask(task)} className="mt-0.5 size-4 shrink-0 accent-emerald-600" />
                  <span className="min-w-0">
                    <span className={`block text-sm font-medium ${task.completed ? "text-slate-500 line-through" : "text-slate-900"}`}>{index + 1}. {task.title}</span>
                    {task.description && <span className="mt-1 block text-sm leading-5 text-slate-600">{task.description}</span>}
                    {task.timing && <span className="mt-1 block text-xs font-medium text-teal-800">{task.timing}</span>}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </section>

      {!snapshot ? (
        <p className="rounded-md border border-slate-200 bg-white p-5 text-sm text-slate-600">Šio užsakymo analizės peržiūrėti nepavyko.</p>
      ) : (
        <>
          <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="flex items-center gap-2 text-base font-semibold"><FileText aria-hidden="true" className="size-4 text-teal-700" />Santrauka</h2>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">{snapshot.summary}</p>
          </article>

          <section className={`rounded-md border p-5 shadow-sm ${snapshot.recommendation.decision === "decline" ? "border-rose-200 bg-rose-50" : snapshot.recommendation.decision === "negotiate" ? "border-amber-200 bg-amber-50" : "border-emerald-200 bg-emerald-50"}`}>
            <h2 className="text-base font-semibold">Rekomendacija: {decisionLabels[snapshot.recommendation.decision]}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-800">{snapshot.recommendation.rationale}</p>
          </section>

          <section className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-base font-semibold">Terminas</h2>
              <p className="mt-2 text-sm font-medium">{snapshot.deadline.value}</p>
              {snapshot.deadline.evidence && <p className="mt-1 text-xs text-slate-500">„{snapshot.deadline.evidence}“</p>}
            </article>
            <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-base font-semibold">Biudžetas</h2>
              <p className="mt-2 text-sm font-medium">{snapshot.budget.value}</p>
              {snapshot.budget.evidence && <p className="mt-1 text-xs text-slate-500">„{snapshot.budget.evidence}“</p>}
            </article>
          </section>

          <section className="rounded-md border border-rose-200 bg-rose-50/50 p-5 shadow-sm">
            <h2 className="flex items-center gap-2 text-base font-semibold text-rose-950"><AlertTriangle aria-hidden="true" className="size-4 text-rose-700" />Rizikos</h2>
            {risks.length === 0 ? <p className="mt-3 text-sm text-slate-600">Aiškių rizikų nenustatyta.</p> : (
              <ul className="mt-3 space-y-3">
                {risks.map((risk, index) => (
                  <li key={`${risk.risk}-${index}`} className="border-t border-rose-100 pt-3 first:border-0 first:pt-0">
                    <p className="text-sm font-medium">{risk.risk}</p>
                    <p className="mt-1 text-xs font-bold uppercase text-rose-800">{severityLabels[risk.severity]}</p>
                    {risk.evidence && <p className="mt-1 text-xs text-slate-600">„{risk.evidence}“</p>}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold">Reikalavimai</h2>
            {snapshot.requirements.length === 0 ? <p className="mt-3 text-sm text-slate-500">Reikalavimų nerasta.</p> : (
              <ul className="mt-3 space-y-3">
                {snapshot.requirements.map((requirement, index) => (
                  <li key={`${requirement.requirement}-${index}`} className="border-t border-slate-100 pt-3 first:border-0 first:pt-0">
                    <p className="text-sm font-medium">{requirement.requirement}</p>
                    <p className={`mt-1 text-xs font-semibold ${requirement.clarity === "clear" ? "text-emerald-700" : "text-amber-700"}`}>{requirement.clarity === "clear" ? "Aišku" : "Neaišku / patikslinti"}</p>
                    {requirement.evidence && <p className="mt-1 text-xs text-slate-500">„{requirement.evidence}“</p>}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-md border border-amber-200 bg-amber-50/50 p-5 shadow-sm">
            <h2 className="flex items-center gap-2 text-base font-semibold"><CircleHelp aria-hidden="true" className="size-4 text-amber-700" />Klausimai klientui</h2>
            {snapshot.client_questions.length === 0 ? <p className="mt-3 text-sm text-slate-600">Papildomų klausimų nėra.</p> : (
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-800">
                {snapshot.client_questions.map((question, index) => <li key={`${question}-${index}`}>{question}</li>)}
              </ol>
            )}
          </section>
        </>
      )}

      {originalText && (
        <details className="rounded-md border border-slate-200 bg-white px-4 py-3">
          <summary className="cursor-pointer text-sm font-medium">Originalus užsakovo tekstas</summary>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">{originalText}</p>
        </details>
      )}
    </div>
  );
}
