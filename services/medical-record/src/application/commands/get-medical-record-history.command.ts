import type { UUID, ISODateString, ListQuery } from '@medsphere/shared';

export interface GetMedicalRecordHistoryCommand {
  organizationId: UUID;
  actorId: UUID;
  correlationId: string;
  query?: ListQuery;

  patientId?: UUID;



  payload?: Record<string, unknown>;
  now?: ISODateString;
}
