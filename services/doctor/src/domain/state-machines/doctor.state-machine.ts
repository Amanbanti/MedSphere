import { InvalidStateError } from '../errors/doctor.errors';

export type DoctorState = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

const ALLOWED: Record<DoctorState, DoctorState[]> = {
  ACTIVE: ['INACTIVE', 'SUSPENDED'],
  INACTIVE: ['ACTIVE'],
  SUSPENDED: ['ACTIVE'],
};

export class DoctorStateMachine {
  static assertTransition(from: DoctorState, to: DoctorState): void {
    const allowed = ALLOWED[from] ?? [];
    if (!allowed.includes(to)) {
      throw new InvalidStateError(`Invalid transition from ${from} to ${to}`);
    }
  }

  static canTransition(from: DoctorState, to: DoctorState): boolean {
    return (ALLOWED[from] ?? []).includes(to);
  }

  static nextStates(from: DoctorState): DoctorState[] {
    return ALLOWED[from] ?? [];
  }
}
