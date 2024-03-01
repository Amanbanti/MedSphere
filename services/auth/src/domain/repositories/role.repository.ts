import type { ISODateString, Permission, SystemRole, UUID } from '@medsphere/shared';

export interface RoleAssignment {
  role: SystemRole;
  facilityId: UUID | null;
  permissions: Permission[];
  expiresAt: ISODateString | null;
}

export interface RoleRepository {
  findActiveByUserId(userId: UUID): Promise<RoleAssignment[]>;
}

export const ROLE_REPOSITORY = Symbol('ROLE_REPOSITORY');
