import type { UUID, ISODateString, ListQuery } from '@medsphere/shared';

export interface ListImagingStudiesCommand {
  organizationId: UUID;
  actorId: UUID;
  correlationId: string;
  query?: ListQuery;





  payload?: Record<string, unknown>;
  now?: ISODateString;
}
