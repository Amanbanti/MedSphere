/**
 * MedSphere test factory for Claim — synthetic development data builder.
 */
import type { UUID } from '../../types';

export interface ClaimFactoryData {
  patientId: string;
  payerId: string;
  status: string;
  totalCharge: number;
  totalPaid: number;
  submittedAt: string;
  claimNumber: string;
  id: UUID;
  organizationId: UUID;
  createdAt: string;
  updatedAt: string;
}

export class ClaimFactory {
  private data: Partial<ClaimFactoryData> = {
    id: '00000000-0000-4000-8000-0005000001' as UUID,
    organizationId: '00000000-0000-4000-8000-000000000001' as UUID,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    patientId: 'claim-patientId-001' as UUID,
    payerId: 'claim-payerId-001' as UUID,
    status: 'active',
    totalCharge: 959,
    totalPaid: 198,
    submittedAt: '2025-01-15T10:00:00.000Z',
    claimNumber: 'claimNumber sample',
  };

  withPatientId(value: string): this {
    this.data.patientId = value;
    return this;
  }

  withPayerId(value: string): this {
    this.data.payerId = value;
    return this;
  }

  withStatus(value: string): this {
    this.data.status = value;
    return this;
  }

  withTotalCharge(value: number): this {
    this.data.totalCharge = value;
    return this;
  }

  withTotalPaid(value: number): this {
    this.data.totalPaid = value;
    return this;
  }

  withSubmittedAt(value: string): this {
    this.data.submittedAt = value;
    return this;
  }

  withClaimNumber(value: string): this {
    this.data.claimNumber = value;
    return this;
  }

  build(): ClaimFactoryData {
    return this.data as ClaimFactoryData;
  }

  buildMany(count: number): ClaimFactoryData[] {
    return Array.from({ length: count }, (_, i) =>
      new ClaimFactory()
        .withPatientId(`${this.data.patientId}-${i}`)
                .withPayerId(`${this.data.payerId}-${i}`)
        .build(),
    );
  }

  clone(): ClaimFactory {
    const copy = new ClaimFactory();
    copy.data = { ...this.data };
    return copy;
  }

  toJSON(): string {
    return JSON.stringify(this.build(), null, 2);
  }
}

export const claimFactoryPresets = {
  preset0(): ClaimFactory {
    return new ClaimFactory().withPatientId('preset-0');
  }

  preset1(): ClaimFactory {
    return new ClaimFactory().withPatientId('preset-1');
  }

  preset2(): ClaimFactory {
    return new ClaimFactory().withPatientId('preset-2');
  }

  preset3(): ClaimFactory {
    return new ClaimFactory().withPatientId('preset-3');
  }

  preset4(): ClaimFactory {
    return new ClaimFactory().withPatientId('preset-4');
  }

  preset5(): ClaimFactory {
    return new ClaimFactory().withPatientId('preset-5');
  }

  preset6(): ClaimFactory {
    return new ClaimFactory().withPatientId('preset-6');
  }

  preset7(): ClaimFactory {
    return new ClaimFactory().withPatientId('preset-7');
  }

  preset8(): ClaimFactory {
    return new ClaimFactory().withPatientId('preset-8');
  }

  preset9(): ClaimFactory {
    return new ClaimFactory().withPatientId('preset-9');
  }

  preset10(): ClaimFactory {
    return new ClaimFactory().withPatientId('preset-10');
  }

  preset11(): ClaimFactory {
    return new ClaimFactory().withPatientId('preset-11');
  }

  preset12(): ClaimFactory {
    return new ClaimFactory().withPatientId('preset-12');
  }

  preset13(): ClaimFactory {
    return new ClaimFactory().withPatientId('preset-13');
  }

  preset14(): ClaimFactory {
    return new ClaimFactory().withPatientId('preset-14');
  }

  preset15(): ClaimFactory {
    return new ClaimFactory().withPatientId('preset-15');
  }

  preset16(): ClaimFactory {
    return new ClaimFactory().withPatientId('preset-16');
  }

  preset17(): ClaimFactory {
    return new ClaimFactory().withPatientId('preset-17');
  }

  preset18(): ClaimFactory {
    return new ClaimFactory().withPatientId('preset-18');
  }

  preset19(): ClaimFactory {
    return new ClaimFactory().withPatientId('preset-19');
  }

  preset20(): ClaimFactory {
    return new ClaimFactory().withPatientId('preset-20');
  }

  preset21(): ClaimFactory {
    return new ClaimFactory().withPatientId('preset-21');
  }

  preset22(): ClaimFactory {
    return new ClaimFactory().withPatientId('preset-22');
  }

  preset23(): ClaimFactory {
    return new ClaimFactory().withPatientId('preset-23');
  }

  preset24(): ClaimFactory {
    return new ClaimFactory().withPatientId('preset-24');
  }
};

export function createRandomClaim(seed: number): ClaimFactoryData {
  const factory = new ClaimFactory();
  factory.withPatientId(`seed-${seed}`);
  return factory.build();
}
