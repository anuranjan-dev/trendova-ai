import { createFileRoute, Link } from "@tanstack/react-router";
import { Copy, Loader2, PenLine, RefreshCw, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { EmptyState, PageHeader, PageShell, Panel, SourceNote } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { CAPTION_EXAMPLES, CAPTION_TONES, CONTENT_TYPES, PLATFORMS, buildCaption, type CaptionDraft } from "@/lib/nova/workspace-content";
import { takeCaptionDraft, useWorkspace } from "@/lib/nova/workspace-store";

export const Route = createFileRoute("/app/captions")({
  head: () => ({
    meta: [
      { title: "AI Caption Generator — Trendova AI" },
      { name: "description", content: "Turn your idea into a caption that fits your platform and brand voice." },
      { property: "og:title", content: "AI Caption Generator — Trendova AI" },
      { property: "og:description", content: "Turn your idea into a caption that fits your platform and brand voice." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CaptionGenerator,
});

function CaptionGenerator() {
  const { profile, profileComplete, logActivity } = useWorkspace();
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [contentType, setContentType] = useState("Photo");
  const [tone, setTone] = useState("Warm & Friendly");
  const [customTone, setCustomTone] = useState("");
  const [useVoice, setUseVoice] = useState(false);
  const [variant, setVariant] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState<CaptionDraft | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const t = takeCaptionDraft();
    if (t) setTopic(t);
  }, []);
  useEffect(() => setUseVoice(profileComplete), [profileComplete]);

  function generate(nextVariant = 0) {
    if (!topic.trim()) {
      setError("Describe what your post is about first.");
      return;
    }
    if (tone === "Custom" && !customTone.trim()) {
      setError("Describe your custom tone, or pick one from the list.");
      return;
    }
    setError("");
    setBusy(true);
    setVariant(nextVariant);
    window.setTimeout(() => {
      setDraft(buildCaption({ topic, platform, contentType, tone, variant: nextVariant, profile: useVoice ? profile : null }));
      setBusy(false);
      setEditing(false);
      logActivity("caption", "Drafted a caption", `${platform} · ${topic.slice(0, 60)}`);
    }, 400);
  }

  async function copy(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied`);
    } catch {
      toast.error("Couldn't copy. Please copy manually.");
    }
  }

  const full = draft ? `${draft.caption}\n\n${draft.cta}\n\n${draft.hashtags.join(" ")}`.trim() : "";

  return (
    <PageShell>
      <PageHeader eyebrow="Create" title="AI Caption Generator" description="Turn your idea into a caption that fits your platform and brand voice." />

      <div className="mb-6 rounded-[1.125rem] border border-border bg-surface p-4 text-sm">
        <p className="font-medium">AI generation isn't connected yet.</p>
        <p className="mt-1 text-muted-foreground">For now, Trendōva AI builds a template draft from your own words, platform and tone. Connecting an AI model is the next step for real generated captions.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <Panel className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="cg-topic">What is your post about?</Label>
            <Textarea id="cg-topic" rows={5} value={topic} onChange={(e) => setTopic(e.target.value)} aria-invalid={Boolean(error) && !topic.trim()} placeholder="Describe your post. For example, a café launching its weekend menu, a new product drop, a travel photo, or a behind-the-scenes video." />
            <div className="flex flex-wrap gap-1.5 pt-1">
              {CAPTION_EXAMPLES.map((ex) => (
                <button key={ex} type="button" onClick={() => setTopic(ex)} className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                  {ex}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Platform" value={platform} onChange={setPlatform} options={PLATFORMS} />
            <Field label="Content type" value={contentType} onChange={setContentType} options={CONTENT_TYPES} />
            <Field label="Tone" value={tone} onChange={setTone} options={CAPTION_TONES} />
          </div>
          {tone === "Custom" ? (
            <div className="space-y-2">
              <Label htmlFor="cg-custom">Describe your tone</Label>
              <Input id="cg-custom" value={customTone} onChange={(e) => setCustomTone(e.target.value)} placeholder="e.g. calm, a little nerdy, no emojis" />
            </div>
          ) : null}

          <div className="flex items-center justify-between gap-4 rounded-xl bg-surface p-3">
            <div>
              <p className="text-sm font-medium">Use my Brand Voice</p>
              <p className="text-xs text-muted-foreground">
                {profileComplete ? `Adds ${profile.brandName}'s name and preferred words.` : <>Not set up yet. <Link to="/app/voice" className="text-primary underline-offset-2 hover:underline">Set up Brand Voice</Link></>}
              </p>
            </div>
            <Switch checked={useVoice} onCheckedChange={setUseVoice} disabled={!profileComplete} aria-label="Use my Brand Voice" />
          </div>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button size="lg" className="w-full" onClick={() => generate(0)} disabled={busy}>
            {busy ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />} Generate Caption
          </Button>
        </Panel>

        <div aria-live="polite">
          {!draft ? (
            <EmptyState icon={<PenLine className="size-5" />} title="Your caption will appear here." body="Describe your post, pick a platform and tone, then press Generate Caption." />
          ) : (
            <Panel className="space-y-5">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-semibold">Your caption</h2>
                <SourceNote>Template draft · not AI-generated</SourceNote>
              </div>
              {editing ? (
                <Textarea rows={5} value={draft.caption} onChange={(e) => setDraft({ ...draft, caption: e.target.value })} aria-label="Edit caption" />
              ) : (
                <p className="text-base leading-relaxed whitespace-pre-line">{draft.caption}</p>
              )}
              <div>
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Call to action</p>
                <p className="mt-1 text-sm">{draft.cta}</p>
              </div>
              {draft.hashtags.length ? (
                <div>
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Hashtags</p>
                  <p className="mt-1 text-sm text-primary">{draft.hashtags.join(" ")}</p>
                </div>
              ) : null}
              <div className="flex flex-wrap gap-2 border-t border-border pt-4">
                <Button size="sm" onClick={() => copy(draft.caption, "Caption")}><Copy className="size-4" /> Copy caption</Button>
                <Button size="sm" variant="outline" onClick={() => copy(full, "Caption and hashtags")}><Copy className="size-4" /> Copy caption + hashtags</Button>
                <Button size="sm" variant="outline" onClick={() => generate(variant + 1)} disabled={busy}><RefreshCw className="size-4" /> Regenerate</Button>
                <Button size="sm" variant="ghost" onClick={() => setEditing((v) => !v)}><PenLine className="size-4" /> {editing ? "Done editing" : "Edit caption"}</Button>
              </div>
            </Panel>
          )}
        </div>
      </div>
    </PageShell>
  );
}

function Field({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: readonly string[] }) {
  const id = `cg-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className="w-full"><SelectValue /></SelectTrigger>
        <SelectContent>
          {options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
}
