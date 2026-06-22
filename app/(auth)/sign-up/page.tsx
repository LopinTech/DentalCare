"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    const newErrors: typeof errors = {};

    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";
    if (!confirmPassword)
      newErrors.confirmPassword = "Please confirm your password.";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    setIsLoading(false);

    if (error) {
      toast.error(error.message ?? "Sign up failed. Please try again.");
      return;
    }

    if (data) {
      toast.success("Account created! Redirecting to your dashboard…");
      router.push("/dashboard");
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Create an account
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Fill in the details below to get started.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <Input
          id="name"
          name="name"
          type="text"
          label="Full name"
          placeholder="Jane Doe"
          autoComplete="name"
          autoFocus
          disabled={isLoading}
          error={errors.name}
        />

        <Input
          id="email"
          name="email"
          type="email"
          label="Email address"
          placeholder="jane@example.com"
          autoComplete="email"
          disabled={isLoading}
          error={errors.email}
        />

        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Min. 8 characters"
          autoComplete="new-password"
          disabled={isLoading}
          error={errors.password}
        />

        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm password"
          placeholder="Re-enter your password"
          autoComplete="new-password"
          disabled={isLoading}
          error={errors.confirmPassword}
        />

        <Button type="submit" className="mt-2 w-full" isLoading={isLoading}>
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
