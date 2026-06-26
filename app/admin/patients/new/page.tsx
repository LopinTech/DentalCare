"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Select } from "@/ui/select";
import { Switch } from "@/ui/switch";
import { Textarea } from "@/ui/textarea";
import {
	Activity,
	ArrowLeft,
	ArrowRight,
	Baby,
	Check,
	Cigarette,
	ClipboardList,
	HeartPulse,
	MapPin,
	Phone,
	Pill,
	ShieldAlert,
	Stethoscope,
	User,
	Users,
	Venus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

interface ConditionEntry {
	has: boolean;
	medicine: string;
}

interface MedicalInfo {
	conditions: Record<string, ConditionEntry>;
	diabetesBeforeMeal: string;
	diabetesAfterMeal: string;
	drugAllergies: Record<string, boolean>;
	drugAllergyOther: string;
	currentMedicines: string;
	habits: Record<string, boolean>;
	habitsOther: string;
	dentalCurrentProblem: string;
	dentalPreviousTreatment: boolean;
	dentalPreviousNotes: string;
	// Women only
	isMarried: string;
	menstruation: string;
	isPregnant: string;
	pregnancyMonths: string;
	isBreastfeeding: string;
	birthControl: string;
	fertilityTreatment: string;
}

// ─── Static config ──────────────────────────────────────────────────────────────

const MEDICAL_CONDITIONS: {
	key: string;
	label: string;
	medicineLabel?: string;
}[] = [
	{
		key: "heartDisease",
		label: "Heart Disease",
		medicineLabel: "Medicine name",
	},
	{
		key: "bloodPressure",
		label: "High / Low Blood Pressure",
		medicineLabel: "Medicine name",
	},
	{
		key: "rheumaticFever",
		label: "Rheumatic Fever",
		medicineLabel: "Medicine name",
	},
	{ key: "diabetes", label: "Diabetes", medicineLabel: "Medicine name" },
	{ key: "asthma", label: "Asthma", medicineLabel: "Medicine name" },
	{ key: "gastric", label: "Gastric / Ulcer", medicineLabel: "Medicine name" },
	{
		key: "tuberculosis",
		label: "Tuberculosis (TB)",
		medicineLabel: "Medicine name",
	},
	{
		key: "kidneyProblem",
		label: "Kidney Problem",
		medicineLabel: "Medicine name",
	},
	{ key: "jaundice", label: "Jaundice", medicineLabel: "Medicine name" },
	{ key: "anemia", label: "Anemia", medicineLabel: "Medicine name" },
	{
		key: "epilepsy",
		label: "Epilepsy / Seizure",
		medicineLabel: "Medicine name",
	},
	{ key: "hemophilia", label: "Hemophilia", medicineLabel: "Medicine name" },
	{ key: "thalassemia", label: "Thalassemia", medicineLabel: "Medicine name" },
	{ key: "aids", label: "HIV / AIDS", medicineLabel: "Medicine name" },
	{
		key: "mentalIllness",
		label: "Mental Illness",
		medicineLabel: "Medicine name",
	},
	{
		key: "sleepDisorder",
		label: "Sleep Disorder (Insomnia / Hypersomnia)",
		medicineLabel: "Medicine name",
	},
	{
		key: "anxiety",
		label: "Anxiety / Depression",
		medicineLabel: "Medicine name",
	},
	{ key: "stroke", label: "Stroke", medicineLabel: "Medicine name" },
	{
		key: "previousSurgery",
		label: "Previous Surgery",
		medicineLabel: "Surgery details",
	},
];

const DRUG_ALLERGIES = [
	{ key: "penicillin", label: "Penicillin" },
	{ key: "sulfur", label: "Sulfur / Sulfa" },
	{ key: "aspirin", label: "Aspirin" },
	{ key: "anesthesia", label: "Anesthesia" },
];

const HABITS = [
	{ key: "smoking", label: "Cigarette / Smoking" },
	{ key: "paan", label: "Paan (Betel Leaf)" },
	{ key: "tobacco", label: "Tobacco (Jorda)" },
];

function initConditions(): Record<string, ConditionEntry> {
	return Object.fromEntries(
		MEDICAL_CONDITIONS.map((c) => [c.key, { has: false, medicine: "" }]),
	);
}

function initRecord(keys: string[]): Record<string, boolean> {
	return Object.fromEntries(keys.map((k) => [k, false]));
}

// ─── Stepper ───────────────────────────────────────────────────────────────────

const STEPS = [
	{ label: "Basic Info", icon: User },
	{ label: "Medical Info", icon: HeartPulse },
	{ label: "Review", icon: ClipboardList },
];

function Stepper({ current }: { current: number }) {
	return (
		<div className="flex items-center mb-8">
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
									!done &&
										!active &&
										"border-input bg-background text-muted-foreground",
								)}
							>
								{done ? (
									<Check className="size-4" />
								) : (
									<Icon className="size-4" />
								)}
							</div>
							<span
								className={cn(
									"text-xs font-medium",
									active
										? "text-primary"
										: done
											? "text-foreground"
											: "text-muted-foreground",
								)}
							>
								{step.label}
							</span>
						</div>
						{i < STEPS.length - 1 && (
							<div
								className={cn(
									"h-0.5 flex-1 mx-2 mb-4 transition-colors",
									i < current ? "bg-primary" : "bg-border",
								)}
							/>
						)}
					</div>
				);
			})}
		</div>
	);
}

