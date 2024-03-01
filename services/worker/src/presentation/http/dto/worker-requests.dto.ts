import { IsObject, IsOptional, IsString, IsNumber } from 'class-validator';

export class RegisterWorkerHandlerRequestDto {
  handlerName: string;
  jobId: string;
  payload: string;
  status: string;
  metadata?: Record<string, unknown>;
}

export class ProcessWorkerJobRequestDto {
  handlerName: string;
  jobId: string;
  payload: string;
  status: string;
  metadata?: Record<string, unknown>;
}

export class RetryFailedWorkerJobRequestDto {
  handlerName: string;
  jobId: string;
  payload: string;
  status: string;
  metadata?: Record<string, unknown>;
}
