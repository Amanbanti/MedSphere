import { describe, expect, it } from 'vitest';
import {
  SessionLifecycleService,
  VideoSessionStatus,
} from '../../src/domain/services/session-lifecycle.service';

describe('SessionLifecycleService', () => {
  it('follows scheduled → waiting → live → ended', () => {
    let status = VideoSessionStatus.SCHEDULED;
    status = SessionLifecycleService.enterWaiting(status);
    expect(status).toBe(VideoSessionStatus.WAITING);
    status = SessionLifecycleService.goLive(status);
    expect(status).toBe(VideoSessionStatus.LIVE);
    status = SessionLifecycleService.end(status);
    expect(status).toBe(VideoSessionStatus.ENDED);
  });

  it('cancels from waiting', () => {
    expect(SessionLifecycleService.cancel(VideoSessionStatus.WAITING)).toBe(
      VideoSessionStatus.CANCELLED,
    );
  });

  it('rejects live from scheduled', () => {
    expect(() => SessionLifecycleService.goLive(VideoSessionStatus.SCHEDULED)).toThrow();
  });

  it('computes duration', () => {
    const start = new Date('2026-07-27T10:00:00Z');
    const end = new Date('2026-07-27T10:15:30Z');
    expect(SessionLifecycleService.computeDurationSeconds(start, end)).toBe(930);
  });
});
