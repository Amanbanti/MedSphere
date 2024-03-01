import type { UUID } from '@medsphere/shared';
import type { Appointment } from '../entities/appointment.entity';
import type { ListQuery, PaginatedResult } from '@medsphere/shared';

export const APPOINTMENT_REPOSITORY = Symbol('APPOINTMENT_REPOSITORY');

export interface AppointmentRepository {
  save(entity: Appointment): Promise<void>;
  findById(organizationId: UUID, id: UUID): Promise<Appointment | null>;
  list(organizationId: UUID, query: ListQuery): Promise<PaginatedResult<Appointment>>;
  existsByBusinessKey?(organizationId: UUID, key: string): Promise<boolean>;
}

