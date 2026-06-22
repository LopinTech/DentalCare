import { Stethoscope } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-primary p-12 text-white">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Stethoscope className="size-7" />
          DentalCare
        </Link>
        <div>
          <h2 className="text-4xl font-bold leading-tight mb-4">
            Your Smile,<br />Our Priority
          </h2>
          <p className="text-white/80 text-lg leading-relaxed">
            Professional dental care with a gentle touch. Book appointments, track treatments, and manage your dental health all in one place.
          </p>
        </div>
        <p className="text-white/60 text-sm">
          © {new Date().getFullYear()} DentalCare. All rights reserved.
        </p>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center bg-background p-6">
        {children}
      </div>
    </div>
  );
}
