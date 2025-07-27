import { InvalidStateError } from '../errors/prescription.errors';

export type PrescriptionState = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

const ALLOWED: Record<PrescriptionState, PrescriptionState[]> = {
  ACTIVE: ['INACTIVE', 'SUSPENDED'],
  INACTIVE: ['ACTIVE'],
  SUSPENDED: ['ACTIVE'],
};

export class PrescriptionStateMachine {
  static assertTransition(from: PrescriptionState, to: PrescriptionState): void {
    const allowed = ALLOWED[from] ?? [];
    if (!allowed.includes(to)) {
      throw new InvalidStateError(`Invalid transition from ${from} to ${to}`);
    }
  }

  static canTransition(from: PrescriptionState, to: PrescriptionState): boolean {
    return (ALLOWED[from] ?? []).includes(to);
  }

  static nextStates(from: PrescriptionState): PrescriptionState[] {
    return ALLOWED[from] ?? [];
  }
}
