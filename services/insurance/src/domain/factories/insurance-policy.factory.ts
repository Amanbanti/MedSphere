import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import { InsurancePolicy } from '../entities/insurance-policy.entity';

export interface InsurancePolicyFactoryInput {
  organizationId: UUID;
  patientId: UUID;
  payerId: string;
  policyNumber: string;
  groupNumber?: string | null;
  effectiveFrom: string;
  effectiveTo?: string | null;
  id?: UUID;
  now?: string;
}

export class InsurancePolicyFactory {
  static create(input: InsurancePolicyFactoryInput): InsurancePolicy {
    const now = input.now ?? nowIso();
    const id = input.id ?? (uuidv4() as UUID);
    return InsurancePolicy.register({
      id,
      organizationId: input.organizationId,
      now,
      patientId: input.patientId,
      payerId: input.payerId,
      policyNumber: input.policyNumber,
      groupNumber: input.groupNumber ?? null,
      effectiveFrom: input.effectiveFrom,
      effectiveTo: input.effectiveTo ?? null,
    } as Parameters<typeof InsurancePolicy.register>[0]);
  }

  static reconstitute(props: Parameters<typeof InsurancePolicy.reconstitute>[0]): InsurancePolicy {
    return InsurancePolicy.reconstitute(props);
  }

  static clone(source: InsurancePolicy, overrides: Partial<InsurancePolicyFactoryInput> = {}): InsurancePolicy {
    const snapshot = source.toSnapshot();
    return InsurancePolicyFactory.create({
      organizationId: snapshot.organizationId as UUID,
      patientId: (overrides.patientId ?? snapshot.patientId) as UUID,
      payerId: (overrides.payerId ?? snapshot.payerId) as string,
      policyNumber: (overrides.policyNumber ?? snapshot.policyNumber) as string,
      groupNumber: (overrides.groupNumber ?? snapshot.groupNumber) as string | null,
      effectiveFrom: (overrides.effectiveFrom ?? snapshot.effectiveFrom) as string,
      effectiveTo: (overrides.effectiveTo ?? snapshot.effectiveTo) as string | null,
      id: overrides.id,
      now: overrides.now,
    });
  }
}
