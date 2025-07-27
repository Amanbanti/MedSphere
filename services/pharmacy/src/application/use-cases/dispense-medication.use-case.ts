import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { DispenseMedicationCommand } from '../commands/dispense-medication.command';
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
export class DispenseMedicationUseCase {
  private readonly rules = new PharmacyDomainRules();

  constructor(
    @Inject(PHARMACYITEM_REPOSITORY) private readonly repository: PharmacyItemRepository,
    private readonly eventPublisher: PharmacyKafkaPublisher,
    private readonly cache: InMemoryPharmacyItemCacheAdapter,
  ) {}

  async execute(command: DispenseMedicationCommand) {
    PharmacyAccessPolicy.assertTenantScope(command.actor, command.organizationId);
    PharmacyAccessPolicy.assertCanWrite(command.actor);

    const payload = this.rules.sanitizePayload(command.payload ?? {});
    const drugA = payload.drugACode as string;
    const drugB = payload.drugBCode as string;
    if (drugA && drugB) this.rules.checkDrugInteraction(drugA, drugB);
    const now = command.now ?? nowIso();
    const id = (payload.id as UUID | undefined) ?? (uuidv4() as UUID);
    const entity = PharmacyItem.register({ id, organizationId: command.organizationId, now, ...payload } as Parameters<typeof PharmacyItem.register>[0]);
    await this.repository.save(entity);
    this.eventPublisher.publishCreated(command.organizationId, id, command.actorId, { action: 'dispensed' });
    return PharmacyItemMapper.toDto(entity);
  }
}
