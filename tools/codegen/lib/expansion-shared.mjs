import { enumBlock, interfaceBlock, writeFile } from './expansion-utils.mjs';

const DOMAINS = [
  {
    file: 'clinical',
    prefix: 'Clinical',
    enums: [
      ['DiagnosisCertainty', ['CONFIRMED', 'PROVISIONAL', 'DIFFERENTIAL', 'RULED_OUT', 'UNKNOWN']],
      ['AllergySeverity', ['MILD', 'MODERATE', 'SEVERE', 'LIFE_THREATENING', 'UNKNOWN']],
      ['VitalSignType', ['BLOOD_PRESSURE', 'HEART_RATE', 'RESPIRATORY_RATE', 'TEMPERATURE', 'SPO2', 'WEIGHT', 'HEIGHT', 'BMI', 'PAIN_SCORE']],
      ['ImmunizationStatus', ['COMPLETED', 'NOT_DONE', 'PARTIALLY_DONE', 'ENTERED_IN_ERROR']],
      ['CarePlanStatus', ['DRAFT', 'ACTIVE', 'ON_HOLD', 'REVOKED', 'COMPLETED', 'ENTERED_IN_ERROR']],
      ['ProblemListStatus', ['ACTIVE', 'INACTIVE', 'RESOLVED', 'CHRONIC', 'RECURRENT']],
      ['ProcedureStatus', ['PREPARATION', 'IN_PROGRESS', 'NOT_DONE', 'ON_HOLD', 'STOPPED', 'COMPLETED', 'ENTERED_IN_ERROR']],
      ['ConsentStatus', ['DRAFT', 'PROPOSED', 'ACTIVE', 'REJECTED', 'INACTIVE', 'ENTERED_IN_ERROR']],
      ['AdvanceDirectiveType', ['DNR', 'LIVING_WILL', 'HEALTHCARE_PROXY', 'POLST', 'ORGAN_DONOR']],
      ['ClinicalDocumentStatus', ['PRELIMINARY', 'FINAL', 'AMENDED', 'ENTERED_IN_ERROR', 'DEPRECATED']],
      ['BodySite', ['HEAD', 'NECK', 'CHEST', 'ABDOMEN', 'PELVIS', 'UPPER_EXTREMITY', 'LOWER_EXTREMITY', 'BACK', 'WHOLE_BODY']],
      ['Laterality', ['LEFT', 'RIGHT', 'BILATERAL', 'UNILATERAL', 'UNKNOWN']],
      ['ClinicalPriority', ['ROUTINE', 'URGENT', 'ASAP', 'STAT', 'CRITICAL']],
      ['ReferralStatus', ['DRAFT', 'ACTIVE', 'ON_HOLD', 'REVOKED', 'COMPLETED', 'CANCELLED']],
      ['DischargeDisposition', ['HOME', 'SNF', 'REHAB', 'HOSPICE', 'AMA', 'TRANSFER', 'DECEASED', 'OTHER']],
    ],
    entities: ['Encounter', 'Diagnosis', 'ClinicalNote', 'CarePlan', 'Problem', 'Procedure', 'Consent', 'Referral', 'Immunization', 'VitalSignReading'],
  },
  {
    file: 'billing',
    prefix: 'Billing',
    enums: [
      ['InvoiceStatus', ['DRAFT', 'PENDING', 'SUBMITTED', 'PARTIALLY_PAID', 'PAID', 'VOID', 'WRITTEN_OFF', 'DISPUTED']],
      ['ClaimStatus', ['DRAFT', 'READY', 'SUBMITTED', 'ACCEPTED', 'REJECTED', 'PENDED', 'PAID', 'DENIED', 'APPEALED']],
      ['PaymentMethod', ['CASH', 'CHECK', 'CREDIT_CARD', 'DEBIT_CARD', 'ACH', 'WIRE', 'INSURANCE', 'HSA', 'FSA']],
      ['ChargeType', ['PROCEDURE', 'SUPPLY', 'PHARMACY', 'LAB', 'IMAGING', 'ROOM', 'PROFESSIONAL', 'FACILITY', 'OTHER']],
      ['AdjustmentReason', ['CONTRACTUAL', 'CHARITY', 'BAD_DEBT', 'CORRECTION', 'INSURANCE', 'PROMOTION', 'OTHER']],
      ['RemittanceStatus', ['RECEIVED', 'POSTED', 'PARTIALLY_POSTED', 'REJECTED', 'REVERSED']],
      ['CopayCollectionStatus', ['NOT_COLLECTED', 'COLLECTED', 'WAIVED', 'DEFERRED']],
      ['BillingCycle', ['DAILY', 'WEEKLY', 'BIWEEKLY', 'MONTHLY', 'QUARTERLY']],
      ['FeeScheduleType', ['CPT', 'HCPCS', 'DRG', 'APC', 'CUSTOM', 'NEGOTIATED']],
      ['PriorAuthBillingStatus', ['NOT_REQUIRED', 'PENDING', 'APPROVED', 'DENIED', 'EXPIRED']],
    ],
    entities: ['Invoice', 'InvoiceLineItem', 'Claim', 'Payment', 'Adjustment', 'Remittance', 'FeeSchedule', 'CopayLedger'],
  },
  {
    file: 'pharmacy',
    prefix: 'Pharmacy',
    enums: [
      ['MedicationForm', ['TABLET', 'CAPSULE', 'LIQUID', 'INJECTION', 'TOPICAL', 'INHALER', 'PATCH', 'SUPPOSITORY', 'OTHER']],
      ['PrescriptionStatus', ['DRAFT', 'ACTIVE', 'ON_HOLD', 'CANCELLED', 'COMPLETED', 'EXPIRED', 'DISCONTINUED']],
      ['DispenseStatus', ['PENDING', 'IN_PROGRESS', 'READY', 'PICKED_UP', 'RETURNED', 'CANCELLED']],
      ['DrugSchedule', ['OTC', 'CII', 'CIII', 'CIV', 'CV', 'NON_CONTROLLED']],
      ['InteractionSeverity', ['MINOR', 'MODERATE', 'MAJOR', 'CONTRAINDICATED']],
      ['FormularyTier', ['TIER_1', 'TIER_2', 'TIER_3', 'TIER_4', 'NON_FORMULARY', 'SPECIALTY']],
      ['MedicationRoute', ['ORAL', 'IV', 'IM', 'SC', 'TOPICAL', 'INHALATION', 'RECTAL', 'OPHTHALMIC', 'OTIC']],
      ['RefillAuthorizationStatus', ['PENDING', 'APPROVED', 'DENIED', 'EXPIRED']],
      ['InventoryTransactionType', ['RECEIPT', 'DISPENSE', 'ADJUSTMENT', 'TRANSFER', 'RETURN', 'WASTE']],
      ['CompoundingStatus', ['ORDERED', 'IN_PROGRESS', 'QC', 'READY', 'DELIVERED', 'CANCELLED']],
    ],
    entities: ['Medication', 'Prescription', 'DispenseRecord', 'DrugInteraction', 'FormularyEntry', 'InventoryLot', 'CompoundingOrder'],
  },
  {
    file: 'laboratory',
    prefix: 'Laboratory',
    enums: [
      ['LabOrderStatus', ['DRAFT', 'ORDERED', 'COLLECTED', 'IN_TRANSIT', 'RECEIVED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']],
      ['SpecimenType', ['BLOOD', 'SERUM', 'PLASMA', 'URINE', 'STOOL', 'CSF', 'TISSUE', 'SWAB', 'OTHER']],
      ['SpecimenStatus', ['AVAILABLE', 'UNAVAILABLE', 'UNSATISFACTORY', 'ENTERED_IN_ERROR']],
      ['ResultStatus', ['PRELIMINARY', 'FINAL', 'CORRECTED', 'CANCELLED', 'ENTERED_IN_ERROR']],
      ['ResultInterpretation', ['NORMAL', 'ABNORMAL', 'CRITICAL_LOW', 'CRITICAL_HIGH', 'INDETERMINATE']],
      ['LabPanelCategory', ['HEMATOLOGY', 'CHEMISTRY', 'MICROBIOLOGY', 'IMMUNOLOGY', 'TOXICOLOGY', 'MOLECULAR', 'PATHOLOGY']],
      ['CollectionMethod', ['VENIPUNCTURE', 'FINGERSTICK', 'MIDSTREAM', 'CATHETER', 'ASPIRATION']],
      ['QualityControlStatus', ['PASS', 'FAIL', 'PENDING', 'OUT_OF_RANGE']],
      ['LabInstrumentStatus', ['ONLINE', 'OFFLINE', 'MAINTENANCE', 'CALIBRATION', 'ERROR']],
      ['CriticalValueAckStatus', ['PENDING', 'ACKNOWLEDGED', 'ESCALATED', 'OVERRIDE_DOCUMENTED']],
    ],
    entities: ['LabOrder', 'LabPanel', 'LabTest', 'Specimen', 'LabResult', 'CriticalValueAlert', 'QcRun', 'LabInstrument'],
  },
  {
    file: 'radiology',
    prefix: 'Radiology',
    enums: [
      ['ImagingModality', ['CR', 'CT', 'MR', 'US', 'NM', 'PT', 'XA', 'MG', 'RF', 'DX']],
      ['StudyStatus', ['SCHEDULED', 'ARRIVED', 'IN_PROGRESS', 'COMPLETED', 'PRELIMINARY', 'FINAL', 'AMENDED', 'CANCELLED']],
      ['ReportStatus', ['DRAFT', 'PRELIMINARY', 'FINAL', 'ADDENDUM', 'CORRECTED', 'CANCELLED']],
      ['ContrastAgentType', ['IODINATED', 'GADOLINIUM', 'BARIUM', 'NONE', 'OTHER']],
      ['RadiationDoseUnit', ['MGY', 'MGYCMC2', 'DLP', 'CTDI']],
      ['PacsSyncStatus', ['PENDING', 'SYNCED', 'FAILED', 'PARTIAL']],
      ['PeerReviewOutcome', ['CONCUR', 'MINOR_DISCREPANCY', 'MAJOR_DISCREPANCY', 'NOT_REVIEWED']],
      ['CriticalFindingStatus', ['OPEN', 'COMMUNICATED', 'ACKNOWLEDGED', 'ESCALATED', 'CLOSED']],
      ['ImageQuality', ['DIAGNOSTIC', 'LIMITED', 'NON_DIAGNOSTIC', 'REPEAT_REQUIRED']],
      ['WorklistPriority', ['ROUTINE', 'URGENT', 'STAT', 'CRITICAL']],
    ],
    entities: ['ImagingStudy', 'RadiologyReport', 'SeriesInstance', 'DoseRecord', 'CriticalFinding', 'PeerReview', 'WorklistItem'],
  },
  {
    file: 'telemedicine',
    prefix: 'Telemedicine',
    enums: [
      ['SessionStatus', ['SCHEDULED', 'WAITING_ROOM', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW', 'TECHNICAL_FAILURE']],
      ['SessionType', ['VIDEO', 'AUDIO', 'CHAT', 'HYBRID', 'ASYNC_MESSAGE']],
      ['ConnectionQuality', ['EXCELLENT', 'GOOD', 'FAIR', 'POOR', 'DISCONNECTED']],
      ['WaitingRoomStatus', ['OPEN', 'CHECKED_IN', 'ADMITTED', 'LEFT', 'EXPIRED']],
      ['RecordingConsentStatus', ['NOT_REQUESTED', 'PENDING', 'GRANTED', 'DENIED', 'REVOKED']],
      ['TelehealthPlatform', ['WEBRTC', 'ZOOM', 'TEAMS', 'CUSTOM', 'PSTN_BRIDGE']],
      ['VirtualVisitReason', ['FOLLOW_UP', 'NEW_CONSULT', 'URGENT_CARE', 'BEHAVIORAL_HEALTH', 'CHRONIC_CARE', 'PRE_OP', 'POST_OP']],
      ['InterpreterRequestStatus', ['NOT_NEEDED', 'REQUESTED', 'CONNECTED', 'COMPLETED', 'CANCELLED']],
      ['DeviceType', ['DESKTOP', 'MOBILE', 'TABLET', 'KIOSK', 'EMBEDDED']],
      ['SessionBillingStatus', ['NOT_BILLED', 'READY', 'SUBMITTED', 'PAID', 'DENIED']],
    ],
    entities: ['VideoSession', 'WaitingRoomEntry', 'SessionParticipant', 'SessionRecording', 'ChatMessage', 'ConnectionMetric', 'InterpreterSession'],
  },
  {
    file: 'analytics',
    prefix: 'Analytics',
    enums: [
      ['MetricGranularity', ['MINUTE', 'HOUR', 'DAY', 'WEEK', 'MONTH', 'QUARTER', 'YEAR']],
      ['ReportFormat', ['PDF', 'CSV', 'XLSX', 'JSON', 'HTML', 'DASHBOARD']],
      ['ReportScheduleFrequency', ['ONCE', 'DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY']],
      ['DashboardWidgetType', ['KPI', 'LINE_CHART', 'BAR_CHART', 'PIE_CHART', 'TABLE', 'HEATMAP', 'FUNNEL']],
      ['DataSourceType', ['WAREHOUSE', 'OLTP_REPLICA', 'KAFKA_STREAM', 'EXTERNAL_API', 'FILE_IMPORT']],
      ['AggregationFunction', ['SUM', 'AVG', 'MIN', 'MAX', 'COUNT', 'COUNT_DISTINCT', 'P50', 'P95', 'P99']],
      ['AlertConditionOperator', ['GT', 'GTE', 'LT', 'LTE', 'EQ', 'NEQ', 'CHANGE_PERCENT']],
      ['ExportJobStatus', ['QUEUED', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELLED']],
      ['CohortType', ['PATIENT', 'PROVIDER', 'FACILITY', 'PAYER', 'DIAGNOSIS', 'PROCEDURE']],
      ['BenchmarkType', ['INTERNAL', 'PEER_GROUP', 'NATIONAL', 'REGULATORY', 'CUSTOM']],
    ],
    entities: ['MetricDefinition', 'ReportDefinition', 'Dashboard', 'Widget', 'ExportJob', 'CohortDefinition', 'Benchmark', 'AlertRule'],
  },
];

function generateDomainTypes(domain) {
  const imports = `import type { Auditable, ISODateString, SoftDelete, TenantScoped, UUID } from './index';\n\n`;
  const enums = domain.enums.map(([name, values]) => enumBlock(name, values)).join('\n\n');
  const interfaces = domain.entities
    .flatMap((entity, idx) => {
      const statusEnum = domain.enums[idx % domain.enums.length][0];
      return [
        interfaceBlock(`${domain.prefix}${entity}Record`, [
          { name: 'id', type: 'UUID' },
          { name: 'organizationId', type: 'UUID' },
          { name: 'facilityId', type: 'UUID | null' },
          { name: 'patientId', type: 'UUID | null' },
          { name: 'status', type: statusEnum },
          { name: 'code', type: 'string' },
          { name: 'displayName', type: 'string' },
          { name: 'description', type: 'string | null' },
          { name: 'effectiveFrom', type: 'ISODateString' },
          { name: 'effectiveTo', type: 'ISODateString | null' },
          { name: 'metadata', type: 'Record<string, unknown>' },
        ]),
        interfaceBlock(`${domain.prefix}${entity}Summary`, [
          { name: 'id', type: 'UUID' },
          { name: 'status', type: statusEnum },
          { name: 'displayName', type: 'string' },
          { name: 'updatedAt', type: 'ISODateString' },
        ]),
        interfaceBlock(`${domain.prefix}${entity}CreateInput`, [
          { name: 'organizationId', type: 'UUID' },
          { name: 'facilityId', type: 'UUID | null', optional: true },
          { name: 'patientId', type: 'UUID | null', optional: true },
          { name: 'code', type: 'string' },
          { name: 'displayName', type: 'string' },
          { name: 'description', type: 'string | null', optional: true },
          { name: 'metadata', type: 'Record<string, unknown>', optional: true },
        ]),
        interfaceBlock(`${domain.prefix}${entity}UpdateInput`, [
          { name: 'status', type: statusEnum, optional: true },
          { name: 'displayName', type: 'string', optional: true },
          { name: 'description', type: 'string | null', optional: true },
          { name: 'metadata', type: 'Record<string, unknown>', optional: true },
        ]),
      ];
    })
    .join('\n\n');

  const aggregateRoot = interfaceBlock(`${domain.prefix}AggregateRoot`, [
    { name: 'id', type: 'UUID' },
    { name: 'version', type: 'number' },
    { name: 'tenant', type: 'TenantScoped' },
    { name: 'audit', type: 'Auditable' },
    { name: 'softDelete', type: 'SoftDelete' },
    { name: 'tags', type: 'string[]' },
    { name: 'extensions', type: 'Record<string, unknown>' },
  ]);

  const searchFilter = interfaceBlock(`${domain.prefix}SearchFilter`, [
    { name: 'query', type: 'string', optional: true },
    { name: 'statuses', type: `${domain.enums[0][0]}[]`, optional: true },
    { name: 'patientId', type: 'UUID', optional: true },
    { name: 'facilityId', type: 'UUID', optional: true },
    { name: 'dateFrom', type: 'ISODateString', optional: true },
    { name: 'dateTo', type: 'ISODateString', optional: true },
    { name: 'includeDeleted', type: 'boolean', optional: true },
  ]);

  const bulkOps = domain.entities
    .slice(0, 5)
    .map(
      (entity) => `export type ${domain.prefix}${entity}BulkOperation =
  | { op: 'create'; items: ${domain.prefix}${entity}CreateInput[] }
  | { op: 'update'; items: Array<{ id: UUID; patch: ${domain.prefix}${entity}UpdateInput }> }
  | { op: 'archive'; ids: UUID[] };`,
    )
    .join('\n\n');

  return `/**
 * ${domain.prefix} domain types — MedSphere shared package.
 * @module @medsphere/shared/types/${domain.file}
 */

${imports}
${enums}

${interfaces}

${aggregateRoot}

${searchFilter}

${bulkOps}

export type ${domain.prefix}DomainEventType =
${domain.entities.map((e) => `  | '${domain.file}.${kebabEntity(e)}.created'`).join('\n')}
${domain.entities.map((e) => `  | '${domain.file}.${kebabEntity(e)}.updated'`).join('\n')}
${domain.entities.map((e) => `  | '${domain.file}.${kebabEntity(e)}.archived'`).join('\n')};
`;
}

function kebabEntity(name) {
  return name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function generateDomainValidator(domain) {
  const enumImports = domain.enums.map(([name]) => name).join(',\n  ');
  const schemas = domain.entities
    .map((entity, idx) => {
      const statusEnum = domain.enums[idx % domain.enums.length][0];
      return `export const ${camelEntity(entity)}CreateSchema = z.object({
  organizationId: uuidSchema,
  facilityId: uuidSchema.nullable().optional(),
  patientId: uuidSchema.nullable().optional(),
  code: z.string().trim().min(1).max(64),
  displayName: z.string().trim().min(1).max(256),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const ${camelEntity(entity)}UpdateSchema = z.object({
  status: z.nativeEnum(${statusEnum}).optional(),
  displayName: z.string().trim().min(1).max(256).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type ${domain.prefix}${entity}CreateInput = z.infer<typeof ${camelEntity(entity)}CreateSchema>;
export type ${domain.prefix}${entity}UpdateInput = z.infer<typeof ${camelEntity(entity)}UpdateSchema>;`;
    })
    .join('\n\n');

  const searchSchema = `export const ${domain.file}SearchFilterSchema = z.object({
  query: z.string().trim().max(200).optional(),
  statuses: z.array(z.nativeEnum(${domain.enums[0][0]})).max(20).optional(),
  patientId: uuidSchema.optional(),
  facilityId: uuidSchema.optional(),
  dateFrom: isoDateSchema.optional(),
  dateTo: isoDateSchema.optional(),
  includeDeleted: z.boolean().optional(),
});`;

  return `/**
 * ${domain.prefix} Zod validators.
 */
import { z } from 'zod';
import { isoDateSchema, uuidSchema } from '../validators';
import {
  ${enumImports},
} from '../types/${domain.file}';

${schemas}

${searchSchema}
`;
}

function camelEntity(name) {
  return name.charAt(0).toLowerCase() + name.slice(1);
}

function generateDomainEvents(domain) {
  const payloads = domain.entities
    .map(
      (entity) => `export type ${domain.prefix}${entity}CreatedPayload = {
  ${camelEntity(entity)}Id: UUID;
  organizationId: UUID;
  patientId?: UUID;
  code: string;
  displayName: string;
};

export type ${domain.prefix}${entity}UpdatedPayload = {
  ${camelEntity(entity)}Id: UUID;
  organizationId: UUID;
  changedFields: string[];
  previousStatus?: string;
  newStatus?: string;
};

export type ${domain.prefix}${entity}ArchivedPayload = {
  ${camelEntity(entity)}Id: UUID;
  organizationId: UUID;
  archivedBy: UUID;
  reason?: string;
};`,
    )
    .join('\n\n');

  const unionMembers = domain.entities.flatMap((entity) => [
    `DomainEventEnvelope<${domain.prefix}${entity}CreatedPayload, '${domain.file}.${kebabEntity(entity)}.created'>`,
    `DomainEventEnvelope<${domain.prefix}${entity}UpdatedPayload, '${domain.file}.${kebabEntity(entity)}.updated'>`,
    `DomainEventEnvelope<${domain.prefix}${entity}ArchivedPayload, '${domain.file}.${kebabEntity(entity)}.archived'>`,
  ]);

  return `/**
 * ${domain.prefix} domain event catalog.
 */
import type { DomainEventEnvelope } from './index';
import type { UUID } from '../types';

${payloads}

export type ${domain.prefix}DomainEvent =
${unionMembers.map((m) => `  | ${m}`).join('\n')};

export const ${domain.prefix.toUpperCase()}_EVENT_TOPIC = 'medsphere.${domain.file}.events.v1';

export function is${domain.prefix}DomainEvent(event: { eventType: string }): event is ${domain.prefix}DomainEvent {
  return event.eventType.startsWith('${domain.file}.');
}
`;
}

function generateDomainDto(domain) {
  const dtos = domain.entities
    .map(
      (entity, idx) => {
        const statusEnum = domain.enums[idx % domain.enums.length][0];
        return `export interface ${domain.prefix}${entity}Dto {
  id: UUID;
  organizationId: UUID;
  facilityId: UUID | null;
  patientId: UUID | null;
  status: ${statusEnum};
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

export interface ${domain.prefix}${entity}ListItemDto {
  id: UUID;
  status: ${statusEnum};
  code: string;
  displayName: string;
  patientId: UUID | null;
  updatedAt: ISODateString;
}

export type ${domain.prefix}${entity}ListDto = PaginatedResult<${domain.prefix}${entity}ListItemDto>;`;
      },
    )
    .join('\n\n');

  return `/**
 * ${domain.prefix} DTOs for API and SDK consumers.
 */
import type { ISODateString, PaginatedResult, UUID } from '../types';
import type { ${domain.enums.map(([n]) => n).join(', ')} } from '../types/${domain.file}';

${dtos}
`;
}

function generateFhirHelpers() {
  const resources = [
    {
      name: 'Patient',
      fhirType: 'Patient',
      fields: ['id', 'mrn', 'familyName', 'givenName', 'birthDate', 'gender', 'phone', 'email'],
    },
    {
      name: 'Encounter',
      fhirType: 'Encounter',
      fields: ['id', 'patientId', 'status', 'class', 'periodStart', 'periodEnd', 'serviceProvider'],
    },
    {
      name: 'Observation',
      fhirType: 'Observation',
      fields: ['id', 'patientId', 'encounterId', 'code', 'value', 'unit', 'effectiveDateTime', 'status'],
    },
    {
      name: 'MedicationRequest',
      fhirType: 'MedicationRequest',
      fields: ['id', 'patientId', 'medicationCode', 'dosageInstruction', 'status', 'authoredOn', 'requester'],
    },
    {
      name: 'DiagnosticReport',
      fhirType: 'DiagnosticReport',
      fields: ['id', 'patientId', 'code', 'conclusion', 'issued', 'status', 'performer'],
    },
    {
      name: 'Condition',
      fhirType: 'Condition',
      fields: ['id', 'patientId', 'code', 'clinicalStatus', 'verificationStatus', 'onsetDateTime'],
    },
    {
      name: 'Procedure',
      fhirType: 'Procedure',
      fields: ['id', 'patientId', 'code', 'status', 'performedDateTime', 'performer'],
    },
    {
      name: 'AllergyIntolerance',
      fhirType: 'AllergyIntolerance',
      fields: ['id', 'patientId', 'code', 'criticality', 'clinicalStatus', 'recordedDate'],
    },
  ];

  const mappers = resources
    .map((r) => {
      const medsphereInterface = `export interface Medsphere${r.name} {
  id: UUID;
  organizationId: UUID;
  patientId?: UUID;
  fhirVersion: 'R4';
  lastSyncedAt: ISODateString;
  raw: Fhir${r.name}Resource;
}`;

      const toFhir = `export function medsphere${r.name}ToFhir(input: Medsphere${r.name}Input): Fhir${r.name}Resource {
  return {
    resourceType: '${r.fhirType}',
    id: input.id,
    meta: {
      versionId: String(input.version ?? 1),
      lastUpdated: input.updatedAt,
      profile: ['http://medsphere.health/fhir/StructureDefinition/${r.name}'],
    },
    identifier: input.identifiers?.map((id) => ({
      system: id.system,
      value: id.value,
      use: id.use ?? 'official',
    })),
    extension: Object.entries(input.extensions ?? {}).map(([url, value]) => ({ url, valueString: String(value) })),
    ${r.fields
      .filter((f) => !['id'].includes(f))
      .map((f) => {
        if (f === 'familyName' || f === 'givenName') return null;
        if (f === 'birthDate') return `birthDate: input.birthDate?.slice(0, 10),`;
        if (f === 'gender') return `gender: mapGenderToFhir(input.gender),`;
        if (f === 'phone' || f === 'email')
          return `telecom: buildTelecom(input.phone, input.email),`;
        if (f === 'status') return `status: input.status.toLowerCase(),`;
        if (f === 'code') return `code: buildCodeableConcept(input.codeSystem, input.code, input.display),`;
        if (f === 'value') return `valueQuantity: input.value != null ? { value: input.value, unit: input.unit ?? 'unit' } : undefined,`;
        if (f === 'effectiveDateTime') return `effectiveDateTime: input.effectiveDateTime,`;
        if (f === 'patientId') return `subject: { reference: \`Patient/\${input.patientId}\` },`;
        if (f === 'encounterId') return `encounter: input.encounterId ? { reference: \`Encounter/\${input.encounterId}\` } : undefined,`;
        if (f === 'medicationCode')
          return `medicationCodeableConcept: buildCodeableConcept(input.codeSystem, input.medicationCode, input.medicationDisplay),`;
        if (f === 'dosageInstruction')
          return `dosageInstruction: input.dosageInstruction ? [{ text: input.dosageInstruction }] : undefined,`;
        if (f === 'authoredOn') return `authoredOn: input.authoredOn,`;
        if (f === 'requester') return `requester: input.requesterId ? { reference: \`Practitioner/\${input.requesterId}\` } : undefined,`;
        if (f === 'conclusion') return `conclusion: input.conclusion,`;
        if (f === 'issued') return `issued: input.issued,`;
        if (f === 'performer')
          return `performer: input.performerId ? [{ reference: \`Practitioner/\${input.performerId}\` }] : undefined,`;
        if (f === 'clinicalStatus')
          return `clinicalStatus: { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/condition-clinical', code: input.clinicalStatus }] },`;
        if (f === 'verificationStatus')
          return `verificationStatus: { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/condition-ver-status', code: input.verificationStatus }] },`;
        if (f === 'onsetDateTime') return `onsetDateTime: input.onsetDateTime,`;
        if (f === 'performedDateTime') return `performedDateTime: input.performedDateTime,`;
        if (f === 'criticality')
          return `criticality: input.criticality?.toLowerCase(),`;
        if (f === 'recordedDate') return `recordedDate: input.recordedDate,`;
        if (f === 'class') return `class: { system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode', code: input.classCode, display: input.classDisplay },`;
        if (f === 'periodStart') return `period: { start: input.periodStart, end: input.periodEnd },`;
        if (f === 'periodEnd' || f === 'serviceProvider') return null;
        if (f === 'mrn') return null;
        return `${f}: input.${f},`;
      })
      .filter(Boolean)
      .join('\n    ')}
    ${r.name === 'Patient' ? `name: [{ family: input.familyName, given: [input.givenName] }],` : ''}
  };
}`;

      const fromFhir = `export function fhir${r.name}ToMedsphere(resource: Fhir${r.name}Resource, organizationId: UUID): Medsphere${r.name}Input {
  return {
    id: (resource.id ?? cryptoRandomId()) as UUID,
    organizationId,
    patientId: extractReferenceId(resource.subject?.reference) as UUID | undefined,
    version: Number(resource.meta?.versionId ?? 1),
    updatedAt: resource.meta?.lastUpdated ?? new Date().toISOString(),
    identifiers: (resource.identifier ?? []).map((i) => ({
      system: i.system ?? '',
      value: i.value ?? '',
      use: i.use,
    })),
    extensions: Object.fromEntries(
      (resource.extension ?? []).map((e) => [e.url, e.valueString ?? e.valueCode ?? '']),
    ),
    ${r.fields
      .filter((f) => !['id', 'patientId'].includes(f))
      .map((f) => {
        if (f === 'familyName') return `familyName: resource.name?.[0]?.family ?? '',`;
        if (f === 'givenName') return `givenName: resource.name?.[0]?.given?.[0] ?? '',`;
        if (f === 'birthDate') return `birthDate: resource.birthDate ?? '',`;
        if (f === 'gender') return `gender: mapGenderFromFhir(resource.gender),`;
        if (f === 'phone') return `phone: resource.telecom?.find((t) => t.system === 'phone')?.value,`;
        if (f === 'email') return `email: resource.telecom?.find((t) => t.system === 'email')?.value,`;
        if (f === 'status') return `status: String(resource.status ?? 'unknown').toUpperCase(),`;
        if (f === 'code') return `code: resource.code?.coding?.[0]?.code ?? '',`;
        if (f === 'value') return `value: resource.valueQuantity?.value,`;
        if (f === 'unit') return `unit: resource.valueQuantity?.unit,`;
        if (f === 'effectiveDateTime') return `effectiveDateTime: resource.effectiveDateTime,`;
        if (f === 'encounterId') return `encounterId: extractReferenceId(resource.encounter?.reference),`;
        if (f === 'medicationCode')
          return `medicationCode: resource.medicationCodeableConcept?.coding?.[0]?.code ?? '',`;
        if (f === 'medicationDisplay') return `medicationDisplay: resource.medicationCodeableConcept?.coding?.[0]?.display,`;
        if (f === 'dosageInstruction') return `dosageInstruction: resource.dosageInstruction?.[0]?.text,`;
        if (f === 'authoredOn') return `authoredOn: resource.authoredOn,`;
        if (f === 'requester') return `requesterId: extractReferenceId(resource.requester?.reference),`;
        if (f === 'conclusion') return `conclusion: resource.conclusion,`;
        if (f === 'issued') return `issued: resource.issued,`;
        if (f === 'performer') return `performerId: extractReferenceId(resource.performer?.[0]?.reference),`;
        if (f === 'clinicalStatus')
          return `clinicalStatus: resource.clinicalStatus?.coding?.[0]?.code ?? 'unknown',`;
        if (f === 'verificationStatus')
          return `verificationStatus: resource.verificationStatus?.coding?.[0]?.code ?? 'unknown',`;
        if (f === 'onsetDateTime') return `onsetDateTime: resource.onsetDateTime,`;
        if (f === 'performedDateTime') return `performedDateTime: resource.performedDateTime,`;
        if (f === 'criticality') return `criticality: resource.criticality,`;
        if (f === 'recordedDate') return `recordedDate: resource.recordedDate,`;
        if (f === 'class') return `classCode: resource.class?.code ?? '',`;
        if (f === 'classDisplay') return `classDisplay: resource.class?.display,`;
        if (f === 'periodStart') return `periodStart: resource.period?.start,`;
        if (f === 'periodEnd') return `periodEnd: resource.period?.end,`;
        if (f === 'serviceProvider')
          return `serviceProviderId: extractReferenceId(resource.serviceProvider?.reference),`;
        if (f === 'mrn')
          return `mrn: resource.identifier?.find((i) => i.system?.includes('mrn'))?.value ?? '',`;
        return `${f}: (resource as Record<string, unknown>).${f} as string,`;
      })
      .join('\n    ')}
  };
}`;

      return `${medsphereInterface}

export interface Medsphere${r.name}Input {
  id: UUID;
  organizationId: UUID;
  patientId?: UUID;
  version?: number;
  updatedAt: ISODateString;
  identifiers?: Array<{ system: string; value: string; use?: string }>;
  extensions?: Record<string, unknown>;
  ${r.fields.filter((f) => !['id', 'patientId'].includes(f)).map((f) => `${f}?: unknown;`).join('\n  ')}
}

export interface Fhir${r.name}Resource {
  resourceType: '${r.fhirType}';
  id?: string;
  meta?: { versionId?: string; lastUpdated?: string; profile?: string[] };
  identifier?: Array<{ system?: string; value?: string; use?: string }>;
  extension?: Array<{ url: string; valueString?: string; valueCode?: string }>;
  subject?: { reference?: string };
  encounter?: { reference?: string };
  status?: string;
  code?: { coding?: Array<{ system?: string; code?: string; display?: string }> };
  valueQuantity?: { value?: number; unit?: string };
  effectiveDateTime?: string;
  name?: Array<{ family?: string; given?: string[] }>;
  birthDate?: string;
  gender?: string;
  telecom?: Array<{ system?: string; value?: string }>;
  class?: { system?: string; code?: string; display?: string };
  period?: { start?: string; end?: string };
  serviceProvider?: { reference?: string };
  medicationCodeableConcept?: { coding?: Array<{ code?: string; display?: string }> };
  dosageInstruction?: Array<{ text?: string }>;
  authoredOn?: string;
  requester?: { reference?: string };
  conclusion?: string;
  issued?: string;
  performer?: Array<{ reference?: string }>;
  clinicalStatus?: { coding?: Array<{ code?: string }> };
  verificationStatus?: { coding?: Array<{ code?: string }> };
  onsetDateTime?: string;
  performedDateTime?: string;
  criticality?: string;
  recordedDate?: string;
  [key: string]: unknown;
}

${toFhir}

${fromFhir}`;
    })
    .join('\n\n');

  return `/**
 * FHIR R4 mapping helpers for MedSphere clinical resources.
 */
import type { Gender, ISODateString, UUID } from '../types';

function cryptoRandomId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function extractReferenceId(ref?: string): string | undefined {
  if (!ref) return undefined;
  const parts = ref.split('/');
  return parts[parts.length - 1];
}

function buildCodeableConcept(system: string | undefined, code: string, display?: string) {
  return {
    coding: [{ system: system ?? 'http://medsphere.health/codes', code, display: display ?? code }],
    text: display ?? code,
  };
}

function buildTelecom(phone?: string, email?: string) {
  const telecom: Array<{ system: string; value: string }> = [];
  if (phone) telecom.push({ system: 'phone', value: phone });
  if (email) telecom.push({ system: 'email', value: email });
  return telecom.length ? telecom : undefined;
}

function mapGenderToFhir(gender?: Gender | string): string {
  const g = String(gender ?? 'unknown').toUpperCase();
  if (g === 'MALE') return 'male';
  if (g === 'FEMALE') return 'female';
  if (g === 'OTHER') return 'other';
  return 'unknown';
}

function mapGenderFromFhir(gender?: string): Gender | 'UNKNOWN' {
  const g = (gender ?? 'unknown').toLowerCase();
  if (g === 'male') return 'MALE';
  if (g === 'female') return 'FEMALE';
  if (g === 'other') return 'OTHER';
  return 'UNKNOWN';
}

${mappers}

export type FhirMappableResource =
${resources.map((r) => `  | Fhir${r.name}Resource`).join('\n')};

export function validateFhirResource(resource: FhirMappableResource): boolean {
  return Boolean(resource.resourceType && typeof resource.resourceType === 'string');
}
`;
}

export async function generateSharedPackage(root, stats) {
  for (const domain of DOMAINS) {
    await writeFile(root, `packages/shared/src/types/${domain.file}.ts`, generateDomainTypes(domain), stats);
    await writeFile(root, `packages/shared/src/validators/${domain.file}.ts`, generateDomainValidator(domain), stats);
    await writeFile(root, `packages/shared/src/events/${domain.file}.events.ts`, generateDomainEvents(domain), stats);
    await writeFile(root, `packages/shared/src/dto/${domain.file}.dto.ts`, generateDomainDto(domain), stats);
  }

  await writeFile(root, 'packages/shared/src/fhir/index.ts', generateFhirHelpers(), stats);
  await writeFile(root, 'packages/shared/src/fhir/patient.mapper.ts', `export * from './index';\n`, stats);

  const typesIndex = `export * from './index';\n${DOMAINS.map((d) => `export * from './${d.file}';`).join('\n')}\n`;
  await writeFile(root, 'packages/shared/src/types/domains.ts', typesIndex.replace("export * from './index';\n", ''), stats);

  const validatorsIndex = DOMAINS.map((d) => `export * from './${d.file}';`).join('\n');
  await writeFile(root, 'packages/shared/src/validators/domains.ts', validatorsIndex + '\n', stats);

  const eventsIndex = DOMAINS.map((d) => `export * from './${d.file}.events';`).join('\n');
  await writeFile(root, 'packages/shared/src/events/domains.ts', eventsIndex + '\n', stats);

  const dtoIndex = DOMAINS.map((d) => `export * from './${d.file}.dto';`).join('\n');
  await writeFile(root, 'packages/shared/src/dto/domains.ts', dtoIndex + '\n', stats);

  const mainIndex = `/**
 * MedSphere shared package — public API
 * @packageDocumentation
 */

export * from './types';
export * from './types/domains';
export * from './constants';
export * from './utils';
export * from './validators';
export * from './validators/domains';
export * from './events';
export * from './events/domains';
export * from './dto';
export * from './dto/domains';
export * from './fhir';
`;
  await writeFile(root, 'packages/shared/src/index.ts', mainIndex, stats);
}
