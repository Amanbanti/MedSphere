import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { UpdatePatientDemographicsCommand } from '../commands/update-patient-demographics.command';
import { PATIENT_REPOSITORY, type PatientRepository } from '../../domain/repositories/patient.repository';
import { Patient } from '../../domain/entities/patient.entity';
import { PatientAccessPolicy } from '../../domain/policies/patient-access.policy';
import { PatientDomainRules } from '../../domain/services/patient-rules.service';
import { PatientKafkaPublisher } from '../../infrastructure/messaging/patient-kafka.publisher';
import { InMemoryPatientCacheAdapter } from '../../infrastructure/cache/in-memory-patient.cache';
import {
  PatientNotFoundError,
  ValidationError,
} from '../../domain/errors/patient.errors';
import { PatientMapper } from '../mappers/patient.mapper';

@Injectable()
export class UpdatePatientDemographicsUseCase {
  private readonly rules = new PatientDomainRules();

  constructor(
    @Inject(PATIENT_REPOSITORY) private readonly repository: PatientRepository,
    private readonly eventPublisher: PatientKafkaPublisher,
    private readonly cache: InMemoryPatientCacheAdapter,
  ) {}

  async execute(command: UpdatePatientDemographicsCommand) {
    PatientAccessPolicy.assertTenantScope(command.actor, command.organizationId);
    PatientAccessPolicy.assertCanWrite(command.actor);

    if (!command.id && !command.payload) throw new ValidationError('id or payload is required');
    const targetId = command.id ?? (command.payload?.id as UUID | undefined);
    if (targetId) {
      const entity = await this.repository.findById(command.organizationId, targetId);
      if (!entity) throw new PatientNotFoundError(targetId);
      entity.assertActive();
      const now = command.now ?? nowIso();
      entity.touch(now);
      await this.repository.save(entity);
      await this.cache.invalidate(command.organizationId, targetId);
      this.eventPublisher.publishUpdated(command.organizationId, targetId, command.actorId, {});
      return PatientMapper.toDto(entity);
    }
    const now = command.now ?? nowIso();
    const id = (command.payload?.id as UUID | undefined) ?? (uuidv4() as UUID);
    const entity = Patient.register({ id, organizationId: command.organizationId, now, ...(command.payload as Record<string, never>) } as Parameters<typeof Patient.register>[0]);
    await this.repository.save(entity);
    this.eventPublisher.publishCreated(command.organizationId, id, command.actorId, {});
    return PatientMapper.toDto(entity);
  }
}
