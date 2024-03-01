/**
 * Core domain types for MedSphere HIS/EMR/EHR platform.
 */

export type UUID = string & { readonly __brand: 'UUID' };
export type ISODateString = string & { readonly __brand: 'ISODateString' };
export type EmailAddress = string & { readonly __brand: 'EmailAddress' };
export type PhoneE164 = string & { readonly __brand: 'PhoneE164' };
export type Mrn = string & { readonly __brand: 'Mrn' };
export type Npi = string & { readonly __brand: 'Npi' };

export type SoftDelete = {
  deletedAt: ISODateString | null;
  deletedBy: UUID | null;
};

export type Auditable = {
  createdAt: ISODateString;
  createdBy: UUID | null;
  updatedAt: ISODateString;
  updatedBy: UUID | null;
  version: number;
};

export type TenantScoped = {
  organizationId: UUID;
  facilityId: UUID | null;
};

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  LOCKED = 'LOCKED',
}

export enum AuthProvider {
  LOCAL = 'LOCAL',
  GOOGLE = 'GOOGLE',
  MICROSOFT = 'MICROSOFT',
  SAML = 'SAML',
  API_KEY = 'API_KEY',
}

export enum MfaMethod {
  TOTP = 'TOTP',
  SMS = 'SMS',
  EMAIL = 'EMAIL',
  WEBAUTHN = 'WEBAUTHN',
}

export enum OrganizationType {
  HOSPITAL = 'HOSPITAL',
  CLINIC = 'CLINIC',
  LABORATORY = 'LABORATORY',
  PHARMACY = 'PHARMACY',
  INSURANCE = 'INSURANCE',
  TELEHEALTH = 'TELEHEALTH',
  MULTI_FACILITY = 'MULTI_FACILITY',
}

export enum FacilityType {
  ACUTE_CARE = 'ACUTE_CARE',
  AMBULATORY = 'AMBULATORY',
  EMERGENCY = 'EMERGENCY',
  ICU = 'ICU',
  IMAGING_CENTER = 'IMAGING_CENTER',
  LAB = 'LAB',
  PHARMACY = 'PHARMACY',
  REHAB = 'REHAB',
  LONG_TERM_CARE = 'LONG_TERM_CARE',
}

export enum SystemRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ORG_ADMIN = 'ORG_ADMIN',
  FACILITY_ADMIN = 'FACILITY_ADMIN',
  DOCTOR = 'DOCTOR',
  NURSE = 'NURSE',
  RECEPTIONIST = 'RECEPTIONIST',
  PHARMACIST = 'PHARMACIST',
  LAB_TECHNICIAN = 'LAB_TECHNICIAN',
  RADIOLOGIST = 'RADIOLOGIST',
  BILLING_SPECIALIST = 'BILLING_SPECIALIST',
  INSURANCE_AGENT = 'INSURANCE_AGENT',
  PATIENT = 'PATIENT',
  AUDITOR = 'AUDITOR',
  IT_SUPPORT = 'IT_SUPPORT',
}

export enum PermissionAction {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  LIST = 'LIST',
  EXPORT = 'EXPORT',
  APPROVE = 'APPROVE',
  SIGN = 'SIGN',
  BREAK_GLASS = 'BREAK_GLASS',
}

export enum PermissionResource {
  PATIENT = 'PATIENT',
  ENCOUNTER = 'ENCOUNTER',
  MEDICAL_RECORD = 'MEDICAL_RECORD',
  APPOINTMENT = 'APPOINTMENT',
  PRESCRIPTION = 'PRESCRIPTION',
  LAB_ORDER = 'LAB_ORDER',
  LAB_RESULT = 'LAB_RESULT',
  IMAGING_STUDY = 'IMAGING_STUDY',
  INVOICE = 'INVOICE',
  CLAIM = 'CLAIM',
  USER = 'USER',
  ROLE = 'ROLE',
  ORGANIZATION = 'ORGANIZATION',
  FACILITY = 'FACILITY',
  AUDIT_LOG = 'AUDIT_LOG',
  FEATURE_FLAG = 'FEATURE_FLAG',
  TELEMEDICINE_SESSION = 'TELEMEDICINE_SESSION',
  NOTIFICATION = 'NOTIFICATION',
  ANALYTICS = 'ANALYTICS',
}

export type Permission = `${PermissionResource}:${PermissionAction}`;

export interface JwtAccessPayload {
  sub: UUID;
  orgId: UUID;
  facilityIds: UUID[];
  roles: SystemRole[];
  permissions: Permission[];
  sessionId: UUID;
  mfaVerified: boolean;
  iat: number;
  exp: number;
  iss: string;
  aud: string;
}

export interface JwtRefreshPayload {
  sub: UUID;
  sessionId: UUID;
  tokenFamily: UUID;
  iat: number;
  exp: number;
  iss: string;
}

export interface AuthUser {
  id: UUID;
  email: EmailAddress;
  status: UserStatus;
  organizationId: UUID;
  roles: SystemRole[];
  permissions: Permission[];
  mfaEnabled: boolean;
  displayName: string;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ApiErrorBody {
  statusCode: number;
  errorCode: string;
  message: string;
  details?: Record<string, unknown>;
  correlationId: string;
  timestamp: ISODateString;
  path?: string;
}

export interface ApiSuccessBody<T> {
  data: T;
  correlationId: string;
  timestamp: ISODateString;
}

export type SortDirection = 'asc' | 'desc';

export interface SortSpec {
  field: string;
  direction: SortDirection;
}

export interface FilterSpec {
  field: string;
  operator:
    | 'eq'
    | 'neq'
    | 'gt'
    | 'gte'
    | 'lt'
    | 'lte'
    | 'in'
    | 'nin'
    | 'contains'
    | 'startsWith'
    | 'endsWith'
    | 'between'
    | 'isNull'
    | 'isNotNull';
  value?: unknown;
}

export interface ListQuery {
  page?: number;
  pageSize?: number;
  sort?: SortSpec[];
  filters?: FilterSpec[];
  search?: string;
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
  UNKNOWN = 'UNKNOWN',
  PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY',
}

export enum BloodType {
  A_POS = 'A_POS',
  A_NEG = 'A_NEG',
  B_POS = 'B_POS',
  B_NEG = 'B_NEG',
  AB_POS = 'AB_POS',
  AB_NEG = 'AB_NEG',
  O_POS = 'O_POS',
  O_NEG = 'O_NEG',
  UNKNOWN = 'UNKNOWN',
}

export enum MaritalStatus {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
  DIVORCED = 'DIVORCED',
  WIDOWED = 'WIDOWED',
  SEPARATED = 'SEPARATED',
  DOMESTIC_PARTNER = 'DOMESTIC_PARTNER',
  UNKNOWN = 'UNKNOWN',
}

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  CHECKED_IN = 'CHECKED_IN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
  RESCHEDULED = 'RESCHEDULED',
}

export enum EncounterStatus {
  PLANNED = 'PLANNED',
  ARRIVED = 'ARRIVED',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
  CANCELLED = 'CANCELLED',
  ENTERED_IN_ERROR = 'ENTERED_IN_ERROR',
}

export enum ClinicalNoteType {
  SOAP = 'SOAP',
  PROGRESS = 'PROGRESS',
  DISCHARGE_SUMMARY = 'DISCHARGE_SUMMARY',
  CONSULTATION = 'CONSULTATION',
  PROCEDURE = 'PROCEDURE',
  OPERATIVE = 'OPERATIVE',
  ADMISSION = 'ADMISSION',
  NURSING = 'NURSING',
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };
