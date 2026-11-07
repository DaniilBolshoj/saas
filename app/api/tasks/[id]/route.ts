import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Context = { params: Promise<{ id: string }> };

const updateSchema = z.object({ status: z.enum(["new", "completed"]) }).strict();

export async function PATCH(request: NextRequest, context: Context) {
  const supabase = await createSupabaseServerClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: "Reikia prisijungti." }, { status: 401 });

  const { id } = await context.params;
  if (!z.string().uuid().safeParse(id).success) return NextResponse.json({ error: "Netaisyklingas ID." }, { status: 400 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Netaisyklingas JSON." }, { status: 400 });
  }
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Netaisyklinga būsena." }, { status: 400 });

  const { data, error } = await supabase
    .from("tasks")
    .update({ status: parsed.data.status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("id, status")
    .maybeSingle();
  if (error) {
    console.error("Task update failed:", error.code);
    return NextResponse.json({ error: "Nepavyko atnaujinti užduoties." }, { status: 500 });
  }
  if (!data) return NextResponse.json({ error: "Užduotis nerasta." }, { status: 404 });
  return NextResponse.json({ task: data });
}
