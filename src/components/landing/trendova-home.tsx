import { Link } from "@tanstack/react-router";
import { useState, type MouseEvent } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

type Tab = "trend" | "writer" | "scheduler" | "personalization";

/** Trendōva AI homepage — dark "Obsidian Atelier" design supplied as a Stitch export. */
export function TrendovaHomepage() {
  const [tab, setTab] = useState<Tab>("trend");
  const [menuOpen, setMenuOpen] = useState(false);
  const [faq, setFaq] = useState<number | null>(null);
  const [scanning, setScanning] = useState(false);

  const scan = () => {
    setTab("trend");
    setScanning(true);
    window.setTimeout(() => setScanning(false), 900);
    toast("Sample scan refreshed", { description: "Showing illustrative trends for Aura Wear." });
  };

  const copy = (e: MouseEvent<HTMLElement>) => {
    const btn = e.currentTarget;
    const panel = btn.closest(".workspace-panel, .shimmer-card, section");
    const quote = panel?.querySelector("p")?.textContent ?? "";
    void navigator.clipboard?.writeText(quote).catch(() => undefined);
    const label = btn.querySelector("span:last-child");
    if (!label) return;
    const original = label.textContent;
    label.textContent = "Copied!";
    window.setTimeout(() => {
      label.textContent = original;
    }, 1500);
  };

  return (
    <div
      className={cn(
        "trendova-home min-h-screen",
        "bg-tone-deep text-tone-100 font-sans antialiased selection:bg-tone-fg selection:text-tone-bg",
        scanning && "is-scanning",
      )}
    >
      <header className="sticky top-0 z-50 pt-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto backdrop-blur-2xl bg-tone-bg/70 border border-tone-800/80 rounded-full shadow-2xl px-5 sm:px-7 h-16 flex items-center justify-between transition-all duration-300">
          <Link
            className="flex items-center gap-3 group active:scale-95 transition-transform"
            to="/"
          >
            <img
              className="h-8 w-8 rounded-full object-contain brightness-100"
              alt="Trendōva AI"
              src="/trendova-logo.png"
            />{" "}
            <span className="text-lg font-bold tracking-tight text-tone-fg flex items-center gap-1.5 font-sans">
              <span>Trendōva</span>{" "}
              <span className="text-xs px-1.5 py-0.5 rounded border border-tone-700 bg-tone-900/80 text-tone-300 font-mono tracking-normal">
                AI
              </span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 bg-tone-900/70 p-1 rounded-full border border-tone-800/80">
            <a
              className="text-tone-400 hover:text-tone-fg font-medium text-xs sm:text-[13px] px-4 py-1.5 rounded-full hover:bg-tone-800/60 transition-all duration-150"
              href="#features"
            >
              Features
            </a>
            <a
              className="text-tone-400 hover:text-tone-fg font-medium text-xs sm:text-[13px] px-4 py-1.5 rounded-full hover:bg-tone-800/60 transition-all duration-150"
              href="#how-it-works"
            >
              How It Works
            </a>
            <a
              className="text-tone-400 hover:text-tone-fg font-medium text-xs sm:text-[13px] px-4 py-1.5 rounded-full hover:bg-tone-800/60 transition-all duration-150"
              href="#pricing"
            >
              Pricing
            </a>
            <a
              className="text-tone-400 hover:text-tone-fg font-medium text-xs sm:text-[13px] px-4 py-1.5 rounded-full hover:bg-tone-800/60 transition-all duration-150"
              href="#about"
            >
              About
            </a>
          </nav>
          <div className="hidden md:flex items-center gap-2.5">
            <Link
              className="text-tone-400 text-xs sm:text-[13px] font-medium px-4 py-2 rounded-full hover:text-tone-fg hover:bg-tone-900 transition-all"
              to="/login"
            >
              Log In
            </Link>
            <a
              className="inline-flex items-center justify-center text-xs sm:text-[13px] font-semibold text-tone-bg bg-tone-fg hover:bg-tone-200 rounded-full px-5 py-2.5 transition-all shadow-md active:scale-95"
              href="#workspace"
            >
              Explore Demo
            </a>
          </div>
          <button
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-tone-300 hover:bg-tone-900 transition-colors focus:outline-none"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="Toggle Navigation Menu"
            id="mobile-menu-btn"
          >
            <span className="material-symbols-outlined text-[22px]">menu</span>
          </button>
        </div>
        <div
          className={cn(
            "md:hidden mt-2 mx-auto max-w-lg p-5 bg-tone-950 border border-tone-800/90 rounded-3xl shadow-2xl flex-col gap-3 transition-all",
            menuOpen ? "" : "hidden",
          )}
          id="mobile-menu"
        >
          <a
            className="py-2.5 px-4 rounded-full text-tone-300 hover:text-tone-fg hover:bg-tone-900 font-medium text-sm transition-colors"
            onClick={() => setMenuOpen(false)}
            href="#features"
          >
            Features
          </a>
          <a
            className="py-2.5 px-4 rounded-full text-tone-300 hover:text-tone-fg hover:bg-tone-900 font-medium text-sm transition-colors"
            onClick={() => setMenuOpen(false)}
            href="#how-it-works"
          >
            How It Works
          </a>
          <a
            className="py-2.5 px-4 rounded-full text-tone-300 hover:text-tone-fg hover:bg-tone-900 font-medium text-sm transition-colors"
            onClick={() => setMenuOpen(false)}
            href="#pricing"
          >
            Pricing
          </a>
          <a
            className="py-2.5 px-4 rounded-full text-tone-300 hover:text-tone-fg hover:bg-tone-900 font-medium text-sm transition-colors"
            onClick={() => setMenuOpen(false)}
            href="#about"
          >
            About
          </a>
          <div className="pt-3 border-t border-tone-800 flex flex-col gap-2">
            <Link
              className="w-full text-center py-2.5 text-sm font-medium text-tone-300 border border-tone-800 rounded-full hover:bg-tone-900"
              to="/login"
            >
              Log In
            </Link>
            <a
              className="w-full text-center py-2.5 text-sm font-semibold text-tone-bg bg-tone-fg rounded-full shadow-lg"
              onClick={() => setMenuOpen(false)}
              href="#workspace"
            >
              Explore Demo
            </a>
          </div>
        </div>
      </header>
      <section className="relative pt-16 md:pt-24 pb-14 md:pb-20 overflow-hidden grid-bg">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[360px] bg-tone-fg/[0.04] blur-[150px] rounded-full pointer-events-none -z-10"></div>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tone-900/90 border border-tone-800/90 shadow-sm mb-8 hover:border-tone-700 transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tone-fg opacity-75"></span>{" "}
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tone-fg"></span>
            </span>
            <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-tone-300 uppercase">
              BUILT FOR CULTURE & MODERN COMMERCE
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-tone-fg max-w-4xl mx-auto mb-6 leading-[1.12]">
            {" "}
            AI-Powered Marketing Intelligence for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tone-fg via-tone-300 to-tone-500">
              Modern Brands.
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-tone-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            {" "}
            Spot emerging trends. Create content that resonates. Grow your brand with AI built for
            culture and commerce.{" "}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14">
            <a
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-tone-fg hover:bg-tone-200 text-tone-bg font-semibold text-sm shadow-xl transition-all duration-200 active:scale-95"
              href="#workspace"
            >
              <span>Explore Demo</span>{" "}
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
            <a
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-tone-900/80 hover:bg-tone-800 border border-tone-700/70 text-tone-200 font-medium text-sm transition-all duration-200 active:scale-95"
              href="#how-it-works"
            >
              <span>See How It Works</span>{" "}
              <span className="material-symbols-outlined text-[18px]">play_circle</span>
            </a>
          </div>
          <div
            className="max-w-6xl mx-auto rounded-[28px] border border-tone-800/90 bg-tone-950/90 backdrop-blur-2xl shadow-2xl p-4 sm:p-7 text-left transition-all"
            id="workspace"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-tone-800/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-tone-900 border border-tone-700/80 flex items-center justify-center text-tone-fg">
                  <img
                    className="h-6 w-6 rounded-full brightness-100"
                    alt="Emblem"
                    src="/trendova-logo.png"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm tracking-tight text-tone-fg font-mono">
                      TRENDŌVA WORKSPACE
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-tone-900 text-tone-300 border border-tone-700">
                      Sample Preview
                    </span>
                  </div>
                  <p className="text-xs text-tone-400">
                    Your brand's marketing intelligence, unified.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-tone-900/80 p-1.5 pl-3 rounded-full border border-tone-800 text-xs">
                <span className="text-tone-400 font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">storefront</span>{" "}
                  Brand:{" "}
                </span>
                <span className="font-semibold text-tone-fg bg-tone-800 px-2.5 py-1 rounded-full border border-tone-700 shadow-xs">
                  Aura Wear
                </span>
                <span className="text-tone-500 hidden sm:inline">• Streetwear & Gen Z</span>
                <button
                  className="bg-tone-fg hover:bg-tone-200 text-tone-bg font-semibold text-[11px] px-3.5 py-1 rounded-full transition-colors flex items-center gap-1 ml-1"
                  onClick={scan}
                >
                  <span className="material-symbols-outlined text-[13px]">sync</span> Scan
                  Trends{" "}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 py-4 border-b border-tone-800/80 overflow-x-auto custom-scrollbar">
              <button
                className={cn(
                  "tab-btn px-4 py-2 rounded-full font-medium text-xs sm:text-[13px] flex items-center gap-2 transition-all",
                  tab === "trend"
                    ? "bg-tone-fg text-tone-bg font-semibold shadow"
                    : "border border-tone-800 bg-tone-900/90 text-tone-400 hover:bg-tone-800 hover:text-tone-fg",
                )}
                role="tab"
                aria-selected={tab === "trend"}
                onClick={() => setTab("trend")}
                id="tab-btn-trend"
              >
                <span className="material-symbols-outlined text-[16px]">radar</span>{" "}
                <span>Trend Scanner</span>
              </button>
              <button
                className={cn(
                  "tab-btn px-4 py-2 rounded-full font-medium text-xs sm:text-[13px] flex items-center gap-2 transition-all",
                  tab === "writer"
                    ? "bg-tone-fg text-tone-bg font-semibold shadow"
                    : "border border-tone-800 bg-tone-900/90 text-tone-400 hover:bg-tone-800 hover:text-tone-fg",
                )}
                role="tab"
                aria-selected={tab === "writer"}
                onClick={() => setTab("writer")}
                id="tab-btn-writer"
              >
                <span className="material-symbols-outlined text-[16px]">auto_awesome</span>{" "}
                <span>AI Writer</span>
              </button>
              <button
                className={cn(
                  "tab-btn px-4 py-2 rounded-full font-medium text-xs sm:text-[13px] flex items-center gap-2 transition-all",
                  tab === "scheduler"
                    ? "bg-tone-fg text-tone-bg font-semibold shadow"
                    : "border border-tone-800 bg-tone-900/90 text-tone-400 hover:bg-tone-800 hover:text-tone-fg",
                )}
                role="tab"
                aria-selected={tab === "scheduler"}
                onClick={() => setTab("scheduler")}
                id="tab-btn-scheduler"
              >
                <span className="material-symbols-outlined text-[16px]">calendar_month</span>{" "}
                <span>Scheduler</span>
              </button>
              <button
                className={cn(
                  "tab-btn px-4 py-2 rounded-full font-medium text-xs sm:text-[13px] flex items-center gap-2 transition-all",
                  tab === "personalization"
                    ? "bg-tone-fg text-tone-bg font-semibold shadow"
                    : "border border-tone-800 bg-tone-900/90 text-tone-400 hover:bg-tone-800 hover:text-tone-fg",
                )}
                role="tab"
                aria-selected={tab === "personalization"}
                onClick={() => setTab("personalization")}
                id="tab-btn-personalization"
              >
                <span className="material-symbols-outlined text-[16px]">fingerprint</span>{" "}
                <span>Personalization</span>
              </button>
            </div>
            <div
              className={cn("workspace-panel pt-5", tab === "trend" ? "" : "hidden")}
              id="tab-panel-trend"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-tone-900/50 border border-tone-800/90 flex flex-col justify-between hover:border-tone-700 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-tone-400 uppercase tracking-wider font-mono">
                        Trend Scanner
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-tone-800 text-tone-200 border border-tone-700">
                        Trend activity
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-2xl font-bold font-mono text-tone-fg">+142%</span>
                      <span className="text-xs text-tone-300 font-medium">Spike detected</span>
                    </div>
                    <p className="text-xs text-tone-400">
                      Spot rising conversations and style trends.
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-tone-800/80">
                    <div className="flex items-center justify-between text-[10px] text-tone-400 mb-1">
                      <span className="font-medium">Interest Over Time</span>
                      <span className="font-mono text-[9px] bg-tone-800 px-1.5 py-0.5 rounded border border-tone-700 text-tone-300">
                        Sample data
                      </span>
                    </div>
                    <div className="h-12 w-full relative flex items-end pb-3.5">
                      <svg className="w-full h-8 overflow-visible" fill="none" viewBox="0 0 100 32">
                        <line
                          stroke="#27272a"
                          strokeDasharray="2 2"
                          strokeWidth="1"
                          x1="0"
                          x2="100"
                          y1="28"
                          y2="28"
                        />
                        <line stroke="#18181b" strokeWidth="1" x1="0" x2="100" y1="14" y2="14" />
                        <path
                          d="M4 25 L24 22 L48 15 L72 17 L96 4"
                          stroke="#ffffff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                        <circle cx="4" cy="25" fill="#ffffff" r="2" />
                        <circle cx="24" cy="22" fill="#ffffff" r="2" />
                        <circle cx="48" cy="15" fill="#ffffff" r="2" />
                        <circle cx="72" cy="17" fill="#ffffff" r="2" />
                        <circle
                          cx="96"
                          cy="4"
                          fill="#ffffff"
                          r="2.5"
                          stroke="#000000"
                          strokeWidth="1"
                        />
                      </svg>
                      <div className="absolute bottom-0 inset-x-0 flex justify-between text-[9px] text-tone-500 font-mono">
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-tone-900/50 border border-tone-800/90 flex flex-col justify-between hover:border-tone-700 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-tone-400 uppercase tracking-wider font-mono">
                        AI Writer
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-tone-300 bg-tone-800 border border-tone-700">
                        Illustrative estimate
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-2xl font-bold font-mono text-tone-fg">4×</span>
                      <span className="text-xs text-tone-300 font-medium">
                        Engagement Potential
                      </span>
                    </div>
                    <p className="text-xs text-tone-400">
                      Create content designed to connect with your audience.
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-tone-800/80">
                    <div className="space-y-1.5 mb-1.5">
                      <div>
                        <div className="flex justify-between text-[10px] text-tone-400 mb-0.5">
                          <span>Standard Caption</span>
                          <span className="font-mono font-medium text-tone-500">1.0× baseline</span>
                        </div>
                        <div className="w-full bg-tone-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-tone-600 h-full w-[25%] rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] text-tone-200 font-medium mb-0.5">
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-tone-fg"></span>Trendōva
                            AI-Assisted
                          </span>
                          <span className="font-mono font-bold text-tone-fg">4.0× (+300%)</span>
                        </div>
                        <div className="w-full bg-tone-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-tone-fg h-full w-[100%] rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-[9px] text-tone-500 font-mono text-right">
                      Illustrative comparison · Sample data
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-tone-900/50 border border-tone-800/90 flex flex-col justify-between hover:border-tone-700 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-tone-400 uppercase tracking-wider font-mono">
                        Brand Personality
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-tone-300 bg-tone-800 border border-tone-700">
                        Sample data
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-2xl font-bold font-mono text-tone-fg">94.8%</span>
                      <span className="text-xs text-tone-300 font-medium">Brand voice match</span>
                    </div>
                    <p className="text-xs text-tone-400">
                      Calibrated to culture & aesthetic criteria.
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-tone-800/80">
                    <div className="space-y-1.5 mb-1.5">
                      <div>
                        <div className="flex justify-between text-[10px] text-tone-300 mb-0.5">
                          <span className="font-medium">Casual</span>
                          <span className="font-mono text-tone-fg font-semibold">85%</span>
                        </div>
                        <div className="w-full bg-tone-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-tone-fg h-full w-[85%] rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] text-tone-300 mb-0.5">
                          <span className="font-medium">Playful</span>
                          <span className="font-mono text-tone-300 font-semibold">60%</span>
                        </div>
                        <div className="w-full bg-tone-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-tone-400 h-full w-[60%] rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] text-tone-300 mb-0.5">
                          <span className="font-medium">Formal</span>
                          <span className="font-mono text-tone-400 font-semibold">15%</span>
                        </div>
                        <div className="w-full bg-tone-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-tone-600 h-full w-[15%] rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-[9px] text-tone-500 font-mono text-right">
                      Sample brand preferences
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-5 rounded-3xl bg-tone-900/60 border border-tone-800/90">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div>
                    <h4 className="text-sm font-bold text-tone-fg flex items-center gap-2">
                      <span>Trending in Your Niche</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-tone-800 text-tone-400 border border-tone-700">
                        Sample data
                      </span>
                    </h4>
                    <p className="text-xs text-tone-400">
                      Explore conversations and styles that could inspire your next post.
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-tone-300 bg-tone-800/90 px-3 py-1 rounded-full border border-tone-700">
                    Sample snapshot
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-tone-950/80 border border-tone-800 hover:border-tone-600 hover:shadow-lg transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono font-bold text-sm text-tone-fg">
                          #AestheticCore
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-tone-800 text-tone-fg border border-tone-700">
                          Trending
                        </span>
                      </div>
                      <p className="text-xs text-tone-400 leading-relaxed mb-4">
                        {" "}
                        Minimal outfits, carefully styled details, and mood-driven visuals are
                        inspiring a new wave of fashion content.{" "}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-tone-800/80">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5 text-xs text-tone-400">
                          <span className="material-symbols-outlined text-[16px] text-tone-fg">
                            trending_up
                          </span>
                          <span className="font-mono text-tone-fg font-semibold">+142%</span>{" "}
                          interest
                        </div>
                        <span className="text-[9px] font-mono text-tone-500">Sample data</span>
                      </div>
                      <div className="bg-tone-900/80 p-2 rounded-xl border border-tone-800 flex items-center justify-between gap-3">
                        <div className="h-7 flex-1 relative flex items-center">
                          <svg
                            className="w-full h-6 overflow-visible"
                            fill="none"
                            viewBox="0 0 80 20"
                          >
                            <line
                              stroke="#27272a"
                              strokeDasharray="2 2"
                              strokeWidth="0.75"
                              x1="0"
                              x2="80"
                              y1="18"
                              y2="18"
                            />
                            <path
                              d="M2 16 L20 13 L40 9 L60 10 L78 2"
                              stroke="#ffffff"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.75"
                            />
                            <circle cx="78" cy="2" fill="#ffffff" r="2" />
                          </svg>
                        </div>
                        <button
                          className="px-3 py-1.5 rounded-full text-xs font-medium text-tone-fg bg-tone-800 hover:bg-tone-fg hover:text-tone-bg transition-colors shrink-0 border border-tone-700"
                          onClick={() => setTab("writer")}
                        >
                          Explore Trend →
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-tone-950/80 border border-tone-800 hover:border-tone-600 hover:shadow-lg transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono font-bold text-sm text-tone-fg">
                          #OldMoneyStyle
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-tone-800 text-tone-300 border border-tone-700">
                          Rising
                        </span>
                      </div>
                      <p className="text-xs text-tone-400 leading-relaxed mb-4">
                        {" "}
                        Classic silhouettes, neutral tones, and timeless styling offer an
                        opportunity for brands exploring an elevated aesthetic.{" "}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-tone-800/80">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5 text-xs text-tone-400">
                          <span className="material-symbols-outlined text-[16px] text-tone-fg">
                            trending_up
                          </span>
                          <span className="font-mono text-tone-fg font-semibold">+86%</span>{" "}
                          interest
                        </div>
                        <span className="text-[9px] font-mono text-tone-500">Sample data</span>
                      </div>
                      <div className="bg-tone-900/80 p-2 rounded-xl border border-tone-800 flex items-center justify-between gap-3">
                        <div className="h-7 flex-1 relative flex items-center">
                          <svg
                            className="w-full h-6 overflow-visible"
                            fill="none"
                            viewBox="0 0 80 20"
                          >
                            <line
                              stroke="#27272a"
                              strokeDasharray="2 2"
                              strokeWidth="0.75"
                              x1="0"
                              x2="80"
                              y1="18"
                              y2="18"
                            />
                            <path
                              d="M2 16 L22 14 L42 11 L60 8 L78 3"
                              stroke="#a1a1aa"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.75"
                            />
                            <circle cx="78" cy="3" fill="#ffffff" r="2" />
                          </svg>
                        </div>
                        <button
                          className="px-3 py-1.5 rounded-full text-xs font-medium text-tone-fg bg-tone-800 hover:bg-tone-fg hover:text-tone-bg transition-colors shrink-0 border border-tone-700"
                          onClick={() => setTab("writer")}
                        >
                          Explore Trend →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={cn("workspace-panel pt-5", tab === "writer" ? "" : "hidden")}
              id="tab-panel-writer"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-5 p-5 rounded-3xl bg-tone-900/70 border border-tone-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-tone-400 uppercase tracking-wider font-mono">
                        Content Brief Input
                      </span>
                      <div className="flex gap-1">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-tone-800 text-tone-400">
                          TikTok
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-tone-fg text-tone-bg font-semibold">
                          Instagram
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-tone-800 text-tone-400">
                          X
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2 mb-3">
                      <div className="p-3 rounded-2xl bg-tone-950 border border-tone-800 text-xs text-tone-300">
                        <span className="text-[10px] text-tone-500 block font-mono uppercase mb-0.5">
                          Brief:
                        </span>
                        Promote our new oversized hoodie.
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2.5 rounded-xl bg-tone-950 border border-tone-800">
                          <span className="text-[10px] text-tone-500 block font-mono uppercase">
                            Brand
                          </span>
                          <strong className="text-tone-fg">Aura Wear</strong>
                        </div>
                        <div className="p-2.5 rounded-xl bg-tone-950 border border-tone-800">
                          <span className="text-[10px] text-tone-500 block font-mono uppercase">
                            Tone
                          </span>
                          <strong className="text-tone-200">Bold & Playful</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="w-full py-2.5 rounded-full bg-tone-fg hover:bg-tone-200 text-tone-bg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95"
                    onClick={() =>
                      toast("Trendōva AI Demo: Generated sample variations refreshed.")
                    }
                  >
                    <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                    <span>Generate Caption</span>
                  </button>
                </div>
                <div className="lg:col-span-7 p-5 rounded-3xl bg-tone-950 border border-tone-800 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-tone-800">
                      <span className="text-xs font-bold text-tone-fg flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-tone-fg text-[16px]">
                          description
                        </span>
                        Generated Caption Preview
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-tone-800 text-tone-300 border border-tone-700">
                        Sample caption
                      </span>
                    </div>
                    <div className="p-4 rounded-2xl bg-tone-900/60 border border-tone-800 text-xs text-tone-200 leading-relaxed font-sans">
                      <p className="mb-3 font-normal leading-relaxed">
                        "Your new everyday essential just dropped. Oversized comfort, effortless
                        style, and a fit that speaks for itself. Which color are you picking? Shop
                        the drop — link in bio."
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-tone-800">
                        <span className="px-2.5 py-0.5 rounded-full bg-tone-800 border border-tone-700 text-[10px] font-mono text-tone-300">
                          #AuraWear
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-tone-800 border border-tone-700 text-[10px] font-mono text-tone-300">
                          #Streetwear
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-tone-800 border border-tone-700 text-[10px] font-mono text-tone-300">
                          #OOTD
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-tone-800 border border-tone-700 text-[10px] font-mono text-tone-300">
                          #StreetStyle
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-tone-800 border border-tone-700 text-[10px] font-mono text-tone-300">
                          #NewDrop
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 mt-3 border-t border-tone-800 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] text-tone-500 font-mono">
                      Preset: Aura Wear Street · 1/3
                    </span>
                    <div className="flex gap-2">
                      <button
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border border-tone-700 bg-tone-900 text-tone-300 hover:text-tone-fg hover:bg-tone-800 transition-colors copy-btn shadow-xs"
                        onClick={copy}
                      >
                        <span className="material-symbols-outlined text-[14px]">content_copy</span>
                        <span>Copy Caption</span>
                      </button>
                      <button
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border border-tone-700 bg-tone-900 text-tone-300 hover:text-tone-fg hover:bg-tone-800 transition-colors shadow-xs"
                        onClick={() => toast("Trendōva AI Demo: Editing caption.")}
                      >
                        <span className="material-symbols-outlined text-[14px]">edit</span>
                        <span>Edit Caption</span>
                      </button>
                      <button
                        className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-tone-fg text-tone-bg hover:bg-tone-200 transition-colors shadow-xs"
                        onClick={() => setTab("scheduler")}
                      >
                        Send to Scheduler
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={cn("workspace-panel pt-5", tab === "scheduler" ? "" : "hidden")}
              id="tab-panel-scheduler"
            >
              <div className="p-5 rounded-3xl bg-tone-900/60 border border-tone-800">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <h4 className="text-sm font-bold text-tone-fg">Week Overview & Optimal Slot</h4>
                    <p className="text-xs text-tone-400">
                      Illustrative recommendation · sample data.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-tone-800 text-tone-200 border border-tone-700">
                    Recommended: Wednesday @ 6:45 PM
                  </span>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center mb-4">
                  <div className="p-3 rounded-2xl bg-tone-950 border border-tone-800 text-xs">
                    <span className="text-tone-500 block font-medium">Mon</span>
                    <span className="text-sm font-bold text-tone-300 mt-1 block">14</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-tone-700 mx-auto mt-2 block"></span>
                  </div>
                  <div className="p-3 rounded-2xl bg-tone-950 border border-tone-800 text-xs">
                    <span className="text-tone-500 block font-medium">Tue</span>
                    <span className="text-sm font-bold text-tone-300 mt-1 block">15</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-tone-700 mx-auto mt-2 block"></span>
                  </div>
                  <div className="p-3 rounded-2xl bg-tone-fg text-tone-bg border border-tone-fg text-xs shadow-lg">
                    <span className="text-tone-700 block font-medium">Wed</span>
                    <span className="text-sm font-bold mt-1 block text-tone-bg">16</span>
                    <span className="w-2 h-2 rounded-full bg-tone-bg mx-auto mt-2 block"></span>
                  </div>
                  <div className="p-3 rounded-2xl bg-tone-950 border border-tone-800 text-xs">
                    <span className="text-tone-500 block font-medium">Thu</span>
                    <span className="text-sm font-bold text-tone-300 mt-1 block">17</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-tone-700 mx-auto mt-2 block"></span>
                  </div>
                  <div className="p-3 rounded-2xl bg-tone-950 border border-tone-800 text-xs">
                    <span className="text-tone-500 block font-medium">Fri</span>
                    <span className="text-sm font-bold text-tone-300 mt-1 block">18</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-tone-400 mx-auto mt-2 block"></span>
                  </div>
                  <div className="p-3 rounded-2xl bg-tone-950 border border-tone-800 text-xs">
                    <span className="text-tone-500 block font-medium">Sat</span>
                    <span className="text-sm font-bold text-tone-300 mt-1 block">19</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-tone-700 mx-auto mt-2 block"></span>
                  </div>
                  <div className="p-3 rounded-2xl bg-tone-950 border border-tone-800 text-xs">
                    <span className="text-tone-500 block font-medium">Sun</span>
                    <span className="text-sm font-bold text-tone-300 mt-1 block">20</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-tone-700 mx-auto mt-2 block"></span>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-tone-950 border border-tone-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-tone-800 text-tone-fg flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">insights</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-tone-fg">
                        Post Performance: More people are engaging this week
                      </span>
                      <span className="text-[11px] text-tone-400 font-medium block">
                        (+12% engagement over previous benchmark)
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono text-tone-400 bg-tone-900 border border-tone-800">
                    Sample data
                  </span>
                </div>
              </div>
            </div>
            <div
              className={cn("workspace-panel pt-5", tab === "personalization" ? "" : "hidden")}
              id="tab-panel-personalization"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 rounded-3xl bg-tone-900/60 border border-tone-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-tone-400 font-mono mb-3">
                    Brand Voice Calibration
                  </h4>
                  <div className="space-y-3.5">
                    <div>
                      <div className="flex justify-between text-xs font-medium text-tone-300 mb-1">
                        <span>Casual</span>
                        <span className="text-tone-fg font-mono">85%</span>
                      </div>
                      <div className="w-full bg-tone-800 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-tone-fg h-full w-[85%] rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-medium text-tone-300 mb-1">
                        <span>Formal</span>
                        <span className="text-tone-400 font-mono">15%</span>
                      </div>
                      <div className="w-full bg-tone-800 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-tone-600 h-full w-[15%] rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-medium text-tone-300 mb-1">
                        <span>Playful</span>
                        <span className="text-tone-300 font-mono">60%</span>
                      </div>
                      <div className="w-full bg-tone-800 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-tone-400 h-full w-[60%] rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-3xl bg-tone-950 border border-tone-800 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-tone-400 font-mono mb-3">
                      Audience & Palette Profile
                    </h4>
                    <div className="p-3.5 rounded-2xl bg-tone-900/70 border border-tone-800 mb-3">
                      <span className="text-[11px] text-tone-500 block uppercase font-mono">
                        Target Audience
                      </span>
                      <span className="text-xs font-bold text-tone-fg">Age group: 18–24</span>
                      <p className="text-[11px] text-tone-400 mt-0.5">
                        Culture-forward, streetwear enthusiasts, modern aesthetics.
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-medium text-tone-400">Visual Palette:</span>
                      <div className="flex gap-2 items-center">
                        <span
                          className="w-5 h-5 rounded-full bg-tone-fg border border-tone-700 shadow-xs"
                          title="Pure White"
                        ></span>
                        <span
                          className="w-5 h-5 rounded-full bg-tone-400 border border-tone-700 shadow-xs"
                          title="Silver"
                        ></span>
                        <span
                          className="w-5 h-5 rounded-full bg-tone-800 border border-tone-700 shadow-xs"
                          title="Obsidian"
                        ></span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-tone-800 flex justify-end">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-tone-800 text-tone-200 border border-tone-700">
                      Sample brand identity
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28 bg-tone-deep border-y border-tone-800/80" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-tone-fg mb-4">
              {" "}
              Explore Trendōva AI Features{" "}
            </h2>
            <p className="text-base sm:text-lg text-tone-400 leading-relaxed">
              {" "}
              From discovering trends to creating, scheduling, and personalizing content, Trendōva
              AI brings your essential marketing capabilities together in{" "}
              <span className="inline-block px-3 py-0.5 rounded-full bg-tone-900 text-tone-200 font-medium border border-tone-700">
                one workspace
              </span>
              .{" "}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="shimmer-card rounded-3xl border border-tone-800 bg-tone-deep p-7 sm:p-9 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-tone-900 border border-tone-700/80 text-tone-fg flex items-center justify-center mb-6 shadow-sm">
                  <span className="material-symbols-outlined text-[28px]">radar</span>
                </div>
                <h3 className="text-2xl font-bold text-tone-fg mb-2.5">Trend Scanner</h3>
                <p className="text-sm text-tone-400 leading-relaxed mb-6">
                  {" "}
                  Discover what's trending by exploring emerging topics and conversations across
                  social platforms.{" "}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-tone-950 border border-tone-800 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-tone-fg"></span>
                    <span className="text-xs font-semibold text-tone-300">
                      Aura Wear • #Streetwear
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-tone-900 border border-tone-800 text-tone-400">
                    Sample trend graph
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-tone-900/60 border border-tone-800">
                  <div className="flex items-baseline justify-between mb-2">
                    <div>
                      <span className="font-mono text-xs font-bold text-tone-fg">
                        #Streetwear Engagement Trend
                      </span>
                      <span className="text-[11px] text-tone-300 font-semibold block">
                        +92% conversation rate vs benchmark
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-tone-500">Mon–Fri</span>
                  </div>
                  <div className="h-12 w-full relative flex items-end pb-3">
                    <svg className="w-full h-8 overflow-visible" fill="none" viewBox="0 0 100 28">
                      <line
                        stroke="#27272a"
                        strokeDasharray="2 2"
                        strokeWidth="1"
                        x1="0"
                        x2="100"
                        y1="24"
                        y2="24"
                      />
                      <path
                        d="M2 22 L24 19 L48 14 L72 15 L98 3"
                        stroke="#ffffff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                      <circle cx="2" cy="22" fill="#ffffff" r="2" />
                      <circle cx="24" cy="19" fill="#ffffff" r="2" />
                      <circle cx="48" cy="14" fill="#ffffff" r="2" />
                      <circle cx="72" cy="15" fill="#ffffff" r="2" />
                      <circle
                        cx="98"
                        cy="3"
                        fill="#ffffff"
                        r="2.5"
                        stroke="#000000"
                        strokeWidth="1"
                      />
                    </svg>
                    <div className="absolute bottom-0 inset-x-0 flex justify-between text-[9px] text-tone-500 font-mono">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="shimmer-card rounded-3xl border border-tone-800 bg-tone-deep p-7 sm:p-9 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-tone-900 border border-tone-700/80 text-tone-fg flex items-center justify-center mb-6 shadow-sm">
                  <span className="material-symbols-outlined text-[28px]">auto_awesome</span>
                </div>
                <h3 className="text-2xl font-bold text-tone-fg mb-2.5">AI Writer</h3>
                <p className="text-sm text-tone-400 leading-relaxed mb-6">
                  {" "}
                  Create captions, advertising copy, and social media post ideas in your brand's own
                  voice.{" "}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-tone-950 border border-tone-800 shadow-xs">
                <div className="flex flex-wrap items-center justify-between text-[11px] text-tone-400 mb-2.5 gap-1.5">
                  <div>
                    <strong className="text-tone-fg">Brand:</strong> Aura Wear{" "}
                    <span className="text-tone-600">|</span>
                    <strong className="text-tone-fg">Platform:</strong> Instagram
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-tone-900 text-tone-300 font-medium text-[11px] border border-tone-700">
                    Tone: Bold & Playful
                  </span>
                </div>
                <div className="text-[11px] text-tone-400 mb-2 font-mono bg-tone-900 px-2.5 py-1 rounded-lg border border-tone-800">
                  <span className="text-tone-500">Content brief:</span> Promote our new oversized
                  hoodie.
                </div>
                <div className="p-3.5 rounded-xl bg-tone-900/60 border border-tone-800 text-xs text-tone-200 leading-relaxed font-sans mb-3">
                  <p className="mb-2.5 font-medium">
                    "Your new everyday essential just dropped. Oversized comfort, effortless style,
                    and a fit that speaks for itself. Which color are you picking? Shop the drop —
                    link in bio."
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-tone-800">
                    <span className="px-2 py-0.5 rounded-full bg-tone-800 border border-tone-700 text-[10px] font-mono text-tone-300">
                      #AuraWear
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-tone-800 border border-tone-700 text-[10px] font-mono text-tone-300">
                      #Streetwear
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-tone-800 border border-tone-700 text-[10px] font-mono text-tone-300">
                      #OOTD
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-tone-800 border border-tone-700 text-[10px] font-mono text-tone-300">
                      #StreetStyle
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-tone-800 border border-tone-700 text-[10px] font-mono text-tone-300">
                      #NewDrop
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <span className="text-[10px] text-tone-500 font-mono">
                    Aura Wear preset · sample caption
                  </span>
                  <div className="flex gap-2">
                    <button
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-tone-700 bg-tone-900 text-tone-300 hover:text-tone-fg hover:bg-tone-800 transition-colors copy-btn shadow-xs"
                      onClick={copy}
                    >
                      <span className="material-symbols-outlined text-[14px]">content_copy</span>
                      <span>Copy Caption</span>
                    </button>
                    <button
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-tone-700 bg-tone-900 text-tone-300 hover:text-tone-fg hover:bg-tone-800 transition-colors shadow-xs"
                      onClick={() => toast("Trendōva AI Demo: Edit mode opened.")}
                    >
                      <span className="material-symbols-outlined text-[14px]">edit</span>
                      <span>Edit Caption</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="shimmer-card rounded-3xl border border-tone-800 bg-tone-deep p-7 sm:p-9 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-tone-900 border border-tone-700/80 text-tone-fg flex items-center justify-center mb-6 shadow-sm">
                  <span className="material-symbols-outlined text-[28px]">calendar_month</span>
                </div>
                <h3 className="text-2xl font-bold text-tone-fg mb-2.5">Scheduler & Analyzer</h3>
                <p className="text-sm text-tone-400 leading-relaxed mb-6">
                  {" "}
                  Plan your content, explore recommended posting times, and understand how your
                  posts are performing.{" "}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-tone-950 border border-tone-800 shadow-xs">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-semibold text-tone-300">
                    Week Overview (Selected: Wednesday)
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-tone-900 border border-tone-700 text-tone-300 font-mono text-[10px]">
                    Optimal: 6:45 PM
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-tone-900/60 border border-tone-800 mb-2.5">
                  <p className="text-xs font-medium text-tone-300">
                    Post Performance: More people are engaging this week (+12% engagement)
                  </p>
                </div>
                <div className="flex justify-end">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-tone-500 bg-tone-900 border border-tone-800">
                    Sample data
                  </span>
                </div>
              </div>
            </div>
            <div className="shimmer-card rounded-3xl border border-tone-800 bg-tone-deep p-7 sm:p-9 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-tone-900 border border-tone-700/80 text-tone-fg flex items-center justify-center mb-6 shadow-sm">
                  <span className="material-symbols-outlined text-[28px]">fingerprint</span>
                </div>
                <h3 className="text-2xl font-bold text-tone-fg mb-2.5">Personalization Engine</h3>
                <p className="text-sm text-tone-400 leading-relaxed mb-6">
                  {" "}
                  Tailor every piece of content to your brand's style, tone, colors, and audience
                  preferences.{" "}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-tone-950 border border-tone-800 shadow-xs">
                <div className="space-y-2 mb-3">
                  <div>
                    <div className="flex justify-between text-[11px] font-medium text-tone-400 mb-0.5">
                      <span>Casual (85%)</span>
                      <span className="text-tone-fg">Primary</span>
                    </div>
                    <div className="w-full bg-tone-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-tone-fg h-full w-[85%] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-medium text-tone-400 mb-0.5">
                      <span>Formal (15%)</span>
                      <span className="text-tone-400">Minimal</span>
                    </div>
                    <div className="w-full bg-tone-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-tone-600 h-full w-[15%] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-medium text-tone-400 mb-0.5">
                      <span>Playful (60%)</span>
                      <span className="text-tone-300">Balanced</span>
                    </div>
                    <div className="w-full bg-tone-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-tone-400 h-full w-[60%] rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-tone-800 flex items-center justify-between text-xs">
                  <span className="text-tone-400 font-medium">
                    Target Audience: <strong className="text-tone-fg">Age group: 18–24</strong>
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
      <section className="py-20 md:py-28 bg-tone-deep" id="how-it-works">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-tone-fg mb-4">
              {" "}
              From Trend to Takeoff{" "}
            </h2>
            <p className="text-base sm:text-lg text-tone-400 leading-relaxed">
              {" "}
              Four connected capabilities help you move from discovering an opportunity to creating
              and scaling high-performing marketing content.{" "}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="shimmer-card p-6 rounded-3xl bg-tone-950 border border-tone-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-2xl font-extrabold text-tone-fg">01</span>
                  <div className="w-9 h-9 rounded-2xl bg-tone-900 border border-tone-700/80 text-tone-fg flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">search</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-tone-fg mb-2">Discover Trends</h3>
                <p className="text-xs text-tone-400 leading-relaxed mb-6">
                  {" "}
                  Trendōva AI helps you explore emerging trends and conversations across social
                  platforms, then surface high-impact concepts.{" "}
                </p>
              </div>
              <div className="pt-4 border-t border-tone-800/80">
                <div className="flex flex-wrap gap-1.5 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-tone-900 text-[10px] text-tone-300 font-medium border border-tone-800">
                    Instagram
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-tone-900 text-[10px] text-tone-300 font-medium border border-tone-800">
                    TikTok
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-tone-900 text-[10px] text-tone-300 font-medium border border-tone-800">
                    Reddit
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-tone-900 text-[10px] text-tone-300 font-medium border border-tone-800">
                    X
                  </span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-tone-900/60 border border-tone-800 font-mono text-[11px] text-tone-200">
                  {" "}
                  Sample: #Streetwear{" "}
                </div>
              </div>
            </div>
            <div className="shimmer-card p-6 rounded-3xl bg-tone-950 border border-tone-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-2xl font-extrabold text-tone-fg">02</span>
                  <div className="w-9 h-9 rounded-2xl bg-tone-900 border border-tone-700/80 text-tone-fg flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-tone-fg mb-2">Create Content</h3>
                <p className="text-xs text-tone-400 leading-relaxed mb-6">
                  {" "}
                  Turn raw ideas into captions, advertising copy, and social media posts written in
                  your authentic brand voice.{" "}
                </p>
              </div>
              <div className="pt-4 border-t border-tone-800/80">
                <div className="p-2 rounded-xl bg-tone-900/60 border border-tone-800 text-[11px] text-tone-300 mb-2 truncate">
                  {" "}
                  "Promote our new oversized hoodie."{" "}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-tone-400 font-semibold">
                    1-4 micro flow
                  </span>
                  <div className="flex gap-1">
                    <button
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-tone-900 border border-tone-700 text-tone-300 copy-btn hover:text-tone-fg"
                      onClick={copy}
                    >
                      Copy
                    </button>
                    <button
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-tone-900 border border-tone-700 text-tone-300 hover:text-tone-fg"
                      onClick={() => toast("Trendōva AI Demo: Editing flow.")}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="shimmer-card p-6 rounded-3xl bg-tone-950 border border-tone-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-2xl font-extrabold text-tone-fg">03</span>
                  <div className="w-9 h-9 rounded-2xl bg-tone-900 border border-tone-700/80 text-tone-fg flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">schedule</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-tone-fg mb-2">Schedule & Analyze</h3>
                <p className="text-xs text-tone-400 leading-relaxed mb-6">
                  {" "}
                  Find suggested posting times, organize your content calendar, and learn from
                  available performance insights.{" "}
                </p>
              </div>
              <div className="pt-4 border-t border-tone-800/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-tone-900 border border-tone-700 text-tone-300 text-[10px] font-medium">
                    6:45 PM recommendation
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-tone-500">
                  <span>Calendar snippet</span>
                  <span>Sample data</span>
                </div>
              </div>
            </div>
            <div className="shimmer-card p-6 rounded-3xl bg-tone-950 border border-tone-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-2xl font-extrabold text-tone-fg">04</span>
                  <div className="w-9 h-9 rounded-2xl bg-tone-900 border border-tone-700/80 text-tone-fg flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">tune</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-tone-fg mb-2">Personalize Everything</h3>
                <p className="text-xs text-tone-400 leading-relaxed mb-6">
                  {" "}
                  Save your brand's tone, identity, visual style, and audience preferences so every
                  generated post feels cohesive.{" "}
                </p>
              </div>
              <div className="pt-4 border-t border-tone-800/80">
                <div className="p-2 rounded-xl bg-tone-900/60 border border-tone-800 text-[11px] text-tone-300 flex items-center justify-between">
                  <span>Aura Wear</span>
                  <span className="font-medium text-tone-fg">Bold & Playful</span>
                </div>
                <div className="text-[10px] text-tone-500 mt-1 font-mono">
                  18–24 age group summary
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28 bg-tone-deep border-y border-tone-800/80" id="pricing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-tone-fg mb-3">
              {" "}
              Plans for Every Stage{" "}
            </h2>
            <p className="text-sm sm:text-base text-tone-400">
              {" "}
              Illustrative pricing — subject to final launch plans.{" "}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-10">
            <div className="shimmer-card rounded-3xl border border-tone-800 bg-tone-deep p-8 flex flex-col justify-between">
              <div>
                <div className="mb-5">
                  <h3 className="text-xl font-bold text-tone-fg">Starter Plan</h3>
                  <p className="text-xs text-tone-400 mt-1">
                    For creators and boutique labels getting started.
                  </p>
                </div>
                <div className="mb-6 pb-6 border-b border-tone-800">
                  <div className="text-4xl font-bold font-mono text-tone-fg">$0</div>
                  <span className="text-xs text-tone-500">/ month</span>
                </div>
                <ul className="space-y-3.5 mb-8">
                  <li className="flex items-center gap-2.5 text-xs text-tone-300">
                    <span className="material-symbols-outlined text-tone-fg text-[18px]">
                      check
                    </span>{" "}
                    <span>Up to 50 Trend Scans / mo</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs text-tone-300">
                    <span className="material-symbols-outlined text-tone-fg text-[18px]">
                      check
                    </span>{" "}
                    <span>AI Writer Core generation</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs text-tone-300">
                    <span className="material-symbols-outlined text-tone-fg text-[18px]">
                      check
                    </span>{" "}
                    <span>Weekly Content Scheduler</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs text-tone-300">
                    <span className="material-symbols-outlined text-tone-fg text-[18px]">
                      check
                    </span>{" "}
                    <span>1 Brand Identity Profile</span>
                  </li>
                </ul>
              </div>
              <Link
                className="w-full py-3 rounded-full border border-tone-700 bg-tone-900 text-tone-200 font-medium text-xs hover:bg-tone-800 hover:text-tone-fg transition-colors"
                to="/signup"
              >
                {" "}
                Get Started Free{" "}
              </Link>
            </div>
            <div className="shimmer-card rounded-3xl border border-tone-fg/40 bg-tone-950 p-8 flex flex-col justify-between shadow-2xl relative -translate-y-2 ring-1 ring-tone-fg/20">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-tone-fg text-tone-bg rounded-full text-[11px] font-bold uppercase tracking-wider shadow-md">
                {" "}
                POPULAR{" "}
              </div>
              <div>
                <div className="mb-5">
                  <h3 className="text-xl font-bold text-tone-fg">Professional Plan</h3>
                  <p className="text-xs text-tone-400 mt-1">
                    For growing brands ready to accelerate growth.
                  </p>
                </div>
                <div className="mb-6 pb-6 border-b border-tone-800">
                  <div className="text-4xl font-bold font-mono text-tone-fg">$19</div>
                  <span className="text-xs text-tone-500">/ month</span>
                </div>
                <ul className="space-y-3.5 mb-8">
                  <li className="flex items-center gap-2.5 text-xs text-tone-200">
                    <span className="material-symbols-outlined text-tone-fg text-[18px]">
                      check
                    </span>{" "}
                    <span>Unlimited Trend Exploration</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs text-tone-200">
                    <span className="material-symbols-outlined text-tone-fg text-[18px]">
                      check
                    </span>{" "}
                    <span>Multi-platform AI Copywriter</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs text-tone-200">
                    <span className="material-symbols-outlined text-tone-fg text-[18px]">
                      check
                    </span>{" "}
                    <span>Predictive Peak-Time Scheduler</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs text-tone-200">
                    <span className="material-symbols-outlined text-tone-fg text-[18px]">
                      check
                    </span>{" "}
                    <span>5 Custom Brand Profiles</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs text-tone-200">
                    <span className="material-symbols-outlined text-tone-fg text-[18px]">
                      check
                    </span>{" "}
                    <span>Advanced Performance Insights</span>
                  </li>
                </ul>
              </div>
              <Link
                className="w-full py-3 rounded-full bg-tone-fg hover:bg-tone-200 text-tone-bg font-semibold text-xs shadow-lg transition-all active:scale-95"
                to="/signup"
              >
                {" "}
                Choose Professional{" "}
              </Link>
            </div>
            <div className="shimmer-card rounded-3xl border border-tone-800 bg-tone-deep p-8 flex flex-col justify-between">
              <div>
                <div className="mb-5">
                  <h3 className="text-xl font-bold text-tone-fg">Team / Scale Plan</h3>
                  <p className="text-xs text-tone-400 mt-1">
                    For agency pods managing multiple brands.
                  </p>
                </div>
                <div className="mb-6 pb-6 border-b border-tone-800">
                  <div className="text-4xl font-bold font-mono text-tone-fg">$49</div>
                  <span className="text-xs text-tone-500">/ month</span>
                </div>
                <ul className="space-y-3.5 mb-8">
                  <li className="flex items-center gap-2.5 text-xs text-tone-300">
                    <span className="material-symbols-outlined text-tone-fg text-[18px]">
                      check
                    </span>{" "}
                    <span>Multi-seat Team Collaboration</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs text-tone-300">
                    <span className="material-symbols-outlined text-tone-fg text-[18px]">
                      check
                    </span>{" "}
                    <span>Custom Tone Fine-Tuning</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs text-tone-300">
                    <span className="material-symbols-outlined text-tone-fg text-[18px]">
                      check
                    </span>{" "}
                    <span>Priority Support & SLA</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs text-tone-300">
                    <span className="material-symbols-outlined text-tone-fg text-[18px]">
                      check
                    </span>{" "}
                    <span>Dedicated Agency Workspaces</span>
                  </li>
                </ul>
              </div>
              <Link
                className="w-full py-3 rounded-full border border-tone-700 bg-tone-900 text-tone-200 font-medium text-xs hover:bg-tone-800 hover:text-tone-fg transition-colors"
                to="/signup"
              >
                {" "}
                Choose Team{" "}
              </Link>
            </div>
          </div>
          <p className="text-center text-xs text-tone-500">
            {" "}
            All plans include 14-day risk-free exploratory period. Cancel or modify anytime.{" "}
          </p>
        </div>
      </section>
      <section className="py-20 md:py-28 bg-tone-deep" id="about">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs font-semibold text-tone-400 uppercase tracking-widest font-mono block mb-3">
              About Trendōva AI
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-tone-fg mb-6">
              {" "}
              Marketing Should Feel More Human.{" "}
            </h2>
            <p className="text-base sm:text-lg text-tone-400 leading-relaxed mb-12">
              {" "}
              Trendōva AI is designed to simplify the work behind effective marketing. By bringing
              trend discovery, content creation, scheduling, performance analysis, and brand
              personalization into one connected workspace, Trendōva AI helps brands spend less time
              juggling disconnected tools and more time developing ideas that resonate.{" "}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="shimmer-card p-6 rounded-3xl bg-tone-950 border border-tone-800">
                <div className="w-10 h-10 rounded-2xl bg-tone-900 border border-tone-700 text-tone-fg flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[20px]">filter_center_focus</span>
                </div>
                <h3 className="text-base font-bold text-tone-fg mb-2">Clarity Over Clutter</h3>
                <p className="text-xs text-tone-400 leading-relaxed">
                  {" "}
                  Find actionable marketing signals without getting lost in unnecessary data
                  noise.{" "}
                </p>
              </div>
              <div className="shimmer-card p-6 rounded-3xl bg-tone-950 border border-tone-800">
                <div className="w-10 h-10 rounded-2xl bg-tone-900 border border-tone-700 text-tone-fg flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[20px]">insights</span>
                </div>
                <h3 className="text-base font-bold text-tone-fg mb-2">Insights You Can Act On</h3>
                <p className="text-xs text-tone-400 leading-relaxed">
                  {" "}
                  Turn trending topics and performance data into intuitive next steps for your
                  campaign.{" "}
                </p>
              </div>
              <div className="shimmer-card p-6 rounded-3xl bg-tone-950 border border-tone-800">
                <div className="w-10 h-10 rounded-2xl bg-tone-900 border border-tone-700 text-tone-fg flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[20px]">record_voice_over</span>
                </div>
                <h3 className="text-base font-bold text-tone-fg mb-2">
                  A Voice That Feels Like You
                </h3>
                <p className="text-xs text-tone-400 leading-relaxed">
                  {" "}
                  Create content that reflects your brand's personality instead of sounding
                  generic.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28 bg-tone-deep border-y border-tone-800/80" id="faq">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold text-tone-400 uppercase tracking-widest font-mono block mb-2">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-tone-fg">
              {" "}
              Frequently Asked Questions{" "}
            </h2>
          </div>
          <div className="space-y-4">
            <div className="faq-item rounded-3xl border border-tone-800 bg-tone-950 overflow-hidden transition-all duration-200">
              <button
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-tone-fg focus:outline-none"
                onClick={() => setFaq(faq === 0 ? null : 0)}
                aria-expanded={faq === 0}
              >
                <span>Who is Trendōva AI built for?</span>{" "}
                <span
                  className={cn(
                    "material-symbols-outlined text-tone-400 transform transition-transform duration-200 icon-arrow",
                    faq === 0 ? "rotate-180" : "",
                  )}
                >
                  expand_more
                </span>
              </button>
              <div
                className={cn(
                  "faq-content px-6 pb-6 text-xs sm:text-sm text-tone-400 leading-relaxed border-t border-tone-800 pt-4",
                  faq === 0 ? "" : "hidden",
                )}
              >
                {" "}
                Trendōva AI is designed for growing brands, streetwear labels, modern
                direct-to-consumer businesses, creators, and marketing teams that want to discover
                relevant trends and create content that connects with their audience.{" "}
              </div>
            </div>
            <div className="faq-item rounded-3xl border border-tone-800 bg-tone-950 overflow-hidden transition-all duration-200">
              <button
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-tone-fg focus:outline-none"
                onClick={() => setFaq(faq === 1 ? null : 1)}
                aria-expanded={faq === 1}
              >
                <span>Are these live social media trends?</span>{" "}
                <span
                  className={cn(
                    "material-symbols-outlined text-tone-400 transform transition-transform duration-200 icon-arrow",
                    faq === 1 ? "rotate-180" : "",
                  )}
                >
                  expand_more
                </span>
              </button>
              <div
                className={cn(
                  "faq-content px-6 pb-6 text-xs sm:text-sm text-tone-400 leading-relaxed border-t border-tone-800 pt-4",
                  faq === 1 ? "" : "hidden",
                )}
              >
                {" "}
                Trend results depend on the data sources available to Trendōva AI. Examples shown in
                the demo may use sample data and should not be interpreted as live platform
                analytics. Where live trend data is available, Trendōva AI can help you explore
                relevant topics and content opportunities.{" "}
              </div>
            </div>
            <div className="faq-item rounded-3xl border border-tone-800 bg-tone-950 overflow-hidden transition-all duration-200">
              <button
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-tone-fg focus:outline-none"
                onClick={() => setFaq(faq === 2 ? null : 2)}
                aria-expanded={faq === 2}
              >
                <span>Can I explore Trendōva AI without adding a brand?</span>{" "}
                <span
                  className={cn(
                    "material-symbols-outlined text-tone-400 transform transition-transform duration-200 icon-arrow",
                    faq === 2 ? "rotate-180" : "",
                  )}
                >
                  expand_more
                </span>
              </button>
              <div
                className={cn(
                  "faq-content px-6 pb-6 text-xs sm:text-sm text-tone-400 leading-relaxed border-t border-tone-800 pt-4",
                  faq === 2 ? "" : "hidden",
                )}
              >
                {" "}
                Yes, the live demo allows you to explore the main features using a sample brand such
                as Aura Wear. You can evaluate the workflow prior to linking or configuring your own
                brand profile.{" "}
              </div>
            </div>
            <div className="faq-item rounded-3xl border border-tone-800 bg-tone-950 overflow-hidden transition-all duration-200">
              <button
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-tone-fg focus:outline-none"
                onClick={() => setFaq(faq === 3 ? null : 3)}
                aria-expanded={faq === 3}
              >
                <span>Does Trendōva AI guarantee marketing outcomes?</span>{" "}
                <span
                  className={cn(
                    "material-symbols-outlined text-tone-400 transform transition-transform duration-200 icon-arrow",
                    faq === 3 ? "rotate-180" : "",
                  )}
                >
                  expand_more
                </span>
              </button>
              <div
                className={cn(
                  "faq-content px-6 pb-6 text-xs sm:text-sm text-tone-400 leading-relaxed border-t border-tone-800 pt-4",
                  faq === 3 ? "" : "hidden",
                )}
              >
                {" "}
                No software can guarantee viral reach, conversion rates, or sales. Trendōva AI is
                engineered to help discover opportunities, synthesize compelling creative copy,
                optimize schedules, and draw from performance benchmarks.{" "}
              </div>
            </div>
            <div className="faq-item rounded-3xl border border-tone-800 bg-tone-950 overflow-hidden transition-all duration-200">
              <button
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-tone-fg focus:outline-none"
                onClick={() => setFaq(faq === 4 ? null : 4)}
                aria-expanded={faq === 4}
              >
                <span>How does Brand Voice calibration work?</span>{" "}
                <span
                  className={cn(
                    "material-symbols-outlined text-tone-400 transform transition-transform duration-200 icon-arrow",
                    faq === 4 ? "rotate-180" : "",
                  )}
                >
                  expand_more
                </span>
              </button>
              <div
                className={cn(
                  "faq-content px-6 pb-6 text-xs sm:text-sm text-tone-400 leading-relaxed border-t border-tone-800 pt-4",
                  faq === 4 ? "" : "hidden",
                )}
              >
                {" "}
                Brand Voice captures your preferred tone, personality, visual aesthetics, and
                audience demographics. These vectors guide generative models so output copy remains
                tightly harmonized with your brand DNA.{" "}
              </div>
            </div>
            <div className="faq-item rounded-3xl border border-tone-800 bg-tone-950 overflow-hidden transition-all duration-200">
              <button
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-tone-fg focus:outline-none"
                onClick={() => setFaq(faq === 5 ? null : 5)}
                aria-expanded={faq === 5}
              >
                <span>Why does cultural relevance matter?</span>{" "}
                <span
                  className={cn(
                    "material-symbols-outlined text-tone-400 transform transition-transform duration-200 icon-arrow",
                    faq === 5 ? "rotate-180" : "",
                  )}
                >
                  expand_more
                </span>
              </button>
              <div
                className={cn(
                  "faq-content px-6 pb-6 text-xs sm:text-sm text-tone-400 leading-relaxed border-t border-tone-800 pt-4",
                  faq === 5 ? "" : "hidden",
                )}
              >
                {" "}
                Because authentic emotional resonance drives loyalty. Brands that cultivate
                community rather than just push product build lasting relevance. With Trendōva AI,
                staying on the pulse is seamless.{" "}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28 relative overflow-hidden bg-tone-bg text-tone-fg border-b border-tone-800">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-tone-fg/[0.05] rounded-full blur-[140px] pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 text-tone-fg">
            {" "}
            Your Next Great Campaign Starts Here.{" "}
          </h2>
          <p className="text-base sm:text-lg text-tone-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {" "}
            Spot emerging trends. Create content that resonates. Grow your brand with AI built for
            culture and commerce.{" "}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-tone-fg hover:bg-tone-200 text-tone-bg font-semibold text-sm shadow-xl transition-all duration-200 active:scale-95"
              href="#workspace"
            >
              <span>Explore Demo</span>{" "}
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
            <a
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-tone-900 hover:bg-tone-800 border border-tone-700 text-tone-200 font-medium text-sm transition-all duration-200 active:scale-95"
              href="#how-it-works"
            >
              <span>See How It Works</span>{" "}
              <span className="material-symbols-outlined text-[18px]">play_circle</span>
            </a>
          </div>
        </div>
      </section>
      <footer className="bg-tone-bg border-t border-tone-900">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-3">
              <img
                className="h-7 w-7 rounded-full object-contain brightness-100"
                alt="Trendōva AI"
                src="/trendova-logo.png"
              />
              <span className="text-lg font-bold text-tone-fg flex items-center gap-1.5 font-sans">
                <span>Trendōva</span>{" "}
                <span className="text-xs px-1.5 py-0.5 rounded border border-tone-700 bg-tone-900 text-tone-300 font-mono">
                  AI
                </span>
              </span>
            </div>
            <p className="text-xs text-tone-500 text-center md:text-left max-w-sm">
              {" "}
              AI-Powered Marketing Intelligence & Content Platform for Modern Brands.{" "}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-tone-400 font-medium">
            <a className="hover:text-tone-fg transition-colors" href="#features">
              Features
            </a>
            <a className="hover:text-tone-fg transition-colors" href="#how-it-works">
              How It Works
            </a>
            <a className="hover:text-tone-fg transition-colors" href="#pricing">
              Pricing
            </a>
            <a className="hover:text-tone-fg transition-colors" href="#about">
              About
            </a>
            <Link className="hover:text-tone-fg transition-colors" to="/login">
              Log In
            </Link>
            <a className="hover:text-tone-fg transition-colors" href="#workspace">
              Explore Demo
            </a>
          </div>
          <div className="text-xs text-tone-500">
            {" "}
            © 2026 Trendova AI Inc. All rights reserved.{" "}
          </div>
        </div>
      </footer>
    </div>
  );
}
