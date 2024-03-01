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
    "label": "Pending Claims",
    "value": "156",
    "icon": "Activity"
  },
  {
    "label": "Denial Rate",
    "value": "4.2",
    "unit": "%",
    "change": -0.8,
    "changeLabel": "vs last month",
    "icon": "AlertCircle"
  },
  {
    "label": "Days in A/R",
    "value": "38",
    "icon": "Clock"
  },
  {
    "label": "Collected MTD",
    "value": "$2.4M",
    "icon": "Users"
  }
];

const recentItems = [
  {
    "id": "CLM-8821",
    "name": "Hayes — Inpatient",
    "status": "pending",
    "statusLabel": "Review",
    "time": "$48,220"
  },
  {
    "id": "CLM-8818",
    "name": "ED Visit — Wright",
    "status": "critical",
    "statusLabel": "Denied",
    "time": "$8,420"
  }
];

const timelineEvents = [
  {
    "id": "1",
    "timestamp": "09:00",
    "title": "Claim submitted — BCBS",
    "category": "note",
    "status": "pending"
  },
  {
    "id": "2",
    "timestamp": "08:30",
    "title": "Denial overturned — CLM-8802",
    "category": "note",
    "status": "completed"
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Claims pipeline, denial management, and revenue metrics."
        badge={<Badge variant="info">RCM Operations</Badge>}
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
            <CardTitle>Recent Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={[
                { key: 'id', header: 'ID', cell: (row) => <span className="font-mono text-xs">{row.id}</span> },
                { key: 'name', header: 'Claim', cell: (row) => row.name, sortable: true },
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
