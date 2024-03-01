import type { UUID, ISODateString, ListQuery } from '@medsphere/shared';

export interface ListNotificationInboxCommand {
  organizationId: UUID;
  actorId: UUID;
  correlationId: string;
  query?: ListQuery;



  recipientId?: UUID;

  payload?: Record<string, unknown>;
  now?: ISODateString;
}
