import type { ISODateString, UUID } from '@medsphere/shared';

export interface DoctorAvailabilityProps {
  id: UUID;
  organizationId: UUID;
  doctorId: UUID;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  facilityId: UUID;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export class DoctorAvailability {
  private readonly props: DoctorAvailabilityProps;

  private constructor(props: DoctorAvailabilityProps) {
    this.props = { ...props };
  }

  static create(props: DoctorAvailabilityProps): DoctorAvailability {
    return new DoctorAvailability(props);
  }

  static record(input: Omit<DoctorAvailabilityProps, 'createdAt' | 'updatedAt'> & { now: ISODateString }): DoctorAvailability {
    return new DoctorAvailability({
      ...input,
      createdAt: input.now,
      updatedAt: input.now,
    });
  }

  get doctorId(): UUID {
    return this.props.doctorId;
  }

  get dayOfWeek(): number {
    return this.props.dayOfWeek;
  }

  get startTime(): string {
    return this.props.startTime;
  }

  get endTime(): string {
    return this.props.endTime;
  }

  get facilityId(): UUID {
    return this.props.facilityId;
  }

  get id(): UUID {
    return this.props.id;
  }

  get organizationId(): UUID {
    return this.props.organizationId;
  }

  toProps(): DoctorAvailabilityProps {
    return { ...this.props };
  }
}
