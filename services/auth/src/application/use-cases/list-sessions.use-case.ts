import { Injectable, Inject } from '@nestjs/common';
import {
  createPaginationMeta,
  normalizeListQuery,
  type SessionListDto,
} from '@medsphere/shared';
import type { ListSessionsQuery } from '../queries/list-sessions.query';
import {
  SESSION_REPOSITORY,
  type SessionRepository,
} from '../../domain/repositories/session.repository';

@Injectable()
export class ListSessionsUseCase {
  constructor(
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepo: SessionRepository,
  ) {}

  async execute(query: ListSessionsQuery): Promise<SessionListDto> {
    const { page, pageSize } = normalizeListQuery({
      page: query.page,
      pageSize: query.pageSize,
    });

    const sessions = await this.sessionRepo.findActiveByUserId(query.userId);
    const activeSessions = sessions.filter((s) => !s.isRevoked() && !s.isExpired());

    const start = (page - 1) * pageSize;
    const slice = activeSessions.slice(start, start + pageSize);

    return {
      data: slice.map((session) => ({
        id: session.id,
        userId: session.userId,
        createdAt: session.createdAt,
        expiresAt: session.expiresAt,
        ipAddress: session.ipAddress ?? undefined,
        userAgent: session.userAgent ?? undefined,
        mfaVerified: session.mfaVerified,
        revokedAt: session.revokedAt ?? undefined,
      })),
      meta: createPaginationMeta(page, pageSize, activeSessions.length),
    };
  }
}
