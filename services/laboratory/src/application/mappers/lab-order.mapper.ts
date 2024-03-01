import type { LabOrder } from '../../domain/entities/lab-order.entity';

export interface LabOrderDto {
  id: string;
  organizationId: string;
  patientId: string;
  orderingProviderId: string;
  testCode: string;
  testName: string;
  priority: LabPriority;
  status: LabOrderStatus;
  collectedAt: string | null;
  resultValue: string | null;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export class LabOrderMapper {
  static toDto(entity: LabOrder): LabOrderDto {
    return {
      id: entity.id,
      organizationId: entity.organizationId,
      patientId: entity.patientId,
      orderingProviderId: entity.orderingProviderId,
      testCode: entity.testCode,
      testName: entity.testName,
      priority: entity.priority,
      status: entity.status,
      collectedAt: entity.collectedAt,
      resultValue: entity.resultValue,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version,
    };
  }
}
