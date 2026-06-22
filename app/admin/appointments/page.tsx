import Link from "next/link";
import {
  Calendar,
  Plus,
  Filter,
  Eye,
  Edit2,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

interface Appointment {
  id: number;
  patient: string;
  patientId: string;
  doctor: string;
  service: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  notes?: string;
}

// ─── Placeholder data ─────────────────────────────────────────────────────────

const APPOINTMENTS: Appointment[] = [
  {
    id: 1001,
    patient: "Rahima Begum",
    patientId: "PT-0041",
    doctor: "Dr. A. Karim",
    service: "General Checkup",
    date: "22 Jun 2026",
    time: "09:00 AM",
    status: "completed",
    notes: "Follow-up in 6 months",
  },
  {
    id: 1002,
    patient: "Arif Hossain",
    patientId: "PT-0087",
    doctor: "Dr. R. Sultana",
    service: "Orthodontics",
    date: "22 Jun 2026",
    time: "10:30 AM",
    status: "confirmed",
    notes: "Braces adjustment — 3rd session",
  },
  {
    id: 1003,
    patient: "Nusrat Jahan",
    patientId: "PT-0112",
    doctor: "Dr. A. Karim",
    service: "Root Canal Therapy",
    date: "22 Jun 2026",
    time: "12:00 PM",
    status: "pending",
  },
  {
    id: 1004,
    patient: "Md. Rakib Ali",
    patientId: "PT-0059",
    doctor: "Dr. M. Islam",
    service: "Teeth Whitening",
    date: "23 Jun 2026",
    time: "02:00 PM",
    status: "pending",
  },
  {
    id: 1005,
    patient: "Sabrina Akter",
    patientId: "PT-0034",
    doctor: "Dr. R. Sultana",
    service: "Dental Implant",
    date: "23 Jun 2026",
    time: "04:00 PM",
    status: "cancelled",
    notes: "Patient requested reschedule",
  },
];

// ─── Status configuration ─────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  AppointmentStatus,
  {
    label: string;
    variant: "warning" | "info" | "success" | "destructive";
    /** Thin row-accent color — matches the badge family */
    accent: string;
  }
> = {
  pending:   { label: "Pending",   variant: "warning",     accent: "#b45309" },
  confirmed: { label: "Confirmed", variant: "info",        accent: "#0369a1" },
  completed: { label: "Completed", variant: "success",     accent: "#15803d" },
  cancelled: { label: "Cancelled", variant: "destructive", accent: "#b91c1c" },
};

const FILTER_PILLS: { label: string; value: string }[] = [
  { label: "All",       value: "all"       },
  { label: "Pending",   value: "pending"   },
  { label: "Confirmed", value: "confirmed" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: AppointmentStatus }) {
  const { label, variant } = STATUS_CONFIG[status];
  return <Badge variant={variant}>{label}</Badge>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AppointmentsPage() {
  const totalCount = APPOINTMENTS.length;
  const pendingCount = APPOINTMENTS.filter((a) => a.status === "pending").length;

  return (
    <div className="flex flex-col gap-6">

      {/* ── Page header ───────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#16a34a]">
            Clinic Management
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Appointments
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Manage all clinic appointments
          </p>
        </div>
        <Link href="/admin/appointments/new">
          <Button variant="default">
            <Plus />
            New Appointment
          </Button>
        </Link>
      </div>

      {/* ── Summary pills ─────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm">
          <Calendar className="size-4 text-[#16a34a]" />
          <span className="font-semibold text-foreground">{totalCount}</span>
          <span className="text-muted-foreground">total</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm">
          <span className="inline-block size-2 rounded-full bg-amber-500" aria-hidden="true" />
          <span className="font-semibold text-foreground">{pendingCount}</span>
          <span className="text-muted-foreground">awaiting confirmation</span>
        </div>
      </div>

      {/* ── Filter bar ────────────────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Filter className="size-3.5" />
              Filter
            </div>

            {/* Status pills */}
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
              {FILTER_PILLS.map(({ label, value }) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={value === "all"}
                  className={
                    value === "all"
                      ? "inline-flex items-center rounded-full border border-[#16a34a] bg-[#16a34a]/10 px-3 py-1 text-xs font-semibold text-[#16a34a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      : "inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-[#16a34a]/50 hover:bg-[#16a34a]/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  }
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Date input */}
            <div className="ml-auto flex items-center gap-2">
              <label htmlFor="appt-date" className="text-xs font-medium text-muted-foreground sr-only">
                Filter by date
              </label>
              <input
                id="appt-date"
                type="date"
                className="h-8 rounded-md border border-border bg-background px-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Filter appointments by date"
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* ── Appointments table ────────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground">
            All Appointments
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="w-1 p-0" aria-hidden="true" />
                  <th className="px-5 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Patient
                  </th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">
                    Doctor
                  </th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:table-cell">
                    Service
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Date &amp; Time
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                  <th className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {APPOINTMENTS.map((appt) => {
                  const accent = STATUS_CONFIG[appt.status].accent;
                  return (
                    <tr
                      key={appt.id}
                      className="relative transition-colors hover:bg-muted/30"
                    >
                      {/*
                        Aesthetic risk: a 3px left-edge status stripe on each row,
                        mirroring the stat-card accent bars from the dashboard.
                        Gives each appointment a medical-chart feel — status is
                        scannable across the full list without the eye hunting for
                        the badge alone.
                      */}
                      <td className="w-0 p-0">
                        <div
                          className="h-full w-[3px] min-h-[52px]"
                          style={{ background: accent }}
                          aria-hidden="true"
                        />
                      </td>

                      {/* Patient */}
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#16a34a]/10 text-[#16a34a]"
                            aria-hidden="true"
                          >
                            <User className="size-3.5" />
                          </span>
                          <div>
                            <p className="font-medium text-foreground leading-tight">
                              {appt.patient}
                            </p>
                            <p className="text-xs text-muted-foreground">{appt.patientId}</p>
                          </div>
                        </div>
                      </td>

                      {/* Doctor */}
                      <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                        {appt.doctor}
                      </td>

                      {/* Service */}
                      <td className="hidden px-4 py-3 text-muted-foreground lg:table-cell">
                        {appt.service}
                      </td>

                      {/* Date & Time */}
                      <td className="px-4 py-3">
                        <p className="text-foreground font-medium leading-tight">{appt.date}</p>
                        <p className="font-mono text-xs text-muted-foreground">{appt.time}</p>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <StatusBadge status={appt.status} />
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link href={`/admin/appointments/${appt.id}`} aria-label={`View appointment for ${appt.patient}`}>
                            <Button variant="ghost" size="icon-sm">
                              <Eye />
                            </Button>
                          </Link>
                          <Link href={`/admin/appointments/${appt.id}/edit`} aria-label={`Edit appointment for ${appt.patient}`}>
                            <Button variant="ghost" size="icon-sm">
                              <Edit2 />
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
