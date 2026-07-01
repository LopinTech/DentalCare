"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FlaskConical, LayoutDashboard, ClipboardList, Bell, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { LogoutButton } from "@/components/logout-button";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Overview", href: "/lab", icon: LayoutDashboard },
  { label: "Orders", href: "/lab/orders", icon: ClipboardList },
];

function LabSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  return (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-white">
      <div className="flex h-16 items-center justify-between px-5 border-b border-border">
        <Link href="/lab" className="flex items-center gap-2 font-bold text-primary text-base">
          <FlaskConical className="size-5" />
          Lab Portal
        </Link>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-muted-foreground hover:text-foreground">
            <X className="size-5" />
          </button>
        )}
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-0.5">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || (href !== "/lab" && pathname.startsWith(href));
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <Icon className="size-4.5 shrink-0" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="border-t border-border px-3 py-3">
        <LogoutButton />
      </div>
    </aside>
  );
}

function LabHeader({ onMenuOpen }: { onMenuOpen: () => void }) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-white px-4 lg:h-16 lg:px-6">
      <div className="flex items-center gap-2">
        <button onClick={onMenuOpen} className="lg:hidden text-muted-foreground hover:text-foreground mr-1">
          <FlaskConical className="size-5" />
        </button>
        <span className="text-sm font-semibold text-foreground">Lab Portal</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
          <Bell className="size-4.5" />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-destructive" />
        </Button>
        <LogoutButton />
      </div>
    </header>
  );
}

export default function LabLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-secondary">
      <div className="hidden lg:flex">
        <LabSidebar />
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute left-0 top-0 bottom-0" onClick={(e) => e.stopPropagation()}>
            <LabSidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <LabHeader onMenuOpen={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
