import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import type { BulkImportCommand } from '../commands/bulk-import.command';
import { INVOICE_REPOSITORY, type InvoiceRepository } from '../../domain/repositories/invoice.repository';
import { BillingOrchestrator } from '../services/billing-orchestrator.service';
import { BillingAccessPolicy } from '../../domain/policies/billing-access.policy';
import { InvoiceMapper } from '../mappers/invoice.mapper';

@Injectable()
export class BulkImportUseCase {
  constructor(
    @Inject(INVOICE_REPOSITORY) private readonly repository: InvoiceRepository,
    private readonly orchestrator: BillingOrchestrator,
  ) {}

  async execute(command: BulkImportCommand) {
    BillingAccessPolicy.assertCanWrite(command.actor);
    BillingAccessPolicy.assertTenantScope(command.actor, command.organizationId);

    return this.handleCommand(command);
  }

  private async handleCommand(command: BulkImportCommand) {
    const now = command.now ?? nowIso();
    const entity = await this.orchestrator.getOrThrow(command.organizationId, command.invoiceId);
    const handler = (entity as unknown as Record<string, (now: string, payload?: Record<string, unknown>) => void>)['bulkImport'];
    if (typeof handler === 'function') {
      handler.call(entity, now, command.payload ?? {});
    } else {
      entity.touch(now);
    }
    await this.repository.save(entity);
    return InvoiceMapper.toDto(entity);
  }

  private async handleQuery(command: BulkImportCommand) {
    const query: ListQuery = {
      page: command.page ?? 1,
      pageSize: command.pageSize ?? 25,
      search: command.search,
      filters: command.filters,
    };
    const result = await this.repository.list(command.organizationId, query);
    return {
      data: result.data.map((e) => InvoiceMapper.toListItem(e)),
      meta: result.meta,
    };
  }
}
