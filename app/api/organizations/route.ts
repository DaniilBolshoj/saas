import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const schema = z.object({ name: z.string().trim().min(1).max(100) }).strict();

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
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Netaisyklingas pavadinimas." }, { status: 400 });

  const { data: organizationId, error } = await supabase.rpc("create_organization", {
    p_name: parsed.data.name,
  });
  if (error) {
    console.error("Organization creation failed:", error.code);
    return NextResponse.json({ error: "Nepavyko sukurti komandos." }, { status: 500 });
  }
  return NextResponse.json({ organizationId }, { status: 201 });
}