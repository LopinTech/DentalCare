"use client";

import Link from "next/link";
import { useState } from "react";
import {
	Stethoscope,
	Smile,
	Sparkles,
	Activity,
	Scissors,
	Cylinder,
	CalendarCheck,
	UserCheck,
	HeartPulse,
	ShieldCheck,
	Zap,
	DollarSign,
	Hand,
	ChevronDown,
	ArrowRight,
} from "lucide-react";
import { Button } from "@/ui/button";

/* ─────────────────────────── SERVICES ─────────────────────────── */

const SERVICES = [
	{
		icon: Stethoscope,
		name: "General Dentistry",
		description:
			"Routine check-ups, fillings, and preventive care to keep your teeth healthy for life.",
	},
	{
		icon: Smile,
		name: "Orthodontics",
		description:
			"Braces and clear aligners that straighten teeth discreetly and comfortably at any age.",
	},
	{
		icon: Sparkles,
		name: "Cosmetic Dentistry",
		description:
			"Whitening, veneers, and bonding to give you the confident smile you have always wanted.",
	},
	{
		icon: Activity,
		name: "Periodontics",
		description:
			"Gum disease diagnosis and treatment to protect the foundation your teeth rest on.",
	},
	{
		icon: Scissors,
		name: "Oral Surgery",
		description:
			"Extractions and surgical procedures performed with precision and minimal discomfort.",
	},
	{
		icon: Cylinder,
		name: "Dental Implants",
		description:
			"Permanent, natural-looking replacements that restore full function and aesthetics.",
	},
];

/* ─────────────────────────── FAQ ─────────────────────────────── */

const FAQ_ITEMS = [
	{
		q: "How do I book an appointment?",
		a: "Click the 'Book Appointment' button anywhere on the page, choose your preferred date and service, and we will confirm your slot within 2 hours.",
	},
	{
		q: "Do you accept walk-in patients?",
		a: "Yes, we accommodate walk-ins during less busy hours. That said, booking ahead guarantees your preferred doctor and avoids waiting.",
	},
	{
		q: "Is the first consultation free?",
		a: "We offer a complimentary initial check-up for new patients. Any diagnostic imaging or treatment carries a separate fee that we discuss upfront.",
	},
	{
		q: "What age groups do you treat?",
		a: "Everyone from young children to seniors. Our pediatric-trained staff make first visits calm and reassuring for younger patients.",
	},
	{
		q: "How often should I come for a check-up?",
		a: "Most people benefit from a visit every six months. Patients with active gum disease or a history of cavities may need to come more frequently.",
	},
];

/* ─────────────────────── FAQ ACCORDION ────────────────────────── */

function FaqAccordion() {
	const [open, setOpen] = useState<number | null>(null);

	return (
		<div className="divide-y divide-[#e5e7eb]">
			{FAQ_ITEMS.map((item, i) => (
				<div key={i}>
					<button
						className="flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-medium text-[#111827] hover:text-[#16a34a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a]/50 rounded"
						onClick={() => setOpen(open === i ? null : i)}
						aria-expanded={open === i}
					>
						<span className="text-base font-semibold">{item.q}</span>
						<ChevronDown
							className={`size-5 shrink-0 text-[#16a34a] transition-transform duration-200 ${
								open === i ? "rotate-180" : ""
							}`}
						/>
					</button>
					{open === i && (
						<p className="pb-5 text-sm leading-relaxed text-[#6b7280]">
							{item.a}
						</p>
					)}
				</div>
			))}
		</div>
	);
}

/* ─────────────────────────── PAGE ─────────────────────────────── */

