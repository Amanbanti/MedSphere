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
    "label": "Patients Today",
    "value": "18",
    "icon": "Users"
  },
  {
    "label": "Pending Orders",
    "value": "6",
    "change": -8,
    "changeLabel": "vs yesterday",
    "icon": "Activity"
  },
  {
    "label": "Avg Wait",
    "value": "12",
    "unit": "min",
    "icon": "Clock"
  },
  {
    "label": "Critical Alerts",
    "value": "2",
    "icon": "AlertCircle"
  }
];

const recentItems = [
  {
    "id": "PT-8821",
    "name": "Robert Hayes",
    "status": "critical",
    "statusLabel": "Critical",
    "time": "ICU-4B"
  },
  {
    "id": "PT-8815",
    "name": "Eleanor Wright",
    "status": "pending",
    "statusLabel": "Pending Labs",
    "time": "ED-2"
  }
];

const timelineEvents = [
  {
    "id": "1",
    "timestamp": "09:15",
    "title": "Critical lab — K+ 6.2",
    "category": "lab",
    "status": "critical",
    "actor": "Lab Interface"
  },
  {
    "id": "2",
    "timestamp": "08:45",
    "title": "Medication administered",
    "description": "Furosemide 40mg IV",
    "category": "medication",
    "status": "completed",
    "actor": "N. Johnson, RN"
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Today's schedule, active patients, and pending clinical tasks."
        badge={<Badge variant="info">Day Shift</Badge>}
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
            <CardTitle>Priority Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={[
                { key: 'id', header: 'ID', cell: (row) => <span className="font-mono text-xs">{row.id}</span> },
                { key: 'name', header: 'Patient', cell: (row) => row.name, sortable: true },
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
