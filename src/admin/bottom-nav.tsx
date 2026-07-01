"use client";

import { signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import {
	BarChart3,
	Building2,
	Calendar,
	CreditCard,
	FileQuestion,
	FileSignature,
	FlaskConical,
	GitFork,
	Grid2X2,
	LayoutDashboard,
	ListOrdered,
	LogOut,
	Package,
	Settings,
	Stethoscope,
	Tag,
	Truck,
	User,
	UserCog,
	Users,
	X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const BOTTOM_TABS = [
	{ label: "Home", href: "/admin", icon: LayoutDashboard },
	{ label: "Queue", href: "/admin/queue", icon: ListOrdered },
	{ label: "Patients", href: "/admin/patients", icon: Users },
	{ label: "Appts", href: "/admin/appointments", icon: Calendar },
];

const MORE_ITEMS = [
	{ label: "Doctors", href: "/admin/doctors", icon: Stethoscope },
	{ label: "Services", href: "/admin/services", icon: Settings },
	{ label: "Billing", href: "/admin/billing", icon: CreditCard },
	{ label: "Staff", href: "/admin/staff", icon: UserCog },
	{ label: "Inventory", href: "/admin/inventory", icon: Package },
	{ label: "Reports", href: "/admin/reports", icon: BarChart3 },
	{ label: "Schedules", href: "/admin/schedules", icon: Calendar },
	{ label: "Med. Forms", href: "/admin/medical-forms", icon: FileQuestion },
	{ label: "Categories", href: "/admin/categories", icon: Tag },
	{
		label: "Rx Templates",
		href: "/admin/prescription-templates",
		icon: FileSignature,
	},
	{ label: "Referrers", href: "/admin/referrers", icon: GitFork },
	{ label: "Departments", href: "/admin/departments", icon: Building2 },
	{ label: "Suppliers", href: "/admin/suppliers", icon: Truck },
	{ label: "Lab Orders", href: "/admin/lab-orders", icon: FlaskConical },
	{ label: "Profile", href: "/admin/profile", icon: User },
];

export function AdminBottomNav() {
	const pathname = usePathname();
	const [moreOpen, setMoreOpen] = useState(false);
	const router = useRouter();

	async function handleLogout() {
		await signOut();
		router.push("/sign-in");
	}

	const isMoreActive =
		!BOTTOM_TABS.some(
			(t) =>
				pathname === t.href ||
				(t.href !== "/admin" && pathname.startsWith(t.href)),
		) && pathname !== "/admin";

	return (
		<>
			{/* ── Bottom Tab Bar ─────────────────────────────────────────── */}
			<nav
				className="fixed bottom-0 left-0 right-0 z-40 flex overflow-hidden border-t border-border bg-white lg:hidden"
				style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
			>
				{BOTTOM_TABS.map(({ label, href, icon: Icon }) => {
					const active =
						pathname === href ||
						(href !== "/admin" && pathname.startsWith(href));
					return (
						<Link
							key={href}
							href={href}
							className={cn(
								"flex flex-1 min-w-0 flex-col items-center gap-1 pt-2.5 pb-2 text-[10px] font-semibold transition-colors",
								active ? "text-primary" : "text-muted-foreground",
							)}
						>
							<div
								className={cn(
									"flex size-8 items-center justify-center rounded-xl transition-all",
									active ? "bg-primary/10" : "bg-transparent",
								)}
							>
								<Icon className="size-[18px]" />
							</div>
							<span className="truncate w-full text-center">{label}</span>
						</Link>
					);
				})}

				{/* More button */}
				<button
					onClick={() => setMoreOpen(true)}
					className={cn(
						"flex flex-1 min-w-0 flex-col items-center gap-1 pt-2.5 pb-2 text-[10px] font-semibold transition-colors",
						isMoreActive || moreOpen ? "text-primary" : "text-muted-foreground",
					)}
				>
					<div
						className={cn(
							"flex size-8 items-center justify-center rounded-xl transition-all",
							isMoreActive || moreOpen ? "bg-primary/10" : "bg-transparent",
						)}
					>
						<Grid2X2 className="size-[18px]" />
					</div>
					<span className="truncate w-full text-center">More</span>
				</button>
			</nav>

			{/* ── More Drawer ─────────────────────────────────────────────── */}
			{moreOpen && (
				<div
					className="fixed inset-0 z-50 lg:hidden"
					onClick={() => setMoreOpen(false)}
				>
					{/* Backdrop */}
					<div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

					{/* Sheet */}
					<div
						className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white shadow-2xl"
						style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
						onClick={(e) => e.stopPropagation()}
					>
						{/* Handle + header */}
						<div className="flex items-center justify-between px-5 pt-4 pb-3">
							<div className="flex flex-col gap-0.5">
								<div className="mx-auto mb-2 h-1 w-10 rounded-full bg-border" />
								<p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
									All Sections
								</p>
							</div>
							<button
								onClick={() => setMoreOpen(false)}
								className="flex size-8 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground"
							>
								<X className="size-4" />
							</button>
						</div>

						{/* Grid of all other nav items */}
						<div className="grid grid-cols-4 gap-2 px-4 pb-3">
							{MORE_ITEMS.map(({ label, href, icon: Icon }) => {
								const active =
									pathname === href ||
									(href !== "/admin" && pathname.startsWith(href));
								return (
									<Link
										key={href}
										href={href}
										onClick={() => setMoreOpen(false)}
										className={cn(
											"flex flex-col items-center gap-2 rounded-2xl p-3 text-center transition-all active:scale-95",
											active
												? "bg-primary/10 text-primary"
												: "bg-secondary text-foreground hover:bg-primary/5",
										)}
									>
										<Icon className="size-5" />
										<span className="text-[10px] font-semibold leading-tight">
											{label}
										</span>
									</Link>
								);
							})}
						</div>

						{/* Logout */}
						<div className="px-4 pb-6">
							<button
								onClick={handleLogout}
								className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-400 px-4 py-3 text-sm font-semibold text-white transition-all active:scale-95 hover:bg-destructive/20"
							>
								<LogOut className="size-4" />
								Logout
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
