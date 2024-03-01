/**
 * Analytics domain types — MedSphere shared package.
 * @module @medsphere/shared/types/analytics
 */

import type { Auditable, ISODateString, SoftDelete, TenantScoped, UUID } from './index';


export enum MetricGranularity {
  MINUTE = 'MINUTE',
  HOUR = 'HOUR',
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  QUARTER = 'QUARTER',
  YEAR = 'YEAR',
}

export enum ReportFormat {
  PDF = 'PDF',
  CSV = 'CSV',
  XLSX = 'XLSX',
  JSON = 'JSON',
  HTML = 'HTML',
  DASHBOARD = 'DASHBOARD',
}

export enum ReportScheduleFrequency {
  ONCE = 'ONCE',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
}

export enum DashboardWidgetType {
  KPI = 'KPI',
  LINE_CHART = 'LINE_CHART',
  BAR_CHART = 'BAR_CHART',
  PIE_CHART = 'PIE_CHART',
  TABLE = 'TABLE',
  HEATMAP = 'HEATMAP',
  FUNNEL = 'FUNNEL',
}

export enum DataSourceType {
  WAREHOUSE = 'WAREHOUSE',
  OLTP_REPLICA = 'OLTP_REPLICA',
  KAFKA_STREAM = 'KAFKA_STREAM',
  EXTERNAL_API = 'EXTERNAL_API',
  FILE_IMPORT = 'FILE_IMPORT',
}

export enum AggregationFunction {
  SUM = 'SUM',
  AVG = 'AVG',
  MIN = 'MIN',
  MAX = 'MAX',
  COUNT = 'COUNT',
  COUNT_DISTINCT = 'COUNT_DISTINCT',
  P50 = 'P50',
  P95 = 'P95',
  P99 = 'P99',
}

export enum AlertConditionOperator {
  GT = 'GT',
  GTE = 'GTE',
  LT = 'LT',
  LTE = 'LTE',
  EQ = 'EQ',
  NEQ = 'NEQ',
  CHANGE_PERCENT = 'CHANGE_PERCENT',
}

