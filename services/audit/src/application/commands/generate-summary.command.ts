import type { FilterSpec, JwtAccessPayload, ListQuery, UUID } from '@medsphere/shared';

export class GenerateSummaryCommand {
  constructor(
    readonly actor: JwtAccessPayload,
    readonly organizationId: UUID,
    readonly auditEntryId: UUID,
    readonly payload?: Record<string, unknown>,
    readonly now?: string,
    readonly page?: number,
    readonly pageSize?: number,
    readonly search?: string,
    readonly filters?: FilterSpec[],
  ) {}
}
