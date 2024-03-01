import type { UUID, ISODateString, ListQuery } from '@medsphere/shared';

export interface RegisterWorkerHandlerCommand {
  organizationId: UUID;
  actorId: UUID;
  correlationId: string;






  payload?: Record<string, unknown>;
  now?: ISODateString;
}
