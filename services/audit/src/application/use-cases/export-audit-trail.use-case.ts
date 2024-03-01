import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { ExportAuditTrailCommand } from '../commands/export-audit-trail.command';
import { AUDIT_ENTRY_REPOSITORY, type AuditEntryRepository } from '../../domain/repositories/audit-entry.repository';
import { AuditEntry } from '../../domain/entities/audit-entry.entity';
import {
  AuditNotFoundError,
  ValidationError,
} from '../../domain/errors/audit.errors';
import { AuditEntryMapper } from '../mappers/audit-entry.mapper';

@Injectable()
export class ExportAuditTrailUseCase {
  constructor(
    @Inject(AUDIT_ENTRY_REPOSITORY) private readonly repository: AuditEntryRepository,
  ) {}

  async execute(command: ExportAuditTrailCommand) {
    if (!command.id && !command.payload) {
      throw new ValidationError('id or payload is required');
    }
    const targetId = command.id ?? (command.payload?.id as UUID | undefined);
    if (!targetId) {
      throw new ValidationError('id is required');
    }
    const entity = await this.repository.findById(command.organizationId, targetId);
    if (!entity) {
      throw new AuditNotFoundError(targetId);
    }
    entity.assertActive();
    const now = command.now ?? nowIso();
    entity.touch(now);
    await this.repository.save(entity);
    return AuditEntryMapper.toDto(entity);
  }
}
