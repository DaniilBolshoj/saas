import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const requestSchema = z.object({
  organizationId: z.string().uuid(),
  title: z.string().trim().min(1).max(160),
  url: z.string().trim().url().max(2048).refine((value) => {
    const parsed = new URL(value);
    return (parsed.protocol === "https:" || parsed.protocol === "http:")
      && !parsed.username && !parsed.password;
  }, "URL turi būti HTTP arba HTTPS adresas be prisijungimo duomenų."),
  description: z.string().trim().max(2000).default(""),
  categoryId: z.string().uuid().nullable().default(null),
  isImportant: z.boolean().default(false),
  aiAnalysisId: z.string().uuid().nullable().default(null),
}).strict();

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Reikia prisijungti." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Netaisyklingas JSON." }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Netaisyklingi duomenys.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const input = parsed.data;
  const { data: isMember, error: membershipError } = await supabase.rpc(
    "is_org_member",
    { p_org_id: input.organizationId },
  );
  if (membershipError) {
    return NextResponse.json({ error: "Nepavyko patikrinti prieigos." }, { status: 500 });
  }
  if (!isMember) {
    return NextResponse.json({ error: "Neturite prieigos prie šios organizacijos." }, { status: 403 });
  }

  const { data: link, error: insertError } = await supabase
    .from("links")
    .insert({
      organization_id: input.organizationId,
      created_by: user.id,
      title: input.title,
      url: input.url,
      description: input.description,
      category_id: input.categoryId,
      is_important: input.isImportant,
      ai_analysis_id: input.aiAnalysisId,
    })
    .select("id, title, url, description, category_id, is_important, ai_analysis_id, created_at")
    .single();

  if (insertError) {
    console.error("Link creation failed:", insertError.code);
    return NextResponse.json({ error: "Nepavyko išsaugoti nuorodos." }, { status: 400 });
  }

  return NextResponse.json({ link }, { status: 201 });
}