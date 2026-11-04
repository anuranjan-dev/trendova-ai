import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { AppSidebar } from "@/components/app/sidebar";
import { NovaLogo } from "@/components/nova/logo";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { WorkspaceProvider } from "@/lib/nova/workspace-store";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  const [open, setOpen] = useState(false);

  // Workspace-only palette; also applied on <html> so dropdowns/dialogs match.
  useEffect(() => {
    document.documentElement.classList.add("nova-ws");
    return () => document.documentElement.classList.remove("nova-ws");
  }, []);

  return (
    <WorkspaceProvider>
      <div className="nova-ws flex h-screen overflow-hidden bg-background text-foreground">
        <aside className="hidden w-[16.5rem] shrink-0 border-r border-sidebar-border lg:block">
          <AppSidebar />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-14 items-center gap-3 border-b border-border px-4 lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                aria-label="Open navigation"
                className="rounded-lg p-2 text-muted-foreground hover:text-foreground"
              >
                <Menu className="size-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[16.5rem] border-sidebar-border p-0">
                <SheetTitle className="sr-only">Trendova AI navigation</SheetTitle>
                <AppSidebar onNavigate={() => setOpen(false)} />
              </SheetContent>
            </Sheet>
            <NovaLogo />
          </header>

          <main className="min-h-0 flex-1 overflow-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </WorkspaceProvider>
  );
}
