import type { UUID } from '@medsphere/shared';

export interface RefreshTokenCommand {
  refreshToken: string;
  correlationId: UUID;
  ipAddress?: string;
  userAgent?: string;
}
