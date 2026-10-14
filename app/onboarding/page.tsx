import { redirect } from "next/navigation";
import { Suspense } from "react";
import { CreateOrganizationForm } from "@/components/create-organization-form";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default function OnboardingPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#f7f8f5]" />}>
      <OnboardingContent />
    </Suspense>
  );
}

async function OnboardingContent() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: memberships } = await supabase
    .from("organization_members")
    .select("organization_id")
    .eq("user_id", user.id)
    .limit(1);
  if (memberships?.length) redirect("/dashboard");

  return (
    <main className="grid min-h-screen place-items-center px-5 py-12">
      <section className="w-full max-w-lg space-y-7 rounded-lg border border-[#d9e2dc] bg-white p-8 shadow-sm">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">Pirmas žingsnis</p>
          <h1 className="text-2xl font-semibold">Sukurkite komandos erdvę</h1>
          <p className="text-sm leading-6 text-slate-600">Čia saugosite bendras nuorodas ir galėsite analizuoti komandos pokalbius.</p>
        </div>
        <CreateOrganizationForm />
      </section>
    </main>
  );
}