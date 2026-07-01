"use client";

import { Bell, Stethoscope } from "lucide-react";
import Link from "next/link";
import { Button } from "@/ui/button";
import { Avatar } from "@/ui/avatar";
import { LogoutButton } from "@/components/logout-button";

interface AdminHeaderProps {
  user?: { name: string; email: string; image?: string | null };
}

export function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-white px-4 lg:h-16 lg:px-6">
      {/* Mobile: logo | Desktop: "Admin Panel" label */}
      <div className="flex items-center gap-2">
        <Link
          href="/admin"
          className="flex items-center gap-2 font-bold text-primary lg:hidden"
        >
          <Stethoscope className="size-5" />
          <span className="text-base">DentalCare</span>
        </Link>
        <span className="hidden text-sm font-semibold text-foreground lg:block">
          Admin Panel
        </span>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
          <Bell className="size-4.5" />
          {/* Notification dot */}
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-destructive" />
        </Button>

        <div className="flex items-center gap-2.5 pl-2 border-l border-border">
          <Avatar name={user?.name} src={user?.image} size="sm" />
          <div className="hidden md:block">
            <p className="text-sm font-medium text-foreground leading-tight">
              {user?.name ?? "Admin"}
            </p>
            <p className="text-xs text-muted-foreground">{user?.email ?? ""}</p>
          </div>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
