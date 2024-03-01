import type { UUID } from '@medsphere/shared';

export interface ListSessionsQuery {
  userId: UUID;
  page?: number;
  pageSize?: number;
}
