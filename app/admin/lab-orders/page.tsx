"use client";

import { useState } from "react";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { cn } from "@/lib/utils";
import { FlaskConical } from "lucide-react";

type LabStatus = "pending" | "sent" | "in_progress" | "completed" | "cancelled";

interface LabOrder {
  id: number;
  patient: string;
  labType: string;
  doctor: string;
  status: LabStatus;
  sentAt: string;
  createdAt: string;
}

const LAB_ORDERS: LabOrder[] = [
  { id: 1, patient: "Rahima Begum", labType: "Crown Fabrication", doctor: "Dr. Ahmed", status: "pending", sentAt: "—", createdAt: "2026-07-01" },
  { id: 2, patient: "Karim Uddin", labType: "Partial Denture", doctor: "Dr. Rina", status: "sent", sentAt: "08:30", createdAt: "2026-07-01" },
  { id: 3, patient: "Farida Khanam", labType: "Bridge (3-unit)", doctor: "Dr. Ahmed", status: "in_progress", sentAt: "09:00", createdAt: "2026-06-30" },
  { id: 4, patient: "Jabir Hossain", labType: "Orthodontic Retainer", doctor: "Dr. Rina", status: "completed", sentAt: "07:30", createdAt: "2026-06-29" },
  { id: 5, patient: "Nasreen Akter", labType: "Bleaching Tray", doctor: "Dr. Ahmed", status: "pending", sentAt: "—", createdAt: "2026-07-01" },
  { id: 6, patient: "Tariq Islam", labType: "Full Denture", doctor: "Dr. Rina", status: "in_progress", sentAt: "10:00", createdAt: "2026-06-30" },
  { id: 7, patient: "Sabrina Sultana", labType: "Implant Crown", doctor: "Dr. Ahmed", status: "sent", sentAt: "11:00", createdAt: "2026-06-30" },
  { id: 8, patient: "Mahbub Alam", labType: "Composite Veneer", doctor: "Dr. Rina", status: "completed", sentAt: "06:00", createdAt: "2026-06-28" },
  { id: 9, patient: "Roksana Islam", labType: "Metal Crown", doctor: "Dr. Ahmed", status: "cancelled", sentAt: "—", createdAt: "2026-06-27" },
];

const STATUS_FILTERS: { label: string; value: string }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Sent", value: "sent" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

const STATUS_BADGE: Record<LabStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-orange-100 text-orange-700 border-orange-200" },
  sent: { label: "Sent", className: "bg-blue-100 text-blue-700 border-blue-200" },
  in_progress: { label: "In Progress", className: "bg-purple-100 text-purple-700 border-purple-200" },
  completed: { label: "Completed", className: "bg-green-100 text-green-700 border-green-200" },
  cancelled: { label: "Cancelled", className: "bg-red-100 text-red-700 border-red-200" },
};

export default function LabOrdersPage() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all"
    ? LAB_ORDERS
    : LAB_ORDERS.filter((o) => o.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Lab Orders</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Track all lab orders across patients and doctors</p>
        </div>
        <Button>
          <FlaskConical className="size-4" />
          New Lab Order
        </Button>
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "rounded-full border px-3.5 py-1 text-xs font-medium transition-colors",
              filter === f.value
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground bg-white"
            )}
          >
            {f.label}
            <span className={cn(
              "ml-1.5 rounded-full px-1.5 py-0.5 text-[10px]",
              filter === f.value ? "bg-white/20" : "bg-muted"
            )}>
              {f.value === "all" ? LAB_ORDERS.length : LAB_ORDERS.filter((o) => o.status === f.value).length}
            </span>
          </button>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <FlaskConical className="size-4" />
            Lab Orders
            <span className="ml-auto text-xs font-normal text-muted-foreground">{filtered.length} records</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">#</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Patient</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Lab Type</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Doctor</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Status</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Sent At</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Created</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => {
                  const badge = STATUS_BADGE[order.status];
                  return (
                    <tr key={order.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 text-muted-foreground text-xs">{order.id}</td>
                      <td className="px-4 py-3 font-medium text-foreground">{order.patient}</td>
                      <td className="px-4 py-3 text-muted-foreground">{order.labType}</td>
                      <td className="px-4 py-3 text-muted-foreground">{order.doctor}</td>
                      <td className="px-4 py-3">
                        <span className={cn(
                          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                          badge.className
                        )}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{order.sentAt}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{order.createdAt}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <Button size="sm" variant="outline" className="h-7 px-2 text-xs">View</Button>
                          {order.status !== "completed" && order.status !== "cancelled" && (
                            <Button size="sm" variant="outline" className="h-7 px-2 text-xs">Update</Button>
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
