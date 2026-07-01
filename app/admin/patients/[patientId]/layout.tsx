import {
	ArrowLeft,
	Calendar,
	Download,
	MessageCircle,
	MessageSquare,
	Pencil,
	Phone,
	User,
} from "lucide-react";
import Link from "next/link";

function initials(name: string) {
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
}

const ACTION_ICONS = [
	{ label: "WhatsApp", icon: MessageCircle },
	{ label: "Download", icon: Download },
	{ label: "Message", icon: MessageSquare },
	{ label: "Schedule", icon: Calendar },
	{ label: "Call", icon: Phone },
];

export default async function PatientLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ patientId: string }>;
}) {
	const { patientId } = await params;

	// TODO: fetch real patient from DB
	const patient = { name: "John Doe", phone: "+880 1712-345678" };
	const rawPhone = patient.phone.replace(/\D/g, "");

	const ACTION_HREFS: Record<string, string> = {
		WhatsApp: `https://wa.me/${rawPhone}`,
		Download: "#",
		Message: `sms:${patient.phone}`,
		Schedule: `/admin/appointments/new?patientId=${patientId}`,
		Call: `tel:${patient.phone}`,
	};

	return (
		<div className="flex flex-col -m-4 lg:-m-6 h-[calc(100%+2rem)] lg:h-[calc(100%+3rem)]">
			{/* ── Sticky header ────────────────────────────────────────────────────── */}
			<div className="sticky top-0 z-10 shrink-0">
				{/* Green identity section — extra pb so buttons have a green backdrop */}
				<div className="relative bg-primary px-4 lg:px-6 pt-4 pb-16 rounded-b-4xl">
					{/* Top row: back + edit */}
					<div className="flex items-center justify-between mb-4">
						<Link
							href="/admin/patients"
							className="flex items-center gap-1.5 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors"
						>
							<ArrowLeft className="size-4" />
							Patients
						</Link>
						<Link
							href={`/admin/patients/${patientId}/edit`}
							className="flex items-center gap-1.5 text-sm font-medium text-primary-foreground border border-primary-foreground/40 rounded-md px-2.5 py-1 hover:bg-primary-foreground/10 transition-colors"
						>
							<Pencil className="size-3.5" />
							Edit
						</Link>
					</div>

					{/* Patient identity */}
					<div className="flex items-center gap-4">
						<div className="size-16 rounded-full bg-primary-foreground/20 border-2 border-primary-foreground/30 flex items-center justify-center shrink-0">
							{patient.name ? (
								<span className="text-xl font-bold text-primary-foreground select-none">
									{initials(patient.name)}
								</span>
							) : (
								<User className="size-8 text-primary-foreground/70" />
							)}
						</div>
						<div className="min-w-0">
							<h1 className="text-xl font-bold text-primary-foreground leading-tight truncate">
								{patient.name}
							</h1>
							<p className="text-sm text-primary-foreground/75 mt-0.5">
								{patient.phone}
							</p>
						</div>
					</div>

					{/* ── Action buttons — centred on green/white boundary ── */}
					<div className="absolute -bottom-10 left-0 right-0 flex justify-around px-4 z-10">
						{ACTION_ICONS.map(({ label, icon: Icon }) => (
							<a
								key={label}
								href={ACTION_HREFS[label]}
								target={
									["WhatsApp", "Call", "Message"].includes(label)
										? "_blank"
										: undefined
								}
								rel="noopener noreferrer"
								className="flex flex-col items-center gap-1.5 group"
							>
								<div className="size-14 rounded-full bg-foreground border-2 border-background flex items-center justify-center shadow-lg group-hover:bg-primary transition-colors">
									<Icon className="size-5 text-background" />
								</div>
								<span className="text-[11px] font-semibold text-foreground">
									{label}
								</span>
							</a>
						))}
					</div>
				</div>
			</div>

			{/* ── Scrollable tab content ────────────────────────────────────────── */}
			<div className="mt-16 flex-1 min-h-0 overflow-y-auto bg-secondary/30 px-4 lg:px-6 py-5">
				{children}
			</div>
		</div>
	);
}
