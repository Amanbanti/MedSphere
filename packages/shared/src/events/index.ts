/**
 * Domain event contracts published via Kafka.
 */

import type {
  AppointmentStatus,
  ISODateString,
  SystemRole,
  UUID,
  UserStatus,
} from '../types';

export interface DomainEventEnvelope<TPayload, TType extends string = string> {
  eventId: UUID;
  eventType: TType;
  eventVersion: number;
  occurredAt: ISODateString;
  correlationId: UUID;
  causationId?: UUID;
  organizationId: UUID;
  actorId: UUID | null;
  payload: TPayload;
}

export type UserCreatedPayload = {
  userId: UUID;
  email: string;
  organizationId: UUID;
  roles: SystemRole[];
  status: UserStatus;
};

export type UserUpdatedPayload = {
  userId: UUID;
  changes: string[];
  status?: UserStatus;
};

export type LoginSucceededPayload = {
  userId: UUID;
  sessionId: UUID;
  ipAddress?: string;
  userAgent?: string;
  mfaUsed: boolean;
};

export type LoginFailedPayload = {
  email: string;
  organizationId?: UUID;
  reason: string;
  ipAddress?: string;
  userAgent?: string;
};

export type SessionRevokedPayload = {
  userId: UUID;
  sessionId: UUID;
  reason: string;
};

export type PatientRegisteredPayload = {
  patientId: UUID;
  mrn: string;
  organizationId: UUID;
  facilityId?: UUID;
};

export type AppointmentChangedPayload = {
  appointmentId: UUID;
  patientId: UUID;
  doctorId: UUID;
  status: AppointmentStatus;
  scheduledAt: ISODateString;
};

export type AuditEventPayload = {
  action: string;
  resourceType: string;
  resourceId: string;
  outcome: 'SUCCESS' | 'FAILURE' | 'DENIED';
  metadata?: Record<string, unknown>;
};

export type NotificationDispatchPayload = {
  channel: 'EMAIL' | 'SMS' | 'PUSH' | 'WHATSAPP' | 'IN_APP';
  templateKey: string;
  recipientId: UUID;
  data: Record<string, unknown>;
};

export type MedSphereEvent =
  | DomainEventEnvelope<UserCreatedPayload, 'auth.user.created'>
  | DomainEventEnvelope<UserUpdatedPayload, 'auth.user.updated'>
  | DomainEventEnvelope<LoginSucceededPayload, 'auth.login.succeeded'>
  | DomainEventEnvelope<LoginFailedPayload, 'auth.login.failed'>
  | DomainEventEnvelope<SessionRevokedPayload, 'auth.session.revoked'>
  | DomainEventEnvelope<PatientRegisteredPayload, 'patient.registered'>
  | DomainEventEnvelope<AppointmentChangedPayload, 'appointment.changed'>
  | DomainEventEnvelope<AuditEventPayload, 'audit.event'>
  | DomainEventEnvelope<NotificationDispatchPayload, 'notification.dispatch'>;

export function createDomainEvent<TPayload, TType extends string>(
  input: Omit<DomainEventEnvelope<TPayload, TType>, 'eventVersion'> & {
    eventVersion?: number;
  },
): DomainEventEnvelope<TPayload, TType> {
  return {
    ...input,
    eventVersion: input.eventVersion ?? 1,
  };
}
