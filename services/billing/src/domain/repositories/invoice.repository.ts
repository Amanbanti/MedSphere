import type { UUID } from '@medsphere/shared';
import type { Invoice } from '../entities/invoice.entity';
import type { ListQuery, PaginatedResult } from '@medsphere/shared';

export const INVOICE_REPOSITORY = Symbol('INVOICE_REPOSITORY');

export interface InvoiceRepository {
  save(entity: Invoice): Promise<void>;
  findById(organizationId: UUID, id: UUID): Promise<Invoice | null>;
  list(organizationId: UUID, query: ListQuery): Promise<PaginatedResult<Invoice>>;
  existsByBusinessKey?(organizationId: UUID, key: string): Promise<boolean>;
}

export const INVOICE_LINE_ITEM_REPOSITORY = Symbol('INVOICE_LINE_ITEM_REPOSITORY');

export interface InvoiceLineItemRepository {
  save(record: import('../entities/invoice-line-item.entity').InvoiceLineItem): Promise<void>;
  findById(organizationId: UUID, id: UUID): Promise<import('../entities/invoice-line-item.entity').InvoiceLineItem | null>;
  listByParent(organizationId: UUID, parentId: UUID): Promise<import('../entities/invoice-line-item.entity').InvoiceLineItem[]>;
}

