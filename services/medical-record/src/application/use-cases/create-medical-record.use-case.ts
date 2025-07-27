import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { CreateMedicalRecordCommand } from '../commands/create-medical-record.command';
import { MEDICALRECORD_REPOSITORY, type MedicalRecordRepository } from '../../domain/repositories/medical-record.repository';
import { MedicalRecord } from '../../domain/entities/medical-record.entity';
import { MedicalRecordAccessPolicy } from '../../domain/policies/medical-record-access.policy';
import { MedicalRecordDomainRules } from '../../domain/services/medical-record-rules.service';
import { MedicalRecordKafkaPublisher } from '../../infrastructure/messaging/medical-record-kafka.publisher';
import { InMemoryMedicalRecordCacheAdapter } from '../../infrastructure/cache/in-memory-medical-record.cache';
import {
  MedicalRecordNotFoundError,
  ValidationError,
} from '../../domain/errors/medical-record.errors';
import { MedicalRecordMapper } from '../mappers/medical-record.mapper';

@Injectable()
export class CreateMedicalRecordUseCase {
  private readonly rules = new MedicalRecordDomainRules();

  constructor(
    @Inject(MEDICALRECORD_REPOSITORY) private readonly repository: MedicalRecordRepository,
    private readonly eventPublisher: MedicalRecordKafkaPublisher,
    private readonly cache: InMemoryMedicalRecordCacheAdapter,
  ) {}

  async execute(command: CreateMedicalRecordCommand) {
    MedicalRecordAccessPolicy.assertTenantScope(command.actor, command.organizationId);
    MedicalRecordAccessPolicy.assertCanWrite(command.actor);

    if (!command.id && !command.payload) throw new ValidationError('id or payload is required');
    const targetId = command.id ?? (command.payload?.id as UUID | undefined);
    if (targetId) {
      const entity = await this.repository.findById(command.organizationId, targetId);
      if (!entity) throw new MedicalRecordNotFoundError(targetId);
      entity.assertActive();
      const now = command.now ?? nowIso();
      entity.touch(now);
      await this.repository.save(entity);
      await this.cache.invalidate(command.organizationId, targetId);
      this.eventPublisher.publishUpdated(command.organizationId, targetId, command.actorId, {});
      return MedicalRecordMapper.toDto(entity);
    }
    const now = command.now ?? nowIso();
    const id = (command.payload?.id as UUID | undefined) ?? (uuidv4() as UUID);
    const entity = MedicalRecord.register({ id, organizationId: command.organizationId, now, ...(command.payload as Record<string, never>) } as Parameters<typeof MedicalRecord.register>[0]);
    await this.repository.save(entity);
    this.eventPublisher.publishCreated(command.organizationId, id, command.actorId, {});
    return MedicalRecordMapper.toDto(entity);
  }
}
