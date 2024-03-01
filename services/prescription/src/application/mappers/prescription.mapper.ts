import type { Prescription } from '../../domain/entities/prescription.entity';

export interface PrescriptionDto {
  id: string;
  organizationId: string;
  patientId: string;
  prescriberId: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  durationDays: number;
  status: PrescriptionStatus;
  refillsRemaining: number;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export class PrescriptionMapper {
  static toDto(entity: Prescription): PrescriptionDto {
    return {
      id: entity.id,
      organizationId: entity.organizationId,
      patientId: entity.patientId,
      prescriberId: entity.prescriberId,
      medicationName: entity.medicationName,
      dosage: entity.dosage,
      frequency: entity.frequency,
      durationDays: entity.durationDays,
      status: entity.status,
      refillsRemaining: entity.refillsRemaining,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version,
    };
  }
}
