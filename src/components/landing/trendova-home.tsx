import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { previewPrice } from "@/lib/nova/preview-pricing";

type Tab = "trend" | "writer" | "scheduler" | "personalization";
const variations = [
  '"Your new everyday essential just dropped. Oversized comfort, effortless style, and a fit that speaks for itself. Which color are you picking? Shop the drop — link in bio."',
  '"Heavyweight fleece. Tailored drape. Built for late nights and city streets. The 2026 Oversized Drop is officially live. Move fast."',
  '"Minimalist aesthetic, maximum texture. Aura Wear heavyweight hoodies just arrived in 4 neutral colorways. Link in bio to claim yours."',
];
const slots: Record<string, string> = {
  Mon: "2:15 PM",
  Tue: "5:30 PM",
  Wed: "6:45 PM",
  Thu: "7:15 PM",
  Fri: "8:00 PM",
  Sat: "1:30 PM",
  Sun: "4:00 PM",
};

/** Latest supplied Stitch screen; all interactions are illustrative and local. */
export function TrendovaHomepage() {
  const root = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [tab, setTab] = useState<Tab>("trend");
  const [menuOpen, setMenuOpen] = useState(false);
  const [faq, setFaq] = useState<number | null>(0);
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [platform, setPlatform] = useState("Instagram");
  const [variation, setVariation] = useState(0);
  const [caption, setCaption] = useState(variations[0] ?? "");
  const [editing, setEditing] = useState(false);
  const [day, setDay] = useState("Wed");
  const [annual, setAnnual] = useState(false);
  const [palette, setPalette] = useState("Pure White");
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => {
    const node = root.current;
    if (
      !node ||
      !window.IntersectionObserver ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1 },
    );
    node.classList.add("motion-ready");
    node
      .querySelectorAll(".scroll-reveal, .scroll-reveal-scale")
      .forEach((el) => observer.observe(el));
    node.querySelectorAll(".material-symbols-outlined").forEach(el => el.setAttribute("aria-hidden", "true"));
    return () => {
      observer.disconnect();
      timers.current.forEach(clearTimeout);
    };
  }, []);
  const scan = () => {
    setScanning(true);
    setTab("trend");
    timers.current.push(
      setTimeout(() => {
        setScanning(false);
        setScanned(true);
        toast.success("Sample scan refreshed");
      }, 700),
    );
  };
  const generate = () => {
    setGenerating(true);
    timers.current.push(
      setTimeout(() => {
        const next = (variation + 1) % variations.length;
        setVariation(next);
        setCaption(variations[next] ?? "");
        setGenerating(false);
      }, 400),
    );
  };
  const copy = async (event: MouseEvent<HTMLElement>) => {
    const scope = event.currentTarget.closest(".shimmer-card");
    const text =
      tab === "writer" && event.currentTarget.closest("#workspace")
        ? caption
        : (scope?.querySelector("p.mb-2\\.5")?.textContent ?? caption);
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Caption copied");
    } catch {
      toast.error("Could not copy. Select the caption and copy it manually.");
    }
  };
  return (
    <div
      ref={root}
      className={cn(
        "trendova-home min-h-screen bg-tone-canvas text-tone-text font-sans antialiased selection:bg-tone-fg selection:text-tone-bg",
        scanning && "is-scanning",
      )}
    >
      <header
        className="sticky top-0 z-50 pt-4 px-4 sm:px-6 transition-all duration-300"
        id="main-header"
      >
        <div
          className="max-w-7xl mx-auto backdrop-blur-2xl bg-tone-bg/70 border border-tone-800/80 rounded-full shadow-2xl px-5 sm:px-7 h-16 flex items-center justify-between transition-all duration-300 hover:border-tone-700/90"
          id="navbar-shell"
        >
          <Link
            to="/"
            className="flex items-center gap-3 group active:scale-[0.98] transition-transform"
          >
            <img className="size-8 object-contain" alt="Trendova AI" src="/trendova-logo.png" />
            <span className="text-lg font-bold text-tone-fg flex items-center gap-1.5 font-sans">
              {"Trend\u014dva AI"}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 bg-tone-900/70 p-1 rounded-full border border-tone-800/80 shadow-inner">
            <a
              className="text-tone-400 hover:text-tone-fg font-medium text-xs sm:text-[13px] px-4 py-1.5 rounded-full hover:bg-tone-800/80 transition-all duration-200"
              href="#features"
            >
              {"Features"}
            </a>
            <a
              className="text-tone-400 hover:text-tone-fg font-medium text-xs sm:text-[13px] px-4 py-1.5 rounded-full hover:bg-tone-800/80 transition-all duration-200"
              href="#how-it-works"
            >
              {"How It Works"}
            </a>
            <a
              className="text-tone-400 hover:text-tone-fg font-medium text-xs sm:text-[13px] px-4 py-1.5 rounded-full hover:bg-tone-800/80 transition-all duration-200"
              href="#pricing"
            >
              {"Pricing"}
            </a>
            <a
              className="text-tone-400 hover:text-tone-fg font-medium text-xs sm:text-[13px] px-4 py-1.5 rounded-full hover:bg-tone-800/80 transition-all duration-200"
              href="#about"
            >
              {"About"}
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-2.5">
            <Link
              to="/login"
              className="text-tone-400 text-xs sm:text-[13px] font-medium px-4 py-2 rounded-full hover:text-tone-fg hover:bg-tone-900 transition-all duration-200 active:scale-[0.98]"
            >
              {"Log In"}
            </Link>
            <a
              className="btn-shimmer group inline-flex items-center justify-center gap-1.5 text-xs sm:text-[13px] font-semibold text-tone-bg bg-tone-fg hover:bg-tone-200 rounded-full px-5 py-2.5 transition-all shadow-md active:scale-[0.98]"
              href="#workspace"
            >
              <span>{"Explore Demo"}</span>
              <span className="material-symbols-outlined text-[16px] transition-transform duration-200 group-hover:translate-x-0.5">
                {"arrow_forward"}
              </span>
            </a>
          </div>

          <Button
            variant="ghost"
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-tone-300 hover:bg-tone-900 transition-colors focus:outline-none active:scale-[0.98]"
            aria-label="Toggle Navigation Menu"
            id="mobile-menu-btn"
          >
            <span className="material-symbols-outlined text-[22px]" data-icon="menu">
              {"menu"}
            </span>
          </Button>
        </div>

        <div
          className={cn(
            " md: mt-2 mx-auto max-w-lg p-5 bg-tone-950 border border-tone-800/90 rounded-3xl shadow-2xl flex-col gap-3 transition-all",
            menuOpen ? "flex" : "hidden",
          )}
          id="mobile-menu"
        >
          <a
            onClick={() => setMenuOpen(false)}
            className="py-2.5 px-4 rounded-full text-tone-300 hover:text-tone-fg hover:bg-tone-900 font-medium text-sm transition-colors"
            href="#features"
          >
            {"Features"}
          </a>
          <a
            onClick={() => setMenuOpen(false)}
            className="py-2.5 px-4 rounded-full text-tone-300 hover:text-tone-fg hover:bg-tone-900 font-medium text-sm transition-colors"
            href="#how-it-works"
          >
            {"How It Works"}
          </a>
          <a
            onClick={() => setMenuOpen(false)}
            className="py-2.5 px-4 rounded-full text-tone-300 hover:text-tone-fg hover:bg-tone-900 font-medium text-sm transition-colors"
            href="#pricing"
          >
            {"Pricing"}
          </a>
          <a
            onClick={() => setMenuOpen(false)}
            className="py-2.5 px-4 rounded-full text-tone-300 hover:text-tone-fg hover:bg-tone-900 font-medium text-sm transition-colors"
            href="#about"
          >
            {"About"}
          </a>
          <div className="pt-3 border-t border-tone-800 flex flex-col gap-2">
            <Link
              to="/login"
              className="w-full text-center py-2.5 text-sm font-medium text-tone-300 border border-tone-800 rounded-full hover:bg-tone-900 active:scale-[0.98] transition-all"
            >
              {"Log In"}
            </Link>
            <a
              onClick={() => setMenuOpen(false)}
              className="btn-shimmer w-full text-center py-2.5 text-sm font-semibold text-tone-bg bg-tone-fg rounded-full shadow-lg active:scale-[0.98] transition-all"
              href="#workspace"
            >
              {"Explore Demo"}
            </a>
          </div>
        </div>
      </header>

      <section className="relative pt-16 md:pt-24 pb-14 md:pb-20 overflow-hidden grid-bg z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="scroll-reveal delay-100 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tone-900/90 border border-tone-800/90 shadow-sm mb-8 hover:border-tone-700 transition-all cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tone-fg opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tone-fg"></span>
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-tone-300 uppercase">
              {"BUILT FOR NEXT GENERATION BRANDS"}
            </span>
          </div>

          <h1 className="scroll-reveal delay-200 text-4xl sm:text-5xl md:text-6xl font-extrabold text-tone-fg max-w-4xl mx-auto mb-6 leading-[1.12]">
            {"\n  AI-Powered Marketing Intelligence for "}
            <span className="animated-gradient-text text-transparent bg-clip-text bg-gradient-to-r from-tone-fg via-tone-200 to-tone-400">
              {"Modern Brands."}
            </span>
          </h1>

          <p className="scroll-reveal delay-300 text-base sm:text-lg md:text-xl text-tone-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            {
              "Spot emerging trends. Create content that connects. Grow your brand with AI built for youth culture."
            }
          </p>

          <div className="scroll-reveal delay-400 flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14">
            <a
              className="btn-shimmer group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-tone-fg hover:bg-tone-200 text-tone-bg font-semibold text-sm shadow-xl transition-all duration-200 active:scale-[0.98]"
              href="#workspace"
            >
              <span>{"Explore Demo"}</span>
              <span
                className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:translate-x-1"
                data-icon="arrow_forward"
              >
                {"arrow_forward"}
              </span>
            </a>
            <a
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-tone-900/80 hover:bg-tone-800 border border-tone-700/70 text-tone-200 font-medium text-sm transition-all duration-200 active:scale-[0.98] hover:border-tone-500"
              href="#how-it-works"
            >
              <span>{"See How It Works"}</span>
              <span
                className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:scale-110"
                data-icon="play_circle"
              >
                {"play_circle"}
              </span>
            </a>
          </div>

          <div
            className="scroll-reveal-scale delay-500 max-w-6xl mx-auto rounded-[28px] border border-tone-800/90 bg-tone-950/90 backdrop-blur-2xl shadow-2xl p-4 sm:p-7 text-left transition-all hover:border-tone-700/90 shimmer-card"
            id="workspace"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-tone-800/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-tone-900 border border-tone-700/80 flex items-center justify-center text-tone-fg transition-transform hover:rotate-6">
                  <img
                    className="size-8 object-contain"
                    alt="Trendova AI"
                    src="/trendova-logo.png"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-tone-fg font-mono">
                      {"TREND\u014cVA WORKSPACE"}
                    </span>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-tone-900 text-tone-300 border border-tone-700 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
                      {"\n  Sample Preview\n"}
                    </span>
                  </div>
                  <p className="text-xs text-tone-400">
                    {"Your brand's marketing intelligence, unified."}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-tone-900/80 p-1.5 pl-3 rounded-full border border-tone-800 text-xs">
                <span className="text-tone-400 font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]" data-icon="storefront">
                    {"storefront"}
                  </span>
                  {"\n  Brand:\n"}
                </span>
                <span className="font-semibold text-tone-fg bg-tone-800 px-2.5 py-1 rounded-full border border-tone-700 shadow-xs">
                  {"Aura Wear"}
                </span>
                <span className="text-tone-500 hidden sm:inline">
                  {"\u2022 Streetwear & Gen Z"}
                </span>
                <Button
                  variant="ghost"
                  type="button"
                  onClick={scan}
                  disabled={scanning}
                  className="relative overflow-hidden bg-tone-fg hover:bg-tone-200 text-tone-bg font-semibold text-[11px] px-3.5 py-1 rounded-full transition-all flex items-center gap-1 ml-1 active:scale-[0.98] shadow-sm"
                  id="scan-trigger-btn"
                >
                  <span
                    className="material-symbols-outlined text-[13px] transition-transform duration-500"
                    data-icon="sync"
                    id="scan-btn-icon"
                  >
                    {"sync"}
                  </span>
                  <span id="scan-btn-label">{scanning ? "Scanning…" : "Scan Trends"}</span>
                </Button>
              </div>
            </div>

            <div
              className="flex items-center gap-2 py-4 border-b border-tone-800/80 overflow-x-auto custom-scrollbar"
              role="tablist"
              aria-label="Sample workspace"
            >
              <Button
                variant="ghost"
                type="button"
                role="tab"
                aria-selected={tab === "trend"}
                aria-controls="tab-panel-trend"
                onClick={() => setTab("trend")}
                className={cn(
                  "tab-btn px-4 py-2 rounded-full text-xs sm:text-[13px] gap-2 border transition-all",
                  tab === "trend"
                    ? "bg-tone-fg text-tone-bg border-tone-fg"
                    : "bg-tone-900 text-tone-400 border-tone-800 hover:bg-tone-800 hover:text-tone-fg",
                )}
                id="tab-btn-trend"
              >
                <span className="material-symbols-outlined text-[16px]" data-icon="radar">
                  {"radar"}
                </span>
                <span>{"Trend Scanner"}</span>
              </Button>
              <Button
                variant="ghost"
                type="button"
                role="tab"
                aria-selected={tab === "writer"}
                aria-controls="tab-panel-writer"
                onClick={() => setTab("writer")}
                className={cn(
                  "tab-btn px-4 py-2 rounded-full text-xs sm:text-[13px] gap-2 border transition-all",
                  tab === "writer"
                    ? "bg-tone-fg text-tone-bg border-tone-fg"
                    : "bg-tone-900 text-tone-400 border-tone-800 hover:bg-tone-800 hover:text-tone-fg",
                )}
                id="tab-btn-writer"
              >
                <span className="material-symbols-outlined text-[16px]" data-icon="auto_awesome">
                  {"auto_awesome"}
                </span>
                <span>{"AI Writer"}</span>
              </Button>
              <Button
                variant="ghost"
                type="button"
                role="tab"
                aria-selected={tab === "scheduler"}
                aria-controls="tab-panel-scheduler"
                onClick={() => setTab("scheduler")}
                className={cn(
                  "tab-btn px-4 py-2 rounded-full text-xs sm:text-[13px] gap-2 border transition-all",
                  tab === "scheduler"
                    ? "bg-tone-fg text-tone-bg border-tone-fg"
                    : "bg-tone-900 text-tone-400 border-tone-800 hover:bg-tone-800 hover:text-tone-fg",
                )}
                id="tab-btn-scheduler"
              >
                <span className="material-symbols-outlined text-[16px]" data-icon="calendar_month">
                  {"calendar_month"}
                </span>
                <span>{"Scheduler"}</span>
              </Button>
              <Button
                variant="ghost"
                type="button"
                role="tab"
                aria-selected={tab === "personalization"}
                aria-controls="tab-panel-personalization"
                onClick={() => setTab("personalization")}
                className={cn(
                  "tab-btn px-4 py-2 rounded-full text-xs sm:text-[13px] gap-2 border transition-all",
                  tab === "personalization"
                    ? "bg-tone-fg text-tone-bg border-tone-fg"
                    : "bg-tone-900 text-tone-400 border-tone-800 hover:bg-tone-800 hover:text-tone-fg",
                )}
                id="tab-btn-personalization"
              >
                <span className="material-symbols-outlined text-[16px]" data-icon="fingerprint">
                  {"fingerprint"}
                </span>
                <span>{"Personalization"}</span>
              </Button>
            </div>

            <div
              role="tabpanel"
              aria-labelledby="tab-btn-trend"
              className={cn(
                "workspace-panel pt-5 transition-opacity duration-300",
                tab !== "trend" && "hidden",
              )}
              id="tab-panel-trend"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-tone-900/50 border border-tone-800/90 flex flex-col justify-between hover:border-tone-600 transition-all duration-200 group">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-tone-400 uppercase font-mono">
                        {"Trend Scanner"}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-tone-800 text-tone-200 border border-tone-700 group-hover:border-tone-500 transition-colors">
                        {"Trend activity"}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-2xl font-bold font-mono text-tone-fg" id="metric-spike">
                        {scanned ? "+158%" : "+142%"}
                      </span>
                      <span className="text-xs text-tone-300 font-medium">{"Spike detected"}</span>
                    </div>
                    <p className="text-xs text-tone-400">
                      {"Spot rising conversations and style trends."}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-tone-800/80">
                    <div className="flex items-center justify-between text-[10px] text-tone-400 mb-1">
                      <span className="font-medium">{"Interest Over Time"}</span>
                      <span className="font-mono text-[9px] bg-tone-800 px-1.5 py-0.5 rounded border border-tone-700 text-tone-300">
                        {"Sample data"}
                      </span>
                    </div>
                    <div className="h-12 w-full relative flex items-end pb-3.5">
                      <svg className="w-full h-8 overflow-visible" fill="none" viewBox="0 0 100 32">
                        <line
                          stroke="var(--tone-800)"
                          strokeDasharray="2 2"
                          strokeWidth="1"
                          x1="0"
                          x2="100"
                          y1="28"
                          y2="28"
                        ></line>
                        <line
                          stroke="var(--tone-900)"
                          strokeWidth="1"
                          x1="0"
                          x2="100"
                          y1="14"
                          y2="14"
                        ></line>
                        <path
                          className="chart-path"
                          d="M4 25 L24 22 L48 15 L72 17 L96 4"
                          stroke="var(--tone-fg)"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></path>
                        <circle
                          className="hover:scale-150 transition-transform cursor-pointer"
                          cx="4"
                          cy="25"
                          fill="var(--tone-fg)"
                          r="2.5"
                        ></circle>
                        <circle
                          className="hover:scale-150 transition-transform cursor-pointer"
                          cx="24"
                          cy="22"
                          fill="var(--tone-fg)"
                          r="2.5"
                        ></circle>
                        <circle
                          className="hover:scale-150 transition-transform cursor-pointer"
                          cx="48"
                          cy="15"
                          fill="var(--tone-fg)"
                          r="2.5"
                        ></circle>
                        <circle
                          className="hover:scale-150 transition-transform cursor-pointer"
                          cx="72"
                          cy="17"
                          fill="var(--tone-fg)"
                          r="2.5"
                        ></circle>
                        <circle
                          className="hover:scale-150 transition-transform cursor-pointer"
                          cx="96"
                          cy="4"
                          fill="var(--tone-fg)"
                          r="3"
                          stroke="var(--tone-bg)"
                          strokeWidth="1"
                        ></circle>
                      </svg>
                      <div className="absolute bottom-0 inset-x-0 flex justify-between text-[9px] text-tone-500 font-mono">
                        <span>{"Mon"}</span>
                        <span>{"Tue"}</span>
                        <span>{"Wed"}</span>
                        <span>{"Thu"}</span>
                        <span>{"Fri"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-tone-900/50 border border-tone-800/90 flex flex-col justify-between hover:border-tone-600 transition-all duration-200">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-tone-400 uppercase font-mono">
                        {"AI Writer"}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-tone-300 bg-tone-800 border border-tone-700">
                        {"Illustrative estimate"}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-2xl font-bold font-mono text-tone-fg">{"4\u00d7"}</span>
                      <span className="text-xs text-tone-300 font-medium">
                        {"Engagement Potential"}
                      </span>
                    </div>
                    <p className="text-xs text-tone-400">
                      {"Create content designed to connect with your audience."}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-tone-800/80">
                    <div className="space-y-1.5 mb-1.5">
                      <div>
                        <div className="flex justify-between text-[10px] text-tone-400 mb-0.5">
                          <span>{"Standard Caption"}</span>
                          <span className="font-mono font-medium text-tone-500">
                            {"1.0\u00d7 baseline"}
                          </span>
                        </div>
                        <div className="w-full bg-tone-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-tone-600 h-full w-[25%] rounded-full transition-all duration-700"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] text-tone-200 font-medium mb-0.5">
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-tone-fg"></span>
                            {"Trend\u014dva AI-Assisted"}
                          </span>
                          <span className="font-mono font-bold text-tone-fg">
                            {"4.0\u00d7 (+300%)"}
                          </span>
                        </div>
                        <div className="w-full bg-tone-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-tone-fg h-full w-[100%] rounded-full transition-all duration-700"></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-[9px] text-tone-500 font-mono text-right">
                      {"Illustrative comparison \u00b7 Sample data"}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-tone-900/50 border border-tone-800/90 flex flex-col justify-between hover:border-tone-600 transition-all duration-200">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-tone-400 uppercase font-mono">
                        {"Brand Personality"}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-tone-300 bg-tone-800 border border-tone-700">
                        {"Sample data"}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-2xl font-bold font-mono text-tone-fg">{"94.8%"}</span>
                      <span className="text-xs text-tone-300 font-medium">
                        {"Brand voice match"}
                      </span>
                    </div>
                    <p className="text-xs text-tone-400">
                      {"Calibrated to culture & aesthetic criteria."}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-tone-800/80">
                    <div className="space-y-1.5 mb-1.5">
                      <div>
                        <div className="flex justify-between text-[10px] text-tone-300 mb-0.5">
                          <span className="font-medium">{"Casual"}</span>
                          <span className="font-mono text-tone-fg font-semibold">{"85%"}</span>
                        </div>
                        <div className="w-full bg-tone-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-tone-fg h-full w-[85%] rounded-full transition-all duration-700"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] text-tone-300 mb-0.5">
                          <span className="font-medium">{"Playful"}</span>
                          <span className="font-mono text-tone-300 font-semibold">{"60%"}</span>
                        </div>
                        <div className="w-full bg-tone-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-tone-400 h-full w-[60%] rounded-full transition-all duration-700"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] text-tone-300 mb-0.5">
                          <span className="font-medium">{"Formal"}</span>
                          <span className="font-mono text-tone-400 font-semibold">{"15%"}</span>
                        </div>
                        <div className="w-full bg-tone-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-tone-600 h-full w-[15%] rounded-full transition-all duration-700"></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-[9px] text-tone-500 font-mono text-right">
                      {"Sample brand preferences"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-tone-900/60 border border-tone-800/90 transition-all hover:border-tone-600">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div>
                    <h4 className="text-sm font-bold text-tone-fg flex items-center gap-2">
                      <span>{"Trending in Your Niche"}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-tone-800 text-tone-400 border border-tone-700">
                        {"Sample data"}
                      </span>
                    </h4>
                    <p className="text-xs text-tone-400">
                      {"Explore conversations and styles that could inspire your next post."}
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-tone-300 bg-tone-800/90 px-3 py-1 rounded-full border border-tone-700">
                    {"Updated just now"}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-tone-950/80 border border-tone-800 hover:border-tone-600 hover:shadow-lg transition-all flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono font-bold text-sm text-tone-fg group-hover:text-tone-200 transition-colors">
                          {"#AestheticCore"}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-tone-800 text-tone-fg border border-tone-700">
                          {"Trending"}
                        </span>
                      </div>
                      <p className="text-xs text-tone-400 leading-relaxed mb-4">
                        {
                          "\n  Minimal outfits, carefully styled details, and mood-driven visuals are inspiring a new wave of fashion content.\n"
                        }
                      </p>
                    </div>
                    <div className="pt-3 border-t border-tone-800/80">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5 text-xs text-tone-400">
                          <span
                            className="material-symbols-outlined text-[16px] text-tone-fg"
                            data-icon="trending_up"
                          >
                            {"trending_up"}
                          </span>
                          <span className="font-mono text-tone-fg font-semibold">{"+142%"}</span>
                          {" interest"}
                        </div>
                        <span className="text-[9px] font-mono text-tone-500">{"Sample data"}</span>
                      </div>
                      <div className="bg-tone-900/80 p-2 rounded-xl border border-tone-800 flex items-center justify-between gap-3">
                        <div className="h-7 flex-1 relative flex items-center">
                          <svg
                            className="w-full h-6 overflow-visible"
                            fill="none"
                            viewBox="0 0 80 20"
                          >
                            <line
                              stroke="var(--tone-800)"
                              strokeDasharray="2 2"
                              strokeWidth="0.75"
                              x1="0"
                              x2="80"
                              y1="18"
                              y2="18"
                            ></line>
                            <path
                              className="chart-path"
                              d="M2 16 L20 13 L40 9 L60 10 L78 2"
                              stroke="var(--tone-fg)"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.75"
                            ></path>
                            <circle cx="78" cy="2" fill="var(--tone-fg)" r="2"></circle>
                          </svg>
                        </div>
                        <Button
                          variant="ghost"
                          type="button"
                          onClick={() => setTab("writer")}
                          className="px-3 py-1.5 rounded-full text-xs font-medium text-tone-fg bg-tone-800 hover:bg-tone-fg hover:text-tone-bg transition-all duration-200 shrink-0 border border-tone-700 active:scale-[0.98]"
                        >
                          {"Explore Trend \u2192"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-tone-950/80 border border-tone-800 hover:border-tone-600 hover:shadow-lg transition-all flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono font-bold text-sm text-tone-fg group-hover:text-tone-200 transition-colors">
                          {"#OldMoneyStyle"}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-tone-800 text-tone-300 border border-tone-700">
                          {"Rising"}
                        </span>
                      </div>
                      <p className="text-xs text-tone-400 leading-relaxed mb-4">
                        {
                          "\n  Classic silhouettes, neutral tones, and timeless styling offer an opportunity for brands exploring an elevated aesthetic.\n"
                        }
                      </p>
                    </div>
                    <div className="pt-3 border-t border-tone-800/80">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5 text-xs text-tone-400">
                          <span
                            className="material-symbols-outlined text-[16px] text-tone-fg"
                            data-icon="trending_up"
                          >
                            {"trending_up"}
                          </span>
                          <span className="font-mono text-tone-fg font-semibold">{"+86%"}</span>
                          {" interest"}
                        </div>
                        <span className="text-[9px] font-mono text-tone-500">{"Sample data"}</span>
                      </div>
                      <div className="bg-tone-900/80 p-2 rounded-xl border border-tone-800 flex items-center justify-between gap-3">
                        <div className="h-7 flex-1 relative flex items-center">
                          <svg
                            className="w-full h-6 overflow-visible"
                            fill="none"
                            viewBox="0 0 80 20"
                          >
                            <line
                              stroke="var(--tone-800)"
                              strokeDasharray="2 2"
                              strokeWidth="0.75"
                              x1="0"
                              x2="80"
                              y1="18"
                              y2="18"
                            ></line>
                            <path
                              className="chart-path"
                              d="M2 16 L22 14 L42 11 L60 8 L78 3"
                              stroke="var(--tone-400)"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.75"
                            ></path>
                            <circle cx="78" cy="3" fill="var(--tone-fg)" r="2"></circle>
                          </svg>
                        </div>
                        <Button
                          variant="ghost"
                          type="button"
                          onClick={() => setTab("writer")}
                          className="px-3 py-1.5 rounded-full text-xs font-medium text-tone-fg bg-tone-800 hover:bg-tone-fg hover:text-tone-bg transition-all duration-200 shrink-0 border border-tone-700 active:scale-[0.98]"
                        >
                          {"Explore Trend \u2192"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              role="tabpanel"
              aria-labelledby="tab-btn-writer"
              className={cn(
                "workspace-panel  pt-5 transition-opacity duration-300",
                tab !== "writer" && "hidden",
              )}
              id="tab-panel-writer"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-5 p-5 rounded-3xl bg-tone-900/70 border border-tone-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-tone-400 uppercase font-mono">
                        {"Content Brief Input"}
                      </span>
                      <div
                        className="flex gap-1"
                        id="writer-platform-toggle"
                        role="group"
                        aria-label="Caption platform"
                      >
                        <Button
                          variant="ghost"
                          type="button"
                          aria-pressed={platform === "TikTok"}
                          onClick={() => setPlatform("TikTok")}
                          className={cn(
                            "platform-btn rounded-full px-2 py-0.5 text-[10px]",
                            platform === "TikTok"
                              ? "bg-tone-fg text-tone-bg"
                              : "bg-tone-800 text-tone-400",
                          )}
                        >
                          {"TikTok"}
                        </Button>
                        <Button
                          variant="ghost"
                          type="button"
                          aria-pressed={platform === "Instagram"}
                          onClick={() => setPlatform("Instagram")}
                          className={cn(
                            "platform-btn rounded-full px-2 py-0.5 text-[10px]",
                            platform === "Instagram"
                              ? "bg-tone-fg text-tone-bg"
                              : "bg-tone-800 text-tone-400",
                          )}
                        >
                          {"Instagram"}
                        </Button>
                        <Button
                          variant="ghost"
                          type="button"
                          aria-pressed={platform === "X"}
                          onClick={() => setPlatform("X")}
                          className={cn(
                            "platform-btn rounded-full px-2 py-0.5 text-[10px]",
                            platform === "X"
                              ? "bg-tone-fg text-tone-bg"
                              : "bg-tone-800 text-tone-400",
                          )}
                        >
                          {"X"}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2 mb-3">
                      <div className="p-3 rounded-2xl bg-tone-950 border border-tone-800 text-xs text-tone-300">
                        <span className="text-[10px] text-tone-500 block font-mono uppercase mb-0.5">
                          {"Brief:"}
                        </span>
                        {"Promote our new oversized hoodie."}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2.5 rounded-xl bg-tone-950 border border-tone-800">
                          <span className="text-[10px] text-tone-500 block font-mono uppercase">
                            {"Brand"}
                          </span>
                          <strong className="text-tone-fg">{"Aura Wear"}</strong>
                        </div>
                        <div className="p-2.5 rounded-xl bg-tone-950 border border-tone-800">
                          <span className="text-[10px] text-tone-500 block font-mono uppercase">
                            {"Tone"}
                          </span>
                          <strong className="text-tone-200">{"Bold & Playful"}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={generate}
                    disabled={generating}
                    className="btn-shimmer w-full py-2.5 rounded-full bg-tone-fg hover:bg-tone-200 text-tone-bg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-[0.98] group"
                    id="generate-caption-btn"
                  >
                    <span
                      className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover:rotate-45"
                      data-icon="auto_awesome"
                    >
                      {"auto_awesome"}
                    </span>
                    <span>{"Generate Caption"}</span>
                  </Button>
                </div>
                <div className="lg:col-span-7 p-5 rounded-3xl bg-tone-950 border border-tone-800 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-tone-800">
                      <span className="text-xs font-bold text-tone-fg flex items-center gap-1.5">
                        <span
                          className="material-symbols-outlined text-tone-fg text-[16px]"
                          data-icon="description"
                        >
                          {"description"}
                        </span>
                        {"Generated Caption Preview"}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-tone-800 text-tone-300 border border-tone-700 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                        {"Sample caption"}
                      </span>
                    </div>
                    <div
                      className="p-4 rounded-2xl bg-tone-900/60 border border-tone-800 text-xs text-tone-200 leading-relaxed font-sans transition-all duration-300"
                      id="caption-preview-box"
                    >
                      {editing ? (
                        <div className="space-y-3">
                          <textarea
                            aria-label="Edit sample caption"
                            className="w-full min-h-28 rounded-lg border border-tone-700 bg-tone-950 p-3 text-tone-100"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                          />
                          <Button
                            variant="ghost"
                            className="bg-tone-fg text-tone-bg"
                            onClick={() => setEditing(false)}
                          >
                            Save Caption
                          </Button>
                        </div>
                      ) : (
                        <p id="caption-text-content" className="mb-3 leading-relaxed">
                          {caption}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-tone-800">
                        <span className="px-2.5 py-0.5 rounded-full bg-tone-800 border border-tone-700 text-[10px] font-mono text-tone-300">
                          {"#AuraWear"}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-tone-800 border border-tone-700 text-[10px] font-mono text-tone-300">
                          {"#Streetwear"}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-tone-800 border border-tone-700 text-[10px] font-mono text-tone-300">
                          {"#OOTD"}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-tone-800 border border-tone-700 text-[10px] font-mono text-tone-300">
                          {"#StreetStyle"}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-tone-800 border border-tone-700 text-[10px] font-mono text-tone-300">
                          {"#NewDrop"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 mt-3 border-t border-tone-800 flex flex-wrap items-center justify-between gap-2">
                    <span
                      className="text-[11px] text-tone-500 font-mono"
                      id="preset-counter"
                    >{`Preset: Aura Wear Street · ${variation + 1}/3 · ${platform}`}</span>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        type="button"
                        onClick={copy}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-tone-700 bg-tone-900 text-tone-300 hover:text-tone-fg hover:bg-tone-800 transition-all active:scale-[0.98] copy-btn shadow-xs"
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {"content_copy"}
                        </span>
                        <span>{"Copy Caption"}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        type="button"
                        onClick={() => {
                          setTab("writer");
                          setEditing(true);
                          document
                            .getElementById("workspace")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-tone-700 bg-tone-900 text-tone-300 hover:text-tone-fg hover:bg-tone-800 transition-all active:scale-[0.98] shadow-xs"
                      >
                        <span className="material-symbols-outlined text-[14px]">{"edit"}</span>
                        <span>{"Edit Caption"}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        type="button"
                        onClick={() => setTab("scheduler")}
                        className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-tone-fg text-tone-bg hover:bg-tone-200 transition-all active:scale-[0.98] shadow-xs"
                      >
                        {"Send to Scheduler"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              role="tabpanel"
              aria-labelledby="tab-btn-scheduler"
              className={cn(
                "workspace-panel  pt-5 transition-opacity duration-300",
                tab !== "scheduler" && "hidden",
              )}
              id="tab-panel-scheduler"
            >
              <div className="p-5 rounded-3xl bg-tone-900/60 border border-tone-800">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <h4 className="text-sm font-bold text-tone-fg">
                      {"Week Overview & Optimal Slot"}
                    </h4>
                    <p className="text-xs text-tone-400">
                      {"Algorithmic recommendation based on past audience interactions."}
                    </p>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium bg-tone-800 text-tone-200 border border-tone-700"
                    id="slot-banner"
                  >{`Recommended: ${day} @ ${slots[day]}`}</span>
                </div>

                <div
                  className="grid grid-cols-7 gap-2 text-center mb-4"
                  id="calendar-days"
                  role="group"
                  aria-label="Sample posting day"
                >
                  <Button
                    variant="ghost"
                    type="button"
                    aria-pressed={day === "Mon"}
                    className={cn(
                      "calendar-day-cell flex flex-col p-3 rounded-2xl border text-xs transition-all",
                      day === "Mon"
                        ? "selected-day bg-tone-fg text-tone-bg border-tone-fg"
                        : "bg-tone-950 border-tone-800 text-tone-300 hover:border-tone-700",
                    )}
                    onClick={() => setDay("Mon")}
                  >
                    <span className="text-tone-500 block font-medium">{"Mon"}</span>
                    <span className="text-sm font-bold text-tone-300 mt-1 block">{"14"}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-tone-700 mx-auto mt-2 block"></span>
                  </Button>
                  <Button
                    variant="ghost"
                    type="button"
                    aria-pressed={day === "Tue"}
                    className={cn(
                      "calendar-day-cell flex flex-col p-3 rounded-2xl border text-xs transition-all",
                      day === "Tue"
                        ? "selected-day bg-tone-fg text-tone-bg border-tone-fg"
                        : "bg-tone-950 border-tone-800 text-tone-300 hover:border-tone-700",
                    )}
                    onClick={() => setDay("Tue")}
                  >
                    <span className="text-tone-500 block font-medium">{"Tue"}</span>
                    <span className="text-sm font-bold text-tone-300 mt-1 block">{"15"}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-tone-700 mx-auto mt-2 block"></span>
                  </Button>
                  <Button
                    variant="ghost"
                    type="button"
                    aria-pressed={day === "Wed"}
                    className={cn(
                      "calendar-day-cell flex flex-col p-3 rounded-2xl border text-xs transition-all",
                      day === "Wed"
                        ? "selected-day bg-tone-fg text-tone-bg border-tone-fg"
                        : "bg-tone-950 border-tone-800 text-tone-300 hover:border-tone-700",
                    )}
                    onClick={() => setDay("Wed")}
                  >
                    <span className="text-tone-700 block font-medium">{"Wed"}</span>
                    <span className="text-sm font-bold mt-1 block text-tone-bg">{"16"}</span>
                    <span className="w-2 h-2 rounded-full bg-tone-bg mx-auto mt-2 block"></span>
                  </Button>
                  <Button
                    variant="ghost"
                    type="button"
                    aria-pressed={day === "Thu"}
                    className={cn(
                      "calendar-day-cell flex flex-col p-3 rounded-2xl border text-xs transition-all",
                      day === "Thu"
                        ? "selected-day bg-tone-fg text-tone-bg border-tone-fg"
                        : "bg-tone-950 border-tone-800 text-tone-300 hover:border-tone-700",
                    )}
                    onClick={() => setDay("Thu")}
                  >
                    <span className="text-tone-500 block font-medium">{"Thu"}</span>
                    <span className="text-sm font-bold text-tone-300 mt-1 block">{"17"}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-tone-700 mx-auto mt-2 block"></span>
                  </Button>
                  <Button
                    variant="ghost"
                    type="button"
                    aria-pressed={day === "Fri"}
                    className={cn(
                      "calendar-day-cell flex flex-col p-3 rounded-2xl border text-xs transition-all",
                      day === "Fri"
                        ? "selected-day bg-tone-fg text-tone-bg border-tone-fg"
                        : "bg-tone-950 border-tone-800 text-tone-300 hover:border-tone-700",
                    )}
                    onClick={() => setDay("Fri")}
                  >
                    <span className="text-tone-500 block font-medium">{"Fri"}</span>
                    <span className="text-sm font-bold text-tone-300 mt-1 block">{"18"}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-tone-400 mx-auto mt-2 block"></span>
                  </Button>
                  <Button
                    variant="ghost"
                    type="button"
                    aria-pressed={day === "Sat"}
                    className={cn(
                      "calendar-day-cell flex flex-col p-3 rounded-2xl border text-xs transition-all",
                      day === "Sat"
                        ? "selected-day bg-tone-fg text-tone-bg border-tone-fg"
                        : "bg-tone-950 border-tone-800 text-tone-300 hover:border-tone-700",
                    )}
                    onClick={() => setDay("Sat")}
                  >
                    <span className="text-tone-500 block font-medium">{"Sat"}</span>
                    <span className="text-sm font-bold text-tone-300 mt-1 block">{"19"}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-tone-700 mx-auto mt-2 block"></span>
                  </Button>
                  <Button
                    variant="ghost"
                    type="button"
                    aria-pressed={day === "Sun"}
                    className={cn(
                      "calendar-day-cell flex flex-col p-3 rounded-2xl border text-xs transition-all",
                      day === "Sun"
                        ? "selected-day bg-tone-fg text-tone-bg border-tone-fg"
                        : "bg-tone-950 border-tone-800 text-tone-300 hover:border-tone-700",
                    )}
                    onClick={() => setDay("Sun")}
                  >
                    <span className="text-tone-500 block font-medium">{"Sun"}</span>
                    <span className="text-sm font-bold text-tone-300 mt-1 block">{"20"}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-tone-700 mx-auto mt-2 block"></span>
                  </Button>
                </div>

                <div className="p-3.5 rounded-2xl bg-tone-950 border border-tone-800 flex items-center justify-between hover:border-tone-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-tone-800 text-tone-fg flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]" data-icon="insights">
                        {"insights"}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-tone-fg">
                        {"Post Performance: More people are engaging this week"}
                      </span>
                      <span className="text-[11px] text-tone-400 font-medium block">
                        {"(+12% engagement over previous benchmark)"}
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono text-tone-400 bg-tone-900 border border-tone-800">
                    {"Sample data"}
                  </span>
                </div>
              </div>
            </div>

            <div
              role="tabpanel"
              aria-labelledby="tab-btn-personalization"
              className={cn(
                "workspace-panel  pt-5 transition-opacity duration-300",
                tab !== "personalization" && "hidden",
              )}
              id="tab-panel-personalization"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 rounded-3xl bg-tone-900/60 border border-tone-800">
                  <h4 className="text-xs font-bold uppercase text-tone-400 font-mono mb-3">
                    {"Brand Voice Calibration"}
                  </h4>
                  <div className="space-y-3.5">
                    <div>
                      <div className="flex justify-between text-xs font-medium text-tone-300 mb-1">
                        <span>{"Casual"}</span>
                        <span className="text-tone-fg font-mono">{"85%"}</span>
                      </div>
                      <div className="w-full bg-tone-800 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-tone-fg h-full w-[85%] rounded-full transition-all duration-700"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-medium text-tone-300 mb-1">
                        <span>{"Formal"}</span>
                        <span className="text-tone-400 font-mono">{"15%"}</span>
                      </div>
                      <div className="w-full bg-tone-800 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-tone-600 h-full w-[15%] rounded-full duration-700"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-medium text-tone-300 mb-1">
                        <span>{"Playful"}</span>
                        <span className="text-tone-300 font-mono">{"60%"}</span>
                      </div>
                      <div className="w-full bg-tone-800 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-tone-400 h-full w-[60%] rounded-full transition-all duration-700"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-3xl bg-tone-950 border border-tone-800 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase text-tone-400 font-mono mb-3">
                      {"Audience & Palette Profile"}
                    </h4>
                    <div className="p-3.5 rounded-2xl bg-tone-900/70 border border-tone-800 mb-3">
                      <span className="text-[11px] text-tone-500 block uppercase font-mono">
                        {"Target Audience"}
                      </span>
                      <span className="text-xs font-bold text-tone-fg">
                        {"Age group: 18\u201324"}
                      </span>
                      <p className="text-[11px] text-tone-400 mt-0.5">
                        {"Culture-forward, streetwear enthusiasts, modern aesthetics."}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-medium text-tone-400">{"Visual Palette:"}</span>
                      <div className="flex gap-2 items-center">
                        <Button
                          variant="ghost"
                          type="button"
                          aria-label="Pure White"
                          onClick={() => setPalette("Pure White")}
                          aria-pressed={palette === "Pure White"}
                          className="w-5 h-5 rounded-full bg-tone-fg border border-tone-700 shadow-xs hover:scale-125 transition-transform"
                          title="Pure White"
                        ></Button>
                        <Button
                          variant="ghost"
                          type="button"
                          aria-label="Silver"
                          onClick={() => setPalette("Silver")}
                          aria-pressed={palette === "Silver"}
                          className="w-5 h-5 rounded-full bg-tone-400 border border-tone-700 shadow-xs hover:scale-125 transition-transform"
                          title="Silver"
                        ></Button>
                        <Button
                          variant="ghost"
                          type="button"
                          aria-label="Obsidian"
                          onClick={() => setPalette("Obsidian")}
                          aria-pressed={palette === "Obsidian"}
                          className="w-5 h-5 rounded-full bg-tone-800 border border-tone-700 shadow-xs hover:scale-125 transition-transform"
                          title="Obsidian"
                        ></Button>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-tone-800 flex justify-end">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-tone-800 text-tone-200 border border-tone-700 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px] text-tone-fg">
                        {"lock"}
                      </span>
                      {"\n  Sample brand identity\n"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-20 md:py-28 bg-tone-deep border-y border-tone-800/80 relative z-10"
        id="features"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="scroll-reveal text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-tone-fg mb-4">
              {"\n  Explore Trend\u014dva AI Features\n"}
            </h2>
            <p className="text-base sm:text-lg text-tone-400 leading-relaxed">
              {
                "\n  From discovering trends to creating, scheduling, and personalizing content, Trend\u014dva AI brings your essential marketing capabilities together in \n  "
              }
              <span className="inline-block px-3 py-0.5 rounded-full bg-tone-900 text-tone-200 font-medium border border-tone-700">
                {"one workspace"}
              </span>
              {".\n"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="scroll-reveal delay-100 shimmer-card rounded-3xl border border-tone-800 bg-tone-card p-7 sm:p-9 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-tone-900 border border-tone-700/80 text-tone-fg flex items-center justify-center mb-6 shadow-sm group-hover:border-tone-500 transition-colors">
                  <span className="material-symbols-outlined text-[28px]" data-icon="radar">
                    {"radar"}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-tone-fg mb-2.5">{"Trend Scanner"}</h3>
                <p className="text-base text-tone-400 leading-relaxed mb-6">
                  {
                    "\n  Discover what's trending by exploring emerging topics and conversations across social platforms.\n"
                  }
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-tone-950 border border-tone-800 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-tone-fg"></span>
                    <span className="text-xs font-semibold text-tone-300">
                      {"Aura Wear \u2022 #Streetwear"}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-tone-900 border border-tone-800 text-tone-400">
                    {"Sample trend graph"}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-tone-900/60 border border-tone-800">
                  <div className="flex items-baseline justify-between mb-2">
                    <div>
                      <span className="font-mono text-xs font-bold text-tone-fg">
                        {"#Streetwear Engagement Trend"}
                      </span>
                      <span className="text-[11px] text-tone-300 font-semibold block">
                        {"+92% conversation rate vs benchmark"}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-tone-500">{"Mon\u2013Fri"}</span>
                  </div>
                  <div className="h-12 w-full relative flex items-end pb-3">
                    <svg className="w-full h-8 overflow-visible" fill="none" viewBox="0 0 100 28">
                      <line
                        stroke="var(--tone-800)"
                        strokeDasharray="2 2"
                        strokeWidth="1"
                        x1="0"
                        x2="100"
                        y1="24"
                        y2="24"
                      ></line>
                      <path
                        className="chart-path"
                        d="M2 22 L24 19 L48 14 L72 15 L98 3"
                        stroke="var(--tone-fg)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></path>
                      <circle
                        className="hover:scale-150 transition-transform cursor-pointer"
                        cx="2"
                        cy="22"
                        fill="var(--tone-fg)"
                        r="2"
                      ></circle>
                      <circle
                        className="hover:scale-150 transition-transform cursor-pointer"
                        cx="24"
                        cy="19"
                        fill="var(--tone-fg)"
                        r="2"
                      ></circle>
                      <circle
                        className="hover:scale-150 transition-transform cursor-pointer"
                        cx="48"
                        cy="14"
                        fill="var(--tone-fg)"
                        r="2"
                      ></circle>
                      <circle
                        className="hover:scale-150 transition-transform cursor-pointer"
                        cx="72"
                        cy="15"
                        fill="var(--tone-fg)"
                        r="2"
                      ></circle>
                      <circle
                        className="hover:scale-150 transition-transform cursor-pointer"
                        cx="98"
                        cy="3"
                        fill="var(--tone-fg)"
                        r="2.5"
                        stroke="var(--tone-bg)"
                        strokeWidth="1"
                      ></circle>
                    </svg>
                    <div className="absolute bottom-0 inset-x-0 flex justify-between text-[9px] text-tone-500 font-mono">
                      <span>{"Mon"}</span>
                      <span>{"Tue"}</span>
                      <span>{"Wed"}</span>
                      <span>{"Thu"}</span>
                      <span>{"Fri"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="scroll-reveal delay-200 shimmer-card rounded-3xl border border-tone-800 bg-tone-card p-7 sm:p-9 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-tone-900 border border-tone-700/80 text-tone-fg flex items-center justify-center mb-6 shadow-sm group-hover:border-tone-500 transition-colors">
                  <span className="material-symbols-outlined text-[28px]" data-icon="auto_awesome">
                    {"auto_awesome"}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-tone-fg mb-2.5">{"AI Writer"}</h3>
                <p className="text-base text-tone-400 leading-relaxed mb-6">
                  {
                    "\n  Create captions, advertising copy, and social media post ideas in your brand's own voice.\n"
                  }
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-tone-950 border border-tone-800 shadow-xs">
                <div className="flex flex-wrap items-center justify-between text-[11px] text-tone-400 mb-2.5 gap-1.5">
                  <div>
                    <strong className="text-tone-fg">{"Brand:"}</strong>
                    {" Aura Wear "}
                    <span className="text-tone-600">{"|"}</span>
                    <strong className="text-tone-fg">{"Platform:"}</strong>
                    {" Instagram"}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-tone-900 text-tone-300 font-medium text-[11px] border border-tone-700">
                    {"Tone: Bold & Playful"}
                  </span>
                </div>
                <div className="text-[11px] text-tone-400 mb-2 font-mono bg-tone-900 px-2.5 py-1 rounded-lg border border-tone-800">
                  <span className="text-tone-500">{"Content brief:"}</span>
                  {" Promote our new oversized hoodie."}
                </div>
                <div className="p-3.5 rounded-xl bg-tone-900/60 border border-tone-800 text-xs text-tone-200 leading-relaxed font-sans mb-3">
                  <p className="mb-2.5 font-medium">
                    {
                      '"Your new everyday essential just dropped. Oversized comfort, effortless style, and a fit that speaks for itself. Which color are you picking? Shop the drop \u2014 link in bio."'
                    }
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-tone-800">
                    <span className="px-2 py-0.5 rounded-full bg-tone-800 border border-tone-700 text-[10px] font-mono text-tone-300">
                      {"#AuraWear"}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-tone-800 border border-tone-700 text-[10px] font-mono text-tone-300">
                      {"#Streetwear"}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-tone-800 border border-tone-700 text-[10px] font-mono text-tone-300">
                      {"#OOTD"}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-tone-800 border border-tone-700 text-[10px] font-mono text-tone-300">
                      {"#StreetStyle"}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-tone-800 border border-tone-700 text-[10px] font-mono text-tone-300">
                      {"#NewDrop"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <span className="text-[10px] text-tone-500 font-mono">
                    {"Aura Wear Preset \u00b7 Sample caption"}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={copy}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-tone-700 bg-tone-900 text-tone-300 hover:text-tone-fg hover:bg-tone-800 transition-all active:scale-[0.98] copy-btn shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {"content_copy"}
                      </span>
                      <span>{"Copy Caption"}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={() => {
                        setTab("writer");
                        setEditing(true);
                        document
                          .getElementById("workspace")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-tone-700 bg-tone-900 text-tone-300 hover:text-tone-fg hover:bg-tone-800 transition-all active:scale-[0.98] shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[14px]">{"edit"}</span>
                      <span>{"Edit Caption"}</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="scroll-reveal delay-300 shimmer-card rounded-3xl border border-tone-800 bg-tone-card p-7 sm:p-9 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-tone-900 border border-tone-700/80 text-tone-fg flex items-center justify-center mb-6 shadow-sm group-hover:border-tone-500 transition-colors">
                  <span
                    className="material-symbols-outlined text-[28px]"
                    data-icon="calendar_month"
                  >
                    {"calendar_month"}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-tone-fg mb-2.5">{"Scheduler & Analyzer"}</h3>
                <p className="text-base text-tone-400 leading-relaxed mb-6">
                  {
                    "\n  Plan your content, explore recommended posting times, and understand how your posts are performing.\n"
                  }
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-tone-950 border border-tone-800 shadow-xs">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-semibold text-tone-300">
                    {"Week Overview (Selected: Wednesday)"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-tone-900 border border-tone-700 text-tone-300 font-mono text-[10px]">
                    {"Optimal: 6:45 PM"}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-tone-900/60 border border-tone-800 mb-2.5">
                  <p className="text-xs font-medium text-tone-300">
                    {"Post Performance: More people are engaging this week (+12% engagement)"}
                  </p>
                </div>
                <div className="flex justify-end">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-tone-500 bg-tone-900 border border-tone-800">
                    {"Sample data"}
                  </span>
                </div>
              </div>
            </div>

            <div className="scroll-reveal delay-400 shimmer-card rounded-3xl border border-tone-800 bg-tone-card p-7 sm:p-9 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-tone-900 border border-tone-700/80 text-tone-fg flex items-center justify-center mb-6 shadow-sm group-hover:border-tone-500 transition-colors">
                  <span className="material-symbols-outlined text-[28px]" data-icon="fingerprint">
                    {"fingerprint"}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-tone-fg mb-2.5">
                  {"Personalization Engine"}
                </h3>
                <p className="text-base text-tone-400 leading-relaxed mb-6">
                  {
                    "\n  Tailor every piece of content to your brand's style, tone, colors, and audience preferences.\n"
                  }
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-tone-950 border border-tone-800 shadow-xs">
                <div className="space-y-2 mb-3">
                  <div>
                    <div className="flex justify-between text-[11px] font-medium text-tone-400 mb-0.5">
                      <span>{"Casual (85%)"}</span>
                      <span className="text-tone-fg">{"Primary"}</span>
                    </div>
                    <div className="w-full bg-tone-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-tone-fg h-full w-[85%] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-medium text-tone-400 mb-0.5">
                      <span>{"Formal (15%)"}</span>
                      <span className="text-tone-400">{"Minimal"}</span>
                    </div>
                    <div className="w-full bg-tone-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-tone-600 h-full w-[15%] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-medium text-tone-400 mb-0.5">
                      <span>{"Playful (60%)"}</span>
                      <span className="text-tone-300">{"Balanced"}</span>
                    </div>
                    <div className="w-full bg-tone-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-tone-400 h-full w-[60%] rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-tone-800 flex items-center justify-between text-xs">
                  <span className="text-tone-400 font-medium">
                    {"Target Audience: "}
                    <strong className="text-tone-fg">{"Age group: 18\u201324"}</strong>
                  </span>
                  <div className="flex gap-1.5 items-center">
                    <span className="w-3.5 h-3.5 rounded-full bg-tone-fg" title="White"></span>
                    <span className="w-3.5 h-3.5 rounded-full bg-tone-400" title="Silver"></span>
                    <span
                      className="w-3.5 h-3.5 rounded-full bg-tone-800 border border-tone-600"
                      title="Jet Black"
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-tone-canvas relative z-10" id="how-it-works">
        <div className="max-w-7xl mx-auto px-6">
          <div className="scroll-reveal text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-tone-fg mb-4">
              {"\n  From Trend to Takeoff\n"}
            </h2>
            <p className="text-base sm:text-lg text-tone-400 leading-relaxed">
              {
                "\n  Four connected capabilities help you move from discovering an opportunity to creating and scaling high-performing marketing content.\n"
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="scroll-reveal delay-100 shimmer-card p-6 rounded-3xl bg-tone-950 border border-tone-800 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-2xl font-extrabold text-tone-fg group-hover:scale-110 transition-transform">
                    {"01"}
                  </span>
                  <div className="w-9 h-9 rounded-2xl bg-tone-900 border border-tone-700/80 text-tone-fg flex items-center justify-center group-hover:border-tone-500 transition-colors">
                    <span className="material-symbols-outlined text-[20px]" data-icon="search">
                      {"search"}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-tone-fg mb-2">{"Discover Trends"}</h3>
                <p className="text-xs text-tone-400 leading-relaxed mb-6">
                  {
                    "\n  Trend\u014dva AI helps you explore emerging trends and conversations across social platforms, then surface high-impact concepts.\n"
                  }
                </p>
              </div>
              <div className="pt-4 border-t border-tone-800/80">
                <div className="flex flex-wrap gap-1.5 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-tone-900 text-[10px] text-tone-300 font-medium border border-tone-800">
                    {"Instagram"}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-tone-900 text-[10px] text-tone-300 font-medium border border-tone-800">
                    {"TikTok"}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-tone-900 text-[10px] text-tone-300 font-medium border border-tone-800">
                    {"Reddit"}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-tone-900 text-[10px] text-tone-300 font-medium border border-tone-800">
                    {"X"}
                  </span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-tone-900/60 border border-tone-800 font-mono text-[11px] text-tone-200">
                  {"\n  Sample: #Streetwear\n"}
                </div>
              </div>
            </div>

            <div className="scroll-reveal delay-200 shimmer-card p-6 rounded-3xl bg-tone-950 border border-tone-800 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-2xl font-extrabold text-tone-fg group-hover:scale-110 transition-transform">
                    {"02"}
                  </span>
                  <div className="w-9 h-9 rounded-2xl bg-tone-900 border border-tone-700/80 text-tone-fg flex items-center justify-center group-hover:border-tone-500 transition-colors">
                    <span className="material-symbols-outlined text-[20px]" data-icon="edit">
                      {"edit"}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-tone-fg mb-2">{"Create Content"}</h3>
                <p className="text-xs text-tone-400 leading-relaxed mb-6">
                  {
                    "\n  Turn raw ideas into captions, advertising copy, and social media posts written in your authentic brand voice.\n"
                  }
                </p>
              </div>
              <div className="pt-4 border-t border-tone-800/80">
                <div className="p-2 rounded-xl bg-tone-900/60 border border-tone-800 text-[11px] text-tone-300 mb-2 truncate">
                  {'\n  "Promote our new oversized hoodie."\n'}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-tone-400 font-semibold">
                    {"1-4 micro flow"}
                  </span>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={copy}
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-tone-900 border border-tone-700 text-tone-300 copy-btn hover:text-tone-fg transition-all active:scale-[0.98]"
                    >
                      {"Copy"}
                    </Button>
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={() => {
                        setTab("writer");
                        setEditing(true);
                        document
                          .getElementById("workspace")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-tone-900 border border-tone-700 text-tone-300 hover:text-tone-fg transition-all active:scale-[0.98]"
                    >
                      {"Edit"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="scroll-reveal delay-300 shimmer-card p-6 rounded-3xl bg-tone-950 border border-tone-800 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-2xl font-extrabold text-tone-fg group-hover:scale-110 transition-transform">
                    {"03"}
                  </span>
                  <div className="w-9 h-9 rounded-2xl bg-tone-900 border border-tone-700/80 text-tone-fg flex items-center justify-center group-hover:border-tone-500 transition-colors">
                    <span className="material-symbols-outlined text-[20px]" data-icon="schedule">
                      {"schedule"}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-tone-fg mb-2">{"Schedule & Analyze"}</h3>
                <p className="text-xs text-tone-400 leading-relaxed mb-6">
                  {
                    "\n  Find suggested posting times, organize your content calendar, and learn from available performance insights.\n"
                  }
                </p>
              </div>
              <div className="pt-4 border-t border-tone-800/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-tone-900 border border-tone-700 text-tone-300 text-[10px] font-medium">
                    {"6:45 PM recommendation"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-tone-500">
                  <span>{"Calendar snippet"}</span>
                  <span>{"Sample data"}</span>
                </div>
              </div>
            </div>

            <div className="scroll-reveal delay-400 shimmer-card p-6 rounded-3xl bg-tone-950 border border-tone-800 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-2xl font-extrabold text-tone-fg group-hover:scale-110 transition-transform">
                    {"04"}
                  </span>
                  <div className="w-9 h-9 rounded-2xl bg-tone-900 border border-tone-700/80 text-tone-fg flex items-center justify-center group-hover:border-tone-500 transition-colors">
                    <span className="material-symbols-outlined text-[20px]" data-icon="tune">
                      {"tune"}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-tone-fg mb-2">{"Personalize Everything"}</h3>
                <p className="text-xs text-tone-400 leading-relaxed mb-6">
                  {
                    "\n  Save your brand's tone, identity, visual style, and audience preferences so every generated post feels cohesive.\n"
                  }
                </p>
              </div>
              <div className="pt-4 border-t border-tone-800/80">
                <div className="p-2 rounded-xl bg-tone-900/60 border border-tone-800 text-[11px] text-tone-300 flex items-center justify-between">
                  <span>{"Aura Wear"}</span>
                  <span className="font-medium text-tone-fg">{"Bold & Playful"}</span>
                </div>
                <div className="text-[10px] text-tone-500 mt-1 font-mono">
                  {"18\u201324 age group summary"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-20 md:py-28 bg-tone-deep border-y border-tone-800/80 relative z-10"
        id="pricing"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="scroll-reveal text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-tone-fg mb-3">
              {"\n  Plans for Every Stage\n"}
            </h2>
            <p className="text-sm sm:text-base text-tone-400 mb-6">
              {"\n  Illustrative pricing \u2014 subject to final launch plans.\n"}
            </p>

            <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-tone-900/90 border border-tone-800 shadow-inner">
              <Button
                variant="ghost"
                type="button"
                aria-pressed={annual === false}
                onClick={() => setAnnual(false)}
                className={cn(
                  "pricing-toggle-btn px-4 py-1.5 rounded-full text-xs",
                  annual === false ? "bg-tone-fg text-tone-bg" : "text-tone-400 hover:text-tone-fg",
                )}
                id="billing-monthly-btn"
              >
                {"\n  Monthly Billing\n"}
              </Button>
              <Button
                variant="ghost"
                type="button"
                aria-pressed={annual === true}
                onClick={() => setAnnual(true)}
                className={cn(
                  "pricing-toggle-btn px-4 py-1.5 rounded-full text-xs",
                  annual === true ? "bg-tone-fg text-tone-bg" : "text-tone-400 hover:text-tone-fg",
                )}
                id="billing-annual-btn"
              >
                {"\n  Annual Billing\n  "}
                <span className="px-2 py-0.5 rounded-full bg-tone-800 border border-tone-700 text-[10px] text-tone-300 font-mono">
                  {"Save 20%"}
                </span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-10">
            <div className="scroll-reveal delay-100 shimmer-card rounded-3xl border border-tone-800 bg-tone-raised p-8 flex flex-col justify-between">
              <div>
                <div className="mb-5">
                  <h3 className="text-xl font-bold text-tone-fg">{"Starter Plan"}</h3>
                  <p className="text-xs text-tone-400 mt-1">
                    {"For creators and boutique labels getting started."}
                  </p>
                </div>
                <div className="mb-6 pb-6 border-b border-tone-800">
                  <div
                    className="text-4xl font-bold font-mono text-tone-fg transition-all duration-300"
                    id="price-starter"
                  >{`$${previewPrice("starter", annual)}`}</div>
                  <span className="text-xs text-tone-500" id="subtext-starter">
                    {annual ? "/ month (billed yearly)" : "/ month"}
                  </span>
                </div>
                <ul className="space-y-3.5 mb-8">
                  <li className="flex items-center gap-2.5 text-xs text-tone-300">
                    <span
                      className="material-symbols-outlined text-tone-fg text-[18px]"
                      data-icon="check"
                    >
                      {"check"}
                    </span>
                    <span>{"Up to 50 Trend Scans / mo"}</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs text-tone-300">
                    <span
                      className="material-symbols-outlined text-tone-fg text-[18px]"
                      data-icon="check"
                    >
                      {"check"}
                    </span>
                    <span>{"AI Writer Core generation"}</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs text-tone-300">
                    <span
                      className="material-symbols-outlined text-tone-fg text-[18px]"
                      data-icon="check"
                    >
                      {"check"}
                    </span>
                    <span>{"Weekly Content Scheduler"}</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs text-tone-300">
                    <span
                      className="material-symbols-outlined text-tone-fg text-[18px]"
                      data-icon="check"
                    >
                      {"check"}
                    </span>
                    <span>{"1 Brand Identity Profile"}</span>
                  </li>
                </ul>
              </div>
              <Link
                to="/signup"
                className="w-full py-3 rounded-full border border-tone-700 bg-tone-900 text-tone-200 font-medium text-xs hover:bg-tone-800 hover:text-tone-fg transition-all active:scale-[0.98] shadow-sm"
              >
                {"\n  Get Started Free\n"}
              </Link>
            </div>

            <div className="scroll-reveal delay-200 shimmer-card rounded-3xl border border-tone-fg/40 bg-tone-950 p-8 flex flex-col justify-between shadow-2xl relative -translate-y-2 ring-1 ring-tone-fg/20">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-tone-fg text-tone-bg rounded-full text-[11px] font-bold uppercase shadow-md">
                {"\n  POPULAR\n"}
              </div>
              <div>
                <div className="mb-5">
                  <h3 className="text-xl font-bold text-tone-fg">{"Professional Plan"}</h3>
                  <p className="text-xs text-tone-400 mt-1">
                    {"For growing brands ready to accelerate growth."}
                  </p>
                </div>
                <div className="mb-6 pb-6 border-b border-tone-800">
                  <div
                    className="text-4xl font-bold font-mono text-tone-fg transition-all duration-300"
                    id="price-pro"
                  >{`$${previewPrice("pro", annual)}`}</div>
                  <span className="text-xs text-tone-500" id="subtext-pro">
                    {annual ? "/ month (billed yearly)" : "/ month"}
                  </span>
                </div>
                <ul className="space-y-3.5 mb-8">
                  <li className="flex items-center gap-2.5 text-xs text-tone-200">
                    <span
                      className="material-symbols-outlined text-tone-fg text-[18px]"
                      data-icon="check"
                    >
                      {"check"}
                    </span>
                    <span>{"Unlimited Trend Exploration"}</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs text-tone-200">
                    <span
                      className="material-symbols-outlined text-tone-fg text-[18px]"
                      data-icon="check"
                    >
                      {"check"}
                    </span>
                    <span>{"Multi-platform AI Copywriter"}</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs text-tone-200">
                    <span
                      className="material-symbols-outlined text-tone-fg text-[18px]"
                      data-icon="check"
                    >
                      {"check"}
                    </span>
                    <span>{"Predictive Peak-Time Scheduler"}</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs text-tone-200">
                    <span
                      className="material-symbols-outlined text-tone-fg text-[18px]"
                      data-icon="check"
                    >
                      {"check"}
                    </span>
                    <span>{"5 Custom Brand Profiles"}</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs text-tone-200">
                    <span
                      className="material-symbols-outlined text-tone-fg text-[18px]"
                      data-icon="check"
                    >
                      {"check"}
                    </span>
                    <span>{"Advanced Performance Insights"}</span>
                  </li>
                </ul>
              </div>
              <Link
                to="/signup"
                className="btn-shimmer w-full py-3 rounded-full bg-tone-fg hover:bg-tone-200 text-tone-bg font-semibold text-xs shadow-lg transition-all active:scale-[0.98]"
              >
                {"\n  Choose Professional\n"}
              </Link>
            </div>

            <div className="scroll-reveal delay-300 shimmer-card rounded-3xl border border-tone-800 bg-tone-raised p-8 flex flex-col justify-between">
              <div>
                <div className="mb-5">
                  <h3 className="text-xl font-bold text-tone-fg">{"Team / Scale Plan"}</h3>
                  <p className="text-xs text-tone-400 mt-1">
                    {"For agency pods managing multiple brands."}
                  </p>
                </div>
                <div className="mb-6 pb-6 border-b border-tone-800">
                  <div
                    className="text-4xl font-bold font-mono text-tone-fg transition-all duration-300"
                    id="price-team"
                  >{`$${previewPrice("team", annual)}`}</div>
                  <span className="text-xs text-tone-500" id="subtext-team">
                    {annual ? "/ month (billed yearly)" : "/ month"}
                  </span>
                </div>
                <ul className="space-y-3.5 mb-8">
                  <li className="flex items-center gap-2.5 text-xs text-tone-300">
                    <span
                      className="material-symbols-outlined text-tone-fg text-[18px]"
                      data-icon="check"
                    >
                      {"check"}
                    </span>
                    <span>{"Multi-seat Team Collaboration"}</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs text-tone-300">
                    <span
                      className="material-symbols-outlined text-tone-fg text-[18px]"
                      data-icon="check"
                    >
                      {"check"}
                    </span>
                    <span>{"Custom Tone Fine-Tuning"}</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs text-tone-300">
                    <span
                      className="material-symbols-outlined text-tone-fg text-[18px]"
                      data-icon="check"
                    >
                      {"check"}
                    </span>
                    <span>{"Priority Support & SLA"}</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs text-tone-300">
                    <span
                      className="material-symbols-outlined text-tone-fg text-[18px]"
                      data-icon="check"
                    >
                      {"check"}
                    </span>
                    <span>{"Dedicated Agency Workspaces"}</span>
                  </li>
                </ul>
              </div>
              <Link
                to="/signup"
                className="w-full py-3 rounded-full border border-tone-700 bg-tone-900 text-tone-200 font-medium text-xs hover:bg-tone-800 hover:text-tone-fg transition-all active:scale-[0.98] shadow-sm"
              >
                {"\n  Choose Team\n"}
              </Link>
            </div>
          </div>
          <p className="scroll-reveal delay-400 text-center text-xs text-tone-500">
            {
              "\n  All plans include 14-day risk-free exploratory period. Cancel or modify anytime.\n"
            }
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-tone-canvas relative z-10" id="about">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="scroll-reveal">
              <span className="text-xs font-semibold text-tone-400 uppercase font-mono block mb-3">
                {"About Trend\u014dva AI"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-tone-fg mb-6">
                {"\n  Marketing Should Feel More Human.\n"}
              </h2>
              <p className="text-base sm:text-lg text-tone-400 leading-relaxed mb-12">
                {
                  "\n  Trend\u014dva AI is designed to simplify the work behind effective marketing. By bringing trend discovery, content creation, scheduling, performance analysis, and brand personalization into one connected workspace, Trend\u014dva AI helps brands spend less time juggling disconnected tools and more time developing ideas that resonate.\n"
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="scroll-reveal delay-100 shimmer-card p-6 rounded-3xl bg-tone-950 border border-tone-800 group">
                <div className="w-10 h-10 rounded-2xl bg-tone-900 border border-tone-700 text-tone-fg flex items-center justify-center mb-4 group-hover:border-tone-500 transition-colors">
                  <span
                    className="material-symbols-outlined text-[20px]"
                    data-icon="filter_center_focus"
                  >
                    {"filter_center_focus"}
                  </span>
                </div>
                <h3 className="text-base font-bold text-tone-fg mb-2">{"Clarity Over Clutter"}</h3>
                <p className="text-xs text-tone-400 leading-relaxed">
                  {
                    "\n  Find actionable marketing signals without getting lost in unnecessary data noise.\n"
                  }
                </p>
              </div>
              <div className="scroll-reveal delay-200 shimmer-card p-6 rounded-3xl bg-tone-950 border border-tone-800 group">
                <div className="w-10 h-10 rounded-2xl bg-tone-900 border border-tone-700 text-tone-fg flex items-center justify-center mb-4 group-hover:border-tone-500 transition-colors">
                  <span className="material-symbols-outlined text-[20px]" data-icon="insights">
                    {"insights"}
                  </span>
                </div>
                <h3 className="text-base font-bold text-tone-fg mb-2">
                  {"Insights You Can Act On"}
                </h3>
                <p className="text-xs text-tone-400 leading-relaxed">
                  {
                    "\n  Turn trending topics and performance data into intuitive next steps for your campaign.\n"
                  }
                </p>
              </div>
              <div className="scroll-reveal delay-300 shimmer-card p-6 rounded-3xl bg-tone-950 border border-tone-800 group">
                <div className="w-10 h-10 rounded-2xl bg-tone-900 border border-tone-700 text-tone-fg flex items-center justify-center mb-4 group-hover:border-tone-500 transition-colors">
                  <span
                    className="material-symbols-outlined text-[20px]"
                    data-icon="record_voice_over"
                  >
                    {"record_voice_over"}
                  </span>
                </div>
                <h3 className="text-base font-bold text-tone-fg mb-2">
                  {"A Voice That Feels Like You"}
                </h3>
                <p className="text-xs text-tone-400 leading-relaxed">
                  {
                    "\n  Create content that reflects your brand's personality instead of sounding generic.\n"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-20 md:py-28 bg-tone-deep border-y border-tone-800/80 relative z-10"
        id="faq"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="scroll-reveal text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold text-tone-400 uppercase font-mono block mb-2">
              {"Got Questions?"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-tone-fg">
              {"\n  Frequently Asked Questions\n"}
            </h2>
          </div>

          <div className="space-y-4">
            <div className="scroll-reveal delay-100 faq-item rounded-3xl border border-tone-800 bg-tone-950 overflow-hidden transition-all duration-300 hover:border-tone-600 is-open">
              <Button
                variant="ghost"
                type="button"
                onClick={() => setFaq(faq === 0 ? null : 0)}
                aria-expanded={faq === 0}
                aria-controls="faq-answer-0"
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-tone-fg focus:outline-none"
              >
                <span>{"Who is Trend\u014dva AI built for?"}</span>
                <span
                  className={cn(
                    "material-symbols-outlined text-tone-400 transform transition-transform duration-300 icon-arrow ",
                    faq === 0 && "rotate-180",
                  )}
                  data-icon="expand_more"
                >
                  {"expand_more"}
                </span>
              </Button>
              <div
                id="faq-answer-0"
                className={cn(
                  "faq-content px-6 pb-6 text-xs sm:text-sm text-tone-400 leading-relaxed border-t border-tone-800/80 pt-4 transition-all",
                  faq !== 0 && "hidden",
                )}
              >
                {
                  "\n  Trend\u014dva AI is designed for growing brands, streetwear labels, modern direct-to-consumer businesses, creators, and marketing teams that want to discover relevant trends and create content that connects with their audience.\n"
                }
              </div>
            </div>

            <div className="scroll-reveal delay-150 faq-item rounded-3xl border border-tone-800 bg-tone-950 overflow-hidden transition-all duration-300 hover:border-tone-600">
              <Button
                variant="ghost"
                type="button"
                onClick={() => setFaq(faq === 1 ? null : 1)}
                aria-expanded={faq === 1}
                aria-controls="faq-answer-1"
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-tone-fg focus:outline-none"
              >
                <span>{"Are these live social media trends?"}</span>
                <span
                  className={cn(
                    "material-symbols-outlined text-tone-400 transform transition-transform duration-300 icon-arrow",
                    faq === 1 && "rotate-180",
                  )}
                  data-icon="expand_more"
                >
                  {"expand_more"}
                </span>
              </Button>
              <div
                id="faq-answer-1"
                className={cn(
                  "faq-content px-6 pb-6 text-xs sm:text-sm text-tone-400 leading-relaxed border-t border-tone-800/80 pt-4 transition-all",
                  faq !== 1 && "hidden",
                )}
              >
                {
                  "\n  Trend results depend on the data sources available to Trend\u014dva AI. Examples shown in the demo may use sample data and should not be interpreted as live platform analytics. Where live trend data is available, Trend\u014dva AI can help you explore relevant topics and content opportunities.\n"
                }
              </div>
            </div>

            <div className="scroll-reveal delay-200 faq-item rounded-3xl border border-tone-800 bg-tone-950 overflow-hidden transition-all duration-300 hover:border-tone-600">
              <Button
                variant="ghost"
                type="button"
                onClick={() => setFaq(faq === 2 ? null : 2)}
                aria-expanded={faq === 2}
                aria-controls="faq-answer-2"
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-tone-fg focus:outline-none"
              >
                <span>{"Can I explore Trend\u014dva AI without adding a brand?"}</span>
                <span
                  className={cn(
                    "material-symbols-outlined text-tone-400 transform transition-transform duration-300 icon-arrow",
                    faq === 2 && "rotate-180",
                  )}
                  data-icon="expand_more"
                >
                  {"expand_more"}
                </span>
              </Button>
              <div
                id="faq-answer-2"
                className={cn(
                  "faq-content px-6 pb-6 text-xs sm:text-sm text-tone-400 leading-relaxed border-t border-tone-800/80 pt-4 transition-all",
                  faq !== 2 && "hidden",
                )}
              >
                {
                  "\n  Yes, the live demo allows you to explore the main features using a sample brand such as Aura Wear. You can evaluate the workflow prior to linking or configuring your own brand profile.\n"
                }
              </div>
            </div>

            <div className="scroll-reveal delay-250 faq-item rounded-3xl border border-tone-800 bg-tone-950 overflow-hidden transition-all duration-300 hover:border-tone-600">
              <Button
                variant="ghost"
                type="button"
                onClick={() => setFaq(faq === 3 ? null : 3)}
                aria-expanded={faq === 3}
                aria-controls="faq-answer-3"
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-tone-fg focus:outline-none"
              >
                <span>{"Does Trend\u014dva AI guarantee marketing outcomes?"}</span>
                <span
                  className={cn(
                    "material-symbols-outlined text-tone-400 transform transition-transform duration-300 icon-arrow",
                    faq === 3 && "rotate-180",
                  )}
                  data-icon="expand_more"
                >
                  {"expand_more"}
                </span>
              </Button>
              <div
                id="faq-answer-3"
                className={cn(
                  "faq-content px-6 pb-6 text-xs sm:text-sm text-tone-400 leading-relaxed border-t border-tone-800/80 pt-4 transition-all",
                  faq !== 3 && "hidden",
                )}
              >
                {
                  "\n  No software can guarantee viral reach, conversion rates, or sales. Trend\u014dva AI is engineered to help discover opportunities, synthesize compelling creative copy, optimize schedules, and draw from performance benchmarks.\n"
                }
              </div>
            </div>

            <div className="scroll-reveal delay-300 faq-item rounded-3xl border border-tone-800 bg-tone-950 overflow-hidden transition-all duration-300 hover:border-tone-600">
              <Button
                variant="ghost"
                type="button"
                onClick={() => setFaq(faq === 4 ? null : 4)}
                aria-expanded={faq === 4}
                aria-controls="faq-answer-4"
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-tone-fg focus:outline-none"
              >
                <span>{"How does Brand Voice calibration work?"}</span>
                <span
                  className={cn(
                    "material-symbols-outlined text-tone-400 transform transition-transform duration-300 icon-arrow",
                    faq === 4 && "rotate-180",
                  )}
                  data-icon="expand_more"
                >
                  {"expand_more"}
                </span>
              </Button>
              <div
                id="faq-answer-4"
                className={cn(
                  "faq-content px-6 pb-6 text-xs sm:text-sm text-tone-400 leading-relaxed border-t border-tone-800/80 pt-4 transition-all",
                  faq !== 4 && "hidden",
                )}
              >
                {
                  "\n  Brand Voice captures your preferred tone, personality, visual aesthetics, and audience demographics. These vectors guide generative models so output copy remains tightly harmonized with your brand DNA.\n"
                }
              </div>
            </div>

            <div className="scroll-reveal delay-350 faq-item rounded-3xl border border-tone-800 bg-tone-950 overflow-hidden transition-all duration-300 hover:border-tone-600">
              <Button
                variant="ghost"
                type="button"
                onClick={() => setFaq(faq === 5 ? null : 5)}
                aria-expanded={faq === 5}
                aria-controls="faq-answer-5"
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-tone-fg focus:outline-none"
              >
                <span>{"Why does cultural relevance matter?"}</span>
                <span
                  className={cn(
                    "material-symbols-outlined text-tone-400 transform transition-transform duration-300 icon-arrow",
                    faq === 5 && "rotate-180",
                  )}
                  data-icon="expand_more"
                >
                  {"expand_more"}
                </span>
              </Button>
              <div
                id="faq-answer-5"
                className={cn(
                  "faq-content px-6 pb-6 text-xs sm:text-sm text-tone-400 leading-relaxed border-t border-tone-800/80 pt-4 transition-all",
                  faq !== 5 && "hidden",
                )}
              >
                {
                  "\n  Because authentic emotional resonance drives loyalty. Brands that cultivate community rather than just push product build lasting relevance. With Trend\u014dva AI, staying on the pulse is seamless.\n"
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 relative overflow-hidden bg-tone-bg text-tone-fg border-b border-tone-800 z-10">
        <div className="scroll-reveal max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-6 text-tone-fg">
            {"\n  Your Next Great Campaign Starts Here.\n"}
          </h2>
          <p className="text-base sm:text-lg text-tone-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {
              "\n  Spot emerging trends. Create content that resonates. Grow your brand with AI built for culture and commerce.\n"
            }
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              className="btn-shimmer group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-tone-fg hover:bg-tone-200 text-tone-bg font-semibold text-sm shadow-xl transition-all duration-200 active:scale-[0.98]"
              href="#workspace"
            >
              <span>{"Explore Demo"}</span>
              <span
                className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:translate-x-1"
                data-icon="arrow_forward"
              >
                {"arrow_forward"}
              </span>
            </a>
            <a
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-tone-900 hover:bg-tone-800 border border-tone-700 text-tone-200 font-medium text-sm transition-all duration-200 active:scale-[0.98] hover:border-tone-500"
              href="#how-it-works"
            >
              <span>{"See How It Works"}</span>
              <span
                className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:scale-110"
                data-icon="play_circle"
              >
                {"play_circle"}
              </span>
            </a>
          </div>
        </div>
      </section>

      <footer className="scroll-reveal bg-tone-bg border-t border-tone-900 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-3">
              <img className="size-8 object-contain" alt="Trendova AI" src="/trendova-logo.png" />
              <span className="text-lg font-bold text-tone-fg flex items-center gap-1.5 font-sans">
                {"Trend\u014dva AI"}
              </span>
            </div>
            <p className="text-xs text-tone-500 text-center md:text-left max-w-sm">
              {"\n  AI-Powered Marketing Intelligence & Content Platform for Modern Brands.\n"}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-tone-400 font-medium">
            <a className="hover:text-tone-fg transition-colors" href="#features">
              {"Features"}
            </a>
            <a className="hover:text-tone-fg transition-colors" href="#how-it-works">
              {"How It Works"}
            </a>
            <a className="hover:text-tone-fg transition-colors" href="#pricing">
              {"Pricing"}
            </a>
            <a className="hover:text-tone-fg transition-colors" href="#about">
              {"About"}
            </a>
            <Link to="/login" className="hover:text-tone-fg transition-colors">
              {"Log In"}
            </Link>
            <a className="hover:text-tone-fg transition-colors" href="#workspace">
              {"Explore Demo"}
            </a>
          </div>

          <div className="text-xs text-tone-500">
            {"\n  \u00a9 2026 Trendova AI Inc. All rights reserved.\n"}
          </div>
        </div>
      </footer>
    </div>
  );
}
