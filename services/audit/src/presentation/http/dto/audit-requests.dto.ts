import { IsObject, IsOptional, IsString, IsNumber } from 'class-validator';

export class AppendAuditLogRequestDto {
  actorId?: string;
  action: string;
  resourceType: string;
  resourceId: string;
  metadata?: Record<string, unknown>;
}

export class ExportAuditTrailRequestDto {
  actorId?: string;
  action: string;
  resourceType: string;
  resourceId: string;
  metadata?: Record<string, unknown>;
}
