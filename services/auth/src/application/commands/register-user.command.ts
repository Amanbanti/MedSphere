import type { UUID } from '@medsphere/shared';

export interface RegisterUserCommand {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  organizationId: UUID;
  phone?: string;
  correlationId: UUID;
  ipAddress?: string;
  userAgent?: string;
}
