import {
  PageHeader,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  DataTable,
  StatusPill,
  Button,
  Badge,
  StatMetric,
} from '@medsphere/ui';
import { FileText, Download, Calendar, BarChart3 } from 'lucide-react';

const reports = [
  {
    "id": "RPT-1000",
    "name": "Landing Summary Report",
    "frequency": "Daily",
    "lastRun": "Today 08:00",
    "status": "ready"
  },
  {
    "id": "RPT-1001",
    "name": "Providers Summary Report",
    "frequency": "Weekly",
    "lastRun": "Yesterday 18:30",
    "status": "running"
  },
  {
    "id": "RPT-1002",
    "name": "Locations Summary Report",
    "frequency": "Monthly",
    "lastRun": "Mon 06:00",
    "status": "ready"
  },
  {
    "id": "RPT-1003",
    "name": "Contact Summary Report",
    "frequency": "Daily",
    "lastRun": "Today 08:00",
    "status": "failed"
  }
];

const metrics = [
  { label: 'Scheduled Reports', value: '4', icon: 'FileText' },
  { label: 'Generated Today', value: '3', icon: 'BarChart3' },
  { label: 'Export Queue', value: '2', icon: 'Download' },
  { label: 'Next Run', value: '08:00', icon: 'Calendar' },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Generate, schedule, and export web operational and compliance reports."
        actions={
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            New Report
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <StatMetric
            key={metric.label}
            label={metric.label}
            value={metric.value}
            icon={
              metric.icon === 'FileText' ? <FileText className="h-4 w-4" /> :
              metric.icon === 'BarChart3' ? <BarChart3 className="h-4 w-4" /> :
              metric.icon === 'Download' ? <Download className="h-4 w-4" /> :
              metric.icon === 'Calendar' ? <Calendar className="h-4 w-4" /> :
              undefined
            }
          />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report Catalog</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'id', header: 'ID', cell: (row) => <span className="font-mono text-xs">{row.id}</span> },
              { key: 'name', header: 'Report', cell: (row) => row.name, sortable: true },
              { key: 'frequency', header: 'Schedule', cell: (row) => row.frequency },
              { key: 'lastRun', header: 'Last Run', cell: (row) => row.lastRun },
              {
                key: 'status',
                header: 'Status',
                cell: (row) => <StatusPill status={row.status}>{row.status}</StatusPill>,
              },
              {
                key: 'actions',
                header: '',
                cell: () => (
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                ),
              },
            ]}
            data={reports}
            keyExtractor={(row) => row.id}
            searchFilter={(row, q) => row.name.toLowerCase().includes(q.toLowerCase())}
          />
        </CardContent>
      </Card>
    </div>
  );
}
