import Link from 'next/link';
import { PageHeader, DataTable, StatusPill, Button, Badge } from '@medsphere/ui';
import { Plus } from 'lucide-react';

const items = [
  {
    "id": "PT-8821",
    "name": "Robert Hayes — CHF Exacerbation",
    "status": "critical",
    "statusLabel": "Critical",
    "time": "ICU-4B"
  },
  {
    "id": "PT-8819",
    "name": "Linda Park — Post-op Day 2",
    "status": "active",
    "statusLabel": "Stable",
    "time": "Med-Surg 312"
  }
];

export default function PatientsListPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Patient Panel"
        description="Active inpatients and clinic encounters."
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
            <Link href={`/patients/${row.id}`} className="font-medium text-primary hover:underline">
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
