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

async function main() {
  console.log("Seeding users...");
  for (const user of SEED_USERS) {
    await seedUser(user);
  }
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
