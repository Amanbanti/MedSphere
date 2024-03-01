import { Module } from '@nestjs/common';
import { SearchDocumentController } from '../presentation/http/search-document.controller';
import { SEARCH_DOCUMENT_REPOSITORY } from '../domain/repositories/search-document.repository';
import { InMemorySearchDocumentRepository } from '../infrastructure/persistence/in-memory-search-document.repository';
import { PrismaSearchDocumentRepository } from '../infrastructure/persistence/prisma-search-document.repository';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { SearchOrchestrator } from '../application/services/search-orchestrator.service';
import { SearchEventPublisher } from '../infrastructure/messaging/search-event.publisher';

import {
  IndexSearchDocumentUseCase,
    SearchDocumentsUseCase,
    ReindexSearchCorpusUseCase,
    DeleteSearchDocumentUseCase,
} from '../application/use-cases';

@Module({
  controllers: [SearchDocumentController],
  providers: [
    PrismaService,
    InMemorySearchDocumentRepository,
    SearchOrchestrator,
    SearchEventPublisher,
    {
      provide: SEARCH_DOCUMENT_REPOSITORY,
      useClass: process.env.USE_IN_MEMORY_REPO === 'true'
        ? InMemorySearchDocumentRepository
        : PrismaSearchDocumentRepository,
    },
    IndexSearchDocumentUseCase,
    SearchDocumentsUseCase,
    ReindexSearchCorpusUseCase,
    DeleteSearchDocumentUseCase,
  ],
  exports: [SEARCH_DOCUMENT_REPOSITORY, SearchOrchestrator],
})
export class SearchModule {}
