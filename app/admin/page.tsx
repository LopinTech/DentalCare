import Link from "next/link";
import {
  Users,
  CalendarClock,
  CalendarCheck2,
  DollarSign,
  CalendarPlus,
  UserPlus,
  Stethoscope,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled" | "no_show";

interface StatCard {
  label: string;
  value: string;
  subtext: string;
  icon: React.ElementType;
  trend?: string;
  trendUp?: boolean;
}

interface AppointmentRow {
  id: number;
  patient: string;
  doctor: string;
  service: string;
  timeSlot: string;
  status: AppointmentStatus;
}

// ─── Placeholder data (replace with DB queries) ───────────────────────────────

const STATS: StatCard[] = [
  {
    label: "Total Patients",
    value: "1,284",
    subtext: "+14 this month",
    icon: Users,
    trend: "14",
    trendUp: true,
  },
  {
    label: "Today's Appointments",
    value: "18",
    subtext: "6 remaining",
    icon: CalendarClock,
    trend: "6",
    trendUp: true,
  },
  {
    label: "Upcoming Appointments",
    value: "73",
    subtext: "Next 7 days",
    icon: CalendarCheck2,
    trend: "73",
    trendUp: true,
  },
  {
    label: "Total Revenue",
    value: "৳2,41,500",
    subtext: "This month",
    icon: DollarSign,
    trend: "8%",
    trendUp: true,
  },
];

const TODAY_APPOINTMENTS: AppointmentRow[] = [
  { id: 1, patient: "Rahima Begum",  doctor: "Dr. Karim",   service: "Tooth Extraction",   timeSlot: "09:00 AM", status: "completed"  },
  { id: 2, patient: "Arif Hossain",  doctor: "Dr. Sultana", service: "Dental Cleaning",    timeSlot: "10:00 AM", status: "completed"  },
  { id: 3, patient: "Nusrat Jahan",  doctor: "Dr. Karim",   service: "Root Canal",         timeSlot: "11:00 AM", status: "confirmed"  },
  { id: 4, patient: "Md. Rakib Ali", doctor: "Dr. Islam",   service: "Orthodontic Checkup",timeSlot: "01:30 PM", status: "pending"    },
  { id: 5, patient: "Sabrina Akter", doctor: "Dr. Sultana", service: "Teeth Whitening",    timeSlot: "03:00 PM", status: "pending"    },
  { id: 6, patient: "Tanvir Ahmed",  doctor: "Dr. Islam",   service: "Crown Fitting",      timeSlot: "04:30 PM", status: "cancelled"  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function statusBadge(status: AppointmentStatus) {
  const map: Record<AppointmentStatus, { label: string; variant: "default" | "success" | "destructive" | "warning" | "outline" | "secondary" | "info" }> = {
    pending:   { label: "Pending",   variant: "warning"     },
    confirmed: { label: "Confirmed", variant: "info"        },
    completed: { label: "Completed", variant: "success"     },
    cancelled: { label: "Cancelled", variant: "destructive" },
    no_show:   { label: "No-show",   variant: "secondary"   },
  };
  const { label, variant } = map[status];
  return <Badge variant={variant}>{label}</Badge>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  const today = formatDate(new Date());

  return (
    <div className="flex flex-col gap-6">

      {/* ── Header row ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#16a34a]">
            Overview
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="size-3.5 shrink-0" />
          <span>{today}</span>
        </div>
      </div>

      {/* ── Stats grid ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="relative overflow-hidden border-border"
            >
              {/* Left accent bar — the aesthetic risk: replaces icon-in-circle convention */}
              <div
                className="absolute inset-y-0 left-0 w-1 rounded-l-xl"
                style={{ background: "#16a34a" }}
                aria-hidden="true"
              />
              <CardHeader className="pl-7 pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <span
                    className="flex items-center justify-center rounded-md p-1.5"
                    style={{ background: "#dcfce7" }}
                  >
                    <Icon className="size-4 shrink-0" style={{ color: "#16a34a" }} />
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pl-7 pb-4">
                <p className="text-3xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.subtext}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ── Quick Actions ────────────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Link href="/admin/appointments/new">
            <Button variant="default">
              <CalendarPlus />
              New Appointment
            </Button>
          </Link>
          <Link href="/admin/patients/new">
            <Button variant="outline">
              <UserPlus />
              Add Patient
            </Button>
          </Link>
          <Link href="/admin/doctors/new">
            <Button variant="outline">
              <Stethoscope />
              Add Doctor
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* ── Today's Appointments ─────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-foreground">
              Today&apos;s Appointments
            </CardTitle>
            <Link href="/admin/appointments">
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                View all
                <ChevronRight />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
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
                    Time
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {TODAY_APPOINTMENTS.map((appt) => (
                  <tr
                    key={appt.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    <td className="px-5 py-3 font-medium text-foreground">
                      {appt.patient}
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                      {appt.doctor}
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground lg:table-cell">
                      {appt.service}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {appt.timeSlot}
                    </td>
                    <td className="px-4 py-3">
                      {statusBadge(appt.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="border-t border-border px-5 py-3">
          <p className="text-xs text-muted-foreground">
            {TODAY_APPOINTMENTS.filter((a) => a.status === "pending" || a.status === "confirmed").length} appointments remaining today
          </p>
        </CardFooter>
      </Card>

    </div>
  );
}
