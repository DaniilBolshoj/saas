import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { orderStatuses } from "@/lib/order-schemas";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Context = { params: Promise<{ id: string }> };

const updateSchema = z.object({ status: z.enum(orderStatuses) }).strict();

async function authorize(context: Context) {
  const supabase = await createSupabaseServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return { response: NextResponse.json({ error: "Reikia prisijungti." }, { status: 401 }) } as const;
  const { id } = await context.params;
  if (!z.string().uuid().safeParse(id).success) {
    return { response: NextResponse.json({ error: "Netaisyklingas ID." }, { status: 400 }) } as const;
  }
  return { supabase, id } as const;
}

export async function PATCH(request: NextRequest, context: Context) {
  const auth = await authorize(context);
  if ("response" in auth) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Netaisyklingas JSON." }, { status: 400 });
  }
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Netaisyklinga būsena." }, { status: 400 });

  const { data, error } = await auth.supabase
    .from("projects")
    .update({ status: parsed.data.status, updated_at: new Date().toISOString() })
    .eq("id", auth.id)
    .select("id, status")
    .maybeSingle();
  if (error) {
    console.error("Order update failed:", error.code);
    return NextResponse.json({ error: "Nepavyko atnaujinti užsakymo." }, { status: 500 });
  }
  if (!data) return NextResponse.json({ error: "Užsakymas nerastas arba negalite jo keisti." }, { status: 404 });
  return NextResponse.json({ project: data });
}

export async function DELETE(_request: NextRequest, context: Context) {
  const auth = await authorize(context);
  if ("response" in auth) return auth.response;

  // The linked analysis holds the client's original text; remove it together with the order.
  const { error: analysisError } = await auth.supabase.from("ai_analyses").delete().eq("project_id", auth.id);
  if (analysisError) {
    console.error("Order analysis deletion failed:", analysisError.code);
    return NextResponse.json({ error: "Nepavyko ištrinti užsakymo." }, { status: 500 });
  }
  const { data, error } = await auth.supabase.from("projects").delete().eq("id", auth.id).select("id").maybeSingle();
  if (error) {
    console.error("Order deletion failed:", error.code);
    return NextResponse.json({ error: "Nepavyko ištrinti užsakymo." }, { status: 500 });
  }
  if (!data) return NextResponse.json({ error: "Užsakymas nerastas arba negalite jo ištrinti." }, { status: 404 });
  return NextResponse.json({ deleted: true });
}
