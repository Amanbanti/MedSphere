/**
 * Analytics DTOs for API and SDK consumers.
 */
import type { ISODateString, PaginatedResult, UUID } from '../types';
import type { MetricGranularity, ReportFormat, ReportScheduleFrequency, DashboardWidgetType, DataSourceType, AggregationFunction, AlertConditionOperator, ExportJobStatus, CohortType, BenchmarkType } from '../types/analytics';

export interface AnalyticsMetricDefinitionDto {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: MetricGranularity;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface AnalyticsMetricDefinitionListItemDto {
  id: UUID;
  status: MetricGranularity;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type AnalyticsMetricDefinitionListDto = PaginatedResult<AnalyticsMetricDefinitionListItemDto>;

export interface AnalyticsReportDefinitionDto {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: ReportFormat;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface AnalyticsReportDefinitionListItemDto {
  id: UUID;
  status: ReportFormat;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type AnalyticsReportDefinitionListDto = PaginatedResult<AnalyticsReportDefinitionListItemDto>;

export interface AnalyticsDashboardDto {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: ReportScheduleFrequency;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface AnalyticsDashboardListItemDto {
  id: UUID;
  status: ReportScheduleFrequency;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type AnalyticsDashboardListDto = PaginatedResult<AnalyticsDashboardListItemDto>;

export interface AnalyticsWidgetDto {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: DashboardWidgetType;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface AnalyticsWidgetListItemDto {
  id: UUID;
  status: DashboardWidgetType;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type AnalyticsWidgetListDto = PaginatedResult<AnalyticsWidgetListItemDto>;

export interface AnalyticsExportJobDto {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: DataSourceType;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface AnalyticsExportJobListItemDto {
  id: UUID;
  status: DataSourceType;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type AnalyticsExportJobListDto = PaginatedResult<AnalyticsExportJobListItemDto>;

export interface AnalyticsCohortDefinitionDto {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: AggregationFunction;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface AnalyticsCohortDefinitionListItemDto {
  id: UUID;
  status: AggregationFunction;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type AnalyticsCohortDefinitionListDto = PaginatedResult<AnalyticsCohortDefinitionListItemDto>;

export interface AnalyticsBenchmarkDto {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: AlertConditionOperator;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface AnalyticsBenchmarkListItemDto {
  id: UUID;
  status: AlertConditionOperator;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type AnalyticsBenchmarkListDto = PaginatedResult<AnalyticsBenchmarkListItemDto>;

export interface AnalyticsAlertRuleDto {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: ExportJobStatus;
  code: string;
  displayName: string;
  description: string | null;
  effectiveFrom: ISODateString;
  effectiveTo: ISODateString | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  version: number;
}

export interface AnalyticsAlertRuleListItemDto {
  id: UUID;
  status: ExportJobStatus;
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type AnalyticsAlertRuleListDto = PaginatedResult<AnalyticsAlertRuleListItemDto>;
