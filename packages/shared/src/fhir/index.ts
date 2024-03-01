/**
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

export interface MedspherePatient {
  id: UUID;
  organizationId: UUID;
  patientId?: UUID;
  fhirVersion: 'R4';
  lastSyncedAt: ISODateString;
  raw: FhirPatientResource;
}

export interface MedspherePatientInput {
  id: UUID;
  organizationId: UUID;
  patientId?: UUID;
  version?: number;
  updatedAt: ISODateString;
  identifiers?: Array<{ system: string; value: string; use?: string }>;
  extensions?: Record<string, unknown>;
  mrn?: unknown;
  familyName?: unknown;
  givenName?: unknown;
  birthDate?: unknown;
  gender?: unknown;
  phone?: unknown;
  email?: unknown;
}

export interface FhirPatientResource {
  resourceType: 'Patient';
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

export function medspherePatientToFhir(input: MedspherePatientInput): FhirPatientResource {
  return {
    resourceType: 'Patient',
    id: input.id,
    meta: {
      versionId: String(input.version ?? 1),
      lastUpdated: input.updatedAt,
      profile: ['http://medsphere.health/fhir/StructureDefinition/Patient'],
    },
    identifier: input.identifiers?.map((id) => ({
      system: id.system,
      value: id.value,
      use: id.use ?? 'official',
    })),
    extension: Object.entries(input.extensions ?? {}).map(([url, value]) => ({ url, valueString: String(value) })),
    birthDate: input.birthDate?.slice(0, 10),
    gender: mapGenderToFhir(input.gender),
    telecom: buildTelecom(input.phone, input.email),
    telecom: buildTelecom(input.phone, input.email),
    name: [{ family: input.familyName, given: [input.givenName] }],
  };
}

export function fhirPatientToMedsphere(resource: FhirPatientResource, organizationId: UUID): MedspherePatientInput {
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
    mrn: resource.identifier?.find((i) => i.system?.includes('mrn'))?.value ?? '',
    familyName: resource.name?.[0]?.family ?? '',
    givenName: resource.name?.[0]?.given?.[0] ?? '',
    birthDate: resource.birthDate ?? '',
    gender: mapGenderFromFhir(resource.gender),
    phone: resource.telecom?.find((t) => t.system === 'phone')?.value,
    email: resource.telecom?.find((t) => t.system === 'email')?.value,
  };
}

export interface MedsphereEncounter {
  id: UUID;
  organizationId: UUID;
  patientId?: UUID;
  fhirVersion: 'R4';
  lastSyncedAt: ISODateString;
  raw: FhirEncounterResource;
}

export interface MedsphereEncounterInput {
  id: UUID;
  organizationId: UUID;
  patientId?: UUID;
  version?: number;
  updatedAt: ISODateString;
  identifiers?: Array<{ system: string; value: string; use?: string }>;
  extensions?: Record<string, unknown>;
  status?: unknown;
  class?: unknown;
  periodStart?: unknown;
  periodEnd?: unknown;
  serviceProvider?: unknown;
}

export interface FhirEncounterResource {
  resourceType: 'Encounter';
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

export function medsphereEncounterToFhir(input: MedsphereEncounterInput): FhirEncounterResource {
  return {
    resourceType: 'Encounter',
    id: input.id,
    meta: {
      versionId: String(input.version ?? 1),
      lastUpdated: input.updatedAt,
      profile: ['http://medsphere.health/fhir/StructureDefinition/Encounter'],
    },
    identifier: input.identifiers?.map((id) => ({
      system: id.system,
      value: id.value,
      use: id.use ?? 'official',
    })),
    extension: Object.entries(input.extensions ?? {}).map(([url, value]) => ({ url, valueString: String(value) })),
    subject: { reference: `Patient/${input.patientId}` },
    status: input.status.toLowerCase(),
    class: { system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode', code: input.classCode, display: input.classDisplay },
    period: { start: input.periodStart, end: input.periodEnd },
    
  };
}

export function fhirEncounterToMedsphere(resource: FhirEncounterResource, organizationId: UUID): MedsphereEncounterInput {
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
    status: String(resource.status ?? 'unknown').toUpperCase(),
    classCode: resource.class?.code ?? '',
    periodStart: resource.period?.start,
    periodEnd: resource.period?.end,
    serviceProviderId: extractReferenceId(resource.serviceProvider?.reference),
  };
}

export interface MedsphereObservation {
  id: UUID;
  organizationId: UUID;
  patientId?: UUID;
  fhirVersion: 'R4';
  lastSyncedAt: ISODateString;
  raw: FhirObservationResource;
}

export interface MedsphereObservationInput {
  id: UUID;
  organizationId: UUID;
  patientId?: UUID;
  version?: number;
  updatedAt: ISODateString;
  identifiers?: Array<{ system: string; value: string; use?: string }>;
  extensions?: Record<string, unknown>;
  encounterId?: unknown;
  code?: unknown;
  value?: unknown;
  unit?: unknown;
  effectiveDateTime?: unknown;
  status?: unknown;
}

export interface FhirObservationResource {
  resourceType: 'Observation';
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

export function medsphereObservationToFhir(input: MedsphereObservationInput): FhirObservationResource {
  return {
    resourceType: 'Observation',
    id: input.id,
    meta: {
      versionId: String(input.version ?? 1),
      lastUpdated: input.updatedAt,
      profile: ['http://medsphere.health/fhir/StructureDefinition/Observation'],
    },
    identifier: input.identifiers?.map((id) => ({
      system: id.system,
      value: id.value,
      use: id.use ?? 'official',
    })),
    extension: Object.entries(input.extensions ?? {}).map(([url, value]) => ({ url, valueString: String(value) })),
    subject: { reference: `Patient/${input.patientId}` },
    encounter: input.encounterId ? { reference: `Encounter/${input.encounterId}` } : undefined,
    code: buildCodeableConcept(input.codeSystem, input.code, input.display),
    valueQuantity: input.value != null ? { value: input.value, unit: input.unit ?? 'unit' } : undefined,
    unit: input.unit,
    effectiveDateTime: input.effectiveDateTime,
    status: input.status.toLowerCase(),
    
  };
}

export function fhirObservationToMedsphere(resource: FhirObservationResource, organizationId: UUID): MedsphereObservationInput {
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
    encounterId: extractReferenceId(resource.encounter?.reference),
    code: resource.code?.coding?.[0]?.code ?? '',
    value: resource.valueQuantity?.value,
    unit: resource.valueQuantity?.unit,
    effectiveDateTime: resource.effectiveDateTime,
    status: String(resource.status ?? 'unknown').toUpperCase(),
  };
}

export interface MedsphereMedicationRequest {
  id: UUID;
  organizationId: UUID;
  patientId?: UUID;
  fhirVersion: 'R4';
  lastSyncedAt: ISODateString;
  raw: FhirMedicationRequestResource;
}

export interface MedsphereMedicationRequestInput {
  id: UUID;
  organizationId: UUID;
  patientId?: UUID;
  version?: number;
  updatedAt: ISODateString;
  identifiers?: Array<{ system: string; value: string; use?: string }>;
  extensions?: Record<string, unknown>;
  medicationCode?: unknown;
  dosageInstruction?: unknown;
  status?: unknown;
  authoredOn?: unknown;
  requester?: unknown;
}

export interface FhirMedicationRequestResource {
  resourceType: 'MedicationRequest';
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

export function medsphereMedicationRequestToFhir(input: MedsphereMedicationRequestInput): FhirMedicationRequestResource {
  return {
    resourceType: 'MedicationRequest',
    id: input.id,
    meta: {
      versionId: String(input.version ?? 1),
      lastUpdated: input.updatedAt,
      profile: ['http://medsphere.health/fhir/StructureDefinition/MedicationRequest'],
    },
    identifier: input.identifiers?.map((id) => ({
      system: id.system,
      value: id.value,
      use: id.use ?? 'official',
    })),
    extension: Object.entries(input.extensions ?? {}).map(([url, value]) => ({ url, valueString: String(value) })),
    subject: { reference: `Patient/${input.patientId}` },
    medicationCodeableConcept: buildCodeableConcept(input.codeSystem, input.medicationCode, input.medicationDisplay),
    dosageInstruction: input.dosageInstruction ? [{ text: input.dosageInstruction }] : undefined,
    status: input.status.toLowerCase(),
    authoredOn: input.authoredOn,
    requester: input.requesterId ? { reference: `Practitioner/${input.requesterId}` } : undefined,
    
  };
}

export function fhirMedicationRequestToMedsphere(resource: FhirMedicationRequestResource, organizationId: UUID): MedsphereMedicationRequestInput {
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
    medicationCode: resource.medicationCodeableConcept?.coding?.[0]?.code ?? '',
    dosageInstruction: resource.dosageInstruction?.[0]?.text,
    status: String(resource.status ?? 'unknown').toUpperCase(),
    authoredOn: resource.authoredOn,
    requesterId: extractReferenceId(resource.requester?.reference),
  };
}

export interface MedsphereDiagnosticReport {
  id: UUID;
  organizationId: UUID;
  patientId?: UUID;
  fhirVersion: 'R4';
  lastSyncedAt: ISODateString;
  raw: FhirDiagnosticReportResource;
}

export interface MedsphereDiagnosticReportInput {
  id: UUID;
  organizationId: UUID;
  patientId?: UUID;
  version?: number;
  updatedAt: ISODateString;
  identifiers?: Array<{ system: string; value: string; use?: string }>;
  extensions?: Record<string, unknown>;
  code?: unknown;
  conclusion?: unknown;
  issued?: unknown;
  status?: unknown;
  performer?: unknown;
}

export interface FhirDiagnosticReportResource {
  resourceType: 'DiagnosticReport';
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

export function medsphereDiagnosticReportToFhir(input: MedsphereDiagnosticReportInput): FhirDiagnosticReportResource {
  return {
    resourceType: 'DiagnosticReport',
    id: input.id,
    meta: {
      versionId: String(input.version ?? 1),
      lastUpdated: input.updatedAt,
      profile: ['http://medsphere.health/fhir/StructureDefinition/DiagnosticReport'],
    },
    identifier: input.identifiers?.map((id) => ({
      system: id.system,
      value: id.value,
      use: id.use ?? 'official',
    })),
    extension: Object.entries(input.extensions ?? {}).map(([url, value]) => ({ url, valueString: String(value) })),
    subject: { reference: `Patient/${input.patientId}` },
    code: buildCodeableConcept(input.codeSystem, input.code, input.display),
    conclusion: input.conclusion,
    issued: input.issued,
    status: input.status.toLowerCase(),
    performer: input.performerId ? [{ reference: `Practitioner/${input.performerId}` }] : undefined,
    
  };
}

export function fhirDiagnosticReportToMedsphere(resource: FhirDiagnosticReportResource, organizationId: UUID): MedsphereDiagnosticReportInput {
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
    code: resource.code?.coding?.[0]?.code ?? '',
    conclusion: resource.conclusion,
    issued: resource.issued,
    status: String(resource.status ?? 'unknown').toUpperCase(),
    performerId: extractReferenceId(resource.performer?.[0]?.reference),
  };
}

export interface MedsphereCondition {
  id: UUID;
  organizationId: UUID;
  patientId?: UUID;
  fhirVersion: 'R4';
  lastSyncedAt: ISODateString;
  raw: FhirConditionResource;
}

export interface MedsphereConditionInput {
  id: UUID;
  organizationId: UUID;
  patientId?: UUID;
  version?: number;
  updatedAt: ISODateString;
  identifiers?: Array<{ system: string; value: string; use?: string }>;
  extensions?: Record<string, unknown>;
  code?: unknown;
  clinicalStatus?: unknown;
  verificationStatus?: unknown;
  onsetDateTime?: unknown;
}

export interface FhirConditionResource {
  resourceType: 'Condition';
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

export function medsphereConditionToFhir(input: MedsphereConditionInput): FhirConditionResource {
  return {
    resourceType: 'Condition',
    id: input.id,
    meta: {
      versionId: String(input.version ?? 1),
      lastUpdated: input.updatedAt,
      profile: ['http://medsphere.health/fhir/StructureDefinition/Condition'],
    },
    identifier: input.identifiers?.map((id) => ({
      system: id.system,
      value: id.value,
      use: id.use ?? 'official',
    })),
    extension: Object.entries(input.extensions ?? {}).map(([url, value]) => ({ url, valueString: String(value) })),
    subject: { reference: `Patient/${input.patientId}` },
    code: buildCodeableConcept(input.codeSystem, input.code, input.display),
    clinicalStatus: { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/condition-clinical', code: input.clinicalStatus }] },
    verificationStatus: { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/condition-ver-status', code: input.verificationStatus }] },
    onsetDateTime: input.onsetDateTime,
    
  };
}

export function fhirConditionToMedsphere(resource: FhirConditionResource, organizationId: UUID): MedsphereConditionInput {
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
    code: resource.code?.coding?.[0]?.code ?? '',
    clinicalStatus: resource.clinicalStatus?.coding?.[0]?.code ?? 'unknown',
    verificationStatus: resource.verificationStatus?.coding?.[0]?.code ?? 'unknown',
    onsetDateTime: resource.onsetDateTime,
  };
}

export interface MedsphereProcedure {
  id: UUID;
  organizationId: UUID;
  patientId?: UUID;
  fhirVersion: 'R4';
  lastSyncedAt: ISODateString;
  raw: FhirProcedureResource;
}

export interface MedsphereProcedureInput {
  id: UUID;
  organizationId: UUID;
  patientId?: UUID;
  version?: number;
  updatedAt: ISODateString;
  identifiers?: Array<{ system: string; value: string; use?: string }>;
  extensions?: Record<string, unknown>;
  code?: unknown;
  status?: unknown;
  performedDateTime?: unknown;
  performer?: unknown;
}

export interface FhirProcedureResource {
  resourceType: 'Procedure';
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

export function medsphereProcedureToFhir(input: MedsphereProcedureInput): FhirProcedureResource {
  return {
    resourceType: 'Procedure',
    id: input.id,
    meta: {
      versionId: String(input.version ?? 1),
      lastUpdated: input.updatedAt,
      profile: ['http://medsphere.health/fhir/StructureDefinition/Procedure'],
    },
    identifier: input.identifiers?.map((id) => ({
      system: id.system,
      value: id.value,
      use: id.use ?? 'official',
    })),
    extension: Object.entries(input.extensions ?? {}).map(([url, value]) => ({ url, valueString: String(value) })),
    subject: { reference: `Patient/${input.patientId}` },
    code: buildCodeableConcept(input.codeSystem, input.code, input.display),
    status: input.status.toLowerCase(),
    performedDateTime: input.performedDateTime,
    performer: input.performerId ? [{ reference: `Practitioner/${input.performerId}` }] : undefined,
    
  };
}

export function fhirProcedureToMedsphere(resource: FhirProcedureResource, organizationId: UUID): MedsphereProcedureInput {
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
    code: resource.code?.coding?.[0]?.code ?? '',
    status: String(resource.status ?? 'unknown').toUpperCase(),
    performedDateTime: resource.performedDateTime,
    performerId: extractReferenceId(resource.performer?.[0]?.reference),
  };
}

export interface MedsphereAllergyIntolerance {
  id: UUID;
  organizationId: UUID;
  patientId?: UUID;
  fhirVersion: 'R4';
  lastSyncedAt: ISODateString;
  raw: FhirAllergyIntoleranceResource;
}

export interface MedsphereAllergyIntoleranceInput {
  id: UUID;
  organizationId: UUID;
  patientId?: UUID;
  version?: number;
  updatedAt: ISODateString;
  identifiers?: Array<{ system: string; value: string; use?: string }>;
  extensions?: Record<string, unknown>;
  code?: unknown;
  criticality?: unknown;
  clinicalStatus?: unknown;
  recordedDate?: unknown;
}

export interface FhirAllergyIntoleranceResource {
  resourceType: 'AllergyIntolerance';
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

export function medsphereAllergyIntoleranceToFhir(input: MedsphereAllergyIntoleranceInput): FhirAllergyIntoleranceResource {
  return {
    resourceType: 'AllergyIntolerance',
    id: input.id,
    meta: {
      versionId: String(input.version ?? 1),
      lastUpdated: input.updatedAt,
      profile: ['http://medsphere.health/fhir/StructureDefinition/AllergyIntolerance'],
    },
    identifier: input.identifiers?.map((id) => ({
      system: id.system,
      value: id.value,
      use: id.use ?? 'official',
    })),
    extension: Object.entries(input.extensions ?? {}).map(([url, value]) => ({ url, valueString: String(value) })),
    subject: { reference: `Patient/${input.patientId}` },
    code: buildCodeableConcept(input.codeSystem, input.code, input.display),
    criticality: input.criticality?.toLowerCase(),
    clinicalStatus: { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/condition-clinical', code: input.clinicalStatus }] },
    recordedDate: input.recordedDate,
    
  };
}

export function fhirAllergyIntoleranceToMedsphere(resource: FhirAllergyIntoleranceResource, organizationId: UUID): MedsphereAllergyIntoleranceInput {
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
    code: resource.code?.coding?.[0]?.code ?? '',
    criticality: resource.criticality,
    clinicalStatus: resource.clinicalStatus?.coding?.[0]?.code ?? 'unknown',
    recordedDate: resource.recordedDate,
  };
}

export type FhirMappableResource =
  | FhirPatientResource
  | FhirEncounterResource
  | FhirObservationResource
  | FhirMedicationRequestResource
  | FhirDiagnosticReportResource
  | FhirConditionResource
  | FhirProcedureResource
  | FhirAllergyIntoleranceResource;

export function validateFhirResource(resource: FhirMappableResource): boolean {
  return Boolean(resource.resourceType && typeof resource.resourceType === 'string');
}
