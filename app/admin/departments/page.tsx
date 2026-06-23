import Link from "next/link";
import {
  Building2,
  Plus,
  Stethoscope,
  Users,
  Settings,
  ChevronRight,
  Edit2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";

// ─── Sub-department data ───────────────────────────────────────────────────────

interface SubDepartment {
  id: number;
  name: string;
  nameBn: string;
  active: boolean;
}

const SUB_DEPARTMENTS: SubDepartment[] = [
  { id: 10, name: "ENT",        nameBn: "নাক কান গলা", active: true  },
  { id: 11, name: "Eye",        nameBn: "চোখ",         active: true  },
  { id: 12, name: "Medicine",   nameBn: "মেডিসিন",    active: true  },
  { id: 13, name: "Diabetes",   nameBn: "ডায়াবেটিস",  active: true  },
  { id: 14, name: "Gynecology", nameBn: "গাইনি",       active: true  },
  { id: 15, name: "Others",     nameBn: "অন্যান্য",    active: false },
];

// ─── Sub-department Card ───────────────────────────────────────────────────────

function SubDepartmentCard({ dept }: { dept: SubDepartment }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 shadow-sm">
      {/* Name block */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold text-foreground leading-tight">
            {dept.name}
          </span>
          <span className="text-xs text-muted-foreground">{dept.nameBn}</span>
        </div>
        {/* Aesthetic risk: the Edit icon sits as a quiet affordance at top-right,
            letting the card surface the action without a full button label.
            Only this one class of action gets that treatment — department
            management is a low-frequency operation, so the lighter touch is right. */}
        <button
          aria-label={`Edit ${dept.name}`}
          className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Edit2 className="size-3.5" />
        </button>
      </div>

      {/* Status toggle row */}
      <div className="flex items-center justify-between gap-2">
        {dept.active ? (
          <Badge variant="success">Active</Badge>
        ) : (
          <Badge variant="secondary">Inactive</Badge>
        )}
      </div>

      {/* Assign doctors link */}
      <Link
        href={`/admin/departments/${dept.id}/doctors`}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
      >
        <Users className="size-3.5 shrink-0" />
        Assign Doctors
      </Link>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminDepartmentsPage() {
  return (
    <div className="flex flex-col gap-8">

      {/* ── Header ────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#16a34a]">
            Administration
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Departments
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Manage clinic departments and sub-departments
          </p>
        </div>
        <Link href="/admin/departments/new" className="mt-3 sm:mt-0">
          <Button variant="default">
            <Plus />
            Add Department
          </Button>
        </Link>
      </div>

      {/* ── Dental Department ─────────────────────────────────────────────────── */}
      <section className="flex flex-col gap-3">
        {/* Section label */}
        <div className="flex items-center gap-2">
          <Stethoscope className="size-4 shrink-0 text-muted-foreground" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Dental Department
          </h2>
        </div>

        {/* Department card — left accent rail as structural marker */}
        <Card className="relative overflow-hidden">
          {/* Left rail: the one visual risk — a 3px primary bar that encodes
              "this is a top-level department" without relying on a badge or heading.
              It pairs with the General section's absence of the same bar on sub-cards,
              making the two levels of hierarchy legible at a glance. */}
          <div
            className="absolute inset-y-0 left-0 w-[3px] rounded-l-xl bg-[#16a34a]"
            aria-hidden="true"
          />

          <CardContent className="pl-7 py-5 flex flex-col gap-4">
            {/* Top row: identity + action */}
            <div className="flex items-start justify-between gap-4">
              {/* Left: icon + name */}
              <div className="flex items-center gap-3">
                <span
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: "#dcfce7" }}
                  aria-hidden="true"
                >
                  <Stethoscope className="size-5" style={{ color: "#16a34a" }} />
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-base font-semibold leading-tight text-foreground">
                    Dental
                  </span>
                  <Badge variant="secondary" className="w-fit text-xs">
                    ডেন্টাল
                  </Badge>
                </div>
              </div>

              {/* Right: Assign Doctors */}
              <Link href="/admin/departments/1/doctors" className="shrink-0">
                <Button variant="outline" size="sm">
                  <Users />
                  Assign Doctors
                </Button>
              </Link>
            </div>

            {/* Bottom row: status + description */}
            <div className="flex flex-wrap items-center gap-3 border-t border-border pt-3">
              <Badge variant="success">Active</Badge>
              <span className="text-sm text-muted-foreground">
                Dental procedures &amp; treatments
              </span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ── General Department ────────────────────────────────────────────────── */}
      <section className="flex flex-col gap-3">
        {/* Section label */}
        <div className="flex items-center gap-2">
          <Building2 className="size-4 shrink-0 text-muted-foreground" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            General Department
          </h2>
        </div>

        {/* Parent card */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between gap-4">
              {/* Left: icon + name */}
              <div className="flex items-center gap-3">
                <span
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary"
                  aria-hidden="true"
                >
                  <Building2 className="size-5 text-secondary-foreground" />
                </span>
                <div className="flex flex-col gap-1">
                  <CardTitle className="text-base">
                    General
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      / জেনারেল
                    </span>
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Manage Sub-departments
                  </p>
                </div>
              </div>

              <Settings className="size-4 shrink-0 text-muted-foreground mt-0.5" aria-hidden="true" />
            </div>
          </CardHeader>

          <CardContent className="pt-0 flex flex-col gap-5">
            {/* Sub-department grid */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {SUB_DEPARTMENTS.map((dept) => (
                <SubDepartmentCard key={dept.id} dept={dept} />
              ))}
            </div>

            {/* Add sub-department */}
            <div className="border-t border-border pt-4">
              <Button variant="outline" size="sm">
                <Plus />
                Add Sub-department
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ── Info card ─────────────────────────────────────────────────────────── */}
      <Card className="border-info bg-info/40">
        <CardContent className="flex items-start gap-3 py-4">
          <ChevronRight
            className="mt-0.5 size-4 shrink-0 text-info-foreground"
            aria-hidden="true"
          />
          <p className="text-sm text-info-foreground leading-relaxed">
            Departments reset token numbers daily. Sub-departments of General
            each maintain their own queue.
          </p>
        </CardContent>
      </Card>

    </div>
  );
}
