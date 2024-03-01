import type { UUID } from '@medsphere/shared';
import { MfaMethod } from '@medsphere/shared';

export interface EnrollMfaCommand {
  userId: UUID;
  method: MfaMethod;
  correlationId: UUID;
}
