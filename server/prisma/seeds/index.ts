import { PrismaClient } from '@prisma/client';
import { seedUsers } from './users.js';
import { seedProjects } from './projects.js';
import { seedBeneficiaries } from './beneficiaries.js';
import { seedVolunteers } from './volunteers.js';
import {
  seedProjectAssignments,
  seedBeneficiaryProjects,
  seedVolunteerProjects
} from './assignments.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  await seedUsers(prisma);
  console.log('✅ Users seeded');

  await seedProjects(prisma);
  console.log('✅ Projects seeded');

  await seedBeneficiaries(prisma);
  console.log('✅ Beneficiaries seeded');

  await seedVolunteers(prisma);
  console.log('✅ Volunteers seeded');

  await seedProjectAssignments(prisma);
  console.log('✅ Project assignments seeded');

  await seedBeneficiaryProjects(prisma);
  console.log('✅ Beneficiary-project relationships seeded');

  await seedVolunteerProjects(prisma);
  console.log('✅ Volunteer-project relationships seeded');

  console.log('🎉 Database seeding completed successfully');
}

main()
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });