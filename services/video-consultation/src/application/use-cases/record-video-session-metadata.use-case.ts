import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { RecordVideoSessionMetadataCommand } from '../commands/record-video-session-metadata.command';
import { VIDEO_SESSION_REPOSITORY, type VideoSessionRepository } from '../../domain/repositories/video-session.repository';
import { VideoSession } from '../../domain/entities/video-session.entity';
import {
  VideoConsultationNotFoundError,
  ValidationError,
} from '../../domain/errors/video-consultation.errors';
import { VideoSessionMapper } from '../mappers/video-session.mapper';

@Injectable()
export class RecordVideoSessionMetadataUseCase {
  constructor(
    @Inject(VIDEO_SESSION_REPOSITORY) private readonly repository: VideoSessionRepository,
  ) {}

  async execute(command: RecordVideoSessionMetadataCommand) {
    if (!command.id && !command.payload) {
      throw new ValidationError('id or payload is required');
    }
    const targetId = command.id ?? (command.payload?.id as UUID | undefined);
    if (!targetId) {
      throw new ValidationError('id is required');
    }
    const entity = await this.repository.findById(command.organizationId, targetId);
    if (!entity) {
      throw new VideoConsultationNotFoundError(targetId);
    }
    entity.assertActive();
    const now = command.now ?? nowIso();
    entity.touch(now);
    await this.repository.save(entity);
    return VideoSessionMapper.toDto(entity);
  }
}
