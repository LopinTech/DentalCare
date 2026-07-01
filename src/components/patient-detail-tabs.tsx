"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight, Stethoscope, BarChart2, FileText, CalendarDays,
  CreditCard, Camera, HeartPulse, Calendar, Plus, Eye, Edit2,
  ChevronLeft, Receipt, X, Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

// ─── Tab config ───────────────────────────────────────────────────────────────

type TabKey = "overview" | "appointments" | "treatment" | "invoices";

const TABS: { key: TabKey; label: string }[] = [
  { key: "overview",     label: "Overview"      },
  { key: "appointments", label: "Appointments"  },
  { key: "treatment",    label: "Treatment"     },
  { key: "invoices",     label: "Invoices"      },
];

// ─── Shared types ─────────────────────────────────────────────────────────────

type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled" | "no_show";
type PaymentStatus     = "paid" | "partial" | "unpaid" | "waived";

// ─── Placeholder data ─────────────────────────────────────────────────────────

const PATIENT = {
  email: "johndoe@example.com",
  address: "House 12, Road 4, Dhanmondi, Dhaka 1205",
  gender: "Male",
  dateOfBirth: "14 Mar 1988",
  age: 38,
  bloodGroup: "B+",
  emergencyContact: "Jane Doe — +880 1811-987654",
  dateAdded: "27/02/2026",
  patientSource: "—",
  note: "U/L 2,3 GI pf Done",
  treatmentPlanCount: 2,
  dentalChartCount: 1,
  dentalNoteCount: 3,
  appointmentCount: 12,
  paymentCount: 1,
  photoCount: 0,
};

const RECENT_APPOINTMENTS = [
  { id: 1, date: "15 Jun 2026", service: "Root Canal",          doctor: "Dr. Karim",   status: "completed"  as AppointmentStatus },
  { id: 2, date: "28 May 2026", service: "Dental Cleaning",     doctor: "Dr. Sultana", status: "completed"  as AppointmentStatus },
  { id: 3, date: "25 Jun 2026", service: "Orthodontic Checkup", doctor: "Dr. Islam",   status: "confirmed"  as AppointmentStatus },
];

const ALL_APPOINTMENTS: {
  id: number; date: string; time: string; doctor: string;
  service: string; status: AppointmentStatus; payment: PaymentStatus;
}[] = [
  { id: 3001, date: "25 Jun 2026", time: "09:00 AM", doctor: "Dr. Islam",   service: "Orthodontic Checkup", status: "confirmed", payment: "unpaid"  },
  { id: 3002, date: "15 Jun 2026", time: "11:30 AM", doctor: "Dr. Karim",   service: "Root Canal Therapy",  status: "completed", payment: "paid"    },
  { id: 3003, date: "28 May 2026", time: "10:00 AM", doctor: "Dr. Sultana", service: "Dental Cleaning",     status: "completed", payment: "paid"    },
  { id: 3004, date: "10 May 2026", time: "02:00 PM", doctor: "Dr. Karim",   service: "Teeth Whitening",     status: "no_show",   payment: "unpaid"  },
  { id: 3005, date: "20 Apr 2026", time: "03:30 PM", doctor: "Dr. Islam",   service: "Dental X-ray",        status: "cancelled", payment: "waived"  },
  { id: 3006, date: "05 Apr 2026", time: "09:30 AM", doctor: "Dr. Sultana", service: "Composite Filling",   status: "completed", payment: "partial" },
];

// ─── Badge helpers ────────────────────────────────────────────────────────────

const APPT_STATUS: Record<AppointmentStatus, { label: string; variant: "warning"|"info"|"success"|"destructive"|"secondary" }> = {
  pending:   { label: "Pending",   variant: "warning"     },
  confirmed: { label: "Confirmed", variant: "info"        },
  completed: { label: "Completed", variant: "success"     },
  cancelled: { label: "Cancelled", variant: "destructive" },
  no_show:   { label: "No-show",   variant: "secondary"   },
};

const PAY_STATUS: Record<PaymentStatus, { label: string; variant: "success"|"warning"|"destructive"|"secondary" }> = {
  paid:    { label: "Paid",    variant: "success"     },
  partial: { label: "Partial", variant: "warning"     },
  unpaid:  { label: "Unpaid",  variant: "destructive" },
  waived:  { label: "Waived",  variant: "secondary"   },
};

