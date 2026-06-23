import Link from "next/link";
import {
  ArrowLeft,
  Star,
  Clock,
  Users,
  Calendar,
  Pencil,
  BadgeCheck,
  Banknote,
  Building2,
  Hash,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Avatar } from "@/ui/avatar";

// ─── Types ────────────────────────────────────────────────────────────────────

type Specialization =
  | "General Dentistry"
  | "Orthodontics"
  | "Oral Surgery"
  | "Periodontics";

type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "no_show";

interface ScheduleSlot {
  day: string;
  start: string;
  end: string;
  slots: number;
}

interface RecentAppointment {
  id: number;
  date: string;
  patient: string;
  service: string;
  status: AppointmentStatus;
}

// ─── Specialty colour tokens ──────────────────────────────────────────────────
// Matches the motif established in the doctors list — each specialty
// has an identity band colour. Here it becomes the full profile masthead.

const SPECIALTY_COLORS: Record<
  Specialization,
  { band: string; badgeBg: string; badgeText: string }
> = {
  "General Dentistry": {
    band: "#0d9488",
    badgeBg: "#ccfbf1",
    badgeText: "#0f766e",
  },
  Orthodontics: {
    band: "#7c3aed",
    badgeBg: "#ede9fe",
    badgeText: "#6d28d9",
  },
  "Oral Surgery": {
    band: "#d97706",
    badgeBg: "#fef3c7",
    badgeText: "#b45309",
  },
  Periodontics: {
    band: "#e11d48",
    badgeBg: "#ffe4e6",
    badgeText: "#be123c",
  },
};

// ─── Status helpers ───────────────────────────────────────────────────────────

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

// ─── Placeholder data (replace with DB query by doctorId) ─────────────────────

const DOCTOR = {
  name: "Dr. Rafiqul Islam",
  specialization: "Orthodontics" as Specialization,
  experienceYears: 12,
  licenseNumber: "BMDC-2014-07432",
  consultationFee: 1200,
  available: true,
  bio: "Dr. Islam specialises in complex orthodontic cases for adolescent and adult patients. With over a decade at Dhaka Dental College and Hospital, he has treated more than 1,200 braces and aligner cases and holds a fellowship from the Bangladesh Society of Orthodontists.",
  departments: ["Orthodontics", "Maxillofacial", "Pediatric Dentistry"],
};

const SCHEDULE: ScheduleSlot[] = [
  { day: "Monday",    start: "09:00", end: "13:00", slots: 8  },
  { day: "Tuesday",   start: "14:00", end: "18:00", slots: 8  },
  { day: "Wednesday", start: "09:00", end: "13:00", slots: 8  },
  { day: "Thursday",  start: "14:00", end: "18:00", slots: 8  },
  { day: "Friday",    start: "Off",   end: "Off",   slots: 0  },
  { day: "Saturday",  start: "10:00", end: "14:00", slots: 6  },
];

