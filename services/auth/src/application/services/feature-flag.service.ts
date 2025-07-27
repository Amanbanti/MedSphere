import { Injectable } from '@nestjs/common';
import {
  evaluateFeatureFlag,
  evaluateFeatureFlags,
  type FeatureFlagDefinition,
  type FeatureFlagEvaluationContext,
  type FeatureFlagRules,
  type UUID,
} from '@medsphere/shared';
import { PrismaService } from '../infrastructure/prisma/prisma.service';

export interface FeatureFlagRecord {
  id: UUID;
  key: string;
  description?: string | null;
  enabled: boolean;
  organizationId?: UUID | null;
  rules: FeatureFlagRules;
}

@Injectable()
export class FeatureFlagService {
  constructor(private readonly prisma: PrismaService) {}

  async list(organizationId?: UUID): Promise<FeatureFlagRecord[]> {
    const rows = await this.prisma.client.featureFlag.findMany({
      where: organizationId
        ? { OR: [{ organizationId }, { organizationId: null }] }
        : undefined,
      orderBy: { key: 'asc' },
    });
    return rows.map((row) => ({
      id: row.id as UUID,
      key: row.key,
      description: row.description,
      enabled: row.enabled,
      organizationId: (row.organizationId as UUID | null) ?? undefined,
      rules: (row.rules as FeatureFlagRules) ?? {},
    }));
  }

  async evaluate(
    key: string,
    context: FeatureFlagEvaluationContext,
  ): Promise<{ key: string; enabled: boolean; reason: string }> {
    const row = await this.prisma.client.featureFlag.findFirst({
      where: {
        key,
        OR: [
          { organizationId: context.organizationId ?? null },
          { organizationId: null },
        ],
      },
      orderBy: { organizationId: 'desc' },
    });

    if (!row) {
      return { key, enabled: false, reason: 'not_found' };
    }

    const definition: FeatureFlagDefinition = {
      key: row.key,
      enabled: row.enabled,
      rules: (row.rules as FeatureFlagRules) ?? {},
    };

    const result = evaluateFeatureFlag(definition, context);
    return { key, enabled: result.enabled, reason: result.reason };
  }

  async evaluateAll(
    context: FeatureFlagEvaluationContext,
  ): Promise<Record<string, boolean>> {
    const flags = await this.list(context.organizationId);
    const definitions: FeatureFlagDefinition[] = flags.map((flag) => ({
      key: flag.key,
      enabled: flag.enabled,
      rules: flag.rules,
    }));
    return evaluateFeatureFlags(definitions, context);
  }

  async upsert(input: {
    key: string;
    enabled: boolean;
    description?: string;
    organizationId?: UUID;
    rules?: FeatureFlagRules;
  }): Promise<FeatureFlagRecord> {
    const row = await this.prisma.client.featureFlag.upsert({
      where: {
        organizationId_key: {
          organizationId: input.organizationId ?? null,
          key: input.key,
        },
      },
      create: {
        key: input.key,
        enabled: input.enabled,
        description: input.description,
        organizationId: input.organizationId ?? null,
        rules: input.rules ?? {},
      },
      update: {
        enabled: input.enabled,
        description: input.description,
        rules: input.rules ?? {},
      },
    });

    return {
      id: row.id as UUID,
      key: row.key,
      description: row.description,
      enabled: row.enabled,
      organizationId: (row.organizationId as UUID | null) ?? undefined,
      rules: (row.rules as FeatureFlagRules) ?? {},
    };
  }
}
