import { redirect } from "next/navigation";
import { Suspense } from "react";
import { DashboardWorkspace } from "@/components/dashboard-workspace";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type LinkRow = {
  id: string;
  title: string;
  url: string;
  description: string;
  category_id: string | null;
  is_important: boolean;
  created_at: string;
  last_checked_at: string | null;
  last_status_code: number | null;
};

async function DashboardContent() {
  const supabase = await createSupabaseServerClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) redirect("/login");

  const { data: memberships, error: membershipError } = await supabase
    .from("organization_members")
    .select("organization_id, role, joined_at")
    .eq("user_id", user.id)
    .order("joined_at", { ascending: true })
    .limit(1);
  if (membershipError) throw new Error("Nepavyko gauti komandos narystės.");
  if (!memberships?.length) redirect("/onboarding");

  const membership = memberships[0];
  const [{ data: organization, error: organizationError }, { data: categories, error: categoriesError }, { data: links, error: linksError }] = await Promise.all([
    supabase.from("organizations").select("id, name").eq("id", membership.organization_id).single(),
    supabase.from("categories").select("id, name, color").eq("organization_id", membership.organization_id).order("name"),
    supabase.from("links")
      .select("id, title, url, description, category_id, is_important, created_at, last_checked_at, last_status_code")
      .eq("organization_id", membership.organization_id)
      .order("is_important", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(100),
  ]);
  if (organizationError || categoriesError || linksError || !organization) {
    throw new Error("Nepavyko įkelti komandos darbo srities.");
  }

  const categoryNames = new Map((categories ?? []).map((category) => [category.id, category.name]));
  const initialLinks = ((links ?? []) as LinkRow[]).map((link) => ({
    ...link,
    category_name: link.category_id ? categoryNames.get(link.category_id) ?? null : null,
    score: 0,
  }));

  return (
    <DashboardWorkspace
      organizationId={organization.id}
      organizationName={organization.name}
      role={membership.role}
      initialCategories={categories ?? []}
      initialLinks={initialLinks}
      userEmail={user.email ?? ""}
    />
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<main className="min-h-screen animate-pulse bg-[#f7f8f5]" />}>
      <DashboardContent />
    </Suspense>
  );
}