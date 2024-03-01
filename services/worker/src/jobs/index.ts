import { AppointmentReminderHandler } from './appointment-reminder.handler';
import { OutboxPublisherHandler } from './outbox-publisher.handler';
import { SearchIndexerHandler } from './search-indexer.handler';
import { AnalyticsRollupHandler } from './analytics-rollup.handler';
import { DocumentVirusScanHandler } from './document-virus-scan.handler';
import { ClaimSubmissionHandler } from './claim-submission.handler';
import { NotificationFanoutHandler } from './notification-fanout.handler';
import { LabResultCriticalAlertHandler } from './lab-result-critical-alert.handler';
import { PrescriptionRefillReminderHandler } from './prescription-refill-reminder.handler';
import { InsuranceEligibilityRefreshHandler } from './insurance-eligibility-refresh.handler';
import { ImagingStudyPrefetchHandler } from './imaging-study-prefetch.handler';
import { AuditLogArchivalHandler } from './audit-log-archival.handler';
import { PatientMergeReconciliationHandler } from './patient-merge-reconciliation.handler';
import { TelehealthSessionRecordingHandler } from './telehealth-session-recording.handler';
import { FormularyUpdateSyncHandler } from './formulary-update-sync.handler';
import { BedCapacityForecastHandler } from './bed-capacity-forecast.handler';
import { CarePlanReviewReminderHandler } from './care-plan-review-reminder.handler';
import { PriorAuthExpirationHandler } from './prior-auth-expiration.handler';
import { MedicationAdministrationSyncHandler } from './medication-administration-sync.handler';
import { ReportExportHandler } from './report-export.handler';

export const JOB_REGISTRY = {
  'AppointmentReminderJob': AppointmentReminderHandler,
  'OutboxPublisherJob': OutboxPublisherHandler,
  'SearchIndexerJob': SearchIndexerHandler,
  'AnalyticsRollupJob': AnalyticsRollupHandler,
  'DocumentVirusScanJob': DocumentVirusScanHandler,
  'ClaimSubmissionJob': ClaimSubmissionHandler,
  'NotificationFanoutJob': NotificationFanoutHandler,
  'LabResultCriticalAlertJob': LabResultCriticalAlertHandler,
  'PrescriptionRefillReminderJob': PrescriptionRefillReminderHandler,
  'InsuranceEligibilityRefreshJob': InsuranceEligibilityRefreshHandler,
  'ImagingStudyPrefetchJob': ImagingStudyPrefetchHandler,
  'AuditLogArchivalJob': AuditLogArchivalHandler,
  'PatientMergeReconciliationJob': PatientMergeReconciliationHandler,
  'TelehealthSessionRecordingJob': TelehealthSessionRecordingHandler,
  'FormularyUpdateSyncJob': FormularyUpdateSyncHandler,
  'BedCapacityForecastJob': BedCapacityForecastHandler,
  'CarePlanReviewReminderJob': CarePlanReviewReminderHandler,
  'PriorAuthExpirationJob': PriorAuthExpirationHandler,
  'MedicationAdministrationSyncJob': MedicationAdministrationSyncHandler,
  'ReportExportJob': ReportExportHandler,
} as const;

export type RegisteredJobName = keyof typeof JOB_REGISTRY;

export const QUEUE_MAPPINGS: Record<string, RegisteredJobName[]> = {
  'reminders': ['AppointmentReminderJob'],
  'outbox': ['OutboxPublisherJob'],
  'search': ['SearchIndexerJob'],
  'analytics': ['AnalyticsRollupJob', 'BedCapacityForecastJob', 'ReportExportJob'],
  'documents': ['DocumentVirusScanJob'],
  'billing': ['ClaimSubmissionJob'],
  'notifications': ['NotificationFanoutJob'],
  'clinical': ['LabResultCriticalAlertJob', 'CarePlanReviewReminderJob', 'MedicationAdministrationSyncJob'],
  'pharmacy': ['PrescriptionRefillReminderJob', 'FormularyUpdateSyncJob'],
  'insurance': ['InsuranceEligibilityRefreshJob', 'PriorAuthExpirationJob'],
  'radiology': ['ImagingStudyPrefetchJob'],
  'audit': ['AuditLogArchivalJob'],
  'patient': ['PatientMergeReconciliationJob'],
  'telemedicine': ['TelehealthSessionRecordingJob'],
};
