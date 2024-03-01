export interface JobPayload {
  [key: string]: unknown;
}

export interface JobResult {
  success: boolean;
  jobName: string;
  queue: string;
  processedCount: number;
  failedCount: number;
  durationMs: number;
  metadata: Record<string, unknown>;
}

export interface WorkerContext {
  workerId: string;
  metrics?: {
    increment: (name: string) => void;
    timing: (name: string, ms: number) => void;
  };
}
