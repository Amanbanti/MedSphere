import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { QueryAuditLogsCommand } from '../commands/query-audit-logs.command';
import { AUDIT_ENTRY_REPOSITORY, type AuditEntryRepository } from '../../domain/repositories/audit-entry.repository';
import { AuditEntry } from '../../domain/entities/audit-entry.entity';
import {
  AuditNotFoundError,
  ValidationError,
} from '../../domain/errors/audit.errors';
import { AuditEntryMapper } from '../mappers/audit-entry.mapper';

@Injectable()
export class QueryAuditLogsUseCase {
  constructor(
    @Inject(AUDIT_ENTRY_REPOSITORY) private readonly repository: AuditEntryRepository,
  ) {}

  async execute(command: QueryAuditLogsCommand) {
    const query = command.query ?? {};
    const result = await this.repository.list(command.organizationId, query);
    return {
      items: result.items.map((item) => AuditEntryMapper.toDto(item)),
      meta: result.meta,
    };
  }
}
