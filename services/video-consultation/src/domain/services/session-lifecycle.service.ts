export enum VideoSessionStatus {
  SCHEDULED = 'SCHEDULED',
  WAITING = 'WAITING',
  LIVE = 'LIVE',
  ENDED = 'ENDED',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED',
}

const SESSION_TRANSITIONS: Record<VideoSessionStatus, VideoSessionStatus[]> = {
  [VideoSessionStatus.SCHEDULED]: [VideoSessionStatus.WAITING, VideoSessionStatus.CANCELLED, VideoSessionStatus.FAILED],
  [VideoSessionStatus.WAITING]: [VideoSessionStatus.LIVE, VideoSessionStatus.CANCELLED, VideoSessionStatus.FAILED],
  [VideoSessionStatus.LIVE]: [VideoSessionStatus.ENDED, VideoSessionStatus.FAILED],
  [VideoSessionStatus.ENDED]: [],
  [VideoSessionStatus.CANCELLED]: [],
  [VideoSessionStatus.FAILED]: [],
};

export class SessionLifecycleService {
  static canTransition(from: VideoSessionStatus, to: VideoSessionStatus): boolean {
    return SESSION_TRANSITIONS[from]?.includes(to) ?? false;
  }

  static transition(from: VideoSessionStatus, to: VideoSessionStatus): VideoSessionStatus {
    if (!SessionLifecycleService.canTransition(from, to)) {
      throw new Error(`Invalid session transition: ${from} → ${to}`);
    }
    return to;
  }

  static enterWaiting(from: VideoSessionStatus): VideoSessionStatus {
    return SessionLifecycleService.transition(from, VideoSessionStatus.WAITING);
  }

  static goLive(from: VideoSessionStatus): VideoSessionStatus {
    return SessionLifecycleService.transition(from, VideoSessionStatus.LIVE);
  }

  static end(from: VideoSessionStatus): VideoSessionStatus {
    return SessionLifecycleService.transition(from, VideoSessionStatus.ENDED);
  }

  static cancel(from: VideoSessionStatus): VideoSessionStatus {
    return SessionLifecycleService.transition(from, VideoSessionStatus.CANCELLED);
  }

  static fail(from: VideoSessionStatus): VideoSessionStatus {
    return SessionLifecycleService.transition(from, VideoSessionStatus.FAILED);
  }

  static computeDurationSeconds(startedAt: Date, endedAt: Date): number {
    return Math.max(0, Math.floor((endedAt.getTime() - startedAt.getTime()) / 1000));
  }
}
