import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { AcquireRadiologyImagesCommand } from '../commands/acquire-radiology-images.command';
import { RADIOLOGYSTUDY_REPOSITORY, type RadiologyStudyRepository } from '../../domain/repositories/radiology-study.repository';
import { RadiologyStudy } from '../../domain/entities/radiology-study.entity';
import { RadiologyAccessPolicy } from '../../domain/policies/radiology-access.policy';
import { RadiologyDomainRules } from '../../domain/services/radiology-rules.service';
import { RadiologyKafkaPublisher } from '../../infrastructure/messaging/radiology-kafka.publisher';
import { InMemoryRadiologyStudyCacheAdapter } from '../../infrastructure/cache/in-memory-radiology-study.cache';
import {
  RadiologyNotFoundError,
  ValidationError,
} from '../../domain/errors/radiology.errors';
import { RadiologyStudyMapper } from '../mappers/radiology-study.mapper';

@Injectable()
export class AcquireRadiologyImagesUseCase {
  private readonly rules = new RadiologyDomainRules();

  constructor(
    @Inject(RADIOLOGYSTUDY_REPOSITORY) private readonly repository: RadiologyStudyRepository,
    private readonly eventPublisher: RadiologyKafkaPublisher,
    private readonly cache: InMemoryRadiologyStudyCacheAdapter,
  ) {}

  async execute(command: AcquireRadiologyImagesCommand) {
    RadiologyAccessPolicy.assertTenantScope(command.actor, command.organizationId);
    RadiologyAccessPolicy.assertCanWrite(command.actor);

    if (!command.id && !command.payload) throw new ValidationError('id or payload is required');
    const targetId = command.id ?? (command.payload?.id as UUID | undefined);
    if (targetId) {
      const entity = await this.repository.findById(command.organizationId, targetId);
      if (!entity) throw new RadiologyNotFoundError(targetId);
      entity.assertActive();
      const now = command.now ?? nowIso();
      entity.touch(now);
      await this.repository.save(entity);
      await this.cache.invalidate(command.organizationId, targetId);
      this.eventPublisher.publishUpdated(command.organizationId, targetId, command.actorId, {});
      return RadiologyStudyMapper.toDto(entity);
    }
    const now = command.now ?? nowIso();
    const id = (command.payload?.id as UUID | undefined) ?? (uuidv4() as UUID);
    const entity = RadiologyStudy.register({ id, organizationId: command.organizationId, now, ...(command.payload as Record<string, never>) } as Parameters<typeof RadiologyStudy.register>[0]);
    await this.repository.save(entity);
    this.eventPublisher.publishCreated(command.organizationId, id, command.actorId, {});
    return RadiologyStudyMapper.toDto(entity);
  }
}
