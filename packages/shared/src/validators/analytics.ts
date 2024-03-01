/**
 * Analytics Zod validators.
 */
import { z } from 'zod';
import { isoDateSchema, uuidSchema } from '../validators';
import {
  MetricGranularity,
  ReportFormat,
  ReportScheduleFrequency,
  DashboardWidgetType,
  DataSourceType,
  AggregationFunction,
  AlertConditionOperator,
  ExportJobStatus,
  CohortType,
  BenchmarkType,
} from '../types/analytics';

export const metricDefinitionCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const metricDefinitionUpdateSchema = z.object({
  status: z.nativeEnum(MetricGranularity).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type AnalyticsMetricDefinitionCreateInput = z.infer<typeof metricDefinitionCreateSchema>;
export type AnalyticsMetricDefinitionUpdateInput = z.infer<typeof metricDefinitionUpdateSchema>;

export const reportDefinitionCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const reportDefinitionUpdateSchema = z.object({
  status: z.nativeEnum(ReportFormat).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type AnalyticsReportDefinitionCreateInput = z.infer<typeof reportDefinitionCreateSchema>;
export type AnalyticsReportDefinitionUpdateInput = z.infer<typeof reportDefinitionUpdateSchema>;

export const dashboardCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const dashboardUpdateSchema = z.object({
  status: z.nativeEnum(ReportScheduleFrequency).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type AnalyticsDashboardCreateInput = z.infer<typeof dashboardCreateSchema>;
export type AnalyticsDashboardUpdateInput = z.infer<typeof dashboardUpdateSchema>;

export const widgetCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const widgetUpdateSchema = z.object({
  status: z.nativeEnum(DashboardWidgetType).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type AnalyticsWidgetCreateInput = z.infer<typeof widgetCreateSchema>;
export type AnalyticsWidgetUpdateInput = z.infer<typeof widgetUpdateSchema>;

export const exportJobCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const exportJobUpdateSchema = z.object({
  status: z.nativeEnum(DataSourceType).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type AnalyticsExportJobCreateInput = z.infer<typeof exportJobCreateSchema>;
export type AnalyticsExportJobUpdateInput = z.infer<typeof exportJobUpdateSchema>;

export const cohortDefinitionCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const cohortDefinitionUpdateSchema = z.object({
  status: z.nativeEnum(AggregationFunction).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type AnalyticsCohortDefinitionCreateInput = z.infer<typeof cohortDefinitionCreateSchema>;
export type AnalyticsCohortDefinitionUpdateInput = z.infer<typeof cohortDefinitionUpdateSchema>;

export const benchmarkCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const benchmarkUpdateSchema = z.object({
  status: z.nativeEnum(AlertConditionOperator).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type AnalyticsBenchmarkCreateInput = z.infer<typeof benchmarkCreateSchema>;
export type AnalyticsBenchmarkUpdateInput = z.infer<typeof benchmarkUpdateSchema>;

export const alertRuleCreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const alertRuleUpdateSchema = z.object({
  status: z.nativeEnum(ExportJobStatus).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type AnalyticsAlertRuleCreateInput = z.infer<typeof alertRuleCreateSchema>;
export type AnalyticsAlertRuleUpdateInput = z.infer<typeof alertRuleUpdateSchema>;

export const analyticsSearchFilterSchema = z.object({
  query: z.string().trim().max(200).optional(),
  statuses: z.array(z.nativeEnum(MetricGranularity)).max(20).optional(),
  patientId: uuidSchema.optional(),
  facilityId: uuidSchema.optional(),
  dateFrom: isoDateSchema.optional(),
  dateTo: isoDateSchema.optional(),
  includeDeleted: z.boolean().optional(),
});
