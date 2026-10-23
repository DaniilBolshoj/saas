import { NextResponse } from "next/server";
import { z } from "zod";
import { aiLanguageCodes } from "@/lib/ai-languages";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const requestSchema = z.object({
  preferredLanguage: z.enum(aiLanguageCodes),
}).strict();

export async function PATCH(request: Request) {
  let supabase;
  try {
    supabase = await createSupabaseServerClient();
  } catch (error) {
    console.error("Supabase configuration error:", error);
    return NextResponse.json({ error: "Serverio konfigūracijos klaida." }, { status: 500 });
  }

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
    return NextResponse.json({ error: "Nepalaikoma pageidaujama kalba." }, { status: 400 });
  }

  const { error } = await supabase
    .from("profiles")
    .update({ preferred_language: parsed.data.preferredLanguage })
    .eq("id", user.id)
    .select("id")
    .single();
  if (error) {
    console.error("Saving preferred language failed:", error.code);
    return NextResponse.json({ error: "Nepavyko išsaugoti kalbos nustatymo." }, { status: 500 });
  }

  return NextResponse.json({ preferredLanguage: parsed.data.preferredLanguage });
}
