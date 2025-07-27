import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { RetrieveImagingStudyCommand } from '../commands/retrieve-imaging-study.command';
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
export class RetrieveImagingStudyUseCase {
  private readonly rules = new ImagingDomainRules();

  constructor(
    @Inject(IMAGINGSTUDY_REPOSITORY) private readonly repository: ImagingStudyRepository,
    private readonly eventPublisher: ImagingKafkaPublisher,
    private readonly cache: InMemoryImagingStudyCacheAdapter,
  ) {}

  async execute(command: RetrieveImagingStudyCommand) {
    ImagingAccessPolicy.assertTenantScope(command.actor, command.organizationId);
    ImagingAccessPolicy.assertCanRead(command.actor);

    const cached = await this.cache.getList(command.organizationId, command.query ?? {});
    if (cached) return cached;
    const result = await this.repository.list(command.organizationId, command.query ?? {});
    await this.cache.setList(command.organizationId, command.query ?? {}, result);
    return result;
  }
}
