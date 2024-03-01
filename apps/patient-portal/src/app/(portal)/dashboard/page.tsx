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
    "label": "Upcoming Visits",
    "value": "2",
    "icon": "Clock"
  },
  {
    "label": "Unread Results",
    "value": "1",
    "change": 0,
    "icon": "Activity"
  },
  {
    "label": "Messages",
    "value": "3",
    "icon": "Users"
  },
  {
    "label": "Action Items",
    "value": "1",
    "icon": "AlertCircle"
  }
];

const recentItems = [
  {
    "id": "RES-221",
    "name": "Lipid Panel",
    "status": "completed",
    "statusLabel": "Normal",
    "time": "Feb 14"
  },
  {
    "id": "RES-218",
    "name": "HbA1c",
    "status": "completed",
    "statusLabel": "Review",
    "time": "Jan 30"
  }
];

const timelineEvents = [
  {
    "id": "1",
    "timestamp": "Feb 14",
    "title": "Lab results available",
    "description": "CBC Panel — all values within range",
    "category": "lab",
    "status": "completed"
  },
  {
    "id": "2",
    "timestamp": "Jan 28",
    "title": "Cardiology visit",
    "description": "Follow-up ECG — stable",
    "category": "procedure",
    "status": "completed",
    "actor": "Dr. Chen"
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Your appointments, test results, and care team at a glance."
        badge={<Badge variant="info">Welcome back</Badge>}
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
            <CardTitle>Recent Results</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={[
                { key: 'id', header: 'ID', cell: (row) => <span className="font-mono text-xs">{row.id}</span> },
                { key: 'name', header: 'Record', cell: (row) => row.name, sortable: true },
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
