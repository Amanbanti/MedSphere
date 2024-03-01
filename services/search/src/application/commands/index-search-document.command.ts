import type { UUID, ISODateString, ListQuery } from '@medsphere/shared';

export interface IndexSearchDocumentCommand {
  organizationId: UUID;
  actorId: UUID;
  correlationId: string;






  payload?: Record<string, unknown>;
  now?: ISODateString;
}
