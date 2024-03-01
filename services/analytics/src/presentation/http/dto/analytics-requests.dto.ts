import { IsObject, IsOptional, IsString, IsNumber } from 'class-validator';

export class RecordAnalyticsEventRequestDto {
  eventType: string;
  source: string;
  payload: string;
  occurredAt: string;
  metadata?: Record<string, unknown>;
}

export class GenerateAnalyticsReportRequestDto {
  eventType: string;
  source: string;
  payload: string;
  occurredAt: string;
  metadata?: Record<string, unknown>;
}

export class ExportAnalyticsDataRequestDto {
  eventType: string;
  source: string;
  payload: string;
  occurredAt: string;
  metadata?: Record<string, unknown>;
}
