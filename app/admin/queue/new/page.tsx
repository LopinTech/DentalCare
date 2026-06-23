"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  User,
  Stethoscope,
  FlaskConical,
  Eye,
  Activity,
  Ear,
  HeartPulse,
  Baby,
  Hash,
  PrinterIcon,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type Department =
  | "Dental"
  | "ENT"
  | "Eye"
  | "Medicine"
  | "Diabetes"
  | "Gynecology"
  | "Others";

interface PatientResult {
  id: number;
  name: string;
  phone: string;
  bloodGroup: string;
}

interface DeptDoctor {
  id: number;
  name: string;
  designation: string;
}

// ─── Static data ──────────────────────────────────────────────────────────────

const SAMPLE_PATIENTS: PatientResult[] = [
  { id: 1, name: "Rahima Begum", phone: "+880 1711-234567", bloodGroup: "B+" },
  { id: 2, name: "Arif Hossain", phone: "+880 1812-345678", bloodGroup: "O+" },
  { id: 3, name: "Nusrat Jahan", phone: "+880 1934-567890", bloodGroup: "A+" },
  { id: 4, name: "Md. Rakib Ali", phone: "+880 1755-678901", bloodGroup: "AB+" },
  { id: 5, name: "Sabrina Akter", phone: "+880 1623-789012", bloodGroup: "A−" },
];

const NEXT_TOKEN = 7;

const DEPT_DOCTORS: Record<Department, DeptDoctor[]> = {
  Dental: [
    { id: 1, name: "Dr. Aminur Rahman", designation: "BDS, FCPS" },
    { id: 2, name: "Dr. Fatema Khanam", designation: "BDS" },
  ],
  ENT: [
    { id: 3, name: "Dr. Sabbir Hossain", designation: "MBBS, MS (ENT)" },
    { id: 4, name: "Dr. Roksana Parvin", designation: "MBBS, DLO" },
  ],
  Eye: [
    { id: 5, name: "Dr. Mahbub Alam", designation: "MBBS, DO" },
  ],
  Medicine: [
    { id: 6, name: "Dr. Nasrin Sultana", designation: "MBBS, FCPS" },
    { id: 7, name: "Dr. Kamal Uddin", designation: "MBBS, MD" },
  ],
  Diabetes: [
    { id: 8, name: "Dr. Rezaul Karim", designation: "MBBS, MRCP" },
  ],
  Gynecology: [
    { id: 9, name: "Dr. Shahana Akhter", designation: "MBBS, FCPS (Gynae)" },
    { id: 10, name: "Dr. Dilara Islam", designation: "MBBS, DGO" },
  ],
  Others: [
    { id: 11, name: "Dr. Tofazzal Hossain", designation: "MBBS" },
  ],
};

const DEPARTMENTS: { id: Department; label: string; bn: string; icon: React.ReactNode }[] = [
  {
    id: "Dental",
    label: "Dental",
    bn: "দন্ত বিভাগ",
    icon: <Stethoscope className="size-5" />,
  },
  {
    id: "ENT",
    label: "ENT",
    bn: "নাক-কান-গলা",
    icon: <Ear className="size-5" />,
  },
  {
    id: "Eye",
    label: "Eye",
    bn: "চোখ বিভাগ",
    icon: <Eye className="size-5" />,
  },
  {
    id: "Medicine",
    label: "Medicine",
    bn: "মেডিসিন",
    icon: <Activity className="size-5" />,
  },
  {
    id: "Diabetes",
    label: "Diabetes",
    bn: "ডায়াবেটিস",
    icon: <FlaskConical className="size-5" />,
  },
  {
    id: "Gynecology",
    label: "Gynecology",
    bn: "গাইনি বিভাগ",
    icon: <Baby className="size-5" />,
  },
  {
    id: "Others",
    label: "Others",
    bn: "অন্যান্য",
    icon: <HeartPulse className="size-5" />,
  },
];

// ─── Token preview ────────────────────────────────────────────────────────────

