import Link from "next/link";
import {
  ArrowLeft,
  User,
  Phone,
  Calendar,
  CreditCard,
  MapPin,
  Droplets,
  Users,
  TrendingUp,
  Clock,
  AlertCircle,
  Pencil,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled" | "no_show";

interface RecentAppointment {
  id: number;
  date: string;
  service: string;
  doctor: string;
  status: AppointmentStatus;
}

// ─── Placeholder data (replace with DB queries using patientId) ───────────────

const PATIENT = {
  name: "John Doe",
  dob: "14 Mar 1988",
  gender: "Male",
  bloodGroup: "B+",
  phone: "+880 1712-345678",
  address: "House 12, Road 4, Dhanmondi, Dhaka 1205",
  emergencyContact: "Jane Doe — +880 1811-987654",
};

const STATS = [
  { label: "Total Visits",    value: "12",         icon: TrendingUp  },
  { label: "Total Spent",     value: "৳8,400",     icon: CreditCard  },
  { label: "Last Visit",      value: "15 Jun 2026", icon: Clock       },
  { label: "Upcoming",        value: "1",           icon: Calendar    },
];

const RECENT_APPOINTMENTS: RecentAppointment[] = [
  {
    id: 1,
    date: "15 Jun 2026",
    service: "Root Canal",
    doctor: "Dr. Karim",
    status: "completed",
  },
  {
    id: 2,
    date: "28 May 2026",
    service: "Dental Cleaning",
    doctor: "Dr. Sultana",
    status: "completed",
  },
  {
    id: 3,
    date: "25 Jun 2026",
    service: "Orthodontic Checkup",
    doctor: "Dr. Islam",
    status: "confirmed",
  },
];

const TABS = [
  { label: "Overview",     href: "" },
  { label: "Appointments", href: "/appointments" },
  { label: "Treatment",    href: "/treatment" },
  { label: "Invoices",     href: "/invoices" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function initials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function statusBadge(status: AppointmentStatus) {
  const map: Record<
    AppointmentStatus,
    {
      label: string;
      variant:
        | "default"
        | "success"
        | "destructive"
        | "warning"
        | "outline"
        | "secondary"
        | "info";
    }
  > = {
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

export default async function PatientDetailPage({
  params,
}: {
  params: Promise<{ patientId: string }>;
}) {
  const { patientId } = await params;

  // TODO: fetch real patient by patientId from DB
  const patient = PATIENT;

  return (
    <div className="flex flex-col gap-6">

      {/* ── Back button ─────────────────────────────────────────────────────── */}
      <div>
        <Link href="/admin/patients">
          <Button variant="ghost" size="sm" className="text-muted-foreground -ml-1.5">
            <ArrowLeft />
            Back to Patients
          </Button>
        </Link>
      </div>

      {/* ── Patient header ──────────────────────────────────────────────────── */}
      {/*
        Aesthetic risk: replace the plain text header with an identity chip —
        a large monogram rendered against the brand-green tint, flanked by the
        patient name and eyebrow label. This makes the patient feel like a
        named record with presence rather than a generic form view.
      */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {/* Monogram chip */}
          <div
            className="flex size-14 shrink-0 items-center justify-center rounded-2xl text-lg font-bold tracking-tight select-none"
            style={{ background: "#dcfce7", color: "#16a34a" }}
            aria-hidden="true"
          >
            {initials(patient.name)}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#16a34a]">
              Patient #{patientId}
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {patient.name}
            </h1>
          </div>
        </div>
        <div className="sm:shrink-0">
          <Link href={`/admin/patients/${patientId}/edit`}>
            <Button variant="outline">
              <Pencil />
              Edit Patient
            </Button>
          </Link>
        </div>
      </div>

      {/* ── Tabs row ────────────────────────────────────────────────────────── */}
      <div className="border-b border-border">
        <nav className="-mb-px flex gap-0" aria-label="Patient sections">
          {TABS.map((tab, i) => {
            // Overview is the active tab (default view)
            const isActive = i === 0;
            return (
              <Link
                key={tab.label}
                href={`/admin/patients/${patientId}${tab.href}`}
                className={[
                  "inline-block border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "border-[#16a34a] text-[#16a34a]"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ── Overview content ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* ── Left col: Patient Info ─────────────────────────────────────────── */}
        <div className="lg:col-span-2">
          <Card className="relative overflow-hidden border-border">
            {/* Left accent bar — consistent with dashboard stat cards */}
            <div
              className="absolute inset-y-0 left-0 w-1 rounded-l-xl"
              style={{ background: "#16a34a" }}
              aria-hidden="true"
            />
            <CardHeader className="pl-7 pb-3">
              <div className="flex items-center gap-2">
                <span
                  className="flex items-center justify-center rounded-md p-1.5"
                  style={{ background: "#dcfce7" }}
                >
                  <User className="size-4 shrink-0" style={{ color: "#16a34a" }} />
                </span>
                <CardTitle className="text-sm font-semibold text-foreground">
                  Patient Information
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pl-7 pb-5">
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* Date of Birth */}
                <div className="flex flex-col gap-0.5">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Date of Birth
                  </dt>
                  <dd className="flex items-center gap-1.5 text-sm text-foreground">
                    <Calendar className="size-3.5 shrink-0 text-muted-foreground" />
                    {patient.dob}
                  </dd>
                </div>

                {/* Gender */}
                <div className="flex flex-col gap-0.5">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Gender
                  </dt>
                  <dd className="text-sm">
                    <Badge variant={patient.gender === "Female" ? "info" : "secondary"}>
                      {patient.gender}
                    </Badge>
                  </dd>
                </div>

                {/* Blood Group */}
                <div className="flex flex-col gap-0.5">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Blood Group
                  </dt>
                  <dd className="flex items-center gap-1.5">
                    <Droplets className="size-3.5 shrink-0 text-muted-foreground" />
                    <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold text-foreground">
                      {patient.bloodGroup}
                    </span>
                  </dd>
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-0.5">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Phone
                  </dt>
                  <dd className="flex items-center gap-1.5 text-sm text-foreground">
                    <Phone className="size-3.5 shrink-0 text-muted-foreground" />
                    <span className="font-mono text-xs">{patient.phone}</span>
                  </dd>
                </div>

                {/* Address — full width */}
                <div className="flex flex-col gap-0.5 sm:col-span-2">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Address
                  </dt>
                  <dd className="flex items-start gap-1.5 text-sm text-foreground">
                    <MapPin className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                    <span>{patient.address}</span>
                  </dd>
                </div>

                {/* Emergency Contact — full width */}
                <div className="flex flex-col gap-0.5 sm:col-span-2">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Emergency Contact
                  </dt>
                  <dd className="flex items-center gap-1.5 text-sm text-foreground">
                    <AlertCircle className="size-3.5 shrink-0 text-muted-foreground" />
                    {patient.emergencyContact}
                  </dd>
                </div>

              </dl>
            </CardContent>
          </Card>
        </div>

        {/* ── Right col: Quick Stats ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.label}
                className="relative overflow-hidden border-border"
              >
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
                  <p className="text-2xl font-bold tracking-tight text-foreground">
                    {stat.value}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>

      {/* ── Recent Appointments ──────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="flex items-center justify-center rounded-md p-1.5"
                style={{ background: "#dcfce7" }}
              >
                <Users className="size-4 shrink-0" style={{ color: "#16a34a" }} />
              </span>
              <CardTitle className="text-sm font-semibold text-foreground">
                Recent Appointments
              </CardTitle>
            </div>
            <Link href={`/admin/patients/${patientId}/appointments`}>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                View all
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
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {RECENT_APPOINTMENTS.map((appt) => (
                  <tr
                    key={appt.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    <td className="px-5 py-3 font-mono text-xs text-muted-foreground">
                      {appt.date}
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">
                      {appt.service}
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                      {appt.doctor}
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
      </Card>

    </div>
  );
}
