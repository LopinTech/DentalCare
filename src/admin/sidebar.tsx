"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Calendar, Users, UserCog, Stethoscope, Settings,
  CreditCard, ClipboardList, Package, BarChart3, FileQuestion,
  Tag, FileSignature, GitFork, Droplets, X, Stethoscope as Logo,
  ListOrdered, Building2, Truck, FlaskConical,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { section: "Main", items: [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Queue", href: "/admin/queue", icon: ListOrdered },
    { label: "Appointments", href: "/admin/appointments", icon: Calendar },
    { label: "Patients", href: "/admin/patients", icon: Users },
    { label: "Doctors", href: "/admin/doctors", icon: Stethoscope },
    { label: "Services", href: "/admin/services", icon: Settings },
    { label: "Schedules", href: "/admin/schedules", icon: Calendar },
  ]},
  { section: "Management", items: [
    { label: "Billing", href: "/admin/billing", icon: CreditCard },
    { label: "Staff", href: "/admin/staff", icon: UserCog },
    { label: "Inventory", href: "/admin/inventory", icon: Package },
    { label: "Reports", href: "/admin/reports", icon: BarChart3 },
    { label: "Medical Forms", href: "/admin/medical-forms", icon: FileQuestion },
    { label: "Categories", href: "/admin/categories", icon: Tag },
    { label: "Rx Templates", href: "/admin/prescription-templates", icon: FileSignature },
    { label: "Referrers", href: "/admin/referrers", icon: GitFork },
    { label: "Departments", href: "/admin/departments", icon: Building2 },
    { label: "Suppliers", href: "/admin/suppliers", icon: Truck },
    { label: "Lab Orders", href: "/admin/lab-orders", icon: FlaskConical },
  ]},
];

interface AdminSidebarProps {
  onClose?: () => void;
}

export function AdminSidebar({ onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-5 border-b border-border">
        <Link href="/admin" className="flex items-center gap-2 font-bold text-primary text-base">
          <Logo className="size-5" />
          DentalCare
        </Link>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-muted-foreground hover:text-foreground">
            <X className="size-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {NAV_ITEMS.map(({ section, items }) => (
          <div key={section}>
            <p className="mb-1.5 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {section}
            </p>
            <ul className="space-y-0.5">
              {items.map(({ label, href, icon: Icon }) => {
                const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
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
          </div>
        ))}
      </nav>
    </aside>
  );
}
