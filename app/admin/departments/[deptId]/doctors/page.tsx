import Link from "next/link";
import { ArrowLeft, Users, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Avatar } from "@/ui/avatar";
import { Select } from "@/ui/select";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PageProps {
  params: { deptId: string };
}

interface AssignedDoctor {
  id: number;
  name: string;
  specialization: string;
  designation: string;
  active: boolean;
}

// ─── Placeholder data ─────────────────────────────────────────────────────────

// In production these would be fetched by deptId from the database.

const DEPARTMENT_NAME = "Orthodontics & Dentofacial Orthopaedics";

const ASSIGNED_DOCTORS: AssignedDoctor[] = [
  {
    id: 1,
    name: "Dr. Fahmida Karim",
    specialization: "General Dentistry",
    designation: "Senior Consultant",
    active: true,
  },
  {
    id: 2,
    name: "Dr. Rafiqul Islam",
    specialization: "Orthodontics",
    designation: "Head of Department",
    active: true,
  },
  {
    id: 3,
    name: "Dr. Nadia Sultana",
    specialization: "Oral Surgery",
    designation: "Junior Consultant",
    active: false,
  },
];

const ALL_DOCTORS_OPTIONS = [
  { label: "Dr. Tanvir Hossain — Periodontics", value: "4" },
  { label: "Dr. Sumaiya Begum — Endodontics", value: "5" },
  { label: "Dr. Imran Chowdhury — Prosthodontics", value: "6" },
];

// ─── Assigned Doctors Table ───────────────────────────────────────────────────

function AssignedDoctorsTable({ doctors }: { doctors: AssignedDoctor[] }) {
  return (
    <Card>
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center justify-between">
          <CardTitle>Assigned Doctors</CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="size-4" />
            <span>
              ডাক্তার সংখ্যা:{" "}
              <span className="font-semibold text-foreground">
                {doctors.length}
              </span>{" "}
              জন
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {doctors.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-12 text-center text-muted-foreground">
            <Users className="size-8 opacity-40" />
            <p className="text-sm">No doctors assigned yet.</p>
            <p className="text-xs">Use the form below to add one.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Doctor Name
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Specialization
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Designation in Dept
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {doctors.map((doctor) => (
                  <tr
                    key={doctor.id}
                    className="group transition-colors hover:bg-muted/30"
                  >
                    {/* Doctor Name */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar name={doctor.name} size="sm" />
                        <span className="font-medium text-foreground">
                          {doctor.name}
                        </span>
                      </div>
                    </td>

                    {/* Specialization */}
                    <td className="px-5 py-3.5 text-muted-foreground">
                      {doctor.specialization}
                    </td>

                    {/* Designation */}
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center rounded-md border border-border bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                        {doctor.designation}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3.5">
                      {doctor.active ? (
                        <Badge variant="success">Active</Badge>
                      ) : (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5 text-right">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-muted-foreground hover:text-destructive-foreground hover:bg-destructive/10"
                        aria-label={`Remove ${doctor.name} from department`}
                      >
                        <Trash2 />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Add Doctor Form ──────────────────────────────────────────────────────────

function AddDoctorCard() {
  return (
    <Card>
      <CardHeader className="border-b border-border pb-4">
        <CardTitle>Add Doctor to Department</CardTitle>
      </CardHeader>

      <CardContent className="pt-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Doctor select */}
          <Select
            id="doctor-select"
            label="Select Doctor"
            placeholder="— choose a doctor —"
            options={ALL_DOCTORS_OPTIONS}
          />

          {/* Designation */}
          <Input
            id="designation"
            label="Designation in Department"
            placeholder="e.g. Senior Consultant"
          />
        </div>

        <div className="mt-4 flex items-center justify-end">
          <Button variant="default">
            <Plus />
            Add Doctor
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DepartmentDoctorsPage({ params }: PageProps) {
  // params.deptId is available for data fetching in production.
  void params;

  return (
    <div className="flex flex-col gap-6">

      {/* Back link + page header */}
      <div className="flex flex-col gap-3">
        <Link
          href="/admin/departments"
          className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Departments
        </Link>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Department Staff
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Assign Doctors
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {DEPARTMENT_NAME}
          </p>
        </div>
      </div>

      {/* Assigned doctors */}
      <AssignedDoctorsTable doctors={ASSIGNED_DOCTORS} />

      {/* Add doctor */}
      <AddDoctorCard />

    </div>
  );
}
