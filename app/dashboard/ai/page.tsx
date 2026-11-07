import { redirect } from "next/navigation";
import { Suspense } from "react";
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
  if (membershipError) throw new Error("Nepavyko gauti darbo erdvės prieigos.");
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
  if (organizationError || !organization) throw new Error("Nepavyko įkelti darbo erdvės.");
  if (profileError) throw new Error("Nepavyko įkelti kalbos nustatymo.");

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8">
          <span className="font-semibold text-slate-900">{organization.name}</span>
          <span className="text-sm text-slate-600">{user.email ?? ""}</span>
        </div>
      </header>
      <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:py-10">
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h1 className="text-xl font-semibold text-slate-900">AI analizė</h1>
          <p className="mt-2 text-sm text-slate-600">AI analizės naršyklė šiuo metu nepasiekiama.</p>
        </section>
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
