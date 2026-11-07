import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { GoogleIcon } from "@/components/auth/auth-split";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Sign in — Trendova AI" },
      { name: "description", content: "Sign in to continue to your Trendova AI workspace." },
      { property: "og:title", content: "Sign in — Trendova AI" },
      { property: "og:description", content: "Sign in to continue to your Trendova AI workspace." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="trendova-login relative flex min-h-screen flex-col bg-background text-foreground">
      <header className="relative z-10 border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-8">
          <Link to="/" aria-label="Trendova AI home" className="flex shrink-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
            <img src="/trendova-logo.png" alt="" className="size-8 object-contain sm:size-9" />
            <span className="text-lg font-semibold sm:text-xl">Trendōva AI</span>
          </Link>
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="hidden text-muted-foreground sm:inline">New to Trendōva?</span>
            <Button asChild variant="link" className="h-auto p-0 text-xs underline decoration-border-strong underline-offset-4 sm:text-sm">
              <Link to="/">Explore Platform</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-8 sm:py-12 md:py-16">
        <div className="w-full max-w-[440px] sm:max-w-[460px] md:max-w-[500px]">
          <div className="login-card rounded-2xl border border-border bg-card p-6 sm:rounded-3xl sm:p-8 md:p-10">
            <div className="login-enter mb-8 text-center sm:text-left">
              <div className="mb-6 flex justify-center sm:justify-start">
                <div className="login-emblem flex size-12 items-center justify-center rounded-xl border border-border bg-secondary p-2">
                  <img src="/trendova-logo.png" alt="" className="size-full object-contain" />
                </div>
              </div>
              <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Welcome back.</h1>
              <p className="text-sm text-muted-foreground sm:text-base">Sign in to continue to your workspace.</p>
            </div>
      <Button
        type="button"
        variant="outline"
        className="login-enter h-12 w-full justify-between gap-2 rounded-xl bg-secondary px-4 text-sm font-medium"
        onClick={() =>
          toast.info("Google sign-in isn't connected yet. It needs a sign-in service turned on first.")
        }
      >
        <span className="flex items-center gap-3"><GoogleIcon />Continue with Google</span>
        <span className="rounded-full border border-border bg-secondary px-2 py-0.5 font-mono text-[9px] uppercase text-muted-foreground sm:text-[10px]">Coming Soon</span>
      </Button>

      <div className="login-enter my-7 flex items-center gap-3 font-mono text-[10px] uppercase text-muted-foreground sm:text-xs">
        <span className="h-px flex-1 bg-border" />
        or continue with email
        <span className="h-px flex-1 bg-border" />
      </div>

      <form
        className="login-enter space-y-5"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const email = String(fd.get("email") ?? "").trim();
          const password = String(fd.get("password") ?? "");
          if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email address.");
          if (!password) return setError("Enter your password.");
          setError(null);
          setPending(true);
          setTimeout(() => void navigate({ to: "/app" }), 500);
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="name@company.com" className="login-input h-12 rounded-xl bg-secondary px-4 sm:h-[52px]" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs text-muted-foreground hover:text-foreground sm:text-sm">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={show ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              className="login-input h-12 rounded-xl bg-secondary px-4 pr-12 font-mono sm:h-[52px]"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute right-2 top-1/2 size-9 -translate-y-1/2 rounded-lg text-muted-foreground hover:text-foreground"
            >
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </Button>
          </div>
        </div>
        {error ? (
          <p role="alert" className="text-sm text-destructive">{error}</p>
        ) : null}
        <Button type="submit" disabled={pending} className="group mt-2 h-12 w-full rounded-xl text-sm font-semibold sm:h-[52px] sm:text-base">
          {pending ? <><LoaderCircle className="animate-spin" />Signing in…</> : <>Sign in<ArrowRight className="transition-transform group-hover:translate-x-1" /></>}
        </Button>
      </form>
            <div className="login-enter mt-8 text-center text-xs text-muted-foreground sm:text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="ml-1 font-semibold text-foreground underline decoration-border-strong underline-offset-4 hover:decoration-foreground">Create one</Link>
            </div>
          </div>
          <div className="mt-6 text-center font-mono text-[10px] text-muted-foreground sm:text-xs">Demo access · Authentication not connected</div>
        </div>
      </main>
      <footer className="relative z-10 border-t border-border bg-background py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 text-xs text-muted-foreground sm:justify-start sm:px-8">
          <img src="/trendova-logo.png" alt="" className="size-3.5 object-contain" />
          <span>© 2026 Trendōva AI. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
