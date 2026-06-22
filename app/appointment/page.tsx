"use client";

import { useState } from "react";
import { Navbar } from "@/public/navbar";
import { Footer } from "@/public/footer";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Card, CardContent } from "@/ui/card";
import {
  Stethoscope, Calendar, User, CheckCircle, ChevronRight, ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SERVICES = [
  "General Checkup", "Teeth Cleaning", "Tooth Extraction", "Root Canal",
  "Dental Implants", "Teeth Whitening",
];

const DOCTORS = [
  { name: "Dr. Karim Ahmed",   specialization: "General Dentistry" },
  { name: "Dr. Sultana Islam", specialization: "Orthodontics" },
  { name: "Dr. Rafiq Khan",    specialization: "Oral Surgery" },
];

const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM",
];

const STEPS = [
  { title: "Service",    icon: Stethoscope },
  { title: "Doctor",     icon: User },
  { title: "Date & Time",icon: Calendar },
  { title: "Your Info",  icon: User },
  { title: "Confirm",    icon: CheckCircle },
];

export default function AppointmentPage() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function canNext() {
    if (step === 0) return !!service;
    if (step === 1) return !!doctor;
    if (step === 2) return !!date && !!time;
    if (step === 3) return !!name && !!phone;
    return true;
  }

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-secondary flex items-center justify-center p-6">
          <Card className="max-w-md w-full">
            <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="size-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold">Booking Confirmed!</h2>
              <p className="text-sm text-muted-foreground">
                Your appointment for <strong>{service}</strong> with <strong>{doctor}</strong> on{" "}
                <strong>{date}</strong> at <strong>{time}</strong> has been submitted.
                We&apos;ll confirm via phone or email shortly.
              </p>
              <Button onClick={() => { setStep(0); setSubmitted(false); setService(""); setDoctor(""); setDate(""); setTime(""); }}>
                Book Another
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-secondary py-12">
        <div className="container max-w-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground">Book an Appointment</h1>
            <p className="mt-2 text-muted-foreground">Schedule your dental visit in a few easy steps</p>
          </div>

          {/* Step indicator */}
          <div className="mb-8 flex items-center justify-center gap-2">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={cn(
                  "flex size-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                  i < step  ? "bg-primary text-white" :
                  i === step ? "bg-primary/20 text-primary ring-2 ring-primary" :
                               "bg-secondary text-muted-foreground"
                )}>
                  {i < step ? <CheckCircle className="size-4" /> : i + 1}
                </div>
                {i < STEPS.length - 1 && (
                  <div className={cn("h-0.5 w-8 sm:w-12", i < step ? "bg-primary" : "bg-border")} />
                )}
              </div>
            ))}
          </div>

          <Card>
            <CardContent className="p-6">

              {/* Step 0: Service */}
              {step === 0 && (
                <div className="flex flex-col gap-4">
                  <h2 className="font-semibold text-lg">Select a Service</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {SERVICES.map((s) => (
                      <button
                        key={s}
                        onClick={() => setService(s)}
                        className={cn(
                          "rounded-lg border p-4 text-left text-sm font-medium transition-colors hover:border-primary",
                          service === s ? "border-primary bg-primary/5 text-primary" : "border-border"
                        )}
                      >
                        <Stethoscope className="mb-2 size-5" />
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 1: Doctor */}
              {step === 1 && (
                <div className="flex flex-col gap-4">
                  <h2 className="font-semibold text-lg">Choose a Doctor</h2>
                  <div className="flex flex-col gap-3">
                    {DOCTORS.map((d) => (
                      <button
                        key={d.name}
                        onClick={() => setDoctor(d.name)}
                        className={cn(
                          "flex items-center gap-4 rounded-lg border p-4 text-left transition-colors hover:border-primary",
                          doctor === d.name ? "border-primary bg-primary/5" : "border-border"
                        )}
                      >
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                          {d.name.split(" ")[1]?.[0]}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{d.name}</p>
                          <p className="text-sm text-muted-foreground">{d.specialization}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Date & Time */}
              {step === 2 && (
                <div className="flex flex-col gap-5">
                  <h2 className="font-semibold text-lg">Select Date & Time</h2>
                  <Input
                    label="Preferred Date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <div>
                    <p className="mb-3 text-sm font-medium">Available Slots</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setTime(slot)}
                          className={cn(
                            "rounded-md border px-3 py-2 text-xs font-medium transition-colors hover:border-primary",
                            time === slot ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground"
                          )}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Patient info */}
              {step === 3 && (
                <div className="flex flex-col gap-4">
                  <h2 className="font-semibold text-lg">Your Information</h2>
                  <Input label="Full Name *" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
                  <Input label="Phone *" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+880..." />
                  <Input label="Email (optional)" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium">Symptoms / Notes (optional)</label>
                    <textarea
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      rows={3}
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="Describe your symptoms..."
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Confirm */}
              {step === 4 && (
                <div className="flex flex-col gap-4">
                  <h2 className="font-semibold text-lg">Confirm Booking</h2>
                  <div className="rounded-lg border border-border divide-y divide-border text-sm">
                    {[
                      { label: "Service",  value: service },
                      { label: "Doctor",   value: doctor },
                      { label: "Date",     value: date },
                      { label: "Time",     value: time },
                      { label: "Name",     value: name },
                      { label: "Phone",    value: phone },
                      ...(email    ? [{ label: "Email",    value: email }]    : []),
                      ...(symptoms ? [{ label: "Symptoms", value: symptoms }] : []),
                    ].map(({ label, value }) => (
                      <div key={label} className="flex gap-3 px-4 py-3">
                        <span className="w-24 shrink-0 font-medium text-muted-foreground">{label}</span>
                        <span className="text-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="mt-6 flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setStep((s) => s - 1)}
                  disabled={step === 0}
                >
                  <ChevronLeft className="size-4" />
                  Back
                </Button>
                {step < 4 ? (
                  <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext()}>
                    Next
                    <ChevronRight className="size-4" />
                  </Button>
                ) : (
                  <Button onClick={() => setSubmitted(true)}>
                    <CheckCircle className="size-4" />
                    Confirm Booking
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
