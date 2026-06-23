"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { Input } from "@/ui/input";
import { Select } from "@/ui/select";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

// ─── Types ────────────────────────────────────────────────────────────────────

type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled" | "no_show";
type PaymentStatus = "pending" | "paid" | "refunded";

// ─── Placeholder data (replace with DB fetch by appointmentId) ───────────────

const MOCK_APPOINTMENT = {
  patient: "John Doe",
  doctor: "dr-karim-ahmed",
  service: "general-checkup",
  date: "2026-06-22",
  timeSlot: "10:30",
  status: "confirmed" as AppointmentStatus,
  paymentStatus: "pending" as PaymentStatus,
  notes: "Braces adjustment — 3rd session. Patient requests earlier slot if possible.",
  symptoms: "Mild discomfort around upper molars. Slight misalignment noted on last visit.",
  diagnosis: "Malocclusion — Class II, Division 1. Braces therapy in progress.",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EditAppointmentPage({
  params,
}: {
  params: { appointmentId: string };
}) {
  const router = useRouter();

  // Pre-fill from placeholder data (swap with fetched record in production)
  const [doctor, setDoctor]               = useState(MOCK_APPOINTMENT.doctor);
  const [service, setService]             = useState(MOCK_APPOINTMENT.service);
  const [date, setDate]                   = useState(MOCK_APPOINTMENT.date);
  const [timeSlot, setTimeSlot]           = useState(MOCK_APPOINTMENT.timeSlot);
  const [status, setStatus]               = useState<AppointmentStatus>(MOCK_APPOINTMENT.status);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(MOCK_APPOINTMENT.paymentStatus);
  const [notes, setNotes]                 = useState(MOCK_APPOINTMENT.notes);
  const [symptoms, setSymptoms]           = useState(MOCK_APPOINTMENT.symptoms);
  const [diagnosis, setDiagnosis]         = useState(MOCK_APPOINTMENT.diagnosis);

  const detailHref = `/admin/appointments/${params.appointmentId}`;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire up to API — PATCH /api/appointments/[appointmentId]
    router.push(detailHref);
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">

      {/* ── Page header ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-1">
        <Link
          href={detailHref}
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-[#16a34a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          <ArrowLeft className="size-3.5" />
          Back to Appointment
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Edit Appointment
        </h1>
        <p className="text-sm text-muted-foreground">
          Appt #{params.appointmentId} — changes take effect immediately after saving.
        </p>
      </div>

      {/* ── Form card ───────────────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold text-foreground">
            Appointment Details
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Patient — readonly once booked */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Patient
              </label>
              <div className="flex h-9 w-full items-center rounded-md border border-input bg-muted/50 px-3 text-sm text-muted-foreground select-none">
                {MOCK_APPOINTMENT.patient}
              </div>
              <p className="text-xs text-muted-foreground">
                Patient cannot be changed after booking.
              </p>
            </div>

            {/* Doctor */}
            <Select
              id="doctor"
              label="Doctor"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
            >
              <option value="dr-karim-ahmed">Dr. Karim Ahmed</option>
              <option value="dr-sultana-islam">Dr. Sultana Islam</option>
              <option value="dr-rafiq-khan">Dr. Rafiq Khan</option>
            </Select>

            {/* Service */}
            <Select
              id="service"
              label="Service"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option value="general-checkup">General Checkup</option>
              <option value="teeth-cleaning">Teeth Cleaning</option>
              <option value="root-canal">Root Canal Therapy</option>
              <option value="teeth-whitening">Teeth Whitening</option>
              <option value="dental-implant">Dental Implant</option>
              <option value="orthodontics">Orthodontics</option>
              <option value="tooth-extraction">Tooth Extraction</option>
              <option value="dental-filling">Dental Filling</option>
              <option value="crown-bridge">Crown &amp; Bridge</option>
            </Select>

            {/* Date + Time — side by side on wider screens */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Input
                id="date"
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <Input
                id="timeSlot"
                label="Time Slot"
                type="time"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
              />
            </div>

            {/* Status + Payment status — side by side */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Select
                id="status"
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value as AppointmentStatus)}
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="no_show">No-show</option>
              </Select>

              <Select
                id="paymentStatus"
                label="Payment Status"
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="refunded">Refunded</option>
              </Select>
            </div>

            {/* Notes */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="notes"
                className="text-sm font-medium text-foreground"
              >
                Notes
              </label>
              <textarea
                id="notes"
                rows={3}
                className="w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Add any scheduling or administrative notes…"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* ── Medical notes section ──────────────────────────────────────── */}
            <div className="border-t border-border pt-5 flex flex-col gap-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Medical Notes
              </p>

              {/* Symptoms */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="symptoms"
                  className="text-sm font-medium text-foreground"
                >
                  Symptoms
                </label>
                <textarea
                  id="symptoms"
                  rows={3}
                  className="w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Describe the patient's reported symptoms…"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                />
              </div>

              {/* Diagnosis */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="diagnosis"
                  className="text-sm font-medium text-foreground"
                >
                  Diagnosis
                </label>
                <textarea
                  id="diagnosis"
                  rows={3}
                  className="w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Clinical diagnosis and findings…"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                />
              </div>
            </div>

            {/* ── Actions ───────────────────────────────────────────────────── */}
            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <Link href={detailHref} className="sm:w-auto w-full">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                variant="default"
                className="w-full sm:w-auto"
              >
                <Save className="size-4" />
                Save Changes
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>

    </div>
  );
}
