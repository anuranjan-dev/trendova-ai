import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3, CalendarClock, LayoutGrid, LineChart, TrendingUp } from "lucide-react";

import { PageShell, Panel } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/insights")({
  head: () => ({
    meta: [
      { title: "Insights (Coming Soon) — Trendova AI" },
      { name: "description", content: "Insights is in development: content performance, best formats and engagement patterns from your real data." },
      { property: "og:title", content: "Insights (Coming Soon) — Trendova AI" },
      { property: "og:description", content: "Insights is in development." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Insights,
});

const PLANNED = [
  { icon: BarChart3, title: "Content performance overview" },
  { icon: LayoutGrid, title: "Best-performing formats" },
  { icon: LineChart, title: "Engagement patterns" },
  { icon: CalendarClock, title: "Suggested posting windows" },
  { icon: TrendingUp, title: "Brand and content trends" },
];

function Insights() {
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-block rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">Coming Soon</span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Insights is in development</h1>
        <p className="mt-3 text-muted-foreground">Understand your brand's content performance and discover patterns across your publishing history.</p>
      </div>
      <Panel className="mx-auto mt-10 max-w-3xl">
        <h2 className="font-semibold">What's planned</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {PLANNED.map((p) => (
            <li key={p.title} className="flex items-center gap-3 rounded-xl bg-surface p-3 text-sm">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary-soft text-primary"><p.icon className="size-4" /></span>
              {p.title}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-muted-foreground">These features depend on real connected or imported data. Nothing here is live yet, so no numbers are shown.</p>
        <Button asChild variant="outline" className="mt-5"><Link to="/app/scheduler">Plan content in the meantime</Link></Button>
      </Panel>
    </PageShell>
  );
}
