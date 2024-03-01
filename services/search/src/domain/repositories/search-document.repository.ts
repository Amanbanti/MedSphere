import type { UUID } from '@medsphere/shared';
import type { SearchDocument } from '../entities/search-document.entity';
import type { ListQuery, PaginatedResult } from '@medsphere/shared';

export const SEARCH_DOCUMENT_REPOSITORY = Symbol('SEARCH_DOCUMENT_REPOSITORY');

export interface SearchDocumentRepository {
  save(entity: SearchDocument): Promise<void>;
  findById(organizationId: UUID, id: UUID): Promise<SearchDocument | null>;
  list(organizationId: UUID, query: ListQuery): Promise<PaginatedResult<SearchDocument>>;
  existsByBusinessKey?(organizationId: UUID, key: string): Promise<boolean>;
}

