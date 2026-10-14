import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const schema = z.object({
  organizationId: z.string().uuid(),
  name: z.string().trim().min(1).max(60),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/).default("#64748b"),
}).strict();

export async function GET(request: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: "Reikia prisijungti." }, { status: 401 });
  const organizationId = z.string().uuid().safeParse(new URL(request.url).searchParams.get("organizationId"));
  if (!organizationId.success) return NextResponse.json({ error: "Netaisyklingas organizacijos ID." }, { status: 400 });
  const { data: isMember } = await supabase.rpc("is_org_member", { p_org_id: organizationId.data });
  if (!isMember) return NextResponse.json({ error: "Neturite prieigos." }, { status: 403 });

  const { data: categories, error } = await supabase.from("categories")
    .select("id, name, color").eq("organization_id", organizationId.data).order("name");
  if (error) return NextResponse.json({ error: "Nepavyko gauti kategorijų." }, { status: 500 });
  return NextResponse.json({ categories });
}

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
  if (!parsed.success) return NextResponse.json({ error: "Netaisyklingi kategorijos duomenys." }, { status: 400 });
  const { data: isAdmin, error: roleError } = await supabase.rpc("can_manage_org", {
    p_org_id: parsed.data.organizationId,
  });
  if (roleError) return NextResponse.json({ error: "Nepavyko patikrinti prieigos." }, { status: 500 });
  if (!isAdmin) return NextResponse.json({ error: "Kategorijas gali kurti komandos administratoriai." }, { status: 403 });

  const { data: category, error } = await supabase.from("categories").insert({
    organization_id: parsed.data.organizationId,
    name: parsed.data.name,
    color: parsed.data.color,
  }).select("id, name, color").single();
  if (error) {
    console.error("Category creation failed:", error.code);
    return NextResponse.json({ error: "Nepavyko sukurti kategorijos. Patikrinkite, ar toks pavadinimas jau nenaudojamas." }, { status: 400 });
  }
  return NextResponse.json({ category }, { status: 201 });
}