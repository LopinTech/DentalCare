import Link from "next/link";
import { Stethoscope, Plus, Star } from "lucide-react";
import { Card, CardContent } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Avatar } from "@/ui/avatar";

// ─── Types ────────────────────────────────────────────────────────────────────

type Specialization =
  | "General Dentistry"
  | "Orthodontics"
  | "Oral Surgery"
  | "Periodontics";

interface Doctor {
  id: number;
  name: string;
  specialization: Specialization;
  experienceYears: number;
  available: boolean;
  consultationFee: number;
  rating: number;
}

// ─── Specialty colour tokens ──────────────────────────────────────────────────
// Each specialty gets its own header-band colour so the grid reads like a
// clinic directory — a deliberate identity marker rather than a generic palette.

const SPECIALTY_COLORS: Record<
  Specialization,
  { band: string; badgeBg: string; badgeText: string }
> = {
  "General Dentistry": {
    band: "#0d9488",      // teal-600
    badgeBg: "#ccfbf1",   // teal-100
    badgeText: "#0f766e", // teal-700
  },
  Orthodontics: {
    band: "#7c3aed",      // violet-600
    badgeBg: "#ede9fe",   // violet-100
    badgeText: "#6d28d9", // violet-700
  },
  "Oral Surgery": {
    band: "#d97706",      // amber-600
    badgeBg: "#fef3c7",   // amber-100
    badgeText: "#b45309", // amber-700
  },
  Periodontics: {
    band: "#e11d48",      // rose-600
    badgeBg: "#ffe4e6",   // rose-100
    badgeText: "#be123c", // rose-700
  },
};

// ─── Placeholder data ─────────────────────────────────────────────────────────

const DOCTORS: Doctor[] = [
  {
    id: 1,
    name: "Dr. Fahmida Karim",
    specialization: "General Dentistry",
    experienceYears: 8,
    available: true,
    consultationFee: 800,
    rating: 4.9,
  },
  {
    id: 2,
    name: "Dr. Rafiqul Islam",
    specialization: "Orthodontics",
    experienceYears: 12,
    available: true,
    consultationFee: 1200,
    rating: 4.8,
  },
  {
    id: 3,
    name: "Dr. Nadia Sultana",
    specialization: "Oral Surgery",
    experienceYears: 6,
    available: false,
    consultationFee: 1500,
    rating: 4.7,
  },
  {
    id: 4,
    name: "Dr. Tanvir Hossain",
    specialization: "Periodontics",
    experienceYears: 9,
    available: true,
    consultationFee: 1000,
    rating: 4.6,
  },
];

// ─── Doctor Card ──────────────────────────────────────────────────────────────

function DoctorCard({ doctor }: { doctor: Doctor }) {
  const colors = SPECIALTY_COLORS[doctor.specialization];

  return (
    <Card className="overflow-hidden">
      {/* Aesthetic risk: full-width specialty band with oversized initials avatar.
          Replaces the common icon-in-circle convention with something specific
          to a clinic's physical directory boards. */}
      <div
        className="relative flex h-24 items-end px-5 pb-0"
        style={{ background: colors.band }}
        aria-hidden="true"
      >
        {/* Subtle cross pattern — dental clinic shorthand */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.07]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id={`cross-${doctor.id}`}
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
          <rect width="100%" height="100%" fill={`url(#cross-${doctor.id})`} />
        </svg>

        {/* Avatar sits half-in, half-out of the band */}
        <div className="relative z-10 translate-y-1/2">
          <Avatar
            name={doctor.name}
            size="lg"
            className="ring-4 ring-white"
          />
        </div>

        {/* Availability badge — top-right */}
        <div className="absolute right-4 top-4">
          {doctor.available ? (
            <Badge
              className="border border-white/30 bg-white/20 text-white backdrop-blur-sm"
            >
              Available
            </Badge>
          ) : (
            <Badge
              className="border border-white/20 bg-black/25 text-white/80 backdrop-blur-sm"
            >
              Unavailable
            </Badge>
          )}
        </div>
      </div>

      {/* Card body */}
      <CardContent className="pt-8 pb-5 px-5 flex flex-col gap-3">
        {/* Name + specialty */}
        <div className="flex flex-col gap-1.5">
          <h2 className="text-base font-semibold leading-tight text-foreground">
            {doctor.name}
          </h2>
          <span
            className="inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
            style={{
              background: colors.badgeBg,
              color: colors.badgeText,
            }}
          >
            {doctor.specialization}
          </span>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Stethoscope className="size-3.5 shrink-0" />
            {doctor.experienceYears} years
          </span>
          <span className="flex items-center gap-1">
            <Star className="size-3.5 shrink-0 fill-amber-400 text-amber-400" />
            {doctor.rating.toFixed(1)}
          </span>
        </div>

        {/* Fee */}
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold tracking-tight text-foreground">
            ৳{doctor.consultationFee.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground">/ consultation</span>
        </div>

        {/* CTA */}
        <Link href={`/admin/doctors/${doctor.id}`} className="mt-1">
          <Button variant="outline" size="sm" className="w-full">
            View Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminDoctorsPage() {
  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#16a34a]">
            Clinic Staff
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Doctors
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Manage clinic doctors
          </p>
        </div>
        <Link href="/admin/doctors/new">
          <Button variant="default" className="mt-3 sm:mt-0">
            <Plus />
            Add Doctor
          </Button>
        </Link>
      </div>

      {/* Doctor grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {DOCTORS.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>

    </div>
  );
}
