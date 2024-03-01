import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import { SEARCH_DOCUMENT_REPOSITORY, type SearchDocumentRepository } from '../../domain/repositories/search-document.repository';
import { SearchDomainRules } from '../../domain/services/search-rules.service';
import { SearchDocument } from '../../domain/entities/search-document.entity';
import { SearchNotFoundError } from '../../domain/errors/search.errors';

@Injectable()
export class SearchOrchestrator {
  private readonly rules = new SearchDomainRules();

  constructor(
    @Inject(SEARCH_DOCUMENT_REPOSITORY) private readonly repository: SearchDocumentRepository,
  ) {}

  async getOrThrow(organizationId: UUID, id: UUID): Promise<SearchDocument> {
    const entity = await this.repository.findById(organizationId, id);
    if (!entity) {
      throw new SearchNotFoundError(id);
    }
    entity.assertActive();
    return entity;
  }

  async list(organizationId: UUID, query: ListQuery) {
    return this.repository.list(organizationId, query);
  }

  async persist(entity: SearchDocument): Promise<void> {
    await this.repository.save(entity);
  }

  async applyMutation(
    organizationId: UUID,
    id: UUID,
    verb: string,
    payload: Record<string, unknown> = {},
  ): Promise<SearchDocument> {
    const entity = await this.getOrThrow(organizationId, id);
    const now = nowIso();
    const sanitized = this.rules.sanitizePayload(payload);
    const handler = (entity as unknown as Record<string, (now: typeof now, payload?: Record<string, unknown>) => void>)[verb];
    if (typeof handler === 'function') {
      handler.call(entity, now, sanitized);
    } else {
      entity.touch(now);
    }
    await this.persist(entity);
    return entity;
  }
}
