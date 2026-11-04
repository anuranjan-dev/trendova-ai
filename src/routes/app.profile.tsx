import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LogOut, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { PageHeader, PageShell, Panel } from "@/components/app/page-header";
import { useTheme } from "@/components/nova/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { initials, useWorkspace } from "@/lib/nova/workspace-store";

export const Route = createFileRoute("/app/profile")({
  head: () => ({
    meta: [
      { title: "Your profile — Trendova AI" },
      { name: "description", content: "Edit your name, switch between light and dark mode, and check your Brand Voice." },
      { property: "og:title", content: "Your profile — Trendova AI" },
      { property: "og:description", content: "Your Trendova AI profile and appearance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Profile,
});

function Profile() {
  const { user, saveUser, hydrated, profileComplete, logActivity } = useWorkspace();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (hydrated) { setName(user.fullName); setEmail(user.email); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  function save() {
    if (!name.trim()) return setErr("Please enter your name.");
    if (email && !/^\S+@\S+\.\S+$/.test(email)) return setErr("Please enter a valid email address.");
    setErr("");
    saveUser({ fullName: name.trim(), email: email.trim() });
    logActivity("profile", "Updated profile", name.trim());
    toast.success("Profile saved");
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-2xl">
        <PageHeader title="Your profile" description="The essentials for your Trendōva AI workspace." />
        <Panel className="space-y-5">
          <div className="flex items-center gap-4">
            <span className="flex size-14 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">{initials(name)}</span>
            <div><p className="font-medium">{name || "Add your name"}</p><p className="text-sm text-muted-foreground">{email || "No email added"}</p></div>
          </div>
          <div className="space-y-2"><Label htmlFor="pf-name">Full name</Label><Input id="pf-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" /></div>
          <div className="space-y-2">
            <Label htmlFor="pf-email">Email address</Label>
            <Input id="pf-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            <p className="text-xs text-muted-foreground">Accounts aren't connected yet, so this is saved in this browser only and isn't verified.</p>
          </div>
          {err ? <p className="text-sm text-destructive">{err}</p> : null}
          <Button onClick={save}>Save profile</Button>
        </Panel>

        <Panel className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {theme === "dark" ? <Moon className="size-5 text-primary" /> : <Sun className="size-5 text-primary" />}
            <div><p className="font-medium">Appearance</p><p className="text-sm text-muted-foreground">{theme === "dark" ? "Dark mode" : "Light mode"}</p></div>
          </div>
          <Switch checked={theme === "dark"} onCheckedChange={toggle} aria-label="Dark mode" />
        </Panel>

        <Panel className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div><p className="font-medium">{profileComplete ? "Brand voice ready" : "Brand voice not set up"}</p><p className="text-sm text-muted-foreground">Used to personalise your captions.</p></div>
          <Button asChild variant="outline"><Link to="/app/voice">{profileComplete ? "Edit Brand Voice" : "Set up Brand Voice"}</Link></Button>
        </Panel>

        <Button variant="ghost" className="mt-6 text-muted-foreground" onClick={() => void navigate({ to: "/login" })}><LogOut className="size-4" /> Sign out</Button>
      </div>
    </PageShell>
  );
}
