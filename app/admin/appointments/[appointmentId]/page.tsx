import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  User,
  Stethoscope,
  Clock,
  Edit,
  AlertTriangle,
  FileText,
  CreditCard,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled" | "no_show";
type PaymentStatus = "pending" | "paid" | "refunded";

interface AppointmentDetail {
  id: number;
  patient: string;
  patientId: string;
  doctor: string;
  service: string;
  date: string;
  time: string;
  duration: number;
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
  notes?: string;
  symptoms?: string;
  diagnosis?: string;
  prescription?: string;
  price?: string;
}

// ─── Status configuration ─────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  AppointmentStatus,
  {
    label: string;
    variant: "warning" | "info" | "success" | "destructive" | "secondary";
    topAccent: string;
  }
> = {
  pending:   { label: "Pending",   variant: "warning",     topAccent: "#d97706" },
  confirmed: { label: "Confirmed", variant: "info",        topAccent: "#0369a1" },
  completed: { label: "Completed", variant: "success",     topAccent: "#16a34a" },
  cancelled: { label: "Cancelled", variant: "destructive", topAccent: "#dc2626" },
  no_show:   { label: "No-show",   variant: "secondary",   topAccent: "#6b7280" },
};

const PAYMENT_CONFIG: Record<
  PaymentStatus,
  { label: string; variant: "warning" | "success" | "info" }
> = {
  pending:  { label: "Unpaid",    variant: "warning" },
  paid:     { label: "Paid",      variant: "success" },
  refunded: { label: "Refunded",  variant: "info"    },
};

// ─── Placeholder data (replace with DB query by appointmentId) ────────────────

const MOCK_APPOINTMENT: AppointmentDetail = {
  id: 1002,
  patient: "Arif Hossain",
  patientId: "PT-0087",
  doctor: "Dr. R. Sultana",
  service: "Orthodontics",
  date: "22 Jun 2026",
  time: "10:30 AM",
  duration: 45,
  status: "confirmed",
  paymentStatus: "pending",
  price: "৳3,500",
  notes: "Braces adjustment — 3rd session. Patient requests earlier slot if possible.",
  symptoms: "Mild discomfort around upper molars. Slight misalignment noted on last visit.",
  diagnosis: "Malocclusion — Class II, Division 1. Braces therapy in progress.",
  prescription: "Orthodontic wax as needed for bracket irritation. Warm saline rinse twice daily.",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-b-0">
      <span
        className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-[#16a34a]/8"
        aria-hidden="true"
      >
        <Icon className="size-3.5 text-[#16a34a]" />
      </span>
      <div className="flex flex-1 flex-col gap-0.5 min-w-0">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className="text-sm font-medium text-foreground break-words">{value}</span>
      </div>
    </div>
  );
}

function MedicalField({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <textarea
        readOnly
        rows={4}
        defaultValue={value ?? ""}
        placeholder={value ? undefined : "Not recorded"}
        className="w-full resize-none rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
        aria-label={label}
      />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AppointmentDetailPage({
  params,
}: {
  params: { appointmentId: string };
}) {
  // In production: fetch appointment by params.appointmentId from DB
  const appt = MOCK_APPOINTMENT;
  const statusCfg = STATUS_CONFIG[appt.status];
  const paymentCfg = PAYMENT_CONFIG[appt.paymentStatus];

  return (
    <div className="flex flex-col gap-6">

      {/* ── Page header ───────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <Link
            href="/admin/appointments"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-[#16a34a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            <ArrowLeft className="size-3.5" />
            Appointments
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Appointment Details
          </h1>
          <p className="text-sm text-muted-foreground">
            Appt #{appt.id} &mdash; {appt.patient}
          </p>
        </div>
        <Link href={`/admin/appointments/${params.appointmentId}/edit`}>
          <Button variant="outline">
            <Edit />
            Edit Appointment
          </Button>
        </Link>
      </div>

      {/* ── Two-column layout ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* ── LEFT: Appointment Info ────────────────────────────────────────── */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card className="overflow-hidden">
            {/*
              Aesthetic risk: full-width top accent border keyed to appointment
              status — the card itself wears the status colour rather than only
              the badge. Distinct from the left-rail motif used on stat cards.
            */}
            <div
              className="h-1 w-full"
              style={{ background: statusCfg.topAccent }}
              aria-hidden="true"
            />
            <CardHeader className="pb-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <CardTitle className="text-base font-semibold text-foreground">
                  Appointment Info
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant={statusCfg.variant}>{statusCfg.label}</Badge>
                  <Badge variant={paymentCfg.variant}>{paymentCfg.label}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <InfoRow icon={User}        label="Patient"        value={`${appt.patient} · ${appt.patientId}`} />
              <InfoRow icon={Stethoscope} label="Doctor"         value={appt.doctor} />
              <InfoRow icon={FileText}    label="Service"        value={appt.service} />
              <InfoRow icon={Calendar}    label="Date"           value={appt.date} />
              <InfoRow
                icon={Clock}
                label="Time & Duration"
                value={`${appt.time} · ${appt.duration} min`}
              />
              {appt.price && (
                <InfoRow icon={CreditCard} label="Fee" value={appt.price} />
              )}
              {appt.notes && (
                <InfoRow
                  icon={FileText}
                  label="Notes"
                  value={
                    <span className="text-muted-foreground italic">{appt.notes}</span>
                  }
                />
              )}
            </CardContent>
          </Card>

          {/* ── Medical Notes ─────────────────────────────────────────────── */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold text-foreground">
                Medical Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 pt-0">
              <MedicalField label="Symptoms"     value={appt.symptoms}     />
              <MedicalField label="Diagnosis"    value={appt.diagnosis}    />
              <MedicalField label="Prescription" value={appt.prescription} />
            </CardContent>
          </Card>
        </div>

        {/* ── RIGHT: Actions ────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-5">

          {/* Update Actions */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold text-foreground">
                Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pt-0">

              {/* Update Status */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="update-status"
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Update Status
                </label>
                <select
                  id="update-status"
                  defaultValue={appt.status}
                  className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="no_show">No-show</option>
                </select>
              </div>

              {/* Update Payment */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="update-payment"
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Payment Status
                </label>
                <select
                  id="update-payment"
                  defaultValue={appt.paymentStatus}
                  className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                >
                  <option value="pending">Unpaid</option>
                  <option value="paid">Paid</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>

              <Button variant="default" className="w-full">
                Save Changes
              </Button>

            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/30">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-4 text-destructive-foreground" aria-hidden="true" />
                <CardTitle className="text-sm font-semibold text-destructive-foreground">
                  Danger Zone
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="mb-4 text-xs text-muted-foreground leading-relaxed">
                Cancelling this appointment is permanent. The patient will need to rebook.
              </p>
              <Button variant="destructive" className="w-full">
                Cancel Appointment
              </Button>
            </CardContent>
          </Card>

        </div>
      </div>

    </div>
  );
}
