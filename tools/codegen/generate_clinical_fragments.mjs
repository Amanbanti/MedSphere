#!/usr/bin/env node
/**
 * Generate MedSphere clinical Prisma model fragments.
 * Canonical: tools/codegen/generate_clinical_fragments.py
 * Fallback:  node tools/codegen/generate_clinical_fragments.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../..');
const MODELS_DIR = path.join(REPO_ROOT, 'packages', 'database', 'prisma', 'models');

const pascalToSnake = (n) =>
  n.replace(/(.)([A-Z][a-z]+)/g, '$1_$2').replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
const pluralize = (n) => {
  if (n.endsWith('y') && !/(ay|ey|iy|oy|uy)$/.test(n)) return n.slice(0, -1) + 'ies';
  if (/(s|x|z|ch|sh)$/.test(n)) return n + 'es';
  return n + 's';
};

const F = {
  uuid: (n, o = false) => `  ${n} String${o ? '?' : ''} @map("${pascalToSnake(n.replace(/Id$/, ''))}_id") @db.Uuid`,
  str: (n, o = false, map) => `  ${n} String${o ? '?' : ''}${map ? ` @map("${map}")` : ''}`,
  enum: (n, t, o = false, def) =>
    `  ${n} ${t}${o ? '?' : ''}${def ? ` @default(${def})` : ''}${n !== pascalToSnake(n) ? ` @map("${pascalToSnake(n)}")` : ''}`,
  ts: (n, o = false) => `  ${n} DateTime${o ? '?' : ''} @map("${pascalToSnake(n)}") @db.Timestamptz(6)`,
  date: (n, o = false) => `  ${n} DateTime${o ? '?' : ''} @map("${pascalToSnake(n)}") @db.Date`,
  dec: (n, o = false) => `  ${n} Decimal${o ? '?' : ''} @map("${pascalToSnake(n)}") @db.Decimal(14, 4)`,
  int: (n, o = false, def) => `  ${n} Int${o ? '?' : ''} @map("${pascalToSnake(n)}")${def != null ? ` @default(${def})` : ''}`,
  bool: (n, def = 'false') => `  ${n} Boolean @map("${pascalToSnake(n)}") @default(${def})`,
  json: (n) => `  ${n} Json @map("${pascalToSnake(n)}") @default("{}")`,
};

function renderModel(name, bodyLines, opts = {}) {
  const {
    tenant = true,
    soft = true,
    versioned = true,
    indexes = [],
    uniques = [],
    relations = [],
  } = opts;
  const lines = [`model ${name} {`];
  lines.push('  id String @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid');
  if (tenant) lines.push('  organizationId String @map("organization_id") @db.Uuid');
  lines.push(...bodyLines);
  lines.push('  createdAt DateTime @default(now()) @map("created_at") @db.Timestamptz(6)');
  lines.push('  updatedAt DateTime @updatedAt @map("updated_at") @db.Timestamptz(6)');
  if (soft) lines.push('  deletedAt DateTime? @map("deleted_at") @db.Timestamptz(6)');
  if (versioned) lines.push('  version Int @default(1)');
  for (const r of relations) lines.push(`  ${r.field} ${r.model} @relation(fields: [${r.fk}], references: [id])`);
  const idx = [...new Set([...(tenant ? ['organizationId'] : []), ...(soft ? ['deletedAt'] : []), ...indexes])];
  for (const i of idx) lines.push(`  @@index([${i}])`);
  for (const u of uniques) lines.push(`  @@unique([${u}])`);
  lines.push(`  @@map("${pluralize(pascalToSnake(name))}")`);
  lines.push('}');
  return lines.join('\n');
}

function domainBlock(names, fieldFn, opts = {}) {
  return names.map((n) => renderModel(n, fieldFn(n), opts)).join('\n\n');
}

// --- Enums (embedded in fragment files) ---
const ENUMS = {
  patient: `enum PatientRegistrationStatus { DRAFT PENDING_VERIFICATION ACTIVE INACTIVE MERGED DECEASED }
enum AllergySeverity { MILD MODERATE SEVERE LIFE_THREATENING UNKNOWN }
enum AllergyType { DRUG FOOD ENVIRONMENTAL OTHER }
enum ConsentStatus { PENDING SIGNED REVOKED EXPIRED }
enum DocumentType { IDENTIFICATION INSURANCE_CARD LAB_REPORT IMAGING_REPORT CONSENT REFERRAL PRESCRIPTION CLINICAL_NOTE OTHER }
enum TimelineEventType { REGISTRATION APPOINTMENT ENCOUNTER LAB_ORDER LAB_RESULT PRESCRIPTION ADMISSION DISCHARGE BILLING INSURANCE DOCUMENT ALERT OTHER }
enum VitalSignType { BLOOD_PRESSURE HEART_RATE RESPIRATORY_RATE TEMPERATURE SPO2 WEIGHT HEIGHT BMI PAIN_SCORE GLUCOSE }`,
  staff: `enum CredentialStatus { ACTIVE EXPIRED REVOKED PENDING_VERIFICATION }
enum ScheduleBlockType { AVAILABLE UNAVAILABLE BREAK ON_CALL SURGERY ADMIN }
enum LeaveType { VACATION SICK PERSONAL MATERNITY PATERNITY UNPAID OTHER }`,
  appt: `enum AppointmentStatus { SCHEDULED CONFIRMED CHECKED_IN IN_PROGRESS COMPLETED CANCELLED NO_SHOW RESCHEDULED }
enum AppointmentPriority { ROUTINE URGENT EMERGENT STAT }
enum QueueStatus { WAITING CALLED IN_SERVICE COMPLETED SKIPPED CANCELLED }
enum ReminderChannel { SMS EMAIL PUSH PHONE IN_APP }`,
  emr: `enum EncounterClass { AMBULATORY EMERGENCY INPATIENT OBSERVATION VIRTUAL HOME_HEALTH }
enum EncounterStatus { PLANNED ARRIVED IN_PROGRESS ON_HOLD FINISHED CANCELLED }
enum ClinicalNoteStatus { DRAFT PRELIMINARY FINAL AMENDED ENTERED_IN_ERROR }
enum ProblemStatus { ACTIVE RECURRING INACTIVE RESOLVED }
enum MedicationOrderStatus { DRAFT ACTIVE ON_HOLD COMPLETED STOPPED CANCELLED }`,
  lab: `enum LabOrderStatus { DRAFT ORDERED COLLECTED IN_TRANSIT RECEIVED IN_PROGRESS COMPLETED CANCELLED REJECTED }
enum LabResultStatus { PRELIMINARY FINAL CORRECTED CANCELLED ENTERED_IN_ERROR }
enum SpecimenStatus { COLLECTED IN_TRANSIT RECEIVED PROCESSING STORED DISPOSED REJECTED }
enum LabValidationStatus { PENDING VALIDATED REJECTED REQUIRES_REVIEW }`,
  rad: `enum RadiologyModalityType { CT MRI US XR MG NM PT RF OTHER }
enum RadiologyStudyStatus { SCHEDULED IN_PROGRESS COMPLETED PRELIMINARY FINAL CANCELLED }
enum DicomTransferStatus { PENDING IN_PROGRESS COMPLETE FAILED }`,
  pharm: `enum DrugSchedule { OTC RX CONTROLLED_II CONTROLLED_III CONTROLLED_IV CONTROLLED_V }
enum InventoryTransactionType { RECEIPT DISPENSE ADJUSTMENT TRANSFER RETURN WASTE RECALL }
enum DispenseStatus { PENDING IN_PROGRESS READY PICKED_UP DELIVERED CANCELLED RETURNED }`,
  bill: `enum InvoiceStatus { DRAFT ISSUED PARTIALLY_PAID PAID VOID WRITTEN_OFF COLLECTIONS }
enum PaymentStatus { PENDING AUTHORIZED CAPTURED FAILED REFUNDED VOIDED }
enum PaymentMethodType { CASH CARD CHECK ACH WIRE INSURANCE OTHER }`,
  ins: `enum ClaimStatus { DRAFT SUBMITTED ACCEPTED REJECTED PENDING PAID DENIED APPEALED CLOSED }
enum EligibilityStatus { ACTIVE INACTIVE UNKNOWN PENDING }
enum AuthorizationStatus { PENDING APPROVED DENIED PARTIAL EXPIRED CANCELLED }`,
  tele: `enum TelemedicineSessionStatus { SCHEDULED WAITING IN_PROGRESS COMPLETED CANCELLED FAILED }
enum ParticipantRole { PATIENT PROVIDER NURSE INTERPRETER OBSERVER CAREGIVER }
enum RecordingStatus { NOT_RECORDED RECORDING PROCESSING AVAILABLE DELETED FAILED }`,
  notif: `enum NotificationStatus { PENDING QUEUED SENT DELIVERED FAILED BOUNCED READ CANCELLED }
enum NotificationChannelType { EMAIL SMS PUSH IN_APP WEBHOOK VOICE }`,
  rx: `enum PrescriptionStatus { DRAFT ACTIVE ON_HOLD COMPLETED CANCELLED EXPIRED DISCONTINUED }
enum PrescriptionTransmissionStatus { PENDING TRANSMITTED ACKNOWLEDGED FAILED CANCELLED }`,
  search: `enum SearchIndexJobStatus { PENDING RUNNING COMPLETED FAILED CANCELLED }
enum SearchEntityType { PATIENT ENCOUNTER LAB_RESULT RADIOLOGY_REPORT PRESCRIPTION DOCUMENT PROVIDER INVOICE OTHER }`,
};

const patientFields = () => [
  F.uuid('patientId'),
  F.str('code', true),
  F.str('name', true),
  F.str('description', true),
  F.str('status', false),
  F.ts('occurredAt', true),
  F.json('metadata'),
];

const staffNames = [
  'DoctorProfile', 'NurseProfile', 'StaffProfile', 'Specialty', 'DoctorSpecialty', 'Credential',
  'DoctorCredential', 'License', 'StaffLicense', 'StaffSchedule', 'StaffScheduleBlock',
  'StaffAvailability', 'StaffLeave', 'StaffOnCall', 'StaffDepartmentAssignment', 'StaffRoleExtension',
  'StaffCertification', 'StaffTraining', 'StaffPerformanceReview', 'StaffContact',
  'StaffEmergencyContact', 'StaffDocument', 'StaffPrivilege', 'StaffCredentialVerification',
  'ReferringPhysician', 'CareTeam', 'CareTeamProvider', 'ProviderNetwork', 'ProviderContract',
  'ProviderRating', 'StaffCompetency', 'StaffShiftSwap', 'StaffOvertimeRecord', 'StaffBadge',
  'StaffEquipmentAssignment', 'StaffRoomAssignment', 'StaffNotificationPreference',
];

const apptNames = [
  'Appointment', 'AppointmentType', 'AppointmentStatusHistory', 'AppointmentSlot',
  'ProviderAvailability', 'ProviderAvailabilityException', 'AppointmentQueue', 'QueueEntry',
  'AppointmentReminder', 'AppointmentReminderDelivery', 'AppointmentCheckIn', 'AppointmentCheckOut',
  'AppointmentCancellation', 'AppointmentReschedule', 'AppointmentResource', 'AppointmentRoom',
  'AppointmentEquipment', 'WaitlistEntry', 'AppointmentTemplate', 'RecurringAppointment',
  'AppointmentNote', 'AppointmentAttachment', 'AppointmentBillingLink', 'AppointmentTelemedicineLink',
  'AppointmentSurvey', 'AppointmentSurveyResponse', 'AppointmentNoShow', 'AppointmentOverbooking',
  'AppointmentPriorityRule', 'AppointmentReferralLink', 'AppointmentWaitTimeMetric', 'AppointmentResourceBooking',
];

const emrNames = [
  'Encounter', 'EncounterParticipant', 'EncounterDiagnosis', 'EncounterProcedure', 'ClinicalNote',
  'SoapNote', 'ProgressNote', 'DischargeSummary', 'DischargeInstruction', 'ProblemList',
  'ProblemListItem', 'DiagnosisCode', 'ProcedureCode', 'MedicationAdministration', 'MedicationOrder',
  'MedicationOrderSchedule', 'ClinicalObservation', 'ClinicalImpression', 'CarePlan', 'CarePlanGoal',
  'CarePlanActivity', 'TreatmentPlan', 'TreatmentPlanItem', 'ClinicalAttachment', 'ClinicalDocument',
  'ClinicalDocumentSection', 'VitalSignReading', 'BodySite', 'EncounterLocation', 'EncounterStatusHistory',
  'EncounterTransfer', 'EncounterAdmission', 'EncounterDischarge', 'NursingAssessment', 'NursingCarePlan',
  'NursingIntervention', 'PhysicianOrder', 'OrderSet', 'OrderSetItem', 'ClinicalPathway', 'PathwayStep',
  'ClinicalAlert', 'ClinicalDecisionSupport', 'ReferralOrder', 'ConsultRequest', 'ConsultResponse',
  'HealthMaintenance', 'ClinicalTimelineEntry', 'ClinicalFormResponse', 'ClinicalTemplate',
  'ClinicalTemplateField', 'EncounterBillingLink', 'EncounterInsuranceLink', 'EncounterCareTeam',
  'EncounterAllergyReview', 'EncounterMedicationReview',
];

const labNames = [
  'LabOrder', 'LabOrderItem', 'LabTestCatalog', 'LabPanel', 'LabPanelTest', 'LabSpecimen',
  'LabSpecimenCollection', 'LabSpecimenContainer', 'LabSpecimenTransport', 'LabResult',
  'LabResultComponent', 'LabReferenceRange', 'LabResultValidation', 'LabResultComment', 'LabBarcode',
  'LabReport', 'LabReportSection', 'LabCriticalValue', 'LabDeltaCheck', 'LabQualityControl',
  'LabQcResult', 'LabInstrument', 'LabInstrumentCalibration', 'LabWorklist', 'LabWorklistItem',
  'LabRequisition', 'LabRequisitionAttachment', 'LabOrderStatusHistory', 'LabResultAmendment',
  'LabResultNotification', 'LabExternalLab', 'LabCompendium', 'LabCompendiumMapping',
  'LabMicrobiologyResult', 'LabCulture', 'LabSensitivity', 'LabPathologyReport', 'LabGenomicsResult',
  'LabToxicologyResult', 'LabOrderPriority', 'LabSpecimenAliquot', 'LabResultAttachment',
  'LabOrderComment', 'LabResultFlag', 'LabPerformingSite', 'LabCourierRoute', 'LabSpecimenRejection',
];

const radNames = [
  'RadiologyOrder', 'RadiologyStudy', 'RadiologySeries', 'RadiologyInstance', 'DicomStudy',
  'DicomSeries', 'DicomInstance', 'DicomMetadata', 'RadiologyReport', 'RadiologyReportTemplate',
  'RadiologyFinding', 'RadiologyImpression', 'RadiologyProtocol', 'RadiologyModality',
  'RadiologyEquipment', 'RadiologyTechnologistAssignment', 'RadiologyRadiologistAssignment',
  'RadiologyPeerReview', 'RadiologyCriticalFinding', 'RadiologyContrastAdministration',
  'RadiologyDoseReport', 'RadiologyWorklist', 'RadiologyWorklistItem', 'RadiologyOrderStatusHistory',
  'RadiologyReportAmendment', 'RadiologyReportDistribution', 'RadiologyPacsLink',
  'RadiologyStructuredReport', 'RadiologyMeasurement', 'RadiologyComparison', 'RadiologyQualityMetric',
  'RadiologySchedulingSlot', 'RadiologyPriorStudyLink', 'RadiologyAddendum', 'RadiologyTeachingFile',
  'RadiologyAiInference',
];

const pharmNames = [
  'DrugCatalog', 'DrugFormulary', 'DrugFormularyItem', 'DrugIngredient', 'DrugInteraction',
  'DrugAllergyCrossReference', 'PharmacyInventory', 'PharmacyInventoryLot', 'PharmacyInventoryTransaction',
  'PharmacySupplier', 'PharmacyPurchaseOrder', 'PharmacyPurchaseOrderItem', 'PharmacyDispense',
  'PharmacyDispenseItem', 'PharmacyReturn', 'PharmacyCompounding', 'PharmacyCompoundingIngredient',
  'PharmacyStorageLocation', 'PharmacyShelf', 'PharmacyStockAlert', 'PharmacyNdcMapping',
  'PharmacyPricing', 'PharmacyInsuranceOverride', 'PharmacyPriorAuth', 'PharmacyMedicationTherapyReview',
  'PharmacyAdverseEvent', 'PharmacyRecall', 'PharmacyBarcodeScan', 'PharmacyLabel', 'PharmacyDelivery',
  'PharmacyDeliveryStop', 'PharmacyAutomatedDispenser', 'PharmacyCycleCount', 'PharmacyWasteLog',
  'PharmacyControlledSubstanceLog', 'PharmacyDrugShortage', 'PharmacyIvAdmixture', 'PharmacyReconciliation',
  'PharmacyFormularyException', 'PharmacyContractPrice',
];

const billNames = [
  'BillingAccount', 'Invoice', 'InvoiceLineItem', 'InvoiceTax', 'InvoiceDiscount', 'Payment',
  'PaymentMethod', 'PaymentAllocation', 'Refund', 'RefundAllocation', 'Receipt', 'ReceiptLine',
  'BillingCharge', 'BillingChargeCategory', 'BillingFeeSchedule', 'BillingFeeScheduleItem',
  'BillingContract', 'BillingContractRate', 'BillingAdjustment', 'BillingWriteOff', 'BillingCollection',
  'BillingCollectionActivity', 'BillingStatement', 'BillingStatementLine', 'BillingCopay',
  'BillingDeductible', 'BillingPriorBalance', 'BillingPaymentPlan', 'BillingPaymentPlanInstallment',
  'BillingEob', 'BillingEobLine', 'BillingCoding', 'BillingModifier', 'BillingDenial', 'BillingAppeal',
  'BillingReconciliation', 'BillingGuarantor', 'BillingDeposit', 'BillingCreditMemo', 'BillingDebitMemo',
  'BillingChargeCapture', 'BillingRemittanceAdvice',
];

const insNames = [
  'InsurancePayer', 'InsurancePlan', 'InsurancePolicy', 'InsurancePolicyHolder', 'InsurancePolicyDependent',
  'InsuranceEligibilityCheck', 'InsuranceEligibilityBenefit', 'InsuranceAuthorization',
  'InsuranceAuthorizationService', 'InsuranceClaim', 'InsuranceClaimLine', 'InsuranceClaimStatusHistory',
  'InsuranceClaimAttachment', 'InsuranceClaimDenial', 'InsuranceClaimAppeal', 'InsuranceRemittance',
  'InsuranceRemittanceLine', 'InsuranceContract', 'InsuranceFeeSchedule', 'InsuranceNetwork',
  'InsuranceNetworkProvider', 'InsuranceCredentialing', 'InsurancePriorAuth', 'InsuranceCoverageRule',
  'InsuranceCopayRule', 'InsuranceDeductibleRule', 'InsuranceOutOfPocket', 'InsuranceCoordinationOfBenefits',
  'InsuranceVerificationLog', 'InsuranceAppealDocument', 'InsurancePayerContact', 'InsurancePlanBenefit',
  'InsuranceSubscriber', 'InsuranceEnrollment', 'InsuranceCapitationAgreement', 'InsuranceRiskAdjustment',
  'InsuranceUnderpayment', 'InsuranceOverpayment',
];

const teleNames = [
  'TelemedicineSession', 'TelemedicineParticipant', 'TelemedicineChatMessage', 'TelemedicineChatAttachment',
  'TelemedicineRecording', 'TelemedicineRecordingMetadata', 'TelemedicineSessionEvent',
  'TelemedicineWaitingRoom', 'TelemedicineWaitingRoomEntry', 'TelemedicineConsent', 'TelemedicineDevice',
  'TelemedicineConnectionLog', 'TelemedicineQualityMetric', 'TelemedicineSessionNote',
  'TelemedicinePrescriptionLink', 'TelemedicineFollowUp', 'TelemedicineSessionRating',
  'TelemedicineInterpreter', 'TelemedicineScreenShare', 'TelemedicineBreakoutRoom', 'TelemedicinePoll',
  'TelemedicinePollResponse', 'TelemedicineWhiteboard', 'TelemedicineSessionBilling',
  'TelemedicineTechnicalIssue', 'TelemedicineBandwidthLog', 'TelemedicineSessionRecordingConsent',
];

const notifNames = [
  'NotificationTemplate', 'NotificationTemplateVersion', 'NotificationChannel', 'NotificationPreference',
  'NotificationSubscription', 'NotificationDelivery', 'NotificationDeliveryAttempt', 'NotificationBatch',
  'NotificationBatchItem', 'NotificationRule', 'NotificationRuleCondition', 'NotificationQueue',
  'NotificationInApp', 'NotificationSms', 'NotificationEmail', 'NotificationPush', 'NotificationWebhook',
  'NotificationDigest', 'NotificationUnsubscribe', 'NotificationAudit', 'NotificationRecipient',
  'NotificationSchedule', 'NotificationThrottle', 'NotificationFailureLog', 'NotificationOptOut',
  'NotificationCategory',
];

const analNames = [
  'AnalyticsSnapshot', 'AnalyticsDailyMetric', 'AnalyticsHourlyMetric', 'AnalyticsPatientMetric',
  'AnalyticsProviderMetric', 'AnalyticsDepartmentMetric', 'AnalyticsFinancialMetric', 'AnalyticsClinicalMetric',
  'AnalyticsOperationalMetric', 'AnalyticsQualityMetric', 'AnalyticsDashboard', 'AnalyticsDashboardWidget',
  'AnalyticsReport', 'AnalyticsReportRun', 'AnalyticsKpi', 'AnalyticsKpiValue', 'AnalyticsCohort',
  'AnalyticsCohortMember', 'AnalyticsDataExport', 'AnalyticsAggregationJob', 'AnalyticsBenchmark',
  'AnalyticsTrend', 'AnalyticsForecast', 'AnalyticsAlert', 'AnalyticsDataSource',
];

const searchNames = [
  'SearchIndexJob', 'SearchIndexJobLog', 'SearchDocument', 'SearchDocumentVersion', 'SearchSynonym',
  'SearchBoostRule', 'SearchQueryLog', 'SearchQueryClick', 'SearchReindexBatch', 'SearchReindexBatchItem',
  'SearchAlias', 'SearchMapping', 'SearchSuggestion', 'SearchFacetConfig', 'SearchAnalyticsDaily',
  'SearchRankingSignal', 'SearchStopWord', 'SearchPipeline', 'SearchPipelineStage', 'SearchIndexShard',
  'SearchIndexHealth',
];

const rxNames = [
  'Prescription', 'PrescriptionItem', 'PrescriptionRefill', 'PrescriptionRefillRequest',
  'PrescriptionTransmission', 'PrescriptionSignature', 'PrescriptionDiagnosisLink',
  'PrescriptionInteractionCheck', 'PrescriptionAllergyCheck', 'PrescriptionPriorAuth',
  'PrescriptionStatusHistory', 'PrescriptionCancel', 'PrescriptionHold', 'PrescriptionCompound',
  'PrescriptionCompoundIngredient', 'PrescriptionEpcsAudit', 'PrescriptionPharmacyRouting',
  'PrescriptionDeliveryPreference', 'PrescriptionLabel', 'PrescriptionAdherence',
  'PrescriptionAdherenceEvent', 'PrescriptionMedicationHistory', 'PrescriptionSubstitution',
  'PrescriptionRenewal', 'PrescriptionVerification', 'PrescriptionDosageInstruction',
  'PrescriptionFormularyCheck', 'PrescriptionDispenseHistory', 'PrescriptionPatientEducation',
  'PrescriptionCoverageCheck',
];

const auditNames = [
  'EntityVersion', 'EntityVersionDiff', 'EntityAuditTrail', 'EntitySnapshot', 'ClinicalRecordVersion',
  'PatientRecordVersion', 'EncounterVersion', 'LabResultVersion', 'RadiologyReportVersion',
  'PrescriptionVersion', 'BillingRecordVersion', 'InsuranceClaimVersion', 'DocumentVersionHistory',
  'ConfigurationVersion', 'MasterDataVersion', 'DataRetentionPolicy', 'DataRetentionExecution',
  'DataAccessLog', 'PhiAccessLog', 'BreakGlassAccess', 'ConsentAudit', 'ImmutableAuditBlock',
  'AuditExport', 'AuditRetention', 'ChangeDataCapture', 'EntityLock', 'EntityMergeAudit',
  'FieldLevelAudit', 'RecordIntegrityCheck', 'ComplianceExportJob', 'HipaaDisclosureLog',
  'SecurityIncidentLog',
];

const patientNames = [
  'PatientProfile', 'PatientAddress', 'PatientContact', 'PatientEmergencyContact', 'PatientMedicalHistory',
  'PatientFamilyHistory', 'PatientAllergy', 'PatientAllergyReaction', 'PatientVaccination', 'PatientVitalSign',
  'PatientVitalBatch', 'PatientConsentForm', 'PatientConsentSignature', 'PatientDocument',
  'PatientDocumentVersion', 'PatientTimelineEvent', 'PatientRegistration', 'PatientIdentifier',
  'PatientPreference', 'PatientCommunicationPreference', 'PatientPortalAccount', 'PatientPhoto',
  'PatientSocialHistory', 'PatientTravelHistory', 'PatientImmunizationSchedule', 'PatientGrowthChart',
  'PatientRiskScore', 'PatientCareTeamMember', 'PatientReferral', 'PatientMergeRecord',
  'PatientDuplicateCandidate', 'PatientFlag', 'PatientAlert', 'PatientNote', 'PatientAdvanceDirective',
  'PatientInsuranceInfo', 'PatientLanguage', 'PatientEthnicity', 'PatientReligion', 'PatientExternalId',
];

function mkFields(kind) {
  const common = () => [
    F.uuid('patientId'),
    F.uuid('encounterId', true),
    F.uuid('providerId', true),
    F.uuid('facilityId', true),
    F.str('code', true),
    F.str('name', true),
    F.str('title', true),
    F.str('description', true),
    F.str('status', false),
    F.str('notes', true),
    F.dec('amount', true),
    F.int('quantity', true),
    F.ts('occurredAt', true),
    F.ts('effectiveAt', true),
    F.date('effectiveDate', true),
    F.json('metadata'),
    F.json('payload'),
  ];
  if (kind === 'audit') {
    return () => [
      F.str('entityType', false, 'entity_type'),
      F.uuid('entityId'),
      F.int('versionNumber', true, 1),
      F.uuid('changedById', true),
      F.str('changeType', true, 'change_type'),
      F.json('beforeState'),
      F.json('afterState'),
      F.json('diff'),
      F.ts('changedAt', true),
      F.str('reason', true),
      F.str('ipAddress', true, 'ip_address'),
    ];
  }
  if (kind === 'analytics') return common;
  return common;
}

const FRAGMENTS = [
  ['01-patient-management.prisma', ENUMS.patient, patientNames, mkFields('patient'), { indexes: ['patientId'] }],
  ['02-doctor-staff.prisma', ENUMS.staff, staffNames, () => [F.uuid('userId'), F.uuid('facilityId', true), F.str('npiNumber', true, 'npi_number'), F.str('title', true), F.str('bio', true), F.str('status'), F.date('effectiveDate', true), F.date('expirationDate', true)], { indexes: ['userId'] }],
  ['03-appointments.prisma', ENUMS.appt, apptNames, mkFields('appt'), { indexes: ['patientId', 'providerId'] }],
  ['04-emr.prisma', ENUMS.emr, emrNames, mkFields('emr'), { indexes: ['patientId', 'encounterId'] }],
  ['05-laboratory.prisma', ENUMS.lab, labNames, mkFields('lab'), { indexes: ['patientId', 'labOrderId'] }],
  ['06-radiology.prisma', ENUMS.rad, radNames, mkFields('rad'), { indexes: ['patientId', 'radiologyOrderId'] }],
  ['07-pharmacy.prisma', ENUMS.pharm, pharmNames, mkFields('pharm'), { indexes: ['drugCatalogId', 'patientId'] }],
  ['08-billing.prisma', ENUMS.bill, billNames, mkFields('bill'), { indexes: ['patientId', 'billingAccountId'] }],
  ['09-insurance.prisma', ENUMS.ins, insNames, mkFields('ins'), { indexes: ['patientId', 'payerId'] }],
  ['10-telemedicine.prisma', ENUMS.tele, teleNames, mkFields('tele'), { indexes: ['patientId', 'sessionId'] }],
  ['11-notifications.prisma', ENUMS.notif, notifNames, mkFields('notif'), { indexes: ['userId', 'patientId'] }],
  ['12-analytics.prisma', '', analNames, mkFields('analytics'), { indexes: ['metricCode'], versioned: false }],
  ['13-search.prisma', ENUMS.search, searchNames, mkFields('search'), { indexes: ['entityType'], soft: false, versioned: false }],
  ['14-prescriptions.prisma', ENUMS.rx, rxNames, mkFields('rx'), { indexes: ['patientId', 'prescriptionId'] }],
  ['15-audit-versions.prisma', '', auditNames, mkFields('audit'), { soft: false, versioned: false, indexes: ['entityType', 'entityId'] }],
];

function writeFragment(filename, enums, names, fieldFn, opts) {
  const parts = [
    `// Auto-generated: ${filename}`,
    `// Regenerate: node tools/codegen/generate_clinical_fragments.mjs`,
    '',
  ];
  if (enums) {
    parts.push(enums.trim(), '');
  }
  for (const name of names) {
    const extra = fieldFn(name);
    // Add domain-specific FK fields by model prefix
    if (name.startsWith('Lab') && name !== 'LabOrder') extra.unshift(F.uuid('labOrderId', true));
    if (name.startsWith('Radiology') && name !== 'RadiologyOrder') extra.unshift(F.uuid('radiologyOrderId', true));
    if (name.startsWith('Prescription') && name !== 'Prescription') extra.unshift(F.uuid('prescriptionId', true));
    if (name.startsWith('Telemedicine') && name !== 'TelemedicineSession') extra.unshift(F.uuid('sessionId', true));
    if (name.startsWith('Notification') && name !== 'NotificationTemplate') extra.unshift(F.uuid('templateId', true));
    if (name.startsWith('Insurance') && name !== 'InsurancePayer') extra.unshift(F.uuid('payerId', true));
    if (name.startsWith('Billing') && name !== 'BillingAccount') extra.unshift(F.uuid('billingAccountId', true));
    if (name.startsWith('Encounter') && name !== 'Encounter') extra.unshift(F.uuid('encounterId'));
    parts.push(renderModel(name, extra, {
      soft: opts.soft ?? true,
      versioned: opts.versioned ?? true,
      indexes: opts.indexes ?? [],
    }));
    parts.push('');
  }
  fs.mkdirSync(MODELS_DIR, { recursive: true });
  fs.writeFileSync(path.join(MODELS_DIR, filename), parts.join('\n').trim() + '\n');
  return names.length;
}

let total = 0;
const summary = [];
for (const [file, enums, names, fieldFn, opts] of FRAGMENTS) {
  const count = writeFragment(file, enums, names, fieldFn, opts);
  total += count;
  summary.push([file, count]);
  console.log(`  ${file}: ${count} models`);
}
console.log(`\nGenerated ${total} clinical models across ${summary.length} fragment files.`);
