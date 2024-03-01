import {
  PageHeader,
  StatMetric,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  DataTable,
  StatusPill,
  ClinicalTimeline,
  Badge,
} from '@medsphere/ui';
import { Activity, Users, Clock, AlertCircle } from 'lucide-react';

const metrics = [
  {
    "label": "ED Volume",
    "value": "142",
    "change": 5,
    "changeLabel": "vs yesterday",
    "icon": "Activity"
  },
  {
    "label": "Bed Occupancy",
    "value": "87",
    "unit": "%",
    "icon": "Users"
  },
  {
    "label": "Avg LOS",
    "value": "4.2",
    "unit": "days",
    "icon": "Clock"
  },
  {
    "label": "Quality Alerts",
    "value": "3",
    "icon": "AlertCircle"
  }
];

const recentItems = [
  {
    "id": "KPI-01",
    "name": "Patient Satisfaction",
    "status": "completed",
    "statusLabel": "4.6/5",
    "time": "HCAHPS"
  },
  {
    "id": "KPI-02",
    "name": "CLABSI Rate",
    "status": "active",
    "statusLabel": "0.8",
    "time": "Per 1000"
  }
];

const timelineEvents = [
  {
    "id": "1",
    "timestamp": "08:00",
    "title": "Daily census report generated",
    "category": "note",
    "status": "completed"
  },
  {
    "id": "2",
    "timestamp": "07:30",
    "title": "Quality measure refresh",
    "category": "note",
    "status": "completed"
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Clinical quality metrics, operational KPIs, and population trends."
        badge={<Badge variant="info">Real-time Analytics</Badge>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <StatMetric
            key={metric.label}
            label={metric.label}
            value={metric.value}
            unit={metric.unit}
            change={metric.change}
            changeLabel={metric.changeLabel}
            icon={
              metric.icon === 'Activity' ? <Activity className="h-4 w-4" /> :
              metric.icon === 'Users' ? <Users className="h-4 w-4" /> :
              metric.icon === 'Clock' ? <Clock className="h-4 w-4" /> :
              metric.icon === 'AlertCircle' ? <AlertCircle className="h-4 w-4" /> :
              undefined
            }
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Key Indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={[
                { key: 'id', header: 'ID', cell: (row) => <span className="font-mono text-xs">{row.id}</span> },
                { key: 'name', header: 'Metric', cell: (row) => row.name, sortable: true },
                { key: 'status', header: 'Status', cell: (row) => <StatusPill status={row.status}>{row.statusLabel}</StatusPill> },
                { key: 'time', header: 'Time', cell: (row) => <span className="text-muted-foreground">{row.time}</span> },
              ]}
              data={recentItems}
              keyExtractor={(row) => row.id}
              searchFilter={(row, q) => row.name.toLowerCase().includes(q.toLowerCase())}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ClinicalTimeline events={timelineEvents} compact />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
