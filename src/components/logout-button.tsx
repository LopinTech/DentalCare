"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/ui/button";
import { signOut } from "@/lib/auth-client";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.push("/sign-in");
  }

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Logout"
      onClick={handleLogout}
    >
      <LogOut className="size-4" />
    </Button>
  );
}
