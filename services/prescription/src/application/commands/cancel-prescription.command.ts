import type { UUID, ISODateString, ListQuery } from '@medsphere/shared';

export interface CancelPrescriptionCommand {
  organizationId: UUID;
  actorId: UUID;
  correlationId: string;

  id?: UUID;




  payload?: Record<string, unknown>;
  now?: ISODateString;
}
