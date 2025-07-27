import { InvalidStateError } from '../errors/laboratory.errors';

export type LaboratoryState = 'DRAFT' | 'ORDERED' | 'COLLECTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'REJECTED';

const ALLOWED: Record<LaboratoryState, LaboratoryState[]> = {
  DRAFT: ['ORDERED', 'CANCELLED'],
  ORDERED: ['COLLECTED', 'CANCELLED'],
  COLLECTED: ['IN_PROGRESS', 'REJECTED'],
  IN_PROGRESS: ['COMPLETED', 'REJECTED'],
  COMPLETED: [],
  CANCELLED: [],
  REJECTED: [],
};

export class LaboratoryStateMachine {
  static assertTransition(from: LaboratoryState, to: LaboratoryState): void {
    const allowed = ALLOWED[from] ?? [];
    if (!allowed.includes(to)) {
      throw new InvalidStateError(`Invalid transition from ${from} to ${to}`);
    }
  }

  static canTransition(from: LaboratoryState, to: LaboratoryState): boolean {
    return (ALLOWED[from] ?? []).includes(to);
  }

  static nextStates(from: LaboratoryState): LaboratoryState[] {
    return ALLOWED[from] ?? [];
  }
}
