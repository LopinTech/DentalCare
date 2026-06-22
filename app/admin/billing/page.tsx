import Link from "next/link";
import {
  CreditCard,
  Plus,
  Eye,
  TrendingUp,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type InvoiceStatus = "draft" | "sent" | "paid" | "partial" | "overdue";

interface Invoice {
  id: string;
  patient: string;
  doctor: string;
  amount: number;
  paid: number;
  status: InvoiceStatus;
  dueDate: string;
}

interface StatCard {
  label: string;
  value: string;
  subtext: string;
  icon: React.ElementType;
  /** 0–1 fill ratio used for the progress-fill aesthetic */
  fillRatio: number;
  fillColor: string;
}

// ─── Placeholder data ─────────────────────────────────────────────────────────

const STATS: StatCard[] = [
  {
    label: "Total Revenue",
    value: "৳1,45,200",
    subtext: "All time collected",
    icon: TrendingUp,
    fillRatio: 1,
    fillColor: "#16a34a",
  },
  {
    label: "Pending",
    value: "৳12,400",
    subtext: "Awaiting payment",
    icon: CreditCard,
    fillRatio: 0.085,
    fillColor: "oklch(0.48 0.24 220)",
  },
  {
    label: "Paid This Month",
    value: "৳38,600",
    subtext: "June 2026",
    icon: TrendingUp,
    fillRatio: 0.266,
    fillColor: "#16a34a",
  },
  {
    label: "Overdue",
    value: "৳3,200",
    subtext: "Past due date",
    icon: CreditCard,
    fillRatio: 0.022,
    fillColor: "oklch(0.5 0.26 25)",
  },
];

const INVOICES: Invoice[] = [
  {
    id: "INV-2024",
    patient: "Rahima Begum",
    doctor: "Dr. Karim",
    amount: 8500,
    paid: 8500,
    status: "paid",
    dueDate: "10 Jun 2026",
  },
  {
    id: "INV-2025",
    patient: "Arif Hossain",
    doctor: "Dr. Sultana",
    amount: 12000,
    paid: 6000,
    status: "partial",
    dueDate: "18 Jun 2026",
  },
  {
    id: "INV-2026",
    patient: "Nusrat Jahan",
    doctor: "Dr. Karim",
    amount: 4800,
    paid: 0,
    status: "sent",
    dueDate: "25 Jun 2026",
  },
  {
    id: "INV-2027",
    patient: "Md. Rakib Ali",
    doctor: "Dr. Islam",
    amount: 3200,
    paid: 0,
    status: "overdue",
    dueDate: "05 Jun 2026",
  },
  {
    id: "INV-2028",
    patient: "Sabrina Akter",
    doctor: "Dr. Sultana",
    amount: 6500,
    paid: 0,
    status: "draft",
    dueDate: "30 Jun 2026",
  },
];

const FILTER_TABS: { label: string; value: string }[] = [
  { label: "All", value: "all" },
  { label: "Draft", value: "draft" },
  { label: "Sent", value: "sent" },
  { label: "Paid", value: "paid" },
  { label: "Partial", value: "partial" },
  { label: "Overdue", value: "overdue" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatBDT(amount: number): string {
  return "৳" + amount.toLocaleString("en-BD");
}

function statusBadge(status: InvoiceStatus) {
  const map: Record<
    InvoiceStatus,
    {
      label: string;
      variant:
        | "secondary"
        | "info"
        | "success"
        | "warning"
        | "destructive";
    }
  > = {
    draft:   { label: "Draft",   variant: "secondary"   },
    sent:    { label: "Sent",    variant: "info"        },
    paid:    { label: "Paid",    variant: "success"     },
    partial: { label: "Partial", variant: "warning"     },
    overdue: { label: "Overdue", variant: "destructive" },
  };
  const { label, variant } = map[status];
  return <Badge variant={variant}>{label}</Badge>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminBillingPage() {
  return (
    <div className="flex flex-col gap-6">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#16a34a]">
            Management
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Billing
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Manage invoices and payments
          </p>
        </div>
        <Link href="/admin/billing/new">
          <Button variant="default" className="mt-3 sm:mt-0">
            <Plus />
            New Invoice
          </Button>
        </Link>
      </div>

      {/* ── Stats cards ────────────────────────────────────────────────────── */}
      {/*
        Aesthetic risk: each card carries a bottom-anchored fill bar whose
        height is proportional to that metric's share of total revenue.
        The fill is a ghost tint of the accent — data encoded in geometry,
        not just in the number. At a glance the reader sees "Overdue is tiny,
        Paid This Month is a meaningful slice." This replaces the generic
        trend-arrow pattern used on the dashboard overview.
      */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="relative overflow-hidden border-border"
            >
              {/* Left accent bar */}
              <div
                className="absolute inset-y-0 left-0 w-1 rounded-l-xl"
                style={{ background: stat.fillColor }}
                aria-hidden="true"
              />
              {/* Bottom proportional fill — the aesthetic risk */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-xl transition-all"
                style={{
                  height: `${Math.max(stat.fillRatio * 100, 4)}%`,
                  background: `color-mix(in oklch, ${stat.fillColor} 8%, transparent)`,
                }}
                aria-hidden="true"
              />
              <CardHeader className="relative pl-7 pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <span
                    className="flex items-center justify-center rounded-md p-1.5"
                    style={{ background: "#dcfce7" }}
                  >
                    <Icon className="size-4 shrink-0" style={{ color: "#16a34a" }} />
                  </span>
                </div>
              </CardHeader>
              <CardContent className="relative pl-7 pb-5">
                <p className="text-3xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.subtext}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ── Filter tabs + Invoice table ─────────────────────────────────────── */}
      <Card>
        {/* Filter tabs */}
        <CardHeader className="pb-0">
          <div className="flex flex-wrap gap-1">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.value}
                className={
                  tab.value === "all"
                    ? "rounded-md bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors"
                    : "rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                }
              >
                {tab.label}
              </button>
            ))}
          </div>
        </CardHeader>

        {/* Table */}
        <CardContent className="p-0 mt-3">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-5 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Invoice #
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Patient
                  </th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">
                    Doctor
                  </th>
                  <th className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Amount
                  </th>
                  <th className="hidden px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:table-cell">
                    Paid
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                  <th className="hidden px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:table-cell">
                    Due Date
                  </th>
                  <th className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {INVOICES.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    <td className="px-5 py-3">
                      <span className="font-mono text-xs font-semibold text-foreground">
                        {invoice.id}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">
                      {invoice.patient}
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                      {invoice.doctor}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-xs font-semibold text-foreground">
                      {formatBDT(invoice.amount)}
                    </td>
                    <td className="hidden px-4 py-3 text-right font-mono text-xs text-muted-foreground lg:table-cell">
                      {formatBDT(invoice.paid)}
                    </td>
                    <td className="px-4 py-3">
                      {statusBadge(invoice.status)}
                    </td>
                    <td className="hidden px-4 py-3 text-xs text-muted-foreground sm:table-cell">
                      {invoice.dueDate}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/admin/billing/${invoice.id}`}>
                        <Button variant="ghost" size="icon-sm">
                          <Eye />
                          <span className="sr-only">View invoice {invoice.id}</span>
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
