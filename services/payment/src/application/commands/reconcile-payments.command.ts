import type { UUID, ISODateString, ListQuery } from '@medsphere/shared';

export interface ReconcilePaymentsCommand {
  organizationId: UUID;
  actorId: UUID;
  correlationId: string;






  payload?: Record<string, unknown>;
  now?: ISODateString;
}
