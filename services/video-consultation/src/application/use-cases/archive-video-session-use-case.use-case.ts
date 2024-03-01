import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import type { ArchiveVideoSessionCommand } from '../commands/archive-video-session.command';
import { VIDEOSESSION_REPOSITORY, type VideoSessionRepository } from '../../domain/repositories/video-session.repository';
import { VideoConsultationOrchestrator } from '../services/video-consultation-orchestrator.service';
import { VideoConsultationAccessPolicy } from '../../domain/policies/video-consultation-access.policy';
import { VideoSessionMapper } from '../mappers/video-session.mapper';

@Injectable()
export class ArchiveVideoSessionUseCase {
  constructor(
    @Inject(VIDEOSESSION_REPOSITORY) private readonly repository: VideoSessionRepository,
    private readonly orchestrator: VideoConsultationOrchestrator,
  ) {}

  async execute(command: ArchiveVideoSessionCommand) {
    VideoConsultationAccessPolicy.assertCanWrite(command.actor);
    VideoConsultationAccessPolicy.assertTenantScope(command.actor, command.organizationId);

    return this.handleCommand(command);
  }

  private async handleCommand(command: ArchiveVideoSessionCommand) {
    const now = command.now ?? nowIso();
    const entity = await this.orchestrator.getOrThrow(command.organizationId, command.videoSessionId);
    const handler = (entity as unknown as Record<string, (now: string, payload?: Record<string, unknown>) => void>)['archive'];
    if (typeof handler === 'function') {
      handler.call(entity, now, command.payload ?? {});
    } else {
      entity.touch(now);
    }
    await this.repository.save(entity);
    return VideoSessionMapper.toDto(entity);
  }

  private async handleQuery(command: ArchiveVideoSessionCommand) {
    const query: ListQuery = {
      page: command.page ?? 1,
      pageSize: command.pageSize ?? 25,
      search: command.search,
      filters: command.filters,
    };
    const result = await this.repository.list(command.organizationId, query);
    return {
      data: result.data.map((e) => VideoSessionMapper.toListItem(e)),
      meta: result.meta,
    };
  }
}
