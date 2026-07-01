import Link from "next/link";
import {
  Calendar,
  Plus,
  Eye,
  Edit2,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { PatientTabsNav } from "@/components/patient-tabs-nav";

// ─── Types ────────────────────────────────────────────────────────────────────

type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled" | "no_show";
type PaymentStatus     = "paid" | "partial" | "unpaid" | "waived";

interface Appointment {
  id: number;
  date: string;
  time: string;
  doctor: string;
  service: string;
  status: AppointmentStatus;
  payment: PaymentStatus;
}

// ─── Placeholder data (replace with DB queries using patientId) ───────────────

const APPOINTMENTS: Appointment[] = [
  {
    id: 3001,
    date: "25 Jun 2026",
    time: "09:00 AM",
    doctor: "Dr. Islam",
    service: "Orthodontic Checkup",
    status: "confirmed",
    payment: "unpaid",
  },
  {
    id: 3002,
    date: "15 Jun 2026",
    time: "11:30 AM",
    doctor: "Dr. Karim",
    service: "Root Canal Therapy",
    status: "completed",
    payment: "paid",
  },
  {
    id: 3003,
    date: "28 May 2026",
    time: "10:00 AM",
    doctor: "Dr. Sultana",
    service: "Dental Cleaning",
    status: "completed",
    payment: "paid",
  },
  {
    id: 3004,
    date: "10 May 2026",
    time: "02:00 PM",
    doctor: "Dr. Karim",
    service: "Teeth Whitening",
    status: "no_show",
    payment: "unpaid",
  },
  {
    id: 3005,
    date: "20 Apr 2026",
    time: "03:30 PM",
    doctor: "Dr. Islam",
    service: "Dental X-ray",
    status: "cancelled",
    payment: "waived",
  },
  {
    id: 3006,
    date: "05 Apr 2026",
    time: "09:30 AM",
    doctor: "Dr. Sultana",
    service: "Composite Filling",
    status: "completed",
    payment: "partial",
  },
];

// ─── Status configuration ─────────────────────────────────────────────────────

const APPT_STATUS_CONFIG: Record<
  AppointmentStatus,
  { label: string; variant: "warning" | "info" | "success" | "destructive" | "secondary" }
> = {
  pending:   { label: "Pending",   variant: "warning"     },
  confirmed: { label: "Confirmed", variant: "info"        },
  completed: { label: "Completed", variant: "success"     },
  cancelled: { label: "Cancelled", variant: "destructive" },
  no_show:   { label: "No-show",   variant: "secondary"   },
};

const PAYMENT_STATUS_CONFIG: Record<
  PaymentStatus,
  { label: string; variant: "success" | "warning" | "destructive" | "secondary" }
> = {
  paid:    { label: "Paid",    variant: "success"     },
  partial: { label: "Partial", variant: "warning"     },
  unpaid:  { label: "Unpaid",  variant: "destructive" },
  waived:  { label: "Waived",  variant: "secondary"   },
};

const STATUS_FILTER_OPTIONS = [
  { label: "All statuses", value: "" },
  { label: "Pending",      value: "pending"   },
  { label: "Confirmed",    value: "confirmed" },
  { label: "Completed",    value: "completed" },
  { label: "Cancelled",    value: "cancelled" },
  { label: "No-show",      value: "no_show"   },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: AppointmentStatus }) {
  const { label, variant } = APPT_STATUS_CONFIG[status];
  return <Badge variant={variant}>{label}</Badge>;
}

