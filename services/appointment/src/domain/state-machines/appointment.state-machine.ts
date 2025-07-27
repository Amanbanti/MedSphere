import { InvalidStateError } from '../errors/appointment.errors';

export type AppointmentState = 'SCHEDULED' | 'CONFIRMED' | 'CHECKED_IN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW' | 'RESCHEDULED';

const ALLOWED: Record<AppointmentState, AppointmentState[]> = {
  SCHEDULED: ['CONFIRMED', 'CANCELLED', 'RESCHEDULED', 'NO_SHOW'],
  CONFIRMED: ['CHECKED_IN', 'CANCELLED', 'NO_SHOW', 'RESCHEDULED'],
  CHECKED_IN: ['IN_PROGRESS', 'CANCELLED', 'NO_SHOW'],
  IN_PROGRESS: ['COMPLETED', 'CANCELLED'],
  COMPLETED: [],
  CANCELLED: [],
  NO_SHOW: [],
  RESCHEDULED: ['SCHEDULED'],
};

export class AppointmentStateMachine {
  static assertTransition(from: AppointmentState, to: AppointmentState): void {
    const allowed = ALLOWED[from] ?? [];
    if (!allowed.includes(to)) {
      throw new InvalidStateError(`Invalid transition from ${from} to ${to}`);
    }
  }

  static canTransition(from: AppointmentState, to: AppointmentState): boolean {
    return (ALLOWED[from] ?? []).includes(to);
  }

  static nextStates(from: AppointmentState): AppointmentState[] {
    return ALLOWED[from] ?? [];
  }
}
