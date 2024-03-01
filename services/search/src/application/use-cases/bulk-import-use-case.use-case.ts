import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import type { BulkImportCommand } from '../commands/bulk-import.command';
import { SEARCHDOCUMENT_REPOSITORY, type SearchDocumentRepository } from '../../domain/repositories/search-document.repository';
import { SearchOrchestrator } from '../services/search-orchestrator.service';
import { SearchAccessPolicy } from '../../domain/policies/search-access.policy';
import { SearchDocumentMapper } from '../mappers/search-document.mapper';

@Injectable()
export class BulkImportUseCase {
  constructor(
    @Inject(SEARCHDOCUMENT_REPOSITORY) private readonly repository: SearchDocumentRepository,
    private readonly orchestrator: SearchOrchestrator,
  ) {}

  async execute(command: BulkImportCommand) {
    SearchAccessPolicy.assertCanWrite(command.actor);
    SearchAccessPolicy.assertTenantScope(command.actor, command.organizationId);

    return this.handleCommand(command);
  }

  private async handleCommand(command: BulkImportCommand) {
    const now = command.now ?? nowIso();
    const entity = await this.orchestrator.getOrThrow(command.organizationId, command.searchDocumentId);
    const handler = (entity as unknown as Record<string, (now: string, payload?: Record<string, unknown>) => void>)['bulkImport'];
    if (typeof handler === 'function') {
      handler.call(entity, now, command.payload ?? {});
    } else {
      entity.touch(now);
    }
    await this.repository.save(entity);
    return SearchDocumentMapper.toDto(entity);
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
      data: result.data.map((e) => SearchDocumentMapper.toListItem(e)),
      meta: result.meta,
    };
  }
}
