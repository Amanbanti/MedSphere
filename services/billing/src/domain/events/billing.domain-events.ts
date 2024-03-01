export const BILLING_EVENT_TYPES = {
  CREATED: 'BILLING.CREATED',
  UPDATED: 'BILLING.UPDATED',
  DELETED: 'BILLING.DELETED',
} as const;

export type BillingEventType =
  (typeof BILLING_EVENT_TYPES)[keyof typeof BILLING_EVENT_TYPES];
