"use client";

import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { CheckCircle2, Clock, FlaskConical, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select } from "@/ui/select";
import { useState } from "react";

const STATS = [
  { label: "Pending", value: "5", icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
  { label: "In Progress", value: "3", icon: Loader2, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Completed Today", value: "8", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
];

type LabStatus = "pending" | "sent" | "in_progress" | "completed" | "cancelled";

interface LabOrder {
  id: number;
  patient: string;
  labType: string;
  doctor: string;
  status: LabStatus;
  sentAt: string;
}

const LAB_ORDERS: LabOrder[] = [
  { id: 1, patient: "Rahima Begum", labType: "Crown Fabrication", doctor: "Dr. Ahmed", status: "pending", sentAt: "—" },
  { id: 2, patient: "Karim Uddin", labType: "Partial Denture", doctor: "Dr. Rina", status: "sent", sentAt: "08:30" },
  { id: 3, patient: "Farida Khanam", labType: "Bridge (3-unit)", doctor: "Dr. Ahmed", status: "in_progress", sentAt: "09:00" },
  { id: 4, patient: "Jabir Hossain", labType: "Orthodontic Retainer", doctor: "Dr. Rina", status: "completed", sentAt: "07:30" },
  { id: 5, patient: "Nasreen Akter", labType: "Bleaching Tray", doctor: "Dr. Ahmed", status: "pending", sentAt: "—" },
  { id: 6, patient: "Tariq Islam", labType: "Full Denture", doctor: "Dr. Rina", status: "in_progress", sentAt: "10:00" },
  { id: 7, patient: "Sabrina Sultana", labType: "Implant Crown", doctor: "Dr. Ahmed", status: "sent", sentAt: "11:00" },
  { id: 8, patient: "Mahbub Alam", labType: "Composite Veneer", doctor: "Dr. Rina", status: "completed", sentAt: "06:00" },
];

const STATUS_BADGE: Record<LabStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-orange-100 text-orange-700 border-orange-200" },
  sent: { label: "Sent", className: "bg-blue-100 text-blue-700 border-blue-200" },
  in_progress: { label: "In Progress", className: "bg-purple-100 text-purple-700 border-purple-200" },
  completed: { label: "Completed", className: "bg-green-100 text-green-700 border-green-200" },
  cancelled: { label: "Cancelled", className: "bg-red-100 text-red-700 border-red-200" },
};

const STATUS_OPTIONS: { label: string; value: LabStatus }[] = [
  { label: "Pending", value: "pending" },
  { label: "Sent", value: "sent" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export default function LabPage() {
  const [statuses, setStatuses] = useState<Record<number, LabStatus>>(
    Object.fromEntries(LAB_ORDERS.map((o) => [o.id, o.status]))
  );
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filtered = filterStatus === "all"
    ? LAB_ORDERS
    : LAB_ORDERS.filter((o) => (statuses[o.id] ?? o.status) === filterStatus);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Lab Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
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

      {/* Lab Orders Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <FlaskConical className="size-4" />
              Lab Orders
            </CardTitle>
            <div className="w-40">
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                options={[
                  { label: "All Status", value: "all" },
                  ...STATUS_OPTIONS,
                ]}
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
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Lab Type</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Doctor</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Status</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Sent At</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Update Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => {
                  const currentStatus = statuses[order.id] ?? order.status;
                  const badge = STATUS_BADGE[currentStatus];
                  return (
                    <tr key={order.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-foreground">{order.patient}</td>
                      <td className="px-4 py-3 text-muted-foreground">{order.labType}</td>
                      <td className="px-4 py-3 text-muted-foreground">{order.doctor}</td>
                      <td className="px-4 py-3">
                        <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", badge.className)}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{order.sentAt}</td>
                      <td className="px-4 py-3">
                        <div className="w-36">
                          <Select
                            value={currentStatus}
                            onChange={(e) => setStatuses((prev) => ({ ...prev, [order.id]: e.target.value as LabStatus }))}
                            options={STATUS_OPTIONS}
                          />
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
