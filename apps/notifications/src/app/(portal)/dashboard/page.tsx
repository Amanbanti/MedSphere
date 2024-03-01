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
    "label": "Sent Today",
    "value": "1,842",
    "icon": "Activity"
  },
  {
    "label": "Delivery Rate",
    "value": "99.2",
    "unit": "%",
    "icon": "Users"
  },
  {
    "label": "Avg Latency",
    "value": "1.4",
    "unit": "sec",
    "icon": "Clock"
  },
  {
    "label": "Failed",
    "value": "3",
    "icon": "AlertCircle"
  }
];

const recentItems = [
  {
    "id": "DL-8821",
    "name": "Appt Reminder — Anderson",
    "status": "completed",
    "statusLabel": "Delivered",
    "time": "09:00"
  },
  {
    "id": "DL-8820",
    "name": "Critical Lab — Hayes",
    "status": "completed",
    "statusLabel": "Delivered",
    "time": "09:22"
  }
];

const timelineEvents = [
  {
    "id": "1",
    "timestamp": "09:22",
    "title": "Critical alert delivered",
    "description": "K+ 6.2 — Dr. Chen, Nursing",
    "category": "note",
    "status": "completed"
  },
  {
    "id": "2",
    "timestamp": "09:00",
    "title": "Batch reminders sent",
    "description": "47 appointment reminders",
    "category": "note",
    "status": "completed"
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Message templates, delivery channels, and communication audit trail."
        badge={<Badge variant="info">Messaging Center</Badge>}
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
            <CardTitle>Recent Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={[
                { key: 'id', header: 'ID', cell: (row) => <span className="font-mono text-xs">{row.id}</span> },
                { key: 'name', header: 'Message', cell: (row) => row.name, sortable: true },
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
