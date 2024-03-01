import Link from 'next/link';
import { PageHeader, DataTable, StatusPill, Button, Badge } from '@medsphere/ui';
import { Plus } from 'lucide-react';

const items = [
  {
    "id": "IMG-5521",
    "name": "CT Chest w/ Contrast — Hayes, R.",
    "status": "critical",
    "statusLabel": "STAT",
    "time": "09:25"
  },
  {
    "id": "IMG-5519",
    "name": "XR Knee — Park, L.",
    "status": "pending",
    "statusLabel": "Routine",
    "time": "09:10"
  }
];

export default function StudiesListPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Imaging Studies"
        description="Studies awaiting interpretation and priors."
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
            <Link href={`/studies/${row.id}`} className="font-medium text-primary hover:underline">
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
