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
    "label": "Queue Depth",
    "value": "23",
    "icon": "Activity"
  },
  {
    "label": "Verified Today",
    "value": "187",
    "change": 6,
    "changeLabel": "vs avg",
    "icon": "Users"
  },
  {
    "label": "Avg Turnaround",
    "value": "8",
    "unit": "min",
    "icon": "Clock"
  },
  {
    "label": "Low Stock Items",
    "value": "5",
    "icon": "AlertCircle"
  }
];

const recentItems = [
  {
    "id": "RX-4421",
    "name": "Metformin 500mg",
    "status": "pending",
    "statusLabel": "Stat",
    "time": "09:38"
  },
  {
    "id": "RX-4419",
    "name": "Amoxicillin 500mg",
    "status": "pending",
    "statusLabel": "Routine",
    "time": "09:32"
  }
];

const timelineEvents = [
  {
    "id": "1",
    "timestamp": "09:38",
    "title": "New order — Metformin",
    "category": "medication",
    "status": "pending",
    "actor": "Dr. Chen"
  },
  {
    "id": "2",
    "timestamp": "09:35",
    "title": "Dispensed — Lisinopril",
    "category": "medication",
    "status": "completed",
    "actor": "Pharm Tech"
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Prescription queue, verification workflow, and inventory alerts."
        badge={<Badge variant="info">Central Pharmacy</Badge>}
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
            <CardTitle>Verification Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={[
                { key: 'id', header: 'ID', cell: (row) => <span className="font-mono text-xs">{row.id}</span> },
                { key: 'name', header: 'Prescription', cell: (row) => row.name, sortable: true },
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
