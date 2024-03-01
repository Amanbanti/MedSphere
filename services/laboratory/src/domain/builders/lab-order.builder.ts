import type { UUID } from '@medsphere/shared';
import { LabOrderFactory, type LabOrderFactoryInput } from '../factories/lab-order.factory';
import { LabOrder } from '../entities/lab-order.entity';

export class LabOrderBuilder {
  private readonly input: Partial<LabOrderFactoryInput> = {};

  static create(): LabOrderBuilder {
    return new LabOrderBuilder();
  }

  withOrganization(organizationId: UUID): this {
    this.input.organizationId = organizationId;
    return this;
  }

  withPatientId(patientId: UUID): this {
    this.input.patientId = patientId;
    return this;
  }

  withOrderingProviderId(orderingProviderId: UUID): this {
    this.input.orderingProviderId = orderingProviderId;
    return this;
  }

  withTestCode(testCode: string): this {
    this.input.testCode = testCode;
    return this;
  }

  withTestName(testName: string): this {
    this.input.testName = testName;
    return this;
  }

  withPriority(priority: LabPriority): this {
    this.input.priority = priority;
    return this;
  }

  withStatus(status: LabOrderStatus): this {
    this.input.status = status;
    return this;
  }

  withCollectedAt(collectedAt: string | null): this {
    this.input.collectedAt = collectedAt;
    return this;
  }

  withResultValue(resultValue: string | null): this {
    this.input.resultValue = resultValue;
    return this;
  }

  withId(id: UUID): this {
    this.input.id = id;
    return this;
  }

  build(): LabOrder {
    if (!this.input.organizationId) {
      throw new Error('organizationId is required');
    }
    return LabOrderFactory.create(this.input as LabOrderFactoryInput);
  }
}
