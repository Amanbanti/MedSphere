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
    "label": "Pending Auth",
    "value": "9",
    "icon": "Activity"
  },
  {
    "label": "Approval Rate",
    "value": "87",
    "unit": "%",
    "icon": "Users"
  },
  {
    "label": "Avg Decision",
    "value": "1.2",
    "unit": "days",
    "icon": "Clock"
  },
  {
    "label": "Expiring Soon",
    "value": "4",
    "icon": "AlertCircle"
  }
];

const recentItems = [
  {
    "id": "AUTH-442",
    "name": "MRI Brain — Wright",
    "status": "pending",
    "statusLabel": "Pending",
    "time": "03/10"
  },
  {
    "id": "AUTH-440",
    "name": "PT — Miller",
    "status": "pending",
    "statusLabel": "Info Requested",
    "time": "03/09"
  }
];

const timelineEvents = [
  {
    "id": "1",
    "timestamp": "09:00",
    "title": "Auth approved — Cardiac Cath",
    "category": "note",
    "status": "completed"
  },
  {
    "id": "2",
    "timestamp": "08:45",
    "title": "Eligibility verified — BCBS",
    "category": "note",
    "status": "active"
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Prior authorizations, eligibility verification, and payer contracts."
        badge={<Badge variant="info">Utilization Management</Badge>}
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
            <CardTitle>Auth Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={[
                { key: 'id', header: 'ID', cell: (row) => <span className="font-mono text-xs">{row.id}</span> },
                { key: 'name', header: 'Request', cell: (row) => row.name, sortable: true },
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
