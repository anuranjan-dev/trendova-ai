import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function NovaAuthLogo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="inline-flex size-9 items-center justify-center overflow-hidden rounded-xl border border-foreground/15 bg-black">
        <img src="/trendova-logo.png" alt="" className="size-full object-cover" />
      </span>
      <span className="text-base font-semibold tracking-[0.08em]">Trendōva AI</span>
    </span>
  );
}

function SignalVisual() {
  return (
    <svg viewBox="0 0 400 220" className="w-full max-w-md" aria-hidden="true">
      {[60, 100, 140, 180].map((r, i) => (
        <circle
          key={r}
          cx="80"
          cy="180"
          r={r}
          fill="none"
          stroke="var(--primary)"
          strokeOpacity={0.35 - i * 0.07}
          strokeWidth="1.25"
        />
      ))}
      <path
        d="M20 190 C 110 170, 170 120, 230 95 S 340 40, 385 30"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="385" cy="30" r="6" fill="var(--primary)" />
      <circle cx="385" cy="30" r="14" fill="var(--primary)" fillOpacity="0.15" />
    </svg>
  );
}

export function AuthSplit({
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
    <div className="nova-auth grid min-h-screen lg:grid-cols-2">
      <aside className="hidden flex-col justify-between border-r border-border bg-accent/60 p-12 lg:flex">
        <Link to="/" aria-label="Trendova AI home" className="w-fit rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <NovaAuthLogo />
        </Link>
        <div className="max-w-md">
          <h2 className="text-4xl font-semibold leading-tight tracking-tight">
            Make your next move matter.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Discover emerging trends. Create content that sounds like you. Build your brand
            with greater clarity.
          </p>
        </div>
        <SignalVisual />
      </aside>

      <main className="flex flex-col items-center justify-center px-5 py-12">
        <Link to="/" aria-label="Trendova AI home" className="mb-10 lg:hidden">
          <NovaAuthLogo />
        </Link>
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-8 text-center text-sm text-muted-foreground">{footer}</div>
        </div>
      </main>
    </div>
  );
}

export function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-5" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}
