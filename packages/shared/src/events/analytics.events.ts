/**
 * Analytics domain event catalog.
 */
import type { DomainEventEnvelope } from './index';
import type { UUID } from '../types';

export type AnalyticsMetricDefinitionCreatedPayload = {
  metricDefinitionId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type AnalyticsMetricDefinitionUpdatedPayload = {
  metricDefinitionId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type AnalyticsMetricDefinitionArchivedPayload = {
  metricDefinitionId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type AnalyticsReportDefinitionCreatedPayload = {
  reportDefinitionId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type AnalyticsReportDefinitionUpdatedPayload = {
  reportDefinitionId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type AnalyticsReportDefinitionArchivedPayload = {
  reportDefinitionId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type AnalyticsDashboardCreatedPayload = {
  dashboardId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type AnalyticsDashboardUpdatedPayload = {
  dashboardId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type AnalyticsDashboardArchivedPayload = {
  dashboardId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type AnalyticsWidgetCreatedPayload = {
  widgetId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type AnalyticsWidgetUpdatedPayload = {
  widgetId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type AnalyticsWidgetArchivedPayload = {
  widgetId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type AnalyticsExportJobCreatedPayload = {
  exportJobId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type AnalyticsExportJobUpdatedPayload = {
  exportJobId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type AnalyticsExportJobArchivedPayload = {
  exportJobId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type AnalyticsCohortDefinitionCreatedPayload = {
  cohortDefinitionId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type AnalyticsCohortDefinitionUpdatedPayload = {
  cohortDefinitionId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type AnalyticsCohortDefinitionArchivedPayload = {
  cohortDefinitionId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type AnalyticsBenchmarkCreatedPayload = {
  benchmarkId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type AnalyticsBenchmarkUpdatedPayload = {
  benchmarkId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type AnalyticsBenchmarkArchivedPayload = {
  benchmarkId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type AnalyticsAlertRuleCreatedPayload = {
  alertRuleId: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type AnalyticsAlertRuleUpdatedPayload = {
  alertRuleId: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type AnalyticsAlertRuleArchivedPayload = {
  alertRuleId: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};

export type AnalyticsDomainEvent =
  | DomainEventEnvelope<AnalyticsMetricDefinitionCreatedPayload, 'analytics.metric-definition.created'>
  | DomainEventEnvelope<AnalyticsMetricDefinitionUpdatedPayload, 'analytics.metric-definition.updated'>
  | DomainEventEnvelope<AnalyticsMetricDefinitionArchivedPayload, 'analytics.metric-definition.archived'>
  | DomainEventEnvelope<AnalyticsReportDefinitionCreatedPayload, 'analytics.report-definition.created'>
  | DomainEventEnvelope<AnalyticsReportDefinitionUpdatedPayload, 'analytics.report-definition.updated'>
  | DomainEventEnvelope<AnalyticsReportDefinitionArchivedPayload, 'analytics.report-definition.archived'>
  | DomainEventEnvelope<AnalyticsDashboardCreatedPayload, 'analytics.dashboard.created'>
  | DomainEventEnvelope<AnalyticsDashboardUpdatedPayload, 'analytics.dashboard.updated'>
  | DomainEventEnvelope<AnalyticsDashboardArchivedPayload, 'analytics.dashboard.archived'>
  | DomainEventEnvelope<AnalyticsWidgetCreatedPayload, 'analytics.widget.created'>
  | DomainEventEnvelope<AnalyticsWidgetUpdatedPayload, 'analytics.widget.updated'>
  | DomainEventEnvelope<AnalyticsWidgetArchivedPayload, 'analytics.widget.archived'>
  | DomainEventEnvelope<AnalyticsExportJobCreatedPayload, 'analytics.export-job.created'>
  | DomainEventEnvelope<AnalyticsExportJobUpdatedPayload, 'analytics.export-job.updated'>
  | DomainEventEnvelope<AnalyticsExportJobArchivedPayload, 'analytics.export-job.archived'>
  | DomainEventEnvelope<AnalyticsCohortDefinitionCreatedPayload, 'analytics.cohort-definition.created'>
  | DomainEventEnvelope<AnalyticsCohortDefinitionUpdatedPayload, 'analytics.cohort-definition.updated'>
  | DomainEventEnvelope<AnalyticsCohortDefinitionArchivedPayload, 'analytics.cohort-definition.archived'>
  | DomainEventEnvelope<AnalyticsBenchmarkCreatedPayload, 'analytics.benchmark.created'>
  | DomainEventEnvelope<AnalyticsBenchmarkUpdatedPayload, 'analytics.benchmark.updated'>
  | DomainEventEnvelope<AnalyticsBenchmarkArchivedPayload, 'analytics.benchmark.archived'>
  | DomainEventEnvelope<AnalyticsAlertRuleCreatedPayload, 'analytics.alert-rule.created'>
  | DomainEventEnvelope<AnalyticsAlertRuleUpdatedPayload, 'analytics.alert-rule.updated'>
  | DomainEventEnvelope<AnalyticsAlertRuleArchivedPayload, 'analytics.alert-rule.archived'>;

export const ANALYTICS_EVENT_TOPIC = 'medsphere.analytics.events.v1';

export function isAnalyticsDomainEvent(event: { eventType: string }): event is AnalyticsDomainEvent {
  return event.eventType.startsWith('analytics.');
}
