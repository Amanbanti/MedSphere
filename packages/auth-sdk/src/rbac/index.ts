/**
 * Role-Based Access Control matrices for MedSphere clinical roles.
 */

import {
  PermissionAction,
  PermissionResource,
  SystemRole,
  type Permission,
  hasAllPermissions,
  hasAnyPermission,
  hasPermission,
} from '@medsphere/shared';

function p(resource: PermissionResource, action: PermissionAction): Permission {
  return `${resource}:${action}` as Permission;
}

function allActions(resource: PermissionResource): Permission[] {
  return Object.values(PermissionAction).map((action) => p(resource, action));
}

const CLINICAL_READ: Permission[] = [
  p(PermissionResource.PATIENT, PermissionAction.READ),
  p(PermissionResource.PATIENT, PermissionAction.LIST),
  p(PermissionResource.ENCOUNTER, PermissionAction.READ),
  p(PermissionResource.ENCOUNTER, PermissionAction.LIST),
  p(PermissionResource.MEDICAL_RECORD, PermissionAction.READ),
  p(PermissionResource.MEDICAL_RECORD, PermissionAction.LIST),
  p(PermissionResource.APPOINTMENT, PermissionAction.READ),
  p(PermissionResource.APPOINTMENT, PermissionAction.LIST),
  p(PermissionResource.PRESCRIPTION, PermissionAction.READ),
  p(PermissionResource.PRESCRIPTION, PermissionAction.LIST),
  p(PermissionResource.LAB_ORDER, PermissionAction.READ),
  p(PermissionResource.LAB_ORDER, PermissionAction.LIST),
  p(PermissionResource.LAB_RESULT, PermissionAction.READ),
  p(PermissionResource.LAB_RESULT, PermissionAction.LIST),
  p(PermissionResource.IMAGING_STUDY, PermissionAction.READ),
  p(PermissionResource.IMAGING_STUDY, PermissionAction.LIST),
];

