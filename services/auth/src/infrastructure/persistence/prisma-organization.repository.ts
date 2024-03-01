import { Injectable } from '@nestjs/common';
import { notDeleted } from '@medsphere/database';
import type { UUID } from '@medsphere/shared';
import { toIso } from '@medsphere/shared';
import { Organization } from '../../domain/entities/organization.entity';
import type { OrganizationRepository } from '../../domain/repositories/organization.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaOrganizationRepository implements OrganizationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: UUID): Promise<Organization | null> {
    const row = await this.prisma.client.organization.findFirst({
      where: { id, ...notDeleted() },
    });
    return row ? this.toDomain(row) : null;
  }

  async findBySlug(slug: string): Promise<Organization | null> {
    const row = await this.prisma.client.organization.findFirst({
      where: { slug, ...notDeleted() },
    });
    return row ? this.toDomain(row) : null;
  }

  private toDomain(row: {
    id: string;
    name: string;
    slug: string;
    type: import('@prisma/client').OrganizationType;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    version: number;
  }): Organization {
    return Organization.create({
      id: row.id as UUID,
      name: row.name,
      slug: row.slug,
      type: row.type as import('@medsphere/shared').OrganizationType,
      isActive: row.isActive,
      createdAt: toIso(row.createdAt) as import('@medsphere/shared').ISODateString,
      updatedAt: toIso(row.updatedAt) as import('@medsphere/shared').ISODateString,
      deletedAt: row.deletedAt
        ? (toIso(row.deletedAt) as import('@medsphere/shared').ISODateString)
        : null,
      version: row.version,
    });
  }
}
