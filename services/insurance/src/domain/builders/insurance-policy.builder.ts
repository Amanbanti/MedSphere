import type { UUID } from '@medsphere/shared';
import { InsurancePolicyFactory, type InsurancePolicyFactoryInput } from '../factories/insurance-policy.factory';
import { InsurancePolicy } from '../entities/insurance-policy.entity';

export class InsurancePolicyBuilder {
  private readonly input: Partial<InsurancePolicyFactoryInput> = {};

  static create(): InsurancePolicyBuilder {
    return new InsurancePolicyBuilder();
  }

  withOrganization(organizationId: UUID): this {
    this.input.organizationId = organizationId;
    return this;
  }

  withPatientId(patientId: UUID): this {
    this.input.patientId = patientId;
    return this;
  }

  withPayerId(payerId: string): this {
    this.input.payerId = payerId;
    return this;
  }

  withPolicyNumber(policyNumber: string): this {
    this.input.policyNumber = policyNumber;
    return this;
  }

  withGroupNumber(groupNumber: string | null): this {
    this.input.groupNumber = groupNumber;
    return this;
  }

  withEffectiveFrom(effectiveFrom: string): this {
    this.input.effectiveFrom = effectiveFrom;
    return this;
  }

  withEffectiveTo(effectiveTo: string | null): this {
    this.input.effectiveTo = effectiveTo;
    return this;
  }

  withStatus(status: PolicyStatus): this {
    this.input.status = status;
    return this;
  }

  withId(id: UUID): this {
    this.input.id = id;
    return this;
  }

  build(): InsurancePolicy {
    if (!this.input.organizationId) {
      throw new Error('organizationId is required');
    }
    return InsurancePolicyFactory.create(this.input as InsurancePolicyFactoryInput);
  }
}
