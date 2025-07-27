import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import {
  CorrelationId,
  CurrentUser,
  Permissions,
  Public,
} from '@medsphere/auth-sdk';
import {
  buildPermission,
  PermissionAction,
  PermissionResource,
  successBody,
  type FeatureFlagRules,
  type JwtAccessPayload,
  type UUID,
} from '@medsphere/shared';
import { FeatureFlagService } from '../../../application/services/feature-flag.service';

class UpsertFeatureFlagDto {
  key!: string;
  enabled!: boolean;
  description?: string;
  organizationId?: UUID;
  rules?: FeatureFlagRules;
}

@Controller('feature-flags')
export class FeatureFlagsController {
  constructor(private readonly featureFlags: FeatureFlagService) {}

  /**
   * List feature flags (global + org-scoped).
   * Admin UI: GET /api/v1/feature-flags?organizationId={uuid}
   */
  @Get()
  @Permissions(
    buildPermission(PermissionResource.FEATURE_FLAG, PermissionAction.LIST),
  )
  async list(
    @Query('organizationId') organizationId: UUID | undefined,
    @CorrelationId() correlationId: string,
  ) {
    const data = await this.featureFlags.list(organizationId);
    return successBody(data, correlationId);
  }

  /**
   * Evaluate a single flag for the current user/org context.
   * GET /api/v1/feature-flags/evaluate/:key
   */
  @Get('evaluate/:key')
  async evaluate(
    @Param('key') key: string,
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
  ) {
    const data = await this.featureFlags.evaluate(key, {
      organizationId: user.organizationId,
      userId: user.sub,
    });
    return successBody(data, correlationId);
  }

  /**
   * Evaluate all flags for the current session context.
   */
  @Get('evaluate')
  async evaluateAll(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
  ) {
    const data = await this.featureFlags.evaluateAll({
      organizationId: user.organizationId,
      userId: user.sub,
    });
    return successBody(data, correlationId);
  }

  /**
   * Create or update a feature flag (admin).
   * PUT /api/v1/feature-flags
   */
  @Put()
  @Permissions(
    buildPermission(PermissionResource.FEATURE_FLAG, PermissionAction.UPDATE),
  )
  async upsert(
    @Body() body: UpsertFeatureFlagDto,
    @CorrelationId() correlationId: string,
  ) {
    const data = await this.featureFlags.upsert(body);
    return successBody(data, correlationId);
  }

  /**
   * Public health probe for feature-flag subsystem (no PHI).
   */
  @Public()
  @Get('health')
  health(@CorrelationId() correlationId: string) {
    return successBody({ status: 'ok', subsystem: 'feature-flags' }, correlationId);
  }
}
