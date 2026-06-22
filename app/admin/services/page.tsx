import Link from "next/link";
import { Settings, Plus, Edit2, ToggleLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type ServiceType = "service" | "procedure";
type ServiceStatus = "active" | "inactive";

interface ServiceRow {
  id: number;
  name: string;
  type: ServiceType;
  category: string;
  priceRange: string;
  duration: string;
  status: ServiceStatus;
}

// ─── Placeholder data (replace with DB queries) ───────────────────────────────

const SERVICES: ServiceRow[] = [
  {
    id: 1,
    name: "General Checkup",
    type: "service",
    category: "Preventive",
    priceRange: "৳500 – ৳800",
    duration: "30 min",
    status: "active",
  },
  {
    id: 2,
    name: "Teeth Cleaning",
    type: "service",
    category: "Preventive",
    priceRange: "৳800 – ৳1,200",
    duration: "45 min",
    status: "active",
  },
  {
    id: 3,
    name: "Braces",
    type: "procedure",
    category: "Orthodontics",
    priceRange: "৳25,000 – ৳60,000",
    duration: "60 min",
    status: "active",
  },
  {
    id: 4,
    name: "Root Canal",
    type: "procedure",
    category: "Endodontics",
    priceRange: "৳8,000 – ৳15,000",
    duration: "90 min",
    status: "active",
  },
  {
    id: 5,
    name: "Teeth Whitening",
    type: "procedure",
    category: "Cosmetic",
    priceRange: "৳5,000 – ৳10,000",
    duration: "60 min",
    status: "inactive",
  },
  {
    id: 6,
    name: "Dental Implants",
    type: "procedure",
    category: "Restorative",
    priceRange: "৳40,000 – ৳80,000",
    duration: "120 min",
    status: "active",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function typeBadge(type: ServiceType) {
  const map: Record<ServiceType, { label: string; variant: "info" | "warning" }> = {
    service:   { label: "Service",   variant: "info"    },
    procedure: { label: "Procedure", variant: "warning" },
  };
  const { label, variant } = map[type];
  return <Badge variant={variant}>{label}</Badge>;
}

function statusBadge(status: ServiceStatus) {
  const map: Record<ServiceStatus, { label: string; variant: "success" | "secondary" }> = {
    active:   { label: "Active",   variant: "success"   },
    inactive: { label: "Inactive", variant: "secondary" },
  };
  const { label, variant } = map[status];
  return <Badge variant={variant}>{label}</Badge>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminServicesPage() {
  return (
    <div className="flex flex-col gap-6">

      {/* ── Header row ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#16a34a]">
            Catalogue
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Services
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Manage dental services &amp; procedures
          </p>
        </div>
        <div className="mt-3 sm:mt-0">
          <Link href="/admin/services/new">
            <Button variant="default">
              <Plus />
              Add Service
            </Button>
          </Link>
        </div>
      </div>

      {/* ── Services table card ──────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Settings className="size-4 text-muted-foreground stroke-[1.5]" />
            <CardTitle className="text-sm font-semibold text-foreground">
              All Services &amp; Procedures
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-5 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Service Name
                  </th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:table-cell">
                    Type
                  </th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">
                    Category
                  </th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:table-cell">
                    Price Range
                  </th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground xl:table-cell">
                    Duration
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {SERVICES.map((svc) => (
                  <tr
                    key={svc.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    <td className="px-5 py-3 font-medium text-foreground">
                      {svc.name}
                    </td>
                    <td className="hidden px-4 py-3 sm:table-cell">
                      {typeBadge(svc.type)}
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                      {svc.category}
                    </td>
                    <td className="hidden px-4 py-3 font-mono text-xs text-muted-foreground lg:table-cell">
                      {svc.priceRange}
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground xl:table-cell">
                      {svc.duration}
                    </td>
                    <td className="px-4 py-3">
                      {statusBadge(svc.status)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Link href={`/admin/services/${svc.id}/edit`}>
                          <Button variant="ghost" size="icon-sm" title="Edit service">
                            <Edit2 />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          title={svc.status === "active" ? "Deactivate service" : "Activate service"}
                        >
                          <ToggleLeft />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
