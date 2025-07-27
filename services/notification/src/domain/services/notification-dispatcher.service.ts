export enum NotificationChannel {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PUSH = 'PUSH',
  IN_APP = 'IN_APP',
  WEBHOOK = 'WEBHOOK',
  WHATSAPP = 'WHATSAPP',
  VOICE = 'VOICE',
}

export enum NotificationDeliveryStatus {
  PENDING = 'PENDING',
  QUEUED = 'QUEUED',
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
  BOUNCED = 'BOUNCED',
  READ = 'READ',
  CANCELLED = 'CANCELLED',
}

export interface DispatchTarget {
  channel: NotificationChannel;
  address: string;
}

export interface OutboxEntry {
  id: string;
  channel: NotificationChannel;
  retryCount: number;
  maxRetries: number;
}

export class NotificationDispatcherService {
  computeBackoffSeconds(attempt: number, baseSeconds = 15): number {
    const capped = Math.min(attempt, 8);
    const jitter = Math.floor(Math.random() * 5);
    return baseSeconds * Math.pow(2, capped) + jitter;
  }

  shouldRetry(entry: OutboxEntry): boolean {
    return entry.retryCount < entry.maxRetries;
  }

  nextRetryAt(entry: OutboxEntry, now = new Date()): Date {
    const seconds = this.computeBackoffSeconds(entry.retryCount);
    return new Date(now.getTime() + seconds * 1000);
  }

  selectChannels(
    preferred: NotificationChannel[],
    enabled: NotificationChannel[],
  ): NotificationChannel[] {
    return preferred.filter((ch) => enabled.includes(ch));
  }

  renderTemplate(template: string, variables: Record<string, string>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => variables[key] ?? '');
  }

  buildMultiChannelPlan(
    targets: DispatchTarget[],
    enabledChannels: NotificationChannel[],
  ): DispatchTarget[] {
    return targets.filter((t) => enabledChannels.includes(t.channel));
  }

  markDeliveryOutcome(
    currentStatus: NotificationDeliveryStatus,
    success: boolean,
  ): NotificationDeliveryStatus {
    if (success) return NotificationDeliveryStatus.DELIVERED;
    if (currentStatus === NotificationDeliveryStatus.PENDING) {
      return NotificationDeliveryStatus.QUEUED;
    }
    return NotificationDeliveryStatus.FAILED;
  }
}
