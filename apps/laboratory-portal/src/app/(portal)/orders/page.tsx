import Link from 'next/link';
import { PageHeader, DataTable, StatusPill, Button, Badge } from '@medsphere/ui';
import { Plus } from 'lucide-react';

const items = [
  {
    "id": "LAB-8821",
    "name": "CBC + BMP — Hayes, R.",
    "status": "critical",
    "statusLabel": "STAT",
    "time": "Collected 09:20"
  },
  {
    "id": "LAB-8819",
    "name": "Urinalysis — Park, L.",
    "status": "active",
    "statusLabel": "Processing",
    "time": "Collected 09:05"
  }
];

export default function OrdersListPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Lab Orders"
        description="Pending collection and in-process specimens."
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
            <Link href={`/orders/${row.id}`} className="font-medium text-primary hover:underline">
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
