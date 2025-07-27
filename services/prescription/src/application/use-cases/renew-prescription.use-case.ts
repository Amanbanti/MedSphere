import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { RenewPrescriptionCommand } from '../commands/renew-prescription.command';
import { PRESCRIPTION_REPOSITORY, type PrescriptionRepository } from '../../domain/repositories/prescription.repository';
import { Prescription } from '../../domain/entities/prescription.entity';
import { PrescriptionAccessPolicy } from '../../domain/policies/prescription-access.policy';
import { PrescriptionDomainRules } from '../../domain/services/prescription-rules.service';
import { PrescriptionKafkaPublisher } from '../../infrastructure/messaging/prescription-kafka.publisher';
import { InMemoryPrescriptionCacheAdapter } from '../../infrastructure/cache/in-memory-prescription.cache';
import {
  PrescriptionNotFoundError,
  ValidationError,
} from '../../domain/errors/prescription.errors';
import { PrescriptionMapper } from '../mappers/prescription.mapper';

@Injectable()
export class RenewPrescriptionUseCase {
  private readonly rules = new PrescriptionDomainRules();

  constructor(
    @Inject(PRESCRIPTION_REPOSITORY) private readonly repository: PrescriptionRepository,
    private readonly eventPublisher: PrescriptionKafkaPublisher,
    private readonly cache: InMemoryPrescriptionCacheAdapter,
  ) {}

  async execute(command: RenewPrescriptionCommand) {
    PrescriptionAccessPolicy.assertTenantScope(command.actor, command.organizationId);
    PrescriptionAccessPolicy.assertCanWrite(command.actor);

    if (!command.id && !command.payload) throw new ValidationError('id or payload is required');
    const targetId = command.id ?? (command.payload?.id as UUID | undefined);
    if (targetId) {
      const entity = await this.repository.findById(command.organizationId, targetId);
      if (!entity) throw new PrescriptionNotFoundError(targetId);
      entity.assertActive();
      const now = command.now ?? nowIso();
      entity.touch(now);
      await this.repository.save(entity);
      await this.cache.invalidate(command.organizationId, targetId);
      this.eventPublisher.publishUpdated(command.organizationId, targetId, command.actorId, {});
      return PrescriptionMapper.toDto(entity);
    }
    const now = command.now ?? nowIso();
    const id = (command.payload?.id as UUID | undefined) ?? (uuidv4() as UUID);
    const entity = Prescription.register({ id, organizationId: command.organizationId, now, ...(command.payload as Record<string, never>) } as Parameters<typeof Prescription.register>[0]);
    await this.repository.save(entity);
    this.eventPublisher.publishCreated(command.organizationId, id, command.actorId, {});
    return PrescriptionMapper.toDto(entity);
  }
}
