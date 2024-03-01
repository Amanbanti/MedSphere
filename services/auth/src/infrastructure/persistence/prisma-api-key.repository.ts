import { Injectable } from '@nestjs/common';
import type { ISODateString, UUID } from '@medsphere/shared';
import { toIso } from '@medsphere/shared';
import type {
  ApiKeyRecord,
  ApiKeyRepository,
} from '../../domain/repositories/api-key.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaApiKeyRepository implements ApiKeyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(record: ApiKeyRecord): Promise<void> {
    await this.prisma.client.apiKey.create({
      data: {
        id: record.id,
        organizationId: record.organizationId,
        userId: record.userId,
        name: record.name,
        keyPrefix: record.keyPrefix,
        keyHash: record.keyHash,
        scopes: record.scopes,
        expiresAt: record.expiresAt ? new Date(record.expiresAt) : null,
        lastUsedAt: record.lastUsedAt ? new Date(record.lastUsedAt) : null,
        revokedAt: record.revokedAt ? new Date(record.revokedAt) : null,
      },
    });
  }

  async findByPrefix(keyPrefix: string): Promise<ApiKeyRecord | null> {
    const row = await this.prisma.client.apiKey.findFirst({
      where: { keyPrefix, revokedAt: null },
    });
    return row ? this.toRecord(row) : null;
  }

  async revoke(id: UUID, now: ISODateString): Promise<void> {
    await this.prisma.client.apiKey.update({
      where: { id },
      data: { revokedAt: new Date(now) },
    });
  }

  async listByUserId(userId: UUID): Promise<ApiKeyRecord[]> {
    const rows = await this.prisma.client.apiKey.findMany({
      where: { userId, revokedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((row) => this.toRecord(row));
  }

  private toRecord(row: {
    id: string;
    organizationId: string;
    userId: string;
    name: string;
    keyPrefix: string;
    keyHash: string;
    scopes: string[];
    expiresAt: Date | null;
    lastUsedAt: Date | null;
    revokedAt: Date | null;
    createdAt: Date;
  }): ApiKeyRecord {
    return {
      id: row.id as UUID,
      organizationId: row.organizationId as UUID,
      userId: row.userId as UUID,
      name: row.name,
      keyPrefix: row.keyPrefix,
      keyHash: row.keyHash,
      scopes: row.scopes,
      expiresAt: row.expiresAt
        ? (toIso(row.expiresAt) as ISODateString)
        : null,
      lastUsedAt: row.lastUsedAt
        ? (toIso(row.lastUsedAt) as ISODateString)
        : null,
      revokedAt: row.revokedAt
        ? (toIso(row.revokedAt) as ISODateString)
        : null,
      createdAt: toIso(row.createdAt) as ISODateString,
    };
  }
}
