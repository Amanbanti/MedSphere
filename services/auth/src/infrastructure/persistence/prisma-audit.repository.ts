import { Injectable } from '@nestjs/common';
import type { UUID } from '@medsphere/shared';
import type { AuditEntry, AuditRepository } from '../../domain/repositories/audit.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaAuditRepository implements AuditRepository {
  constructor(private readonly prisma: PrismaService) {}

  async append(entry: AuditEntry): Promise<void> {
    await this.prisma.client.auditLog.create({
      data: {
        organizationId: entry.organizationId,
        actorId: entry.actorId,
        action: entry.action,
        resourceType: entry.resourceType,
        resourceId: entry.resourceId,
        outcome: entry.outcome,
        ipAddress: entry.ipAddress,
        userAgent: entry.userAgent,
        correlationId: entry.correlationId,
        metadata: entry.metadata ?? {},
      },
    });
  }
}
