import type { UUID, ISODateString, ListQuery } from '@medsphere/shared';

export interface CheckPrescriptionInteractionsCommand {
  organizationId: UUID;
  actorId: UUID;
  correlationId: string;






  payload?: Record<string, unknown>;
  now?: ISODateString;
}
