import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { CollectLabSampleCommand } from '../commands/collect-lab-sample.command';
import { LABORDER_REPOSITORY, type LabOrderRepository } from '../../domain/repositories/lab-order.repository';
import { LabOrder } from '../../domain/entities/lab-order.entity';
import { LaboratoryAccessPolicy } from '../../domain/policies/laboratory-access.policy';
import { LaboratoryDomainRules } from '../../domain/services/laboratory-rules.service';
import { LaboratoryKafkaPublisher } from '../../infrastructure/messaging/laboratory-kafka.publisher';
import { InMemoryLabOrderCacheAdapter } from '../../infrastructure/cache/in-memory-lab-order.cache';
import {
  LaboratoryNotFoundError,
  ValidationError,
} from '../../domain/errors/laboratory.errors';
import { LabOrderMapper } from '../mappers/lab-order.mapper';

@Injectable()
export class CollectLabSampleUseCase {
  private readonly rules = new LaboratoryDomainRules();

  constructor(
    @Inject(LABORDER_REPOSITORY) private readonly repository: LabOrderRepository,
    private readonly eventPublisher: LaboratoryKafkaPublisher,
    private readonly cache: InMemoryLabOrderCacheAdapter,
  ) {}

  async execute(command: CollectLabSampleCommand) {
    LaboratoryAccessPolicy.assertTenantScope(command.actor, command.organizationId);
    LaboratoryAccessPolicy.assertCanWrite(command.actor);

    if (!command.id && !command.payload) throw new ValidationError('id or payload is required');
    const targetId = command.id ?? (command.payload?.id as UUID | undefined);
    if (targetId) {
      const entity = await this.repository.findById(command.organizationId, targetId);
      if (!entity) throw new LaboratoryNotFoundError(targetId);
      entity.assertActive();
      const now = command.now ?? nowIso();
      entity.touch(now);
      await this.repository.save(entity);
      await this.cache.invalidate(command.organizationId, targetId);
      this.eventPublisher.publishUpdated(command.organizationId, targetId, command.actorId, {});
      return LabOrderMapper.toDto(entity);
    }
    const now = command.now ?? nowIso();
    const id = (command.payload?.id as UUID | undefined) ?? (uuidv4() as UUID);
    const entity = LabOrder.register({ id, organizationId: command.organizationId, now, ...(command.payload as Record<string, never>) } as Parameters<typeof LabOrder.register>[0]);
    await this.repository.save(entity);
    this.eventPublisher.publishCreated(command.organizationId, id, command.actorId, {});
    return LabOrderMapper.toDto(entity);
  }
}