function PaymentBadge({ status }: { status: PaymentStatus }) {
  const { label, variant } = PAYMENT_STATUS_CONFIG[status];
  return <Badge variant={variant}>{label}</Badge>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function PatientAppointmentsPage({
  params,
}: {
  params: Promise<{ patientId: string }>;
}) {
  const { patientId } = await params;
  // TODO: fetch real patient and appointments by patientId from DB

  return (
    <div className="flex flex-col gap-6">

      {/* ── Tab navigation ───────────────────────────────────────────────────── */}
      <div className="bg-background rounded-2xl border border-border overflow-hidden">
        <PatientTabsNav patientId={patientId} />
      </div>

      {/* ── Actions row ─────────────────────────────────────────────────────── */}
      <div className="flex justify-end">
        <Link href="/admin/appointments/new">
          <Button variant="default" size="sm">
            <Plus />
            Book New Appointment
          </Button>
        </Link>
      </div>

      {/* ── Filter row ──────────────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-semibold text-foreground">
            Filter appointments
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <form
            className="flex flex-col gap-3 sm:flex-row sm:items-end sm:flex-wrap"
            aria-label="Filter appointments"
          >
            {/* Status select */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="filter-status"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Status
              </label>
              <select
                id="filter-status"
                className="h-9 rounded-md border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                defaultValue=""
              >
                {STATUS_FILTER_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date from */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="filter-date-from"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                From
              </label>
              <input
                id="filter-date-from"
                type="date"
                className="h-9 rounded-md border border-border bg-background px-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Date to */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="filter-date-to"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                To
              </label>
              <input
                id="filter-date-to"
                type="date"
                className="h-9 rounded-md border border-border bg-background px-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Search button */}
            <Button variant="default" type="submit" className="sm:self-end">
              <Search />
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* ── Appointments table ───────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <span
              className="flex items-center justify-center rounded-md p-1.5"
              style={{ background: "#dcfce7" }}
            >
              <Calendar className="size-4 shrink-0" style={{ color: "#16a34a" }} />
            </span>
            <CardTitle className="text-sm font-semibold text-foreground">
              All Appointments
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  {/* Status-stripe column — no heading, purely visual */}
                  <th className="w-1 p-0" aria-hidden="true" />
                  <th className="px-5 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Date
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Time
                  </th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">
                    Doctor
                  </th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:table-cell">
                    Service
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:table-cell">
                    Payment
                  </th>
                  <th className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {APPOINTMENTS.map((appt) => {
                  const statusAccent: Record<AppointmentStatus, string> = {
                    pending:   "#b45309",
                    confirmed: "#0369a1",
                    completed: "#15803d",
                    cancelled: "#b91c1c",
                    no_show:   "#6b7280",
                  };
                  const accent = statusAccent[appt.status];

                  return (
                    <tr
                      key={appt.id}
                      className="relative transition-colors hover:bg-muted/30"
                    >
                      {/* 3-px left-edge status stripe — mirrors appointments list pattern */}
                      <td className="w-0 p-0">
                        <div
                          className="h-full w-0.75 min-h-13"
                          style={{ background: accent }}
                          aria-hidden="true"
                        />
                      </td>

                      {/* Date */}
                      <td className="px-5 py-3">
                        <span className="font-mono text-xs text-foreground">
                          {appt.date}
                        </span>
                      </td>

                      {/* Time */}
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs text-muted-foreground">
                          {appt.time}
                        </span>
                      </td>

                      {/* Doctor */}
                      <td className="hidden px-4 py-3 text-sm text-muted-foreground md:table-cell">
                        {appt.doctor}
                      </td>

                      {/* Service */}
                      <td className="hidden px-4 py-3 font-medium text-foreground lg:table-cell">
                        {appt.service}
                      </td>

                      {/* Status badge */}
                      <td className="px-4 py-3">
                        <StatusBadge status={appt.status} />
                      </td>

                      {/* Payment badge */}
                      <td className="hidden px-4 py-3 sm:table-cell">
                        <PaymentBadge status={appt.payment} />
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/admin/appointments/${appt.id}`}
                            aria-label={`View appointment on ${appt.date}`}
                          >
                            <Button variant="ghost" size="icon-sm">
                              <Eye />
                            </Button>
                          </Link>
                          <Link
                            href={`/admin/appointments/${appt.id}/edit`}
                            aria-label={`Edit appointment on ${appt.date}`}
                          >
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

      {/* ── Pagination ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          Showing <span className="font-semibold text-foreground">1–6</span> of{" "}
          <span className="font-semibold text-foreground">24</span> appointments
        </p>
        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="icon-sm" aria-label="Previous page" disabled>
            <ChevronLeft />
          </Button>

          {/* Page pills */}
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              type="button"
              aria-current={page === 1 ? "page" : undefined}
              className={
                page === 1
                  ? "inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#16a34a] bg-[#16a34a]/10 text-xs font-semibold text-[#16a34a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  : "inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              }
            >
              {page}
            </button>
          ))}

          <Button variant="outline" size="icon-sm" aria-label="Next page">
            <ChevronRight />
          </Button>
        </div>
      </div>

    </div>
  );
}
