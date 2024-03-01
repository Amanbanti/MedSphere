import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import { LabOrder } from '../entities/lab-order.entity';

export interface LabOrderFactoryInput {
  organizationId: UUID;
  patientId: UUID;
  orderingProviderId: UUID;
  testCode: string;
  testName: string;
  priority: LabPriority;
  status: LabOrderStatus;
  id?: UUID;
  now?: string;
}

export class LabOrderFactory {
  static create(input: LabOrderFactoryInput): LabOrder {
    const now = input.now ?? nowIso();
    const id = input.id ?? (uuidv4() as UUID);
    return LabOrder.register({
      id,
      organizationId: input.organizationId,
      now,
      patientId: input.patientId,
      orderingProviderId: input.orderingProviderId,
      testCode: input.testCode,
      testName: input.testName,
      priority: input.priority,
      status: input.status,
    } as Parameters<typeof LabOrder.register>[0]);
  }

  static reconstitute(props: Parameters<typeof LabOrder.reconstitute>[0]): LabOrder {
    return LabOrder.reconstitute(props);
  }

  static clone(source: LabOrder, overrides: Partial<LabOrderFactoryInput> = {}): LabOrder {
    const snapshot = source.toSnapshot();
    return LabOrderFactory.create({
      organizationId: snapshot.organizationId as UUID,
      patientId: (overrides.patientId ?? snapshot.patientId) as UUID,
      orderingProviderId: (overrides.orderingProviderId ?? snapshot.orderingProviderId) as UUID,
      testCode: (overrides.testCode ?? snapshot.testCode) as string,
      testName: (overrides.testName ?? snapshot.testName) as string,
      priority: (overrides.priority ?? snapshot.priority) as LabPriority,
      status: (overrides.status ?? snapshot.status) as LabOrderStatus,
      id: overrides.id,
      now: overrides.now,
    });
  }
}
