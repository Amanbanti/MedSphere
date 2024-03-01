import * as React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';

export interface StatMetricProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  unit?: string;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'compact';
}

export function StatMetric({
  label,
  value,
  unit,
  change,
  changeLabel,
  icon,
  variant = 'default',
  className,
  ...props
}: StatMetricProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-surface',
        variant === 'default' ? 'p-4' : 'p-3',
        className,
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        {icon && (
          <span className="text-muted-foreground [&_svg]:h-4 [&_svg]:w-4">{icon}</span>
        )}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-2xl font-semibold tabular-nums tracking-tight">{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
      {change !== undefined && (
        <div className="mt-1.5 flex items-center gap-1 text-xs">
          {isPositive ? (
            <TrendingUp className="h-3 w-3 text-success" />
          ) : (
            <TrendingDown className="h-3 w-3 text-destructive" />
          )}
          <span className={cn('font-medium', isPositive ? 'text-success' : 'text-destructive')}>
            {isPositive ? '+' : ''}
            {change}%
          </span>
          {changeLabel && <span className="text-muted-foreground">{changeLabel}</span>}
        </div>
      )}
    </div>
  );
}
