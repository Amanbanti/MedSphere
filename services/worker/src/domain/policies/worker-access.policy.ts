import type { JwtAccessPayload, Permission, SystemRole } from '@medsphere/shared';
import { ForbiddenError } from '../errors/worker.errors';

const READ_ROLES: SystemRole[] = ['DOCTOR', 'NURSE', 'RECEPTIONIST', 'ORG_ADMIN', 'SUPER_ADMIN'];
const WRITE_ROLES: SystemRole[] = ['DOCTOR', 'NURSE', 'ORG_ADMIN'];

export class WorkerAccessPolicy {
  static assertCanRead(actor: JwtAccessPayload): void {
    if (!actor.roles.some((role) => READ_ROLES.includes(role))) {
      throw new ForbiddenError('Insufficient role to read WorkerTask resources');
    }
  }

  static assertCanWrite(actor: JwtAccessPayload): void {
    if (!actor.roles.some((role) => WRITE_ROLES.includes(role))) {
      throw new ForbiddenError('Insufficient role to modify WorkerTask resources');
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
