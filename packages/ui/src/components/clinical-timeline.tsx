import * as React from 'react';
import { cn } from '../lib/utils';
import { StatusPill, type StatusPillProps } from './status-pill';

export interface ClinicalTimelineEvent {
  id: string;
  timestamp: string;
  title: string;
  description?: string;
  category?: 'vitals' | 'medication' | 'procedure' | 'lab' | 'note' | 'imaging';
  status?: StatusPillProps['status'];
  actor?: string;
}

export interface ClinicalTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  events: ClinicalTimelineEvent[];
  compact?: boolean;
}

const categoryColors: Record<NonNullable<ClinicalTimelineEvent['category']>, string> = {
  vitals: 'border-success bg-success/10',
  medication: 'border-info bg-info/10',
  procedure: 'border-warning bg-warning/10',
  lab: 'border-accent bg-accent/10',
  note: 'border-muted-foreground bg-muted',
  imaging: 'border-primary bg-primary-muted',
};

export function ClinicalTimeline({
  events,
  compact = false,
  className,
  ...props
}: ClinicalTimelineProps) {
  return (
    <div className={cn('relative', className)} {...props}>
      <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" aria-hidden />
      <ul className="space-y-4">
        {events.map((event, index) => (
          <li key={event.id} className="relative flex gap-4 pl-0">
            <div
              className={cn(
                'relative z-10 mt-1 h-[22px] w-[22px] shrink-0 rounded-full border-2 bg-surface',
                event.category ? categoryColors[event.category] : 'border-primary bg-primary-muted',
              )}
            />
            <div className={cn('min-w-0 flex-1 pb-1', index === events.length - 1 && 'pb-0')}>
              <div className="flex flex-wrap items-center gap-2">
                <time className="text-xs font-mono text-muted-foreground">{event.timestamp}</time>
                {event.status && <StatusPill status={event.status} />}
                {event.category && (
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {event.category}
                  </span>
                )}
              </div>
              <p className={cn('mt-0.5 font-medium', compact ? 'text-sm' : 'text-base')}>
                {event.title}
              </p>
              {event.description && (
                <p className="mt-0.5 text-sm text-muted-foreground">{event.description}</p>
              )}
              {event.actor && (
                <p className="mt-1 text-xs text-muted-foreground">Recorded by {event.actor}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
