"use client";

import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { CheckCircle2, Clock, Package, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

const STATS = [
  { label: "Pending Orders", value: "4", icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
  { label: "Delivered", value: "12", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
  { label: "Total Orders", value: "18", icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
];

type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

interface SupplierOrder {
  id: string;
  date: string;
  items: number;
  amount: number;
  status: OrderStatus;
  category: string;
}

const ORDERS: SupplierOrder[] = [
  { id: "ORD-001", date: "2026-06-28", items: 5, amount: 45000, status: "pending", category: "Dental Materials" },
  { id: "ORD-002", date: "2026-06-25", items: 3, amount: 18500, status: "confirmed", category: "Dental Instruments" },
  { id: "ORD-003", date: "2026-06-20", items: 8, amount: 72000, status: "shipped", category: "Equipment & Machinery" },
  { id: "ORD-004", date: "2026-06-15", items: 12, amount: 31000, status: "delivered", category: "Disposables" },
  { id: "ORD-005", date: "2026-06-10", items: 4, amount: 22000, status: "delivered", category: "Anesthetics" },
  { id: "ORD-006", date: "2026-06-05", items: 6, amount: 55000, status: "delivered", category: "Orthodontic Supplies" },
];

const STATUS_BADGE: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-orange-100 text-orange-700 border-orange-200" },
  confirmed: { label: "Confirmed", className: "bg-blue-100 text-blue-700 border-blue-200" },
  shipped: { label: "Shipped", className: "bg-purple-100 text-purple-700 border-purple-200" },
  delivered: { label: "Delivered", className: "bg-green-100 text-green-700 border-green-200" },
  cancelled: { label: "Cancelled", className: "bg-red-100 text-red-700 border-red-200" },
};

export default function SupplierPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Supplier Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage orders from Julbang DentalCare
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

      {/* Orders Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Truck className="size-4" />
              Clinic Orders
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Order #</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Date</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Category</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Items</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Amount</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Status</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ORDERS.map((order) => {
                  const badge = STATUS_BADGE[order.status];
                  return (
                    <tr key={order.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-foreground">{order.id}</td>
                      <td className="px-4 py-3 text-muted-foreground">{order.date}</td>
                      <td className="px-4 py-3 text-muted-foreground">{order.category}</td>
                      <td className="px-4 py-3 text-muted-foreground">{order.items} items</td>
                      <td className="px-4 py-3 font-medium text-foreground">৳{order.amount.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", badge.className)}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                            View
                          </Button>
                          {(order.status === "pending" || order.status === "confirmed") && (
                            <Button size="sm" variant="outline" className="h-7 px-2 text-xs gap-1 text-blue-700 border-blue-200 hover:bg-blue-50">
                              <Truck className="size-3" />
                              Mark Shipped
                            </Button>
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