// ─── Small reusables ──────────────────────────────────────────────────────────

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground shrink-0 w-36">{label}</span>
      <span className="text-sm font-medium text-foreground text-right">{value || "—"}</span>
    </div>
  );
}

function QuickCard({
  icon: Icon, label, count, description, onClick,
}: {
  icon: React.ElementType; label: string; count: number; description: string; onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left block rounded-2xl border border-border bg-background p-4 hover:shadow-md transition-shadow w-full"
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-bold text-foreground leading-snug">{label}</p>
        <span className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold shrink-0">
          {count}
        </span>
      </div>
      <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{description}</p>
      <div className="flex items-center justify-between">
        <Icon className="size-6 text-muted-foreground/40" />
        <span className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
          <ChevronRight className="size-4 text-primary" />
        </span>
      </div>
    </button>
  );
}

// ─── Tab content components ───────────────────────────────────────────────────

function OverviewTab({ patientId, onTabChange }: { patientId: string; onTabChange: (t: TabKey) => void }) {
  const p = PATIENT;
  return (
    <div className="space-y-4">
      {/* Patient Information */}
      <div className="bg-background rounded-2xl border border-border p-4">
        <div className="flex items-center gap-2 mb-3">
          <HeartPulse className="size-5 text-primary" />
          <h2 className="text-base font-bold text-primary">Patient Information</h2>
        </div>
        <InfoRow label="Email"          value={p.email} />
        <InfoRow label="Address"        value={p.address} />
        <InfoRow label="Gender"         value={p.gender} />
        <InfoRow label="Birthdate"      value={p.dateOfBirth} />
        <InfoRow label="Age"            value={String(p.age)} />
        <InfoRow label="Blood Group"    value={p.bloodGroup} />
        <InfoRow label="Emergency"      value={p.emergencyContact} />
        <InfoRow label="Date Added"     value={p.dateAdded} />
        <InfoRow label="Patient Source" value={p.patientSource} />
        <InfoRow label="Note"           value={p.note} />
      </div>

      {/* Quick cards */}
      <div className="grid grid-cols-2 gap-3">
        <QuickCard icon={Stethoscope} label="Treatment Plan"  count={p.treatmentPlanCount} description="Your Patient's Treatment Plan"         onClick={() => onTabChange("treatment")}    />
        <QuickCard icon={BarChart2}   label="Dental Chart"    count={p.dentalChartCount}   description="Edit Patient's Chart"                  onClick={() => onTabChange("treatment")}    />
        <QuickCard icon={FileText}    label="Dental Notes"    count={p.dentalNoteCount}    description="Review notes made from the Patient"    onClick={() => onTabChange("treatment")}    />
        <QuickCard icon={CalendarDays}label="Appointments"   count={p.appointmentCount}   description="Your Patient's next Appointment List"  onClick={() => onTabChange("appointments")} />
        <QuickCard icon={CreditCard}  label="Payments"        count={p.paymentCount}       description="Billing and payment history"            onClick={() => onTabChange("invoices")}     />
        <QuickCard icon={Camera}      label="Patient Photos"  count={p.photoCount}         description="Before, after & X-ray photos"          onClick={() => onTabChange("treatment")}    />
      </div>

      {/* Recent appointments */}
      <div className="bg-background rounded-2xl border border-border overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Recent Appointments</h3>
          <button
            type="button"
            onClick={() => onTabChange("appointments")}
            className="text-xs text-primary hover:underline"
          >
            View all
          </button>
        </div>
        <div className="divide-y divide-border">
          {RECENT_APPOINTMENTS.map((appt) => (
            <div key={appt.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">{appt.service}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{appt.date} · {appt.doctor}</p>
              </div>
              <Badge variant={APPT_STATUS[appt.status].variant}>{APPT_STATUS[appt.status].label}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AppointmentsTab({ patientId }: { patientId: string }) {
  const statusAccent: Record<AppointmentStatus, string> = {
    pending: "#b45309", confirmed: "#0369a1", completed: "#15803d", cancelled: "#b91c1c", no_show: "#6b7280",
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Action */}
      <div className="flex justify-end">
        <Link href={`/admin/appointments/new?patientId=${patientId}`}>
          <Button variant="default" size="sm"><Plus className="size-4" />Book Appointment</Button>
        </Link>
      </div>

      {/* Appointments table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center rounded-md p-1.5 bg-green-100">
              <Calendar className="size-4 text-green-700" />
            </span>
            <CardTitle className="text-sm font-semibold">All Appointments</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="w-1 p-0" aria-hidden="true" />
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Time</th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">Doctor</th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:table-cell">Service</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:table-cell">Payment</th>
                  <th className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {ALL_APPOINTMENTS.map((appt) => (
                  <tr key={appt.id} className="hover:bg-muted/30 transition-colors">
                    <td className="w-0 p-0">
                      <div className="h-full w-0.75 min-h-13" style={{ background: statusAccent[appt.status] }} />
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">{appt.date}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{appt.time}</td>
                    <td className="hidden px-4 py-3 text-sm text-muted-foreground md:table-cell">{appt.doctor}</td>
                    <td className="hidden px-4 py-3 font-medium lg:table-cell">{appt.service}</td>
                    <td className="px-4 py-3"><Badge variant={APPT_STATUS[appt.status].variant}>{APPT_STATUS[appt.status].label}</Badge></td>
                    <td className="hidden px-4 py-3 sm:table-cell"><Badge variant={PAY_STATUS[appt.payment].variant}>{PAY_STATUS[appt.payment].label}</Badge></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link href={`/admin/appointments/${appt.id}`}>
                          <Button variant="ghost" size="icon-sm"><Eye className="size-4" /></Button>
                        </Link>
                        <Link href={`/admin/appointments/${appt.id}/edit`}>
                          <Button variant="ghost" size="icon-sm"><Edit2 className="size-4" /></Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Showing <span className="font-semibold text-foreground">1–6</span> of{" "}
          <span className="font-semibold text-foreground">12</span>
        </p>
        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="icon-sm" disabled><ChevronLeft className="size-4" /></Button>
          <Button variant="outline" size="icon-sm"><ChevronRight className="size-4" /></Button>
        </div>
      </div>
    </div>
  );
}

type TreatmentSubKey = "plans" | "chart" | "notes" | "photos";

const TREATMENT_SUBS: { key: TreatmentSubKey; label: string; count: number; icon: React.ElementType }[] = [
  { key: "plans",  label: "Treatment Plans", count: 2, icon: Stethoscope },
  { key: "chart",  label: "Dental Chart",    count: 1, icon: BarChart2   },
  { key: "notes",  label: "Dental Notes",    count: 3, icon: FileText    },
  { key: "photos", label: "Photos",          count: 0, icon: Camera      },
];

// ─── Inline form helpers ──────────────────────────────────────────────────────

function FormField({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">{label}</label>
      {children}
    </div>
  );
}

function inputCls(extra?: string) {
  return cn(
    "h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
    extra,
  );
}

function textareaCls() {
  return "w-full min-h-20 resize-y rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";
}

// ─── Treatment Plans sub-tab ──────────────────────────────────────────────────

function TreatmentPlansSection({ patientId }: { patientId: string }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle]       = useState("");
  const [status, setStatus]     = useState("active");
  const [startDate, setStart]   = useState("");
  const [endDate, setEnd]       = useState("");
  const [description, setDesc]  = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: POST to API
    setShowForm(false);
    setTitle(""); setStatus("active"); setStart(""); setEnd(""); setDesc("");
  }

  if (showForm) {
    return (
      <div className="rounded-2xl border border-border bg-background overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">New Treatment Plan</h3>
          <button type="button" onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
            <X className="size-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
          <FormField label="Plan Title" htmlFor="planTitle">
            <input id="planTitle" className={inputCls()} placeholder="e.g. Full Mouth Rehabilitation"
              value={title} onChange={e => setTitle(e.target.value)} required />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Start Date" htmlFor="planStart">
              <input id="planStart" type="date" className={inputCls()}
                value={startDate} onChange={e => setStart(e.target.value)} />
            </FormField>
            <FormField label="End Date (est.)" htmlFor="planEnd">
              <input id="planEnd" type="date" className={inputCls()}
                value={endDate} onChange={e => setEnd(e.target.value)} />
            </FormField>
          </div>

          <FormField label="Status" htmlFor="planStatus">
            <select id="planStatus" className={inputCls()} value={status} onChange={e => setStatus(e.target.value)}>
              <option value="active">Active</option>
              <option value="on_hold">On Hold</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </FormField>

          <FormField label="Description / Notes" htmlFor="planDesc">
            <textarea id="planDesc" className={textareaCls()} placeholder="Describe the treatment plan…"
              value={description} onChange={e => setDesc(e.target.value)} />
          </FormField>

          <div className="flex items-center gap-2 pt-1">
            <Button type="submit" size="sm">Save Plan</Button>
            <Button type="button" size="sm" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted mb-3">
        <Stethoscope className="size-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium text-foreground">No treatment plans yet</p>
      <p className="text-xs text-muted-foreground mt-1 mb-4 max-w-48">Create a plan to track procedures and progress.</p>
      <Button size="sm" variant="outline" onClick={() => setShowForm(true)}>
        <Plus className="size-4" />Create First Plan
      </Button>
    </div>
  );
}

// ─── Dental Notes sub-tab ─────────────────────────────────────────────────────

function DentalNotesSection({ patientId }: { patientId: string }) {
  const [showForm, setShowForm] = useState(false);
  const [noteTitle, setNoteTitle]   = useState("");
  const [category, setCategory]     = useState("examination");
  const [noteDate, setNoteDate]     = useState("");
  const [noteBody, setNoteBody]     = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: POST to API
    setShowForm(false);
    setNoteTitle(""); setCategory("examination"); setNoteDate(""); setNoteBody("");
  }

  if (showForm) {
    return (
      <div className="rounded-2xl border border-border bg-background overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">New Clinical Note</h3>
          <button type="button" onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
            <X className="size-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
          <FormField label="Title" htmlFor="noteTitle">
            <input id="noteTitle" className={inputCls()} placeholder="Note subject"
              value={noteTitle} onChange={e => setNoteTitle(e.target.value)} required />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Category" htmlFor="noteCategory">
              <select id="noteCategory" className={inputCls()} value={category} onChange={e => setCategory(e.target.value)}>
                <option value="examination">Examination</option>
                <option value="treatment">Treatment</option>
                <option value="prescription">Prescription</option>
                <option value="follow_up">Follow-up</option>
                <option value="other">Other</option>
              </select>
            </FormField>
            <FormField label="Date" htmlFor="noteDate">
              <input id="noteDate" type="date" className={inputCls()}
                value={noteDate} onChange={e => setNoteDate(e.target.value)} />
            </FormField>
          </div>

          <FormField label="Note" htmlFor="noteBody">
            <textarea id="noteBody" className={textareaCls()} placeholder="Write your clinical note here…"
              rows={4} value={noteBody} onChange={e => setNoteBody(e.target.value)} required />
          </FormField>

          <div className="flex items-center gap-2 pt-1">
            <Button type="submit" size="sm">Save Note</Button>
            <Button type="button" size="sm" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted mb-3">
        <FileText className="size-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium text-foreground">No clinical notes yet</p>
      <p className="text-xs text-muted-foreground mt-1 mb-4 max-w-48">Record notes after each consultation or procedure.</p>
      <Button size="sm" variant="outline" onClick={() => setShowForm(true)}>
        <Plus className="size-4" />Add First Note
      </Button>
    </div>
  );
}

// ─── Photos sub-tab ───────────────────────────────────────────────────────────

function PatientPhotosSection({ patientId }: { patientId: string }) {
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState("before");
  const [photoDate, setPhotoDate] = useState("");
  const [caption, setCaption]    = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: POST to API
    setShowForm(false);
  }

  if (showForm) {
    return (
      <div className="rounded-2xl border border-border bg-background overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Upload Photo</h3>
          <button type="button" onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
            <X className="size-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
          {/* Drop zone */}
          <label
            htmlFor="photoFile"
            className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/30 p-8 cursor-pointer hover:bg-muted/50 transition-colors"
          >
            <Upload className="size-7 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground">Click to choose a file</p>
            <p className="text-xs text-muted-foreground">JPG, PNG, WEBP or HEIC · max 10 MB</p>
            <input id="photoFile" type="file" accept="image/*" className="sr-only" />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Category" htmlFor="photoCategory">
              <select id="photoCategory" className={inputCls()} value={category} onChange={e => setCategory(e.target.value)}>
                <option value="before">Before</option>
                <option value="after">After</option>
                <option value="xray">X-Ray</option>
                <option value="intra_oral">Intra-oral</option>
                <option value="other">Other</option>
              </select>
            </FormField>
            <FormField label="Date" htmlFor="photoDate">
              <input id="photoDate" type="date" className={inputCls()}
                value={photoDate} onChange={e => setPhotoDate(e.target.value)} />
            </FormField>
          </div>

          <FormField label="Caption (optional)" htmlFor="photoCaption">
            <input id="photoCaption" className={inputCls()} placeholder="Describe the photo…"
              value={caption} onChange={e => setCaption(e.target.value)} />
          </FormField>

          <div className="flex items-center gap-2 pt-1">
            <Button type="submit" size="sm">Upload</Button>
            <Button type="button" size="sm" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted mb-3">
        <Camera className="size-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium text-foreground">No photos uploaded</p>
      <p className="text-xs text-muted-foreground mt-1 mb-4 max-w-48">Upload before/after or X-ray images.</p>
      <Button size="sm" variant="outline" onClick={() => setShowForm(true)}>
        <Upload className="size-4" />Upload Photo
      </Button>
    </div>
  );
}

// ─── Dental Chart sub-tab ─────────────────────────────────────────────────────

function DentalChartSection({ patientId }: { patientId: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted mb-3">
        <BarChart2 className="size-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium text-foreground">Dental chart coming soon</p>
      <p className="text-xs text-muted-foreground mt-1 max-w-48">Interactive tooth-by-tooth charting will appear here.</p>
    </div>
  );
}

// ─── TreatmentTab root ────────────────────────────────────────────────────────

function TreatmentTab({ patientId }: { patientId: string }) {
  const [sub, setSub] = useState<TreatmentSubKey>("plans");
  const active = TREATMENT_SUBS.find((s) => s.key === sub)!;

  return (
    <div className="flex flex-col gap-4">
      {/* Inner sub-tab bar */}
      <div className="bg-background rounded-2xl border border-border overflow-hidden">
        <div className="flex overflow-x-auto scrollbar-none">
          {TREATMENT_SUBS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setSub(t.key)}
              className={cn(
                "flex-1 min-w-max px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center justify-center gap-1.5",
                sub === t.key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
              {t.count > 0 && (
                <span className={cn(
                  "size-4.5 text-[10px] font-bold rounded-full flex items-center justify-center",
                  sub === t.key ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
                )}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-tab content — each section manages its own form state */}
      {sub === "plans"  && <TreatmentPlansSection patientId={patientId} />}
      {sub === "chart"  && <DentalChartSection    patientId={patientId} />}
      {sub === "notes"  && <DentalNotesSection     patientId={patientId} />}
      {sub === "photos" && <PatientPhotosSection   patientId={patientId} />}
    </div>
  );
}

function InvoicesTab({ patientId }: { patientId: string }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">Invoices & Billing</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Payment history and outstanding invoices.</p>
        </div>
        <Button size="sm"><Receipt className="size-4" />New Invoice</Button>
      </div>
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted mb-3">
          <Receipt className="size-5 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-foreground">No invoices yet</p>
        <p className="text-xs text-muted-foreground mt-1 mb-4">Invoices appear once billing is created.</p>
        <Button size="sm" variant="outline"><Receipt className="size-4" />Create Invoice</Button>
      </div>
    </div>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────

export function PatientDetailTabs({ patientId }: { patientId: string }) {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  return (
    <div className="space-y-4">
      {/* Tab bar */}
      <div className="bg-background rounded-2xl border border-border overflow-hidden">
        <div className="flex overflow-x-auto scrollbar-none">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex-1 min-w-max px-5 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap",
                activeTab === tab.key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === "overview"     && <OverviewTab     patientId={patientId} onTabChange={setActiveTab} />}
      {activeTab === "appointments" && <AppointmentsTab patientId={patientId} />}
      {activeTab === "treatment"    && <TreatmentTab    patientId={patientId} />}
      {activeTab === "invoices"     && <InvoicesTab     patientId={patientId} />}
    </div>
  );
}
