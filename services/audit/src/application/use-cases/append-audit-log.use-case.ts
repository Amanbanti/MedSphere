import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { AppendAuditLogCommand } from '../commands/append-audit-log.command';
import { AUDIT_ENTRY_REPOSITORY, type AuditEntryRepository } from '../../domain/repositories/audit-entry.repository';
import { AuditEntry } from '../../domain/entities/audit-entry.entity';
import {
  AuditNotFoundError,
  ValidationError,
} from '../../domain/errors/audit.errors';
import { AuditEntryMapper } from '../mappers/audit-entry.mapper';

@Injectable()
export class AppendAuditLogUseCase {
  constructor(
    @Inject(AUDIT_ENTRY_REPOSITORY) private readonly repository: AuditEntryRepository,
  ) {}

  async execute(command: AppendAuditLogCommand) {
    const now = command.now ?? nowIso();
    const id = (command.payload?.id as UUID | undefined) ?? (uuidv4() as UUID);
    const entity = AuditEntry.register({
      id,
      organizationId: command.organizationId,
      now,
      ...(command.payload as Record<string, never>),
    } as Parameters<typeof AuditEntry.register>[0]);
    await this.repository.save(entity);
    return AuditEntryMapper.toDto(entity);
  }
}
