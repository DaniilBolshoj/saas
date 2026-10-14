import { NextResponse } from "next/server";
import { isAuthorizedCronRequest } from "@/lib/cron-auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createSupabaseAdminClient();
    const { data: deletedAnalyses, error } = await supabase.rpc("delete_expired_ai_analyses");
    if (error) {
      console.error("AI retention cleanup failed:", error.code);
      return NextResponse.json({ error: "Nepavyko išvalyti senų duomenų." }, { status: 500 });
    }
    return NextResponse.json({ deletedAnalyses });
  } catch (error) {
    console.error("Retention Supabase configuration error:", error);
    return NextResponse.json({ error: "Serverio konfigūracijos klaida." }, { status: 500 });
  }
}