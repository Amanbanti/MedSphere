export const PAYMENT_EVENT_TYPES = {
  CREATED: 'PAYMENT.CREATED',
  UPDATED: 'PAYMENT.UPDATED',
  DELETED: 'PAYMENT.DELETED',
} as const;

export type PaymentEventType =
  (typeof PAYMENT_EVENT_TYPES)[keyof typeof PAYMENT_EVENT_TYPES];
