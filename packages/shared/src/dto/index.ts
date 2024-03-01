/**
 * Shared DTO shapes exchanged between gateway, services, and SDKs.
 */

import type {
  AuthProvider,
  ISODateString,
  MfaMethod,
  OrganizationType,
  PaginatedResult,
  Permission,
  SystemRole,
  UUID,
  UserStatus,
} from '../types';

export interface UserDto {
  id: UUID;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  status: UserStatus;
  organizationId: UUID;
  phone?: string;
  mfaEnabled: boolean;
  emailVerified: boolean;
  lastLoginAt?: ISODateString;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface SessionDto {
  id: UUID;
  userId: UUID;
  createdAt: ISODateString;
  expiresAt: ISODateString;
  ipAddress?: string;
  userAgent?: string;
  mfaVerified: boolean;
  revokedAt?: ISODateString;
}

export interface AuthTokensDto {
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
  expiresIn: number;
  sessionId: UUID;
}

export interface LoginResponseDto {
  tokens?: AuthTokensDto;
  mfaRequired?: boolean;
  mfaChallengeId?: UUID;
  mfaMethods?: MfaMethod[];
  user?: UserDto;
}

export interface OrganizationDto {
  id: UUID;
  name: string;
  slug: string;
  type: OrganizationType;
  isActive: boolean;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface FacilityDto {
  id: UUID;
  organizationId: UUID;
  name: string;
  code: string;
  timezone: string;
  isActive: boolean;
}

export interface RoleAssignmentDto {
  id: UUID;
  userId: UUID;
  role: SystemRole;
  facilityId?: UUID;
  permissions: Permission[];
  assignedAt: ISODateString;
  expiresAt?: ISODateString;
}

export interface ApiKeyDto {
  id: UUID;
  name: string;
  keyPrefix: string;
  scopes: string[];
  createdAt: ISODateString;
  expiresAt?: ISODateString;
  lastUsedAt?: ISODateString;
  revokedAt?: ISODateString;
}

export interface ApiKeyCreatedDto extends ApiKeyDto {
  rawKey: string;
}

export interface MfaEnrollmentDto {
  method: MfaMethod;
  secret?: string;
  otpauthUrl?: string;
  recoveryCodes?: string[];
}

export interface OAuthProviderDto {
  provider: AuthProvider;
  authorizationUrl: string;
  state: string;
}

export type UserListDto = PaginatedResult<UserDto>;
export type SessionListDto = PaginatedResult<SessionDto>;
export type OrganizationListDto = PaginatedResult<OrganizationDto>;

export interface HealthCheckDto {
  status: 'ok' | 'degraded' | 'down';
  service: string;
  version: string;
  uptimeSeconds: number;
  checks: Record<
    string,
    {
      status: 'up' | 'down';
      latencyMs?: number;
      message?: string;
    }
  >;
}

export interface FeatureFlagDto {
  key: string;
  enabled: boolean;
  description?: string;
  organizationId?: UUID;
}
