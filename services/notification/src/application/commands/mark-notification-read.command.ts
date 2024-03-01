import type { UUID, ISODateString, ListQuery } from '@medsphere/shared';

export interface MarkNotificationReadCommand {
  organizationId: UUID;
  actorId: UUID;
  correlationId: string;

  id?: UUID;




  payload?: Record<string, unknown>;
  now?: ISODateString;
}
