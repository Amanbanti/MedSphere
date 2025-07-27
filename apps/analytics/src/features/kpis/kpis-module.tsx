'use client';

import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, PageHeader, StatMetric } from '@medsphere/ui';

export interface DashboardMetric {
  label: string;
  value: number;
  unit?: string;
  trend?: number;
}

export interface ChartSeries {
  name: string;
  data: { x: string; y: number }[];
}

export function useAnalyticsDashboard(scope: 'operational' | 'financial' | 'clinical' = 'operational') {
  return useMemo(() => {
    const metrics: DashboardMetric[] = scope === 'financial'
      ? [
          { label: 'Net Revenue', value: 2840000, unit: 'USD', trend: 4.2 },
          { label: 'Days in A/R', value: 38, trend: -2.1 },
          { label: 'Collection Rate', value: 94.2, unit: '%', trend: 1.3 },
        ]
      : [
          { label: 'Bed Occupancy', value: 82.5, unit: '%', trend: 1.8 },
          { label: 'ED Wait (min)', value: 24, trend: -5.2 },
          { label: 'No-Show Rate', value: 6.1, unit: '%', trend: -0.4 },
        ];

    const revenueTrend: ChartSeries = {
      name: 'Revenue',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m, i) => ({
        x: m,
        y: 420000 + i * 18000 + (i % 2) * 12000,
      })),
    };

    const encountersByDept: ChartSeries = {
      name: 'Encounters',
      data: ['Primary Care', 'Cardiology', 'Orthopedics', 'Lab'].map((d, i) => ({
        x: d,
        y: 1200 - i * 180,
      })),
    };

    return { metrics, charts: { revenueTrend, encountersByDept }, isLoading: false };
  }, [scope]);
}

export default function KpisModulePage() {
  const { metrics, charts } = useAnalyticsDashboard('financial');

  return (
    <div className="space-y-6">
      <PageHeader title="Analytics Dashboard" description="Charts-ready operational and financial intelligence." />

      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((m) => (
          <StatMetric
            key={m.label}
            label={m.label}
            value={m.unit === 'USD' ? `$${(m.value / 1e6).toFixed(2)}M` : `${m.value}${m.unit ?? ''}`}
            trend={m.trend != null ? `${m.trend > 0 ? '+' : ''}${m.trend}%` : undefined}
          />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>{charts.revenueTrend.name} Trend</CardTitle></CardHeader>
          <CardContent>
            <div className="flex h-48 items-end gap-2">
              {charts.revenueTrend.data.map((pt) => (
                <div key={pt.x} className="flex flex-1 flex-col items-center gap-1">
                  <div className="w-full rounded-t bg-primary/80" style={{ height: `${(pt.y / 550000) * 100}%` }} />
                  <span className="text-xs text-muted-foreground">{pt.x}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Encounters by Department</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {charts.encountersByDept.data.map((pt) => (
              <div key={pt.x} className="flex items-center gap-2 text-sm">
                <span className="w-28 truncate text-muted-foreground">{pt.x}</span>
                <div className="h-2 flex-1 rounded bg-muted">
                  <div className="h-2 rounded bg-primary" style={{ width: `${(pt.y / 1200) * 100}%` }} />
                </div>
                <span className="w-12 text-right">{pt.y}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
