import "dotenv/config";
import { auth } from "../src/lib/auth";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

type SeedUser = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "doctor" | "patient";
};

const SEED_USERS: SeedUser[] = [
  { name: "Admin", email: "admin@mail.com", password: "password", role: "admin" },
  { name: "Doctor", email: "doctor@mail.com", password: "password", role: "doctor" },
  { name: "Patient", email: "patient@mail.com", password: "password", role: "patient" },
];

async function seedUser(user: SeedUser) {
  const existing = await prisma.user.findUnique({ where: { email: user.email } });
  if (existing) {
    console.log(`  ⏭  Already exists: ${user.email}`);
    return;
  }

  const result = await auth.api.signUpEmail({
    body: { name: user.name, email: user.email, password: user.password },
  });

  if (!result?.user) {
    console.error(`  ✗  Failed to create: ${user.email}`);
    return;
  }

  await prisma.user.update({
    where: { email: user.email },
    data: { role: user.role, emailVerified: true },
  });

  console.log(`  ✅ Created [${user.role}]: ${user.email} / ${user.password}`);
}

// ─── Dental Services ──────────────────────────────────────────────────────────

type SeedService = {
  sortOrder: number;
  name: string;
  slug: string;
  price?: number;
  priceMax?: number;
  priceNote?: string;
  category: string;
};

