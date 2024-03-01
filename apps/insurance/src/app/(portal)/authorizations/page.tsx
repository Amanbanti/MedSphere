import Link from 'next/link';
import { PageHeader, DataTable, StatusPill, Button, Badge } from '@medsphere/ui';
import { Plus } from 'lucide-react';

const items = [
  {
    "id": "AUTH-442",
    "name": "MRI Brain — Wright, E.",
    "status": "pending",
    "statusLabel": "Pending",
    "time": "Submitted 03/10"
  },
  {
    "id": "AUTH-441",
    "name": "Cardiac Cath — Hayes, R.",
    "status": "active",
    "statusLabel": "Approved",
    "time": "Valid 30 days"
  }
];

export default function AuthorizationsListPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Prior Authorizations"
        description="Pending and approved authorization requests."
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
            <Link href={`/authorizations/${row.id}`} className="font-medium text-primary hover:underline">
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
