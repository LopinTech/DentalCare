import "dotenv/config";
import { auth } from "../src/lib/auth";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  const existing = await prisma.user.findUnique({
    where: { email: "admin@dentalcare.com" },
  });

  if (existing) {
    console.log("Admin user already exists:", existing.email);
    await prisma.$disconnect();
    return;
  }

  // Use better-auth's own sign-up API to create the user with proper password hashing
  const result = await auth.api.signUpEmail({
    body: {
      name: "Super Admin",
      email: "admin@dentalcare.com",
      password: "Admin@1234",
    },
  });

  if (!result?.user) {
    console.error("Failed to create admin user:", result);
    process.exit(1);
  }

  // Promote to admin role
  await prisma.user.update({
    where: { email: "admin@dentalcare.com" },
    data: { role: "admin", emailVerified: true },
  });

  console.log("✅ Admin user created successfully");
  console.log("   Email:    admin@dentalcare.com");
  console.log("   Password: Admin@1234");

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
