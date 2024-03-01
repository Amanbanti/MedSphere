import type { UUID, ISODateString, ListQuery } from '@medsphere/shared';

export interface ReindexSearchCorpusCommand {
  organizationId: UUID;
  actorId: UUID;
  correlationId: string;






  payload?: Record<string, unknown>;
  now?: ISODateString;
}
