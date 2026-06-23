import type { Metadata } from "next";
import { Hind_Siliguri, Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/lib/language-context";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-bn",
  subsets: ["latin", "bengali"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DentalCare — Dental Management System",
  description: "Professional dental clinic management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${hindSiliguri.variable}`}>
      <body className="min-h-screen antialiased">
        <LanguageProvider>
          {children}
          <Toaster richColors position="top-right" />
        </LanguageProvider>
      </body>
    </html>
  );
}
