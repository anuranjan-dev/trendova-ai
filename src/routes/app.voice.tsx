import { createFileRoute } from "@tanstack/react-router";
import { Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { PageHeader, PageShell, Panel } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { BrandProfile } from "@/lib/nova/types";
import { PERSONALITIES, VOICE_TONES, VOICE_USAGE, voiceExample } from "@/lib/nova/workspace-content";
import { emptyProfile, useWorkspace } from "@/lib/nova/workspace-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/voice")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Brand Voice — Trendova AI" },
      { name: "description", content: "Define your brand personality, audience, tone and word choices so Trendova AI content stays on brand." },
      { property: "og:title", content: "Brand Voice — Trendova AI" },
      { property: "og:description", content: "Set personality, audience, tone and word rules for consistent brand content." },
    ],
  }),
  component: BrandVoice,
});

function BrandVoice() {
  const { profile, saveProfile, hydrated, logActivity } = useWorkspace();
  const [form, setForm] = useState<BrandProfile>(emptyProfile);
  const [errors, setErrors] = useState<{ brandName?: string; audience?: string; tone?: string }>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (hydrated) setForm({ ...profile, toneOption: profile.toneOption || (VOICE_TONES.includes(profile.tone) ? profile.tone : profile.tone ? "Custom" : ""), customTone: profile.customTone || (!VOICE_TONES.includes(profile.tone) ? profile.tone : "") });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  const dirty = hydrated && JSON.stringify({ ...form, updatedAt: null }) !== JSON.stringify({ ...profile, toneOption: profile.toneOption ?? form.toneOption, customTone: profile.customTone ?? form.customTone, updatedAt: null });
  const set = (patch: Partial<BrandProfile>) => setForm((f) => ({ ...f, ...patch }));
  const example = voiceExample(form);

  useEffect(() => {
    if (!dirty) return undefined;
    const h = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  function save() {
    const e: { brandName?: string; audience?: string; tone?: string } = {};
    if (!form.brandName.trim()) e.brandName = "Add your brand name.";
    if (!form.audience.trim()) e.audience = "Describe who you want to reach.";
    if (!form.toneOption) e.tone = "Choose a tone of voice.";
    if (form.toneOption === "Custom" && !form.customTone?.trim()) e.tone = "Describe your custom tone.";
    setErrors(e);
    if (Object.keys(e).length) { toast.error("Please complete the highlighted fields."); return; }
    setSaving(true);
    window.setTimeout(() => {
      try {
        const tone = form.toneOption === "Custom" ? form.customTone!.trim() : form.toneOption!;
        saveProfile({ ...form, brandName: form.brandName.trim(), tone });
        logActivity("voice", "Saved Brand Voice", form.brandName.trim());
        toast.success("Brand Voice saved");
      } catch {
        toast.error("Couldn't save your Brand Voice. Please try again.");
      } finally {
        setSaving(false);
      }
    }, 300);
  }

  return (
    <PageShell>
      <PageHeader eyebrow="Personalize" title="Brand Voice" description="Tell Trendōva AI how your brand sounds so your captions stay consistent. Saved in this browser." action={<Button onClick={save} disabled={saving}>{saving ? <Loader2 className="size-4 animate-spin" /> : null} Save Brand Voice</Button>} />

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-6">
          <Panel className="space-y-5">
            <h2 className="text-lg font-semibold">Brand information</h2>
            <div className="space-y-2">
              <Label htmlFor="bv-name">Brand name</Label>
              <Input id="bv-name" value={form.brandName} onChange={(e) => set({ brandName: e.target.value })} placeholder="Enter your brand name" aria-invalid={Boolean(errors.brandName)} />
              {errors.brandName ? <p className="text-sm text-destructive">{errors.brandName}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="bv-aud">Target audience</Label>
              <Textarea id="bv-aud" rows={2} value={form.audience} onChange={(e) => set({ audience: e.target.value })} placeholder="Describe the people your brand wants to reach." aria-invalid={Boolean(errors.audience)} />
              {errors.audience ? <p className="text-sm text-destructive">{errors.audience}</p> : null}
            </div>
          </Panel>

          <Panel className="space-y-5">
            <div>
              <h2 className="text-lg font-semibold">Brand personality</h2>
              <p className="text-sm text-muted-foreground">Pick the traits that fit.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {PERSONALITIES.map((p) => {
                const on = form.personality.includes(p);
                return (
                  <button key={p} type="button" aria-pressed={on} onClick={() => set({ personality: on ? form.personality.filter((x) => x !== p) : [...form.personality, p] })} className={cn("flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors", on ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary hover:text-primary")}>
                    {on ? <Check className="size-4" /> : null}{p}
                  </button>
                );
              })}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="bv-tone">Tone of voice</Label>
                <Select value={form.toneOption ?? ""} onValueChange={(v) => set({ toneOption: v })}>
                  <SelectTrigger id="bv-tone" className="w-full" aria-invalid={Boolean(errors.tone)}><SelectValue placeholder="Choose a tone" /></SelectTrigger>
                  <SelectContent>{VOICE_TONES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bv-usage">Use this voice for</Label>
                <Select value={form.usage || "All content"} onValueChange={(v) => set({ usage: v })}>
                  <SelectTrigger id="bv-usage" className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>{VOICE_USAGE.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            {form.toneOption === "Custom" ? (
              <div className="space-y-2">
                <Label htmlFor="bv-custom">Describe your preferred tone</Label>
                <Input id="bv-custom" value={form.customTone ?? ""} onChange={(e) => set({ customTone: e.target.value })} placeholder="e.g. calm and clever, never pushy" />
              </div>
            ) : null}
            {errors.tone ? <p className="text-sm text-destructive">{errors.tone}</p> : null}
          </Panel>

          <Panel className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="bv-use">Words or phrases to use</Label>
              <Textarea id="bv-use" rows={3} value={form.useWords} onChange={(e) => set({ useWords: e.target.value })} placeholder="e.g. made to last, everyday, crew" />
              <p className="text-xs text-muted-foreground">Separate with commas.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bv-avoid">Words or phrases to avoid</Label>
              <Textarea id="bv-avoid" rows={3} value={form.avoidWords} onChange={(e) => set({ avoidWords: e.target.value })} placeholder="e.g. cheap, hype, guaranteed" />
              <p className="text-xs text-muted-foreground">These are removed from examples.</p>
            </div>
          </Panel>
        </div>

        <div className="lg:sticky lg:top-4 lg:self-start">
          <Panel>
            <h2 className="text-lg font-semibold">Example caption using your brand voice</h2>
            <p className="mt-1 text-sm text-muted-foreground">Preview how your selected settings may influence your writing. This is an example, not a published post.</p>
            <div className="mt-4 rounded-xl bg-surface p-4">
              {example ? <p className="leading-relaxed">{example}</p> : <p className="text-sm text-muted-foreground">Add your brand name to see an example.</p>}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Built from a template using your settings. It updates as you edit.</p>
            {dirty ? <p className="mt-3 text-sm font-medium text-primary">You have unsaved changes.</p> : null}
          </Panel>
        </div>
      </div>
    </PageShell>
  );
}
