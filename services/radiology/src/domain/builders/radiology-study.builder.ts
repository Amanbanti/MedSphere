import type { UUID } from '@medsphere/shared';
import { RadiologyStudyFactory, type RadiologyStudyFactoryInput } from '../factories/radiology-study.factory';
import { RadiologyStudy } from '../entities/radiology-study.entity';

export class RadiologyStudyBuilder {
  private readonly input: Partial<RadiologyStudyFactoryInput> = {};

  static create(): RadiologyStudyBuilder {
    return new RadiologyStudyBuilder();
  }

  withOrganization(organizationId: UUID): this {
    this.input.organizationId = organizationId;
    return this;
  }

  withPatientId(patientId: UUID): this {
    this.input.patientId = patientId;
    return this;
  }

  withModality(modality: string): this {
    this.input.modality = modality;
    return this;
  }

  withBodyPart(bodyPart: string): this {
    this.input.bodyPart = bodyPart;
    return this;
  }

  withScheduledAt(scheduledAt: string): this {
    this.input.scheduledAt = scheduledAt;
    return this;
  }

  withStatus(status: RadiologyStatus): this {
    this.input.status = status;
    return this;
  }

  withFindings(findings: string | null): this {
    this.input.findings = findings;
    return this;
  }

  withReportedBy(reportedBy: UUID | null): this {
    this.input.reportedBy = reportedBy;
    return this;
  }

  withId(id: UUID): this {
    this.input.id = id;
    return this;
  }

  build(): RadiologyStudy {
    if (!this.input.organizationId) {
      throw new Error('organizationId is required');
    }
    return RadiologyStudyFactory.create(this.input as RadiologyStudyFactoryInput);
  }
}
