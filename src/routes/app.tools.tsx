import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { tools } from "@/lib/nova/tools";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/tools")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Marketing Modules — Trendova AI" },
      {
        name: "description",
        content:
          "Trend scanning, content generation, brand voice and performance insights — with hashtag intelligence, listening and creator matching coming next.",
      },
      { property: "og:title", content: "Marketing Modules — Trendova AI" },
      {
        property: "og:description",
        content: "Every Trendova AI marketing module in one place, from trend intelligence to content strategy.",
      },
    ],
  }),
  component: ToolsPage,
});

function ToolsPage() {
  const navigate = useNavigate();
  const available = tools.filter((t) => t.status === "available");
  const soon = tools.filter((t) => t.status === "soon");

  return (
    <div className="scroll-slim h-full overflow-y-auto">
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-8 sm:py-14">
        <h1 className="text-2xl font-semibold sm:text-3xl">Explore</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Everything Trendōva AI can do for your brand, in plain English. Click any card below to open it.
        </p>

        <section className="mt-10">
          <h2 className="text-[0.7rem] font-medium tracking-wider text-muted-foreground uppercase">
            Ready to use — click to open
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {available.map((tool) => (
              <button
                key={tool.name}
                type="button"
                onClick={() => tool.to && void navigate({ to: tool.to })}
                className="group surface-sheen flex flex-col rounded-2xl border border-border bg-surface p-5 text-left transition-colors hover:border-border-strong hover:bg-surface-2"
              >
                <span className="flex size-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <tool.icon className="size-4" />
                </span>
                <span className="mt-4 flex items-center gap-1.5 text-sm font-medium">
                  {tool.name}
                  <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {tool.description}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-12 pb-6">
          <h2 className="text-[0.7rem] font-medium tracking-wider text-muted-foreground uppercase">
            Not built yet — you can't click these
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {soon.map((tool) => (
              <div
                key={tool.name}
                className={cn(
                  "rounded-2xl border border-border bg-background p-5",
                  "transition-colors hover:border-border-strong",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-surface text-foreground/70">
                    <tool.icon className="size-4" />
                  </span>
                  <Badge variant="outline" className="border-primary/40 text-primary">
                    Soon
                  </Badge>
                </div>
                <p className="mt-4 text-sm font-medium">{tool.name}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {tool.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
