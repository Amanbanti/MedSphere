import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type UUID } from '@medsphere/shared';
import type { AddPatientVitalsCommand } from '../commands/add-patient-vitals.command';
import { PATIENT_REPOSITORY, type PatientRepository } from '../../domain/repositories/patient.repository';
import { PatientAccessPolicy } from '../../domain/policies/patient-access.policy';
import { PatientDomainRules } from '../../domain/services/patient-rules.service';
import { PatientKafkaPublisher } from '../../infrastructure/messaging/patient-kafka.publisher';
import { InMemoryPatientCacheAdapter } from '../../infrastructure/cache/in-memory-patient.cache';
import { PatientNotFoundError, ValidationError } from '../../domain/errors/patient.errors';
import { PatientMapper } from '../mappers/patient.mapper';

@Injectable()
export class AddPatientVitalsUseCase {
  private readonly rules = new PatientDomainRules();

  constructor(
    @Inject(PATIENT_REPOSITORY) private readonly repository: PatientRepository,
    private readonly eventPublisher: PatientKafkaPublisher,
    private readonly cache: InMemoryPatientCacheAdapter,
  ) {}

  async execute(command: AddPatientVitalsCommand) {
    PatientAccessPolicy.assertTenantScope(command.actor, command.organizationId);
    PatientAccessPolicy.assertCanWrite(command.actor);

    const patientId = command.id ?? (command.payload?.patientId as UUID);
    if (!patientId) throw new ValidationError('patientId is required');

    const systolic = command.payload?.systolicMmHg as number | undefined;
    const diastolic = command.payload?.diastolicMmHg as number | undefined;
    if (systolic != null && diastolic != null) {
      this.rules.validateBloodPressure(systolic, diastolic);
    }

    const entity = await this.repository.findById(command.organizationId, patientId);
    if (!entity) throw new PatientNotFoundError(patientId);
    entity.assertActive();

    const now = command.now ?? nowIso();
    entity.touch(now);
    await this.repository.save(entity);
    await this.cache.invalidate(command.organizationId, patientId);
    this.eventPublisher.publishUpdated(command.organizationId, patientId, command.actorId, {
      action: 'vitals_recorded',
      systolicMmHg: systolic,
      diastolicMmHg: diastolic,
    });
    return PatientMapper.toDto(entity);
  }
}
