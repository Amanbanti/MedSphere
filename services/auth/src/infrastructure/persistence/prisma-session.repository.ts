import { Injectable } from '@nestjs/common';
import type { UUID } from '@medsphere/shared';
import { toIso } from '@medsphere/shared';
import { Session } from '../../domain/entities/session.entity';
import type { SessionRepository } from '../../domain/repositories/session.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaSessionRepository implements SessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: UUID): Promise<Session | null> {
    const row = await this.prisma.client.session.findUnique({ where: { id } });
    return row ? this.toDomain(row) : null;
  }

  async findByTokenFamily(tokenFamily: UUID): Promise<Session[]> {
    const rows = await this.prisma.client.session.findMany({
      where: { tokenFamily },
    });
    return rows.map((row) => this.toDomain(row));
  }

  async findActiveByUserId(userId: UUID): Promise<Session[]> {
    const rows = await this.prisma.client.session.findMany({
      where: { userId, revokedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((row) => this.toDomain(row));
  }

  async save(session: Session): Promise<void> {
    const props = session.toProps();
    await this.prisma.client.session.upsert({
      where: { id: session.id },
      create: {
        id: session.id,
        userId: session.userId,
        tokenFamily: session.tokenFamily,
        refreshTokenHash: session.refreshTokenHash,
        ipAddress: session.ipAddress,
        userAgent: session.userAgent,
        mfaVerified: session.mfaVerified,
        createdAt: new Date(props.createdAt),
        expiresAt: new Date(props.expiresAt),
        lastSeenAt: new Date(props.lastSeenAt),
        revokedAt: props.revokedAt ? new Date(props.revokedAt) : null,
        revokeReason: props.revokeReason,
      },
      update: {
        refreshTokenHash: session.refreshTokenHash,
        mfaVerified: session.mfaVerified,
        lastSeenAt: new Date(props.lastSeenAt),
        revokedAt: props.revokedAt ? new Date(props.revokedAt) : null,
        revokeReason: props.revokeReason,
      },
    });
  }

  async revokeAllForUser(
    userId: UUID,
    reason: string,
    now: string,
  ): Promise<number> {
    const result = await this.prisma.client.session.updateMany({
      where: { userId, revokedAt: null },
      data: {
        revokedAt: new Date(now),
        revokeReason: reason,
      },
    });
    return result.count;
  }

  private toDomain(row: {
    id: string;
    userId: string;
    tokenFamily: string;
    refreshTokenHash: string;
    ipAddress: string | null;
    userAgent: string | null;
    mfaVerified: boolean;
    createdAt: Date;
    expiresAt: Date;
    lastSeenAt: Date;
    revokedAt: Date | null;
    revokeReason: string | null;
  }): Session {
    return Session.create({
      id: row.id as UUID,
      userId: row.userId as UUID,
      tokenFamily: row.tokenFamily as UUID,
      refreshTokenHash: row.refreshTokenHash,
      ipAddress: row.ipAddress,
      userAgent: row.userAgent,
      mfaVerified: row.mfaVerified,
      createdAt: toIso(row.createdAt) as import('@medsphere/shared').ISODateString,
      expiresAt: toIso(row.expiresAt) as import('@medsphere/shared').ISODateString,
      lastSeenAt: toIso(row.lastSeenAt) as import('@medsphere/shared').ISODateString,
      revokedAt: row.revokedAt
        ? (toIso(row.revokedAt) as import('@medsphere/shared').ISODateString)
        : null,
      revokeReason: row.revokeReason,
    });
  }
}
