import type { Patient } from '../../domain/entities/patient.entity';

export interface PatientDto {
  id: string;
  organizationId: string;
  mrn: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  email: string | null;
  phone: string | null;
  bloodType: string | null;
  status: PatientStatus;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export class PatientMapper {
  static toDto(entity: Patient): PatientDto {
    return {
      id: entity.id,
      organizationId: entity.organizationId,
      mrn: entity.mrn,
      firstName: entity.firstName,
      lastName: entity.lastName,
      dateOfBirth: entity.dateOfBirth,
      gender: entity.gender,
      email: entity.email,
      phone: entity.phone,
      bloodType: entity.bloodType,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version,
    };
  }
}
