export enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
  CHECK = 'CHECK',
  ACH = 'ACH',
  WIRE = 'WIRE',
  INSURANCE = 'INSURANCE',
  OTHER = 'OTHER',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  AUTHORIZED = 'AUTHORIZED',
  CAPTURED = 'CAPTURED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  VOIDED = 'VOIDED',
}

const VALID_TRANSITIONS: Record<PaymentStatus, PaymentStatus[]> = {
  [PaymentStatus.PENDING]: [PaymentStatus.AUTHORIZED, PaymentStatus.FAILED, PaymentStatus.VOIDED],
  [PaymentStatus.AUTHORIZED]: [PaymentStatus.CAPTURED, PaymentStatus.VOIDED, PaymentStatus.FAILED],
  [PaymentStatus.CAPTURED]: [PaymentStatus.REFUNDED],
  [PaymentStatus.FAILED]: [],
  [PaymentStatus.REFUNDED]: [],
  [PaymentStatus.VOIDED]: [],
};

export class PaymentStateMachine {
  static canTransition(from: PaymentStatus, to: PaymentStatus): boolean {
    return VALID_TRANSITIONS[from]?.includes(to) ?? false;
  }

  static transition(from: PaymentStatus, to: PaymentStatus): PaymentStatus {
    if (!PaymentStateMachine.canTransition(from, to)) {
      throw new Error(`Invalid payment transition: ${from} → ${to}`);
    }
    return to;
  }

  static authorize(from: PaymentStatus): PaymentStatus {
    return PaymentStateMachine.transition(from, PaymentStatus.AUTHORIZED);
  }

  static capture(from: PaymentStatus): PaymentStatus {
    return PaymentStateMachine.transition(from, PaymentStatus.CAPTURED);
  }

  static fail(from: PaymentStatus): PaymentStatus {
    return PaymentStateMachine.transition(from, PaymentStatus.FAILED);
  }

  static void(from: PaymentStatus): PaymentStatus {
    return PaymentStateMachine.transition(from, PaymentStatus.VOIDED);
  }

  static refund(from: PaymentStatus): PaymentStatus {
    return PaymentStateMachine.transition(from, PaymentStatus.REFUNDED);
  }

  static isTerminal(status: PaymentStatus): boolean {
    return [PaymentStatus.FAILED, PaymentStatus.REFUNDED, PaymentStatus.VOIDED].includes(status);
  }
}

export function computeBackoffSeconds(attempt: number, baseSeconds = 30): number {
  const capped = Math.min(attempt, 10);
  return baseSeconds * Math.pow(2, capped);
}
