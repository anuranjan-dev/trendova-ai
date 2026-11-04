import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { NovaLogo } from "@/components/nova/logo";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="hero-glow flex min-h-screen flex-col items-center justify-center px-4 py-14">
      <Link to="/" aria-label="Trendova AI home">
        <NovaLogo />
      </Link>

      <div className="mt-8 w-full max-w-sm animate-rise">
        <div className="surface-sheen rounded-3xl border border-border bg-surface p-7">
          <h1 className="text-xl font-semibold">{title}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
        <div className="mt-5 text-center text-sm text-muted-foreground">{footer}</div>
      </div>
    </div>
  );
}
