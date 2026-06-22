"use client";

import { Menu, Bell, LogOut, User } from "lucide-react";
import { Button } from "@/ui/button";
import { Avatar } from "@/ui/avatar";

interface AdminHeaderProps {
  onMenuClick: () => void;
  user?: { name: string; email: string; image?: string | null };
}

export function AdminHeader({ onMenuClick, user }: AdminHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-white px-4 lg:px-6">
      {/* Left: mobile menu toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-muted-foreground hover:text-foreground"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </button>
        <h1 className="hidden text-sm font-semibold text-foreground lg:block">
          Admin Panel
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="size-4.5" />
        </Button>

        <div className="flex items-center gap-2.5 pl-2 border-l border-border">
          <Avatar name={user?.name} src={user?.image} size="sm" />
          <div className="hidden md:block">
            <p className="text-sm font-medium text-foreground leading-tight">{user?.name ?? "Admin"}</p>
            <p className="text-xs text-muted-foreground">{user?.email ?? ""}</p>
          </div>
          <Button variant="ghost" size="icon-sm" aria-label="Logout">
            <LogOut className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
