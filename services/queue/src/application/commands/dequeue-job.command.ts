import type { UUID, ISODateString, ListQuery } from '@medsphere/shared';

export interface DequeueJobCommand {
  organizationId: UUID;
  actorId: UUID;
  correlationId: string;






  payload?: Record<string, unknown>;
  now?: ISODateString;
}
