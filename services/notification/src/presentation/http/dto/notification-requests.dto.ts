import { IsObject, IsOptional, IsString, IsNumber } from 'class-validator';

export class SendNotificationRequestDto {
  recipientId: string;
  channel: string;
  subject: string;
  body: string;
  metadata?: Record<string, unknown>;
}

export class MarkNotificationReadRequestDto {
  recipientId: string;
  channel: string;
  subject: string;
  body: string;
  metadata?: Record<string, unknown>;
}

export class ConfigureNotificationPreferencesRequestDto {
  recipientId: string;
  channel: string;
  subject: string;
  body: string;
  metadata?: Record<string, unknown>;
}
