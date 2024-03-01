/**
 * MedSphere database seed — bootstrap organization and admin user.
 *
 * Usage: pnpm --filter @medsphere/database seed
 */
import { PrismaClient, OrganizationType, SystemRole, UserStatus } from '@prisma/client';
import { createHash, randomUUID } from 'node:crypto';

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  return createHash('sha256').update(`medsphere:${password}`).digest('hex');
}

async function seedOrganization() {
  const slug = process.env.SEED_ORG_SLUG ?? 'medsphere-demo';
  const existing = await prisma.organization.findUnique({ where: { slug } });
  if (existing) {
    console.log(`Organization already exists: ${existing.name} (${existing.id})`);
    return existing;
  }

  const org = await prisma.organization.create({
    data: {
      id: randomUUID(),
      name: process.env.SEED_ORG_NAME ?? 'MedSphere Demo Hospital',
      slug,
      type: OrganizationType.HOSPITAL,
      legalName: 'MedSphere Demo Hospital LLC',
      email: process.env.SEED_ORG_EMAIL ?? 'admin@demo.medsphere.health',
      phone: '+15550100000',
      isActive: true,
    },
  });

  console.log(`Created organization: ${org.name} (${org.id})`);
  return org;
}

async function seedAdminUser(organizationId: string) {
  const email = process.env.SEED_ADMIN_EMAIL ?? 'admin@demo.medsphere.health';
  const password = process.env.SEED_ADMIN_PASSWORD ?? 'ChangeMe!2026Secure';

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin user already exists: ${existing.email} (${existing.id})`);
    return existing;
  }

  const user = await prisma.user.create({
    data: {
      id: randomUUID(),
      email,
      passwordHash: hashPassword(password),
      firstName: 'System',
      lastName: 'Administrator',
      displayName: 'System Administrator',
      status: UserStatus.ACTIVE,
      organizationId,
      emailVerified: true,
      mfaEnabled: false,
    },
  });

  await prisma.roleAssignment.create({
    data: {
      id: randomUUID(),
      userId: user.id,
      role: SystemRole.SUPER_ADMIN,
      organizationId,
      assignedAt: new Date(),
    },
  });

  console.log(`Created admin user: ${user.email} (${user.id})`);
  console.log('  Default password from SEED_ADMIN_PASSWORD env var');
  return user;
}

async function seedDefaultFacility(organizationId: string) {
  const code = 'MAIN';
  const existing = await prisma.facility.findFirst({
    where: { organizationId, code },
  });
  if (existing) {
    console.log(`Facility already exists: ${existing.name}`);
    return existing;
  }

  const facility = await prisma.facility.create({
    data: {
      id: randomUUID(),
      organizationId,
      name: 'Main Campus',
      code,
      type: 'ACUTE_CARE',
      timezone: 'America/New_York',
      addressLine1: '100 Healthcare Blvd',
      city: 'Boston',
      state: 'MA',
      postalCode: '02115',
      country: 'US',
      isActive: true,
    },
  });

  console.log(`Created facility: ${facility.name} (${facility.id})`);
  return facility;
}

async function main() {
  console.log('MedSphere database seed starting...');
  const org = await seedOrganization();
  await seedDefaultFacility(org.id);
  await seedAdminUser(org.id);
  console.log('Seed completed successfully.');
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
