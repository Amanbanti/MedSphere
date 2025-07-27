/**
 * Production-grade clinical Prisma model field definitions.
 * Used by generate_production_phase234.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const F = {
  uuid: (n, o = false) => `  ${n} String${o ? '?' : ''} @map("${snake(n.replace(/Id$/, ''))}_id") @db.Uuid`,
  str: (n, o = false, map, len) => `  ${n} String${o ? '?' : ''}${map ? ` @map("${map}")` : ''}${len ? ` @db.VarChar(${len})` : ''}`,
  enum: (n, t, o = false, def) => `  ${n} ${t}${o ? '?' : ''}${def ? ` @default(${def})` : ''}`,
  ts: (n, o = false) => `  ${n} DateTime${o ? '?' : ''} @map("${snake(n)}") @db.Timestamptz(6)`,
  date: (n, o = false) => `  ${n} DateTime${o ? '?' : ''} @map("${snake(n)}") @db.Date`,
  dec: (n, o = false, p = '14,4') => `  ${n} Decimal${o ? '?' : ''} @map("${snake(n)}") @db.Decimal(${p})`,
  int: (n, o = false, def) => `  ${n} Int${o ? '?' : ''}${def != null ? ` @default(${def})` : ''}`,
  bool: (n, def = 'false') => `  ${n} Boolean @map("${snake(n)}") @default(${def})`,
  json: (n) => `  ${n} Json @map("${snake(n)}") @default("{}")`,
  text: (n, o = false) => `  ${n} String${o ? '?' : ''} @map("${snake(n)}") @db.Text`,
};

function snake(n) {
  return n.replace(/(.)([A-Z][a-z]+)/g, '$1_$2').replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
}

function pluralize(n) {
  if (n.endsWith('y') && !/(ay|ey|iy|oy|uy)$/.test(n)) return n.slice(0, -1) + 'ies';
  if (/(s|x|z|ch|sh)$/.test(n)) return n + 'es';
  return n + 's';
}

function auditFields() {
  return [
    '  createdAt DateTime @default(now()) @map("created_at") @db.Timestamptz(6)',
    '  createdBy String? @map("created_by") @db.Uuid',
    '  updatedAt DateTime @updatedAt @map("updated_at") @db.Timestamptz(6)',
    '  updatedBy String? @map("updated_by") @db.Uuid',
    '  deletedAt DateTime? @map("deleted_at") @db.Timestamptz(6)',
    '  deletedBy String? @map("deleted_by") @db.Uuid',
    '  version Int @default(1)',
  ];
}

function renderModel(name, bodyLines, opts = {}) {
  const { tenant = true, indexes = [], uniques = [] } = opts;
  const lines = [`model ${name} {`, '  id String @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid'];
  if (tenant) lines.push('  organizationId String @map("organization_id") @db.Uuid');
  lines.push(...bodyLines);
  lines.push(...auditFields());
  const idx = [...new Set([...(tenant ? ['organizationId'] : []), 'deletedAt', ...indexes])];
  for (const i of idx) lines.push(`  @@index([${i}])`);
  for (const u of uniques) lines.push(`  @@unique([${u}])`);
  lines.push(`  @@map("${pluralize(snake(name))}")`);
  lines.push('}');
  return lines.join('\n');
}

export const ENUMS = {
  patient: `enum PatientRegistrationStatus { DRAFT PENDING_VERIFICATION ACTIVE INACTIVE MERGED DECEASED }
enum AllergySeverity { MILD MODERATE SEVERE LIFE_THREATENING UNKNOWN }
enum AllergyType { DRUG FOOD ENVIRONMENTAL BIOLOGIC OTHER }
enum AllergyVerificationStatus { UNCONFIRMED CONFIRMED REFUTED ENTERED_IN_ERROR }
enum ConsentStatus { PENDING SIGNED REVOKED EXPIRED }
enum DocumentType { IDENTIFICATION INSURANCE_CARD LAB_REPORT IMAGING_REPORT CONSENT REFERRAL PRESCRIPTION CLINICAL_NOTE OTHER }
enum TimelineEventType { REGISTRATION APPOINTMENT ENCOUNTER LAB_ORDER LAB_RESULT PRESCRIPTION ADMISSION DISCHARGE BILLING INSURANCE DOCUMENT ALERT OTHER }
enum VitalSignMethod { MANUAL DEVICE IMPORTED CALCULATED }
enum PatientFlagSeverity { INFO WARNING CRITICAL }
enum CareTeamRole { PRIMARY ATTENDING CONSULTING REFERRING NURSE PHARMACIST THERAPIST OTHER }`,
  staff: `enum ProviderStatus { ACTIVE INACTIVE SUSPENDED PENDING_CREDENTIALING ON_LEAVE }
enum CredentialStatus { ACTIVE EXPIRED REVOKED PENDING_VERIFICATION }
enum ScheduleBlockType { AVAILABLE UNAVAILABLE BREAK ON_CALL SURGERY ADMIN VACATION }
enum LeaveType { VACATION SICK PERSONAL MATERNITY PATERNITY UNPAID OTHER }
enum LicenseType { MEDICAL NURSING PHARMACY DEA STATE CONTROLLED_SUBSTANCE OTHER }
enum PrivilegeStatus { ACTIVE SUSPENDED PENDING REVOKED }`,
  appt: `enum AppointmentStatus { SCHEDULED CONFIRMED CHECKED_IN IN_PROGRESS COMPLETED CANCELLED NO_SHOW RESCHEDULED }
enum AppointmentPriority { ROUTINE URGENT EMERGENT STAT }
enum QueueStatus { WAITING CALLED IN_SERVICE COMPLETED SKIPPED CANCELLED }
enum ReminderChannel { SMS EMAIL PUSH PHONE IN_APP }
enum CancellationReasonCode { PATIENT_REQUEST PROVIDER_UNAVAILABLE FACILITY CLOSED WEATHER NO_SHOW OTHER }
enum WalkInStatus { REGISTERED TRIAGED WAITING IN_SERVICE COMPLETED LEFT_WITHOUT_BEING_SEEN }`,
  emr: `enum EncounterClass { AMBULATORY EMERGENCY INPATIENT OBSERVATION VIRTUAL HOME_HEALTH }
enum EncounterStatus { PLANNED ARRIVED IN_PROGRESS ON_HOLD FINISHED CANCELLED }
enum ClinicalNoteStatus { DRAFT PRELIMINARY FINAL AMENDED ENTERED_IN_ERROR }
enum ProblemStatus { ACTIVE RECURRING INACTIVE RESOLVED }
enum DiagnosisRole { ADMITTING WORKING DISCHARGE PRIMARY SECONDARY }
enum ProcedureStatus { PREPARATION IN_PROGRESS NOT_DONE ON_HOLD STOPPED COMPLETED }
enum MedicationStatementStatus { ACTIVE COMPLETED ENTERED_IN_ERROR INTENDED STOPPED ON_HOLD }
enum OrderStatus { DRAFT ACTIVE ON_HOLD REVOKED COMPLETED ENTERED_IN_ERROR }
enum CarePlanStatus { DRAFT ACTIVE ON_HOLD REVOKED COMPLETED ENTERED_IN_ERROR }`,
  lab: `enum LabOrderStatus { DRAFT ORDERED COLLECTED IN_TRANSIT RECEIVED IN_PROGRESS COMPLETED CANCELLED REJECTED }
enum LabResultStatus { PRELIMINARY FINAL CORRECTED CANCELLED ENTERED_IN_ERROR }
enum SpecimenStatus { COLLECTED IN_TRANSIT RECEIVED PROCESSING STORED DISPOSED REJECTED }
enum LabValidationStatus { PENDING VALIDATED REJECTED REQUIRES_REVIEW }
enum LabResultFlag { NORMAL LOW HIGH CRITICAL LOW_CRITICAL HIGH_CRITICAL ABNORMAL DELTA }`,
  rad: `enum RadiologyModalityType { CT MRI US XR MG NM PT RF OTHER }
enum RadiologyStudyStatus { SCHEDULED IN_PROGRESS COMPLETED PRELIMINARY FINAL CANCELLED }
enum DicomTransferStatus { PENDING IN_PROGRESS COMPLETE FAILED }
enum ReportStatus { DRAFT PRELIMINARY FINAL AMENDED ADDENDUM }`,
  pharm: `enum DrugSchedule { OTC RX CONTROLLED_II CONTROLLED_III CONTROLLED_IV CONTROLLED_V }
enum InventoryTransactionType { RECEIPT DISPENSE ADJUSTMENT TRANSFER RETURN WASTE RECALL }
enum DispenseStatus { PENDING IN_PROGRESS READY PICKED_UP DELIVERED CANCELLED RETURNED }
enum FormularyTier { TIER_1 TIER_2 TIER_3 TIER_4 NON_FORMULARY }
enum MedicationAdministrationStatus { IN_PROGRESS NOT_DONE ON_HOLD COMPLETED STOPPED ENTERED_IN_ERROR }`,
};

const MODEL_DEFS = {
  PatientProfile: () => [
    F.uuid('patientId'),
    F.enum('registrationStatus', 'PatientRegistrationStatus', false, 'ACTIVE'),
    F.str('preferredName', true, 'preferred_name', 100),
    F.str('maritalStatus', true, 'marital_status', 30),
    F.str('occupation', true, null, 100),
    F.str('employer', true, null, 200),
    F.str('primaryLanguage', true, 'primary_language', 10),
    F.bool('interpreterRequired'),
    F.str('bloodType', true, 'blood_type', 10),
    F.str('rhFactor', true, 'rh_factor', 5),
    F.date('deceasedDate', true),
    F.json('demographicsMetadata'),
  ],
  PatientAddress: () => [
    F.uuid('patientId'),
    F.str('addressType', false, 'address_type', 20),
    F.str('addressLine1', false, 'address_line1', 200),
    F.str('addressLine2', true, 'address_line2', 200),
    F.str('city', false, null, 100),
    F.str('state', false, null, 100),
    F.str('postalCode', false, 'postal_code', 20),
    F.str('country', false, null, 2),
    F.bool('isPrimary', 'false'),
    F.date('effectiveFrom', true),
    F.date('effectiveTo', true),
  ],
  PatientContact: () => [
    F.uuid('patientId'),
    F.str('contactType', false, 'contact_type', 20),
    F.str('value', false, null, 320),
    F.bool('isPrimary'),
    F.bool('smsOptIn', 'false'),
    F.bool('emailOptIn', 'false'),
  ],
  PatientEmergencyContact: () => [
    F.uuid('patientId'),
    F.str('firstName', false, 'first_name', 100),
    F.str('lastName', false, 'last_name', 100),
    F.str('relationship', false, null, 50),
    F.str('phone', false, null, 20),
    F.str('alternatePhone', true, 'alternate_phone', 20),
    F.str('email', true, null, 320),
    F.int('priority', false, 1),
    F.bool('isLegalGuardian', 'false'),
    F.text('notes', true),
  ],
  PatientMedicalHistory: () => [
    F.uuid('patientId'),
    F.str('conditionCode', true, 'condition_code', 20),
    F.str('conditionName', false, 'condition_name', 300),
    F.str('icd10Code', true, 'icd10_code', 10),
    F.date('onsetDate', true),
    F.date('resolutionDate', true),
    F.str('clinicalStatus', false, 'clinical_status', 30),
    F.text('notes', true),
    F.uuid('recordedById', true),
    F.ts('recordedAt', true),
  ],
  PatientFamilyHistory: () => [
    F.uuid('patientId'),
    F.str('relationship', false, null, 50),
    F.str('conditionName', false, 'condition_name', 300),
    F.str('icd10Code', true, 'icd10_code', 10),
    F.int('onsetAgeYears', true),
    F.bool('deceased'),
    F.int('deceasedAgeYears', true),
    F.text('notes', true),
  ],
  PatientAllergy: () => [
    F.uuid('patientId'),
    F.enum('allergyType', 'AllergyType', false, 'DRUG'),
    F.str('allergenCode', true, 'allergen_code', 50),
    F.str('allergen', false, null, 300),
    F.str('allergenSystem', true, 'allergen_system', 50),
    F.enum('severity', 'AllergySeverity', false, 'UNKNOWN'),
    F.str('reaction', true, null, 500),
    F.enum('verificationStatus', 'AllergyVerificationStatus', false, 'UNCONFIRMED'),
    F.date('onsetDate', true),
    F.date('lastOccurrenceDate', true),
    F.uuid('verifiedById', true),
    F.ts('verifiedAt', true),
    F.bool('isActive', 'true'),
    F.text('clinicalNotes', true),
  ],
  PatientAllergyReaction: () => [
    F.uuid('patientId'),
    F.uuid('allergyId'),
    F.str('manifestation', false, null, 300),
    F.enum('severity', 'AllergySeverity', false, 'MILD'),
    F.ts('occurredAt', true),
    F.text('notes', true),
  ],
  PatientVaccination: () => [
    F.uuid('patientId'),
    F.str('vaccineCode', false, 'vaccine_code', 20),
    F.str('vaccineName', false, 'vaccine_name', 300),
    F.str('cvxCode', true, 'cvx_code', 10),
    F.str('manufacturer', true, null, 200),
    F.str('lotNumber', true, 'lot_number', 50),
    F.date('administrationDate', false),
    F.str('site', true, null, 50),
    F.str('route', true, null, 50),
    F.dec('doseQuantity', true, '8,2'),
    F.str('doseUnit', true, 'dose_unit', 20),
    F.int('doseNumber', true),
    F.uuid('administeredById', true),
    F.uuid('facilityId', true),
    F.str('status', false, null, 30),
    F.text('notes', true),
  ],
  PatientVitalSign: () => [
    F.uuid('patientId'),
    F.uuid('encounterId', true),
    F.uuid('batchId', true),
    F.int('systolicMmHg', true),
    F.int('diastolicMmHg', true),
    F.int('heartRateBpm', true),
    F.dec('temperatureCelsius', true, '5,2'),
    F.dec('temperatureFahrenheit', true, '5,2'),
    F.int('respiratoryRateBpm', true),
    F.dec('spo2Percent', true, '5,2'),
    F.dec('weightKg', true, '6,2'),
    F.dec('heightCm', true, '6,2'),
    F.dec('bmi', true, '5,2'),
    F.int('painScore', true),
    F.dec('glucoseMgDl', true, '6,2'),
    F.enum('method', 'VitalSignMethod', false, 'MANUAL'),
    F.ts('recordedAt', false),
    F.uuid('recordedById', true),
    F.uuid('facilityId', true),
    F.text('notes', true),
  ],
  PatientVitalBatch: () => [
    F.uuid('patientId'),
    F.uuid('encounterId', true),
    F.ts('recordedAt', false),
    F.uuid('recordedById', true),
    F.str('location', true, null, 100),
    F.text('notes', true),
  ],
  PatientConsentForm: () => [
    F.uuid('patientId'),
    F.str('consentType', false, 'consent_type', 50),
    F.str('title', false, null, 300),
    F.text('content', true),
    F.enum('status', 'ConsentStatus', false, 'PENDING'),
    F.date('effectiveDate', true),
    F.date('expirationDate', true),
    F.uuid('documentId', true),
  ],
  PatientConsentSignature: () => [
    F.uuid('patientId'),
    F.uuid('consentFormId'),
    F.enum('status', 'ConsentStatus', false, 'SIGNED'),
    F.ts('signedAt', false),
    F.str('signerName', false, 'signer_name', 200),
    F.str('signerRelationship', true, 'signer_relationship', 50),
    F.str('signatureMethod', true, 'signature_method', 30),
    F.str('ipAddress', true, 'ip_address', 45),
  ],
  PatientDocument: () => [
    F.uuid('patientId'),
    F.enum('documentType', 'DocumentType', false, 'OTHER'),
    F.str('title', false, null, 300),
    F.str('fileName', false, 'file_name', 255),
    F.str('mimeType', false, 'mime_type', 100),
    F.int('fileSizeBytes', true),
    F.str('storageKey', false, 'storage_key', 500),
    F.str('checksumSha256', true, 'checksum_sha256', 64),
    F.uuid('uploadedById', true),
    F.ts('uploadedAt', true),
    F.date('documentDate', true),
    F.text('description', true),
  ],
  PatientDocumentVersion: () => [
    F.uuid('patientId'),
    F.uuid('documentId'),
    F.int('versionNumber', false, 1),
    F.str('storageKey', false, 'storage_key', 500),
    F.str('checksumSha256', true, 'checksum_sha256', 64),
    F.uuid('uploadedById', true),
    F.ts('uploadedAt', false),
    F.text('changeNotes', true),
  ],
  PatientTimelineEvent: () => [
    F.uuid('patientId'),
    F.enum('eventType', 'TimelineEventType', false, 'OTHER'),
    F.str('title', false, null, 300),
    F.text('description', true),
    F.ts('occurredAt', false),
    F.uuid('sourceEntityId', true),
    F.str('sourceEntityType', true, 'source_entity_type', 50),
    F.uuid('actorId', true),
    F.json('metadata'),
  ],
  PatientRegistration: () => [
    F.uuid('patientId'),
    F.enum('status', 'PatientRegistrationStatus', false, 'DRAFT'),
    F.ts('submittedAt', true),
    F.ts('verifiedAt', true),
    F.uuid('verifiedById', true),
    F.uuid('facilityId', true),
    F.str('registrationSource', true, 'registration_source', 50),
    F.text('rejectionReason', true),
  ],
  PatientIdentifier: () => [
    F.uuid('patientId'),
    F.str('identifierType', false, 'identifier_type', 50),
    F.str('identifierValue', false, 'identifier_value', 100),
    F.str('assigningAuthority', true, 'assigning_authority', 100),
    F.bool('isPrimary'),
    F.date('effectiveFrom', true),
    F.date('effectiveTo', true),
  ],
  PatientInsuranceInfo: () => [
    F.uuid('patientId'),
    F.str('payerName', false, 'payer_name', 200),
    F.str('planName', true, 'plan_name', 200),
    F.str('memberId', false, 'member_id', 50),
    F.str('groupNumber', true, 'group_number', 50),
    F.str('subscriberName', true, 'subscriber_name', 200),
    F.str('subscriberRelationship', true, 'subscriber_relationship', 30),
    F.date('effectiveFrom', true),
    F.date('effectiveTo', true),
    F.int('priority', false, 1),
    F.bool('isActive', 'true'),
    F.str('copayAmount', true, 'copay_amount', 20),
  ],
  PatientPreferredPharmacy: () => [
    F.uuid('patientId'),
    F.str('pharmacyName', false, 'pharmacy_name', 200),
    F.str('ncpdpId', true, 'ncpdp_id', 20),
    F.str('phone', true, null, 20),
    F.str('addressLine1', true, 'address_line1', 200),
    F.str('city', true, null, 100),
    F.str('state', true, null, 100),
    F.str('postalCode', true, 'postal_code', 20),
    F.bool('isPrimary', 'true'),
  ],
  PatientCareTeamMember: () => [
    F.uuid('patientId'),
    F.uuid('providerId'),
    F.enum('role', 'CareTeamRole', false, 'OTHER'),
    F.uuid('facilityId', true),
    F.date('startDate', true),
    F.date('endDate', true),
    F.bool('isActive', 'true'),
    F.text('notes', true),
  ],
  PatientMergeRecord: () => [
    F.uuid('patientId'),
    F.uuid('survivorPatientId'),
    F.uuid('mergedPatientId'),
    F.ts('mergedAt', false),
    F.uuid('mergedById'),
    F.text('mergeReason', true),
    F.json('fieldResolution'),
  ],
  PatientDuplicateCandidate: () => [
    F.uuid('patientId'),
    F.uuid('candidatePatientId'),
    F.dec('matchScore', false, '5,4'),
    F.json('matchCriteria'),
    F.str('reviewStatus', false, 'review_status', 30),
    F.uuid('reviewedById', true),
    F.ts('reviewedAt', true),
  ],
  PatientFlag: () => [
    F.uuid('patientId'),
    F.str('flagCode', false, 'flag_code', 50),
    F.str('flagLabel', false, 'flag_label', 200),
    F.enum('severity', 'PatientFlagSeverity', false, 'INFO'),
    F.text('message', true),
    F.date('effectiveFrom', true),
    F.date('effectiveTo', true),
    F.uuid('createdByProviderId', true),
    F.bool('isActive', 'true'),
  ],
  PatientAlert: () => [
    F.uuid('patientId'),
    F.str('alertType', false, 'alert_type', 50),
    F.str('title', false, null, 300),
    F.text('message', false),
    F.enum('severity', 'PatientFlagSeverity', false, 'WARNING'),
    F.ts('triggeredAt', false),
    F.ts('acknowledgedAt', true),
    F.uuid('acknowledgedById', true),
    F.bool('requiresAction'),
  ],
  PatientNote: () => [
    F.uuid('patientId'),
    F.str('noteType', false, 'note_type', 30),
    F.text('content', false),
    F.uuid('authorId'),
    F.ts('authoredAt', false),
    F.bool('isConfidential'),
  ],
  PatientAdvanceDirective: () => [
    F.uuid('patientId'),
    F.str('directiveType', false, 'directive_type', 50),
    F.str('title', false, null, 300),
    F.text('instructions', true),
    F.date('effectiveDate', true),
    F.uuid('documentId', true),
    F.str('healthcareProxyName', true, 'healthcare_proxy_name', 200),
    F.str('healthcareProxyPhone', true, 'healthcare_proxy_phone', 20),
  ],
  PatientSocialHistory: () => [
    F.uuid('patientId'),
    F.str('smokingStatus', true, 'smoking_status', 30),
    F.str('alcoholUse', true, 'alcohol_use', 30),
    F.str('substanceUse', true, 'substance_use', 200),
    F.str('exerciseFrequency', true, 'exercise_frequency', 50),
    F.str('dietType', true, 'diet_type', 50),
    F.text('occupationalHazards', true),
    F.text('notes', true),
  ],
  PatientPreference: () => [
    F.uuid('patientId'),
    F.str('preferenceKey', false, 'preference_key', 100),
    F.str('preferenceValue', false, 'preference_value', 500),
    F.str('category', true, null, 50),
  ],
  PatientCommunicationPreference: () => [
    F.uuid('patientId'),
    F.bool('emailEnabled', 'true'),
    F.bool('smsEnabled', 'true'),
    F.bool('pushEnabled', 'true'),
    F.bool('phoneEnabled', 'true'),
    F.str('preferredLanguage', true, 'preferred_language', 10),
    F.str('quietHoursStart', true, 'quiet_hours_start', 5),
    F.str('quietHoursEnd', true, 'quiet_hours_end', 5),
  ],
  PatientPortalAccount: () => [
    F.uuid('patientId'),
    F.uuid('userId', true),
    F.str('username', true, null, 100),
    F.ts('lastLoginAt', true),
    F.bool('isActive', 'true'),
    F.bool('mfaEnabled', 'false'),
  ],
  PatientPhoto: () => [
    F.uuid('patientId'),
    F.str('storageKey', false, 'storage_key', 500),
    F.str('mimeType', false, 'mime_type', 50),
    F.ts('capturedAt', true),
  ],
  PatientTravelHistory: () => [
    F.uuid('patientId'),
    F.str('destinationCountry', false, 'destination_country', 2),
    F.date('departureDate', true),
    F.date('returnDate', true),
    F.text('purpose', true),
    F.text('exposureNotes', true),
  ],
  PatientImmunizationSchedule: () => [
    F.uuid('patientId'),
    F.str('vaccineCode', false, 'vaccine_code', 20),
    F.str('vaccineName', false, 'vaccine_name', 300),
    F.date('dueDate', false),
    F.date('completedDate', true),
    F.str('status', false, null, 30),
    F.int('doseNumber', true),
  ],
  PatientGrowthChart: () => [
    F.uuid('patientId'),
    F.date('measurementDate', false),
    F.dec('weightKg', true, '6,2'),
    F.dec('heightCm', true, '6,2'),
    F.dec('headCircumferenceCm', true, '5,2'),
    F.dec('bmiPercentile', true, '5,2'),
    F.dec('weightPercentile', true, '5,2'),
    F.dec('heightPercentile', true, '5,2'),
  ],
  PatientRiskScore: () => [
    F.uuid('patientId'),
    F.str('scoreType', false, 'score_type', 50),
    F.dec('scoreValue', false, '8,4'),
    F.str('riskLevel', true, 'risk_level', 20),
    F.ts('calculatedAt', false),
    F.json('factors'),
  ],
  PatientReferral: () => [
    F.uuid('patientId'),
    F.uuid('referringProviderId', true),
    F.uuid('referredToProviderId', true),
    F.str('specialtyRequested', true, 'specialty_requested', 100),
    F.str('priority', false, null, 20),
    F.str('status', false, null, 30),
    F.text('clinicalReason', true),
    F.date('referralDate', false),
  ],
  PatientLanguage: () => [
    F.uuid('patientId'),
    F.str('languageCode', false, 'language_code', 10),
    F.str('languageName', true, 'language_name', 100),
    F.bool('isPreferred'),
  ],
  PatientEthnicity: () => [
    F.uuid('patientId'),
    F.str('ethnicityCode', false, 'ethnicity_code', 20),
    F.str('ethnicityDisplay', true, 'ethnicity_display', 200),
  ],
  PatientReligion: () => [
    F.uuid('patientId'),
    F.str('religionCode', true, 'religion_code', 20),
    F.str('religionDisplay', true, 'religion_display', 200),
  ],
  PatientExternalId: () => [
    F.uuid('patientId'),
    F.str('systemName', false, 'system_name', 100),
    F.str('externalId', false, 'external_id', 100),
    F.str('externalUrl', true, 'external_url', 500),
  ],
  DoctorProfile: () => [
    F.uuid('userId'),
    F.uuid('facilityId', true),
    F.str('npiNumber', true, 'npi_number', 10),
    F.str('deaNumber', true, 'dea_number', 20),
    F.str('prefix', true, null, 20),
    F.str('suffix', true, null, 20),
    F.str('displayName', false, 'display_name', 200),
    F.text('bio', true),
    F.enum('status', 'ProviderStatus', false, 'ACTIVE'),
    F.str('primarySpecialty', true, 'primary_specialty', 100),
    F.date('hireDate', true),
    F.date('terminationDate', true),
  ],
  NurseProfile: () => [
    F.uuid('userId'),
    F.uuid('facilityId', true),
    F.str('licenseNumber', true, 'license_number', 50),
    F.str('displayName', false, 'display_name', 200),
    F.enum('status', 'ProviderStatus', false, 'ACTIVE'),
    F.str('credential', true, null, 20),
    F.date('hireDate', true),
  ],
  StaffProfile: () => [
    F.uuid('userId'),
    F.uuid('facilityId', true),
    F.uuid('departmentId', true),
    F.str('employeeId', true, 'employee_id', 50),
    F.str('jobTitle', true, 'job_title', 100),
    F.enum('status', 'ProviderStatus', false, 'ACTIVE'),
    F.date('hireDate', true),
  ],
  Specialty: () => [
    F.str('code', false, null, 20),
    F.str('name', false, null, 200),
    F.str('taxonomyCode', true, 'taxonomy_code', 20),
    F.text('description', true),
    F.bool('isActive', 'true'),
  ],
  DoctorSpecialty: () => [
    F.uuid('doctorProfileId'),
    F.uuid('specialtyId'),
    F.bool('isPrimary'),
    F.date('certifiedDate', true),
  ],
  Credential: () => [
    F.str('credentialType', false, 'credential_type', 50),
    F.str('credentialName', false, 'credential_name', 200),
    F.str('issuingBody', true, 'issuing_body', 200),
    F.enum('status', 'CredentialStatus', false, 'ACTIVE'),
    F.date('issueDate', true),
    F.date('expirationDate', true),
  ],
  DoctorCredential: () => [
    F.uuid('doctorProfileId'),
    F.uuid('credentialId'),
    F.enum('status', 'CredentialStatus', false, 'ACTIVE'),
    F.date('verifiedDate', true),
    F.uuid('verifiedById', true),
  ],
  License: () => [
    F.enum('licenseType', 'LicenseType', false, 'MEDICAL'),
    F.str('licenseNumber', false, 'license_number', 50),
    F.str('issuingState', true, 'issuing_state', 10),
    F.str('issuingCountry', true, 'issuing_country', 2),
    F.enum('status', 'CredentialStatus', false, 'ACTIVE'),
    F.date('issueDate', true),
    F.date('expirationDate', true),
  ],
  StaffLicense: () => [
    F.uuid('staffProfileId'),
    F.uuid('licenseId'),
    F.enum('status', 'CredentialStatus', false, 'ACTIVE'),
  ],
  StaffSchedule: () => [
    F.uuid('staffProfileId'),
    F.uuid('facilityId', true),
    F.int('dayOfWeek', false),
    F.str('startTime', false, 'start_time', 5),
    F.str('endTime', false, 'end_time', 5),
    F.str('timezone', false, null, 64),
    F.date('effectiveFrom', true),
    F.date('effectiveTo', true),
  ],
  StaffScheduleBlock: () => [
    F.uuid('staffProfileId'),
    F.enum('blockType', 'ScheduleBlockType', false, 'AVAILABLE'),
    F.ts('startAt', false),
    F.ts('endAt', false),
    F.text('reason', true),
    F.uuid('facilityId', true),
  ],
  StaffAvailability: () => [
    F.uuid('staffProfileId'),
    F.uuid('facilityId', true),
    F.int('slotDurationMinutes', false, 15),
    F.int('maxPatientsPerSlot', false, 1),
    F.bool('acceptsNewPatients', 'true'),
    F.bool('acceptsTelehealth', 'false'),
  ],
  ProviderAvailability: () => [
    F.uuid('providerId'),
    F.uuid('facilityId', true),
    F.int('dayOfWeek', false),
    F.str('startTime', false, 'start_time', 5),
    F.str('endTime', false, 'end_time', 5),
    F.int('slotDurationMinutes', false, 15),
    F.date('effectiveFrom', true),
    F.date('effectiveTo', true),
  ],
  StaffLeave: () => [
    F.uuid('staffProfileId'),
    F.enum('leaveType', 'LeaveType', false, 'VACATION'),
    F.date('startDate', false),
    F.date('endDate', false),
    F.str('status', false, null, 30),
    F.text('notes', true),
  ],
  StaffOnCall: () => [
    F.uuid('staffProfileId'),
    F.uuid('facilityId'),
    F.ts('startAt', false),
    F.ts('endAt', false),
    F.str('contactPhone', true, 'contact_phone', 20),
  ],
  StaffDepartmentAssignment: () => [
    F.uuid('staffProfileId'),
    F.uuid('departmentId'),
    F.date('startDate', false),
    F.date('endDate', true),
    F.bool('isPrimary'),
  ],
  StaffCertification: () => [
    F.uuid('staffProfileId'),
    F.str('certificationName', false, 'certification_name', 200),
    F.str('certifyingBody', true, 'certifying_body', 200),
    F.date('issueDate', true),
    F.date('expirationDate', true),
    F.str('certificateNumber', true, 'certificate_number', 100),
  ],
  StaffPrivilege: () => [
    F.uuid('staffProfileId'),
    F.uuid('facilityId'),
    F.str('privilegeCode', false, 'privilege_code', 50),
    F.str('privilegeName', false, 'privilege_name', 200),
    F.enum('status', 'PrivilegeStatus', false, 'ACTIVE'),
    F.date('grantedDate', true),
    F.date('expirationDate', true),
    F.uuid('grantedById', true),
  ],
  CareTeam: () => [
    F.uuid('patientId'),
    F.str('teamName', false, 'team_name', 200),
    F.str('status', false, null, 30),
    F.date('startDate', true),
    F.date('endDate', true),
  ],
  CareTeamProvider: () => [
    F.uuid('careTeamId'),
    F.uuid('providerId'),
    F.enum('role', 'CareTeamRole', false, 'OTHER'),
    F.date('startDate', true),
    F.date('endDate', true),
  ],
  StaffAssignment: () => [
    F.uuid('staffProfileId'),
    F.uuid('patientId', true),
    F.uuid('encounterId', true),
    F.str('assignmentType', false, 'assignment_type', 50),
    F.ts('assignedAt', false),
    F.ts('completedAt', true),
  ],
  Privilege: () => [
    F.str('code', false, null, 50),
    F.str('name', false, null, 200),
    F.text('description', true),
    F.str('category', true, null, 50),
    F.bool('requiresApproval'),
  ],
  Appointment: () => [
    F.uuid('patientId'),
    F.uuid('providerId'),
    F.uuid('facilityId'),
    F.uuid('departmentId', true),
    F.uuid('appointmentTypeId', true),
    F.uuid('slotId', true),
    F.enum('status', 'AppointmentStatus', false, 'SCHEDULED'),
    F.enum('priority', 'AppointmentPriority', false, 'ROUTINE'),
    F.ts('scheduledStart', false),
    F.ts('scheduledEnd', false),
    F.int('durationMinutes', false, 30),
    F.str('reasonCode', true, 'reason_code', 20),
    F.text('chiefComplaint', true),
    F.text('notes', true),
    F.ts('checkedInAt', true),
    F.ts('startedAt', true),
    F.ts('completedAt', true),
    F.uuid('encounterId', true),
    F.bool('isTelehealth'),
  ],
  AppointmentType: () => [
    F.str('code', false, null, 20),
    F.str('name', false, null, 200),
    F.text('description', true),
    F.int('defaultDurationMinutes', false, 30),
    F.str('color', true, null, 7),
    F.bool('isActive', 'true'),
    F.bool('requiresReferral'),
  ],
  AppointmentSlot: () => [
    F.uuid('providerId'),
    F.uuid('facilityId'),
    F.ts('startAt', false),
    F.ts('endAt', false),
    F.int('capacity', false, 1),
    F.int('bookedCount', false, 0),
    F.bool('isBlocked'),
    F.str('blockReason', true, 'block_reason', 200),
  ],
  AppointmentParticipant: () => [
    F.uuid('appointmentId'),
    F.uuid('participantId'),
    F.str('participantType', false, 'participant_type', 30),
    F.str('role', true, null, 50),
    F.bool('isRequired'),
  ],
  AppointmentStatusHistory: () => [
    F.uuid('appointmentId'),
    F.enum('fromStatus', 'AppointmentStatus', true),
    F.enum('toStatus', 'AppointmentStatus', false),
    F.ts('changedAt', false),
    F.uuid('changedById', true),
    F.text('reason', true),
  ],
  AppointmentReminder: () => [
    F.uuid('appointmentId'),
    F.enum('channel', 'ReminderChannel', false, 'SMS'),
    F.ts('scheduledFor', false),
    F.ts('sentAt', true),
    F.str('status', false, null, 30),
    F.int('attemptCount', false, 0),
    F.text('messageTemplate', true),
  ],
  WaitlistEntry: () => [
    F.uuid('patientId'),
    F.uuid('providerId', true),
    F.uuid('appointmentTypeId', true),
    F.uuid('facilityId', true),
    F.int('priorityRank', false, 100),
    F.str('status', false, null, 30),
    F.date('preferredDate', true),
    F.text('notes', true),
    F.ts('offeredAt', true),
    F.ts('expiresAt', true),
  ],
  QueueTicket: () => [
    F.uuid('appointmentId', true),
    F.uuid('patientId'),
    F.uuid('facilityId'),
    F.str('ticketNumber', false, 'ticket_number', 20),
    F.enum('status', 'QueueStatus', false, 'WAITING'),
    F.int('queuePosition', true),
    F.ts('calledAt', true),
    F.ts('completedAt', true),
    F.uuid('assignedProviderId', true),
  ],
  WalkInVisit: () => [
    F.uuid('patientId'),
    F.uuid('facilityId'),
    F.enum('status', 'WalkInStatus', false, 'REGISTERED'),
    F.ts('arrivedAt', false),
    F.text('chiefComplaint', true),
    F.enum('priority', 'AppointmentPriority', false, 'ROUTINE'),
    F.uuid('encounterId', true),
  ],
  AppointmentCancellation: () => [
    F.uuid('appointmentId'),
    F.enum('reasonCode', 'CancellationReasonCode', false, 'OTHER'),
    F.text('reasonNotes', true),
    F.ts('cancelledAt', false),
    F.uuid('cancelledById', true),
    F.bool('notifyPatient', 'true'),
  ],
  AppointmentReschedule: () => [
    F.uuid('appointmentId'),
    F.ts('previousStart', false),
    F.ts('previousEnd', false),
    F.ts('newStart', false),
    F.ts('newEnd', false),
    F.ts('rescheduledAt', false),
    F.uuid('rescheduledById', true),
    F.text('reason', true),
  ],
  CalendarSync: () => [
    F.uuid('providerId'),
    F.str('externalCalendarId', false, 'external_calendar_id', 200),
    F.str('provider', false, null, 50),
    F.str('syncToken', true, 'sync_token', 500),
    F.ts('lastSyncedAt', true),
    F.bool('isActive', 'true'),
  ],
  Encounter: () => [
    F.uuid('patientId'),
    F.uuid('facilityId'),
    F.uuid('attendingProviderId', true),
    F.enum('encounterClass', 'EncounterClass', false, 'AMBULATORY'),
    F.enum('status', 'EncounterStatus', false, 'PLANNED'),
    F.ts('periodStart', true),
    F.ts('periodEnd', true),
    F.uuid('appointmentId', true),
    F.str('reasonCode', true, 'reason_code', 20),
    F.text('chiefComplaint', true),
    F.str('dischargeDisposition', true, 'discharge_disposition', 50),
  ],
  ClinicalNote: () => [
    F.uuid('encounterId'),
    F.uuid('patientId'),
    F.uuid('authorId'),
    F.enum('status', 'ClinicalNoteStatus', false, 'DRAFT'),
    F.str('noteType', false, 'note_type', 50),
    F.text('content', false),
    F.ts('authoredAt', false),
    F.ts('signedAt', true),
    F.uuid('signedById', true),
  ],
  SoapNote: () => [
    F.uuid('clinicalNoteId'),
    F.uuid('encounterId'),
    F.text('subjective', true),
    F.text('objective', true),
    F.text('assessment', true),
    F.text('plan', true),
  ],
  Diagnosis: () => [
    F.uuid('encounterId'),
    F.uuid('patientId'),
    F.str('icd10Code', false, 'icd10_code', 10),
    F.str('displayText', false, 'display_text', 500),
    F.enum('role', 'DiagnosisRole', false, 'WORKING'),
    F.int('rank', true),
    F.date('onsetDate', true),
    F.bool('isPrimary'),
  ],
  Procedure: () => [
    F.uuid('encounterId'),
    F.uuid('patientId'),
    F.uuid('performerId', true),
    F.str('cptCode', true, 'cpt_code', 10),
    F.str('displayText', false, 'display_text', 500),
    F.enum('status', 'ProcedureStatus', false, 'COMPLETED'),
    F.ts('performedAt', true),
    F.text('notes', true),
  ],
  MedicationStatement: () => [
    F.uuid('patientId'),
    F.uuid('encounterId', true),
    F.str('medicationName', false, 'medication_name', 300),
    F.str('rxNormCode', true, 'rx_norm_code', 20),
    F.str('dosageText', true, 'dosage_text', 500),
    F.enum('status', 'MedicationStatementStatus', false, 'ACTIVE'),
    F.date('startDate', true),
    F.date('endDate', true),
  ],
  ProgressNote: () => [
    F.uuid('encounterId'),
    F.uuid('patientId'),
    F.uuid('authorId'),
    F.text('content', false),
    F.enum('status', 'ClinicalNoteStatus', false, 'DRAFT'),
    F.ts('authoredAt', false),
  ],
  DischargeSummary: () => [
    F.uuid('encounterId'),
    F.uuid('patientId'),
    F.text('summary', false),
    F.text('followUpInstructions', true),
    F.text('medicationsAtDischarge', true),
    F.ts('dischargedAt', true),
    F.uuid('authorId'),
  ],
  ClinicalAttachment: () => [
    F.uuid('encounterId', true),
    F.uuid('clinicalNoteId', true),
    F.str('fileName', false, 'file_name', 255),
    F.str('mimeType', false, 'mime_type', 100),
    F.str('storageKey', false, 'storage_key', 500),
    F.ts('uploadedAt', false),
  ],
  ProblemListItem: () => [
    F.uuid('patientId'),
    F.str('icd10Code', false, 'icd10_code', 10),
    F.str('displayText', false, 'display_text', 500),
    F.enum('status', 'ProblemStatus', false, 'ACTIVE'),
    F.date('onsetDate', true),
    F.date('abatementDate', true),
    F.int('rank', true),
  ],
  Order: () => [
    F.uuid('encounterId'),
    F.uuid('patientId'),
    F.uuid('orderingProviderId'),
    F.str('orderType', false, 'order_type', 50),
    F.str('orderCode', true, 'order_code', 20),
    F.text('orderDetail', false),
    F.enum('status', 'OrderStatus', false, 'ACTIVE'),
    F.enum('priority', 'AppointmentPriority', false, 'ROUTINE'),
    F.ts('orderedAt', false),
  ],
  CarePlan: () => [
    F.uuid('patientId'),
    F.uuid('encounterId', true),
    F.str('title', false, null, 300),
    F.text('description', true),
    F.enum('status', 'CarePlanStatus', false, 'ACTIVE'),
    F.date('periodStart', true),
    F.date('periodEnd', true),
    F.uuid('authorId', true),
  ],
  AllergyIntoleranceEncounterLink: () => [
    F.uuid('encounterId'),
    F.uuid('allergyId'),
    F.bool('reviewed'),
    F.uuid('reviewedById', true),
    F.ts('reviewedAt', true),
  ],
  LabOrder: () => [
    F.uuid('patientId'),
    F.uuid('encounterId', true),
    F.uuid('orderingProviderId'),
    F.uuid('facilityId', true),
    F.str('accessionNumber', true, 'accession_number', 50),
    F.enum('status', 'LabOrderStatus', false, 'ORDERED'),
    F.enum('priority', 'AppointmentPriority', false, 'ROUTINE'),
    F.ts('orderedAt', false),
    F.ts('collectedAt', true),
    F.text('clinicalIndication', true),
  ],
  LabOrderItem: () => [
    F.uuid('labOrderId'),
    F.str('testCode', false, 'test_code', 20),
    F.str('testName', false, 'test_name', 300),
    F.str('loincCode', true, 'loinc_code', 20),
    F.enum('status', 'LabOrderStatus', false, 'ORDERED'),
    F.text('specimenRequirements', true),
  ],
  LabSpecimen: () => [
    F.uuid('labOrderId'),
    F.str('specimenType', false, 'specimen_type', 50),
    F.str('barcode', true, null, 50),
    F.enum('status', 'SpecimenStatus', false, 'COLLECTED'),
    F.ts('collectedAt', true),
    F.uuid('collectedById', true),
    F.str('collectionSite', true, 'collection_site', 100),
    F.dec('volumeMl', true, '8,2'),
  ],
  LabResult: () => [
    F.uuid('labOrderId'),
    F.uuid('labOrderItemId', true),
    F.uuid('patientId'),
    F.enum('status', 'LabResultStatus', false, 'PRELIMINARY'),
    F.ts('resultedAt', true),
    F.uuid('validatedById', true),
    F.ts('validatedAt', true),
    F.text('interpretation', true),
  ],
  LabResultAnalyte: () => [
    F.uuid('labResultId'),
    F.str('analyteCode', false, 'analyte_code', 20),
    F.str('analyteName', false, 'analyte_name', 200),
    F.str('value', true, null, 100),
    F.str('unit', true, null, 30),
    F.enum('flag', 'LabResultFlag', true),
    F.dec('numericValue', true, '14,6'),
    F.str('referenceRangeText', true, 'reference_range_text', 100),
  ],
  LabReferenceRange: () => [
    F.str('analyteCode', false, 'analyte_code', 20),
    F.str('unit', true, null, 30),
    F.dec('lowValue', true, '14,6'),
    F.dec('highValue', true, '14,6'),
    F.dec('criticalLow', true, '14,6'),
    F.dec('criticalHigh', true, '14,6'),
    F.str('gender', true, null, 10),
    F.int('ageMinYears', true),
    F.int('ageMaxYears', true),
  ],
  LabValidation: () => [
    F.uuid('labResultId'),
    F.enum('status', 'LabValidationStatus', false, 'PENDING'),
    F.uuid('validatorId', true),
    F.ts('validatedAt', true),
    F.text('comments', true),
    F.bool('deltaCheckPassed', 'true'),
  ],
  LabBarcode: () => [
    F.uuid('labOrderId', true),
    F.uuid('specimenId', true),
    F.str('barcode', false, null, 50),
    F.str('barcodeType', true, 'barcode_type', 20),
    F.ts('printedAt', true),
  ],
  LabReport: () => [
    F.uuid('labOrderId'),
    F.uuid('patientId'),
    F.str('reportNumber', false, 'report_number', 50),
    F.enum('status', 'LabResultStatus', false, 'FINAL'),
    F.text('narrative', true),
    F.ts('releasedAt', true),
    F.uuid('releasedById', true),
  ],
  LabInstrument: () => [
    F.str('instrumentCode', false, 'instrument_code', 50),
    F.str('name', false, null, 200),
    F.str('manufacturer', true, null, 200),
    F.str('model', true, null, 100),
    F.str('serialNumber', true, 'serial_number', 100),
    F.bool('isActive', 'true'),
    F.ts('lastCalibratedAt', true),
  ],
  PanicValueAlert: () => [
    F.uuid('labResultId'),
    F.uuid('labResultAnalyteId', true),
    F.uuid('patientId'),
    F.str('analyteName', false, 'analyte_name', 200),
    F.str('criticalValue', false, 'critical_value', 100),
    F.ts('detectedAt', false),
    F.ts('notifiedAt', true),
    F.uuid('notifiedProviderId', true),
    F.bool('callbackCompleted'),
  ],
  RadiologyOrder: () => [
    F.uuid('patientId'),
    F.uuid('encounterId', true),
    F.uuid('orderingProviderId'),
    F.enum('modality', 'RadiologyModalityType', false, 'XR'),
    F.str('procedureCode', true, 'procedure_code', 20),
    F.str('bodyPart', false, 'body_part', 100),
    F.text('clinicalIndication', true),
    F.enum('priority', 'AppointmentPriority', false, 'ROUTINE'),
    F.str('status', false, null, 30),
    F.ts('orderedAt', false),
  ],
  RadiologyStudy: () => [
    F.uuid('radiologyOrderId'),
    F.uuid('patientId'),
    F.str('studyInstanceUid', false, 'study_instance_uid', 64),
    F.str('accessionNumber', true, 'accession_number', 50),
    F.enum('modality', 'RadiologyModalityType', false, 'XR'),
    F.enum('status', 'RadiologyStudyStatus', false, 'SCHEDULED'),
    F.ts('performedAt', true),
    F.uuid('performingSiteId', true),
  ],
  RadiologySeries: () => [
    F.uuid('radiologyStudyId'),
    F.str('seriesInstanceUid', false, 'series_instance_uid', 64),
    F.int('seriesNumber', true),
    F.enum('modality', 'RadiologyModalityType', false, 'XR'),
    F.str('bodyPart', true, 'body_part', 100),
    F.int('instanceCount', false, 0),
  ],
  RadiologyInstance: () => [
    F.uuid('radiologySeriesId'),
    F.str('sopInstanceUid', false, 'sop_instance_uid', 64),
    F.int('instanceNumber', true),
    F.str('transferSyntaxUid', true, 'transfer_syntax_uid', 64),
    F.int('rows', true),
    F.int('columns', true),
    F.str('photometricInterpretation', true, 'photometric_interpretation', 50),
  ],
  RadiologyReport: () => [
    F.uuid('radiologyStudyId'),
    F.uuid('patientId'),
    F.enum('status', 'ReportStatus', false, 'DRAFT'),
    F.text('findings', true),
    F.text('impression', true),
    F.text('recommendations', true),
    F.uuid('authorId', true),
    F.ts('dictatedAt', true),
    F.ts('signedAt', true),
    F.uuid('signedById', true),
  ],
  RadiologyModality: () => [
    F.enum('modalityType', 'RadiologyModalityType', false, 'XR'),
    F.str('displayName', false, 'display_name', 100),
    F.text('description', true),
    F.bool('isActive', 'true'),
  ],
  PacsReference: () => [
    F.uuid('radiologyStudyId'),
    F.str('pacsUrl', false, 'pacs_url', 500),
    F.str('viewerUrl', true, 'viewer_url', 500),
    F.enum('transferStatus', 'DicomTransferStatus', false, 'PENDING'),
    F.ts('lastAccessedAt', true),
  ],
  DrugProduct: () => [
    F.str('ndcCode', false, 'ndc_code', 20),
    F.str('rxNormCode', true, 'rx_norm_code', 20),
    F.str('genericName', false, 'generic_name', 300),
    F.str('brandName', true, 'brand_name', 300),
    F.str('strength', false, null, 100),
    F.str('dosageForm', false, 'dosage_form', 50),
    F.str('route', true, null, 50),
    F.enum('schedule', 'DrugSchedule', false, 'RX'),
    F.bool('isActive', 'true'),
  ],
  InventoryItem: () => [
    F.uuid('drugProductId'),
    F.uuid('facilityId'),
    F.str('sku', true, null, 50),
    F.int('quantityOnHand', false, 0),
    F.int('reorderLevel', false, 10),
    F.int('reorderQuantity', false, 50),
    F.str('locationCode', true, 'location_code', 50),
    F.dec('unitCost', true, '10,4'),
  ],
  InventoryLot: () => [
    F.uuid('inventoryItemId'),
    F.str('lotNumber', false, 'lot_number', 50),
    F.date('expirationDate', false),
    F.int('quantity', false, 0),
    F.date('receivedDate', true),
    F.str('supplierLotNumber', true, 'supplier_lot_number', 50),
  ],
  DispenseEvent: () => [
    F.uuid('patientId'),
    F.uuid('prescriptionId', true),
    F.uuid('inventoryItemId'),
    F.uuid('inventoryLotId', true),
    F.int('quantityDispensed', false),
    F.enum('status', 'DispenseStatus', false, 'PENDING'),
    F.ts('dispensedAt', true),
    F.uuid('pharmacistId', true),
    F.text('counselingNotes', true),
  ],
  Supplier: () => [
    F.str('name', false, null, 200),
    F.str('contactEmail', true, 'contact_email', 320),
    F.str('contactPhone', true, 'contact_phone', 20),
    F.str('addressLine1', true, 'address_line1', 200),
    F.str('city', true, null, 100),
    F.str('state', true, null, 100),
    F.str('postalCode', true, 'postal_code', 20),
    F.bool('isActive', 'true'),
  ],
  PurchaseOrder: () => [
    F.uuid('supplierId'),
    F.str('poNumber', false, 'po_number', 50),
    F.str('status', false, null, 30),
    F.dec('totalAmount', true, '14,4'),
    F.ts('orderedAt', true),
    F.ts('receivedAt', true),
    F.uuid('orderedById', true),
  ],
  DrugInteractionRule: () => [
    F.str('drugACode', false, 'drug_a_code', 20),
    F.str('drugBCode', false, 'drug_b_code', 20),
    F.str('severity', false, null, 20),
    F.text('description', false),
    F.text('clinicalManagement', true),
    F.str('evidenceLevel', true, 'evidence_level', 20),
  ],
  FormularyItem: () => [
    F.uuid('drugProductId'),
    F.enum('tier', 'FormularyTier', false, 'TIER_1'),
    F.bool('priorAuthRequired'),
    F.bool('stepTherapyRequired'),
    F.int('quantityLimit', true),
    F.date('effectiveFrom', true),
    F.date('effectiveTo', true),
  ],
  MedicationAdministration: () => [
    F.uuid('patientId'),
    F.uuid('encounterId', true),
    F.str('medicationName', false, 'medication_name', 300),
    F.str('doseGiven', true, 'dose_given', 100),
    F.str('route', true, null, 50),
    F.ts('administeredAt', false),
    F.uuid('administeredById'),
    F.enum('status', 'MedicationAdministrationStatus', false, 'COMPLETED'),
    F.text('notes', true),
  ],
};

const FRAGMENT_MODELS = {
  '01-patient-management.prisma': {
    enums: 'patient',
    models: [
      'PatientProfile', 'PatientAddress', 'PatientContact', 'PatientEmergencyContact',
      'PatientMedicalHistory', 'PatientFamilyHistory', 'PatientAllergy', 'PatientAllergyReaction',
      'PatientVaccination', 'PatientVitalSign', 'PatientVitalBatch', 'PatientConsentForm',
      'PatientConsentSignature', 'PatientDocument', 'PatientDocumentVersion', 'PatientTimelineEvent',
      'PatientRegistration', 'PatientIdentifier', 'PatientInsuranceInfo', 'PatientPreferredPharmacy',
      'PatientCareTeamMember', 'PatientMergeRecord', 'PatientDuplicateCandidate', 'PatientFlag',
      'PatientAlert', 'PatientNote', 'PatientAdvanceDirective', 'PatientSocialHistory',
      'PatientPreference', 'PatientCommunicationPreference', 'PatientPortalAccount', 'PatientPhoto',
      'PatientTravelHistory', 'PatientImmunizationSchedule', 'PatientGrowthChart', 'PatientRiskScore',
      'PatientReferral', 'PatientLanguage', 'PatientEthnicity', 'PatientReligion', 'PatientExternalId',
    ],
    defaultIndexes: (name) => {
      if (name.includes('Patient') && name !== 'PatientProfile') return ['patientId'];
      return [];
    },
  },
  '02-doctor-staff.prisma': {
    enums: 'staff',
    models: [
      'DoctorProfile', 'NurseProfile', 'StaffProfile', 'Specialty', 'DoctorSpecialty',
      'Credential', 'DoctorCredential', 'License', 'StaffLicense', 'StaffSchedule',
      'StaffScheduleBlock', 'StaffAvailability', 'ProviderAvailability', 'StaffLeave',
      'StaffOnCall', 'StaffDepartmentAssignment', 'StaffCertification', 'StaffPrivilege',
      'StaffAssignment', 'Privilege', 'CareTeam', 'CareTeamProvider', 'ReferringPhysician',
      'ProviderNetwork', 'ProviderContract', 'ProviderRating', 'StaffCompetency',
      'StaffShiftSwap', 'StaffOvertimeRecord', 'StaffBadge', 'StaffEquipmentAssignment',
      'StaffRoomAssignment', 'StaffNotificationPreference', 'StaffContact', 'StaffEmergencyContact',
      'StaffDocument', 'StaffCredentialVerification', 'StaffRoleExtension', 'StaffTraining',
      'StaffPerformanceReview',
    ],
    defaultIndexes: (name) => {
      if (name.includes('Doctor') || name.includes('Nurse') || name.includes('Staff') || name.includes('Provider')) {
        if (name.endsWith('Profile')) return ['userId'];
        if (name.includes('Doctor')) return ['doctorProfileId'];
        if (name.includes('Staff')) return ['staffProfileId'];
        if (name.includes('Provider')) return ['providerId'];
      }
      return [];
    },
  },
  '03-appointments.prisma': {
    enums: 'appt',
    models: [
      'Appointment', 'AppointmentType', 'AppointmentSlot', 'AppointmentParticipant',
      'AppointmentStatusHistory', 'AppointmentReminder', 'AppointmentReminderDelivery',
      'AppointmentCheckIn', 'AppointmentCheckOut', 'AppointmentCancellation', 'AppointmentReschedule',
      'CalendarSync', 'WaitlistEntry', 'QueueTicket', 'WalkInVisit', 'ProviderAvailabilityException',
      'AppointmentQueue', 'AppointmentResource', 'AppointmentRoom', 'AppointmentEquipment',
      'AppointmentTemplate', 'RecurringAppointment', 'AppointmentNote', 'AppointmentAttachment',
      'AppointmentBillingLink', 'AppointmentTelemedicineLink', 'AppointmentSurvey',
      'AppointmentSurveyResponse', 'AppointmentNoShow', 'AppointmentOverbooking',
      'AppointmentPriorityRule', 'AppointmentReferralLink', 'AppointmentWaitTimeMetric',
      'AppointmentResourceBooking',
    ],
    defaultIndexes: (name) => {
      if (name === 'Appointment') return ['patientId', 'providerId', 'scheduledStart', 'status'];
      if (name.startsWith('Appointment')) return ['appointmentId'];
      if (name.includes('Waitlist') || name.includes('Queue') || name.includes('WalkIn')) return ['patientId', 'status'];
      return ['patientId'];
    },
  },
  '04-emr.prisma': {
    enums: 'emr',
    models: [
      'Encounter', 'EncounterParticipant', 'EncounterDiagnosis', 'EncounterProcedure',
      'ClinicalNote', 'SoapNote', 'ProgressNote', 'DischargeSummary', 'Diagnosis', 'Procedure',
      'MedicationStatement', 'ProblemListItem', 'Order', 'CarePlan', 'CarePlanGoal',
      'CarePlanActivity', 'ClinicalAttachment', 'ClinicalDocument', 'ClinicalObservation',
      'AllergyIntoleranceEncounterLink', 'ClinicalImpression', 'TreatmentPlan', 'PhysicianOrder',
      'ReferralOrder', 'ConsultRequest', 'NursingAssessment', 'EncounterStatusHistory',
      'EncounterTransfer', 'EncounterAdmission', 'EncounterDischarge', 'ClinicalAlert',
      'ClinicalTimelineEntry', 'EncounterCareTeam', 'EncounterAllergyReview', 'EncounterMedicationReview',
    ],
    defaultIndexes: (name) => {
      if (name === 'Encounter') return ['patientId', 'status'];
      if (name.includes('Encounter')) return ['encounterId'];
      return ['patientId', 'encounterId'];
    },
  },
  '05-laboratory.prisma': {
    enums: 'lab',
    models: [
      'LabOrder', 'LabOrderItem', 'LabSpecimen', 'LabResult', 'LabResultAnalyte',
      'LabReferenceRange', 'LabValidation', 'LabBarcode', 'LabReport', 'LabInstrument',
      'PanicValueAlert', 'LabTestCatalog', 'LabPanel', 'LabCriticalValue', 'LabWorklist',
      'LabWorklistItem', 'LabOrderStatusHistory', 'LabResultComment', 'LabResultFlag',
      'LabQualityControl', 'LabExternalLab', 'LabMicrobiologyResult', 'LabPathologyReport',
    ],
    defaultIndexes: (name) => {
      if (name === 'LabOrder') return ['patientId', 'status'];
      if (name.startsWith('LabOrder')) return ['labOrderId'];
      if (name.startsWith('LabResult')) return ['labResultId', 'labOrderId'];
      if (name === 'PanicValueAlert') return ['patientId', 'detectedAt'];
      return ['labOrderId'];
    },
  },
  '06-radiology.prisma': {
    enums: 'rad',
    models: [
      'RadiologyOrder', 'RadiologyStudy', 'RadiologySeries', 'RadiologyInstance',
      'RadiologyReport', 'RadiologyModality', 'PacsReference', 'RadiologyWorklist',
      'RadiologyWorklistItem', 'RadiologyFinding', 'RadiologyImpression', 'RadiologyProtocol',
      'RadiologyEquipment', 'RadiologyPeerReview', 'RadiologyCriticalFinding',
      'RadiologyContrastAdministration', 'RadiologyDoseReport', 'RadiologyReportAmendment',
      'RadiologySchedulingSlot', 'DicomStudy', 'DicomSeries', 'DicomInstance', 'DicomMetadata',
    ],
    defaultIndexes: (name) => {
      if (name === 'RadiologyOrder') return ['patientId', 'status'];
      if (name === 'RadiologyStudy') return ['studyInstanceUid', 'patientId'];
      if (name.includes('Radiology')) return ['radiologyStudyId', 'radiologyOrderId'];
      return ['patientId'];
    },
  },
  '07-pharmacy.prisma': {
    enums: 'pharm',
    models: [
      'DrugProduct', 'InventoryItem', 'InventoryLot', 'DispenseEvent', 'Supplier',
      'PurchaseOrder', 'DrugInteractionRule', 'FormularyItem', 'MedicationAdministration',
      'PharmacyInventoryTransaction', 'PharmacyPurchaseOrderItem', 'PharmacyReturn',
      'PharmacyStockAlert', 'PharmacyRecall', 'PharmacyCompounding', 'PharmacyLabel',
      'PharmacyDelivery', 'PharmacyControlledSubstanceLog', 'PharmacyFormularyException',
    ],
    defaultIndexes: (name) => {
      if (name === 'DrugProduct') return ['ndcCode'];
      if (name.includes('Inventory')) return ['drugProductId', 'facilityId'];
      if (name === 'DispenseEvent') return ['patientId', 'status'];
      return ['drugProductId'];
    },
  },
};

function genericFields(modelName) {
  const lower = modelName.toLowerCase();
  const fields = [];
  if (lower.includes('patient') && !lower.startsWith('patientprofile')) fields.push(F.uuid('patientId'));
  if (lower.includes('encounter')) fields.push(F.uuid('encounterId'));
  if (lower.includes('provider') || lower.includes('doctor')) fields.push(F.uuid('providerId', true));
  if (lower.includes('laborder') && modelName !== 'LabOrder') fields.push(F.uuid('labOrderId'));
  if (lower.includes('labresult') && modelName !== 'LabResult') fields.push(F.uuid('labResultId', true));
  if (lower.includes('radiology') && modelName !== 'RadiologyOrder' && modelName !== 'RadiologyStudy') {
    fields.push(F.uuid('radiologyStudyId', true));
    fields.push(F.uuid('radiologyOrderId', true));
  }
  if (lower.includes('appointment') && modelName !== 'Appointment') fields.push(F.uuid('appointmentId', true));
  fields.push(F.str('code', true, null, 50));
  fields.push(F.str('name', true, null, 200));
  fields.push(F.str('status', false, null, 30));
  fields.push(F.text('notes', true));
  fields.push(F.ts('occurredAt', true));
  fields.push(F.json('metadata'));
  return fields;
}

function getModelFields(name) {
  if (MODEL_DEFS[name]) return MODEL_DEFS[name]();
  return genericFields(name);
}

export function generateProductionFragments(modelsDir) {
  let total = 0;
  const summary = [];

  for (const [filename, config] of Object.entries(FRAGMENT_MODELS)) {
    const parts = [
      `// Production clinical domain: ${filename}`,
      `// Regenerate: node tools/codegen/generate_production_phase234.mjs`,
      '',
      ENUMS[config.enums],
      '',
    ];

    for (const modelName of config.models) {
      const indexes = config.defaultIndexes(modelName);
      parts.push(renderModel(modelName, getModelFields(modelName), { indexes }));
      parts.push('');
      total++;
    }

    fs.mkdirSync(modelsDir, { recursive: true });
    fs.writeFileSync(path.join(modelsDir, filename), parts.join('\n').trim() + '\n');
    summary.push({ filename, count: config.models.length });
  }

  return { total, summary };
}
