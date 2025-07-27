/**
 * Feature flag evaluation with percentage rollout and organization targeting.
 */

import { createHash } from 'node:crypto';
import type { UUID } from '../types';

export interface FeatureFlagRules {
  /** Percentage rollout 0–100 for sticky bucketing */
  percentage?: number;
  /** Explicit organization allow-list */
  organizationIds?: UUID[];
  /** Explicit user allow-list */
  userIds?: UUID[];
  /** Deny-list overrides allow rules */
  denyOrganizationIds?: UUID[];
  /** Environment gate */
  environments?: string[];
}

export interface FeatureFlagDefinition {
  key: string;
  enabled: boolean;
  rules?: FeatureFlagRules;
}

export interface FeatureFlagEvaluationContext {
  organizationId?: UUID;
  userId?: UUID;
  environment?: string;
}

export interface FeatureFlagEvaluationResult {
  key: string;
  enabled: boolean;
  reason: 'global_disabled' | 'global_enabled' | 'org_targeted' | 'user_targeted' | 'percentage' | 'denied' | 'environment';
}

function bucketHash(key: string, subject: string): number {
  const digest = createHash('sha256').update(`${key}:${subject}`).digest('hex');
  return parseInt(digest.slice(0, 8), 16) % 100;
}

export function evaluateFeatureFlag(
  flag: FeatureFlagDefinition,
  context: FeatureFlagEvaluationContext = {},
): FeatureFlagEvaluationResult {
  const rules = flag.rules ?? {};
  const env = context.environment ?? process.env.NODE_ENV ?? 'development';

  if (rules.environments?.length && !rules.environments.includes(env)) {
    return { key: flag.key, enabled: false, reason: 'environment' };
  }

  if (
    context.organizationId &&
    rules.denyOrganizationIds?.includes(context.organizationId)
  ) {
    return { key: flag.key, enabled: false, reason: 'denied' };
  }

  if (!flag.enabled) {
    return { key: flag.key, enabled: false, reason: 'global_disabled' };
  }

  if (
    context.organizationId &&
    rules.organizationIds?.includes(context.organizationId)
  ) {
    return { key: flag.key, enabled: true, reason: 'org_targeted' };
  }

  if (context.userId && rules.userIds?.includes(context.userId)) {
    return { key: flag.key, enabled: true, reason: 'user_targeted' };
  }

  if (rules.percentage !== undefined) {
    const subject =
      context.userId ?? context.organizationId ?? 'anonymous';
    const bucket = bucketHash(flag.key, subject);
    const enabled = bucket < rules.percentage;
    return { key: flag.key, enabled, reason: 'percentage' };
  }

  return { key: flag.key, enabled: true, reason: 'global_enabled' };
}

export function evaluateFeatureFlags(
  flags: FeatureFlagDefinition[],
  context: FeatureFlagEvaluationContext = {},
): Record<string, boolean> {
  return Object.fromEntries(
    flags.map((flag) => [
      flag.key,
      evaluateFeatureFlag(flag, context).enabled,
    ]),
  );
}
