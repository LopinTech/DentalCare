import Link from "next/link";
import { ArrowLeft, Pencil, User } from "lucide-react";
import { PatientTabsNav } from "@/components/patient-tabs-nav";

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export default async function PatientLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ patientId: string }>;
}) {
  const { patientId } = await params;

  // TODO: fetch real patient from DB
  const patient = { name: "John Doe", phone: "+880 1712-345678" };

  return (
    <div className="flex flex-col -m-4 lg:-m-6 h-[calc(100%+2rem)] lg:h-[calc(100%+3rem)]">

      {/* ── Sticky header ────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-10 shrink-0">

        {/* Green identity section */}
        <div className="bg-primary px-4 lg:px-6 pt-4 pb-5">
          {/* Top row: back + edit */}
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/admin/patients"
              className="flex items-center gap-1.5 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <ArrowLeft className="size-4" />
              Patients
            </Link>
            <Link
              href={`/admin/patients/${patientId}/edit`}
              className="flex items-center gap-1.5 text-sm font-medium text-primary-foreground border border-primary-foreground/40 rounded-md px-2.5 py-1 hover:bg-primary-foreground/10 transition-colors"
            >
              <Pencil className="size-3.5" />
              Edit
            </Link>
          </div>

          {/* Patient identity */}
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-full bg-primary-foreground/20 border-2 border-primary-foreground/30 flex items-center justify-center shrink-0">
              {patient.name ? (
                <span className="text-lg font-bold text-primary-foreground select-none">
                  {initials(patient.name)}
                </span>
              ) : (
                <User className="size-7 text-primary-foreground/70" />
              )}
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-primary-foreground leading-tight truncate">
                {patient.name}
              </h1>
              <p className="text-sm text-primary-foreground/75 mt-0.5">{patient.phone}</p>
            </div>
          </div>
        </div>

        {/* White tab bar */}
        <div className="bg-background border-b border-border px-4 lg:px-6">
          <PatientTabsNav patientId={patientId} />
        </div>
      </div>

      {/* ── Scrollable tab content ────────────────────────────────────────── */}
      <div className="flex-1 min-h-0 overflow-y-auto bg-secondary/30 px-4 lg:px-6 py-5">
        {children}
      </div>

    </div>
  );
}
