import Link from "next/link";
import { Users, Plus, Search, Eye, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Avatar } from "@/ui/avatar";

// ─── Types ────────────────────────────────────────────────────────────────────

type BloodGroup = "A+" | "A−" | "B+" | "B−" | "AB+" | "AB−" | "O+" | "O−";
type Gender = "Male" | "Female";

interface Patient {
  id: number;
  name: string;
  phone: string;
  bloodGroup: BloodGroup;
  gender: Gender;
  lastVisit: string;
}

// ─── Placeholder data (replace with DB queries) ───────────────────────────────

const PATIENTS: Patient[] = [
  {
    id: 1,
    name: "Rahima Begum",
    phone: "+880 1711-234567",
    bloodGroup: "B+",
    gender: "Female",
    lastVisit: "18 Jun 2026",
  },
  {
    id: 2,
    name: "Arif Hossain",
    phone: "+880 1812-345678",
    bloodGroup: "O+",
    gender: "Male",
    lastVisit: "15 Jun 2026",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    phone: "+880 1934-567890",
    bloodGroup: "A+",
    gender: "Female",
    lastVisit: "12 Jun 2026",
  },
  {
    id: 4,
    name: "Md. Rakib Ali",
    phone: "+880 1755-678901",
    bloodGroup: "AB+",
    gender: "Male",
    lastVisit: "10 Jun 2026",
  },
  {
    id: 5,
    name: "Sabrina Akter",
    phone: "+880 1623-789012",
    bloodGroup: "A−",
    gender: "Female",
    lastVisit: "7 Jun 2026",
  },
  {
    id: 6,
    name: "Tanvir Ahmed",
    phone: "+880 1888-890123",
    bloodGroup: "O−",
    gender: "Male",
    lastVisit: "3 Jun 2026",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function genderBadge(gender: Gender) {
  if (gender === "Female") {
    return <Badge variant="info">Female</Badge>;
  }
  return <Badge variant="secondary">Male</Badge>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminPatientsPage() {
  return (
    <div className="flex flex-col gap-6">

      {/* ── Header row ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#16a34a]">
            Records
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Patients
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Manage patient records
          </p>
        </div>
        <div className="mt-3 sm:mt-0">
          <Link href="/admin/patients/new">
            <Button variant="default">
              <Plus />
              Add Patient
            </Button>
          </Link>
        </div>
      </div>

      {/* ── Search bar ──────────────────────────────────────────────────────── */}
      <div className="relative max-w-sm">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Search patients..."
          className="h-9 w-full rounded-md border border-border bg-background pl-9 pr-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
        />
      </div>

      {/* ── Stats row ───────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* Total Patients */}
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
                className="flex items-center justify-center rounded-md p-1.5"
                style={{ background: "#dcfce7" }}
              >
                <Users className="size-4 shrink-0" style={{ color: "#16a34a" }} />
              </span>
            </div>
          </CardHeader>
          <CardContent className="pl-7 pb-4">
            <p className="text-3xl font-bold tracking-tight text-foreground">142</p>
            <p className="mt-1 text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        {/* Active This Month */}
        <Card className="relative overflow-hidden border-border">
          <div
            className="absolute inset-y-0 left-0 w-1 rounded-l-xl"
            style={{ background: "#16a34a" }}
            aria-hidden="true"
          />
          <CardHeader className="pl-7 pb-2">
            <div className="flex items-start justify-between">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Active This Month
              </CardTitle>
              <span
                className="flex items-center justify-center rounded-md p-1.5"
                style={{ background: "#dcfce7" }}
              >
                <Users className="size-4 shrink-0" style={{ color: "#16a34a" }} />
              </span>
            </div>
          </CardHeader>
          <CardContent className="pl-7 pb-4">
            <p className="text-3xl font-bold tracking-tight text-foreground">38</p>
            <p className="mt-1 text-xs text-muted-foreground">Visited in June</p>
          </CardContent>
        </Card>

        {/* New This Week */}
        <Card className="relative overflow-hidden border-border">
          <div
            className="absolute inset-y-0 left-0 w-1 rounded-l-xl"
            style={{ background: "#16a34a" }}
            aria-hidden="true"
          />
          <CardHeader className="pl-7 pb-2">
            <div className="flex items-start justify-between">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                New This Week
              </CardTitle>
              <span
                className="flex items-center justify-center rounded-md p-1.5"
                style={{ background: "#dcfce7" }}
              >
                <Users className="size-4 shrink-0" style={{ color: "#16a34a" }} />
              </span>
            </div>
          </CardHeader>
          <CardContent className="pl-7 pb-4">
            <p className="text-3xl font-bold tracking-tight text-foreground">7</p>
            <p className="mt-1 text-xs text-muted-foreground">Registered this week</p>
          </CardContent>
        </Card>

      </div>

      {/* ── Patient list table ──────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground">
            All Patients
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-5 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Name
                  </th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">
                    Phone
                  </th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:table-cell">
                    Blood Group
                  </th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:table-cell">
                    Gender
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Last Visit
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {PATIENTS.map((patient) => (
                  <tr
                    key={patient.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    {/* Name + Avatar */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={patient.name} size="sm" />
                        <span className="font-medium text-foreground">
                          {patient.name}
                        </span>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="hidden px-4 py-3 md:table-cell">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Phone className="size-3.5 shrink-0" />
                        <span className="font-mono text-xs">{patient.phone}</span>
                      </div>
                    </td>

                    {/* Blood Group */}
                    <td className="hidden px-4 py-3 sm:table-cell">
                      <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold text-foreground">
                        {patient.bloodGroup}
                      </span>
                    </td>

                    {/* Gender */}
                    <td className="hidden px-4 py-3 lg:table-cell">
                      {genderBadge(patient.gender)}
                    </td>

                    {/* Last Visit */}
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {patient.lastVisit}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <Link href={`/admin/patients/${patient.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye />
                          View
                        </Button>
                      </Link>
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
