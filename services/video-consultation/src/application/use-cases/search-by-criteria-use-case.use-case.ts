import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import type { SearchByCriteriaCommand } from '../commands/search-by-criteria.command';
import { VIDEOSESSION_REPOSITORY, type VideoSessionRepository } from '../../domain/repositories/video-session.repository';
import { VideoConsultationOrchestrator } from '../services/video-consultation-orchestrator.service';
import { VideoConsultationAccessPolicy } from '../../domain/policies/video-consultation-access.policy';
import { VideoSessionMapper } from '../mappers/video-session.mapper';

@Injectable()
export class SearchByCriteriaUseCase {
  constructor(
    @Inject(VIDEOSESSION_REPOSITORY) private readonly repository: VideoSessionRepository,
    private readonly orchestrator: VideoConsultationOrchestrator,
  ) {}

  async execute(command: SearchByCriteriaCommand) {
    VideoConsultationAccessPolicy.assertCanWrite(command.actor);
    VideoConsultationAccessPolicy.assertTenantScope(command.actor, command.organizationId);

    return this.handleQuery(command);
  }

  private async handleCommand(command: SearchByCriteriaCommand) {
    const now = command.now ?? nowIso();
    const entity = await this.orchestrator.getOrThrow(command.organizationId, command.videoSessionId);
    const handler = (entity as unknown as Record<string, (now: string, payload?: Record<string, unknown>) => void>)['searchByCriteria'];
    if (typeof handler === 'function') {
      handler.call(entity, now, command.payload ?? {});
    } else {
      entity.touch(now);
    }
    await this.repository.save(entity);
    return VideoSessionMapper.toDto(entity);
  }

  private async handleQuery(command: SearchByCriteriaCommand) {
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
