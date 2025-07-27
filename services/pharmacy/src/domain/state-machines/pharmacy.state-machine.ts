import { InvalidStateError } from '../errors/pharmacy.errors';

export type PharmacyState = 'PENDING' | 'IN_PROGRESS' | 'READY' | 'PICKED_UP' | 'DELIVERED' | 'CANCELLED' | 'RETURNED';

const ALLOWED: Record<PharmacyState, PharmacyState[]> = {
  PENDING: ['IN_PROGRESS', 'CANCELLED'],
  IN_PROGRESS: ['READY', 'CANCELLED'],
  READY: ['PICKED_UP', 'DELIVERED', 'CANCELLED'],
  PICKED_UP: ['RETURNED'],
  DELIVERED: ['RETURNED'],
  CANCELLED: [],
  RETURNED: [],
};

export class PharmacyStateMachine {
  static assertTransition(from: PharmacyState, to: PharmacyState): void {
    const allowed = ALLOWED[from] ?? [];
    if (!allowed.includes(to)) {
      throw new InvalidStateError(`Invalid transition from ${from} to ${to}`);
    }
  }

  static canTransition(from: PharmacyState, to: PharmacyState): boolean {
    return (ALLOWED[from] ?? []).includes(to);
  }

  static nextStates(from: PharmacyState): PharmacyState[] {
    return ALLOWED[from] ?? [];
  }
}
