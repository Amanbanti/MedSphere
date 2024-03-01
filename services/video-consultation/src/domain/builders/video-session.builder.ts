import type { UUID } from '@medsphere/shared';
import { VideoSessionFactory, type VideoSessionFactoryInput } from '../factories/video-session.factory';
import { VideoSession } from '../entities/video-session.entity';

export class VideoSessionBuilder {
  private readonly input: Partial<VideoSessionFactoryInput> = {};

  static create(): VideoSessionBuilder {
    return new VideoSessionBuilder();
  }

  withOrganization(organizationId: UUID): this {
    this.input.organizationId = organizationId;
    return this;
  }

  withPatientId(patientId: UUID): this {
    this.input.patientId = patientId;
    return this;
  }

  withProviderId(providerId: UUID): this {
    this.input.providerId = providerId;
    return this;
  }

  withAppointmentId(appointmentId: UUID | null): this {
    this.input.appointmentId = appointmentId;
    return this;
  }

  withRoomId(roomId: string): this {
    this.input.roomId = roomId;
    return this;
  }

  withStatus(status: VideoSessionStatus): this {
    this.input.status = status;
    return this;
  }

  withStartedAt(startedAt: string | null): this {
    this.input.startedAt = startedAt;
    return this;
  }

  withEndedAt(endedAt: string | null): this {
    this.input.endedAt = endedAt;
    return this;
  }

  withId(id: UUID): this {
    this.input.id = id;
    return this;
  }

  build(): VideoSession {
    if (!this.input.organizationId) {
      throw new Error('organizationId is required');
    }
    return VideoSessionFactory.create(this.input as VideoSessionFactoryInput);
  }
}
