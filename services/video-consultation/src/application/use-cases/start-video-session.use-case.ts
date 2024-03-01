import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { StartVideoSessionCommand } from '../commands/start-video-session.command';
import { VIDEO_SESSION_REPOSITORY, type VideoSessionRepository } from '../../domain/repositories/video-session.repository';
import { VideoSession } from '../../domain/entities/video-session.entity';
import {
  VideoConsultationNotFoundError,
  ValidationError,
} from '../../domain/errors/video-consultation.errors';
import { VideoSessionMapper } from '../mappers/video-session.mapper';

@Injectable()
export class StartVideoSessionUseCase {
  constructor(
    @Inject(VIDEO_SESSION_REPOSITORY) private readonly repository: VideoSessionRepository,
  ) {}

  async execute(command: StartVideoSessionCommand) {
    const now = command.now ?? nowIso();
    const id = (command.payload?.id as UUID | undefined) ?? (uuidv4() as UUID);
    const entity = VideoSession.register({
      id,
      organizationId: command.organizationId,
      now,
      ...(command.payload as Record<string, never>),
    } as Parameters<typeof VideoSession.register>[0]);
    await this.repository.save(entity);
    return VideoSessionMapper.toDto(entity);
  }
}
