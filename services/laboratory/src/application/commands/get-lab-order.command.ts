import type { UUID, ISODateString, ListQuery } from '@medsphere/shared';

export interface GetLabOrderCommand {
  organizationId: UUID;
  actorId: UUID;
  correlationId: string;
  query?: ListQuery;
  id?: UUID;




  payload?: Record<string, unknown>;
  now?: ISODateString;
}
