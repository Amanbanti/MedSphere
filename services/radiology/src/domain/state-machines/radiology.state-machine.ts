import { InvalidStateError } from '../errors/radiology.errors';

export type RadiologyState = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

const ALLOWED: Record<RadiologyState, RadiologyState[]> = {
  ACTIVE: ['INACTIVE', 'SUSPENDED'],
  INACTIVE: ['ACTIVE'],
  SUSPENDED: ['ACTIVE'],
};

export class RadiologyStateMachine {
  static assertTransition(from: RadiologyState, to: RadiologyState): void {
    const allowed = ALLOWED[from] ?? [];
    if (!allowed.includes(to)) {
      throw new InvalidStateError(`Invalid transition from ${from} to ${to}`);
    }
  }

  static canTransition(from: RadiologyState, to: RadiologyState): boolean {
    return (ALLOWED[from] ?? []).includes(to);
  }

  static nextStates(from: RadiologyState): RadiologyState[] {
    return ALLOWED[from] ?? [];
  }
}
