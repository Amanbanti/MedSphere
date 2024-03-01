import type { UUID } from '@medsphere/shared';

export interface RevokeSessionCommand {
  sessionId: UUID;
  userId: UUID;
  actorId: UUID;
  reason: string;
  correlationId: UUID;
}
