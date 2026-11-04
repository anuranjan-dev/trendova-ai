import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarClock, CalendarPlus, Clock, LineChart, PenLine, Radar, Sparkles, UserRound, type LucideIcon } from "lucide-react";

import { PageShell, Panel, SectionTitle } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import type { ActivityKind } from "@/lib/nova/types";
import { useWorkspace } from "@/lib/nova/workspace-store";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Overview — Trendova AI" },
      { name: "description", content: "Your Trendova AI workspace: scan trends, write captions, plan content and set up your brand voice." },
      { property: "og:title", content: "Overview — Trendova AI" },
      { property: "og:description", content: "Decide what to do next in your Trendova AI workspace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Overview,
});

const ACTIONS: { to: "/app/trends" | "/app/captions" | "/app/scheduler" | "/app/insights"; title: string; body: string; icon: LucideIcon; soon?: boolean }[] = [
  { to: "/app/trends", title: "Scan Trends", body: "Explore topics and content opportunities for your category.", icon: Radar },
  { to: "/app/captions", title: "Generate a Caption", body: "Turn your idea into a platform-ready caption.", icon: PenLine },
  { to: "/app/scheduler", title: "Scheduler & Analyzer", body: "Organize planned content and review available performance data.", icon: CalendarClock },
  { to: "/app/insights", title: "Insights", body: "Explore upcoming analytics capabilities.", icon: LineChart, soon: true },
];

const KIND_ICON: Record<ActivityKind, LucideIcon> = { trend: Radar, content: PenLine, caption: PenLine, voice: Sparkles, plan: CalendarPlus, profile: UserRound };

function Overview() {
  const { user, profile, profileComplete, activity, clearActivity } = useWorkspace();
  const first = user.fullName.trim().split(/\s+/)[0];

  return (
    <PageShell>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{first ? `Welcome back, ${first}` : "Welcome to Trendōva AI"}</h1>
      <p className="mt-2 text-muted-foreground">What would you like to work on today?</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {ACTIONS.map((a) => (
          <Link key={a.to} to={a.to} className="group flex flex-col rounded-[1.125rem] border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <div className="flex items-center justify-between">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><a.icon className="size-5" /></span>
              {a.soon ? <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">Coming Soon</span> : <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />}
            </div>
            <p className="mt-4 font-semibold">{a.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <Panel>
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-primary-soft text-primary"><Sparkles className="size-5" /></span>
            <div>
              <p className="font-semibold">{profileComplete ? "Your brand voice is ready." : "Your brand voice is not set up yet."}</p>
              <p className="text-sm text-muted-foreground">{profileComplete ? `${profile.brandName} · ${profile.tone}` : "Define your tone and personality to personalize content."}</p>
            </div>
          </div>
          <Button asChild variant={profileComplete ? "outline" : "default"} className="mt-5"><Link to="/app/voice">{profileComplete ? "Edit Brand Voice" : "Set Up Brand Voice"}</Link></Button>
        </Panel>

        <Panel>
          <div className="flex items-start justify-between">
            <SectionTitle title="Recent activity" />
            {activity.length ? <Button variant="ghost" size="sm" onClick={clearActivity}>Clear</Button> : null}
          </div>
          {activity.length ? (
            <ul className="space-y-3">
              {activity.slice(0, 6).map((a) => {
                const Icon = KIND_ICON[a.kind] ?? Clock;
                return (
                  <li key={a.id} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-2 text-primary"><Icon className="size-4" /></span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{a.title}</p>
                      <p className="truncate text-sm text-muted-foreground">{a.detail}</p>
                    </div>
                    <time className="shrink-0 text-xs text-muted-foreground" dateTime={new Date(a.createdAt).toISOString()}>{new Date(a.createdAt).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</time>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Your recent activity will appear here as you use Trendōva AI.</p>
          )}
        </Panel>
      </div>
    </PageShell>
  );
}
