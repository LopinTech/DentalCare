"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  FlaskConical,
  Microscope,
  Check,
  X,
  Printer,
  Plus,
  Clock,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type TokenStatus =
  | "waiting"
  | "with_doctor"
  | "in_pathology"
  | "in_lab"
  | "completed"
  | "cancelled";

type Department =
  | "All"
  | "Dental"
  | "ENT"
  | "Eye"
  | "Medicine"
  | "Diabetes"
  | "Gynecology"
  | "Others";

interface QueueToken {
  id: number;
  tokenNo: string;
  patient: string;
  dept: Exclude<Department, "All">;
  doctor: string;
  complaint: string;
  status: TokenStatus;
  time: string;
}

// ─── Sample data ──────────────────────────────────────────────────────────────

const INITIAL_TOKENS: QueueToken[] = [
  {
    id: 1,
    tokenNo: "D-001",
    patient: "Rahima Begum",
    dept: "Dental",
    doctor: "Dr. A. Karim",
    complaint: "Severe toothache, lower right molar",
    status: "completed",
    time: "08:45 AM",
  },
  {
    id: 2,
    tokenNo: "D-002",
    patient: "Arif Hossain",
    dept: "Dental",
    doctor: "Dr. A. Karim",
    complaint: "Dental cleaning & scaling",
    status: "completed",
    time: "09:15 AM",
  },
  {
    id: 3,
    tokenNo: "E-001",
    patient: "Nusrat Jahan",
    dept: "ENT",
    doctor: "Dr. S. Islam",
    complaint: "Chronic sinusitis, difficulty breathing",
    status: "with_doctor",
    time: "09:30 AM",
  },
  {
    id: 4,
    tokenNo: "M-001",
    patient: "Md. Rakib Ali",
    dept: "Medicine",
    doctor: "Dr. F. Haque",
    complaint: "Fever and body ache for 3 days",
    status: "in_pathology",
    time: "09:50 AM",
  },
  {
    id: 5,
    tokenNo: "D-003",
    patient: "Sabrina Akter",
    dept: "Dental",
    doctor: "Dr. N. Sultana",
    complaint: "Teeth whitening consultation",
    status: "with_doctor",
    time: "10:00 AM",
  },
  {
    id: 6,
    tokenNo: "DB-001",
    patient: "Tanvir Ahmed",
    dept: "Diabetes",
    doctor: "Dr. F. Haque",
    complaint: "Quarterly blood sugar checkup",
    status: "in_lab",
    time: "10:15 AM",
  },
  {
    id: 7,
    tokenNo: "EY-001",
    patient: "Hasina Khatun",
    dept: "Eye",
    doctor: "Dr. R. Chowdhury",
    complaint: "Blurred vision, possible cataract",
    status: "with_doctor",
    time: "10:30 AM",
  },
  {
    id: 8,
    tokenNo: "G-001",
    patient: "Fatema Akhter",
    dept: "Gynecology",
    doctor: "Dr. M. Begum",
    complaint: "Routine antenatal checkup — 28 weeks",
    status: "waiting",
    time: "10:45 AM",
  },
  {
    id: 9,
    tokenNo: "E-002",
    patient: "Kamal Uddin",
    dept: "ENT",
    doctor: "Dr. S. Islam",
    complaint: "Hearing loss left ear, tinnitus",
    status: "waiting",
    time: "11:00 AM",
  },
  {
    id: 10,
    tokenNo: "D-004",
    patient: "Shirin Parveen",
    dept: "Dental",
    doctor: "Dr. A. Karim",
    complaint: "Root canal — second session",
    status: "waiting",
    time: "11:15 AM",
  },
  {
    id: 11,
    tokenNo: "M-002",
    patient: "Jahangir Alam",
    dept: "Medicine",
    doctor: "Dr. F. Haque",
    complaint: "Hypertension follow-up, medication review",
    status: "waiting",
    time: "11:30 AM",
  },
  {
    id: 12,
    tokenNo: "OT-001",
    patient: "Roksana Parvin",
    dept: "Others",
    doctor: "Dr. R. Chowdhury",
    complaint: "Post-operative wound dressing",
    status: "cancelled",
    time: "11:45 AM",
  },
];

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  TokenStatus,
  { label: string; borderColor: string; badgeBg: string; badgeText: string }
> = {
  waiting: {
    label: "Waiting",
    borderColor: "#d97706",
    badgeBg: "#fef3c7",
    badgeText: "#92400e",
  },
  with_doctor: {
    label: "With Doctor",
    borderColor: "#0ea5e9",
    badgeBg: "#e0f2fe",
    badgeText: "#0c4a6e",
  },
  in_pathology: {
    label: "Pathology",
    borderColor: "#7c3aed",
    badgeBg: "#ede9fe",
    badgeText: "#4c1d95",
  },
  in_lab: {
    label: "In Lab",
    borderColor: "#ea580c",
    badgeBg: "#ffedd5",
    badgeText: "#7c2d12",
  },
  completed: {
    label: "Completed",
    borderColor: "#16a34a",
    badgeBg: "#dcfce7",
    badgeText: "#14532d",
  },
  cancelled: {
    label: "Cancelled",
    borderColor: "#dc2626",
    badgeBg: "#fee2e2",
    badgeText: "#7f1d1d",
  },
};

