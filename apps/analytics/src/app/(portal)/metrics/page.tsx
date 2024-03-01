import Link from 'next/link';
import { PageHeader, DataTable, StatusPill, Button, Badge } from '@medsphere/ui';
import { Plus } from 'lucide-react';

const items = [
  {
    "id": "MET-01",
    "name": "30-Day Readmission Rate",
    "status": "active",
    "statusLabel": "8.2%",
    "time": "Target: <10%"
  },
  {
    "id": "MET-02",
    "name": "Door-to-Balloon Time",
    "status": "completed",
    "statusLabel": "62 min",
    "time": "Target: <90 min"
  }
];

export default function MetricsListPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Quality Metrics"
        description="CMS core measures and internal benchmarks."
        actions={
          <Button>
            <Plus className="h-4 w-4" />
            New
          </Button>
        }
      />

      <DataTable
        columns={[
          { key: 'id', header: 'ID', cell: (row) => <span className="font-mono text-xs text-muted-foreground">{row.id}</span> },
          { key: 'name', header: 'Name', cell: (row) => (
            <Link href={`/metrics/${row.id}`} className="font-medium text-primary hover:underline">
              {row.name}
            </Link>
          ), sortable: true },
          { key: 'status', header: 'Status', cell: (row) => <StatusPill status={row.status}>{row.statusLabel}</StatusPill> },
          { key: 'time', header: 'Details', cell: (row) => <span className="text-muted-foreground">{row.time}</span> },
        ]}
        data={items}
        keyExtractor={(row) => row.id}
        searchFilter={(row, q) => row.name.toLowerCase().includes(q.toLowerCase()) || row.id.toLowerCase().includes(q.toLowerCase())}
      />
    </div>
  );
}
