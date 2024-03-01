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
    "label": "Active Users",
    "value": "2,847",
    "change": 4.2,
    "changeLabel": "vs last week",
    "icon": "Users"
  },
  {
    "label": "Organizations",
    "value": "34",
    "change": 2.1,
    "changeLabel": "vs last month",
    "icon": "Activity"
  },
  {
    "label": "Uptime",
    "value": "99.97",
    "unit": "%",
    "change": 0.1,
    "changeLabel": "30-day",
    "icon": "Clock"
  },
  {
    "label": "Open Issues",
    "value": "7",
    "change": -12,
    "changeLabel": "vs yesterday",
    "icon": "AlertCircle"
  }
];

const recentItems = [
  {
    "id": "LOG-8921",
    "name": "Dr. Sarah Chen",
    "status": "active",
    "statusLabel": "Login",
    "time": "09:42 AM"
  },
  {
    "id": "LOG-8920",
    "name": "System",
    "status": "completed",
    "statusLabel": "Backup",
    "time": "09:30 AM"
  },
  {
    "id": "LOG-8919",
    "name": "Maria Santos",
    "status": "active",
    "statusLabel": "Config Change",
    "time": "09:15 AM"
  }
];

const timelineEvents = [
  {
    "id": "1",
    "timestamp": "09:42",
    "title": "User login",
    "description": "Dr. Sarah Chen authenticated via SSO",
    "category": "note",
    "status": "completed",
    "actor": "Auth Service"
  },
  {
    "id": "2",
    "timestamp": "09:30",
    "title": "Database backup completed",
    "category": "procedure",
    "status": "completed",
    "actor": "System"
  },
  {
    "id": "3",
    "timestamp": "09:15",
    "title": "Role permissions updated",
    "description": "Nursing role — added vitals override",
    "category": "note",
    "status": "active",
    "actor": "Maria Santos"
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Organization-wide system health, user activity, and configuration status."
        badge={<Badge variant="info">All Systems Operational</Badge>}
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
            <CardTitle>Recent User Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={[
                { key: 'id', header: 'ID', cell: (row) => <span className="font-mono text-xs">{row.id}</span> },
                { key: 'name', header: 'User', cell: (row) => row.name, sortable: true },
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
