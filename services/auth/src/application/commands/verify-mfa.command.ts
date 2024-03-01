import type { UUID } from '@medsphere/shared';
import { MfaMethod } from '@medsphere/shared';

export interface VerifyMfaCommand {
  userId: UUID;
  method: MfaMethod;
  code: string;
  challengeId?: UUID;
  sessionId?: UUID;
  correlationId: UUID;
}
