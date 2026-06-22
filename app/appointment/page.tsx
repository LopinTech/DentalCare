"use client";

import { useState } from "react";
import {
  Stethoscope,
  Calendar,
  User,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Smile,
  Sparkles,
  Activity,
  Scissors,
  Cylinder,
  Clock,
  GraduationCap,
  Star,
} from "lucide-react";
import { Navbar } from "@/public/navbar";
import { Footer } from "@/public/footer";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

/* ─────────────────────────── DATA ─────────────────────────────── */

const SERVICES = [
  {
    id: "general",
    icon: Stethoscope,
    name: "General Dentistry",
    description: "Check-ups, fillings, and preventive care",
    duration: "30–60 min",
  },
  {
    id: "orthodontics",
    icon: Smile,
    name: "Orthodontics",
    description: "Braces and clear aligners at any age",
    duration: "45–90 min",
  },
  {
    id: "cosmetic",
    icon: Sparkles,
    name: "Cosmetic Dentistry",
    description: "Whitening, veneers, and bonding",
    duration: "60–120 min",
  },
  {
    id: "periodontics",
    icon: Activity,
    name: "Periodontics",
    description: "Gum disease diagnosis and treatment",
    duration: "45–75 min",
  },
  {
    id: "surgery",
    icon: Scissors,
    name: "Oral Surgery",
    description: "Extractions and surgical procedures",
    duration: "60–90 min",
  },
  {
    id: "implants",
    icon: Cylinder,
    name: "Dental Implants",
    description: "Permanent, natural-looking replacements",
    duration: "90–120 min",
  },
];

const DOCTORS = [
  {
    id: "rahman",
    name: "Dr. Farhan Rahman",
    specialty: "General & Cosmetic Dentist",
    experience: "12 years",
    rating: 4.9,
    initials: "FR",
    bio: "Specialist in painless procedures and smile makeovers. Trained at BSMMU.",
  },
  {
    id: "hossain",
    name: "Dr. Nadia Hossain",
    specialty: "Orthodontist & Periodontist",
    experience: "9 years",
    rating: 4.8,
    initials: "NH",
    bio: "Expert in invisible aligners and gum health. Certified by the BDA.",
  },
  {
    id: "islam",
    name: "Dr. Tariq Islam",
    specialty: "Oral Surgeon & Implantologist",
    experience: "15 years",
    rating: 5.0,
    initials: "TI",
    bio: "Performed over 2,000 implants. Fellow of the International Implant Foundation.",
  },
];

/* Generate 30-min time slots 09:00 – 17:00 */
const TIME_SLOTS = Array.from({ length: 17 }, (_, i) => {
  const totalMinutes = 9 * 60 + i * 30;
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
});

/* ─────────────────────────── STEP LABELS ──────────────────────── */

const STEPS = [
  { label: "Service" },
  { label: "Doctor" },
  { label: "Date & Time" },
  { label: "Your Info" },
  { label: "Confirm" },
];

/* ─────────────────────────── TYPES ────────────────────────────── */

interface PatientInfo {
  name: string;
  phone: string;
  email: string;
  symptoms: string;
}

/* ─────────────────────────── PROGRESS BAR ─────────────────────── */

