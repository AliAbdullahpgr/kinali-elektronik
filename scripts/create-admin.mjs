import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Your admin credentials
  const email = "nurullah@kinali-elektrik.com";
  const password = "Kinali2024!Secure#Admin";
  const name = "Nurullah - Admin";

  console.log("Creating admin user...");

  // Check if admin already exists
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    console.log("Admin user already exists. Updating password...");

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.adminUser.update({
      where: { email },
      data: {
        passwordHash,
        name,
      },
    });

    console.log("✅ Admin password updated successfully!");
  } else {
    console.log("Creating new admin user...");

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.adminUser.create({
      data: {
        email,
        name,
        passwordHash,
      },
    });

    console.log("✅ Admin user created successfully!");
  }

  console.log("\n📧 Email:", email);
  console.log("🔑 Password:", password);
  console.log("\n⚠️  IMPORTANT: Save these credentials securely and change the password after first login!");
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
