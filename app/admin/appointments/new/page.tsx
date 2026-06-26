"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import { Input } from "@/ui/input";
import { Select } from "@/ui/select";
import { Textarea } from "@/ui/textarea";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

const TIME_SLOTS = [
  "09:00", "09:30",
  "10:00", "10:30",
  "11:00", "11:30",
  "12:00", "12:30",
  "13:00", "13:30",
  "14:00", "14:30",
  "15:00", "15:30",
  "16:00", "16:30",
  "17:00",
];

export default function NewAppointmentPage() {
  const router = useRouter();

  const [patientType, setPatientType] = useState<"guest" | "registered">("guest");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [doctor, setDoctor] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [notes, setNotes] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire up to API
    router.push("/admin/appointments");
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/appointments"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-primary" />
        <h1 className="text-2xl font-semibold">New Appointment</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Patient Type */}
            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="patientType">
                Patient
              </label>
              <Select
                id="patientType"
                value={patientType}
                onChange={(e) =>
                  setPatientType(e.target.value as "guest" | "registered")
                }
              >
                <option value="guest">Guest</option>
                <option value="registered">Registered Patient</option>
              </Select>
            </div>

            {/* Guest fields */}
            {patientType === "guest" && (
              <div className="space-y-4 pl-0">
                <div className="space-y-1">
                  <label className="text-sm font-medium" htmlFor="guestName">
                    Name
                  </label>
                  <Input
                    id="guestName"
                    type="text"
                    placeholder="Full name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium" htmlFor="guestPhone">
                    Phone
                  </label>
                  <Input
                    id="guestPhone"
                    type="tel"
                    placeholder="Phone number"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium" htmlFor="guestEmail">
                    Email
                  </label>
                  <Input
                    id="guestEmail"
                    type="email"
                    placeholder="Email address"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Doctor */}
            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="doctor">
                Doctor
              </label>
              <Select
                id="doctor"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
              >
                <option value="" disabled>
                  Select doctor
                </option>
                {/* TODO: populate from API */}
              </Select>
            </div>

            {/* Service */}
            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="service">
                Service
              </label>
              <Select
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                <option value="" disabled>
                  Select service
                </option>
                {/* TODO: populate from API */}
              </Select>
            </div>

            {/* Date */}
            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="date">
                Date
              </label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* Time Slot */}
            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="timeSlot">
                Time Slot
              </label>
              <Select
                id="timeSlot"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
              >
                <option value="" disabled>
                  Select time slot
                </option>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </Select>
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="notes">
                Notes
              </label>
              <Textarea
                id="notes"
                placeholder="Additional notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-25 resize-y"
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <Button type="submit" className="w-full">
                Book Appointment
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
