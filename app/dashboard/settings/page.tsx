import { Suspense } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { SettingsForm } from "@/components/settings-form";
import { requireWorkspace } from "@/lib/workspace";

async function SettingsContent() {
  const { supabase, user, organization } = await requireWorkspace();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("preferred_language")
    .eq("id", user.id)
    .maybeSingle();
  if (error) throw new Error("Nepavyko įkelti nustatymų.");

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <DashboardHeader organizationName={organization.name} userEmail={user.email ?? ""} />
      <div className="mx-auto max-w-2xl space-y-6 px-5 py-8 sm:px-8 lg:py-10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Nustatymai</h1>
          <p className="mt-1 text-sm text-slate-600">{user.email}</p>
        </div>
        <SettingsForm initialLanguage={profile?.preferred_language ?? "lt"} />
      </div>
    </main>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<main className="min-h-screen animate-pulse bg-slate-50" />}>
      <SettingsContent />
    </Suspense>
  );
}
