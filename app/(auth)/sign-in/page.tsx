"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Stethoscope, User, ShieldCheck } from "lucide-react";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

type RoleOption = "doctor" | "patient" | "admin";

const ROLES: {
  value: RoleOption;
  label: string;
  icon: React.ReactNode;
  email: string;
  hint: string;
}[] = [
  {
    value: "doctor",
    label: "Doctor",
    icon: <Stethoscope className="size-5" />,
    email: "doctor@mail.com",
    hint: "doctor@mail.com / password",
  },
  {
    value: "patient",
    label: "Patient",
    icon: <User className="size-5" />,
    email: "patient@mail.com",
    hint: "patient@mail.com / password",
  },
  {
    value: "admin",
    label: "Admin",
    icon: <ShieldCheck className="size-5" />,
    email: "admin@mail.com",
    hint: "admin@mail.com / password",
  },
];

function getRedirectPath(role: string): string {
  if (role === "doctor") return "/dashboard";
  if (role === "patient") return "/appointment";
  return "/admin";
}

export default function SignInPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<RoleOption>("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await authClient.signIn.email({ email, password });
      if (result.error) {
        toast.error(result.error.message ?? "Invalid credentials");
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const role = (result.data?.user as any)?.role ?? selectedRole;
        router.push(getRedirectPath(role));
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const activeRole = ROLES.find((r) => r.value === selectedRole)!;

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign in to your DentalCare account</p>
      </div>

      <div className="mb-6">
        <p className="text-sm font-medium text-foreground mb-2.5">Sign in as</p>
        <div className="grid grid-cols-3 gap-2">
          {ROLES.map((role) => (
            <button
              key={role.value}
              type="button"
              onClick={() => setSelectedRole(role.value)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-lg border p-3 text-sm transition-colors cursor-pointer",
                selectedRole === role.value
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-input text-muted-foreground hover:border-primary/40 hover:text-foreground"
              )}
            >
              {role.icon}
              <span className="font-medium">{role.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5 rounded-md border border-dashed border-border bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
        <span className="font-semibold text-foreground">Demo credentials:</span>{" "}
        {activeRole.hint}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="email"
          type="email"
          label="Email address"
          placeholder={activeRole.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <div className="flex flex-col gap-1.5">
          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <Link href="/forgot-password" className="self-end text-xs text-primary hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" isLoading={loading} className="w-full mt-2">
          Sign In
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-primary font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
