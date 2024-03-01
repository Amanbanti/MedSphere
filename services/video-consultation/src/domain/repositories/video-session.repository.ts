import type { UUID } from '@medsphere/shared';
import type { VideoSession } from '../entities/video-session.entity';
import type { ListQuery, PaginatedResult } from '@medsphere/shared';

export const VIDEO_SESSION_REPOSITORY = Symbol('VIDEO_SESSION_REPOSITORY');

export interface VideoSessionRepository {
  save(entity: VideoSession): Promise<void>;
  findById(organizationId: UUID, id: UUID): Promise<VideoSession | null>;
  list(organizationId: UUID, query: ListQuery): Promise<PaginatedResult<VideoSession>>;
  existsByBusinessKey?(organizationId: UUID, key: string): Promise<boolean>;
}

