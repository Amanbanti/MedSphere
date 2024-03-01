import { Module } from '@nestjs/common';
import { RadiologyStudyController } from '../presentation/http/radiology-study.controller';
import { RADIOLOGY_STUDY_REPOSITORY } from '../domain/repositories/radiology-study.repository';
import { InMemoryRadiologyStudyRepository } from '../infrastructure/persistence/in-memory-radiology-study.repository';
import { PrismaRadiologyStudyRepository } from '../infrastructure/persistence/prisma-radiology-study.repository';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { RadiologyOrchestrator } from '../application/services/radiology-orchestrator.service';
import { RadiologyEventPublisher } from '../infrastructure/messaging/radiology-event.publisher';

import {
  ScheduleRadiologyStudyUseCase,
    AcquireRadiologyImagesUseCase,
    ReportRadiologyFindingsUseCase,
    ListRadiologyStudiesUseCase,
} from '../application/use-cases';

@Module({
  controllers: [RadiologyStudyController],
  providers: [
    PrismaService,
    InMemoryRadiologyStudyRepository,
    RadiologyOrchestrator,
    RadiologyEventPublisher,
    {
      provide: RADIOLOGY_STUDY_REPOSITORY,
      useClass: process.env.USE_IN_MEMORY_REPO === 'true'
        ? InMemoryRadiologyStudyRepository
        : PrismaRadiologyStudyRepository,
    },
    ScheduleRadiologyStudyUseCase,
    AcquireRadiologyImagesUseCase,
    ReportRadiologyFindingsUseCase,
    ListRadiologyStudiesUseCase,
  ],
  exports: [RADIOLOGY_STUDY_REPOSITORY, RadiologyOrchestrator],
})
export class RadiologyModule {}
