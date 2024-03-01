import Link from 'next/link';
import { PageHeader, DataTable, StatusPill, Button, Badge } from '@medsphere/ui';
import { Plus } from 'lucide-react';

const items = [
  {
    "id": "INV-4421",
    "name": "Miller, G. — Statement",
    "status": "pending",
    "statusLabel": "Due",
    "time": "$1,240"
  },
  {
    "id": "INV-4419",
    "name": "Wright, E. — Payment Plan",
    "status": "active",
    "statusLabel": "Active",
    "time": "$320/mo"
  }
];

export default function InvoicesListPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Patient Invoices"
        description="Self-pay balances and payment plans."
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
            <Link href={`/invoices/${row.id}`} className="font-medium text-primary hover:underline">
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
