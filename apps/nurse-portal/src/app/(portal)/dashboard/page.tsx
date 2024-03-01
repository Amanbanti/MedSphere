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
    "label": "Assigned Patients",
    "value": "6",
    "icon": "Users"
  },
  {
    "label": "Tasks Due",
    "value": "4",
    "icon": "Clock"
  },
  {
    "label": "Overdue",
    "value": "1",
    "icon": "AlertCircle"
  },
  {
    "label": "Unit Census",
    "value": "28",
    "icon": "Activity"
  }
];

const recentItems = [
  {
    "id": "TSK-01",
    "name": "Vitals — Linda Park",
    "status": "pending",
    "statusLabel": "Due Now",
    "time": "Room 312"
  },
  {
    "id": "TSK-02",
    "name": "Med Admin — George Miller",
    "status": "scheduled",
    "statusLabel": "10:45",
    "time": "Room 314"
  }
];

const timelineEvents = [
  {
    "id": "1",
    "timestamp": "09:30",
    "title": "Vitals documented",
    "description": "BP 128/82, HR 78, SpO2 97%",
    "category": "vitals",
    "status": "completed",
    "actor": "You"
  },
  {
    "id": "2",
    "timestamp": "09:00",
    "title": "Shift handoff received",
    "category": "note",
    "status": "completed",
    "actor": "Night Charge"
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Unit census, assigned patients, and pending nursing tasks."
        badge={<Badge variant="info">Med-Surg Unit 3</Badge>}
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
            <CardTitle>Due Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={[
                { key: 'id', header: 'ID', cell: (row) => <span className="font-mono text-xs">{row.id}</span> },
                { key: 'name', header: 'Task', cell: (row) => row.name, sortable: true },
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
