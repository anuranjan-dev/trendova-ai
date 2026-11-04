import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AuthSplit, GoogleIcon } from "@/components/auth/auth-split";
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
    <AuthSplit
      title="Welcome back."
      subtitle="Sign in to continue to your Trendōva AI workspace."
      footer={
        <>
          New to Trendōva AI?{" "}
          <Link to="/signup" className="font-medium text-primary underline-offset-4 hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <Button
        type="button"
        variant="outline"
        className="h-12 w-full gap-3 rounded-xl bg-card text-sm font-medium"
        onClick={() =>
          toast.info("Google sign-in isn't connected yet. It needs a sign-in service turned on first.")
        }
      >
        <GoogleIcon />
        Continue with Google
      </Button>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or continue with email
        <span className="h-px flex-1 bg-border" />
      </div>

      <form
        className="space-y-4"
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
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" className="h-11 rounded-xl bg-card" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs font-medium text-primary hover:underline">
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
              className="h-11 rounded-xl bg-card pr-11"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute right-2 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>
        {error ? (
          <p role="alert" className="text-sm text-destructive">{error}</p>
        ) : null}
        <Button type="submit" disabled={pending} className="h-11 w-full rounded-xl">
          {pending ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </AuthSplit>
  );
}
