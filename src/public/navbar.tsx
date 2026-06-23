"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, Stethoscope, Globe } from "lucide-react";
import { Button } from "@/ui/button";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home",     labelBn: "হোম",      href: "/" },
  { label: "Services", labelBn: "সেবাসমূহ", href: "/#services" },
  { label: "Doctors",  labelBn: "চিকিৎসক",  href: "/#doctors" },
  { label: "Contact",  labelBn: "যোগাযোগ",  href: "/#contact" },
];

function LangToggle() {
  const { lang, toggle } = useLanguage();
  return (
    <button
      onClick={toggle}
      title={lang === "en" ? "বাংলায় পরিবর্তন করুন" : "Switch to English"}
      className={cn(
        "flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5",
        "text-xs font-semibold text-muted-foreground transition-colors",
        "hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
      )}
    >
      <Globe className="size-3.5 shrink-0" />
      {lang === "en" ? "বাং" : "EN"}
    </button>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-primary text-lg">
          <Stethoscope className="size-6 shrink-0" />
          {lang === "bn" ? "ডেন্টালকেয়ার" : "DentalCare"}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {lang === "bn" ? link.labelBn : link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop right side */}
        <div className="hidden lg:flex items-center gap-3">
          <LangToggle />
          <a
            href="tel:+8801700000000"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <Phone className="size-4 shrink-0" />
            +880 1700-000000
          </a>
          <Link href="/sign-in">
            <Button variant="outline" size="sm">
              {lang === "bn" ? "লগইন" : "Login"}
            </Button>
          </Link>
          <Link href="/appointment">
            <Button size="sm">
              {lang === "bn" ? "অ্যাপয়েন্টমেন্ট বুক করুন" : "Book Appointment"}
            </Button>
          </Link>
        </div>

        {/* Mobile: lang toggle + hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <LangToggle />
          <button
            className="p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-border bg-white px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {lang === "bn" ? link.labelBn : link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2 pt-3 border-t border-border mt-2">
            <Link href="/sign-in" onClick={() => setMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full">
                {lang === "bn" ? "লগইন" : "Login"}
              </Button>
            </Link>
            <Link href="/appointment" onClick={() => setMenuOpen(false)}>
              <Button size="sm" className="w-full">
                {lang === "bn" ? "অ্যাপয়েন্টমেন্ট বুক করুন" : "Book Appointment"}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
