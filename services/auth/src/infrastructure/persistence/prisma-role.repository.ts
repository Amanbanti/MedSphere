import { Injectable } from '@nestjs/common';
import { resolvePermissionsForRoles } from '@medsphere/auth-sdk';
import type { ISODateString, Permission, SystemRole, UUID } from '@medsphere/shared';
import { toIso } from '@medsphere/shared';
import type {
  RoleAssignment,
  RoleRepository,
} from '../../domain/repositories/role.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaRoleRepository implements RoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findActiveByUserId(userId: UUID): Promise<RoleAssignment[]> {
    const now = new Date();
    const rows = await this.prisma.client.roleAssignment.findMany({
      where: {
        userId,
        revokedAt: null,
        OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
      },
    });

    return rows.map((row) => {
      const role = row.role as SystemRole;
      const permissions = resolvePermissionsForRoles([role]);
      return {
        role,
        facilityId: row.facilityId as UUID | null,
        permissions: permissions as Permission[],
        expiresAt: row.expiresAt
          ? (toIso(row.expiresAt) as ISODateString)
          : null,
      };
    });
  }
}
