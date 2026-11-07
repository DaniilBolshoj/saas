import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/** Resolves the signed-in user and their first organization, or redirects. */
export async function requireWorkspace() {
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

  const { data: organization, error: organizationError } = await supabase
    .from("organizations")
    .select("id, name")
    .eq("id", memberships[0].organization_id)
    .single();
  if (organizationError || !organization) throw new Error("Nepavyko įkelti darbo erdvės.");

  return { supabase, user, organization };
}
