import { ArrowUpRight, BarChart3, ChevronDown, LayoutGrid, Radar, Sparkles, Wand2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const examples = {
  Beauty: ["Routine over perfection", "The ingredient-first shelf", "Everyday skin stories"],
  Streetwear: ["Wear it your way", "The everyday uniform", "Small-label discovery"],
  Gaming: ["The after-hours setup", "Play together, not alone", "Creator-led challenges"],
};
type Category = keyof typeof examples;

export function IntelligencePreview() {
  const [category, setCategory] = useState<Category>("Beauty");
  return (
    <div className="nova-product-preview text-left text-foreground">
      <aside className="hidden w-44 shrink-0 border-r border-border bg-muted/50 p-5 md:block">
        <p className="text-lg font-semibold">Trendōva AI<span className="text-primary">.</span></p>
        <p className="mb-5 mt-1 text-[10px] text-muted-foreground">Marketing workspace</p>
        {[{ icon: LayoutGrid, name: "Overview" }, { icon: Radar, name: "Trend Scanner" }, { icon: Wand2, name: "Content Studio" }, { icon: Sparkles, name: "Brand Voice" }, { icon: BarChart3, name: "Insights" }].map(({ icon: Icon, name }) => <div key={name} className={cn("mb-1 flex items-center gap-2 rounded-md px-2 py-2.5 text-[11px]", name === "Trend Scanner" ? "bg-primary-soft text-primary" : "text-muted-foreground")}><Icon className="size-3.5" />{name}</div>)}
        <p className="mt-12 text-[10px] text-muted-foreground">Illustrative workspace</p>
      </aside>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between border-b border-border px-5 py-3 text-[10px] text-muted-foreground"><span>Workspace / Trend Scanner</span><span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-primary" /> Example data</span></div>
        <div className="p-5 sm:p-7">
          <div className="flex items-center justify-between gap-4"><div><h2 className="text-lg font-semibold sm:text-xl">Your next move starts here.</h2><p className="mt-1 text-[11px] text-muted-foreground">Cultural signals. Clear opportunities.</p></div><Radar className="size-6 shrink-0 text-primary" /></div>
          <div className="mt-5 flex flex-wrap gap-1.5" aria-label="Preview category">{(Object.keys(examples) as Category[]).map((item) => <Button key={item} size="sm" variant="ghost" className={cn("h-7 px-3 text-[10px]", category === item ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : "bg-muted text-muted-foreground")} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}{category === item && <ChevronDown className="size-3" />}</Button>)}</div>
          <div className="mt-5 grid grid-cols-3 gap-3">{[{ label: "Cultural signals", value: "03" }, { label: "Category", value: category }, { label: "Audience", value: "Gen Z" }].map((stat) => <div key={stat.label} className="border-b border-border pb-3"><p className="text-[10px] text-muted-foreground">{stat.label}</p><p className="mt-1 text-sm font-semibold sm:text-lg">{stat.value}</p></div>)}</div>
          <div className="mt-4 space-y-2" aria-live="polite">{examples[category].map((signal, index) => <div key={signal} className="flex items-center gap-3 rounded-md border border-border px-3 py-3"><span className="grid size-7 shrink-0 place-items-center rounded-md bg-primary-soft text-primary"><Radar className="size-3.5" /></span><div className="min-w-0 flex-1"><p className="text-[11px] font-medium sm:text-xs">{signal}</p><p className="mt-0.5 text-[9px] text-muted-foreground">{category} · {index === 0 ? "Rising" : "Emerging"} direction</p></div><ArrowUpRight className="size-3.5 shrink-0 text-primary" /></div>)}</div>
        </div>
      </div>
    </div>
  );
}
