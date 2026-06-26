"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "Overview",     href: ""              },
  { label: "Appointments", href: "/appointments" },
  { label: "Treatment",    href: "/treatment"    },
  { label: "Invoices",     href: "/invoices"     },
];

export function PatientTabsNav({ patientId }: { patientId: string }) {
  const pathname = usePathname();
  const base = `/admin/patients/${patientId}`;

  return (
    <nav className="overflow-x-auto scrollbar-none" aria-label="Patient sections">
      <div className="flex gap-0 min-w-max">
        {TABS.map((tab) => {
          const href = `${base}${tab.href}`;
          const isActive =
            tab.href === ""
              ? pathname === base
              : pathname.startsWith(href);
          return (
            <Link
              key={tab.label}
              href={href}
              className={cn(
                "inline-block border-b-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors",
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
