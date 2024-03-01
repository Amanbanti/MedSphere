import type { UUID, ISODateString, ListQuery } from '@medsphere/shared';

export interface ListAppointmentsByDoctorCommand {
  organizationId: UUID;
  actorId: UUID;
  correlationId: string;
  query?: ListQuery;


  doctorId?: UUID;


  payload?: Record<string, unknown>;
  now?: ISODateString;
}
