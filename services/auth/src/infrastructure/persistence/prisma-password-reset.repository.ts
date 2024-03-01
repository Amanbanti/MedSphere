import { Injectable } from '@nestjs/common';
import type { ISODateString, UUID } from '@medsphere/shared';
import { toIso } from '@medsphere/shared';
import type {
  PasswordResetRepository,
  PasswordResetTokenRecord,
} from '../../domain/repositories/password-reset.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaPasswordResetRepository implements PasswordResetRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: UUID,
    tokenHash: string,
    expiresAt: ISODateString,
  ): Promise<void> {
    await this.prisma.client.passwordResetToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt: new Date(expiresAt),
      },
    });
  }

  async findByTokenHash(tokenHash: string): Promise<PasswordResetTokenRecord | null> {
    const row = await this.prisma.client.passwordResetToken.findFirst({
      where: { tokenHash },
      orderBy: { createdAt: 'desc' },
    });
    if (!row) {
      return null;
    }
    return {
      id: row.id as UUID,
      userId: row.userId as UUID,
      tokenHash: row.tokenHash,
      expiresAt: toIso(row.expiresAt) as ISODateString,
      usedAt: row.usedAt ? (toIso(row.usedAt) as ISODateString) : null,
    };
  }

  async markUsed(id: UUID, now: ISODateString): Promise<void> {
    await this.prisma.client.passwordResetToken.update({
      where: { id },
      data: { usedAt: new Date(now) },
    });
  }

  async invalidateAllForUser(userId: UUID): Promise<void> {
    await this.prisma.client.passwordResetToken.updateMany({
      where: { userId, usedAt: null },
      data: { usedAt: new Date() },
    });
  }
}
