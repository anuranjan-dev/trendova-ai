import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, CalendarDays, ChevronLeft, ChevronRight, Clock, List, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { EmptyState, PageHeader, PageShell, Panel, SectionTitle } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { PlannedPost } from "@/lib/nova/types";
import { PLATFORMS } from "@/lib/nova/workspace-content";
import { useWorkspace } from "@/lib/nova/workspace-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/scheduler")({
  head: () => ({
    meta: [
      { title: "Scheduler & Analyzer — Trendova AI" },
      { name: "description", content: "Plan your content, see general posting guidance, and review performance once data is connected." },
      { property: "og:title", content: "Scheduler & Analyzer — Trendova AI" },
      { property: "og:description", content: "Plan content and review performance when data is connected." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Scheduler,
});

const pad = (n: number) => String(n).padStart(2, "0");
const toLocal = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
const dayKey = (d: Date) => toLocal(d).slice(0, 10);
const fmt = (s: string) => new Date(s).toLocaleString(undefined, { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

function startOfWeek(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
  return x;
}

function Scheduler() {
  const { posts, savePost, deletePost, logActivity } = useWorkspace();
  const [view, setView] = useState<"week" | "list">("week");
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()));
  const [editing, setEditing] = useState<PlannedPost | null>(null);

  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => { const d = new Date(weekStart); d.setDate(d.getDate() + i); return d; }), [weekStart]);
  const upcoming = posts.filter((p) => new Date(p.when) >= new Date(new Date().setHours(0, 0, 0, 0)));

  function newPost(date?: Date) {
    const d = date ? new Date(date) : new Date();
    d.setHours(date ? 12 : d.getHours() + 1, 0, 0, 0);
    setEditing({ id: crypto.randomUUID(), title: "", platform: "Instagram", when: toLocal(d), status: "draft", notes: "" });
  }

  function shift(n: number) {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + n * 7);
    setWeekStart(d);
  }

  return (
    <PageShell>
      <PageHeader eyebrow="Plan" title="Scheduler & Analyzer" description="Organize planned content, see posting guidance, and review performance once your data is connected." action={<Button onClick={() => newPost()}><Plus className="size-4" /> Add post</Button>} />

      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <Panel>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Content planner</h2>
              <p className="text-sm text-muted-foreground">Saved in this browser. Posts are reminders for you — Trendōva AI does not publish them.</p>
            </div>
            <div className="flex rounded-full border border-border p-1" role="group" aria-label="Planner view">
              {(["week", "list"] as const).map((v) => (
                <button key={v} type="button" aria-pressed={view === v} onClick={() => setView(v)} className={cn("flex items-center gap-1.5 rounded-full px-3 py-1 text-sm", view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>
                  {v === "week" ? <CalendarDays className="size-4" /> : <List className="size-4" />}{v === "week" ? "Week" : "List"}
                </button>
              ))}
            </div>
          </div>

          {view === "week" ? (
            <>
              <div className="mb-3 flex items-center gap-2">
                <Button size="icon" variant="ghost" aria-label="Previous week" onClick={() => shift(-1)}><ChevronLeft className="size-4" /></Button>
                <p className="text-sm font-medium">Week of {weekStart.toLocaleDateString(undefined, { month: "long", day: "numeric" })}</p>
                <Button size="icon" variant="ghost" aria-label="Next week" onClick={() => shift(1)}><ChevronRight className="size-4" /></Button>
                <Button size="sm" variant="ghost" onClick={() => setWeekStart(startOfWeek(new Date()))}>Today</Button>
              </div>
              <div className="grid gap-2 sm:grid-cols-7">
                {days.map((d) => {
                  const items = posts.filter((p) => p.when.slice(0, 10) === dayKey(d));
                  const today = dayKey(d) === dayKey(new Date());
                  return (
                    <div key={d.toISOString()} className={cn("flex min-h-28 flex-col rounded-xl border p-2", today ? "border-primary bg-primary-soft" : "border-border bg-surface")}>
                      <p className="text-xs font-medium text-muted-foreground">{d.toLocaleDateString(undefined, { weekday: "short", day: "numeric" })}</p>
                      <div className="mt-1 flex-1 space-y-1">
                        {items.map((p) => (
                          <button key={p.id} type="button" onClick={() => setEditing(p)} className="block w-full rounded-lg bg-card px-2 py-1 text-left text-xs shadow-sm hover:ring-1 hover:ring-primary">
                            <span className="block truncate font-medium">{p.title || "Untitled"}</span>
                            <span className="text-muted-foreground">{p.when.slice(11)} · {p.status === "draft" ? "Draft" : "Planned"}</span>
                          </button>
                        ))}
                      </div>
                      <button type="button" aria-label={`Add post on ${d.toDateString()}`} onClick={() => newPost(d)} className="mt-1 self-start rounded-md p-1 text-muted-foreground hover:text-primary"><Plus className="size-3.5" /></button>
                    </div>
                  );
                })}
              </div>
            </>
          ) : upcoming.length ? (
            <ul className="divide-y divide-border">
              {upcoming.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{p.title || "Untitled"}</p>
                    <p className="text-sm text-muted-foreground">{fmt(p.when)} · {p.platform}</p>
                  </div>
                  <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", p.status === "planned" ? "bg-primary-soft text-primary" : "bg-surface-2 text-muted-foreground")}>{p.status === "planned" ? "Planned" : "Draft"}</span>
                  <Button size="sm" variant="ghost" onClick={() => setEditing(p)}>Edit</Button>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState icon={<CalendarDays className="size-5" />} title="No upcoming posts yet." body="Add a post to start planning your week." action={<Button variant="outline" onClick={() => newPost()}><Plus className="size-4" /> Add post</Button>} />
          )}
        </Panel>

        <div className="space-y-6">
          <Panel>
            <h2 className="flex items-center gap-2 font-semibold"><CalendarDays className="size-4 text-primary" /> Google Calendar</h2>
            <p className="mt-2 text-sm text-muted-foreground">Not connected. Calendar reminders for planned posts aren't available yet — this needs a Google Calendar connection to be set up.</p>
            <Button variant="outline" size="sm" className="mt-4" disabled>Connect Google Calendar (coming soon)</Button>
          </Panel>
          <Panel>
            <h2 className="flex items-center gap-2 font-semibold"><Clock className="size-4 text-primary" /> General posting guidance</h2>
            <p className="mt-2 text-sm text-muted-foreground">Connect a supported social account or import performance data to receive recommendations based on your own audience.</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>• Post consistently on the same days so your audience knows when to expect you.</li>
              <li>• Try a few different times and compare results before settling on one.</li>
              <li>• Think about when your audience is free — commutes, lunch breaks, evenings.</li>
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">General advice, not based on your data.</p>
          </Panel>
        </div>
      </div>

      <section className="mt-8">
        <SectionTitle title="Performance analyzer" />
        <EmptyState icon={<BarChart3 className="size-5" />} title="Your content performance will appear here." body="Connect a supported social account or import performance data to understand what works for your audience." />
      </section>

      <PostDialog
        post={editing}
        onClose={() => setEditing(null)}
        onSave={(p) => {
          const isNew = !posts.some((x) => x.id === p.id);
          savePost(p);
          if (isNew) logActivity("plan", p.status === "planned" ? "Added a planned post" : "Saved a draft post", `${p.title} · ${fmt(p.when)}`);
          toast.success(isNew ? "Post added to your planner" : "Post updated");
          setEditing(null);
        }}
        onDelete={(id) => { deletePost(id); toast.success("Post removed"); setEditing(null); }}
        exists={editing ? posts.some((x) => x.id === editing.id) : false}
      />
    </PageShell>
  );
}

function PostDialog({ post, onClose, onSave, onDelete, exists }: { post: PlannedPost | null; onClose: () => void; onSave: (p: PlannedPost) => void; onDelete: (id: string) => void; exists: boolean }) {
  const [form, setForm] = useState<PlannedPost | null>(post);
  const [err, setErr] = useState("");
  if (post && form?.id !== post.id) { setForm(post); setErr(""); }
  if (!post || !form) return null;
  const set = (patch: Partial<PlannedPost>) => setForm({ ...form, ...patch });

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="nova-ws">
        <DialogHeader>
          <DialogTitle>{exists ? "Edit post" : "Add post"}</DialogTitle>
          <DialogDescription>This is a reminder in your planner. It won't be published automatically.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2"><Label htmlFor="pp-title">Title</Label><Input id="pp-title" value={form.title} onChange={(e) => set({ title: e.target.value })} placeholder="e.g. Weekend menu reveal" /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="pp-when">Date and time</Label><Input id="pp-when" type="datetime-local" value={form.when} onChange={(e) => set({ when: e.target.value })} /></div>
            <div className="space-y-2">
              <Label htmlFor="pp-platform">Platform</Label>
              <Select value={form.platform} onValueChange={(v) => set({ platform: v })}>
                <SelectTrigger id="pp-platform" className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>{PLATFORMS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pp-status">Status</Label>
            <Select value={form.status} onValueChange={(v) => set({ status: v as PlannedPost["status"] })}>
              <SelectTrigger id="pp-status" className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="draft">Draft</SelectItem><SelectItem value="planned">Planned</SelectItem></SelectContent>
            </Select>
          </div>
          <div className="space-y-2"><Label htmlFor="pp-notes">Notes or caption</Label><Textarea id="pp-notes" rows={3} value={form.notes} onChange={(e) => set({ notes: e.target.value })} /></div>
          {err ? <p className="text-sm text-destructive">{err}</p> : null}
        </div>
        <DialogFooter className="gap-2 sm:justify-between">
          {exists ? <Button variant="ghost" className="text-destructive" onClick={() => onDelete(form.id)}><Trash2 className="size-4" /> Delete</Button> : <span />}
          <Button onClick={() => { if (!form.title.trim()) return setErr("Add a title for this post."); if (!form.when) return setErr("Choose a date and time."); onSave({ ...form, title: form.title.trim() }); }}>Save post</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
