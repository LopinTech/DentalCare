import Link from "next/link";
import {
  MessageSquare,
  Phone,
  Calendar,
  Download,
  MessageCircle,
  ChevronRight,
  Stethoscope,
  BarChart2,
  FileText,
  CalendarDays,
  HeartPulse,
} from "lucide-react";
import { Badge } from "@/ui/badge";

// ─── Types ───────────────────────────────────────────────────────────────────

type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled" | "no_show";

interface RecentAppointment {
  id: number;
  date: string;
  service: string;
  doctor: string;
  status: AppointmentStatus;
}

// ─── Placeholder data ────────────────────────────────────────────────────────

const PATIENT = {
  id: 1,
  name: "John Doe",
  phone: "+880 1712-345678",
  email: "johndoe@example.com",
  address: "House 12, Road 4, Dhanmondi, Dhaka 1205",
  gender: "Male",
  dateOfBirth: "14 Mar 1988",
  age: 38,
  dateAdded: "27/02/2026",
  patientSource: "—",
  note: "U/L 2,3 GI pf Done",
  bloodGroup: "B+",
  emergencyContact: "Jane Doe — +880 1811-987654",
  treatmentPlanCount: 2,
  dentalChartCount: 1,
  dentalNoteCount: 3,
  appointmentCount: 12,
};

const RECENT_APPOINTMENTS: RecentAppointment[] = [
  { id: 1, date: "15 Jun 2026", service: "Root Canal",          doctor: "Dr. Karim",   status: "completed"  },
  { id: 2, date: "28 May 2026", service: "Dental Cleaning",     doctor: "Dr. Sultana", status: "completed"  },
  { id: 3, date: "25 Jun 2026", service: "Orthodontic Checkup", doctor: "Dr. Islam",   status: "confirmed"  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function statusBadge(status: AppointmentStatus) {
  const map: Record<AppointmentStatus, { label: string; variant: "default" | "success" | "destructive" | "warning" | "secondary" | "info" }> = {
    pending:   { label: "Pending",   variant: "warning"     },
    confirmed: { label: "Confirmed", variant: "info"        },
    completed: { label: "Completed", variant: "success"     },
    cancelled: { label: "Cancelled", variant: "destructive" },
    no_show:   { label: "No-show",   variant: "secondary"   },
  };
  const { label, variant } = map[status];
  return <Badge variant={variant}>{label}</Badge>;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground shrink-0 w-36">{label}</span>
      <span className="text-sm font-medium text-foreground text-right">{value || "—"}</span>
    </div>
  );
}

function QuickCard({
  icon: Icon,
  label,
  count,
  description,
  href,
}: {
  icon: React.ElementType;
  label: string;
  count: number;
  description: string;
  href: string;
}) {
  return (
    <Link href={href} className="block rounded-2xl border border-border bg-background p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-bold text-foreground leading-snug">{label}</p>
        <span className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold shrink-0">
          {count}
        </span>
      </div>
      <p className="text-xs text-muted-foreground mb-4">{description}</p>
      <div className="flex items-center justify-between">
        <Icon className="size-6 text-muted-foreground/50" />
        <span className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
          <ChevronRight className="size-4 text-primary" />
        </span>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function PatientDetailPage({
  params,
}: {
  params: Promise<{ patientId: string }>;
}) {
  const { patientId } = await params;
  const patient = PATIENT;

  const whatsappUrl = `https://wa.me/${patient.phone.replace(/\D/g, "")}`;
  const callUrl     = `tel:${patient.phone}`;
  const smsUrl      = `sms:${patient.phone}`;

  const ACTIONS = [
    { label: "WhatsApp", icon: MessageCircle,  href: whatsappUrl, external: true  },
    { label: "Download", icon: Download,        href: "#",         external: false },
    { label: "Message",  icon: MessageSquare,   href: smsUrl,      external: true  },
    { label: "Schedule", icon: Calendar,         href: `/admin/appointments/new?patientId=${patientId}`, external: false },
    { label: "Call",     icon: Phone,            href: callUrl,     external: true  },
  ];

  return (
    <div className="space-y-4">

      {/* ── Action buttons ─────────────────────────────────────────────────── */}
      <div className="bg-background rounded-2xl border border-border px-2 py-4">
        <div className="flex justify-around">
          {ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <a
                key={action.label}
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noopener noreferrer" : undefined}
                className="flex flex-col items-center gap-1.5 group"
              >
                <div className="size-12 rounded-full bg-foreground flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Icon className="size-5 text-background" />
                </div>
                <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                  {action.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>

      {/* ── Patient Information ────────────────────────────────────────────── */}
      <div className="bg-background rounded-2xl border border-border p-4">
        <div className="flex items-center gap-2 mb-3">
          <HeartPulse className="size-5 text-primary" />
          <h2 className="text-base font-bold text-primary">Patient Information</h2>
        </div>
        <InfoRow label="Email"          value={patient.email} />
        <InfoRow label="Address"        value={patient.address} />
        <InfoRow label="Gender"         value={patient.gender} />
        <InfoRow label="Birthdate"      value={patient.dateOfBirth} />
        <InfoRow label="Age"            value={String(patient.age)} />
        <InfoRow label="Blood Group"    value={patient.bloodGroup} />
        <InfoRow label="Emergency"      value={patient.emergencyContact} />
        <InfoRow label="Date Added"     value={patient.dateAdded} />
        <InfoRow label="Patient Source" value={patient.patientSource} />
        <InfoRow label="Note"           value={patient.note} />
      </div>

      {/* ── Quick action cards ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3">
        <QuickCard
          icon={Stethoscope}
          label="Treatment Plan"
          count={patient.treatmentPlanCount}
          description="View patient's treatment plan"
          href={`/admin/patients/${patientId}/treatment`}
        />
        <QuickCard
          icon={BarChart2}
          label="Dental Chart"
          count={patient.dentalChartCount}
          description="Edit patient's chart"
          href={`/admin/patients/${patientId}/treatment`}
        />
        <QuickCard
          icon={FileText}
          label="Dental Note"
          count={patient.dentalNoteCount}
          description="Clinical notes & records"
          href={`/admin/patients/${patientId}/treatment`}
        />
        <QuickCard
          icon={CalendarDays}
          label="Appointments"
          count={patient.appointmentCount}
          description="View all appointments"
          href={`/admin/patients/${patientId}/appointments`}
        />
      </div>

      {/* ── Recent Appointments ────────────────────────────────────────────── */}
      <div className="bg-background rounded-2xl border border-border overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Recent Appointments</h3>
          <Link href={`/admin/patients/${patientId}/appointments`} className="text-xs text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="divide-y divide-border">
          {RECENT_APPOINTMENTS.map((appt) => (
            <div key={appt.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">{appt.service}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{appt.date} · {appt.doctor}</p>
              </div>
              {statusBadge(appt.status)}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
