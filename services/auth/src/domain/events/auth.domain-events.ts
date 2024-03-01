import type { DomainEventEnvelope } from '@medsphere/shared';
import type { UUID } from '@medsphere/shared';

export const AUTH_EVENT_TYPES = {
  USER_REGISTERED: 'auth.user.registered',
  USER_LOGIN_SUCCEEDED: 'auth.login.succeeded',
  USER_LOGIN_FAILED: 'auth.login.failed',
  SESSION_REVOKED: 'auth.session.revoked',
  MFA_ENROLLED: 'auth.mfa.enrolled',
  MFA_VERIFIED: 'auth.mfa.verified',
  PASSWORD_RESET_REQUESTED: 'auth.password.reset.requested',
  PASSWORD_RESET_COMPLETED: 'auth.password.reset.completed',
  API_KEY_CREATED: 'auth.api_key.created',
} as const;

export type AuthEventType = (typeof AUTH_EVENT_TYPES)[keyof typeof AUTH_EVENT_TYPES];

export interface OutboxDomainEvent<TPayload = unknown> {
  aggregateType: string;
  aggregateId: UUID;
  eventType: AuthEventType;
  payload: TPayload;
  envelope: DomainEventEnvelope<TPayload, AuthEventType>;
}

export interface UserRegisteredPayload {
  userId: UUID;
  email: string;
  organizationId: UUID;
}

export interface LoginSucceededPayload {
  userId: UUID;
  sessionId: UUID;
  ipAddress?: string;
  userAgent?: string;
  mfaUsed: boolean;
}

export interface LoginFailedPayload {
  email: string;
  organizationId?: UUID;
  reason: string;
  ipAddress?: string;
}

export interface SessionRevokedPayload {
  userId: UUID;
  sessionId: UUID;
  reason: string;
}

export interface MfaEnrolledPayload {
  userId: UUID;
  method: string;
}

export interface ApiKeyCreatedPayload {
  userId: UUID;
  apiKeyId: UUID;
  name: string;
}
