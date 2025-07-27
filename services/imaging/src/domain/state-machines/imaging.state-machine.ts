import { InvalidStateError } from '../errors/imaging.errors';

export type ImagingState = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

const ALLOWED: Record<ImagingState, ImagingState[]> = {
  ACTIVE: ['INACTIVE', 'SUSPENDED'],
  INACTIVE: ['ACTIVE'],
  SUSPENDED: ['ACTIVE'],
};

export class ImagingStateMachine {
  static assertTransition(from: ImagingState, to: ImagingState): void {
    const allowed = ALLOWED[from] ?? [];
    if (!allowed.includes(to)) {
      throw new InvalidStateError(`Invalid transition from ${from} to ${to}`);
    }
  }

  static canTransition(from: ImagingState, to: ImagingState): boolean {
    return (ALLOWED[from] ?? []).includes(to);
  }

  static nextStates(from: ImagingState): ImagingState[] {
    return ALLOWED[from] ?? [];
  }
}