function TokenPreview({
  department,
  tokenNum,
}: {
  department: Department | null;
  tokenNum: number;
}) {
  const formattedToken = String(tokenNum).padStart(3, "0");

  return (
    <Card className="sticky top-6 border-border overflow-hidden">
      {/* Green accent bar matching project primary */}
      <div className="h-1 w-full bg-primary" />
      <CardHeader className="pb-3">
        <CardTitle className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Token Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 pb-6">
        {/* Big token number — the aesthetic risk: monospaced, oversized, borderless */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
            <Hash className="size-3" />
            Token Number
          </span>
          <span
            className="font-mono text-7xl font-bold leading-none tracking-tighter"
            style={{ color: "#16a34a" }}
          >
            {formattedToken}
          </span>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-border" />

        {/* Dept badge */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <span className="text-xs text-muted-foreground">Department</span>
          {department ? (
            <Badge variant="default" className="text-sm px-3 py-1">
              {department}
            </Badge>
          ) : (
            <span className="text-sm text-muted-foreground italic">
              Not selected
            </span>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground leading-relaxed">
          This token will be printed and handed to the patient at reception.
        </p>
      </CardContent>
    </Card>
  );
}

// ─── Success modal ────────────────────────────────────────────────────────────

function SuccessModal({
  tokenNum,
  patientName,
  department,
  doctorName,
  onClose,
}: {
  tokenNum: number;
  patientName: string;
  department: Department;
  doctorName: string;
  onClose: () => void;
}) {
  const formattedToken = String(tokenNum).padStart(3, "0");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Token created successfully"
    >
      <div className="w-full max-w-sm rounded-xl border border-border bg-card shadow-xl overflow-hidden">
        {/* Top accent */}
        <div className="h-1.5 w-full bg-primary" />

        <div className="flex flex-col items-center gap-5 p-8 text-center">
          {/* Check icon */}
          <CheckCircle className="size-12 text-primary" />

          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              সিরিয়াল তৈরি হয়েছে
            </p>
            <p className="text-sm text-muted-foreground">
              Token created successfully
            </p>
          </div>

          {/* Giant token */}
          <div className="rounded-lg bg-primary/8 border border-primary/20 px-10 py-4">
            <span
              className="font-mono text-8xl font-bold leading-none tracking-tighter"
              style={{ color: "#16a34a" }}
            >
              {formattedToken}
            </span>
          </div>

          {/* Details */}
          <div className="w-full rounded-lg border border-border bg-muted/40 divide-y divide-border text-left text-sm">
            <div className="flex items-center justify-between px-4 py-2.5">
              <span className="text-muted-foreground">Patient</span>
              <span className="font-medium text-foreground">{patientName}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-2.5">
              <span className="text-muted-foreground">Department</span>
              <Badge variant="default">{department}</Badge>
            </div>
            <div className="flex items-center justify-between px-4 py-2.5">
              <span className="text-muted-foreground">Doctor</span>
              <span className="font-medium text-foreground">{doctorName}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex w-full gap-3">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => window.print()}
            >
              <PrinterIcon className="size-4" />
              Print
            </Button>
            <Button variant="default" className="flex-1" onClick={onClose}>
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NewQueuePage() {
  // Patient search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<PatientResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<PatientResult | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Department + Doctor
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>("no-preference");

  // Visit info
  const [chiefComplaint, setChiefComplaint] = useState("");
  const [notes, setNotes] = useState("");

  // Success modal
  const [showSuccess, setShowSuccess] = useState(false);

  // ── Patient search logic ───────────────────────────────────────────────────

  useEffect(() => {
    if (searchQuery.trim().length < 1) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    const q = searchQuery.toLowerCase();
    const matches = SAMPLE_PATIENTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.phone.includes(q)
    ).slice(0, 4);
    setSearchResults(matches);
    setShowDropdown(true);
  }, [searchQuery]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function selectPatient(p: PatientResult) {
    setSelectedPatient(p);
    setSearchQuery("");
    setShowDropdown(false);
  }

  function clearPatient() {
    setSelectedPatient(null);
    setSearchQuery("");
  }

  // ── Department change ──────────────────────────────────────────────────────

  function handleDeptChange(dept: Department) {
    setSelectedDept(dept);
    setSelectedDoctorId("no-preference");
  }

  // ── Submit ─────────────────────────────────────────────────────────────────

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowSuccess(true);
  }

  // ── Derived values for modal ───────────────────────────────────────────────

  const resolvedPatientName = selectedPatient?.name ?? "Unknown Patient";
  const resolvedDept = selectedDept ?? "Dental";

  const doctors = selectedDept ? DEPT_DOCTORS[selectedDept] : [];
  const resolvedDoctor =
    selectedDoctorId === "no-preference"
      ? "No preference"
      : doctors.find((d) => String(d.id) === selectedDoctorId)?.name ?? "No preference";

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Success modal */}
      {showSuccess && (
        <SuccessModal
          tokenNum={NEXT_TOKEN}
          patientName={resolvedPatientName}
          department={resolvedDept}
          doctorName={resolvedDoctor}
          onClose={() => setShowSuccess(false)}
        />
      )}

      <div className="flex flex-col gap-6">

        {/* ── Back + Header ───────────────────────────────────────────────────── */}
        <div>
          <Link
            href="/admin/queue"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3"
          >
            <ArrowLeft className="size-4" />
            Back to Queue
          </Link>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Reception
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              নতুন সিরিয়াল{" "}
              <span className="text-muted-foreground font-normal text-lg">
                / New Queue Token
              </span>
            </h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Issue a token to a patient arriving at the counter.
            </p>
          </div>
        </div>

        {/* ── Two-column layout: form + sticky preview ─────────────────────── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">

          {/* ── LEFT: Main form ─────────────────────────────────────────────── */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Section A — Patient ──────────────────────────────────────────── */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-sm font-semibold text-foreground">
                  Patient Information
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Search for an existing patient or walk in as new.
                </p>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">

                {selectedPatient ? (
                  /* Selected patient chip */
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <User className="size-4" style={{ color: "#16a34a" }} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground truncate">
                        {selectedPatient.name}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {selectedPatient.phone}
                      </p>
                    </div>
                    <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold text-foreground">
                      {selectedPatient.bloodGroup}
                    </span>
                    <button
                      type="button"
                      onClick={clearPatient}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
                      aria-label="Remove selected patient"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  /* Search */
                  <div ref={searchRef} className="relative">
                    <div className="relative">
                      <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
                        aria-hidden="true"
                      />
                      <input
                        type="search"
                        placeholder="Search by name or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => searchQuery && setShowDropdown(true)}
                        className="flex h-9 w-full rounded-md border border-input bg-background pl-9 pr-3.5 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label="Search patient by name or phone"
                        aria-autocomplete="list"
                        aria-expanded={showDropdown}
                      />
                    </div>

                    {/* Dropdown */}
                    {showDropdown && (
                      <div
                        className="absolute left-0 right-0 top-full z-20 mt-1 rounded-md border border-border bg-card shadow-lg overflow-hidden"
                        role="listbox"
                        aria-label="Patient search results"
                      >
                        {searchResults.length > 0 ? (
                          searchResults.map((p) => (
                            <button
                              key={p.id}
                              type="button"
                              role="option"
                              className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-muted/50 transition-colors"
                              onClick={() => selectPatient(p)}
                            >
                              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                <User className="size-3.5" style={{ color: "#16a34a" }} />
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">
                                  {p.name}
                                </p>
                                <p className="text-xs text-muted-foreground font-mono">
                                  {p.phone}
                                </p>
                              </div>
                              <span className="text-xs border border-border rounded-full px-2 py-0.5 text-foreground font-semibold">
                                {p.bloodGroup}
                              </span>
                            </button>
                          ))
                        ) : (
                          <p className="px-4 py-3 text-sm text-muted-foreground">
                            No patient found.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground px-1">or</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                <Link
                  href="/admin/patients/new"
                  className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4"
                >
                  <User className="size-4" />
                  Register as new patient
                </Link>

              </CardContent>
            </Card>

            {/* Section B — Department ───────────────────────────────────────── */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-sm font-semibold text-foreground">
                  Department
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Select the department the patient is visiting.
                </p>
              </CardHeader>
              <CardContent>
                <div
                  className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4"
                  role="radiogroup"
                  aria-label="Select department"
                >
                  {DEPARTMENTS.map((dept) => {
                    const isSelected = selectedDept === dept.id;
                    const isDental = dept.id === "Dental";
                    return (
                      <label
                        key={dept.id}
                        className={cn(
                          "relative flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-3.5 text-center transition-all select-none",
                          isSelected
                            ? isDental
                              ? "border-primary bg-primary/8 shadow-sm"
                              : "border-primary bg-primary/8 shadow-sm"
                            : "border-border bg-card hover:border-primary/40 hover:bg-muted/30"
                        )}
                      >
                        <input
                          type="radio"
                          name="department"
                          value={dept.id}
                          checked={isSelected}
                          onChange={() => handleDeptChange(dept.id)}
                          className="sr-only"
                        />
                        <span
                          className={cn(
                            "flex size-9 items-center justify-center rounded-md transition-colors",
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground"
                          )}
                        >
                          {dept.icon}
                        </span>
                        <div>
                          <p
                            className={cn(
                              "text-xs font-semibold leading-tight",
                              isSelected ? "text-primary" : "text-foreground"
                            )}
                          >
                            {dept.label}
                          </p>
                          <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                            {dept.bn}
                          </p>
                        </div>
                        {isSelected && (
                          <span
                            className="absolute top-2 right-2 flex size-3.5 items-center justify-center rounded-full bg-primary"
                            aria-hidden="true"
                          >
                            <CheckCircle className="size-3 text-primary-foreground" />
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Section C — Doctor (appears after dept selected) ────────────── */}
            {selectedDept && (
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Doctor
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Token #{String(NEXT_TOKEN).padStart(3, "0")} —{" "}
                    {selectedDept} dept
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    {/* No preference */}
                    <label
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-all",
                        selectedDoctorId === "no-preference"
                          ? "border-primary bg-primary/8"
                          : "border-border bg-card hover:border-primary/40 hover:bg-muted/30"
                      )}
                    >
                      <input
                        type="radio"
                        name="doctor"
                        value="no-preference"
                        checked={selectedDoctorId === "no-preference"}
                        onChange={() => setSelectedDoctorId("no-preference")}
                        className="sr-only"
                      />
                      <span
                        className={cn(
                          "flex size-7 shrink-0 items-center justify-center rounded-full",
                          selectedDoctorId === "no-preference"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        )}
                      >
                        <Stethoscope className="size-3.5" />
                      </span>
                      <div className="flex-1">
                        <p
                          className={cn(
                            "text-sm font-medium",
                            selectedDoctorId === "no-preference"
                              ? "text-primary"
                              : "text-foreground"
                          )}
                        >
                          No preference
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Assign based on availability
                        </p>
                      </div>
                    </label>

                    {/* Dept doctors */}
                    {DEPT_DOCTORS[selectedDept].map((doc) => (
                      <label
                        key={doc.id}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-all",
                          selectedDoctorId === String(doc.id)
                            ? "border-primary bg-primary/8"
                            : "border-border bg-card hover:border-primary/40 hover:bg-muted/30"
                        )}
                      >
                        <input
                          type="radio"
                          name="doctor"
                          value={String(doc.id)}
                          checked={selectedDoctorId === String(doc.id)}
                          onChange={() => setSelectedDoctorId(String(doc.id))}
                          className="sr-only"
                        />
                        <span
                          className={cn(
                            "flex size-7 shrink-0 items-center justify-center rounded-full font-bold text-xs",
                            selectedDoctorId === String(doc.id)
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground"
                          )}
                        >
                          {doc.name.split(" ").slice(-1)[0][0]}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p
                            className={cn(
                              "text-sm font-medium truncate",
                              selectedDoctorId === String(doc.id)
                                ? "text-primary"
                                : "text-foreground"
                            )}
                          >
                            {doc.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {doc.designation}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Section D — Visit Info ───────────────────────────────────────── */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-sm font-semibold text-foreground">
                  Visit Information
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Chief complaint helps triage the patient faster.
                </p>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="chief-complaint"
                    className="text-sm font-medium text-foreground"
                  >
                    Chief Complaint{" "}
                    <span className="text-muted-foreground font-normal">
                      (required)
                    </span>
                  </label>
                  <textarea
                    id="chief-complaint"
                    required
                    rows={3}
                    placeholder="Main symptom or reason for visit — e.g. tooth pain, difficulty hearing..."
                    value={chiefComplaint}
                    onChange={(e) => setChiefComplaint(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-y min-h-[80px]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="visit-notes"
                    className="text-sm font-medium text-foreground"
                  >
                    Notes{" "}
                    <span className="text-muted-foreground font-normal">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="visit-notes"
                    rows={2}
                    placeholder="Any additional context — referral, previous visit, urgency..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-y min-h-[64px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit ───────────────────────────────────────────────────────── */}
            <Button
              type="submit"
              className="w-full h-11 text-base font-semibold"
              disabled={!selectedDept}
            >
              সিরিয়াল তৈরি করুন / Create Token
            </Button>

          </form>

          {/* ── RIGHT: Token preview (sticky) ───────────────────────────────── */}
          <div className="hidden lg:block">
            <TokenPreview department={selectedDept} tokenNum={NEXT_TOKEN} />
          </div>

        </div>
      </div>
    </>
  );
}
