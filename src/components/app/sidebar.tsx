import { Link, useRouterState } from "@tanstack/react-router";
import {
  CalendarClock,
  LayoutDashboard,
  LineChart,
  PenLine,
  Radar,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { NovaLogo } from "@/components/nova/logo";
import { initials, useWorkspace } from "@/lib/nova/workspace-store";
import { cn } from "@/lib/utils";

const nav: {
  to: "/app" | "/app/trends" | "/app/captions" | "/app/scheduler" | "/app/voice" | "/app/insights";
  label: string;
  icon: LucideIcon;
  exact?: boolean;
  soon?: boolean;
}[] = [
  { to: "/app", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/app/trends", label: "Trend Scanner", icon: Radar },
  { to: "/app/captions", label: "AI Caption Generator", icon: PenLine },
  { to: "/app/scheduler", label: "Scheduler & Analyzer", icon: CalendarClock },
  { to: "/app/voice", label: "Brand Voice", icon: Sparkles },
  { to: "/app/insights", label: "Insights", icon: LineChart, soon: true },
];

export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, profileComplete } = useWorkspace();
  const profileActive = pathname.startsWith("/app/profile");

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="px-5 py-5">
        <Link to="/app" onClick={onNavigate} aria-label="Trendova AI overview">
          <NovaLogo />
        </Link>
      </div>

      <nav aria-label="Workspace" className="space-y-1 px-3">
        {nav.map((item) => {
          const active = item.exact ? pathname === item.to || pathname === "/app/" : pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
              )}
            >
              {active ? <span aria-hidden className="absolute inset-y-2 left-0 w-1 rounded-full bg-primary" /> : null}
              <item.icon className="size-4 shrink-0" />
              <span className="truncate">{item.label}</span>
              {item.soon ? (
                <span className="ml-auto rounded-full bg-surface-2 px-2 py-0.5 text-[0.65rem] font-medium text-muted-foreground">
                  Soon
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-sidebar-border p-3">
        <Link
          to="/app/profile"
          onClick={onNavigate}
          aria-label="Open your profile"
          className={cn(
            "flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-sidebar-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            profileActive && "bg-sidebar-accent",
          )}
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            {initials(user.fullName)}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium text-foreground">
              {user.fullName || "Your profile"}
            </span>
            <span className="block truncate text-xs text-muted-foreground">
              {profileComplete ? "Brand voice ready" : "Brand voice not set up"}
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
}
