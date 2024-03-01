#!/usr/bin/env python3
"""
Generate MedSphere clinical Prisma model fragments under packages/database/prisma/models/.

Run from repository root:
  python tools/codegen/generate_clinical_fragments.py
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import Iterable

REPO_ROOT = Path(__file__).resolve().parents[2]
MODELS_DIR = REPO_ROOT / "packages" / "database" / "prisma" / "models"


def pascal_to_snake(name: str) -> str:
    s1 = re.sub(r"(.)([A-Z][a-z]+)", r"\1_\2", name)
    return re.sub(r"([a-z0-9])([A-Z])", r"\1_\2", s1).lower()


def pluralize_snake(name: str) -> str:
    if name.endswith("y") and not name.endswith(("ay", "ey", "iy", "oy", "uy")):
        return name[:-1] + "ies"
    if name.endswith(("s", "x", "z", "ch", "sh")):
        return name + "es"
    return name + "s"


@dataclass
class FieldSpec:
    name: str
    prisma_type: str
    optional: bool = False
    map_name: str | None = None
    default: str | None = None
    attrs: str = ""

    def render(self) -> str:
        opt = "?" if self.optional else ""
        parts = [f"  {self.name}{opt}", self.prisma_type]
        if self.map_name:
            parts.append(f'@map("{self.map_name}")')
        if self.default:
            parts.append(f"@default({self.default})")
        if self.attrs:
            parts.append(self.attrs)
        return " ".join(parts)


@dataclass
class ModelSpec:
    name: str
    fields: list[FieldSpec] = field(default_factory=list)
    indexes: list[str] = field(default_factory=list)
    uniques: list[str] = field(default_factory=list)
    tenant_scoped: bool = True
    soft_delete: bool = True
    versioned: bool = True
    parent_fks: list[tuple[str, str]] = field(default_factory=list)
    extra_header: str = ""

    def base_fields(self) -> list[FieldSpec]:
        fields: list[FieldSpec] = [
            FieldSpec("id", "String", attrs='@id @default(dbgenerated("gen_random_uuid()")) @db.Uuid'),
        ]
        if self.tenant_scoped:
            fields.append(FieldSpec("organizationId", "String", map_name="organization_id", attrs="@db.Uuid"))
        fields.extend(self.fields)
        existing = {f.name for f in fields}
        for fk_name, _ in self.parent_fks:
            if fk_name in existing:
                continue
            snake = pascal_to_snake(fk_name[:-2]) + "_id" if fk_name.endswith("Id") else pascal_to_snake(fk_name)
            fields.append(FieldSpec(fk_name, "String", map_name=snake, attrs="@db.Uuid"))
        fields.extend(
            [
                FieldSpec("createdAt", "DateTime", map_name="created_at", default="now()", attrs="@db.Timestamptz(6)"),
                FieldSpec("updatedAt", "DateTime", map_name="updated_at", attrs="@updatedAt @db.Timestamptz(6)"),
            ]
        )
        if self.soft_delete:
            fields.append(FieldSpec("deletedAt", "DateTime", optional=True, map_name="deleted_at", attrs="@db.Timestamptz(6)"))
        if self.versioned:
            fields.append(FieldSpec("version", "Int", default="1"))
        return fields

    def render(self) -> str:
        lines = []
        if self.extra_header:
            lines.append(self.extra_header)
        lines.append(f"model {self.name} {{")
        for f in self.base_fields():
            lines.append(f.render())
        for fk_name, relation_model in self.parent_fks:
            rel_field = fk_name[0].lower() + fk_name[1:]
            lines.append(f"  {rel_field[:-2] if rel_field.endswith('Id') else rel_field} {relation_model} @relation(fields: [{fk_name}], references: [id])")
        default_indexes = []
        if self.tenant_scoped:
            default_indexes.append("organizationId")
        if self.soft_delete:
            default_indexes.append("deletedAt")
        all_indexes = list(dict.fromkeys(default_indexes + self.indexes))
        for idx in all_indexes:
            if " " in idx or idx.startswith("["):
                lines.append(f"  @@index([{idx}])")
            else:
                lines.append(f"  @@index([{idx}])")
        for uq in self.uniques:
            lines.append(f"  @@unique([{uq}])")
        table = pluralize_snake(pascal_to_snake(self.name))
        lines.append(f'  @@map("{table}")')
        lines.append("}")
        return "\n".join(lines)


def clinical_field(name: str, prisma_type: str, **kwargs) -> FieldSpec:
    return FieldSpec(name, prisma_type, **kwargs)


def simple_model(
    name: str,
    domain_fields: Iterable[FieldSpec],
    *,
    tenant_scoped: bool = True,
    soft_delete: bool = True,
    versioned: bool = True,
    indexes: Iterable[str] = (),
    uniques: Iterable[str] = (),
    parent_fks: Iterable[tuple[str, str]] = (),
) -> ModelSpec:
    return ModelSpec(
        name=name,
        fields=list(domain_fields),
        indexes=list(indexes),
        uniques=list(uniques),
        tenant_scoped=tenant_scoped,
        soft_delete=soft_delete,
        versioned=versioned,
        parent_fks=list(parent_fks),
    )


# ---------------------------------------------------------------------------
# Domain-specific enum blocks (prepended to fragment files)
# ---------------------------------------------------------------------------

PATIENT_ENUMS = """
enum PatientRegistrationStatus {
  DRAFT
  PENDING_VERIFICATION
  ACTIVE
  INACTIVE
  MERGED
  DECEASED
}

enum AllergySeverity {
  MILD
  MODERATE
  SEVERE
  LIFE_THREATENING
  UNKNOWN
}

enum AllergyType {
  DRUG
  FOOD
  ENVIRONMENTAL
  OTHER
}

enum ConsentStatus {
  PENDING
  SIGNED
  REVOKED
  EXPIRED
}

enum DocumentType {
  IDENTIFICATION
  INSURANCE_CARD
  LAB_REPORT
  IMAGING_REPORT
  CONSENT
  REFERRAL
  PRESCRIPTION
  CLINICAL_NOTE
  OTHER
}

enum TimelineEventType {
  REGISTRATION
  APPOINTMENT
  ENCOUNTER
  LAB_ORDER
  LAB_RESULT
  PRESCRIPTION
  ADMISSION
  DISCHARGE
  BILLING
  INSURANCE
  DOCUMENT
  ALERT
  OTHER
}

enum VitalSignType {
  BLOOD_PRESSURE
  HEART_RATE
  RESPIRATORY_RATE
  TEMPERATURE
  SPO2
  WEIGHT
  HEIGHT
  BMI
  PAIN_SCORE
  GLUCOSE
}
"""

STAFF_ENUMS = """
enum CredentialStatus {
  ACTIVE
  EXPIRED
  REVOKED
  PENDING_VERIFICATION
}

enum ScheduleBlockType {
  AVAILABLE
  UNAVAILABLE
  BREAK
  ON_CALL
  SURGERY
  ADMIN
}

enum LeaveType {
  VACATION
  SICK
  PERSONAL
  MATERNITY
  PATERNITY
  UNPAID
  OTHER
}
"""

APPOINTMENT_ENUMS = """
enum AppointmentStatus {
  SCHEDULED
  CONFIRMED
  CHECKED_IN
  IN_PROGRESS
  COMPLETED
  CANCELLED
  NO_SHOW
  RESCHEDULED
}

enum AppointmentPriority {
  ROUTINE
  URGENT
  EMERGENT
  STAT
}

enum QueueStatus {
  WAITING
  CALLED
  IN_SERVICE
  COMPLETED
  SKIPPED
  CANCELLED
}

enum ReminderChannel {
  SMS
  EMAIL
  PUSH
  PHONE
  IN_APP
}
"""

EMR_ENUMS = """
enum EncounterClass {
  AMBULATORY
  EMERGENCY
  INPATIENT
  OBSERVATION
  VIRTUAL
  HOME_HEALTH
}

enum EncounterStatus {
  PLANNED
  ARRIVED
  IN_PROGRESS
  ON_HOLD
  FINISHED
  CANCELLED
}

enum ClinicalNoteStatus {
  DRAFT
  PRELIMINARY
  FINAL
  AMENDED
  ENTERED_IN_ERROR
}

enum ProblemStatus {
  ACTIVE
  RECURRING
  INACTIVE
  RESOLVED
}

enum MedicationOrderStatus {
  DRAFT
  ACTIVE
  ON_HOLD
  COMPLETED
  STOPPED
  CANCELLED
}
"""

LAB_ENUMS = """
enum LabOrderStatus {
  DRAFT
  ORDERED
  COLLECTED
  IN_TRANSIT
  RECEIVED
  IN_PROGRESS
  COMPLETED
  CANCELLED
  REJECTED
}

