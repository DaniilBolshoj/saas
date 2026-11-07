import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard-header";
import { OrderDetail } from "@/components/order-detail";
import { getAiLanguageName } from "@/lib/ai-languages";
import { analysisSnapshotSchema, orderStatuses, type OrderStatus } from "@/lib/order-schemas";
import { requireWorkspace } from "@/lib/workspace";
import { z } from "zod";

type Props = { params: Promise<{ id: string }> };

async function OrderContent({ params }: Props) {
  const { id } = await params;
  if (!z.string().uuid().safeParse(id).success) notFound();
  const { supabase, user, organization } = await requireWorkspace();

  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("id, name, status, client_id, created_at, analysis_snapshot, snapshot_language")
    .eq("id", id)
    .eq("organization_id", organization.id)
    .maybeSingle();
  if (projectError) throw new Error("Nepavyko įkelti užsakymo.");
  if (!project) notFound();

  const [{ data: tasks, error: tasksError }, { data: analysis, error: analysisError }, clientResult] = await Promise.all([
    supabase
      .from("tasks")
      .select("id, title, description, timing, status")
      .eq("project_id", id)
      .order("position")
      .order("created_at"),
    supabase.from("ai_analyses").select("original_text").eq("project_id", id).maybeSingle(),
    project.client_id
      ? supabase.from("clients").select("name").eq("id", project.client_id).maybeSingle()
      : Promise.resolve({ data: null, error: null }),
  ]);
  if (tasksError || analysisError || clientResult.error) throw new Error("Nepavyko įkelti užsakymo duomenų.");

  const snapshot = analysisSnapshotSchema.safeParse(project.analysis_snapshot);
  const status = (orderStatuses as readonly string[]).includes(project.status) ? project.status as OrderStatus : "active";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <DashboardHeader organizationName={organization.name} userEmail={user.email ?? ""} />
      <div className="mx-auto max-w-4xl space-y-5 px-5 py-8 sm:px-8 lg:py-10">
        <Link href="/dashboard/orders" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900">
          <ArrowLeft aria-hidden="true" className="size-4" />Visi užsakymai
        </Link>
        <OrderDetail
          project={{
            id: project.id,
            name: project.name,
            status,
            createdAt: project.created_at,
            clientName: clientResult.data?.name ?? null,
            languageName: project.snapshot_language ? getAiLanguageName(project.snapshot_language) ?? null : null,
          }}
          initialTasks={(tasks ?? []).map((task) => ({
            id: task.id,
            title: task.title,
            description: task.description,
            timing: task.timing,
            completed: task.status === "completed",
          }))}
          snapshot={snapshot.success ? snapshot.data : null}
          originalText={analysis?.original_text ?? null}
        />
      </div>
    </main>
  );
}

export default function OrderPage({ params }: Props) {
  return (
    <Suspense fallback={<main className="min-h-screen animate-pulse bg-slate-50" />}>
      <OrderContent params={params} />
    </Suspense>
  );
}
