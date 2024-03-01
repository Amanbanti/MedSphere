import type { ISODateString, UUID } from '@medsphere/shared';

export interface PatientAllergyProps {
  id: UUID;
  organizationId: UUID;
  patientId: UUID;
  allergen: string;
  severity: AllergySeverity;
  reaction: string | null;
  recordedAt: ISODateString;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export class PatientAllergy {
  private readonly props: PatientAllergyProps;

  private constructor(props: PatientAllergyProps) {
    this.props = { ...props };
  }

  static create(props: PatientAllergyProps): PatientAllergy {
    return new PatientAllergy(props);
  }

  static record(input: Omit<PatientAllergyProps, 'createdAt' | 'updatedAt'> & { now: ISODateString }): PatientAllergy {
    return new PatientAllergy({
      ...input,
      createdAt: input.now,
      updatedAt: input.now,
    });
  }

  get patientId(): UUID {
    return this.props.patientId;
  }

  get allergen(): string {
    return this.props.allergen;
  }

  get severity(): AllergySeverity {
    return this.props.severity;
  }

  get reaction(): string | null {
    return this.props.reaction;
  }

  get recordedAt(): ISODateString {
    return this.props.recordedAt;
  }

  get id(): UUID {
    return this.props.id;
  }

  get organizationId(): UUID {
    return this.props.organizationId;
  }

  toProps(): PatientAllergyProps {
    return { ...this.props };
  }
}
