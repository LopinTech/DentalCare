import { User, Mail, Phone, Lock, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Avatar } from "@/ui/avatar";

// ─── Static display data (replace with session / DB query) ────────────────────

const ADMIN = {
	name: "Super Admin",
	email: "admin@dentalcare.com",
	phone: "+880 1700-000001",
	role: "Administrator",
	memberSince: "01 Jan 2024",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProfileSettingsPage() {
	return (
		<div className="flex flex-col gap-6">
			{/* ── Page header ────────────────────────────────────────────────────── */}
			<div>
				<p className="text-xs font-semibold uppercase tracking-widest text-primary">
					Account
				</p>
				<h1 className="text-2xl font-bold tracking-tight text-foreground">
					Profile Settings
				</h1>
			</div>

			{/* ── Two-column layout ──────────────────────────────────────────────── */}
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				{/* Left — Profile identity card ──────────────────────────────────── */}
				<Card>
					<CardHeader>
						<CardTitle>Account Identity</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col items-center gap-5 pb-8 text-center">
						{/* Large avatar — initials SA with subtle ring */}
						<div className="ring-4 ring-primary/20 ring-offset-2 ring-offset-card rounded-full">
							<Avatar
								name="Super Admin"
								size="lg"
								className="size-20 text-xl"
							/>
						</div>

						{/* Name + role badge */}
						<div className="flex flex-col items-center gap-2">
							<p className="text-lg font-semibold text-foreground">
								{ADMIN.name}
							</p>
							<Badge variant="default" className="gap-1">
								<Shield className="size-3 stroke-2" />
								{ADMIN.role}
							</Badge>
						</div>

						{/* Contact + join date rows */}
						<div className="w-full divide-y divide-border rounded-lg border border-border text-sm">
							<div className="flex items-center gap-3 px-4 py-3">
								<Mail className="size-4 shrink-0 stroke-[1.5] text-muted-foreground" />
								<span className="min-w-0 truncate text-foreground">
									{ADMIN.email}
								</span>
							</div>
							<div className="flex items-center gap-3 px-4 py-3">
								<Phone className="size-4 shrink-0 stroke-[1.5] text-muted-foreground" />
								<span className="text-foreground">{ADMIN.phone}</span>
							</div>
						</div>

						<p className="text-xs text-muted-foreground">
							Member since {ADMIN.memberSince}
						</p>
					</CardContent>
				</Card>

				{/* Right — Edit profile form ─────────────────────────────────────── */}
				<Card>
					<CardHeader>
						<div className="flex items-center gap-2">
							<User className="size-4 stroke-[1.5] text-muted-foreground" />
							<CardTitle>Edit Profile</CardTitle>
						</div>
					</CardHeader>
					<CardContent className="flex flex-col gap-4">
						<Input
							id="full-name"
							label="Full Name"
							defaultValue={ADMIN.name}
							placeholder="Enter your full name"
						/>

						<Input
							id="email"
							label="Email"
							type="email"
							defaultValue={ADMIN.email}
							disabled
							placeholder="admin@dentalcare.com"
						/>

						{/* Phone with icon prefix */}
						<div className="flex flex-col gap-1.5">
							<label
								htmlFor="phone"
								className="text-sm font-medium text-foreground"
							>
								Phone
							</label>
							<div className="relative">
								<Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 stroke-[1.5] text-muted-foreground" />
								<input
									id="phone"
									type="tel"
									defaultValue={ADMIN.phone}
									placeholder="+880 1700-000000"
									className="flex h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
								/>
							</div>
						</div>

						<div className="pt-1">
							<Button className="w-full sm:w-auto">Save changes</Button>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* ── Change Password card (full-width below the two columns) ────────── */}
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2">
						<Lock className="size-4 stroke-[1.5] text-muted-foreground" />
						<CardTitle>Change Password</CardTitle>
					</div>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
						<div className="flex flex-col gap-1.5">
							<label
								htmlFor="current-password"
								className="text-sm font-medium text-foreground"
							>
								Current Password
							</label>
							<input
								id="current-password"
								type="password"
								placeholder="Enter current password"
								className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							/>
						</div>

						<div className="flex flex-col gap-1.5">
							<label
								htmlFor="new-password"
								className="text-sm font-medium text-foreground"
							>
								New Password
							</label>
							<input
								id="new-password"
								type="password"
								placeholder="Enter new password"
								className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							/>
						</div>

						<div className="flex flex-col gap-1.5">
							<label
								htmlFor="confirm-password"
								className="text-sm font-medium text-foreground"
							>
								Confirm Password
							</label>
							<input
								id="confirm-password"
								type="password"
								placeholder="Re-enter new password"
								className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							/>
						</div>
					</div>

					<div className="mt-4">
						<Button variant="outline">Update password</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
