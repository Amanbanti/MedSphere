import { InvalidStateError } from '../errors/medical-record.errors';

export type MedicalRecordState = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

const ALLOWED: Record<MedicalRecordState, MedicalRecordState[]> = {
  ACTIVE: ['INACTIVE', 'SUSPENDED'],
  INACTIVE: ['ACTIVE'],
  SUSPENDED: ['ACTIVE'],
};

export class MedicalRecordStateMachine {
  static assertTransition(from: MedicalRecordState, to: MedicalRecordState): void {
    const allowed = ALLOWED[from] ?? [];
    if (!allowed.includes(to)) {
      throw new InvalidStateError(`Invalid transition from ${from} to ${to}`);
    }
  }

  static canTransition(from: MedicalRecordState, to: MedicalRecordState): boolean {
    return (ALLOWED[from] ?? []).includes(to);
  }

  static nextStates(from: MedicalRecordState): MedicalRecordState[] {
    return ALLOWED[from] ?? [];
  }
}
