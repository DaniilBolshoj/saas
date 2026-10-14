import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default function HomePage() {
  return (
    <Suspense fallback={<LandingPage />}>
      <HomeEntry />
    </Suspense>
  );
}

async function HomeEntry() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect("/dashboard");
  return <LandingPage />;
}

function LandingPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] text-[#172521]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <span className="text-lg font-semibold">LinkOps</span>
        <Link href="/login" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-white">Prisijungti</Link>
      </nav>
      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:pb-28 md:pt-20">
        <div className="max-w-2xl space-y-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-800">Komandos darbo atmintis</p>
          <h1 className="max-w-xl text-4xl font-semibold leading-tight sm:text-5xl">Pokalbiai tampa aiškiais projekto ištekliais.</h1>
          <p className="max-w-xl text-base leading-7 text-slate-600">Ištraukite veiksmus ir svarbias nuorodas iš chaotiškų pokalbių, o komandos Figma, Drive, Jira ir GitHub išteklius laikykite vienoje vietoje.</p>
          <Link href="/login" className="inline-flex min-h-11 items-center rounded-md bg-teal-900 px-5 text-sm font-medium text-white hover:bg-teal-950">Pradėti nemokamai</Link>
        </div>
        <div className="grid gap-3 border-l-2 border-teal-800/20 pl-6 sm:pl-8">
          <div className="border-b border-slate-200 pb-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Pokalbio ištrauka</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">„Peržiūrėkite Figma maketą iki ketvirtadienio, atnaujinkite Jira užduotį ir suderinkite paleidimo tekstą.“</p>
          </div>
          <div className="grid gap-3 pt-1 sm:grid-cols-2">
            <div className="rounded-md bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">Kitas žingsnis</p>
              <p className="mt-2 text-sm font-medium">Patikrinti Figma maketą</p>
              <p className="mt-1 text-xs text-slate-500">Terminas: ketvirtadienis</p>
            </div>
            <div className="rounded-md bg-[#e8f1eb] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-900">Rastas išteklius</p>
              <p className="mt-2 text-sm font-medium">Projekto dizaino failai</p>
              <p className="mt-1 text-xs text-slate-600">Figma · Dizainas</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}