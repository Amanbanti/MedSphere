/**
 * Attribute-Based Access Control policies for PHI and clinical resources.
 */

import type { JwtAccessPayload, Permission, SystemRole, UUID } from '@medsphere/shared';
import { SystemRole as Roles } from '@medsphere/shared';
import { can } from '../rbac';

export interface AbacSubject {
  userId: UUID;
  organizationId: UUID;
  facilityIds: UUID[];
  roles: SystemRole[];
  permissions: Permission[];
  mfaVerified: boolean;
}

export interface AbacResource {
  type: string;
  id: string;
  organizationId: UUID;
  facilityId?: UUID | null;
  ownerUserId?: UUID | null;
  patientId?: UUID | null;
  careTeamUserIds?: UUID[];
  sensitivity?: 'normal' | 'restricted' | 'highly_restricted';
  breakGlassRequired?: boolean;
}

export interface AbacContext {
  action: string;
  ipAddress?: string;
  purposeOfUse?: 'treatment' | 'payment' | 'operations' | 'emergency';
  breakGlassApproved?: boolean;
  consentGranted?: boolean;
}

export type AbacDecision =
  | { allow: true; reason: string }
  | { allow: false; reason: string };

export function subjectFromJwt(payload: JwtAccessPayload): AbacSubject {
  return {
    userId: payload.sub,
    organizationId: payload.orgId,
    facilityIds: payload.facilityIds,
    roles: payload.roles,
    permissions: payload.permissions,
    mfaVerified: payload.mfaVerified,
  };
}

export function evaluateAbac(
  subject: AbacSubject,
  resource: AbacResource,
  context: AbacContext,
): AbacDecision {
  if (subject.organizationId !== resource.organizationId) {
    return { allow: false, reason: 'Organization boundary violation' };
  }

  if (
    resource.facilityId &&
    subject.facilityIds.length > 0 &&
    !subject.facilityIds.includes(resource.facilityId) &&
    !subject.roles.includes(Roles.ORG_ADMIN) &&
    !subject.roles.includes(Roles.SUPER_ADMIN)
  ) {
    return { allow: false, reason: 'Facility scope violation' };
  }

  const permissionKey = `${resource.type.toUpperCase()}:${context.action.toUpperCase()}`;
  if (!can(subject.permissions, permissionKey) && !can(subject.permissions, '*:*')) {
    return { allow: false, reason: `Missing permission ${permissionKey}` };
  }

  if (
    resource.sensitivity === 'highly_restricted' &&
    !subject.mfaVerified &&
    context.purposeOfUse !== 'emergency'
  ) {
    return { allow: false, reason: 'MFA required for highly restricted PHI' };
  }

  if (resource.breakGlassRequired && !context.breakGlassApproved) {
    return { allow: false, reason: 'Break-glass approval required' };
  }

  if (
    subject.roles.includes(Roles.PATIENT) &&
    resource.patientId &&
    resource.ownerUserId &&
    resource.ownerUserId !== subject.userId
  ) {
    return { allow: false, reason: 'Patients may only access own records' };
  }

  if (
    resource.careTeamUserIds &&
    resource.careTeamUserIds.length > 0 &&
    subject.roles.includes(Roles.DOCTOR) &&
    !resource.careTeamUserIds.includes(subject.userId) &&
    context.purposeOfUse !== 'emergency' &&
    !context.breakGlassApproved
  ) {
    return {
      allow: false,
      reason: 'Provider not on care team; break-glass required',
    };
  }

  if (
    resource.sensitivity === 'restricted' &&
    context.consentGranted === false &&
    context.purposeOfUse !== 'emergency'
  ) {
    return { allow: false, reason: 'Patient consent required' };
  }

  return { allow: true, reason: 'ABAC policy satisfied' };
}
