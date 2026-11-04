import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, ChevronsUpDown, Copy, Loader2, PenLine, Radar } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { EmptyState, PageHeader, PageShell, Panel, SectionTitle, SourceNote } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CATEGORIES, buildScan, type ScanResult } from "@/lib/nova/workspace-content";
import { setCaptionDraft, useWorkspace } from "@/lib/nova/workspace-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/trends")({
  head: () => ({
    meta: [
      { title: "Trend Scanner — Trendova AI" },
      { name: "description", content: "Discover topics worth exploring and turn them into content ideas for your brand." },
      { property: "og:title", content: "Trend Scanner — Trendova AI" },
      { property: "og:description", content: "Discover topics worth exploring and turn them into content ideas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TrendScanner,
});

const SHORTCUTS = ["Sneakers & Footwear", "Food & Beverage", "Beauty & Skincare", "Fashion & Apparel"];

type Status = "idle" | "loading" | "done" | "error";

function TrendScanner() {
  const { profile, logActivity } = useWorkspace();
  const navigate = useNavigate();
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [touched, setTouched] = useState(false);

  const brandValue = brand || profile.brandName;

  function scan(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!category) return;
    setStatus("loading");
    window.setTimeout(() => {
      try {
        const r = buildScan(category, brandValue);
        setResult(r);
        setStatus("done");
        logActivity("trend", "Scanned trends", `${category}${r.brandName ? ` for ${r.brandName}` : ""}`);
      } catch {
        setStatus("error");
      }
    }, 700);
  }

  function toCaption(text: string) {
    setCaptionDraft(text);
    void navigate({ to: "/app/captions" });
  }

  return (
    <PageShell>
      <PageHeader
        eyebrow="Discover"
        title="Trend Scanner"
        description="Discover topics worth exploring and turn them into content ideas for your brand."
      />

      <Panel>
        <form onSubmit={scan} className="grid gap-5 md:grid-cols-[1fr_1.3fr_auto] md:items-end">
          <div className="space-y-2">
            <Label htmlFor="ts-brand">Brand name <span className="font-normal text-muted-foreground">(optional)</span></Label>
            <Input id="ts-brand" placeholder={profile.brandName || "Enter your brand name"} value={brand} onChange={(e) => setBrand(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label id="ts-cat-label">What industry or category are you interested in?</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  aria-labelledby="ts-cat-label"
                  aria-invalid={touched && !category}
                  className={cn("w-full justify-between font-normal", !category && "text-muted-foreground", touched && !category && "border-destructive")}
                >
                  {category || "Choose a category"}
                  <ChevronsUpDown className="size-4 opacity-60" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] min-w-[16rem] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search categories…" />
                  <CommandList>
                    <CommandEmpty>No matching category.</CommandEmpty>
                    <CommandGroup>
                      {CATEGORIES.map((c) => (
                        <CommandItem key={c} value={c} onSelect={() => { setCategory(c); setOpen(false); }}>
                          <Check className={cn("size-4", category === c ? "opacity-100" : "opacity-0")} />
                          {c}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <Button type="submit" size="lg" disabled={status === "loading"} className="md:min-w-36">
            {status === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Radar className="size-4" />}
            {status === "loading" ? "Scanning…" : "Scan Trends"}
          </Button>
        </form>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Quick picks:</span>
          {SHORTCUTS.map((c) => (
            <button key={c} type="button" onClick={() => setCategory(c)} className={cn("rounded-full border px-3 py-1 text-xs transition-colors", category === c ? "border-primary bg-primary-soft text-primary" : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground")}>
              {c}
            </button>
          ))}
        </div>
        <p className={cn("mt-3 text-sm", touched && !category ? "text-destructive" : "text-muted-foreground")}>
          {touched && !category ? "Please choose a category to scan." : "Choose a category to begin. Add your brand name for tailored recommendations."}
        </p>
      </Panel>

      <div className="mt-8" aria-live="polite">
        {status === "idle" ? (
          <EmptyState icon={<Radar className="size-5" />} title="Choose a category to start exploring content opportunities." />
        ) : status === "loading" ? (
          <EmptyState icon={<Loader2 className="size-5 animate-spin" />} title="Checking available trend sources..." />
        ) : status === "error" || !result ? (
          <EmptyState title="Something went wrong while retrieving results. Please try again." action={<Button variant="outline" onClick={() => setStatus("idle")}>Try again</Button>} />
        ) : (
          <Results result={result} onCaption={toCaption} />
        )}
      </div>
    </PageShell>
  );
}

function Results({ result, onCaption }: { result: ScanResult; onCaption: (t: string) => void }) {
  return (
    <div className="space-y-8">
      <div className="rounded-[1.125rem] border border-border bg-surface p-4 text-sm">
        <p className="font-medium">Live trend data isn't connected yet. Connect a supported source to explore verified trends.</p>
        <p className="mt-1 text-muted-foreground">
          Below are illustrative examples for {result.category}
          {result.brandName ? `, tailored with your brand name "${result.brandName}"` : ""}. They are not claims about what is trending right now.
        </p>
      </div>

      <section>
        <SectionTitle title="Trends Worth Exploring" hint="Illustrative topics with a practical angle for each." />
        <div className="grid gap-4 md:grid-cols-2">
          {result.topics.map((t) => (
            <Panel key={t.title} className="flex flex-col">
              <SourceNote>Illustrative example</SourceNote>
              <h3 className="mt-3 text-base font-semibold">{t.title}</h3>
              <dl className="mt-3 space-y-3 text-sm">
                <div><dt className="font-medium">What it means</dt><dd className="text-muted-foreground">{t.meaning}</dd></div>
                <div><dt className="font-medium">Why it may matter</dt><dd className="text-muted-foreground">{t.why}</dd></div>
                <div><dt className="font-medium">Content angle</dt><dd className="text-muted-foreground">{t.angle}</dd></div>
              </dl>
              <Button variant="outline" size="sm" className="mt-5 w-fit" onClick={() => onCaption(t.angle)}>
                <PenLine className="size-4" /> Create Caption
              </Button>
            </Panel>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle title="Content Ideas" hint="Built from your category and brand name." />
        <Panel className="divide-y divide-border p-0 sm:p-0">
          {result.ideas.map((idea) => (
            <div key={idea} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm">{idea}</p>
              <Button variant="ghost" size="sm" className="w-fit shrink-0 text-primary" onClick={() => onCaption(idea)}>
                <PenLine className="size-4" /> Create Caption
              </Button>
            </div>
          ))}
        </Panel>
      </section>

      <HashtagIdeas groups={result.hashtags} />

      <section>
        <SectionTitle title="Recommended Next Steps" />
        <div className="grid gap-3 sm:grid-cols-2">
          <NextStep title="Start with the most relevant content idea" body="Pick the idea closest to what you already sell." onClick={() => onCaption(result.ideas[0] ?? "")} cta="Use first idea" />
          <NextStep title="Generate a caption in your brand voice" body="Set up Brand Voice so captions sound like you." to="/app/voice" cta="Open Brand Voice" />
          <NextStep title="Save the idea to your content planner" body="Give the post a date so you remember to make it." to="/app/scheduler" cta="Open planner" />
          <NextStep title="Compare similar ideas before deciding" body="Try two captions for the same idea and keep the clearer one." to="/app/captions" cta="Open Caption Generator" />
        </div>
      </section>
    </div>
  );
}

function NextStep({ title, body, cta, to, onClick }: { title: string; body: string; cta: string; to?: "/app/voice" | "/app/scheduler" | "/app/captions"; onClick?: () => void }) {
  return (
    <div className="flex flex-col rounded-[1.125rem] border border-border bg-card p-4">
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
      {to ? (
        <Button asChild variant="link" className="mt-2 h-auto w-fit p-0"><Link to={to}>{cta} →</Link></Button>
      ) : (
        <Button variant="link" className="mt-2 h-auto w-fit p-0" onClick={onClick}>{cta} →</Button>
      )}
    </div>
  );
}

function HashtagIdeas({ groups }: { groups: { group: string; tags: string[] }[] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (t: string) => setSelected((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));
  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied`);
    } catch {
      toast.error("Couldn't copy. Please copy manually.");
    }
  };
  const total = groups.reduce((n, g) => n + g.tags.length, 0);

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Relevant Hashtag Ideas</h2>
          <p className="mt-1 text-sm text-muted-foreground">Select the ones you want. No popularity data is shown because none is connected.</p>
        </div>
        <Button size="sm" disabled={!selected.length} onClick={() => copy(selected.join(" "), `${selected.length} hashtag${selected.length > 1 ? "s" : ""}`)}>
          <Copy className="size-4" /> Copy selected ({selected.length})
        </Button>
      </div>
      {total === 0 ? (
        <EmptyState title="No hashtag ideas for this scan." body="Try adding a brand name or choosing another category." />
      ) : (
        <Panel className="space-y-5">
          {groups.map((g) => (
            <div key={g.group}>
              <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">{g.group}-related</p>
              <div className="flex flex-wrap gap-2">
                {g.tags.map((t) => {
                  const on = selected.includes(t);
                  return (
                    <span key={t} className={cn("inline-flex items-center overflow-hidden rounded-full border text-sm transition-colors", on ? "border-primary bg-primary-soft text-primary" : "border-border")}>
                      <button type="button" aria-pressed={on} onClick={() => toggle(t)} className="flex items-center gap-1.5 py-1.5 pr-1 pl-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        {on ? <Check className="size-3.5" /> : null}{t}
                      </button>
                      <button type="button" aria-label={`Copy ${t}`} onClick={() => copy(t, t)} className="px-2 py-1.5 text-muted-foreground hover:text-foreground">
                        <Copy className="size-3.5" />
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </Panel>
      )}
    </section>
  );
}