export const ROLE_PERMISSION_MATRIX: Record<SystemRole, Permission[]> = {
  [SystemRole.SUPER_ADMIN]: ['*:*' as Permission],
  [SystemRole.ORG_ADMIN]: [
    ...allActions(PermissionResource.USER),
    ...allActions(PermissionResource.ROLE),
    ...allActions(PermissionResource.ORGANIZATION),
    ...allActions(PermissionResource.FACILITY),
    ...allActions(PermissionResource.FEATURE_FLAG),
    p(PermissionResource.AUDIT_LOG, PermissionAction.READ),
    p(PermissionResource.AUDIT_LOG, PermissionAction.LIST),
    p(PermissionResource.AUDIT_LOG, PermissionAction.EXPORT),
    p(PermissionResource.ANALYTICS, PermissionAction.READ),
    p(PermissionResource.ANALYTICS, PermissionAction.LIST),
    p(PermissionResource.ANALYTICS, PermissionAction.EXPORT),
    ...CLINICAL_READ,
  ],
  [SystemRole.FACILITY_ADMIN]: [
    p(PermissionResource.USER, PermissionAction.READ),
    p(PermissionResource.USER, PermissionAction.LIST),
    p(PermissionResource.USER, PermissionAction.UPDATE),
    p(PermissionResource.FACILITY, PermissionAction.READ),
    p(PermissionResource.FACILITY, PermissionAction.UPDATE),
    p(PermissionResource.APPOINTMENT, PermissionAction.CREATE),
    p(PermissionResource.APPOINTMENT, PermissionAction.UPDATE),
    p(PermissionResource.APPOINTMENT, PermissionAction.DELETE),
    ...CLINICAL_READ,
    p(PermissionResource.ANALYTICS, PermissionAction.READ),
  ],
  [SystemRole.DOCTOR]: [
    ...CLINICAL_READ,
    p(PermissionResource.PATIENT, PermissionAction.CREATE),
    p(PermissionResource.PATIENT, PermissionAction.UPDATE),
    p(PermissionResource.ENCOUNTER, PermissionAction.CREATE),
    p(PermissionResource.ENCOUNTER, PermissionAction.UPDATE),
    p(PermissionResource.MEDICAL_RECORD, PermissionAction.CREATE),
    p(PermissionResource.MEDICAL_RECORD, PermissionAction.UPDATE),
    p(PermissionResource.MEDICAL_RECORD, PermissionAction.SIGN),
    p(PermissionResource.PRESCRIPTION, PermissionAction.CREATE),
    p(PermissionResource.PRESCRIPTION, PermissionAction.UPDATE),
    p(PermissionResource.PRESCRIPTION, PermissionAction.SIGN),
    p(PermissionResource.LAB_ORDER, PermissionAction.CREATE),
    p(PermissionResource.IMAGING_STUDY, PermissionAction.CREATE),
    p(PermissionResource.APPOINTMENT, PermissionAction.CREATE),
    p(PermissionResource.APPOINTMENT, PermissionAction.UPDATE),
    p(PermissionResource.TELEMEDICINE_SESSION, PermissionAction.CREATE),
    p(PermissionResource.TELEMEDICINE_SESSION, PermissionAction.READ),
    p(PermissionResource.TELEMEDICINE_SESSION, PermissionAction.UPDATE),
  ],
  [SystemRole.NURSE]: [
    ...CLINICAL_READ,
    p(PermissionResource.PATIENT, PermissionAction.UPDATE),
    p(PermissionResource.ENCOUNTER, PermissionAction.CREATE),
    p(PermissionResource.ENCOUNTER, PermissionAction.UPDATE),
    p(PermissionResource.MEDICAL_RECORD, PermissionAction.CREATE),
    p(PermissionResource.MEDICAL_RECORD, PermissionAction.UPDATE),
    p(PermissionResource.APPOINTMENT, PermissionAction.UPDATE),
    p(PermissionResource.LAB_ORDER, PermissionAction.CREATE),
  ],
  [SystemRole.RECEPTIONIST]: [
    p(PermissionResource.PATIENT, PermissionAction.CREATE),
    p(PermissionResource.PATIENT, PermissionAction.READ),
    p(PermissionResource.PATIENT, PermissionAction.LIST),
    p(PermissionResource.PATIENT, PermissionAction.UPDATE),
    p(PermissionResource.APPOINTMENT, PermissionAction.CREATE),
    p(PermissionResource.APPOINTMENT, PermissionAction.READ),
    p(PermissionResource.APPOINTMENT, PermissionAction.LIST),
    p(PermissionResource.APPOINTMENT, PermissionAction.UPDATE),
    p(PermissionResource.APPOINTMENT, PermissionAction.DELETE),
    p(PermissionResource.INVOICE, PermissionAction.READ),
    p(PermissionResource.INVOICE, PermissionAction.LIST),
  ],
  [SystemRole.PHARMACIST]: [
    p(PermissionResource.PRESCRIPTION, PermissionAction.READ),
    p(PermissionResource.PRESCRIPTION, PermissionAction.LIST),
    p(PermissionResource.PRESCRIPTION, PermissionAction.UPDATE),
    p(PermissionResource.PRESCRIPTION, PermissionAction.APPROVE),
    p(PermissionResource.PATIENT, PermissionAction.READ),
    p(PermissionResource.PATIENT, PermissionAction.LIST),
  ],
  [SystemRole.LAB_TECHNICIAN]: [
    p(PermissionResource.LAB_ORDER, PermissionAction.READ),
    p(PermissionResource.LAB_ORDER, PermissionAction.LIST),
    p(PermissionResource.LAB_ORDER, PermissionAction.UPDATE),
    p(PermissionResource.LAB_RESULT, PermissionAction.CREATE),
    p(PermissionResource.LAB_RESULT, PermissionAction.UPDATE),
    p(PermissionResource.LAB_RESULT, PermissionAction.READ),
    p(PermissionResource.LAB_RESULT, PermissionAction.LIST),
    p(PermissionResource.PATIENT, PermissionAction.READ),
  ],
  [SystemRole.RADIOLOGIST]: [
    p(PermissionResource.IMAGING_STUDY, PermissionAction.READ),
    p(PermissionResource.IMAGING_STUDY, PermissionAction.LIST),
    p(PermissionResource.IMAGING_STUDY, PermissionAction.UPDATE),
    p(PermissionResource.IMAGING_STUDY, PermissionAction.SIGN),
    p(PermissionResource.PATIENT, PermissionAction.READ),
    p(PermissionResource.MEDICAL_RECORD, PermissionAction.READ),
  ],
  [SystemRole.BILLING_SPECIALIST]: [
    ...allActions(PermissionResource.INVOICE),
    p(PermissionResource.CLAIM, PermissionAction.CREATE),
    p(PermissionResource.CLAIM, PermissionAction.READ),
    p(PermissionResource.CLAIM, PermissionAction.LIST),
    p(PermissionResource.CLAIM, PermissionAction.UPDATE),
    p(PermissionResource.PATIENT, PermissionAction.READ),
    p(PermissionResource.PATIENT, PermissionAction.LIST),
    p(PermissionResource.ANALYTICS, PermissionAction.READ),
  ],
  [SystemRole.INSURANCE_AGENT]: [
    ...allActions(PermissionResource.CLAIM),
    p(PermissionResource.PATIENT, PermissionAction.READ),
    p(PermissionResource.INVOICE, PermissionAction.READ),
    p(PermissionResource.INVOICE, PermissionAction.LIST),
  ],
  [SystemRole.PATIENT]: [
    p(PermissionResource.PATIENT, PermissionAction.READ),
    p(PermissionResource.APPOINTMENT, PermissionAction.CREATE),
    p(PermissionResource.APPOINTMENT, PermissionAction.READ),
    p(PermissionResource.APPOINTMENT, PermissionAction.LIST),
    p(PermissionResource.APPOINTMENT, PermissionAction.UPDATE),
    p(PermissionResource.MEDICAL_RECORD, PermissionAction.READ),
    p(PermissionResource.LAB_RESULT, PermissionAction.READ),
    p(PermissionResource.IMAGING_STUDY, PermissionAction.READ),
    p(PermissionResource.PRESCRIPTION, PermissionAction.READ),
    p(PermissionResource.INVOICE, PermissionAction.READ),
    p(PermissionResource.INVOICE, PermissionAction.LIST),
    p(PermissionResource.TELEMEDICINE_SESSION, PermissionAction.READ),
    p(PermissionResource.NOTIFICATION, PermissionAction.READ),
    p(PermissionResource.NOTIFICATION, PermissionAction.LIST),
  ],
  [SystemRole.AUDITOR]: [
    p(PermissionResource.AUDIT_LOG, PermissionAction.READ),
    p(PermissionResource.AUDIT_LOG, PermissionAction.LIST),
    p(PermissionResource.AUDIT_LOG, PermissionAction.EXPORT),
    p(PermissionResource.ANALYTICS, PermissionAction.READ),
    p(PermissionResource.ANALYTICS, PermissionAction.LIST),
  ],
  [SystemRole.IT_SUPPORT]: [
    p(PermissionResource.USER, PermissionAction.READ),
    p(PermissionResource.USER, PermissionAction.LIST),
    p(PermissionResource.USER, PermissionAction.UPDATE),
    p(PermissionResource.FEATURE_FLAG, PermissionAction.READ),
    p(PermissionResource.FEATURE_FLAG, PermissionAction.LIST),
    p(PermissionResource.FEATURE_FLAG, PermissionAction.UPDATE),
    p(PermissionResource.ORGANIZATION, PermissionAction.READ),
    p(PermissionResource.FACILITY, PermissionAction.READ),
  ],
};

export function resolvePermissionsForRoles(roles: SystemRole[]): Permission[] {
  const set = new Set<Permission>();
  for (const role of roles) {
    for (const permission of ROLE_PERMISSION_MATRIX[role] ?? []) {
      set.add(permission);
    }
  }
  return [...set];
}

export function can(
  granted: readonly Permission[] | readonly string[],
  required: Permission | string,
): boolean {
  return hasPermission(granted, required);
}

export function canAll(
  granted: readonly Permission[] | readonly string[],
  required: readonly (Permission | string)[],
): boolean {
  return hasAllPermissions(granted, required);
}

export function canAny(
  granted: readonly Permission[] | readonly string[],
  required: readonly (Permission | string)[],
): boolean {
  return hasAnyPermission(granted, required);
}

export { hasPermission, hasAllPermissions, hasAnyPermission };