// ─── Review helpers ─────────────────────────────────────────────────────────────

function ReviewItem({ label, value }: { label: string; value?: string }) {
	if (!value) return null;
	return (
		<div className="flex flex-col gap-0.5">
			<span className="text-xs text-muted-foreground">{label}</span>
			<span className="text-sm font-medium text-foreground wrap-break-word">
				{value}
			</span>
		</div>
	);
}

function ReviewCard({
	title,
	icon,
	children,
	accent = "default",
}: {
	title: string;
	icon: React.ReactNode;
	children: React.ReactNode;
	accent?: "default" | "warning" | "danger" | "info";
}) {
	const colors = {
		default: "bg-muted/40 border-border text-foreground",
		warning: "bg-amber-50 border-amber-200 text-amber-800",
		danger: "bg-red-50 border-red-200 text-red-800",
		info: "bg-blue-50 border-blue-200 text-blue-800",
	};
	return (
		<div className="rounded-xl border border-border bg-background shadow-sm overflow-hidden mb-4">
			<div
				className={cn(
					"flex items-center gap-2 px-4 py-2.5 border-b border-border/60",
					colors[accent],
				)}
			>
				<span className="[&_svg]:size-4">{icon}</span>
				<span className="text-sm font-semibold">{title}</span>
			</div>
			<div className="px-4 py-3">{children}</div>
		</div>
	);
}

// ─── Condition Toggle Row ───────────────────────────────────────────────────────

function ConditionRow({
	conditionKey,
	label,
	medicineLabel = "Medicine name",
	entry,
	onChange,
	children,
}: {
	conditionKey: string;
	label: string;
	medicineLabel?: string;
	entry: ConditionEntry;
	onChange: (key: string, value: ConditionEntry) => void;
	children?: React.ReactNode;
}) {
	return (
		<div className="rounded-lg border border-border bg-background">
			<div
				className="flex items-center justify-between gap-3 px-3 py-2.5 cursor-pointer select-none"
				onClick={() => onChange(conditionKey, { ...entry, has: !entry.has })}
			>
				<span className="text-sm font-medium">{label}</span>
				<Switch
					checked={entry.has}
					onChange={(val) => onChange(conditionKey, { ...entry, has: val })}
				/>
			</div>
			{entry.has && (
				<div className="px-3 pb-3 pt-2 border-t border-border/60 space-y-2">
					<Input
						placeholder={medicineLabel}
						value={entry.medicine}
						onChange={(e) =>
							onChange(conditionKey, { ...entry, medicine: e.target.value })
						}
					/>
					{children}
				</div>
			)}
		</div>
	);
}

