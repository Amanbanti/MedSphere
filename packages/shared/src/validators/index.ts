/**
 * Zod validators shared across MedSphere services and portals.
 */

import { z } from 'zod';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '../constants';
import {
  AppointmentStatus,
  AuthProvider,
  BloodType,
  ClinicalNoteType,
  EncounterStatus,
  FacilityType,
  Gender,
  MaritalStatus,
  MfaMethod,
  OrganizationType,
  PermissionAction,
  PermissionResource,
  SystemRole,
  UserStatus,
} from '../types';

export const uuidSchema = z.string().uuid();

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email()
  .max(320);

export const phoneE164Schema = z
  .string()
  .regex(/^\+[1-9]\d{7,14}$/, 'Phone must be E.164 format');

export const passwordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH)
  .max(PASSWORD_MAX_LENGTH)
  .regex(/[a-z]/, 'Must include a lowercase letter')
  .regex(/[A-Z]/, 'Must include an uppercase letter')
  .regex(/[0-9]/, 'Must include a digit')
  .regex(/[^A-Za-z0-9]/, 'Must include a special character');

export const isoDateSchema = z.string().datetime({ offset: true });

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(DEFAULT_PAGE),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(MAX_PAGE_SIZE)
    .default(DEFAULT_PAGE_SIZE),
});

export const sortDirectionSchema = z.enum(['asc', 'desc']);

export const sortSpecSchema = z.object({
  field: z.string().min(1).max(100),
  direction: sortDirectionSchema.default('asc'),
});

export const filterOperatorSchema = z.enum([
  'eq',
  'neq',
  'gt',
  'gte',
  'lt',
  'lte',
  'in',
  'nin',
  'contains',
  'startsWith',
  'endsWith',
  'between',
  'isNull',
  'isNotNull',
]);

export const filterSpecSchema = z.object({
  field: z.string().min(1).max(100),
  operator: filterOperatorSchema,
  value: z.unknown().optional(),
});

export const listQuerySchema = paginationSchema.extend({
  sort: z.array(sortSpecSchema).max(5).optional(),
  filters: z.array(filterSpecSchema).max(20).optional(),
  search: z.string().trim().max(200).optional(),
});

export const registerUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  organizationId: uuidSchema,
  phone: phoneE164Schema.optional(),
  acceptTerms: z.literal(true),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1).max(PASSWORD_MAX_LENGTH),
  organizationSlug: z.string().trim().min(2).max(100).optional(),
  mfaCode: z.string().regex(/^\d{6}$/).optional(),
  deviceId: z.string().min(8).max(128).optional(),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(20).max(4096),
});

export const mfaEnrollSchema = z.object({
  method: z.nativeEnum(MfaMethod),
});

export const mfaVerifySchema = z.object({
  method: z.nativeEnum(MfaMethod),
  code: z.string().min(6).max(128),
  challengeId: uuidSchema.optional(),
});

export const passwordResetRequestSchema = z.object({
  email: emailSchema,
});

export const passwordResetConfirmSchema = z.object({
  token: z.string().min(20).max(512),
  newPassword: passwordSchema,
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1).max(PASSWORD_MAX_LENGTH),
  newPassword: passwordSchema,
});

export const oauthCallbackSchema = z.object({
  provider: z.enum([AuthProvider.GOOGLE, AuthProvider.MICROSOFT]),
  code: z.string().min(1),
  state: z.string().min(1),
  redirectUri: z.string().url(),
});

export const createOrganizationSchema = z.object({
  name: z.string().trim().min(2).max(200),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug'),
  type: z.nativeEnum(OrganizationType),
  legalName: z.string().trim().min(2).max(300).optional(),
  taxId: z.string().trim().min(5).max(50).optional(),
  email: emailSchema.optional(),
  phone: phoneE164Schema.optional(),
});

export const createFacilitySchema = z.object({
  organizationId: uuidSchema,
  name: z.string().trim().min(2).max(200),
  code: z.string().trim().min(2).max(50),
  type: z.nativeEnum(FacilityType),
  timezone: z.string().min(2).max(64).default('UTC'),
  addressLine1: z.string().trim().min(2).max(200),
  addressLine2: z.string().trim().max(200).optional(),
  city: z.string().trim().min(1).max(100),
  state: z.string().trim().min(1).max(100),
  postalCode: z.string().trim().min(2).max(20),
  country: z.string().trim().length(2).default('US'),
});

export const assignRoleSchema = z.object({
  userId: uuidSchema,
  role: z.nativeEnum(SystemRole),
  facilityId: uuidSchema.optional(),
  expiresAt: isoDateSchema.optional(),
});

export const createApiKeySchema = z.object({
  name: z.string().trim().min(2).max(100),
  scopes: z.array(z.string().min(3).max(100)).min(1).max(50),
  expiresAt: isoDateSchema.optional(),
});

export const permissionSchema = z.object({
  resource: z.nativeEnum(PermissionResource),
  action: z.nativeEnum(PermissionAction),
});

export const patientDemographicsSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  middleName: z.string().trim().max(100).optional(),
  lastName: z.string().trim().min(1).max(100),
  preferredName: z.string().trim().max(100).optional(),
  dateOfBirth: z.string().date(),
  gender: z.nativeEnum(Gender),
  bloodType: z.nativeEnum(BloodType).optional(),
  maritalStatus: z.nativeEnum(MaritalStatus).optional(),
  email: emailSchema.optional(),
  phone: phoneE164Schema.optional(),
  nationalId: z.string().trim().min(4).max(50).optional(),
});

export const addressSchema = z.object({
  line1: z.string().trim().min(1).max(200),
  line2: z.string().trim().max(200).optional(),
  city: z.string().trim().min(1).max(100),
  state: z.string().trim().min(1).max(100),
  postalCode: z.string().trim().min(2).max(20),
  country: z.string().trim().length(2),
});

export const appointmentStatusSchema = z.nativeEnum(AppointmentStatus);
export const encounterStatusSchema = z.nativeEnum(EncounterStatus);
export const clinicalNoteTypeSchema = z.nativeEnum(ClinicalNoteType);
export const userStatusSchema = z.nativeEnum(UserStatus);

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
export type MfaEnrollInput = z.infer<typeof mfaEnrollSchema>;
export type MfaVerifyInput = z.infer<typeof mfaVerifySchema>;
export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>;
export type CreateFacilityInput = z.infer<typeof createFacilitySchema>;
export type AssignRoleInput = z.infer<typeof assignRoleSchema>;
export type CreateApiKeyInput = z.infer<typeof createApiKeySchema>;
export type PatientDemographicsInput = z.infer<typeof patientDemographicsSchema>;
export type ListQueryInput = z.infer<typeof listQuerySchema>;

export function parseOrThrow<T>(schema: z.ZodType<T>, data: unknown): T {
  return schema.parse(data);
}

export function safeParse<T>(
  schema: z.ZodType<T>,
  data: unknown,
):
  | { success: true; data: T }
  | { success: false; errors: z.ZodIssue[] } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error.issues };
}
