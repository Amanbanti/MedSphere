import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import type { ArchiveSearchDocumentCommand } from '../commands/archive-search-document.command';
import { SEARCHDOCUMENT_REPOSITORY, type SearchDocumentRepository } from '../../domain/repositories/search-document.repository';
import { SearchOrchestrator } from '../services/search-orchestrator.service';
import { SearchAccessPolicy } from '../../domain/policies/search-access.policy';
import { SearchDocumentMapper } from '../mappers/search-document.mapper';

@Injectable()
export class ArchiveSearchDocumentUseCase {
  constructor(
    @Inject(SEARCHDOCUMENT_REPOSITORY) private readonly repository: SearchDocumentRepository,
    private readonly orchestrator: SearchOrchestrator,
  ) {}

  async execute(command: ArchiveSearchDocumentCommand) {
    SearchAccessPolicy.assertCanWrite(command.actor);
    SearchAccessPolicy.assertTenantScope(command.actor, command.organizationId);

    return this.handleCommand(command);
  }

  private async handleCommand(command: ArchiveSearchDocumentCommand) {
    const now = command.now ?? nowIso();
    const entity = await this.orchestrator.getOrThrow(command.organizationId, command.searchDocumentId);
    const handler = (entity as unknown as Record<string, (now: string, payload?: Record<string, unknown>) => void>)['archive'];
    if (typeof handler === 'function') {
      handler.call(entity, now, command.payload ?? {});
    } else {
      entity.touch(now);
    }
    await this.repository.save(entity);
    return SearchDocumentMapper.toDto(entity);
  }

  private async handleQuery(command: ArchiveSearchDocumentCommand) {
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
