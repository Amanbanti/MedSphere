import type { ISODateString, UUID } from '@medsphere/shared';

export interface CreateApiKeyCommand {
  userId: UUID;
  organizationId: UUID;
  name: string;
  scopes: string[];
  expiresAt?: ISODateString;
  correlationId: UUID;
}
