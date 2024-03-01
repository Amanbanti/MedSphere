import Link from 'next/link';
import { PageHeader, DataTable, StatusPill, Button, Badge } from '@medsphere/ui';
import { Plus } from 'lucide-react';

const items = [
  {
    "id": "RX-4421",
    "name": "Metformin 500mg — Hayes, R.",
    "status": "pending",
    "statusLabel": "Verify",
    "time": "09:38"
  },
  {
    "id": "RX-4420",
    "name": "Lisinopril 10mg — Park, L.",
    "status": "active",
    "statusLabel": "Dispensing",
    "time": "09:35"
  }
];

export default function PrescriptionsListPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Prescription Queue"
        description="Orders awaiting verification and dispensing."
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
            <Link href={`/prescriptions/${row.id}`} className="font-medium text-primary hover:underline">
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
