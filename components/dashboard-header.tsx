"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ClipboardList, Link2, LogOut, Settings, Sparkles } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Props = {
  organizationName: string;
  userEmail: string;
};

export function DashboardHeader({ organizationName, userEmail }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-h-16 max-w-[1440px] flex-wrap items-center justify-between gap-3 px-5 py-2 sm:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/dashboard" className="grid size-9 shrink-0 place-items-center rounded-xl bg-teal-900 text-white" aria-label="LinkOps pradžia">
            <Link2 size={18} />
          </Link>
          <span className="text-sm font-semibold text-slate-900">LinkOps</span>
          <span className="hidden text-slate-300 sm:inline">/</span>
          <span className="hidden max-w-48 truncate text-sm text-slate-600 sm:inline">{organizationName}</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="flex items-center gap-1" aria-label="Pagrindinė navigacija">
            <Link
              href="/dashboard"
              aria-current={pathname === "/dashboard" ? "page" : undefined}
              className={`inline-flex min-h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium transition ${pathname === "/dashboard" ? "bg-slate-100 text-slate-950" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              <Link2 aria-hidden="true" className="size-4" />
              <span className="hidden sm:inline">Nuorodos</span>
            </Link>
            <Link
              href="/dashboard/ai"
              aria-current={pathname === "/dashboard/ai" ? "page" : undefined}
              className={`inline-flex min-h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium transition ${pathname === "/dashboard/ai" ? "bg-emerald-50 text-emerald-800" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              <Sparkles aria-hidden="true" className="size-4" />
              <span className="hidden sm:inline">AI analizė</span>
            </Link>
            <Link
              href="/dashboard/orders"
              aria-current={pathname.startsWith("/dashboard/orders") ? "page" : undefined}
              className={`inline-flex min-h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium transition ${pathname.startsWith("/dashboard/orders") ? "bg-slate-100 text-slate-950" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              <ClipboardList aria-hidden="true" className="size-4" />
              <span className="hidden sm:inline">Užsakymai</span>
            </Link>
            <Link
              href="/dashboard/settings"
              aria-current={pathname === "/dashboard/settings" ? "page" : undefined}
              className={`inline-flex min-h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium transition ${pathname === "/dashboard/settings" ? "bg-slate-100 text-slate-950" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              <Settings aria-hidden="true" className="size-4" />
              <span className="hidden sm:inline">Nustatymai</span>
            </Link>
          </nav>

          <span className="hidden max-w-48 truncate border-l border-slate-200 pl-4 text-xs text-slate-500 md:block">{userEmail}</span>
          <button type="button" title="Atsijungti" onClick={() => void signOut()} className="grid size-9 place-items-center rounded-lg text-slate-600 transition hover:bg-slate-100" aria-label="Atsijungti">
            <LogOut size={17} />
          </button>
        </div>
      </div>
    </header>
  );
}
