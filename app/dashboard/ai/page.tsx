import { redirect } from "next/navigation";
import { Suspense } from "react";
import { AiAnalysisExplorer } from "@/components/ai-analysis-explorer";
import { DashboardHeader } from "@/components/dashboard-header";
import { createSupabaseServerClient } from "@/lib/supabase/server";

async function AiExplorerContent() {
  const supabase = await createSupabaseServerClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) redirect("/login");

  const { data: memberships, error: membershipError } = await supabase
    .from("organization_members")
    .select("organization_id")
    .eq("user_id", user.id)
    .order("joined_at", { ascending: true })
    .limit(1);
  if (membershipError) throw new Error("Nepavyko gauti komandos narystės.");
  if (!memberships?.length) redirect("/onboarding");

  const [{ data: organization, error: organizationError }, { data: profile, error: profileError }] = await Promise.all([
    supabase
    .from("organizations")
    .select("id, name")
    .eq("id", memberships[0].organization_id)
    .single(),
    supabase
      .from("profiles")
      .select("preferred_language")
      .eq("id", user.id)
      .maybeSingle(),
  ]);
  if (organizationError || !organization) throw new Error("Nepavyko įkelti komandos.");
  if (profileError) throw new Error("Nepavyko įkelti kalbos nustatymo.");

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <DashboardHeader organizationName={organization.name} userEmail={user.email ?? ""} />
      <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:py-10">
        <AiAnalysisExplorer organizationId={organization.id} preferredLanguage={profile?.preferred_language ?? "lt"} />
      </div>
    </main>
  );
}

export default function AiExplorerPage() {
  return (
    <Suspense fallback={<main className="min-h-screen animate-pulse bg-slate-50" />}>
      <AiExplorerContent />
    </Suspense>
  );
}
