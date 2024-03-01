import type { Doctor } from '../../domain/entities/doctor.entity';

export interface DoctorDto {
  id: string;
  organizationId: string;
  npi: string;
  firstName: string;
  lastName: string;
  specialty: string;
  licenseNumber: string;
  departmentId: string | null;
  email: string;
  phone: string | null;
  status: DoctorStatus;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export class DoctorMapper {
  static toDto(entity: Doctor): DoctorDto {
    return {
      id: entity.id,
      organizationId: entity.organizationId,
      npi: entity.npi,
      firstName: entity.firstName,
      lastName: entity.lastName,
      specialty: entity.specialty,
      licenseNumber: entity.licenseNumber,
      departmentId: entity.departmentId,
      email: entity.email,
      phone: entity.phone,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version,
    };
  }
}
