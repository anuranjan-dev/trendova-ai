import { Link, createFileRoute } from "@tanstack/react-router";
import { MailCheck } from "lucide-react";
import { useState } from "react";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Reset your password — Trendova AI" },
      { name: "description", content: "Send yourself a Trendova AI password reset link." },
      { property: "og:title", content: "Reset your password — Trendova AI" },
      { property: "og:description", content: "Send yourself a Trendova AI password reset link." },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <AuthShell
      title={sent ? "Check your inbox" : "Reset your password"}
      subtitle={
        sent
          ? "If an account exists for that address, a reset link is on its way."
          : "We'll email you a link to set a new password."
      }
      footer={
        <Link to="/login" className="text-foreground underline underline-offset-4">
          Back to log in
        </Link>
      }
    >
      {sent ? (
        <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
          <MailCheck className="size-5 text-primary" />
          <p className="text-sm text-muted-foreground">
            The link expires in 30 minutes for your security.
          </p>
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              className="h-11 rounded-xl"
            />
          </div>
          <Button type="submit" className="h-11 w-full rounded-xl">
            Send reset link
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
