export const WORKER_EVENT_TYPES = {
  CREATED: 'WORKER.CREATED',
  UPDATED: 'WORKER.UPDATED',
  DELETED: 'WORKER.DELETED',
} as const;

export type WorkerEventType =
  (typeof WORKER_EVENT_TYPES)[keyof typeof WORKER_EVENT_TYPES];
