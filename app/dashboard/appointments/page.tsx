import Link from "next/link";
import { Calendar, Clock, User, Plus, Eye } from "lucide-react";
import { Card, CardContent } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type AppointmentStatus = "confirmed" | "pending" | "completed" | "cancelled";

interface Appointment {
  id: number;
  service: string;
  doctor: string;
  date: string;
  time: string;
  status: AppointmentStatus;
}

// ─── Status configuration ─────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  AppointmentStatus,
  {
    label: string;
    badgeVariant: "success" | "warning" | "secondary" | "destructive";
    /** Left-edge stripe color — mirrors admin appointment rows */
    stripe: string;
  }
> = {
  confirmed: { label: "Confirmed", badgeVariant: "success",     stripe: "#16a34a" },
  pending:   { label: "Pending",   badgeVariant: "warning",     stripe: "#d97706" },
  completed: { label: "Completed", badgeVariant: "secondary",   stripe: "#6b7280" },
  cancelled: { label: "Cancelled", badgeVariant: "destructive", stripe: "#dc2626" },
};

// ─── Placeholder data ─────────────────────────────────────────────────────────

const UPCOMING: Appointment[] = [
  {
    id: 2001,
    service: "Orthodontics — Braces Adjustment",
    doctor: "Dr. R. Sultana",
    date: "26 Jun 2026",
    time: "10:30 AM",
    status: "confirmed",
  },
  {
    id: 2002,
    service: "Teeth Cleaning & Polish",
    doctor: "Dr. A. Karim",
    date: "30 Jun 2026",
    time: "02:00 PM",
    status: "pending",
  },
];

const PAST: Appointment[] = [
  {
    id: 1901,
    service: "General Checkup",
    doctor: "Dr. A. Karim",
    date: "10 Jun 2026",
    time: "09:00 AM",
    status: "completed",
  },
  {
    id: 1902,
    service: "Root Canal Therapy",
    doctor: "Dr. M. Islam",
    date: "28 May 2026",
    time: "11:00 AM",
    status: "completed",
  },
  {
    id: 1903,
    service: "Teeth Whitening",
    doctor: "Dr. R. Sultana",
    date: "14 May 2026",
    time: "03:30 PM",
    status: "cancelled",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: AppointmentStatus }) {
  const { label, badgeVariant } = STATUS_CONFIG[status];
  return <Badge variant={badgeVariant}>{label}</Badge>;
}

/**
 * Upcoming appointment card.
 *
 * Aesthetic risk: a 4 px left-edge stripe whose color is drawn directly from the
 * appointment status — identical to the row-accent device in the admin table.
 * This makes status instantly scannable even before the eye reaches the badge,
 * giving the card the language of a clinical chart entry rather than a generic
 * UI tile. The stripe is the only decoration; everything else is quiet.
 */
function UpcomingCard({ appt }: { appt: Appointment }) {
  const { stripe } = STATUS_CONFIG[appt.status];
  return (
    <Card className="overflow-hidden">
      <div className="flex">
        {/* Status stripe */}
        <div
          className="w-1 shrink-0 self-stretch"
          style={{ background: stripe }}
          aria-hidden="true"
        />

        <CardContent className="flex flex-1 flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
          {/* Details */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-start gap-2">
              <span
                className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10"
                aria-hidden="true"
              >
                <Calendar className="size-4 text-primary" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground leading-snug">
                  {appt.service}
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                  <User className="size-3" strokeWidth={1.75} />
                  {appt.doctor}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pl-10">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="size-3" strokeWidth={1.75} />
                {appt.date}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="size-3" strokeWidth={1.75} />
                {appt.time}
              </span>
              <StatusBadge status={appt.status} />
            </div>
          </div>

          {/* Action */}
          <div className="pl-10 sm:pl-0 sm:shrink-0">
            <Link href={`/dashboard/appointments/${appt.id}`}>
              <Button variant="outline" size="sm">
                <Eye />
                View Details
              </Button>
            </Link>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-secondary">
          <Calendar className="size-8 text-muted-foreground" strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">No appointments yet</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Book your first visit and it will show up here.
          </p>
        </div>
        <Link href="/appointment">
          <Button size="sm">
            <Plus />
            Book an Appointment
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PatientAppointmentsPage() {
  const hasUpcoming = UPCOMING.length > 0;
  const hasPast = PAST.length > 0;
  const hasAny = hasUpcoming || hasPast;

  if (!hasAny) {
    return (
      <div className="flex flex-col gap-6 pb-20 md:pb-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Patient Portal
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              My Appointments
            </h1>
          </div>
          <Link href="/appointment">
            <Button>
              <Plus />
              Book New
            </Button>
          </Link>
        </div>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-20 md:pb-6">

      {/* ── Page header ───────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Patient Portal
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            My Appointments
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Your scheduled and past clinic visits
          </p>
        </div>
        <Link href="/appointment">
          <Button>
            <Plus />
            Book New
          </Button>
        </Link>
      </div>

      {/* ── Upcoming ──────────────────────────────────────────────────────────── */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">Upcoming</h2>
          <Badge variant="default" className="tabular-nums">
            {UPCOMING.length}
          </Badge>
        </div>

        {hasUpcoming ? (
          <div className="flex flex-col gap-3">
            {UPCOMING.map((appt) => (
              <UpcomingCard key={appt.id} appt={appt} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
              <Calendar className="size-8 text-muted-foreground" strokeWidth={1.5} />
              <p className="text-sm text-muted-foreground">No upcoming appointments.</p>
              <Link href="/appointment">
                <Button size="sm">
                  <Plus />
                  Book an Appointment
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </section>

      {/* ── Past Appointments ─────────────────────────────────────────────────── */}
      {hasPast && (
        <section className="flex flex-col gap-3">
          <h2 className="text-base font-semibold text-foreground">Past Appointments</h2>

          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    {/* Status stripe column header — aria-hidden; purely visual */}
                    <th className="w-1 p-0" aria-hidden="true" />
                    <th className="px-5 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Date
                    </th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Service
                    </th>
                    <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">
                      Doctor
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
                  {PAST.map((appt) => {
                    const { stripe } = STATUS_CONFIG[appt.status];
                    return (
                      <tr
                        key={appt.id}
                        className="transition-colors hover:bg-muted/30"
                      >
                        {/* Status stripe */}
                        <td className="w-0 p-0">
                          <div
                            className="min-h-[52px] w-[3px]"
                            style={{ background: stripe }}
                            aria-hidden="true"
                          />
                        </td>

                        {/* Date */}
                        <td className="px-5 py-3">
                          <p className="font-medium text-foreground leading-tight">
                            {appt.date}
                          </p>
                          <p className="font-mono text-xs text-muted-foreground">
                            {appt.time}
                          </p>
                        </td>

                        {/* Service */}
                        <td className="px-4 py-3 text-foreground">
                          {appt.service}
                        </td>

                        {/* Doctor */}
                        <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                          {appt.doctor}
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3">
                          <StatusBadge status={appt.status} />
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3 text-right">
                          <Link
                            href={`/dashboard/appointments/${appt.id}`}
                            aria-label={`View details for ${appt.service} on ${appt.date}`}
                          >
                            <Button variant="ghost" size="icon-sm">
                              <Eye />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      )}

    </div>
  );
}