function StepProgress({ current }: { current: number }) {
  return (
    <div className="w-full">
      <div className="flex items-start justify-between">
        {STEPS.map((step, i) => {
          const state =
            i < current ? "done" : i === current ? "active" : "upcoming";
          return (
            <div key={step.label} className="flex flex-col items-center gap-2 flex-1">
              <div className="flex items-center w-full">
                {i > 0 && (
                  <div
                    className={`h-px flex-1 transition-colors duration-300 ${
                      i <= current ? "bg-[#16a34a]" : "bg-[#e5e7eb]"
                    }`}
                  />
                )}
                <div
                  className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-300 ${
                    state === "done"
                      ? "border-[#16a34a] bg-[#16a34a] text-white"
                      : state === "active"
                      ? "border-[#16a34a] bg-white text-[#16a34a] shadow-[0_0_0_4px_#bbf7d0]"
                      : "border-[#d1d5db] bg-white text-[#9ca3af]"
                  }`}
                >
                  {state === "done" ? (
                    <CheckCircle className="size-4 stroke-[2]" />
                  ) : (
                    i + 1
                  )}
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`h-px flex-1 transition-colors duration-300 ${
                      i < current ? "bg-[#16a34a]" : "bg-[#e5e7eb]"
                    }`}
                  />
                )}
              </div>
              <span
                className={`text-[10px] font-semibold uppercase tracking-wide text-center leading-none ${
                  state === "active"
                    ? "text-[#16a34a]"
                    : state === "done"
                    ? "text-[#15803d]"
                    : "text-[#9ca3af]"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────── STEP 1: SERVICE ──────────────────── */

function StepService({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-[#111827] mb-1">
        What brings you in?
      </h2>
      <p className="text-sm text-[#6b7280] mb-6">
        Choose the service that matches your need. Not sure? Pick General
        Dentistry — your doctor will guide you from there.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map(({ id, icon: Icon, name, description, duration }) => {
          const isSelected = selected === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              className={`group relative flex flex-col gap-3 rounded-xl border-2 p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a]/50 ${
                isSelected
                  ? "border-[#16a34a] bg-[#f0fdf4] shadow-sm"
                  : "border-[#e5e7eb] bg-white hover:border-[#86efac] hover:bg-[#f9fafb]"
              }`}
              aria-pressed={isSelected}
            >
              {/* Selection dot */}
              <div
                className={`absolute right-3 top-3 size-4 rounded-full border-2 transition-all flex items-center justify-center ${
                  isSelected
                    ? "border-[#16a34a] bg-[#16a34a]"
                    : "border-[#d1d5db] bg-white"
                }`}
              >
                {isSelected && (
                  <div className="size-1.5 rounded-full bg-white" />
                )}
              </div>
              <div
                className={`inline-flex size-10 items-center justify-center rounded-lg transition-colors ${
                  isSelected
                    ? "bg-[#16a34a] text-white"
                    : "bg-[#f3f4f6] text-[#6b7280] group-hover:bg-[#dcfce7] group-hover:text-[#16a34a]"
                }`}
              >
                <Icon className="size-5 stroke-[1.5]" />
              </div>
              <div>
                <p className="font-semibold text-[#111827] text-sm">{name}</p>
                <p className="mt-0.5 text-xs text-[#6b7280] leading-relaxed">
                  {description}
                </p>
              </div>
              <div className="mt-auto flex items-center gap-1 text-[11px] text-[#9ca3af]">
                <Clock className="size-3 stroke-[1.5]" />
                {duration}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────── STEP 2: DOCTOR ───────────────────── */

function StepDoctor({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-[#111827] mb-1">
        Choose your doctor
      </h2>
      <p className="text-sm text-[#6b7280] mb-6">
        All three specialists are available this week. Select the one you would
        like to see.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {DOCTORS.map(({ id, name, specialty, experience, rating, initials, bio }) => {
          const isSelected = selected === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              className={`group flex flex-col rounded-xl border-2 p-5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a]/50 ${
                isSelected
                  ? "border-[#16a34a] bg-[#f0fdf4] shadow-sm"
                  : "border-[#e5e7eb] bg-white hover:border-[#86efac]"
              }`}
              aria-pressed={isSelected}
            >
              <div className="mb-4 flex items-start justify-between">
                <div
                  className={`flex size-12 items-center justify-center rounded-full font-bold text-sm transition-colors ${
                    isSelected
                      ? "bg-[#16a34a] text-white"
                      : "bg-[#f3f4f6] text-[#374151] group-hover:bg-[#dcfce7] group-hover:text-[#16a34a]"
                  }`}
                >
                  {initials}
                </div>
                <div
                  className={`flex size-5 items-center justify-center rounded-full border-2 transition-all ${
                    isSelected
                      ? "border-[#16a34a] bg-[#16a34a]"
                      : "border-[#d1d5db] bg-white"
                  }`}
                >
                  {isSelected && <div className="size-2 rounded-full bg-white" />}
                </div>
              </div>
              <p className="font-semibold text-[#111827] text-sm">{name}</p>
              <p className="mt-0.5 text-xs text-[#16a34a] font-medium">
                {specialty}
              </p>
              <p className="mt-2 text-xs text-[#6b7280] leading-relaxed flex-1">
                {bio}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-[#9ca3af]">
                <span className="flex items-center gap-1">
                  <GraduationCap className="size-3.5 stroke-[1.5]" />
                  {experience}
                </span>
                <span className="flex items-center gap-1 font-semibold text-[#f59e0b]">
                  <Star className="size-3 fill-[#f59e0b] stroke-none" />
                  {rating}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────── STEP 3: DATE & TIME ──────────────── */

function StepDateTime({
  date,
  time,
  onDateChange,
  onTimeChange,
}: {
  date: string;
  time: string;
  onDateChange: (v: string) => void;
  onTimeChange: (v: string) => void;
}) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <h2 className="text-xl font-bold text-[#111827] mb-1">
        When works for you?
      </h2>
      <p className="text-sm text-[#6b7280] mb-6">
        We are open Saturday through Thursday, 9 AM to 5 PM. Pick a date and
        your preferred slot.
      </p>
      <div className="grid gap-8 sm:grid-cols-[auto_1fr] sm:gap-10">
        {/* Date picker */}
        <div>
          <label className="text-sm font-semibold text-[#111827] block mb-2">
            Select date
          </label>
          <input
            type="date"
            value={date}
            min={today}
            onChange={(e) => onDateChange(e.target.value)}
            className="flex h-10 w-full max-w-xs rounded-md border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-[#111827] shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#16a34a]/50 focus:border-[#16a34a]"
          />
          {date && (
            <p className="mt-2 text-xs text-[#16a34a] font-medium">
              {new Date(date + "T00:00:00").toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
        </div>

        {/* Time slots */}
        <div className="sm:border-l sm:border-[#f3f4f6] sm:pl-10">
          <label className="text-sm font-semibold text-[#111827] block mb-2">
            Select time
          </label>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {TIME_SLOTS.map((slot) => {
              const isSelected = time === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => onTimeChange(slot)}
                  className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a]/50 ${
                    isSelected
                      ? "border-[#16a34a] bg-[#16a34a] text-white shadow-sm"
                      : "border-[#e5e7eb] bg-white text-[#374151] hover:border-[#86efac] hover:bg-[#f0fdf4] hover:text-[#16a34a]"
                  }`}
                  aria-pressed={isSelected}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── STEP 4: PATIENT INFO ─────────────── */

function StepPatientInfo({
  info,
  onChange,
}: {
  info: PatientInfo;
  onChange: (field: keyof PatientInfo, value: string) => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-[#111827] mb-1">
        A little about you
      </h2>
      <p className="text-sm text-[#6b7280] mb-6">
        We use this to confirm your booking and prepare your doctor for your
        visit. We never share your details.
      </p>
      <div className="grid gap-5 max-w-lg">
        <Input
          id="patient-name"
          label="Full name"
          placeholder="e.g. Rafiq Ahmed"
          value={info.name}
          onChange={(e) => onChange("name", e.target.value)}
          required
        />
        <Input
          id="patient-phone"
          label="Phone number"
          placeholder="+880 17XX-XXXXXX"
          type="tel"
          value={info.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          required
        />
        <Input
          id="patient-email"
          label="Email address"
          placeholder="you@example.com"
          type="email"
          value={info.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="patient-symptoms"
            className="text-sm font-medium text-[#111827]"
          >
            Symptoms or concerns{" "}
            <span className="text-[#9ca3af] font-normal">(optional)</span>
          </label>
          <textarea
            id="patient-symptoms"
            rows={4}
            placeholder="Describe what you are experiencing — sensitivity, pain, a chipped tooth, or anything else you want your doctor to know."
            value={info.symptoms}
            onChange={(e) => onChange("symptoms", e.target.value)}
            className="flex w-full rounded-md border border-[#e5e7eb] bg-white px-3 py-2.5 text-sm text-[#111827] shadow-sm transition-colors placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#16a34a]/50 focus:border-[#16a34a] resize-none"
          />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── STEP 5: CONFIRM ──────────────────── */

function StepConfirm({
  serviceId,
  doctorId,
  date,
  time,
  info,
  onConfirm,
}: {
  serviceId: string;
  doctorId: string;
  date: string;
  time: string;
  info: PatientInfo;
  onConfirm: () => void;
}) {
  const service = SERVICES.find((s) => s.id === serviceId);
  const doctor = DOCTORS.find((d) => d.id === doctorId);
  const formattedDate = date
    ? new Date(date + "T00:00:00").toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  const rows = [
    { label: "Service", value: service?.name ?? "—" },
    { label: "Doctor", value: doctor?.name ?? "—" },
    { label: "Date", value: formattedDate },
    { label: "Time", value: time || "—" },
    { label: "Name", value: info.name || "—" },
    { label: "Phone", value: info.phone || "—" },
    ...(info.email ? [{ label: "Email", value: info.email }] : []),
    ...(info.symptoms ? [{ label: "Concerns", value: info.symptoms }] : []),
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-[#111827] mb-1">
        Review your booking
      </h2>
      <p className="text-sm text-[#6b7280] mb-6">
        Everything look right? Hit confirm and we will send you a reminder
        before your appointment.
      </p>

      <div className="max-w-lg rounded-xl border border-[#e5e7eb] overflow-hidden mb-6">
        <div className="bg-[#16a34a] px-5 py-4 flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-full bg-white/20">
            <Calendar className="size-5 text-white stroke-[1.5]" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#bbf7d0]">
              Appointment summary
            </p>
            <p className="text-sm font-bold text-white">
              {formattedDate}
              {time ? ` at ${time}` : ""}
            </p>
          </div>
        </div>
        <div className="divide-y divide-[#f3f4f6] bg-white">
          {rows.map(({ label, value }) => (
            <div key={label} className="flex gap-4 px-5 py-3.5">
              <span className="w-20 shrink-0 text-xs font-semibold uppercase tracking-wide text-[#9ca3af]">
                {label}
              </span>
              <span className="text-sm text-[#111827] leading-relaxed">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-[#9ca3af] mb-5 max-w-lg">
        By confirming, you agree that our team may contact you by phone or email
        to confirm or adjust this appointment.
      </p>

      <Button
        size="lg"
        className="gap-2 text-base w-full sm:w-auto"
        onClick={onConfirm}
      >
        <CheckCircle className="size-5 stroke-[1.5]" />
        Confirm booking
      </Button>
    </div>
  );
}

/* ─────────────────────────── SUCCESS STATE ────────────────────── */

function BookingSuccess({
  name,
  onReset,
}: {
  name: string;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col items-center text-center py-8">
      <div className="flex size-16 items-center justify-center rounded-full bg-[#f0fdf4] mb-5">
        <CheckCircle className="size-8 text-[#16a34a] stroke-[1.5]" />
      </div>
      <h2 className="text-2xl font-bold text-[#111827] mb-2">
        You are booked, {name.split(" ")[0]}!
      </h2>
      <p className="text-sm text-[#6b7280] max-w-sm leading-relaxed mb-8">
        We have received your request. Our team will call you within 2 hours to
        confirm the slot. Check your inbox for a copy of this summary.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Button size="lg" onClick={onReset} variant="outline">
          Book another appointment
        </Button>
        <a href="/">
          <Button size="lg">Back to home</Button>
        </a>
      </div>
    </div>
  );
}

/* ─────────────────────────── PAGE ─────────────────────────────── */

export default function AppointmentPage() {
  const [step, setStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  const [serviceId, setServiceId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    name: "",
    phone: "",
    email: "",
    symptoms: "",
  });

  const handlePatientField = (field: keyof PatientInfo, value: string) => {
    setPatientInfo((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = (() => {
    if (step === 0) return !!serviceId;
    if (step === 1) return !!doctorId;
    if (step === 2) return !!date && !!time;
    if (step === 3) return !!(patientInfo.name.trim() && patientInfo.phone.trim());
    return true;
  })();

  const handleNext = () => {
    if (canProceed && step < STEPS.length - 1) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleReset = () => {
    setStep(0);
    setConfirmed(false);
    setServiceId("");
    setDoctorId("");
    setDate("");
    setTime("");
    setPatientInfo({ name: "", phone: "", email: "", symptoms: "" });
  };

  return (
    <>
      <Navbar />

      {/* Page header */}
      <div className="bg-[#f0fdf4] border-b border-[#dcfce7]">
        <div className="container py-10">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-[#16a34a]">
            DentalCare
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#111827] lg:text-4xl">
            Book an appointment
          </h1>
          <p className="mt-2 text-[#6b7280] max-w-md">
            Complete the five steps below. The whole process takes under two
            minutes.
          </p>
        </div>
      </div>

      <main className="bg-white min-h-[calc(100vh-64px)]">
        <div className="container py-10 lg:py-14">
          {confirmed ? (
            <BookingSuccess
              name={patientInfo.name || "there"}
              onReset={handleReset}
            />
          ) : (
            <div className="max-w-3xl">
              {/* Progress bar */}
              <div className="mb-10">
                <StepProgress current={step} />
              </div>

              {/* Step card */}
              <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm lg:p-8">
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#9ca3af]">
                  Step {step + 1} of {STEPS.length}
                </p>

                {step === 0 && (
                  <StepService selected={serviceId} onSelect={setServiceId} />
                )}
                {step === 1 && (
                  <StepDoctor selected={doctorId} onSelect={setDoctorId} />
                )}
                {step === 2 && (
                  <StepDateTime
                    date={date}
                    time={time}
                    onDateChange={setDate}
                    onTimeChange={setTime}
                  />
                )}
                {step === 3 && (
                  <StepPatientInfo
                    info={patientInfo}
                    onChange={handlePatientField}
                  />
                )}
                {step === 4 && (
                  <StepConfirm
                    serviceId={serviceId}
                    doctorId={doctorId}
                    date={date}
                    time={time}
                    info={patientInfo}
                    onConfirm={() => setConfirmed(true)}
                  />
                )}

                {/* Navigation — only shown for steps 0–3; step 4 has its own confirm button */}
                {step < STEPS.length - 1 && (
                  <div className="mt-8 flex items-center justify-between border-t border-[#f3f4f6] pt-6">
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={handleBack}
                      disabled={step === 0}
                      className="gap-1.5"
                    >
                      <ChevronLeft className="size-4" />
                      Back
                    </Button>
                    <Button
                      size="lg"
                      onClick={handleNext}
                      disabled={!canProceed}
                      className="gap-1.5"
                    >
                      Next
                      <ChevronRight className="size-4" />
                    </Button>
                  </div>
                )}

                {/* Back button on confirm step */}
                {step === STEPS.length - 1 && (
                  <div className="mt-6 pt-4 border-t border-[#f3f4f6]">
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={handleBack}
                      className="gap-1.5"
                    >
                      <ChevronLeft className="size-4" />
                      Back
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
