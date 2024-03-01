import type { UUID } from '@medsphere/shared';

export interface LoginCommand {
  email: string;
  password: string;
  organizationSlug?: string;
  mfaCode?: string;
  deviceId?: string;
  correlationId: UUID;
  ipAddress?: string;
  userAgent?: string;
}
