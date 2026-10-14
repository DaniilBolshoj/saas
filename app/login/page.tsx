import Link from "next/link";
import { Suspense } from "react";
import { LoginButton } from "@/components/login-button";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center px-5 py-12">
      <section className="w-full max-w-md space-y-8 rounded-lg border border-[#d9e2dc] bg-white p-8 shadow-sm">
        <Link href="/" className="text-sm font-semibold text-teal-900">LinkOps</Link>
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">Komandos nuorodų centras</p>
          <h1 className="text-2xl font-semibold">Prisijunkite prie LinkOps</h1>
          <p className="text-sm leading-6 text-slate-600">Naudokite savo Google paskyrą ir tęskite į komandos darbo sritį.</p>
        </div>
        <Suspense fallback={<div className="h-11 animate-pulse rounded-md bg-slate-100" />}>
          <LoginButton />
        </Suspense>
        <p className="text-xs leading-5 text-slate-500">Prisijungdami sutinkate, kad komandos nariai matytų bendrus nuorodų išteklius.</p>
      </section>
    </main>
  );
}