import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { StoreImagingStudyCommand } from '../commands/store-imaging-study.command';
import { IMAGINGSTUDY_REPOSITORY, type ImagingStudyRepository } from '../../domain/repositories/imaging-study.repository';
import { ImagingStudy } from '../../domain/entities/imaging-study.entity';
import { ImagingAccessPolicy } from '../../domain/policies/imaging-access.policy';
import { ImagingDomainRules } from '../../domain/services/imaging-rules.service';
import { ImagingKafkaPublisher } from '../../infrastructure/messaging/imaging-kafka.publisher';
import { InMemoryImagingStudyCacheAdapter } from '../../infrastructure/cache/in-memory-imaging-study.cache';
import {
  ImagingNotFoundError,
  ValidationError,
} from '../../domain/errors/imaging.errors';
import { ImagingStudyMapper } from '../mappers/imaging-study.mapper';

@Injectable()
export class StoreImagingStudyUseCase {
  private readonly rules = new ImagingDomainRules();

  constructor(
    @Inject(IMAGINGSTUDY_REPOSITORY) private readonly repository: ImagingStudyRepository,
    private readonly eventPublisher: ImagingKafkaPublisher,
    private readonly cache: InMemoryImagingStudyCacheAdapter,
  ) {}

  async execute(command: StoreImagingStudyCommand) {
    ImagingAccessPolicy.assertTenantScope(command.actor, command.organizationId);
    ImagingAccessPolicy.assertCanWrite(command.actor);

    if (!command.id && !command.payload) throw new ValidationError('id or payload is required');
    const targetId = command.id ?? (command.payload?.id as UUID | undefined);
    if (targetId) {
      const entity = await this.repository.findById(command.organizationId, targetId);
      if (!entity) throw new ImagingNotFoundError(targetId);
      entity.assertActive();
      const now = command.now ?? nowIso();
      entity.touch(now);
      await this.repository.save(entity);
      await this.cache.invalidate(command.organizationId, targetId);
      this.eventPublisher.publishUpdated(command.organizationId, targetId, command.actorId, {});
      return ImagingStudyMapper.toDto(entity);
    }
    const now = command.now ?? nowIso();
    const id = (command.payload?.id as UUID | undefined) ?? (uuidv4() as UUID);
    const entity = ImagingStudy.register({ id, organizationId: command.organizationId, now, ...(command.payload as Record<string, never>) } as Parameters<typeof ImagingStudy.register>[0]);
    await this.repository.save(entity);
    this.eventPublisher.publishCreated(command.organizationId, id, command.actorId, {});
    return ImagingStudyMapper.toDto(entity);
  }
}
