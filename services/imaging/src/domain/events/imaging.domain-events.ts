export const IMAGING_EVENT_TYPES = {
  CREATED: 'IMAGING.CREATED',
  UPDATED: 'IMAGING.UPDATED',
  DELETED: 'IMAGING.DELETED',
} as const;

export type ImagingEventType =
  (typeof IMAGING_EVENT_TYPES)[keyof typeof IMAGING_EVENT_TYPES];
