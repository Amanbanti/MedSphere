/**
 * Signaling API client for video consultation WebRTC coordination.
 */

export type SessionStatus = 'SCHEDULED' | 'WAITING' | 'LIVE' | 'ENDED' | 'CANCELLED' | 'FAILED';

export interface VideoSessionDto {
  id: string;
  roomId: string;
  status: SessionStatus;
  patientId: string;
  providerId: string;
  signalingToken?: string;
  scheduledStartAt: string;
}

export interface WaitingRoomEntryDto {
  id: string;
  sessionId: string;
  patientName: string;
  queuePosition: number;
  status: 'QUEUED' | 'ADMITTED' | 'LEFT' | 'EXPIRED';
  joinedAt: string;
}

export interface IceCandidateDto {
  candidate: string;
  sdpMid?: string;
  sdpMLineIndex?: number;
}

const BASE = process.env.NEXT_PUBLIC_VIDEO_API_URL ?? '/api/v1/video';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });
  if (!res.ok) throw new Error(`Video API ${res.status}: ${await res.text()}`);
  const json = await res.json();
  return json.data ?? json;
}

export const videoSignalingClient = {
  getSession(sessionId: string): Promise<VideoSessionDto> {
    return request(`/sessions/${sessionId}`);
  },

  joinWaitingRoom(sessionId: string, patientId: string): Promise<WaitingRoomEntryDto> {
    return request(`/sessions/${sessionId}/waiting-room/join`, {
      method: 'POST',
      body: JSON.stringify({ patientId }),
    });
  },

  admitPatient(sessionId: string, entryId: string): Promise<WaitingRoomEntryDto> {
    return request(`/sessions/${sessionId}/waiting-room/${entryId}/admit`, { method: 'POST' });
  },

  startSession(sessionId: string): Promise<VideoSessionDto> {
    return request(`/sessions/${sessionId}/start`, { method: 'POST' });
  },

  endSession(sessionId: string): Promise<VideoSessionDto> {
    return request(`/sessions/${sessionId}/end`, { method: 'POST' });
  },

  postIceCandidate(sessionId: string, participantId: string, candidate: IceCandidateDto): Promise<void> {
    return request(`/sessions/${sessionId}/signaling/ice`, {
      method: 'POST',
      body: JSON.stringify({ participantId, ...candidate }),
    });
  },

  listWaitingRoom(sessionId: string): Promise<WaitingRoomEntryDto[]> {
    return request(`/sessions/${sessionId}/waiting-room`);
  },
};
