import type { UUID } from '@medsphere/shared';

export interface RequestPasswordResetCommand {
  email: string;
  correlationId: UUID;
  ipAddress?: string;
}
