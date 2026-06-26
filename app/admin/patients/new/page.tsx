"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, User, HeartPulse, ClipboardList } from "lucide-react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Select } from "@/ui/select";
import { Textarea } from "@/ui/textarea";
import { cn } from "@/lib/utils";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface BasicInfo {
  fullName: string;
  email: string;
  phone: string;
  phone2: string;
  whatsapp: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  address: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelation: string;
  isChildPatient: boolean;
  guardianName: string;
  guardianRelation: string;
  guardianPhone: string;
}

interface MedicalInfo {
  allergies: string;
  currentMedicines: string;
  medicalNotes: string;
  dentalPreviousTreatment: boolean;
  dentalPreviousNotes: string;
  dentalCurrentProblem: string;
  generalPreviousTreatment: boolean;
  generalPreviousNotes: string;
  generalCurrentProblem: string;
}

// ─── Stepper ───────────────────────────────────────────────────────────────────

const STEPS = [
  { label: "Basic Info", icon: User },
  { label: "Medical Info", icon: HeartPulse },
  { label: "Review", icon: ClipboardList },
];

function Stepper({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEPS.map((step, i) => {
        const Icon = step.icon;
        const done = i < current;
        const active = i === current;
        return (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <div
                className={cn(
                  "flex size-9 items-center justify-center rounded-full border-2 transition-colors",
                  done && "border-primary bg-primary text-primary-foreground",
                  active && "border-primary bg-background text-primary",
                  !done && !active && "border-input bg-background text-muted-foreground"
                )}
              >
                {done ? <Check className="size-4" /> : <Icon className="size-4" />}
              </div>
              <span
                className={cn(
                  "text-xs font-medium",
                  active ? "text-primary" : done ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "h-0.5 flex-1 mx-2 mb-4 transition-colors",
                  i < current ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Review Row ────────────────────────────────────────────────────────────────

function ReviewRow({ label, value }: { label: string; value?: string | boolean }) {
  if (!value && value !== false) return null;
  const display = typeof value === "boolean" ? (value ? "Yes" : "No") : value;
  return (
    <div className="flex gap-3 py-2 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground w-40 shrink-0">{label}</span>
      <span className="text-sm text-foreground font-medium">{display}</span>
    </div>
  );
}

function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">{title}</h3>
      <div className="rounded-lg border border-border bg-muted/30 px-4">{children}</div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function NewPatientPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [basic, setBasic] = useState<BasicInfo>({
    fullName: "",
    email: "",
    phone: "",
    phone2: "",
    whatsapp: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    address: "",
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "",
    isChildPatient: false,
    guardianName: "",
    guardianRelation: "",
    guardianPhone: "",
  });

  const [medical, setMedical] = useState<MedicalInfo>({
    allergies: "",
    currentMedicines: "",
    medicalNotes: "",
    dentalPreviousTreatment: false,
    dentalPreviousNotes: "",
    dentalCurrentProblem: "",
    generalPreviousTreatment: false,
    generalPreviousNotes: "",
    generalCurrentProblem: "",
  });

  function setB<K extends keyof BasicInfo>(key: K, val: BasicInfo[K]) {
    setBasic((prev) => ({ ...prev, [key]: val }));
  }

  function setM<K extends keyof MedicalInfo>(key: K, val: MedicalInfo[K]) {
    setMedical((prev) => ({ ...prev, [key]: val }));
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      console.log("Creating patient:", { basic, medical });
      // TODO: wire up API call
      router.push("/admin/patients");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/admin/patients")}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>
      </div>

      <h1 className="text-2xl font-bold mb-6">Add New Patient</h1>

      <Stepper current={step} />

      {/* ── Step 1: Basic Info ── */}
      {step === 0 && (
        <div className="space-y-6">
          <section>
            <h2 className="text-base font-semibold mb-3">Personal Details</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Full Name *"
                id="fullName"
                placeholder="Enter full name"
                value={basic.fullName}
                onChange={(e) => setB("fullName", e.target.value)}
                required
              />
              <Input
                label="Email"
                id="email"
                type="email"
                placeholder="Enter email"
                value={basic.email}
                onChange={(e) => setB("email", e.target.value)}
              />
              <Input
                label="Phone *"
                id="phone"
                type="tel"
                placeholder="Primary phone"
                value={basic.phone}
                onChange={(e) => setB("phone", e.target.value)}
                required
              />
              <Input
                label="Phone 2"
                id="phone2"
                type="tel"
                placeholder="Alternative phone"
                value={basic.phone2}
                onChange={(e) => setB("phone2", e.target.value)}
              />
              <Input
                label="WhatsApp"
                id="whatsapp"
                type="tel"
                placeholder="WhatsApp number"
                value={basic.whatsapp}
                onChange={(e) => setB("whatsapp", e.target.value)}
              />
              <Input
                label="Date of Birth"
                id="dob"
                type="date"
                value={basic.dateOfBirth}
                onChange={(e) => setB("dateOfBirth", e.target.value)}
              />
              <Select
                label="Gender"
                id="gender"
                value={basic.gender}
                onChange={(e) => setB("gender", e.target.value)}
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Other", value: "other" },
                ]}
                placeholder="Select gender"
              />
              <Select
                label="Blood Group"
                id="bloodGroup"
                value={basic.bloodGroup}
                onChange={(e) => setB("bloodGroup", e.target.value)}
                options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((v) => ({
                  label: v,
                  value: v,
                }))}
                placeholder="Select blood group"
              />
            </div>
            <div className="mt-4">
              <Textarea
                label="Address"
                id="address"
                placeholder="Enter full address"
                value={basic.address}
                onChange={(e) => setB("address", e.target.value)}
                rows={2}
              />
            </div>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-3">Emergency Contact</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Input
                label="Name"
                id="emergencyName"
                placeholder="Contact name"
                value={basic.emergencyName}
                onChange={(e) => setB("emergencyName", e.target.value)}
              />
              <Input
                label="Phone"
                id="emergencyPhone"
                type="tel"
                placeholder="Contact phone"
                value={basic.emergencyPhone}
                onChange={(e) => setB("emergencyPhone", e.target.value)}
              />
              <Input
                label="Relation"
                id="emergencyRelation"
                placeholder="e.g. Spouse, Parent"
                value={basic.emergencyRelation}
                onChange={(e) => setB("emergencyRelation", e.target.value)}
              />
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-3">
              <input
                id="isChild"
                type="checkbox"
                checked={basic.isChildPatient}
                onChange={(e) => setB("isChildPatient", e.target.checked)}
                className="size-4 rounded border-input accent-primary"
              />
              <label htmlFor="isChild" className="text-sm font-semibold cursor-pointer">
                Child Patient
              </label>
            </div>
            {basic.isChildPatient && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Input
                  label="Guardian Name"
                  id="guardianName"
                  placeholder="Guardian name"
                  value={basic.guardianName}
                  onChange={(e) => setB("guardianName", e.target.value)}
                />
                <Input
                  label="Guardian Relation"
                  id="guardianRelation"
                  placeholder="e.g. Father, Mother"
                  value={basic.guardianRelation}
                  onChange={(e) => setB("guardianRelation", e.target.value)}
                />
                <Input
                  label="Guardian Phone"
                  id="guardianPhone"
                  type="tel"
                  placeholder="Guardian phone"
                  value={basic.guardianPhone}
                  onChange={(e) => setB("guardianPhone", e.target.value)}
                />
              </div>
            )}
          </section>
        </div>
      )}

      {/* ── Step 2: Medical Info ── */}
      {step === 1 && (
        <div className="space-y-6">
          <section>
            <h2 className="text-base font-semibold mb-3">General Health</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Textarea
                label="Allergies"
                id="allergies"
                placeholder="List any known allergies..."
                value={medical.allergies}
                onChange={(e) => setM("allergies", e.target.value)}
                rows={3}
              />
              <Textarea
                label="Current Medicines"
                id="currentMedicines"
                placeholder="List current medications..."
                value={medical.currentMedicines}
                onChange={(e) => setM("currentMedicines", e.target.value)}
                rows={3}
              />
            </div>
            <div className="mt-4">
              <Textarea
                label="Medical Notes"
                id="medicalNotes"
                placeholder="Any other relevant medical notes..."
                value={medical.medicalNotes}
                onChange={(e) => setM("medicalNotes", e.target.value)}
                rows={2}
              />
            </div>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-3">Dental History</h2>
            <div className="flex items-center gap-3 mb-3">
              <input
                id="dentalPrev"
                type="checkbox"
                checked={medical.dentalPreviousTreatment}
                onChange={(e) => setM("dentalPreviousTreatment", e.target.checked)}
                className="size-4 rounded border-input accent-primary"
              />
              <label htmlFor="dentalPrev" className="text-sm font-medium cursor-pointer">
                Had previous dental treatment
              </label>
            </div>
            {medical.dentalPreviousTreatment && (
              <div className="mb-4">
                <Textarea
                  label="Previous Dental Treatment Notes"
                  id="dentalPrevNotes"
                  placeholder="Describe previous dental treatments..."
                  value={medical.dentalPreviousNotes}
                  onChange={(e) => setM("dentalPreviousNotes", e.target.value)}
                  rows={3}
                />
              </div>
            )}
            <Textarea
              label="Current Dental Problem"
              id="dentalCurrentProblem"
              placeholder="Describe current dental complaints..."
              value={medical.dentalCurrentProblem}
              onChange={(e) => setM("dentalCurrentProblem", e.target.value)}
              rows={3}
            />
          </section>

          <section>
            <h2 className="text-base font-semibold mb-3">General Medical History</h2>
            <div className="flex items-center gap-3 mb-3">
              <input
                id="generalPrev"
                type="checkbox"
                checked={medical.generalPreviousTreatment}
                onChange={(e) => setM("generalPreviousTreatment", e.target.checked)}
                className="size-4 rounded border-input accent-primary"
              />
              <label htmlFor="generalPrev" className="text-sm font-medium cursor-pointer">
                Had previous general medical treatment
              </label>
            </div>
            {medical.generalPreviousTreatment && (
              <div className="mb-4">
                <Textarea
                  label="Previous Medical Treatment Notes"
                  id="generalPrevNotes"
                  placeholder="Describe previous medical treatments..."
                  value={medical.generalPreviousNotes}
                  onChange={(e) => setM("generalPreviousNotes", e.target.value)}
                  rows={3}
                />
              </div>
            )}
            <Textarea
              label="Current General Problem"
              id="generalCurrentProblem"
              placeholder="Describe current general health complaints..."
              value={medical.generalCurrentProblem}
              onChange={(e) => setM("generalCurrentProblem", e.target.value)}
              rows={3}
            />
          </section>
        </div>
      )}

      {/* ── Step 3: Review ── */}
      {step === 2 && (
        <div>
          <ReviewSection title="Personal Details">
            <ReviewRow label="Full Name" value={basic.fullName} />
            <ReviewRow label="Email" value={basic.email} />
            <ReviewRow label="Phone" value={basic.phone} />
            <ReviewRow label="Phone 2" value={basic.phone2} />
            <ReviewRow label="WhatsApp" value={basic.whatsapp} />
            <ReviewRow label="Date of Birth" value={basic.dateOfBirth} />
            <ReviewRow label="Gender" value={basic.gender} />
            <ReviewRow label="Blood Group" value={basic.bloodGroup} />
            <ReviewRow label="Address" value={basic.address} />
            <ReviewRow label="Child Patient" value={basic.isChildPatient ? "Yes" : undefined} />
          </ReviewSection>

          {(basic.guardianName || basic.guardianPhone) && (
            <ReviewSection title="Guardian Info">
              <ReviewRow label="Guardian Name" value={basic.guardianName} />
              <ReviewRow label="Relation" value={basic.guardianRelation} />
              <ReviewRow label="Phone" value={basic.guardianPhone} />
            </ReviewSection>
          )}

          {(basic.emergencyName || basic.emergencyPhone) && (
            <ReviewSection title="Emergency Contact">
              <ReviewRow label="Name" value={basic.emergencyName} />
              <ReviewRow label="Relation" value={basic.emergencyRelation} />
              <ReviewRow label="Phone" value={basic.emergencyPhone} />
            </ReviewSection>
          )}

          <ReviewSection title="General Health">
            <ReviewRow label="Allergies" value={medical.allergies} />
            <ReviewRow label="Current Medicines" value={medical.currentMedicines} />
            <ReviewRow label="Medical Notes" value={medical.medicalNotes} />
          </ReviewSection>

          <ReviewSection title="Dental History">
            <ReviewRow label="Previous Treatment" value={medical.dentalPreviousTreatment} />
            <ReviewRow label="Previous Notes" value={medical.dentalPreviousNotes} />
            <ReviewRow label="Current Problem" value={medical.dentalCurrentProblem} />
          </ReviewSection>

          <ReviewSection title="General Medical History">
            <ReviewRow label="Previous Treatment" value={medical.generalPreviousTreatment} />
            <ReviewRow label="Previous Notes" value={medical.generalPreviousNotes} />
            <ReviewRow label="Current Problem" value={medical.generalCurrentProblem} />
          </ReviewSection>
        </div>
      )}

      {/* ── Navigation ── */}
      <div className="flex justify-between mt-8 pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={() => (step === 0 ? router.push("/admin/patients") : setStep((s) => s - 1))}
        >
          <ArrowLeft className="size-4" />
          {step === 0 ? "Cancel" : "Back"}
        </Button>

        {step < 2 ? (
          <Button
            onClick={() => setStep((s) => s + 1)}
            disabled={step === 0 && !basic.fullName.trim()}
          >
            Next
            <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} isLoading={loading}>
            <Check className="size-4" />
            Create Patient
          </Button>
        )}
      </div>
    </div>
  );
}
