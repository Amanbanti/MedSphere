import { Module } from '@nestjs/common';
import { VideoSessionController } from '../presentation/http/video-session.controller';
import { VIDEO_SESSION_REPOSITORY } from '../domain/repositories/video-session.repository';
import { InMemoryVideoSessionRepository } from '../infrastructure/persistence/in-memory-video-session.repository';
import { PrismaVideoSessionRepository } from '../infrastructure/persistence/prisma-video-session.repository';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { VideoConsultationOrchestrator } from '../application/services/video-consultation-orchestrator.service';
import { VideoConsultationEventPublisher } from '../infrastructure/messaging/video-consultation-event.publisher';

import {
  StartVideoSessionUseCase,
    JoinVideoSessionUseCase,
    EndVideoSessionUseCase,
    RecordVideoSessionMetadataUseCase,
} from '../application/use-cases';

@Module({
  controllers: [VideoSessionController],
  providers: [
    PrismaService,
    InMemoryVideoSessionRepository,
    VideoConsultationOrchestrator,
    VideoConsultationEventPublisher,
    {
      provide: VIDEO_SESSION_REPOSITORY,
      useClass: process.env.USE_IN_MEMORY_REPO === 'true'
        ? InMemoryVideoSessionRepository
        : PrismaVideoSessionRepository,
    },
    StartVideoSessionUseCase,
    JoinVideoSessionUseCase,
    EndVideoSessionUseCase,
    RecordVideoSessionMetadataUseCase,
  ],
  exports: [VIDEO_SESSION_REPOSITORY, VideoConsultationOrchestrator],
})
export class VideoConsultationModule {}
