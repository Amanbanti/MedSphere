import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var __medspherePrisma: PrismaClient | undefined;
}

export function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });
}

export const prisma: PrismaClient =
  globalThis.__medspherePrisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__medspherePrisma = prisma;
}

export type { PrismaClient, Prisma } from '@prisma/client';
