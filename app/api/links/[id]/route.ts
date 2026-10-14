import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const updateSchema = z.object({
  organizationId: z.string().uuid(),
  title: z.string().trim().min(1).max(160),
  url: z.string().trim().url().max(2048).refine((value) => {
    const parsed = new URL(value);
    return (parsed.protocol === "https:" || parsed.protocol === "http:")
      && !parsed.username && !parsed.password;
  }),
  description: z.string().trim().max(2000),
  categoryId: z.string().uuid().nullable(),
  isImportant: z.boolean(),
}).strict();

type Context = { params: Promise<{ id: string }> };

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
  if (!parsed.success) return NextResponse.json({ error: "Netaisyklingi duomenys." }, { status: 400 });

  const input = parsed.data;
  const { data: isMember, error: membershipError } = await supabase.rpc("is_org_member", {
    p_org_id: input.organizationId,
  });
  if (membershipError) return NextResponse.json({ error: "Nepavyko patikrinti prieigos." }, { status: 500 });
  if (!isMember) return NextResponse.json({ error: "Neturite prieigos." }, { status: 403 });

  const { data: link, error } = await supabase.from("links").update({
    title: input.title,
    url: input.url,
    description: input.description,
    category_id: input.categoryId,
    is_important: input.isImportant,
    updated_at: new Date().toISOString(),
  }).eq("id", id).eq("organization_id", input.organizationId)
    .select("id, title, url, description, category_id, is_important, created_at, last_checked_at, last_status_code")
    .maybeSingle();

  if (error) {
    console.error("Link update failed:", error.code);
    return NextResponse.json({ error: "Nepavyko atnaujinti nuorodos." }, { status: 400 });
  }
  if (!link) return NextResponse.json({ error: "Nuoroda nerasta arba neturite teisės ją keisti." }, { status: 404 });
  return NextResponse.json({ link });
}

export async function DELETE(request: NextRequest, context: Context) {
  const supabase = await createSupabaseServerClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: "Reikia prisijungti." }, { status: 401 });

  const { id } = await context.params;
  const organizationId = z.string().uuid().safeParse(request.nextUrl.searchParams.get("organizationId"));
  if (!z.string().uuid().safeParse(id).success || !organizationId.success) {
    return NextResponse.json({ error: "Netaisyklingi ID." }, { status: 400 });
  }

  const { data: isMember, error: membershipError } = await supabase.rpc("is_org_member", {
    p_org_id: organizationId.data,
  });
  if (membershipError) return NextResponse.json({ error: "Nepavyko patikrinti prieigos." }, { status: 500 });
  if (!isMember) return NextResponse.json({ error: "Neturite prieigos." }, { status: 403 });

  const { data: deleted, error } = await supabase.from("links").delete()
    .eq("id", id).eq("organization_id", organizationId.data)
    .select("id").maybeSingle();
  if (error) return NextResponse.json({ error: "Nepavyko ištrinti nuorodos." }, { status: 403 });
  if (!deleted) return NextResponse.json({ error: "Nuoroda nerasta arba neturite teisės ją trinti." }, { status: 404 });
  return NextResponse.json({ deleted: true });
}