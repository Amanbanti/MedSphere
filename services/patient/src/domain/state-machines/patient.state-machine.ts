import { InvalidStateError } from '../errors/patient.errors';

export type PatientState = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

const ALLOWED: Record<PatientState, PatientState[]> = {
  ACTIVE: ['INACTIVE', 'SUSPENDED'],
  INACTIVE: ['ACTIVE'],
  SUSPENDED: ['ACTIVE'],
};

export class PatientStateMachine {
  static assertTransition(from: PatientState, to: PatientState): void {
    const allowed = ALLOWED[from] ?? [];
    if (!allowed.includes(to)) {
      throw new InvalidStateError(`Invalid transition from ${from} to ${to}`);
    }
  }

  static canTransition(from: PatientState, to: PatientState): boolean {
    return (ALLOWED[from] ?? []).includes(to);
  }

  static nextStates(from: PatientState): PatientState[] {
    return ALLOWED[from] ?? [];
  }
}
