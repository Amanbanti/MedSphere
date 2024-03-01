import type { UUID, ISODateString, ListQuery } from '@medsphere/shared';

export interface EnqueueJobCommand {
  organizationId: UUID;
  actorId: UUID;
  correlationId: string;






  payload?: Record<string, unknown>;
  now?: ISODateString;
}
