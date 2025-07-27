import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { RegisterDoctorCommand } from '../commands/register-doctor.command';
import { DOCTOR_REPOSITORY, type DoctorRepository } from '../../domain/repositories/doctor.repository';
import { Doctor } from '../../domain/entities/doctor.entity';
import { DoctorAccessPolicy } from '../../domain/policies/doctor-access.policy';
import { DoctorDomainRules } from '../../domain/services/doctor-rules.service';
import { DoctorKafkaPublisher } from '../../infrastructure/messaging/doctor-kafka.publisher';
import { InMemoryDoctorCacheAdapter } from '../../infrastructure/cache/in-memory-doctor.cache';
import {
  DoctorNotFoundError,
  ValidationError,
} from '../../domain/errors/doctor.errors';
import { DoctorMapper } from '../mappers/doctor.mapper';

@Injectable()
export class RegisterDoctorUseCase {
  private readonly rules = new DoctorDomainRules();

  constructor(
    @Inject(DOCTOR_REPOSITORY) private readonly repository: DoctorRepository,
    private readonly eventPublisher: DoctorKafkaPublisher,
    private readonly cache: InMemoryDoctorCacheAdapter,
  ) {}

  async execute(command: RegisterDoctorCommand) {
    DoctorAccessPolicy.assertTenantScope(command.actor, command.organizationId);
    DoctorAccessPolicy.assertCanWrite(command.actor);

    if (!command.id && !command.payload) throw new ValidationError('id or payload is required');
    const targetId = command.id ?? (command.payload?.id as UUID | undefined);
    if (targetId) {
      const entity = await this.repository.findById(command.organizationId, targetId);
      if (!entity) throw new DoctorNotFoundError(targetId);
      entity.assertActive();
      const now = command.now ?? nowIso();
      entity.touch(now);
      await this.repository.save(entity);
      await this.cache.invalidate(command.organizationId, targetId);
      this.eventPublisher.publishUpdated(command.organizationId, targetId, command.actorId, {});
      return DoctorMapper.toDto(entity);
    }
    const now = command.now ?? nowIso();
    const id = (command.payload?.id as UUID | undefined) ?? (uuidv4() as UUID);
    const entity = Doctor.register({ id, organizationId: command.organizationId, now, ...(command.payload as Record<string, never>) } as Parameters<typeof Doctor.register>[0]);
    await this.repository.save(entity);
    this.eventPublisher.publishCreated(command.organizationId, id, command.actorId, {});
    return DoctorMapper.toDto(entity);
  }
}
