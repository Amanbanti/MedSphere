import type { VideoSession } from '../../domain/entities/video-session.entity';

export interface VideoSessionDto {
  id: string;
  organizationId: string;
  patientId: string;
  providerId: string;
  appointmentId: string | null;
  roomId: string;
  status: VideoSessionStatus;
  startedAt: string | null;
  endedAt: string | null;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export class VideoSessionMapper {
  static toDto(entity: VideoSession): VideoSessionDto {
    return {
      id: entity.id,
      organizationId: entity.organizationId,
      patientId: entity.patientId,
      providerId: entity.providerId,
      appointmentId: entity.appointmentId,
      roomId: entity.roomId,
      status: entity.status,
      startedAt: entity.startedAt,
      endedAt: entity.endedAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version,
    };
  }
}
