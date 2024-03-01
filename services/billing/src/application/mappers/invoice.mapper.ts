import type { Invoice } from '../../domain/entities/invoice.entity';

export interface InvoiceDto {
  id: string;
  organizationId: string;
  patientId: string;
  encounterId: string | null;
  totalAmountCents: number;
  paidAmountCents: number;
  currency: string;
  status: InvoiceStatus;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export class InvoiceMapper {
  static toDto(entity: Invoice): InvoiceDto {
    return {
      id: entity.id,
      organizationId: entity.organizationId,
      patientId: entity.patientId,
      encounterId: entity.encounterId,
      totalAmountCents: entity.totalAmountCents,
      paidAmountCents: entity.paidAmountCents,
      currency: entity.currency,
      status: entity.status,
      dueDate: entity.dueDate,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version,
    };
  }
}
