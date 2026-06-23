import Link from "next/link";
import { ArrowLeft, Printer, Pencil, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type InvoiceStatus = "draft" | "sent" | "paid" | "partial" | "overdue";

interface LineItem {
  id: string;
  description: string;
  qty: number;
  unitPrice: number;
}

interface Payment {
  id: string;
  date: string;
  amount: number;
  method: string;
}

// ─── Placeholder data (replace with DB query using invoiceId) ─────────────────

const INVOICE = {
  number: "INV-001",
  date: "10 Jun 2026",
  dueDate: "25 Jun 2026",
  status: "partial" as InvoiceStatus,
  discount: 500,
  taxRate: 0.05,
};

const PATIENT = {
  name: "Rahima Begum",
  phone: "+880 1712-345678",
  email: "rahima.begum@example.com",
};

const LINE_ITEMS: LineItem[] = [
  {
    id: "li-1",
    description: "Root Canal Treatment — Lower Molar",
    qty: 1,
    unitPrice: 8000,
  },
  {
    id: "li-2",
    description: "X-Ray (Periapical)",
    qty: 2,
    unitPrice: 350,
  },
  {
    id: "li-3",
    description: "Post-Procedure Medication Pack",
    qty: 1,
    unitPrice: 850,
  },
];

const PAYMENTS: Payment[] = [
  {
    id: "pay-1",
    date: "10 Jun 2026",
    amount: 5000,
    method: "bKash",
  },
  {
    id: "pay-2",
    date: "17 Jun 2026",
    amount: 2000,
    method: "Cash",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatBDT(amount: number): string {
  return "৳" + amount.toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function statusBadge(status: InvoiceStatus) {
  const map: Record<
    InvoiceStatus,
    {
      label: string;
      variant: "secondary" | "info" | "success" | "warning" | "destructive";
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

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const { invoiceId } = await params;

  // TODO: fetch real invoice by invoiceId from DB
  void invoiceId;

  const subtotal = LINE_ITEMS.reduce(
    (sum, item) => sum + item.qty * item.unitPrice,
    0
  );
  const discountAmount = INVOICE.discount;
  const taxBase = subtotal - discountAmount;
  const taxAmount = taxBase * INVOICE.taxRate;
  const total = taxBase + taxAmount;
  const totalPaid = PAYMENTS.reduce((sum, p) => sum + p.amount, 0);
  const balanceDue = total - totalPaid;

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">

      {/* ── Back button + Page header ────────────────────────────────────────── */}
      <div>
        <Link href="/admin/billing">
          <Button variant="ghost" size="sm" className="text-muted-foreground -ml-1.5 mb-3">
            <ArrowLeft />
            Back to Billing
          </Button>
        </Link>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#16a34a]">
              Billing
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Invoice #{INVOICE.number}
            </h1>
          </div>
          <div className="flex items-center gap-2 sm:shrink-0">
            <Button variant="outline" size="sm">
              <Printer />
              Print
            </Button>
            <Link href={`/admin/billing/${invoiceId}/edit`}>
              <Button variant="outline" size="sm">
                <Pencil />
                Edit
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Two-column layout ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">

        {/* ── LEFT: Invoice items ───────────────────────────────────────────── */}
        {/*
          Aesthetic risk: the line-items card uses a deliberate document-paper
          aesthetic — a narrow top rule in the brand green, a slightly warmer
          background tint, and a ruled divider system that reads like a printed
          invoice form rather than a generic data table. This gives the detail
          view a tactile, physical-document character that is unique to this page
          and distinct from every other card in the app while still using the
          same Card shell and token system.
        */}
        <div>
          <Card className="relative overflow-hidden border-border">
            {/* Document-edge rule: a full-width brand-green top stripe */}
            <div
              className="h-1 w-full rounded-t-xl"
              style={{ background: "#16a34a" }}
              aria-hidden="true"
            />

            <CardHeader className="pb-0 pt-5">
              <CardTitle className="text-sm font-semibold text-foreground">
                Services & Charges
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0 mt-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr
                      className="border-y border-border"
                      style={{ background: "color-mix(in oklch, #16a34a 5%, white)" }}
                    >
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Description
                      </th>
                      <th className="w-16 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Qty
                      </th>
                      <th className="w-32 px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Unit Price
                      </th>
                      <th className="w-32 px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {LINE_ITEMS.map((item) => (
                      <tr key={item.id} className="transition-colors hover:bg-muted/20">
                        <td className="px-6 py-4 text-sm font-medium text-foreground">
                          {item.description}
                        </td>
                        <td className="px-4 py-4 text-center font-mono text-xs text-muted-foreground">
                          {item.qty}
                        </td>
                        <td className="px-4 py-4 text-right font-mono text-xs text-muted-foreground">
                          {formatBDT(item.unitPrice)}
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-xs font-semibold text-foreground">
                          {formatBDT(item.qty * item.unitPrice)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ── Totals block ─────────────────────────────────────────────── */}
              <div
                className="border-t border-border px-6 py-4"
                style={{ background: "color-mix(in oklch, #16a34a 4%, white)" }}
              >
                {/* Subtotal */}
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="font-mono text-sm text-foreground">
                    {formatBDT(subtotal)}
                  </span>
                </div>

                {/* Discount */}
                <div className="flex items-center justify-between py-1.5 border-t border-border/60">
                  <span className="text-sm text-muted-foreground">Discount</span>
                  <span className="font-mono text-sm text-destructive-foreground">
                    − {formatBDT(discountAmount)}
                  </span>
                </div>

                {/* Tax */}
                <div className="flex items-center justify-between py-1.5 border-t border-border/60">
                  <span className="text-sm text-muted-foreground">
                    VAT
                    <span className="ml-1 text-xs text-muted-foreground/70">
                      ({(INVOICE.taxRate * 100).toFixed(0)}%)
                    </span>
                  </span>
                  <span className="font-mono text-sm text-foreground">
                    {formatBDT(taxAmount)}
                  </span>
                </div>

                {/* Grand total */}
                <div className="flex items-center justify-between pt-3 mt-1 border-t-2 border-border">
                  <span className="text-sm font-bold text-foreground">Total</span>
                  <span className="font-mono text-lg font-bold text-[#16a34a]">
                    {formatBDT(total)}
                  </span>
                </div>

                {/* Balance due — only shown when unpaid amount exists */}
                {balanceDue > 0 && (
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-muted-foreground">Balance Due</span>
                    <span className="font-mono text-xs font-semibold text-destructive-foreground">
                      {formatBDT(balanceDue)}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── RIGHT: Patient / Invoice meta / Payments ─────────────────────── */}
        <div className="flex flex-col gap-4">

          {/* Patient info card */}
          <Card className="relative overflow-hidden border-border">
            <div
              className="absolute inset-y-0 left-0 w-1 rounded-l-xl"
              style={{ background: "#16a34a" }}
              aria-hidden="true"
            />
            <CardHeader className="pl-7 pb-3">
              <div className="flex items-center gap-2">
                <span
                  className="flex items-center justify-center rounded-md p-1.5"
                  style={{ background: "#dcfce7" }}
                >
                  <CreditCard className="size-4 shrink-0" style={{ color: "#16a34a" }} />
                </span>
                <CardTitle className="text-sm font-semibold text-foreground">
                  Patient
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pl-7 pb-5 flex flex-col gap-2.5">
              <p className="text-sm font-semibold text-foreground">{PATIENT.name}</p>
              <dl className="flex flex-col gap-1.5">
                <div className="flex flex-col gap-0.5">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Phone
                  </dt>
                  <dd className="font-mono text-xs text-foreground">{PATIENT.phone}</dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Email
                  </dt>
                  <dd className="font-mono text-xs text-foreground break-all">{PATIENT.email}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {/* Invoice info card */}
          <Card className="relative overflow-hidden border-border">
            <div
              className="absolute inset-y-0 left-0 w-1 rounded-l-xl"
              style={{ background: "#16a34a" }}
              aria-hidden="true"
            />
            <CardHeader className="pl-7 pb-3">
              <CardTitle className="text-sm font-semibold text-foreground">
                Invoice Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pl-7 pb-5">
              <dl className="flex flex-col gap-3">
                <div className="flex flex-col gap-0.5">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Invoice #
                  </dt>
                  <dd className="font-mono text-xs font-semibold text-foreground">
                    {INVOICE.number}
                  </dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Date
                  </dt>
                  <dd className="text-sm text-foreground">{INVOICE.date}</dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Due Date
                  </dt>
                  <dd className="text-sm text-foreground">{INVOICE.dueDate}</dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
                  </dt>
                  <dd>{statusBadge(INVOICE.status)}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {/* Payment history card */}
          <Card className="relative overflow-hidden border-border">
            <div
              className="absolute inset-y-0 left-0 w-1 rounded-l-xl"
              style={{ background: "#16a34a" }}
              aria-hidden="true"
            />
            <CardHeader className="pl-7 pb-3">
              <CardTitle className="text-sm font-semibold text-foreground">
                Payment History
              </CardTitle>
            </CardHeader>
            <CardContent className="pl-7 pr-5 pb-5">
              {PAYMENTS.length === 0 ? (
                <p className="text-xs text-muted-foreground">No payments recorded yet.</p>
              ) : (
                <ul className="flex flex-col gap-0 divide-y divide-border">
                  {PAYMENTS.map((payment) => (
                    <li key={payment.id} className="flex items-center justify-between py-2.5">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-medium text-foreground">
                          {payment.method}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground">
                          {payment.date}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-semibold text-[#16a34a]">
                        {formatBDT(payment.amount)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Record Payment button */}
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  <CreditCard />
                  Record Payment
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

    </div>
  );
}
