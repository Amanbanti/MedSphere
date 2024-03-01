import type { ISODateString, UUID } from '@medsphere/shared';

export interface PatientVitalProps {
  id: UUID;
  organizationId: UUID;
  patientId: UUID;
  recordedAt: ISODateString;
  bloodPressureSystolic: number | null;
  bloodPressureDiastolic: number | null;
  heartRate: number | null;
  temperatureCelsius: number | null;
  weightKg: number | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export class PatientVital {
  private readonly props: PatientVitalProps;

  private constructor(props: PatientVitalProps) {
    this.props = { ...props };
  }

  static create(props: PatientVitalProps): PatientVital {
    return new PatientVital(props);
  }

  static record(input: Omit<PatientVitalProps, 'createdAt' | 'updatedAt'> & { now: ISODateString }): PatientVital {
    return new PatientVital({
      ...input,
      createdAt: input.now,
      updatedAt: input.now,
    });
  }

  get patientId(): UUID {
    return this.props.patientId;
  }

  get recordedAt(): ISODateString {
    return this.props.recordedAt;
  }

  get bloodPressureSystolic(): number | null {
    return this.props.bloodPressureSystolic;
  }

  get bloodPressureDiastolic(): number | null {
    return this.props.bloodPressureDiastolic;
  }

  get heartRate(): number | null {
    return this.props.heartRate;
  }

  get temperatureCelsius(): number | null {
    return this.props.temperatureCelsius;
  }

  get weightKg(): number | null {
    return this.props.weightKg;
  }

  get id(): UUID {
    return this.props.id;
  }

  get organizationId(): UUID {
    return this.props.organizationId;
  }

  toProps(): PatientVitalProps {
    return { ...this.props };
  }
}
