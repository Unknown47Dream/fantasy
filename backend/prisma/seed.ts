// import { PrismaClient } from '../generated/prisma/client';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // Check if super admin already exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: 'admin@fantasy.com' },
  });

  if (existingAdmin) {
    console.log('✅ Super admin already exists');
    console.log('   Email:', existingAdmin.email);
    console.log('   Role:', existingAdmin.role);
    console.log('   Active:', existingAdmin.isActive);
    console.log('\n⏭️  Skipping seed...\n');
    return;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash('4471846634', 10);

  // Create Super Admin
  const superAdmin = await prisma.admin.create({
    data: {
      email: 'admin@fantasy.com',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });

  console.log('✅ Super Admin created successfully!\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📧 Email:    ', superAdmin.email);
  console.log('🔑 Password: ', '4471846634');
  console.log('👤 Role:     ', superAdmin.role);
  console.log('✓  Active:   ', superAdmin.isActive);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log(
    '⚠️  IMPORTANT: Please change this password after your first login!\n',
  );
}

main()
  .catch((error) => {
    console.error('\n❌ Error during database seed:');
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('👋 Disconnected from database\n');
  });
