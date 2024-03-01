/**
 * Platform-wide constants for MedSphere.
 */

export const MEDSPHERE_ISSUER = 'medsphere.auth';
export const MEDSPHERE_AUDIENCE = 'medsphere.api';

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 25;
export const MAX_PAGE_SIZE = 200;

export const JWT_ACCESS_TTL_SECONDS = 900;
export const JWT_REFRESH_TTL_SECONDS = 604800;
export const SESSION_IDLE_TIMEOUT_SECONDS = 1800;
export const MFA_CHALLENGE_TTL_SECONDS = 300;
export const PASSWORD_RESET_TTL_SECONDS = 3600;
export const EMAIL_VERIFICATION_TTL_SECONDS = 86400;
export const API_KEY_PREFIX = 'msk_';

export const PASSWORD_MIN_LENGTH = 12;
export const PASSWORD_MAX_LENGTH = 128;
export const MAX_FAILED_LOGIN_ATTEMPTS = 5;
export const ACCOUNT_LOCKOUT_MINUTES = 30;

export const RATE_LIMIT_WINDOW_MS = 60_000;
export const RATE_LIMIT_MAX_REQUESTS = 120;
export const RATE_LIMIT_AUTH_MAX_REQUESTS = 20;

export const CORRELATION_ID_HEADER = 'x-correlation-id';
export const REQUEST_ID_HEADER = 'x-request-id';
export const ORGANIZATION_ID_HEADER = 'x-organization-id';
export const FACILITY_ID_HEADER = 'x-facility-id';
export const IDEMPOTENCY_KEY_HEADER = 'x-idempotency-key';
export const API_VERSION_HEADER = 'x-api-version';

export const API_VERSION_CURRENT = 'v1';
export const API_VERSIONS = ['v1'] as const;

export const KAFKA_TOPICS = {
  AUTH_USER_CREATED: 'medsphere.auth.user.created',
  AUTH_USER_UPDATED: 'medsphere.auth.user.updated',
  AUTH_LOGIN_SUCCEEDED: 'medsphere.auth.login.succeeded',
  AUTH_LOGIN_FAILED: 'medsphere.auth.login.failed',
  AUTH_MFA_CHALLENGED: 'medsphere.auth.mfa.challenged',
  AUTH_SESSION_REVOKED: 'medsphere.auth.session.revoked',
  PATIENT_REGISTERED: 'medsphere.patient.registered',
  PATIENT_UPDATED: 'medsphere.patient.updated',
  APPOINTMENT_CREATED: 'medsphere.appointment.created',
  APPOINTMENT_UPDATED: 'medsphere.appointment.updated',
  APPOINTMENT_CANCELLED: 'medsphere.appointment.cancelled',
  MEDICAL_RECORD_CREATED: 'medsphere.medical-record.created',
  LAB_ORDER_CREATED: 'medsphere.lab.order.created',
  LAB_RESULT_READY: 'medsphere.lab.result.ready',
  PRESCRIPTION_CREATED: 'medsphere.prescription.created',
  INVOICE_CREATED: 'medsphere.billing.invoice.created',
  PAYMENT_COMPLETED: 'medsphere.payment.completed',
  CLAIM_SUBMITTED: 'medsphere.insurance.claim.submitted',
  NOTIFICATION_DISPATCH: 'medsphere.notification.dispatch',
  AUDIT_EVENT: 'medsphere.audit.event',
  SEARCH_INDEX: 'medsphere.search.index',
} as const;

export const FEATURE_FLAGS = {
  TELEMEDICINE: 'feature.telemedicine',
  AI_DIAGNOSIS: 'feature.ai_diagnosis',
  DICOM_VIEWER: 'feature.dicom_viewer',
  BREAK_GLASS: 'feature.break_glass',
  PATIENT_PORTAL_MESSAGING: 'feature.patient_portal_messaging',
  WHATSAPP_NOTIFICATIONS: 'feature.whatsapp_notifications',
  ADVANCED_ANALYTICS: 'feature.advanced_analytics',
} as const;

export const PHI_FIELDS = [
  'ssn',
  'nationalId',
  'dateOfBirth',
  'medicalRecordNumber',
  'phone',
  'email',
  'addressLine1',
  'addressLine2',
  'diagnosis',
  'clinicalNotes',
] as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export const ERROR_CODES = {
  VALIDATION_FAILED: 'MEDSPHERE_VALIDATION_FAILED',
  UNAUTHORIZED: 'MEDSPHERE_UNAUTHORIZED',
  FORBIDDEN: 'MEDSPHERE_FORBIDDEN',
  NOT_FOUND: 'MEDSPHERE_NOT_FOUND',
  CONFLICT: 'MEDSPHERE_CONFLICT',
  RATE_LIMITED: 'MEDSPHERE_RATE_LIMITED',
  MFA_REQUIRED: 'MEDSPHERE_MFA_REQUIRED',
  MFA_INVALID: 'MEDSPHERE_MFA_INVALID',
  ACCOUNT_LOCKED: 'MEDSPHERE_ACCOUNT_LOCKED',
  ACCOUNT_INACTIVE: 'MEDSPHERE_ACCOUNT_INACTIVE',
  INVALID_CREDENTIALS: 'MEDSPHERE_INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'MEDSPHERE_TOKEN_EXPIRED',
  TOKEN_REVOKED: 'MEDSPHERE_TOKEN_REVOKED',
  SESSION_EXPIRED: 'MEDSPHERE_SESSION_EXPIRED',
  IDEMPOTENCY_CONFLICT: 'MEDSPHERE_IDEMPOTENCY_CONFLICT',
  INTERNAL_ERROR: 'MEDSPHERE_INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'MEDSPHERE_SERVICE_UNAVAILABLE',
} as const;