const RECENT_APPOINTMENTS: RecentAppointment[] = [
  { id: 4021, date: "21 Jun 2026", patient: "Arif Hossain",   service: "Braces Adjustment",     status: "completed" },
  { id: 4019, date: "20 Jun 2026", patient: "Mitu Akter",     service: "Initial Consultation",  status: "completed" },
  { id: 4025, date: "22 Jun 2026", patient: "Sohel Rana",     service: "Retainer Fitting",      status: "confirmed" },
  { id: 4031, date: "23 Jun 2026", patient: "Ruma Begum",     service: "Braces Removal",        status: "pending"   },
  { id: 4028, date: "22 Jun 2026", patient: "Tanvir Ahmed",   service: "Follow-up Checkup",     status: "confirmed" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function DoctorProfilePage({
  params,
}: {
  params: Promise<{ doctorId: string }>;
}) {
  const { doctorId } = await params;

  // TODO: fetch real doctor by doctorId from DB
  const doctor = DOCTOR;
  const colors = SPECIALTY_COLORS[doctor.specialization];

  return (
    <div className="flex flex-col gap-6">

      {/* ── Back + header ─────────────────────────────────────────────────────── */}
      <div>
        <Link href="/admin/doctors">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground -ml-1.5"
          >
            <ArrowLeft />
            Back to Doctors
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#16a34a]">
            Doctor #{doctorId}
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {doctor.name}
          </h1>
        </div>
        <div className="sm:shrink-0">
          <Link href={`/admin/doctors/${doctorId}/edit`}>
            <Button variant="outline">
              <Pencil />
              Edit Doctor
            </Button>
          </Link>
        </div>
      </div>

      {/* ── Three-column grid ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* ── LEFT: Profile card ────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          <Card className="overflow-hidden">
            {/*
              Aesthetic risk: the specialty band from the list card is promoted
              to a full-height masthead — the card header IS the colour, rather
              than just accenting it. Each doctor's profile is immediately keyed
              to department colour, echoing how clinic wings are colour-coded.
              The avatar rides the boundary between band and card body.
            */}
            <div
              className="relative flex h-28 items-end px-5 pb-0"
              style={{ background: colors.band }}
              aria-hidden="true"
            >
              {/* Subtle cross-hatch — clinic shorthand, matches list page */}
              <svg
                className="absolute inset-0 h-full w-full opacity-[0.07]"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="cross-profile"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect x="9" y="4" width="2" height="12" fill="white" />
                    <rect x="4" y="9" width="12" height="2" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cross-profile)" />
              </svg>

              {/* Avatar straddles the band edge */}
              <div className="relative z-10 translate-y-1/2">
                <Avatar
                  name={doctor.name}
                  size="lg"
                  className="ring-4 ring-white size-20 text-xl"
                />
              </div>

              {/* Availability — top right */}
              <div className="absolute right-4 top-4">
                {doctor.available ? (
                  <Badge className="border border-white/30 bg-white/20 text-white backdrop-blur-sm">
                    Available
                  </Badge>
                ) : (
                  <Badge className="border border-white/20 bg-black/25 text-white/80 backdrop-blur-sm">
                    Unavailable
                  </Badge>
                )}
              </div>
            </div>

            {/* Card body */}
            <CardContent className="pt-12 pb-5 px-5 flex flex-col gap-4">
              {/* Name + specialization */}
              <div className="flex flex-col gap-1.5">
                <h2 className="text-lg font-bold leading-tight text-foreground">
                  {doctor.name}
                </h2>
                <span
                  className="inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                  style={{ background: colors.badgeBg, color: colors.badgeText }}
                >
                  {doctor.specialization}
                </span>
              </div>

              {/* Key facts */}
              <dl className="flex flex-col gap-3">
                {/* Experience */}
                <div className="flex items-center gap-2.5">
                  <span
                    className="flex size-7 shrink-0 items-center justify-center rounded-md"
                    style={{ background: colors.badgeBg }}
                    aria-hidden="true"
                  >
                    <BadgeCheck className="size-3.5" style={{ color: colors.badgeText }} />
                  </span>
                  <div className="flex flex-col">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Experience
                    </dt>
                    <dd className="text-sm font-medium text-foreground">
                      {doctor.experienceYears} years
                    </dd>
                  </div>
                </div>

                {/* License */}
                <div className="flex items-center gap-2.5">
                  <span
                    className="flex size-7 shrink-0 items-center justify-center rounded-md"
                    style={{ background: colors.badgeBg }}
                    aria-hidden="true"
                  >
                    <Hash className="size-3.5" style={{ color: colors.badgeText }} />
                  </span>
                  <div className="flex flex-col">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      License
                    </dt>
                    <dd className="font-mono text-xs text-foreground">
                      {doctor.licenseNumber}
                    </dd>
                  </div>
                </div>

                {/* Consultation fee */}
                <div className="flex items-center gap-2.5">
                  <span
                    className="flex size-7 shrink-0 items-center justify-center rounded-md"
                    style={{ background: colors.badgeBg }}
                    aria-hidden="true"
                  >
                    <Banknote className="size-3.5" style={{ color: colors.badgeText }} />
                  </span>
                  <div className="flex flex-col">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Consultation Fee
                    </dt>
                    <dd className="text-sm font-bold text-foreground">
                      ৳{doctor.consultationFee.toLocaleString()}
                    </dd>
                  </div>
                </div>
              </dl>

              {/* Bio */}
              <div className="border-t border-border pt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  About
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {doctor.bio}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Departments assigned */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <span
                  className="flex size-7 items-center justify-center rounded-md bg-[#16a34a]/10"
                  aria-hidden="true"
                >
                  <Building2 className="size-3.5 text-[#16a34a]" />
                </span>
                <CardTitle className="text-sm font-semibold text-foreground">
                  Departments
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0 flex flex-wrap gap-2">
              {doctor.departments.map((dept) => (
                <Badge key={dept} variant="secondary">
                  {dept}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* ── MIDDLE: Schedule card ─────────────────────────────────────────── */}
        <div>
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <span
                  className="flex size-7 items-center justify-center rounded-md bg-[#16a34a]/10"
                  aria-hidden="true"
                >
                  <Clock className="size-3.5 text-[#16a34a]" />
                </span>
                <CardTitle className="text-sm font-semibold text-foreground">
                  Working Hours
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0 p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-y border-border bg-muted/40">
                      <th className="px-5 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Day
                      </th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Hours
                      </th>
                      <th className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Slots
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {SCHEDULE.map((row) => {
                      const isOff = row.start === "Off";
                      return (
                        <tr
                          key={row.day}
                          className={isOff ? "bg-muted/20" : "hover:bg-muted/30 transition-colors"}
                        >
                          <td className="px-5 py-3 text-sm font-medium text-foreground">
                            {row.day}
                          </td>
                          <td className="px-4 py-3">
                            {isOff ? (
                              <span className="text-xs text-muted-foreground italic">
                                Off
                              </span>
                            ) : (
                              <span className="font-mono text-xs text-foreground">
                                {row.start} – {row.end}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right">
                            {isOff ? (
                              <span className="text-xs text-muted-foreground">—</span>
                            ) : (
                              <span className="inline-flex items-center justify-center rounded-full bg-[#16a34a]/10 px-2 py-0.5 text-xs font-semibold text-[#16a34a]">
                                {row.slots}
                              </span>
                            )}
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

        {/* ── RIGHT: Stats card ─────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          {/* Rating — given visual emphasis as the primary trust signal */}
          <Card className="relative overflow-hidden border-border">
            <div
              className="absolute inset-y-0 left-0 w-1 rounded-l-xl"
              style={{ background: "#16a34a" }}
              aria-hidden="true"
            />
            <CardHeader className="pl-7 pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Rating
                </CardTitle>
                <span
                  className="flex items-center justify-center rounded-md p-1.5"
                  style={{ background: "#fef3c7" }}
                  aria-hidden="true"
                >
                  <Star className="size-4 fill-amber-500 text-amber-500" />
                </span>
              </div>
            </CardHeader>
            <CardContent className="pl-7 pb-4">
              <p className="text-2xl font-bold tracking-tight text-foreground">
                4.8
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">out of 5.0</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-border">
            <div
              className="absolute inset-y-0 left-0 w-1 rounded-l-xl"
              style={{ background: "#16a34a" }}
              aria-hidden="true"
            />
            <CardHeader className="pl-7 pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Total Patients
                </CardTitle>
                <span
                  className="flex items-center justify-center rounded-md p-1.5 bg-[#16a34a]/10"
                  aria-hidden="true"
                >
                  <Users className="size-4 text-[#16a34a]" />
                </span>
              </div>
            </CardHeader>
            <CardContent className="pl-7 pb-4">
              <p className="text-2xl font-bold tracking-tight text-foreground">
                284
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-border">
            <div
              className="absolute inset-y-0 left-0 w-1 rounded-l-xl"
              style={{ background: "#16a34a" }}
              aria-hidden="true"
            />
            <CardHeader className="pl-7 pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Total Appointments
                </CardTitle>
                <span
                  className="flex items-center justify-center rounded-md p-1.5 bg-[#16a34a]/10"
                  aria-hidden="true"
                >
                  <Calendar className="size-4 text-[#16a34a]" />
                </span>
              </div>
            </CardHeader>
            <CardContent className="pl-7 pb-4">
              <p className="text-2xl font-bold tracking-tight text-foreground">
                412
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-border">
            <div
              className="absolute inset-y-0 left-0 w-1 rounded-l-xl"
              style={{ background: "#16a34a" }}
              aria-hidden="true"
            />
            <CardHeader className="pl-7 pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  This Month
                </CardTitle>
                <span
                  className="flex items-center justify-center rounded-md p-1.5 bg-[#16a34a]/10"
                  aria-hidden="true"
                >
                  <Clock className="size-4 text-[#16a34a]" />
                </span>
              </div>
            </CardHeader>
            <CardContent className="pl-7 pb-4">
              <p className="text-2xl font-bold tracking-tight text-foreground">
                38
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">appointments</p>
            </CardContent>
          </Card>
        </div>

      </div>

      {/* ── Recent Appointments (full width) ──────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="flex size-7 items-center justify-center rounded-md bg-[#16a34a]/10"
                aria-hidden="true"
              >
                <Calendar className="size-3.5 text-[#16a34a]" />
              </span>
              <CardTitle className="text-sm font-semibold text-foreground">
                Recent Appointments
              </CardTitle>
            </div>
            <Link href={`/admin/doctors/${doctorId}/appointments`}>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground"
              >
                View all
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-y border-border bg-muted/40">
                  <th className="px-5 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Appt #
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Date
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Patient
                  </th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">
                    Service
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
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/appointments/${appt.id}`}
                        className="font-mono text-xs text-[#16a34a] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                      >
                        #{appt.id}
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {appt.date}
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">
                      {appt.patient}
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                      {appt.service}
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
