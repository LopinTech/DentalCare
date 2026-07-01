"use client";

import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Calendar, CheckCircle2, Clock, PhoneCall, Plus, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const STATS = [
  { label: "Total Appointments", value: "24", icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Waiting Queue", value: "7", icon: Users, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Completed", value: "11", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
  { label: "Pending", value: "6", icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
];

type QueueStatus = "pending" | "confirmed" | "completed";

const QUEUE: {
  serial: number;
  patient: string;
  time: string;
  doctor: string;
  service: string;
  status: QueueStatus;
}[] = [
  { serial: 1, patient: "Rahima Begum", time: "09:00", doctor: "Dr. Ahmed", service: "Scaling", status: "completed" },
  { serial: 2, patient: "Karim Uddin", time: "09:30", doctor: "Dr. Ahmed", service: "Filling", status: "completed" },
  { serial: 3, patient: "Farida Khanam", time: "10:00", doctor: "Dr. Rina", service: "Extraction", status: "confirmed" },
  { serial: 4, patient: "Jabir Hossain", time: "10:30", doctor: "Dr. Ahmed", service: "RCT", status: "confirmed" },
  { serial: 5, patient: "Nasreen Akter", time: "11:00", doctor: "Dr. Rina", service: "Consultancy", status: "pending" },
  { serial: 6, patient: "Tariq Islam", time: "11:30", doctor: "Dr. Ahmed", service: "Bleaching", status: "pending" },
  { serial: 7, patient: "Sabrina Sultana", time: "12:00", doctor: "Dr. Rina", service: "Composite Filling", status: "pending" },
];

const STATUS_BADGE: Record<QueueStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-orange-100 text-orange-700 border-orange-200" },
  confirmed: { label: "Confirmed", className: "bg-blue-100 text-blue-700 border-blue-200" },
  completed: { label: "Completed", className: "bg-green-100 text-green-700 border-green-200" },
};

export default function ReceptionistPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Today&apos;s Overview</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <Button>
          <Plus className="size-4" />
          Add to Queue
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-3 p-4">
                <div className={cn("flex size-10 items-center justify-center rounded-xl shrink-0", stat.bg)}>
                  <Icon className={cn("size-5", stat.color)} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Queue Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Today&apos;s Appointment Queue</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Serial #</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Patient Name</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Time</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Doctor</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Service</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Status</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {QUEUE.map((row) => {
                  const badge = STATUS_BADGE[row.status];
                  return (
                    <tr key={row.serial} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                          {row.serial}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground">{row.patient}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.time}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.doctor}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.service}</td>
                      <td className="px-4 py-3">
                        <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", badge.className)}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          {row.status !== "completed" && (
                            <>
                              <Button size="sm" variant="outline" className="h-7 px-2 text-xs gap-1">
                                <PhoneCall className="size-3" />
                                Call
                              </Button>
                              <Button size="sm" variant="outline" className="h-7 px-2 text-xs gap-1 text-green-700 border-green-200 hover:bg-green-50">
                                <CheckCircle2 className="size-3" />
                                Done
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
