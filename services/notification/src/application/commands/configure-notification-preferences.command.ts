import type { UUID, ISODateString, ListQuery } from '@medsphere/shared';

export interface ConfigureNotificationPreferencesCommand {
  organizationId: UUID;
  actorId: UUID;
  correlationId: string;




  recipientId?: UUID;

  payload?: Record<string, unknown>;
  now?: ISODateString;
}