export enum ExportJobStatus {
  QUEUED = 'QUEUED',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export enum CohortType {
  PATIENT = 'PATIENT',
  PROVIDER = 'PROVIDER',
  FACILITY = 'FACILITY',
  PAYER = 'PAYER',
  DIAGNOSIS = 'DIAGNOSIS',
  PROCEDURE = 'PROCEDURE',
}

export enum BenchmarkType {
  INTERNAL = 'INTERNAL',
  PEER_GROUP = 'PEER_GROUP',
  NATIONAL = 'NATIONAL',
  REGULATORY = 'REGULATORY',
  CUSTOM = 'CUSTOM',
}

export interface AnalyticsMetricDefinitionRecord {
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
}

export interface AnalyticsMetricDefinitionSummary {
  id: UUID;
  status: MetricGranularity;
  displayName: string;
  updatedAt: ISODateString;
}

export interface AnalyticsMetricDefinitionCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsMetricDefinitionUpdateInput {
  status?: MetricGranularity;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsReportDefinitionRecord {
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
}

export interface AnalyticsReportDefinitionSummary {
  id: UUID;
  status: ReportFormat;
  displayName: string;
  updatedAt: ISODateString;
}

export interface AnalyticsReportDefinitionCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsReportDefinitionUpdateInput {
  status?: ReportFormat;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsDashboardRecord {
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
}

export interface AnalyticsDashboardSummary {
  id: UUID;
  status: ReportScheduleFrequency;
  displayName: string;
  updatedAt: ISODateString;
}

export interface AnalyticsDashboardCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsDashboardUpdateInput {
  status?: ReportScheduleFrequency;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsWidgetRecord {
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
}

export interface AnalyticsWidgetSummary {
  id: UUID;
  status: DashboardWidgetType;
  displayName: string;
  updatedAt: ISODateString;
}

export interface AnalyticsWidgetCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsWidgetUpdateInput {
  status?: DashboardWidgetType;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsExportJobRecord {
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
}

export interface AnalyticsExportJobSummary {
  id: UUID;
  status: DataSourceType;
  displayName: string;
  updatedAt: ISODateString;
}

export interface AnalyticsExportJobCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsExportJobUpdateInput {
  status?: DataSourceType;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsCohortDefinitionRecord {
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
}

export interface AnalyticsCohortDefinitionSummary {
  id: UUID;
  status: AggregationFunction;
  displayName: string;
  updatedAt: ISODateString;
}

export interface AnalyticsCohortDefinitionCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsCohortDefinitionUpdateInput {
  status?: AggregationFunction;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsBenchmarkRecord {
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
}

export interface AnalyticsBenchmarkSummary {
  id: UUID;
  status: AlertConditionOperator;
  displayName: string;
  updatedAt: ISODateString;
}

export interface AnalyticsBenchmarkCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsBenchmarkUpdateInput {
  status?: AlertConditionOperator;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsAlertRuleRecord {
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
}

export interface AnalyticsAlertRuleSummary {
  id: UUID;
  status: ExportJobStatus;
  displayName: string;
  updatedAt: ISODateString;
}

export interface AnalyticsAlertRuleCreateInput {
  organizationId: UUID;
  facilityId?: UUID | null;
  patientId?: UUID | null;
  code: string;
  displayName: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsAlertRuleUpdateInput {
  status?: ExportJobStatus;
  displayName?: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsAggregateRoot {
  id: UUID;
  version: number;
  tenant: TenantScoped;
  audit: Auditable;
  softDelete: SoftDelete;
  tags: string[];
  extensions: Record<string, unknown>;
}

export interface AnalyticsSearchFilter {
  query?: string;
  statuses?: MetricGranularity[];
  patientId?: UUID;
  facilityId?: UUID;
  dateFrom?: ISODateString;
  dateTo?: ISODateString;
  includeDeleted?: boolean;
}

export type AnalyticsMetricDefinitionBulkOperation =
  | { op: 'create'; items: AnalyticsMetricDefinitionCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: AnalyticsMetricDefinitionUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type AnalyticsReportDefinitionBulkOperation =
  | { op: 'create'; items: AnalyticsReportDefinitionCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: AnalyticsReportDefinitionUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type AnalyticsDashboardBulkOperation =
  | { op: 'create'; items: AnalyticsDashboardCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: AnalyticsDashboardUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type AnalyticsWidgetBulkOperation =
  | { op: 'create'; items: AnalyticsWidgetCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: AnalyticsWidgetUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type AnalyticsExportJobBulkOperation =
  | { op: 'create'; items: AnalyticsExportJobCreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: AnalyticsExportJobUpdateInput }> }
  | { op: 'archive'; ids: UUID[] };

export type AnalyticsDomainEventType =
  | 'analytics.metric-definition.created'
  | 'analytics.report-definition.created'
  | 'analytics.dashboard.created'
  | 'analytics.widget.created'
  | 'analytics.export-job.created'
  | 'analytics.cohort-definition.created'
  | 'analytics.benchmark.created'
  | 'analytics.alert-rule.created'
  | 'analytics.metric-definition.updated'
  | 'analytics.report-definition.updated'
  | 'analytics.dashboard.updated'
  | 'analytics.widget.updated'
  | 'analytics.export-job.updated'
  | 'analytics.cohort-definition.updated'
  | 'analytics.benchmark.updated'
  | 'analytics.alert-rule.updated'
  | 'analytics.metric-definition.archived'
  | 'analytics.report-definition.archived'
  | 'analytics.dashboard.archived'
  | 'analytics.widget.archived'
  | 'analytics.export-job.archived'
  | 'analytics.cohort-definition.archived'
  | 'analytics.benchmark.archived'
  | 'analytics.alert-rule.archived';
