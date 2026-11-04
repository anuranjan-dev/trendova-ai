import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Request access — Trendova AI" },
      {
        name: "description",
        content: "Set up your brand workspace in Trendova AI — trend intelligence and on-brand social content for youth brands.",
      },
      { property: "og:title", content: "Request access — Trendova AI" },
      {
        property: "og:description",
        content: "Set up your brand workspace in Trendova AI — trend intelligence for youth-brand marketing teams.",
      },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);

  return (
    <AuthShell
      title="Create your brand workspace"
      subtitle="For brand, social and growth teams. No credit card required."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-foreground underline underline-offset-4">
            Log in
          </Link>
        </>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setPending(true);
          setTimeout(() => void navigate({ to: "/app" }), 500);
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            required
            autoComplete="name"
            placeholder="Ada Reyes"
            className="h-11 rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
          <Input
            id="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className="h-11 rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className="h-11 rounded-xl"
          />
        </div>
        <Button type="submit" disabled={pending} className="h-11 w-full rounded-xl">
          {pending ? "Creating workspace…" : "Start for free"}
        </Button>
        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          By continuing you agree to the Terms of Service and Privacy Policy.
        </p>
      </form>
    </AuthShell>
  );
}
