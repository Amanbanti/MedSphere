import type { UUID } from '@medsphere/shared';
import { MedicalRecordFactory, type MedicalRecordFactoryInput } from '../factories/medical-record.factory';
import { MedicalRecord } from '../entities/medical-record.entity';

export class MedicalRecordBuilder {
  private readonly input: Partial<MedicalRecordFactoryInput> = {};

  static create(): MedicalRecordBuilder {
    return new MedicalRecordBuilder();
  }

  withOrganization(organizationId: UUID): this {
    this.input.organizationId = organizationId;
    return this;
  }

  withPatientId(patientId: UUID): this {
    this.input.patientId = patientId;
    return this;
  }

  withEncounterId(encounterId: UUID | null): this {
    this.input.encounterId = encounterId;
    return this;
  }

  withRecordType(recordType: MedicalRecordType): this {
    this.input.recordType = recordType;
    return this;
  }

  withTitle(title: string): this {
    this.input.title = title;
    return this;
  }

  withSummary(summary: string): this {
    this.input.summary = summary;
    return this;
  }

  withStatus(status: RecordStatus): this {
    this.input.status = status;
    return this;
  }

  withSignedAt(signedAt: string | null): this {
    this.input.signedAt = signedAt;
    return this;
  }

  withSignedBy(signedBy: UUID | null): this {
    this.input.signedBy = signedBy;
    return this;
  }

  withId(id: UUID): this {
    this.input.id = id;
    return this;
  }

  build(): MedicalRecord {
    if (!this.input.organizationId) {
      throw new Error('organizationId is required');
    }
    return MedicalRecordFactory.create(this.input as MedicalRecordFactoryInput);
  }
}
