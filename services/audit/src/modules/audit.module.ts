import { Module } from '@nestjs/common';
import { AuditEntryController } from '../presentation/http/audit-entry.controller';
import { AUDIT_ENTRY_REPOSITORY } from '../domain/repositories/audit-entry.repository';
import { InMemoryAuditEntryRepository } from '../infrastructure/persistence/in-memory-audit-entry.repository';
import { PrismaAuditEntryRepository } from '../infrastructure/persistence/prisma-audit-entry.repository';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { AuditOrchestrator } from '../application/services/audit-orchestrator.service';
import { AuditEventPublisher } from '../infrastructure/messaging/audit-event.publisher';

import {
  AppendAuditLogUseCase,
    QueryAuditLogsUseCase,
    ExportAuditTrailUseCase,
} from '../application/use-cases';

@Module({
  controllers: [AuditEntryController],
  providers: [
    PrismaService,
    InMemoryAuditEntryRepository,
    AuditOrchestrator,
    AuditEventPublisher,
    {
      provide: AUDIT_ENTRY_REPOSITORY,
      useClass: process.env.USE_IN_MEMORY_REPO === 'true'
        ? InMemoryAuditEntryRepository
        : PrismaAuditEntryRepository,
    },
    AppendAuditLogUseCase,
    QueryAuditLogsUseCase,
    ExportAuditTrailUseCase,
  ],
  exports: [AUDIT_ENTRY_REPOSITORY, AuditOrchestrator],
})
export class AuditModule {}
