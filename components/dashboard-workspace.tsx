"use client";

import { useDeferredValue, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Check, ExternalLink, FolderPlus, Link2, LogOut, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { AiAnalysisExplorer } from "@/components/ai-analysis-explorer";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Category = { id: string; name: string; color: string };
type LinkItem = {
  id: string;
  title: string;
  url: string;
  description: string;
  category_id: string | null;
  category_name: string | null;
  is_important: boolean;
  created_at: string;
  last_checked_at: string | null;
  last_status_code: number | null;
  score: number;
};
type LinkDraft = { title: string; url: string; description: string; categoryId: string; isImportant: boolean };
type Props = {
  organizationId: string;
  organizationName: string;
  role: string;
  initialCategories: Category[];
  initialLinks: LinkItem[];
  userEmail: string;
};

const emptyDraft: LinkDraft = { title: "", url: "", description: "", categoryId: "", isImportant: false };

export function DashboardWorkspace({ organizationId, organizationName, role, initialCategories, initialLinks, userEmail }: Props) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [links, setLinks] = useState(initialLinks);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [showImportant, setShowImportant] = useState(false);
  const [editing, setEditing] = useState<LinkItem | null>(null);
  const [linkDialog, setLinkDialog] = useState(false);
  const [draft, setDraft] = useState<LinkDraft>(emptyDraft);
  const [categoryDialog, setCategoryDialog] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [notice, setNotice] = useState<{ kind: "error" | "success"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const deferredQuery = useDeferredValue(query);
  const canManageCategories = role === "owner" || role === "admin";

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      const params = new URLSearchParams({ organizationId });
      if (deferredQuery.trim()) params.set("q", deferredQuery.trim());
      if (activeCategory) params.set("categoryId", activeCategory);
      try {
        const response = await fetch(`/api/links?${params}`, { signal: controller.signal });
        const payload = await response.json() as { links?: LinkItem[]; error?: string };
        if (!response.ok) throw new Error(payload.error ?? "Paieška nepavyko.");
        setLinks(payload.links ?? []);
      } catch (error) {
        if (!controller.signal.aborted) setNotice({ kind: "error", text: error instanceof Error ? error.message : "Paieška nepavyko." });
      }
    }, 180);
    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [organizationId, deferredQuery, activeCategory]);

  const visibleLinks = showImportant ? links.filter((link) => link.is_important) : links;

  function openCreateLink() {
    setEditing(null);
    setDraft(emptyDraft);
    setLinkDialog(true);
  }

  function openEditLink(link: LinkItem) {
    setEditing(link);
    setDraft({ title: link.title, url: link.url, description: link.description, categoryId: link.category_id ?? "", isImportant: link.is_important });
    setLinkDialog(true);
  }

  async function refreshLinks() {
    const params = new URLSearchParams({ organizationId });
    if (deferredQuery.trim()) params.set("q", deferredQuery.trim());
    if (activeCategory) params.set("categoryId", activeCategory);
    const response = await fetch(`/api/links?${params}`);
    const data = await response.json() as { links?: LinkItem[] };
    if (response.ok) setLinks(data.links ?? []);
  }

  async function saveLink(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setNotice(null);
    const payload = { organizationId, title: draft.title, url: draft.url, description: draft.description, categoryId: draft.categoryId || null, isImportant: draft.isImportant };
    try {
      const response = await fetch(editing ? `/api/links/${editing.id}` : "/api/links", {
        method: editing ? "PATCH" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "Nuorodos išsaugoti nepavyko.");
      setLinkDialog(false);
      setNotice({ kind: "success", text: editing ? "Nuoroda atnaujinta." : "Nuoroda pridėta." });
      router.refresh();
      await refreshLinks();
    } catch (error) {
      setNotice({ kind: "error", text: error instanceof Error ? error.message : "Nuorodos išsaugoti nepavyko." });
    } finally {
      setBusy(false);
    }
  }

  async function deleteLink(link: LinkItem) {
    if (!window.confirm(`Ištrinti „${link.title}“?`)) return;
    setNotice(null);
    try {
      const response = await fetch(`/api/links/${link.id}?organizationId=${organizationId}`, { method: "DELETE" });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "Nuorodos ištrinti nepavyko.");
      setLinks((current) => current.filter((item) => item.id !== link.id));
      setNotice({ kind: "success", text: "Nuoroda ištrinta." });
    } catch (error) {
      setNotice({ kind: "error", text: error instanceof Error ? error.message : "Nuorodos ištrinti nepavyko." });
    }
  }

  async function createCategory(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setNotice(null);
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ organizationId, name: categoryName }),
      });
      const result = await response.json() as { category?: Category; error?: string };
      if (!response.ok || !result.category) throw new Error(result.error ?? "Kategorijos sukurti nepavyko.");
      setCategories((current) => [...current, result.category!].sort((a, b) => a.name.localeCompare(b.name)));
      setCategoryName("");
      setCategoryDialog(false);
      setNotice({ kind: "success", text: "Kategorija sukurta." });
    } catch (error) {
      setNotice({ kind: "error", text: error instanceof Error ? error.message : "Kategorijos sukurti nepavyko." });
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#f7f8f5] text-[#172521]">
      <header className="border-b border-[#dce4dd] bg-white">
        <div className="mx-auto flex min-h-16 max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-md bg-teal-900 text-white"><Link2 size={17} /></span>
            <span className="text-sm font-semibold">LinkOps</span><span className="hidden text-slate-300 sm:inline">/</span>
            <span className="truncate text-sm text-slate-600">{organizationName}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden max-w-48 truncate text-xs text-slate-500 sm:block">{userEmail}</span>
            <button type="button" title="Atsijungti" onClick={signOut} className="grid size-9 place-items-center rounded-md text-slate-600 hover:bg-slate-100"><LogOut size={17} /></button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[230px_minmax(0,1fr)]">
        <aside className="space-y-8">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Projektas</p>
            <nav className="space-y-1" aria-label="Nuorodų filtrai">
              <button type="button" onClick={() => { setActiveCategory(""); setShowImportant(false); }} className={`flex min-h-9 w-full items-center justify-between rounded-md px-3 text-left text-sm ${!activeCategory && !showImportant ? "bg-[#e6efea] font-medium text-teal-950" : "text-slate-600 hover:bg-white"}`}><span>Visos nuorodos</span><span className="text-xs">{initialLinks.length}</span></button>
              <button type="button" onClick={() => { setActiveCategory(""); setShowImportant(true); }} className={`flex min-h-9 w-full items-center rounded-md px-3 text-left text-sm ${showImportant ? "bg-[#e6efea] font-medium text-teal-950" : "text-slate-600 hover:bg-white"}`}>Svarbios</button>
            </nav>
          </div>
          <div>
            <div className="mb-3 flex items-center justify-between gap-2"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Kategorijos</p>{canManageCategories && <button type="button" title="Sukurti kategoriją" onClick={() => setCategoryDialog(true)} className="grid size-7 place-items-center rounded-md text-slate-500 hover:bg-white hover:text-teal-900"><FolderPlus size={16} /></button>}</div>
            <nav className="space-y-1" aria-label="Kategorijos">
              {categories.map((category) => <button key={category.id} type="button" onClick={() => { setActiveCategory(category.id); setShowImportant(false); }} className={`flex min-h-9 w-full items-center gap-2 rounded-md px-3 text-left text-sm ${activeCategory === category.id ? "bg-[#e6efea] font-medium text-teal-950" : "text-slate-600 hover:bg-white"}`}><span className="size-2 rounded-full" style={{ backgroundColor: category.color }} />{category.name}</button>)}
              {categories.length === 0 && <p className="px-3 py-2 text-xs text-slate-500">Kategorijų dar nėra.</p>}
            </nav>
          </div>
          <div className="border-t border-slate-200 pt-4 text-xs leading-5 text-slate-500"><p>{canManageCategories ? "Komandos administratorius" : "Komandos narys"}</p><p className="mt-1">Nemokamas planas</p></div>
        </aside>

        <div className="min-w-0 space-y-10">
          <section className="space-y-5">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-800">Darbo sritis</p><h1 className="mt-1 text-2xl font-semibold">Komandos ištekliai</h1></div><button type="button" onClick={openCreateLink} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-teal-900 px-4 text-sm font-medium text-white hover:bg-teal-950"><Plus size={16} />Pridėti nuorodą</button></div>
            <label className="flex min-h-11 items-center gap-3 rounded-md border border-slate-300 bg-white px-3 shadow-sm focus-within:border-teal-800 focus-within:ring-2 focus-within:ring-teal-800/15"><Search size={17} className="shrink-0 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ieškoti pagal pavadinimą ar aprašymą..." className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400" /><kbd className="hidden rounded border border-slate-200 px-1.5 py-0.5 text-[10px] text-slate-400 sm:inline">FUZZY</kbd></label>
            {notice && <div role={notice.kind === "error" ? "alert" : "status"} className={`flex items-start justify-between gap-3 rounded-md border px-3 py-2 text-sm ${notice.kind === "error" ? "border-rose-200 bg-rose-50 text-rose-800" : "border-emerald-200 bg-emerald-50 text-emerald-900"}`}><span>{notice.text}</span><button type="button" title="Uždaryti pranešimą" onClick={() => setNotice(null)}><X size={16} /></button></div>}
            <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3"><h2 className="text-sm font-semibold">{showImportant ? "Svarbios nuorodos" : activeCategory ? categories.find((category) => category.id === activeCategory)?.name : "Visos nuorodos"}</h2><span className="text-xs text-slate-500">{visibleLinks.length} išteklių</span></div>
              {visibleLinks.length === 0 ? <div className="px-5 py-12 text-center"><p className="text-sm font-medium">{query ? "Nieko neradome" : "Čia dar nėra nuorodų"}</p><p className="mt-1 text-sm text-slate-500">{query ? "Pabandykite kitą paieškos frazę." : "Pridėkite pirmą projekto išteklių."}</p>{!query && <button type="button" onClick={openCreateLink} className="mt-4 text-sm font-medium text-teal-900 underline underline-offset-4">Pridėti nuorodą</button>}</div> : (
                <ul className="divide-y divide-slate-100">
                  {visibleLinks.map((link) => {
                    const checked = link.last_status_code !== null;
                    const isHealthy = checked && link.last_status_code! >= 200 && link.last_status_code! < 400;
                    return <li key={link.id} className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><a href={link.url} target="_blank" rel="noreferrer" className="inline-flex min-w-0 items-center gap-1.5 text-sm font-semibold hover:text-teal-900"><span className="truncate">{link.title}</span><ExternalLink size={13} className="shrink-0 text-slate-400" /></a>{link.is_important && <span className="rounded-sm bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-amber-900">Svarbi</span>}</div><p className="mt-1 truncate text-xs text-slate-500">{link.url}</p>{link.description && <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-600">{link.description}</p>}<div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">{link.category_name && <span>{link.category_name}</span>}<span className={`inline-flex items-center gap-1 ${checked ? (isHealthy ? "text-emerald-800" : "text-rose-800") : "text-slate-400"}`}>{checked ? isHealthy ? <Check size={12} /> : <AlertTriangle size={12} /> : <span className="size-1.5 rounded-full bg-slate-300" />}{checked ? `${link.last_status_code} · ${isHealthy ? "Veikia" : "Patikrinti"}` : "Dar netikrinta"}</span>{link.last_checked_at && <span>tikrinta {new Date(link.last_checked_at).toLocaleDateString("lt-LT")}</span>}</div></div><div className="flex shrink-0 items-center gap-1 self-end sm:self-center"><button type="button" title="Redaguoti nuorodą" onClick={() => openEditLink(link)} className="grid size-9 place-items-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-teal-900"><Pencil size={16} /></button><button type="button" title="Ištrinti nuorodą" onClick={() => void deleteLink(link)} className="grid size-9 place-items-center rounded-md text-slate-500 hover:bg-rose-50 hover:text-rose-700"><Trash2 size={16} /></button></div></li>;
                  })}
                </ul>
              )}
            </div>
          </section>
          <section className="border-t border-slate-200 pt-8"><AiAnalysisExplorer organizationId={organizationId} /></section>
        </div>
      </div>

      {linkDialog && <div role="presentation" className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/35 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setLinkDialog(false); }}><section role="dialog" aria-modal="true" aria-labelledby="link-dialog-title" className="my-auto w-full max-w-lg rounded-lg border border-slate-200 bg-white p-6 shadow-xl"><div className="mb-5 flex items-center justify-between"><h2 id="link-dialog-title" className="text-lg font-semibold">{editing ? "Redaguoti nuorodą" : "Nauja nuoroda"}</h2><button type="button" title="Uždaryti" onClick={() => setLinkDialog(false)} className="grid size-8 place-items-center rounded-md hover:bg-slate-100"><X size={17} /></button></div><form onSubmit={saveLink} className="space-y-4"><label className="block space-y-1.5 text-sm font-medium">Pavadinimas<input autoFocus required maxLength={160} value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} className="min-h-10 w-full rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-teal-800" /></label><label className="block space-y-1.5 text-sm font-medium">URL<input required type="url" maxLength={2048} value={draft.url} onChange={(event) => setDraft({ ...draft, url: event.target.value })} placeholder="https://..." className="min-h-10 w-full rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-teal-800" /></label><label className="block space-y-1.5 text-sm font-medium">Aprašymas<textarea maxLength={2000} rows={3} value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} className="w-full rounded-md border border-slate-300 px-3 py-2 font-normal outline-none focus:border-teal-800" /></label><label className="block space-y-1.5 text-sm font-medium">Kategorija<select value={draft.categoryId} onChange={(event) => setDraft({ ...draft, categoryId: event.target.value })} className="min-h-10 w-full rounded-md border border-slate-300 bg-white px-3 font-normal"><option value="">Be kategorijos</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={draft.isImportant} onChange={(event) => setDraft({ ...draft, isImportant: event.target.checked })} className="size-4 accent-teal-900" />Pažymėti kaip svarbią</label><div className="flex justify-end gap-2 pt-2"><button type="button" onClick={() => setLinkDialog(false)} className="min-h-10 rounded-md px-4 text-sm text-slate-600 hover:bg-slate-100">Atšaukti</button><button disabled={busy} className="min-h-10 rounded-md bg-teal-900 px-4 text-sm font-medium text-white disabled:opacity-50">{busy ? "Saugoma..." : "Išsaugoti"}</button></div></form></section></div>}
      {categoryDialog && <div role="presentation" className="fixed inset-0 z-50 grid place-items-center bg-slate-950/35 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setCategoryDialog(false); }}><section role="dialog" aria-modal="true" aria-labelledby="category-dialog-title" className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl"><div className="mb-5 flex items-center justify-between"><h2 id="category-dialog-title" className="text-lg font-semibold">Nauja kategorija</h2><button type="button" title="Uždaryti" onClick={() => setCategoryDialog(false)} className="grid size-8 place-items-center rounded-md hover:bg-slate-100"><X size={17} /></button></div><form onSubmit={createCategory} className="space-y-4"><label className="block space-y-1.5 text-sm font-medium">Pavadinimas<input autoFocus required maxLength={60} value={categoryName} onChange={(event) => setCategoryName(event.target.value)} placeholder="Pvz., Dizainas" className="min-h-10 w-full rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-teal-800" /></label><button disabled={busy} className="min-h-10 w-full rounded-md bg-teal-900 px-4 text-sm font-medium text-white disabled:opacity-50">{busy ? "Kuriama..." : "Sukurti kategoriją"}</button></form></section></div>}
    </main>
  );
}