const SEED_SERVICES: SeedService[] = [
  // ── ADULT (1–42) ────────────────────────────────────────────────────────────
  { sortOrder:  1, name: "Consultancy",                       slug: "consultancy",                category: "adult",   price:    500 },
  { sortOrder:  2, name: "R.P.T. Scaling (Full Mouth)",       slug: "rpt-scaling",                category: "adult",   price:   1500 },
  { sortOrder:  3, name: "T.F. (Temporary Filling)",          slug: "tf-temporary-filling",       category: "adult",   price:    500 },
  { sortOrder:  4, name: "G.I. Filling (Single Surface)",     slug: "gi-filling-single",          category: "adult",   price:    800 },
  { sortOrder:  5, name: "G.I. Filling (Double Surface)",     slug: "gi-filling-double",          category: "adult",   price:   1200 },
  { sortOrder:  6, name: "G.I. Filling (Three+ Surface)",     slug: "gi-filling-triple",          category: "adult",   price:   1500 },
  { sortOrder:  7, name: "Composite Filling (Anterior)",      slug: "composite-filling-anterior", category: "adult",   price:   1200 },
  { sortOrder:  8, name: "Composite Filling (Posterior Single)", slug: "composite-filling-post-single", category: "adult", price: 1500 },
  { sortOrder:  9, name: "Composite Filling (Posterior Double)", slug: "composite-filling-post-double", category: "adult", price: 2000 },
  { sortOrder: 10, name: "Amalgam Filling",                   slug: "amalgam-filling",            category: "adult",   price:    800 },
  { sortOrder: 11, name: "R.C.T. + P.F. (Anterior)",         slug: "rct-pf-anterior",            category: "adult",   price:   4500 },
  { sortOrder: 12, name: "R.C.T. + P.F. (Premolar)",         slug: "rct-pf-premolar",            category: "adult",   price:   5500 },
  { sortOrder: 13, name: "R.C.T. + P.F. (Molar)",            slug: "rct-pf-molar",               category: "adult",   price:   7000 },
  { sortOrder: 14, name: "P.F.M. Crown",                     slug: "pfm-crown",                  category: "adult",   price:   6000 },
  { sortOrder: 15, name: "Full Ceramic Crown",                slug: "full-ceramic-crown",         category: "adult",   price:  12000 },
  { sortOrder: 16, name: "Metal Crown",                       slug: "metal-crown",                category: "adult",   price:   4000 },
  { sortOrder: 17, name: "P.F.M. Bridge (Per Unit)",         slug: "pfm-bridge-per-unit",        category: "adult",   price:   6000 },
  { sortOrder: 18, name: "Full Ceramic Bridge (Per Unit)",    slug: "full-ceramic-bridge-per-unit", category: "adult", price: 12000 },
  { sortOrder: 19, name: "Full Denture (Per Jaw)",            slug: "full-denture-per-jaw",       category: "adult",   price:  18000 },
  { sortOrder: 20, name: "Partial Denture (Acrylic)",         slug: "partial-denture-acrylic",    category: "adult",   price:  12000 },
  { sortOrder: 21, name: "Flexible Partial Denture",          slug: "flexible-partial-denture",   category: "adult",   price:  18000 },
  { sortOrder: 22, name: "Cast Partial Denture",              slug: "cast-partial-denture",       category: "adult",   price:  20000 },
  { sortOrder: 23, name: "Implant (Single, Standard)",        slug: "implant-single",             category: "adult",   price:  60000, priceNote: "Discuss" },
  { sortOrder: 24, name: "Teeth Bleaching (In-Office)",       slug: "teeth-bleaching-in-office",  category: "adult",   price:   8000 },
  { sortOrder: 25, name: "Teeth Bleaching (Home Kit)",        slug: "teeth-bleaching-home-kit",   category: "adult",   price:   5000 },
  { sortOrder: 26, name: "Orthodontic Treatment (Metal Braces)", slug: "ortho-metal-braces",      category: "adult",   price:  35000, priceNote: "Discuss" },
  { sortOrder: 27, name: "Orthodontic Treatment (Ceramic Braces)", slug: "ortho-ceramic-braces",  category: "adult",   price:  50000, priceNote: "Discuss" },
  { sortOrder: 28, name: "Orthodontic Retainer",              slug: "ortho-retainer",             category: "adult",   price:   5000 },
  { sortOrder: 29, name: "Extraction (Simple)",               slug: "extraction-simple",          category: "adult",   price:    500 },
  { sortOrder: 30, name: "Extraction (Surgical)",             slug: "extraction-surgical",        category: "adult",   price:   3000 },
  { sortOrder: 31, name: "Wisdom Tooth Removal",              slug: "wisdom-tooth-removal",       category: "adult",   price:  10000, priceNote: "Discuss" },
  { sortOrder: 32, name: "Gingivectomy",                      slug: "gingivectomy",               category: "adult",   price:   4000 },
  { sortOrder: 33, name: "Periodontal Flap Surgery",          slug: "perio-flap-surgery",         category: "adult",   price:   8000, priceNote: "Discuss" },
  { sortOrder: 34, name: "Apicoectomy",                       slug: "apicoectomy",                category: "adult",   price:   6000 },
  { sortOrder: 35, name: "Post & Core",                       slug: "post-and-core",              category: "adult",   price:   2500 },
  { sortOrder: 36, name: "Inlay / Onlay (Composite)",         slug: "inlay-onlay-composite",      category: "adult",   price:   5000 },
  { sortOrder: 37, name: "Porcelain Veneer (Per Tooth)",      slug: "porcelain-veneer",           category: "adult",   price:  12000 },
  { sortOrder: 38, name: "Composite Veneer (Per Tooth)",      slug: "composite-veneer",           category: "adult",   price:   4000 },
  { sortOrder: 39, name: "OPG X-ray",                         slug: "xray-opg",                   category: "adult",   price:   1000 },
  { sortOrder: 40, name: "Periapical X-ray",                  slug: "xray-periapical",            category: "adult",   price:    300 },
  { sortOrder: 41, name: "Fissure Sealant (Per Tooth)",       slug: "fissure-sealant",            category: "adult",   price:    500 },
  { sortOrder: 42, name: "Fluoride Application",              slug: "fluoride-application",       category: "adult",   price:    700 },

  // ── CHILD (43–57) ────────────────────────────────────────────────────────────
  { sortOrder: 43, name: "R.C.T. + P.F. (Child)",            slug: "child-rct-pf",               category: "child",   price:   5500 },
  { sortOrder: 44, name: "P.F. (Pulp Capping)",               slug: "child-pf-pulp-capping",      category: "child",   price:   1000 },
  { sortOrder: 45, name: "T.F. (Temporary Filling)",          slug: "child-tf-temporary-filling", category: "child",   price:    500 },
  { sortOrder: 46, name: "G.I. Filling",                      slug: "child-gi-filling",           category: "child",   price:    700 },
  { sortOrder: 47, name: "Composite Filling",                  slug: "child-composite-filling",    category: "child",   price:   1000 },
  { sortOrder: 48, name: "Stainless Steel Crown",              slug: "child-ss-crown",             category: "child",   price:   2500 },
  { sortOrder: 49, name: "Extraction (Primary Tooth)",         slug: "child-extraction-primary",   category: "child",   price:    300 },
  { sortOrder: 50, name: "Extraction (Permanent, Simple)",     slug: "child-extraction-permanent", category: "child",   price:    500 },
  { sortOrder: 51, name: "Space Maintainer (Fixed)",           slug: "child-space-maintainer-fixed", category: "child", price:  4000 },
  { sortOrder: 52, name: "Space Maintainer (Removable)",       slug: "child-space-maintainer-removable", category: "child", price: 3000 },
  { sortOrder: 53, name: "Habit Breaking Appliance",           slug: "child-habit-breaker",        category: "child",   price:   6000 },
  { sortOrder: 54, name: "Partial Braces (Interceptive)",      slug: "child-partial-braces",       category: "child",   price:  18000, priceNote: "Discuss" },
  { sortOrder: 55, name: "Fluoride Application (Child)",       slug: "child-fluoride",             category: "child",   price:    500 },
  { sortOrder: 56, name: "Fissure Sealant (Child, Per Tooth)", slug: "child-fissure-sealant",      category: "child",   price:    500 },
  { sortOrder: 57, name: "Dental Cleaning (Child)",            slug: "child-dental-cleaning",      category: "child",   price:    800 },

  // ── SURGERY (58–62) ──────────────────────────────────────────────────────────
  { sortOrder: 58, name: "Oral Cancer Surgery",               slug: "surgery-oral-cancer",        category: "surgery", price: 100000, priceNote: "Discuss" },
  { sortOrder: 59, name: "Implant Bone Grafting",             slug: "surgery-bone-grafting",      category: "surgery", price:  15000, priceNote: "Discuss" },
  { sortOrder: 60, name: "Cyst / Tumor Removal",              slug: "surgery-cyst-removal",       category: "surgery", price:  15000, priceNote: "Discuss" },
  { sortOrder: 61, name: "Jaw Fracture / Wiring",             slug: "surgery-jaw-fracture",       category: "surgery", price:  30000, priceNote: "Discuss" },
  { sortOrder: 62, name: "Sinus Lift",                        slug: "surgery-sinus-lift",         category: "surgery", price:  20000, priceNote: "Discuss" },
];

async function seedServices() {
  console.log("Seeding dental services...");
  for (const svc of SEED_SERVICES) {
    await prisma.service.upsert({
      where: { slug: svc.slug },
      update: {
        name:      svc.name,
        price:     svc.price     !== undefined ? svc.price     : null,
        priceMax:  svc.priceMax  !== undefined ? svc.priceMax  : null,
        priceNote: svc.priceNote !== undefined ? svc.priceNote : null,
        category:  svc.category,
        sortOrder: svc.sortOrder,
      },
      create: {
        name:      svc.name,
        slug:      svc.slug,
        price:     svc.price     !== undefined ? svc.price     : null,
        priceMax:  svc.priceMax  !== undefined ? svc.priceMax  : null,
        priceNote: svc.priceNote !== undefined ? svc.priceNote : null,
        category:  svc.category,
        sortOrder: svc.sortOrder,
        isActive:  true,
      },
    });
    console.log(`  ✅ Service [${svc.category.padEnd(7)}] #${String(svc.sortOrder).padStart(2, "0")} — ${svc.name}`);
  }
}

async function main() {
  console.log("Seeding users...");
  for (const user of SEED_USERS) {
    await seedUser(user);
  }

  await seedServices();

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
