import type { UUID } from '@medsphere/shared';

export interface LogoutCommand {
  sessionId: UUID;
  userId: UUID;
  correlationId: UUID;
  reason?: string;
}