export default function LandingPage() {
	return (
		<>
			{/* ── HERO ─────────────────────────────────────────────────── */}
			<section className="relative overflow-hidden bg-white">
				{/* Decorative tooth silhouette — the aesthetic risk:
            a large abstract molar outline sits behind the headline
            as a watermark, giving the page art direction without
            relying on photography. */}
				<svg
					aria-hidden="true"
					className="pointer-events-none absolute -right-24 -top-16 w-140 opacity-[0.045] select-none hidden lg:block"
					viewBox="0 0 400 420"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					{/* Abstract molar: two rounded bumps on top, rounded base */}
					<path
						d="M80 80 Q80 20 140 20 Q170 20 200 50 Q230 20 260 20 Q320 20 320 80
               Q340 100 340 140 Q340 180 320 220 L300 320 Q290 390 200 390
               Q110 390 100 320 L80 220 Q60 180 60 140 Q60 100 80 80 Z"
						fill="#16a34a"
					/>
					{/* Root lines */}
					<path
						d="M155 320 Q150 370 140 390"
						stroke="#16a34a"
						strokeWidth="18"
						strokeLinecap="round"
					/>
					<path
						d="M200 330 Q200 370 200 395"
						stroke="#16a34a"
						strokeWidth="18"
						strokeLinecap="round"
					/>
					<path
						d="M245 320 Q250 370 260 390"
						stroke="#16a34a"
						strokeWidth="18"
						strokeLinecap="round"
					/>
				</svg>

				{/* Green accent bar — a deliberate geometric cut, not a gradient blob */}
				<div
					aria-hidden="true"
					className="absolute bottom-0 left-0 h-1.5 w-full bg-[#16a34a]"
				/>

				<div className="container relative py-24 lg:py-32">
					{/* Eyebrow */}
					<p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#bbf7d0] bg-[#f0fdf4] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#15803d]">
						<span className="size-1.5 rounded-full bg-[#16a34a] inline-block" />
						Dhaka&apos;s trusted dental clinic
					</p>

					<h1 className="max-w-2xl text-5xl font-extrabold leading-[1.08] tracking-tight text-[#111827] lg:text-6xl xl:text-7xl">
						Your Smile,
						<br />
						<span className="text-[#16a34a]">Our Priority.</span>
					</h1>

					<p className="mt-6 max-w-xl text-lg leading-relaxed text-[#6b7280]">
						From your first check-up to a complete smile transformation — we
						make every visit comfortable, clear, and worth your time.
					</p>

					<div className="mt-10 flex flex-wrap items-center gap-3">
						<Link href="/appointment">
							<Button size="lg" className="gap-2 text-base">
								Book an appointment
								<ArrowRight className="size-4" />
							</Button>
						</Link>
						<Link href="/#services">
							<Button variant="outline" size="lg" className="text-base">
								See our services
							</Button>
						</Link>
					</div>

					{/* Trust bar */}
					<div className="mt-14 flex flex-wrap gap-8 border-t border-[#f3f4f6] pt-8">
						{[
							{ stat: "8+", label: "Years in practice" },
							{ stat: "12,000+", label: "Patients treated" },
							{ stat: "98%", label: "Satisfaction rate" },
							{ stat: "6", label: "Specialist services" },
						].map(({ stat, label }) => (
							<div key={label}>
								<p className="text-2xl font-bold text-[#111827]">{stat}</p>
								<p className="mt-0.5 text-xs text-[#9ca3af]">{label}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── SERVICES ─────────────────────────────────────────────── */}
			<section id="services" className="bg-[#f0fdf4] py-20 lg:py-28">
				<div className="container">
					<div className="mb-12">
						<p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#16a34a]">
							What we treat
						</p>
						<h2 className="text-3xl font-extrabold tracking-tight text-[#111827] lg:text-4xl">
							Six reasons patients come back
						</h2>
						<p className="mt-3 max-w-lg text-[#6b7280]">
							Every service is delivered by a specialist. No referrals, no
							delays — everything under one roof.
						</p>
					</div>

					<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{SERVICES.map(({ icon: Icon, name, description }) => (
							<div
								key={name}
								className="group rounded-2xl border border-[#dcfce7] bg-white p-6 transition-shadow hover:shadow-md"
							>
								<div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-[#f0fdf4] text-[#16a34a] group-hover:bg-[#16a34a] group-hover:text-white transition-colors">
									<Icon className="size-5 stroke-[1.5]" />
								</div>
								<h3 className="mb-2 font-semibold text-[#111827]">{name}</h3>
								<p className="text-sm leading-relaxed text-[#6b7280]">
									{description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── HOW IT WORKS ─────────────────────────────────────────── */}
			<section className="bg-white py-20 lg:py-28">
				<div className="container">
					<div className="mb-12">
						<p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#16a34a]">
							The process
						</p>
						<h2 className="text-3xl font-extrabold tracking-tight text-[#111827] lg:text-4xl">
							Three steps to a healthier smile
						</h2>
					</div>

					<div className="grid gap-8 md:grid-cols-3">
						{[
							{
								icon: CalendarCheck,
								step: "01",
								title: "Book your appointment",
								body: "Choose a date and service online in under two minutes. We confirm your slot the same day.",
							},
							{
								icon: UserCheck,
								step: "02",
								title: "Meet your doctor",
								body: "Your assigned specialist reviews your history, answers your questions, and plans your care — no rush.",
							},
							{
								icon: HeartPulse,
								step: "03",
								title: "Get your treatment",
								body: "We carry out the agreed procedure with modern equipment and follow up to make sure you heal well.",
							},
						].map(({ icon: Icon, step, title, body }) => (
							<div key={step} className="relative">
								{/* Connector line (hidden on mobile) */}
								<div className="hidden md:block absolute top-6 left-[calc(100%-1rem)] w-[calc(100%-2.5rem)] h-px bg-[#d1fae5] z-0" />

								<div className="relative z-10 flex flex-col gap-4">
									<div className="flex items-center gap-3">
										<div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#16a34a] text-white shadow-sm shadow-[#16a34a]/30">
											<Icon className="size-5 stroke-[1.5]" />
										</div>
										<span className="text-xs font-bold tabular-nums text-[#d1d5db]">
											{step}
										</span>
									</div>
									<div>
										<h3 className="mb-1.5 font-semibold text-[#111827]">
											{title}
										</h3>
										<p className="text-sm leading-relaxed text-[#6b7280]">
											{body}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── WHY CHOOSE US ─────────────────────────────────────────── */}
			<section className="bg-[#111827] py-20 lg:py-28">
				<div className="container">
					<div className="mb-12">
						<p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#4ade80]">
							Why patients choose us
						</p>
						<h2 className="text-3xl font-extrabold tracking-tight text-white lg:text-4xl">
							Care you can count on
						</h2>
					</div>

					<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
						{[
							{
								icon: ShieldCheck,
								title: "Experienced doctors",
								body: "Each specialist brings a minimum of 8 years of clinical practice and ongoing training.",
							},
							{
								icon: Zap,
								title: "Modern equipment",
								body: "Digital X-rays, laser therapy, and CAD/CAM same-day crowns — technology that shortens your chair time.",
							},
							{
								icon: DollarSign,
								title: "Transparent pricing",
								body: "Every treatment comes with a written cost estimate. No hidden fees, ever.",
							},
							{
								icon: Hand,
								title: "Gentle care",
								body: "We take your anxiety seriously. Topical numbing, clear explanations, and a stop signal you can use at any time.",
							},
						].map(({ icon: Icon, title, body }) => (
							<div
								key={title}
								className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors"
							>
								<div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-[#16a34a]/20 text-[#4ade80]">
									<Icon className="size-5 stroke-[1.5]" />
								</div>
								<h3 className="mb-2 font-semibold text-white">{title}</h3>
								<p className="text-sm leading-relaxed text-[#9ca3af]">{body}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── FAQ ──────────────────────────────────────────────────── */}
			<section className="bg-white py-20 lg:py-28">
				<div className="container">
					<div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
						<div>
							<p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#16a34a]">
								Common questions
							</p>
							<h2 className="text-3xl font-extrabold tracking-tight text-[#111827] lg:text-4xl">
								Things patients ask before their first visit
							</h2>
							<p className="mt-4 text-[#6b7280] leading-relaxed">
								Still have a question? Call us at{" "}
								<a
									href="tel:+8801700000000"
									className="font-medium text-[#16a34a] hover:underline"
								>
									+880 1700-000000
								</a>{" "}
								or drop by — we are happy to chat.
							</p>
						</div>
						<FaqAccordion />
					</div>
				</div>
			</section>

			{/* ── CTA BANNER ───────────────────────────────────────────── */}
			<section className="bg-[#16a34a] py-16 lg:py-20">
				<div className="container flex flex-col items-center gap-6 text-center">
					<h2 className="text-3xl font-extrabold tracking-tight text-white lg:text-4xl">
						Ready to get started?
					</h2>
					<p className="max-w-md text-[#bbf7d0] leading-relaxed">
						Book your appointment today — new patients receive a complimentary
						initial check-up.
					</p>
					<Link href="/appointment">
						<button className="inline-flex items-center gap-2 rounded-md border-2 border-white bg-white px-7 py-3 text-base font-semibold text-[#16a34a] transition-colors hover:bg-transparent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
							Book my appointment
							<ArrowRight className="size-4" />
						</button>
					</Link>
				</div>
			</section>
		</>
	);
}
