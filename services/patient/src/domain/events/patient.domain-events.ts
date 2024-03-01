export const PATIENT_EVENT_TYPES = {
  CREATED: 'PATIENT.CREATED',
  UPDATED: 'PATIENT.UPDATED',
  DELETED: 'PATIENT.DELETED',
} as const;

export type PatientEventType =
  (typeof PATIENT_EVENT_TYPES)[keyof typeof PATIENT_EVENT_TYPES];