enum LabResultStatus {
  PRELIMINARY
  FINAL
  CORRECTED
  CANCELLED
  ENTERED_IN_ERROR
}

enum SpecimenStatus {
  COLLECTED
  IN_TRANSIT
  RECEIVED
  PROCESSING
  STORED
  DISPOSED
  REJECTED
}

enum LabValidationStatus {
  PENDING
  VALIDATED
  REJECTED
  REQUIRES_REVIEW
}
"""

RADIOLOGY_ENUMS = """
enum RadiologyModalityType {
  CT
  MRI
  US
  XR
  MG
  NM
  PT
  RF
  OTHER
}

enum RadiologyStudyStatus {
  SCHEDULED
  IN_PROGRESS
  COMPLETED
  PRELIMINARY
  FINAL
  CANCELLED
}

enum DicomTransferStatus {
  PENDING
  IN_PROGRESS
  COMPLETE
  FAILED
}
"""

PHARMACY_ENUMS = """
enum DrugSchedule {
  OTC
  RX
  CONTROLLED_II
  CONTROLLED_III
  CONTROLLED_IV
  CONTROLLED_V
}

enum InventoryTransactionType {
  RECEIPT
  DISPENSE
  ADJUSTMENT
  TRANSFER
  RETURN
  WASTE
  RECALL
}

enum DispenseStatus {
  PENDING
  IN_PROGRESS
  READY
  PICKED_UP
  DELIVERED
  CANCELLED
  RETURNED
}
"""

BILLING_ENUMS = """
enum InvoiceStatus {
  DRAFT
  ISSUED
  PARTIALLY_PAID
  PAID
  VOID
  WRITTEN_OFF
  COLLECTIONS
}

enum PaymentStatus {
  PENDING
  AUTHORIZED
  CAPTURED
  FAILED
  REFUNDED
  VOIDED
}

enum PaymentMethodType {
  CASH
  CARD
  CHECK
  ACH
  WIRE
  INSURANCE
  OTHER
}
"""

INSURANCE_ENUMS = """
enum ClaimStatus {
  DRAFT
  SUBMITTED
  ACCEPTED
  REJECTED
  PENDING
  PAID
  DENIED
  APPEALED
  CLOSED
}

enum EligibilityStatus {
  ACTIVE
  INACTIVE
  UNKNOWN
  PENDING
}

enum AuthorizationStatus {
  PENDING
  APPROVED
  DENIED
  PARTIAL
  EXPIRED
  CANCELLED
}
"""

TELEMEDICINE_ENUMS = """
enum TelemedicineSessionStatus {
  SCHEDULED
  WAITING
  IN_PROGRESS
  COMPLETED
  CANCELLED
  FAILED
}

enum ParticipantRole {
  PATIENT
  PROVIDER
  NURSE
  INTERPRETER
  OBSERVER
  CAREGIVER
}

enum RecordingStatus {
  NOT_RECORDED
  RECORDING
  PROCESSING
  AVAILABLE
  DELETED
  FAILED
}
"""

NOTIFICATION_ENUMS = """
enum NotificationStatus {
  PENDING
  QUEUED
  SENT
  DELIVERED
  FAILED
  BOUNCED
  READ
  CANCELLED
}

enum NotificationChannelType {
  EMAIL
  SMS
  PUSH
  IN_APP
  WEBHOOK
  VOICE
}
"""

PRESCRIPTION_ENUMS = """
enum PrescriptionStatus {
  DRAFT
  ACTIVE
  ON_HOLD
  COMPLETED
  CANCELLED
  EXPIRED
  DISCONTINUED
}

enum PrescriptionTransmissionStatus {
  PENDING
  TRANSMITTED
  ACKNOWLEDGED
  FAILED
  CANCELLED
}
"""

SEARCH_ENUMS = """
enum SearchIndexJobStatus {
  PENDING
  RUNNING
  COMPLETED
  FAILED
  CANCELLED
}

