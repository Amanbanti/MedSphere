import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { AddPharmacyInventoryCommand } from '../commands/add-pharmacy-inventory.command';
import { PHARMACYITEM_REPOSITORY, type PharmacyItemRepository } from '../../domain/repositories/pharmacy-item.repository';
import { PharmacyItem } from '../../domain/entities/pharmacy-item.entity';
import { PharmacyAccessPolicy } from '../../domain/policies/pharmacy-access.policy';
import { PharmacyDomainRules } from '../../domain/services/pharmacy-rules.service';
import { PharmacyKafkaPublisher } from '../../infrastructure/messaging/pharmacy-kafka.publisher';
import { InMemoryPharmacyItemCacheAdapter } from '../../infrastructure/cache/in-memory-pharmacy-item.cache';
import {
  PharmacyNotFoundError,
  ValidationError,
} from '../../domain/errors/pharmacy.errors';
import { PharmacyItemMapper } from '../mappers/pharmacy-item.mapper';

@Injectable()
export class AddPharmacyInventoryUseCase {
  private readonly rules = new PharmacyDomainRules();

  constructor(
    @Inject(PHARMACYITEM_REPOSITORY) private readonly repository: PharmacyItemRepository,
    private readonly eventPublisher: PharmacyKafkaPublisher,
    private readonly cache: InMemoryPharmacyItemCacheAdapter,
  ) {}

  async execute(command: AddPharmacyInventoryCommand) {
    PharmacyAccessPolicy.assertTenantScope(command.actor, command.organizationId);
    PharmacyAccessPolicy.assertCanWrite(command.actor);

    if (!command.id && !command.payload) throw new ValidationError('id or payload is required');
    const targetId = command.id ?? (command.payload?.id as UUID | undefined);
    if (targetId) {
      const entity = await this.repository.findById(command.organizationId, targetId);
      if (!entity) throw new PharmacyNotFoundError(targetId);
      entity.assertActive();
      const now = command.now ?? nowIso();
      entity.touch(now);
      await this.repository.save(entity);
      await this.cache.invalidate(command.organizationId, targetId);
      this.eventPublisher.publishUpdated(command.organizationId, targetId, command.actorId, {});
      return PharmacyItemMapper.toDto(entity);
    }
    const now = command.now ?? nowIso();
    const id = (command.payload?.id as UUID | undefined) ?? (uuidv4() as UUID);
    const entity = PharmacyItem.register({ id, organizationId: command.organizationId, now, ...(command.payload as Record<string, never>) } as Parameters<typeof PharmacyItem.register>[0]);
    await this.repository.save(entity);
    this.eventPublisher.publishCreated(command.organizationId, id, command.actorId, {});
    return PharmacyItemMapper.toDto(entity);
  }
}
