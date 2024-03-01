import { Injectable } from '@nestjs/common';
import type { UUID } from '@medsphere/shared';
import { PatientAllergy } from '../../domain/entities/patient-allergy.entity';
import type { PatientAllergyRepository } from '../../domain/repositories/patient.repository';

@Injectable()
export class InMemoryPatientAllergyRepository implements PatientAllergyRepository {
  private readonly store = new Map<string, PatientAllergy>();

  private key(organizationId: UUID, id: UUID): string {
    return `${organizationId}:${id}`;
  }

  async save(record: PatientAllergy): Promise<void> {
    this.store.set(this.key(record.organizationId, record.id), record);
  }

  async findById(organizationId: UUID, id: UUID): Promise<PatientAllergy | null> {
    return this.store.get(this.key(organizationId, id)) ?? null;
  }

  async listByParent(organizationId: UUID, parentId: UUID): Promise<PatientAllergy[]> {
    const fk = 'patientId';
    return [...this.store.values()].filter(
      (item) => item.organizationId === organizationId && (item as unknown as Record<string, UUID>)[fk] === parentId,
    );
  }
}
