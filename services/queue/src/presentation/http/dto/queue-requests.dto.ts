import { IsObject, IsOptional, IsString, IsNumber } from 'class-validator';

export class EnqueueJobRequestDto {
  queueName: string;
  jobType: string;
  payload: string;
  status: string;
  metadata?: Record<string, unknown>;
}

export class DequeueJobRequestDto {
  queueName: string;
  jobType: string;
  payload: string;
  status: string;
  metadata?: Record<string, unknown>;
}

export class AcknowledgeJobRequestDto {
  queueName: string;
  jobType: string;
  payload: string;
  status: string;
  metadata?: Record<string, unknown>;
}
