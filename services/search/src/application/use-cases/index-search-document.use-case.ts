import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { IndexSearchDocumentCommand } from '../commands/index-search-document.command';
import { SEARCH_DOCUMENT_REPOSITORY, type SearchDocumentRepository } from '../../domain/repositories/search-document.repository';
import { SearchDocument } from '../../domain/entities/search-document.entity';
import {
  SearchNotFoundError,
  ValidationError,
} from '../../domain/errors/search.errors';
import { SearchDocumentMapper } from '../mappers/search-document.mapper';

@Injectable()
export class IndexSearchDocumentUseCase {
  constructor(
    @Inject(SEARCH_DOCUMENT_REPOSITORY) private readonly repository: SearchDocumentRepository,
  ) {}

  async execute(command: IndexSearchDocumentCommand) {
    const query = command.query ?? {};
    const result = await this.repository.list(command.organizationId, query);
    return {
      items: result.items.map((item) => SearchDocumentMapper.toDto(item)),
      meta: result.meta,
    };
  }
}
