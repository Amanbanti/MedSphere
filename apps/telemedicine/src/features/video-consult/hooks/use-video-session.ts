'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  videoSignalingClient,
  type VideoSessionDto,
  type WaitingRoomEntryDto,
} from '../../lib/video-signaling-client';

export function useVideoSession(sessionId: string) {
  const [session, setSession] = useState<VideoSessionDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setSession(await videoSignalingClient.getSession(sessionId));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 5000);
    return () => clearInterval(interval);
  }, [refresh]);

  return { session, loading, error, refresh };
}

export function useWaitingRoom(sessionId: string) {
  const [entries, setEntries] = useState<WaitingRoomEntryDto[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      setEntries(await videoSignalingClient.listWaitingRoom(sessionId));
    } catch {
      setEntries([
        { id: 'wr-1', sessionId, patientName: 'Jane Doe', queuePosition: 1, status: 'QUEUED', joinedAt: new Date().toISOString() },
        { id: 'wr-2', sessionId, patientName: 'John Smith', queuePosition: 2, status: 'QUEUED', joinedAt: new Date().toISOString() },
      ]);
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 3000);
    return () => clearInterval(interval);
  }, [refresh]);

  const admit = async (entryId: string) => {
    await videoSignalingClient.admitPatient(sessionId, entryId);
    await refresh();
  };

  return { entries, loading, refresh, admit };
}