const DEPARTMENTS: Department[] = [
  "All",
  "Dental",
  "ENT",
  "Eye",
  "Medicine",
  "Diabetes",
  "Gynecology",
  "Others",
];

// ─── Subcomponents ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: TokenStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
      style={{ backgroundColor: cfg.badgeBg, color: cfg.badgeText }}
    >
      {cfg.label}
    </span>
  );
}

function SummaryCard({
  label,
  value,
  color,
  icon: Icon,
}: {
  label: string;
  value: number;
  color: string;
  icon: React.ElementType;
}) {
  return (
    <Card className="relative overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 w-1 rounded-l-xl"
        style={{ background: color }}
        aria-hidden="true"
      />
      <CardContent className="pl-7 pr-5 py-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {label}
            </p>
            <p
              className="mt-1 text-3xl font-bold tabular-nums tracking-tight"
              style={{ color }}
            >
              {value}
            </p>
          </div>
          <span
            className="flex items-center justify-center rounded-lg p-2.5"
            style={{ backgroundColor: color + "18" }}
          >
            <Icon className="size-5 shrink-0" style={{ color }} />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function QueuePage() {
  const [tokens, setTokens] = useState<QueueToken[]>(INITIAL_TOKENS);
  const [selectedDept, setSelectedDept] = useState<Department>("All");

  // ── Derived counts ──────────────────────────────────────────────────────────
  const total = tokens.length;
  const waiting = tokens.filter((t) => t.status === "waiting").length;
  const withDoctor = tokens.filter((t) => t.status === "with_doctor").length;
  const completed = tokens.filter((t) => t.status === "completed").length;

  // ── Filtered tokens ─────────────────────────────────────────────────────────
  const visible =
    selectedDept === "All"
      ? tokens
      : tokens.filter((t) => t.dept === selectedDept);

  // ── Status transition ───────────────────────────────────────────────────────
  function updateStatus(id: number, nextStatus: TokenStatus) {
    setTokens((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: nextStatus } : t))
    );
  }

  // ── Today's date ────────────────────────────────────────────────────────────
  const today = new Date().toLocaleDateString("en-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* ── Print styles ────────────────────────────────────────────────────── */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-container { padding: 0 !important; }
          body { background: white !important; }
        }
      `}</style>

      <div className="flex flex-col gap-6 print-container">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between no-print">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#16a34a]">
              Live Board
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              আজকের সিরিয়াল{" "}
              <span className="text-lg font-normal text-muted-foreground">
                / Today&apos;s Queue
              </span>
            </h1>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="size-3.5 shrink-0" />
              <span>{today}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              aria-label="Print queue"
            >
              <Printer />
              Print
            </Button>
            <Link href="/admin/queue/new">
              <Button size="sm">
                <Plus />
                New Token
              </Button>
            </Link>
          </div>
        </div>

        {/* ── Print header (visible only in print) ────────────────────────── */}
        <div className="hidden print:block">
          <h1 className="text-xl font-bold">
            Today&apos;s Queue — {today}
          </h1>
          <p className="text-sm text-gray-500">DentalCare Management System</p>
        </div>

        {/* ── Summary cards ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4 no-print">
          <SummaryCard
            label="Total Today"
            value={total}
            color="#16a34a"
            icon={Users}
          />
          <SummaryCard
            label="Waiting"
            value={waiting}
            color="#d97706"
            icon={Clock}
          />
          <SummaryCard
            label="With Doctor"
            value={withDoctor}
            color="#0ea5e9"
            icon={Users}
          />
          <SummaryCard
            label="Completed"
            value={completed}
            color="#16a34a"
            icon={Check}
          />
        </div>

        {/* ── Department tabs ──────────────────────────────────────────────── */}
        <div className="no-print">
          <div
            className="flex flex-wrap gap-1.5 rounded-xl border border-border bg-secondary p-1.5"
            role="tablist"
            aria-label="Filter by department"
          >
            {DEPARTMENTS.map((dept) => {
              const active = selectedDept === dept;
              return (
                <button
                  key={dept}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedDept(dept)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a]",
                    active
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {dept}
                  {dept !== "All" && (
                    <span className="ml-1.5 tabular-nums text-muted-foreground">
                      {tokens.filter((t) => t.dept === dept).length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Main table ──────────────────────────────────────────────────── */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Token #
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Patient Name
                    </th>
                    <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">
                      Dept
                    </th>
                    <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:table-cell">
                      Doctor
                    </th>
                    <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground xl:table-cell">
                      Chief Complaint
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Status
                    </th>
                    <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:table-cell">
                      Time
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground no-print">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {visible.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-4 py-12 text-center text-sm text-muted-foreground"
                      >
                        No patients in this department today.
                      </td>
                    </tr>
                  )}
                  {visible.map((token) => {
                    const cfg = STATUS_CONFIG[token.status];
                    const isTerminal =
                      token.status === "completed" ||
                      token.status === "cancelled";

                    return (
                      <tr
                        key={token.id}
                        className={cn(
                          "relative transition-colors hover:bg-muted/20",
                          isTerminal && "opacity-60"
                        )}
                      >
                        {/* Colored left border via pseudo-element trick */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <span
                              className="hidden h-8 w-1 shrink-0 rounded-full sm:block"
                              style={{ backgroundColor: cfg.borderColor }}
                              aria-hidden="true"
                            />
                            <span className="font-mono text-xs font-bold text-foreground">
                              {token.tokenNo}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-medium text-foreground">
                          {token.patient}
                        </td>
                        <td className="hidden px-4 py-3 md:table-cell">
                          <Badge variant="secondary">{token.dept}</Badge>
                        </td>
                        <td className="hidden px-4 py-3 text-muted-foreground lg:table-cell">
                          {token.doctor}
                        </td>
                        <td className="hidden max-w-56 px-4 py-3 xl:table-cell">
                          <span
                            className="block truncate text-muted-foreground"
                            title={token.complaint}
                          >
                            {token.complaint}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={token.status} />
                        </td>
                        <td className="hidden px-4 py-3 font-mono text-xs text-muted-foreground sm:table-cell">
                          {token.time}
                        </td>

                        {/* ── Action buttons ──────────────────────────────── */}
                        <td className="px-4 py-3 no-print">
                          <div className="flex flex-wrap items-center gap-1">
                            {/* Call → with_doctor */}
                            {(token.status === "waiting") && (
                              <button
                                onClick={() =>
                                  updateStatus(token.id, "with_doctor")
                                }
                                title="Call patient — move to With Doctor"
                                className="inline-flex items-center gap-1 rounded-md bg-[#e0f2fe] px-2 py-1 text-xs font-semibold text-[#0c4a6e] transition-colors hover:bg-[#bae6fd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9]"
                              >
                                <Phone className="size-3.5 shrink-0" />
                                Call
                              </button>
                            )}

                            {/* Pathology */}
                            {(token.status === "waiting" ||
                              token.status === "with_doctor") && (
                              <button
                                onClick={() =>
                                  updateStatus(token.id, "in_pathology")
                                }
                                title="Send to Pathology"
                                className="inline-flex items-center gap-1 rounded-md bg-[#ede9fe] px-2 py-1 text-xs font-semibold text-[#4c1d95] transition-colors hover:bg-[#ddd6fe] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed]"
                              >
                                <FlaskConical className="size-3.5 shrink-0" />
                                Path
                              </button>
                            )}

                            {/* Lab */}
                            {(token.status === "waiting" ||
                              token.status === "with_doctor") && (
                              <button
                                onClick={() =>
                                  updateStatus(token.id, "in_lab")
                                }
                                title="Send to Lab"
                                className="inline-flex items-center gap-1 rounded-md bg-[#ffedd5] px-2 py-1 text-xs font-semibold text-[#7c2d12] transition-colors hover:bg-[#fed7aa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ea580c]"
                              >
                                <Microscope className="size-3.5 shrink-0" />
                                Lab
                              </button>
                            )}

                            {/* Done */}
                            {token.status !== "completed" &&
                              token.status !== "cancelled" && (
                                <button
                                  onClick={() =>
                                    updateStatus(token.id, "completed")
                                  }
                                  title="Mark as Completed"
                                  className="inline-flex items-center gap-1 rounded-md bg-[#dcfce7] px-2 py-1 text-xs font-semibold text-[#14532d] transition-colors hover:bg-[#bbf7d0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a]"
                                >
                                  <Check className="size-3.5 shrink-0" />
                                  Done
                                </button>
                              )}

                            {/* Cancel */}
                            {token.status !== "completed" &&
                              token.status !== "cancelled" && (
                                <button
                                  onClick={() =>
                                    updateStatus(token.id, "cancelled")
                                  }
                                  title="Cancel this token"
                                  className="inline-flex items-center gap-1 rounded-md bg-[#fee2e2] px-2 py-1 text-xs font-semibold text-[#7f1d1d] transition-colors hover:bg-[#fecaca] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dc2626]"
                                >
                                  <X className="size-3.5 shrink-0" />
                                  Cancel
                                </button>
                              )}

                            {/* Terminal state label */}
                            {isTerminal && (
                              <span className="text-xs text-muted-foreground">
                                —
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* ── Table footer ──────────────────────────────────────────── */}
            <div className="flex items-center justify-between border-t border-border px-5 py-3 no-print">
              <p className="text-xs text-muted-foreground">
                Showing {visible.length} of {total} tokens
                {selectedDept !== "All" && ` in ${selectedDept}`}
              </p>
              <p className="text-xs text-muted-foreground">
                {waiting} still waiting · {withDoctor} with doctor
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
