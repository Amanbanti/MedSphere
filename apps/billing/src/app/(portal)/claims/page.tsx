import Link from 'next/link';
import { PageHeader, DataTable, StatusPill, Button, Badge } from '@medsphere/ui';
import { Plus } from 'lucide-react';

const items = [
  {
    "id": "CLM-8821",
    "name": "Hayes, R. — Inpatient",
    "status": "pending",
    "statusLabel": "Payer Review",
    "time": "$48,220"
  },
  {
    "id": "CLM-8819",
    "name": "Park, L. — Outpatient",
    "status": "active",
    "statusLabel": "Submitted",
    "time": "$2,840"
  }
];

export default function ClaimsListPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Claims Management"
        description="Submitted, pending, and denied insurance claims."
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
            <Link href={`/claims/${row.id}`} className="font-medium text-primary hover:underline">
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
