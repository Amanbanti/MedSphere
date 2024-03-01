import { Injectable } from '@nestjs/common';
import type { UUID } from '@medsphere/shared';
import { PatientVital } from '../../domain/entities/patient-vital.entity';
import type { PatientVitalRepository } from '../../domain/repositories/patient.repository';

@Injectable()
export class InMemoryPatientVitalRepository implements PatientVitalRepository {
  private readonly store = new Map<string, PatientVital>();

  private key(organizationId: UUID, id: UUID): string {
    return `${organizationId}:${id}`;
  }

  async save(record: PatientVital): Promise<void> {
    this.store.set(this.key(record.organizationId, record.id), record);
  }

  async findById(organizationId: UUID, id: UUID): Promise<PatientVital | null> {
    return this.store.get(this.key(organizationId, id)) ?? null;
  }

  async listByParent(organizationId: UUID, parentId: UUID): Promise<PatientVital[]> {
    const fk = 'patientId';
    return [...this.store.values()].filter(
      (item) => item.organizationId === organizationId && (item as unknown as Record<string, UUID>)[fk] === parentId,
    );
  }
}
