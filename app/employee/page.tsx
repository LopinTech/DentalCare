"use client";

import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Select } from "@/ui/select";
import { Calendar, CreditCard, Info, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

type ApptStatus = "pending" | "confirmed" | "completed";

interface Appointment {
  id: number;
  patient: string;
  time: string;
  doctor: string;
  service: string;
  status: ApptStatus;
  paid: boolean;
  amount: number;
}

const APPOINTMENTS: Appointment[] = [
  { id: 1, patient: "Rahima Begum", time: "09:00", doctor: "Dr. Ahmed", service: "Scaling", status: "completed", paid: true, amount: 1500 },
  { id: 2, patient: "Karim Uddin", time: "09:30", doctor: "Dr. Ahmed", service: "Filling", status: "completed", paid: false, amount: 800 },
  { id: 3, patient: "Farida Khanam", time: "10:00", doctor: "Dr. Rina", service: "Extraction", status: "confirmed", paid: false, amount: 500 },
  { id: 4, patient: "Jabir Hossain", time: "10:30", doctor: "Dr. Ahmed", service: "RCT", status: "confirmed", paid: false, amount: 7000 },
  { id: 5, patient: "Nasreen Akter", time: "11:00", doctor: "Dr. Rina", service: "Consultancy", status: "pending", paid: false, amount: 500 },
  { id: 6, patient: "Tariq Islam", time: "11:30", doctor: "Dr. Ahmed", service: "Bleaching", status: "pending", paid: false, amount: 8000 },
];

const DOCTORS = ["All Doctors", "Dr. Ahmed", "Dr. Rina"];

const STATUS_BADGE: Record<ApptStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-orange-100 text-orange-700 border-orange-200" },
  confirmed: { label: "Confirmed", className: "bg-blue-100 text-blue-700 border-blue-200" },
  completed: { label: "Completed", className: "bg-green-100 text-green-700 border-green-200" },
};

export default function EmployeePage() {
  const [filterDoctor, setFilterDoctor] = useState("All Doctors");
  const [changingDoctorId, setChangingDoctorId] = useState<number | null>(null);
  const [newDoctor, setNewDoctor] = useState<Record<number, string>>({});

  const filtered = filterDoctor === "All Doctors"
    ? APPOINTMENTS
    : APPOINTMENTS.filter((a) => a.doctor === filterDoctor);

  const unpaid = APPOINTMENTS.filter((a) => !a.paid && a.status === "completed");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Employee Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Today's Appointments */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="size-4" />
              Today&apos;s Appointments
            </CardTitle>
            <div className="w-40">
              <Select
                value={filterDoctor}
                onChange={(e) => setFilterDoctor(e.target.value)}
                options={DOCTORS.map((d) => ({ label: d, value: d }))}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Patient</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Time</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Doctor</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Service</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Status</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((appt) => {
                  const badge = STATUS_BADGE[appt.status];
                  const isChanging = changingDoctorId === appt.id;
                  return (
                    <tr key={appt.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-foreground">{appt.patient}</td>
                      <td className="px-4 py-3 text-muted-foreground">{appt.time}</td>
                      <td className="px-4 py-3">
                        {isChanging ? (
                          <div className="flex items-center gap-1.5">
                            <div className="w-32">
                              <Select
                                value={newDoctor[appt.id] ?? appt.doctor}
                                onChange={(e) => setNewDoctor((prev) => ({ ...prev, [appt.id]: e.target.value }))}
                                options={["Dr. Ahmed", "Dr. Rina", "Dr. Hasan"].map((d) => ({ label: d, value: d }))}
                              />
                            </div>
                            <Button size="sm" className="h-7 px-2 text-xs" onClick={() => setChangingDoctorId(null)}>Save</Button>
                            <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={() => setChangingDoctorId(null)}>Cancel</Button>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">{newDoctor[appt.id] ?? appt.doctor}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{appt.service}</td>
                      <td className="px-4 py-3">
                        <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", badge.className)}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {!isChanging && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 px-2 text-xs gap-1"
                            onClick={() => setChangingDoctorId(appt.id)}
                          >
                            <RefreshCw className="size-3" />
                            Change Doctor
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Payments */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <CreditCard className="size-4" />
            Pending Payments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5">
            <Info className="size-4 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-700">
              Payment collection requires admin approval. Use the &quot;Collect Payment&quot; button to request approval.
            </p>
          </div>
          {unpaid.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">No pending payments</p>
          ) : (
            <div className="space-y-2">
              {unpaid.map((appt) => (
                <div key={appt.id} className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{appt.patient}</p>
                    <p className="text-xs text-muted-foreground">{appt.service} — {appt.doctor}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-foreground">৳{appt.amount.toLocaleString()}</span>
                    <Button size="sm" variant="outline" className="gap-1 text-xs">
                      <CreditCard className="size-3" />
                      Collect Payment
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
