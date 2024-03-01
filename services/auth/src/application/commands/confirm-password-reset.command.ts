import type { UUID } from '@medsphere/shared';

export interface ConfirmPasswordResetCommand {
  token: string;
  newPassword: string;
  correlationId: UUID;
}
