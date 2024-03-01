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
    "label": "Pending Orders",
    "value": "31",
    "icon": "Activity"
  },
  {
    "label": "STAT Orders",
    "value": "4",
    "icon": "AlertCircle"
  },
  {
    "label": "Avg TAT",
    "value": "42",
    "unit": "min",
    "icon": "Clock"
  },
  {
    "label": "Processed Today",
    "value": "412",
    "change": 3,
    "changeLabel": "vs avg",
    "icon": "Users"
  }
];

const recentItems = [
  {
    "id": "LAB-8821",
    "name": "CBC + BMP — Hayes",
    "status": "critical",
    "statusLabel": "STAT",
    "time": "09:20"
  },
  {
    "id": "LAB-8818",
    "name": "Troponin — ED Patient",
    "status": "critical",
    "statusLabel": "STAT",
    "time": "09:15"
  }
];

const timelineEvents = [
  {
    "id": "1",
    "timestamp": "09:22",
    "title": "Critical value — K+ 6.2",
    "category": "lab",
    "status": "critical",
    "actor": "Auto-alert"
  },
  {
    "id": "2",
    "timestamp": "09:10",
    "title": "Specimen received — CBC",
    "category": "lab",
    "status": "active",
    "actor": "Accessioning"
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Specimen processing, pending results, and critical value alerts."
        badge={<Badge variant="info">Core Lab</Badge>}
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
            <CardTitle>STAT Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={[
                { key: 'id', header: 'ID', cell: (row) => <span className="font-mono text-xs">{row.id}</span> },
                { key: 'name', header: 'Order', cell: (row) => row.name, sortable: true },
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
