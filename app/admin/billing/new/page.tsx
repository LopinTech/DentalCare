"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Trash2, FileText } from "lucide-react";
import { Input } from "@/ui/input";
import { Select } from "@/ui/select";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LineItem {
  id: string;
  description: string;
  qty: number;
  unitPrice: number;
}

// ─── Static option lists ──────────────────────────────────────────────────────

const PATIENT_OPTIONS = [
  { label: "Rahima Begum", value: "patient-1" },
  { label: "Arif Hossain", value: "patient-2" },
  { label: "Nusrat Jahan", value: "patient-3" },
  { label: "Md. Rakib Ali", value: "patient-4" },
  { label: "Sabrina Akter", value: "patient-5" },
];

const DOCTOR_OPTIONS = [
  { label: "Dr. Karim", value: "doctor-1" },
  { label: "Dr. Sultana", value: "doctor-2" },
  { label: "Dr. Islam", value: "doctor-3" },
];

const DISCOUNT_TYPE_OPTIONS = [
  { label: "Fixed (৳)", value: "fixed" },
  { label: "Percent (%)", value: "percent" },
];

const TAX_RATE = 0.05; // 5 % VAT

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function formatBDT(amount: number): string {
  return "৳" + amount.toLocaleString("en-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NewInvoicePage() {
  const router = useRouter();

  // Header fields
  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("INV-001");
  const [dueDate, setDueDate] = useState("");

  // Line items
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: uid(), description: "", qty: 1, unitPrice: 0 },
  ]);

  // Discount
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState<"fixed" | "percent">("fixed");

  // Notes
  const [notes, setNotes] = useState("");

  // ── Derived totals ──────────────────────────────────────────────────────────

  const subtotal = lineItems.reduce(
    (sum, item) => sum + item.qty * item.unitPrice,
    0
  );

  const discountAmount =
    discountType === "percent"
      ? (subtotal * Math.min(discount, 100)) / 100
      : Math.min(discount, subtotal);

  const taxBase = subtotal - discountAmount;
  const taxAmount = taxBase * TAX_RATE;
  const total = taxBase + taxAmount;

  // ── Line-item helpers ───────────────────────────────────────────────────────

  function addLineItem() {
    setLineItems((prev) => [
      ...prev,
      { id: uid(), description: "", qty: 1, unitPrice: 0 },
    ]);
  }

  function removeLineItem(id: string) {
    setLineItems((prev) => prev.filter((item) => item.id !== id));
  }

  function updateLineItem(id: string, field: keyof LineItem, value: string | number) {
    setLineItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  }

  // ── Submit ──────────────────────────────────────────────────────────────────

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire up to API
    router.push("/admin/billing");
  }

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">

      {/* ── Back + Header ───────────────────────────────────────────────────── */}
      <div>
        <Link
          href="/admin/billing"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="size-4" />
          Back to Billing
        </Link>

        <div className="flex items-center gap-2.5">
          <span className="flex items-center justify-center size-8 rounded-md bg-primary/10">
            <FileText className="size-4 text-primary" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary leading-none mb-0.5">
              Billing
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-foreground leading-none">
              Create Invoice
            </h1>
          </div>
        </div>
      </div>

      {/* ── Two-column layout: form + sidebar ───────────────────────────────── */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">

          {/* ── LEFT: form ─────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-6">

            {/* Invoice meta */}
            <Card>
              <CardHeader>
                <CardTitle>Invoice Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Select
                  id="patient"
                  label="Patient"
                  placeholder="Select patient"
                  value={patient}
                  onChange={(e) => setPatient(e.target.value)}
                  options={PATIENT_OPTIONS}
                />

                <Select
                  id="doctor"
                  label="Doctor"
                  placeholder="Select doctor"
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  options={DOCTOR_OPTIONS}
                />

                <Input
                  id="invoiceNumber"
                  label="Invoice Number"
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  placeholder="INV-001"
                />

                <Input
                  id="dueDate"
                  label="Due Date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </CardContent>
            </Card>

            {/* Line items */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Line Items</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {/* Table header */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/40">
                        <th className="px-5 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Description
                        </th>
                        <th className="w-20 px-3 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Qty
                        </th>
                        <th className="w-32 px-3 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Unit Price
                        </th>
                        <th className="w-32 px-3 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Total
                        </th>
                        <th className="w-10 px-3 py-2.5" aria-hidden="true" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {lineItems.map((item) => (
                        <tr key={item.id} className="group">
                          {/* Description */}
                          <td className="px-5 py-2.5">
                            <input
                              type="text"
                              placeholder="e.g. Root Canal Treatment"
                              value={item.description}
                              onChange={(e) =>
                                updateLineItem(item.id, "description", e.target.value)
                              }
                              className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                          </td>

                          {/* Qty */}
                          <td className="px-3 py-2.5">
                            <input
                              type="number"
                              min={1}
                              value={item.qty}
                              onChange={(e) =>
                                updateLineItem(item.id, "qty", Math.max(1, Number(e.target.value)))
                              }
                              className="w-full rounded-md border border-input bg-background px-2 py-1.5 text-center text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                          </td>

                          {/* Unit Price */}
                          <td className="px-3 py-2.5">
                            <input
                              type="number"
                              min={0}
                              step="0.01"
                              value={item.unitPrice}
                              onChange={(e) =>
                                updateLineItem(item.id, "unitPrice", Math.max(0, Number(e.target.value)))
                              }
                              className="w-full rounded-md border border-input bg-background px-2 py-1.5 text-right text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                          </td>

                          {/* Row total */}
                          <td className="px-3 py-2.5 text-right font-mono text-xs font-semibold text-foreground">
                            {formatBDT(item.qty * item.unitPrice)}
                          </td>

                          {/* Delete */}
                          <td className="px-3 py-2.5">
                            <button
                              type="button"
                              onClick={() => removeLineItem(item.id)}
                              disabled={lineItems.length === 1}
                              aria-label="Remove line item"
                              className="flex items-center justify-center size-7 rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive-foreground disabled:pointer-events-none disabled:opacity-30"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Add item */}
                <div className="border-t border-border px-5 py-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addLineItem}
                  >
                    <Plus />
                    Add Item
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Discount + Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Details</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {/* Discount row */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Discount
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      value={discount}
                      onChange={(e) => setDiscount(Math.max(0, Number(e.target.value)))}
                      placeholder="0"
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <Select
                      id="discountType"
                      value={discountType}
                      onChange={(e) =>
                        setDiscountType(e.target.value as "fixed" | "percent")
                      }
                      options={DISCOUNT_TYPE_OPTIONS}
                      className="w-36 shrink-0"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="notes" className="text-sm font-medium text-foreground">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    placeholder="Payment terms, special instructions, or anything the patient should know..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-y"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ── RIGHT: summary sidebar ──────────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            <Card className="sticky top-6">
              <CardHeader className="pb-3">
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-0">

                {/* Subtotal */}
                <div className="flex items-center justify-between py-2.5 border-b border-border">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="font-mono text-sm font-medium text-foreground">
                    {formatBDT(subtotal)}
                  </span>
                </div>

                {/* Discount */}
                <div className="flex items-center justify-between py-2.5 border-b border-border">
                  <span className="text-sm text-muted-foreground">
                    Discount
                    {discountType === "percent" && discount > 0 && (
                      <span className="ml-1 text-xs text-muted-foreground/70">
                        ({discount}%)
                      </span>
                    )}
                  </span>
                  <span className="font-mono text-sm font-medium text-destructive-foreground">
                    {discountAmount > 0 ? `− ${formatBDT(discountAmount)}` : formatBDT(0)}
                  </span>
                </div>

                {/* Tax */}
                <div className="flex items-center justify-between py-2.5 border-b border-border">
                  <span className="text-sm text-muted-foreground">
                    VAT
                    <span className="ml-1 text-xs text-muted-foreground/70">(5%)</span>
                  </span>
                  <span className="font-mono text-sm font-medium text-foreground">
                    {formatBDT(taxAmount)}
                  </span>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between pt-3 pb-1">
                  <span className="text-sm font-semibold text-foreground">Total</span>
                  <span className="font-mono text-lg font-bold text-primary">
                    {formatBDT(total)}
                  </span>
                </div>

                {/* Left-accent bar echoing the billing page stat cards */}
                <div
                  className="mt-4 rounded-md p-3 text-xs text-muted-foreground"
                  style={{ background: "color-mix(in oklch, #16a34a 8%, transparent)" }}
                >
                  <p className="font-medium text-foreground mb-0.5">VAT inclusive</p>
                  5% VAT is applied on the discounted amount as per BD tax regulation.
                </div>

              </CardContent>

              {/* Submit */}
              <div className="px-6 pb-6 pt-2">
                <Button type="submit" className="w-full" size="lg">
                  Create Invoice
                </Button>
                <Link
                  href="/admin/billing"
                  className="mt-2 flex w-full items-center justify-center rounded-md py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Cancel
                </Link>
              </div>
            </Card>
          </div>

        </div>
      </form>

    </div>
  );
}
