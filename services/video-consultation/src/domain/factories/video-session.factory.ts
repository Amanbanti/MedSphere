import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import { VideoSession } from '../entities/video-session.entity';

export interface VideoSessionFactoryInput {
  organizationId: UUID;
  patientId: UUID;
  providerId: UUID;
  appointmentId?: UUID | null;
  roomId: string;
  status: VideoSessionStatus;
  startedAt?: string | null;
  id?: UUID;
  now?: string;
}

export class VideoSessionFactory {
  static create(input: VideoSessionFactoryInput): VideoSession {
    const now = input.now ?? nowIso();
    const id = input.id ?? (uuidv4() as UUID);
    return VideoSession.register({
      id,
      organizationId: input.organizationId,
      now,
      patientId: input.patientId,
      providerId: input.providerId,
      appointmentId: input.appointmentId ?? null,
      roomId: input.roomId,
      status: input.status,
      startedAt: input.startedAt ?? null,
    } as Parameters<typeof VideoSession.register>[0]);
  }

  static reconstitute(props: Parameters<typeof VideoSession.reconstitute>[0]): VideoSession {
    return VideoSession.reconstitute(props);
  }

  static clone(source: VideoSession, overrides: Partial<VideoSessionFactoryInput> = {}): VideoSession {
    const snapshot = source.toSnapshot();
    return VideoSessionFactory.create({
      organizationId: snapshot.organizationId as UUID,
      patientId: (overrides.patientId ?? snapshot.patientId) as UUID,
      providerId: (overrides.providerId ?? snapshot.providerId) as UUID,
      appointmentId: (overrides.appointmentId ?? snapshot.appointmentId) as UUID | null,
      roomId: (overrides.roomId ?? snapshot.roomId) as string,
      status: (overrides.status ?? snapshot.status) as VideoSessionStatus,
      startedAt: (overrides.startedAt ?? snapshot.startedAt) as string | null,
      id: overrides.id,
      now: overrides.now,
    });
  }
}
