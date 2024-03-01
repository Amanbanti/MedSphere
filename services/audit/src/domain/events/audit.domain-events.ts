export const AUDIT_EVENT_TYPES = {
  CREATED: 'AUDIT.CREATED',
  UPDATED: 'AUDIT.UPDATED',
  DELETED: 'AUDIT.DELETED',
} as const;

export type AuditEventType =
  (typeof AUDIT_EVENT_TYPES)[keyof typeof AUDIT_EVENT_TYPES];
