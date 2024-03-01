export const QUEUE_EVENT_TYPES = {
  CREATED: 'QUEUE.CREATED',
  UPDATED: 'QUEUE.UPDATED',
  DELETED: 'QUEUE.DELETED',
} as const;

export type QueueEventType =
  (typeof QUEUE_EVENT_TYPES)[keyof typeof QUEUE_EVENT_TYPES];
