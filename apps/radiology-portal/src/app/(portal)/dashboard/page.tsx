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
    "label": "Reading Queue",
    "value": "18",
    "icon": "Activity"
  },
  {
    "label": "STAT Studies",
    "value": "3",
    "icon": "AlertCircle"
  },
  {
    "label": "Avg Report TAT",
    "value": "28",
    "unit": "min",
    "icon": "Clock"
  },
  {
    "label": "Signed Today",
    "value": "47",
    "icon": "Users"
  }
];

const recentItems = [
  {
    "id": "IMG-5521",
    "name": "CT Chest — Hayes",
    "status": "critical",
    "statusLabel": "STAT",
    "time": "09:25"
  },
  {
    "id": "IMG-5518",
    "name": "CT Head — ED",
    "status": "critical",
    "statusLabel": "STAT",
    "time": "09:18"
  }
];

const timelineEvents = [
  {
    "id": "1",
    "timestamp": "09:25",
    "title": "STAT CT uploaded",
    "category": "imaging",
    "status": "critical",
    "actor": "PACS"
  },
  {
    "id": "2",
    "timestamp": "09:00",
    "title": "Report signed — US Abdomen",
    "category": "imaging",
    "status": "completed",
    "actor": "Dr. Kim"
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Reading queue, modality workload, and report turnaround."
        badge={<Badge variant="info">Reading Room A</Badge>}
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
            <CardTitle>Reading Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={[
                { key: 'id', header: 'ID', cell: (row) => <span className="font-mono text-xs">{row.id}</span> },
                { key: 'name', header: 'Study', cell: (row) => row.name, sortable: true },
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
