import type { JwtAccessPayload, Permission, SystemRole } from '@medsphere/shared';
import { ForbiddenError } from '../errors/radiology.errors';

const READ_ROLES: SystemRole[] = ['DOCTOR', 'NURSE', 'RECEPTIONIST', 'ORG_ADMIN', 'SUPER_ADMIN'];
const WRITE_ROLES: SystemRole[] = ['DOCTOR', 'NURSE', 'ORG_ADMIN'];

export class RadiologyAccessPolicy {
  static assertCanRead(actor: JwtAccessPayload): void {
    if (!actor.roles.some((role) => READ_ROLES.includes(role))) {
      throw new ForbiddenError('Insufficient role to read RadiologyStudy resources');
    }
  }

  static assertCanWrite(actor: JwtAccessPayload): void {
    if (!actor.roles.some((role) => WRITE_ROLES.includes(role))) {
      throw new ForbiddenError('Insufficient role to modify RadiologyStudy resources');
    }
  }

  static assertTenantScope(actor: JwtAccessPayload, organizationId: string): void {
    if (actor.orgId !== organizationId) {
      throw new ForbiddenError('Cross-tenant access denied');
    }
  }

  static hasPermission(actor: JwtAccessPayload, permission: Permission): boolean {
    return actor.permissions.includes(permission);
  }
}
