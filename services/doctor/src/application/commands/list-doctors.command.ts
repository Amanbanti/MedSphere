import type { UUID, ISODateString, ListQuery } from '@medsphere/shared';

export interface ListDoctorsCommand {
  organizationId: UUID;
  actorId: UUID;
  correlationId: string;
  query?: ListQuery;





  payload?: Record<string, unknown>;
  now?: ISODateString;
}
