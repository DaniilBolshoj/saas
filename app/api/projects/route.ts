import { NextResponse } from "next/server";
import { buildOrderTasks, saveOrderSchema } from "@/lib/order-schemas";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: "Reikia prisijungti." }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Netaisyklingas JSON." }, { status: 400 });
  }
  const parsed = saveOrderSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Netaisyklingi duomenys." }, { status: 400 });
  const input = parsed.data;

  const { data: projectId, error } = await supabase.rpc("save_order", {
    p_organization_id: input.organizationId,
    p_analysis_id: input.analysisId,
    p_name: input.name,
    p_client_name: input.clientName,
    p_snapshot: input.analysis,
    p_language: input.language,
    p_decision: input.analysis.recommendation.decision,
    p_tasks: buildOrderTasks(input.analysis.action_items, input.completedActions),
  });

  if (error) {
    console.error("Saving order failed:", error.code);
    if (error.code === "42501") return NextResponse.json({ error: "Neturite prieigos." }, { status: 403 });
    if (error.code === "P0002") {
      return NextResponse.json({ error: "Analizė nerasta arba jau išsaugota kaip užsakymas." }, { status: 409 });
    }
    return NextResponse.json({ error: "Nepavyko išsaugoti užsakymo." }, { status: 500 });
  }
  if (typeof projectId !== "string") return NextResponse.json({ error: "Nepavyko išsaugoti užsakymo." }, { status: 500 });

  return NextResponse.json({ projectId }, { status: 201 });
}
