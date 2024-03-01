import type { UUID, ISODateString, ListQuery } from '@medsphere/shared';

export interface CheckPharmacyStockCommand {
  organizationId: UUID;
  actorId: UUID;
  correlationId: string;
  query?: ListQuery;




  ndcCode?: string;
  payload?: Record<string, unknown>;
  now?: ISODateString;
}
