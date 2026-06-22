"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, Stethoscope } from "lucide-react";
import { Button } from "@/ui/button";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Doctors", href: "/#doctors" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-primary text-lg">
          <Stethoscope className="size-6" />
          DentalCare
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+8801700000000"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <Phone className="size-4" />
            +880 1700-000000
          </a>
          <Link href="/sign-in">
            <Button variant="outline" size="sm">Login</Button>
          </Link>
          <Link href="/appointment">
            <Button size="sm">Book Appointment</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-muted-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-border bg-white px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 text-sm font-medium text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2 pt-3">
            <Link href="/sign-in" onClick={() => setMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full">Login</Button>
            </Link>
            <Link href="/appointment" onClick={() => setMenuOpen(false)}>
              <Button size="sm" className="w-full">Book Appointment</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
