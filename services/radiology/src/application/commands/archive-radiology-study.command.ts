import type { FilterSpec, JwtAccessPayload, ListQuery, UUID } from '@medsphere/shared';

export class ArchiveRadiologyStudyCommand {
  constructor(
    readonly actor: JwtAccessPayload,
    readonly organizationId: UUID,
    readonly radiologyStudyId: UUID,
    readonly payload?: Record<string, unknown>,
    readonly now?: string,
    readonly page?: number,
    readonly pageSize?: number,
    readonly search?: string,
    readonly filters?: FilterSpec[],
  ) {}
}
