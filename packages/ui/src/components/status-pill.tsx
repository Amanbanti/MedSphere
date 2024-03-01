import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const statusPillVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      status: {
        active: 'bg-success/15 text-success',
        pending: 'bg-warning/15 text-warning-foreground',
        inactive: 'bg-muted text-muted-foreground',
        critical: 'bg-destructive/15 text-destructive',
        scheduled: 'bg-info/15 text-info',
        completed: 'bg-primary-muted text-primary',
        cancelled: 'bg-muted text-muted-foreground line-through',
      },
    },
    defaultVariants: {
      status: 'active',
    },
  },
);

export interface StatusPillProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusPillVariants> {
  pulse?: boolean;
}

export function StatusPill({ status, pulse, className, children, ...props }: StatusPillProps) {
  return (
    <span className={cn(statusPillVariants({ status }), className)} {...props}>
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-40" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      {children ?? status}
    </span>
  );
}

export { statusPillVariants };