// ─── Page ───────────────────────────────────────────────────────────────────────

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
		conditions: initConditions(),
		diabetesBeforeMeal: "",
		diabetesAfterMeal: "",
		drugAllergies: initRecord(DRUG_ALLERGIES.map((d) => d.key)),
		drugAllergyOther: "",
		currentMedicines: "",
		habits: initRecord(HABITS.map((h) => h.key)),
		habitsOther: "",
		dentalCurrentProblem: "",
		dentalPreviousTreatment: false,
		dentalPreviousNotes: "",
		isMarried: "",
		menstruation: "",
		isPregnant: "",
		pregnancyMonths: "",
		isBreastfeeding: "",
		birthControl: "",
		fertilityTreatment: "",
	});

	function setB<K extends keyof BasicInfo>(key: K, val: BasicInfo[K]) {
		setBasic((prev) => ({ ...prev, [key]: val }));
	}

	function setM<K extends keyof MedicalInfo>(key: K, val: MedicalInfo[K]) {
		setMedical((prev) => ({ ...prev, [key]: val }));
	}

	function updateCondition(key: string, entry: ConditionEntry) {
		setMedical((prev) => ({
			...prev,
			conditions: { ...prev.conditions, [key]: entry },
		}));
	}

	function toggleDrugAllergy(key: string, val: boolean) {
		setMedical((prev) => ({
			...prev,
			drugAllergies: { ...prev.drugAllergies, [key]: val },
		}));
	}

	function toggleHabit(key: string, val: boolean) {
		setMedical((prev) => ({
			...prev,
			habits: { ...prev.habits, [key]: val },
		}));
	}

	async function handleSubmit() {
		setLoading(true);
		try {
			console.log("Creating patient:", { basic, medical });
			router.push("/admin/patients");
		} finally {
			setLoading(false);
		}
	}

	const isWoman = basic.gender === "female";

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

			{/* ── Step 1: Basic Info ─────────────────────────────────────────────── */}
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
								options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
									(v) => ({ label: v, value: v }),
								)}
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
						<div
							className="flex items-center justify-between mb-3 cursor-pointer select-none"
							onClick={() => setB("isChildPatient", !basic.isChildPatient)}
						>
							<span className="text-sm font-semibold">Child Patient</span>
							<Switch
								checked={basic.isChildPatient}
								onChange={(val) => setB("isChildPatient", val)}
							/>
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
									label="Relation"
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

			{/* ── Step 2: Medical Info ───────────────────────────────────────────── */}
			{step === 1 && (
				<div className="space-y-8">
					{/* A. Medical Conditions */}
					<section>
						<h2 className="text-base font-semibold mb-1">Medical Conditions</h2>
						<p className="text-xs text-muted-foreground mb-3">
							Tick any condition that applies. A medicine field will appear to
							record what the patient is taking.
						</p>
						<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
							{MEDICAL_CONDITIONS.map((cond) => (
								<ConditionRow
									key={cond.key}
									conditionKey={cond.key}
									label={cond.label}
									medicineLabel={cond.medicineLabel}
									entry={medical.conditions[cond.key]}
									onChange={updateCondition}
								>
									{/* Extra fields for diabetes */}
									{cond.key === "diabetes" &&
										medical.conditions.diabetes.has && (
											<div className="grid grid-cols-2 gap-2 mt-2">
												<Input
													placeholder="Before meal (mmol/L)"
													value={medical.diabetesBeforeMeal}
													onChange={(e) =>
														setM("diabetesBeforeMeal", e.target.value)
													}
												/>
												<Input
													placeholder="After meal (mmol/L)"
													value={medical.diabetesAfterMeal}
													onChange={(e) =>
														setM("diabetesAfterMeal", e.target.value)
													}
												/>
											</div>
										)}
								</ConditionRow>
							))}
						</div>
					</section>

					{/* B. Drug Allergies */}
					<section>
						<h2 className="text-base font-semibold mb-3">Drug Allergies</h2>
						<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 mb-3">
							{DRUG_ALLERGIES.map((d) => (
								<div
									key={d.key}
									onClick={() =>
										toggleDrugAllergy(d.key, !medical.drugAllergies[d.key])
									}
									className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5 cursor-pointer hover:bg-muted/40 transition-colors select-none"
								>
									<span className="text-sm">{d.label}</span>
									<Switch
										checked={medical.drugAllergies[d.key]}
										onChange={(val) => toggleDrugAllergy(d.key, val)}
									/>
								</div>
							))}
						</div>
						<Input
							placeholder="Any other allergy or adverse reaction (describe)..."
							value={medical.drugAllergyOther}
							onChange={(e) => setM("drugAllergyOther", e.target.value)}
						/>
					</section>

					{/* C. Current Medications */}
					<section>
						<h2 className="text-base font-semibold mb-3">
							Current Medications
						</h2>
						<Textarea
							placeholder="List all medicines currently being taken..."
							value={medical.currentMedicines}
							onChange={(e) => setM("currentMedicines", e.target.value)}
							rows={3}
						/>
					</section>

					{/* D. Habits */}
					<section>
						<h2 className="text-base font-semibold mb-3">
							Habits / Addictions
						</h2>
						<div className="grid grid-cols-1 gap-2 sm:grid-cols-3 mb-3">
							{HABITS.map((h) => (
								<div
									key={h.key}
									onClick={() => toggleHabit(h.key, !medical.habits[h.key])}
									className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5 cursor-pointer hover:bg-muted/40 transition-colors select-none"
								>
									<span className="text-sm">{h.label}</span>
									<Switch
										checked={medical.habits[h.key]}
										onChange={(val) => toggleHabit(h.key, val)}
									/>
								</div>
							))}
						</div>
						<Input
							placeholder="Other substances (describe)..."
							value={medical.habitsOther}
							onChange={(e) => setM("habitsOther", e.target.value)}
						/>
					</section>

					{/* E. Dental History */}
					<section>
						<h2 className="text-base font-semibold mb-3">Dental History</h2>
						<div
							className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5 cursor-pointer hover:bg-muted/40 transition-colors select-none mb-3"
							onClick={() =>
								setM(
									"dentalPreviousTreatment",
									!medical.dentalPreviousTreatment,
								)
							}
						>
							<span className="text-sm font-medium">
								Had previous dental treatment
							</span>
							<Switch
								checked={medical.dentalPreviousTreatment}
								onChange={(val) => setM("dentalPreviousTreatment", val)}
							/>
						</div>
						{medical.dentalPreviousTreatment && (
							<div className="mb-3">
								<Textarea
									label="Previous Dental Treatment Notes"
									placeholder="Describe previous dental treatments..."
									value={medical.dentalPreviousNotes}
									onChange={(e) => setM("dentalPreviousNotes", e.target.value)}
									rows={2}
								/>
							</div>
						)}
						<Textarea
							label="Current Dental Problem"
							placeholder="Describe current dental complaints..."
							value={medical.dentalCurrentProblem}
							onChange={(e) => setM("dentalCurrentProblem", e.target.value)}
							rows={3}
						/>
					</section>

					{/* F. Women Only */}
					{isWoman && (
						<section>
							<h2 className="text-base font-semibold mb-3">For Women Only</h2>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<Select
									label="Married?"
									id="isMarried"
									value={medical.isMarried}
									onChange={(e) => setM("isMarried", e.target.value)}
									options={[
										{ label: "Yes", value: "yes" },
										{ label: "No", value: "no" },
									]}
									placeholder="Select"
								/>
								<Select
									label="Menstruation"
									id="menstruation"
									value={medical.menstruation}
									onChange={(e) => setM("menstruation", e.target.value)}
									options={[
										{ label: "Regular", value: "regular" },
										{ label: "Irregular", value: "irregular" },
									]}
									placeholder="Select"
								/>
								<Select
									label="Pregnant?"
									id="isPregnant"
									value={medical.isPregnant}
									onChange={(e) => setM("isPregnant", e.target.value)}
									options={[
										{ label: "Yes", value: "yes" },
										{ label: "No", value: "no" },
									]}
									placeholder="Select"
								/>
								{medical.isPregnant === "yes" && (
									<Input
										label="Pregnancy (months)"
										id="pregnancyMonths"
										type="number"
										placeholder="How many months?"
										value={medical.pregnancyMonths}
										onChange={(e) => setM("pregnancyMonths", e.target.value)}
									/>
								)}
								<Select
									label="Breastfeeding?"
									id="isBreastfeeding"
									value={medical.isBreastfeeding}
									onChange={(e) => setM("isBreastfeeding", e.target.value)}
									options={[
										{ label: "Yes", value: "yes" },
										{ label: "No", value: "no" },
									]}
									placeholder="Select"
								/>
								<Select
									label="Using birth control?"
									id="birthControl"
									value={medical.birthControl}
									onChange={(e) => setM("birthControl", e.target.value)}
									options={[
										{ label: "Yes", value: "yes" },
										{ label: "No", value: "no" },
									]}
									placeholder="Select"
								/>
								<Select
									label="Taking fertility treatment?"
									id="fertilityTreatment"
									value={medical.fertilityTreatment}
									onChange={(e) => setM("fertilityTreatment", e.target.value)}
									options={[
										{ label: "Yes", value: "yes" },
										{ label: "No", value: "no" },
									]}
									placeholder="Select"
								/>
							</div>
						</section>
					)}
				</div>
			)}

			{/* ── Step 3: Review ─────────────────────────────────────────────────── */}
			{step === 2 && (
				<div>
					{/* Patient summary header */}
					<div className="flex items-center gap-4 rounded-xl border border-border bg-linearß-to-r from-primary/5 to-background p-4 mb-6">
						<div className="size-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
							<span className="text-primary font-bold text-xl">
								{basic.fullName.trim()
									? basic.fullName
											.trim()
											.split(" ")
											.map((w) => w[0])
											.slice(0, 2)
											.join("")
											.toUpperCase()
									: "?"}
							</span>
						</div>
						<div className="min-w-0">
							<h2 className="text-lg font-bold text-foreground truncate">
								{basic.fullName || (
									<span className="text-muted-foreground italic text-base font-normal">
										No name entered
									</span>
								)}
							</h2>
							<div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
								{basic.gender && (
									<span className="text-xs text-muted-foreground capitalize">
										{basic.gender}
									</span>
								)}
								{basic.dateOfBirth && (
									<span className="text-xs text-muted-foreground">
										DOB: {basic.dateOfBirth}
									</span>
								)}
								{basic.bloodGroup && (
									<span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
										{basic.bloodGroup}
									</span>
								)}
								{basic.isChildPatient && (
									<span className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
										Child Patient
									</span>
								)}
							</div>
						</div>
					</div>

					{/* Contact */}
					<ReviewCard title="Contact Details" icon={<Phone />}>
						<div className="grid grid-cols-2 gap-x-6 gap-y-3">
							<ReviewItem label="Phone" value={basic.phone} />
							<ReviewItem label="Email" value={basic.email} />
							<ReviewItem label="Phone 2" value={basic.phone2} />
							<ReviewItem label="WhatsApp" value={basic.whatsapp} />
						</div>
						{basic.address && (
							<div className="flex items-start gap-2 mt-3 pt-3 border-t border-border/50">
								<MapPin className="size-3.5 text-muted-foreground mt-0.5 shrink-0" />
								<span className="text-sm text-foreground">{basic.address}</span>
							</div>
						)}
					</ReviewCard>

					{/* Guardian */}
					{basic.isChildPatient &&
						(basic.guardianName || basic.guardianPhone) && (
							<ReviewCard title="Guardian" icon={<Baby />} accent="warning">
								<div className="grid grid-cols-2 gap-x-6 gap-y-3">
									<ReviewItem label="Name" value={basic.guardianName} />
									<ReviewItem label="Relation" value={basic.guardianRelation} />
									<ReviewItem label="Phone" value={basic.guardianPhone} />
								</div>
							</ReviewCard>
						)}

					{/* Emergency */}
					{(basic.emergencyName || basic.emergencyPhone) && (
						<ReviewCard title="Emergency Contact" icon={<Users />}>
							<div className="grid grid-cols-2 gap-x-6 gap-y-3">
								<ReviewItem label="Name" value={basic.emergencyName} />
								<ReviewItem label="Relation" value={basic.emergencyRelation} />
								<ReviewItem label="Phone" value={basic.emergencyPhone} />
							</div>
						</ReviewCard>
					)}

					{/* Medical conditions */}
					{MEDICAL_CONDITIONS.some((c) => medical.conditions[c.key].has) && (
						<ReviewCard
							title="Medical Conditions"
							icon={<Activity />}
							accent="warning"
						>
							<div className="space-y-2.5">
								{MEDICAL_CONDITIONS.filter(
									(c) => medical.conditions[c.key].has,
								).map((c) => (
									<div
										key={c.key}
										className="flex items-start gap-3 pb-2.5 border-b border-border/40 last:border-0 last:pb-0"
									>
										<span className="mt-1.5 size-2 rounded-full bg-amber-500 shrink-0" />
										<div className="min-w-0">
											<p className="text-sm font-medium text-foreground">
												{c.label}
											</p>
											{medical.conditions[c.key].medicine && (
												<p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
													<Pill className="size-3" />
													{medical.conditions[c.key].medicine}
												</p>
											)}
											{c.key === "diabetes" &&
												(medical.diabetesBeforeMeal ||
													medical.diabetesAfterMeal) && (
													<p className="text-xs text-muted-foreground mt-0.5">
														Before meal:{" "}
														<strong>{medical.diabetesBeforeMeal || "—"}</strong>{" "}
														&nbsp;|&nbsp; After meal:{" "}
														<strong>{medical.diabetesAfterMeal || "—"}</strong>
													</p>
												)}
										</div>
									</div>
								))}
							</div>
						</ReviewCard>
					)}

					{/* Drug allergies */}
					{(Object.values(medical.drugAllergies).some(Boolean) ||
						medical.drugAllergyOther) && (
						<ReviewCard
							title="Drug Allergies"
							icon={<ShieldAlert />}
							accent="danger"
						>
							<div className="flex flex-wrap gap-2">
								{DRUG_ALLERGIES.filter((d) => medical.drugAllergies[d.key]).map(
									(d) => (
										<span
											key={d.key}
											className="text-xs font-medium px-2.5 py-1 rounded-full bg-red-100 text-red-700 border border-red-200"
										>
											{d.label}
										</span>
									),
								)}
								{medical.drugAllergyOther && (
									<span className="text-xs font-medium px-2.5 py-1 rounded-full bg-red-100 text-red-700 border border-red-200">
										{medical.drugAllergyOther}
									</span>
								)}
							</div>
						</ReviewCard>
					)}

					{/* Current medications */}
					{medical.currentMedicines && (
						<ReviewCard
							title="Current Medications"
							icon={<Pill />}
							accent="info"
						>
							<p className="text-sm text-foreground whitespace-pre-wrap">
								{medical.currentMedicines}
							</p>
						</ReviewCard>
					)}

					{/* Habits */}
					{(Object.values(medical.habits).some(Boolean) ||
						medical.habitsOther) && (
						<ReviewCard title="Habits / Addictions" icon={<Cigarette />}>
							<div className="flex flex-wrap gap-2">
								{HABITS.filter((h) => medical.habits[h.key]).map((h) => (
									<span
										key={h.key}
										className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-border"
									>
										{h.label}
									</span>
								))}
								{medical.habitsOther && (
									<span className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
										{medical.habitsOther}
									</span>
								)}
							</div>
						</ReviewCard>
					)}

					{/* Dental history */}
					{(medical.dentalPreviousTreatment ||
						medical.dentalCurrentProblem) && (
						<ReviewCard title="Dental History" icon={<Stethoscope />}>
							<div className="space-y-2.5">
								{medical.dentalPreviousTreatment && (
									<div>
										<p className="text-xs text-muted-foreground mb-0.5">
											Previous Treatment
										</p>
										<p className="text-sm font-medium">
											Yes
											{medical.dentalPreviousNotes
												? ` — ${medical.dentalPreviousNotes}`
												: ""}
										</p>
									</div>
								)}
								{medical.dentalCurrentProblem && (
									<div
										className={
											medical.dentalPreviousTreatment
												? "pt-2.5 border-t border-border/40"
												: ""
										}
									>
										<p className="text-xs text-muted-foreground mb-0.5">
											Current Problem
										</p>
										<p className="text-sm">{medical.dentalCurrentProblem}</p>
									</div>
								)}
							</div>
						</ReviewCard>
					)}

					{/* Women's health */}
					{isWoman && (
						<ReviewCard title="Women's Health" icon={<Venus />} accent="info">
							<div className="grid grid-cols-2 gap-x-6 gap-y-3">
								<ReviewItem label="Married" value={medical.isMarried} />
								<ReviewItem label="Menstruation" value={medical.menstruation} />
								<ReviewItem label="Pregnant" value={medical.isPregnant} />
								{medical.isPregnant === "yes" && (
									<ReviewItem
										label="Pregnancy Months"
										value={medical.pregnancyMonths}
									/>
								)}
								<ReviewItem
									label="Breastfeeding"
									value={medical.isBreastfeeding}
								/>
								<ReviewItem
									label="Birth Control"
									value={medical.birthControl}
								/>
								<ReviewItem
									label="Fertility Treatment"
									value={medical.fertilityTreatment}
								/>
							</div>
						</ReviewCard>
					)}
				</div>
			)}

			{/* ── Navigation ─────────────────────────────────────────────────────── */}
			<div className="flex justify-between mt-8 pt-4 border-t border-border">
				<Button
					variant="outline"
					onClick={() =>
						step === 0 ? router.push("/admin/patients") : setStep((s) => s - 1)
					}
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
