import Link from "next/link";
import { Suspense } from "react";
import { ArrowUpRight, ClipboardList, Sparkles } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard-header";
import { decisionLabels, orderStatusLabels, orderStatuses, type OrderStatus } from "@/lib/order-schemas";
import { requireWorkspace } from "@/lib/workspace";

type ProjectRow = {
  id: string;
  name: string;
  status: string;
  decision: keyof typeof decisionLabels | null;
  client_id: string | null;
  created_at: string;
};

async function OrdersContent() {
  const { supabase, user, organization } = await requireWorkspace();

  const projectRows: ProjectRow[] = [];
  const projectBatchSize = 500;
  for (let from = 0; ; from += projectBatchSize) {
    const { data, error } = await supabase
      .from("projects")
      .select("id, name, status, decision, client_id, created_at")
      .eq("organization_id", organization.id)
      .order("created_at", { ascending: false })
      .range(from, from + projectBatchSize - 1);
    if (error) throw new Error("Nepavyko įkelti užsakymų.");
    const batch = (data ?? []) as ProjectRow[];
    projectRows.push(...batch);
    if (batch.length < projectBatchSize) break;
  }

  const { data: counts, error: countsError } = await supabase.rpc(
    "order_task_counts",
    { p_organization_id: organization.id },
  );
  if (countsError) throw new Error("Nepavyko įkelti užduočių skaičiaus.");

  const rows = projectRows;
  const clientIds = [...new Set(rows.map((row) => row.client_id).filter((id): id is string => Boolean(id)))];
  const clientRows: { id: string; name: string }[] = [];
  const clientBatchSize = 500;
  for (let from = 0; from < clientIds.length; from += clientBatchSize) {
    const { data, error } = await supabase
      .from("clients")
      .select("id, name")
      .in("id", clientIds.slice(from, from + clientBatchSize));
    if (error) throw new Error("Nepavyko įkelti klientų.");
    clientRows.push(...(data ?? []));
  }

  const clientNames = new Map(clientRows.map((client) => [client.id, client.name]));
  const taskCounts = new Map(
    ((counts ?? []) as { project_id: string; total: number; done: number }[]).map((row) => [row.project_id, row]),
  );
  const active = rows.filter((row) => row.status === "active");
  const finished = rows.filter((row) => row.status !== "active");

  function renderRow(row: ProjectRow) {
    const count = taskCounts.get(row.id);
    const total = Number(count?.total ?? 0);
    const done = Number(count?.done ?? 0);
    const status = (orderStatuses as readonly string[]).includes(row.status) ? orderStatusLabels[row.status as OrderStatus] : row.status;
    return (
      <li key={row.id}>
        <Link href={`/dashboard/orders/${row.id}`} className="flex flex-col gap-2 px-4 py-4 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">{row.name}</p>
            <p className="mt-1 text-xs text-slate-500">
              {row.client_id ? `${clientNames.get(row.client_id) ?? "Klientas"} · ` : ""}
              {new Date(row.created_at).toLocaleDateString("lt-LT")}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2 text-xs">
            {row.decision && (
              <span className={`rounded-full px-2.5 py-1 font-semibold ${row.decision === "take" ? "bg-emerald-50 text-emerald-800" : row.decision === "negotiate" ? "bg-amber-50 text-amber-800" : "bg-rose-50 text-rose-800"}`}>
                {decisionLabels[row.decision]}
              </span>
            )}
            <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
              {total === 0 ? "Be užduočių" : `${done} iš ${total} užduočių`}
            </span>
            {row.status !== "active" && <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-500">{status}</span>}
            <ArrowUpRight aria-hidden="true" className="size-4 text-slate-400" />
          </div>
        </Link>
      </li>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <DashboardHeader organizationName={organization.name} userEmail={user.email ?? ""} />
      <div className="mx-auto max-w-4xl space-y-6 px-5 py-8 sm:px-8 lg:py-10">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Mano užsakymai</h1>
            <p className="mt-1 text-sm text-slate-600">Išsaugotos analizės su užduotimis, rizikomis ir klausimais.</p>
          </div>
          <Link href="/dashboard/ai" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-teal-800 px-4 text-sm font-medium text-white hover:bg-teal-900">
            <Sparkles aria-hidden="true" className="size-4" />Nauja analizė
          </Link>
        </div>

        {rows.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white px-6 py-14 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-xl bg-emerald-50 text-emerald-700"><ClipboardList aria-hidden="true" className="size-6" /></span>
            <h2 className="mt-4 text-base font-semibold">Dar nėra išsaugotų užsakymų</h2>
            <p className="mx-auto mt-1 max-w-sm text-sm text-slate-600">Išanalizuokite kliento žinutę ir apačioje spauskite „Išsaugoti užsakymą“. Čia atsiras jūsų užduotys ir visa analizė.</p>
            <Link href="/dashboard/ai" className="mt-5 inline-flex min-h-10 items-center rounded-md bg-teal-800 px-4 text-sm font-medium text-white hover:bg-teal-900">Analizuoti pirmą užsakymą</Link>
          </div>
        ) : (
          <>
            <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
              <h2 className="border-b border-slate-200 px-4 py-3 text-sm font-semibold">Aktyvūs ({active.length})</h2>
              {active.length === 0 ? <p className="px-4 py-6 text-sm text-slate-500">Aktyvių užsakymų nėra.</p> : <ul className="divide-y divide-slate-100">{active.map(renderRow)}</ul>}
            </section>
            {finished.length > 0 && (
              <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                <h2 className="border-b border-slate-200 px-4 py-3 text-sm font-semibold">Baigti ir archyvuoti ({finished.length})</h2>
                <ul className="divide-y divide-slate-100">{finished.map(renderRow)}</ul>
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={<main className="min-h-screen animate-pulse bg-slate-50" />}>
      <OrdersContent />
    </Suspense>
  );
}
