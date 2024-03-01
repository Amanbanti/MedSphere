import { Injectable } from '@nestjs/common';
import type { UUID } from '@medsphere/shared';
import { InvoiceLineItem } from '../../domain/entities/invoice-line-item.entity';
import type { InvoiceLineItemRepository } from '../../domain/repositories/invoice.repository';

@Injectable()
export class InMemoryInvoiceLineItemRepository implements InvoiceLineItemRepository {
  private readonly store = new Map<string, InvoiceLineItem>();

  private key(organizationId: UUID, id: UUID): string {
    return `${organizationId}:${id}`;
  }

  async save(record: InvoiceLineItem): Promise<void> {
    this.store.set(this.key(record.organizationId, record.id), record);
  }

  async findById(organizationId: UUID, id: UUID): Promise<InvoiceLineItem | null> {
    return this.store.get(this.key(organizationId, id)) ?? null;
  }

  async listByParent(organizationId: UUID, parentId: UUID): Promise<InvoiceLineItem[]> {
    const fk = 'invoiceId';
    return [...this.store.values()].filter(
      (item) => item.organizationId === organizationId && (item as unknown as Record<string, UUID>)[fk] === parentId,
    );
  }
}
