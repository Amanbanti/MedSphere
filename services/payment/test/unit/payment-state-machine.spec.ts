import { describe, expect, it } from 'vitest';
import {
  PaymentStateMachine,
  PaymentStatus,
  computeBackoffSeconds,
} from '../../src/domain/services/payment-state-machine';

describe('PaymentStateMachine', () => {
  it('authorizes pending payment', () => {
    expect(PaymentStateMachine.authorize(PaymentStatus.PENDING)).toBe(PaymentStatus.AUTHORIZED);
  });

  it('captures authorized payment', () => {
    expect(PaymentStateMachine.capture(PaymentStatus.AUTHORIZED)).toBe(PaymentStatus.CAPTURED);
  });

  it('refunds captured payment', () => {
    expect(PaymentStateMachine.refund(PaymentStatus.CAPTURED)).toBe(PaymentStatus.REFUNDED);
  });

  it('rejects capture from pending', () => {
    expect(() => PaymentStateMachine.capture(PaymentStatus.PENDING)).toThrow();
  });

  it('identifies terminal states', () => {
    expect(PaymentStateMachine.isTerminal(PaymentStatus.REFUNDED)).toBe(true);
    expect(PaymentStateMachine.isTerminal(PaymentStatus.AUTHORIZED)).toBe(false);
  });
});

describe('computeBackoffSeconds', () => {
  it('exponential backoff with cap', () => {
    expect(computeBackoffSeconds(0)).toBe(30);
    expect(computeBackoffSeconds(2)).toBe(120);
  });
});
