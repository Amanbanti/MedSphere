import { Module } from '@nestjs/common';
import { AnalyticsEventController } from '../presentation/http/analytics-event.controller';
import { ANALYTICS_EVENT_REPOSITORY } from '../domain/repositories/analytics-event.repository';
import { InMemoryAnalyticsEventRepository } from '../infrastructure/persistence/in-memory-analytics-event.repository';
import { PrismaAnalyticsEventRepository } from '../infrastructure/persistence/prisma-analytics-event.repository';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { AnalyticsOrchestrator } from '../application/services/analytics-orchestrator.service';
import { AnalyticsEventPublisher } from '../infrastructure/messaging/analytics-event.publisher';

import {
  RecordAnalyticsEventUseCase,
    AggregateAnalyticsMetricsUseCase,
    GenerateAnalyticsReportUseCase,
    ExportAnalyticsDataUseCase,
} from '../application/use-cases';

@Module({
  controllers: [AnalyticsEventController],
  providers: [
    PrismaService,
    InMemoryAnalyticsEventRepository,
    AnalyticsOrchestrator,
    AnalyticsEventPublisher,
    {
      provide: ANALYTICS_EVENT_REPOSITORY,
      useClass: process.env.USE_IN_MEMORY_REPO === 'true'
        ? InMemoryAnalyticsEventRepository
        : PrismaAnalyticsEventRepository,
    },
    RecordAnalyticsEventUseCase,
    AggregateAnalyticsMetricsUseCase,
    GenerateAnalyticsReportUseCase,
    ExportAnalyticsDataUseCase,
  ],
  exports: [ANALYTICS_EVENT_REPOSITORY, AnalyticsOrchestrator],
})
export class AnalyticsModule {}
