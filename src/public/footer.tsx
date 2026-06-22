import Link from "next/link";
import { Stethoscope, Phone, Mail, MapPin, Globe, Share2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-gray-50">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-primary text-lg">
              <Stethoscope className="size-6" />
              DentalCare
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Professional dental care for the whole family. We provide quality treatments with a gentle touch.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary">
                <Globe className="size-5" />
              </a>
              <a href="#" aria-label="Social" className="text-muted-foreground hover:text-primary">
                <Share2 className="size-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Quick Links</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              {[
                { label: "Home", href: "/" },
                { label: "Services", href: "/#services" },
                { label: "Our Doctors", href: "/#doctors" },
                { label: "Book Appointment", href: "/appointment" },
                { label: "Patient Login", href: "/sign-in" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Services</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              {["General Dentistry", "Orthodontics", "Cosmetic Dentistry", "Periodontics", "Oral Surgery", "Dental Implants"].map((s) => (
                <li key={s}>
                  <Link href="/#services" className="hover:text-primary transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Contact Us</h4>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="size-4 mt-0.5 shrink-0 text-primary" />
                123 Main Street, Dhaka, Bangladesh
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-primary" />
                +880 1700-000000
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-primary" />
                info@dentalcare.com
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-xs font-medium text-foreground mb-1">Opening Hours</p>
              <p className="text-xs text-muted-foreground">Sat–Thu: 9:00 AM – 6:00 PM</p>
              <p className="text-xs text-muted-foreground">Friday: Closed</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border bg-white py-4">
        <div className="container flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} DentalCare. All rights reserved.</p>
          <p>Developed with care for better dental health</p>
        </div>
      </div>
    </footer>
  );
}
