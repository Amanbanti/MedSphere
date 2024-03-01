import { Injectable } from '@nestjs/common';
import type { ISODateString, UUID } from '@medsphere/shared';
import { MfaMethod } from '@medsphere/shared';
import { toIso } from '@medsphere/shared';
import type {
  MfaChallenge,
  MfaEnrollment,
  MfaRepository,
} from '../../domain/repositories/mfa.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaMfaRepository implements MfaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findActiveByUserId(userId: UUID): Promise<MfaEnrollment[]> {
    const rows = await this.prisma.client.userMfaMethod.findMany({
      where: { userId, disabledAt: null, verifiedAt: { not: null } },
    });
    return rows.map((row) => this.toEnrollment(row));
  }

  async findByUserAndMethod(
    userId: UUID,
    method: MfaMethod,
  ): Promise<MfaEnrollment | null> {
    const row = await this.prisma.client.userMfaMethod.findFirst({
      where: { userId, method, disabledAt: null },
    });
    return row ? this.toEnrollment(row) : null;
  }

  async saveEnrollment(enrollment: MfaEnrollment): Promise<void> {
    await this.prisma.client.userMfaMethod.upsert({
      where: {
        userId_method: {
          userId: enrollment.userId,
          method: enrollment.method,
        },
      },
      create: {
        id: enrollment.id,
        userId: enrollment.userId,
        method: enrollment.method,
        secretEncrypted: enrollment.secretEncrypted,
        isPrimary: enrollment.isPrimary,
        verifiedAt: enrollment.verifiedAt
          ? new Date(enrollment.verifiedAt)
          : null,
        disabledAt: enrollment.disabledAt
          ? new Date(enrollment.disabledAt)
          : null,
      },
      update: {
        secretEncrypted: enrollment.secretEncrypted,
        isPrimary: enrollment.isPrimary,
        verifiedAt: enrollment.verifiedAt
          ? new Date(enrollment.verifiedAt)
          : null,
        disabledAt: enrollment.disabledAt
          ? new Date(enrollment.disabledAt)
          : null,
      },
    });
  }

  async saveRecoveryCodes(mfaMethodId: UUID, codeHashes: string[]): Promise<void> {
    await this.prisma.client.mfaRecoveryCode.createMany({
      data: codeHashes.map((codeHash) => ({
        mfaMethodId,
        codeHash,
      })),
    });
  }

  async consumeRecoveryCode(
    mfaMethodId: UUID,
    codeHash: string,
  ): Promise<boolean> {
    const record = await this.prisma.client.mfaRecoveryCode.findFirst({
      where: { mfaMethodId, codeHash, usedAt: null },
    });
    if (!record) {
      return false;
    }
    await this.prisma.client.mfaRecoveryCode.update({
      where: { id: record.id },
      data: { usedAt: new Date() },
    });
    return true;
  }

  async createChallenge(challenge: MfaChallenge): Promise<void> {
    await this.prisma.client.mfaChallenge.create({
      data: {
        id: challenge.id,
        userId: challenge.userId,
        method: challenge.method,
        codeHash: challenge.codeHash,
        expiresAt: new Date(challenge.expiresAt),
        consumedAt: challenge.consumedAt
          ? new Date(challenge.consumedAt)
          : null,
        ipAddress: challenge.ipAddress,
      },
    });
  }

  async findChallengeById(id: UUID): Promise<MfaChallenge | null> {
    const row = await this.prisma.client.mfaChallenge.findUnique({
      where: { id },
    });
    if (!row) {
      return null;
    }
    return {
      id: row.id as UUID,
      userId: row.userId as UUID,
      method: row.method as MfaMethod,
      codeHash: row.codeHash,
      expiresAt: toIso(row.expiresAt) as ISODateString,
      consumedAt: row.consumedAt
        ? (toIso(row.consumedAt) as ISODateString)
        : null,
      ipAddress: row.ipAddress,
    };
  }

  async consumeChallenge(id: UUID, now: ISODateString): Promise<void> {
    await this.prisma.client.mfaChallenge.update({
      where: { id },
      data: { consumedAt: new Date(now) },
    });
  }

  private toEnrollment(row: {
    id: string;
    userId: string;
    method: import('@prisma/client').MfaMethod;
    secretEncrypted: string | null;
    isPrimary: boolean;
    verifiedAt: Date | null;
    disabledAt: Date | null;
  }): MfaEnrollment {
    return {
      id: row.id as UUID,
      userId: row.userId as UUID,
      method: row.method as MfaMethod,
      secretEncrypted: row.secretEncrypted,
      isPrimary: row.isPrimary,
      verifiedAt: row.verifiedAt
        ? (toIso(row.verifiedAt) as ISODateString)
        : null,
      disabledAt: row.disabledAt
        ? (toIso(row.disabledAt) as ISODateString)
        : null,
    };
  }
}
