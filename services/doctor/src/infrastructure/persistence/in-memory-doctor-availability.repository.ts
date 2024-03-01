import { Injectable } from '@nestjs/common';
import type { UUID } from '@medsphere/shared';
import { DoctorAvailability } from '../../domain/entities/doctor-availability.entity';
import type { DoctorAvailabilityRepository } from '../../domain/repositories/doctor.repository';

@Injectable()
export class InMemoryDoctorAvailabilityRepository implements DoctorAvailabilityRepository {
  private readonly store = new Map<string, DoctorAvailability>();

  private key(organizationId: UUID, id: UUID): string {
    return `${organizationId}:${id}`;
  }

  async save(record: DoctorAvailability): Promise<void> {
    this.store.set(this.key(record.organizationId, record.id), record);
  }

  async findById(organizationId: UUID, id: UUID): Promise<DoctorAvailability | null> {
    return this.store.get(this.key(organizationId, id)) ?? null;
  }

  async listByParent(organizationId: UUID, parentId: UUID): Promise<DoctorAvailability[]> {
    const fk = 'doctorId';
    return [...this.store.values()].filter(
      (item) => item.organizationId === organizationId && (item as unknown as Record<string, UUID>)[fk] === parentId,
    );
  }
}