enum SearchEntityType {
  PATIENT
  ENCOUNTER
  LAB_RESULT
  RADIOLOGY_REPORT
  PRESCRIPTION
  DOCUMENT
  PROVIDER
  INVOICE
  OTHER
}
"""


def patient_models() -> list[ModelSpec]:
    models = []
    specs = [
        ("PatientProfile", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("preferredName", "String", optional=True, map_name="preferred_name"), clinical_field("middleName", "String", optional=True, map_name="middle_name"), clinical_field("suffix", "String", optional=True), clinical_field("nationalIdEncrypted", "String", optional=True, map_name="national_id_encrypted"), clinical_field("bloodType", "String", optional=True, map_name="blood_type"), clinical_field("maritalStatus", "String", optional=True, map_name="marital_status"), clinical_field("occupation", "String", optional=True), clinical_field("employer", "String", optional=True), clinical_field("registrationStatus", "PatientRegistrationStatus", map_name="registration_status", default="ACTIVE")], indexes=["patientId"], uniques=["organizationId, patientId"]),
        ("PatientAddress", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("addressType", "String", map_name="address_type"), clinical_field("line1", "String", map_name="address_line1"), clinical_field("line2", "String", optional=True, map_name="address_line2"), clinical_field("city", "String"), clinical_field("state", "String"), clinical_field("postalCode", "String", map_name="postal_code"), clinical_field("country", "String", default='"US"'), clinical_field("isPrimary", "Boolean", map_name="is_primary", default="true")], indexes=["patientId"]),
        ("PatientContact", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("contactType", "String", map_name="contact_type"), clinical_field("value", "String"), clinical_field("isPrimary", "Boolean", map_name="is_primary", default="false"), clinical_field("verifiedAt", "DateTime", optional=True, map_name="verified_at", attrs="@db.Timestamptz(6)")], indexes=["patientId", "contactType"]),
        ("PatientEmergencyContact", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("name", "String"), clinical_field("relationship", "String"), clinical_field("phone", "String"), clinical_field("email", "String", optional=True), clinical_field("isPrimary", "Boolean", map_name="is_primary", default="false"), clinical_field("priority", "Int", default="1")], indexes=["patientId"]),
        ("PatientMedicalHistory", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("conditionCode", "String", map_name="condition_code"), clinical_field("conditionName", "String", map_name="condition_name"), clinical_field("onsetDate", "DateTime", optional=True, map_name="onset_date", attrs="@db.Date"), clinical_field("resolvedDate", "DateTime", optional=True, map_name="resolved_date", attrs="@db.Date"), clinical_field("notes", "String", optional=True), clinical_field("recordedById", "String", optional=True, map_name="recorded_by_id", attrs="@db.Uuid")], indexes=["patientId", "conditionCode"]),
        ("PatientFamilyHistory", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("relationship", "String"), clinical_field("conditionCode", "String", map_name="condition_code"), clinical_field("conditionName", "String", map_name="condition_name"), clinical_field("ageAtOnset", "Int", optional=True, map_name="age_at_onset"), clinical_field("deceased", "Boolean", default="false"), clinical_field("notes", "String", optional=True)], indexes=["patientId"]),
        ("PatientAllergy", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("allergen", "String"), clinical_field("allergyType", "AllergyType", map_name="allergy_type"), clinical_field("severity", "AllergySeverity"), clinical_field("reaction", "String", optional=True), clinical_field("onsetDate", "DateTime", optional=True, map_name="onset_date", attrs="@db.Date"), clinical_field("verified", "Boolean", default="false"), clinical_field("verifiedById", "String", optional=True, map_name="verified_by_id", attrs="@db.Uuid")], indexes=["patientId", "allergen"]),
        ("PatientAllergyReaction", [clinical_field("patientAllergyId", "String", map_name="patient_allergy_id", attrs="@db.Uuid"), clinical_field("reactionCode", "String", map_name="reaction_code"), clinical_field("description", "String"), clinical_field("severity", "AllergySeverity"), clinical_field("observedAt", "DateTime", optional=True, map_name="observed_at", attrs="@db.Timestamptz(6)")], indexes=["patientAllergyId"], parent_fks=[("patientAllergyId", "PatientAllergy")]),
        ("PatientVaccination", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("vaccineCode", "String", map_name="vaccine_code"), clinical_field("vaccineName", "String", map_name="vaccine_name"), clinical_field("doseNumber", "Int", map_name="dose_number"), clinical_field("administeredAt", "DateTime", map_name="administered_at", attrs="@db.Timestamptz(6)"), clinical_field("lotNumber", "String", optional=True, map_name="lot_number"), clinical_field("site", "String", optional=True), clinical_field("route", "String", optional=True), clinical_field("administeredById", "String", optional=True, map_name="administered_by_id", attrs="@db.Uuid")], indexes=["patientId", "vaccineCode"]),
        ("PatientVitalSign", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("vitalType", "VitalSignType", map_name="vital_type"), clinical_field("valueNumeric", "Decimal", optional=True, map_name="value_numeric", attrs="@db.Decimal(12, 4)"), clinical_field("valueText", "String", optional=True, map_name="value_text"), clinical_field("unit", "String", optional=True), clinical_field("recordedAt", "DateTime", map_name="recorded_at", attrs="@db.Timestamptz(6)"), clinical_field("recordedById", "String", optional=True, map_name="recorded_by_id", attrs="@db.Uuid"), clinical_field("encounterId", "String", optional=True, map_name="encounter_id", attrs="@db.Uuid")], indexes=["patientId", "recordedAt"]),
        ("PatientVitalBatch", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("encounterId", "String", optional=True, map_name="encounter_id", attrs="@db.Uuid"), clinical_field("recordedAt", "DateTime", map_name="recorded_at", attrs="@db.Timestamptz(6)"), clinical_field("recordedById", "String", optional=True, map_name="recorded_by_id", attrs="@db.Uuid"), clinical_field("notes", "String", optional=True)], indexes=["patientId"]),
        ("PatientConsentForm", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("formCode", "String", map_name="form_code"), clinical_field("title", "String"), clinical_field("content", "String"), clinical_field("versionNumber", "Int", map_name="version_number", default="1"), clinical_field("status", "ConsentStatus"), clinical_field("signedAt", "DateTime", optional=True, map_name="signed_at", attrs="@db.Timestamptz(6)"), clinical_field("expiresAt", "DateTime", optional=True, map_name="expires_at", attrs="@db.Timestamptz(6)")], indexes=["patientId", "formCode"]),
        ("PatientConsentSignature", [clinical_field("consentFormId", "String", map_name="consent_form_id", attrs="@db.Uuid"), clinical_field("signerName", "String", map_name="signer_name"), clinical_field("signerRole", "String", map_name="signer_role"), clinical_field("signatureData", "String", map_name="signature_data"), clinical_field("signedAt", "DateTime", map_name="signed_at", attrs="@db.Timestamptz(6)"), clinical_field("ipAddress", "String", optional=True, map_name="ip_address")], indexes=["consentFormId"], parent_fks=[("consentFormId", "PatientConsentForm")]),
        ("PatientDocument", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("documentType", "DocumentType", map_name="document_type"), clinical_field("title", "String"), clinical_field("description", "String", optional=True), clinical_field("storageKey", "String", map_name="storage_key"), clinical_field("mimeType", "String", map_name="mime_type"), clinical_field("fileSizeBytes", "BigInt", map_name="file_size_bytes"), clinical_field("uploadedById", "String", optional=True, map_name="uploaded_by_id", attrs="@db.Uuid")], indexes=["patientId", "documentType"]),
        ("PatientDocumentVersion", [clinical_field("documentId", "String", map_name="document_id", attrs="@db.Uuid"), clinical_field("versionNumber", "Int", map_name="version_number"), clinical_field("storageKey", "String", map_name="storage_key"), clinical_field("checksum", "String"), clinical_field("uploadedById", "String", optional=True, map_name="uploaded_by_id", attrs="@db.Uuid")], indexes=["documentId"], uniques=["documentId, versionNumber"], parent_fks=[("documentId", "PatientDocument")]),
        ("PatientTimelineEvent", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("eventType", "TimelineEventType", map_name="event_type"), clinical_field("title", "String"), clinical_field("summary", "String", optional=True), clinical_field("resourceType", "String", map_name="resource_type"), clinical_field("resourceId", "String", map_name="resource_id", attrs="@db.Uuid"), clinical_field("occurredAt", "DateTime", map_name="occurred_at", attrs="@db.Timestamptz(6)"), clinical_field("actorId", "String", optional=True, map_name="actor_id", attrs="@db.Uuid")], indexes=["patientId", "occurredAt"]),
        ("PatientRegistration", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("facilityId", "String", optional=True, map_name="facility_id", attrs="@db.Uuid"), clinical_field("registeredAt", "DateTime", map_name="registered_at", attrs="@db.Timestamptz(6)"), clinical_field("registeredById", "String", optional=True, map_name="registered_by_id", attrs="@db.Uuid"), clinical_field("source", "String", optional=True), clinical_field("status", "PatientRegistrationStatus", default="ACTIVE")], indexes=["patientId"]),
        ("PatientIdentifier", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("system", "String"), clinical_field("value", "String"), clinical_field("isPrimary", "Boolean", map_name="is_primary", default="false")], indexes=["patientId"], uniques=["organizationId, system, value"]),
        ("PatientPreference", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("category", "String"), clinical_field("key", "String"), clinical_field("value", "Json", default="{}")], indexes=["patientId"], uniques=["patientId, category, key"]),
        ("PatientCommunicationPreference", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("channel", "ReminderChannel", map_name="channel"), clinical_field("enabled", "Boolean", default="true"), clinical_field("preferredTimeStart", "String", optional=True, map_name="preferred_time_start"), clinical_field("preferredTimeEnd", "String", optional=True, map_name="preferred_time_end")], indexes=["patientId"], uniques=["patientId, channel"]),
        ("PatientPortalAccount", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("userId", "String", optional=True, map_name="user_id", attrs="@db.Uuid"), clinical_field("username", "String"), clinical_field("lastLoginAt", "DateTime", optional=True, map_name="last_login_at", attrs="@db.Timestamptz(6)"), clinical_field("isActive", "Boolean", map_name="is_active", default="true")], indexes=["patientId"], uniques=["organizationId, username"]),
        ("PatientPhoto", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("storageKey", "String", map_name="storage_key"), clinical_field("mimeType", "String", map_name="mime_type"), clinical_field("capturedAt", "DateTime", optional=True, map_name="captured_at", attrs="@db.Timestamptz(6)")], indexes=["patientId"]),
        ("PatientSocialHistory", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("smokingStatus", "String", optional=True, map_name="smoking_status"), clinical_field("alcoholUse", "String", optional=True, map_name="alcohol_use"), clinical_field("substanceUse", "String", optional=True, map_name="substance_use"), clinical_field("exerciseFrequency", "String", optional=True, map_name="exercise_frequency"), clinical_field("dietNotes", "String", optional=True, map_name="diet_notes")], indexes=["patientId"], uniques=["patientId"]),
        ("PatientTravelHistory", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("destination", "String"), clinical_field("departureDate", "DateTime", optional=True, map_name="departure_date", attrs="@db.Date"), clinical_field("returnDate", "DateTime", optional=True, map_name="return_date", attrs="@db.Date"), clinical_field("purpose", "String", optional=True), clinical_field("notes", "String", optional=True)], indexes=["patientId"]),
        ("PatientImmunizationSchedule", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("vaccineCode", "String", map_name="vaccine_code"), clinical_field("dueDate", "DateTime", map_name="due_date", attrs="@db.Date"), clinical_field("completed", "Boolean", default="false"), clinical_field("completedAt", "DateTime", optional=True, map_name="completed_at", attrs="@db.Timestamptz(6)")], indexes=["patientId", "dueDate"]),
        ("PatientGrowthChart", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("measurementDate", "DateTime", map_name="measurement_date", attrs="@db.Date"), clinical_field("heightCm", "Decimal", optional=True, map_name="height_cm", attrs="@db.Decimal(6, 2)"), clinical_field("weightKg", "Decimal", optional=True, map_name="weight_kg", attrs="@db.Decimal(6, 2)"), clinical_field("headCircumCm", "Decimal", optional=True, map_name="head_circum_cm", attrs="@db.Decimal(6, 2)"), clinical_field("percentileHeight", "Decimal", optional=True, map_name="percentile_height", attrs="@db.Decimal(5, 2)"), clinical_field("percentileWeight", "Decimal", optional=True, map_name="percentile_weight", attrs="@db.Decimal(5, 2)")], indexes=["patientId"]),
        ("PatientRiskScore", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("scoreType", "String", map_name="score_type"), clinical_field("scoreValue", "Decimal", map_name="score_value", attrs="@db.Decimal(8, 4)"), clinical_field("calculatedAt", "DateTime", map_name="calculated_at", attrs="@db.Timestamptz(6)"), clinical_field("factors", "Json", default="{}")], indexes=["patientId", "scoreType"]),
        ("PatientCareTeamMember", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("providerId", "String", map_name="provider_id", attrs="@db.Uuid"), clinical_field("role", "String"), clinical_field("isPrimary", "Boolean", map_name="is_primary", default="false"), clinical_field("startDate", "DateTime", map_name="start_date", attrs="@db.Date"), clinical_field("endDate", "DateTime", optional=True, map_name="end_date", attrs="@db.Date")], indexes=["patientId", "providerId"]),
        ("PatientReferral", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("referringProviderId", "String", optional=True, map_name="referring_provider_id", attrs="@db.Uuid"), clinical_field("referredToProviderId", "String", optional=True, map_name="referred_to_provider_id", attrs="@db.Uuid"), clinical_field("reason", "String"), clinical_field("priority", "AppointmentPriority", default="ROUTINE"), clinical_field("status", "String", default='"PENDING"'), clinical_field("referralDate", "DateTime", map_name="referral_date", attrs="@db.Date")], indexes=["patientId", "status"]),
        ("PatientMergeRecord", [clinical_field("sourcePatientId", "String", map_name="source_patient_id", attrs="@db.Uuid"), clinical_field("targetPatientId", "String", map_name="target_patient_id", attrs="@db.Uuid"), clinical_field("mergedAt", "DateTime", map_name="merged_at", attrs="@db.Timestamptz(6)"), clinical_field("mergedById", "String", optional=True, map_name="merged_by_id", attrs="@db.Uuid"), clinical_field("reason", "String", optional=True)], indexes=["sourcePatientId", "targetPatientId"]),
        ("PatientDuplicateCandidate", [clinical_field("patientIdA", "String", map_name="patient_id_a", attrs="@db.Uuid"), clinical_field("patientIdB", "String", map_name="patient_id_b", attrs="@db.Uuid"), clinical_field("matchScore", "Decimal", map_name="match_score", attrs="@db.Decimal(5, 4)"), clinical_field("matchReason", "String", map_name="match_reason"), clinical_field("reviewed", "Boolean", default="false"), clinical_field("reviewedById", "String", optional=True, map_name="reviewed_by_id", attrs="@db.Uuid")], indexes=["patientIdA", "patientIdB"]),
        ("PatientFlag", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("flagCode", "String", map_name="flag_code"), clinical_field("severity", "String"), clinical_field("message", "String"), clinical_field("active", "Boolean", default="true"), clinical_field("expiresAt", "DateTime", optional=True, map_name="expires_at", attrs="@db.Timestamptz(6)")], indexes=["patientId", "flagCode"]),
        ("PatientAlert", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("alertType", "String", map_name="alert_type"), clinical_field("title", "String"), clinical_field("body", "String"), clinical_field("acknowledged", "Boolean", default="false"), clinical_field("acknowledgedAt", "DateTime", optional=True, map_name="acknowledged_at", attrs="@db.Timestamptz(6)"), clinical_field("acknowledgedById", "String", optional=True, map_name="acknowledged_by_id", attrs="@db.Uuid")], indexes=["patientId", "acknowledged"]),
        ("PatientNote", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("noteType", "String", map_name="note_type"), clinical_field("content", "String"), clinical_field("authorId", "String", optional=True, map_name="author_id", attrs="@db.Uuid"), clinical_field("isPinned", "Boolean", map_name="is_pinned", default="false")], indexes=["patientId"]),
        ("PatientAdvanceDirective", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("directiveType", "String", map_name="directive_type"), clinical_field("documentId", "String", optional=True, map_name="document_id", attrs="@db.Uuid"), clinical_field("effectiveDate", "DateTime", map_name="effective_date", attrs="@db.Date"), clinical_field("expiresAt", "DateTime", optional=True, map_name="expires_at", attrs="@db.Date"), clinical_field("notes", "String", optional=True)], indexes=["patientId"]),
        ("PatientInsuranceInfo", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("payerId", "String", optional=True, map_name="payer_id", attrs="@db.Uuid"), clinical_field("memberId", "String", map_name="member_id"), clinical_field("groupNumber", "String", optional=True, map_name="group_number"), clinical_field("planName", "String", optional=True, map_name="plan_name"), clinical_field("isPrimary", "Boolean", map_name="is_primary", default="true"), clinical_field("effectiveDate", "DateTime", optional=True, map_name="effective_date", attrs="@db.Date"), clinical_field("terminationDate", "DateTime", optional=True, map_name="termination_date", attrs="@db.Date")], indexes=["patientId", "memberId"]),
        ("PatientLanguage", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("languageCode", "String", map_name="language_code"), clinical_field("proficiency", "String", optional=True), clinical_field("isPreferred", "Boolean", map_name="is_preferred", default="false")], indexes=["patientId"]),
        ("PatientEthnicity", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("ethnicityCode", "String", map_name="ethnicity_code"), clinical_field("ethnicityName", "String", map_name="ethnicity_name")], indexes=["patientId"]),
        ("PatientReligion", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("religionCode", "String", map_name="religion_code"), clinical_field("religionName", "String", map_name="religion_name")], indexes=["patientId"]),
        ("PatientExternalId", [clinical_field("patientId", "String", map_name="patient_id", attrs="@db.Uuid"), clinical_field("externalSystem", "String", map_name="external_system"), clinical_field("externalId", "String", map_name="external_id")], indexes=["patientId"], uniques=["organizationId, externalSystem, externalId"]),
    ]
    for name, fields, *rest in specs:
        kw = {}
        if rest:
            kw = rest[0]
        models.append(simple_model(name, fields, **kw))
    return models


def _uuid(name: str, optional: bool = False) -> FieldSpec:
    snake = pascal_to_snake(name.replace("Id", "")) + "_id" if name.endswith("Id") else pascal_to_snake(name)
    if name.endswith("Id"):
        snake = pascal_to_snake(name[:-2]) + "_id"
    return clinical_field(name, "String", optional=optional, map_name=snake, attrs="@db.Uuid")


def _ts(name: str, optional: bool = False) -> FieldSpec:
    return clinical_field(name, "DateTime", optional=optional, map_name=pascal_to_snake(name), attrs="@db.Timestamptz(6)")


def _date(name: str, optional: bool = False) -> FieldSpec:
    return clinical_field(name, "DateTime", optional=optional, map_name=pascal_to_snake(name), attrs="@db.Date")


def _str(name: str, optional: bool = False, **kw) -> FieldSpec:
    return clinical_field(name, "String", optional=optional, map_name=kw.pop("map_name", pascal_to_snake(name)), **kw)


def _dec(name: str, optional: bool = False) -> FieldSpec:
    return clinical_field(name, "Decimal", optional=optional, map_name=pascal_to_snake(name), attrs="@db.Decimal(14, 4)")


def _bool(name: str, default: str = "false") -> FieldSpec:
    return clinical_field(name, "Boolean", map_name=pascal_to_snake(name), default=default)


def _int(name: str, default: str | None = None, optional: bool = False) -> FieldSpec:
    return clinical_field(name, "Int", optional=optional, map_name=pascal_to_snake(name), default=default)


def _json(name: str) -> FieldSpec:
    return clinical_field(name, "Json", map_name=pascal_to_snake(name), default="{}")


def bulk_domain_models(
    names: list[str],
    *,
    base_fields: list[FieldSpec] | None = None,
    indexes: list[str] | None = None,
    tenant_scoped: bool = True,
    soft_delete: bool = True,
    versioned: bool = True,
) -> list[ModelSpec]:
    """Generate field-complete models from names with shared domain base fields."""
    base = base_fields or [_uuid("patientId"), _str("status", default='"ACTIVE"'), _str("notes", optional=True)]
    idx = indexes or ["patientId"]
    return [
        simple_model(
            name,
            base + [_str(f"{pascal_to_snake(name)}Code", map_name=f"{pascal_to_snake(name)}_code"), _str("description", optional=True)],
            tenant_scoped=tenant_scoped,
            soft_delete=soft_delete,
            versioned=versioned,
            indexes=idx,
        )
        for name in names
    ]


def staff_models() -> list[ModelSpec]:
    base = [_uuid("userId"), _uuid("facilityId", optional=True)]
    names = [
        "DoctorProfile", "NurseProfile", "StaffProfile", "Specialty", "DoctorSpecialty",
        "Credential", "DoctorCredential", "License", "StaffLicense", "StaffSchedule",
        "StaffScheduleBlock", "StaffAvailability", "StaffLeave", "StaffOnCall",
        "StaffDepartmentAssignment", "StaffRoleExtension", "StaffCertification", "StaffTraining",
        "StaffPerformanceReview", "StaffContact", "StaffEmergencyContact", "StaffDocument",
        "StaffPrivilege", "StaffCredentialVerification", "ReferringPhysician", "CareTeam",
        "CareTeamProvider", "ProviderNetwork", "ProviderContract", "ProviderRating",
        "StaffCompetency", "StaffShiftSwap", "StaffOvertimeRecord", "StaffBadge",
        "StaffEquipmentAssignment", "StaffRoomAssignment", "StaffNotificationPreference",
    ]
    models = []
    for name in names:
        extra = [
            _str("title", optional=True),
            _str("bio", optional=True),
            _str("npiNumber", optional=True, map_name="npi_number"),
            _str("status", default='"ACTIVE"'),
            _date("effectiveDate", optional=True),
            _date("expirationDate", optional=True),
        ]
        models.append(simple_model(name, base + extra, indexes=["userId", "facilityId"]))
    return models


def appointment_models() -> list[ModelSpec]:
    models = [simple_model("Appointment", [
        _uuid("patientId"), _uuid("providerId"), _uuid("facilityId", optional=True),
        _str("appointmentNumber", map_name="appointment_number"),
        clinical_field("status", "AppointmentStatus", default="SCHEDULED"),
        clinical_field("priority", "AppointmentPriority", default="ROUTINE"),
        _ts("scheduledStart"), _ts("scheduledEnd"),
        _ts("actualStart", optional=True), _ts("actualEnd", optional=True),
        _str("reason"), _str("notes", optional=True),
    ], indexes=["patientId", "providerId", "scheduledStart"], uniques=["organizationId, appointmentNumber"])]

    child_names = [
        ("AppointmentType", []), ("AppointmentStatusHistory", [_uuid("appointmentId")]),
        ("AppointmentSlot", [_uuid("providerId")]), ("ProviderAvailability", [_uuid("providerId")]),
        ("ProviderAvailabilityException", [_uuid("providerId")]), ("AppointmentQueue", [_uuid("facilityId", optional=True)]),
        ("QueueEntry", [_uuid("appointmentId"), _uuid("queueId")]), ("AppointmentReminder", [_uuid("appointmentId")]),
        ("AppointmentReminderDelivery", [_uuid("reminderId")]), ("AppointmentCheckIn", [_uuid("appointmentId")]),
        ("AppointmentCheckOut", [_uuid("appointmentId")]), ("AppointmentCancellation", [_uuid("appointmentId")]),
        ("AppointmentReschedule", [_uuid("appointmentId")]), ("AppointmentResource", [_uuid("appointmentId")]),
        ("AppointmentRoom", [_uuid("appointmentId")]), ("AppointmentEquipment", [_uuid("appointmentId")]),
        ("WaitlistEntry", [_uuid("patientId"), _uuid("providerId", optional=True)]),
        ("AppointmentTemplate", []), ("RecurringAppointment", [_uuid("patientId"), _uuid("providerId")]),
        ("AppointmentNote", [_uuid("appointmentId")]), ("AppointmentAttachment", [_uuid("appointmentId")]),
        ("AppointmentBillingLink", [_uuid("appointmentId")]), ("AppointmentTelemedicineLink", [_uuid("appointmentId")]),
        ("AppointmentSurvey", [_uuid("appointmentId")]), ("AppointmentSurveyResponse", [_uuid("surveyId")]),
        ("AppointmentNoShow", [_uuid("appointmentId")]), ("AppointmentOverbooking", [_uuid("providerId")]),
        ("AppointmentPriorityRule", []), ("AppointmentReferralLink", [_uuid("appointmentId")]),
        ("AppointmentWaitTimeMetric", [_uuid("appointmentId")]), ("AppointmentResourceBooking", [_uuid("appointmentId")]),
    ]
    for name, extra_fks in child_names:
        fields = extra_fks + [
            _str("name", optional=True), _str("code", optional=True),
            _str("status", default='"ACTIVE"'), _str("notes", optional=True),
            _ts("occurredAt", optional=True), _json("metadata"),
        ]
        idx = [f.name for f in extra_fks if f.name.endswith("Id")] or ["organizationId"]
        parent_fks = []
        rel_map = {
            "appointmentId": "Appointment", "queueId": "AppointmentQueue",
            "reminderId": "AppointmentReminder", "surveyId": "AppointmentSurvey",
        }
        for fk in extra_fks:
            if fk.name in rel_map:
                parent_fks.append((fk.name, rel_map[fk.name]))
        models.append(simple_model(name, fields, indexes=idx, parent_fks=parent_fks))
    return models


def emr_models() -> list[ModelSpec]:
    models = [simple_model("Encounter", [
        _uuid("patientId"), _uuid("facilityId", optional=True), _uuid("providerId", optional=True),
        _str("encounterNumber", map_name="encounter_number"),
        clinical_field("encounterClass", "EncounterClass", map_name="encounter_class"),
        clinical_field("status", "EncounterStatus", default="PLANNED"),
        _ts("startedAt", optional=True), _ts("endedAt", optional=True),
        _str("chiefComplaint", optional=True, map_name="chief_complaint"),
        _str("dischargeDisposition", optional=True, map_name="discharge_disposition"),
    ], indexes=["patientId", "status"], uniques=["organizationId, encounterNumber"])]

    emr_names = [
        "EncounterParticipant", "EncounterDiagnosis", "EncounterProcedure", "ClinicalNote",
        "SoapNote", "ProgressNote", "DischargeSummary", "DischargeInstruction", "ProblemList",
        "ProblemListItem", "DiagnosisCode", "ProcedureCode", "MedicationAdministration",
        "MedicationOrder", "MedicationOrderSchedule", "ClinicalObservation", "ClinicalImpression",
        "CarePlan", "CarePlanGoal", "CarePlanActivity", "TreatmentPlan", "TreatmentPlanItem",
        "ClinicalAttachment", "ClinicalDocument", "ClinicalDocumentSection", "VitalSignReading",
        "BodySite", "EncounterLocation", "EncounterStatusHistory", "EncounterTransfer",
        "EncounterAdmission", "EncounterDischarge", "NursingAssessment", "NursingCarePlan",
        "NursingIntervention", "PhysicianOrder", "OrderSet", "OrderSetItem", "ClinicalPathway",
        "PathwayStep", "ClinicalAlert", "ClinicalDecisionSupport", "ReferralOrder",
        "ConsultRequest", "ConsultResponse", "HealthMaintenance", "ClinicalTimelineEntry",
        "ClinicalFormResponse", "ClinicalTemplate", "ClinicalTemplateField", "EncounterBillingLink",
        "EncounterInsuranceLink", "EncounterCareTeam", "EncounterAllergyReview", "EncounterMedicationReview",
    ]
    for name in emr_names:
        fields = [
            _uuid("encounterId"), _uuid("patientId"), _uuid("authorId", optional=True),
            _str("code", optional=True), _str("title", optional=True), _str("content", optional=True),
            clinical_field("noteStatus", "ClinicalNoteStatus", optional=True, map_name="note_status"),
            clinical_field("problemStatus", "ProblemStatus", optional=True, map_name="problem_status"),
            clinical_field("medicationStatus", "MedicationOrderStatus", optional=True, map_name="medication_status"),
            _ts("recordedAt", optional=True), _json("structuredData"),
        ]
        parent_fks = [("encounterId", "Encounter")] if name != "Encounter" else []
        models.append(simple_model(name, fields, indexes=["encounterId", "patientId"], parent_fks=parent_fks))
    return models


def lab_models() -> list[ModelSpec]:
    models = [simple_model("LabOrder", [
        _uuid("patientId"), _uuid("encounterId", optional=True), _uuid("orderingProviderId", optional=True),
        _str("orderNumber", map_name="order_number"),
        clinical_field("status", "LabOrderStatus", default="ORDERED"),
        _ts("orderedAt"), _str("priority", default='"ROUTINE"'), _str("clinicalNotes", optional=True, map_name="clinical_notes"),
    ], indexes=["patientId", "status"], uniques=["organizationId, orderNumber"])]

    lab_names = [
        "LabOrderItem", "LabTestCatalog", "LabPanel", "LabPanelTest", "LabSpecimen",
        "LabSpecimenCollection", "LabSpecimenContainer", "LabSpecimenTransport", "LabResult",
        "LabResultComponent", "LabReferenceRange", "LabResultValidation", "LabResultComment",
        "LabBarcode", "LabReport", "LabReportSection", "LabCriticalValue", "LabDeltaCheck",
        "LabQualityControl", "LabQcResult", "LabInstrument", "LabInstrumentCalibration",
        "LabWorklist", "LabWorklistItem", "LabRequisition", "LabRequisitionAttachment",
        "LabOrderStatusHistory", "LabResultAmendment", "LabResultNotification", "LabExternalLab",
        "LabCompendium", "LabCompendiumMapping", "LabMicrobiologyResult", "LabCulture",
        "LabSensitivity", "LabPathologyReport", "LabGenomicsResult", "LabToxicologyResult",
        "LabOrderPriority", "LabSpecimenAliquot", "LabResultAttachment", "LabOrderComment",
        "LabResultFlag", "LabPerformingSite", "LabCourierRoute", "LabSpecimenRejection",
    ]
    for name in lab_names:
        fields = [
            _uuid("labOrderId"), _uuid("patientId"), _uuid("specimenId", optional=True),
            _str("testCode", optional=True, map_name="test_code"), _str("testName", optional=True, map_name="test_name"),
            clinical_field("resultStatus", "LabResultStatus", optional=True, map_name="result_status"),
            clinical_field("specimenStatus", "SpecimenStatus", optional=True, map_name="specimen_status"),
            clinical_field("validationStatus", "LabValidationStatus", optional=True, map_name="validation_status"),
            _str("value", optional=True), _str("unit", optional=True),
            _str("referenceRange", optional=True, map_name="reference_range"),
            _dec("numericValue", optional=True), _ts("collectedAt", optional=True), _ts("resultedAt", optional=True),
            _str("barcode", optional=True), _str("notes", optional=True),
        ]
        parent_fks = [("labOrderId", "LabOrder")]
        models.append(simple_model(name, fields, indexes=["labOrderId", "patientId"], parent_fks=parent_fks))
    return models


def radiology_models() -> list[ModelSpec]:
    models = [simple_model("RadiologyOrder", [
        _uuid("patientId"), _uuid("encounterId", optional=True), _uuid("orderingProviderId", optional=True),
        _str("orderNumber", map_name="order_number"),
        clinical_field("modality", "RadiologyModalityType"),
        _str("status", default='"ORDERED"'), _ts("orderedAt"), _str("bodyPart", optional=True, map_name="body_part"),
        _str("clinicalIndication", optional=True, map_name="clinical_indication"),
    ], indexes=["patientId"], uniques=["organizationId, orderNumber"])]

    rad_names = [
        "RadiologyStudy", "RadiologySeries", "RadiologyInstance", "DicomStudy", "DicomSeries",
        "DicomInstance", "DicomMetadata", "RadiologyReport", "RadiologyReportTemplate",
        "RadiologyFinding", "RadiologyImpression", "RadiologyProtocol", "RadiologyModality",
        "RadiologyEquipment", "RadiologyTechnologistAssignment", "RadiologyRadiologistAssignment",
        "RadiologyPeerReview", "RadiologyCriticalFinding", "RadiologyContrastAdministration",
        "RadiologyDoseReport", "RadiologyWorklist", "RadiologyWorklistItem", "RadiologyOrderStatusHistory",
        "RadiologyReportAmendment", "RadiologyReportDistribution", "RadiologyPacsLink",
        "RadiologyStructuredReport", "RadiologyMeasurement", "RadiologyComparison",
        "RadiologyQualityMetric", "RadiologySchedulingSlot", "RadiologyPriorStudyLink",
        "RadiologyAddendum", "RadiologyTeachingFile", "RadiologyAiInference",
    ]
    for name in rad_names:
        fields = [
            _uuid("radiologyOrderId"), _uuid("patientId"), _uuid("studyId", optional=True),
            _str("accessionNumber", optional=True, map_name="accession_number"),
            _str("studyInstanceUid", optional=True, map_name="study_instance_uid"),
            _str("seriesInstanceUid", optional=True, map_name="series_instance_uid"),
            _str("sopInstanceUid", optional=True, map_name="sop_instance_uid"),
            clinical_field("studyStatus", "RadiologyStudyStatus", optional=True, map_name="study_status"),
            clinical_field("transferStatus", "DicomTransferStatus", optional=True, map_name="transfer_status"),
            _str("findings", optional=True), _str("impression", optional=True),
            _ts("performedAt", optional=True), _json("dicomTags"),
        ]
        parent_fks = [("radiologyOrderId", "RadiologyOrder")]
        models.append(simple_model(name, fields, indexes=["radiologyOrderId", "patientId"], parent_fks=parent_fks))
    return models


def pharmacy_models() -> list[ModelSpec]:
    models = [simple_model("DrugCatalog", [
        _str("ndc", optional=True), _str("rxcui", optional=True), _str("genericName", map_name="generic_name"),
        _str("brandName", optional=True, map_name="brand_name"), _str("dosageForm", optional=True, map_name="dosage_form"),
        _str("strength", optional=True), clinical_field("schedule", "DrugSchedule", default="RX"),
        _bool("isActive", default="true"),
    ], indexes=["ndc", "genericName"])]

    pharm_names = [
        "DrugFormulary", "DrugFormularyItem", "DrugIngredient", "DrugInteraction",
        "DrugAllergyCrossReference", "PharmacyInventory", "PharmacyInventoryLot",
        "PharmacyInventoryTransaction", "PharmacySupplier", "PharmacyPurchaseOrder",
        "PharmacyPurchaseOrderItem", "PharmacyDispense", "PharmacyDispenseItem",
        "PharmacyReturn", "PharmacyCompounding", "PharmacyCompoundingIngredient",
        "PharmacyStorageLocation", "PharmacyShelf", "PharmacyStockAlert", "PharmacyNdcMapping",
        "PharmacyPricing", "PharmacyInsuranceOverride", "PharmacyPriorAuth",
        "PharmacyMedicationTherapyReview", "PharmacyAdverseEvent", "PharmacyRecall",
        "PharmacyBarcodeScan", "PharmacyLabel", "PharmacyDelivery", "PharmacyDeliveryStop",
        "PharmacyAutomatedDispenser", "PharmacyCycleCount", "PharmacyWasteLog",
        "PharmacyControlledSubstanceLog", "PharmacyDrugShortage", "PharmacyIvAdmixture",
        "PharmacyReconciliation", "PharmacyFormularyException", "PharmacyContractPrice",
    ]
    for name in pharm_names:
        fields = [
            _uuid("drugCatalogId", optional=True), _uuid("patientId", optional=True),
            _uuid("prescriptionId", optional=True), _str("sku", optional=True),
            _str("lotNumber", optional=True, map_name="lot_number"),
            _int("quantity", optional=True), _dec("unitCost", optional=True),
            clinical_field("transactionType", "InventoryTransactionType", optional=True, map_name="transaction_type"),
            clinical_field("dispenseStatus", "DispenseStatus", optional=True, map_name="dispense_status"),
            _ts("expiresAt", optional=True), _str("locationCode", optional=True, map_name="location_code"),
            _str("notes", optional=True),
        ]
        models.append(simple_model(name, fields, indexes=["drugCatalogId", "patientId"]))
    return models


def billing_models() -> list[ModelSpec]:
    models = [simple_model("BillingAccount", [
        _uuid("patientId"), _str("accountNumber", map_name="account_number"),
        _dec("balance"), _str("status", default='"OPEN"'),
        _ts("openedAt"), _ts("closedAt", optional=True),
    ], indexes=["patientId"], uniques=["organizationId, accountNumber"])]

    bill_names = [
        "Invoice", "InvoiceLineItem", "InvoiceTax", "InvoiceDiscount", "Payment",
        "PaymentMethod", "PaymentAllocation", "Refund", "RefundAllocation", "Receipt",
        "ReceiptLine", "BillingCharge", "BillingChargeCategory", "BillingFeeSchedule",
        "BillingFeeScheduleItem", "BillingContract", "BillingContractRate", "BillingAdjustment",
        "BillingWriteOff", "BillingCollection", "BillingCollectionActivity", "BillingStatement",
        "BillingStatementLine", "BillingCopay", "BillingDeductible", "BillingPriorBalance",
        "BillingPaymentPlan", "BillingPaymentPlanInstallment", "BillingEob", "BillingEobLine",
        "BillingCoding", "BillingModifier", "BillingDenial", "BillingAppeal", "BillingReconciliation",
        "BillingGuarantor", "BillingDeposit", "BillingCreditMemo", "BillingDebitMemo",
        "BillingChargeCapture", "BillingRemittanceAdvice",
    ]
    for name in bill_names:
        fields = [
            _uuid("billingAccountId"), _uuid("patientId"), _uuid("invoiceId", optional=True),
            _str("invoiceNumber", optional=True, map_name="invoice_number"),
            clinical_field("invoiceStatus", "InvoiceStatus", optional=True, map_name="invoice_status"),
            clinical_field("paymentStatus", "PaymentStatus", optional=True, map_name="payment_status"),
            clinical_field("paymentMethodType", "PaymentMethodType", optional=True, map_name="payment_method_type"),
            _dec("amount"), _dec("taxAmount", optional=True), _dec("discountAmount", optional=True),
            _str("currency", default='"USD"'), _str("description", optional=True),
            _ts("postedAt", optional=True), _str("cptCode", optional=True, map_name="cpt_code"),
            _str("icdCode", optional=True, map_name="icd_code"),
        ]
        parent_fks = [("billingAccountId", "BillingAccount")]
        models.append(simple_model(name, fields, indexes=["billingAccountId", "patientId"], parent_fks=parent_fks))
    return models


def insurance_models() -> list[ModelSpec]:
    models = [simple_model("InsurancePayer", [
        _str("payerCode", map_name="payer_code"), _str("payerName", map_name="payer_name"),
        _str("payerType", optional=True, map_name="payer_type"), _str("phone", optional=True),
        _str("address", optional=True), _bool("isActive", default="true"),
    ], indexes=["payerCode"], uniques=["organizationId, payerCode"])]

    ins_names = [
        "InsurancePlan", "InsurancePolicy", "InsurancePolicyHolder", "InsurancePolicyDependent",
        "InsuranceEligibilityCheck", "InsuranceEligibilityBenefit", "InsuranceAuthorization",
        "InsuranceAuthorizationService", "InsuranceClaim", "InsuranceClaimLine",
        "InsuranceClaimStatusHistory", "InsuranceClaimAttachment", "InsuranceClaimDenial",
        "InsuranceClaimAppeal", "InsuranceRemittance", "InsuranceRemittanceLine", "InsuranceContract",
        "InsuranceFeeSchedule", "InsuranceNetwork", "InsuranceNetworkProvider", "InsuranceCredentialing",
        "InsurancePriorAuth", "InsuranceCoverageRule", "InsuranceCopayRule", "InsuranceDeductibleRule",
        "InsuranceOutOfPocket", "InsuranceCoordinationOfBenefits", "InsuranceVerificationLog",
        "InsuranceAppealDocument", "InsurancePayerContact", "InsurancePlanBenefit",
        "InsuranceSubscriber", "InsuranceEnrollment", "InsuranceCapitationAgreement",
        "InsuranceRiskAdjustment", "InsuranceUnderpayment", "InsuranceOverpayment",
    ]
    for name in ins_names:
        fields = [
            _uuid("payerId"), _uuid("patientId"), _uuid("policyId", optional=True),
            _uuid("claimId", optional=True), _str("memberId", optional=True, map_name="member_id"),
            _str("groupNumber", optional=True, map_name="group_number"),
            clinical_field("claimStatus", "ClaimStatus", optional=True, map_name="claim_status"),
            clinical_field("eligibilityStatus", "EligibilityStatus", optional=True, map_name="eligibility_status"),
            clinical_field("authorizationStatus", "AuthorizationStatus", optional=True, map_name="authorization_status"),
            _dec("allowedAmount", optional=True), _dec("paidAmount", optional=True),
            _ts("effectiveDate", optional=True), _ts("verifiedAt", optional=True),
            _str("authorizationNumber", optional=True, map_name="authorization_number"),
            _json("benefitDetails"),
        ]
        parent_fks = [("payerId", "InsurancePayer")]
        models.append(simple_model(name, fields, indexes=["payerId", "patientId"], parent_fks=parent_fks))
    return models


def telemedicine_models() -> list[ModelSpec]:
    models = [simple_model("TelemedicineSession", [
        _uuid("patientId"), _uuid("providerId"), _uuid("appointmentId", optional=True),
        _str("sessionCode", map_name="session_code"),
        clinical_field("status", "TelemedicineSessionStatus", default="SCHEDULED"),
        _ts("scheduledStart"), _ts("scheduledEnd"), _ts("actualStart", optional=True), _ts("actualEnd", optional=True),
        _str("platform", optional=True), _str("roomUrl", optional=True, map_name="room_url"),
    ], indexes=["patientId", "providerId"], uniques=["organizationId, sessionCode"])]

    tele_names = [
        "TelemedicineParticipant", "TelemedicineChatMessage", "TelemedicineChatAttachment",
        "TelemedicineRecording", "TelemedicineRecordingMetadata", "TelemedicineSessionEvent",
        "TelemedicineWaitingRoom", "TelemedicineWaitingRoomEntry", "TelemedicineConsent",
        "TelemedicineDevice", "TelemedicineConnectionLog", "TelemedicineQualityMetric",
        "TelemedicineSessionNote", "TelemedicinePrescriptionLink", "TelemedicineFollowUp",
        "TelemedicineSessionRating", "TelemedicineInterpreter", "TelemedicineScreenShare",
        "TelemedicineBreakoutRoom", "TelemedicinePoll", "TelemedicinePollResponse",
        "TelemedicineWhiteboard", "TelemedicineSessionBilling", "TelemedicineTechnicalIssue",
        "TelemedicineBandwidthLog", "TelemedicineSessionRecordingConsent",
    ]
    for name in tele_names:
        fields = [
            _uuid("sessionId"), _uuid("patientId", optional=True), _uuid("userId", optional=True),
            clinical_field("participantRole", "ParticipantRole", optional=True, map_name="participant_role"),
            clinical_field("recordingStatus", "RecordingStatus", optional=True, map_name="recording_status"),
            _str("message", optional=True), _str("contentType", optional=True, map_name="content_type"),
            _ts("sentAt", optional=True), _int("durationSeconds", optional=True),
            _str("storageKey", optional=True, map_name="storage_key"), _json("metadata"),
        ]
        parent_fks = [("sessionId", "TelemedicineSession")]
        models.append(simple_model(name, fields, indexes=["sessionId"], parent_fks=parent_fks))
    return models


def notification_models() -> list[ModelSpec]:
    models = [simple_model("NotificationTemplate", [
        _str("templateCode", map_name="template_code"), _str("name"),
        clinical_field("channel", "NotificationChannelType", map_name="channel"),
        _str("subject", optional=True), _str("bodyTemplate", map_name="body_template"),
        _int("versionNumber", default="1"), _bool("isActive", default="true"),
    ], indexes=["templateCode"], uniques=["organizationId, templateCode, versionNumber"])]

    notif_names = [
        "NotificationTemplateVersion", "NotificationChannel", "NotificationPreference",
        "NotificationSubscription", "NotificationDelivery", "NotificationDeliveryAttempt",
        "NotificationBatch", "NotificationBatchItem", "NotificationRule", "NotificationRuleCondition",
        "NotificationQueue", "NotificationInApp", "NotificationSms", "NotificationEmail",
        "NotificationPush", "NotificationWebhook", "NotificationDigest", "NotificationUnsubscribe",
        "NotificationAudit", "NotificationRecipient", "NotificationSchedule", "NotificationThrottle",
        "NotificationFailureLog", "NotificationOptOut", "NotificationCategory",
    ]
    for name in notif_names:
        fields = [
            _uuid("templateId", optional=True), _uuid("userId", optional=True), _uuid("patientId", optional=True),
            clinical_field("status", "NotificationStatus", optional=True),
            clinical_field("channel", "NotificationChannelType", optional=True),
            _str("recipient", optional=True), _str("subject", optional=True), _str("body", optional=True),
            _ts("scheduledAt", optional=True), _ts("sentAt", optional=True),
            _int("attemptCount", optional=True), _str("errorMessage", optional=True, map_name="error_message"),
            _json("payload"),
        ]
        parent_fks = [("templateId", "NotificationTemplate")] if "template" in name.lower() or name.startswith("Notification") and "Template" not in name else []
        if name == "NotificationTemplateVersion":
            parent_fks = [("templateId", "NotificationTemplate")]
        models.append(simple_model(name, fields, indexes=["userId", "patientId"], parent_fks=parent_fks))
    return models


def analytics_models() -> list[ModelSpec]:
    anal_names = [
        "AnalyticsSnapshot", "AnalyticsDailyMetric", "AnalyticsHourlyMetric", "AnalyticsPatientMetric",
        "AnalyticsProviderMetric", "AnalyticsDepartmentMetric", "AnalyticsFinancialMetric",
        "AnalyticsClinicalMetric", "AnalyticsOperationalMetric", "AnalyticsQualityMetric",
        "AnalyticsDashboard", "AnalyticsDashboardWidget", "AnalyticsReport", "AnalyticsReportRun",
        "AnalyticsKpi", "AnalyticsKpiValue", "AnalyticsCohort", "AnalyticsCohortMember",
        "AnalyticsDataExport", "AnalyticsAggregationJob", "AnalyticsBenchmark", "AnalyticsTrend",
        "AnalyticsForecast", "AnalyticsAlert", "AnalyticsDataSource",
    ]
    models = []
    for name in anal_names:
        fields = [
            _str("metricCode", optional=True, map_name="metric_code"), _str("metricName", optional=True, map_name="metric_name"),
            _dec("metricValue", optional=True), _str("dimension", optional=True),
            _date("snapshotDate", optional=True), _ts("computedAt", optional=True),
            _uuid("facilityId", optional=True), _uuid("departmentId", optional=True),
            _json("dimensions"), _json("values"),
        ]
        models.append(simple_model(name, fields, indexes=["metricCode", "snapshotDate"], versioned=False))
    return models


def search_models() -> list[ModelSpec]:
    models = [simple_model("SearchIndexJob", [
        clinical_field("entityType", "SearchEntityType", map_name="entity_type"),
        clinical_field("status", "SearchIndexJobStatus", default="PENDING"),
        _uuid("entityId"), _ts("startedAt", optional=True), _ts("completedAt", optional=True),
        _int("recordsProcessed", optional=True), _str("errorMessage", optional=True, map_name="error_message"),
    ], indexes=["entityType", "status"], versioned=False, soft_delete=False)]

    search_names = [
        "SearchIndexJobLog", "SearchDocument", "SearchDocumentVersion", "SearchSynonym",
        "SearchBoostRule", "SearchQueryLog", "SearchQueryClick", "SearchReindexBatch",
        "SearchReindexBatchItem", "SearchAlias", "SearchMapping", "SearchSuggestion",
        "SearchFacetConfig", "SearchAnalyticsDaily", "SearchRankingSignal", "SearchStopWord",
        "SearchPipeline", "SearchPipelineStage", "SearchIndexShard", "SearchIndexHealth",
    ]
    for name in search_names:
        fields = [
            _uuid("jobId", optional=True), clinical_field("entityType", "SearchEntityType", optional=True, map_name="entity_type"),
            _uuid("entityId", optional=True), _str("query", optional=True), _str("indexName", optional=True, map_name="index_name"),
            _json("document"), _json("mapping"), _ts("indexedAt", optional=True),
            _int("rank", optional=True), _dec("score", optional=True),
        ]
        parent_fks = [("jobId", "SearchIndexJob")] if name.startswith("SearchIndex") else []
        models.append(simple_model(name, fields, indexes=["entityType", "indexName"], versioned=False, soft_delete=False, parent_fks=parent_fks))
    return models


def prescription_models() -> list[ModelSpec]:
    models = [simple_model("Prescription", [
        _uuid("patientId"), _uuid("encounterId", optional=True), _uuid("prescriberId"),
        _str("prescriptionNumber", map_name="prescription_number"),
        clinical_field("status", "PrescriptionStatus", default="ACTIVE"),
        _ts("prescribedAt"), _ts("expiresAt", optional=True),
        _str("diagnosisCode", optional=True, map_name="diagnosis_code"), _str("notes", optional=True),
    ], indexes=["patientId", "prescriberId"], uniques=["organizationId, prescriptionNumber"])]

    rx_names = [
        "PrescriptionItem", "PrescriptionRefill", "PrescriptionRefillRequest", "PrescriptionTransmission",
        "PrescriptionSignature", "PrescriptionDiagnosisLink", "PrescriptionInteractionCheck",
        "PrescriptionAllergyCheck", "PrescriptionPriorAuth", "PrescriptionStatusHistory",
        "PrescriptionCancel", "PrescriptionHold", "PrescriptionCompound", "PrescriptionCompoundIngredient",
        "PrescriptionEpcsAudit", "PrescriptionPharmacyRouting", "PrescriptionDeliveryPreference",
        "PrescriptionLabel", "PrescriptionAdherence", "PrescriptionAdherenceEvent",
        "PrescriptionMedicationHistory", "PrescriptionSubstitution", "PrescriptionRenewal",
        "PrescriptionVerification", "PrescriptionDosageInstruction", "PrescriptionFormularyCheck",
        "PrescriptionDispenseHistory", "PrescriptionPatientEducation", "PrescriptionCoverageCheck",
    ]
    for name in rx_names:
        fields = [
            _uuid("prescriptionId"), _uuid("patientId"), _uuid("drugCatalogId", optional=True),
            _str("drugName", optional=True, map_name="drug_name"), _str("dosage", optional=True),
            _str("frequency", optional=True), _str("route", optional=True),
            _int("quantity", optional=True), _int("refillsAllowed", optional=True),
            clinical_field("transmissionStatus", "PrescriptionTransmissionStatus", optional=True, map_name="transmission_status"),
            _ts("transmittedAt", optional=True), _str("notes", optional=True),
        ]
        parent_fks = [("prescriptionId", "Prescription")]
        models.append(simple_model(name, fields, indexes=["prescriptionId", "patientId"], parent_fks=parent_fks))
    return models


def audit_version_models() -> list[ModelSpec]:
    audit_names = [
        "EntityVersion", "EntityVersionDiff", "EntityAuditTrail", "EntitySnapshot",
        "ClinicalRecordVersion", "PatientRecordVersion", "EncounterVersion", "LabResultVersion",
        "RadiologyReportVersion", "PrescriptionVersion", "BillingRecordVersion", "InsuranceClaimVersion",
        "DocumentVersionHistory", "ConfigurationVersion", "MasterDataVersion", "DataRetentionPolicy",
        "DataRetentionExecution", "DataAccessLog", "PhiAccessLog", "BreakGlassAccess",
        "ConsentAudit", "ImmutableAuditBlock", "AuditExport", "AuditRetention", "ChangeDataCapture",
        "EntityLock", "EntityMergeAudit", "FieldLevelAudit", "RecordIntegrityCheck",
        "ComplianceExportJob", "HipaaDisclosureLog", "SecurityIncidentLog",
    ]
    models = []
    for name in audit_names:
        fields = [
            _str("entityType", map_name="entity_type"), _uuid("entityId"),
            _int("versionNumber", optional=True), _uuid("changedById", optional=True),
            _str("changeType", optional=True, map_name="change_type"),
            _json("beforeState"), _json("afterState"), _json("diff"),
            _ts("changedAt", optional=True), _str("reason", optional=True),
            _str("ipAddress", optional=True, map_name="ip_address"),
            _str("userAgent", optional=True, map_name="user_agent"),
        ]
        models.append(simple_model(name, fields, indexes=["entityType", "entityId"], versioned=False, soft_delete=False))
    return models


DOMAIN_FRAGMENTS: list[tuple[str, str, callable]] = [
    ("01-patient-management.prisma", PATIENT_ENUMS, patient_models),
    ("02-doctor-staff.prisma", STAFF_ENUMS, staff_models),
    ("03-appointments.prisma", APPOINTMENT_ENUMS, appointment_models),
    ("04-emr.prisma", EMR_ENUMS, emr_models),
    ("05-laboratory.prisma", LAB_ENUMS, lab_models),
    ("06-radiology.prisma", RADIOLOGY_ENUMS, radiology_models),
    ("07-pharmacy.prisma", PHARMACY_ENUMS, pharmacy_models),
    ("08-billing.prisma", BILLING_ENUMS, billing_models),
    ("09-insurance.prisma", INSURANCE_ENUMS, insurance_models),
    ("10-telemedicine.prisma", TELEMEDICINE_ENUMS, telemedicine_models),
    ("11-notifications.prisma", NOTIFICATION_ENUMS, notification_models),
    ("12-analytics.prisma", "", analytics_models),
    ("13-search.prisma", SEARCH_ENUMS, search_models),
    ("14-prescriptions.prisma", PRESCRIPTION_ENUMS, prescription_models),
    ("15-audit-versions.prisma", "", audit_version_models),
]


def write_fragment(filename: str, enums: str, models: list[ModelSpec]) -> int:
    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    parts = [
        f"// Auto-generated clinical fragment: {filename}",
        f"// Do not edit by hand — regenerate via tools/codegen/generate_clinical_fragments.py",
        "",
    ]
    if enums.strip():
        parts.append(enums.strip())
        parts.append("")
    for m in models:
        parts.append(m.render())
        parts.append("")
    path = MODELS_DIR / filename
    path.write_text("\n".join(parts), encoding="utf-8")
    return len(models)


def main() -> None:
    total = 0
    summary: list[tuple[str, int]] = []
    for filename, enums, factory in DOMAIN_FRAGMENTS:
        count = write_fragment(filename, enums, factory())
        total += count
        summary.append((filename, count))
        print(f"  {filename}: {count} models")
    print(f"\nGenerated {total} clinical models across {len(summary)} fragment files.")
    print(f"Output directory: {MODELS_DIR}")


if __name__ == "__main__":
    main()
