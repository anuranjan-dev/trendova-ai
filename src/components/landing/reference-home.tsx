import { useEffect, useRef, useState } from "react";
import { ArrowRight, CirclePlay, PanelsTopLeft, Store, RefreshCw, Radar, Sparkles, CalendarDays, Fingerprint, TrendingUp, FileText, Copy, PenLine, ChartNoAxesCombined, Check, ChevronDown, Focus, AudioLines, Search, Rocket, Zap, SlidersHorizontal, Palette, Clock, Users, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
const captions = ["Your new everyday essential just dropped. Oversized comfort, effortless style, and a fit that speaks for itself. Which color are you picking? Shop the drop — link in bio.", "Big comfort. Bigger energy. The Aura Wear oversized hoodie is here to make every day your own. Pick your color and meet your new go-to. #AuraWear #NewDrop", "Not just a hoodie. Your off-duty uniform. Find your fit, make it yours, and show us how you wear it. The new Aura Wear drop is live. #Streetwear #OOTD"];
function CountUp({ to, decimals = 0, prefix = "", suffix = "", duration = 1700, delay = 0 }: { to: number; decimals?: number; prefix?: string; suffix?: string; duration?: number; delay?: number }) {
 const [v, setV] = useState(0);
 const raf = useRef(0);
 useEffect(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(to); return; }
  let start = 0;
  const step = (t: number) => { if (!start) start = t; const p = Math.min(1, (t - start - delay) / duration); if (p < 0) { raf.current = requestAnimationFrame(step); return; } const e = 1 - Math.pow(1 - p, 4); setV(to * e); if (p < 1) raf.current = requestAnimationFrame(step); };
  raf.current = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf.current);
 }, [to, duration, delay]);
 return <>{prefix}{v.toFixed(decimals)}{suffix}</>;
}
export function ReferenceHomepage() {
 const [tab, setTab] = useState("trend");
 const [go, setGo] = useState(false);
 useEffect(() => { const id = requestAnimationFrame(() => setGo(true)); return () => cancelAnimationFrame(id); }, []);
 const [menuOpen, setMenuOpen] = useState(false);
 const [faq, setFaq] = useState<number | null>(null);
 const [scanning, setScanning] = useState(false);
 const [caption, setCaption] = useState(captions[0] ?? "");
 const [variation, setVariation] = useState(0);
 const [copied, setCopied] = useState(false);
 const [editing, setEditing] = useState(false);
 function scanTrends() { setTab("trend"); setScanning(true); window.setTimeout(() => { setScanning(false); toast.success("Aura Wear sample trends refreshed"); }, 900); }
 function generateCaption() { const next = (variation + 1) % captions.length; setVariation(next); setCaption(captions[next] ?? ""); toast.success("Sample caption refreshed"); }
 async function copyCaption() { try { await navigator.clipboard.writeText(caption); setCopied(true); window.setTimeout(() => setCopied(false), 1800); } catch { toast.error("Could not copy. Select the caption to copy it."); } }
 return <div className={`reference-home min-h-screen font-sans ${go ? "nova-go" : ""}`}>
<header className="sticky top-0 z-50 pt-4 px-4 sm:px-6">
<div className="max-w-7xl mx-auto backdrop-blur-xl bg-card/85 border border-border/80 rounded-full shadow-sm px-5 sm:px-7 h-16 flex items-center justify-between transition-all duration-300">
<a className="flex items-center gap-2.5 group active:scale-95 transition-transform" href="/">
<div className="w-9 h-9 aspect-square shrink-0 rounded-full overflow-hidden border border-foreground/15 bg-black shadow-md transition-colors"><img src="/trendova-logo.png" alt="" className="size-full object-cover" />
</div>
<span className="text-xl font-bold text-foreground">{"Trendōva AI"}</span>
</a>
<nav className="hidden md:flex items-center gap-1 bg-muted/70 p-1 rounded-full border border-border/60">
<a className="text-muted-foreground hover:text-primary font-medium text-xs sm:text-[13px] px-4 py-1.5 rounded-full hover:bg-card transition-all duration-150" href="#features">{"Features"}</a>
<a className="text-muted-foreground hover:text-primary font-medium text-xs sm:text-[13px] px-4 py-1.5 rounded-full hover:bg-card transition-all duration-150" href="#how-it-works">{"How It Works"}</a>
<a className="text-muted-foreground hover:text-primary font-medium text-xs sm:text-[13px] px-4 py-1.5 rounded-full hover:bg-card transition-all duration-150" href="#pricing">{"Pricing"}</a>
<a className="text-muted-foreground hover:text-primary font-medium text-xs sm:text-[13px] px-4 py-1.5 rounded-full hover:bg-card transition-all duration-150" href="#about">{"About"}</a>
</nav>
<div className="hidden md:flex items-center gap-2.5">
<a className="text-muted-foreground text-xs sm:text-[13px] font-medium px-4 py-2 rounded-full hover:text-primary hover:bg-muted/70 transition-all" href="/login">{"Log In"}</a>
<Button asChild variant="ghost" className="h-auto p-0"><a className="inline-flex items-center justify-center text-xs sm:text-[13px] font-medium text-primary-foreground bg-primary hover:bg-primary rounded-full px-5 py-2.5 transition-all shadow-sm hover:shadow active:scale-95" href="#workspace">{"Explore Demo"}</a></Button>
</div>
<Button aria-label="Toggle Navigation Menu" className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-foreground/80 hover:bg-muted transition-colors focus:outline-none" id="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-menu" variant="ghost">
<Menu className="size-5 shrink-0 text-[22px]" aria-hidden="true" />
</Button>
</div>
<div className={"md:hidden mt-2 mx-auto max-w-lg p-5 bg-card border border-border/90 rounded-lg shadow-reference flex-col gap-3 transition-all" + (menuOpen ? " flex" : " hidden")} id="mobile-menu">
<a className="py-2.5 px-4 rounded-full text-foreground/80 hover:text-primary hover:bg-surface font-medium text-sm transition-colors" href="#features" onClick={() => setMenuOpen(false)}>{"Features"}</a>
<a className="py-2.5 px-4 rounded-full text-foreground/80 hover:text-primary hover:bg-surface font-medium text-sm transition-colors" href="#how-it-works" onClick={() => setMenuOpen(false)}>{"How It Works"}</a>
<a className="py-2.5 px-4 rounded-full text-foreground/80 hover:text-primary hover:bg-surface font-medium text-sm transition-colors" href="#pricing" onClick={() => setMenuOpen(false)}>{"Pricing"}</a>
<a className="py-2.5 px-4 rounded-full text-foreground/80 hover:text-primary hover:bg-surface font-medium text-sm transition-colors" href="#about" onClick={() => setMenuOpen(false)}>{"About"}</a>
<div className="pt-3 border-t border-muted flex flex-col gap-2">
<a className="w-full text-center py-2.5 text-sm font-medium text-foreground/80 border border-border rounded-full hover:bg-surface" href="/login">{"Log In"}</a>
<a className="w-full text-center py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-full shadow-md" href="#workspace" onClick={() => setMenuOpen(false)}>{"Explore Demo"}</a>
</div>
</div>
</header>
<section className="relative pt-16 md:pt-24 pb-14 md:pb-20 overflow-hidden">
<div className="max-w-7xl mx-auto px-6 text-center">
<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border/80 shadow-sm mb-8 hover:border-primary/30 transition-colors">
<span className="relative flex h-2 w-2">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
<span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
</span>
<span className="text-[11px] sm:text-xs font-semibold text-primary uppercase">{"BUILT FOR THE NEXT GENERATION OF BRANDS"}</span>
</div>
<h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground max-w-4xl mx-auto mb-6 leading-[1.12]">{"\n        AI Marketing Intelligence for "}<span className="nova-gradient-text bg-clip-text text-transparent">{"Youth Brands."}</span>
</h1>
<p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-normal">{"\n        Spot emerging trends. Create content that connects. Grow your brand with AI built for youth culture.\n      "}</p>
<div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14">
<Button asChild variant="ghost" className="h-auto p-0"><a className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary hover:bg-primary text-primary-foreground font-medium text-sm shadow-reference transition-all duration-200 active:scale-95" href="#workspace">
<span >{"Explore Demo"}</span>
<ArrowRight className="size-5 shrink-0 text-[18px]" aria-hidden="true" />
</a></Button>
<Button asChild variant="ghost" className="h-auto p-0"><a className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-card hover:bg-surface border border-border/90 text-foreground/80 font-medium text-sm shadow-sm transition-all duration-200 active:scale-95" href="#how-it-works">
<span >{"See How It Works"}</span>
<CirclePlay className="size-5 shrink-0 text-[18px]" aria-hidden="true" />
</a></Button>
</div>
<div className="max-w-6xl mx-auto rounded-lg border border-border/90 bg-card/95 backdrop-blur-xl shadow-reference p-4 sm:p-7 text-left transition-all" id="workspace">
<div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-muted">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-primary-soft border border-primary-soft flex items-center justify-center text-primary">
<PanelsTopLeft className="size-5 shrink-0 text-[22px]" aria-hidden="true" />
</div>
<div >
<div className="flex items-center gap-2">
<span className="font-bold text-sm text-foreground font-sans tabular-nums">{"TRENDŌVA AI WORKSPACE"}</span>
<span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-primary-soft text-primary border border-primary/20">{"Sample Preview"}</span>
</div>
<p className="text-xs text-muted-foreground">{"Your brand's marketing, in one place."}</p>
</div>
</div>
<div className="flex items-center gap-2 bg-surface p-1.5 pl-3 rounded-full border border-border/80 text-xs">
<span className="text-muted-foreground/70 font-medium flex items-center gap-1">
<Store className="size-5 shrink-0 text-[15px]" aria-hidden="true" />{"\n              Brand:\n            "}</span>
<span className="font-semibold text-foreground bg-card px-2.5 py-1 rounded-full border border-border/60 shadow-xs">{"Aura Wear"}</span>
<span className="text-muted-foreground/70 hidden sm:inline">{"\u2022 Streetwear & Gen Z"}</span>
<Button className="bg-primary hover:bg-primary text-primary-foreground font-medium text-[11px] px-3 py-1 rounded-full transition-colors flex items-center gap-1 shadow-xs ml-1" onClick={scanTrends} variant="ghost"><RefreshCw className={scanning ? "animate-spin" : ""} /> {scanning ? "Scanning…" : "Scan Trends"}</Button>
</div>
</div>
<div role="tablist" aria-label="Trendova AI workspace tools" className="flex items-center gap-2 py-4 border-b border-muted overflow-x-auto custom-scrollbar">
<Button role="tab" aria-selected={tab === "trend"} aria-controls="tab-panel-trend" className={"tab-btn rounded-full px-4 py-2 text-xs sm:text-[13px]" + (tab === "trend" ? " bg-primary text-primary-foreground" : " bg-muted text-muted-foreground")} id="tab-btn-trend" onClick={() => setTab("trend")} variant="ghost">
<Radar className="size-5 shrink-0 text-[16px]" aria-hidden="true" />
<span >{"Trend Scanner"}</span>
</Button>
<Button role="tab" aria-selected={tab === "writer"} aria-controls="tab-panel-writer" className={"tab-btn rounded-full px-4 py-2 text-xs sm:text-[13px]" + (tab === "writer" ? " bg-primary text-primary-foreground" : " bg-muted text-muted-foreground")} id="tab-btn-writer" onClick={() => setTab("writer")} variant="ghost">
<Sparkles className="size-5 shrink-0 text-[16px]" aria-hidden="true" />
<span >{"AI Writer"}</span>
</Button>
<Button role="tab" aria-selected={tab === "scheduler"} aria-controls="tab-panel-scheduler" className={"tab-btn rounded-full px-4 py-2 text-xs sm:text-[13px]" + (tab === "scheduler" ? " bg-primary text-primary-foreground" : " bg-muted text-muted-foreground")} id="tab-btn-scheduler" onClick={() => setTab("scheduler")} variant="ghost">
<CalendarDays className="size-5 shrink-0 text-[16px]" aria-hidden="true" />
<span >{"Scheduler"}</span>
</Button>
<Button role="tab" aria-selected={tab === "personalization"} aria-controls="tab-panel-personalization" className={"tab-btn rounded-full px-4 py-2 text-xs sm:text-[13px]" + (tab === "personalization" ? " bg-primary text-primary-foreground" : " bg-muted text-muted-foreground")} id="tab-btn-personalization" onClick={() => setTab("personalization")} variant="ghost">
<Fingerprint className="size-5 shrink-0 text-[16px]" aria-hidden="true" />
<span >{"Personalization"}</span>
</Button>
</div>
<div role="tabpanel" aria-labelledby="tab-btn-trend" className={"workspace-panel pt-5" + (tab === "trend" ? "" : " hidden")} id="tab-panel-trend">
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
<div className="p-4 rounded-lg bg-surface/70 border border-border/70 flex flex-col justify-between hover:border-primary/30 transition-colors">
<div >
<div className="flex items-center justify-between mb-2">
<span className="text-xs font-semibold text-muted-foreground uppercase">{"Trend Scanner"}</span>
<span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-success-soft text-success border border-success/20">{"Trend activity"}</span>
</div>
<div className="flex flex-col gap-1.5 mb-3">
<span className="text-3xl font-bold leading-none tracking-tight tabular-nums text-foreground"><CountUp to={142} prefix="+" suffix="%" /></span>
<span className="text-[13px] leading-snug text-success font-semibold">{"Spike detected"}</span>
</div>
<p className="text-xs text-muted-foreground">{"Spot rising conversations and style trends."}</p>
</div>
<div className="mt-3 pt-2.5 border-t border-border/60"><div className="flex items-center justify-between text-[10px] text-muted-foreground/70 mb-1"><span className="font-medium">{"Interest Over Time"}</span>
<span className="font-sans tabular-nums text-[9px] bg-card px-1.5 py-0.5 rounded-full border border-border">{"Sample data"}</span>
</div>
<div className="h-12 w-full relative flex items-end pb-3.5"><svg className="w-full h-8 overflow-visible" fill="none" viewBox="0 0 100 32"><line stroke="var(--border)" strokeDasharray="2 2" strokeWidth="1" x1="0" x2="100" y1="28" y2="28"></line>
<line stroke="var(--muted)" strokeWidth="1" x1="0" x2="100" y1="14" y2="14"></line>
<path d="M4 25 L24 22 L48 15 L72 17 L96 4" stroke="var(--primary)" pathLength={1} className="nova-line" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
<circle className="nova-dot" cx="4" cy="25" fill="var(--primary)" r="2"></circle>
<circle className="nova-dot" cx="24" cy="22" fill="var(--primary)" r="2"></circle>
<circle className="nova-dot" cx="48" cy="15" fill="var(--primary)" r="2"></circle>
<circle className="nova-dot" cx="72" cy="17" fill="var(--primary)" r="2"></circle>
<circle className="nova-dot" cx="96" cy="4" fill="var(--success)" r="2.5" stroke="var(--card)" strokeWidth="1"></circle>
</svg>
<div className="absolute bottom-0 inset-x-0 flex justify-between text-[9px] text-muted-foreground/70 font-sans tabular-nums"><span >{"Mon"}</span>
<span >{"Tue"}</span>
<span >{"Wed"}</span>
<span >{"Thu"}</span>
<span >{"Fri"}</span>
</div>
</div>
</div>
</div>
<div className="p-4 rounded-lg bg-surface/70 border border-border/70 flex flex-col justify-between hover:border-primary/30 transition-colors">
<div >
<div className="flex items-center justify-between mb-2">
<span className="text-xs font-semibold text-muted-foreground uppercase">{"AI Writer"}</span>
<span className="px-2 py-0.5 rounded-full text-[10px] font-sans tabular-nums text-muted-foreground bg-card border border-border">{"Illustrative estimate"}</span>
</div>
<div className="flex flex-col gap-1.5 mb-3">
<span className="text-3xl font-bold leading-none tracking-tight tabular-nums text-foreground"><CountUp to={4} suffix={"\u00d7"} /></span>
<span className="text-[13px] leading-snug text-primary font-semibold">{"Engagement Potential"}</span>
</div>
<p className="text-xs text-muted-foreground">{"Create content designed to connect with your audience."}</p>
</div>
<div className="mt-3 pt-2.5 border-t border-border/60"><div className="space-y-1.5 mb-1.5"><div ><div className="flex justify-between text-[10px] text-muted-foreground mb-0.5"><span >{"Standard Caption"}</span>
<span className="font-sans tabular-nums font-medium text-muted-foreground">{"1.0\u00d7 baseline"}</span>
</div>
<div className="w-full bg-border/80 h-1.5 rounded-full overflow-hidden"><div className="bg-muted-foreground/70 h-full w-[25%] rounded-full nova-bar"></div>
</div>
</div>
<div ><div className="flex justify-between text-[10px] text-foreground/80 font-medium mb-0.5"><span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
{"AI-Assisted"}</span>
<span className="font-sans tabular-nums font-bold text-primary"><><CountUp to={4} decimals={1} suffix={"\u00d7"} /> (+<CountUp to={300} suffix="%" />)</></span>
</div>
<div className="w-full bg-border/80 h-1.5 rounded-full overflow-hidden"><div className="bg-primary h-full w-[100%] rounded-full nova-bar"></div>
</div>
</div>
</div>
<p className="text-[9px] text-muted-foreground/70 font-sans tabular-nums text-right">{"Illustrative comparison \u00b7 Sample data"}</p>
</div>
</div>
<div className="p-4 rounded-lg bg-surface/70 border border-border/70 flex flex-col justify-between hover:border-primary/30 transition-colors">
<div >
<div className="flex items-center justify-between mb-2">
<span className="text-xs font-semibold text-muted-foreground uppercase">{"Brand Personality"}</span>
<span className="px-2 py-0.5 rounded-full text-[10px] font-sans tabular-nums text-muted-foreground bg-card border border-border">{"Sample data"}</span>
</div>
<div className="flex flex-col gap-1.5 mb-3">
<span className="text-3xl font-bold leading-none tracking-tight tabular-nums text-foreground"><CountUp to={94.8} decimals={1} suffix="%" /></span>
<span className="text-[13px] leading-snug text-muted-foreground font-semibold">{"Brand voice match"}</span>
</div>
<p className="text-xs text-muted-foreground">{"Calibrated to youth tone & aesthetic criteria."}</p>
</div>
<div className="mt-3 pt-2.5 border-t border-border/60"><div className="space-y-1.5 mb-1.5"><div ><div className="flex justify-between text-[10px] text-muted-foreground mb-0.5"><span className="font-medium">{"Casual"}</span>
<span className="font-sans tabular-nums text-primary font-semibold"><CountUp to={85} suffix="%" delay={200} /></span>
</div>
<div className="w-full bg-border/70 h-1.5 rounded-full overflow-hidden"><div className="bg-primary h-full w-[85%] rounded-full nova-bar"></div>
</div>
</div>
<div ><div className="flex justify-between text-[10px] text-muted-foreground mb-0.5"><span className="font-medium">{"Playful"}</span>
<span className="font-sans tabular-nums text-info font-semibold"><CountUp to={60} suffix="%" delay={350} /></span>
</div>
<div className="w-full bg-border/70 h-1.5 rounded-full overflow-hidden"><div className="bg-info h-full w-[60%] rounded-full nova-bar"></div>
</div>
</div>
<div ><div className="flex justify-between text-[10px] text-muted-foreground mb-0.5"><span className="font-medium">{"Formal"}</span>
<span className="font-sans tabular-nums text-success font-semibold"><CountUp to={15} suffix="%" delay={500} /></span>
</div>
<div className="w-full bg-border/70 h-1.5 rounded-full overflow-hidden"><div className="bg-success h-full w-[15%] rounded-full nova-bar"></div>
</div>
</div>
</div>
<p className="text-[9px] text-muted-foreground/70 font-sans tabular-nums text-right">{"Sample brand preferences"}</p>
</div>
</div>
</div>
<div className="p-5 rounded-lg bg-surface/90 border border-border/80">
<div className="flex flex-wrap items-center justify-between gap-2 mb-4">
<div >
<h4 className="text-sm font-bold text-foreground flex items-center gap-2">
<span >{"Trending in Your Niche"}</span>
<span className="px-2 py-0.5 rounded-full text-[10px] font-sans tabular-nums bg-card text-muted-foreground border border-border">{"Sample data"}</span>
</h4>
<p className="text-xs text-muted-foreground">{"Explore conversations and styles that could inspire your next post."}</p>
</div>
<span className="text-[11px] font-sans tabular-nums text-primary bg-primary-soft px-3 py-1 rounded-full border border-primary/20">{"Updated just now"}</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="p-4 rounded-lg bg-card border border-border/80 hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between">
<div >
<div className="flex items-center justify-between mb-2">
<span className="font-sans tabular-nums font-bold text-sm text-foreground">{"#AestheticCore"}</span>
<span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary-soft text-primary border border-primary/20">{"Trending"}</span>
</div>
<p className="text-xs text-muted-foreground leading-relaxed mb-4">{"\n                    Minimal outfits, carefully styled details, and mood-driven visuals are inspiring a new wave of fashion content.\n                  "}</p>
</div>
<div className="pt-3 border-t border-muted"><div className="flex items-center justify-between mb-2"><div className="flex items-center gap-1.5 text-xs text-muted-foreground"><TrendingUp className="size-5 shrink-0 text-[16px] text-success" aria-hidden="true" /><span className="font-sans tabular-nums text-success font-semibold"><CountUp to={142} prefix="+" suffix="%" /></span>
{" interest"}</div>
<span className="text-[9px] font-sans tabular-nums text-muted-foreground/70">{"Sample data"}</span>
</div>
<div className="bg-surface p-2 rounded-lg border border-muted flex items-center justify-between gap-3"><div className="h-7 flex-1 relative flex items-center"><svg className="w-full h-6 overflow-visible" fill="none" viewBox="0 0 80 20"><line stroke="var(--border)" strokeDasharray="2 2" strokeWidth="0.75" x1="0" x2="80" y1="18" y2="18"></line>
<path d="M2 16 L20 13 L40 9 L60 10 L78 2" stroke="var(--primary)" pathLength={1} className="nova-line" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"></path>
<circle className="nova-dot" cx="78" cy="2" fill="var(--success)" r="2"></circle>
</svg>
</div>
<Button className="px-3 py-1.5 rounded-full text-xs font-medium text-primary bg-primary-soft hover:bg-primary hover:text-primary-foreground transition-colors shrink-0" onClick={() => setTab("writer")} variant="ghost">{"Explore Trend \u2192"}</Button>
</div>
</div>
</div>
<div className="p-4 rounded-lg bg-card border border-border/80 hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between">
<div >
<div className="flex items-center justify-between mb-2">
<span className="font-sans tabular-nums font-bold text-sm text-foreground">{"#OldMoneyStyle"}</span>
<span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-info-soft text-info border border-info/20">{"Rising"}</span>
</div>
<p className="text-xs text-muted-foreground leading-relaxed mb-4">{"\n                    Classic silhouettes, neutral colors, and timeless styling offer an opportunity for brands exploring a more refined look.\n                  "}</p>
</div>
<div className="pt-3 border-t border-muted"><div className="flex items-center justify-between mb-2"><div className="flex items-center gap-1.5 text-xs text-muted-foreground"><TrendingUp className="size-5 shrink-0 text-[16px] text-success" aria-hidden="true" /><span className="font-sans tabular-nums text-success font-semibold"><CountUp to={86} prefix="+" suffix="%" /></span>
{" interest"}</div>
<span className="text-[9px] font-sans tabular-nums text-muted-foreground/70">{"Sample data"}</span>
</div>
<div className="bg-surface p-2 rounded-lg border border-muted flex items-center justify-between gap-3"><div className="h-7 flex-1 relative flex items-center"><svg className="w-full h-6 overflow-visible" fill="none" viewBox="0 0 80 20"><line stroke="var(--border)" strokeDasharray="2 2" strokeWidth="0.75" x1="0" x2="80" y1="18" y2="18"></line>
<path d="M2 16 L22 14 L42 11 L60 8 L78 3" stroke="var(--info)" pathLength={1} className="nova-line" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"></path>
<circle className="nova-dot" cx="78" cy="3" fill="var(--success)" r="2"></circle>
</svg>
</div>
<Button className="px-3 py-1.5 rounded-full text-xs font-medium text-primary bg-primary-soft hover:bg-primary hover:text-primary-foreground transition-colors shrink-0" onClick={() => setTab("writer")} variant="ghost">{"Explore Trend \u2192"}</Button>
</div>
</div>
</div>
</div>
</div>
</div>
<div role="tabpanel" aria-labelledby="tab-btn-writer" className={"workspace-panel pt-5" + (tab === "writer" ? "" : " hidden")} id="tab-panel-writer"><div className="grid grid-cols-1 lg:grid-cols-12 gap-5"><div className="lg:col-span-5 p-5 rounded-lg bg-surface/80 border border-border/80 flex flex-col justify-between"><div ><div className="flex items-center justify-between mb-3"><span className="text-xs font-bold text-muted-foreground uppercase">{"Content Brief Input"}</span>
<div className="flex gap-1"><span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-border text-foreground/80">{"TikTok"}</span>
<span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary text-primary-foreground">{"Instagram"}</span>
<span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-border text-foreground/80">{"X"}</span>
</div>
</div>
<div className="space-y-2 mb-3"><div className="p-3 rounded-lg bg-card border border-border text-xs text-foreground/80"><span className="text-[10px] text-muted-foreground/70 block font-sans tabular-nums uppercase mb-0.5">{"Brief:"}</span>
{"Promote our new oversized hoodie."}</div>
<div className="grid grid-cols-2 gap-2 text-xs"><div className="p-2.5 rounded-lg bg-card border border-border"><span className="text-[10px] text-muted-foreground/70 block font-sans tabular-nums uppercase">{"Brand"}</span>
<strong className="text-foreground">{"Aura Wear"}</strong>
</div>
<div className="p-2.5 rounded-lg bg-card border border-border"><span className="text-[10px] text-muted-foreground/70 block font-sans tabular-nums uppercase">{"Tone"}</span>
<strong className="text-primary">{"Bold & Playful"}</strong>
</div>
</div>
</div>
</div>
<Button className="w-full py-2.5 rounded-full bg-primary hover:bg-primary text-primary-foreground text-xs font-medium flex items-center justify-center gap-1.5 shadow-sm transition-all" onClick={generateCaption} variant="ghost"><Sparkles className="size-5 shrink-0 text-[16px]" aria-hidden="true" /><span >{"Generate Caption"}</span>
</Button>
</div>
<div className="lg:col-span-7 p-5 rounded-lg bg-card border border-border shadow-sm flex flex-col justify-between"><div ><div className="flex items-center justify-between pb-2 mb-3 border-b border-muted"><span className="text-xs font-bold text-foreground/80 flex items-center gap-1.5"><FileText className="size-5 shrink-0 text-primary text-[16px]" aria-hidden="true" />{"Generated Caption Preview"}</span>
<span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-success-soft text-success border border-success/20">{"Sample caption"}</span>
</div>
<div className="p-4 rounded-lg bg-surface border border-border/80 text-xs text-foreground leading-relaxed font-sans"><p className="mb-3 font-normal leading-relaxed" contentEditable={editing} suppressContentEditableWarning onBlur={(event) => setCaption(event.currentTarget.textContent ?? caption)}>{caption}</p>
<div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/60"><span className="px-2.5 py-0.5 rounded-full bg-card border border-border text-[10px] font-sans tabular-nums text-primary">{"#AuraWear"}</span>
<span className="px-2.5 py-0.5 rounded-full bg-card border border-border text-[10px] font-sans tabular-nums text-primary">{"#Streetwear"}</span>
<span className="px-2.5 py-0.5 rounded-full bg-card border border-border text-[10px] font-sans tabular-nums text-primary">{"#OOTD"}</span>
<span className="px-2.5 py-0.5 rounded-full bg-card border border-border text-[10px] font-sans tabular-nums text-primary">{"#StreetStyle"}</span>
<span className="px-2.5 py-0.5 rounded-full bg-card border border-border text-[10px] font-sans tabular-nums text-primary">{"#NewDrop"}</span>
</div>
</div>
</div>
<div className="pt-3 mt-3 border-t border-muted flex flex-wrap items-center justify-between gap-2"><span className="text-[11px] text-muted-foreground/70 font-sans tabular-nums">{"Preset: Aura Wear Street \u00b7 1/3"}</span>
<div className="flex flex-wrap gap-2"><Button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border border-border text-foreground/80 hover:bg-surface transition-colors copy-btn shadow-xs" onClick={copyCaption} variant="ghost">{copied ? "Copied!" : <><Copy className="size-4" /> Copy Caption</>}</Button>
<Button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border border-border text-foreground/80 hover:bg-surface transition-colors shadow-xs" variant="ghost" onClick={() => setEditing(!editing)}><PenLine className="size-5 shrink-0 text-[14px]" aria-hidden="true" /><span >{"Edit Caption"}</span>
</Button>
<Button className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-primary text-primary-foreground hover:bg-primary transition-colors shadow-xs" variant="ghost" onClick={() => { setTab("scheduler"); toast.success("Caption added to the sample Wednesday slot"); }}>{"Send to Scheduler"}</Button>
</div>
</div>
</div>
</div>
</div>
<div role="tabpanel" aria-labelledby="tab-btn-scheduler" className={"workspace-panel pt-5" + (tab === "scheduler" ? "" : " hidden")} id="tab-panel-scheduler">
<div className="p-5 rounded-lg bg-surface/80 border border-border/80">
<div className="flex flex-wrap items-center justify-between gap-3 mb-4">
<div >
<h4 className="text-sm font-bold text-foreground">{"Week Overview & Optimal Slot"}</h4>
<p className="text-xs text-muted-foreground">{"Sample posting-time recommendation for Aura Wear."}</p>
</div>
<span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-soft text-primary border border-primary/20">{"Recommended: Wednesday @ 6:45 PM"}</span>
</div>
<div className="grid grid-cols-7 gap-2 text-center mb-4">
<div className="p-3 rounded-lg bg-card border border-border/70 text-xs">
<span className="text-muted-foreground/70 block font-medium">{"Mon"}</span>
<span className="text-sm font-bold text-foreground/80 mt-1 block">{"14"}</span>
<span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 mx-auto mt-2 block"></span>
</div>
<div className="p-3 rounded-lg bg-card border border-border/70 text-xs">
<span className="text-muted-foreground/70 block font-medium">{"Tue"}</span>
<span className="text-sm font-bold text-foreground/80 mt-1 block">{"15"}</span>
<span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 mx-auto mt-2 block"></span>
</div>
<div className="p-3 rounded-lg bg-primary text-primary-foreground border border-primary text-xs shadow-md">
<span className="text-primary-soft block font-medium">{"Wed"}</span>
<span className="text-sm font-bold mt-1 block">{"16"}</span>
<span className="w-2 h-2 rounded-full bg-card mx-auto mt-2 block"></span>
</div>
<div className="p-3 rounded-lg bg-card border border-border/70 text-xs">
<span className="text-muted-foreground/70 block font-medium">{"Thu"}</span>
<span className="text-sm font-bold text-foreground/80 mt-1 block">{"17"}</span>
<span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 mx-auto mt-2 block"></span>
</div>
<div className="p-3 rounded-lg bg-card border border-border/70 text-xs">
<span className="text-muted-foreground/70 block font-medium">{"Fri"}</span>
<span className="text-sm font-bold text-foreground/80 mt-1 block">{"18"}</span>
<span className="w-1.5 h-1.5 rounded-full bg-primary mx-auto mt-2 block"></span>
</div>
<div className="p-3 rounded-lg bg-card border border-border/70 text-xs">
<span className="text-muted-foreground/70 block font-medium">{"Sat"}</span>
<span className="text-sm font-bold text-foreground/80 mt-1 block">{"19"}</span>
<span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 mx-auto mt-2 block"></span>
</div>
<div className="p-3 rounded-lg bg-card border border-border/70 text-xs">
<span className="text-muted-foreground/70 block font-medium">{"Sun"}</span>
<span className="text-sm font-bold text-foreground/80 mt-1 block">{"20"}</span>
<span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 mx-auto mt-2 block"></span>
</div>
</div>
<div className="p-3.5 rounded-lg bg-card border border-border/80 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-success-soft text-success flex items-center justify-center">
<ChartNoAxesCombined className="size-5 shrink-0 text-[18px]" aria-hidden="true" />
</div>
<div >
<span className="text-xs font-semibold text-foreground">{"Post Performance: More people are engaging this week"}</span>
<span className="text-[11px] text-success font-medium block">{"(+12% engagement over previous benchmark)"}</span>
</div>
</div>
<span className="px-2.5 py-1 rounded-full text-[10px] font-sans tabular-nums text-muted-foreground bg-muted">{"Sample data"}</span>
</div>
</div>
</div>
<div role="tabpanel" aria-labelledby="tab-btn-personalization" className={"workspace-panel pt-5" + (tab === "personalization" ? "" : " hidden")} id="tab-panel-personalization">
<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
<div className="p-5 rounded-lg bg-surface/80 border border-border/80">
<h4 className="text-xs font-bold uppercase text-muted-foreground mb-3">{"Brand Voice Calibration"}</h4>
<div className="space-y-3.5">
<div >
<div className="flex justify-between text-xs font-medium text-foreground/80 mb-1">
<span >{"Casual"}</span>
<span className="text-primary font-sans tabular-nums"><CountUp to={85} suffix="%" delay={200} /></span>
</div>
<div className="w-full bg-border h-2.5 rounded-full overflow-hidden">
<div className="bg-primary h-full w-[85%] rounded-full nova-bar"></div>
</div>
</div>
<div >
<div className="flex justify-between text-xs font-medium text-foreground/80 mb-1">
<span >{"Formal"}</span>
<span className="text-success font-sans tabular-nums"><CountUp to={15} suffix="%" delay={500} /></span>
</div>
<div className="w-full bg-border h-2.5 rounded-full overflow-hidden">
<div className="bg-success h-full w-[15%] rounded-full nova-bar"></div>
</div>
</div>
<div >
<div className="flex justify-between text-xs font-medium text-foreground/80 mb-1">
<span >{"Playful"}</span>
<span className="text-info font-sans tabular-nums"><CountUp to={60} suffix="%" delay={350} /></span>
</div>
<div className="w-full bg-border h-2.5 rounded-full overflow-hidden">
<div className="bg-info h-full w-[60%] rounded-full nova-bar"></div>
</div>
</div>
</div>
</div>
<div className="p-5 rounded-lg bg-card border border-border flex flex-col justify-between">
<div >
<h4 className="text-xs font-bold uppercase text-muted-foreground mb-3">{"Audience & Palette Profile"}</h4>
<div className="p-3.5 rounded-lg bg-surface border border-border/70 mb-3">
<span className="text-[11px] text-muted-foreground/70 block uppercase font-sans tabular-nums">{"Target Audience"}</span>
<span className="text-xs font-bold text-foreground">{"Age group: 18\u201324"}</span>
<p className="text-[11px] text-muted-foreground mt-0.5">{"Youth culture, streetwear enthusiasts, modern aesthetics."}</p>
</div>
<div className="flex items-center justify-between pt-2">
<span className="text-xs font-medium text-muted-foreground">{"Visual Palette:"}</span>
<div className="flex gap-2 items-center">
<span className="w-5 h-5 rounded-full bg-primary border border-primary-foreground shadow-xs" title="Primary Blue"></span>
<span className="w-5 h-5 rounded-full bg-success border border-primary-foreground shadow-xs" title="Teal Green"></span>
<span className="w-5 h-5 rounded-full bg-foreground border border-primary-foreground shadow-xs" title="Deep Navy"></span>
</div>
</div>
</div>
<div className="pt-3 border-t border-muted flex justify-end">
<span className="px-3 py-1 rounded-full text-xs font-medium bg-success-soft text-success border border-success/20">{"Sample brand identity"}</span>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<section id="features" className="py-20 md:py-28 bg-card border-y border-border/70">
<div className="max-w-7xl mx-auto px-6">
<div className="text-center max-w-3xl mx-auto mb-14"><h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Explore Trendōva AI’s Features</h2><p className="text-base sm:text-lg text-muted-foreground leading-relaxed">From discovering trends to creating, scheduling, and personalizing content, Trendōva AI brings your essential AI marketing tools together in one workspace.</p></div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
{[
 {icon: Radar, title: "Trend Scanner", description: "Discover emerging topics, content patterns, and conversations that could create opportunities for your brand."},
 {icon: Sparkles, title: "AI Writer", description: "Create captions, advertising copy, and social media post ideas tailored to your brand’s tone, personality, and communication style."},
 {icon: CalendarDays, title: "Scheduler & Analyzer", description: "Plan your content, explore suggested posting times, and learn what resonates with your audience. Scheduling is coming soon; insights currently use sample data."},
 {icon: Fingerprint, title: "Personalization Engine", description: "Make every piece of content feel unmistakably yours, with a consistent tone, themes, and messaging shaped around your audience."},
].map(({icon: Icon, title, description}) => <article key={title} className="group rounded-lg border border-border bg-background p-7 sm:p-9 transition-colors hover:border-primary/40"><div className="w-12 h-12 rounded-lg text-primary flex items-center justify-center mb-6"><Icon className="size-6" /></div><h3 className="font-semibold mb-3">{title}</h3><p className="text-muted-foreground">{description}</p></article>)}
</div></div></section>
<section className="py-20 md:py-28 bg-background" id="how-it-works">
<div className="max-w-7xl mx-auto px-6">
<div className="text-center max-w-3xl mx-auto mb-16">
<h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">{"\n          From Trend to Takeoff\n        "}</h2>
<p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{"\n          Four connected capabilities help you move from discovering an opportunity to creating and improving your marketing content.\n        "}</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
<div className="p-6 rounded-lg bg-card border border-border/90 shadow-sm flex flex-col justify-between hover:border-primary/40 hover:shadow-md transition-all">
<div >
<div className="flex items-center justify-between mb-5">
<span className="font-sans tabular-nums text-2xl font-extrabold text-primary">{"01"}</span>
<div className="w-9 h-9 rounded-lg bg-primary-soft text-primary flex items-center justify-center">
<Search className="size-5 shrink-0 text-[20px]" aria-hidden="true" />
</div>
</div>
<h3 className="text-lg font-bold text-foreground mb-2">{"Discover Trends"}</h3>
<p className="text-xs text-muted-foreground leading-relaxed mb-6">{"\n              Trendōva AI helps you explore emerging trends and conversations across social platforms, then identify the ideas most relevant to your brand.\n            "}</p>
</div>
<div className="pt-4 border-t border-muted">
<div className="flex flex-wrap gap-1.5 mb-2">
<span className="px-2 py-0.5 rounded-full bg-muted text-[10px] text-muted-foreground font-medium">{"Instagram"}</span>
<span className="px-2 py-0.5 rounded-full bg-muted text-[10px] text-muted-foreground font-medium">{"TikTok"}</span>
<span className="px-2 py-0.5 rounded-full bg-muted text-[10px] text-muted-foreground font-medium">{"Reddit"}</span>
<span className="px-2 py-0.5 rounded-full bg-muted text-[10px] text-muted-foreground font-medium">{"X"}</span>
</div>
<div className="px-3 py-1.5 rounded-lg bg-surface border border-border/60 font-sans tabular-nums text-[11px] text-primary">{"\n              Sample: #Streetwear\n            "}</div>
</div>
</div>
<div className="p-6 rounded-lg bg-card border border-border/90 shadow-sm flex flex-col justify-between hover:border-primary/40 hover:shadow-md transition-all">
<div >
<div className="flex items-center justify-between mb-5">
<span className="font-sans tabular-nums text-2xl font-extrabold text-primary">{"02"}</span>
<div className="w-9 h-9 rounded-lg bg-primary-soft text-primary flex items-center justify-center">
<PenLine className="size-5 shrink-0 text-[20px]" aria-hidden="true" />
</div>
</div>
<h3 className="text-lg font-bold text-foreground mb-2">{"Create Content"}</h3>
<p className="text-xs text-muted-foreground leading-relaxed mb-6">{"\n              Turn a simple idea into captions, advertising copy, and social media posts written in your brand's tone.\n            "}</p>
</div>
<div className="pt-4 border-t border-muted">
<div className="p-2 rounded-lg bg-surface border border-border/60 text-[11px] text-muted-foreground mb-2 truncate">{"\n              \"Promote our new oversized hoodie.\"\n            "}</div>
<div className="flex items-center justify-between">
<span className="text-[10px] font-sans tabular-nums text-success font-semibold">{"1-4 micro flow"}</span>
<div className="flex gap-1">
<Button className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-card border border-border text-muted-foreground copy-btn" onClick={copyCaption} variant="ghost">{"Copy"}</Button>
<Button className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-card border border-border text-muted-foreground" onClick={() => { setTab("writer"); setEditing(true); document.getElementById("workspace")?.scrollIntoView(); }} variant="ghost">{"Edit"}</Button>
</div>
</div>
</div>
</div>
<div className="p-6 rounded-lg bg-card border border-border/90 shadow-sm flex flex-col justify-between hover:border-primary/40 hover:shadow-md transition-all">
<div >
<div className="flex items-center justify-between mb-5">
<span className="font-sans tabular-nums text-2xl font-extrabold text-primary">{"03"}</span>
<div className="w-9 h-9 rounded-lg bg-primary-soft text-primary flex items-center justify-center">
<Clock className="size-5 shrink-0 text-[20px]" aria-hidden="true" />
</div>
</div>
<h3 className="text-lg font-bold text-foreground mb-2">{"Schedule & Analyze"}</h3>
<p className="text-xs text-muted-foreground leading-relaxed mb-6">{"\n              Find suggested posting times, organize your content, and learn from available performance insights.\n            "}</p>
</div>
<div className="pt-4 border-t border-muted">
<div className="flex items-center justify-between mb-2">
<span className="px-2.5 py-0.5 rounded-full bg-primary-soft text-primary text-[10px] font-medium">{"6:45 PM recommendation"}</span>
</div>
<div className="flex items-center justify-between text-[10px] font-sans tabular-nums text-muted-foreground/70">
<span >{"Calendar snippet"}</span>
<span >{"Sample data"}</span>
</div>
</div>
</div>
<div className="p-6 rounded-lg bg-card border border-border/90 shadow-sm flex flex-col justify-between hover:border-primary/40 hover:shadow-md transition-all">
<div >
<div className="flex items-center justify-between mb-5">
<span className="font-sans tabular-nums text-2xl font-extrabold text-primary">{"04"}</span>
<div className="w-9 h-9 rounded-lg bg-primary-soft text-primary flex items-center justify-center">
<SlidersHorizontal className="size-5 shrink-0 text-[20px]" aria-hidden="true" />
</div>
</div>
<h3 className="text-lg font-bold text-foreground mb-2">{"Personalize Everything"}</h3>
<p className="text-xs text-muted-foreground leading-relaxed mb-6">{"\n              Save your brand's tone, identity, visual style, and audience preferences so every generated post feels consistent with your brand.\n            "}</p>
</div>
<div className="pt-4 border-t border-muted">
<div className="p-2 rounded-lg bg-surface border border-border/60 text-[11px] text-foreground/80 flex items-center justify-between">
<span >{"Aura Wear"}</span>
<span className="font-medium text-primary">{"Bold & Playful"}</span>
</div>
<div className="text-[10px] text-muted-foreground mt-1 font-sans tabular-nums">{"18\u201324 age group summary"}</div>
</div>
</div>
</div>
</div>
</section>
<section className="py-20 md:py-28 bg-card border-y border-border/70" id="pricing">
<div className="max-w-7xl mx-auto px-6">
<div className="text-center max-w-3xl mx-auto mb-16">
<h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">{"\n          Plans for Every Stage\n        "}</h2>
<p className="text-sm sm:text-base text-muted-foreground">{"\n          Illustrative pricing \u2014 subject to final launch plans.\n        "}</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-10">
<div className="rounded-lg border border-border/80 bg-background p-8 flex flex-col justify-between shadow-sm hover:border-muted-foreground/50 transition-all">
<div >
<div className="mb-5">
<h3 className="text-xl font-bold text-foreground">{"Starter Plan"}</h3>
<p className="text-xs text-muted-foreground mt-1">{"For creators and brands getting started."}</p>
</div>
<div className="mb-6 pb-6 border-b border-border/70">
<div className="text-4xl font-bold font-sans tabular-nums text-foreground">{"$0"}</div>
<span className="text-xs text-muted-foreground">{"/ month"}</span>
</div>
<ul className="space-y-3.5 mb-8">
<li className="flex items-center gap-2.5 text-xs text-foreground/80">
<Check className="size-5 shrink-0 text-primary text-[18px]" aria-hidden="true" />
<span >{"Up to 50 Trend Scans / mo"}</span>
</li>
<li className="flex items-center gap-2.5 text-xs text-foreground/80">
<Check className="size-5 shrink-0 text-primary text-[18px]" aria-hidden="true" />
<span >{"AI Writer Core generation"}</span>
</li>
<li className="flex items-center gap-2.5 text-xs text-foreground/80">
<Check className="size-5 shrink-0 text-primary text-[18px]" aria-hidden="true" />
<span >{"Weekly Content Scheduler"}</span>
</li>
<li className="flex items-center gap-2.5 text-xs text-foreground/80">
<Check className="size-5 shrink-0 text-primary text-[18px]" aria-hidden="true" />
<span >{"1 Brand Identity Profile"}</span>
</li>
</ul>
</div>
<Button className="w-full py-3 rounded-full border border-muted-foreground/50 text-foreground/80 font-medium text-xs hover:bg-muted transition-colors" variant="ghost" asChild><a href="/signup">Get Started Free</a></Button>
</div>
<div className="rounded-lg border-2 border-primary bg-card p-8 flex flex-col justify-between shadow-reference relative -translate-y-2">
<div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground rounded-full text-[11px] font-bold uppercase shadow-sm">{"\n            POPULAR\n          "}</div>
<div >
<div className="mb-5">
<h3 className="text-xl font-bold text-foreground">{"Professional Plan"}</h3>
<p className="text-xs text-muted-foreground mt-1">{"For growing brands ready to do more."}</p>
</div>
<div className="mb-6 pb-6 border-b border-border/70">
<div className="text-4xl font-bold font-sans tabular-nums text-foreground">{"$19"}</div>
<span className="text-xs text-muted-foreground">{"/ month"}</span>
</div>
<ul className="space-y-3.5 mb-8">
<li className="flex items-center gap-2.5 text-xs text-foreground/80">
<Check className="size-5 shrink-0 text-primary text-[18px]" aria-hidden="true" />
<span >{"Unlimited Trend Exploration"}</span>
</li>
<li className="flex items-center gap-2.5 text-xs text-foreground/80">
<Check className="size-5 shrink-0 text-primary text-[18px]" aria-hidden="true" />
<span >{"Multi-platform AI Copywriter"}</span>
</li>
<li className="flex items-center gap-2.5 text-xs text-foreground/80">
<Check className="size-5 shrink-0 text-primary text-[18px]" aria-hidden="true" />
<span >{"Predictive Peak-Time Scheduler"}</span>
</li>
<li className="flex items-center gap-2.5 text-xs text-foreground/80">
<Check className="size-5 shrink-0 text-primary text-[18px]" aria-hidden="true" />
<span >{"5 Custom Brand Profiles"}</span>
</li>
<li className="flex items-center gap-2.5 text-xs text-foreground/80">
<Check className="size-5 shrink-0 text-primary text-[18px]" aria-hidden="true" />
<span >{"Advanced Performance Insights"}</span>
</li>
</ul>
</div>
<Button className="w-full py-3 rounded-full bg-primary hover:bg-primary text-primary-foreground font-medium text-xs shadow-md transition-all" variant="ghost" asChild><a href="/signup">Choose Professional</a></Button>
</div>
<div className="rounded-lg border border-border/80 bg-background p-8 flex flex-col justify-between shadow-sm hover:border-muted-foreground/50 transition-all">
<div >
<div className="mb-5">
<h3 className="text-xl font-bold text-foreground">{"Team / Scale Plan"}</h3>
<p className="text-xs text-muted-foreground mt-1">{"For teams managing multiple brands."}</p>
</div>
<div className="mb-6 pb-6 border-b border-border/70">
<div className="text-4xl font-bold font-sans tabular-nums text-foreground">{"$49"}</div>
<span className="text-xs text-muted-foreground">{"/ month"}</span>
</div>
<ul className="space-y-3.5 mb-8">
<li className="flex items-center gap-2.5 text-xs text-foreground/80">
<Check className="size-5 shrink-0 text-primary text-[18px]" aria-hidden="true" />
<span >{"Multi-seat Team Collaboration"}</span>
</li>
<li className="flex items-center gap-2.5 text-xs text-foreground/80">
<Check className="size-5 shrink-0 text-primary text-[18px]" aria-hidden="true" />
<span >{"Custom Tone Fine-Tuning"}</span>
</li>
<li className="flex items-center gap-2.5 text-xs text-foreground/80">
<Check className="size-5 shrink-0 text-primary text-[18px]" aria-hidden="true" />
<span >{"Priority Support & SLA"}</span>
</li>
<li className="flex items-center gap-2.5 text-xs text-foreground/80">
<Check className="size-5 shrink-0 text-primary text-[18px]" aria-hidden="true" />
<span >{"Dedicated Agency Workspaces"}</span>
</li>
</ul>
</div>
<Button className="w-full py-3 rounded-full border border-muted-foreground/50 text-foreground/80 font-medium text-xs hover:bg-muted transition-colors" variant="ghost" asChild><a href="/signup">Choose Team</a></Button>
</div>
</div>
<p className="text-center text-xs text-muted-foreground/70">{"Preview pricing. Paid subscriptions are not active yet."}</p>
</div>
</section>
<section className="py-20 md:py-28 bg-background" id="about">
<div className="max-w-7xl mx-auto px-6">
<div className="max-w-4xl mx-auto">
<span className="text-xs font-semibold text-primary uppercase font-sans tabular-nums block mb-3">{"About Trendōva AI"}</span>
<h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-6">{"\n          Marketing Should Feel More Human.\n        "}</h2>
<p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-12">{"\n          Trendōva AI is designed to simplify the work behind effective marketing. By bringing trend discovery, content creation, scheduling, performance analysis, and brand personalization into one connected workspace, Trendōva AI helps brands spend less time juggling tools and more time developing ideas that connect with their audience.\n        "}</p>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="p-6 rounded-lg bg-card border border-border/80 shadow-xs">
<div className="w-10 h-10 rounded-lg bg-primary-soft text-primary flex items-center justify-center mb-4">
<Focus className="size-5 shrink-0 text-[20px]" aria-hidden="true" />
</div>
<h3 className="text-base font-bold text-foreground mb-2">{"Clarity Over Clutter"}</h3>
<p className="text-xs text-muted-foreground leading-relaxed">{"\n              Find useful marketing ideas without getting lost in unnecessary information.\n            "}</p>
</div>
<div className="p-6 rounded-lg bg-card border border-border/80 shadow-xs">
<div className="w-10 h-10 rounded-lg bg-primary-soft text-primary flex items-center justify-center mb-4">
<ChartNoAxesCombined className="size-5 shrink-0 text-[20px]" aria-hidden="true" />
</div>
<h3 className="text-base font-bold text-foreground mb-2">{"Insights You Can Understand"}</h3>
<p className="text-xs text-muted-foreground leading-relaxed">{"\n              Turn trends and available performance data into clear next steps for your brand.\n            "}</p>
</div>
<div className="p-6 rounded-lg bg-card border border-border/80 shadow-xs">
<div className="w-10 h-10 rounded-lg bg-primary-soft text-primary flex items-center justify-center mb-4">
<AudioLines className="size-5 shrink-0 text-[20px]" aria-hidden="true" />
</div>
<h3 className="text-base font-bold text-foreground mb-2">{"A Voice That Feels Like You"}</h3>
<p className="text-xs text-muted-foreground leading-relaxed">{"\n              Create content that reflects your brand's personality instead of sounding generic.\n            "}</p>
</div>
</div>
</div>
</div>
</section>
<section className="py-20 md:py-28 bg-card border-y border-border/70" id="faq">
<div className="max-w-4xl mx-auto px-6">
<div className="text-center max-w-2xl mx-auto mb-14">
<span className="text-xs font-semibold text-primary uppercase font-sans tabular-nums block mb-2">{"Got Questions?"}</span>
<h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">{"\n          Frequently Asked Questions\n        "}</h2>
</div>
<div className="space-y-4">
<div className="faq-item rounded-lg border border-border/90 bg-background overflow-hidden transition-all duration-200">
<Button className="h-auto whitespace-normal w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-foreground focus:outline-none" onClick={() => setFaq(faq === 0 ? null : 0)} aria-expanded={faq === 0} variant="ghost">
<span >{"Who is Trendōva AI built for?"}</span>
<ChevronDown className="size-5 shrink-0 text-muted-foreground/70 transform transition-transform duration-200 icon-arrow" aria-hidden="true" />
</Button>
<div className={"faq-content px-6 pb-6 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4" + (faq === 0 ? "" : " hidden")}>{"\n            Trendōva AI is designed for growing brands, streetwear labels, youth-focused businesses, creators, and marketing teams that want to discover relevant trends and create content that connects with their audience.\n          "}</div>
</div>
<div className="faq-item rounded-lg border border-border/90 bg-background overflow-hidden transition-all duration-200">
<Button className="h-auto whitespace-normal w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-foreground focus:outline-none" onClick={() => setFaq(faq === 1 ? null : 1)} aria-expanded={faq === 1} variant="ghost">
<span >{"Are these live social media trends?"}</span>
<ChevronDown className="size-5 shrink-0 text-muted-foreground/70 transform transition-transform duration-200 icon-arrow" aria-hidden="true" />
</Button>
<div className={"faq-content px-6 pb-6 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4" + (faq === 1 ? "" : " hidden")}>{"\n            Trend results depend on the data sources available to Trendōva AI. Examples shown in the demo may use sample data and should not be interpreted as live platform analytics. Where live trend data is available, Trendōva AI can help you explore relevant topics and content opportunities.\n          "}</div>
</div>
<div className="faq-item rounded-lg border border-border/90 bg-background overflow-hidden transition-all duration-200">
<Button className="h-auto whitespace-normal w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-foreground focus:outline-none" onClick={() => setFaq(faq === 2 ? null : 2)} aria-expanded={faq === 2} variant="ghost">
<span >{"Can I explore Trendōva AI without adding a brand?"}</span>
<ChevronDown className="size-5 shrink-0 text-muted-foreground/70 transform transition-transform duration-200 icon-arrow" aria-hidden="true" />
</Button>
<div className={"faq-content px-6 pb-6 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4" + (faq === 2 ? "" : " hidden")}>{"\n            Yes, the demo should let you explore the main features using a sample brand such as Aura Wear. You can understand the workflow before setting up your own brand profile.\n          "}</div>
</div>
<div className="faq-item rounded-lg border border-border/90 bg-background overflow-hidden transition-all duration-200">
<Button className="h-auto whitespace-normal w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-foreground focus:outline-none" onClick={() => setFaq(faq === 3 ? null : 3)} aria-expanded={faq === 3} variant="ghost">
<span >{"Does Trendōva AI guarantee results?"}</span>
<ChevronDown className="size-5 shrink-0 text-muted-foreground/70 transform transition-transform duration-200 icon-arrow" aria-hidden="true" />
</Button>
<div className={"faq-content px-6 pb-6 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4" + (faq === 3 ? "" : " hidden")}>{"\n            No tool can guarantee sales, reach, or engagement. Trendōva AI is designed to help you discover opportunities, create more relevant content, plan your posts, and learn from available performance insights. Actual results depend on your audience, content, product, and other factors.\n          "}</div>
</div>
<div className="faq-item rounded-lg border border-border/90 bg-background overflow-hidden transition-all duration-200">
<Button className="h-auto whitespace-normal w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-foreground focus:outline-none" onClick={() => setFaq(faq === 4 ? null : 4)} aria-expanded={faq === 4} variant="ghost">
<span >{"How does Brand Voice work?"}</span>
<ChevronDown className="size-5 shrink-0 text-muted-foreground/70 transform transition-transform duration-200 icon-arrow" aria-hidden="true" />
</Button>
<div className={"faq-content px-6 pb-6 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4" + (faq === 4 ? "" : " hidden")}>{"\n            Brand Voice captures your preferred tone, personality, and audience preferences. These details guide content generation so your posts feel more consistent with your brand.\n          "}</div>
</div>
<div className="faq-item rounded-lg border border-border/90 bg-background overflow-hidden transition-all duration-200">
<Button className="h-auto whitespace-normal w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-foreground focus:outline-none" onClick={() => setFaq(faq === 5 ? null : 5)} aria-expanded={faq === 5} variant="ghost">
<span >{"Why does all of this matter?"}</span>
<ChevronDown className="size-5 shrink-0 text-muted-foreground/70 transform transition-transform duration-200 icon-arrow" aria-hidden="true" />
</Button>
<div className={"faq-content px-6 pb-6 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4" + (faq === 5 ? "" : " hidden")}>{"\n            Because emotional connection drives loyalty. Brands that truly engage and don't just sell build communities. With our solutions, staying relevant isn't just a dream \u2014 it's reality.\n          "}</div>
</div>
</div>
</div>
</section>
<section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-foreground via-foreground to-primary text-primary-foreground">
<div className="max-w-5xl mx-auto px-6 text-center relative z-10">
<h2 className="text-3xl sm:text-5xl font-extrabold mb-6">{"\n        Your Next Great Campaign Starts Here.\n      "}</h2>
<p className="text-base sm:text-lg text-muted-foreground/50 max-w-2xl mx-auto mb-10 leading-relaxed">{"\n        Discover trends, create better content, and build a more consistent brand experience with Trendōva AI.\n      "}</p>
<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
<Button asChild variant="ghost" className="h-auto p-0"><a className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary hover:bg-primary text-primary-foreground font-medium text-sm shadow-reference transition-all duration-200 active:scale-95" href="#workspace">
<span >{"Explore Demo"}</span>
<ArrowRight className="size-5 shrink-0 text-[18px]" aria-hidden="true" />
</a></Button>
<Button asChild variant="ghost" className="h-auto p-0"><a className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-card/10 hover:bg-card/15 backdrop-blur-md border border-primary-foreground/20 text-primary-foreground font-medium text-sm transition-all duration-200 active:scale-95" href="#how-it-works">
<span >{"See How It Works"}</span>
<CirclePlay className="size-5 shrink-0 text-[18px]" aria-hidden="true" />
</a></Button>
</div>
</div>
</section>
<footer className="bg-card border-t border-border/80">
<div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
<div className="flex flex-col items-center md:items-start gap-2">
<div className="flex items-center gap-2.5">
<div className="w-7 h-7 aspect-square shrink-0 rounded-full overflow-hidden border border-foreground/15 bg-black"><img src="/trendova-logo.png" alt="" className="size-full object-cover" />
</div>
<span className="text-lg font-bold text-foreground">{"Trendōva AI"}</span>
</div>
<p className="text-xs text-muted-foreground text-center md:text-left max-w-sm">{"\n          AI marketing intelligence for brands that want to connect with their audience.\n        "}</p>
</div>
<div className="flex flex-wrap items-center justify-center gap-5 text-xs text-muted-foreground font-medium">
<a className="hover:text-primary transition-colors" href="#features">{"Features"}</a>
<a className="hover:text-primary transition-colors" href="#how-it-works">{"How It Works"}</a>
<a className="hover:text-primary transition-colors" href="#pricing">{"Pricing"}</a>
<a className="hover:text-primary transition-colors" href="#about">{"About"}</a>
<a className="hover:text-primary transition-colors" href="/login">{"Log In"}</a>
<a className="hover:text-primary transition-colors" href="#workspace">{"Explore Demo"}</a>
</div>
<div className="text-xs text-muted-foreground/70">{"\n        \u00a9 2026 Trendova AI. All rights reserved.\n      "}</div>
</div>
</footer>
</div>;
}
