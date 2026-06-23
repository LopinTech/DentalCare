"use client";

import { AdminSidebar } from "@/admin/sidebar";
import { AdminHeader } from "@/admin/header";
import { AdminBottomNav } from "@/admin/bottom-nav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-secondary">
      {/* Desktop sidebar — hidden on mobile */}
      <div className="hidden lg:flex">
        <AdminSidebar />
      </div>

      {/* Main content column */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader />

        {/* Scrollable content — extra bottom padding on mobile for the tab bar */}
        <main className="flex-1 overflow-y-auto p-4 pb-24 lg:p-6 lg:pb-6">
          {children}
        </main>
      </div>

      {/* Mobile bottom tab bar */}
      <AdminBottomNav />
    </div>
  );
}
