import { Module } from '@nestjs/common';
import { ImagingStudyController } from '../presentation/http/imaging-study.controller';
import { IMAGING_STUDY_REPOSITORY } from '../domain/repositories/imaging-study.repository';
import { InMemoryImagingStudyRepository } from '../infrastructure/persistence/in-memory-imaging-study.repository';
import { PrismaImagingStudyRepository } from '../infrastructure/persistence/prisma-imaging-study.repository';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { ImagingOrchestrator } from '../application/services/imaging-orchestrator.service';
import { ImagingEventPublisher } from '../infrastructure/messaging/imaging-event.publisher';

import {
  StoreImagingStudyUseCase,
    RetrieveImagingStudyUseCase,
    AnnotateImagingStudyUseCase,
    ArchiveImagingStudyUseCase,
    ListImagingStudiesUseCase,
} from '../application/use-cases';

@Module({
  controllers: [ImagingStudyController],
  providers: [
    PrismaService,
    InMemoryImagingStudyRepository,
    ImagingOrchestrator,
    ImagingEventPublisher,
    {
      provide: IMAGING_STUDY_REPOSITORY,
      useClass: process.env.USE_IN_MEMORY_REPO === 'true'
        ? InMemoryImagingStudyRepository
        : PrismaImagingStudyRepository,
    },
    StoreImagingStudyUseCase,
    RetrieveImagingStudyUseCase,
    AnnotateImagingStudyUseCase,
    ArchiveImagingStudyUseCase,
    ListImagingStudiesUseCase,
  ],
  exports: [IMAGING_STUDY_REPOSITORY, ImagingOrchestrator],
})
export class ImagingModule {}
