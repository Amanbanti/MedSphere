export const DOCTOR_EVENT_TYPES = {
  CREATED: 'DOCTOR.CREATED',
  UPDATED: 'DOCTOR.UPDATED',
  DELETED: 'DOCTOR.DELETED',
} as const;

export type DoctorEventType =
  (typeof DOCTOR_EVENT_TYPES)[keyof typeof DOCTOR_EVENT_TYPES];
